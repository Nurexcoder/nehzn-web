import { NextResponse } from "next/server";
import { waitlistSchema } from "@/lib/schemas";
import { handleWaitlist } from "@/lib/notify";

export const runtime = "nodejs";

function clientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Send valid JSON." }, { status: 400 });
  }

  const parsed = waitlistSchema.safeParse(body);
  if (!parsed.success) {
    // Surface the first message: forms show one error at a time anyway.
    const first = parsed.error.issues[0];
    return NextResponse.json({ error: first?.message ?? "Check that and try again." }, { status: 400 });
  }

  // Honeypot. A real person never sees this field, so anything in it is a bot —
  // answer 200 so the bot believes it worked and doesn't retry.
  if (parsed.data.company) {
    return NextResponse.json({ ok: true, position: null });
  }

  const { email, name, city, lookingFor } = parsed.data;
  const result = await handleWaitlist(
    {
      email: email.toLowerCase().trim(),
      name: name || undefined,
      city: city || undefined,
      lookingFor: lookingFor || undefined,
    },
    clientIp(request),
  );

  return NextResponse.json({ ok: true, ...result }, { status: 201 });
}
