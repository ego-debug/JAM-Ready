import { ShieldCheck, Camera, Clock, BadgeCheck, Star } from "lucide-react";
import { site } from "@/lib/config";

const guarantees = [
  { icon: Camera, title: "Photo proof", body: "Before and after photos, date-stamped, on every single job." },
  { icon: Clock, title: "On time or we eat the rush", body: "We only book a turn we can finish by your deadline." },
  { icon: BadgeCheck, title: "Fixed quote, approved upfront", body: "You approve the price before we start. No surprise charges when we finish." },
  { icon: ShieldCheck, title: "Licensed & insured", body: "A registered NJ contractor, with licensed partners for specialty work." },
];

export function Reviews() {
  return (
    <section className="bg-cream-warm py-20">
      <div className="mx-auto max-w-[1100px] px-6 sm:px-8">
        <div className="max-w-[640px]">
          <span className="inline-flex items-center gap-3 text-[14px] font-semibold text-accent">
            <span className="h-px w-8 bg-accent/50" /> What every job comes with
          </span>
          <h2 className="mt-4 text-[clamp(26px,3.2vw,40px)] font-extrabold leading-[1.08] tracking-[-1.3px] text-ink">
            A new crew, with everything in writing
          </h2>
          <p className="mt-3 text-[16px] leading-relaxed text-ink-soft">
            We are building our track record one turn at a time. Until the
            reviews roll in, here is what every job comes with, no exceptions.
          </p>
        </div>

        <div className="mt-12 grid gap-y-10 border-t border-line pt-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-y-0">
          {guarantees.map((g) => {
            const Icon = g.icon;
            return (
              <div
                key={g.title}
                className="lg:border-l lg:border-line lg:pl-8 lg:pr-6 lg:first:border-l-0 lg:first:pl-0"
              >
                <Icon size={24} strokeWidth={1.75} className="text-accent" />
                <h3 className="mt-4 text-[16px] font-extrabold text-ink">{g.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-ink-soft">{g.body}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-3">
          <a
            href={site.googleReviewUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-white inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[14.5px] font-semibold"
          >
            <Star size={16} className="fill-accent text-accent" /> Review us on
            Google
          </a>
          <span className="text-[13.5px] text-muted">
            Worked with us? A review helps the next owner trust a new crew.
          </span>
        </div>
      </div>
    </section>
  );
}
