import { Suspense } from "react";
import { Metadata } from "next";
import RequestQuoteClient, { RequestQuoteFromUrl } from "./RequestQuoteClient";
import { SITE_URL, pageOpenGraph } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Request a Construction Quote",
  description:
    "Request a quote for construction, architectural design, bank valuation reports or structural stability certificates in Coimbatore and The Nilgiris.",
  keywords: [
    "house construction quote Coimbatore",
    "construction cost estimate Coimbatore",
    "building contractor quotation Coimbatore",
  ],
  alternates: {
    canonical: `${SITE_URL}/request-quote`,
  },
  openGraph: pageOpenGraph(
    "/request-quote",
    "Request a Construction Quote | Prasanth Associates",
    "Request a quote for construction, architectural design, bank valuation reports or structural stability certificates in Coimbatore and The Nilgiris."
  ),
};

/**
 * Prerendered, so Cloudflare serves it from the cache instead of rendering per
 * request (which hit error 1102, the Worker CPU limit). The static HTML is the
 * default service's form; RequestQuoteFromUrl swaps in the ?service= one in the
 * browser. An unknown ?service= shows the "Service not found" card — it can no
 * longer be a server 404, but the canonical keeps such URLs out of the index.
 */
export default function RequestQuotePage() {
  return (
    <Suspense fallback={<RequestQuoteClient query="" />}>
      <RequestQuoteFromUrl />
    </Suspense>
  );
}
