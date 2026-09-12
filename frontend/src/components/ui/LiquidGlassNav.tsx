"use client";

import React from "react";

export interface GlassTab {
  id: string;
  label: string;
  badge?: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

interface LiquidGlassNavProps {
  tabs: GlassTab[];
  activeTab: string;
  onTabChange: (id: string) => void;
  className?: string;
}

export default function LiquidGlassNav({
  tabs,
  activeTab,
  onTabChange,
  className = "",
}: LiquidGlassNavProps) {
  return (
    <div className={`relative inline-flex p-1.5 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl ${className}`}>
      {/* Ambient Inner Gloss Glow */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/20 via-transparent to-transparent pointer-events-none" />

      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`relative z-10 flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-500 cursor-pointer ${
              isActive
                ? "text-charcoal font-bold shadow-lg"
                : "text-warm-white hover:text-gold hover:bg-white/5"
            }`}
          >
            {/* Liquid Pill Background (Active State) */}
            {isActive && (
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-gold via-gold-light to-gold shadow-md transition-all duration-500 -z-10 animate-fade-in">
                {/* Top Glass Reflection */}
                <div className="absolute top-0 left-0 right-0 h-1/2 rounded-t-full bg-white/30" />
              </div>
            )}

            <Icon size={15} className={isActive ? "text-charcoal" : "text-gold"} />
            <span>{tab.label}</span>
            {tab.badge && (
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold ${
                  isActive
                    ? "bg-charcoal/20 text-charcoal"
                    : "bg-gold/20 text-gold"
                }`}
              >
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
