"use client";

import React from "react";
import PlannerStepActions from "../PlannerStepActions";
import { BuildingFootprintData, PlotData } from "../types";
import PlotSvgDiagram from "../PlotSvgDiagram";
import { Home, AlertTriangle } from "lucide-react";

interface StepConstructionDetailsProps {
  footprint: BuildingFootprintData;
  plot: PlotData;
  onChange: (footprint: Partial<BuildingFootprintData>) => void;
  onNext: () => void;
  onBack?: () => void;
  nextLabel: string;
}

export default function StepConstructionDetails({
  footprint,
  plot,
  onChange,
  onNext,
  onBack,
  nextLabel,
}: StepConstructionDetailsProps) {
  const plotArea = Math.round(plot.length * plot.width);
  const buildingArea = Math.round(footprint.length * footprint.width);

  const isExceedingWidth = footprint.width > plot.width;
  const isExceedingLength = footprint.length > plot.length;
  const isInvalid = isExceedingWidth || isExceedingLength;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isInvalid) {
      onNext();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-6 animate-fadeIn rounded-3xl border border-border/80 bg-white p-6 shadow-xl">
      <div className="space-y-2 text-left">
        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-gold-dark bg-gold/15 px-3 py-1 rounded-full">
          Proposed Building Footprint
        </span>
        <h2 className="font-heading font-bold text-2xl md:text-3xl text-charcoal">
          How much of the plot do you want to build on?
        </h2>
        <p className="text-concrete text-xs leading-relaxed">
          Specify the external footprint dimensions of your planned building structure.
        </p>
      </div>

      {/* Dynamic Visual SVG Comparison */}
      <PlotSvgDiagram
        plotLength={plot.length}
        plotWidth={plot.width}
        buildingLength={footprint.length}
        buildingWidth={footprint.width}
        showBuilding={true}
      />

      {/* Input Card */}
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-charcoal flex items-center gap-1.5">
            <Home size={14} className="text-gold-dark" /> Footprint Dimensions
          </span>
          <span className="text-[10px] font-mono text-concrete uppercase font-bold">
            Max Plot: {plot.width} × {plot.length} {plot.unit}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Building Length */}
          <div>
            <label className="block text-[11px] font-bold uppercase text-concrete mb-1">
              Building Length ({plot.unit}) *
            </label>
            <input
              type="number"
              required
              min={10}
              max={plot.length}
              value={footprint.length || ""}
              onChange={(e) => onChange({ length: Math.max(0, parseFloat(e.target.value) || 0) })}
              placeholder={`e.g. ${Math.round(plot.length * 0.75)}`}
              className={`w-full px-4 py-3 bg-warm-white/80 border text-charcoal font-bold font-mono text-base rounded-xl focus:outline-none transition-all ${
                isExceedingLength
                  ? "border-red-400 focus:border-red-500 bg-red-50/50"
                  : "border-border focus:border-gold"
              }`}
            />
          </div>

          {/* Building Width */}
          <div>
            <label className="block text-[11px] font-bold uppercase text-concrete mb-1">
              Building Breadth / Width ({plot.unit}) *
            </label>
            <input
              type="number"
              required
              min={10}
              max={plot.width}
              value={footprint.width || ""}
              onChange={(e) => onChange({ width: Math.max(0, parseFloat(e.target.value) || 0) })}
              placeholder={`e.g. ${Math.round(plot.width * 0.75)}`}
              className={`w-full px-4 py-3 bg-warm-white/80 border text-charcoal font-bold font-mono text-base rounded-xl focus:outline-none transition-all ${
                isExceedingWidth
                  ? "border-red-400 focus:border-red-500 bg-red-50/50"
                  : "border-border focus:border-gold"
              }`}
            />
          </div>
        </div>

        {/* Footprint vs Plot Area Callout */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <div className="bg-linen/60 p-3 rounded-2xl border border-border/70">
            <span className="text-[9px] font-bold uppercase tracking-wider text-concrete block mb-0.5">
              Total Plot Area
            </span>
            <span className="font-heading font-bold text-lg text-charcoal font-mono">
              {plotArea.toLocaleString()} <span className="text-xs font-normal text-concrete">SFT</span>
            </span>
          </div>

          <div className="bg-gold/10 p-3 rounded-2xl border border-gold/40">
            <span className="text-[9px] font-bold uppercase tracking-wider text-gold-dark block mb-0.5">
              Proposed Footprint
            </span>
            <span className="font-heading font-bold text-lg text-gold-dark font-mono">
              {buildingArea.toLocaleString()} <span className="text-xs font-normal text-gold-dark/80">SFT</span>
            </span>
          </div>
        </div>

        {/* Validation Warning */}
        {isInvalid && (
          <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2.5 animate-fadeIn">
            <AlertTriangle size={16} className="text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="block font-bold">Impossible Footprint Dimensions</strong>
              <span>
                Building dimensions ({footprint.width} × {footprint.length} {plot.unit}) cannot exceed plot dimensions ({plot.width} × {plot.length} {plot.unit}). Please adjust building length or breadth.
              </span>
            </div>
          </div>
        )}
      </div>
      <PlannerStepActions onBack={onBack} nextLabel={nextLabel} />
    </form>
  );
}
