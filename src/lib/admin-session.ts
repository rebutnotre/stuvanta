import { createHmac, timingSafeEqual } from "node:crypto";

const COOKIE_NAME = "stuvanta_admin";
const SESSION_LENGTH_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

function secret(): string {
  const value = process.env.ADMIN_SESSION_SECRET;
  if (!value) {
    throw new Error("Missing required environment variable: ADMIN_SESSION_SECRET");
  }
  return value;
}

function sign(payload: string): string {
  return createHmac("sha256", secret()).update(payload).digest("hex");
}

/** Builds a signed, expiring cookie value proving a successful admin login. */
export function createAdminSessionValue(): string {
  const expiresAt = String(Date.now() + SESSION_LENGTH_MS);
  return `${expiresAt}.${sign(expiresAt)}`;
}

/** Verifies a cookie value produced by createAdminSessionValue. */
export function isValidAdminSessionValue(value: string | undefined): boolean {
  if (!value) return false;
  const [expiresAt, signature] = value.split(".");
  if (!expiresAt || !signature) return false;
  if (Date.now() > Number(expiresAt)) return false;

  const expectedSig = sign(expiresAt);
  const a = Buffer.from(signature);
  const b = Buffer.from(expectedSig);
  return a.length === b.length && timingSafeEqual(a, b);
}

export const ADMIN_COOKIE_NAME = COOKIE_NAME;
export const ADMIN_COOKIE_MAX_AGE_SECONDS = SESSION_LENGTH_MS / 1000;
