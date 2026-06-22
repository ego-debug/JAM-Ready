"use client";

import { useCallback, useRef, useState } from "react";

/** Drag-to-reveal before/after, ported from the mockup. Rooms are CSS art,
   swap for real photos by replacing the two room layers with <img>. */
export function ProofSlider() {
  const [pos, setPos] = useState(56);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const fromClientX = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const p = ((clientX - r.left) / r.width) * 100;
    setPos(Math.max(3, Math.min(97, p)));
  }, []);

  return (
    <div
      ref={ref}
      onPointerDown={(e) => {
        dragging.current = true;
        (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
        fromClientX(e.clientX);
      }}
      onPointerMove={(e) => dragging.current && fromClientX(e.clientX)}
      onPointerUp={() => (dragging.current = false)}
      onPointerLeave={() => (dragging.current = false)}
      className="relative h-[438px] cursor-ew-resize select-none overflow-hidden rounded-[22px]"
      style={{ background: "#dfe4e9", touchAction: "none" }}
    >
      {/* BEFORE base */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg,#cfc4b4 0%,#c6bba9 68%)" }}
      >
        <div className="absolute inset-x-0 bottom-0" style={{ top: "68%", background: "linear-gradient(180deg,#ab9a82,#a08c72)" }} />
        <div className="absolute inset-x-0" style={{ top: "66.4%", height: 10, background: "#9c8c74" }} />
        <div className="absolute" style={{ right: "8%", top: "16%", width: "34%", height: "38%", borderRadius: 4, background: "#a9b0b3", boxShadow: "inset 0 0 0 6px #8f897f" }} />
        <div className="absolute" style={{ right: "25%", top: "16%", width: 2, height: "38%", background: "#8f897f" }} />
        <div className="absolute" style={{ right: "8%", top: "34%", width: "34%", height: 2, background: "#8f897f" }} />
        <div className="absolute" style={{ left: "14%", top: "30%", width: 46, height: 30, borderRadius: "50%", background: "rgba(90,72,52,.18)", filter: "blur(3px)" }} />
        <div className="absolute" style={{ left: "20%", top: "44%", width: 2, height: 60, background: "rgba(70,55,40,.35)", transform: "rotate(8deg)" }} />
        <div className="absolute" style={{ left: "30%", top: "38%", width: 6, height: 6, borderRadius: "50%", background: "rgba(50,38,26,.45)" }} />
        <div className="absolute" style={{ left: "8%", top: "74%", width: 120, height: 24, borderRadius: "50%", background: "rgba(60,46,32,.16)", filter: "blur(4px)" }} />
        <span className="absolute left-3.5 top-3.5 inline-flex items-center rounded-lg px-2.5 py-1.5 text-[12px] font-bold tracking-wide text-white" style={{ background: "rgba(20,14,9,.72)", backdropFilter: "blur(4px)" }}>
          BEFORE · 06/14
        </span>
      </div>

      {/* AFTER clipped */}
      <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 0 0 ${pos}%)` }}>
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg,#f5ede1 0%,#f1e7d8 68%)" }}>
          <div className="absolute inset-x-0 bottom-0" style={{ top: "68%", background: "linear-gradient(180deg,#d4b285,#c49f6c)" }} />
          <div className="absolute inset-x-0 bottom-0" style={{ top: "68%", background: "repeating-linear-gradient(90deg,rgba(120,86,46,.12) 0 1px,transparent 1px 64px)" }} />
          <div className="absolute inset-x-0" style={{ top: "66.2%", height: 11, background: "#fff", boxShadow: "0 1px 2px rgba(0,0,0,.08)" }} />
          <div className="absolute" style={{ right: "8%", top: "15.4%", width: "34%", height: "39%", borderRadius: 5, background: "linear-gradient(160deg,#dcebf6,#c2d9ec)", border: "8px solid #fff", boxShadow: "0 10px 24px -10px rgba(8,30,27,.25)" }} />
          <div className="absolute" style={{ right: "25%", top: "15.4%", width: 3, height: "39%", background: "#fff" }} />
          <div className="absolute" style={{ right: "8%", top: "34.4%", width: "34%", height: 3, background: "#fff" }} />
          <div className="absolute" style={{ right: "13%", top: "20%", width: 30, height: 120, background: "linear-gradient(180deg,rgba(255,247,230,.85),rgba(255,247,230,0))", transform: "skewX(-16deg)", filter: "blur(3px)" }} />
          <div className="absolute" style={{ left: "11%", bottom: "5%", width: 34, height: 26, borderRadius: "4px 4px 8px 8px", background: "linear-gradient(180deg,#d98a55,#bf6f3c)" }} />
          <div className="absolute" style={{ left: "9.5%", bottom: "11.5%", width: 46, height: 46, borderRadius: "50% 50% 50% 0", background: "#5d8a52", transform: "rotate(12deg)" }} />
          <div className="absolute" style={{ left: "14%", bottom: "13%", width: 40, height: 40, borderRadius: "50% 0 50% 50%", background: "#6fa05f", transform: "rotate(-8deg)" }} />
          <span className="absolute bottom-3.5 right-3.5 inline-flex items-center rounded-lg px-2.5 py-1.5 text-[12px] font-bold tracking-wide text-white" style={{ background: "rgba(16,163,122,.92)" }}>
            AFTER · 06/16
          </span>
        </div>
      </div>

      {/* caption */}
      <div className="absolute bottom-3.5 left-3.5 z-[3] inline-flex items-center gap-2 rounded-[10px] px-3 py-2 text-[13px] font-semibold text-white" style={{ background: "rgba(20,14,9,.78)", backdropFilter: "blur(6px)" }}>
        <span className="h-[7px] w-[7px] rounded-full" style={{ background: "#5ad27a", boxShadow: "0 0 8px #5ad27a" }} />
        Full turn, finished in 2 days
      </div>

      {/* handle */}
      <div className="absolute inset-y-0 z-[4]" style={{ left: `${pos}%`, width: 3, background: "rgba(255,255,255,.9)", transform: "translateX(-1.5px)", boxShadow: "0 0 0 1px rgba(8,30,27,.06)" }}>
        <span className="absolute left-1/2 top-1/2 grid h-[46px] w-[46px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full text-ink" style={{ background: "linear-gradient(180deg,#fff,#e6f1ee)", boxShadow: "0 6px 16px -4px rgba(8,30,27,.5),inset 0 1px 0 #fff" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M9 7l-4 5 4 5M15 7l4 5-4 5" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </div>
  );
}
