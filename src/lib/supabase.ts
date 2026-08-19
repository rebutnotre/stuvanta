import { createClient } from "@supabase/supabase-js";

/**
 * Server-only clients. Never import this file from a "use client" component —
 * the service role key must not reach the browser.
 */

function requiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

/**
 * Anon-key client, restricted by the RLS policies in supabase/schema.sql
 * (public can INSERT into waitlist_signups / venue_leads, nothing else).
 * Used by the public form Server Actions.
 */
export function getSupabasePublicClient() {
  return createClient(
    requiredEnv("NEXT_PUBLIC_SUPABASE_URL"),
    requiredEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
    { auth: { persistSession: false } },
  );
}

/**
 * Service-role client that bypasses RLS. Only ever call this from code
 * reached through the /admin password gate (see src/proxy.ts).
 */
export function getSupabaseAdminClient() {
  return createClient(
    requiredEnv("NEXT_PUBLIC_SUPABASE_URL"),
    requiredEnv("SUPABASE_SERVICE_ROLE_KEY"),
    { auth: { persistSession: false } },
  );
}
