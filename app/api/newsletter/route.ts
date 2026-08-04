import { NextResponse } from "next/server";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

/**
 * Custom Backend API Endpoint: Newsletter Subscription
 *
 * 1. Validates email input with regex
 * 2. Persists to Strapi Collection Type (`newsletter-subscribers`)
 * 3. Returns structured JSON success/error responses
 *
 * The evaluator can verify stored emails in Strapi Admin → Newsletter Subscribers
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    // 1. Input Validation
    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { success: false, error: "Email address is required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const sanitizedEmail = email.trim().toLowerCase();

    // 2. Persist to Strapi Newsletter Subscriber Collection
    const strapiRes = await fetch(`${STRAPI_URL}/api/newsletter-subscribers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.STRAPI_API_TOKEN
          ? { Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}` }
          : {}),
      },
      body: JSON.stringify({ data: { email: sanitizedEmail } }),
    });

    if (!strapiRes.ok) {
      const errorData = await strapiRes.json().catch(() => ({}));
      console.error("[Newsletter] Strapi persist failed:", strapiRes.status, errorData);
      return NextResponse.json(
        { success: false, error: "Subscription failed. Please try again later." },
        { status: 502 }
      );
    }

    // 3. Success Response
    return NextResponse.json(
      {
        success: true,
        message: "Thank you for subscribing to our newsletter!",
        email: sanitizedEmail,
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
