import { cookies } from "next/headers";

/**
 * Minimal admin auth for local v1. A shared password sets a server-only
 * session cookie. Swaps to Supabase Auth (with crew/admin roles) when we
 * deploy. Set ADMIN_PASSWORD and ADMIN_SESSION_SECRET in .env.local.
 */

export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "turnready";
const SESSION_SECRET =
  process.env.ADMIN_SESSION_SECRET || "dev-session-secret-change-me";

export const SESSION_COOKIE = "mr_admin";

/** Value stored in the session cookie once logged in. */
export function sessionValue(): string {
  return SESSION_SECRET;
}

/** Server-side check used by the admin layout and mutating routes. */
export async function isAuthed(): Promise<boolean> {
  const store = await cookies();
  return store.get(SESSION_COOKIE)?.value === SESSION_SECRET;
}
