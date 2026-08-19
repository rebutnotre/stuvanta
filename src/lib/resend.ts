import { Resend } from "resend";

let cached: Resend | null = null;

export function getResendClient() {
  if (!cached) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error("Missing required environment variable: RESEND_API_KEY");
    }
    cached = new Resend(apiKey);
  }
  return cached;
}

/**
 * Resend's shared sandbox sender — works with zero domain setup. Swap to a
 * verified custom domain address later via the EMAIL_FROM env var.
 */
export const EMAIL_FROM = process.env.EMAIL_FROM ?? "Stuvanta <onboarding@resend.dev>";
