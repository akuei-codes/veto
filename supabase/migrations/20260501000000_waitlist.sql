-- Waitlist emails for marketing site. Prefer server-side inserts with SUPABASE_SERVICE_ROLE_KEY.

create table if not exists public.waitlist_signups (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  created_at timestamptz not null default now()
);

create unique index if not exists waitlist_signups_email_lower_key on public.waitlist_signups (lower(email));
