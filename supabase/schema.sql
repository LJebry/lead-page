-- TODO: Use this as a starting point in Supabase SQL editor.
-- Keep anonymous users from reading leads directly from the client.

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null unique,
  company text,
  source text not null check (source in ('Google', 'Referral', 'Social', 'Other')),
  message text,
  created_at timestamptz not null default now()
);

alter table public.leads enable row level security;

-- TODO: Add policies that match your final implementation.
-- Common approach: insert/read from server-side code using a service role key,
-- and do not expose direct anonymous read access.
