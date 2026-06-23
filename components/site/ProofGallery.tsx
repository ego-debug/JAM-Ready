"use client";

import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { PhotoSlot } from "./Pieces";

const proofs = [
  { slot: "Kitchen turn", title: "Kitchen make-ready", meta: "Patched, repainted, deep-cleaned · 2 days" },
  { slot: "Living room turn", title: "Full repaint & refresh", meta: "Walls, trim, hardware · 3 days" },
  { slot: "Bathroom turn", title: "Bathroom detail", meta: "Re-caulk, regrout, deep clean · 1 day" },
  { slot: "Studio turn", title: "Studio turnover", meta: "Paint, clean, fixtures · 1 day" },
  { slot: "Flooring", title: "Flooring swap", meta: "LVP install + baseboards · 2 days" },
  { slot: "Cleanout", title: "Move-out cleanout", meta: "Haul, scrub, punch list · 1 day" },
];

export function ProofGallery() {
  const track = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(1);

  function update() {
    const el = track.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    const step = card ? card.offsetWidth + 20 : el.clientWidth;
    setPage(Math.round(el.scrollLeft / step) + 1);
  }

  function scrollBy(dir: number) {
    const el = track.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    const step = card ? card.offsetWidth + 20 : el.clientWidth;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  }

  return (
    <section id="proof" className="bg-surface pb-24">
      <div className="mx-auto max-w-[1200px] px-6 sm:px-8">
        <div className="mb-[38px] flex flex-wrap items-end justify-between gap-6">
          <h2 className="m-0 text-[clamp(28px,3.5vw,44px)] font-extrabold leading-[1.05] tracking-[-1.4px] text-ink">
            Real turns,{" "}
            <span className="text-accent">photo-documented</span>
          </h2>
          <div className="flex items-center gap-3">
            <span className="w-[52px] text-[13.5px] font-semibold tabular-nums text-muted">
              {String(page).padStart(2, "0")} / {String(proofs.length).padStart(2, "0")}
            </span>
            <button
              type="button"
              aria-label="Previous"
              onClick={() => scrollBy(-1)}
              className="grid h-[42px] w-[42px] place-items-center rounded-full text-ink transition hover:brightness-95"
              style={{ background: "#e6f4ef", border: "1px solid #d9e8e2" }}
            >
              <ArrowLeft size={16} strokeWidth={2.2} />
            </button>
            <button
              type="button"
              aria-label="Next"
              onClick={() => scrollBy(1)}
              className="grid h-[42px] w-[42px] place-items-center rounded-full text-white transition hover:brightness-110"
              style={{ background: "linear-gradient(180deg,#15564d,#0b2420)" }}
            >
              <ArrowRight size={16} strokeWidth={2.2} />
            </button>
          </div>
        </div>

        <div
          ref={track}
          onScroll={update}
          className="-mx-2 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-2 pb-2 [scrollbar-width:none]"
        >
          {proofs.map((p) => (
            <div
              key={p.title}
              className="shrink-0 basis-[82%] snap-start sm:basis-[calc((100%-1.25rem)/2)] lg:basis-[calc((100%-2.5rem)/3)]"
            >
              <div
                className="relative h-[280px] overflow-hidden rounded-[20px]"
                style={{ border: "1px solid #d9e8e2", boxShadow: "0 22px 46px -30px rgba(8,30,27,.4)" }}
              >
                <PhotoSlot label={p.slot} />
                <span
                  className="absolute left-3.5 top-3.5 rounded-lg px-2.5 py-1.5 text-[12px] font-bold text-white"
                  style={{ background: "rgba(16,163,122,.92)" }}
                >
                  AFTER
                </span>
              </div>
              <h4 className="mb-0 mt-4 text-[18px] font-bold text-ink">{p.title}</h4>
              <p className="mt-1 text-[14px] text-muted">{p.meta}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
