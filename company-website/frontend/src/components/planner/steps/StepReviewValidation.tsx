"use client";

import React, { useState } from "react";
import { PlannerState, EngineeringValidationWarning, StepId } from "../types";
import { Edit3, FileCheck, AlertTriangle, ArrowRight, User, Loader2, AlertCircle } from "lucide-react";
import { saveProjectPlan, buildPayloadFromPlannerState } from "@/services/projectPlanApi";

interface StepReviewValidationProps {
  state: PlannerState;
  warnings: EngineeringValidationWarning[];
  onNavigateToStep: (stepId: StepId) => void;
  onGenerateReport: (savedRefCode?: string) => void;
  onUpdateSetup?: (updates: Partial<PlannerState["setup"]>) => void;
  onBack?: () => void;
}

export default function StepReviewValidation({
  state,
  warnings,
  onNavigateToStep,
  onGenerateReport,
  onUpdateSetup,
  onBack,
}: StepReviewValidationProps) {
  const plotArea = Math.round(state.plot.length * state.plot.width);
  const footprintArea = Math.round(state.footprint.length * state.footprint.width);

  const [clientName, setClientName] = useState(state.setup.clientName || "");
  const [email, setEmail] = useState(state.setup.email || "");
  const [phone, setPhone] = useState(state.setup.phone || "");

  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{ name?: string; email?: string; phone?: string }>({});

  const validateContact = () => {
    const errors: typeof fieldErrors = {};
    if (!clientName.trim()) errors.name = "Name is required";
    if (!email.trim()) errors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) errors.email = "Enter a valid email address";
    if (!phone.trim()) errors.phone = "Mobile number is required";
    else if (!/^[0-9+\-\s]{7,15}$/.test(phone.trim())) errors.phone = "Enter a valid mobile number";
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSaveAndGenerate = async () => {
    if (!validateContact()) return;

    setIsSaving(true);
    setSaveError(null);

    try {
      const contactInfo = {
        name: clientName.trim(),
        email: email.trim(),
        phone: phone.trim(),
      };

      if (onUpdateSetup) {
        onUpdateSetup({ clientName, email, phone });
      }

      const payload = buildPayloadFromPlannerState(state, contactInfo);
      const saved = await saveProjectPlan(payload);
      onGenerateReport(saved.refCode);
    } catch (err: unknown) {
      console.error("Failed to save project plan:", err);
      // Even if offline/api down, allow viewing report with fallback ref
      const msg = err instanceof Error ? err.message : "Could not connect to backend server. Generating offline report...";
      setSaveError(msg);
      setTimeout(() => {
        onGenerateReport();
      }, 1200);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fadeIn pb-6">
      <div className="space-y-2 text-left">
        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-gold-dark bg-gold/15 px-3 py-1 rounded-full">
          Comprehensive Audit
        </span>
        <h2 className="font-heading font-bold text-2xl md:text-4xl text-charcoal">
          Review Your Home
        </h2>
        <p className="text-concrete text-xs md:text-sm leading-relaxed">
          Verify your project specifications before generating your final Preliminary Residential Building Requirement Report.
        </p>
      </div>

      {/* Project & Site Summary Card */}
      <div className="bg-white p-6 rounded-3xl border border-border/80 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-border/60">
          <div>
            <h3 className="font-heading font-bold text-lg text-charcoal">
              {state.setup.projectName || "My Family Home"}
            </h3>
            <p className="text-xs text-concrete">
              {state.setup.location || "Location not specified"}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigateToStep("setup")}
            className="px-3 py-1 rounded-xl bg-linen text-xs font-bold text-charcoal hover:bg-gold/20 flex items-center gap-1 cursor-pointer"
          >
            <Edit3 size={13} /> Edit Identity
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="bg-warm-white p-3 rounded-2xl border border-border">
            <span className="text-[10px] font-bold uppercase text-concrete block">Plot Area</span>
            <span className="font-mono font-bold text-base text-charcoal">{plotArea.toLocaleString()} SFT</span>
            <span className="text-[10px] text-concrete block">({state.plot.width} × {state.plot.length} {state.plot.unit})</span>
          </div>

          <div className="bg-warm-white p-3 rounded-2xl border border-border">
            <span className="text-[10px] font-bold uppercase text-concrete block">Footprint</span>
            <span className="font-mono font-bold text-base text-gold-dark">{footprintArea.toLocaleString()} SFT</span>
            <span className="text-[10px] text-concrete block">({state.footprint.width} × {state.footprint.length} {state.plot.unit})</span>
          </div>

          <div className="bg-warm-white p-3 rounded-2xl border border-border">
            <span className="text-[10px] font-bold uppercase text-concrete block">Road Facing</span>
            <span className="font-bold text-base text-charcoal">{state.road.roadSide} Side</span>
            <span className="text-[10px] text-concrete block">{state.road.knowRoadWidth === "Yes" ? `${state.road.roadWidth}ft Road` : "Road width TBD"}</span>
          </div>

          <div className="bg-warm-white p-3 rounded-2xl border border-border">
            <span className="text-[10px] font-bold uppercase text-concrete block">Site Elevation</span>
            <span className="font-bold text-base text-charcoal">{state.roadLevel.level}</span>
            <span className="text-[10px] text-concrete block">{state.roadLevel.hasBasement ? "Basement Enabled" : "No Basement"}</span>
          </div>
        </div>
      </div>

      {/* Warnings & Engineering Advisories */}
      {warnings.length > 0 && (
        <div className="bg-amber-50 p-6 rounded-3xl border border-amber-200 space-y-3">
          <div className="flex items-center gap-2 font-bold text-amber-900 text-sm">
            <AlertTriangle size={18} className="text-amber-600" />
            <span>Engineering &amp; Architectural Advisories ({warnings.length})</span>
          </div>
          <div className="space-y-2">
            {warnings.map((w) => (
              <div key={w.id} className="bg-white p-3.5 rounded-2xl border border-amber-200 text-xs space-y-1">
                <strong className="text-charcoal block">{w.title}</strong>
                <p className="text-concrete">{w.message}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Floor by Floor Summary */}
      <div className="space-y-4">
        <h3 className="font-heading font-bold text-xl text-charcoal">
          Floor Breakdown ({state.floors.length} Levels)
        </h3>

        {state.floors.map((fl) => (
          <div key={fl.floorId} className="bg-white p-6 rounded-3xl border border-border/80 shadow-md space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-border/60">
              <div className="flex items-center gap-2">
                <span className="font-heading font-bold text-base text-charcoal">{fl.floorName}</span>
                <span className="text-xs font-mono bg-gold/15 text-gold-dark font-bold px-2.5 py-0.5 rounded-full">
                  {fl.builtUpSft} SFT
                </span>
              </div>
              <button
                type="button"
                onClick={() => onNavigateToStep("floor_planner")}
                className="px-3 py-1 rounded-xl bg-linen text-xs font-bold text-charcoal hover:bg-gold/20 flex items-center gap-1 cursor-pointer"
              >
                <Edit3 size={13} /> Edit Floor
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <strong className="text-concrete uppercase text-[10px] block mb-1">Bedrooms</strong>
                <p className="text-charcoal font-medium">
                  {fl.masterBedroomsCount} Master, {fl.normalBedroomsCount} Standard ({fl.masterBedroomsCount + fl.normalBedroomsCount} Total)
                </p>
              </div>

              <div>
                <strong className="text-concrete uppercase text-[10px] block mb-1">Bathrooms</strong>
                <p className="text-charcoal font-medium">
                  {fl.attachedBathsCount} Attached, {fl.commonBathsCount} Common {fl.hasGuestPowderRoom ? " + Powder Room" : ""}
                </p>
              </div>

              <div>
                <strong className="text-concrete uppercase text-[10px] block mb-1">Kitchen &amp; Dining</strong>
                <p className="text-charcoal font-medium">
                  {fl.hasKitchen ? `${fl.kitchenType} Kitchen (${fl.kitchenLocation})` : "No Kitchen"}
                </p>
              </div>

              {fl.livingSpaces.length > 0 && (
                <div className="sm:col-span-3">
                  <strong className="text-concrete uppercase text-[10px] block mb-1">Living &amp; Social Spaces</strong>
                  <p className="text-charcoal font-medium">{fl.livingSpaces.join(" · ")}</p>
                </div>
              )}

              {fl.otherFeatures.length > 0 && (
                <div className="sm:col-span-3">
                  <strong className="text-concrete uppercase text-[10px] block mb-1">Utilities &amp; Features</strong>
                  <p className="text-charcoal font-medium">{fl.otherFeatures.join(" · ")}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Client Contact Details Section */}
      <div className="bg-warm-white p-6 rounded-3xl border border-border/80 shadow-md space-y-3">
        <div className="flex items-center gap-2 font-bold text-charcoal text-sm">
          <User size={16} className="text-gold-dark" />
          <span>Client Details for Report &amp; Engineering Consultation</span>
        </div>
        <p className="text-xs text-concrete leading-relaxed">
          Name, email, and mobile number are required to attach to this engineering brief and store your project plan.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          <div>
            <input
              type="text"
              required
              value={clientName}
              onChange={(e) => {
                setClientName(e.target.value);
                if (fieldErrors.name) setFieldErrors((prev) => ({ ...prev, name: undefined }));
              }}
              placeholder="Your Name *"
              className={`w-full px-3.5 py-2.5 bg-white border text-charcoal text-xs rounded-xl focus:outline-none ${
                fieldErrors.name ? "border-red-400 focus:border-red-500" : "border-border focus:border-gold"
              }`}
            />
            {fieldErrors.name && <p className="mt-1 text-[10px] text-red-600">{fieldErrors.name}</p>}
          </div>
          <div>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (fieldErrors.email) setFieldErrors((prev) => ({ ...prev, email: undefined }));
              }}
              placeholder="Your Email *"
              className={`w-full px-3.5 py-2.5 bg-white border text-charcoal text-xs rounded-xl focus:outline-none ${
                fieldErrors.email ? "border-red-400 focus:border-red-500" : "border-border focus:border-gold"
              }`}
            />
            {fieldErrors.email && <p className="mt-1 text-[10px] text-red-600">{fieldErrors.email}</p>}
          </div>
          <div>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                if (fieldErrors.phone) setFieldErrors((prev) => ({ ...prev, phone: undefined }));
              }}
              placeholder="Mobile Number *"
              className={`w-full px-3.5 py-2.5 bg-white border text-charcoal text-xs rounded-xl focus:outline-none ${
                fieldErrors.phone ? "border-red-400 focus:border-red-500" : "border-border focus:border-gold"
              }`}
            />
            {fieldErrors.phone && <p className="mt-1 text-[10px] text-red-600">{fieldErrors.phone}</p>}
          </div>
        </div>
      </div>

      {saveError && (
        <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-xs flex items-center gap-2">
          <AlertCircle size={15} className="shrink-0" />
          <span>{saveError}</span>
        </div>
      )}

      {/* Back + Primary CTA */}
      <div className="flex flex-col-reverse items-center gap-4 border-t border-border/60 pt-5 sm:flex-row sm:justify-between">
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
          type="button"
          disabled={isSaving}
          onClick={handleSaveAndGenerate}
          className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-charcoal text-white hover:bg-black font-bold text-base shadow-2xl transition-all flex items-center justify-center gap-3 cursor-pointer group disabled:opacity-75"
        >
          {isSaving ? (
            <>
              <Loader2 size={20} className="text-gold animate-spin" />
              <span>Saving Plan &amp; Generating Brief...</span>
            </>
          ) : (
            <>
              <FileCheck size={20} className="text-gold" />
              <span>Save &amp; Generate Preliminary Building Report</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform text-gold-light" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
