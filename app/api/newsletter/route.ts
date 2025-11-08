import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { getWelcomeEmailHtml, getWelcomeEmailText } from "@/lib/email-templates";
import { siteConfig } from "@/config/site";

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY);

// Simple in-memory store for duplicate prevention (in production, use a database)
const subscribers = new Set<string>();

// Rate limiting: Track IP addresses and their request times
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 3;

export async function POST(req: NextRequest) {
  try {
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

    // Validate email
    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "ኢሜይል ያስፈልጋል። (Email is required.)" },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "እባክዎ ትክክለኛ የኢሜይል አድራሻ ያስገቡ። (Please enter a valid email address.)" },
        { status: 400 }
      );
    }

    // Check for duplicate subscription (in production, check database)
    const normalizedEmail = email.toLowerCase().trim();
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

    // Add to subscribers set first (in production, save to database)
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
      configured: !!process.env.RESEND_API_KEY,
    },
    { status: 200 }
  );
}
