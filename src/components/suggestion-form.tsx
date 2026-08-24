"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Loader2, Send } from "lucide-react";
import { toast } from "sonner";

import { SUGGESTION_KINDS, suggestionSchema, type SuggestionInput } from "@/lib/schemas";

/**
 * The suggestion box.
 *
 * Email is optional and stays optional. People say more when an idea doesn't
 * cost them an address, and the ideas are worth more than the addresses.
 */
export function SuggestionForm() {
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SuggestionInput>({
    resolver: zodResolver(suggestionSchema),
    defaultValues: { message: "", kind: "feature", email: "", name: "", company: "" },
    mode: "onSubmit",
  });

  const kind = watch("kind");

  async function onSubmit(values: SuggestionInput) {
    try {
      const res = await fetch("/api/suggestions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data?.error ?? "That didn't go through. Try again in a moment.");
        return;
      }
      setSent(true);
      reset();
      toast.success("Thanks — a person reads every one of these.");
    } catch {
      toast.error("Could not reach us just now. Check your connection and try again.");
    }
  }

  if (sent) {
    return (
      <div className="suggestion-form">
        <div className="success-message">
          <div className="success-icon">
            <Check size={22} />
          </div>
          <h3>That landed.</h3>
          <p>
            A person reads every suggestion. If we take it on, and you left an
            email, we&rsquo;ll tell you.
          </p>
          <button type="button" className="more-toggle" onClick={() => setSent(false)}>
            Send another
          </button>
        </div>
      </div>
    );
  }

  return (
    <form className="suggestion-form" onSubmit={handleSubmit(onSubmit)} noValidate>
      {/* Honeypot — hidden from people, irresistible to bots. */}
      <div style={{ position: "absolute", left: -9999, top: 0 }} aria-hidden="true">
        <label htmlFor="sg-company">Company</label>
        <input id="sg-company" tabIndex={-1} autoComplete="off" {...register("company")} />
      </div>

      <fieldset style={{ border: 0, padding: 0, margin: 0 }}>
        <legend className="eyebrow" style={{ color: "#8b958f" }}>
          What is it?
        </legend>
        <div className="suggestion-pills">
          {SUGGESTION_KINDS.map((option) => (
            <button
              key={option.value}
              type="button"
              aria-pressed={kind === option.value}
              className={kind === option.value ? "selected" : undefined}
              onClick={() => setValue("kind", option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </fieldset>

      <label htmlFor="sg-message">Your suggestion</label>
      <textarea
        id="sg-message"
        rows={5}
        placeholder="Something you'd want Nehzn to do, something that worries you, or something you'd change…"
        aria-invalid={Boolean(errors.message)}
        {...register("message")}
      />
      {errors.message ? (
        <span role="alert" className="field-error">
          {errors.message.message}
        </span>
      ) : null}

      <div className="field-row">
        <div>
          <input id="sg-name" placeholder="Your name (optional)" {...register("name")} />
        </div>
        <div>
          <input
            id="sg-email"
            type="email"
            placeholder="Email (only for a reply)"
            {...register("email")}
          />
        </div>
      </div>
      {errors.email ? (
        <span role="alert" className="field-error">
          {errors.email.message}
        </span>
      ) : null}

      <button type="submit" className="button" disabled={isSubmitting} style={{ marginTop: 22 }}>
        {isSubmitting ? (
          <>
            <Loader2 size={16} className="animate-spin" /> Sending
          </>
        ) : (
          <>
            Send it <Send size={16} />
          </>
        )}
      </button>

      <span className="form-hint">A person reads every one of these. No auto-reply.</span>
    </form>
  );
}
