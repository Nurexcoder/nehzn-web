"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { waitlistSchema, type WaitlistInput } from "@/lib/schemas";

/**
 * Join the waitlist.
 *
 * Only the email is required. The optional fields are worth asking for because
 * a waitlist of addresses tells you nothing, while "New Town, wants people who
 * run early" tells you who to open with — but making them mandatory would cost
 * signups, so they stay behind a disclosure.
 */
export function WaitlistForm() {
  const [done, setDone] = useState<{ position: number | null } | null>(null);
  const [expanded, setExpanded] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<WaitlistInput>({
    resolver: zodResolver(waitlistSchema),
    defaultValues: { email: "", name: "", city: "", lookingFor: "", company: "" },
    mode: "onSubmit",
  });

  async function onSubmit(values: WaitlistInput) {
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data?.error ?? "That didn't go through. Try again in a moment.");
        return;
      }
      setDone({ position: data.position ?? null });
      toast.success(data.alreadyJoined ? "You were already on the list." : "You're on the list.");
    } catch {
      toast.error("Could not reach us just now. Check your connection and try again.");
    }
  }

  if (done) {
    return (
      <div className="waitlist-success">
        <div className="signal-burst">
          <Check size={24} />
        </div>
        <h3>You&rsquo;re on the list.</h3>
        {done.position ? <p className="waitlist-position">#{done.position}</p> : null}
        <span>One email when we open. Nothing else, ever.</span>
      </div>
    );
  }

  return (
    <form className="waitlist-form" onSubmit={handleSubmit(onSubmit)} noValidate>
      {/* Honeypot — hidden from people, irresistible to bots. */}
      <div style={{ position: "absolute", left: -9999, top: 0 }} aria-hidden="true">
        <label htmlFor="wl-company">Company</label>
        <input id="wl-company" tabIndex={-1} autoComplete="off" {...register("company")} />
      </div>

      <input
        id="wl-email"
        type="email"
        inputMode="email"
        autoComplete="email"
        placeholder="you@domain.com"
        aria-invalid={Boolean(errors.email)}
        aria-describedby={errors.email ? "wl-email-error" : undefined}
        {...register("email")}
      />
      {errors.email ? (
        <span id="wl-email-error" role="alert" className="field-error">
          {errors.email.message}
        </span>
      ) : null}

      {expanded ? (
        <>
          <div className="input-row" style={{ marginTop: 12 }}>
            <input id="wl-name" placeholder="First name" autoComplete="given-name" {...register("name")} />
            <input id="wl-city" placeholder="City" autoComplete="address-level2" {...register("city")} />
          </div>
          <textarea
            id="wl-looking"
            rows={3}
            placeholder="What would you want to find? People who run early, someone to go to gigs with…"
            style={{ marginTop: 12 }}
            {...register("lookingFor")}
          />
          {errors.lookingFor ? (
            <span role="alert" className="field-error">
              {errors.lookingFor.message}
            </span>
          ) : null}
        </>
      ) : (
        <button type="button" className="more-toggle" onClick={() => setExpanded(true)}>
          Tell us a bit more (optional)
        </button>
      )}

      <button type="submit" className="button button-light" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 size={16} className="animate-spin" /> Joining
          </>
        ) : (
          <>
            Join the waitlist <ArrowRight size={16} />
          </>
        )}
      </button>

      <span className="form-note">One email when we open. Nothing else, ever.</span>
    </form>
  );
}
