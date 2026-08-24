import { NextResponse } from "next/server";
import { suggestionSchema } from "@/lib/schemas";
import { handleSuggestion } from "@/lib/notify";

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

  const parsed = suggestionSchema.safeParse(body);
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    return NextResponse.json({ error: first?.message ?? "Check that and try again." }, { status: 400 });
  }

  if (parsed.data.company) {
    return NextResponse.json({ ok: true });
  }

  const { message, kind, email, name } = parsed.data;
  const result = await handleSuggestion(
    {
      message: message.trim(),
      kind,
      email: email ? email.toLowerCase().trim() : undefined,
      name: name || undefined,
    },
    clientIp(request),
  );

  return NextResponse.json({ ok: true, ...result }, { status: 201 });
}
