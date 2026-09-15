"use client";

import React, { useState } from "react";
import PlannerStepActions from "../PlannerStepActions";
import { FloorRequirement, BedroomCustomization } from "../types";
import { Bed, Plus, Minus, SlidersHorizontal } from "lucide-react";

interface StepRoomConfigProps {
  floor: FloorRequirement;
  onChange: (floor: Partial<FloorRequirement>) => void;
  onNext: () => void;
  onBack?: () => void;
  nextLabel: string;
}

export default function StepRoomConfig({
  floor,
  onChange,
  onNext,
  onBack,
  nextLabel,
}: StepRoomConfigProps) {
  const [expandedBedId, setExpandedBedId] = useState<string | null>(null);

  // Sync bedrooms customizations list when counters change
  const handleMasterCountChange = (newCount: number) => {
    const clamped = Math.max(0, newCount);
    const currentCustoms = [...floor.bedroomCustomizations];

    // Maintain master beds
    const masterList = currentCustoms.filter((b) => b.type === "Master Bedroom");
    const normalList = currentCustoms.filter((b) => b.type === "Normal Bedroom");

    if (clamped > masterList.length) {
      for (let i = masterList.length + 1; i <= clamped; i++) {
        masterList.push({
          id: `master_${Date.now()}_${i}`,
          title: `Master Bedroom ${i.toString().padStart(2, "0")}`,
          type: "Master Bedroom",
          attachedBath: true,
          dressingRoom: true,
          walkInWardrobe: false,
          balcony: true,
          preferredSize: "Standard (14x16)",
        });
      }
    } else {
      masterList.splice(clamped);
    }

    onChange({
      masterBedroomsCount: clamped,
      bedroomCustomizations: [...masterList, ...normalList],
    });
  };

  const handleNormalCountChange = (newCount: number) => {
    const clamped = Math.max(0, newCount);
    const currentCustoms = [...floor.bedroomCustomizations];

    const masterList = currentCustoms.filter((b) => b.type === "Master Bedroom");
    const normalList = currentCustoms.filter((b) => b.type === "Normal Bedroom");

    if (clamped > normalList.length) {
      for (let i = normalList.length + 1; i <= clamped; i++) {
        normalList.push({
          id: `normal_${Date.now()}_${i}`,
          title: `Bedroom ${i.toString().padStart(2, "0")}`,
          type: "Normal Bedroom",
          attachedBath: false,
          dressingRoom: false,
          walkInWardrobe: false,
          balcony: false,
          preferredSize: "Standard (14x16)",
        });
      }
    } else {
      normalList.splice(clamped);
    }

    onChange({
      normalBedroomsCount: clamped,
      bedroomCustomizations: [...masterList, ...normalList],
    });
  };

  const updateBedCustom = (id: string, updates: Partial<BedroomCustomization>) => {
    const updated = floor.bedroomCustomizations.map((b) =>
      b.id === id ? { ...b, ...updates } : b
    );
    onChange({ bedroomCustomizations: updated });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-6 animate-fadeIn rounded-3xl border border-border/80 bg-white p-6 shadow-xl">
      <div className="space-y-2 text-left">
        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-gold-dark bg-gold/15 px-3 py-1 rounded-full">
          {floor.floorName} · Bedrooms
        </span>
        <h2 className="font-heading font-bold text-2xl md:text-3xl text-charcoal">
          What spaces do you need on {floor.floorName}?
        </h2>
        <p className="text-concrete text-xs leading-relaxed">
          Select bedroom quantities and customize individual suite amenities.
        </p>
      </div>

      {/* Quantity Stepper Cards */}
      <div className="space-y-5">
        <span className="text-xs font-bold uppercase tracking-wider text-charcoal flex items-center gap-1.5">
          <Bed size={15} className="text-gold-dark" /> Bedroom Quantities
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Master Bedrooms */}
          <div className="bg-warm-white p-4 rounded-2xl border border-border flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-charcoal block">Master Bedrooms</span>
              <span className="text-[10px] text-concrete">Attached bath &amp; balcony</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleMasterCountChange(floor.masterBedroomsCount - 1)}
                className="w-7 h-7 rounded-lg bg-white border border-border flex items-center justify-center font-bold text-xs hover:bg-gold/20 cursor-pointer"
              >
                <Minus size={12} />
              </button>
              <span className="font-mono font-bold text-sm text-charcoal w-4 text-center">
                {floor.masterBedroomsCount}
              </span>
              <button
                type="button"
                onClick={() => handleMasterCountChange(floor.masterBedroomsCount + 1)}
                className="w-7 h-7 rounded-lg bg-white border border-border flex items-center justify-center font-bold text-xs hover:bg-gold/20 cursor-pointer"
              >
                <Plus size={12} />
              </button>
            </div>
          </div>

          {/* Normal Bedrooms */}
          <div className="bg-warm-white p-4 rounded-2xl border border-border flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-charcoal block">Standard Bedrooms</span>
              <span className="text-[10px] text-concrete">Family / Guest rooms</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleNormalCountChange(floor.normalBedroomsCount - 1)}
                className="w-7 h-7 rounded-lg bg-white border border-border flex items-center justify-center font-bold text-xs hover:bg-gold/20 cursor-pointer"
              >
                <Minus size={12} />
              </button>
              <span className="font-mono font-bold text-sm text-charcoal w-4 text-center">
                {floor.normalBedroomsCount}
              </span>
              <button
                type="button"
                onClick={() => handleNormalCountChange(floor.normalBedroomsCount + 1)}
                className="w-7 h-7 rounded-lg bg-white border border-border flex items-center justify-center font-bold text-xs hover:bg-gold/20 cursor-pointer"
              >
                <Plus size={12} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Progressive Room Cards */}
      {floor.bedroomCustomizations.length > 0 && (
        <div className="space-y-3 pt-2">
          <span className="text-xs font-bold uppercase tracking-wider text-charcoal block">
            Bedroom Suites ({floor.bedroomCustomizations.length})
          </span>

          {floor.bedroomCustomizations.map((bed) => {
            const isExpanded = expandedBedId === bed.id;

            return (
              <div
                key={bed.id}
                className="space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-xl bg-gold/15 text-gold-dark font-bold text-xs flex items-center justify-center font-mono">
                      🛏️
                    </span>
                    <div>
                      <h4 className="font-heading font-bold text-sm text-charcoal">
                        {bed.title}
                      </h4>
                      <span className="text-[10px] text-concrete">
                        {bed.preferredSize} · {bed.attachedBath ? "Attached Bath" : "No Attached Bath"}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setExpandedBedId(isExpanded ? null : bed.id)}
                    className="px-3 py-1 rounded-xl bg-linen text-xs font-bold text-charcoal hover:bg-gold/20 flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <SlidersHorizontal size={12} />
                    <span>{isExpanded ? "Done" : "Customize Bedroom"}</span>
                  </button>
                </div>

                {/* Progressive Expansion */}
                {isExpanded && (
                  <div className="pt-3 border-t border-border/60 space-y-3 animate-fadeIn">
                    <span className="text-[10px] font-bold uppercase text-concrete block">
                      Amenities &amp; Layout Options
                    </span>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                      {[
                        { key: "attachedBath", label: "Attached Bath" },
                        { key: "dressingRoom", label: "Dressing Room" },
                        { key: "walkInWardrobe", label: "Walk-in Closet" },
                        { key: "balcony", label: "Private Balcony" },
                      ].map((opt) => {
                        const active = Boolean(bed[opt.key as keyof BedroomCustomization]);
                        return (
                          <button
                            key={opt.key}
                            type="button"
                            onClick={() =>
                              updateBedCustom(bed.id, { [opt.key]: !active })
                            }
                            className={`p-2.5 rounded-xl border text-center font-bold text-[11px] transition-all cursor-pointer ${
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

                    <div>
                      <label className="block text-[10px] font-bold uppercase text-concrete mb-1">
                        Preferred Room Dimensions
                      </label>
                      <select
                        value={bed.preferredSize}
                        onChange={(e) =>
                          updateBedCustom(bed.id, {
                            preferredSize: e.target.value as BedroomCustomization["preferredSize"],
                          })
                        }
                        className="w-full px-3 py-2 bg-warm-white border border-border text-charcoal text-xs font-bold rounded-xl focus:border-gold focus:outline-none"
                      >
                        <option value="Compact (12x12)">Compact (12 × 12 ft · 144 SFT)</option>
                        <option value="Standard (14x16)">Standard (14 × 16 ft · 224 SFT)</option>
                        <option value="Spacious (16x20)">Spacious (16 × 20 ft · 320 SFT)</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
      <PlannerStepActions onBack={onBack} nextLabel={nextLabel} />
    </form>
  );
}
