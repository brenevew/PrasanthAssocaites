import Script from "next/script";
import { GA_MEASUREMENT_ID } from "@/lib/ga4";

/**
 * Loads gtag.js once for every route, after the page is interactive. Renders
 * nothing visible, and nothing at all unless NEXT_PUBLIC_GA_MEASUREMENT_ID is
 * set at build time. The consent/queue bootstrap is rendered separately in the
 * root layout (beforeInteractive) so early hook events queue behind consent.
 */
export default function GoogleAnalytics() {
  if (!GA_MEASUREMENT_ID) return null;
  return (
    <Script
      id="ga4-gtag"
      src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      strategy="afterInteractive"
    />
  );
}
