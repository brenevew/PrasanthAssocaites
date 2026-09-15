"use client";

import React from "react";
import PlannerStepActions from "../PlannerStepActions";
import { RoadData } from "../types";
import { Info } from "lucide-react";

interface StepRoadDetailsProps {
  data: RoadData;
  onChange: (data: Partial<RoadData>) => void;
  onNext: () => void;
  onBack?: () => void;
  nextLabel: string;
}

export default function StepRoadDetails({
  data,
  onChange,
  onNext,
  onBack,
  nextLabel,
}: StepRoadDetailsProps) {
  const sides: Array<{ side: RoadData["roadSide"]; label: string; icon: string }> = [
    { side: "North", label: "North Facing", icon: "⬆" },
    { side: "East", label: "East Facing", icon: "➡" },
    { side: "South", label: "South Facing", icon: "⬇" },
    { side: "West", label: "West Facing", icon: "⬅" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-6 animate-fadeIn rounded-3xl border border-border/80 bg-white p-6 shadow-xl">
      <div className="space-y-2 text-left">
        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-gold-dark bg-gold/15 px-3 py-1 rounded-full">
          Road Relationship &amp; Orientation
        </span>
        <h2 className="font-heading font-bold text-2xl md:text-3xl text-charcoal">
          Which side of your plot faces the road?
        </h2>
        <p className="text-concrete text-xs leading-relaxed">
          Road orientation determines building entry, Vastu compliance, natural lighting, and setback requirements.
        </p>
      </div>

      {/* Interactive Directional Selector Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {sides.map((s) => {
          const active = data.roadSide === s.side;
          return (
            <button
              key={s.side}
              type="button"
              onClick={() => onChange({ roadSide: s.side })}
              className={`p-4 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-2 ${
                active
                  ? "bg-charcoal text-white border-gold shadow-xl ring-2 ring-gold/40 scale-105"
                  : "bg-white border-border text-charcoal/80 hover:border-gold hover:shadow-md"
              }`}
            >
              <span className="text-xl font-bold font-mono">{s.icon}</span>
              <span className="font-heading font-bold text-xs">{s.label}</span>
            </button>
          );
        })}
      </div>

      {/* Road Width Question */}
      <div className="space-y-5">
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-charcoal">
            Do you know the road width?
          </label>

          <div className="grid grid-cols-2 gap-3">
            {(["Yes", "No"] as const).map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => onChange({ knowRoadWidth: opt })}
                className={`py-3 px-4 rounded-xl border text-xs font-bold transition-all cursor-pointer text-center ${
                  data.knowRoadWidth === opt
                    ? "bg-gold/20 text-gold-dark border-gold font-bold shadow-sm"
                    : "bg-warm-white text-concrete border-border hover:text-charcoal"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>

          {data.knowRoadWidth === "Yes" && (
            <div className="pt-2 animate-fadeIn">
              <label className="block text-[10px] font-bold uppercase text-concrete mb-1">
                Road Width (feet) *
              </label>
              <input
                type="number"
                required
                min={10}
                max={200}
                value={data.roadWidth || ""}
                onChange={(e) => onChange({ roadWidth: parseFloat(e.target.value) || 0 })}
                placeholder="e.g. 30 ft or 40 ft"
                className="w-full px-4 py-2.5 bg-warm-white/80 border border-border text-charcoal font-bold font-mono text-sm rounded-xl focus:border-gold focus:outline-none transition-all"
              />
            </div>
          )}
        </div>

        {/* Setbacks Question */}
        <div className="space-y-2 pt-2 border-t border-border/60">
          <label className="block text-xs font-bold uppercase tracking-wider text-charcoal">
            Do you know the required setbacks?
          </label>

          <div className="grid grid-cols-3 gap-2">
            {(["Yes", "No", "Not Sure"] as const).map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => onChange({ knowSetbacks: opt })}
                className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer text-center ${
                  data.knowSetbacks === opt
                    ? "bg-gold/20 text-gold-dark border-gold font-bold shadow-sm"
                    : "bg-warm-white text-concrete border-border hover:text-charcoal"
                }`}
              >
                {opt === "Not Sure" ? "I'm Not Sure" : opt}
              </button>
            ))}
          </div>

          {data.knowSetbacks === "Not Sure" && (
            <div className="p-3.5 rounded-2xl bg-linen/80 border border-gold/30 text-xs text-charcoal/80 flex items-start gap-2.5 animate-fadeIn mt-2">
              <Info size={16} className="text-gold-dark flex-shrink-0 mt-0.5" />
              <span>
                That&apos;s okay. Your architect or local authority will need to confirm the applicable setbacks based on your local municipality bye-laws. We&apos;ll continue without assuming them.
              </span>
            </div>
          )}

          {data.knowSetbacks === "Yes" && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 animate-fadeIn">
              <div>
                <label className="block text-[9px] font-bold uppercase text-concrete mb-1">Front (ft)</label>
                <input
                  type="number"
                  value={data.frontSetback || ""}
                  onChange={(e) => onChange({ frontSetback: parseFloat(e.target.value) || 0 })}
                  placeholder="5"
                  className="w-full px-2.5 py-1.5 bg-warm-white border border-border text-xs font-bold font-mono rounded-xl focus:border-gold focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[9px] font-bold uppercase text-concrete mb-1">Rear (ft)</label>
                <input
                  type="number"
                  value={data.rearSetback || ""}
                  onChange={(e) => onChange({ rearSetback: parseFloat(e.target.value) || 0 })}
                  placeholder="4"
                  className="w-full px-2.5 py-1.5 bg-warm-white border border-border text-xs font-bold font-mono rounded-xl focus:border-gold focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[9px] font-bold uppercase text-concrete mb-1">Left (ft)</label>
                <input
                  type="number"
                  value={data.leftSetback || ""}
                  onChange={(e) => onChange({ leftSetback: parseFloat(e.target.value) || 0 })}
                  placeholder="3"
                  className="w-full px-2.5 py-1.5 bg-warm-white border border-border text-xs font-bold font-mono rounded-xl focus:border-gold focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[9px] font-bold uppercase text-concrete mb-1">Right (ft)</label>
                <input
                  type="number"
                  value={data.rightSetback || ""}
                  onChange={(e) => onChange({ rightSetback: parseFloat(e.target.value) || 0 })}
                  placeholder="3"
                  className="w-full px-2.5 py-1.5 bg-warm-white border border-border text-xs font-bold font-mono rounded-xl focus:border-gold focus:outline-none"
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <PlannerStepActions onBack={onBack} nextLabel={nextLabel} />
    </form>
  );
}
