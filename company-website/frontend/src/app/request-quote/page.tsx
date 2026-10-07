import { Suspense } from "react";
import { Metadata } from "next";
import { connection } from "next/server";
import { SITE_URL, pageOpenGraph } from "@/lib/seo";
import RequestQuoteClient from "./RequestQuoteClient";

export const metadata: Metadata = {
  title: "Request a Construction Quote",
  description:
    "Request a quote for construction, architectural design, bank valuation reports or structural stability certificates in Coimbatore and The Nilgiris.",
  alternates: {
    canonical: `${SITE_URL}/request-quote`,
  },
  openGraph: pageOpenGraph(
    "/request-quote",
    "Request a Construction Quote | Prasanth Associates",
    "Request a quote for construction, architectural design, bank valuation reports or structural stability certificates in Coimbatore and The Nilgiris."
  ),
};

export default async function RequestQuotePage() {
  // Render per request: the client reads ?service= via useSearchParams, which
  // would otherwise bail out to client-only rendering and ship an empty page
  // (no H1, no content) to crawlers.
  await connection();

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[var(--canvas-bg)] flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-gold-dark border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <RequestQuoteClient />
    </Suspense>
  );
}
