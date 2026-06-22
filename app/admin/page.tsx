import Link from "next/link";
import { AlertTriangle, Inbox, Hammer, CheckCircle2, FileText } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { JobRow } from "@/components/admin/JobRow";
import { listJobs } from "@/lib/db/jobs";
import { riskFor } from "@/lib/risk";
import { JOB_STATUSES } from "@/lib/types";

export const metadata = { title: "Dashboard" };
export const dynamic = "force-dynamic";

function KpiCard({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  value: number;
  tone: "brand" | "warning" | "success" | "neutral";
}) {
  const toneCls = {
    brand: "bg-brand-tint text-brand",
    warning: "bg-warning/15 text-amber-700",
    success: "bg-success/10 text-green-700",
    neutral: "bg-canvas text-ink-soft",
  }[tone];
  return (
    <div className="rounded-2xl border border-line bg-surface p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <span className={`grid h-9 w-9 place-items-center rounded-lg ${toneCls}`}>
          <Icon size={18} />
        </span>
        <span className="font-display text-3xl font-bold text-ink">{value}</span>
      </div>
      <p className="mt-3 text-sm text-ink-soft">{label}</p>
    </div>
  );
}

export default async function DashboardPage() {
  const jobs = await listJobs();

  const open = jobs.filter((j) => j.status !== "Done" && j.status !== "Invoiced");
  const needsQuote = jobs.filter((j) => j.status === "Requested");
  const atRisk = open.filter((j) => {
    const r = riskFor(j).level;
    return r === "at-risk" || r === "overdue";
  });
  const done = jobs.filter((j) => j.status === "Done" || j.status === "Invoiced");

  // group by status, only non-empty groups
  const groups = JOB_STATUSES.map((status) => ({
    status,
    jobs: jobs.filter((j) => j.status === status),
  })).filter((g) => g.jobs.length > 0);

  return (
    <Container className="max-w-5xl py-8">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-ink">
            Dashboard
          </h1>
          <p className="mt-1 text-sm text-ink-soft">
            Every turn, by status, with deadline countdowns.
          </p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <KpiCard icon={Inbox} label="Needs a quote" value={needsQuote.length} tone="brand" />
        <KpiCard icon={Hammer} label="Open jobs" value={open.length} tone="neutral" />
        <KpiCard icon={AlertTriangle} label="At risk" value={atRisk.length} tone="warning" />
        <KpiCard icon={CheckCircle2} label="Completed" value={done.length} tone="success" />
      </div>

      {/* At-risk highlight */}
      {atRisk.length > 0 && (
        <section className="mt-8">
          <h2 className="mb-3 flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-wide text-danger">
            <AlertTriangle size={15} /> At risk, needs attention
          </h2>
          <div className="space-y-2.5">
            {atRisk.map((job) => (
              <JobRow key={job.id} job={job} />
            ))}
          </div>
        </section>
      )}

      {/* Empty state */}
      {jobs.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-line bg-surface p-12 text-center">
          <span className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-brand-tint text-brand">
            <FileText size={24} />
          </span>
          <h3 className="mt-4 font-display text-lg font-semibold text-ink">
            No turn requests yet
          </h3>
          <p className="mx-auto mt-1 max-w-sm text-sm text-ink-soft">
            When a landlord submits a request, it lands here. Try it yourself.
            Open the public request form and submit a unit.
          </p>
          <Link
            href="/request"
            target="_blank"
            className="mt-5 inline-flex items-center justify-center rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-accent-hover"
          >
            Open request form
          </Link>
        </div>
      ) : (
        <div className="mt-8 space-y-8">
          {groups.map((g) => (
            <section key={g.status}>
              <h2 className="mb-3 flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-wide text-ink-soft">
                {g.status}
                <span className="rounded-full bg-canvas px-2 py-0.5 text-xs">
                  {g.jobs.length}
                </span>
              </h2>
              <div className="space-y-2.5">
                {g.jobs.map((job) => (
                  <JobRow key={job.id} job={job} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </Container>
  );
}
