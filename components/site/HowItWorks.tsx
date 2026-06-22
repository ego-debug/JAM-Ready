import { Eye, Users, ArrowUpRight } from "lucide-react";
import { PhotoSlot } from "./Pieces";
import { site } from "@/lib/config";

function CornerArrow({ accent = false }: { accent?: boolean }) {
  return (
    <span
      className="absolute right-[18px] top-[18px] grid h-[34px] w-[34px] place-items-center rounded-full"
      style={
        accent
          ? { background: "linear-gradient(180deg,#2ed3a6,#10a37a)", color: "#fff" }
          : { border: "1px solid #d9e8e2", color: "#95aaa3" }
      }
    >
      <ArrowUpRight size={14} strokeWidth={2} />
    </span>
  );
}

export function HowItWorks() {
  return (
    <section id="how" className="bg-canvas py-[90px]">
      <div className="mx-auto max-w-[1200px] px-6 sm:px-8">
        <div className="mb-[46px] text-center">
          <span className="text-[13.5px] font-bold uppercase tracking-[.4px] text-[#788c86]">
            Built for owners &amp; PMs
          </span>
          <h2 className="mx-auto mt-3 max-w-[680px] text-[clamp(28px,3.5vw,44px)] font-extrabold leading-[1.06] tracking-[-1.4px] text-ink">
            One crew that makes every turn{" "}
            <span className="font-script text-[1.06em] text-accent">
              simple &amp; on time
            </span>
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
                style={{ background: "rgba(20,14,9,.74)", backdropFilter: "blur(6px)" }}
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

          {/* right stats */}
          <div className="grid grid-cols-2 gap-[18px]">
            <StatCard value={site.stats.unitsTurned} label="Units turned" />
            <StatCard value={site.stats.onTimeRate} label="Finished on time" />
            <StatCard value={site.stats.avgTurnaround} label="Average turnaround" dark />
            <StatCard value="100%" label="Photo-documented" />
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

function StatCard({
  value,
  label,
  dark = false,
}: {
  value: string;
  label: string;
  dark?: boolean;
}) {
  return (
    <div
      className="relative rounded-[20px] p-[26px]"
      style={
        dark
          ? { background: "linear-gradient(165deg,#15564d,#0b2420)", border: "1px solid #07201d", boxShadow: "0 22px 44px -26px rgba(8,30,27,.5)" }
          : { background: "#fff", border: "1px solid #d9e8e2", boxShadow: "0 16px 36px -28px rgba(8,30,27,.3)" }
      }
    >
      <CornerArrow accent={dark} />
      <div
        className="mt-12 text-[40px] font-extrabold leading-none tracking-[-1.5px]"
        style={{ color: dark ? "#fff" : "#0e2a26" }}
      >
        {value}
      </div>
      <div className="mt-1 text-[14.5px]" style={{ color: dark ? "#a9bfb9" : "#6f827d" }}>
        {label}
      </div>
    </div>
  );
}
