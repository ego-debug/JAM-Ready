import Link from "next/link";
import { ClipboardList, CreditCard, ArrowRight } from "lucide-react";

const banners = [
  { icon: ClipboardList, title: "Know the scope up front", body: "A line-item walkthrough quote before we lift a brush. No surprise add-ons." },
  { icon: CreditCard, title: "Pay after sign-off", body: "Invoice lands with the after-photos. Net terms for managed portfolios." },
];

export function CtaBand() {
  return (
    <section className="bg-cream pb-[90px]">
      <div className="mx-auto max-w-[1200px] px-6 sm:px-8">
        <div
          className="relative overflow-hidden rounded-3xl px-8 pb-[30px] pt-16 sm:px-12"
          style={{
            background: "linear-gradient(135deg,#0a2c26 0%,#0f6b5b 58%,#1dba9a 130%)",
          }}
        >
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: "radial-gradient(80% 120% at 90% 0%,rgba(110,230,200,.35),transparent 60%)" }}
          />
          <div className="relative mx-auto max-w-[680px] text-center">
            <h2 className="m-0 text-[clamp(28px,3.4vw,44px)] font-extrabold leading-[1.05] tracking-[-1.4px] text-white">
              Turn the vacancy{" "}
              <span className="text-[#bdf0e0]">into income</span>
            </h2>
            <p className="mx-auto mb-[26px] mt-4 max-w-[520px] text-[16px] leading-relaxed text-white/80">
              Every day a unit sits empty is rent you don&rsquo;t get back. Book
              the turn today and re-list by the weekend.
            </p>
            <Link
              href="/request"
              className="inline-flex items-center gap-3 rounded-full py-[9px] pl-[26px] pr-[9px] text-[16px] font-semibold text-ink"
              style={{
                background: "linear-gradient(180deg,#fff,#ecf6f2)",
                border: "1px solid #fff",
                boxShadow: "inset 0 1px 0 #fff,0 14px 28px -12px rgba(0,0,0,.5)",
              }}
            >
              Book a turn
              <span
                className="grid h-[38px] w-[38px] place-items-center rounded-full text-white"
                style={{ background: "linear-gradient(180deg,#11574b,#0a2c26)" }}
              >
                <ArrowRight size={14} strokeWidth={2.3} />
              </span>
            </Link>
          </div>

          <div className="relative mt-[46px] grid overflow-hidden rounded-2xl bg-white/95 sm:grid-cols-2">
            {banners.map((b, i) => {
              const Icon = b.icon;
              return (
                <div
                  key={b.title}
                  className={
                    "px-6 py-6 " +
                    (i === 0 ? "border-line max-sm:border-b sm:border-r" : "")
                  }
                >
                  <Icon size={22} strokeWidth={1.75} className="text-accent" />
                  <h4 className="mt-3.5 text-[17px] font-extrabold text-ink">{b.title}</h4>
                  <p className="mt-1.5 text-[14px] leading-[1.5] text-ink-soft">{b.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
