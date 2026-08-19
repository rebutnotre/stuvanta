-- Run this once in the Supabase SQL Editor against your existing project,
-- after 0001_education_level.sql.
--
-- The signup form no longer asks for campus (there's only ever been one:
-- University of Melbourne / Parkville — it's hardcoded in the copy instead
-- of collected per-signup). Drops the now-unused column.

alter table waitlist_signups
  drop column campus;
