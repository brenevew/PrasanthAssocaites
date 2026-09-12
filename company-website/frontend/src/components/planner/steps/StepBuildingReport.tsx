"use client";

import React from "react";
import { PlannerState } from "../types";
import {
  Printer,
  FileCheck2,
  AlertOctagon,
  CheckCircle2,
  ArrowLeft,
  MessageCircle,
} from "lucide-react";

interface StepBuildingReportProps {
  state: PlannerState;
  onEdit: () => void;
}

export default function StepBuildingReport({
  state,
  onEdit,
}: StepBuildingReportProps) {
  const plotArea = Math.round(state.plot.length * state.plot.width);
  const footprintArea = Math.round(state.footprint.length * state.footprint.width);
  const totalBuiltUp = state.floors.reduce((sum, fl) => sum + (fl.builtUpSft || footprintArea), 0);

  const totalBeds = state.floors.reduce((sum, fl) => sum + fl.masterBedroomsCount + fl.normalBedroomsCount, 0);
  const totalBaths = state.floors.reduce((sum, fl) => sum + fl.attachedBathsCount + fl.commonBathsCount + (fl.hasGuestPowderRoom ? 1 : 0), 0);
  const totalKitchens = state.floors.reduce((sum, fl) => sum + (fl.hasKitchen ? 1 : 0), 0);
  const totalCars = state.floors.reduce((sum, fl) => sum + fl.parkingCarsCount, 0);

  const handlePrint = () => {
    window.print();
  };

  const refCode = state.savedRefCode || state.setup.projectName.toUpperCase().replace(/\s+/g, "_") || "RESIDENTIAL_PROJECT";

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn pb-16">
      {/* Top Action Toolbar (Hidden during print) */}
      <div className="flex flex-wrap items-center justify-between gap-3 print:hidden">
        <button
          type="button"
          onClick={onEdit}
          className="px-4 py-2 rounded-xl bg-linen hover:bg-warm-white border border-border text-charcoal font-bold text-xs flex items-center gap-1.5 cursor-pointer"
        >
          <ArrowLeft size={14} /> Back to Planner
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              const msg = `*Preliminary Building Requirement Brief [Ref: ${refCode}]*\n\n*Project:* ${state.setup.projectName || "Residential Project"}\n*Location:* ${state.setup.location || "Not specified"}\n*Plot Area:* ${plotArea.toLocaleString("en-IN")} SFT\n*Built-up Area:* ${totalBuiltUp.toLocaleString("en-IN")} SFT\n*Floors:* ${state.floors.length} Levels\n*Bedrooms:* ${totalBeds} | *Baths:* ${totalBaths}\n\nI would like to review this architectural brief with Prasanth Associates team.`;
              const url = `https://wa.me/919486038761?text=${encodeURIComponent(msg)}`;
              window.open(url, "_blank", "noopener,noreferrer");
            }}
            className="px-4 py-2.5 rounded-xl bg-[#25D366] text-white hover:bg-[#20ba59] font-bold text-xs flex items-center gap-1.5 shadow-md cursor-pointer"
          >
            <MessageCircle size={15} /> Discuss on WhatsApp
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="px-5 py-2.5 rounded-xl bg-charcoal text-white hover:bg-black font-bold text-xs flex items-center gap-2 shadow-lg cursor-pointer"
          >
            <Printer size={15} className="text-gold" /> Print Report / Save PDF
          </button>
        </div>
      </div>

      {/* ── DOCUMENT SHEET ────────────────────────────────────────────── */}
      <div className="bg-white p-8 md:p-14 rounded-3xl border border-border/80 shadow-2xl space-y-10 font-sans print:shadow-none print:border-none print:p-0">

        {/* Document Header */}
        <div className="border-b-2 border-charcoal pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-widest text-gold-dark bg-gold/15 px-3 py-1 rounded-full mb-3">
              <FileCheck2 size={13} /> Engineering Architectural Brief
            </div>
            <h1 className="font-heading font-bold text-2xl md:text-4xl text-charcoal leading-tight">
              Preliminary Residential Building Requirement Report
            </h1>
            <p className="text-concrete text-xs md:text-sm mt-1">
              Structured Requirement Brief for Architectural Design &amp; Municipal Feasibility
            </p>
          </div>

          <div className="text-left md:text-right font-mono text-xs text-concrete space-y-0.5">
            <div>Project Ref: <strong className="text-charcoal font-bold">{refCode}</strong></div>
            <div>Date: <strong className="text-charcoal font-bold">{new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</strong></div>
            <div>Status: <strong className="text-emerald-700 font-bold">Validated &amp; Saved</strong></div>
          </div>
        </div>

        {/* 1. Project Overview */}
        <section className="space-y-3">
          <h2 className="font-heading font-bold text-lg text-charcoal border-b border-border/60 pb-1 flex items-center gap-2">
            <span className="text-gold-dark font-mono text-sm">01.</span> Project Overview
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-warm-white/80 p-5 rounded-2xl border border-border">
            <div>
              <span className="text-[10px] font-bold uppercase text-concrete block">Project Name</span>
              <span className="font-bold text-charcoal text-sm">{state.setup.projectName || "My Family Home"}</span>
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase text-concrete block">Location / Site</span>
              <span className="font-bold text-charcoal text-sm">{state.setup.location || "Location TBD"}</span>
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase text-concrete block">Total Proposed Built-up</span>
              <span className="font-bold font-mono text-gold-dark text-base">{totalBuiltUp.toLocaleString()} SFT</span>
            </div>
            {state.setup.notes && (
              <div className="sm:col-span-3 pt-2 border-t border-border/40 text-xs text-concrete">
                <strong>Owner Objectives:</strong> {state.setup.notes}
              </div>
            )}
          </div>
        </section>

        {/* 2. Plot Details */}
        <section className="space-y-3">
          <h2 className="font-heading font-bold text-lg text-charcoal border-b border-border/60 pb-1 flex items-center gap-2">
            <span className="text-gold-dark font-mono text-sm">02.</span> Plot Details
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div className="bg-linen/50 p-3.5 rounded-xl border border-border">
              <span className="text-[9px] font-bold uppercase text-concrete block">Length</span>
              <span className="font-mono font-bold text-sm">{state.plot.length} {state.plot.unit}</span>
            </div>
            <div className="bg-linen/50 p-3.5 rounded-xl border border-border">
              <span className="text-[9px] font-bold uppercase text-concrete block">Width</span>
              <span className="font-mono font-bold text-sm">{state.plot.width} {state.plot.unit}</span>
            </div>
            <div className="bg-linen/50 p-3.5 rounded-xl border border-border col-span-2">
              <span className="text-[9px] font-bold uppercase text-concrete block">Total Calculated Plot Area</span>
              <span className="font-mono font-bold text-base text-gold-dark">{plotArea.toLocaleString()} SFT</span>
            </div>
          </div>
        </section>

        {/* 3. Proposed Building Footprint */}
        <section className="space-y-3">
          <h2 className="font-heading font-bold text-lg text-charcoal border-b border-border/60 pb-1 flex items-center gap-2">
            <span className="text-gold-dark font-mono text-sm">03.</span> Proposed Building Footprint
          </h2>
          <div className="bg-warm-white p-4 rounded-2xl border border-border text-xs space-y-2">
            <div className="flex justify-between items-center">
              <span>Ground Building Footprint Dimensions: <strong>{state.footprint.width} × {state.footprint.length} {state.plot.unit}</strong></span>
              <span className="font-mono font-bold text-gold-dark text-sm">{footprintArea.toLocaleString()} SFT</span>
            </div>
            <div className="w-full bg-border/60 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gold-dark h-full rounded-full"
                style={{ width: `${Math.min(100, Math.round((footprintArea / plotArea) * 100))}%` }}
              />
            </div>
            <span className="text-[10px] text-concrete block">
              Building Ground Coverage Ratio: {Math.round((footprintArea / plotArea) * 100)}% of Total Plot Area.
            </span>
          </div>
        </section>

        {/* 4. Road & Level Information */}
        <section className="space-y-3">
          <h2 className="font-heading font-bold text-lg text-charcoal border-b border-border/60 pb-1 flex items-center gap-2">
            <span className="text-gold-dark font-mono text-sm">04.</span> Road &amp; Level Information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 bg-linen/50 rounded-xl border border-border">
              <span className="text-[9px] uppercase font-bold text-concrete block">Road Facing Orientation</span>
              <span className="font-bold text-charcoal">{state.road.roadSide} Facing</span>
            </div>
            <div className="p-3 bg-linen/50 rounded-xl border border-border">
              <span className="text-[9px] uppercase font-bold text-concrete block">Road Width</span>
              <span className="font-bold text-charcoal">{state.road.knowRoadWidth === "Yes" ? `${state.road.roadWidth} ft` : "Width Unspecified"}</span>
            </div>
            <div className="p-3 bg-linen/50 rounded-xl border border-border">
              <span className="text-[9px] uppercase font-bold text-concrete block">Plot Elevation vs Road</span>
              <span className="font-bold text-charcoal">{state.roadLevel.level}</span>
            </div>
          </div>
        </section>

        {/* 5. Floor Configuration */}
        <section className="space-y-3">
          <h2 className="font-heading font-bold text-lg text-charcoal border-b border-border/60 pb-1 flex items-center gap-2">
            <span className="text-gold-dark font-mono text-sm">05.</span> Floor Configuration
          </h2>
          <p className="text-xs text-concrete">
            Configured Building Structure: <strong>{state.floors.length} Levels</strong> ({state.roadLevel.hasBasement ? "Basement + " : ""}{state.floors.map(f => f.floorName).join(" + ")})
          </p>
        </section>

        {/* 6. Floor-by-Floor Requirements */}
        <section className="space-y-3">
          <h2 className="font-heading font-bold text-lg text-charcoal border-b border-border/60 pb-1 flex items-center gap-2">
            <span className="text-gold-dark font-mono text-sm">06.</span> Floor-by-Floor Requirements
          </h2>
          <div className="space-y-3">
            {state.floors.map((fl) => (
              <div key={fl.floorId} className="p-4 bg-warm-white rounded-2xl border border-border text-xs space-y-2">
                <div className="flex justify-between items-center font-bold text-charcoal border-b border-border/50 pb-2">
                  <span className="font-heading text-sm">{fl.floorName} ({fl.technicalName})</span>
                  <span className="font-mono text-gold-dark">{fl.builtUpSft} SFT</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
                  <div>Bedrooms: <strong>{fl.masterBedroomsCount + fl.normalBedroomsCount}</strong> ({fl.masterBedroomsCount} Master)</div>
                  <div>Bathrooms: <strong>{fl.attachedBathsCount + fl.commonBathsCount + (fl.hasGuestPowderRoom ? 1 : 0)}</strong></div>
                  <div>Kitchen: <strong>{fl.hasKitchen ? fl.kitchenType : "None"}</strong></div>
                  <div>Parking: <strong>{fl.parkingCarsCount} Cars</strong></div>
                </div>
                {fl.livingSpaces.length > 0 && (
                  <div className="text-[11px] text-concrete">
                    Spaces: <span className="text-charcoal font-medium">{fl.livingSpaces.join(", ")}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* 7. Approximate Space Allocation */}
        <section className="space-y-3">
          <h2 className="font-heading font-bold text-lg text-charcoal border-b border-border/60 pb-1 flex items-center gap-2">
            <span className="text-gold-dark font-mono text-sm">07.</span> Approximate Space Allocation
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
            <div className="p-3 bg-linen/60 rounded-xl border border-border">
              <span className="font-mono font-bold text-lg text-charcoal block">{totalBeds}</span>
              <span className="text-[10px] uppercase font-bold text-concrete">Total Bedrooms</span>
            </div>
            <div className="p-3 bg-linen/60 rounded-xl border border-border">
              <span className="font-mono font-bold text-lg text-charcoal block">{totalBaths}</span>
              <span className="text-[10px] uppercase font-bold text-concrete">Total Bathrooms</span>
            </div>
            <div className="p-3 bg-linen/60 rounded-xl border border-border">
              <span className="font-mono font-bold text-lg text-charcoal block">{totalKitchens}</span>
              <span className="text-[10px] uppercase font-bold text-concrete">Total Kitchens</span>
            </div>
            <div className="p-3 bg-linen/60 rounded-xl border border-border">
              <span className="font-mono font-bold text-lg text-charcoal block">{totalCars}</span>
              <span className="text-[10px] uppercase font-bold text-concrete">Car Parking</span>
            </div>
          </div>
        </section>

        {/* 8. Recommended Room Relationships */}
        <section className="space-y-2 text-xs leading-relaxed text-concrete">
          <h2 className="font-heading font-bold text-lg text-charcoal border-b border-border/60 pb-1 flex items-center gap-2">
            <span className="text-gold-dark font-mono text-sm">08.</span> Recommended Room Relationships
          </h2>
          <p>
            • Primary living room should be directly accessible from the main entrance foyer.<br />
            • Dining space should share a service wall with the kitchen or utility pantry.<br />
            • Master bedrooms should be situated in quiet zones away from high-traffic entrance corridors.
          </p>
        </section>

        {/* 9. Staircase & Vertical Circulation */}
        <section className="space-y-2 text-xs leading-relaxed text-concrete">
          <h2 className="font-heading font-bold text-lg text-charcoal border-b border-border/60 pb-1 flex items-center gap-2">
            <span className="text-gold-dark font-mono text-sm">09.</span> Staircase &amp; Vertical Circulation
          </h2>
          <p>
            • Vertical circulation connects {state.floors.length} levels. Internal staircases should maintain standard riser/tread geometry (6&quot; riser / 10.5&quot; tread).<br />
            • If passenger elevator is provisioned, ensure structural shear walls around the lift shaft.
          </p>
        </section>

        {/* 10. Plumbing & Drainage Considerations */}
        <section className="space-y-2 text-xs leading-relaxed text-concrete">
          <h2 className="font-heading font-bold text-lg text-charcoal border-b border-border/60 pb-1 flex items-center gap-2">
            <span className="text-gold-dark font-mono text-sm">10.</span> Plumbing &amp; Drainage Considerations
          </h2>
          <p>
            • Bathrooms across upper floors should be vertically stacked to optimize plumbing duct alignments.<br />
            • Wastewater drainage lines should route towards the {state.road.roadSide} facing road setback for municipal sewer connectivity.
          </p>
        </section>

        {/* 11. Ventilation & Natural Lighting */}
        <section className="space-y-2 text-xs leading-relaxed text-concrete">
          <h2 className="font-heading font-bold text-lg text-charcoal border-b border-border/60 pb-1 flex items-center gap-2">
            <span className="text-gold-dark font-mono text-sm">11.</span> Ventilation &amp; Natural Lighting
          </h2>
          <p>
            • Windows on {state.road.roadSide} facade should maximize daylighting.<br />
            • Cross-ventilation corridors recommended between living space windows and rear open courtyards.
          </p>
        </section>

        {/* 12. Parking */}
        <section className="space-y-2 text-xs leading-relaxed text-concrete">
          <h2 className="font-heading font-bold text-lg text-charcoal border-b border-border/60 pb-1 flex items-center gap-2">
            <span className="text-gold-dark font-mono text-sm">12.</span> Parking
          </h2>
          <p>
            • Provisioned for <strong>{totalCars} Covered Car Parking Spaces</strong>. Ensure clear turning radius of at least 16.5 ft in driveway.
          </p>
        </section>

        {/* 13. Structural Considerations */}
        <section className="space-y-2 text-xs leading-relaxed text-concrete">
          <h2 className="font-heading font-bold text-lg text-charcoal border-b border-border/60 pb-1 flex items-center gap-2">
            <span className="text-gold-dark font-mono text-sm">13.</span> Structural Considerations
          </h2>
          <p>
            • Framed R.C.C. structure with isolated footings recommended based on preliminary floor count.<br />
            • High-load areas (water tanks, lift motor rooms) require localized structural beam reinforcement.
          </p>
        </section>

        {/* 14. Potential Planning Issues */}
        <section className="space-y-2 text-xs leading-relaxed text-concrete">
          <h2 className="font-heading font-bold text-lg text-charcoal border-b border-border/60 pb-1 flex items-center gap-2">
            <span className="text-gold-dark font-mono text-sm">14.</span> Potential Planning Issues
          </h2>
          <p>
            • Local municipal setbacks must be verified against current road widening plans.<br />
            {state.roadLevel.level === "Below Road Level" && "• Below-road plot level requires specialized sump pump drainage to prevent monsoon water ingress."}
          </p>
        </section>

        {/* 15. Recommended Improvements */}
        <section className="space-y-2 text-xs leading-relaxed text-concrete">
          <h2 className="font-heading font-bold text-lg text-charcoal border-b border-border/60 pb-1 flex items-center gap-2">
            <span className="text-gold-dark font-mono text-sm">15.</span> Recommended Improvements
          </h2>
          <p>
            • Consider integrating rooftop solar PV panel infrastructure.<br />
            • Incorporate rainwater harvesting recharge pit in front setback area.
          </p>
        </section>

        {/* 16. Final Approved Requirements */}
        <section className="space-y-3 bg-linen/70 p-5 rounded-2xl border border-gold/40 text-xs">
          <h2 className="font-heading font-bold text-sm text-gold-dark flex items-center gap-2">
            <CheckCircle2 size={16} /> 16. Final Approved Requirements Summary
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-medium text-charcoal">
            <div>Plot Area: <strong>{plotArea.toLocaleString()} SFT</strong></div>
            <div>Built-up: <strong>{totalBuiltUp.toLocaleString()} SFT</strong></div>
            <div>Levels: <strong>{state.floors.length} Floors</strong></div>
            <div>Rooms: <strong>{totalBeds} Beds / {totalBaths} Baths</strong></div>
          </div>
        </section>

        {/* Mandatory Civil Disclaimer */}
        <div className="p-5 rounded-2xl bg-warm-white border border-border/80 text-[11px] text-concrete space-y-1.5 leading-relaxed">
          <div className="flex items-center gap-2 font-bold text-charcoal uppercase tracking-wider text-[10px]">
            <AlertOctagon size={14} className="text-gold-dark" /> Professional Review Required Disclaimer
          </div>
          <p>
            This report is a preliminary planning document based on the information provided. It is not a structural design, architectural approval drawing, or construction drawing. Final design, structural calculations, setbacks, building regulations, soil investigation, and statutory approvals must be verified by qualified professionals and the relevant local authorities.
          </p>
        </div>

      </div>
    </div>
  );
}
