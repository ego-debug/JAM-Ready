import { mutateDb, readDb } from "./store";
import { newId } from "@/lib/ids";
import type { Invoice } from "@/lib/types";

/** One invoice per job in v1. */
export async function getInvoiceForJob(jobId: string): Promise<Invoice | null> {
  const db = await readDb();
  return db.invoices.find((i) => i.jobId === jobId) ?? null;
}

/** Create a draft invoice from the job's quote total (idempotent). */
export async function createInvoice(jobId: string): Promise<Invoice | null> {
  return mutateDb((db) => {
    const existing = db.invoices.find((i) => i.jobId === jobId);
    if (existing) return existing;
    const job = db.jobs.find((j) => j.id === jobId);
    if (!job) return null;
    const amount =
      job.quoteTotal ??
      db.lineItems
        .filter((li) => li.jobId === jobId)
        .reduce((s, li) => s + li.qty * li.price, 0);
    const invoice: Invoice = {
      id: newId(),
      jobId,
      amount,
      status: "draft",
    };
    db.invoices.push(invoice);
    return invoice;
  });
}

/** Mark the invoice sent (creating it first if needed) and close the job. */
export async function sendInvoice(jobId: string): Promise<Invoice | null> {
  await createInvoice(jobId);
  return mutateDb((db) => {
    const invoice = db.invoices.find((i) => i.jobId === jobId);
    if (!invoice) return null;
    invoice.status = "sent";
    invoice.sentAt = new Date().toISOString();
    const job = db.jobs.find((j) => j.id === jobId);
    if (job) job.status = "Invoiced";
    return invoice;
  });
}

export async function setInvoicePaid(
  jobId: string,
  paid: boolean,
): Promise<Invoice | null> {
  return mutateDb((db) => {
    const invoice = db.invoices.find((i) => i.jobId === jobId);
    if (!invoice) return null;
    invoice.status = paid ? "paid" : "sent";
    return invoice;
  });
}
