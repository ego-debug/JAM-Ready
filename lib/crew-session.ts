import { cookies } from "next/headers";

/**
 * Which crew member the current device is acting as. A local stand-in for
 * per-crew login. Supabase Auth will identify the crew member directly later.
 */

export const CREW_COOKIE = "mr_crew";

export async function getCrewId(): Promise<string | null> {
  const store = await cookies();
  return store.get(CREW_COOKIE)?.value ?? null;
}
