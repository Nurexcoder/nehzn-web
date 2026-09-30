import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

/**
 * Account deletion, on the open web.
 *
 * Google Play requires an app that creates accounts to offer deletion both
 * inside the app and at a public URL, reachable without signing in — which is
 * the point: someone who has lost their phone or their access still has the
 * right to be gone. The DPDP Act's erasure right expects the same.
 */
export const metadata: Metadata = {
  title: "Delete your Nehzn account",
  description:
    "How to delete your Nehzn account and everything in it, from the app or by request.",
};

const ERASED = [
  "Your profile: name, date of birth, gender, pronouns, city and every answer you gave during sign-up",
  "All of your photos, removed from our storage as well as the database",
  "Your daily answers, this-or-that picks and dice challenges",
  "Your messages, and any one-to-one conversation you were part of",
  "Waves, connections, blocks, and your place in any room or community",
  "The sign-in codes and sessions tied to your number or email",
];

const KEPT = [
  {
    what: "Rooms you opened",
    why: "A hotspot lasts seven days and other people joined it. It runs to its natural end without your name on it, then disappears with everything in it.",
  },
  {
    what: "Safety reports you filed about someone else",
    why: "These stay so a pattern of reports about that person remains visible. Your identity is removed from them.",
  },
];

export default function DeleteAccountPage() {
  return (
    <main style={{ minHeight: "100vh", background: "var(--ivory)", color: "var(--ink)" }}>
      <div style={{ maxWidth: 680, margin: "0 auto", padding: "48px 24px 80px" }}>
        <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <Image src="/brand/mark.svg" alt="" width={34} height={24} />
          <span style={{ fontWeight: 600, letterSpacing: "0.12em", fontSize: 14, color: "var(--ink)" }}>
            NEHZN
          </span>
        </Link>

        <h1 style={{ fontSize: 38, lineHeight: 1.15, margin: "36px 0 12px", fontWeight: 600 }}>
          Delete your account
        </h1>
        <p style={{ fontSize: 17, lineHeight: 1.6, color: "var(--muted)", margin: 0 }}>
          You can delete your Nehzn account at any time, and you never have to ask
          us to do it for you. Deletion is immediate and permanent — there is no
          grace period and no way to undo it, so please be sure.
        </p>

        <section style={{ marginTop: 40 }}>
          <h2 style={{ fontSize: 22, fontWeight: 600, margin: "0 0 14px" }}>From the app</h2>
          <ol style={{ paddingLeft: 22, margin: 0, fontSize: 16.5, lineHeight: 1.85 }}>
            <li>Open Nehzn and go to the <strong>You</strong> tab.</li>
            <li>Scroll to the bottom and tap <strong>Delete account</strong>.</li>
            <li>Read what will be removed, then confirm with <strong>Delete everything</strong>.</li>
          </ol>
        </section>

        <section style={{ marginTop: 40 }}>
          <h2 style={{ fontSize: 22, fontWeight: 600, margin: "0 0 14px" }}>
            If you cannot open the app
          </h2>
          <p style={{ fontSize: 16.5, lineHeight: 1.7, color: "var(--muted)", margin: "0 0 16px" }}>
            Lost the phone, or can no longer sign in? Email us from the address or
            number you signed up with and we will delete the account for you. We
            reply within 90 days, and in practice far sooner.
          </p>
          <a
            href="mailto:hello@nehzn.com?subject=Delete%20my%20Nehzn%20account"
            style={{
              display: "inline-block", background: "var(--teal)", color: "#fff",
              padding: "14px 26px", borderRadius: 999, textDecoration: "none",
              fontWeight: 600, fontSize: 16,
            }}
          >
            Request deletion by email
          </a>
        </section>

        <section style={{ marginTop: 44 }}>
          <h2 style={{ fontSize: 22, fontWeight: 600, margin: "0 0 14px" }}>What gets erased</h2>
          <ul style={{ paddingLeft: 22, margin: 0, fontSize: 16.5, lineHeight: 1.8 }}>
            {ERASED.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </section>

        <section style={{ marginTop: 40 }}>
          <h2 style={{ fontSize: 22, fontWeight: 600, margin: "0 0 14px" }}>
            The two things that stay, and why
          </h2>
          {KEPT.map((item) => (
            <div
              key={item.what}
              style={{
                background: "#fff", border: "1px solid var(--line)", borderRadius: "var(--radius)",
                padding: "18px 20px", marginBottom: 14,
              }}
            >
              <p style={{ margin: "0 0 6px", fontWeight: 600, fontSize: 16.5 }}>{item.what}</p>
              <p style={{ margin: 0, color: "var(--muted)", fontSize: 15.5, lineHeight: 1.65 }}>
                {item.why}
              </p>
            </div>
          ))}
          <p style={{ color: "var(--muted)", fontSize: 15, lineHeight: 1.7, marginTop: 16 }}>
            Neither carries your name, your photo or any way to reach you. We also
            keep a minimal record that a deletion happened, which is what lets us
            show we acted on your request.
          </p>
        </section>

        <p style={{ marginTop: 48, fontSize: 14.5, color: "var(--muted)" }}>
          Questions about your data? Write to{" "}
          <a href="mailto:hello@nehzn.com" style={{ color: "var(--teal)" }}>
            hello@nehzn.com
          </a>
          .
        </p>
      </div>
    </main>
  );
}
