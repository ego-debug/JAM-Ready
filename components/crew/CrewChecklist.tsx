"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Check,
  Camera,
  Loader2,
  Play,
  CheckCircle2,
  AlertTriangle,
  Circle,
} from "lucide-react";
import type { JobStatus, UnitType } from "@/lib/types";
import { UNIT_LABEL } from "@/lib/services";
import { cn } from "@/lib/utils";

export interface ChecklistItem {
  taskId: string;
  serviceName: string;
  qty: number;
  unitType: UnitType;
  completed: boolean;
  beforePhoto?: string;
  afterPhoto?: string;
}

function PhotoSlot({
  label,
  url,
  uploading,
  onPick,
}: {
  label: string;
  url?: string;
  uploading: boolean;
  onPick: (file: File) => void;
}) {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <div className="flex-1">
      <input
        ref={ref}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) onPick(f);
          e.target.value = "";
        }}
      />
      <button
        type="button"
        onClick={() => ref.current?.click()}
        disabled={uploading}
        className={cn(
          "relative flex aspect-square w-full flex-col items-center justify-center gap-1 overflow-hidden rounded-lg border text-xs font-medium transition",
          url
            ? "border-success"
            : "border-2 border-dashed border-line bg-canvas text-ink-soft hover:border-brand hover:text-brand",
        )}
      >
        {url ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={url} alt={label} className="absolute inset-0 h-full w-full object-cover" />
            <span className="absolute right-1 top-1 grid h-5 w-5 place-items-center rounded-full bg-success text-white">
              <Check size={12} />
            </span>
          </>
        ) : uploading ? (
          <Loader2 size={18} className="animate-spin" />
        ) : (
          <>
            <Camera size={18} />
            {label}
          </>
        )}
      </button>
    </div>
  );
}

export function CrewChecklist({
  jobId,
  status,
  items,
}: {
  jobId: string;
  status: JobStatus;
  items: ChecklistItem[];
}) {
  const router = useRouter();
  const [rows, setRows] = useState<ChecklistItem[]>(items);
  const [uploading, setUploading] = useState<Record<string, boolean>>({});
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const doneCount = rows.filter((r) => r.completed).length;
  const hasAfter = rows.some((r) => r.afterPhoto);

  function patch(taskId: string, p: Partial<ChecklistItem>) {
    setRows((r) => r.map((x) => (x.taskId === taskId ? { ...x, ...p } : x)));
  }

  async function toggle(item: ChecklistItem) {
    const next = !item.completed;
    patch(item.taskId, { completed: next });
    await fetch(`/api/crew/jobs/${jobId}/task`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ taskId: item.taskId, completed: next }),
    });
  }

  async function upload(taskId: string, which: "before" | "after", file: File) {
    const key = `${taskId}:${which}`;
    setUploading((u) => ({ ...u, [key]: true }));
    try {
      const fd = new FormData();
      fd.append("taskId", taskId);
      fd.append("which", which);
      fd.append("photo", file);
      const res = await fetch(`/api/crew/jobs/${jobId}/task-photo`, {
        method: "POST",
        body: fd,
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.url) {
        patch(taskId, which === "before" ? { beforePhoto: data.url } : { afterPhoto: data.url });
      }
    } finally {
      setUploading((u) => ({ ...u, [key]: false }));
    }
  }

  async function setStatus(target: JobStatus) {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/jobs/${jobId}/status`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: target }),
      });
      if (res.ok) {
        router.refresh();
      } else {
        const d = await res.json().catch(() => ({}));
        setError(d.error || "Couldn't update.");
      }
    } finally {
      setBusy(false);
    }
  }

  const closed = status === "Done" || status === "Invoiced";

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-lg font-semibold text-ink">Checklist</h2>
        <span className="text-sm font-medium text-ink-soft">
          {doneCount}/{rows.length} done
        </span>
      </div>

      {rows.length === 0 ? (
        <p className="rounded-xl border border-dashed border-line bg-surface p-6 text-center text-sm text-ink-soft">
          No line items on this job yet. The dispatcher builds the quote first.
        </p>
      ) : (
        <div className="space-y-3">
          {rows.map((item) => (
            <div
              key={item.taskId}
              className="rounded-xl border border-line bg-surface p-4 shadow-sm"
            >
              <button
                onClick={() => toggle(item)}
                disabled={closed}
                className="flex w-full items-start gap-3 text-left"
              >
                <span
                  className={cn(
                    "mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-md border transition",
                    item.completed
                      ? "border-success bg-success text-white"
                      : "border-line bg-canvas text-transparent",
                  )}
                >
                  {item.completed ? <Check size={15} /> : <Circle size={0} />}
                </span>
                <span className="min-w-0 flex-1">
                  <span
                    className={cn(
                      "block font-medium text-ink",
                      item.completed && "line-through opacity-60",
                    )}
                  >
                    {item.serviceName}
                  </span>
                  <span className="text-xs text-ink-soft">
                    {item.qty} {UNIT_LABEL[item.unitType]}
                  </span>
                </span>
              </button>

              <div className="mt-3 flex gap-3">
                <PhotoSlot
                  label="Before"
                  url={item.beforePhoto}
                  uploading={!!uploading[`${item.taskId}:before`]}
                  onPick={(f) => upload(item.taskId, "before", f)}
                />
                <PhotoSlot
                  label="After"
                  url={item.afterPhoto}
                  uploading={!!uploading[`${item.taskId}:after`]}
                  onPick={(f) => upload(item.taskId, "after", f)}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* proof-to-close hint */}
      {!closed && (
        <div
          className={cn(
            "flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium",
            hasAfter ? "bg-success/10 text-green-700" : "bg-warning/15 text-amber-700",
          )}
        >
          {hasAfter ? <CheckCircle2 size={14} /> : <Camera size={14} />}
          {hasAfter
            ? "After-photo added. Ready to close."
            : "Add at least one after-photo before you can mark this done."}
        </div>
      )}

      {/* primary action */}
      <div className="sticky bottom-4 pt-1">
        {status === "Scheduled" && (
          <button
            onClick={() => setStatus("In Progress")}
            disabled={busy}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-5 py-3.5 text-base font-semibold text-white shadow-md transition hover:bg-brand-dark disabled:opacity-60"
          >
            {busy ? <Loader2 size={18} className="animate-spin" /> : <Play size={18} />}
            Start work
          </button>
        )}
        {status === "In Progress" && (
          <button
            onClick={() => setStatus("Done")}
            disabled={busy}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3.5 text-base font-semibold text-white shadow-md transition hover:bg-accent-hover disabled:opacity-60"
          >
            {busy ? <Loader2 size={18} className="animate-spin" /> : <CheckCircle2 size={18} />}
            Mark job done
          </button>
        )}
        {closed && (
          <div className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-success/10 px-5 py-3.5 text-base font-semibold text-green-700">
            <CheckCircle2 size={18} /> Job complete
          </div>
        )}
        {error && (
          <p className="mt-2 flex items-start gap-1.5 text-sm font-medium text-danger">
            <AlertTriangle size={15} className="mt-0.5 shrink-0" /> {error}
          </p>
        )}
      </div>
    </div>
  );
}
