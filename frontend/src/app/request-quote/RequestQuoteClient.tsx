"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Sparkles, CheckCircle2, ShieldCheck, Clock, Award,
  MapPin, Phone, User, Mail, MessageSquare, Send, Check,
  Building2, Landmark, Compass, Calculator, ChevronDown,
  Building, Home, Key, Hammer, Cpu, Factory, Palette,
  Trees, ClipboardList, FileCheck, ArrowRight, Repeat2,
} from "lucide-react";
import { services, type Service } from "@/data/services";
import { serviceQuoteSpecs } from "@/data/serviceQuoteData";
import { submitContactForm, type ActionResult } from "@/app/actions/contactActions";
import ImageUpload from "@/components/ui/ImageUpload";
import type { Attachment } from "@/lib/attachments";
import CostCalculator from "@/components/ui/CostCalculator";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }>> = {
  Home, Building2, Building, Key, Hammer, Cpu, Factory, Compass, Palette, Trees, ClipboardList,
  Landmark, ShieldCheck, Calculator, FileCheck,
  MapPin, Map: MapPin, TrendingUp: Building2, LayoutDashboard: Building,
};

const quickLocations = ["Coimbatore", "RS Puram", "Gandhipuram", "Peelamedu", "Saravanampatti"];

const FALLBACK_SLUG = "residential-construction";

/** Section wrapper: numbered heading gives the form a sense of length and place. */
function FormSection({
  step,
  title,
  hint,
  children,
}: {
  step: number;
  title: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4">
      <div className="flex items-baseline gap-3">
        <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-charcoal font-mono text-[11px] font-bold text-white">
          {step}
        </span>
        <div className="min-w-0">
          <h3 className="font-heading text-base font-bold leading-tight text-charcoal">{title}</h3>
          {hint && <p className="mt-0.5 text-xs text-concrete">{hint}</p>}
        </div>
      </div>
      <div className="pl-0 sm:pl-9">{children}</div>
    </section>
  );
}

/** Accessible single-select card group built on real radios (free keyboard nav). */
function OptionCards({
  name,
  legend,
  options,
  value,
  onChange,
}: {
  name: string;
  legend: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <fieldset>
      <legend className="mb-2 text-xs font-bold uppercase tracking-wider text-concrete">
        {legend}
      </legend>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {options.map((opt) => {
          // Driven from state, not peer-checked: the dot is a *descendant* of the
          // input's sibling, which peer-* variants cannot reach.
          const isSelected = value === opt.value;
          return (
            <label key={opt.value} className="relative cursor-pointer">
              <input
                type="radio"
                name={name}
                value={opt.value}
                checked={isSelected}
                onChange={() => onChange(opt.value)}
                className="peer sr-only"
              />
              <span
                className={`flex h-full items-center gap-2.5 rounded-xl border px-3.5 py-3 text-sm transition-all peer-focus-visible:ring-2 peer-focus-visible:ring-gold peer-focus-visible:ring-offset-2 ${
                  isSelected
                    ? "border-gold bg-gold/10 font-bold text-charcoal"
                    : "border-border bg-white/80 font-medium text-concrete hover:border-charcoal/30 hover:bg-white"
                }`}
              >
                <span
                  className={`flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full border transition-colors ${
                    isSelected ? "border-gold bg-white" : "border-border bg-white"
                  }`}
                >
                  <span className={`h-2 w-2 rounded-full transition-colors ${isSelected ? "bg-gold" : "bg-transparent"}`} />
                </span>
                <span className="leading-snug">{opt.label}</span>
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

const inputClass =
  "w-full rounded-xl border border-border bg-white/90 py-3 pl-10 pr-3.5 text-base text-charcoal transition-all placeholder:text-concrete-lighter focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/25 sm:text-sm";

const labelClass = "mb-1.5 block text-xs font-bold uppercase tracking-wider text-concrete";

export default function RequestQuoteClient() {
  const searchParams = useSearchParams();
  const queryService = searchParams.get("service") || FALLBACK_SLUG;

  const currentService = useMemo<Service | undefined>(
    () => services.find((s) => s.slug === queryService),
    [queryService]
  );

  // Always resolves, so every hook below runs on every render regardless of
  // whether the slug is valid — the "not found" return happens after the hooks.
  const spec = useMemo(
    () => serviceQuoteSpecs[queryService] || serviceQuoteSpecs[FALLBACK_SLUG],
    [queryService]
  );

  const [selectedField1, setSelectedField1] = useState<string>(
    () => spec?.formDefaults?.field1Options?.[0]?.value || ""
  );
  const [selectedField2, setSelectedField2] = useState<string>(
    () => spec?.formDefaults?.field2Options?.[0]?.value || ""
  );
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [result, setResult] = useState<ActionResult | null>(null);
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);

  // Reset the option pickers when the visitor switches service mid-session.
  const [prevSlug, setPrevSlug] = useState(queryService);
  if (prevSlug !== queryService) {
    setPrevSlug(queryService);
    setSelectedField1(spec?.formDefaults?.field1Options?.[0]?.value || "");
    setSelectedField2(spec?.formDefaults?.field2Options?.[0]?.value || "");
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!currentService || isUploading) return;

    setStatus("submitting");
    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.append("isEstimate", "true");
    formData.append("serviceSlug", currentService.slug);
    formData.append("serviceTitle", currentService.title);
    formData.append("projectType", spec?.formDefaults?.serviceCategory || "residential");
    if (selectedField1) formData.set("budget", selectedField1);
    if (selectedField2) formData.set("timeline", selectedField2);
    if (attachments.length > 0) {
      formData.append("attachments", JSON.stringify(attachments));
    }

    const res = await submitContactForm(formData);
    setResult(res);
    if (res.success) {
      setStatus("success");
      form.reset();
      setLocation("");
      setAttachments([]);
    } else {
      setStatus("idle");
    }
  };

  if (!currentService) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-[var(--canvas-bg)] px-4">
        <div className="max-w-md rounded-3xl border border-border bg-white p-8 text-center shadow-lg">
          <h1 className="font-heading text-xl font-bold text-charcoal">Service not found</h1>
          <p className="mt-2 text-sm text-concrete">
            We couldn&apos;t find the service you were looking for. Browse our full list to pick the right one.
          </p>
          <Link
            href="/services"
            className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-charcoal px-5 py-3 text-xs font-bold text-white transition-colors hover:bg-black"
          >
            View all services
            <ArrowRight size={14} className="text-gold" />
          </Link>
        </div>
      </div>
    );
  }

  const IconComponent = iconMap[currentService.icon] || Building2;
  const showCalculatorOption = ["residential-construction", "villa-construction", "commercial-construction"].includes(
    currentService.slug
  );
  const field1Label = spec.formDefaults.field1Label.replace(/\s*\*\s*$/, "");
  const field2Label = spec.formDefaults.field2Label.replace(/\s*\*\s*$/, "");
  const selected1 = spec.formDefaults.field1Options.find((o) => o.value === selectedField1);
  const selected2 = spec.formDefaults.field2Options.find((o) => o.value === selectedField2);

  return (
    // overflow-x-clip contains the decorative glows below (they are wider than a phone
    // viewport). `clip` rather than `hidden` so the sticky trust rail keeps working.
    // `relative` makes this the containing block for the decorative glows below, so
    // overflow-x-clip actually contains them (they are wider than a phone viewport).
    // `clip` rather than `hidden` so the sticky trust rail keeps working.
    <div className="relative min-h-screen overflow-x-clip bg-[var(--canvas-bg)] pb-20 pt-10">
      <div className="liquid-glow pointer-events-none" style={{ width: 600, height: 500, top: "2%", left: "8%", opacity: 0.4 }} />
      <div className="liquid-glow pointer-events-none" style={{ width: 500, height: 450, top: "28%", right: "6%", opacity: 0.3 }} />

      <div className="container relative z-10 max-w-6xl px-4 md:px-6">

        {/* ── Header: what this is, and what it costs the visitor ───────── */}
        <header className="mx-auto mb-8 max-w-2xl text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/15 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-gold-dark shadow-xs">
            <Sparkles size={12} className="text-gold" />
            Free Project Quote
          </span>
          <h1 className="font-heading text-3xl font-bold leading-tight tracking-tight text-charcoal md:text-4xl">
            Get a fixed-price quote for
            <br className="hidden sm:block" />{" "}
            <span className="text-gold-dark">{currentService.title}</span>
          </h1>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-concrete">
            Tell us a little about your project and our engineering desk will send you a
            detailed, line-item quotation.
          </p>

          {/* Expectation-setting meta strip — reduces form abandonment */}
          <ul className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-medium text-concrete">
            <li className="flex items-center gap-1.5">
              <Clock size={13} className="text-gold" /> Takes about a minute
            </li>
            <li className="flex items-center gap-1.5">
              <Send size={13} className="text-gold" /> Reply within 24 hours
            </li>
            <li className="flex items-center gap-1.5">
              <ShieldCheck size={13} className="text-gold" /> No obligation
            </li>
          </ul>
        </header>

        {/* ── Main: form first (primary task), trust rail second ────────── */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">

          {/* ── Form ──────────────────────────────────────────────────── */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-border/80 bg-white p-6 shadow-lg md:p-8">
              {status === "success" && result?.success ? (
                <div
                  className="flex flex-col items-center py-10 text-center"
                  role="status"
                  aria-live="polite"
                >
                  <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-200 bg-emerald-50 text-emerald-600">
                    <CheckCircle2 size={32} strokeWidth={2} />
                  </div>
                  <h2 className="font-heading text-2xl font-bold text-charcoal">
                    Quote request received
                  </h2>
                  {result.refCode && (
                    <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-gold/15 px-4 py-1.5 font-mono text-xs font-bold text-gold-dark">
                      Reference: {result.refCode}
                    </div>
                  )}
                  <p className="mt-4 max-w-sm text-sm leading-relaxed text-concrete">
                    Our engineering team is reviewing your requirements for{" "}
                    <strong className="text-charcoal">{currentService.title}</strong> and will
                    reach out within 24 business hours.
                  </p>

                  <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
                    <a
                      href="tel:+919486038761"
                      className="inline-flex items-center gap-2 rounded-2xl bg-charcoal px-5 py-3 text-xs font-bold text-white transition-colors hover:bg-black"
                    >
                      <Phone size={14} className="text-gold" />
                      Call the engineer now
                    </a>
                    <button
                      type="button"
                      onClick={() => { setStatus("idle"); setResult(null); }}
                      className="inline-flex cursor-pointer items-center gap-2 rounded-2xl border border-border bg-white px-5 py-3 text-xs font-bold text-charcoal transition-colors hover:bg-gold/10"
                    >
                      <Repeat2 size={14} />
                      Submit another request
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8" noValidate={false}>
                  {result && !result.success && (
                    <div
                      role="alert"
                      aria-live="assertive"
                      className="rounded-xl border border-red-200 bg-red-50 p-3.5 text-sm font-medium text-red-700"
                    >
                      {result.message}
                    </div>
                  )}

                  <FormSection
                    step={1}
                    title="Your project"
                    hint="Pick the closest match — we'll refine the details on the call."
                  >
                    <div className="space-y-5">
                      <OptionCards
                        name="field1"
                        legend={field1Label}
                        options={spec.formDefaults.field1Options}
                        value={selectedField1}
                        onChange={setSelectedField1}
                      />
                      <OptionCards
                        name="field2"
                        legend={field2Label}
                        options={spec.formDefaults.field2Options}
                        value={selectedField2}
                        onChange={setSelectedField2}
                      />
                    </div>
                  </FormSection>

                  <div className="h-px bg-border/70" />

                  <FormSection step={2} title="How we reach you">
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <label htmlFor="name" className={labelClass}>
                            Your name <span className="text-gold-dark">*</span>
                          </label>
                          <div className="relative">
                            <User size={15} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-concrete-light" />
                            <input
                              type="text"
                              id="name"
                              name="name"
                              required
                              autoComplete="name"
                              aria-invalid={!!result?.errors?.name}
                              className={inputClass}
                              placeholder="Ramesh Kumar"
                            />
                          </div>
                          {result?.errors?.name && (
                            <p className="mt-1.5 text-xs text-red-600">{result.errors.name}</p>
                          )}
                        </div>

                        <div>
                          <label htmlFor="phone" className={labelClass}>
                            Phone number <span className="text-gold-dark">*</span>
                          </label>
                          <div className="relative">
                            <Phone size={15} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-concrete-light" />
                            <input
                              type="tel"
                              id="phone"
                              name="phone"
                              required
                              inputMode="tel"
                              autoComplete="tel"
                              aria-invalid={!!result?.errors?.phone}
                              className={inputClass}
                              placeholder="+91 94860 38761"
                            />
                          </div>
                          {result?.errors?.phone && (
                            <p className="mt-1.5 text-xs text-red-600">{result.errors.phone}</p>
                          )}
                        </div>
                      </div>

                      <div>
                        <label htmlFor="email" className={labelClass}>
                          Email <span className="font-normal normal-case tracking-normal text-concrete-light">(optional)</span>
                        </label>
                        <div className="relative">
                          <Mail size={15} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-concrete-light" />
                          <input
                            type="email"
                            id="email"
                            name="email"
                            autoComplete="email"
                            className={inputClass}
                            placeholder="you@example.com"
                          />
                        </div>
                      </div>

                      {/* Location gets its own row so the quick-picks don't skew the grid */}
                      <div>
                        <label htmlFor="location" className={labelClass}>
                          Project location <span className="text-gold-dark">*</span>
                        </label>
                        <div className="relative">
                          <MapPin size={15} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-concrete-light" />
                          <input
                            type="text"
                            id="location"
                            name="location"
                            required
                            autoComplete="address-level2"
                            aria-invalid={!!result?.errors?.location}
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className={inputClass}
                            placeholder="RS Puram, Coimbatore"
                          />
                        </div>
                        <div className="mt-2 flex flex-wrap items-center gap-1.5">
                          {quickLocations.map((loc) => (
                            <button
                              key={loc}
                              type="button"
                              onClick={() => setLocation(loc)}
                              aria-pressed={location === loc}
                              className={`cursor-pointer rounded-lg border px-2.5 py-1 text-xs transition-all ${
                                location === loc
                                  ? "border-gold bg-gold/15 font-bold text-charcoal"
                                  : "border-border bg-white text-concrete hover:border-charcoal/30 hover:text-charcoal"
                              }`}
                            >
                              {loc}
                            </button>
                          ))}
                        </div>
                        {result?.errors?.location && (
                          <p className="mt-1.5 text-xs text-red-600">{result.errors.location}</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="message" className={labelClass}>
                          Notes &amp; dimensions{" "}
                          <span className="font-normal normal-case tracking-normal text-concrete-light">(optional)</span>
                        </label>
                        <div className="relative">
                          <MessageSquare size={15} className="pointer-events-none absolute left-3.5 top-3.5 text-concrete-light" />
                          <textarea
                            id="message"
                            name="message"
                            rows={3}
                            className={`${inputClass} resize-y py-3 leading-relaxed`}
                            placeholder={spec.formDefaults.placeholder}
                          />
                        </div>
                      </div>
                    </div>
                  </FormSection>

                  {/* Recap of choices — confirms what's being sent before commit */}
                  <div className="rounded-2xl border border-border/70 bg-linen/50 p-4">
                    <span className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-concrete">
                      Your request
                    </span>
                    <div className="flex flex-wrap gap-x-2 gap-y-1.5 text-xs text-charcoal">
                      <span className="rounded-lg bg-white px-2.5 py-1 font-semibold shadow-xs">
                        {currentService.title}
                      </span>
                      {selected1 && (
                        <span className="rounded-lg bg-white px-2.5 py-1 font-semibold shadow-xs">
                          {selected1.label}
                        </span>
                      )}
                      {selected2 && (
                        <span className="rounded-lg bg-white px-2.5 py-1 font-semibold shadow-xs">
                          {selected2.label}
                        </span>
                      )}
                    </div>
                  </div>

                  <ImageUpload
                    value={attachments}
                    onChange={setAttachments}
                    onUploadingChange={setIsUploading}
                    formType="Request Quote"
                    label="Attach Plans or Site Photos"
                    hint="Plans, sketches or site photos"
                    compact
                  />

                  <div>
                    <button
                      type="submit"
                      disabled={status === "submitting" || isUploading}
                      className="group flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-2xl bg-charcoal px-6 py-4 font-heading text-sm font-bold tracking-wide text-white shadow-xl transition-all hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {status === "submitting" ? (
                        <>
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                          Sending your request…
                        </>
                      ) : (
                        <>
                          Request my free quote
                          <Send size={15} className="text-gold transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </button>

                    <div className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[11px] text-concrete">
                      <span className="flex items-center gap-1">
                        <Check size={12} className="text-emerald-600" /> Confidential
                      </span>
                      <span className="flex items-center gap-1">
                        <Check size={12} className="text-emerald-600" /> Line-item BoQ
                      </span>
                      <span className="flex items-center gap-1">
                        <Check size={12} className="text-emerald-600" /> Zero obligation
                      </span>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* ── Trust rail ────────────────────────────────────────────── */}
          <aside className="lg:col-span-5">
            <div className="space-y-4 lg:sticky lg:top-28">

              {/* Service identity */}
              <div className="rounded-3xl border border-border/80 bg-white p-6 shadow-sm">
                <div className="flex items-start gap-3.5">
                  <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl border border-gold/30 bg-gold/15 text-gold-dark">
                    <IconComponent size={24} strokeWidth={1.75} />
                  </span>
                  <div className="min-w-0">
                    <span className="block text-[10px] font-bold uppercase tracking-widest text-gold-dark">
                      {spec.badge}
                    </span>
                    <h2 className="font-heading text-lg font-bold leading-tight text-charcoal">
                      {currentService.title}
                    </h2>
                  </div>
                </div>

                <p className="mt-3.5 text-sm leading-relaxed text-concrete">{spec.tagline}</p>

                <Link
                  href="/services"
                  className="mt-4 inline-flex items-center gap-1.5 rounded-xl border border-border bg-white px-3 py-2 text-xs font-bold text-charcoal transition-colors hover:bg-gold/10"
                >
                  <Repeat2 size={13} className="text-gold-dark" />
                  Change service
                </Link>
              </div>

              {/* Assurances */}
              <div className="divide-y divide-border/60 rounded-3xl border border-border/80 bg-white shadow-sm">
                {[
                  { icon: Clock, title: spec.sla, sub: spec.slaLabel },
                  { icon: Award, title: spec.credentialBadge, sub: spec.credentialLabel },
                  { icon: ShieldCheck, title: spec.guarantee.title, sub: spec.guarantee.body },
                ].map(({ icon: Icon, title, sub }) => (
                  <div key={title} className="flex items-start gap-3 p-4">
                    <Icon size={17} className="mt-0.5 flex-shrink-0 text-gold" />
                    <div className="min-w-0">
                      <span className="block text-sm font-bold leading-snug text-charcoal">{title}</span>
                      <span className="block text-xs leading-snug text-concrete">{sub}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Deliverables */}
              <div className="rounded-3xl border border-border/80 bg-white p-6 shadow-sm">
                <h3 className="mb-3 flex items-center gap-2 font-heading text-sm font-bold text-charcoal">
                  <CheckCircle2 size={15} className="text-gold" />
                  {spec.deliverablesHeading}
                </h3>
                <ul className="space-y-2.5">
                  {spec.deliverables.slice(0, 4).map((item) => (
                    <li key={item.title} className="flex items-start gap-2.5">
                      <Check size={14} className="mt-0.5 flex-shrink-0 text-emerald-600" strokeWidth={2.5} />
                      <span className="text-xs leading-snug text-concrete">
                        <strong className="text-charcoal">{item.title}</strong> — {item.desc}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Direct line */}
              <div className="rounded-3xl border border-charcoal/10 bg-charcoal p-5 text-center text-white">
                <p className="text-xs text-white/60">Prefer to talk it through?</p>
                <a
                  href="tel:+919486038761"
                  className="mt-1 inline-flex items-center gap-2 font-heading text-lg font-bold text-white transition-colors hover:text-gold-light"
                >
                  <Phone size={16} className="text-gold" />
                  +91 94860 38761
                </a>
                <p className="mt-1 text-[11px] text-white/50">Mon–Sat, 9am – 7pm</p>
              </div>
            </div>
          </aside>
        </div>

        {/* ── What happens next: sets expectations after submitting ─────── */}
        <section className="mx-auto mt-12 max-w-4xl">
          <h2 className="mb-6 text-center font-heading text-xl font-bold text-charcoal md:text-2xl">
            What happens after you submit
          </h2>
          <ol className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {spec.steps.map((s) => (
              <li
                key={s.n}
                className="rounded-3xl border border-border/80 bg-white p-5 shadow-sm"
              >
                <span className="font-mono text-2xl font-bold text-gold/40">{s.n}</span>
                <h3 className="mt-1.5 font-heading text-sm font-bold leading-snug text-charcoal">
                  {s.title}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-concrete">{s.body}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* ── Optional ballpark calculator ──────────────────────────────── */}
        {showCalculatorOption && (
          <section className="mx-auto mt-10 max-w-4xl text-center">
            <button
              type="button"
              onClick={() => setShowCalculator(!showCalculator)}
              aria-expanded={showCalculator}
              className="inline-flex cursor-pointer items-center gap-2 rounded-2xl border border-border bg-white px-5 py-3 text-xs font-bold text-charcoal shadow-sm transition-all hover:bg-gold/10"
            >
              <Calculator size={14} className="text-gold" />
              {showCalculator ? "Hide ballpark calculator" : "Want instant ballpark pricing?"}
              <ChevronDown size={14} className={`transition-transform duration-200 ${showCalculator ? "rotate-180" : ""}`} />
            </button>

            {showCalculator && (
              <div className="animate-fadeIn mt-5 rounded-3xl border border-border/80 bg-white p-6 text-left shadow-md md:p-8">
                <div className="mb-6 text-center">
                  <h3 className="font-heading text-lg font-bold text-charcoal md:text-xl">
                    Ballpark estimator for {currentService.title}
                  </h3>
                  <p className="mx-auto mt-1 max-w-lg text-xs text-concrete">
                    Indicative only — your formal quote will be itemised to your exact specification.
                  </p>
                </div>
                <CostCalculator
                  defaultType={
                    currentService.slug === "villa-construction"
                      ? "villa"
                      : currentService.slug === "commercial-construction"
                      ? "commercial"
                      : "residential"
                  }
                />
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
}
