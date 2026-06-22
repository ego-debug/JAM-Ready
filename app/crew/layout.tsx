import { redirect } from "next/navigation";
import { isAuthed } from "@/lib/auth";
import { getCrewId } from "@/lib/crew-session";
import { listCrew } from "@/lib/db/crew";
import { CrewTopBar } from "@/components/crew/CrewTopBar";

export const dynamic = "force-dynamic";
export const metadata = { robots: { index: false, follow: false } };

export default async function CrewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!(await isAuthed())) redirect("/login");
  const crewId = await getCrewId();
  const me = (await listCrew()).find((c) => c.id === crewId);

  return (
    <div className="min-h-screen bg-canvas">
      <CrewTopBar name={me?.name} />
      <main className="mx-auto max-w-2xl px-4 py-6">{children}</main>
    </div>
  );
}
