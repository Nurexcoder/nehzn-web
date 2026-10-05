import type { Metadata } from "next";

import {
  Callout,
  GRIEVANCE_EMAIL,
  GRIEVANCE_OFFICER,
  JURISDICTION,
  LegalPage,
  OPERATOR,
  OPERATOR_FORM,
  REGISTERED_ADDRESS,
  Section,
} from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Terms of use — Nehzn",
  description: "The agreement between you and Nehzn: who can use it, what is expected, and what happens when it goes wrong.",
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of use"
      intro="The agreement between you and us. Written to be read, not to be skipped."
    >
      <Section title="Who you are agreeing with">
        <p>
          Nehzn is operated by {OPERATOR} ({OPERATOR_FORM}), {REGISTERED_ADDRESS}. In
          these terms &ldquo;we&rdquo; and &ldquo;us&rdquo; mean that operator, and
          &ldquo;you&rdquo; means the person using the app. Creating an account means you
          accept these terms.
        </p>
      </Section>

      <Section title="You must be 18">
        <p>
          Nehzn is for adults. You confirm you are 18 or over when you give your date of
          birth. If we find an account belonging to someone younger, we remove it, and
          the data goes with it.
        </p>
      </Section>

      <Section title="Your account">
        <p>
          You sign in with a code sent to your phone number or email, so there is no
          password to lose — but anyone with access to that inbox can get into your
          account. Keep it secure. One account per person. Do not pretend to be somebody
          else, and do not use someone else&rsquo;s photos.
        </p>
      </Section>

      <Section title="What you post">
        <p>
          What you write and photograph stays yours. To run the service we need your
          permission to store it and show it to the people you have chosen to show it to
          — nothing more. We do not use your photos in advertising, and we do not license
          them to anyone else.
        </p>
        <p>
          That permission ends when you delete the content or your account, except where
          we must briefly keep something to comply with the law.
        </p>
        <p>
          You are responsible for what you post, and you must have the right to post it.
          What is not allowed is set out in our{" "}
          <a href="/community-guidelines" style={{ color: "var(--teal)" }}>
            community guidelines
          </a>
          , which form part of these terms.
        </p>
      </Section>

      <Section title="Meeting people">
        <Callout>
          Nehzn helps you find people. It does not vet them. We do not run background
          checks, and we cannot promise anyone is who they say they are. Meet in public
          the first time, tell someone where you are going, and leave if you feel
          uneasy. Your safety is your own judgement to exercise.
        </Callout>
      </Section>

      <Section title="Hotspots end">
        <p>
          A hotspot lives for seven days and then closes. That is the design, not a
          fault. Content in a closed room is deleted 30 days later, so do not treat a
          room as storage for anything you want to keep.
        </p>
      </Section>

      <Section title="What we may do">
        <p>
          We can remove content, suspend an account or end access where someone breaks
          these terms or the guidelines, or where we reasonably believe somebody is at
          risk. Where it is fair to do so, we will say why.
        </p>
        <p>
          We can change or discontinue features. If a change materially reduces what the
          service does, we will say so in the app rather than let you discover it.
        </p>
      </Section>

      <Section title="Leaving">
        <p>
          You can delete your account at any time, in the app under You, or at{" "}
          <a href="/delete-account" style={{ color: "var(--teal)" }}>
            nehzn.com/delete-account
          </a>
          . It happens immediately and cannot be undone.
        </p>
      </Section>

      <Section title="What we do not promise">
        <p>
          Nehzn is provided as it is. We do not promise it will be uninterrupted, that
          you will meet anyone, or that everything you see is accurate. To the extent the
          law allows, we are not liable for indirect or consequential loss. Nothing here
          limits liability that cannot lawfully be limited, including for death or
          personal injury caused by negligence, or for fraud.
        </p>
      </Section>

      <Section title="Complaints">
        <p>
          Our Grievance Officer is {GRIEVANCE_OFFICER}, reachable at{" "}
          <a href={`mailto:${GRIEVANCE_EMAIL}`} style={{ color: "var(--teal)" }}>
            {GRIEVANCE_EMAIL}
          </a>
          . We acknowledge complaints within 24 hours and aim to resolve them within 15
          days, as India&rsquo;s Information Technology Rules require.
        </p>
      </Section>

      <Section title="Changes, and the law that applies">
        <p>
          If we change these terms we will update this page and, where the change matters,
          tell you in the app. Continuing to use Nehzn after that means you accept the
          new terms. These terms are governed by the laws of India, and the courts of{" "}
          {JURISDICTION} have exclusive jurisdiction.
        </p>
      </Section>
    </LegalPage>
  );
}
