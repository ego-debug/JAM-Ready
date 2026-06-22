import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/auth";
import { getJobById, schedulingCheck, updateJobStatus } from "@/lib/db/jobs";
import { jobHasAfterPhoto } from "@/lib/db/tasks";
import { notifyCustomer } from "@/lib/notifications";
import { JOB_STATUSES, type JobStatus } from "@/lib/types";

export const runtime = "nodejs";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;

  let body: { status?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Bad request." }, { status: 400 });
  }

  if (!body.status || !JOB_STATUSES.includes(body.status as JobStatus)) {
    return NextResponse.json({ error: "Invalid status." }, { status: 400 });
  }

  const target = body.status as JobStatus;

  // §7 guardrail: can't move to Scheduled without staffed crew + valid date
  if (target === "Scheduled") {
    const current = await getJobById(id);
    if (!current) {
      return NextResponse.json({ error: "Job not found." }, { status: 404 });
    }
    const check = schedulingCheck(current);
    if (!check.ok) {
      return NextResponse.json({ error: check.reason }, { status: 422 });
    }
  }

  // §7 proof-to-close: can't mark Done without at least one after-photo
  if (target === "Done") {
    if (!(await jobHasAfterPhoto(id))) {
      return NextResponse.json(
        { error: "Upload at least one after-photo before marking this job done." },
        { status: 422 },
      );
    }
  }

  const job = await updateJobStatus(id, target);
  if (!job) return NextResponse.json({ error: "Job not found." }, { status: 404 });

  // Customer notifications on scheduled / done (spec §5)
  if (target === "Scheduled") await notifyCustomer(job, "scheduled");
  else if (target === "Done") await notifyCustomer(job, "done");

  return NextResponse.json({ ok: true, status: job.status });
}
