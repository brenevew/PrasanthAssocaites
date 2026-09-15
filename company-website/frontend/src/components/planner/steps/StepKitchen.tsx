"use client";

import React from "react";
import PlannerStepActions from "../PlannerStepActions";
import { FloorRequirement } from "../types";
import { UtensilsCrossed } from "lucide-react";

interface StepKitchenProps {
  floor: FloorRequirement;
  onChange: (floor: Partial<FloorRequirement>) => void;
  onNext: () => void;
  onBack?: () => void;
  nextLabel: string;
}

export default function StepKitchen({
  floor,
  onChange,
  onNext,
  onBack,
  nextLabel,
}: StepKitchenProps) {
  const kitchenTypes: Array<{
    id: FloorRequirement["kitchenType"];
    title: string;
    description: string;
  }> = [
    {
      id: "Open",
      title: "Open Kitchen",
      description: "Seamlessly connected with dining & living hall.",
    },
    {
      id: "Semi-Open",
      title: "Semi-Open Kitchen",
      description: "Partial partition or island counter separation.",
    },
    {
      id: "Closed",
      title: "Closed Kitchen",
      description: "Fully enclosed room for heavy Indian cooking.",
    },
  ];

  const locations: Array<FloorRequirement["kitchenLocation"]> = [
    "Near Dining",
    "Near Entrance",
    "Rear Side",
    "User Decides",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-6 animate-fadeIn rounded-3xl border border-border/80 bg-white p-6 shadow-xl">
      <div className="space-y-2 text-left">
        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-gold-dark bg-gold/15 px-3 py-1 rounded-full">
          {floor.floorName} · Culinary Layout
        </span>
        <h2 className="font-heading font-bold text-2xl md:text-3xl text-charcoal">
          Do you want a kitchen on {floor.floorName}?
        </h2>
        <p className="text-concrete text-xs leading-relaxed">
          Configure primary kitchens, secondary kitchenettes, or utility wash spaces.
        </p>
      </div>

      {/* Primary Kitchen Yes/No Card */}
      <div className="grid grid-cols-2 gap-4">
        {[true, false].map((val) => (
          <button
            key={String(val)}
            type="button"
            onClick={() => onChange({ hasKitchen: val })}
            className={`p-6 rounded-3xl border text-center transition-all cursor-pointer font-heading font-bold text-lg ${
              floor.hasKitchen === val
                ? "bg-charcoal text-white border-gold shadow-xl ring-2 ring-gold/40 scale-[1.02]"
                : "bg-white border-border text-charcoal hover:border-gold"
            }`}
          >
            {val ? "Yes, Include Kitchen" : "No Kitchen Needed"}
          </button>
        ))}
      </div>

      {/* Progressive Kitchen Configurations */}
      {floor.hasKitchen && (
        <div className="space-y-6 animate-fadeIn">
          {/* Kitchen Type Visual Cards */}
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-charcoal flex items-center gap-1.5">
              <UtensilsCrossed size={14} className="text-gold-dark" /> Kitchen Architectural Style
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {kitchenTypes.map((kt) => {
                const active = floor.kitchenType === kt.id;
                return (
                  <button
                    key={kt.id}
                    type="button"
                    onClick={() => onChange({ kitchenType: kt.id })}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                      active
                        ? "bg-gold/20 text-gold-dark border-gold font-bold shadow-sm"
                        : "bg-warm-white text-charcoal/80 border-border hover:border-gold"
                    }`}
                  >
                    <span className="font-heading font-bold text-xs block mb-1">
                      {kt.title}
                    </span>
                    <span className="text-[10px] text-concrete block leading-snug">
                      {kt.description}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Kitchen Auxiliary Options */}
          <div className="space-y-2 pt-2 border-t border-border/60">
            <span className="text-[10px] font-bold uppercase text-concrete block">
              Auxiliary Kitchen Spaces
            </span>

            <div className="grid grid-cols-3 gap-2 text-xs">
              {[
                { key: "hasUtilityWash", label: "Utility / Wash Area" },
                { key: "hasPantry", label: "Walk-in Pantry" },
                { key: "hasDiningArea", label: "Dining Nook" },
              ].map((opt) => {
                const active = Boolean(floor[opt.key as keyof FloorRequirement]);
                return (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => onChange({ [opt.key]: !active })}
                    className={`p-3 rounded-xl border text-center font-bold text-xs transition-all cursor-pointer ${
                      active
                        ? "bg-gold/20 text-gold-dark border-gold"
                        : "bg-warm-white text-concrete border-border hover:text-charcoal"
                    }`}
                  >
                    {active ? `✓ ${opt.label}` : `+ ${opt.label}`}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Kitchen Preferred Location */}
          <div className="space-y-2 pt-2 border-t border-border/60">
            <span className="text-[10px] font-bold uppercase text-concrete block">
              Preferred Floor Location
            </span>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {locations.map((loc) => (
                <button
                  key={loc}
                  type="button"
                  onClick={() => onChange({ kitchenLocation: loc })}
                  className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer text-center ${
                    floor.kitchenLocation === loc
                      ? "bg-charcoal text-white border-gold shadow-sm"
                      : "bg-warm-white text-concrete border-border hover:text-charcoal"
                  }`}
                >
                  {loc}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      <PlannerStepActions onBack={onBack} nextLabel={nextLabel} />
    </form>
  );
}
