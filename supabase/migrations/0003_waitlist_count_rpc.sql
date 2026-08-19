-- Run this once in the Supabase SQL Editor against your existing project.
--
-- Lets the public site show a live waitlist count without granting a
-- SELECT policy on waitlist_signups — a real SELECT policy would let
-- anyone holding the public/publishable key (it's shipped to every
-- visitor's browser) query the table directly and read every signup's
-- email address. This function runs as its owner (security definer),
-- bypassing RLS internally, but can only ever return a single number.

create or replace function public.waitlist_signup_count()
returns bigint
language sql
security definer
set search_path = public
as $$
  select count(*) from waitlist_signups;
$$;

grant execute on function public.waitlist_signup_count() to anon, authenticated;
