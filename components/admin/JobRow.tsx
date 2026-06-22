import Link from "next/link";
import { ChevronRight, ImageIcon } from "lucide-react";
import { JobStatusBadge } from "./JobStatusBadge";
import { RiskChip } from "./RiskChip";
import type { JobWithRelations } from "@/lib/db/jobs";
import { formatMoney } from "@/lib/utils";

export function JobRow({ job }: { job: JobWithRelations }) {
  return (
    <Link
      href={`/admin/jobs/${job.id}`}
      className="flex items-center gap-4 rounded-xl border border-line bg-surface px-4 py-3.5 shadow-sm transition hover:border-brand/40 hover:shadow-md"
    >
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="truncate font-medium text-ink">
            {job.property?.address ?? "Unit"}
            {job.property?.unitNumber ? ` · ${job.property.unitNumber}` : ""}
          </p>
        </div>
        <p className="mt-0.5 truncate text-sm text-ink-soft">
          {job.customer?.name ?? "-"}
          {job.customer?.company ? ` · ${job.customer.company}` : ""}
        </p>
      </div>

      <div className="hidden items-center gap-1.5 text-xs text-ink-soft sm:flex">
        <ImageIcon size={14} />
        {job.requestPhotos.length}
      </div>

      {job.quoteTotal != null && (
        <div className="hidden text-sm font-semibold text-ink sm:block">
          {formatMoney(job.quoteTotal)}
        </div>
      )}

      <RiskChip job={job} />
      <JobStatusBadge status={job.status} />
      <ChevronRight size={18} className="shrink-0 text-ink-soft" />
    </Link>
  );
}
