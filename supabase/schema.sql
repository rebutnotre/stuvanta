-- Run this once in the Supabase SQL Editor (Project > SQL Editor > New query)
-- for a freshly created project. See README.md for the full setup walkthrough.

create extension if not exists pgcrypto;

create table if not exists waitlist_signups (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  campus text not null,
  course_year text not null,
  is_edu_au boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists venue_leads (
  id uuid primary key default gen_random_uuid(),
  business_name text not null,
  contact_name text not null,
  contact_email text not null,
  contact_phone text,
  suburb text not null,
  category text not null,
  discount_considered text not null,
  created_at timestamptz not null default now()
);

-- Row Level Security: the public site only ever inserts, using the anon key.
-- Reads (for the admin dashboard and CSV export) go through the service
-- role key from server-only code behind the /admin password gate, which
-- bypasses RLS entirely — so no SELECT policy is needed here.

alter table waitlist_signups enable row level security;

create policy "Public can join the waitlist"
  on waitlist_signups
  for insert
  to anon, authenticated
  with check (true);

alter table venue_leads enable row level security;

create policy "Public can register venue interest"
  on venue_leads
  for insert
  to anon, authenticated
  with check (true);
