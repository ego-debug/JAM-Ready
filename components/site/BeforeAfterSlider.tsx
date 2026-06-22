"use client";

import { useCallback, useRef, useState } from "react";
import { Badge } from "@/components/ui/Badge";

/**
 * Drag-to-reveal before/after comparison. `before` is the base layer;
 * `after` sits on top, clipped to the handle position. Accepts any nodes
 * (SVG art now, real <Image> photos later).
 */
export function BeforeAfterSlider({
  before,
  after,
  caption,
}: {
  before: React.ReactNode;
  after: React.ReactNode;
  caption?: string;
}) {
  const [pos, setPos] = useState(55); // percent revealed of "after"
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const setFromClientX = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, pct)));
  }, []);

  return (
    <div
      ref={ref}
      className="group relative aspect-[4/3] w-full select-none overflow-hidden rounded-2xl border border-line bg-canvas shadow-sm"
      onPointerDown={(e) => {
        dragging.current = true;
        (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
        setFromClientX(e.clientX);
      }}
      onPointerMove={(e) => dragging.current && setFromClientX(e.clientX)}
      onPointerUp={() => (dragging.current = false)}
      onPointerLeave={() => (dragging.current = false)}
    >
      {/* base: before */}
      <div className="absolute inset-0">{before}</div>
      <div className="absolute left-3 top-3">
        <Badge tone="neutral" className="bg-black/60 text-white">
          Before
        </Badge>
      </div>

      {/* top: after, clipped from the left to `pos` */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        {after}
        <div className="absolute right-3 top-3">
          <Badge tone="success" className="bg-success text-white">
            After
          </Badge>
        </div>
      </div>

      {/* caption */}
      {caption && (
        <div className="absolute bottom-3 left-3 rounded-lg bg-black/65 px-2.5 py-1 text-xs font-medium text-white">
          {caption}
        </div>
      )}

      {/* handle */}
      <div
        className="absolute inset-y-0 z-10 w-0.5 bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.15)]"
        style={{ left: `${pos}%` }}
      >
        <div className="absolute top-1/2 left-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-brand shadow-md ring-1 ring-black/10">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M9 7l-5 5 5 5M15 7l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* a11y slider */}
      <input
        type="range"
        min={0}
        max={100}
        value={Math.round(pos)}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label="Reveal the finished unit"
        className="absolute inset-x-0 bottom-0 z-20 h-10 w-full cursor-ew-resize opacity-0"
      />
    </div>
  );
}
