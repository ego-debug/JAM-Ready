import type { Job } from "@/lib/types";
import { toDate } from "@/lib/utils";

/**
 * Due-date guardrails (BUILD-SPEC §7). A job within 48h of its due date and
 * not yet Done is AT-RISK; past the due date and not Done is OVERDUE.
 */

export type RiskLevel = "none" | "soon" | "at-risk" | "overdue";

export interface RiskInfo {
  level: RiskLevel;
  /** human countdown, e.g. "Due in 2d", "Due today", "3d overdue" */
  label: string;
  msRemaining: number | null;
}

const DAY = 86_400_000;

export function riskFor(job: Job, now: number = Date.now()): RiskInfo {
  const dueDate = toDate(job.dueDate);
  if (!dueDate) {
    return { level: "none", label: "No deadline", msRemaining: null };
  }
  const closed = job.status === "Done" || job.status === "Invoiced";
  // count to the END of the due day; a job due today isn't overdue until midnight
  const due = dueDate.getTime() + DAY - 1;
  const ms = due - now;

  const label = countdownLabel(ms);

  if (closed) return { level: "none", label, msRemaining: ms };
  if (ms < 0) return { level: "overdue", label, msRemaining: ms };
  if (ms <= 2 * DAY) return { level: "at-risk", label, msRemaining: ms };
  if (ms <= 5 * DAY) return { level: "soon", label, msRemaining: ms };
  return { level: "none", label, msRemaining: ms };
}

function countdownLabel(ms: number): string {
  const overdue = ms < 0;
  const days = Math.floor(Math.abs(ms) / DAY);
  const hours = Math.floor((Math.abs(ms) % DAY) / 3_600_000);

  if (overdue) {
    if (days >= 1) return `${days}d overdue`;
    return `${Math.max(1, hours)}h overdue`;
  }
  if (days === 0 && hours <= 24) {
    if (ms < 12 * 3_600_000) return "Due today";
    return "Due tomorrow";
  }
  return `Due in ${days}d`;
}
