import { Hammer, PaintRoller, SprayCan, Wrench, Sparkles } from "lucide-react";

const services = [
  {
    icon: Hammer,
    title: "Patch & repair",
    body: "Holes, dents, nail pops and caulk lines, filled, sanded and blended smooth.",
  },
  {
    icon: PaintRoller,
    title: "Paint & touch-up",
    body: "Fresh coats or precision touch-ups in the right sheen and color match.",
  },
  {
    icon: SprayCan,
    title: "Deep clean",
    body: "Floors, fixtures, appliances and glass brought to move-in spotless.",
  },
  {
    icon: Wrench,
    title: "Fixtures & hardware",
    body: "Like-for-like faucet, tub and shower fixture swaps, plus locks, blinds, and hardware.",
  },
];

export function ServiceMenu() {
  return (
    <section id="services" className="bg-surface pb-24 pt-[18px]">
      <div className="mx-auto max-w-[1200px] px-6 sm:px-8">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="inline-flex items-center gap-2 text-[14px] font-bold text-accent">
              <Sparkles size={14} className="fill-accent" /> What we do
            </span>
            <h2 className="mt-3.5 text-[clamp(30px,3.7vw,46px)] font-extrabold leading-[1.04] tracking-[-1.4px] text-ink">
              Everything a unit needs{" "}
              <span className="text-accent">between tenants</span>
            </h2>
          </div>
          <p className="m-0 max-w-[330px] text-[15.5px] leading-relaxed text-ink-soft">
            One crew, one invoice, one deadline. We handle the full make-ready so
            you can re-list the day we leave.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.title} className="card-warm rounded-[22px] p-[26px]">
                <span
                  className="grid h-[50px] w-[50px] place-items-center rounded-[15px] text-accent-hover"
                  style={{
                    background: "linear-gradient(180deg,#d6f3ea,#b6e8d8)",
                    boxShadow: "inset 0 1px 0 #fff",
                  }}
                >
                  <Icon size={24} />
                </span>
                <h3 className="mb-2 mt-[18px] text-[19px] font-extrabold tracking-[-.4px] text-ink">
                  {s.title}
                </h3>
                <p className="m-0 text-[14.5px] leading-[1.55] text-[#5f716c]">
                  {s.body}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
