"use client";

import React from "react";
import { Sparkles, ArrowRight, ShieldCheck, Zap, Layers, RefreshCw } from "lucide-react";

interface StepWelcomeProps {
  onStart: () => void;
  onContinue?: () => void;
  hasExistingProject?: boolean;
}

export default function StepWelcome({
  onStart,
  onContinue,
  hasExistingProject = false,
}: StepWelcomeProps) {
  return (
    <div className="max-w-2xl mx-auto space-y-8 py-4 animate-fadeIn">
      {/* Badge */}
      <div className="text-center">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/15 border border-gold/30 text-xs font-bold uppercase tracking-widest text-gold-dark shadow-sm">
          <Sparkles size={13} /> Architectural Planning Assistant
        </span>
      </div>

      {/* Main Editorial Headline */}
      <div className="text-center space-y-3">
        <h1 className="font-heading font-bold text-3xl md:text-5xl text-charcoal leading-tight">
          Plan Your Home, <br />
          <em className="text-gold-dark not-italic">Step by Step.</em>
        </h1>
        <p className="text-concrete text-sm md:text-base max-w-lg mx-auto leading-relaxed">
          Tell us how you want your home to work. We&apos;ll organize your requirements into a practical preliminary building plan.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <button
          type="button"
          onClick={onStart}
          className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-charcoal text-white hover:bg-black font-bold text-sm transition-all shadow-xl hover:shadow-2xl flex items-center justify-center gap-2 group cursor-pointer"
        >
          <span>Start Planning</span>
          <ArrowRight size={16} className="text-gold group-hover:translate-x-1 transition-transform" />
        </button>

        {hasExistingProject && onContinue && (
          <button
            type="button"
            onClick={onContinue}
            className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-linen hover:bg-warm-white border border-border text-charcoal font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <RefreshCw size={14} className="text-concrete" />
            <span>Continue Existing Project</span>
          </button>
        )}
      </div>

      {/* 3 Simple Benefits */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-border/60 text-center">
        <div className="p-4 rounded-2xl bg-white border border-border/70 shadow-sm space-y-1.5">
          <div className="w-8 h-8 rounded-xl bg-gold/15 text-gold-dark flex items-center justify-center mx-auto font-bold">
            <Zap size={16} />
          </div>
          <h4 className="font-bold text-charcoal text-xs">Easy</h4>
          <p className="text-[11px] text-concrete leading-snug">
            Guided step-by-step planning with no architectural jargon.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-border/70 shadow-sm space-y-1.5">
          <div className="w-8 h-8 rounded-xl bg-gold/15 text-gold-dark flex items-center justify-center mx-auto font-bold">
            <ShieldCheck size={16} />
          </div>
          <h4 className="font-bold text-charcoal text-xs">Smart</h4>
          <p className="text-[11px] text-concrete leading-snug">
            Engineering-aware validation for space, setbacks &amp; plumbing.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-border/70 shadow-sm space-y-1.5">
          <div className="w-8 h-8 rounded-xl bg-gold/15 text-gold-dark flex items-center justify-center mx-auto font-bold">
            <Layers size={16} />
          </div>
          <h4 className="font-bold text-charcoal text-xs">Clear</h4>
          <p className="text-[11px] text-concrete leading-snug">
            Get a complete preliminary requirement report for your architect.
          </p>
        </div>
      </div>
    </div>
  );
}
