"use client";

import React from "react";
import { Check } from "lucide-react";
import { PLANNER_PHASES } from "./plannerPhases";

interface PlannerStepRailProps {
  stepIndex: number;
  totalSteps: number;
}

export default function PlannerStepRail({ stepIndex, totalSteps }: PlannerStepRailProps) {
  const progressPercent = Math.round(((stepIndex + 1) / totalSteps) * 100);

  return (

    <nav aria-label="Planner progress" className="lg:sticky lg:top-28">
      <div className="rounded-3xl border border-border/80 bg-white/70 p-4 shadow-sm backdrop-blur-sm">
        <div className="mb-4 border-b border-border/60 pb-3">
          <span className="block font-heading text-xs font-bold uppercase tracking-wider text-charcoal">
            Your Progress
          </span>
          <span className="mt-0.5 block font-mono text-[10px] text-concrete">
            {progressPercent}% completed
          </span>
        </div>

        <ol className="relative space-y-1">
          {PLANNER_PHASES.map((phase, idx) => {
            const isActive = stepIndex >= phase.stepMin && stepIndex <= phase.stepMax;
            const isPassed = stepIndex > phase.stepMax;
            const isLast = idx === PLANNER_PHASES.length - 1;

            return (
              <li key={phase.label} title={phase.description} className="relative flex gap-2.5">
                {/* Marker + connector */}
                <div className="flex flex-col items-center">
                  <span
                    className={`z-10 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                      isPassed
                        ? "border-gold bg-gold text-charcoal"
                        : isActive
                        ? "border-charcoal bg-charcoal text-white ring-4 ring-charcoal/10"
                        : "border-border bg-white"
                    }`}
                  >
                    {isPassed && <Check size={11} strokeWidth={3} />}
                    {isActive && <span className="h-1.5 w-1.5 rounded-full bg-gold" />}
                  </span>

                  {!isLast && (
                    <span
                      className={`w-px flex-1 transition-colors duration-300 ${
                        isPassed ? "bg-gold/60" : "bg-border"
                      }`}
                    />
                  )}
                </div>

                {/* Label — description lives in the title tooltip; the rail is too narrow for it */}
                <div className={`min-w-0 ${isLast ? "pb-0" : "pb-5"}`}>
                  <span
                    className={`block truncate text-xs font-bold leading-5 transition-colors ${
                      isActive
                        ? "text-charcoal"
                        : isPassed
                        ? "text-gold-dark"
                        : "text-concrete/60"
                    }`}
                  >
                    {phase.label}
                  </span>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
