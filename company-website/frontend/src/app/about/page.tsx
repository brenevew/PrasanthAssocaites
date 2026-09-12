import Image from "next/image";
import { Metadata } from "next";
import SectionHeading from "@/components/ui/SectionHeading";
import CTABanner from "@/components/ui/CTABanner";
import ScrollReveal from "@/components/ui/ScrollReveal";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import Button from "@/components/ui/Button";
import { company } from "@/data/company";
import { qualityCapabilities } from "@/data/quality";
import { ShieldCheck, ArrowRight, Upload, Compass, Send, CheckCircle2, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | Philosophy, Track Record & Architectural Process",
  description:
    "Learn about Prasanth Associates, our engineering philosophy, our rigorous 3-step design process, and our commitment to building generational structures.",
};

const howItWorksSteps = [
  {
    number: "01",
    title: "Submit Requirements & Rough Plans",
    description:
      "Provide your plot measurements, preferred configuration (1BHK–Custom), and functional requirements. If you already have a hand-drawn sketch, floor plan photo, or inspiration image, upload it directly — a rough sketch is perfectly fine.",
    icon: Upload,
    highlights: [
      "Drag-and-drop sketch upload (JPG, PNG, PDF, HEIC)",
      "Simple, non-technical spatial inputs",
      "No automated price pressure",
    ],
  },
  {
    number: "02",
    title: "24-Hour Architect Review",
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
      "Within 24 hours, you receive your formal project quotation and design brief via email. Once confirmed, our principal architects proceed with your complete 2D CAD floor plans and 3D visualization assets.",
    icon: Send,
    highlights: [
      "Direct email delivery to your inbox",
      "Line-item transparent design scope",
      "Dedicated lead architect assignment",
    ],
  },
];

export default function AboutPage() {
  return (
    <>
      {/* ── Hero Banner ──────────────────────────────────────────────── */}
      <section className="relative pt-36 pb-24 bg-gradient-to-b from-[#FAF8F5] to-[var(--canvas-bg)] text-charcoal border-b border-border overflow-hidden">
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
            <span className="inline-flex items-center gap-2 text-[0.7rem] font-bold tracking-[0.22em] uppercase text-gold-dark nm-raised border border-border px-4 py-1.5 rounded-full shadow-2xs mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-dark" />
              Established &amp; Trusted
            </span>
            <h1
              className="font-heading font-bold text-charcoal mb-6 leading-tight"
              style={{ fontSize: "var(--text-h1)" }}
            >
              Building Beyond
              <br />
              <em className="text-gold-dark not-italic">The Surface</em>
            </h1>
            <p className="text-base md:text-lg text-concrete leading-relaxed max-w-xl mx-auto">
              An engineering-driven construction and design firm dedicated to creating structures
              that stand the test of time through rigorous quality control and precise execution.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Brand Story ──────────────────────────────────────────────── */}
      <section className="section bg-background">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-24 items-center">
            {/* Image */}
            <ScrollReveal className="relative">
              <div className="relative aspect-[4/5] w-full max-w-md mx-auto lg:max-w-none">
                <div className="absolute inset-0 bg-gradient-to-br from-charcoal to-charcoal-mid translate-x-4 translate-y-4 rounded-3xl z-0" />
                <Image
                  src="/images/projects/heritage-house.png"
                  alt="Architectural construction details"
                  fill
                  className="object-cover z-10 rounded-3xl border border-border"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                {/* Floating years badge */}
                <div className="absolute -top-4 -left-4 z-20 glass-panel rounded-2xl px-5 py-4">
                  <p className="text-3xl font-heading font-bold text-charcoal leading-none">
                    {new Date().getFullYear() - 2010}+
                  </p>
                  <p className="text-xs text-concrete mt-1 font-medium">Years of Excellence</p>
                </div>
              </div>
            </ScrollReveal>

            {/* Text */}
            <ScrollReveal delay={150}>
              <span className="badge-gold mb-6 inline-flex">
                <span className="w-1 h-1 rounded-full bg-gold inline-block" />
                Our Philosophy
              </span>
              <h2
                className="font-heading font-bold text-charcoal mb-7 leading-tight"
                style={{ fontSize: "var(--text-h2)" }}
              >
                Engineering is
                <br />
                a{" "}
                <em className="text-gold not-italic">human responsibility</em>
              </h2>
              <div className="space-y-5 text-concrete text-sm md:text-base leading-relaxed mb-8">
                <p>
                  In an industry often marked by project delays, hidden costs, and compromised
                  quality, Prasanth Associates was established with a singular focus: making
                  construction professional, transparent, and strictly engineering-led.
                </p>
                <p>
                  We don&apos;t act merely as builders, but as long-term construction partners.
                  From structural soil analysis to final handovers, every decision is guided by
                  structural safety, aesthetic clarity, and lasting value.
                </p>
                <p>
                  Our team combines architects, structural engineers, and project managers under
                  one roof, serving residential, villa, commercial, and industrial clients with
                  consistent technical oversight.
                </p>
              </div>
              <Button href="/contact" variant="primary" size="md">
                Talk to Our Team
                <ArrowRight size={16} />
              </Button>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────────────────────── */}
      <section className="py-20 bg-linen border-y border-border relative overflow-hidden">
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
      <section id="how-it-works" className="section bg-[var(--canvas-bg)] relative overflow-hidden scroll-mt-24">
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
                &quot;Your building deserves a considered engineering design, not an automated estimate.&quot;
                Discover our rigorous 3-step architectural review and delivery process.
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
                  Submit your plot measurements, design preferences, or rough sketch. Our architectural team reviews every input within 24 hours.
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
      <section className="section bg-linen border-b border-border">
        <div className="container max-w-6xl">
          <ScrollReveal>
            <SectionHeading
              badge="Engineering Rigour"
              title="Built On Technical Excellence"
              subtitle="Beautiful design requires an unyielding structural foundation. We enforce strict engineering checks across every stage."
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
