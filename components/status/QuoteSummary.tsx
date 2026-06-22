import { CheckCircle2 } from "lucide-react";
import type { JobStatus, LineItem } from "@/lib/types";
import { UNIT_LABEL } from "@/lib/services";
import { formatMoney } from "@/lib/utils";
import { ApproveQuote } from "./ApproveQuote";

const APPROVED_OR_LATER: JobStatus[] = [
  "Approved",
  "Scheduled",
  "In Progress",
  "Done",
  "Invoiced",
];

export function QuoteSummary({
  token,
  status,
  lineItems,
  total,
}: {
  token: string;
  status: JobStatus;
  lineItems: LineItem[];
  total?: number;
}) {
  // No quote yet. Keep the "preparing it" placeholder.
  if (lineItems.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-line bg-canvas p-6">
        <h3 className="font-display text-base font-semibold text-ink">
          Your quote
        </h3>
        <p className="mt-1 text-sm text-ink-soft">
          Your line-item quote will appear here to review and approve.
          We&apos;re preparing it now.
        </p>
      </div>
    );
  }

  const approved = APPROVED_OR_LATER.includes(status);

  return (
    <div className="rounded-2xl border border-line bg-surface p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-base font-semibold text-ink">
          Your quote
        </h3>
        {approved && (
          <span className="inline-flex items-center gap-1 rounded-full bg-success/10 px-2.5 py-0.5 text-xs font-medium text-green-700">
            <CheckCircle2 size={12} /> Approved
          </span>
        )}
      </div>

      <ul className="mt-4 divide-y divide-line">
        {lineItems.map((li) => (
          <li key={li.id} className="flex items-center justify-between gap-3 py-2.5">
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-ink">
                {li.serviceName}
              </p>
              <p className="text-xs text-ink-soft">
                {li.qty} × {formatMoney(li.price)} · {UNIT_LABEL[li.unitType]}
              </p>
            </div>
            <span className="shrink-0 text-sm font-semibold text-ink">
              {formatMoney(li.qty * li.price)}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-3 flex items-center justify-between border-t border-line pt-3">
        <span className="text-sm font-medium text-ink-soft">Total</span>
        <span className="font-display text-2xl font-bold text-ink">
          {formatMoney(total ?? 0)}
        </span>
      </div>

      {status === "Quoted" && (
        <div className="mt-5">
          <ApproveQuote token={token} />
        </div>
      )}
      {approved && (
        <p className="mt-4 text-sm text-ink-soft">
          Thanks, your quote is approved. We&apos;ll schedule your crew and keep
          you posted.
        </p>
      )}
    </div>
  );
}
