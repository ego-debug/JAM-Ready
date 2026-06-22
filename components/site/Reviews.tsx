import { Star } from "lucide-react";
import { REVIEWS, averageRating } from "@/lib/reviews";
import { site } from "@/lib/config";

function Stars({ rating }: { rating: number }) {
  return (
    <span className="inline-flex gap-0.5" aria-label={`${rating} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={16}
          className={i < rating ? "fill-accent text-accent" : "text-line"}
        />
      ))}
    </span>
  );
}

export function Reviews() {
  const avg = averageRating();

  return (
    <section className="bg-surface py-16 sm:py-20">
      <div className="mx-auto max-w-[1200px] px-6 sm:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="m-0 text-[clamp(28px,3.5vw,44px)] font-extrabold leading-[1.05] tracking-[-1.4px] text-ink">
              What owners &amp;{" "}
              <span className="font-script text-[1.06em] text-accent">
                managers say
              </span>
            </h2>
            <div className="mt-3 flex items-center gap-2.5">
              <Stars rating={Math.round(avg)} />
              <span className="text-sm font-semibold text-ink">{avg.toFixed(1)}</span>
              <span className="text-sm text-muted">
                from {REVIEWS.length} reviews
              </span>
            </div>
          </div>
          <a
            href={site.googleReviewUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-white inline-flex w-fit items-center gap-2 rounded-full px-5 py-2.5 text-[14.5px] font-semibold"
          >
            <Star size={16} className="fill-accent text-accent" /> Review us on
            Google
          </a>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {REVIEWS.map((r) => (
            <div key={r.name} className="card-warm flex flex-col rounded-[20px] p-6">
              <Stars rating={r.rating} />
              <p className="mt-3 flex-1 text-[14.5px] leading-relaxed text-ink-soft">
                “{r.text}”
              </p>
              <div className="mt-4">
                <div className="text-[15px] font-bold text-ink">{r.name}</div>
                <div className="text-[13px] text-muted">{r.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
