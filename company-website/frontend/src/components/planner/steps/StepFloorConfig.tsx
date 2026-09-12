"use client";

import React from "react";
import PlannerStepActions from "../PlannerStepActions";
import { FloorRequirement, RoadLevelData } from "../types";
import BuildingStackVisualizer from "../BuildingStackVisualizer";

interface StepFloorConfigProps {
  floors: FloorRequirement[];
  roadLevel: RoadLevelData;
  onAddFloor: () => void;
  onRemoveFloor: (floorId: string) => void;
  onRenameFloor: (floorId: string, newName: string) => void;
  onNext: () => void;
  onBack?: () => void;
  nextLabel: string;
}

export default function StepFloorConfig({
  floors,
  roadLevel,
  onAddFloor,
  onRemoveFloor,
  onRenameFloor,
  onNext,
  onBack,
  nextLabel,
}: StepFloorConfigProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-6 animate-fadeIn rounded-3xl border border-border/80 bg-white p-6 shadow-xl">
      <div className="space-y-2 text-left">
        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-gold-dark bg-gold/15 px-3 py-1 rounded-full">
          Building Levels
        </span>
        <h2 className="font-heading font-bold text-2xl md:text-3xl text-charcoal">
          How many levels do you want?
        </h2>
        <p className="text-concrete text-xs leading-relaxed">
          Configure vertical floor levels for your home. You can add upper floors or assign custom names to each level.
        </p>
      </div>

      {/* Interactive Vertical Building Stack Visualizer */}
      <div className="">
        <BuildingStackVisualizer
          floors={floors}
          hasBasement={roadLevel.hasBasement}
          onAddFloor={onAddFloor}
          onRemoveFloor={onRemoveFloor}
          onRenameFloor={onRenameFloor}
        />
      </div>
      <PlannerStepActions onBack={onBack} nextLabel={nextLabel} />
    </form>
  );
}
