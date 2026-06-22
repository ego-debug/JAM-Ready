import Script from "next/script";

/**
 * Analytics, env-driven. Nothing loads until you set an ID, so there's no
 * tracking (and no cookie banner needed) until you opt in.
 *   NEXT_PUBLIC_PLAUSIBLE_DOMAIN  -> privacy-friendly Plausible (recommended)
 *   NEXT_PUBLIC_GA_ID             -> Google Analytics 4 (G-XXXXXXX)
 * Google Search Console verification is handled in app/layout.tsx metadata.
 */

const GA = process.env.NEXT_PUBLIC_GA_ID;
const PLAUSIBLE = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

export function Analytics() {
  return (
    <>
      {PLAUSIBLE && (
        <Script
          defer
          data-domain={PLAUSIBLE}
          src="https://plausible.io/js/script.js"
          strategy="afterInteractive"
        />
      )}
      {GA && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA}');`}
          </Script>
        </>
      )}
    </>
  );
}
