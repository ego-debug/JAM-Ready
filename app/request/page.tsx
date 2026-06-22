import Link from "next/link";
import { ArrowLeft, Clock, ShieldCheck, Camera } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Container } from "@/components/ui/Container";
import { RequestForm, type RequestInitial } from "@/components/request/RequestForm";

export const metadata = {
  title: "Request a turn",
  robots: { index: false, follow: false },
};

export default async function RequestPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const sp = await searchParams;
  const initial: RequestInitial = {
    address: sp.address,
    beds: sp.beds,
    dueDate: sp.due,
    notes: sp.type ? `Turn type requested: ${sp.type}.` : undefined,
  };

  return (
    <>
      <Header />
      <main className="py-10 sm:py-14">
        <Container className="max-w-2xl">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft hover:text-ink"
          >
            <ArrowLeft size={16} /> Back to home
          </Link>

          <div className="mt-6">
            <h1 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              Request a turn
            </h1>
            <p className="mt-3 text-lg text-ink-soft">
              Tell us about the unit and your deadline. You&apos;ll get a
              same-day quote and a private link to track it. No account needed.
            </p>

            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink-soft">
              <span className="inline-flex items-center gap-1.5">
                <Clock size={15} className="text-brand" /> Same-day quote
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Camera size={15} className="text-brand" /> Photo-proof on finish
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck size={15} className="text-brand" /> Licensed &amp;
                insured
              </span>
            </div>
          </div>

          <div className="mt-8">
            <RequestForm initial={initial} />
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
