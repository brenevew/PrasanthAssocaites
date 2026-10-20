"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  X, CheckCircle2, Calculator, ArrowRight, Sparkles, Clock, ShieldCheck,
  Compass, Home, Building2, Building, Key, Factory, Cpu, Hammer, ClipboardList,
  Palette, Trees, Landmark, FileCheck, MapPin, Map, TrendingUp, LayoutDashboard
} from "lucide-react";
import { Service } from "@/data/services";
import { serviceQuoteSpecs } from "@/data/serviceQuoteData";
import { plannableSlugs, designSlugs } from "@/data/serviceCategories";
import Button from "@/components/ui/Button";
import OptionCards from "@/components/ui/OptionCards";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }>> = {
  Home, Building2, Building, Key, Factory, Cpu, Hammer, ClipboardList,
  Compass, Palette, Trees, Landmark, ShieldCheck, Calculator, FileCheck,
  MapPin, Map, TrendingUp, LayoutDashboard, Clock
};

interface ServiceDetailModalProps {
  service: Service | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ServiceDetailModal({
  service,
  isOpen,
  onClose,
}: ServiceDetailModalProps) {
  // onClose arrives inline from the caller, so reading it through a ref keeps
  // the effect keyed on `isOpen` alone. Writing body.overflow on every parent
  // render (the header re-renders on scroll) would stomp other scroll locks.
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCloseRef.current();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const openSpec = service ? serviceQuoteSpecs[service.slug] : undefined;
  const defaults = (opts?: { value: string }[], multi?: boolean) =>
    multi ? [] : ([opts?.[0]?.value].filter(Boolean) as string[]);

  const [field1, setField1] = useState<string[]>([]);
  const [field2, setField2] = useState<string[]>([]);
  const [pickedFor, setPickedFor] = useState<string | null>(null);

  // Reset the pickers when the card switches to a different service.
  if (service && service.slug !== pickedFor) {
    setPickedFor(service.slug);
    setField1(defaults(openSpec?.formDefaults?.field1Options, openSpec?.formDefaults?.field1Multi));
    setField2(defaults(openSpec?.formDefaults?.field2Options, openSpec?.formDefaults?.field2Multi));
  }

  if (!isOpen || !service) return null;

  // Picks ride along so the quote form opens already configured.
  const quoteHref = () => {
    const p = new URLSearchParams({ service: service.slug });
    if (field1.length) p.set("f1", field1.join(","));
    if (field2.length) p.set("f2", field2.join(","));
    return `/request-quote?${p.toString()}`;
  };
  const legend = (raw?: string) => (raw || "").replace(/\s*\*\s*$/, "");

  const IconComponent = iconMap[service.icon] || Building2;
  const spec = serviceQuoteSpecs[service.slug];
  const isPlannable = plannableSlugs.includes(service.slug);
  const isDesignService = designSlugs.includes(service.slug);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-charcoal/65 backdrop-blur-sm transition-opacity animate-fadeIn"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog with Warm Stone Architectural Styling */}
      <div className="relative bg-warm-white-dark border border-border rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-[0_25px_80px_rgba(40,35,30,0.18)] z-10 my-auto text-left overflow-hidden">
        {/* Subtle Ambient Warm Glow */}
        <div
          className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-gold/15 blur-3xl pointer-events-none"
        />

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 sm:top-6 sm:right-6 w-9 h-9 rounded-full bg-linen hover:bg-white border border-border text-concrete hover:text-charcoal flex items-center justify-center transition-all cursor-pointer focus:outline-none z-20 shadow-2xs"
          aria-label="Close dialog"
        >
          <X size={18} />
        </button>

        {/* Service Title & Badges */}
        <div className="flex items-start gap-4 mb-4 pr-12 relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-gold/15 border border-gold/30 text-gold-dark flex items-center justify-center flex-shrink-0 shadow-sm">
            <IconComponent size={26} />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-xl sm:text-2xl font-heading font-bold text-charcoal leading-snug">
              {service.title}
            </h3>
            {spec && (
              <div className="flex flex-wrap items-center gap-2 mt-2">
                {spec.sla && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-gold-dark bg-white border border-border px-2.5 py-0.5 rounded-lg shadow-2xs">
                    <Clock size={11} className="text-gold-dark" />
                    <span>{spec.sla}</span>
                  </span>
                )}
                {spec.credentialBadge && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-charcoal bg-white border border-border px-2.5 py-0.5 rounded-lg shadow-2xs">
                    <ShieldCheck size={11} className="text-gold-dark" />
                    <span>{spec.credentialBadge}</span>
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm text-concrete leading-relaxed mb-5 relative z-10 font-normal">
          {service.description}
        </p>

        {/* Key Capabilities Box */}
        <div className="bg-linen border border-border rounded-2xl p-4 sm:p-5 mb-6 relative z-10 shadow-inner">
          <h4 className="text-[11px] font-bold uppercase tracking-widest text-gold-dark mb-3 flex items-center gap-2">
            <Sparkles size={12} className="text-gold-dark" />
            <span>Key Capabilities &amp; Engineering Specifications</span>
          </h4>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {service.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2.5">
                <CheckCircle2 size={14} className="text-gold-dark flex-shrink-0 mt-0.5" />
                <span className="text-xs text-charcoal font-medium leading-snug">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Configure the request without leaving the card */}
        {spec && (
          <div className="space-y-4 mb-6 relative z-10">
            <OptionCards
              compact
              name="modal-field1"
              legend={legend(spec.formDefaults.field1Label)}
              options={spec.formDefaults.field1Options}
              value={field1}
              onChange={setField1}
              multi={spec.formDefaults.field1Multi}
            />
            <OptionCards
              compact
              name="modal-field2"
              legend={legend(spec.formDefaults.field2Label)}
              options={spec.formDefaults.field2Options}
              value={field2}
              onChange={setField2}
              multi={spec.formDefaults.field2Multi}
            />
          </div>
        )}

        {/* CTA Actions Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-border relative z-10">
          <Link
            href={`/services#${service.slug}`}
            onClick={onClose}
            className="text-xs font-semibold text-concrete hover:text-gold-dark transition-colors flex items-center gap-1 self-center sm:self-auto order-2 sm:order-1"
          >
            <span>View on Services Page</span>
            <ArrowRight size={12} />
          </Link>

          <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full sm:w-auto order-1 sm:order-2">
            <Button
              href={quoteHref()}
              variant="outline"
              onClick={onClose}
              className="w-full sm:w-auto text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2 py-3 px-5"
            >
              <span>Request Quote</span>
              <ArrowRight size={14} />
            </Button>

            {(isPlannable || isDesignService) && (
              <Button
                href="/plan-home"
                variant="primary"
                onClick={onClose}
                className="w-full sm:w-auto text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2 py-3 px-5 shadow-md"
              >
                {isDesignService ? <Compass size={14} /> : <Calculator size={14} />}
                <span>Building Planner</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
