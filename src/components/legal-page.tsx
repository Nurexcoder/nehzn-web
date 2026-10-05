import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Shared frame for the privacy policy, terms and community guidelines.
 *
 * The operator's details live here rather than in three places, because the
 * three documents must never disagree about who is collecting the data, who
 * the user is contracting with, and who answers a complaint.
 *
 * TODO before launch — the two fields below are placeholders:
 *   • REGISTERED_ADDRESS: the address you actually trade from. Required by the
 *     DPDP Rules and India's IT Rules, and it must be real.
 *   • GRIEVANCE_EMAIL: a mailbox somebody reads. The IT Rules give you 24
 *     hours to acknowledge a complaint and 15 days to resolve it.
 */
export const OPERATOR = "Hibjul Ahmed";
export const OPERATOR_FORM = "sole proprietor, trading as Nehzn";
export const REGISTERED_ADDRESS = "[registered address — to be filled in]";
export const GRIEVANCE_OFFICER = "Hibjul Ahmed";
export const GRIEVANCE_EMAIL = "grievance@nehzn.com";
export const PRIVACY_EMAIL = "privacy@nehzn.com";
export const JURISDICTION = "Kolkata, West Bengal, India";
export const LAST_UPDATED = "5 October 2026";

export function LegalPage({
  title,
  intro,
  children,
}: {
  title: string;
  intro: string;
  children: ReactNode;
}) {
  return (
    <main style={{ minHeight: "100vh", background: "var(--ivory)", color: "var(--ink)" }}>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "48px 24px 96px" }}>
        <Link
          href="/"
          style={{ display: "inline-flex", alignItems: "center", gap: 10, textDecoration: "none" }}
        >
          <Image src="/brand/mark.svg" alt="" width={34} height={24} />
          <span
            style={{
              fontWeight: 600,
              letterSpacing: "0.12em",
              fontSize: 14,
              color: "var(--ink)",
            }}
          >
            NEHZN
          </span>
        </Link>

        <h1 style={{ fontSize: 38, lineHeight: 1.15, margin: "36px 0 10px", fontWeight: 600 }}>
          {title}
        </h1>
        <p style={{ fontSize: 17, lineHeight: 1.6, color: "var(--muted)", margin: "0 0 6px" }}>
          {intro}
        </p>
        <p style={{ fontSize: 14, color: "var(--muted)", margin: 0 }}>
          Last updated {LAST_UPDATED}.
        </p>

        <div
          style={{
            marginTop: 36,
            fontSize: 16.5,
            lineHeight: 1.75,
          }}
        >
          {children}
        </div>

        <nav
          style={{
            marginTop: 56,
            paddingTop: 20,
            borderTop: "1px solid var(--line)",
            display: "flex",
            gap: 20,
            flexWrap: "wrap",
            fontSize: 14.5,
          }}
        >
          <Link href="/privacy" style={{ color: "var(--teal)" }}>
            Privacy
          </Link>
          <Link href="/terms" style={{ color: "var(--teal)" }}>
            Terms
          </Link>
          <Link href="/community-guidelines" style={{ color: "var(--teal)" }}>
            Community guidelines
          </Link>
          <Link href="/delete-account" style={{ color: "var(--teal)" }}>
            Delete your account
          </Link>
        </nav>
      </div>
    </main>
  );
}

/** A titled section. Headings are consistent across all three documents. */
export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section style={{ marginTop: 34 }}>
      <h2 style={{ fontSize: 21, fontWeight: 600, margin: "0 0 12px", lineHeight: 1.3 }}>
        {title}
      </h2>
      {children}
    </section>
  );
}

/** Something the reader must not skim past. */
export function Callout({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid var(--line)",
        borderRadius: "var(--radius)",
        padding: "16px 18px",
        margin: "16px 0",
        fontSize: 15.5,
        lineHeight: 1.65,
      }}
    >
      {children}
    </div>
  );
}
