import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/auth";
import { CREW_COOKIE } from "@/lib/crew-session";

export const runtime = "nodejs";

/** Choose which crew member this device acts as. { crewId } or null to clear. */
export async function POST(request: Request) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  let body: { crewId?: string | null };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Bad request." }, { status: 400 });
  }

  const res = NextResponse.json({ ok: true });
  if (body.crewId) {
    res.cookies.set(CREW_COOKIE, body.crewId, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
  } else {
    res.cookies.set(CREW_COOKIE, "", { path: "/", maxAge: 0 });
  }
  return res;
}
