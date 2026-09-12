"use client";

import React from "react";
import PlannerStepActions from "../PlannerStepActions";
import { FloorRequirement } from "../types";

interface StepLivingSpacesProps {
  floor: FloorRequirement;
  onChange: (floor: Partial<FloorRequirement>) => void;
  onNext: () => void;
  onBack?: () => void;
  nextLabel: string;
}

export default function StepLivingSpaces({
  floor,
  onChange,
  onNext,
  onBack,
  nextLabel,
}: StepLivingSpacesProps) {
  const availableSpaces = [
    { name: "Living Room", icon: "🛋️", desc: "Formal hall for guests & entertainment" },
    { name: "Family Room", icon: "👨‍👩‍👧‍👦", desc: "Informal lounge for daily family gathering" },
    { name: "Dining Room", icon: "🍽️", desc: "Dedicated dining table area" },
    { name: "Pooja Room", icon: "🛕", desc: "Sacred prayer space aligned per Vastu" },
    { name: "Study Room", icon: "📚", desc: "Quiet study library for children / reading" },
    { name: "Home Office", icon: "💻", desc: "Dedicated work-from-home office suite" },
    { name: "TV / Media Room", icon: "🎬", desc: "Home theatre & acoustic entertainment space" },
    { name: "Children's Play Area", icon: "🧸", desc: "Safe play space for toddlers & kids" },
    { name: "Guest Room", icon: "🔑", desc: "Dedicated room for visiting relatives" },
    { name: "Store Room", icon: "📦", desc: "Housekeeping & dry goods storage" },
  ];

  const toggleSpace = (spaceName: string) => {
    const current = [...floor.livingSpaces];
    const exists = current.includes(spaceName);
    const updated = exists ? current.filter((s) => s !== spaceName) : [...current, spaceName];
    onChange({ livingSpaces: updated });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-6 animate-fadeIn rounded-3xl border border-border/80 bg-white p-6 shadow-xl">
      <div className="space-y-2 text-left">
        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-gold-dark bg-gold/15 px-3 py-1 rounded-full">
          {floor.floorName} · Living &amp; Family Spaces
        </span>
        <h2 className="font-heading font-bold text-2xl md:text-3xl text-charcoal">
          Select Living &amp; Social Spaces for {floor.floorName}
        </h2>
        <p className="text-concrete text-xs leading-relaxed">
          Tap cards to select the communal and specialized rooms required on this floor level.
        </p>
      </div>

      {/* Selectable Visual Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {availableSpaces.map((sp) => {
          const active = floor.livingSpaces.includes(sp.name);
          return (
            <div
              key={sp.name}
              onClick={() => toggleSpace(sp.name)}
              className={`p-4 rounded-3xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                active
                  ? "bg-charcoal text-white border-gold shadow-lg ring-2 ring-gold/40 scale-[1.01]"
                  : "bg-white border-border text-charcoal hover:border-gold hover:shadow-md"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl p-2 rounded-2xl bg-warm-white/10 font-mono">
                  {sp.icon}
                </span>
                <div>
                  <h4 className="font-heading font-bold text-xs">
                    {sp.name}
                  </h4>
                  <p className={`text-[10px] ${active ? "text-white/70" : "text-concrete"}`}>
                    {sp.desc}
                  </p>
                </div>
              </div>

              <div
                className={`w-5 h-5 rounded-full border flex items-center justify-center text-xs font-bold ${
                  active ? "border-gold bg-gold text-charcoal" : "border-border text-concrete"
                }`}
              >
                {active ? "✓" : "+"}
              </div>
            </div>
          );
        })}
      </div>
      <PlannerStepActions onBack={onBack} nextLabel={nextLabel} />
    </form>
  );
}
