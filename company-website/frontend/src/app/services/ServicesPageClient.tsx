"use client";

import { useState, useEffect } from "react";
import {
  CheckCircle2, Home, Building2, Building, Key, Hammer, Cpu,
  Factory, Compass, Palette, Trees, ClipboardList, ArrowRight, Sparkles,
  Landmark, ShieldCheck, Calculator, FileCheck, Clock,
  MapPin, Map, TrendingUp, LayoutDashboard
} from "lucide-react";
import { services } from "@/data/services";
import { serviceQuoteSpecs } from "@/data/serviceQuoteData";
import { serviceCategories, plannableSlugs, designSlugs } from "@/data/serviceCategories";
import Button from "@/components/ui/Button";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Link from "next/link";
import CTABanner from "@/components/ui/CTABanner";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }>> = {
  Home, Building2, Building, Key, Hammer, Cpu, Factory, Compass, Palette, Trees, ClipboardList,
  Landmark, ShieldCheck, Calculator, FileCheck,
  MapPin, Map, TrendingUp, LayoutDashboard, Clock
};

interface FilterCategory {
  id: string;
  label: string;
  slugs?: string[];
}

const filterCategories: FilterCategory[] = [
  { id: "all", label: "All Services" },
  ...serviceCategories.map((c) => ({
    id: c.id,
    label: c.shortLabel || c.label,
    slugs: c.slugs,
  })),
];

export default function ServicesPageClient() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [highlightedSlug, setHighlightedSlug] = useState<string | null>(null);

  // Sync with URL hash (e.g., #residential-construction from dropdown)
  useEffect(() => {
    const handleHashSync = () => {
      const hash = window.location.hash.replace("#", "");
      if (!hash) return;

      const matchedCategory = serviceCategories.find(
        (cat) => cat.id === hash || cat.slugs.includes(hash)
      );
      if (matchedCategory) {
        setActiveCategory(matchedCategory.id);
      }
      if (serviceCategories.some((cat) => cat.slugs.includes(hash))) {
        setHighlightedSlug(hash);
      } else {
        setHighlightedSlug(null);
      }
    };

    handleHashSync();
    window.addEventListener("hashchange", handleHashSync);
    return () => window.removeEventListener("hashchange", handleHashSync);
  }, []);

  // Smoothly scroll into view when highlightedSlug or activeCategory updates
  useEffect(() => {
    if (!highlightedSlug) return;
    const timer = setTimeout(() => {
      const el = document.getElementById(highlightedSlug);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 150);
    return () => clearTimeout(timer);
  }, [highlightedSlug, activeCategory]);

  const filteredServices = services.filter((service) => {
    if (activeCategory === "all") return true;
    const cat = filterCategories.find((c) => c.id === activeCategory);
    return cat?.slugs?.includes(service.slug);
  });


  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="relative pt-36 pb-24 bg-gradient-to-b from-[#FAF8F5] to-[var(--canvas-bg)] text-charcoal overflow-hidden border-b border-border">
        <div className="absolute inset-0 blueprint-grid opacity-15" />
        <div className="liquid-glow" style={{ width: 650, height: 550, top: -120, left: "28%", opacity: 0.35 }} />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

        <div className="container relative z-10 text-center max-w-3xl">
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 text-[0.7rem] font-bold tracking-[0.22em] uppercase text-gold-dark nm-raised px-4.5 py-1.5 rounded-full mb-8 backdrop-blur-md border border-border shadow-xs">
              <Sparkles size={11} className="text-gold-dark" />
              Comprehensive Capabilities
            </span>
            <h1
              className="font-heading font-bold text-charcoal mb-6 leading-tight"
              style={{ fontSize: "var(--text-h1)" }}
            >
              Engineering &amp;{" "}
              <em className="text-gold-dark not-italic">Design</em> Services
            </h1>
            <p className="text-base md:text-lg text-concrete leading-relaxed max-w-xl mx-auto">
              From individual luxury residences to large-scale commercial &amp; industrial developments — delivered with precision, transparency, and architectural distinction.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Filter & Grid ─────────────────────────────────────────────── */}
      <section className="section bg-[var(--canvas-bg)] relative overflow-hidden">
        {/* Ambient liquid glow orbs refracting through frosted neu-glass cards */}
        <div className="liquid-glow" style={{ width: 600, height: 600, top: "10%", left: "-10%", opacity: 0.35 }} />
        <div className="liquid-glow" style={{ width: 500, height: 500, top: "45%", right: "-5%", opacity: 0.3 }} />
        <div className="liquid-glow" style={{ width: 550, height: 450, bottom: "5%", left: "25%", opacity: 0.25 }} />

        <div className="container max-w-6xl relative z-10">

          {/* Category Pill Filter — Sunken Neu-Glass Track */}
          <ScrollReveal>
            <div className="flex justify-center mb-16">
              <div className="inline-flex flex-wrap justify-center p-1.5 rounded-full bg-linen border border-border gap-1.5 backdrop-blur-lg shadow-inner">
                {filterCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-5 py-2.5 text-[11px] font-bold tracking-widest uppercase rounded-full transition-all duration-300 cursor-pointer ${
                      activeCategory === cat.id
                        ? "bg-[#1A1714] text-white font-bold shadow-sm"
                        : "text-concrete hover:text-charcoal hover:bg-white/80"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Services Grid — Frosted Neu-Glass Extruded Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredServices.map((service, index) => {
              const IconComponent = iconMap[service.icon];
              const spec = serviceQuoteSpecs[service.slug];
              const isPlannable = plannableSlugs.includes(service.slug);
              const isDesignService = designSlugs.includes(service.slug);
              const isHighlighted = highlightedSlug === service.slug;

              return (
                <ScrollReveal key={service.slug} delay={(index % 2) * 90}>
                  <div
                    id={service.slug}
                    className={`neu-glass group relative rounded-3xl p-8 h-full flex flex-col scroll-mt-32 transition-all duration-500 ${
                      isHighlighted
                        ? "ring-2 ring-gold/90 shadow-2xl shadow-gold/25 scale-[1.015] border-gold/60 bg-gold/[0.04]"
                        : ""
                    }`}
                  >
                    {/* Highlight Pill if selected via dropdown or hash */}
                    {isHighlighted && (
                      <div className="mb-3">
                        <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-charcoal nm-gold-raised px-3 py-1 rounded-full animate-pulse shadow-md">
                          <Sparkles size={11} className="text-charcoal" />
                          Selected Service
                        </span>
                      </div>
                    )}
                    {/* Header: Sunken Icon Socket + Index */}
                    <div className="flex items-start justify-between gap-4 mb-5">
                      <div className="w-14 h-14 rounded-2xl nm-inset text-charcoal group-hover:text-gold-dark flex items-center justify-center flex-shrink-0 transition-all duration-300">
                        {IconComponent && <IconComponent size={22} strokeWidth={1.6} />}
                      </div>
                      <span className="text-4xl font-heading font-bold text-concrete-lighter/40 group-hover:text-gold/40 transition-colors duration-300 select-none leading-none">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    {/* Service Badge Tag */}
                    {spec?.badge && (
                      <div className="mb-2">
                        <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-gold-dark bg-gold/10 border border-gold/25 px-2.5 py-0.5 rounded-full">
                          <Sparkles size={10} className="text-gold" />
                          {spec.badge}
                        </span>
                      </div>
                    )}

                    {/* Title */}
                    <h2 className="text-xl font-heading font-bold text-charcoal mb-2.5 leading-snug">
                      <Link href={`/services/${service.slug}`} className="hover:text-gold-dark transition-colors">
                        {service.title}
                      </Link>
                    </h2>

                    {/* SLA & Credential Badges */}
                    {spec && (
                      <div className="flex flex-wrap items-center gap-2 mb-4">
                        {spec.sla && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-gold-dark bg-white/80 border border-border/70 px-2 py-0.5 rounded-lg nm-inset">
                            <Clock size={11} className="text-gold" />
                            <span>{spec.sla}</span>
                          </span>
                        )}
                        {spec.credentialBadge && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-charcoal bg-white/80 border border-border/70 px-2 py-0.5 rounded-lg nm-inset">
                            <ShieldCheck size={11} className="text-gold" />
                            <span>{spec.credentialBadge}</span>
                          </span>
                        )}
                      </div>
                    )}

                    {/* Description */}
                    <p className="text-concrete text-xs md:text-sm leading-relaxed mb-6 flex-grow">
                      {service.description}
                    </p>

                    {/* Sunken Key Capabilities Box */}
                    <div className="nm-inset rounded-2xl p-5 mb-6">
                      <h4 className="text-[10px] font-bold uppercase tracking-widest text-charcoal/70 mb-3">
                        Key Capabilities &amp; Specifications
                      </h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {service.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-2">
                            <CheckCircle2 size={13} className="text-gold flex-shrink-0 mt-0.5" />
                            <span className="text-xs text-concrete font-medium leading-snug">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA Actions */}
                    <div className="mt-auto pt-4 border-t border-border/60 space-y-2">
                      <div className="flex flex-col sm:flex-row items-center gap-2">
                        <Button
                          href={`/request-quote?service=${service.slug}`}
                          variant="secondary"
                          className="w-full sm:flex-1 text-xs font-bold tracking-wider uppercase nm-gold-raised text-charcoal flex items-center justify-center gap-1.5 py-2.5 shadow-xs"
                        >
                          <span>Request Quote</span>
                          <ArrowRight size={13} />
                        </Button>

                        {(isPlannable || isDesignService) && (
                          <Button
                            href="/plan-home"
                            variant="primary"
                            className="w-full sm:flex-1 text-xs font-bold tracking-wider uppercase bg-charcoal text-white hover:bg-gold hover:text-charcoal flex items-center justify-center gap-1.5 py-2.5 transition-colors shadow-xs"
                          >
                            <Compass size={13} className="text-gold" />
                            <span>Building Planner</span>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
