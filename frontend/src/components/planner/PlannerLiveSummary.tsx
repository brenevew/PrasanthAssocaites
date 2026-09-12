"use client";

import React, { useState } from "react";
import { PlannerState, EngineeringValidationWarning, StepId } from "./types";
import {
  Home,
  Bed,
  Bath,
  UtensilsCrossed,
  Car,
  AlertTriangle,
  ChevronUp,
  ChevronDown,
  ShieldCheck,
} from "lucide-react";

interface PlannerLiveSummaryProps {
  state: PlannerState;
  warnings: EngineeringValidationWarning[];
  onNavigateToStep?: (stepId: StepId) => void;
}

export default function PlannerLiveSummary({
  state,
  warnings,
  onNavigateToStep,
}: PlannerLiveSummaryProps) {
  const [mobileExpanded, setMobileExpanded] = useState(false);

  // Derived Totals
  const plotArea = Math.round(state.plot.length * state.plot.width);
  const buildingFootprint = Math.round(state.footprint.length * state.footprint.width);

  const totalBuiltUp = state.floors.reduce((sum, fl) => sum + (fl.builtUpSft || buildingFootprint), 0);
  const totalBedrooms = state.floors.reduce((sum, fl) => sum + fl.masterBedroomsCount + fl.normalBedroomsCount, 0);
  const totalBathrooms = state.floors.reduce((sum, fl) => sum + fl.attachedBathsCount + fl.commonBathsCount + (fl.hasGuestPowderRoom ? 1 : 0), 0);
  const totalKitchens = state.floors.reduce((sum, fl) => sum + (fl.hasKitchen ? 1 : 0), 0);
  const totalCars = state.floors.reduce((sum, fl) => sum + (fl.parkingCarsCount || 0), 0);

  const totalConfiguredFloors = state.floors.filter((f) => f.isConfigured).length;

  const metrics = [
    { label: "Plot Area", value: plotArea, accent: false },
    { label: "Footprint", value: buildingFootprint, accent: false },
    { label: "Total Built-Up", value: totalBuiltUp, accent: true },
  ];

  const amenities = [
    { icon: Bed, value: totalBedrooms, label: totalBedrooms === 1 ? "Bed" : "Beds" },
    { icon: Bath, value: totalBathrooms, label: totalBathrooms === 1 ? "Bath" : "Baths" },
    { icon: UtensilsCrossed, value: totalKitchens, label: totalKitchens === 1 ? "Kitchen" : "Kitchens" },
    { icon: Car, value: totalCars, label: totalCars === 1 ? "Car" : "Cars" },
  ];

  return (
    <>
      {/* ── DESKTOP FLOATING WIDGET ───────────────────────────────────── */}
      
      <div className="sticky top-28 hidden xl:block">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#241f1a] via-charcoal to-[#15120f] p-5 text-white shadow-2xl ring-1 ring-white/5">
          {/* Geometric blurred accents */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
          <div className="pointer-events-none absolute -right-16 -top-20 h-44 w-44 rounded-full bg-gold/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-16 h-44 w-44 rounded-full bg-gold/10 blur-3xl" />

          <div className="relative space-y-4">

            {/* Header — title on its own row so it never competes with the badge */}
            <div className="space-y-2.5 border-b border-white/10 pb-4">
              <div className="flex min-w-0 items-center gap-2.5">
                <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-gold/20 text-gold">
                  <Home size={17} />
                </span>
                <span className="min-w-0 truncate font-heading text-base font-bold text-warm-white">
                  {state.setup.projectName || "Your Family Home"}
                </span>
              </div>

              <div className="flex items-center justify-between gap-2">
                <span className="whitespace-nowrap font-mono text-[10px] uppercase tracking-wider text-white/50">
                  Live Building Summary
                </span>
                <span className="flex-shrink-0 whitespace-nowrap rounded-full border border-gold/30 bg-white/10 px-2.5 py-0.5 font-mono text-[10px] font-bold text-gold-light">
                  {totalConfiguredFloors}/{state.floors.length} Levels
                </span>
              </div>
            </div>

            {/* Plot Metrics — vertical rows: label left, value right, nothing ever truncates */}
            <div className="space-y-2">
              {metrics.map(({ label, value, accent }) => (
                <div
                  key={label}
                  className={`flex items-center justify-between gap-3 rounded-xl border px-3.5 py-2.5 ${
                    accent
                      ? "border-gold/40 bg-gradient-to-r from-gold/20 to-gold/5"
                      : "border-white/10 bg-white/5"
                  }`}
                >
                  <span
                    className={`whitespace-nowrap text-[10px] font-bold uppercase tracking-wider ${
                      accent ? "text-gold" : "text-white/45"
                    }`}
                  >
                    {label}
                  </span>
                  <span className="flex flex-shrink-0 items-baseline gap-1 whitespace-nowrap">
                    <span
                      className={`font-mono font-bold tabular-nums text-warm-white ${
                        accent ? "text-lg" : "text-base"
                      }`}
                    >
                      {value.toLocaleString("en-IN")}
                    </span>
                    <span className="text-[9px] font-medium text-white/45">sqft</span>
                  </span>
                </div>
              ))}
            </div>

            {/* Amenity Metrics */}
            <div className="grid grid-cols-4 gap-1.5 border-t border-white/10 pt-4">
              {amenities.map(({ icon: Icon, value, label }) => (
                <div
                  key={label}
                  className="min-w-0 rounded-xl border border-white/5 bg-white/5 px-1 py-2.5 text-center"
                >
                  <Icon size={14} className="mx-auto text-gold" />
                  <span className="mt-1.5 block font-mono text-base font-bold leading-none tabular-nums text-white">
                    {value}
                  </span>
                  <span className="mt-1 block text-[9px] font-medium leading-none text-white/45">
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* Engineering Advisories */}
            {warnings.length > 0 && (
              <div className="space-y-2 border-t border-white/10 pt-4">
                <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-gold-light">
                  <AlertTriangle size={12} className="text-gold" />
                  Engineering Validation ({warnings.length})
                </span>

                <div className="max-h-36 space-y-2 overflow-y-auto pr-1">
                  {warnings.map((w) => (
                    <div
                      key={w.id}
                      className="space-y-1 rounded-xl border border-white/10 bg-white/8 p-3"
                    >
                      <div className="flex items-start justify-between gap-2 text-[11px] font-bold text-warm-white">
                        <span className="min-w-0">{w.title}</span>
                        {w.stepTarget && (
                          <button
                            type="button"
                            onClick={() => {
                              if (w.stepTarget) onNavigateToStep?.(w.stepTarget);
                            }}
                            className="flex-shrink-0 cursor-pointer text-[10px] text-gold hover:underline"
                          >
                            Review
                          </button>
                        )}
                      </div>
                      <p className="text-[10px] leading-normal text-white/60">
                        {w.message}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Assurance Footer */}
            <div className="flex items-center justify-center gap-1.5 border-t border-white/10 pt-3.5 text-[10px] text-white/40">
              <ShieldCheck size={13} className="text-gold" />
              <span>Real-time Engineering Validation</span>
            </div>

          </div>
        </div>
      </div>

      {/* ── MOBILE BOTTOM SHEET (sits above the fixed action bar) ─────── */}
      <div className="pointer-events-none fixed inset-x-0 bottom-20 z-40 px-4 xl:hidden">
        <div className="pointer-events-auto mx-auto max-w-md">
          <div className="overflow-hidden rounded-2xl border border-white/15 bg-charcoal text-white shadow-2xl backdrop-blur-xl">
            {/* Header Bar */}
            <button
              type="button"
              onClick={() => setMobileExpanded(!mobileExpanded)}
              className="flex w-full cursor-pointer items-center justify-between gap-3 bg-white/5 px-4 py-3"
            >
              <span className="flex min-w-0 items-center gap-2">
                <Home size={15} className="flex-shrink-0 text-gold" />
                <span className="truncate font-heading text-xs font-bold text-warm-white">
                  {state.setup.projectName || "Your Home"}
                </span>
                <span className="flex-shrink-0 whitespace-nowrap rounded-full bg-white/10 px-2 py-0.5 font-mono text-[10px] font-bold text-gold-light">
                  {totalBuiltUp.toLocaleString("en-IN")} SFT
                </span>
              </span>

              <span className="flex flex-shrink-0 items-center gap-1.5 text-xs font-medium text-white/60">
                <span>{mobileExpanded ? "Hide" : "Summary"}</span>
                {mobileExpanded ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
              </span>
            </button>

            {/* Expanded Body */}
            {mobileExpanded && (
              <div className="max-h-72 space-y-3 overflow-y-auto border-t border-white/10 p-4">
                <div className="grid grid-cols-3 gap-2">
                  {metrics.map(({ label, value, accent }) => (
                    <div
                      key={label}
                      className={`min-w-0 rounded-xl p-2.5 text-center ${
                        accent ? "bg-gold/15" : "bg-white/5"
                      }`}
                    >
                      <span className="block truncate text-[9px] uppercase tracking-wider text-white/50">
                        {label}
                      </span>
                      <span className="mt-1 block font-mono text-sm font-bold leading-none tabular-nums text-warm-white">
                        {value.toLocaleString("en-IN")}
                      </span>
                      <span className="mt-0.5 block text-[9px] leading-none text-white/45">sqft</span>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {amenities.map(({ icon: Icon, value, label }) => (
                    <div key={label} className="min-w-0 rounded-xl bg-white/5 py-2 text-center">
                      <Icon size={13} className="mx-auto text-gold" />
                      <span className="mt-1 block font-mono text-sm font-bold leading-none tabular-nums">
                        {value}
                      </span>
                      <span className="mt-0.5 block truncate text-[9px] leading-none text-white/50">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>

                {warnings.length > 0 && (
                  <div className="space-y-1.5 border-t border-white/10 pt-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gold">
                      Validation Notices ({warnings.length})
                    </span>
                    {warnings.map((w) => (
                      <div key={w.id} className="rounded-lg bg-white/8 p-2 text-[10px] text-white/70">
                        <strong className="block text-white">{w.title}</strong>
                        {w.message}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
