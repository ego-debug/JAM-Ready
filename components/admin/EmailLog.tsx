import { Mail, Check, MinusCircle, AlertTriangle } from "lucide-react";
import type { EmailKind, EmailLogEntry } from "@/lib/types";

const kindLabel: Record<EmailKind, string> = {
  quoted: "Quote ready",
  scheduled: "Scheduled",
  done: "Finished",
};

function StatusTag({ status }: { status: EmailLogEntry["status"] }) {
  if (status === "sent")
    return (
      <span className="inline-flex items-center gap-1 text-xs font-medium text-green-700">
        <Check size={12} /> Sent
      </span>
    );
  if (status === "failed")
    return (
      <span className="inline-flex items-center gap-1 text-xs font-medium text-danger">
        <AlertTriangle size={12} /> Failed
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1 text-xs font-medium text-ink-soft">
      <MinusCircle size={12} /> Logged
    </span>
  );
}

export function EmailLog({
  entries,
  configured,
}: {
  entries: EmailLogEntry[];
  configured: boolean;
}) {
  return (
    <div className="rounded-2xl border border-line bg-surface p-6 shadow-sm">
      <h3 className="mb-1 flex items-center gap-2 font-display text-base font-semibold text-ink">
        <Mail size={18} className="text-ink-soft" /> Customer emails
      </h3>
      {!configured && (
        <p className="mb-3 rounded-lg bg-canvas px-3 py-2 text-xs text-ink-soft">
          Emails are logged only. Set <code className="rounded bg-line/40 px-1">RESEND_API_KEY</code> in{" "}
          <code className="rounded bg-line/40 px-1">.env.local</code> to actually send them.
        </p>
      )}
      {entries.length === 0 ? (
        <p className="text-sm text-ink-soft">No emails yet.</p>
      ) : (
        <ul className="space-y-2.5">
          {entries.map((e) => (
            <li key={e.id} className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-medium text-ink">{kindLabel[e.kind]}</p>
                <p className="truncate text-xs text-ink-soft">
                  to {e.to} · {new Date(e.at).toLocaleString()}
                </p>
              </div>
              <StatusTag status={e.status} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
