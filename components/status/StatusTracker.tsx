import { Check } from "lucide-react";
import { JOB_STATUSES, type JobStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

/** Customer-facing summary of the 7-state job flow (spec §4). */
const friendly: Record<JobStatus, string> = {
  Requested: "Request received",
  Quoted: "Quote ready",
  Approved: "Quote approved",
  Scheduled: "Crew scheduled",
  "In Progress": "Work underway",
  Done: "Finished, photos sent",
  Invoiced: "Invoiced",
};

export function StatusTracker({ status }: { status: JobStatus }) {
  const current = JOB_STATUSES.indexOf(status);

  return (
    <ol className="space-y-0">
      {JOB_STATUSES.map((s, i) => {
        const done = i < current;
        const active = i === current;
        const last = i === JOB_STATUSES.length - 1;
        return (
          <li key={s} className="flex gap-3.5">
            <div className="flex flex-col items-center">
              <span
                className={cn(
                  "grid h-7 w-7 shrink-0 place-items-center rounded-full border text-xs font-semibold",
                  done && "border-success bg-success text-white",
                  active && "border-brand bg-brand text-white",
                  !done && !active && "border-line bg-surface text-ink-soft",
                )}
              >
                {done ? <Check size={14} /> : i + 1}
              </span>
              {!last && (
                <span
                  className={cn(
                    "my-0.5 w-0.5 flex-1",
                    i < current ? "bg-success" : "bg-line",
                  )}
                  style={{ minHeight: 18 }}
                />
              )}
            </div>
            <div className={cn("pb-4", last && "pb-0")}>
              <div
                className={cn(
                  "text-sm font-medium",
                  active ? "text-ink" : done ? "text-ink" : "text-ink-soft",
                )}
              >
                {friendly[s]}
              </div>
              {active && (
                <div className="mt-0.5 text-xs font-medium text-brand">
                  Current step
                </div>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
