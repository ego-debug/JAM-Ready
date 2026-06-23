import { Eye, Users, Clock, Camera, Wallet, CalendarCheck } from "lucide-react";
import { PhotoSlot } from "./Pieces";

export function HowItWorks() {
  return (
    <section id="how" className="bg-canvas py-[90px]">
      <div className="mx-auto max-w-[1200px] px-6 sm:px-8">
        <div className="mb-[46px] max-w-[640px]">
          <span className="text-[14px] font-bold text-[#788c86]">
            Built for owners &amp; PMs
          </span>
          <h2 className="mt-3 text-[clamp(28px,3.5vw,44px)] font-extrabold leading-[1.06] tracking-[-1.4px] text-ink">
            One crew that makes every turn simple and on time
          </h2>
        </div>

        <div className="grid gap-[22px] lg:grid-cols-[1.15fr_1fr]">
          {/* left feature */}
          <div className="grid gap-[18px]">
            <div
              className="relative h-[280px] overflow-hidden rounded-[22px]"
              style={{ border: "1px solid #d9e8e2", boxShadow: "0 24px 50px -30px rgba(8,30,27,.4)" }}
            >
              <PhotoSlot label="Finished-unit photo" />
              <div
                className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-[11px] px-3.5 py-2.5 text-[13px] font-semibold text-white"
                style={{ background: "rgba(14,42,38,.74)", backdropFilter: "blur(6px)" }}
              >
                <span className="h-[7px] w-[7px] rounded-full bg-[#5ad27a]" /> Move-in
                ready, signed off
              </div>
            </div>
            <div className="grid gap-[18px] sm:grid-cols-2">
              <FeatureCard
                icon={Eye}
                title="Our promise"
                body="Hit the deadline or we eat the rush. Every turn documented end to end."
              />
              <FeatureCard
                icon={Users}
                title="Our crew"
                body="Background-checked, uniformed, and trained on the make-ready checklist."
              />
            </div>
          </div>

          {/* right: what you get (promises, not fabricated stats) */}
          <div className="grid grid-cols-2 gap-[18px]">
            <PromiseCard icon={CalendarCheck} title="Same-day quotes" body="Send photos, get a clear line-item price back the same day." />
            <PromiseCard icon={Clock} title="1 to 3 day turns" body="Most units rent-ready in a few days, not weeks." />
            <PromiseCard icon={Camera} title="Photo proof" body="Date-stamped before and after on every job." dark />
            <PromiseCard icon={Wallet} title="No deposit" body="Pay after the unit is signed off and the photos are in." />
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  body,
}: {
  icon: React.ComponentType<{ size?: number }>;
  title: string;
  body: string;
}) {
  return (
    <div
      className="rounded-[20px] bg-surface p-[22px]"
      style={{ border: "1px solid #d9e8e2", boxShadow: "0 16px 36px -28px rgba(8,30,27,.3)" }}
    >
      <span
        className="grid h-[42px] w-[42px] place-items-center rounded-full text-ink"
        style={{ background: "#e6f4ef", border: "1px solid #d9e8e2" }}
      >
        <Icon size={20} />
      </span>
      <h4 className="mb-1.5 mt-3.5 text-[16.5px] font-extrabold text-ink">{title}</h4>
      <p className="m-0 text-[13.5px] leading-[1.5] text-[#5f716c]">{body}</p>
    </div>
  );
}

function PromiseCard({
  icon: Icon,
  title,
  body,
  dark = false,
}: {
  icon: React.ComponentType<{ size?: number }>;
  title: string;
  body: string;
  dark?: boolean;
}) {
  return (
    <div
      className="rounded-[20px] p-[22px]"
      style={
        dark
          ? { background: "linear-gradient(165deg,#15564d,#0b2420)", border: "1px solid #082f2b", boxShadow: "0 22px 44px -26px rgba(8,30,27,.5)" }
          : { background: "#fff", border: "1px solid #d9e8e2", boxShadow: "0 16px 36px -28px rgba(8,30,27,.3)" }
      }
    >
      <span
        className="grid h-11 w-11 place-items-center rounded-[13px]"
        style={dark ? { background: "rgba(255,255,255,.12)", color: "#34d8ad" } : { background: "#e2f3ee", color: "#10a37a" }}
      >
        <Icon size={22} />
      </span>
      <h3 className="mb-1.5 mt-3.5 text-[16px] font-extrabold" style={{ color: dark ? "#fff" : "#0e2a26" }}>
        {title}
      </h3>
      <p className="m-0 text-[13.5px] leading-relaxed" style={{ color: dark ? "#a9bfb9" : "#5a6b66" }}>
        {body}
      </p>
    </div>
  );
}
