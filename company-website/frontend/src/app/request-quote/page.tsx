import { Suspense } from "react";
import { Metadata } from "next";
import RequestQuoteClient from "./RequestQuoteClient";
import { connection } from "next/server";
import { SITE_URL, pageOpenGraph } from "@/lib/seo";
import { notFound } from "next/navigation";
import { services } from "@/data/services";

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

interface RequestQuotePageProps {
  searchParams: Promise<{ service?: string | string[] }>;
}

export default async function RequestQuotePage({ searchParams }: RequestQuotePageProps) {
  const { service } = await searchParams;
  const slug = Array.isArray(service) ? service[0] : service;
  // Validate before the Suspense boundary so invalid services produce a real
  // 404 with noindex rather than an indexable HTTP 200 error page.
  if (slug && !services.some((item) => item.slug === slug)) notFound();

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
