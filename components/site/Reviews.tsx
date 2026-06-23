import { ShieldCheck, Camera, Clock, BadgeCheck, Star } from "lucide-react";
import { site } from "@/lib/config";

const guarantees = [
  { icon: Camera, title: "Photo proof", body: "Before and after photos, date-stamped, on every single job." },
  { icon: Clock, title: "On time or we eat the rush", body: "We only book a turn we can finish by your deadline." },
  { icon: BadgeCheck, title: "1-year workmanship warranty", body: "If something we did fails to hold up, we come back and fix it." },
  { icon: ShieldCheck, title: "Licensed & insured", body: "A registered NJ contractor, with licensed partners for specialty work." },
];

export function Reviews() {
  return (
    <section className="bg-surface py-16 sm:py-20">
      <div className="mx-auto max-w-[1100px] px-6 sm:px-8">
        <div className="rounded-[26px] border border-line bg-canvas p-8 sm:p-12">
          <div className="max-w-[640px]">
            <h2 className="m-0 text-[clamp(26px,3.2vw,40px)] font-extrabold leading-[1.08] tracking-[-1.3px] text-ink">
              A new crew, with everything in writing
            </h2>
            <p className="mt-3 text-[16px] leading-relaxed text-ink-soft">
              We are building our track record one turn at a time. Until the
              reviews roll in, here is what every job comes with, no exceptions.
            </p>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {guarantees.map((g) => {
              const Icon = g.icon;
              return (
                <div key={g.title} className="rounded-[18px] border border-line bg-surface p-5">
                  <span className="grid h-11 w-11 place-items-center rounded-[13px] bg-brand-tint text-accent">
                    <Icon size={22} />
                  </span>
                  <h3 className="mb-1.5 mt-3.5 text-[15.5px] font-extrabold text-ink">{g.title}</h3>
                  <p className="m-0 text-[13.5px] leading-relaxed text-ink-soft">{g.body}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
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
      </div>
    </section>
  );
}
