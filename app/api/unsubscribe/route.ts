import { NextRequest, NextResponse } from "next/server";
import { validateEmail } from "@/lib/email-validation";

// WARNING: In-memory storage - NOT suitable for production!
// In production, use a database to track unsubscribes
const unsubscribedEmails = new Set<string>();

// Import subscribers from newsletter route (in production, use database)
// For now, we'll just track unsubscribes separately

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

		// Parse request body
		const body = await req.json();
		const { email } = body;

		// Validate email
		const validation = validateEmail(email, {
			blockDisposable: false,
		});

		if (!validation.isValid) {
			return NextResponse.json(
				{ error: validation.error },
				{ status: 400 }
			);
		}

		// Use normalized email from validation
		const normalizedEmail = validation.normalizedEmail!;

		// Add to unsubscribed list (in production, update database)
		unsubscribedEmails.add(normalizedEmail);

		console.log(`Unsubscribed: ${normalizedEmail}`);

		return NextResponse.json(
			{
				message: "በተሳካ ሁኔታ ከዝርዝሩ ተወግደዋል።",
				success: true,
			},
			{ status: 200 }
		);
	} catch (error) {
		console.error("Unsubscribe API error:", error);
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
			service: "unsubscribe",
		},
		{ status: 200 }
	);
}
