"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ArrowDownRight,
  ArrowRight,
  ChevronRight,
  Compass,
  Dice5,
  Heart,
  Menu,
  Music2,
  Sparkles,
  Check,
  X,
} from "lucide-react";

import { SuggestionForm } from "@/components/suggestion-form";
import { WaitlistForm } from "@/components/waitlist-form";

/** Self-hosted rather than hotlinked, so the page never depends on a CDN. */
const photos = {
  coffee: "/photos/coffee.jpg",
  city: "/photos/city.jpg",
  walk: "/photos/walk.jpg",
  cafe: "/photos/cafe.jpg",
  // Faces get their own frames — a scene crops badly into a 128px circle.
  alex: "/photos/portrait-a.jpg",
  sam: "/photos/portrait-b.jpg",
  mina: "/photos/portrait-c.jpg",
};

type Choice = { left: string; right: string; note: string };

const choices: Choice[] = [
  { left: "Coffee", right: "Chai", note: "A tiny preference, already telling a story." },
  { left: "Mountains", right: "Beach", note: "The places we choose shape the way we wander." },
  { left: "Plan ahead", right: "Go with the flow", note: "There is more than one way to move through a day." },
  {
    left: "Find the playlist",
    right: "Find the view",
    note: "Sometimes a feeling arrives through sound. Sometimes through a place.",
  },
];

const dicePrompts = [
  "Find something you have never noticed before.",
  "Take the long way home today.",
  "Ask someone what they are listening to.",
  "Notice the colour you keep seeing.",
  "Make one ordinary moment memorable.",
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main>
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Hero />
      <ChoiceSection />
      <IdeaSection />
      <HowSection />
      <TodaySection />
      <DiscoverSection />
      <PrivacySection />
      <SuggestionSection />
      <WaitlistSection />
      <Footer />
    </main>
  );
}

/* ------------------------------------------------------------- header ---- */

function Header({
  menuOpen,
  setMenuOpen,
}: {
  menuOpen: boolean;
  setMenuOpen: (fn: (open: boolean) => boolean) => void;
}) {
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Nehzn — home">
        <Image className="brand-mark" src="/brand/mark.svg" alt="" width={38} height={26} priority />
        <Image
          className="brand-wordmark"
          src="/brand/wordmark.svg"
          alt="Nehzn"
          width={113}
          height={14}
          priority
        />
      </a>
      <nav className={menuOpen ? "nav-links nav-open" : "nav-links"} aria-label="Main">
        <a href="#how-it-works" onClick={() => setMenuOpen(() => false)}>How it works</a>
        <a href="#discover" onClick={() => setMenuOpen(() => false)}>Discover</a>
        <a href="#about" onClick={() => setMenuOpen(() => false)}>About</a>
      </nav>
      {/* No "Log in": the app isn't open yet, and a door that leads nowhere is
          the fastest way to lose someone's trust. */}
      <a className="button button-small header-cta" href="#waitlist">
        Join the waitlist <ArrowRight size={15} />
      </a>
      <button
        className="menu-button"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((open) => !open)}
      >
        {menuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>
    </header>
  );
}

/* --------------------------------------------------------------- hero ---- */

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-copy">
        <p className="eyebrow">A different way to discover</p>
        <h1>
          People are more than a <em>profile.</em>
        </h1>
        <p className="hero-text">
          Nehzn helps you discover the little things that connect you to people
          you might naturally click with.
        </p>
        <div className="hero-actions">
          <a className="button" href="#waitlist">
            Join the waitlist <ArrowRight size={17} />
          </a>
          <a className="text-link" href="#experience">
            Explore Nehzn <ArrowDownRight size={17} />
          </a>
        </div>
        <div className="hero-aside">
          <span className="signal-dot" /> Not a dating app. Not another feed. Something more human.
        </div>
      </div>

      <div className="hero-collage" aria-hidden="true">
        <div className="collage-orbit orbit-one" />
        <div className="collage-orbit orbit-two" />
        <figure className="photo photo-one">
          <Image src={photos.coffee} alt="" fill sizes="210px" priority />
          <figcaption>
            <span>Coffee, oat milk</span>
            <b>01</b>
          </figcaption>
        </figure>
        <figure className="photo photo-two">
          <Image src={photos.city} alt="" fill sizes="195px" />
          <figcaption>
            <span>Wander after dark</span>
            <b>02</b>
          </figcaption>
        </figure>
        <figure className="photo photo-three">
          <Image src={photos.walk} alt="" fill sizes="215px" />
          <figcaption>
            <span>Walk the long way</span>
            <b>03</b>
          </figcaption>
        </figure>
        <div className="connection-line line-one">
          <span>same little ritual</span>
        </div>
        <div className="connection-line line-two">
          <span>unexpected signal</span>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- choice ---- */

function ChoiceSection() {
  const [active, setActive] = useState(0);
  const [picked, setPicked] = useState<string[]>([]);

  const choose = (value: string) => {
    if (picked[active]) return;
    setPicked((current) => [...current, value]);
    if (active < choices.length - 1) {
      window.setTimeout(() => setActive((current) => current + 1), 380);
    }
  };

  const answered = Boolean(picked[active]);
  const progress = ((active + (answered ? 1 : 0)) / choices.length) * 100;

  return (
    <section className="choice-section section-pad" id="experience">
      <div className="section-intro centered">
        <p className="eyebrow">Try a tiny signal</p>
        <h2>
          Let&rsquo;s start with something <em>small.</em>
        </h2>
        <p>No profile. No sign-up. Just a choice.</p>
      </div>

      <div className="choice-card">
        <div className="choice-topline">
          <span>0{active + 1} / 0{choices.length}</span>
          <span>THIS OR THAT</span>
        </div>
        <div className="choice-progress">
          <span style={{ width: `${progress}%` }} />
        </div>

        {answered ? (
          <div className="choice-confirmation">
            <Check size={22} />
            <p>{choices[active].note}</p>
          </div>
        ) : (
          <>
            <h3>
              What feels like you <span>today?</span>
            </h3>
            <div className="choice-options">
              <button onClick={() => choose(choices[active].left)}>
                {choices[active].left}
                <ArrowRight size={17} />
              </button>
              <div className="or">or</div>
              <button onClick={() => choose(choices[active].right)}>
                {choices[active].right}
                <ArrowRight size={17} />
              </button>
            </div>
          </>
        )}
      </div>

      <div className={picked.length === choices.length ? "choice-result visible" : "choice-result"}>
        <Sparkles size={17} />
        <span>Interesting.</span>
        <strong>Those little choices say more than you think.</strong>
        <p>Nehzn looks for patterns in the little things — not labels.</p>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- idea ---- */

function IdeaSection() {
  return (
    <section className="idea-section section-pad" id="about">
      <div className="idea-visual" aria-hidden="true">
        <div className="profile-card">
          <div className="profile-head">
            <div className="mini-avatar">
              <Image src={photos.alex} alt="" width={25} height={25} />
            </div>
            <span>Alex, 28</span>
            <span className="profile-menu">•••</span>
          </div>
          <div className="profile-image">
            <Image src={photos.cafe} alt="" width={305} height={220} />
          </div>
          <div className="profile-tags">
            <span>Music</span>
            <span>Travel</span>
            <span>Good food</span>
          </div>
          <p>Always looking for the next good place.</p>
        </div>
        <div className="signal-stack">
          <div>
            <Music2 size={17} />
            <span>same song on repeat</span>
          </div>
          <div>
            <Compass size={17} />
            <span>takes the scenic route</span>
          </div>
          <div>
            <Heart size={17} />
            <span>orders dessert first</span>
          </div>
        </div>
      </div>

      <div className="idea-copy">
        <p className="eyebrow">The big idea</p>
        <h2>
          What if discovering people didn&rsquo;t start with a <em>profile?</em>
        </h2>
        <p>A profile tells people what you want them to know.</p>
        <p className="big-line">Life reveals the rest.</p>
        <div className="idea-footnote">
          <span className="number">01</span>
          <span>
            Choices, rhythms, places, little unexpected decisions. The parts that
            feel most like you are often the parts you never think to list.
          </span>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- how ---- */

const steps = [
  {
    n: "01",
    icon: <Sparkles size={23} />,
    title: "Show a little.",
    body: "Create a profile. Choose what you want to share, and keep the rest for later.",
  },
  {
    n: "02",
    icon: <Compass size={23} />,
    title: "Live normally.",
    body: "Make choices. Answer small questions. Notice things. Try something new.",
  },
  {
    n: "03",
    icon: <Heart size={23} />,
    title: "Discover naturally.",
    body: "Find people who might genuinely click with the way you move through the world.",
  },
];

function HowSection() {
  return (
    <section className="how-section section-pad" id="how-it-works">
      <div className="section-intro">
        <p className="eyebrow">How Nehzn works</p>
        <h2>
          Less filling out.
          <br />
          <em>More living.</em>
        </h2>
      </div>

      <div className="steps">
        {steps.map((step, index) => (
          <div key={step.n} style={{ display: "contents" }}>
            <article className="step">
              <span>{step.n}</span>
              <div className="step-icon">{step.icon}</div>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </article>
            {index < steps.length - 1 ? (
              <div className="step-arrow" aria-hidden="true">
                <ArrowRight size={23} />
              </div>
            ) : null}
          </div>
        ))}
      </div>

      <div className="flow-labels" aria-hidden="true">
        <span>PROFILE</span>
        <ArrowRight size={15} />
        <span>LITTLE SIGNALS</span>
        <ArrowRight size={15} />
        <span>DISCOVERY</span>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- today ---- */

function TodaySection() {
  const [diceMessage, setDiceMessage] = useState("Roll for a small detour");

  const rollDice = () =>
    setDiceMessage(dicePrompts[Math.floor(Math.random() * dicePrompts.length)]);

  return (
    <section className="today-section section-pad">
      <div className="today-copy">
        <p className="eyebrow">The today experience</p>
        <h2>
          Something interesting, <em>every day.</em>
        </h2>
        <p>
          Daily Pings, unexpected choices, and tiny prompts help Nehzn understand
          your vibe without asking you to fill out an endless personality test.
        </p>
        <button className="button" onClick={rollDice}>
          <Dice5 size={17} /> Roll the dice
        </button>
      </div>

      <div className="phone-shell" aria-hidden="true">
        <div className="phone-top">
          <div className="mini-avatar">
            <Image src={photos.mina} alt="" width={25} height={25} />
          </div>
          <Image src="/brand/mark.svg" alt="" width={34} height={24} />
          <span>•••</span>
        </div>

        <div className="ping-card">
          <div className="ping-photo">
            <Image src={photos.city} alt="" fill sizes="300px" />
          </div>
          <span className="tiny-label">
            <Sparkles size={12} /> DAILY PING
          </span>
          <h3>
            Something red near you
            <br />
            <em>go find it.</em>
          </h3>
          <p>Capture the moment. Be the first to share your view today.</p>
          <button>
            Respond now <ArrowRight size={13} />
          </button>
        </div>

        <div className="mini-card choice-mini">
          <div>
            <span className="tiny-label green">LIVE FLOW</span>
            <h4>This-or-That Rush</h4>
          </div>
          <Sparkles size={18} />
        </div>

        <div className="mini-card dice-mini">
          <div>
            <span className="tiny-label coral">CHANCE ENCOUNTER</span>
            <h4>Dice Day</h4>
            <p>{diceMessage}</p>
          </div>
          <button className="dice-button" onClick={rollDice} aria-label="Roll the dice">
            <Dice5 size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------- discover ---- */

function DiscoverSection() {
  const [revealed, setRevealed] = useState(0);

  return (
    <section className="discover-section section-pad" id="discover">
      <div className="section-intro centered">
        <p className="eyebrow">The unexpected part</p>
        <h2>
          Sometimes the interesting person isn&rsquo;t who you <em>expected.</em>
        </h2>
        <p>Two people. A few small signals. A reason to say hello.</p>
      </div>

      <div className="discovery-card">
        <div className="person person-a">
          <div className="person-photo">
            <Image src={photos.sam} alt="" width={128} height={128} />
          </div>
          <span>Sam</span>
          <small>late-night wanderer</small>
        </div>

        <div className="shared-signals">
          <span className={revealed >= 1 ? "revealed" : ""}>
            <Music2 size={16} /> Same song choice
          </span>
          <span className={revealed >= 2 ? "revealed" : ""}>
            <Compass size={16} /> Similar rhythm
          </span>
          <span className={revealed >= 3 ? "revealed" : ""}>
            <Sparkles size={16} /> Same thing today
          </span>
          <button onClick={() => setRevealed((current) => Math.min(current + 1, 3))}>
            {revealed < 3 ? "Reveal a signal" : "You might click"} <ArrowRight size={15} />
          </button>
        </div>

        <div className="person person-b">
          <div className="person-photo">
            <Image src={photos.mina} alt="" width={128} height={128} />
          </div>
          <span>Mina</span>
          <small>always finds the good light</small>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ privacy ---- */

function PrivacySection() {
  return (
    <section className="privacy-section section-pad">
      <div className="privacy-copy">
        <p className="eyebrow">Connection, at your pace</p>
        <h2>
          You decide what people <em>discover</em> about you.
        </h2>
        <p>
          Share what feels right. Reveal more when it feels right. Nehzn is built
          for curiosity, not oversharing.
        </p>
        <div className="reveal-steps">
          <span className="active">Stranger</span>
          <ChevronRight size={15} />
          <span className="active">Discovery</span>
          <ChevronRight size={15} />
          <span>Match</span>
          <ChevronRight size={15} />
          <span>Connection</span>
        </div>
      </div>

      <div className="reveal-card" aria-hidden="true">
        <div className="reveal-header">
          <span className="privacy-pill">
            <span /> private by default
          </span>
          <span>•••</span>
        </div>
        <div className="reveal-body">
          <div className="reveal-avatar">
            <Image src={photos.alex} alt="" width={52} height={52} />
          </div>
          <div>
            <strong>Alex is nearby.</strong>
            <p>They also chose the long way home.</p>
          </div>
        </div>
        <div className="reveal-controls">
          <span>Share this signal</span>
          <div className="toggle">
            <span />
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------- suggestion ---- */

function SuggestionSection() {
  return (
    <section className="suggestion-section section-pad" id="suggest">
      <div className="suggestion-heading">
        <span className="section-number">04</span>
        <div>
          <p className="eyebrow">Help shape the beginning</p>
          <h2>
            What would make Nehzn more <em>interesting</em> to you?
          </h2>
        </div>
      </div>
      <SuggestionForm />
    </section>
  );
}

/* ----------------------------------------------------------- waitlist ---- */

function WaitlistSection() {
  return (
    <section className="waitlist-section section-pad" id="waitlist">
      <div className="waitlist-mark">
        <Image src="/brand/mark.svg" alt="" width={70} height={48} />
      </div>
      <div className="waitlist-content">
        <p className="eyebrow">Be part of the beginning</p>
        <h2>
          Want to be there from the <em>beginning?</em>
        </h2>
        <p>
          Nehzn is being built now. Join the waitlist and help shape what comes
          next.
        </p>
        <WaitlistForm />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- footer ---- */

function Footer() {
  return (
    <footer className="site-footer">
      <a className="brand" href="#top">
        <Image className="brand-mark" src="/brand/mark.svg" alt="" width={38} height={26} />
        <Image className="brand-wordmark" src="/brand/wordmark.svg" alt="Nehzn" width={113} height={14} />
      </a>
      <div className="footer-links">
        <a href="#about">About</a>
        <a href="#how-it-works">How it works</a>
        <a href="#discover">Discover</a>
        <a href="#suggest">Suggest something</a>
        <a href="mailto:hello@nehzn.com">Contact</a>
      </div>
      <span className="footer-note">The little things connect us.</span>
    </footer>
  );
}
