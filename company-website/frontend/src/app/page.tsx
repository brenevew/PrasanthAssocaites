import { Suspense } from "react";
import Image from "next/image";
import { blurProps } from "@/data/imageBlur";
import Link from "next/link";
import { Metadata } from "next";
import { company } from "@/data/company";
import { projects } from "@/data/projects";
import { differentiators } from "@/data/quality";
import { homeSectors, homeTowns } from "@/data/homeLocal";
import { getServicePath } from "@/data/serviceRoutes";

import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ProjectCard from "@/components/ui/ProjectCard";
import TestimonialsMarquee from "@/components/ui/TestimonialsMarquee";
import CTABanner from "@/components/ui/CTABanner";
import HomeFaq from "@/components/ui/HomeFaq";
import { CheckCircle2, ArrowRight, MapPin } from "lucide-react";
import { SITE_URL, pageOpenGraph } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: "Prasanth Associates | Builders in Coimbatore, Ooty & Gudalur" },
  description:
    "Construction company for houses, villas and commercial buildings in Coimbatore, Ooty, Coonoor, Kotagiri and Gudalur. House plans, approvals and itemised BoQ.",
  keywords: [
    "construction company in Coimbatore",
    "builders in Coimbatore",
    "house construction in Coimbatore",
    "house construction in Kovai",
    "builders in Ooty",
    "construction company in Ooty",
    "builders in Coonoor",
    "builders in Kotagiri",
    "building contractors in Gudalur",
    "builders in Nilgiris",
    "house plans and building plan approval",
    "structural engineers Coimbatore and Ooty",
    "bank valuation reports Coimbatore",
    "structural stability certificate",
  ],
  alternates: {
    canonical: `${SITE_URL}/`,
  },
  openGraph: pageOpenGraph(
    "/",
    "Prasanth Associates | Builders in Coimbatore, Ooty & Gudalur",
    "Construction company for houses, villas and commercial buildings in Coimbatore, Ooty, Coonoor, Kotagiri and Gudalur. House plans, approvals and itemised BoQ."
  ),
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
            src="/images/hero/hero-main.webp"
            alt="A home built by Prasanth Associates"
            fill
            className="object-cover"
            loading="eager"
            fetchPriority="high"
            sizes="100vw"
            {...blurProps("/images/hero/hero-main.webp")}
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
            {/* Headline */}
            <ScrollReveal>
              <h1
                className="font-heading font-bold text-charcoal leading-[1.08] mb-7"
                style={{ fontSize: "var(--text-h1)" }}
              >
                Construction Company in Coimbatore, Ooty &amp; Gudalur
              </h1>
              <p className="font-heading text-2xl md:text-3xl text-gold-dark font-semibold -mt-3 mb-7">
                {company.tagline}
              </p>
            </ScrollReveal>

            {/* Subtext */}
            <ScrollReveal delay={160}>
              <p className="text-lg md:text-xl text-concrete mb-7 leading-relaxed max-w-xl">
                {company.description}
              </p>
            </ScrollReveal>

            {/* Offices: each chip links to its location page */}
            <ScrollReveal delay={200} className="mb-8 flex flex-wrap items-center gap-2.5">
              <span className="basis-full sm:basis-auto text-[11px] font-bold uppercase tracking-widest text-concrete-light sm:mr-1">
                Our offices
              </span>
              {company.offices.map((office) => (
                <Link
                  key={office.label}
                  href={office.label === "Gudalur" ? "/locations/gudalur" : "/locations/coimbatore"}
                  className="group inline-flex items-center gap-2 rounded-full border border-border bg-white/70 py-1.5 pl-2 pr-3.5 shadow-2xs backdrop-blur-md transition-all hover:-translate-y-0.5 hover:border-gold hover:bg-white"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold/15 text-gold-dark transition-colors group-hover:bg-charcoal group-hover:text-white">
                    <MapPin size={13} strokeWidth={2.25} />
                  </span>
                  <span className="text-sm font-semibold text-charcoal">{office.label}</span>
                  <span className="hidden sm:inline text-xs text-concrete">{office.badge}</span>
                </Link>
              ))}
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
                  src="/images/projects/Designs/interior-design-residential-hall-7.webp"
                  alt="Living hall interior by Prasanth Associates"
                  fill
                  className="object-cover z-10 rounded-3xl border border-white/60 shadow-xl"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  {...blurProps("/images/projects/Designs/interior-design-residential-hall-7.webp")}
                />
                {/* Floating Neu-Glass badge */}
                <div className="absolute -bottom-5 -right-5 z-20 neu-glass rounded-2xl px-5 py-4">
                  <p className="text-xs text-concrete font-medium mb-0.5">Google rating</p>
                  <p className="text-2xl font-heading font-bold text-charcoal">4.9 ★</p>
                  <p className="text-[10px] text-concrete-light">From 77 Google reviews</p>
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
                100+ homes built across
                <br />{" "}
                <em className="text-gold not-italic">Coimbatore</em> and the Nilgiris district
              </h2>
              <div className="space-y-5 text-concrete leading-relaxed mb-8">
                <p>
                  Beyond homes, our work includes a 38,879 sq. ft. hotel building in Gudalur town
                  and a tea bungalow for Pricol Limited whose access route crossed a river.
                  Architects and engineers work in one team, so the drawings, the estimate and
                  the site work are planned together.
                </p>
                <p>
                  Whether it&apos;s a villa or a commercial building, our approach stays the
                  same: an itemised BoQ with the price fixed for the agreed scope, named
                  materials, and a written schedule agreed for your project.
                </p>
              </div>
              <ul className="space-y-3 mb-10">
                {[
                  "Itemised BoQ, Price Fixed for the Agreed Scope",
                  "In-house Architectural & Engineering Team",
                  "Written Schedule Agreed Up Front",
                  "Post-Handover Support",
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
              subtitle="A tea bungalow, a hotel building and a school from Gudalur and Ooty, each with site photos and notes on how it was built."
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

      {/* ── Services by sector ──────────────────────────────────────── */}
      <section className="section bg-[var(--canvas-bg)] relative overflow-hidden">
        <div className="container relative z-10">
          <ScrollReveal>
            <SectionHeading
              badge="Services"
              title="Construction, design, valuation and property services"
              subtitle="Every service is available in Coimbatore, Ooty, Coonoor, Kotagiri and Gudalur, as a complete project or on its own."
            />
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {homeSectors.map((sector, index) => (
              <ScrollReveal key={sector.id} delay={(index % 2) * 100}>
                <div className="h-full flex flex-col rounded-3xl neu-glass p-6 md:p-7">
                  <h3 className="font-heading text-xl font-bold text-charcoal mb-2">{sector.label}</h3>
                  <p className="text-sm text-concrete leading-relaxed mb-5">{sector.body}</p>
                  <ul className="space-y-2.5 mb-6">
                    {sector.links.map((link) => (
                      <li key={link.slug}>
                        <Link
                          href={getServicePath(link.slug)}
                          className="inline-flex items-center gap-1.5 text-sm font-semibold text-charcoal hover:text-gold-dark"
                        >
                          {link.label}
                          <ArrowRight size={12} />
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/services#${sector.id}`}
                    className="mt-auto inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-gold-dark hover:text-charcoal"
                  >
                    {sector.allLabel}
                    <ArrowRight size={12} />
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Where we build ──────────────────────────────────────────── */}
      <section className="section bg-linen relative overflow-hidden border-y border-border">
        <div className="container relative z-10">
          <ScrollReveal>
            <SectionHeading
              badge="Where we build"
              title="Builders in Coimbatore, Ooty, Coonoor, Kotagiri and Gudalur"
              subtitle="Our Gandhipuram office covers Coimbatore, and our Gudalur branch covers the Nilgiris district."
            />
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-5">
            {homeTowns.map((town, index) => (
              <ScrollReveal
                key={town.name}
                delay={(index % 3) * 100}
                className={index < 2 ? "lg:col-span-3" : "lg:col-span-2"}
              >
                <Link
                  href={town.href}
                  className="group h-full flex flex-col rounded-2xl bg-white border border-border p-6 shadow-2xs hover:border-gold/70 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin size={16} className="text-gold-dark" aria-hidden="true" />
                    <h3 className="font-heading text-lg font-bold text-charcoal">{town.name}</h3>
                  </div>
                  <p className="text-sm text-concrete leading-relaxed mb-4">{town.note}</p>
                  <span className="mt-auto inline-flex items-center gap-1.5 text-xs font-semibold text-charcoal group-hover:text-gold-dark">
                    {town.linkLabel}
                    <ArrowRight size={12} />
                  </span>
                </Link>
              </ScrollReveal>
            ))}
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
                    How We
                    <br />{" "}
                    <em className="text-gold not-italic">Work</em>
                  </h2>
                  <div className="gold-line" />
                  <p className="text-concrete leading-relaxed">
                    The engineering, the estimate and the site are handled by one team. This is
                    what that means for your project.
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
              subtitle="Real words from real clients across Coimbatore, the Nilgiris district and beyond."
            />
          </ScrollReveal>

          <ScrollReveal>
            <TestimonialsMarquee />
          </ScrollReveal>
        </div>
      </section>

      {/* ── 8. FAQ (with matching FAQPage schema) ──────────────────────── */}
      <HomeFaq />

      {/* ── 9. CTA Banner ───────────────────────────────────────────── */}
      <CTABanner />
    </>
  );
}
