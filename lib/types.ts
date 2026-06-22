/**
 * Data model (BUILD-SPEC §8). Defined in full now so the whole app shares
 * one source of truth; segments implement them as they're built.
 *
 * The status flow (spec §4):
 *   Requested, Quoted, Approved, Scheduled, In Progress, Done, Invoiced
 */

export const JOB_STATUSES = [
  "Requested",
  "Quoted",
  "Approved",
  "Scheduled",
  "In Progress",
  "Done",
  "Invoiced",
] as const;

export type JobStatus = (typeof JOB_STATUSES)[number];

/** Service lane: green = crew can legally do it; locked = licensed partner. */
export type Lane = "green" | "locked";

export type UnitType = "per_room" | "per_item" | "flat" | "per_sqft";

/** Structured detail captured on the request so quotes can be priced accurately. */
export interface ServiceDetail {
  unitSqft?: number;
  flooringTypes?: string[]; // LVP, Laminate, Tile, Carpet
  flooringSqft?: number;
  paintingScope?: string[]; // Walls, Trim, Ceilings
  paintingSqft?: number;
}

export interface Customer {
  id: string;
  name: string;
  company?: string;
  email: string;
  phone: string;
  createdAt: string;
}

export interface Property {
  id: string;
  customerId: string;
  address: string;
  unitNumber?: string;
  beds?: number;
  baths?: number;
  notes?: string;
}

export interface JobPhoto {
  /** URL path the app can render (e.g. /api/uploads/<token>/<file>). */
  url: string;
  name: string;
  uploadedAt: string;
}

export interface Job {
  id: string;
  publicToken: string;
  customerId: string;
  propertyId: string;
  status: JobStatus;
  dueDate?: string;
  scheduledDate?: string;
  requestPhotos: JobPhoto[];
  notes?: string;
  quoteTotal?: number;
  createdAt: string;
  /** Services the customer asked for on the request. */
  requestedServices?: string[];
  /** Structured detail (flooring type, square footage) for accurate quoting. */
  serviceDetail?: ServiceDetail;
}

export interface LineItem {
  id: string;
  jobId: string;
  serviceName: string;
  lane: Lane;
  unitType: UnitType;
  qty: number;
  price: number;
}

export interface CrewMember {
  id: string;
  name: string;
  phone: string;
  email: string;
  skills?: string;
  /** week key (e.g. "2026-W26") to available */
  availability: Record<string, boolean>;
}

export interface JobAssignment {
  id: string;
  jobId: string;
  crewMemberId: string;
}

export interface TaskProgress {
  id: string;
  jobId: string;
  lineItemId: string;
  completed: boolean;
  completedBy?: string;
  beforePhoto?: string;
  afterPhoto?: string;
}

export interface Invoice {
  id: string;
  jobId: string;
  amount: number;
  status: "draft" | "sent" | "paid";
  sentAt?: string;
}

export type EmailKind = "quoted" | "scheduled" | "done";

export interface EmailLogEntry {
  id: string;
  jobId: string;
  to: string;
  subject: string;
  kind: EmailKind;
  /** sent = delivered to Resend; skipped = no API key (dev); failed = error */
  status: "sent" | "skipped" | "failed";
  at: string;
  error?: string;
}

/** Shape persisted by the local store; mirrors future Supabase tables. */
export interface Database {
  customers: Customer[];
  properties: Property[];
  jobs: Job[];
  lineItems: LineItem[];
  crewMembers: CrewMember[];
  assignments: JobAssignment[];
  taskProgress: TaskProgress[];
  invoices: Invoice[];
  emailLog: EmailLogEntry[];
}
