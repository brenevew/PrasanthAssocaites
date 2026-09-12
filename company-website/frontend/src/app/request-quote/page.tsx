import { Suspense } from "react";
import { Metadata } from "next";
import RequestQuoteClient from "./RequestQuoteClient";

export const metadata: Metadata = {
  title: "Request a Quote & Cost Estimation",
  description:
    "Request specialized quotes for Bank Valuation Reports, Structural Stability Certificates, Architectural Designs, and Residential or Commercial Construction.",
};

export default function RequestQuotePage() {
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
