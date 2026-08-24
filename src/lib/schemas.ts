import { z } from "zod";

/**
 * One schema per form, shared by the client (react-hook-form resolver) and the
 * route handler. Validating in both places is the point: the client gives
 * instant feedback, the server never trusts it.
 */

export const waitlistSchema = z.object({
  email: z
    .string()
    .min(1, "We need an email to tell you when it opens.")
    .email("That doesn't look like an email address."),
  name: z
    .string()
    .max(80, "That's longer than we can store.")
    .optional()
    .or(z.literal("")),
  city: z
    .string()
    .max(80, "That's longer than we can store.")
    .optional()
    .or(z.literal("")),
  lookingFor: z
    .string()
    .max(400, "Keep it under 400 characters.")
    .optional()
    .or(z.literal("")),
  // Honeypot: a field no human ever sees. It must accept anything so the
  // request parses; the route then checks it and quietly no-ops. Rejecting it
  // here would hand a bot a message telling it which field to leave blank.
  company: z.string().optional(),
});

export type WaitlistInput = z.infer<typeof waitlistSchema>;

export const suggestionSchema = z.object({
  message: z
    .string()
    .min(4, "Tell us a little more than that.")
    .max(2000, "Keep it under 2000 characters."),
  kind: z.enum(["feature", "concern", "question", "other"]),
  // Optional on purpose — an idea shouldn't cost an email address.
  email: z
    .string()
    .email("That doesn't look like an email address.")
    .optional()
    .or(z.literal("")),
  name: z.string().max(80).optional().or(z.literal("")),
  company: z.string().optional(),
});

export type SuggestionInput = z.infer<typeof suggestionSchema>;

export const SUGGESTION_KINDS = [
  { value: "feature", label: "An idea" },
  { value: "concern", label: "A concern" },
  { value: "question", label: "A question" },
  { value: "other", label: "Something else" },
] as const;
