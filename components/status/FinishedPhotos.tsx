import { Sparkles } from "lucide-react";
import type { TaskProgress } from "@/lib/types";
import { BeforeAfterSlider } from "@/components/site/BeforeAfterSlider";

/** The finished-work proof the customer gets when the job is Done. */
export function FinishedPhotos({ tasks }: { tasks: TaskProgress[] }) {
  const withAfter = tasks.filter((t) => t.afterPhoto);
  if (withAfter.length === 0) return null;

  return (
    <div className="rounded-2xl border border-success/30 bg-success/5 p-6">
      <h3 className="mb-1 flex items-center gap-2 font-display text-base font-semibold text-ink">
        <Sparkles size={18} className="text-success" />
        Your unit is rent-ready
      </h3>
      <p className="mb-4 text-sm text-ink-soft">
        Here&apos;s the finished work, before and after.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        {withAfter.map((t) =>
          t.beforePhoto ? (
            <BeforeAfterSlider
              key={t.id}
              before={
                // eslint-disable-next-line @next/next/no-img-element
                <img src={t.beforePhoto} alt="Before" className="h-full w-full object-cover" />
              }
              after={
                // eslint-disable-next-line @next/next/no-img-element
                <img src={t.afterPhoto} alt="After" className="h-full w-full object-cover" />
              }
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={t.id}
              src={t.afterPhoto}
              alt="Finished work"
              className="aspect-[4/3] w-full rounded-2xl border border-line object-cover"
            />
          ),
        )}
      </div>
    </div>
  );
}
