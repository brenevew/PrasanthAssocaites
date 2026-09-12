"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Home, Building2, Building, Key, Hammer, Cpu,
  Factory, Compass, Palette, Trees, ClipboardList, ArrowRight,
  Landmark, ShieldCheck, Calculator, FileCheck,
} from "lucide-react";
import type { Service } from "@/data/services";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }>> = {
  Home, Building2, Building, Key, Hammer, Cpu, Factory, Compass, Palette, Trees, ClipboardList,
  Landmark, ShieldCheck, Calculator, FileCheck,
};

const categoryLabels: Record<string, string> = {
  construction: "Construction",
  design: "Design & Architecture",
  valuation: "Estimate & Valuation",
};

const categoryMap: Record<string, string[]> = {
  construction: [
    "residential-construction",
    "villa-construction",
    "commercial-construction",
    "turnkey-construction",
    "industrial-factory-construction",
    "smart-homes",
    "renovation",
    "construction-work-consulting",
  ],
  design: [
    "architectural-designs",
    "interior-designs",
    "landscaping-designs",
  ],
  valuation: [
    "bank-valuation-report",
    "structural-stability-certificate",
    "detailed-estimation-costing",
    "chartered-engineer-valuation",
  ],
};

interface ServicesTabsProps {
  services: Service[];
}

export default function ServicesTabs({ services }: ServicesTabsProps) {
  const [activeCategory, setActiveCategory] = useState<string>("construction");

  const filteredServices = services.filter((s) =>
    categoryMap[activeCategory]?.includes(s.slug)
  );

  return (
    <div>
      {/* Category pill selector — Sunken Neumorphic Track */}
      <div className="flex justify-center mb-12">
        <div className="inline-flex p-1.5 rounded-full nm-inset-deep gap-1.5">
          {Object.entries(categoryLabels).map(([key, label]) => {
            const isActive = activeCategory === key;
            return (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`relative px-5 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "nm-gold-raised font-bold text-charcoal"
                    : "text-concrete hover:text-charcoal hover:nm-raised-sm"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Cards Grid — Tactile Extruded Cards */}
      <div
        key={activeCategory}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7"
      >
        {filteredServices.map((service, index) => {
          const IconComponent = iconMap[service.icon];
          return (
            <Link
              key={service.slug}
              href={`/services#${service.slug}`}
              className="nm-raised group relative flex flex-col rounded-3xl p-7 transition-all duration-300 hover:-translate-y-2 hover:border-gold/30"
              style={{ animationDelay: `${index * 60}ms` }}
            >
              <div className="flex flex-col flex-1">
                {/* Sunken Icon Socket */}
                <div className="w-12 h-12 flex items-center justify-center rounded-2xl nm-inset text-charcoal group-hover:text-gold-dark transition-all duration-300 mb-5">
                  {IconComponent && <IconComponent size={20} strokeWidth={1.5} />}
                </div>

                {/* Title */}
                <h3 className="text-lg font-heading font-bold text-charcoal mb-2.5 leading-snug group-hover:text-gold-dark transition-colors duration-300">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-concrete text-sm leading-relaxed flex-1 mb-5">
                  {service.shortDescription}
                </p>

                {/* Sunken Feature Tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {service.features.slice(0, 3).map((f) => (
                    <span
                      key={f}
                      className="text-[10px] px-2.5 py-1 rounded-full nm-inset-sm text-concrete font-medium"
                    >
                      {f}
                    </span>
                  ))}
                  {service.features.length > 3 && (
                    <span className="text-[10px] px-2 py-1 text-concrete-lighter font-medium">
                      +{service.features.length - 3} more
                    </span>
                  )}
                </div>

                {/* CTA link */}
                <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-charcoal group-hover:text-gold-dark transition-colors mt-auto pt-2">
                  Explore
                  <ArrowRight size={13} className="transform group-hover:translate-x-1.5 transition-transform duration-300" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
