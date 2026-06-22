import { notFound } from "next/navigation";
import {
  CheckCircle2,
  MapPin,
  CalendarClock,
  ImageIcon,
  FileText,
} from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { StatusTracker } from "@/components/status/StatusTracker";
import { CopyLink } from "@/components/status/CopyLink";
import { QuoteSummary } from "@/components/status/QuoteSummary";
import { FinishedPhotos } from "@/components/status/FinishedPhotos";
import { InvoiceCard } from "@/components/status/InvoiceCard";
import { getJobByToken } from "@/lib/db/jobs";
import { toDate } from "@/lib/utils";

export const metadata = {
  title: "Your turn status",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

function fmtDate(value?: string): string {
  const d = toDate(value);
  if (!d) return "-";
  return d.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default async function StatusPage({
  params,
  searchParams,
}: {
  params: Promise<{ token: string }>;
  searchParams: Promise<{ new?: string }>;
}) {
  const { token } = await params;
  const { new: isNew } = await searchParams;
  const job = await getJobByToken(token);
  if (!job) notFound();

  return (
    <>
      <Header />
      <main className="py-10 sm:py-14">
        <Container className="max-w-3xl">
          {isNew && (
            <div className="mb-8 flex items-start gap-3 rounded-2xl border border-success/30 bg-success/5 p-5">
              <CheckCircle2 className="mt-0.5 shrink-0 text-success" size={22} />
              <div>
                <h2 className="font-display text-lg font-semibold text-ink">
                  Request received. We&apos;re on it.
                </h2>
                <p className="mt-1 text-sm text-ink-soft">
                  We&apos;ll review the unit and send your quote, usually the
                  same day. <span className="font-medium text-ink">Bookmark this page</span> or
                  copy the private link below to check back anytime.
                </p>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <Badge tone="brand">Turn request</Badge>
              <h1 className="mt-2 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                {job.property?.address ?? "Your unit"}
                {job.property?.unitNumber ? ` · Unit ${job.property.unitNumber}` : ""}
              </h1>
              <p className="mt-1 text-sm text-ink-soft">
                Submitted {fmtDate(job.createdAt)}
              </p>
            </div>
            <Badge tone="info" className="self-start text-sm">
              {job.status}
            </Badge>
          </div>

          <div className="mt-3">
            <CopyLink path={`/status/${job.publicToken}`} />
          </div>

          {(job.status === "Done" || job.status === "Invoiced") && (
            <div className="mt-8">
              <FinishedPhotos tasks={job.taskProgress} />
            </div>
          )}

          <div className="mt-8 grid gap-6 md:grid-cols-[1fr_1.1fr]">
            {/* Status tracker */}
            <div className="rounded-2xl border border-line bg-surface p-6 shadow-sm">
              <h3 className="mb-5 font-display text-base font-semibold text-ink">
                Progress
              </h3>
              <StatusTracker status={job.status} />
            </div>

            {/* Details */}
            <div className="space-y-6">
              <div className="rounded-2xl border border-line bg-surface p-6 shadow-sm">
                <h3 className="mb-4 font-display text-base font-semibold text-ink">
                  Unit details
                </h3>
                <dl className="space-y-3 text-sm">
                  <div className="flex items-start gap-2.5">
                    <MapPin size={16} className="mt-0.5 shrink-0 text-ink-soft" />
                    <div>
                      <dt className="text-ink-soft">Address</dt>
                      <dd className="font-medium text-ink">
                        {job.property?.address ?? "-"}
                        {job.property?.unitNumber ? `, Unit ${job.property.unitNumber}` : ""}
                      </dd>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CalendarClock size={16} className="mt-0.5 shrink-0 text-ink-soft" />
                    <div>
                      <dt className="text-ink-soft">Rent-ready deadline</dt>
                      <dd className="font-medium text-ink">{fmtDate(job.dueDate)}</dd>
                    </div>
                  </div>
                  {(job.property?.beds != null || job.property?.baths != null) && (
                    <div className="flex items-start gap-2.5">
                      <FileText size={16} className="mt-0.5 shrink-0 text-ink-soft" />
                      <div>
                        <dt className="text-ink-soft">Size</dt>
                        <dd className="font-medium text-ink">
                          {job.property?.beds ?? "?"} bed · {job.property?.baths ?? "?"} bath
                        </dd>
                      </div>
                    </div>
                  )}
                  {job.notes && (
                    <div className="flex items-start gap-2.5">
                      <FileText size={16} className="mt-0.5 shrink-0 text-ink-soft" />
                      <div>
                        <dt className="text-ink-soft">Notes</dt>
                        <dd className="text-ink">{job.notes}</dd>
                      </div>
                    </div>
                  )}
                </dl>
              </div>

              {/* Quote: line items + approve when ready */}
              <QuoteSummary
                token={job.publicToken}
                status={job.status}
                lineItems={job.lineItems}
                total={job.quoteTotal}
              />

              <InvoiceCard invoice={job.invoice} />
            </div>
          </div>

          {/* Submitted photos */}
          <div className="mt-6 rounded-2xl border border-line bg-surface p-6 shadow-sm">
            <h3 className="mb-4 flex items-center gap-2 font-display text-base font-semibold text-ink">
              <ImageIcon size={18} className="text-ink-soft" />
              Photos you sent
              <span className="text-sm font-normal text-ink-soft">
                ({job.requestPhotos.length})
              </span>
            </h3>
            {job.requestPhotos.length === 0 ? (
              <p className="text-sm text-ink-soft">
                No photos were attached to this request.
              </p>
            ) : (
              <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
                {job.requestPhotos.map((p) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={p.url}
                    src={p.url}
                    alt={p.name}
                    className="aspect-square w-full rounded-lg border border-line object-cover"
                  />
                ))}
              </div>
            )}
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
