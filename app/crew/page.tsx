import Link from "next/link";
import { ChevronRight, ClipboardList, CheckCircle2 } from "lucide-react";
import { getCrewId } from "@/lib/crew-session";
import { listCrew } from "@/lib/db/crew";
import { listJobsForCrew, type JobWithRelations } from "@/lib/db/jobs";
import { JobStatusBadge } from "@/components/admin/JobStatusBadge";
import { RiskChip } from "@/components/admin/RiskChip";
import { CrewPicker } from "@/components/crew/CrewPicker";

export const metadata = { title: "My jobs" };
export const dynamic = "force-dynamic";

function JobCard({ job }: { job: JobWithRelations }) {
  return (
    <Link
      href={`/crew/jobs/${job.id}`}
      className="flex items-center gap-3 rounded-xl border border-line bg-surface px-4 py-4 shadow-sm transition hover:border-brand/40 hover:shadow-md"
    >
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium text-ink">
          {job.property?.address ?? "Unit"}
          {job.property?.unitNumber ? ` · ${job.property.unitNumber}` : ""}
        </p>
        <div className="mt-1.5 flex flex-wrap items-center gap-2">
          <JobStatusBadge status={job.status} />
          <RiskChip job={job} />
        </div>
      </div>
      <ChevronRight size={18} className="shrink-0 text-ink-soft" />
    </Link>
  );
}

export default async function CrewHome() {
  const crewId = await getCrewId();
  const crew = await listCrew();
  const me = crew.find((c) => c.id === crewId);

  if (!me) {
    return <CrewPicker crew={crew} />;
  }

  const jobs = await listJobsForCrew(me.id);
  const active = jobs.filter(
    (j) => j.status === "Scheduled" || j.status === "In Progress",
  );
  const upcoming = jobs.filter(
    (j) => j.status !== "Scheduled" && j.status !== "In Progress" && j.status !== "Done" && j.status !== "Invoiced",
  );
  const done = jobs.filter((j) => j.status === "Done" || j.status === "Invoiced");

  return (
    <div className="space-y-7">
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight text-ink">
          Hi {me.name.split(" ")[0]}
        </h1>
        <p className="mt-1 text-sm text-ink-soft">
          {active.length > 0
            ? `${active.length} job${active.length === 1 ? "" : "s"} to work on.`
            : "Nothing active right now."}
        </p>
      </div>

      {jobs.length === 0 && (
        <div className="rounded-2xl border border-dashed border-line bg-surface p-10 text-center">
          <span className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-brand-tint text-brand">
            <ClipboardList size={24} />
          </span>
          <h3 className="mt-4 font-display text-lg font-semibold text-ink">
            No jobs assigned yet
          </h3>
          <p className="mx-auto mt-1 max-w-xs text-sm text-ink-soft">
            When the dispatcher assigns you to a turn, it shows up here.
          </p>
        </div>
      )}

      {active.length > 0 && (
        <section>
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink-soft">
            To do
          </h2>
          <div className="space-y-2.5">
            {active.map((j) => (
              <JobCard key={j.id} job={j} />
            ))}
          </div>
        </section>
      )}

      {upcoming.length > 0 && (
        <section>
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink-soft">
            Not started
          </h2>
          <div className="space-y-2.5">
            {upcoming.map((j) => (
              <JobCard key={j.id} job={j} />
            ))}
          </div>
        </section>
      )}

      {done.length > 0 && (
        <section>
          <h2 className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-ink-soft">
            <CheckCircle2 size={13} /> Completed
          </h2>
          <div className="space-y-2.5">
            {done.map((j) => (
              <JobCard key={j.id} job={j} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
