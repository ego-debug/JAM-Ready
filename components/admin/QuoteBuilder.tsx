"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Lock, Check, Loader2 } from "lucide-react";
import {
  GREEN_SERVICES,
  LOCKED_SERVICES,
  UNIT_LABEL,
  type ServiceDef,
} from "@/lib/services";
import type { LineItem, UnitType } from "@/lib/types";
import { formatMoney, cn } from "@/lib/utils";

interface Row {
  key: string;
  serviceName: string;
  unitType: UnitType;
  qty: number;
  price: number;
}

let counter = 0;
const rowKey = () => `row-${counter++}`;

export function QuoteBuilder({
  jobId,
  initialItems,
}: {
  jobId: string;
  initialItems: LineItem[];
}) {
  const router = useRouter();
  const [rows, setRows] = useState<Row[]>(
    initialItems.map((li) => ({
      key: rowKey(),
      serviceName: li.serviceName,
      unitType: li.unitType,
      qty: li.qty,
      price: li.price,
    })),
  );
  const [adding, setAdding] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const total = rows.reduce((s, r) => s + r.qty * r.price, 0);

  function addService(def: ServiceDef) {
    setRows((r) => [
      ...r,
      {
        key: rowKey(),
        serviceName: def.name,
        unitType: def.unitType,
        qty: 1,
        price: def.defaultPrice,
      },
    ]);
    setAdding(false);
    setSaved(false);
  }

  function update(key: string, patch: Partial<Row>) {
    setRows((r) => r.map((row) => (row.key === key ? { ...row, ...patch } : row)));
    setSaved(false);
  }

  function remove(key: string) {
    setRows((r) => r.filter((row) => row.key !== key));
    setSaved(false);
  }

  async function save() {
    if (saving) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/jobs/${jobId}/quote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: rows.map((r) => ({
            serviceName: r.serviceName,
            lane: "green",
            unitType: r.unitType,
            qty: r.qty,
            price: r.price,
          })),
        }),
      });
      if (res.ok) {
        setSaved(true);
        router.refresh();
      }
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="rounded-2xl border border-line bg-surface p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-base font-semibold text-ink">
          Quote builder
        </h3>
        <span className="text-sm text-ink-soft">
          {rows.length} line item{rows.length === 1 ? "" : "s"}
        </span>
      </div>

      {/* line items */}
      <div className="mt-4 space-y-2">
        {rows.length === 0 && (
          <p className="rounded-lg border border-dashed border-line bg-canvas px-4 py-6 text-center text-sm text-ink-soft">
            No services added yet. Add from the menu below to build the quote.
          </p>
        )}
        {rows.map((r) => (
          <div
            key={r.key}
            className="flex flex-wrap items-center gap-3 rounded-lg border border-line bg-canvas px-3 py-2.5"
          >
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-ink">
                {r.serviceName}
              </p>
              <p className="text-xs text-ink-soft">{UNIT_LABEL[r.unitType]}</p>
            </div>
            <label className="flex items-center gap-1.5 text-xs text-ink-soft">
              Qty
              <input
                type="number"
                min={1}
                value={r.qty}
                onChange={(e) =>
                  update(r.key, { qty: Math.max(1, Number(e.target.value) || 1) })
                }
                className="w-16 rounded-md border border-line bg-surface px-2 py-1.5 text-sm text-ink outline-none focus:border-brand focus:ring-2 focus:ring-brand/30"
              />
            </label>
            <label className="flex items-center gap-1.5 text-xs text-ink-soft">
              $
              <input
                type="number"
                min={0}
                value={r.price}
                onChange={(e) =>
                  update(r.key, { price: Math.max(0, Number(e.target.value) || 0) })
                }
                className="w-24 rounded-md border border-line bg-surface px-2 py-1.5 text-sm text-ink outline-none focus:border-brand focus:ring-2 focus:ring-brand/30"
              />
            </label>
            <div className="w-20 text-right text-sm font-semibold text-ink">
              {formatMoney(r.qty * r.price)}
            </div>
            <button
              onClick={() => remove(r.key)}
              className="grid h-8 w-8 place-items-center rounded-md text-ink-soft hover:bg-danger/10 hover:text-danger"
              aria-label="Remove line item"
            >
              <Trash2 size={15} />
            </button>
          </div>
        ))}
      </div>

      {/* add service */}
      <div className="mt-4">
        {!adding ? (
          <button
            onClick={() => setAdding(true)}
            className="inline-flex items-center gap-2 rounded-lg border border-line bg-surface px-3.5 py-2 text-sm font-medium text-brand hover:bg-brand/5"
          >
            <Plus size={16} /> Add a service
          </button>
        ) : (
          <div className="rounded-xl border border-line bg-canvas p-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-soft">
              In-lane services
            </p>
            <div className="grid gap-1.5 sm:grid-cols-2">
              {GREEN_SERVICES.map((s) => (
                <button
                  key={s.id}
                  onClick={() => addService(s)}
                  className="flex items-center justify-between gap-2 rounded-lg border border-line bg-surface px-3 py-2 text-left text-sm text-ink transition hover:border-brand/40 hover:bg-brand/5"
                >
                  <span className="min-w-0 truncate">{s.name}</span>
                  <span className="shrink-0 text-xs text-ink-soft">
                    {formatMoney(s.defaultPrice)}
                  </span>
                </button>
              ))}
            </div>

            <p className="mb-2 mt-4 text-xs font-semibold uppercase tracking-wide text-ink-soft">
              Electrical, HVAC &amp; plumbing: coordinated via licensed partner, quoted separately
            </p>
            <div className="grid gap-1.5 sm:grid-cols-2">
              {LOCKED_SERVICES.map((s) => (
                <div
                  key={s.id}
                  className="flex cursor-not-allowed items-center justify-between gap-2 rounded-lg border border-dashed border-line bg-canvas px-3 py-2 text-left text-sm text-ink-soft opacity-80"
                  title={s.lockedReason}
                >
                  <span className="min-w-0 truncate">{s.name}</span>
                  <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-line/40 px-2 py-0.5 text-[11px] font-medium">
                    <Lock size={11} /> Locked
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setAdding(false)}
              className="mt-3 text-sm font-medium text-ink-soft hover:text-ink"
            >
              Done adding
            </button>
          </div>
        )}
      </div>

      {/* total + save */}
      <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
        <div>
          <p className="text-xs text-ink-soft">Quote total</p>
          <p className="font-display text-2xl font-bold text-ink">
            {formatMoney(total)}
          </p>
        </div>
        <button
          onClick={save}
          disabled={saving}
          className={cn(
            "inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition disabled:opacity-60",
            saved ? "bg-success" : "bg-accent hover:bg-accent-hover",
          )}
        >
          {saving ? (
            <Loader2 size={16} className="animate-spin" />
          ) : saved ? (
            <Check size={16} />
          ) : null}
          {saving ? "Saving" : saved ? "Quote saved" : "Save quote"}
        </button>
      </div>
    </div>
  );
}
