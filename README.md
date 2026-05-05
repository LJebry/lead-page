# Lead Capture Page

Starter repo for the Secco Squared junior web developer take-home task.

This repo is intentionally scaffolded only. The form UI, route structure,
Supabase helper, webhook helper, and schema notes are in place so the actual
implementation can be done in small commits.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Supabase

## Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Environment Variables

Copy `.env.example` to `.env.local` and fill in:

- `NEXT_PUBLIC_SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `LEAD_WEBHOOK_URL`
- `CANDIDATE_NAME`

## Task Checklist

- Build client-side validation and error states in `src/components/lead-form.tsx`
- Implement `createLeadAction` in `src/lib/actions.ts`
- Save leads to Supabase using `src/lib/supabase.ts`
- Forward saved leads to the webhook using `src/lib/webhook.ts`
- Log webhook failures without failing successful submissions
- Fetch leads server-side in `src/app/leads/page.tsx`
- Apply and verify Supabase RLS policies from `supabase/schema.sql`
- Deploy to Vercel

## Webhook

Endpoint:

```txt
https://webhook-receiver-flax.vercel.app/api/lead-webhook
```

Required header:

```txt
X-Candidate-Name: Your Full Name
```
