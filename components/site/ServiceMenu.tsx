const services = [
  {
    n: "01",
    title: "Patch & repair",
    body: "Holes, dents, nail pops and caulk lines, filled, sanded and blended smooth.",
  },
  {
    n: "02",
    title: "Paint & touch-up",
    body: "Fresh coats or precision touch-ups in the right sheen and color match.",
  },
  {
    n: "03",
    title: "Deep clean",
    body: "Floors, fixtures, appliances and glass brought to move-in spotless.",
  },
  {
    n: "04",
    title: "Fixtures & hardware",
    body: "Like-for-like faucet, tub and shower fixture swaps, plus locks, blinds, and hardware.",
  },
];

export function ServiceMenu() {
  return (
    <section id="services" className="bg-cream pb-24 pt-20">
      <div className="mx-auto max-w-[1200px] px-6 sm:px-8">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-[640px]">
            <span className="inline-flex items-center gap-3 text-[14px] font-semibold text-accent">
              <span className="h-px w-8 bg-accent/50" /> What we do
            </span>
            <h2 className="mt-4 text-[clamp(30px,3.7vw,46px)] font-extrabold leading-[1.04] tracking-[-1.4px] text-ink">
              Everything a unit needs{" "}
              <span className="text-accent">between tenants</span>
            </h2>
          </div>
          <p className="m-0 max-w-[330px] text-[15.5px] leading-relaxed text-ink-soft">
            One crew, one invoice, one deadline. We handle the full make-ready so
            you can re-list the day we leave.
          </p>
        </div>

        <div className="grid gap-y-10 border-t border-line pt-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-y-0">
          {services.map((s) => (
            <div
              key={s.title}
              className="lg:border-l lg:border-line lg:pl-8 lg:pr-6 lg:first:border-l-0 lg:first:pl-0"
            >
              <span className="font-display text-[15px] font-bold tabular-nums text-accent">
                {s.n}
              </span>
              <h3 className="mt-5 text-[20px] font-extrabold tracking-[-.4px] text-ink">
                {s.title}
              </h3>
              <p className="mt-2.5 text-[14.5px] leading-[1.6] text-ink-soft">
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
