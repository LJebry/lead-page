# Lead Capture Page

Lead capture take-home project for Secco Squared. Visitors can submit a lead,
the app saves it to Supabase, then forwards the saved lead to the provided
webhook from server-side code.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Supabase

## Getting Started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## Environment Variables

Fill in `.env.local`:

```txt
NEXT_PUBLIC_SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
LEAD_WEBHOOK_URL=
CANDIDATE_NAME=
```

`SUPABASE_SERVICE_ROLE_KEY` must stay server-only. Do not commit `.env.local`.

## Supabase Setup

Run the SQL in `supabase/schema.sql` from the Supabase SQL editor. It creates
the `leads` table, enables RLS, and grants access only to the `service_role`
used by the server-side code.

Anonymous users should not be given direct read access to the `leads` table.

## Routes

- `/` - public lead capture form
- `/leads` - server-rendered table of submitted leads, newest first

## Webhook

Set `LEAD_WEBHOOK_URL` to:

```txt
https://webhook-receiver-flax.vercel.app/api/lead-webhook
```

The app sends the submitted lead after the Supabase insert succeeds, with:

```txt
X-Candidate-Name: Your Full Name
```

If the webhook fails, the app logs the error and still shows the user a
successful submission after the lead has been saved.

## Verification

```bash
npm run lint
npm run build
```
