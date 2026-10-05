import type { Metadata } from "next";

import {
  Callout,
  GRIEVANCE_EMAIL,
  GRIEVANCE_OFFICER,
  LegalPage,
  Section,
} from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Community guidelines — Nehzn",
  description: "What belongs on Nehzn, what does not, and what happens when someone crosses the line.",
};

/**
 * The prohibited categories below are written in plain language, but they
 * deliberately cover everything India's Information Technology Rules, 2021
 * require an intermediary to tell its users not to host.
 */
const NOT_ALLOWED: [string, string][] = [
  ["Anything involving a child", "Sexual content involving minors, or anything that puts a child at risk, is reported to the authorities and the account is removed permanently. There is no second chance for this."],
  ["Harassment and threats", "Abusing, intimidating, stalking or threatening someone. Repeatedly contacting a person who has stopped replying counts."],
  ["Hate", "Attacking people for their religion, caste, race, ethnicity, gender, sexuality, disability or where they come from."],
  ["Sexual content", "Nudity, pornography, and sexual content sent to someone who did not ask for it."],
  ["Someone else's private information", "Addresses, phone numbers, documents or photographs of a person who has not agreed to them being shared."],
  ["Pretending to be someone else", "Impersonating another person, using their photos, or claiming an identity that is not yours."],
  ["Deliberate falsehoods", "Knowingly posting something untrue in order to mislead or to cause harm."],
  ["Scams and money", "Fraud, phishing, money laundering, gambling, and recruiting people into schemes."],
  ["Spam and selling", "Advertising, bulk messaging, or using Nehzn to promote a business."],
  ["Violence", "Encouraging or threatening violence, and content that supports terrorism or endangers the unity, integrity, defence or security of India."],
  ["Content that is not yours", "Posting work that belongs to somebody else without permission."],
  ["Anything that attacks the service", "Malicious software, scraping, automated accounts, or attempts to break the app."],
];

export default function GuidelinesPage() {
  return (
    <LegalPage
      title="Community guidelines"
      intro="Nehzn works because people show up as themselves. These are the few rules that protect that."
    >
      <Section title="The short version">
        <p>
          Be the person you would want to meet. Answer honestly, use your own photos,
          and treat a stranger&rsquo;s time and attention as something you have been
          lent rather than owed.
        </p>
        <Callout>
          Nobody can message you until you have both waved. If someone makes you
          uncomfortable, block them — they are never told, they simply stop appearing,
          and you stop appearing to them.
        </Callout>
      </Section>

      <Section title="What is not allowed">
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 15.5 }}>
          <tbody>
            {NOT_ALLOWED.map(([what, detail]) => (
              <tr key={what} style={{ borderTop: "1px solid var(--line)" }}>
                <td
                  style={{
                    padding: "14px 14px 14px 0",
                    fontWeight: 600,
                    width: "38%",
                    verticalAlign: "top",
                  }}
                >
                  {what}
                </td>
                <td style={{ padding: "14px 0", color: "var(--muted)", lineHeight: 1.6 }}>
                  {detail}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>

      <Section title="Under 18">
        <p>
          Nehzn is for adults only. If you believe someone on Nehzn is under 18, report
          them — &ldquo;This person is under 18&rdquo; is the first reason in the list.
          We remove accounts we find, and the data goes with them.
        </p>
      </Section>

      <Section title="In hotspots">
        <p>
          A hotspot belongs to whoever is in it. Keep to its topic, do not join a room to
          advertise, and remember a room is a group of people rather than an audience. If
          a room itself is the problem, report the room rather than each message.
        </p>
      </Section>

      <Section title="Reporting">
        <p>
          You can report a person, a room, a message or a photo from inside the app.
          Reports go to us, never to the person reported, and they are never told who
          reported them.
        </p>
        <p>
          Tell us what you can — an optional note helps us understand what we are
          looking at. If somebody is in immediate danger, contact the local authorities
          first; we are not an emergency service.
        </p>
      </Section>

      <Section title="What happens next">
        <p>
          Depending on what happened, we may remove the content, warn the account,
          suspend it, or remove it permanently. Serious cases — anything involving a
          child, or a credible threat to someone&rsquo;s safety — go straight to removal
          and, where appropriate, to the authorities.
        </p>
        <p>
          We keep reports even if the person who filed them later deletes their account,
          so that a pattern of behaviour stays visible. The reporter&rsquo;s identity is
          removed when they leave.
        </p>
      </Section>

      <Section title="If you think we got it wrong">
        <p>
          Write to our Grievance Officer, {GRIEVANCE_OFFICER}, at{" "}
          <a href={`mailto:${GRIEVANCE_EMAIL}`} style={{ color: "var(--teal)" }}>
            {GRIEVANCE_EMAIL}
          </a>
          . We acknowledge within 24 hours and aim to resolve within 15 days.
        </p>
      </Section>
    </LegalPage>
  );
}
