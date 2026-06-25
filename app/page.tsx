import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { QuoteWidget } from "@/components/site/QuoteWidget";
import { ServiceMenu } from "@/components/site/ServiceMenu";
import { HowItWorks } from "@/components/site/HowItWorks";
import { CtaBand } from "@/components/site/CtaBand";
import { ProofGallery } from "@/components/site/ProofGallery";
import { Reviews } from "@/components/site/Reviews";
import { Footer } from "@/components/site/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { localBusinessJsonLd } from "@/lib/seo";

export default function Home() {
  return (
    <>
      <JsonLd data={localBusinessJsonLd()} />
      <Header />
      <main>
        <div
          className="-mt-[84px] pt-[84px]"
          style={{
            background:
              "radial-gradient(125% 130% at 88% -10%,#6fdcc0 0%,#c2eee2 24%,#eaf7f2 52%,#faf6ef 100%)",
          }}
        >
          <Hero />
        </div>
        <QuoteWidget />
        <ServiceMenu />
        <HowItWorks />
        <CtaBand />
        <ProofGallery />
        <Reviews />
      </main>
      <Footer />
    </>
  );
}
