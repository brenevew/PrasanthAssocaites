import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { company } from "@/data/company";
import { projects } from "@/data/projects";
import { differentiators } from "@/data/quality";
import { testimonials } from "@/data/testimonials";

import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ProjectCard from "@/components/ui/ProjectCard";
import TestimonialCard from "@/components/ui/TestimonialCard";
import CTABanner from "@/components/ui/CTABanner";
import { CheckCircle2, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Leading Construction Company in Coimbatore & Turnkey Builders | Prasanth Associates",
  description:
    "Prasanth Associates — #1 construction company in Coimbatore, Tamil Nadu. 15+ years, 250+ projects, 2M+ sq. ft. built. Residential, commercial & turnkey construction with fixed BoQ. Get a free quote today.",
  keywords: [
    "construction company in Coimbatore",
    "building contractors Coimbatore",
    "builders in Coimbatore",
    "house construction Coimbatore",
    "turnkey construction company Coimbatore",
    "civil contractors Tamil Nadu",
    "best construction company Coimbatore",
    "construction company near me Coimbatore",
  ],
  alternates: {
    canonical: "https://prasanthassociates.com/",
  },
  openGraph: {
    title: "Leading Construction Company in Coimbatore | Prasanth Associates",
    description:
      "15+ years of trusted civil construction in Coimbatore & Tamil Nadu. Houses, villas, commercial spaces & turnkey projects. Fixed BoQ, no hidden costs.",
    url: "https://prasanthassociates.com/",
    type: "website",
  },
};

export default function Home() {
  const featuredProjects = projects.slice(0, 3);

  return (
    <>
      {/* ── 1. Hero ─────────────────────────────────────────────────── */}
      <section className="relative min-h-[95vh] flex items-center mt-[-104px] overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero/hero-main.png"
            alt="Prasanth Associates — premium construction and architecture"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[rgba(247,245,240,0.95)] via-[rgba(247,245,240,0.85)] to-[rgba(247,245,240,0.45)]" />
          {/* Bottom fade into Neu-Glass canvas */}
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[var(--canvas-bg)] to-transparent" />
        </div>

        {/* Liquid Orbs for Frosted Depth */}
        <div className="liquid-glow" style={{ width: 600, height: 600, top: "15%", left: "-10%", opacity: 0.4 }} />
        <div className="liquid-glow" style={{ width: 450, height: 450, bottom: "5%", right: "10%", opacity: 0.25 }} />

        <div className="container relative z-10 pt-32 pb-16">
          <div className="max-w-2xl">
            {/* Eyebrow */}
            <ScrollReveal>
              <span className="nm-raised text-gold-dark px-4.5 py-1.5 rounded-full mb-7 inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase border border-border backdrop-blur-md shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-dark inline-block" />
                Tamil Nadu&apos;s Premium Construction &amp; Design Firm
              </span>
            </ScrollReveal>

            {/* Headline */}
            <ScrollReveal delay={80}>
              <h1
                className="font-heading font-bold text-charcoal leading-[1.08] mb-7"
                style={{ fontSize: "var(--text-display)" }}
              >
                {company.tagline}

              </h1>
            </ScrollReveal>

            {/* Subtext */}
            <ScrollReveal delay={160}>
              <p className="text-lg md:text-xl text-concrete mb-10 leading-relaxed max-w-xl">
                {company.description}
              </p>
            </ScrollReveal>

            {/* CTAs */}
            <ScrollReveal delay={240} className="flex flex-col sm:flex-row gap-4">
              <Button href="/plan-home" variant="primary" size="lg">
                Start Planning
                <ArrowRight size={16} />
              </Button>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── 2. Stats Strip ──────────────────────────────────────────── */}
      <section className="py-12 bg-[var(--canvas-bg)] relative overflow-hidden">
        {/* Ambient liquid glow orbs refracting through frosted neu-glass */}
        <div className="liquid-glow" style={{ width: 450, height: 350, top: "-30%", left: "15%", opacity: 0.5 }} />
        <div className="liquid-glow" style={{ width: 400, height: 300, top: "-20%", right: "10%", opacity: 0.35 }} />

        <div className="container relative z-10">
          <ScrollReveal>
            <div className="neu-glass-panel rounded-3xl p-8 md:p-12">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6 md:divide-x divide-border/60">
                {company.stats.map((stat, index) => (
                  <div key={stat.label} className="px-4 text-center first:pl-0 last:pr-0">
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
          </ScrollReveal>
        </div>
      </section>

      {/* ── 3. Brand Story ──────────────────────────────────────────── */}
      <section className="section bg-[var(--canvas-bg)] relative overflow-hidden">
        <div className="liquid-glow" style={{ width: 500, height: 500, top: "20%", right: "-5%", opacity: 0.3 }} />
        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-24 items-center">
            {/* Image block */}
            <ScrollReveal className="relative order-2 lg:order-1">
              <div className="relative aspect-[4/5] w-full max-w-md mx-auto lg:max-w-none">
                {/* Neu-Glass shadow back-drop */}
                <div className="absolute inset-0 nm-dark-raised translate-x-4 translate-y-4 rounded-3xl z-0" />
                <Image
                  src="/images/projects/lakeside-interior.png"
                  alt="Premium construction craftsmanship"
                  fill
                  className="object-cover z-10 rounded-3xl border border-white/60 shadow-xl"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                {/* Floating Neu-Glass badge */}
                <div className="absolute -bottom-5 -right-5 z-20 neu-glass rounded-2xl px-5 py-4">
                  <p className="text-xs text-concrete font-medium mb-0.5">Trust Score</p>
                  <p className="text-2xl font-heading font-bold text-charcoal">4.9 ★</p>
                  <p className="text-[10px] text-concrete-light">From 200+ clients</p>
                </div>
              </div>
            </ScrollReveal>

            {/* Text block */}
            <ScrollReveal delay={150} className="order-1 lg:order-2">
              <span className="badge-gold mb-6 inline-flex">
                <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block" />
                About Us
              </span>
              <h2
                className="font-heading font-bold text-charcoal mb-7 leading-tight"
                style={{ fontSize: "var(--text-h2)" }}
              >
                We don&apos;t just construct
                <br />
                <em className="text-gold not-italic">buildings.</em> We build
                <br />
                lasting value.
              </h2>
              <div className="space-y-5 text-concrete leading-relaxed mb-8">
                <p>
                  At Prasanth Associates, exceptional construction is the result of rigorous
                  engineering, precise project management, and uncompromising quality control.
                </p>
                <p>
                  Whether it&apos;s a luxury villa or a commercial complex, our approach remains
                  the same — complete transparency from day one, premium materials, and a
                  commitment to timelines others consider impossible.
                </p>
              </div>
              <ul className="space-y-3 mb-10">
                {[
                  "100% Transparent Cost Estimation",
                  "In-house Architectural & Engineering Team",
                  "Strict Timeline Adherence",
                  "Comprehensive Post-Handover Warranty",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-charcoal font-semibold text-sm">
                    <span className="w-6 h-6 rounded-full nm-inset-sm flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 size={13} className="text-gold-dark" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <Button href="/about" variant="primary" size="md">
                Discover Our Story
                <ArrowRight size={16} />
              </Button>
            </ScrollReveal>
          </div>
        </div>
      </section>


      {/* ── 5. Featured Projects ─────────────────────────────────────── */}
      <section className="section bg-linen text-charcoal relative overflow-hidden border-y border-border">
        {/* Blueprint grid + liquid glow */}
        <div className="absolute inset-0 blueprint-grid opacity-10" />
        <div className="liquid-glow" style={{ width: 650, height: 450, top: "10%", left: "-5%", opacity: 0.25 }} />
        <div className="container relative z-10">
          <ScrollReveal>
            <SectionHeading
              badge="Portfolio"
              title="Selected Projects"
              subtitle="A curated selection of our finest residential and commercial work, demonstrating our commitment to quality and architectural excellence."
            />
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {featuredProjects.map((project, index) => (
              <ScrollReveal key={project.slug} delay={index * 130}>
                <ProjectCard project={project} />
              </ScrollReveal>
            ))}
          </div>

          <div className="mt-16 text-center">
            <ScrollReveal delay={350}>
              <Button href="/projects" variant="gold" size="lg">
                Explore All Projects
                <ArrowRight size={16} />
              </Button>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── 6. Why Choose Us ────────────────────────────────────────── */}
      <section className="section bg-[var(--canvas-bg)] relative overflow-hidden">
        <div className="liquid-glow" style={{ width: 450, height: 450, bottom: "10%", right: "10%", opacity: 0.3 }} />
        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-14 lg:gap-12">
            {/* Sticky sidebar */}
            <div className="lg:col-span-2">
              <ScrollReveal>
                <div className="lg:sticky top-32 space-y-6">
                  <h2
                    className="font-heading font-bold text-charcoal leading-tight"
                    style={{ fontSize: "var(--text-h2)" }}
                  >
                    Engineering First.
                    <br />
                    <em className="text-gold not-italic">Quality</em> Always.
                  </h2>
                  <div className="gold-line" />
                  <p className="text-concrete leading-relaxed">
                    We don&apos;t just promise quality; we engineer it into every phase of
                    construction. Here&apos;s why homeowners and developers trust us with
                    their most valuable assets.
                  </p>
                </div>
              </ScrollReveal>
            </div>

            {/* Cards grid — Frosted Neu-Glass Cards */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {differentiators.map((diff, index) => (
                  <ScrollReveal key={diff.title} delay={index * 80}>
                    <div className="neu-glass p-6.5 rounded-3xl h-full flex flex-col gap-4">
                      {/* Sunken Socket for checkmark */}
                      <div className="w-11 h-11 rounded-2xl nm-inset flex items-center justify-center flex-shrink-0">
                        <span className="text-gold-dark text-base font-bold">✓</span>
                      </div>
                      <h3 className="text-base font-heading font-bold text-charcoal">
                        {diff.title}
                      </h3>
                      <p className="text-concrete text-sm leading-relaxed flex-1">
                        {diff.description}
                      </p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. Testimonials ─────────────────────────────────────────── */}
      <section className="section bg-[var(--canvas-bg)] border-y border-border/70 relative overflow-hidden">
        <div className="liquid-glow" style={{ width: 500, height: 400, top: "20%", left: "30%", opacity: 0.25 }} />
        <div className="container relative z-10">
          <ScrollReveal>
            <SectionHeading
              badge="Client Voices"
              title="Trusted by Homeowners & Businesses"
              subtitle="Real words from real clients across Coimbatore, Tiruppur and beyond."
            />
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.slice(0, 3).map((testimonial, index) => (
              <ScrollReveal key={testimonial.name} delay={index * 120} className="h-full">
                <TestimonialCard testimonial={testimonial} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. CTA Banner ───────────────────────────────────────────── */}
      <CTABanner />
    </>
  );
}
