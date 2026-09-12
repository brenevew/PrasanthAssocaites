"use client";

import { useState } from "react";
import {
  architecturalServicePlans,
  interiorDesignServicePlans,
  elevation3DServicePlans,
  approvalDocumentationServicePlans,
  signaturePackages,
  type ServicePlanItem,
} from "@/data/rateCardsLegacy";
import { FileText, Sparkles, CheckCircle2, ChevronDown, Award } from "lucide-react";

export default function ArchitecturalRateCardSection() {
  const [activeTab, setActiveTab] = useState<"arch" | "interior" | "3d" | "approval" | "packages">("packages");

  const tables: Record<string, { title: string; items: ServicePlanItem[] }> = {
    arch: { title: "Architectural & Service Plans", items: architecturalServicePlans },
    interior: { title: "Interior Design Services", items: interiorDesignServicePlans },
    "3d": { title: "Elevation & 3D Design Services", items: elevation3DServicePlans },
    approval: { title: "Approval & Documentation Services", items: approvalDocumentationServicePlans },
  };

  return (
    <div className="bg-white/95 backdrop-blur-xl rounded-[32px] border border-gold/30 shadow-2xl p-6 md:p-8 space-y-6">
      
      {/* Rate Card Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-border/70">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/15 text-gold-dark text-[10px] font-bold uppercase tracking-widest mb-1.5 border border-gold/30">
            <Sparkles size={11} />
            Official Pricing Matrix
          </span>
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-charcoal">
            Architectural &amp; Service Rate Card
          </h2>
          <p className="text-concrete text-xs">
            Transparent line-item rates for architectural blueprints, 3D elevations, interior design &amp; approval documentation.
          </p>
        </div>

        {/* Tab Pills */}
        <div className="flex flex-wrap gap-1 bg-linen/70 p-1.5 rounded-2xl border border-border">
          {(
            [
              { id: "packages", label: "Signature Packages" },
              { id: "arch", label: "Architectural Plans" },
              { id: "interior", label: "Interior Design" },
              { id: "3d", label: "3D & Elevation" },
              { id: "approval", label: "Approval & BOQ" },
            ] as const
          ).map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                  active
                    ? "bg-charcoal text-warm-white shadow-sm"
                    : "text-concrete hover:text-charcoal hover:bg-white/60"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* TABS CONTENT */}
      {activeTab === "packages" ? (
        /* SIGNATURE PACKAGES CARDS */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {signaturePackages.map((pkg) => (
            <div
              key={pkg.name}
              className="glass-card rounded-2xl p-5 border border-border/80 flex flex-col justify-between hover:border-gold transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gold-dark bg-gold/15 px-2.5 py-0.5 rounded-full">
                    {pkg.badge}
                  </span>
                  <Award size={16} className="text-gold-dark" />
                </div>
                <h3 className="font-heading text-lg font-bold text-charcoal mb-1">{pkg.name}</h3>
                <p className="text-xs font-bold text-gold-dark mb-3">{pkg.rateFormula}</p>
                <div className="bg-warm-white p-3 rounded-xl border border-border/60 mb-3 text-[11px] font-semibold text-charcoal leading-snug">
                  {pkg.includedServices}
                </div>
                <p className="text-[11px] text-concrete leading-relaxed">{pkg.description}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* DETAILED SERVICE TABLES */
        <div className="overflow-x-auto rounded-2xl border border-border/80 bg-white">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-charcoal text-warm-white font-heading text-xs">
                <th className="py-3 px-4 w-12 font-bold text-center border-b border-white/10">S.No</th>
                <th className="py-3 px-4 font-bold border-b border-white/10">Service</th>
                <th className="py-3 px-4 font-bold border-b border-white/10">Description</th>
                <th className="py-3 px-4 font-bold border-b border-white/10 text-right w-36">Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 text-concrete">
              {tables[activeTab]?.items.map((row) => (
                <tr key={row.no} className="hover:bg-warm-white/70 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-charcoal text-center">{row.no}</td>
                  <td className="py-3 px-4 font-bold text-charcoal">{row.service}</td>
                  <td className="py-3 px-4 leading-relaxed">{row.description}</td>
                  <td className="py-3 px-4 font-bold text-gold-dark text-right font-mono whitespace-nowrap">{row.rate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Footer Note */}
      <div className="bg-warm-white/80 p-3.5 rounded-xl border border-border/60 flex flex-col sm:flex-row items-center justify-between text-[11px] text-concrete gap-2">
        <div className="flex items-center gap-2">
          <CheckCircle2 size={15} className="text-gold-dark flex-shrink-0" />
          <span>All rates are calculated based on built-up square footage or per-floor architectural scope.</span>
        </div>
        <span className="font-semibold text-charcoal">Official Rate Schedule · Prasanth Associates</span>
      </div>
    </div>
  );
}
