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

grant usage on schema public to service_role;
grant select, insert on public.leads to service_role;

-- No anon select policy is created. Leads are inserted and read server-side
-- with the service role key, so anonymous client requests cannot read leads
-- directly through the Supabase client.
