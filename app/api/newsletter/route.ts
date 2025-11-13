import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { getWelcomeEmailHtml, getWelcomeEmailText } from "@/lib/email-templates";
import { validateEmail } from "@/lib/email-validation";
import { siteConfig } from "@/config/site";

// TypeScript declaration for global cleanup interval
declare global {
  var rateLimitCleanupInterval: NodeJS.Timeout | undefined;
}

// WARNING: In-memory storage - NOT suitable for production!
// Use a database (PostgreSQL, MongoDB) or Vercel KV in production
// Current limitations:
// - Data lost on server restart
// - No persistence across serverless function instances
// - Memory leak potential if not cleaned up
const subscribers = new Set<string>();
const MAX_SUBSCRIBERS = 1000; // Prevent unbounded growth

// Rate limiting: Track IP addresses and their request times
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 3;

// Cleanup function to prevent memory leaks
function cleanupRateLimitMap() {
  const now = Date.now();
  for (const [ip, times] of rateLimitMap.entries()) {
    const recentTimes = times.filter((time) => now - time < RATE_LIMIT_WINDOW);
    if (recentTimes.length === 0) {
      rateLimitMap.delete(ip);
    } else {
      rateLimitMap.set(ip, recentTimes);
    }
  }
}

// Run cleanup every 5 minutes
if (typeof global.rateLimitCleanupInterval === 'undefined') {
  global.rateLimitCleanupInterval = setInterval(cleanupRateLimitMap, 5 * 60 * 1000);
}

export async function POST(req: NextRequest) {
  try {
    // CSRF Protection: Verify origin header
    const origin = req.headers.get("origin");
    const host = req.headers.get("host");

    if (origin && host && !origin.includes(host)) {
      return NextResponse.json(
        { error: "Invalid origin" },
        { status: 403 }
      );
    }

    // Get client IP for rate limiting
    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";

    // Rate limiting
    const now = Date.now();
    const requestTimes = rateLimitMap.get(ip) || [];
    const recentRequests = requestTimes.filter((time) => now - time < RATE_LIMIT_WINDOW);

    if (recentRequests.length >= MAX_REQUESTS_PER_WINDOW) {
      return NextResponse.json(
        {
          error: "በጣም ብዙ ጥያቄዎች። እባክዎ ትንሽ ቆይተው እንደገና ይሞክሩ። (Too many requests. Please try again later.)",
        },
        { status: 429 }
      );
    }

    // Update rate limit map
    recentRequests.push(now);
    rateLimitMap.set(ip, recentRequests);

    // Parse request body
    const body = await req.json();
    const { email } = body;

    // Validate email using robust validation utility
    const validation = validateEmail(email, {
      blockDisposable: false, // Set to true in production to block disposable emails
    });

    if (!validation.isValid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }

    // Use normalized email from validation
    const normalizedEmail = validation.normalizedEmail!;

    // Check for duplicate subscription (in production, check database)
    if (subscribers.has(normalizedEmail)) {
      return NextResponse.json(
        {
          message: "ቀደም ብለው ተመዝግበዋል! (You're already subscribed!)",
        },
        { status: 200 }
      );
    }

    // Check if RESEND_API_KEY is configured
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured");
      return NextResponse.json(
        {
          error: "የደብዳቤ አገልግሎት አልተዋቀረም። (Newsletter service not configured.)",
        },
        { status: 500 }
      );
    }

    // Initialize Resend with API key inside the function
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Add to subscribers set first (in production, save to database)
    // Check subscriber limit to prevent unbounded growth
    if (subscribers.size >= MAX_SUBSCRIBERS) {
      console.warn(`Subscriber limit reached (${MAX_SUBSCRIBERS}). Consider using persistent storage.`);
      // Remove oldest entry (Set doesn't have "oldest" but we can clear some)
      // In production, this should never happen with proper database
      const firstEmail = subscribers.values().next().value;
      if (firstEmail) subscribers.delete(firstEmail);
    }
    subscribers.add(normalizedEmail);

    // Try to send welcome email using Resend (non-blocking)
    // If email sending fails (e.g., unverified recipient in Resend), subscription still succeeds
    try {
      const { data, error } = await resend.emails.send({
        from: `${siteConfig.name} <onboarding@resend.dev>`, // Update this in production with your verified domain
        to: [normalizedEmail],
        subject: `እንኳን ደህና መጡ ወደ ${siteConfig.name}! (Welcome to ${siteConfig.name}!)`,
        html: getWelcomeEmailHtml(normalizedEmail),
        text: getWelcomeEmailText(normalizedEmail),
      });

      if (error) {
        // Log the error but don't fail the subscription
        console.warn("Resend email error (subscription still successful):", error);
        console.log(`Newsletter subscription successful (email failed): ${normalizedEmail}`);
      } else {
        // Log success
        console.log(`Newsletter subscription successful with email: ${normalizedEmail}`, data);
      }
    } catch (emailError) {
      // Catch any email sending errors but don't fail the subscription
      console.warn("Email sending failed (subscription still successful):", emailError);
      console.log(`Newsletter subscription successful (email exception): ${normalizedEmail}`);
    }

    return NextResponse.json(
      {
        message: "አመሰግናለሁ! የተመዘገቡ ናቸው። (Thank you! You're subscribed.)",
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Newsletter API error:", error);
    return NextResponse.json(
      {
        error: "የተጠበቀ ስህተት አጋጥሟል። (An unexpected error occurred.)",
      },
      { status: 500 }
    );
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json(
    {
      status: "healthy",
      service: "newsletter",
    },
    { status: 200 }
  );
}
