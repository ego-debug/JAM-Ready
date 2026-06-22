import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/auth";
import { addCrew } from "@/lib/db/crew";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  let body: { name?: string; phone?: string; email?: string; skills?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Bad request." }, { status: 400 });
  }
  if (!body.name || !body.name.trim()) {
    return NextResponse.json({ error: "Name is required." }, { status: 400 });
  }
  const member = await addCrew({
    name: body.name,
    phone: body.phone,
    email: body.email,
    skills: body.skills,
  });
  return NextResponse.json({ ok: true, id: member.id }, { status: 201 });
}
