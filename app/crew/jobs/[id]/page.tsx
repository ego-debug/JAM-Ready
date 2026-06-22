import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin, CalendarClock } from "lucide-react";
import { getJobById } from "@/lib/db/jobs";
import { getChecklist } from "@/lib/db/tasks";
import { JobStatusBadge } from "@/components/admin/JobStatusBadge";
import { RiskChip } from "@/components/admin/RiskChip";
import { CrewChecklist, type ChecklistItem } from "@/components/crew/CrewChecklist";
import { formatLongDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function CrewJobPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const job = await getJobById(id);
  if (!job) notFound();

  const checklist = await getChecklist(id);
  const items: ChecklistItem[] = checklist.map(({ task, lineItem }) => ({
    taskId: task.id,
    serviceName: lineItem.serviceName,
    qty: lineItem.qty,
    unitType: lineItem.unitType,
    completed: task.completed,
    beforePhoto: task.beforePhoto,
    afterPhoto: task.afterPhoto,
  }));

  return (
    <div className="space-y-6">
      <Link
        href="/crew"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft hover:text-ink"
      >
        <ArrowLeft size={16} /> My jobs
      </Link>

      <div>
        <div className="flex flex-wrap items-center gap-2">
          <JobStatusBadge status={job.status} />
          <RiskChip job={job} />
        </div>
        <h1 className="mt-2 font-display text-2xl font-bold tracking-tight text-ink">
          {job.property?.address ?? "Unit"}
          {job.property?.unitNumber ? ` · Unit ${job.property.unitNumber}` : ""}
        </h1>
        <div className="mt-2 space-y-1 text-sm text-ink-soft">
          <p className="flex items-center gap-1.5">
            <CalendarClock size={14} /> Due {formatLongDate(job.dueDate)}
          </p>
          {(job.property?.beds != null || job.property?.baths != null) && (
            <p className="flex items-center gap-1.5">
              <MapPin size={14} /> {job.property?.beds ?? "?"} bd / {job.property?.baths ?? "?"} ba
            </p>
          )}
        </div>
        {job.notes && (
          <div className="mt-3 rounded-lg bg-brand-tint/60 p-3 text-sm text-ink">
            <p className="text-xs font-semibold text-brand">Job notes</p>
            <p className="mt-0.5">{job.notes}</p>
          </div>
        )}
      </div>

      <CrewChecklist jobId={job.id} status={job.status} items={items} />
    </div>
  );
}
