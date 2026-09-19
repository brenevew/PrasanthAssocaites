import { Metadata } from "next";
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
  title: "Property & Investment Advisory in Coimbatore",
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
    images: [{ url: "/images/hero/hero-main.webp", width: 1200, height: 630, alt: "Prasanth Associates" }],
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

      {/* ── 1. Detailed Service Cards ───────────────────────────────── */}
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

      {/* ── 3. CTA Banner ───────────────────────────────────────────── */}
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
