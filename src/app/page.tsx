import {
  Bell,
  Compass,
  Dice5,
  EyeOff,
  Hand,
  MapPin,
  Shield,
  Sparkles,
  Timer,
  Users,
} from "lucide-react";

import { Mark } from "@/components/brand";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { SuggestionForm } from "@/components/suggestion-form";
import { WaitlistForm } from "@/components/waitlist-form";

export default function Home() {
  return (
    <div className="min-h-screen bg-ivory">
      <SiteHeader />
      <main>
        <Hero />
        <Concept />
        <Today />
        <Discover />
        <Safety />
        <Join />
        <Suggest />
      </main>
      <SiteFooter />
    </div>
  );
}

/* -------------------------------------------------------------------------- */

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="eyebrow text-teal">{children}</p>;
}

/**
 * Stands in for the lifestyle photography in the comps. Layered teal washes and
 * one arc echoing the mark — it ships with the site, so there is nothing to
 * license and nothing to load.
 */
function Atmosphere({
  className = "",
  tone = "teal",
}: {
  className?: string;
  tone?: "teal" | "coral";
}) {
  const base =
    tone === "coral"
      ? "from-coral-wash via-ivory to-teal-wash"
      : "from-teal-wash via-ivory to-surface-cool";
  return (
    <div
      className={`relative overflow-hidden rounded-[2rem] bg-gradient-to-br ${base} ${className}`}
      aria-hidden="true"
    >
      {/* Layered light, rather than a picture of anything. */}
      <div className="absolute -right-20 -top-24 size-72 rounded-full bg-white/70 blur-3xl" />
      <div className="absolute right-8 top-12 size-40 rounded-full bg-teal/10 blur-2xl" />
      <div className="absolute -bottom-28 -left-20 size-80 rounded-full bg-coral/10 blur-3xl" />
      <div className="absolute bottom-16 left-10 size-32 rounded-full bg-teal-pale/25 blur-2xl" />

      {/* The mark, echoed small and low — a signature, not a subject. */}
      <svg
        viewBox="0 0 160 111"
        className="absolute bottom-[14%] left-1/2 w-[34%] -translate-x-1/2 opacity-[0.13]"
        fill="none"
      >
        <circle cx="80" cy="23" r="23" className="fill-teal" />
        <path
          d="M9.3 49.6 A74.2 74.2 0 0 0 150.7 49.6"
          className="stroke-charcoal"
          strokeWidth="18.6"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

/* ---------------------------------------------------------------- hero ---- */

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] bg-gradient-to-b from-surface-cool to-transparent" />
      <div className="container-page grid items-center gap-14 py-16 md:py-24 lg:grid-cols-2 lg:gap-20">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-ambient-sm">
            <Sparkles className="size-4 text-coral" />
            <span className="eyebrow text-coral">A new way to connect</span>
          </span>

          <h1 className="mt-7 font-display text-[2.75rem] font-semibold leading-[1.05] text-ink sm:text-6xl">
            Find your people.
            <br />
            <em className="not-italic text-teal">Naturally.</em>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
            People are more than a profile. Nehzn helps you discover the little
            things you have in common — and the people you might naturally click
            with in the real world.
          </p>

          <div className="mt-9 max-w-xl" id="join-top">
            <WaitlistForm compact />
          </div>
        </div>

        <div className="relative">
          <Atmosphere className="aspect-[4/5] w-full shadow-ambient-lg lg:aspect-[4/4.6]" />
          {/* The product's most characteristic moment, floating over the image. */}
          <div className="absolute inset-x-5 bottom-5 rounded-3xl border border-white/60 bg-white/85 p-6 shadow-ambient backdrop-blur-xl sm:inset-x-8 sm:bottom-8">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-2">
                <Bell className="size-3.5 text-coral" />
                <span className="eyebrow text-coral">Daily ping</span>
              </span>
              <span className="text-xs text-ink-faint">just now</span>
            </div>
            <p className="mt-3 font-display text-xl font-semibold leading-snug text-ink">
              Something red near you — go find it
            </p>
            <p className="mt-2 text-sm text-ink-faint">
              One prompt a day. Everyone gets it at the same time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- concept ---- */

const CONCEPT = [
  {
    step: "1",
    label: "What you say",
    title: "Profile & interests",
    body: "The foundation — who you are, what you love, what you're into. A start, not the whole story.",
    icon: Users,
    tone: "teal" as const,
  },
  {
    step: "2",
    label: "What you do",
    title: "Choices & moments",
    body: "A daily ping, ten quick this-or-that picks, the odd dice roll. Thirty seconds that say more than a bio.",
    icon: Compass,
    tone: "coral" as const,
  },
  {
    step: "3",
    label: "What you discover",
    title: "People who fit",
    body: "Echoes — people whose day rhymed with yours. You both wave, or nothing happens at all.",
    icon: Hand,
    tone: "invert" as const,
  },
];

function Concept() {
  return (
    <section id="concept" className="section">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>The Nehzn idea</Eyebrow>
          <h2 className="mt-4 font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">
            The little things tell a bigger story.
          </h2>
        </div>

        <ol className="mt-16 grid gap-6 md:grid-cols-3">
          {CONCEPT.map((item, index) => {
            const invert = item.tone === "invert";
            return (
              <li
                key={item.step}
                className={[
                  "rounded-[2rem] p-8 shadow-ambient",
                  invert ? "bg-teal text-white" : "bg-surface-warm",
                  // A gentle stagger, so the row reads as a sequence.
                  index === 1 ? "md:mt-8" : index === 2 ? "md:mt-16" : "",
                ].join(" ")}
              >
                <span
                  className={[
                    "inline-flex size-12 items-center justify-center rounded-full",
                    invert ? "bg-white/15 text-white" : item.tone === "coral" ? "bg-coral-wash text-coral" : "bg-teal-wash text-teal",
                  ].join(" ")}
                >
                  <item.icon className="size-5" />
                </span>
                <p className={`eyebrow mt-6 ${invert ? "text-white/70" : "text-ink-faint"}`}>
                  {item.step}. {item.label}
                </p>
                <h3
                  className={`mt-2 font-display text-2xl font-semibold ${invert ? "text-white" : "text-ink"}`}
                >
                  {item.title}
                </h3>
                <p className={`mt-3 leading-relaxed ${invert ? "text-white/85" : "text-ink-soft"}`}>
                  {item.body}
                </p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- today ---- */

const TODAY = [
  {
    icon: Bell,
    title: "The Daily Ping",
    body: "One prompt, once a day, for everyone at once. Answer it and you unlock what everyone nearby said.",
  },
  {
    icon: Timer,
    title: "This-or-That",
    body: "Ten binary picks, about twenty seconds. Sunrise or sunset. We never score you on it.",
  },
  {
    icon: Dice5,
    title: "Dice Day",
    body: "One optional micro-adventure. Skipping is free, and always will be.",
  },
];

function Today() {
  return (
    <section id="today" className="section bg-surface-warm">
      <div className="container-page grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <Eyebrow>Thirty seconds a day</Eyebrow>
          <h2 className="mt-4 font-display text-4xl font-semibold leading-tight text-ink sm:text-[2.75rem]">
            Capturing reality, not a curated life.
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
            The Daily Ping isn&rsquo;t about perfect photos. A prompt drops, you
            react, and real moments connect you with people seeing the same
            thing. No streaks. Skipping costs you nothing.
          </p>

          <ul className="mt-10 space-y-6">
            {TODAY.map((item) => (
              <li key={item.title} className="flex gap-4">
                <span className="mt-0.5 inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-white text-teal shadow-ambient-sm">
                  <item.icon className="size-5" />
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold text-ink">{item.title}</h3>
                  <p className="mt-1 leading-relaxed text-ink-soft">{item.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <Atmosphere tone="coral" className="aspect-square w-full shadow-ambient-lg" />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ discover ---- */

const DISCOVER = [
  {
    icon: Hand,
    title: "Wave, never swipe",
    body: "One gesture, and it only means something when it's mutual. Nothing to reject, nothing to be rejected by.",
  },
  {
    icon: EyeOff,
    title: "Reveals are earned",
    body: "Echoes stay anonymous until you both wave. Do a Stranger Sync task and identities unlock together.",
  },
  {
    icon: MapPin,
    title: "Hotspots, for seven days",
    body: "Group rooms pinned to a real place, with the joining rules shown up front. Then they end, on purpose.",
  },
];

function Discover() {
  return (
    <section id="discover" className="section">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>Discover</Eyebrow>
          <h2 className="mt-4 font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">
            Who you are is more than a profile.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-soft">
            No swiping on faces. No bios to perform. Just the quiet overlap
            between two ordinary days.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {DISCOVER.map((item) => (
            <article
              key={item.title}
              className="rounded-[2rem] border border-border bg-white p-8 shadow-ambient-sm transition-shadow hover:shadow-ambient"
            >
              <span className="inline-flex size-12 items-center justify-center rounded-full bg-teal-wash text-teal">
                <item.icon className="size-5" />
              </span>
              <h3 className="mt-6 font-display text-xl font-semibold text-ink">{item.title}</h3>
              <p className="mt-3 leading-relaxed text-ink-soft">{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- safety ---- */

const SAFETY = [
  "Your exact location is never shown to anyone — only a rough distance.",
  "Every profile field has its own audience: everyone, matches, or nobody.",
  "Location is checked once when you join a room, and never tracked after.",
  "Report and block are available on people, rooms, messages and photos.",
];

function Safety() {
  return (
    <section id="safety" className="section bg-surface-warm">
      <div className="container-page grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div>
          <span className="inline-flex size-12 items-center justify-center rounded-full bg-white text-teal shadow-ambient-sm">
            <Shield className="size-5" />
          </span>
          <h2 className="mt-6 font-display text-4xl font-semibold leading-tight text-ink">
            You decide who sees what.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-soft">
            Privacy isn&rsquo;t a settings page you have to go hunting for. It&rsquo;s
            built into how the product works.
          </p>
        </div>

        <ul className="space-y-4">
          {SAFETY.map((line) => (
            <li
              key={line}
              className="flex items-start gap-4 rounded-2xl border border-border bg-white p-5 shadow-ambient-sm"
            >
              <span className="mt-1 size-2 shrink-0 rounded-full bg-teal" />
              <p className="leading-relaxed text-ink-soft">{line}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- join ---- */

function Join() {
  return (
    <section id="join" className="section">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-teal px-6 py-16 text-center shadow-ambient-lg sm:px-16 sm:py-20">
          <div className="pointer-events-none absolute -right-20 -top-24 size-80 rounded-full bg-white/10" />
          <div className="pointer-events-none absolute -bottom-28 -left-20 size-96 rounded-full bg-charcoal/10" />

          <div className="relative mx-auto max-w-2xl">
            <Mark size={44} className="mx-auto brightness-0 invert" />
            <h2 className="mt-7 font-display text-4xl font-semibold leading-tight text-white sm:text-5xl">
              Ready to find your people?
            </h2>
            <p className="mt-4 text-lg text-white/85">
              Nehzn isn&rsquo;t open yet. Leave your email and we&rsquo;ll tell you
              the moment it is.
            </p>

            <div className="mx-auto mt-10 max-w-xl rounded-[1.75rem] bg-white/95 p-6 text-left shadow-ambient sm:p-8">
              <WaitlistForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- suggest ---- */

function Suggest() {
  return (
    <section id="suggest" className="section pt-0">
      <div className="container-page grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div>
          <Eyebrow>Before we build it</Eyebrow>
          <h2 className="mt-4 font-display text-4xl font-semibold leading-tight text-ink">
            Tell us what it should do.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-soft">
            Nehzn is early, which is the useful part — nothing is set yet. If
            there&rsquo;s something you&rsquo;d want it to do, something that worries
            you, or something you&rsquo;d change, say so.
          </p>
          <p className="mt-4 leading-relaxed text-ink-faint">
            You don&rsquo;t need to leave an email. Ideas are worth more than
            addresses.
          </p>
        </div>

        <SuggestionForm />
      </div>
    </section>
  );
}
