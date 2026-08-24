"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/brand";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "#concept", label: "How it works" },
  { href: "#today", label: "Today" },
  { href: "#discover", label: "Discover" },
  { href: "#safety", label: "Safety" },
];

/**
 * Sticky glass navigation.
 *
 * There is no "Log in" — the app isn't open yet, and offering a door that
 * doesn't lead anywhere is the fastest way to lose someone's trust. The only
 * action is joining the waitlist.
 */
export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-colors duration-300",
        scrolled
          ? "border-b border-border/70 bg-ivory/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="container-page flex h-18 items-center justify-between gap-6 py-4">
        <Logo />

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-ink-soft transition-colors hover:text-teal"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <a
            href="#join"
            className="inline-flex h-11 items-center justify-center rounded-full bg-teal px-6 text-sm font-semibold text-white shadow-ambient-sm transition-colors hover:bg-teal-deep"
          >
            Join the waitlist
          </a>
        </div>

        <button
          type="button"
          className="inline-flex size-10 items-center justify-center rounded-full border border-border text-ink md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open ? (
        <div id="mobile-nav" className="border-t border-border bg-ivory md:hidden">
          <nav className="container-page flex flex-col py-3" aria-label="Mobile">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-3 text-base font-medium text-ink-soft hover:bg-surface-warm hover:text-teal"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#join"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex h-12 items-center justify-center rounded-full bg-teal text-base font-semibold text-white transition-colors hover:bg-teal-deep"
            >
              Join the waitlist
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface-warm">
      <div className="container-page flex flex-col items-center gap-6 py-16 text-center">
        <Logo href={null} />
        <nav className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2" aria-label="Footer">
          {[
            { href: "#concept", label: "How it works" },
            { href: "#safety", label: "Safety" },
            { href: "#suggest", label: "Suggest something" },
            { href: "mailto:hello@nehzn.com", label: "Contact" },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm text-ink-soft transition-colors hover:text-teal"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <p className="text-sm text-ink-faint">
          © {new Date().getFullYear()} Nehzn. Designed for human connection.
        </p>
      </div>
    </footer>
  );
}
