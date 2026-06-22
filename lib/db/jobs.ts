import { mutateDb, readDb } from "./store";
import { newId, newToken } from "@/lib/ids";
import type {
  CrewMember,
  Customer,
  EmailLogEntry,
  Invoice,
  Job,
  JobPhoto,
  JobStatus,
  LineItem,
  Property,
  ServiceDetail,
  TaskProgress,
} from "@/lib/types";

export interface TurnRequestInput {
  // customer
  name: string;
  company?: string;
  email: string;
  phone: string;
  // property
  address: string;
  unitNumber?: string;
  beds?: number;
  baths?: number;
  // job
  dueDate?: string;
  notes?: string;
  photos: JobPhoto[];
  requestedServices?: string[];
  serviceDetail?: ServiceDetail;
  /** Pre-generated so uploaded photos can be stored under it first. */
  publicToken?: string;
}

export interface JobWithRelations extends Job {
  customer: Customer | null;
  property: Property | null;
}

export interface JobFull extends JobWithRelations {
  lineItems: LineItem[];
  assignedCrew: CrewMember[];
  emailLog: EmailLogEntry[];
  invoice: Invoice | null;
}

export interface JobPublic extends JobWithRelations {
  lineItems: LineItem[];
  taskProgress: TaskProgress[];
  invoice: Invoice | null;
}

export interface QuoteItemInput {
  serviceName: string;
  lane: "green" | "locked";
  unitType: "per_room" | "per_item" | "flat" | "per_sqft";
  qty: number;
  price: number;
}

/** Public-side entry point: create a customer, property, and Job in one go. */
export async function createTurnRequest(
  input: TurnRequestInput,
): Promise<Job> {
  const now = new Date().toISOString();
  const customer: Customer = {
    id: newId(),
    name: input.name.trim(),
    company: input.company?.trim() || undefined,
    email: input.email.trim(),
    phone: input.phone.trim(),
    createdAt: now,
  };
  const property: Property = {
    id: newId(),
    customerId: customer.id,
    address: input.address.trim(),
    unitNumber: input.unitNumber?.trim() || undefined,
    beds: input.beds,
    baths: input.baths,
  };
  const job: Job = {
    id: newId(),
    publicToken: input.publicToken || newToken(),
    customerId: customer.id,
    propertyId: property.id,
    status: "Requested",
    dueDate: input.dueDate || undefined,
    requestPhotos: input.photos,
    notes: input.notes?.trim() || undefined,
    requestedServices: input.requestedServices,
    serviceDetail: input.serviceDetail,
    createdAt: now,
  };

  await mutateDb((db) => {
    db.customers.push(customer);
    db.properties.push(property);
    db.jobs.push(job);
  });

  return job;
}

export async function getJobByToken(
  token: string,
): Promise<JobPublic | null> {
  const db = await readDb();
  const job = db.jobs.find((j) => j.publicToken === token);
  if (!job) return null;
  return {
    ...job,
    customer: db.customers.find((c) => c.id === job.customerId) ?? null,
    property: db.properties.find((p) => p.id === job.propertyId) ?? null,
    lineItems: db.lineItems.filter((li) => li.jobId === job.id),
    taskProgress: db.taskProgress.filter((t) => t.jobId === job.id),
    invoice: db.invoices.find((i) => i.jobId === job.id) ?? null,
  };
}

/** Customer approves their quote (token-gated). Only valid from Quoted. */
export async function approveQuoteByToken(
  token: string,
): Promise<{ ok: boolean; reason?: string }> {
  const db = await readDb();
  const job = db.jobs.find((j) => j.publicToken === token);
  if (!job) return { ok: false, reason: "not_found" };
  if (job.status === "Approved" || statusIndex(job.status) > statusIndex("Approved")) {
    return { ok: true }; // already approved or past it; idempotent
  }
  if (job.status !== "Quoted") {
    return { ok: false, reason: "not_quoted" };
  }
  await mutateDb((d) => {
    const j = d.jobs.find((x) => x.id === job.id);
    if (j) j.status = "Approved";
  });
  return { ok: true };
}

function statusIndex(s: JobStatus): number {
  return [
    "Requested",
    "Quoted",
    "Approved",
    "Scheduled",
    "In Progress",
    "Done",
    "Invoiced",
  ].indexOf(s);
}

export async function getJobById(id: string): Promise<JobFull | null> {
  const db = await readDb();
  const job = db.jobs.find((j) => j.id === id);
  if (!job) return null;
  const crewIds = db.assignments
    .filter((a) => a.jobId === job.id)
    .map((a) => a.crewMemberId);
  return {
    ...job,
    customer: db.customers.find((c) => c.id === job.customerId) ?? null,
    property: db.properties.find((p) => p.id === job.propertyId) ?? null,
    lineItems: db.lineItems.filter((li) => li.jobId === job.id),
    assignedCrew: db.crewMembers.filter((c) => crewIds.includes(c.id)),
    emailLog: db.emailLog
      .filter((e) => e.jobId === job.id)
      .sort((a, b) => (a.at < b.at ? 1 : -1)),
    invoice: db.invoices.find((i) => i.jobId === job.id) ?? null,
  };
}

/**
 * Replace a job's quote line items and recompute the total. Locked-lane items
 * are rejected (spec §6: can't be added to a quote in v1). Moves a Requested
 * job to Quoted.
 */
export async function saveQuote(
  jobId: string,
  items: QuoteItemInput[],
): Promise<JobFull | null> {
  const green = items.filter((i) => i.lane === "green");
  const total = green.reduce((sum, i) => sum + i.qty * i.price, 0);

  await mutateDb((db) => {
    const job = db.jobs.find((j) => j.id === jobId);
    if (!job) return;
    db.lineItems = db.lineItems.filter((li) => li.jobId !== jobId);
    for (const i of green) {
      const li: LineItem = {
        id: newId(),
        jobId,
        serviceName: i.serviceName,
        lane: "green",
        unitType: i.unitType,
        qty: i.qty,
        price: i.price,
      };
      db.lineItems.push(li);
    }
    job.quoteTotal = total;
    if (job.status === "Requested") job.status = "Quoted";
  });

  return getJobById(jobId);
}

export async function setScheduledDate(
  jobId: string,
  date: string | null,
): Promise<JobFull | null> {
  await mutateDb((db) => {
    const job = db.jobs.find((j) => j.id === jobId);
    if (job) job.scheduledDate = date || undefined;
  });
  return getJobById(jobId);
}

export async function assignCrew(
  jobId: string,
  crewMemberId: string,
): Promise<JobFull | null> {
  await mutateDb((db) => {
    const exists = db.assignments.some(
      (a) => a.jobId === jobId && a.crewMemberId === crewMemberId,
    );
    if (!exists) {
      db.assignments.push({ id: newId(), jobId, crewMemberId });
    }
  });
  return getJobById(jobId);
}

export async function unassignCrew(
  jobId: string,
  crewMemberId: string,
): Promise<JobFull | null> {
  await mutateDb((db) => {
    db.assignments = db.assignments.filter(
      (a) => !(a.jobId === jobId && a.crewMemberId === crewMemberId),
    );
  });
  return getJobById(jobId);
}

/**
 * Reliability guardrail (BUILD-SPEC §7). A job can't be Scheduled without at
 * least one crew member assigned AND a scheduled date on/before the due date.
 */
export function schedulingCheck(job: {
  assignedCrew: { id: string }[];
  scheduledDate?: string;
  dueDate?: string;
}): { ok: boolean; reason?: string } {
  if (job.assignedCrew.length === 0) {
    return { ok: false, reason: "Assign at least one crew member first." };
  }
  if (!job.scheduledDate) {
    return { ok: false, reason: "Set a scheduled date first." };
  }
  if (job.dueDate) {
    const sched = new Date(job.scheduledDate).getTime();
    const due = new Date(job.dueDate).getTime();
    if (sched > due) {
      return {
        ok: false,
        reason: "Scheduled date is after the deadline. Pick an earlier date.",
      };
    }
  }
  return { ok: true };
}

export async function updateJobStatus(
  jobId: string,
  status: JobStatus,
): Promise<JobFull | null> {
  await mutateDb((db) => {
    const job = db.jobs.find((j) => j.id === jobId);
    if (job) job.status = status;
  });
  return getJobById(jobId);
}

export async function listJobs(): Promise<JobWithRelations[]> {
  const db = await readDb();
  return db.jobs
    .slice()
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
    .map((job) => ({
      ...job,
      customer: db.customers.find((c) => c.id === job.customerId) ?? null,
      property: db.properties.find((p) => p.id === job.propertyId) ?? null,
    }));
}

/** Jobs assigned to a specific crew member (their "My Jobs"). */
export async function listJobsForCrew(
  crewMemberId: string,
): Promise<JobWithRelations[]> {
  const db = await readDb();
  const jobIds = new Set(
    db.assignments
      .filter((a) => a.crewMemberId === crewMemberId)
      .map((a) => a.jobId),
  );
  return db.jobs
    .filter((j) => jobIds.has(j.id))
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
    .map((job) => ({
      ...job,
      customer: db.customers.find((c) => c.id === job.customerId) ?? null,
      property: db.properties.find((p) => p.id === job.propertyId) ?? null,
    }));
}
