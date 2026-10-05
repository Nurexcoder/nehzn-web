import type { Metadata } from "next";

import {
  Callout,
  GRIEVANCE_EMAIL,
  GRIEVANCE_OFFICER,
  JURISDICTION,
  LegalPage,
  OPERATOR,
  OPERATOR_FORM,
  PRIVACY_EMAIL,
  REGISTERED_ADDRESS,
  Section,
} from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Privacy policy — Nehzn",
  description:
    "What Nehzn collects, why, how long it is kept, and the rights you have over it.",
};

/** Every item of data the app stores, matching the fields the server holds. */
const COLLECTED: [string, string][] = [
  ["Phone number or email", "Signing you in, and reaching you about the service."],
  ["Name and date of birth", "Your profile. Your age is worked out from the date and shown; the date itself is not."],
  ["Gender and pronouns", "Your profile, and the discovery preferences of others."],
  ["Photos", "Your profile. You choose how many and who sees them."],
  ["Interests, prompt answers, languages, beliefs, education, work, hometown", "Your profile, and finding people with something in common."],
  ["Approximate location and city", "Showing how far away someone is, and checking you are inside a hotspot's radius when you join."],
  ["Daily ping answers, including photos", "The daily loop, and the feed of nearby answers."],
  ["This-or-that choices, and how quickly you made them", "Matching. Speed is a rhythm signal: it is never scored and never shown to anyone."],
  ["The time of day you use the app", "Matching, and your own rhythm chart."],
  ["Waves, connections and blocks", "Discovery and safety."],
  ["Messages you send", "Delivering them to the conversation."],
  ["Hotspot and community membership, posts and polls", "Running those rooms."],
  ["Reports you file", "Keeping people safe."],
  ["Records of access to personal data", "Detecting and investigating unauthorised access, as the DPDP Rules require."],
];

/** The periods enforced by the server, not aspirations. */
const RETENTION: [string, string][] = [
  ["Hotspot rooms and everything in them", "30 days after the room's seven-day life ends"],
  ["Daily ping answers and their photos", "180 days"],
  ["How quickly you made a choice", "90 days, then the timing is erased and only the choice remains"],
  ["Echoes and waves", "90 days"],
  ["Sign-in codes", "Erased as soon as they expire"],
  ["Uploads never attached to anything", "7 days"],
  ["Records of access to personal data", "1 year, the minimum the DPDP Rules set"],
  ["Everything else", "Until you delete your account"],
];

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy policy"
      intro="What Nehzn collects, why, how long it is kept, and what you can make us do about it."
    >
      <Section title="Who is responsible">
        <p>
          Nehzn is operated by {OPERATOR} ({OPERATOR_FORM}), {REGISTERED_ADDRESS}. Under
          India&rsquo;s Digital Personal Data Protection Act, 2023 we are the Data
          Fiduciary for the information described here, which means we decide what is
          collected and why, and we are answerable for it.
        </p>
        <p>
          Questions about your data go to{" "}
          <a href={`mailto:${PRIVACY_EMAIL}`} style={{ color: "var(--teal)" }}>
            {PRIVACY_EMAIL}
          </a>
          . Complaints go to our Grievance Officer, {GRIEVANCE_OFFICER}, at{" "}
          <a href={`mailto:${GRIEVANCE_EMAIL}`} style={{ color: "var(--teal)" }}>
            {GRIEVANCE_EMAIL}
          </a>
          .
        </p>
      </Section>

      <Section title="Nehzn is for adults">
        <p>
          You must be 18 or over to use Nehzn. We do not knowingly keep accounts for
          anyone younger, and we remove those we find. If you believe someone under 18
          is using Nehzn, report them in the app or write to us.
        </p>
      </Section>

      <Section title="What we collect, and what each part is for">
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 15.5 }}>
          <tbody>
            {COLLECTED.map(([what, why]) => (
              <tr key={what} style={{ borderTop: "1px solid var(--line)" }}>
                <td style={{ padding: "12px 14px 12px 0", fontWeight: 600, width: "42%", verticalAlign: "top" }}>
                  {what}
                </td>
                <td style={{ padding: "12px 0", color: "var(--muted)", lineHeight: 1.6 }}>{why}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Callout>
          We ask for this on the basis of your consent, which you give on a screen of its
          own before anything is collected. We keep a record of which version of that
          notice you agreed to. If we change what we collect, we ask again.
        </Callout>
      </Section>

      <Section title="What we never do">
        <ul style={{ paddingLeft: 22, margin: 0 }}>
          <li>We do not sell your data, and we do not run advertising against it.</li>
          <li>
            We never show anyone your exact location. Other people see a rounded distance,
            such as &ldquo;1.2 km away&rdquo;, and nothing sharper.
          </li>
          <li>We do not track your location in the background. The app asks when it is open.</li>
          <li>
            Nobody can message you until you have both waved. There is no inbox for
            strangers.
          </li>
          <li>
            Your activity score is yours alone. Others see only a broad label, never the
            number.
          </li>
        </ul>
      </Section>

      <Section title="Who else processes it">
        <p>
          We use these services to run Nehzn. They process data on our instructions, and
          some of them operate outside India, which means your data is transferred abroad
          for those purposes.
        </p>
        <ul style={{ paddingLeft: 22, margin: "12px 0 0" }}>
          <li><strong>Amazon Web Services</strong> (Mumbai, India) — the servers and database.</li>
          <li><strong>Cloudflare R2</strong> — photo storage.</li>
          <li><strong>Resend</strong> (United States) — sign-in codes and service email.</li>
          <li><strong>OpenAI</strong> (United States) — writes the daily prompt and checks Stranger Sync proof photos. It is never sent your profile, your name or your messages with other people.</li>
          <li><strong>Ola Maps</strong> (India) — map tiles and place search, requested through our servers so your device is not identified to them.</li>
        </ul>
      </Section>

      <Section title="How long we keep it">
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 15.5 }}>
          <tbody>
            {RETENTION.map(([what, how]) => (
              <tr key={what} style={{ borderTop: "1px solid var(--line)" }}>
                <td style={{ padding: "12px 14px 12px 0", fontWeight: 600, width: "55%", verticalAlign: "top" }}>
                  {what}
                </td>
                <td style={{ padding: "12px 0", color: "var(--muted)" }}>{how}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>

      <Section title="Your rights">
        <p>Under the DPDP Act you can ask us to:</p>
        <ul style={{ paddingLeft: 22, margin: "12px 0" }}>
          <li>
            <strong>Show you what we hold.</strong> The app does this instantly, under
            You &rarr; Your data, including the quiet things like when you tend to open
            the app.
          </li>
          <li>
            <strong>Correct or update anything.</strong> Every field is editable under
            You &rarr; Profile.
          </li>
          <li>
            <strong>Erase it.</strong> Delete your account in the app, or at{" "}
            <a href="/delete-account" style={{ color: "var(--teal)" }}>
              nehzn.com/delete-account
            </a>
            . It is immediate and cannot be undone.
          </li>
          <li>
            <strong>Nominate someone</strong> to exercise these rights for you if you
            cannot. Write to us and we will arrange it.
          </li>
        </ul>
        <p>
          We answer within 90 days, and usually far sooner. Withdrawing your consent is
          the same thing as deleting your account: we would have no basis to keep your
          data, so we do not keep it.
        </p>
      </Section>

      <Section title="If something goes wrong">
        <p>
          If your data is ever exposed, we will tell you without delay — what happened,
          what it means for you, what we have done, and what you can do — and we will
          report it to the Data Protection Board of India within 72 hours.
        </p>
        <p>
          If we have not dealt with your complaint properly, you can complain to the Data
          Protection Board of India.
        </p>
      </Section>

      <Section title="How it is protected">
        <p>
          Access to personal data is logged so that unauthorised access can be detected
          and investigated. Data travels encrypted. Photos are uploaded straight to
          storage without passing through our API, and no map key ships inside the app.
        </p>
      </Section>

      <Section title="Changes, and the law that applies">
        <p>
          If we change this policy in a way that affects what we collect or why, we will
          ask for your consent again rather than quietly update the page. This policy is
          governed by the laws of India, and the courts of {JURISDICTION} have
          jurisdiction.
        </p>
      </Section>
    </LegalPage>
  );
}
