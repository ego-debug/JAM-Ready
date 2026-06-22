import { Users } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { AddCrewForm } from "@/components/admin/AddCrewForm";
import { CrewAvailability } from "@/components/admin/CrewAvailability";
import { listCrew } from "@/lib/db/crew";
import { upcomingWeeks } from "@/lib/week";

export const metadata = { title: "Crew" };
export const dynamic = "force-dynamic";

export default async function CrewPage() {
  const crew = await listCrew();
  const weeks = upcomingWeeks(4);

  return (
    <Container className="max-w-5xl py-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-ink">
            Crew
          </h1>
          <p className="mt-1 text-sm text-ink-soft">
            Add your crew and mark who&apos;s available each week. Availability
            drives the capacity check when scheduling jobs.
          </p>
        </div>
        {crew.length > 0 && <AddCrewForm />}
      </div>

      {crew.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-line bg-surface p-12 text-center">
          <span className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-brand-tint text-brand">
            <Users size={24} />
          </span>
          <h3 className="mt-4 font-display text-lg font-semibold text-ink">
            No crew members yet
          </h3>
          <p className="mx-auto mt-1 max-w-sm text-sm text-ink-soft">
            Add your crew so you can assign them to jobs and track weekly
            availability.
          </p>
          <div className="mt-5 flex justify-center">
            <AddCrewForm />
          </div>
        </div>
      ) : (
        <div className="mt-6 space-y-5">
          <CrewAvailability crew={crew} weeks={weeks} />
          <p className="text-xs text-ink-soft">
            Green check = available that week. A job can only be{" "}
            <span className="font-medium text-ink">Scheduled</span> with at least
            one assigned crew member and a date on or before its deadline.
          </p>
        </div>
      )}
    </Container>
  );
}
