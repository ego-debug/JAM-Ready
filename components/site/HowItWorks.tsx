import { Eye, Users, Clock, Camera, Wallet, CalendarCheck } from "lucide-react";
import { PhotoSlot } from "./Pieces";

const features = [
  { icon: Eye, title: "Our promise", body: "Hit the deadline or we eat the rush. Every turn documented end to end." },
  { icon: Users, title: "Our crew", body: "Background-checked, uniformed, and trained on the make-ready checklist." },
];

const promises = [
  { icon: CalendarCheck, title: "Same-day quotes", body: "Send photos, get a clear line-item price back the same day." },
  { icon: Clock, title: "1 to 3 day turns", body: "Most units rent-ready in a few days, not weeks." },
  { icon: Camera, title: "Photo proof", body: "Date-stamped before and after on every job." },
  { icon: Wallet, title: "No deposit", body: "Pay after the unit is signed off and the photos are in." },
];

export function HowItWorks() {
  return (
    <section id="how" className="bg-cream-warm py-[90px]">
      <div className="mx-auto max-w-[1200px] px-6 sm:px-8">
        <div className="mb-12 max-w-[640px]">
          <span className="inline-flex items-center gap-3 text-[14px] font-semibold text-accent">
            <span className="h-px w-8 bg-accent/50" /> Built for owners &amp; PMs
          </span>
          <h2 className="mt-4 text-[clamp(28px,3.5vw,44px)] font-extrabold leading-[1.06] tracking-[-1.4px] text-ink">
            One crew that makes every turn simple and on time
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.15fr_1fr]">
          {/* left: photo + two features */}
          <div className="grid gap-6">
            <div className="relative h-[280px] overflow-hidden rounded-2xl border border-line">
              <PhotoSlot label="Finished-unit photo" />
              <div
                className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-xl px-3.5 py-2.5 text-[13px] font-semibold text-white"
                style={{ background: "rgba(14,42,38,.74)", backdropFilter: "blur(6px)" }}
              >
                <span className="h-[7px] w-[7px] rounded-full bg-[#5ad27a]" /> Move-in
                ready, signed off
              </div>
            </div>
            <div className="grid overflow-hidden rounded-2xl border border-line sm:grid-cols-2">
              {features.map((f, i) => {
                const Icon = f.icon;
                return (
                  <div
                    key={f.title}
                    className={
                      "border-line p-6 " +
                      (i === 0 ? "max-sm:border-b sm:border-r" : "")
                    }
                  >
                    <Icon size={22} strokeWidth={1.75} className="text-accent" />
                    <h4 className="mt-3.5 text-[16.5px] font-extrabold text-ink">{f.title}</h4>
                    <p className="mt-1.5 text-[13.5px] leading-[1.5] text-ink-soft">{f.body}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* right: promises, one panel split by hairlines */}
          <div className="grid grid-cols-2 overflow-hidden rounded-2xl border border-line">
            {promises.map((p, i) => {
              const Icon = p.icon;
              const edges = ["border-r border-b", "border-b", "border-r", ""][i];
              return (
                <div key={p.title} className={"border-line p-6 " + edges}>
                  <Icon size={22} strokeWidth={1.75} className="text-accent" />
                  <h3 className="mt-3.5 text-[16px] font-extrabold text-ink">{p.title}</h3>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-soft">{p.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
