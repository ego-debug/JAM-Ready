"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, ArrowRight, AlertTriangle } from "lucide-react";
import { JOB_STATUSES, type JobStatus } from "@/lib/types";
import { JobStatusBadge } from "./JobStatusBadge";

export function StatusControls({
  jobId,
  status,
}: {
  jobId: string;
  status: JobStatus;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const idx = JOB_STATUSES.indexOf(status);
  const next = idx < JOB_STATUSES.length - 1 ? JOB_STATUSES[idx + 1] : null;

  async function setStatus(s: JobStatus) {
    if (busy) return;
    setBusy(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/jobs/${jobId}/status`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: s }),
      });
      if (res.ok) {
        router.refresh();
      } else {
        const d = await res.json().catch(() => ({}));
        setError(d.error || "Couldn't update status.");
      }
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="rounded-2xl border border-line bg-surface p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-base font-semibold text-ink">Status</h3>
        <JobStatusBadge status={status} />
      </div>

      {next && (
        <button
          onClick={() => setStatus(next)}
          disabled={busy}
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-dark disabled:opacity-60"
        >
          {busy ? <Loader2 size={16} className="animate-spin" /> : <ArrowRight size={16} />}
          Advance to “{next}”
        </button>
      )}

      <div className="mt-4">
        <label className="mb-1.5 block text-xs font-medium text-ink-soft">
          Or set status manually
        </label>
        <select
          value={status}
          disabled={busy}
          onChange={(e) => setStatus(e.target.value as JobStatus)}
          className="w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm text-ink outline-none focus:border-brand focus:ring-2 focus:ring-brand/30"
        >
          {JOB_STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        {error && (
          <p className="mt-2 flex items-start gap-1.5 text-xs font-medium text-danger">
            <AlertTriangle size={13} className="mt-0.5 shrink-0" /> {error}
          </p>
        )}
        <p className="mt-2 text-xs text-ink-soft">
          Use the scheduling panel below to assign crew and set the date before
          marking a job Scheduled.
        </p>
      </div>
    </div>
  );
}
