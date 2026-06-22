"use client";

import { useState } from "react";
import { Check, Copy, Link2 } from "lucide-react";

/** Shows the private status link with a copy button. */
export function CopyLink({ path }: { path: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    const url =
      typeof window !== "undefined" ? window.location.origin + path : path;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked, ignore */
    }
  }

  return (
    <div className="flex items-center gap-2 rounded-lg border border-line bg-surface p-1.5 pl-3">
      <Link2 size={16} className="shrink-0 text-ink-soft" />
      <span className="flex-1 truncate text-sm text-ink-soft">{path}</span>
      <button
        type="button"
        onClick={copy}
        className="inline-flex items-center gap-1.5 rounded-md bg-brand px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-brand-dark"
      >
        {copied ? <Check size={14} /> : <Copy size={14} />}
        {copied ? "Copied" : "Copy link"}
      </button>
    </div>
  );
}
