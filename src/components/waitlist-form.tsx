"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { waitlistSchema, type WaitlistInput } from "@/lib/schemas";
import { cn } from "@/lib/utils";

/**
 * Join the waitlist.
 *
 * Only the email is required. The optional fields are worth asking for because
 * a waitlist of addresses tells you nothing, while "New Town, wants people who
 * run early" tells you who to open with — but making them mandatory would cost
 * signups, so they stay behind a disclosure.
 */
export function WaitlistForm({ className, compact = false }: { className?: string; compact?: boolean }) {
  const [done, setDone] = useState<{ position: number | null } | null>(null);
  const [expanded, setExpanded] = useState(!compact);

  const form = useForm<WaitlistInput>({
    resolver: zodResolver(waitlistSchema),
    defaultValues: { email: "", name: "", city: "", lookingFor: "", company: "" },
    mode: "onSubmit",
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

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
      <div
        className={cn(
          "rounded-2xl border border-teal/20 bg-teal-wash/60 p-8 text-center shadow-ambient-sm",
          className,
        )}
      >
        <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-teal text-white">
          <Check className="size-6" strokeWidth={2.5} />
        </div>
        <h3 className="mt-5 text-xl font-semibold text-ink">You&rsquo;re on the list.</h3>
        {done.position ? (
          <p className="mt-1 font-display text-3xl font-semibold text-teal">#{done.position}</p>
        ) : null}
        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-ink-faint">
          We&rsquo;ll email you once, when there&rsquo;s something to open. No newsletter, no drip
          campaign. Check your inbox for a confirmation.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("w-full", className)}
      noValidate
    >
      {/* Honeypot — hidden from people, irresistible to bots. */}
      <div className="absolute left-[-9999px] top-0" aria-hidden="true">
        <label htmlFor="wl-company">Company</label>
        <input id="wl-company" tabIndex={-1} autoComplete="off" {...register("company")} />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="flex-1">
          <Label htmlFor="wl-email" className="sr-only">
            Email address
          </Label>
          <Input
            id="wl-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@domain.com"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "wl-email-error" : undefined}
            className="h-13 rounded-full border-border bg-white px-5 text-base shadow-ambient-sm placeholder:text-ink-faint/70"
            {...register("email")}
          />
        </div>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="h-13 rounded-full bg-teal px-7 text-base font-semibold text-white shadow-ambient hover:bg-teal-deep"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="size-4 animate-spin" /> Joining
            </>
          ) : (
            <>
              Join the waitlist <ArrowRight className="size-4" />
            </>
          )}
        </Button>
      </div>

      {errors.email ? (
        <p id="wl-email-error" role="alert" className="mt-2 pl-1 text-sm text-destructive">
          {errors.email.message}
        </p>
      ) : null}

      {compact && !expanded ? (
        <button
          type="button"
          onClick={() => setExpanded(true)}
          className="mt-3 pl-1 text-sm font-medium text-teal underline-offset-4 hover:underline"
        >
          Tell us a bit more (optional)
        </button>
      ) : null}

      {expanded ? (
        <div className="mt-5 grid gap-4 rounded-2xl border border-border bg-white/70 p-5 sm:grid-cols-2">
          <div className="grid gap-1.5">
            <Label htmlFor="wl-name" className="text-xs font-semibold text-ink-soft">
              First name <span className="font-normal text-ink-faint">(optional)</span>
            </Label>
            <Input id="wl-name" placeholder="Reina" autoComplete="given-name" {...register("name")} />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="wl-city" className="text-xs font-semibold text-ink-soft">
              City <span className="font-normal text-ink-faint">(optional)</span>
            </Label>
            <Input id="wl-city" placeholder="Kolkata" autoComplete="address-level2" {...register("city")} />
          </div>
          <div className="grid gap-1.5 sm:col-span-2">
            <Label htmlFor="wl-looking" className="text-xs font-semibold text-ink-soft">
              What would you want to find? <span className="font-normal text-ink-faint">(optional)</span>
            </Label>
            <Textarea
              id="wl-looking"
              rows={3}
              placeholder="People who run early, someone to go to gigs with…"
              className="resize-none"
              {...register("lookingFor")}
            />
            {errors.lookingFor ? (
              <p role="alert" className="text-sm text-destructive">
                {errors.lookingFor.message}
              </p>
            ) : null}
          </div>
        </div>
      ) : null}

      <p className="mt-3 pl-1 text-xs text-ink-faint">
        One email when we open. Nothing else, ever.
      </p>
    </form>
  );
}
