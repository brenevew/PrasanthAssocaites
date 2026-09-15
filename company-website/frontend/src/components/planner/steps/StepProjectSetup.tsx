"use client";

import React from "react";
import PlannerStepActions from "../PlannerStepActions";
import { ProjectSetupData } from "../types";
import { FolderPlus, MapPin, FileText, Home, Building2, ChevronDown } from "lucide-react";

interface StepProjectSetupProps {
  data: ProjectSetupData;
  onChange: (data: Partial<ProjectSetupData>) => void;
  onNext: () => void;
  onBack?: () => void;
  nextLabel: string;
}

const COMMERCIAL_TYPES = [
  "Shop / Retail", "Office Building", "Restaurant / Café", "Hotel / Resort",
  "School / Educational", "Hospital / Clinic", "Warehouse / Factory", "Showroom"
];

const CATEGORIES = [
  { value: "Residential" as const, icon: Home, title: "Residential", subtitle: "House / Villa" },
  { value: "Commercial" as const, icon: Building2, title: "Commercial", subtitle: "Building / Retail" },
];

const labelClass =
  "mb-2 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-charcoal/80";

const inputClass =
  "w-full rounded-xl border border-border bg-warm-white/80 px-4 py-3.5 text-sm font-medium text-charcoal transition-all placeholder:text-concrete/60 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold";

export default function StepProjectSetup({
  data,
  onChange,
  onNext,
  onBack,
  nextLabel,
}: StepProjectSetupProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  const isCommercial = data.projectType === "Commercial";

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-3xl animate-fadeIn space-y-6 rounded-3xl border border-border/80 bg-white p-6 shadow-xl"
    >
      {/* Step Heading */}
      <div className="space-y-2 text-left">
        <span className="inline-block rounded-full bg-gold/15 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-gold-dark">
          Project Category &amp; Identity
        </span>
        <h2 className="font-heading text-2xl font-bold text-charcoal md:text-3xl">
          Select property type &amp; project name
        </h2>
        <p className="text-xs leading-relaxed text-concrete">
          Choose whether this is a Residential House or Commercial Building, and give your project a reference name.
        </p>
      </div>

      {/* Input Card */}
      <div className="space-y-6">

        {/* Building Category — balanced 50/50 toggle */}
        <div>
          <span className={labelClass}>Building Category *</span>
          <div className="grid grid-cols-2 gap-3">
            {CATEGORIES.map(({ value, icon: Icon, title, subtitle }) => {
              const isSelected = value === "Commercial" ? isCommercial : !isCommercial;

              return (
                <button
                  key={value}
                  type="button"
                  onClick={() =>
                    onChange(
                      value === "Commercial"
                        ? {
                            projectType: "Commercial",
                            commercialType: data.commercialType || "Shop / Retail",
                          }
                        : { projectType: "Residential" }
                    )
                  }
                  className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 px-4 py-5 text-center transition-all duration-200 ${
                    isSelected
                      ? "border-gold bg-charcoal shadow-lg"
                      : "border-border bg-warm-white/60 hover:border-charcoal/30 hover:bg-warm-white"
                  }`}
                >
                  <span
                    className={`flex h-11 w-11 items-center justify-center rounded-xl transition-colors ${
                      isSelected ? "bg-gold/20 text-gold" : "bg-linen text-concrete"
                    }`}
                  >
                    <Icon size={20} />
                  </span>
                  <span className="flex flex-col gap-0.5">
                    <span
                      className={`font-heading text-sm font-bold ${
                        isSelected ? "text-white" : "text-charcoal"
                      }`}
                    >
                      {title}
                    </span>
                    <span
                      className={`text-[10px] font-medium ${
                        isSelected ? "text-white/60" : "text-concrete"
                      }`}
                    >
                      {subtitle}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Commercial Building Type */}
        {isCommercial && (
          <div className="animate-fadeIn">
            <label htmlFor="commercial-type" className={labelClass}>
              <Building2 size={13} className="text-gold-dark" />
              Commercial Type *
            </label>
            <div className="relative">
              <select
                id="commercial-type"
                value={data.commercialType || "Shop / Retail"}
                onChange={(e) => onChange({ commercialType: e.target.value })}
                className={`${inputClass} cursor-pointer appearance-none pr-10 font-bold`}
              >
                {COMMERCIAL_TYPES.map((ct) => (
                  <option key={ct} value={ct}>{ct}</option>
                ))}
              </select>
              <ChevronDown
                size={16}
                className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-concrete"
              />
            </div>
          </div>
        )}

        {/* Project Name */}
        <div>
          <label htmlFor="project-name" className={labelClass}>
            <FolderPlus size={13} className="text-gold-dark" />
            Project Name *
          </label>
          <input
            id="project-name"
            type="text"
            required
            value={data.projectName}
            onChange={(e) => onChange({ projectName: e.target.value })}
            placeholder={isCommercial ? "e.g. Apex Commercial Plaza" : "e.g. My Family Villa"}
            className={inputClass}
          />
        </div>

        {/* Location */}
        <div>
          <label htmlFor="project-location" className={labelClass}>
            <MapPin size={13} className="text-gold-dark" />
            Location / City
            <span className="font-normal normal-case tracking-normal text-concrete/70">(Optional)</span>
          </label>
          <input
            id="project-location"
            type="text"
            value={data.location}
            onChange={(e) => onChange({ location: e.target.value })}
            placeholder="e.g. Jubilee Hills, Hyderabad"
            className={inputClass}
          />
        </div>

        {/* Notes */}
        <div>
          <label htmlFor="project-notes" className={labelClass}>
            <FileText size={13} className="text-gold-dark" />
            Initial Notes / Objectives
            <span className="font-normal normal-case tracking-normal text-concrete/70">(Optional)</span>
          </label>
          <textarea
            id="project-notes"
            rows={4}
            value={data.notes}
            onChange={(e) => onChange({ notes: e.target.value })}
            placeholder="e.g. Modern commercial building with retail shops on ground floor and office spaces on upper floors."
            className={`${inputClass} min-h-32 resize-y leading-relaxed`}
          />
        </div>

      </div>
      <PlannerStepActions onBack={onBack} nextLabel={nextLabel} />
    </form>
  );
}
