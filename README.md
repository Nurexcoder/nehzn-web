# Nehzn — marketing site

The public site for [Nehzn](https://nehzn.com): a waitlist and a suggestion box.
There is no login — the app isn't open yet.

## Stack

- **Next.js 16** (App Router) + TypeScript
- **Tailwind CSS v4** with the Nehzn "Ethereal Tech" tokens in `globals.css`
- **shadcn/ui** primitives
- **react-hook-form + zod**, with the same schema validating on client and server
- **Resend** for transactional email

## How a submission flows

1. The form validates in the browser (`react-hook-form` + the zod resolver).
2. The route handler re-validates with the *same* schema — the client is never trusted.
3. A honeypot field silently no-ops anything a bot fills in.
4. Two independent sinks, neither able to fail the request alone:
   - **Resend** notifies the team and confirms to the person.
   - **The Nehzn API** (`/v1/waitlist`, `/v1/suggestions`) keeps the queryable record.

## Running locally

```bash
cp .env.example .env.local   # then fill in RESEND_API_KEY
npm install
npm run dev
```

## Environment

| Variable | Purpose |
|---|---|
| `RESEND_API_KEY` | Transactional email. Without it, emails are skipped and logged. |
| `RESEND_FROM` | Verified sender, e.g. `Nehzn <hello@nehzn.com>` |
| `TEAM_INBOX` | Where signups and suggestions are announced |
| `NEHZN_API_BASE` | Durable storage. Defaults to `https://api.nehzn.com/v1` |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for metadata |
