import Link from "next/link";
import { Home, ArrowRight } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export const metadata = { title: "Page not found" };

const popular = [
  { label: "What we do", href: "/services" },
  { label: "Service area", href: "/service-area" },
  { label: "Pricing", href: "/pricing" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export default function NotFound() {
  return (
    <>
      <Header />
      <main>
        <div
          className="-mt-[84px] pt-[84px]"
          style={{ background: "linear-gradient(180deg,#e2f3ee 0%,#f1f8f5 70%,#f1f8f5 100%)" }}
        >
          <Container className="flex min-h-[60vh] max-w-[760px] flex-col items-center justify-center py-20 text-center">
            <span className="font-script text-[5rem] leading-none text-accent">
              404
            </span>
            <h1 className="mt-3 text-[clamp(28px,4vw,42px)] font-extrabold tracking-tight text-ink">
              We couldn&rsquo;t find that page
            </h1>
            <p className="mt-3 max-w-[460px] text-lg text-ink-soft">
              The link may be old or the page may have moved. Here are a few
              places to pick back up.
            </p>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <Button href="/" size="lg" arrow>
                <Home size={18} /> Back home
              </Button>
              <Button href="/request" size="lg" variant="secondary">
                Get a free quote
              </Button>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
              {popular.map((p) => (
                <Link
                  key={p.href}
                  href={p.href}
                  className="btn-white inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[14px] font-semibold"
                >
                  {p.label}
                  <ArrowRight size={14} className="text-accent" />
                </Link>
              ))}
            </div>
          </Container>
        </div>
      </main>
      <Footer />
    </>
  );
}
