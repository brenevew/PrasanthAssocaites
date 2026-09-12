"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

interface PlannerStepActionsProps {
  onBack?: () => void;
  nextLabel: string;
  // When the step's own <form> handles validation, this button should just be a
  // native submit so the form's onSubmit (and its required/min/max checks) runs.
  // Steps without a form (e.g. the floor-planner hub) pass onNext + submit={false}.
  submit?: boolean;
  onNext?: () => void;
}

export default function PlannerStepActions({
  onBack,
  nextLabel,
  submit = true,
  onNext,
}: PlannerStepActionsProps) {
  return (
    <div className="flex items-center justify-between gap-3 border-t border-border/60 pt-5">
      {onBack ? (
        <button
          type="button"
          onClick={onBack}
          className="cursor-pointer rounded-2xl border border-border bg-white px-5 py-3 text-xs font-bold text-charcoal transition-all hover:bg-gold/15"
        >
          Back
        </button>
      ) : (
        <div />
      )}

      <button
        type={submit ? "submit" : "button"}
        onClick={submit ? undefined : onNext}
        className="group flex cursor-pointer items-center gap-2 rounded-2xl bg-charcoal px-8 py-3.5 text-xs font-bold text-white shadow-xl transition-all hover:bg-black"
      >
        <span>{nextLabel}</span>
        <ArrowRight size={14} className="text-gold transition-transform group-hover:translate-x-1" />
      </button>
    </div>
  );
}
