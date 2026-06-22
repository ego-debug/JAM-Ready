"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Loader2, AlertTriangle } from "lucide-react";

export function ApproveQuote({ token }: { token: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function approve() {
    if (busy) return;
    setBusy(true);
    setError(null);
    try {
      const res = await fetch(`/api/status/${token}/approve`, { method: "POST" });
      if (res.ok) {
        router.refresh();
      } else {
        const d = await res.json().catch(() => ({}));
        setError(d.error || "Couldn't approve right now.");
      }
    } catch {
      setError("Couldn't reach the server.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <button
        onClick={approve}
        disabled={busy}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-accent-hover disabled:opacity-60 sm:w-auto"
      >
        {busy ? <Loader2 size={18} className="animate-spin" /> : <Check size={18} />}
        Approve this quote
      </button>
      {error && (
        <p className="mt-2 flex items-center gap-1.5 text-sm font-medium text-danger">
          <AlertTriangle size={14} /> {error}
        </p>
      )}
      <p className="mt-2 text-xs text-ink-soft">
        Approving lets us lock in your crew and schedule the turn.
      </p>
    </div>
  );
}
