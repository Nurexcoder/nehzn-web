"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Loader2, Send } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SUGGESTION_KINDS, suggestionSchema, type SuggestionInput } from "@/lib/schemas";
import { cn } from "@/lib/utils";

/**
 * The suggestion box.
 *
 * Email is optional and stays optional. People say more when an idea doesn't
 * cost them an address, and the ideas are worth more than the addresses.
 */
export function SuggestionForm({ className }: { className?: string }) {
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
  const message = watch("message") ?? "";

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
      <div
        className={cn(
          "rounded-2xl border border-teal/20 bg-white p-8 text-center shadow-ambient-sm",
          className,
        )}
      >
        <div className="mx-auto flex size-11 items-center justify-center rounded-full bg-teal-wash text-teal">
          <Check className="size-5" strokeWidth={2.5} />
        </div>
        <h3 className="mt-4 text-lg font-semibold text-ink">That landed.</h3>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-ink-faint">
          A person reads every suggestion. If we take it on, and you left an
          email, we&rsquo;ll tell you.
        </p>
        <Button
          variant="ghost"
          onClick={() => setSent(false)}
          className="mt-4 rounded-full text-teal hover:bg-teal-wash"
        >
          Send another
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn(
        "rounded-2xl border border-border bg-white p-6 shadow-ambient-sm sm:p-8",
        className,
      )}
      noValidate
    >
      <div className="absolute left-[-9999px] top-0" aria-hidden="true">
        <label htmlFor="sg-company">Company</label>
        <input id="sg-company" tabIndex={-1} autoComplete="off" {...register("company")} />
      </div>

      <fieldset>
        <legend className="eyebrow text-ink-faint">What is it?</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {SUGGESTION_KINDS.map((option) => {
            const active = kind === option.value;
            return (
              <button
                key={option.value}
                type="button"
                aria-pressed={active}
                onClick={() => setValue("kind", option.value)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                  active
                    ? "border-teal bg-teal text-white"
                    : "border-border bg-ivory text-ink-soft hover:border-teal/40 hover:text-teal",
                )}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="mt-6 grid gap-1.5">
        <Label htmlFor="sg-message" className="text-xs font-semibold text-ink-soft">
          Your suggestion
        </Label>
        <Textarea
          id="sg-message"
          rows={5}
          placeholder="Something you'd want Nehzn to do, something that worries you, or something you'd change…"
          aria-invalid={Boolean(errors.message)}
          className="resize-none"
          {...register("message")}
        />
        <div className="flex items-start justify-between gap-3">
          {errors.message ? (
            <p role="alert" className="text-sm text-destructive">
              {errors.message.message}
            </p>
          ) : (
            <span />
          )}
          <span className="shrink-0 text-xs tabular-nums text-ink-faint">
            {message.length}/2000
          </span>
        </div>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div className="grid gap-1.5">
          <Label htmlFor="sg-name" className="text-xs font-semibold text-ink-soft">
            Name <span className="font-normal text-ink-faint">(optional)</span>
          </Label>
          <Input id="sg-name" placeholder="Reina" {...register("name")} />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="sg-email" className="text-xs font-semibold text-ink-soft">
            Email <span className="font-normal text-ink-faint">(only if you want a reply)</span>
          </Label>
          <Input id="sg-email" type="email" placeholder="you@domain.com" {...register("email")} />
          {errors.email ? (
            <p role="alert" className="text-sm text-destructive">
              {errors.email.message}
            </p>
          ) : null}
        </div>
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="mt-6 h-12 w-full rounded-full bg-teal text-base font-semibold text-white shadow-ambient hover:bg-teal-deep sm:w-auto sm:px-8"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="size-4 animate-spin" /> Sending
          </>
        ) : (
          <>
            Send it <Send className="size-4" />
          </>
        )}
      </Button>
    </form>
  );
}
