import { Resend } from "resend";

/**
 * Outbound email and durable storage for the two public forms.
 *
 * Two independent sinks on purpose:
 *
 * * **Resend** tells a human immediately, and confirms to the person who
 *   submitted.
 * * **The Nehzn API** keeps the queryable record — an inbox is a terrible
 *   waitlist.
 *
 * Neither is allowed to fail the request on its own. A form that says "sorry,
 * try again" because a notification bounced would lose a real signup for no
 * reason, so failures are logged and the submission still counts as long as
 * one sink accepted it.
 */

const resendKey = process.env.RESEND_API_KEY;
const resend = resendKey ? new Resend(resendKey) : null;

const FROM = process.env.RESEND_FROM ?? "Nehzn <hello@nehzn.com>";
const TEAM_INBOX = process.env.TEAM_INBOX ?? "hibjul@growth-loop.io";
const API_BASE = process.env.NEHZN_API_BASE ?? "https://api.nehzn.com/v1";

const INK = "#091A28";
const TEAL = "#00685F";
const IVORY = "#FDFCFB";
const HAIRLINE = "#E6E3DF";
const FAINT = "#6D7A77";

/** The shared email shell, so every message looks like the product. */
function shell(body: string) {
  return `<div style="background:${IVORY};padding:40px 20px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif">
  <div style="max-width:480px;margin:0 auto;background:#fff;border:1px solid ${HAIRLINE};border-radius:20px;padding:36px 32px">
    <div style="font-size:20px;font-weight:600;letter-spacing:.3px;color:${TEAL}">Nehzn</div>
    ${body}
  </div>
  <p style="max-width:480px;margin:18px auto 0;font-size:12px;color:${FAINT};text-align:center">
    Nehzn — find your people, naturally.
  </p>
</div>`;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

type WaitlistPayload = {
  email: string;
  name?: string;
  city?: string;
  lookingFor?: string;
};

type SuggestionPayload = {
  message: string;
  kind: string;
  email?: string;
  name?: string;
};

/** Persist to the Nehzn API. Returns the waitlist position when it knows it. */
async function store(path: string, payload: unknown, ip: string) {
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Forwarded-For": ip },
      body: JSON.stringify(payload),
      // The form should never hang on a slow upstream.
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) {
      console.warn(`[nehzn] store ${path} -> ${res.status}`);
      return { ok: false as const, status: res.status, data: null };
    }
    return { ok: true as const, status: res.status, data: await res.json() };
  } catch (error) {
    console.warn(`[nehzn] store ${path} failed`, error);
    return { ok: false as const, status: 0, data: null };
  }
}

async function send(to: string, subject: string, html: string, replyTo?: string) {
  if (!resend) {
    console.warn("[nehzn] RESEND_API_KEY not set — skipping email to", to);
    return false;
  }
  try {
    const { error } = await resend.emails.send({
      from: FROM,
      to: [to],
      subject,
      html,
      ...(replyTo ? { replyTo } : {}),
    });
    if (error) {
      console.warn("[nehzn] resend rejected", error);
      return false;
    }
    return true;
  } catch (error) {
    console.warn("[nehzn] resend threw", error);
    return false;
  }
}

export async function handleWaitlist(payload: WaitlistPayload, ip: string) {
  const stored = await store("/waitlist", payload, ip);
  const position: number | null =
    stored.ok && typeof stored.data?.position === "number" ? stored.data.position : null;

  const detail = [
    ["Email", payload.email],
    ["Name", payload.name],
    ["City", payload.city],
    ["Looking for", payload.lookingFor],
  ]
    .filter(([, v]) => v)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 12px 6px 0;color:${FAINT};font-size:13px;vertical-align:top">${k}</td><td style="padding:6px 0;font-size:14px;color:${INK}">${escapeHtml(String(v))}</td></tr>`,
    )
    .join("");

  await Promise.all([
    // To us.
    send(
      TEAM_INBOX,
      `New Nehzn waitlist signup${position ? ` — #${position}` : ""}`,
      shell(
        `<p style="font-size:16px;color:${INK};margin:22px 0 14px">Someone joined the waitlist.</p>
         <table style="border-collapse:collapse">${detail}</table>`,
      ),
      payload.email,
    ),
    // To them.
    send(
      payload.email,
      "You're on the Nehzn waitlist",
      shell(
        `<p style="font-size:16px;color:${INK};line-height:1.6;margin:22px 0 6px">
           Thanks${payload.name ? ` ${escapeHtml(payload.name)}` : ""} — you're on the list.
         </p>
         ${position ? `<p style="font-size:32px;font-weight:600;color:${TEAL};margin:8px 0 4px">#${position}</p>` : ""}
         <p style="font-size:14px;color:${FAINT};line-height:1.7;margin:14px 0 0">
           We'll email you once when there's something to open — no newsletter,
           no drip campaign. In the meantime, if there's something you'd want
           Nehzn to do, just reply to this email. We read all of them.
         </p>`,
      ),
    ),
  ]);

  return { position, stored: stored.ok, alreadyJoined: Boolean(stored.data?.alreadyJoined) };
}

export async function handleSuggestion(payload: SuggestionPayload, ip: string) {
  const stored = await store("/suggestions", payload, ip);

  await send(
    TEAM_INBOX,
    `Nehzn suggestion — ${payload.kind}`,
    shell(
      `<p style="font-size:16px;color:${INK};margin:22px 0 6px">New suggestion (${escapeHtml(payload.kind)}).</p>
       <p style="font-size:15px;color:${INK};line-height:1.7;white-space:pre-wrap;background:${IVORY};border:1px solid ${HAIRLINE};border-radius:12px;padding:14px">${escapeHtml(payload.message)}</p>
       <p style="font-size:13px;color:${FAINT};margin:14px 0 0">
         ${payload.name ? `From ${escapeHtml(payload.name)}. ` : ""}${payload.email ? escapeHtml(payload.email) : "No email left."}
       </p>`,
    ),
    payload.email || undefined,
  );

  if (payload.email) {
    await send(
      payload.email,
      "Thanks — we read that",
      shell(
        `<p style="font-size:16px;color:${INK};line-height:1.6;margin:22px 0 6px">
           Thanks${payload.name ? ` ${escapeHtml(payload.name)}` : ""} — your suggestion landed.
         </p>
         <p style="font-size:14px;color:${FAINT};line-height:1.7;margin:10px 0 0">
           A person reads every one of these. If it's something we take on,
           we'll let you know.
         </p>`,
      ),
    );
  }

  return { stored: stored.ok };
}
