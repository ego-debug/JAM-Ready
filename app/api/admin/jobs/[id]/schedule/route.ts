import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/auth";
import { assignCrew, setScheduledDate, unassignCrew } from "@/lib/db/jobs";

export const runtime = "nodejs";

/**
 * Manage scheduling on a job WITHOUT changing status:
 *   { scheduledDate: "2026-06-28" | null }     set/clear the scheduled date
 *   { assign: "<crewId>" }                      assign a crew member
 *   { unassign: "<crewId>" }                    remove a crew member
 */
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;

  let body: {
    scheduledDate?: string | null;
    assign?: string;
    unassign?: string;
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Bad request." }, { status: 400 });
  }

  let job = null;
  if (body.assign) job = await assignCrew(id, body.assign);
  else if (body.unassign) job = await unassignCrew(id, body.unassign);
  else if (body.scheduledDate !== undefined)
    job = await setScheduledDate(id, body.scheduledDate);
  else return NextResponse.json({ error: "Nothing to do." }, { status: 400 });

  if (!job) return NextResponse.json({ error: "Job not found." }, { status: 404 });
  return NextResponse.json({ ok: true });
}
