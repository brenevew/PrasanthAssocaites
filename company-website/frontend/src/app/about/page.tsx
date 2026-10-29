import { Metadata } from "next";
import SectionHeading from "@/components/ui/SectionHeading";
import CTABanner from "@/components/ui/CTABanner";
import ScrollReveal from "@/components/ui/ScrollReveal";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import Button from "@/components/ui/Button";
import { company } from "@/data/company";
import { qualityCapabilities } from "@/data/quality";
import { ShieldCheck, ArrowRight, Upload, Compass, Send, CheckCircle2, Clock } from "lucide-react";
import Link from "next/link";
import { SITE_URL, pageOpenGraph } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: "About Prasanth Associates | Builders, Coimbatore & Nilgiris" },
  description:
    "Prasanth Associates is a construction and design firm run by engineers, with offices in Coimbatore and Gudalur, The Nilgiris. See how we work.",
  keywords: [
    "Prasanth Associates Coimbatore",
    "civil engineers in Coimbatore",
    "construction and architecture firm Coimbatore",
    "builders in Gandhipuram Coimbatore",
  ],
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
  openGraph: pageOpenGraph(
    "/about",
    "About Us, Engineers & Builders in Coimbatore | Prasanth Associates",
    "Prasanth Associates is a construction and design firm run by engineers, with offices in Coimbatore and Gudalur, The Nilgiris. See how we work."
  ),
};

const howItWorksSteps = [
  {
    number: "01",
    title: "Submit Requirements & Rough Plans",
    description:
      "Provide your plot measurements, preferred configuration (1BHK–Custom), and functional requirements. If you already have a hand-drawn sketch, floor plan photo, or inspiration image, upload it directly, a rough sketch is perfectly fine.",
    icon: Upload,
    highlights: [
      "Drag-and-drop sketch upload (JPG, PNG, PDF, HEIC)",
      "Simple, non-technical spatial inputs",
      "No automated price pressure",
    ],
  },
  {
    number: "02",
    title: "Architect Review",
    description:
      "Our in-house architectural team conducts a thorough feasibility assessment analyzing plot dimensions, Vastu alignment, setback implications, natural lighting opportunities, and structural complexity before preparing your project-specific quotation.",
    icon: Compass,
    highlights: [
      "Human architectural expertise on every project",
      "Custom fixed design fee calculation",
      "Detailed structural feasibility assessment",
    ],
  },
  {
    number: "03",
    title: "Design Delivery & Project Confirmation",
    description:
      "We usually reply within 24 hours. You then receive your project quotation and design brief by email, and once you confirm, our design team prepares your 2D CAD floor plans and 3D views.",
    icon: Send,
    highlights: [
      "Direct email delivery to your inbox",
      "Line-item transparent design scope",
      "Plans and 3D views prepared in-house",
    ],
  },
];

export default function AboutPage() {
  return (
    <>
      {/* ── Hero Banner   ──────────────────────────────────────────────── */}
      <section className="relative pt-28 pb-16 bg-gradient-to-b from-[#FAF8F5] to-[var(--canvas-bg)] text-charcoal border-b border-border overflow-hidden">
        {/* Blueprint grid */}
        <div className="absolute inset-0 blueprint-grid opacity-10" />
        {/* Ambient glow */}
        <div
          className="liquid-glow"
          style={{ width: 500, height: 400, top: -80, left: "40%", opacity: 0.3 }}
        />
        {/* Gold top accent */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />

        <div className="container relative z-10 text-center max-w-3xl">
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 text-[0.7rem] font-bold tracking-[0.22em] uppercase text-gold-dark nm-raised border border-border px-4 py-1.5 rounded-full shadow-2xs mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-dark" />
              Offices in Coimbatore &amp; Gudalur
            </span>
            <h1
              className="font-heading font-bold text-charcoal mb-6 leading-tight"
              style={{ fontSize: "var(--text-h1)" }}
            >
              Engineers &amp; Builders for
              <br />{" "}
              <em className="text-gold-dark not-italic">Coimbatore &amp; the Nilgiris</em>
            </h1>
            <p className="text-base md:text-lg text-concrete leading-relaxed max-w-xl mx-auto">
              A construction and design firm with a head office in Gandhipuram, Coimbatore and a
              branch in Gudalur, The Nilgiris. We have built 100+ homes, as well as a school block,
              a hotel building and estate bungalows.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Brand Story ──────────────────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container">
          <ScrollReveal className="max-w-3xl mx-auto text-center">
            <span className="badge-gold mb-5 inline-flex">
              <span className="w-1 h-1 rounded-full bg-gold inline-block" />
              Who We Are
            </span>
            <h2
              className="font-heading font-bold text-charcoal mb-6 leading-tight"
              style={{ fontSize: "var(--text-h2)" }}
            >
              Two offices,{" "}
              <em className="text-gold not-italic">one design and build team</em>
            </h2>
            <div className="space-y-4 text-concrete text-sm md:text-base leading-relaxed mb-7">
              <p>
                Prasanth Associates designs and builds houses, villas and commercial buildings,
                and prepares the drawings, estimates and valuations that go with them. Architects
                and engineers work in the same team, so the plans, the BoQ and the site work are
                prepared together.
              </p>
              <p>
                Our <Link href="/locations/gudalur" className="text-gold-dark underline underline-offset-2">Gudalur branch</Link> on
                Ooty Main Road works across{" "}
                <Link href="/locations/nilgiris-ooty" className="text-gold-dark underline underline-offset-2">the Nilgiris</Link>,
                where we have built in Gudalur, Ooty, Coonoor and Kotagiri. Our{" "}
                <Link href="/locations/coimbatore" className="text-gold-dark underline underline-offset-2">Coimbatore head office</Link>{" "}
                in Gandhipuram serves Coimbatore district, including our work in Gandhipuram and Perur.
              </p>
              <p>
                Our projects include the{" "}
                <Link href="/projects/pricol" className="text-gold-dark underline underline-offset-2">Pricol Limited tea bungalow</Link>{" "}
                in Gudalur (12,120 sq. ft., 2015–2017), whose access route crossed a river;{" "}
                <Link href="/projects/sasthapuri" className="text-gold-dark underline underline-offset-2">Sasthapuri Hotels</Link>,
                a 38,879 sq. ft. commercial building in Gudalur town (2014–2016); and a 12,000 sq. ft.
                block for{" "}
                <Link href="/projects/rex-school" className="text-gold-dark underline underline-offset-2">Christus Rex Higher Secondary School</Link>{" "}
                in Ooty (2018–2019).
              </p>
              <p>
                Every quote is an itemised Bill of Quantities, and the price is fixed for the
                agreed scope. Our clients rate us 4.9★ across 65 Google reviews.
              </p>
            </div>
            <Button href="/contact" variant="primary" size="md">
              Talk to Our Team
              <ArrowRight size={16} />
            </Button>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────────────────────── */}
      <section className="py-14 bg-linen border-y border-border relative overflow-hidden">
        <div className="absolute inset-0 blueprint-grid opacity-10" />
        <div
          className="liquid-glow"
          style={{ width: 500, height: 300, top: -50, left: "30%", opacity: 0.2 }}
        />
        <div className="container relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x-0 md:divide-x divide-slate-300/60">
            {company.stats.map((stat, index) => (
              <div key={stat.label} className="px-4 text-center">
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  label={stat.label}
                  duration={2500 + index * 200}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works / Architectural Review & Delivery Process ──── */}
      <section id="how-it-works" className="py-16 md:py-20 bg-[var(--canvas-bg)] relative overflow-hidden scroll-mt-24">
        {/* Ambient liquid glow */}
        <div className="liquid-glow" style={{ width: 550, height: 450, top: "15%", right: "-10%", opacity: 0.3 }} />
        <div className="liquid-glow" style={{ width: 500, height: 400, bottom: "10%", left: "-5%", opacity: 0.25 }} />

        <div className="container max-w-6xl relative z-10">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="badge-gold mb-3 inline-flex">
                <Clock size={12} className="text-gold" />
                Considered Design &amp; Delivery Process
              </span>
              <h2
                className="font-heading font-bold text-charcoal leading-tight"
                style={{ fontSize: "var(--text-h2)" }}
              >
                How We Deliver <em className="text-gold not-italic">Your Project</em>
              </h2>
              <p className="text-concrete text-xs md:text-sm leading-relaxed mt-2.5">
                How a design project runs, from your first sketch to plans and 3D views. Our team
                reviews every request; nothing is priced automatically.
              </p>
            </div>
          </ScrollReveal>

          {/* 3 Step Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {howItWorksSteps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <ScrollReveal key={step.number} delay={idx * 120}>
                  <div className="neu-glass rounded-3xl p-8 h-full flex flex-col justify-between border border-white/90 relative overflow-hidden group hover:-translate-y-1.5 transition-all duration-300">
                    <div>
                      {/* Top Row: Number & Icon */}
                      <div className="flex items-center justify-between mb-6">
                        <span className="text-4xl md:text-5xl font-heading font-bold text-concrete-lighter/40 group-hover:text-gold/50 transition-colors leading-none">
                          {step.number}
                        </span>
                        <div className="w-12 h-12 rounded-2xl nm-inset text-charcoal group-hover:text-gold-dark flex items-center justify-center flex-shrink-0 transition-colors">
                          <Icon size={22} strokeWidth={1.75} />
                        </div>
                      </div>

                      {/* Step Title */}
                      <h3 className="text-xl font-heading font-bold text-charcoal mb-3 leading-snug group-hover:text-gold-dark transition-colors">
                        {step.title}
                      </h3>

                      {/* Description */}
                      <p className="text-concrete text-xs md:text-sm leading-relaxed mb-6">
                        {step.description}
                      </p>
                    </div>

                    {/* Highlights */}
                    <div className="pt-4 border-t border-border/60 mt-auto">
                      <ul className="space-y-2">
                        {step.highlights.map((h) => (
                          <li key={h} className="flex items-start gap-2 text-xs text-charcoal font-medium">
                            <CheckCircle2 size={14} className="text-gold flex-shrink-0 mt-0.5" />
                            <span className="leading-snug">{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

          {/* Quick Action Box */}
          <div className="mt-14">
            <ScrollReveal>
              <div className="neu-glass rounded-3xl p-8 md:p-10 max-w-3xl mx-auto text-center border border-white/90 shadow-sm relative overflow-hidden">
                <div className="w-12 h-12 rounded-2xl bg-gold/15 text-gold-dark flex items-center justify-center mx-auto mb-3 border border-gold/30">
                  <ShieldCheck size={24} strokeWidth={1.75} />
                </div>
                <h3 className="font-heading text-xl md:text-2xl font-bold text-charcoal mb-2">
                  Ready to start your building journey?
                </h3>
                <p className="text-concrete text-xs md:text-sm max-w-lg mx-auto leading-relaxed mb-6">
                  Submit your plot measurements, design preferences, or rough sketch. Our architectural team usually reviews it within 24 hours.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <Button href="/plan-home" variant="secondary" size="md" className="nm-gold-raised">
                    <span>Plan in Building Studio</span>
                    <ArrowRight size={15} />
                  </Button>

                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Engineering Capabilities ─────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-linen border-b border-border">
        <div className="container max-w-6xl">
          <ScrollReveal>
            <SectionHeading
              badge="Engineering Checks"
              title="What We Plan For on Site"
              subtitle="The checks below are planned to suit each building's type and scale. Your BoQ lists the ones that apply to your project."
            />
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">
            {qualityCapabilities.map((capability, index) => (
              <ScrollReveal key={capability.title} delay={index * 90}>
                <div className="glass-card p-7 rounded-2xl h-full flex flex-col gap-5">
                  <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <ShieldCheck size={22} className="text-gold-dark" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-base font-heading font-bold text-charcoal">
                    {capability.title}
                  </h3>
                  <p className="text-concrete text-sm leading-relaxed flex-1">
                    {capability.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        headline="Ready to discuss your project?"
        subtitle="Schedule a consultation with our engineering and architectural team. No pressure, just clarity."
      />
    </>
  );
}
