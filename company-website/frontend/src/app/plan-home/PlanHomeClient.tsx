"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, Layers, SlidersHorizontal, Home, Building2, CheckCircle } from "lucide-react";
import ApplePlannerApp from "@/components/planner/ApplePlannerApp";
import SimplePlannerForm from "@/components/planner/SimplePlannerForm";

export default function PlanHomeClient() {
  /* Category Selection: "Residential" vs "Commercial" */
  const [category, setCategory] = useState<"Residential" | "Commercial">("Residential");

  /* Residential Mode: "detailed" vs "express" */
  const [resMode, setResMode] = useState<"detailed" | "express">("express");

  return (
    <div className="min-h-screen bg-background flex flex-col">
      
      {/* ── TOP HERO EXPERIENCE CONTROLLER ──────────────────────────── */}
      <div className="bg-gradient-to-b from-warm-white to-background border-b border-border/60 py-8 px-4 md:px-6">
        <div className="container max-w-5xl mx-auto space-y-6 text-center">
          
          {/* Header Title */}
          <div className="space-y-2 max-w-xl mx-auto">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/15 border border-gold/30 text-[10px] font-bold tracking-widest uppercase text-gold-dark">
              <Sparkles size={12} /> Design &amp; Planning Studio
            </span>
            <h1 className="font-heading font-bold text-3xl md:text-4xl text-charcoal leading-tight">
              Plan Your Dream Building Project
            </h1>
            <p className="text-concrete text-xs md:text-sm max-w-lg mx-auto text-center leading-relaxed">
              Select your project type and customize your plot dimensions, floor plans, and room specifications.
            </p>
          </div>

          {/* Category Selector Cards (Residential vs Commercial) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto pt-2">
            {/* Residential Card */}
            <button
              type="button"
              onClick={() => setCategory("Residential")}
              className={`p-5 rounded-2xl border-2 text-left transition-all duration-300 cursor-pointer relative overflow-hidden flex items-start gap-4 ${
                category === "Residential"
                  ? "bg-white border-gold shadow-xl ring-2 ring-gold/20"
                  : "bg-white/70 border-border/80 hover:border-charcoal/30 hover:bg-white"
              }`}
            >
              <div className={`p-3 rounded-xl ${category === "Residential" ? "bg-gold text-charcoal" : "bg-linen text-concrete"}`}>
                <Home size={22} />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-heading font-bold text-base text-charcoal">Residential House</span>
                  {category === "Residential" && (
                    <span className="text-[10px] font-bold text-gold-dark bg-gold/20 px-2 py-0.5 rounded-full">Selected</span>
                  )}
                </div>
                <p className="text-concrete text-xs leading-relaxed text-left">
                  Custom villas, duplex homes, independent houses &amp; floor plans.
                </p>
              </div>
            </button>

            {/* Commercial Card */}
            <button
              type="button"
              onClick={() => setCategory("Commercial")}
              className={`p-5 rounded-2xl border-2 text-left transition-all duration-300 cursor-pointer relative overflow-hidden flex items-start gap-4 ${
                category === "Commercial"
                  ? "bg-white border-gold shadow-xl ring-2 ring-gold/20"
                  : "bg-white/70 border-border/80 hover:border-charcoal/30 hover:bg-white"
              }`}
            >
              <div className={`p-3 rounded-xl ${category === "Commercial" ? "bg-gold text-charcoal" : "bg-linen text-concrete"}`}>
                <Building2 size={22} />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-heading font-bold text-base text-charcoal">Commercial Building</span>
                  {category === "Commercial" && (
                    <span className="text-[10px] font-bold text-gold-dark bg-gold/20 px-2 py-0.5 rounded-full">Selected</span>
                  )}
                </div>
                <p className="text-concrete text-xs leading-relaxed text-left">
                  Offices, retail shops, restaurants, clinics, showrooms &amp; warehouses.
                </p>
              </div>
            </button>
          </div>

          {/* Secondary Experience Switcher (For Residential Mode) */}
          {category === "Residential" && (
            <div className="pt-2 animate-fadeIn">
              <div className="inline-flex p-1.5 bg-warm-white/90 rounded-2xl border border-border/80 shadow-sm">
                <button
                  type="button"
                  onClick={() => setResMode("express")}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                    resMode === "express"
                      ? "bg-charcoal text-white shadow-md font-extrabold"
                      : "text-concrete hover:text-charcoal"
                  }`}
                >
                  <SlidersHorizontal size={14} />
                  <span>Quick 1-Page Planner</span>
                  <span className="text-[9px] bg-gold/20 text-gold-dark font-mono px-1.5 py-0.5 rounded-md uppercase">
                    Express
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setResMode("detailed")}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                    resMode === "detailed"
                      ? "bg-charcoal text-white shadow-md font-extrabold"
                      : "text-concrete hover:text-charcoal"
                  }`}
                >
                  <Layers size={14} />
                  <span>Step-by-Step House Planner</span>
                  <span className="text-[9px] bg-gold/20 text-gold-dark font-mono px-1.5 py-0.5 rounded-md uppercase">
                    Detailed
                  </span>
                </button>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* ── MAIN CONTENT AREA ────────────────────────────────────────── */}
      {category === "Residential" && resMode === "detailed" ? (
        /* 1. RESIDENTIAL DETAILED WIZARD — owns its own container widths and
           padding so the three-column layout can use the full screen width. */
        <div className="flex-1">
          <ApplePlannerApp />
        </div>
      ) : (
        <div className="flex-1 py-8 px-4 md:px-6">
          {category === "Residential" ? (
            /* 2. RESIDENTIAL EXPRESS FORM */
            <div className="container max-w-5xl mx-auto">
              <SimplePlannerForm forcedType="Residential" />
            </div>
          ) : (
            /* 3. COMMERCIAL FRAME */
            <div className="container max-w-5xl mx-auto animate-fadeIn">
              <SimplePlannerForm forcedType="Commercial" />
            </div>
          )}
        </div>
      )}

    </div>
  );
}
