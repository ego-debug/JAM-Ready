"use client";

import { useState } from "react";
import { RotateCcw } from "lucide-react";
import { GREEN_SERVICES, UNIT_LABEL } from "@/lib/services";

const money = (n: number) => "$" + Math.round(n).toLocaleString("en-US");

const field =
  "w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm text-ink outline-none focus:border-accent";

function NumField({
  label,
  value,
  onChange,
  prefix,
  suffix,
  step = 1,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
  prefix?: string;
  suffix?: string;
  step?: number;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold text-ink-soft">{label}</span>
      <div className="flex items-center gap-1.5">
        {prefix && <span className="text-sm text-muted">{prefix}</span>}
        <input
          type="number"
          min={0}
          step={step}
          value={value === 0 ? "" : value}
          placeholder="0"
          onChange={(e) => onChange(Math.max(0, Number(e.target.value) || 0))}
          className={field}
        />
        {suffix && <span className="shrink-0 text-xs text-muted">{suffix}</span>}
      </div>
    </label>
  );
}

export function ProfitCalculator() {
  const [qty, setQty] = useState<Record<string, number>>({});
  const [helperHours, setHelperHours] = useState(12);
  const [helperRate, setHelperRate] = useState(25);
  const [ownerInField, setOwnerInField] = useState(true);
  const [ownerHours, setOwnerHours] = useState(14);
  const [ownerWage, setOwnerWage] = useState(40);
  const [overhead, setOverhead] = useState(150);
  const [reserve, setReserve] = useState(30);
  const [ownerASplit, setOwnerASplit] = useState(50);

  const revenue = GREEN_SERVICES.reduce(
    (s, svc) => s + (qty[svc.id] || 0) * svc.defaultPrice,
    0,
  );
  const helperCost = helperHours * helperRate;
  const ownerLabor = ownerInField ? ownerHours * ownerWage : 0;
  const costs = helperCost + ownerLabor + overhead;
  const profit = revenue - costs;
  const margin = revenue > 0 ? (profit / revenue) * 100 : 0;
  const reserveAmt = profit > 0 ? (profit * reserve) / 100 : 0;
  const ownerPool = profit - reserveAmt;
  const ownerAShare = (ownerPool * ownerASplit) / 100;
  const ownerBShare = ownerPool - ownerAShare;
  const ownerATakeHome = ownerAShare + ownerLabor;

  return (
    <div className="grid gap-6 lg:grid-cols-[1.25fr_1fr]">
      {/* line items */}
      <div className="rounded-2xl border border-line bg-surface">
        <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
          <h2 className="text-sm font-bold text-ink">Job, labor billed</h2>
          <button
            type="button"
            onClick={() => setQty({})}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink-soft hover:text-ink"
          >
            <RotateCcw size={13} /> Clear
          </button>
        </div>
        <div className="divide-y divide-line">
          {GREEN_SERVICES.map((svc) => {
            const q = qty[svc.id] || 0;
            const line = q * svc.defaultPrice;
            return (
              <div key={svc.id} className="flex items-center gap-3 px-5 py-2.5">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13.5px] font-medium text-ink">{svc.name}</p>
                  <p className="text-xs text-muted">
                    {money(svc.defaultPrice)} {UNIT_LABEL[svc.unitType]}
                  </p>
                </div>
                <input
                  type="number"
                  min={0}
                  step={svc.unitType === "per_sqft" ? 10 : 1}
                  value={q === 0 ? "" : q}
                  placeholder="0"
                  onChange={(e) =>
                    setQty((p) => ({ ...p, [svc.id]: Math.max(0, Number(e.target.value) || 0) }))
                  }
                  className="w-20 rounded-lg border border-line bg-surface px-2.5 py-1.5 text-right text-sm text-ink outline-none focus:border-accent"
                />
                <span className="w-20 shrink-0 text-right text-[13.5px] font-semibold text-ink">
                  {line ? money(line) : "-"}
                </span>
              </div>
            );
          })}
        </div>
        <div className="flex items-center justify-between border-t border-line px-5 py-3.5">
          <span className="text-sm font-semibold text-ink-soft">Revenue (labor)</span>
          <span className="text-lg font-extrabold text-ink">{money(revenue)}</span>
        </div>
      </div>

      {/* costs + result */}
      <div className="space-y-4">
        <div className="rounded-2xl border border-line bg-surface p-5">
          <h2 className="text-sm font-bold text-ink">Costs</h2>

          <div className="mt-3 grid grid-cols-2 gap-3">
            <NumField label="Crew / helper hours" value={helperHours} onChange={setHelperHours} />
            <NumField label="Crew $/hr" value={helperRate} onChange={setHelperRate} prefix="$" />
          </div>

          <label className="mt-4 flex items-center gap-2.5 text-[13px] font-semibold text-ink">
            <input
              type="checkbox"
              checked={ownerInField}
              onChange={(e) => setOwnerInField(e.target.checked)}
              className="h-4 w-4 accent-[#1dba9a]"
            />
            An owner works this turn in the field
          </label>
          {ownerInField && (
            <div className="mt-3 grid grid-cols-2 gap-3">
              <NumField label="Owner field hours" value={ownerHours} onChange={setOwnerHours} />
              <NumField label="Owner $/hr" value={ownerWage} onChange={setOwnerWage} prefix="$" />
            </div>
          )}

          <div className="mt-3 grid grid-cols-2 gap-3">
            <NumField label="Overhead (gas, tools, ins.)" value={overhead} onChange={setOverhead} prefix="$" step={10} />
            <NumField label="Company keeps (taxes, savings)" value={reserve} onChange={(n) => setReserve(Math.min(100, n))} suffix="%" />
            <NumField label="Owner A profit share" value={ownerASplit} onChange={(n) => setOwnerASplit(Math.min(100, n))} suffix="%" />
          </div>
        </div>

        <div className="rounded-2xl border border-line bg-canvas p-5">
          <Row label="Revenue" value={money(revenue)} />
          <Row label="Crew labor" value={"- " + money(helperCost)} muted />
          {ownerInField && <Row label="Owner field labor" value={"- " + money(ownerLabor)} muted />}
          <Row label="Overhead" value={"- " + money(overhead)} muted />
          <div className="my-2.5 border-t border-line" />
          <div className="flex items-baseline justify-between">
            <span className="text-sm font-bold text-ink">Job profit</span>
            <span className={"text-2xl font-extrabold " + (profit >= 0 ? "text-accent" : "text-danger")}>
              {money(profit)}
            </span>
          </div>
          <p className="mt-0.5 text-right text-xs text-muted">
            {revenue > 0 ? Math.round(margin) + "% margin" : "add line items"}
          </p>

          <div className="mt-3 border-t border-line pt-3">
            <Row label={`Company keeps (${reserve}% taxes, savings)`} value={"- " + money(reserveAmt)} muted />
            <Row label="Owners split" value={money(ownerPool)} muted />
          </div>

          <div className="mt-4 border-t border-line pt-3">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
              Each owner takes home
            </p>

            <div className="flex items-baseline justify-between">
              <span className="text-[13px] font-semibold text-ink">
                Owner A{ownerInField ? " (in the field)" : ""}
              </span>
              <span className="text-[15px] font-extrabold text-ink">{money(ownerATakeHome)}</span>
            </div>
            <p className="mt-0.5 text-[11px] text-muted">
              {ownerInField
                ? `${money(ownerLabor)} field pay + ${money(ownerAShare)} profit share`
                : `${ownerASplit}% profit share`}
            </p>

            <div className="mt-2.5 flex items-baseline justify-between">
              <span className="text-[13px] font-semibold text-ink">Owner B</span>
              <span className="text-[15px] font-extrabold text-ink">{money(ownerBShare)}</span>
            </div>
            <p className="mt-0.5 text-[11px] text-muted">{100 - ownerASplit}% profit share</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, muted }: { label: string; value: string; muted?: boolean }) {
  return (
    <div className="flex items-baseline justify-between py-0.5">
      <span className={"text-[13px] " + (muted ? "text-ink-soft" : "font-semibold text-ink")}>
        {label}
      </span>
      <span className={"text-[13px] tabular-nums " + (muted ? "text-ink-soft" : "font-semibold text-ink")}>
        {value}
      </span>
    </div>
  );
}
