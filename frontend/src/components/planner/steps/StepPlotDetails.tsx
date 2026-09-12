"use client";

import React from "react";
import PlannerStepActions from "../PlannerStepActions";
import { PlotData } from "../types";
import PlotSvgDiagram from "../PlotSvgDiagram";
import { Ruler } from "lucide-react";

interface StepPlotDetailsProps {
  data: PlotData;
  onChange: (data: Partial<PlotData>) => void;
  onNext: () => void;
  onBack?: () => void;
  nextLabel: string;
}

export default function StepPlotDetails({
  data,
  onChange,
  onNext,
  onBack,
  nextLabel,
}: StepPlotDetailsProps) {
  const plotArea = Math.round((data.length || 0) * (data.width || 0));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-6 animate-fadeIn rounded-3xl border border-border/80 bg-white p-6 shadow-xl">
      <div className="space-y-2 text-left">
        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-gold-dark bg-gold/15 px-3 py-1 rounded-full">
          Site Boundary
        </span>
        <h2 className="font-heading font-bold text-2xl md:text-3xl text-charcoal">
          Let&apos;s start with your plot.
        </h2>
        <p className="text-concrete text-xs leading-relaxed">
          Provide your land boundaries. We automatically compute the total plot area in real time.
        </p>
      </div>

      {/* Dynamic SVG Visual Diagram */}
      <PlotSvgDiagram
        plotLength={data.length}
        plotWidth={data.width}
        showBuilding={false}
      />

      {/* Input Card */}
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-charcoal flex items-center gap-1.5">
            <Ruler size={14} className="text-gold-dark" /> Plot Dimensions
          </span>

          {/* Unit selector */}
          <div className="bg-linen p-1 rounded-xl flex items-center gap-1 border border-border/60">
            {(["ft", "m"] as const).map((unit) => (
              <button
                key={unit}
                type="button"
                onClick={() => onChange({ unit })}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  data.unit === unit
                    ? "bg-charcoal text-white shadow-sm"
                    : "text-concrete hover:text-charcoal"
                }`}
              >
                {unit === "ft" ? "Feet (ft)" : "Meters (m)"}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Length */}
          <div>
            <label className="block text-[11px] font-bold uppercase text-concrete mb-1">
              Plot Length ({data.unit}) *
            </label>
            <input
              type="number"
              required
              min={10}
              max={500}
              value={data.length || ""}
              onChange={(e) => onChange({ length: Math.max(0, parseFloat(e.target.value) || 0) })}
              placeholder="e.g. 60"
              className="w-full px-4 py-3 bg-warm-white/80 border border-border text-charcoal font-bold font-mono text-base rounded-xl focus:border-gold focus:outline-none transition-all"
            />
          </div>

          {/* Width */}
          <div>
            <label className="block text-[11px] font-bold uppercase text-concrete mb-1">
              Plot Width ({data.unit}) *
            </label>
            <input
              type="number"
              required
              min={10}
              max={500}
              value={data.width || ""}
              onChange={(e) => onChange({ width: Math.max(0, parseFloat(e.target.value) || 0) })}
              placeholder="e.g. 40"
              className="w-full px-4 py-3 bg-warm-white/80 border border-border text-charcoal font-bold font-mono text-base rounded-xl focus:border-gold focus:outline-none transition-all"
            />
          </div>
        </div>

        {/* Auto-calculated Area Display Card */}
        <div className="bg-linen/90 p-4 rounded-2xl border border-gold/40 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-concrete block">
              Calculated Plot Area
            </span>
            <span className="text-[11px] text-concrete/80">
              Automatically derived ({data.length} × {data.width} {data.unit})
            </span>
          </div>
          <div className="text-right">
            <span className="font-heading font-bold text-2xl text-gold-dark font-mono block">
              {plotArea.toLocaleString()}
            </span>
            <span className="text-[10px] font-bold text-concrete uppercase">
              sq {data.unit === "ft" ? "ft" : "m"}
            </span>
          </div>
        </div>
      </div>
      <PlannerStepActions onBack={onBack} nextLabel={nextLabel} />
    </form>
  );
}
