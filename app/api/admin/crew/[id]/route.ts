import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/auth";
import { removeCrew, setAvailability } from "@/lib/db/crew";

export const runtime = "nodejs";

/** Toggle weekly availability: { weekKey, available }. */
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  let body: { weekKey?: string; available?: boolean };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Bad request." }, { status: 400 });
  }
  if (!body.weekKey) {
    return NextResponse.json({ error: "weekKey required." }, { status: 400 });
  }
  await setAvailability(id, body.weekKey, Boolean(body.available));
  return NextResponse.json({ ok: true });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  await removeCrew(id);
  return NextResponse.json({ ok: true });
}
