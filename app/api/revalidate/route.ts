import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

/**
 * On-Demand Webhook Revalidation API Route
 * Purges Next.js Edge Cache instantly whenever Strapi content is published or updated.
 */
export async function POST(request: NextRequest) {
  try {
    const expectedSecret = process.env.REVALIDATE_SECRET;
    if (!expectedSecret) {
      console.error("REVALIDATE_SECRET environment variable is not configured.");
      return NextResponse.json(
        { message: "Server misconfiguration: revalidation secret not set" },
        { status: 500 }
      );
    }

    const { searchParams } = new URL(request.url);
    const secret = searchParams.get("secret");

    // 1. Authenticate the Webhook request
    if (secret !== expectedSecret) {
      return NextResponse.json(
        { message: "Invalid secret token" },
        { status: 401 }
      );
    }

    // 2. Parse Strapi Webhook Payload
    const body = await request.json().catch(() => ({}));
    const model = body?.model || "content";
    const event = body?.event || "update";

    console.log(`[Strapi Webhook] Received ${event} for model: ${model}`);

    // 3. Instantly Purge & Revalidate Homepage Cache on Edge CDN
    revalidatePath("/", "layout");

    return NextResponse.json({
      revalidated: true,
      model,
      event,
      now: Date.now(),
      message: `Successfully revalidated cache for Strapi event: ${event}`,
    });
  } catch (error) {
    console.error("Error in revalidate API route:", error);
    return NextResponse.json(
      { message: "Error revalidating cache", error: String(error) },
      { status: 500 }
    );
  }
}

// Allow GET for quick browser testing / verification
export async function GET(request: NextRequest) {
  const expectedSecret = process.env.REVALIDATE_SECRET;
  if (!expectedSecret) {
    return NextResponse.json(
      { message: "Server misconfiguration: revalidation secret not set" },
      { status: 500 }
    );
  }

  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");

  if (secret !== expectedSecret) {
    return NextResponse.json({ message: "Invalid secret token" }, { status: 401 });
  }

  revalidatePath("/", "layout");

  return NextResponse.json({
    revalidated: true,
    now: Date.now(),
    message: "Manual GET revalidation successful",
  });
}
