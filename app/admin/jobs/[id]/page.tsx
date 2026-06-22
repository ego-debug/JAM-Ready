import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  CalendarClock,
  Building2,
  ImageIcon,
  Layers,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { JobStatusBadge } from "@/components/admin/JobStatusBadge";
import { RiskChip } from "@/components/admin/RiskChip";
import { QuoteBuilder } from "@/components/admin/QuoteBuilder";
import { StatusControls } from "@/components/admin/StatusControls";
import { SchedulingPanel } from "@/components/admin/SchedulingPanel";
import { InvoicePanel } from "@/components/admin/InvoicePanel";
import { EmailLog } from "@/components/admin/EmailLog";
import { CopyLink } from "@/components/status/CopyLink";
import { getJobById } from "@/lib/db/jobs";
import { listCrew } from "@/lib/db/crew";
import { emailConfigured } from "@/lib/email";
import { formatShortDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const job = await getJobById(id);
  if (!job) notFound();
  const crew = await listCrew();

  return (
    <Container className="max-w-5xl py-8">
      <Link
        href="/admin"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft hover:text-ink"
      >
        <ArrowLeft size={16} /> Dashboard
      </Link>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <JobStatusBadge status={job.status} />
            <RiskChip job={job} />
          </div>
          <h1 className="mt-2 font-display text-2xl font-bold tracking-tight text-ink">
            {job.property?.address ?? "Unit"}
            {job.property?.unitNumber ? ` · Unit ${job.property.unitNumber}` : ""}
          </h1>
          <p className="mt-1 text-sm text-ink-soft">
            Requested {formatShortDate(job.createdAt)} · {job.customer?.name}
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        {/* main */}
        <div className="space-y-6">
          {(job.requestedServices?.length || job.serviceDetail) && (
            <div className="rounded-2xl border border-line bg-surface p-6 shadow-sm">
              <h3 className="mb-4 flex items-center gap-2 font-display text-base font-semibold text-ink">
                <Layers size={18} className="text-ink-soft" /> What they requested
              </h3>
              {job.requestedServices && job.requestedServices.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {job.requestedServices.map((s) => (
                    <span
                      key={s}
                      className="rounded-full bg-brand-tint px-3 py-1 text-xs font-semibold text-brand"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              )}
              {job.serviceDetail && (
                <dl className="mt-4 space-y-2.5 text-sm">
                  {job.serviceDetail.unitSqft != null && (
                    <div className="flex justify-between gap-3">
                      <dt className="text-ink-soft">Unit square footage</dt>
                      <dd className="font-medium text-ink">{job.serviceDetail.unitSqft} sq ft</dd>
                    </div>
                  )}
                  {job.serviceDetail.flooringTypes && job.serviceDetail.flooringTypes.length > 0 && (
                    <div className="flex justify-between gap-3">
                      <dt className="text-ink-soft">Flooring type</dt>
                      <dd className="text-right font-medium text-ink">{job.serviceDetail.flooringTypes.join(", ")}</dd>
                    </div>
                  )}
                  {job.serviceDetail.flooringSqft != null && (
                    <div className="flex justify-between gap-3">
                      <dt className="text-ink-soft">Flooring sq ft</dt>
                      <dd className="font-medium text-ink">{job.serviceDetail.flooringSqft} sq ft</dd>
                    </div>
                  )}
                  {job.serviceDetail.paintingScope && job.serviceDetail.paintingScope.length > 0 && (
                    <div className="flex justify-between gap-3">
                      <dt className="text-ink-soft">Paint scope</dt>
                      <dd className="text-right font-medium text-ink">{job.serviceDetail.paintingScope.join(", ")}</dd>
                    </div>
                  )}
                  {job.serviceDetail.paintingSqft != null && (
                    <div className="flex justify-between gap-3">
                      <dt className="text-ink-soft">Paint sq ft</dt>
                      <dd className="font-medium text-ink">{job.serviceDetail.paintingSqft} sq ft</dd>
                    </div>
                  )}
                </dl>
              )}
            </div>
          )}

          <QuoteBuilder jobId={job.id} initialItems={job.lineItems} />

          {/* submitted photos */}
          <div className="rounded-2xl border border-line bg-surface p-6 shadow-sm">
            <h3 className="mb-4 flex items-center gap-2 font-display text-base font-semibold text-ink">
              <ImageIcon size={18} className="text-ink-soft" />
              Submitted photos
              <span className="text-sm font-normal text-ink-soft">
                ({job.requestPhotos.length})
              </span>
            </h3>
            {job.requestPhotos.length === 0 ? (
              <p className="text-sm text-ink-soft">No photos submitted.</p>
            ) : (
              <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
                {job.requestPhotos.map((p) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <a key={p.url} href={p.url} target="_blank" rel="noreferrer">
                    <img
                      src={p.url}
                      alt={p.name}
                      className="aspect-square w-full rounded-lg border border-line object-cover transition hover:opacity-90"
                    />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* sidebar */}
        <div className="space-y-6">
          <StatusControls jobId={job.id} status={job.status} />

          <SchedulingPanel
            jobId={job.id}
            status={job.status}
            dueDate={job.dueDate}
            scheduledDate={job.scheduledDate}
            assignedCrew={job.assignedCrew}
            allCrew={crew}
          />

          {/* customer */}
          <div className="rounded-2xl border border-line bg-surface p-6 shadow-sm">
            <h3 className="mb-4 font-display text-base font-semibold text-ink">
              Customer
            </h3>
            <dl className="space-y-3 text-sm">
              <div>
                <dt className="text-ink-soft">Name</dt>
                <dd className="font-medium text-ink">{job.customer?.name ?? "-"}</dd>
              </div>
              {job.customer?.company && (
                <div className="flex items-start gap-2.5">
                  <Building2 size={15} className="mt-0.5 shrink-0 text-ink-soft" />
                  <dd className="text-ink">{job.customer.company}</dd>
                </div>
              )}
              {job.customer?.email && (
                <div className="flex items-start gap-2.5">
                  <Mail size={15} className="mt-0.5 shrink-0 text-ink-soft" />
                  <a href={`mailto:${job.customer.email}`} className="text-brand hover:underline">
                    {job.customer.email}
                  </a>
                </div>
              )}
              {job.customer?.phone && (
                <div className="flex items-start gap-2.5">
                  <Phone size={15} className="mt-0.5 shrink-0 text-ink-soft" />
                  <a href={`tel:${job.customer.phone}`} className="text-brand hover:underline">
                    {job.customer.phone}
                  </a>
                </div>
              )}
            </dl>
          </div>

          {/* unit / deadline */}
          <div className="rounded-2xl border border-line bg-surface p-6 shadow-sm">
            <h3 className="mb-4 font-display text-base font-semibold text-ink">
              Unit
            </h3>
            <dl className="space-y-3 text-sm">
              <div className="flex items-start gap-2.5">
                <MapPin size={15} className="mt-0.5 shrink-0 text-ink-soft" />
                <dd className="text-ink">
                  {job.property?.address ?? "-"}
                  {job.property?.unitNumber ? `, Unit ${job.property.unitNumber}` : ""}
                </dd>
              </div>
              <div className="flex items-start gap-2.5">
                <CalendarClock size={15} className="mt-0.5 shrink-0 text-ink-soft" />
                <dd className="text-ink">
                  Due {formatShortDate(job.dueDate)}
                  {(job.property?.beds != null || job.property?.baths != null) && (
                    <span className="text-ink-soft">
                      {" · "}
                      {job.property?.beds ?? "?"} bd / {job.property?.baths ?? "?"} ba
                    </span>
                  )}
                </dd>
              </div>
              {job.notes && (
                <div className="rounded-lg bg-canvas p-3 text-ink">
                  <p className="text-xs font-medium text-ink-soft">Notes</p>
                  <p className="mt-0.5">{job.notes}</p>
                </div>
              )}
            </dl>
          </div>

          {/* customer link */}
          <div className="rounded-2xl border border-line bg-surface p-6 shadow-sm">
            <h3 className="mb-3 font-display text-base font-semibold text-ink">
              Customer status link
            </h3>
            <CopyLink path={`/status/${job.publicToken}`} />
          </div>

          <InvoicePanel
            jobId={job.id}
            invoice={job.invoice}
            quoteTotal={job.quoteTotal}
          />

          <EmailLog entries={job.emailLog} configured={emailConfigured} />
        </div>
      </div>
    </Container>
  );
}
