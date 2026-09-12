"use client";

import React, { useState } from "react";
import PlannerStepActions from "../PlannerStepActions";
import { FloorRequirement, PlannerState } from "../types";
import { Car, Plus, Minus } from "lucide-react";
import ImageUpload from "@/components/ui/ImageUpload";
import type { Attachment } from "@/lib/attachments";

interface StepOtherRequirementsProps {
  floor: FloorRequirement;
  state: PlannerState;
  onChangeFloor: (floor: Partial<FloorRequirement>) => void;
  onChangeAttachments: (attachments: Attachment[]) => void;
  onNext: () => void;
  onBack?: () => void;
  nextLabel: string;
}

export default function StepOtherRequirements({
  floor,
  state,
  onChangeFloor,
  onChangeAttachments,
  onNext,
  onBack,
  nextLabel,
}: StepOtherRequirementsProps) {
  const [isUploading, setIsUploading] = useState(false);

  const options = [
    { name: "Staircase (Internal)", icon: "🪜" },
    { name: "Staircase (External)", icon: "📐" },
    { name: "Passenger Lift / Elevator", icon: "🛗" },
    { name: "Veranda / Entrance Porch", icon: "🏛️" },
    { name: "Balcony / Open Sitout", icon: "🌅" },
    { name: "Terrace Garden / Pergola", icon: "🌿" },
    { name: "Laundry / Clothes Drying Yard", icon: "🧺" },
    { name: "Servant Room & Bath", icon: "🛌" },
    { name: "Security Guard Room", icon: "👮" },
    { name: "Overhead Water Tank", icon: "💧" },
    { name: "Septic Tank / Soak Pit", icon: "🏗️" },
    { name: "Rainwater Harvesting System", icon: "🌧️" },
    { name: "Solar PV Panel System", icon: "☀️" },
    { name: "Outdoor Summer Kitchen / BBQ", icon: "🔥" },
  ];

  const toggleFeature = (featName: string) => {
    const current = [...floor.otherFeatures];
    const exists = current.includes(featName);
    const updated = exists ? current.filter((f) => f !== featName) : [...current, featName];
    onChangeFloor({ otherFeatures: updated });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isUploading) return;
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-6 animate-fadeIn rounded-3xl border border-border/80 bg-white p-6 shadow-xl">
      <div className="space-y-2 text-left">
        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-gold-dark bg-gold/15 px-3 py-1 rounded-full">
          Utilities, Uploads &amp; Outdoors
        </span>
        <h2 className="font-heading font-bold text-2xl md:text-3xl text-charcoal">
          Parking, Documents &amp; Utility Features
        </h2>
        <p className="text-concrete text-xs leading-relaxed">
          Upload rough site sketches or FMB documents, specify vehicle parking, and select green utility infrastructure.
        </p>
      </div>

      {/* ── SITE SKETCH / DOCUMENT UPLOAD (DETAILED WIZARD) ──────── */}
      <ImageUpload
        value={state.attachments}
        onChange={onChangeAttachments}
        onUploadingChange={setIsUploading}
        formType="Building Planner"
        label="Site Sketches & Document Upload"
        hint="Site sketches, FMB documents, plot photos"
      />


      {/* Parking Steppers */}
      <div className="space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-charcoal flex items-center gap-1.5">
          <Car size={15} className="text-gold-dark" /> Vehicle Parking Requirements
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Car Parking */}
          <div className="bg-warm-white p-4 rounded-2xl border border-border flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-charcoal block">Car Parking Spaces</span>
              <span className="text-[10px] text-concrete">Covered driveway / garage</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onChangeFloor({ parkingCarsCount: Math.max(0, floor.parkingCarsCount - 1) })}
                className="w-7 h-7 rounded-lg bg-white border border-border flex items-center justify-center font-bold text-xs hover:bg-gold/20 cursor-pointer"
              >
                <Minus size={12} />
              </button>
              <span className="font-mono font-bold text-sm text-charcoal w-4 text-center">
                {floor.parkingCarsCount}
              </span>
              <button
                type="button"
                onClick={() => onChangeFloor({ parkingCarsCount: floor.parkingCarsCount + 1 })}
                className="w-7 h-7 rounded-lg bg-white border border-border flex items-center justify-center font-bold text-xs hover:bg-gold/20 cursor-pointer"
              >
                <Plus size={12} />
              </button>
            </div>
          </div>

          {/* Two-Wheeler Parking */}
          <div className="bg-warm-white p-4 rounded-2xl border border-border flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-charcoal block">Two-Wheeler Parking</span>
              <span className="text-[10px] text-concrete">Bikes / Scooters</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onChangeFloor({ parkingTwoWheelersCount: Math.max(0, floor.parkingTwoWheelersCount - 1) })}
                className="w-7 h-7 rounded-lg bg-white border border-border flex items-center justify-center font-bold text-xs hover:bg-gold/20 cursor-pointer"
              >
                <Minus size={12} />
              </button>
              <span className="font-mono font-bold text-sm text-charcoal w-4 text-center">
                {floor.parkingTwoWheelersCount}
              </span>
              <button
                type="button"
                onClick={() => onChangeFloor({ parkingTwoWheelersCount: floor.parkingTwoWheelersCount + 1 })}
                className="w-7 h-7 rounded-lg bg-white border border-border flex items-center justify-center font-bold text-xs hover:bg-gold/20 cursor-pointer"
              >
                <Plus size={12} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Clean Grid of Optional Features */}
      <div className="space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-charcoal block">
          Vertical Circulation &amp; Sustainability Features
        </span>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {options.map((opt) => {
            const active = floor.otherFeatures.includes(opt.name);
            return (
              <button
                key={opt.name}
                type="button"
                onClick={() => toggleFeature(opt.name)}
                className={`p-3 rounded-2xl border text-left font-bold text-xs transition-all cursor-pointer flex items-center gap-2 ${
                  active
                    ? "bg-gold/20 text-gold-dark border-gold shadow-sm"
                    : "bg-warm-white text-concrete border-border hover:text-charcoal hover:border-gold"
                }`}
              >
                <span className="text-base">{opt.icon}</span>
                <span className="text-[11px] leading-snug">{opt.name}</span>
              </button>
            );
          })}
        </div>
      </div>
      <PlannerStepActions onBack={onBack} nextLabel={nextLabel} />
    </form>
  );
}
