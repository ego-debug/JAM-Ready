import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/auth";
import {
  createInvoice,
  sendInvoice,
  setInvoicePaid,
} from "@/lib/db/invoices";

export const runtime = "nodejs";

/** Manage the job's invoice: { action: "create" | "send" | "paid" | "unpaid" }. */
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;

  let body: { action?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Bad request." }, { status: 400 });
  }

  let invoice = null;
  switch (body.action) {
    case "create":
      invoice = await createInvoice(id);
      break;
    case "send":
      invoice = await sendInvoice(id);
      break;
    case "paid":
      invoice = await setInvoicePaid(id, true);
      break;
    case "unpaid":
      invoice = await setInvoicePaid(id, false);
      break;
    default:
      return NextResponse.json({ error: "Unknown action." }, { status: 400 });
  }

  if (!invoice) {
    return NextResponse.json(
      { error: "Couldn't update the invoice." },
      { status: 400 },
    );
  }
  return NextResponse.json({ ok: true, invoice });
}
