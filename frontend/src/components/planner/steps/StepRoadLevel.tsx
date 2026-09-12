"use client";

import React from "react";
import PlannerStepActions from "../PlannerStepActions";
import { RoadLevelData } from "../types";
import { ArrowDownCircle, Equal, ArrowUpCircle, Info } from "lucide-react";

interface StepRoadLevelProps {
  data: RoadLevelData;
  onChange: (data: Partial<RoadLevelData>) => void;
  onNext: () => void;
  onBack?: () => void;
  nextLabel: string;
}

export default function StepRoadLevel({
  data,
  onChange,
  onNext,
  onBack,
  nextLabel,
}: StepRoadLevelProps) {
  const levels: Array<{
    id: RoadLevelData["level"];
    title: string;
    description: string;
    icon: React.ReactNode;
  }> = [
    {
      id: "Below Road Level",
      title: "Below Road Level",
      description: "Land is lower than the main road surface.",
      icon: <ArrowDownCircle size={28} className="text-amber-600" />,
    },
    {
      id: "Same as Road Level",
      title: "Same as Road Level",
      description: "Land is flat and aligned with road level.",
      icon: <Equal size={28} className="text-blue-600" />,
    },
    {
      id: "Above Road Level",
      title: "Above Road Level",
      description: "Land is elevated or sits on a high plinth.",
      icon: <ArrowUpCircle size={28} className="text-emerald-600" />,
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-6 animate-fadeIn rounded-3xl border border-border/80 bg-white p-6 shadow-xl">
      <div className="space-y-2 text-left">
        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-gold-dark bg-gold/15 px-3 py-1 rounded-full">
          Terrain Elevation
        </span>
        <h2 className="font-heading font-bold text-2xl md:text-3xl text-charcoal">
          How does your plot sit relative to the road?
        </h2>
        <p className="text-concrete text-xs leading-relaxed">
          Site elevation influences foundation engineering, rainwater drainage, and basement feasibility.
        </p>
      </div>

      {/* 3 Large Visual Level Cards */}
      <div className="space-y-3">
        {levels.map((lvl) => {
          const active = data.level === lvl.id;
          return (
            <div
              key={lvl.id}
              onClick={() => onChange({ level: lvl.id })}
              className={`p-5 rounded-3xl border transition-all cursor-pointer flex items-center gap-4 relative overflow-hidden ${
                active
                  ? "bg-charcoal text-white border-gold shadow-xl ring-2 ring-gold/40 scale-[1.01]"
                  : "bg-white border-border text-charcoal hover:border-gold hover:shadow-md"
              }`}
            >
              <div className="p-3 rounded-2xl bg-warm-white/10 border border-white/10 flex-shrink-0">
                {lvl.icon}
              </div>

              <div className="flex-1">
                <h4 className="font-heading font-bold text-base mb-0.5">
                  {lvl.title}
                </h4>
                <p className={`text-xs ${active ? "text-white/70" : "text-concrete"}`}>
                  {lvl.description}
                </p>
              </div>

              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center font-bold text-xs ${
                  active ? "border-gold bg-gold text-charcoal" : "border-border"
                }`}
              >
                {active && "✓"}
              </div>
            </div>
          );
        })}
      </div>

      {/* Conditional Basement Feasibility Notice */}
      {data.level === "Below Road Level" && (
        <div className="p-4 rounded-3xl bg-linen/90 border border-gold/40 text-xs text-charcoal/90 space-y-2 animate-fadeIn">
          <div className="flex items-center gap-2 font-bold text-gold-dark">
            <Info size={16} />
            <span>Basement Feasibility Consideration</span>
          </div>
          <p className="text-concrete leading-relaxed">
            A basement may be possible, but final feasibility depends on soil conditions, groundwater depth, drainage access, structural design, and local municipal regulations.
          </p>

          <div className="pt-2 flex items-center gap-3 border-t border-gold/20">
            <label className="text-xs font-bold text-charcoal cursor-pointer flex items-center gap-2">
              <input
                type="checkbox"
                checked={data.hasBasement}
                onChange={(e) => onChange({ hasBasement: e.target.checked })}
                className="w-4 h-4 accent-gold-dark cursor-pointer rounded"
              />
              <span>Enable Basement Floor in Floor Level Selector</span>
            </label>
          </div>
        </div>
      )}
      <PlannerStepActions onBack={onBack} nextLabel={nextLabel} />
    </form>
  );
}
