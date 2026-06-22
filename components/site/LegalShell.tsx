import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Container } from "@/components/ui/Container";

const prose =
  "[&_h2]:font-display [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-ink [&_h2]:mt-9 [&_h2]:mb-3 " +
  "[&_p]:text-[15.5px] [&_p]:leading-relaxed [&_p]:text-ink-soft [&_p]:mb-4 " +
  "[&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mb-1.5 [&_li]:text-[15.5px] [&_li]:text-ink-soft " +
  "[&_a]:text-accent [&_a]:underline [&_strong]:text-ink";

export function LegalShell({
  title,
  intro,
  updated,
  children,
}: {
  title: string;
  intro: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="py-12 sm:py-16">
        <Container className="max-w-3xl">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft hover:text-ink"
          >
            <ArrowLeft size={16} /> Back to home
          </Link>

          <h1 className="mt-6 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            {title}
          </h1>
          <p className="mt-3 text-lg text-ink-soft">{intro}</p>
          <p className="mt-2 text-sm text-muted">Last updated {updated}</p>

          <div className={`mt-8 ${prose}`}>{children}</div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
