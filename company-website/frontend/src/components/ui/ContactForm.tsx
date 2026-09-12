"use client";

import { useState, useEffect } from "react";
import { User, Phone, Mail, Building, MapPin, MessageSquare, Send, CheckCircle, Sparkles, FileText, ChevronDown } from "lucide-react";
import { submitContactForm, type ActionResult } from "@/app/actions/contactActions";
import { serviceQuoteSpecs } from "@/data/serviceQuoteData";
import ImageUpload from "@/components/ui/ImageUpload";
import type { Attachment } from "@/lib/attachments";

interface ContactFormProps {
  isEstimate?: boolean;
  serviceSlug?: string;
  serviceTitle?: string;
}

const inputClass =
  "w-full pl-11 pr-4 py-3.5 bg-[var(--ng-bg)] nm-inset text-charcoal text-sm rounded-2xl focus:border-gold focus:outline-none transition-all duration-200 placeholder:text-concrete-lighter";

const selectClass =
  "w-full pl-11 pr-4 py-3.5 bg-[var(--ng-bg)] nm-inset text-charcoal text-sm rounded-2xl focus:border-gold focus:outline-none transition-all duration-200 cursor-pointer appearance-none";

const labelClass = "block text-[11px] font-bold uppercase tracking-widest text-concrete mb-2";

function mapSlugToProjectType(slug?: string): string {
  if (!slug) return "residential";
  const spec = serviceQuoteSpecs[slug];
  if (spec?.formDefaults?.serviceCategory) {
    return spec.formDefaults.serviceCategory;
  }
  return "residential";
}

export default function ContactForm({ isEstimate = false, serviceSlug, serviceTitle }: ContactFormProps) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [result, setResult] = useState<ActionResult | null>(null);
  const [projectType, setProjectType] = useState<string>(() => mapSlugToProjectType(serviceSlug));

  const spec = serviceSlug ? serviceQuoteSpecs[serviceSlug] : null;

  const [selectedField1, setSelectedField1] = useState<string>(() => spec?.formDefaults?.field1Options?.[0]?.value || "");
  const [selectedField2, setSelectedField2] = useState<string>(() => spec?.formDefaults?.field2Options?.[0]?.value || "");
  const [location, setLocation] = useState<string>("");

  const [prevServiceSlug, setPrevServiceSlug] = useState(serviceSlug);
  if (prevServiceSlug !== serviceSlug) {
    setPrevServiceSlug(serviceSlug);
    if (serviceSlug) {
      setProjectType(mapSlugToProjectType(serviceSlug));
      const currentSpec = serviceQuoteSpecs[serviceSlug];
      if (currentSpec?.formDefaults?.field1Options?.[0]) {
        setSelectedField1(currentSpec.formDefaults.field1Options[0].value);
      }
      if (currentSpec?.formDefaults?.field2Options?.[0]) {
        setSelectedField2(currentSpec.formDefaults.field2Options[0].value);
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isUploading) return;
    setStatus("submitting");
    const formData = new FormData(e.currentTarget);
    if (attachments.length > 0) {
      formData.append("attachments", JSON.stringify(attachments));
    }
    formData.append("isEstimate", isEstimate ? "true" : "false");
    if (serviceSlug) formData.append("serviceSlug", serviceSlug);
    if (serviceTitle) formData.append("serviceTitle", serviceTitle);
    if (serviceSlug && !formData.get("projectType")) {
      formData.append("projectType", projectType);
    }
    if (selectedField1) {
      formData.set("budget", selectedField1);
    }
    if (selectedField2) {
      formData.set("timeline", selectedField2);
    }
    const res = await submitContactForm(formData);
    setResult(res);
    if (res.success) {
      setStatus("success");
      setAttachments([]);
      if (e.target instanceof HTMLFormElement) e.target.reset();
    } else {
      setStatus("idle");
    }
  };

  /* ── Success State ──────────────────────────────────────────────── */
  if (status === "success" && result?.success) {
    return (
      <div className="nm-raised rounded-3xl p-8 md:p-12 text-center min-h-[380px] flex flex-col justify-center relative overflow-hidden border border-white/70">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent" />

        <div className="w-14 h-14 nm-inset text-gold-dark rounded-2xl flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={28} strokeWidth={1.75} />
        </div>

        <h3 className="text-xl md:text-2xl font-heading font-bold text-charcoal mb-2">
          We&apos;ve received your request!
        </h3>

        {result.refCode && (
          <div className="inline-flex items-center gap-2 mx-auto mb-4 px-3.5 py-1.5 nm-inset rounded-full">
            <span className="text-xs text-concrete">Reference ID:</span>
            <span className="text-xs font-mono font-bold text-gold-dark">{result.refCode}</span>
          </div>
        )}

        <p className="text-concrete text-xs md:text-sm max-w-sm mx-auto leading-relaxed mb-6">
          Our specialized team will review your requirements for {serviceTitle || "your project"} and reach out within 24 business hours.
        </p>

        <button
          onClick={() => { setStatus("idle"); setResult(null); }}
          className="mx-auto inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-concrete hover:text-charcoal transition-colors underline underline-offset-4 cursor-pointer"
        >
          Submit another request
        </button>
      </div>
    );
  }

  const getMessagePlaceholder = () => {
    if (spec?.formDefaults?.placeholder) {
      return spec.formDefaults.placeholder;
    }
    return "Plot dimensions, number of floors, preferred finish package, planned start date...";
  };

  const quickLocations = ["RS Puram", "Gandhipuram", "Peelamedu", "Saravanampatti", "Coimbatore"];

  /* ── Form ───────────────────────────────────────────────────────── */
  return (
    <div className={`neu-glass rounded-3xl relative overflow-hidden border border-white/90 shadow-xl ${isEstimate ? "p-5 md:p-6" : "p-7 md:p-10"}`}>
      {/* Top gold accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />

      {/* Header */}
      {isEstimate ? (
        <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-border/70">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-gold-dark mb-0.5">
              <Sparkles size={12} className="text-gold" />
              Instant Quote Request
            </div>
            <h3 className="text-lg md:text-xl font-heading font-bold text-charcoal leading-tight">
              {serviceTitle || "Submit Project Specifications"}
            </h3>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[10px] uppercase tracking-wider font-bold text-emerald-800 bg-emerald-100/90 border border-emerald-300/80 px-2.5 py-0.5 rounded-full shadow-2xs">
              ⚡ 24h Response
            </span>
            <span className="text-[9px] text-concrete font-medium mt-0.5">No Obligation</span>
          </div>
        </div>
      ) : (
        <div className="mb-6">
          <span className="badge-gold mb-3 inline-flex">
            <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block" />
            Send a Message
          </span>
          <h3 className="text-2xl font-heading font-bold text-charcoal mb-1 leading-tight">
            Book a consultation
          </h3>
          <p className="text-concrete text-xs leading-relaxed">
            Have a question or looking to start something new? We&apos;d love to hear from you.
          </p>
        </div>
      )}

      {result && !result.success && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-medium rounded-xl">
          {result.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className={isEstimate ? "space-y-3.5" : "space-y-5"}>
        <input type="hidden" name="serviceSlug" value={serviceSlug || ""} />
        <input type="hidden" name="serviceTitle" value={serviceTitle || ""} />
        <input type="hidden" name="projectType" value={projectType} />

        {/* Dynamic Contextual Specs: Clean 2-Column Responsive Selector */}
        {isEstimate && spec && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-white/75 rounded-2xl border border-border/80 shadow-2xs">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="specField1" className="text-[10px] font-bold uppercase tracking-widest text-concrete block truncate">
                  {spec.formDefaults.field1Label}
                </label>
              </div>
              <div className="relative">
                <select
                  id="specField1"
                  name="budget"
                  value={selectedField1}
                  onChange={(e) => setSelectedField1(e.target.value)}
                  className="w-full pl-3 pr-7 py-2 bg-linen/50 text-charcoal text-xs font-semibold rounded-xl border border-border focus:border-gold focus:outline-none transition-all cursor-pointer appearance-none truncate"
                >
                  {spec.formDefaults.field1Options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-concrete-light pointer-events-none" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="specField2" className="text-[10px] font-bold uppercase tracking-widest text-concrete block truncate">
                  {spec.formDefaults.field2Label}
                </label>
              </div>
              <div className="relative">
                <select
                  id="specField2"
                  name="timeline"
                  value={selectedField2}
                  onChange={(e) => setSelectedField2(e.target.value)}
                  className="w-full pl-3 pr-7 py-2 bg-linen/50 text-charcoal text-xs font-semibold rounded-xl border border-border focus:border-gold focus:outline-none transition-all cursor-pointer appearance-none truncate"
                >
                  {spec.formDefaults.field2Options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-concrete-light pointer-events-none" />
              </div>
            </div>
          </div>
        )}

        {/* Row 1: Name + Phone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          <div>
            <label htmlFor="name" className={labelClass}>Your Name *</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-concrete-light">
                <User size={15} strokeWidth={1.5} />
              </div>
              <input
                type="text"
                id="name"
                name="name"
                required
                className={`${inputClass} pl-9 py-2.5 text-xs`}
                placeholder="e.g. Anand Kumar"
              />
            </div>
            {result?.errors?.name && <p className="text-[10px] text-red-600 mt-1 font-medium">{result.errors.name}</p>}
          </div>

          <div>
            <label htmlFor="phone" className={labelClass}>Phone Number *</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-concrete-light">
                <Phone size={15} strokeWidth={1.5} />
              </div>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                className={`${inputClass} pl-9 py-2.5 text-xs`}
                placeholder="+91 94860 38761"
              />
            </div>
            {result?.errors?.phone && <p className="text-[10px] text-red-600 mt-1 font-medium">{result.errors.phone}</p>}
          </div>
        </div>

        {/* Row 2: Location (with 1-Click Quick Chips) + Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          <div>
            <div className="flex items-center justify-between mb-1">
              <label htmlFor="location" className="text-[10px] font-bold uppercase tracking-widest text-concrete">
                Location *
              </label>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-concrete-light">
                <MapPin size={15} strokeWidth={1.5} />
              </div>
              <input
                type="text"
                id="location"
                name="location"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className={`${inputClass} pl-9 py-2.5 text-xs`}
                placeholder="e.g. RS Puram, Coimbatore"
              />
            </div>
            {/* 1-Click Location Chips */}
            <div className="flex flex-wrap items-center gap-1 mt-1.5">
              <span className="text-[9px] uppercase font-bold text-concrete-light mr-0.5">Quick:</span>
              {quickLocations.map((loc) => (
                <button
                  key={loc}
                  type="button"
                  onClick={() => setLocation(loc)}
                  className={`text-[10px] px-2 py-0.5 rounded-lg transition-all duration-150 cursor-pointer ${
                    location === loc
                      ? "nm-gold-raised text-charcoal font-bold"
                      : "nm-inset text-concrete hover:text-charcoal bg-white/50"
                  }`}
                >
                  {loc}
                </button>
              ))}
            </div>
            {result?.errors?.location && <p className="text-[10px] text-red-600 mt-1 font-medium">{result.errors.location}</p>}
          </div>

          <div>
            <label htmlFor="email" className={labelClass}>Email Address (Optional)</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-concrete-light">
                <Mail size={15} strokeWidth={1.5} />
              </div>
              <input
                type="email"
                id="email"
                name="email"
                className={`${inputClass} pl-9 py-2.5 text-xs`}
                placeholder="your@email.com"
              />
            </div>
          </div>
        </div>

        {/* If general contact form, show category dropdown */}
        {!isEstimate && (
          <div>
            <label htmlFor="projectType" className={labelClass}>Service Category *</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-concrete-light">
                <Building size={16} strokeWidth={1.5} />
              </div>
              <select
                id="projectType"
                name="projectType"
                required
                value={projectType}
                onChange={(e) => setProjectType(e.target.value)}
                className={selectClass}
              >
                <option value="" disabled>Select Category</option>
                <option value="valuation">Estimate & Valuation (Bank / Stability Certificate)</option>
                <option value="residential">Residential Home Construction</option>
                <option value="villa">Luxury Villa Construction</option>
                <option value="commercial">Commercial Building Construction</option>
                <option value="industrial">Industrial / Factory Construction</option>
                <option value="architectural">Architectural & Interior Design</option>
                <option value="renovation">Renovation & Remodeling</option>
                <option value="other">Other Engineering Inquiry</option>
              </select>
            </div>
          </div>
        )}

        {/* Message / Specific Notes (Compact) */}
        <div>
          <label htmlFor="message" className={labelClass}>
            Specific Notes / Requirements <span className="text-[10px] font-normal lowercase text-concrete-light">(optional)</span>
          </label>
          <div className="relative">
            <div className="absolute top-2.5 left-3 pointer-events-none text-concrete-light">
              <MessageSquare size={15} strokeWidth={1.5} />
            </div>
            <textarea
              id="message"
              name="message"
              rows={isEstimate ? 2 : 3}
              className={`w-full pl-9 pr-3 py-2 bg-[var(--ng-bg)] nm-inset text-charcoal text-xs rounded-xl focus:border-gold focus:outline-none transition-all duration-200 resize-none placeholder:text-concrete-lighter`}
              placeholder={getMessagePlaceholder()}
            />
          </div>
        </div>

        {/* Attachments */}
        <ImageUpload
          value={attachments}
          onChange={setAttachments}
          onUploadingChange={setIsUploading}
          formType={isEstimate ? "Request Quote" : "Contact Us"}
          label="Attach Plans or Site Photos"
          hint="Plans, sketches or site photos"
          compact
        />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={status === "submitting" || isUploading}
          className="w-full py-3.5 px-6 nm-dark-interactive text-warm-white rounded-2xl font-bold text-xs md:text-sm tracking-wide flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-50 shadow-md hover:shadow-lg transition-all"
        >
          {status === "submitting" ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Preparing your quote request…
            </span>
          ) : (
            <>
              {serviceTitle ? `Request ${serviceTitle} Quote` : isEstimate ? "Submit Quote Request" : "Send My Message"}
              <Send size={14} className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300 text-gold" />
            </>
          )}
        </button>

        <div className="flex items-center justify-center gap-4 text-[10px] text-concrete pt-0.5">
          <span className="flex items-center gap-1">
            <span className="text-emerald-600 font-bold">✓</span> 100% Confidential
          </span>
          <span className="flex items-center gap-1">
            <span className="text-gold font-bold">✓</span> Fixed-Price BoQ
          </span>
          <span className="flex items-center gap-1">
            <span className="text-charcoal font-bold">✓</span> No Obligation
          </span>
        </div>
      </form>
    </div>
  );
}


