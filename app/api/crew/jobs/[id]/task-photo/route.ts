import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/auth";
import { getJobById } from "@/lib/db/jobs";
import { setTaskPhoto } from "@/lib/db/tasks";
import { savePhotos } from "@/lib/storage";

export const runtime = "nodejs";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;

  const job = await getJobById(id);
  if (!job) return NextResponse.json({ error: "Job not found." }, { status: 404 });

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data." }, { status: 400 });
  }

  const taskId = String(form.get("taskId") || "");
  const which = String(form.get("which") || "");
  const file = form.get("photo");

  if (!taskId || (which !== "before" && which !== "after")) {
    return NextResponse.json({ error: "Bad request." }, { status: 400 });
  }
  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: "No photo provided." }, { status: 400 });
  }

  const [saved] = await savePhotos(job.publicToken, [file]);
  if (!saved) {
    return NextResponse.json({ error: "Couldn't save photo." }, { status: 400 });
  }

  await setTaskPhoto(taskId, which, saved.url);
  return NextResponse.json({ ok: true, url: saved.url });
}
