"use client";

import React from "react";
import PlannerStepActions from "../PlannerStepActions";
import { FloorRequirement } from "../types";
import { Bath, Plus, Minus, AlertTriangle } from "lucide-react";

interface StepBathroomsProps {
  floor: FloorRequirement;
  onChange: (floor: Partial<FloorRequirement>) => void;
  onNext: () => void;
  onBack?: () => void;
  nextLabel: string;
}

export default function StepBathrooms({
  floor,
  onChange,
  onNext,
  onBack,
  nextLabel,
}: StepBathroomsProps) {
  const totalBeds = floor.masterBedroomsCount + floor.normalBedroomsCount;
  const totalBaths = floor.attachedBathsCount + floor.commonBathsCount + (floor.hasGuestPowderRoom ? 1 : 0);

  const isHighRatio = totalBaths > totalBeds + 2 && totalBeds > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-6 animate-fadeIn rounded-3xl border border-border/80 bg-white p-6 shadow-xl">
      <div className="space-y-2 text-left">
        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-gold-dark bg-gold/15 px-3 py-1 rounded-full">
          {floor.floorName} · Bathrooms
        </span>
        <h2 className="font-heading font-bold text-2xl md:text-3xl text-charcoal">
          Bathroom Requirements for {floor.floorName}
        </h2>
        <p className="text-concrete text-xs leading-relaxed">
          Specify attached baths, common hall bathrooms, and powder rooms.
        </p>
      </div>

      <div className="space-y-5">
        <span className="text-xs font-bold uppercase tracking-wider text-charcoal flex items-center gap-1.5">
          <Bath size={15} className="text-gold-dark" /> Bathroom Quantities
        </span>

        <div className="space-y-3">
          {/* Attached Bathrooms */}
          <div className="bg-warm-white p-4 rounded-2xl border border-border flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-charcoal block">Attached Bathrooms</span>
              <span className="text-[10px] text-concrete">Ensuite with bedrooms</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onChange({ attachedBathsCount: Math.max(0, floor.attachedBathsCount - 1) })}
                className="w-7 h-7 rounded-lg bg-white border border-border flex items-center justify-center font-bold text-xs hover:bg-gold/20 cursor-pointer"
              >
                <Minus size={12} />
              </button>
              <span className="font-mono font-bold text-sm text-charcoal w-4 text-center">
                {floor.attachedBathsCount}
              </span>
              <button
                type="button"
                onClick={() => onChange({ attachedBathsCount: floor.attachedBathsCount + 1 })}
                className="w-7 h-7 rounded-lg bg-white border border-border flex items-center justify-center font-bold text-xs hover:bg-gold/20 cursor-pointer"
              >
                <Plus size={12} />
              </button>
            </div>
          </div>

          {/* Common Bathrooms */}
          <div className="bg-warm-white p-4 rounded-2xl border border-border flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-charcoal block">Common Bathrooms</span>
              <span className="text-[10px] text-concrete">Shared floor bathroom</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onChange({ commonBathsCount: Math.max(0, floor.commonBathsCount - 1) })}
                className="w-7 h-7 rounded-lg bg-white border border-border flex items-center justify-center font-bold text-xs hover:bg-gold/20 cursor-pointer"
              >
                <Minus size={12} />
              </button>
              <span className="font-mono font-bold text-sm text-charcoal w-4 text-center">
                {floor.commonBathsCount}
              </span>
              <button
                type="button"
                onClick={() => onChange({ commonBathsCount: floor.commonBathsCount + 1 })}
                className="w-7 h-7 rounded-lg bg-white border border-border flex items-center justify-center font-bold text-xs hover:bg-gold/20 cursor-pointer"
              >
                <Plus size={12} />
              </button>
            </div>
          </div>

          {/* Guest Powder Room Toggle */}
          <div className="bg-warm-white p-4 rounded-2xl border border-border flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-charcoal block">Guest Toilet / Powder Room</span>
              <span className="text-[10px] text-concrete">Half bath (WC + Sink only)</span>
            </div>
            <button
              type="button"
              onClick={() => onChange({ hasGuestPowderRoom: !floor.hasGuestPowderRoom })}
              className={`px-4 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                floor.hasGuestPowderRoom
                  ? "bg-gold/20 text-gold-dark border-gold"
                  : "bg-white text-concrete border-border hover:text-charcoal"
              }`}
            >
              {floor.hasGuestPowderRoom ? "Yes" : "No"}
            </button>
          </div>
        </div>

        {/* Gentle Engineering Warning */}
        {isHighRatio && (
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-800 space-y-1 animate-fadeIn">
            <div className="flex items-center gap-1.5 font-bold text-amber-900">
              <AlertTriangle size={15} className="text-amber-600" />
              <span>Plumbing &amp; Space Consideration</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              You currently have <strong>{totalBaths} bathrooms</strong> for <strong>{totalBeds} bedrooms</strong> on this floor. This may be intentional for luxury suite layouts, but it will increase plumbing shaft requirements, waterproofing area, and overall construction costs.
            </p>
          </div>
        )}
      </div>
      <PlannerStepActions onBack={onBack} nextLabel={nextLabel} />
    </form>
  );
}
