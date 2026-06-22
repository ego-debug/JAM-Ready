"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Receipt, Loader2, Send, Check, RotateCcw } from "lucide-react";
import type { Invoice } from "@/lib/types";
import { Badge } from "@/components/ui/Badge";
import { formatMoney, formatLongDate } from "@/lib/utils";

export function InvoicePanel({
  jobId,
  invoice,
  quoteTotal,
}: {
  jobId: string;
  invoice: Invoice | null;
  quoteTotal?: number;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  const amount = invoice?.amount ?? quoteTotal;
  const hasQuote = (quoteTotal ?? 0) > 0 || (invoice?.amount ?? 0) > 0;

  async function act(action: string) {
    if (busy) return;
    setBusy(true);
    try {
      const res = await fetch(`/api/admin/jobs/${jobId}/invoice`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });
      if (res.ok) router.refresh();
    } finally {
      setBusy(false);
    }
  }

  const tone =
    invoice?.status === "paid"
      ? "success"
      : invoice?.status === "sent"
        ? "info"
        : "neutral";

  return (
    <div className="rounded-2xl border border-line bg-surface p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-2 font-display text-base font-semibold text-ink">
          <Receipt size={18} className="text-ink-soft" /> Invoice
        </h3>
        {invoice && (
          <Badge tone={tone} className="capitalize">
            {invoice.status}
          </Badge>
        )}
      </div>

      {!hasQuote ? (
        <p className="mt-3 text-sm text-ink-soft">
          Build a quote first. The invoice is generated from the quote total.
        </p>
      ) : (
        <>
          <div className="mt-3">
            <p className="text-xs text-ink-soft">Amount</p>
            <p className="font-display text-2xl font-bold text-ink">
              {formatMoney(amount ?? 0)}
            </p>
            {invoice?.sentAt && (
              <p className="mt-1 text-xs text-ink-soft">
                Sent {formatLongDate(invoice.sentAt)}
              </p>
            )}
          </div>

          <div className="mt-4 space-y-2">
            {!invoice && (
              <button
                onClick={() => act("create")}
                disabled={busy}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-line bg-surface px-4 py-2.5 text-sm font-semibold text-ink shadow-sm transition hover:bg-canvas disabled:opacity-60"
              >
                {busy ? <Loader2 size={16} className="animate-spin" /> : <Receipt size={16} />}
                Create draft invoice
              </button>
            )}

            {invoice && invoice.status !== "paid" && (
              <button
                onClick={() => act(invoice.status === "draft" ? "send" : "paid")}
                disabled={busy}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-accent-hover disabled:opacity-60"
              >
                {busy ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : invoice.status === "draft" ? (
                  <Send size={16} />
                ) : (
                  <Check size={16} />
                )}
                {invoice.status === "draft" ? "Send invoice" : "Mark paid"}
              </button>
            )}

            {invoice?.status === "paid" && (
              <div className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-success/10 px-4 py-2.5 text-sm font-semibold text-green-700">
                <Check size={16} /> Paid in full
              </div>
            )}

            {invoice?.status === "paid" && (
              <button
                onClick={() => act("unpaid")}
                disabled={busy}
                className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-ink-soft hover:text-ink"
              >
                <RotateCcw size={13} /> Mark unpaid
              </button>
            )}
          </div>

          {invoice && invoice.status === "draft" && (
            <p className="mt-2 text-xs text-ink-soft">
              Sending marks the job <span className="font-medium">Invoiced</span>{" "}
              and shows the invoice on the customer&apos;s status page.
            </p>
          )}
        </>
      )}
    </div>
  );
}
