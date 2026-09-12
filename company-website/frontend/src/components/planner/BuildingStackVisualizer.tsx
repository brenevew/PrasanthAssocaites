"use client";

import React from "react";
import { FloorRequirement } from "./types";
import { Plus, Trash2, CheckCircle2, Circle, Layers } from "lucide-react";

interface BuildingStackVisualizerProps {
  floors: FloorRequirement[];
  activeFloorId?: string;
  hasBasement?: boolean;
  onSelectFloor?: (floorId: string) => void;
  onAddFloor?: () => void;
  onRemoveFloor?: (floorId: string) => void;
  onRenameFloor?: (floorId: string, newName: string) => void;
}

export default function BuildingStackVisualizer({
  floors,
  activeFloorId,
  hasBasement = false,
  onSelectFloor,
  onAddFloor,
  onRemoveFloor,
  onRenameFloor,
}: BuildingStackVisualizerProps) {
  // Order floors from highest (3rd Floor) down to Basement
  const sortedFloors = [...floors].reverse();

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-charcoal/80">
          <Layers size={15} className="text-gold-dark" />
          <span>Building Level Stack ({floors.length} Levels)</span>
        </div>
        {onAddFloor && (
          <button
            type="button"
            onClick={onAddFloor}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-gold/15 text-gold-dark hover:bg-gold hover:text-charcoal text-xs font-bold transition-all cursor-pointer shadow-sm"
          >
            <Plus size={13} />
            <span>Add Floor</span>
          </button>
        )}
      </div>

      <div className="space-y-2.5">
        {sortedFloors.map((fl) => {
          const isActive = fl.floorId === activeFloorId;
          const isBasement = fl.floorId === "basement";

          return (
            <div
              key={fl.floorId}
              onClick={() => onSelectFloor?.(fl.floorId)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer relative overflow-hidden group ${
                isActive
                  ? "bg-charcoal text-white border-gold shadow-xl ring-2 ring-gold/40 scale-[1.01]"
                  : fl.isConfigured
                  ? "bg-white border-gold/40 text-charcoal hover:border-gold hover:shadow-md"
                  : "bg-warm-white/90 border-border text-charcoal/80 hover:border-charcoal/40"
              }`}
            >
              {/* Accent Left Bar */}
              <div
                className={`absolute left-0 top-0 bottom-0 w-1.5 ${
                  isActive
                    ? "bg-gold"
                    : fl.isConfigured
                    ? "bg-emerald-500"
                    : "bg-concrete/40"
                }`}
              />

              <div className="flex items-center justify-between pl-2">
                <div className="flex items-center gap-3">
                  {/* Status icon */}
                  {fl.isConfigured ? (
                    <CheckCircle2
                      size={18}
                      className={isActive ? "text-gold" : "text-emerald-600"}
                    />
                  ) : (
                    <Circle
                      size={18}
                      className={isActive ? "text-white/40" : "text-concrete"}
                    />
                  )}

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-heading font-bold text-sm">
                        {fl.floorName}
                      </span>
                      {fl.technicalName !== fl.floorName && (
                        <span
                          className={`text-[9px] font-mono uppercase px-1.5 py-0.5 rounded ${
                            isActive
                              ? "bg-white/10 text-white/70"
                              : "bg-linen text-concrete"
                          }`}
                        >
                          {fl.technicalName}
                        </span>
                      )}
                    </div>

                    <p
                      className={`text-[11px] mt-0.5 ${
                        isActive ? "text-white/70" : "text-concrete"
                      }`}
                    >
                      {fl.isConfigured ? (
                        <span>
                          {fl.builtUpSft} SFT · {fl.masterBedroomsCount + fl.normalBedroomsCount} Beds · {fl.attachedBathsCount + fl.commonBathsCount} Baths
                          {fl.hasKitchen ? " · Kitchen" : ""}
                        </span>
                      ) : (
                        <span>Not configured yet</span>
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                      fl.isConfigured
                        ? isActive
                          ? "bg-gold/20 text-gold-light border border-gold/40"
                          : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : isActive
                        ? "bg-white/10 text-white/60"
                        : "bg-linen text-concrete"
                    }`}
                  >
                    {fl.isConfigured ? "Complete" : "Needs Config"}
                  </span>

                  {/* Remove control (only if not Ground Floor and more than 1 floor) */}
                  {onRemoveFloor && floors.length > 1 && !isBasement && fl.floorId !== "ground" && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemoveFloor(fl.floorId);
                      }}
                      title="Remove Floor"
                      className={`p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity ${
                        isActive
                          ? "hover:bg-white/15 text-white/60 hover:text-white"
                          : "hover:bg-red-50 text-concrete hover:text-red-600"
                      }`}
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
