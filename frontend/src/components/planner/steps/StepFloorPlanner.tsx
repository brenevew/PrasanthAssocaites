"use client";

import React from "react";
import { FloorRequirement } from "../types";
import { CheckCircle2, Circle, ArrowRight, Edit3 } from "lucide-react";
import PlannerStepActions from "../PlannerStepActions";

interface StepFloorPlannerProps {
  floors: FloorRequirement[];
  onSelectFloorToConfigure: (floorId: string) => void;
  onNext: () => void;
  onBack?: () => void;
  nextLabel: string;
}

export default function StepFloorPlanner({
  floors,
  onSelectFloorToConfigure,
  onNext,
  onBack,
  nextLabel,
}: StepFloorPlannerProps) {
  const allConfigured = floors.every((f) => f.isConfigured);

  return (
    <div className="max-w-xl mx-auto space-y-6 animate-fadeIn rounded-3xl border border-border/80 bg-white p-6 shadow-xl">
      <div className="space-y-2 text-left">
        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-gold-dark bg-gold/15 px-3 py-1 rounded-full">
          Floor-by-Floor Planner
        </span>
        <h2 className="font-heading font-bold text-2xl md:text-3xl text-charcoal">
          Your Floors
        </h2>
        <p className="text-concrete text-xs leading-relaxed">
          Configure rooms, bathrooms, kitchens, and living spaces for each floor individually.
        </p>
      </div>

      <div className="space-y-3">
        {floors.map((fl) => {
          const totalBeds = fl.masterBedroomsCount + fl.normalBedroomsCount;
          const totalBaths = fl.attachedBathsCount + fl.commonBathsCount + (fl.hasGuestPowderRoom ? 1 : 0);

          return (
            <div
              key={fl.floorId}
              className={`p-6 rounded-3xl border transition-all space-y-4 ${
                fl.isConfigured
                  ? "bg-white border-gold/50 shadow-md"
                  : "bg-warm-white/90 border-border shadow-sm"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {fl.isConfigured ? (
                    <CheckCircle2 size={22} className="text-emerald-600" />
                  ) : (
                    <Circle size={22} className="text-concrete" />
                  )}
                  <div>
                    <h3 className="font-heading font-bold text-lg text-charcoal">
                      {fl.floorName}
                    </h3>
                    <p className="text-xs text-concrete">
                      Built-up Area: <strong className="font-mono text-charcoal font-bold">{fl.builtUpSft} SFT</strong>
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onSelectFloorToConfigure(fl.floorId)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    fl.isConfigured
                      ? "bg-linen text-charcoal hover:bg-gold/20 border border-border"
                      : "bg-charcoal text-white hover:bg-black shadow-md"
                  }`}
                >
                  {fl.isConfigured ? (
                    <>
                      <Edit3 size={13} /> Edit Floor
                    </>
                  ) : (
                    <>
                      Configure Floor <ArrowRight size={13} />
                    </>
                  )}
                </button>
              </div>

              {/* Summary bullets when configured */}
              {fl.isConfigured ? (
                <div className="pt-3 border-t border-border/60 grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-charcoal/80">
                  <div className="bg-linen/60 px-3 py-1.5 rounded-xl font-medium">
                    🛏️ {totalBeds} Bedrooms
                  </div>
                  <div className="bg-linen/60 px-3 py-1.5 rounded-xl font-medium">
                    🚿 {totalBaths} Bathrooms
                  </div>
                  <div className="bg-linen/60 px-3 py-1.5 rounded-xl font-medium">
                    🍳 {fl.hasKitchen ? `${fl.kitchenType} Kitchen` : "No Kitchen"}
                  </div>
                  {fl.livingSpaces.length > 0 && (
                    <div className="col-span-2 bg-linen/60 px-3 py-1.5 rounded-xl font-medium">
                      🛋️ {fl.livingSpaces.join(", ")}
                    </div>
                  )}
                </div>
              ) : (
                <div className="pt-2 border-t border-border/40 text-xs text-concrete italic">
                  Not configured yet. Click &quot;Configure Floor&quot; to specify rooms &amp; layout.
                </div>
              )}
            </div>
          );
        })}
      </div>

      {allConfigured && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
          <CheckCircle2 size={16} className="text-emerald-600" />
          <span>All floor levels have been configured! Click Continue to proceed to utility &amp; outdoor options.</span>
        </div>
      )}

      <PlannerStepActions onBack={onBack} nextLabel={nextLabel} submit={false} onNext={onNext} />
    </div>
  );
}
