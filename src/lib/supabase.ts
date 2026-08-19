import { createClient } from "@supabase/supabase-js";

/**
 * Server-only clients. Never import this file from a "use client" component —
 * the secret key must not reach the browser.
 */

function requiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

/**
 * Publishable-key client (Supabase's current name for the old "anon" key —
 * same low-privilege behavior, restricted by the RLS policies in
 * supabase/schema.sql: public can INSERT into waitlist_signups /
 * venue_leads, nothing else). Used by the public form Server Actions.
 */
export function getSupabasePublicClient() {
  return createClient(
    requiredEnv("NEXT_PUBLIC_SUPABASE_URL"),
    requiredEnv("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY"),
    { auth: { persistSession: false } },
  );
}

/**
 * Secret-key client (Supabase's current name for the old "service_role"
 * key — bypasses RLS the same way). Only ever call this from code reached
 * through the /admin password gate (see src/proxy.ts).
 */
export function getSupabaseAdminClient() {
  return createClient(
    requiredEnv("NEXT_PUBLIC_SUPABASE_URL"),
    requiredEnv("SUPABASE_SECRET_KEY"),
    { auth: { persistSession: false } },
  );
}
