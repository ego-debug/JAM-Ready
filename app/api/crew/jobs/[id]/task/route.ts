import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/auth";
import { getCrewId } from "@/lib/crew-session";
import { setTaskCompleted } from "@/lib/db/tasks";
import { listCrew } from "@/lib/db/crew";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  let body: { taskId?: string; completed?: boolean };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Bad request." }, { status: 400 });
  }
  if (!body.taskId) {
    return NextResponse.json({ error: "taskId required." }, { status: 400 });
  }

  const crewId = await getCrewId();
  const crew = (await listCrew()).find((c) => c.id === crewId);

  await setTaskCompleted(body.taskId, Boolean(body.completed), crew?.name);
  return NextResponse.json({ ok: true });
}
