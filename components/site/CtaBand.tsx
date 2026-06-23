import Link from "next/link";
import { ClipboardList, CreditCard, ArrowRight } from "lucide-react";

export function CtaBand() {
  return (
    <section className="bg-surface pb-[90px]">
      <div className="mx-auto max-w-[1200px] px-6 sm:px-8">
        <div
          className="relative overflow-hidden rounded-[28px] px-8 pb-[30px] pt-16 sm:px-12"
          style={{
            background: "linear-gradient(135deg,#0a2521 0%,#0c5e52 58%,#10a37a 130%)",
            boxShadow: "0 40px 80px -36px rgba(8,30,27,.5)",
          }}
        >
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: "radial-gradient(80% 120% at 90% 0%,rgba(95,210,180,.35),transparent 60%)" }}
          />
          <div className="relative mx-auto max-w-[680px] text-center">
            <h2 className="m-0 text-[clamp(28px,3.4vw,44px)] font-extrabold leading-[1.05] tracking-[-1.4px] text-white">
              Turn the vacancy{" "}
              <span className="text-[#b9f0dd]">into income</span>
            </h2>
            <p className="mx-auto mb-[26px] mt-4 max-w-[520px] text-[16px] leading-relaxed text-white/80">
              Every day a unit sits empty is rent you don&rsquo;t get back. Book
              the turn today and re-list by the weekend.
            </p>
            <Link
              href="/request"
              className="inline-flex items-center gap-3 rounded-full py-[9px] pl-[26px] pr-[9px] text-[16px] font-semibold text-ink"
              style={{
                background: "linear-gradient(180deg,#fff,#e6f4ef)",
                border: "1px solid #fff",
                boxShadow: "inset 0 1px 0 #fff,0 14px 28px -12px rgba(0,0,0,.5)",
              }}
            >
              Book a turn
              <span
                className="grid h-[38px] w-[38px] place-items-center rounded-full text-white"
                style={{ background: "linear-gradient(180deg,#15564d,#0b2420)" }}
              >
                <ArrowRight size={14} strokeWidth={2.3} />
              </span>
            </Link>
          </div>

          <div className="relative mt-[46px] grid gap-[18px] sm:grid-cols-2">
            <BannerCard
              icon={ClipboardList}
              title="Know the scope up front"
              body="A line-item walkthrough quote before we lift a brush. No surprise add-ons."
            />
            <BannerCard
              icon={CreditCard}
              title="Pay after sign-off"
              body="Invoice lands with the after-photos. Net terms for managed portfolios."
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function BannerCard({
  icon: Icon,
  title,
  body,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  body: string;
}) {
  return (
    <div
      className="rounded-[18px] px-6 py-[22px]"
      style={{ background: "rgba(255,255,255,.96)", boxShadow: "0 18px 40px -22px rgba(0,0,0,.4)" }}
    >
      <span className="grid h-10 w-10 place-items-center rounded-full bg-ink text-white">
        <Icon size={20} />
      </span>
      <h4 className="mb-1.5 mt-3.5 text-[17px] font-extrabold text-ink">{title}</h4>
      <p className="m-0 text-[14px] leading-[1.5] text-[#5f716c]">{body}</p>
    </div>
  );
}
