import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/auth";
import { getJobById, saveQuote, type QuoteItemInput } from "@/lib/db/jobs";
import { notifyCustomer } from "@/lib/notifications";

export const runtime = "nodejs";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;

  let body: { items?: QuoteItemInput[] };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Bad request." }, { status: 400 });
  }

  const items = (body.items ?? []).filter(
    (i) => i && i.lane === "green" && i.qty > 0,
  );

  const before = await getJobById(id);
  const job = await saveQuote(id, items);
  if (!job) return NextResponse.json({ error: "Job not found." }, { status: 404 });

  // "Quote ready" email only on the first Requested to Quoted transition
  if (before?.status === "Requested" && job.status === "Quoted") {
    await notifyCustomer(job, "quoted");
  }

  return NextResponse.json({ ok: true, quoteTotal: job.quoteTotal, status: job.status });
}
