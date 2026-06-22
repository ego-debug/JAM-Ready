import { Container } from "@/components/ui/Container";
import { site } from "@/lib/config";

const stats = [
  { value: site.stats.unitsTurned, label: "Units turned" },
  { value: site.stats.onTimeRate, label: "Finished on time" },
  { value: site.stats.avgTurnaround, label: "Average turnaround" },
  { value: "100%", label: "Jobs photo-documented" },
];

export function StatBar() {
  return (
    <section className="border-y border-line bg-surface">
      <Container className="grid grid-cols-2 gap-px overflow-hidden md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="px-2 py-8 text-center">
            <div className="font-display text-3xl font-bold text-brand sm:text-4xl">
              {s.value}
            </div>
            <div className="mt-1 text-sm text-ink-soft">{s.label}</div>
          </div>
        ))}
      </Container>
    </section>
  );
}
