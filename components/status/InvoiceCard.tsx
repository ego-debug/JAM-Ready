import { Receipt, CheckCircle2 } from "lucide-react";
import type { Invoice } from "@/lib/types";
import { formatMoney, formatLongDate } from "@/lib/utils";

/** Customer-facing invoice. Hidden until the admin actually sends it. */
export function InvoiceCard({ invoice }: { invoice: Invoice | null }) {
  if (!invoice || invoice.status === "draft") return null;

  const paid = invoice.status === "paid";

  return (
    <div className="rounded-2xl border border-line bg-surface p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-2 font-display text-base font-semibold text-ink">
          <Receipt size={18} className="text-ink-soft" /> Invoice
        </h3>
        {paid ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-success/10 px-2.5 py-0.5 text-xs font-medium text-green-700">
            <CheckCircle2 size={12} /> Paid
          </span>
        ) : (
          <span className="rounded-full bg-info/10 px-2.5 py-0.5 text-xs font-medium text-sky-700">
            Due
          </span>
        )}
      </div>

      <div className="mt-3 flex items-end justify-between">
        <div>
          <p className="text-xs text-ink-soft">Amount</p>
          <p className="font-display text-2xl font-bold text-ink">
            {formatMoney(invoice.amount)}
          </p>
        </div>
        {invoice.sentAt && (
          <p className="text-xs text-ink-soft">
            Sent {formatLongDate(invoice.sentAt)}
          </p>
        )}
      </div>

      <p className="mt-3 text-xs text-ink-soft">
        {paid
          ? "Thanks, payment received."
          : "We'll reach out with payment details. Thanks for your business!"}
      </p>
    </div>
  );
}
