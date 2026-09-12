import { Metadata } from "next";
import Link from "next/link";
import { company } from "@/data/company";
import { services } from "@/data/services";
import { serviceQuoteSpecs } from "@/data/serviceQuoteData";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Button from "@/components/ui/Button";
import CTABanner from "@/components/ui/CTABanner";
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Clock,
  ShieldCheck,
  MapPin,
  Map,
  TrendingUp,
  LayoutDashboard,
  ChevronRight,
  Building2,
} from "lucide-react";

const iconMap: Record<
  string,
  React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }>
> = {
  MapPin,
  Map,
  TrendingUp,
  LayoutDashboard,
};

export const metadata: Metadata = {
  title:
    "Property & Investment Advisory in Coimbatore | Prasanth Associates",
  description:
    "Expert property acquisition advisory, land & plot transactions, real estate investment consulting, and portfolio management services in Coimbatore & Tamil Nadu. Data-driven, legally verified, and professionally managed.",
  keywords: [
    "property advisory Coimbatore",
    "land transactions Coimbatore",
    "real estate investment Tamil Nadu",
    "property portfolio management",
    "DTCP approved plots Coimbatore",
    "NRI investment advisory India",
    "land acquisition Coimbatore",
    "real estate consulting Tamil Nadu",
  ],
  alternates: {
    canonical: "https://prasanthassociates.com/property-investment",
  },
  openGraph: {
    title: "Property & Investment Advisory | Prasanth Associates",
    description:
      "From property acquisition to portfolio management — institutional-grade real estate advisory in Coimbatore & Tamil Nadu.",
    url: "https://prasanthassociates.com/property-investment",
    type: "website",
  },
};

// The 4 real estate service slugs
const realEstateSlugs = [
  "property-acquisition-advisory",
  "land-plot-transactions",
  "real-estate-investment-consulting",
  "property-portfolio-management",
];

export default function PropertyInvestmentPage() {
  const realEstateServices = realEstateSlugs
    .map((slug) => services.find((s) => s.slug === slug)!)
    .filter(Boolean);

  return (
    <>
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Service",
                name: "Property & Investment Advisory",
                provider: {
                  "@type": "HomeAndConstructionBusiness",
                  name: company.name,
                  url: "https://prasanthassociates.com",
                  telephone: company.phone,
                },
                serviceType: "Real Estate Advisory",
                areaServed: [
                  { "@type": "City", name: "Coimbatore" },
                  { "@type": "AdministrativeArea", name: "Tamil Nadu" },
                ],
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 1,
                    name: "Home",
                    item: "https://prasanthassociates.com",
                  },
                  {
                    "@type": "ListItem",
                    position: 2,
                    name: "Property & Investment",
                    item: "https://prasanthassociates.com/property-investment",
                  },
                ],
              },
            ],
          }).replace(/</g, "\\u003c"),
        }}
      />

      {/* ── 1. Hero Section ─────────────────────────────────────────── */}
      <section className="relative pt-36 pb-24 bg-gradient-to-b from-[#FAF8F5] to-[var(--canvas-bg)] text-charcoal overflow-hidden border-b border-border">
        <div className="absolute inset-0 blueprint-grid opacity-12" />
        <div
          className="liquid-glow"
          style={{
            width: 700,
            height: 550,
            top: -120,
            left: "20%",
            opacity: 0.35,
          }}
        />
        <div
          className="liquid-glow"
          style={{
            width: 500,
            height: 400,
            bottom: -80,
            right: "5%",
            opacity: 0.2,
          }}
        />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

        <div className="container relative z-10 max-w-5xl">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-xs text-concrete">
              <li>
                <Link
                  href="/"
                  className="hover:text-gold-dark transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <ChevronRight size={12} className="text-concrete-lighter" />
              </li>
              <li className="text-charcoal font-bold">
                Property &amp; Investment
              </li>
            </ol>
          </nav>

          <ScrollReveal>
            <div className="flex flex-wrap items-center gap-2.5 mb-5">
              <span className="nm-raised text-gold-dark px-4 py-1 rounded-full inline-flex items-center gap-2 text-[11px] font-bold tracking-wider uppercase border border-border">
                <TrendingUp size={12} className="text-gold-dark" />
                Property &amp; Investment Advisory
              </span>
              <span className="text-[11px] font-bold text-charcoal bg-white/80 border border-border px-3 py-1 rounded-full nm-inset">
                Coimbatore &amp; Tamil Nadu
              </span>
            </div>

            <h1
              className="font-heading font-bold text-charcoal mb-6 leading-[1.12]"
              style={{ fontSize: "var(--text-h1)" }}
            >
              Property &amp; Investment{" "}
              <em className="text-gold-dark not-italic">Advisory</em>
            </h1>

            <p className="text-base md:text-lg text-concrete leading-relaxed max-w-3xl mb-8">
              From strategic property acquisition and premium land transactions
              to institutional-grade investment consulting and portfolio
              management — every decision backed by data, due diligence, and
              deep local market expertise.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── 2. Detailed Service Cards ───────────────────────────────── */}
      <section
        id="services-section"
        className="section bg-linen text-charcoal relative overflow-hidden border-y border-border scroll-mt-28"
      >
        <div className="absolute inset-0 blueprint-grid opacity-10" />
        <div
          className="liquid-glow"
          style={{
            width: 600,
            height: 600,
            top: "10%",
            left: "-10%",
            opacity: 0.3,
          }}
        />
        <div
          className="liquid-glow"
          style={{
            width: 500,
            height: 500,
            top: "55%",
            right: "-5%",
            opacity: 0.25,
          }}
        />

        <div className="container max-w-6xl relative z-10">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 text-[0.7rem] font-bold tracking-[0.22em] uppercase text-gold-dark nm-raised px-4.5 py-1.5 rounded-full mb-6 backdrop-blur-md border border-border shadow-xs">
                <Sparkles size={11} className="text-gold-dark" />4 Specialized
                Solutions
              </span>
              <h2
                className="font-heading font-bold text-charcoal mb-4 leading-tight"
                style={{ fontSize: "var(--text-h2)" }}
              >
                Our Property &amp; Investment{" "}
                <em className="text-gold-dark not-italic">Services</em>
              </h2>
              <p className="text-concrete text-base max-w-2xl mx-auto leading-relaxed">
                Comprehensive real estate advisory covering every stage — from
                initial property identification to ongoing portfolio management
                and strategic exits.
              </p>
            </div>
          </ScrollReveal>

          {/* Service Cards — same card format used on the Services page */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {realEstateServices.map((service, serviceIndex) => {
              const spec = serviceQuoteSpecs[service.slug];
              const IconComponent = iconMap[service.icon] || Building2;

              return (
                <ScrollReveal key={service.slug} delay={(serviceIndex % 2) * 90}>
                  <div
                    id={service.slug}
                    className="neu-glass group relative rounded-3xl p-8 h-full flex flex-col scroll-mt-32 transition-all duration-500"
                  >
                    {/* Header: Sunken Icon Socket + Index */}
                    <div className="flex items-start justify-between gap-4 mb-5">
                      <div className="w-14 h-14 rounded-2xl nm-inset text-charcoal group-hover:text-gold-dark flex items-center justify-center flex-shrink-0 transition-all duration-300">
                        <IconComponent size={22} strokeWidth={1.6} />
                      </div>
                      <span className="text-4xl font-heading font-bold text-concrete-lighter/40 group-hover:text-gold/40 transition-colors duration-300 select-none leading-none">
                        {String(serviceIndex + 1).padStart(2, "0")}
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
                    <h3 className="text-xl font-heading font-bold text-charcoal mb-2.5 leading-snug">
                      {service.title}
                    </h3>

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

                    {/* CTA Action */}
                    <div className="mt-auto pt-4 border-t border-border/60">
                      <Button
                        href={`/request-quote?service=${service.slug}`}
                        variant="secondary"
                        className="w-full text-xs font-bold tracking-wider uppercase nm-gold-raised text-charcoal flex items-center justify-center gap-1.5 py-2.5 shadow-xs"
                      >
                        <span>Request Quote</span>
                        <ArrowRight size={13} />
                      </Button>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 3. Key Capabilities Matrix ──────────────────────────────── */}
      <section className="section bg-[var(--canvas-bg)] relative overflow-hidden">
        <div
          className="liquid-glow"
          style={{
            width: 450,
            height: 450,
            bottom: "10%",
            right: "10%",
            opacity: 0.3,
          }}
        />
        <div className="container relative z-10 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-14 lg:gap-12">
            {/* Sticky Sidebar */}
            <div className="lg:col-span-2">
              <ScrollReveal>
                <div className="lg:sticky top-32 space-y-6">
                  <h2
                    className="font-heading font-bold text-charcoal leading-tight"
                    style={{ fontSize: "var(--text-h2)" }}
                  >
                    Complete Property
                    <br />
                    <em className="text-gold not-italic">Lifecycle</em>{" "}
                    Coverage
                  </h2>
                  <div className="gold-line" />
                  <p className="text-concrete leading-relaxed">
                    Whether you&apos;re a first-time buyer, seasoned investor,
                    or NRI looking to build a portfolio in Tamil Nadu — we
                    provide the expertise, legal protection, and market
                    intelligence you need at every stage.
                  </p>
                </div>
              </ScrollReveal>
            </div>

            {/* Feature Cards */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {realEstateServices.map((service, index) => {
                  const IconComponent = iconMap[service.icon] || Building2;
                  return (
                    <ScrollReveal key={service.slug} delay={index * 80}>
                      <Link
                        href={`#${service.slug}`}
                        className="neu-glass p-6 rounded-3xl h-full flex flex-col gap-4 group hover:-translate-y-1 transition-all duration-300"
                      >
                        <div className="w-11 h-11 rounded-2xl nm-inset flex items-center justify-center flex-shrink-0 text-charcoal group-hover:text-gold-dark transition-colors">
                          <IconComponent size={18} strokeWidth={1.6} />
                        </div>
                        <h3 className="text-base font-heading font-bold text-charcoal group-hover:text-gold-dark transition-colors">
                          {service.title}
                        </h3>
                        <p className="text-concrete text-sm leading-relaxed flex-1">
                          {service.shortDescription}
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {service.features.slice(0, 3).map((f) => (
                            <span
                              key={f}
                              className="text-[10px] px-2.5 py-1 rounded-full nm-inset-sm text-concrete font-medium"
                            >
                              {f}
                            </span>
                          ))}
                        </div>
                      </Link>
                    </ScrollReveal>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. CTA Banner ───────────────────────────────────────────── */}
      <CTABanner
        headline="Ready to Make Your Next Property Move?"
        subtitle="Connect with our licensed property consultants for a confidential, no-obligation discussion about your investment goals."
        primaryCTA={{
          label: "Book a Free Consultation",
          href: "/contact",
        }}
        secondaryCTA={{
          label: "Explore All Services",
          href: "/services#realestate",
        }}
      />
    </>
  );
}
