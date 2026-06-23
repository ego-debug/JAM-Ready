"use client";

import { useEffect, useRef, useState } from "react";
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
  const paused = useRef(false);
  const [page, setPage] = useState(1);

  function step() {
    const el = track.current;
    const card = el?.firstElementChild as HTMLElement | null;
    return card ? card.offsetWidth + 20 : el?.clientWidth ?? 0;
  }

  function update() {
    const el = track.current;
    if (!el) return;
    setPage(Math.round(el.scrollLeft / step()) + 1);
  }

  function go(dir: number) {
    const el = track.current;
    if (!el) return;
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 8;
    if (dir > 0 && atEnd) {
      el.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      el.scrollBy({ left: dir * step(), behavior: "smooth" });
    }
  }

  // auto-advance, paused on hover / focus / touch / reduced-motion
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const pause = () => (paused.current = true);
    const resume = () => (paused.current = false);
    el.addEventListener("mouseenter", pause);
    el.addEventListener("mouseleave", resume);
    el.addEventListener("focusin", pause);
    el.addEventListener("focusout", resume);
    el.addEventListener("touchstart", pause, { passive: true });

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const id = reduce
      ? undefined
      : window.setInterval(() => {
          if (!paused.current) go(1);
        }, 3000);

    return () => {
      el.removeEventListener("mouseenter", pause);
      el.removeEventListener("mouseleave", resume);
      el.removeEventListener("focusin", pause);
      el.removeEventListener("focusout", resume);
      el.removeEventListener("touchstart", pause);
      if (id) clearInterval(id);
    };
  }, []);

  return (
    <section id="proof" className="bg-surface pb-24">
      <div className="mx-auto max-w-[1200px] px-6 sm:px-8">
        <div className="mb-[38px] flex flex-wrap items-end justify-between gap-6">
          <h2 className="m-0 text-[clamp(28px,3.5vw,44px)] font-extrabold leading-[1.05] tracking-[-1.4px] text-ink">
            Real turns, <span className="text-accent">photo-documented</span>
          </h2>
          <div className="flex items-center gap-3">
            <span className="w-[52px] text-[13.5px] font-semibold tabular-nums text-muted">
              {String(page).padStart(2, "0")} / {String(proofs.length).padStart(2, "0")}
            </span>
            <button
              type="button"
              aria-label="Previous"
              onClick={() => go(-1)}
              className="grid h-[42px] w-[42px] place-items-center rounded-full text-ink transition hover:brightness-95"
              style={{ background: "#ecf6f2", border: "1px solid #d9eae3" }}
            >
              <ArrowLeft size={16} strokeWidth={2.2} />
            </button>
            <button
              type="button"
              aria-label="Next"
              onClick={() => go(1)}
              className="grid h-[42px] w-[42px] place-items-center rounded-full text-white transition hover:brightness-110"
              style={{ background: "linear-gradient(180deg,#11574b,#0a2c26)" }}
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
                style={{ border: "1px solid #d9eae3", boxShadow: "0 22px 46px -30px rgba(24,36,33,.4)" }}
              >
                <PhotoSlot label={p.slot} />
                <span
                  className="absolute left-3.5 top-3.5 rounded-lg px-2.5 py-1.5 text-[12px] font-bold text-white"
                  style={{ background: "rgba(29,186,154,.92)" }}
                >
                  AFTER
                </span>
              </div>
              <h3 className="mb-0 mt-4 text-[18px] font-bold text-ink">{p.title}</h3>
              <p className="mt-1 text-[14px] text-muted">{p.meta}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
