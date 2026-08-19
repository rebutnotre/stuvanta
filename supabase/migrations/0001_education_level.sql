-- Run this once in the Supabase SQL Editor against your existing project.
-- Splits the old single "course_year" field into "education_level"
-- (High school / University) and "year_level" (options depend on that).
--
-- Safe on a table that already has rows: existing signups get backfilled
-- as University / whatever their old course_year value was, since every
-- signup so far came through the old university-only form.

alter table waitlist_signups
  add column education_level text not null default 'University';

alter table waitlist_signups
  rename column course_year to year_level;

alter table waitlist_signups
  alter column education_level drop default;
