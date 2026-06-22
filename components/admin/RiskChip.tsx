import { AlertTriangle, Clock } from "lucide-react";
import { riskFor } from "@/lib/risk";
import type { Job } from "@/lib/types";
import { cn } from "@/lib/utils";

const styles = {
  overdue: "bg-danger/10 text-danger",
  "at-risk": "bg-warning/15 text-amber-700",
  soon: "bg-brand-tint text-brand",
  none: "bg-canvas text-ink-soft border border-line",
} as const;

/** Due-date countdown pill driven by the §7 guardrail logic. */
export function RiskChip({ job }: { job: Job }) {
  const risk = riskFor(job);
  const danger = risk.level === "overdue" || risk.level === "at-risk";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium",
        styles[risk.level],
      )}
    >
      {danger ? <AlertTriangle size={12} /> : <Clock size={12} />}
      {risk.label}
    </span>
  );
}
