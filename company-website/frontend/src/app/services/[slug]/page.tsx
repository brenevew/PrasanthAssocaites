import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { services } from "@/data/services";
import { serviceQuoteSpecs } from "@/data/serviceQuoteData";
import { projects } from "@/data/projects";
import { company } from "@/data/company";
import ContactForm from "@/components/ui/ContactForm";
import ScrollReveal from "@/components/ui/ScrollReveal";
import CTABanner from "@/components/ui/CTABanner";
import {
  CheckCircle2,
  Clock,
  ShieldCheck,
  ArrowRight,
  Phone,
  MessageCircle,
  Layers,
  ChevronRight,
  Sparkles,
  HelpCircle,

  Compass,
  Building,
} from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}



function getMethodologyContent(slug: string, serviceTitle: string) {
  if (slug.includes("architectural")) {
    return {
      badge: "Architectural Planning",
      title: "Design Philosophy & Spatial Excellence",
      secondParagraph:
        "Our architectural methodology balances climate-responsive building orientation, scientific Vastu principles, and structural longevity. In Coimbatore's tropical climate, we design homes and spaces that maximize natural cross-ventilation, capture optimal daylight, and harmoniously integrate with local site topography."
    };
  }
  if (slug.includes("interior")) {
    return {
      badge: "Interior Architecture",
      title: "Spatial Ergonomics & Bespoke Finishes",
      secondParagraph:
        "Every interior project is engineered for daily comfort, storage efficiency, and refined luxury. We coordinate millimeter-accurate joinery drawings, customized mood lighting scenes, and durable materials curated specifically to withstand Tamil Nadu's climate conditions with zero maintenance headaches."
    };
  }
  if (slug.includes("landscaping")) {
    return {
      badge: "Landscape Architecture",
      title: "Botanical Harmony & Outdoor Living",
      secondParagraph:
        "Our landscaping philosophy unites native Tamil Nadu flora, microclimate cooling, and sustainable water management. From automated root-zone drip irrigation to permeable stone paving and shaded pergolas, we design lush exterior sanctuaries that thrive through all seasons."
    };
  }
  if (slug.includes("valuation") || slug.includes("stability") || slug.includes("approval") || slug.includes("consulting")) {
    return {
      badge: "Chartered Valuation & Engineering",
      title: "Rigorous Inspection & Statutory Compliance",
      secondParagraph:
        "Our government-approved valuer and chartered engineering protocols provide uncompromising legal and technical accuracy. We perform on-site structural inspections, document verification, and compliance checks aligned with bank lending mandates and CCMC/DTCP regulatory frameworks."
    };
  }
  if (slug.includes("smart-homes")) {
    return {
      badge: "Intelligent Living",
      title: "Smart Automation & Network Architecture",
      secondParagraph:
        "Smart living designed into the walls from day one. We engineer concealed structured cabling and wireless mesh networks that unify smart lighting scenes, motorized drapery, multi-zone VRV air conditioning, biometric security locks, and perimeter CCTV surveillance into intuitive touch-panel and smartphone controls."
    };
  }
  return {
    badge: "Technical Methodology",
    title: "Engineering Excellence & Construction Protocol",
    secondParagraph:
      "In Coimbatore and western Tamil Nadu, structural longevity requires careful adaptation to local soil strata (from Saravanampatti black-cotton clays to Thudiyalur red soils), monsoon rainfall gradients, and seismic load compliance. At Prasanth Associates, every foundation footing, structural column, and slab casting is calculated to withstand generational weathering."
  };
}

export const metadata: Metadata = {
  title: "Service Details",
  description: "Details about our construction services.",
};
export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const spec = serviceQuoteSpecs[slug];
  const methodology = getMethodologyContent(slug, service.title);
  const canonicalUrl = `https://prasanthassociates.com/services/${slug}`;

  // Filter relevant projects for this service type
  const relevantProjects = projects.filter((p) => {
    if (slug.includes("villa")) return p.category === "villa";
    if (slug.includes("commercial") || slug.includes("industrial")) return p.category === "commercial";
    if (slug.includes("renovation")) return p.category === "renovation";
    return p.category === "residential" || p.category === "villa";
  }).slice(0, 2);

  // Service FAQ generation for Schema and UI
  const serviceFaqs = [
    {
      q: `What is the timeline for ${service.title.toLowerCase()} in Coimbatore?`,
      a: spec?.sla
        ? `Our standard schedule for ${service.title.toLowerCase()} is ${spec.sla}, documented with milestone timelines and stage-wise deliverables.`
        : `Timelines depend on the built-up area and architectural complexity. Most residential projects in Coimbatore are completed within 8 to 14 months.`,
    },
    {
      q: `Do you provide a fixed-price Bill of Quantities (BoQ) with no escalation?`,
      a: "Yes. Every contract includes an itemized Bill of Quantities detailing brand specifications (Tata/JSW Fe550D TMT, Ultratech/Ramco 53-grade cement, Kajaria tiles) and legally locking costs against mid-project escalation.",
    },
    {
      q: `Can Prasanth Associates handle municipality plan approvals in Coimbatore?`,
      a: "Yes. Our senior civil engineering and liaison team handles complete CCMC (Coimbatore City Municipal Corporation) and DTCP building plan approvals, structural drawings, and completion sanctions.",
    },
    {
      q: `How do you ensure structural quality during construction?`,
      a: "Every project milestone undergoes independent stage-wise quality testing including concrete compressive cube tests, steel tensile verification, non-destructive moisture testing, and digital photo logs shared directly with you.",
    },
  ];

  // Schema.org Structured Data: Service + BreadcrumbList + FAQPage
  const serviceSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${canonicalUrl}#service`,
        name: service.title,
        serviceType: service.title,
        description: service.description,
        provider: {
          "@type": "HomeAndConstructionBusiness",
          name: company.name,
          url: "https://prasanthassociates.com",
          telephone: company.phone,
          address: {
            "@type": "PostalAddress",
            streetAddress: company.address.street,
            addressLocality: company.address.city,
            addressRegion: company.address.state,
            postalCode: company.address.pincode,
            addressCountry: "IN",
          },
        },
        areaServed: [
          { "@type": "City", name: "Coimbatore" },
          { "@type": "AdministrativeArea", name: "The Nilgiris" },
          { "@type": "AdministrativeArea", name: "Tamil Nadu" },
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: `${service.title} Specifications`,
          itemListElement: service.features.map((feat, idx) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: feat,
            },
            position: idx + 1,
          })),
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonicalUrl}#breadcrumb`,
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
            name: "Services",
            item: "https://prasanthassociates.com/services",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: service.title,
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: serviceFaqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.a,
          },
        })),
      },
    ],
  };

  return (
    <>
      {/* Schema.org Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema).replace(/</g, "\\u003c"),
        }}
      />

      {/* ── 1. Hero & Breadcrumbs Section ─────────────────────────────── */}
      <section className="relative pt-36 pb-20 bg-gradient-to-b from-[#FAF8F5] to-[var(--canvas-bg)] text-charcoal border-b border-border overflow-hidden">
        <div className="absolute inset-0 blueprint-grid opacity-10" />
        <div
          className="liquid-glow"
          style={{ width: 550, height: 450, top: -60, right: "15%", opacity: 0.25 }}
        />

        <div className="container relative z-10 max-w-5xl">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-xs text-concrete">
              <li>
                <Link href="/" className="hover:text-gold-dark transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <ChevronRight size={12} className="text-concrete-lighter" />
              </li>
              <li>
                <Link href="/services" className="hover:text-gold-dark transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <ChevronRight size={12} className="text-concrete-lighter" />
              </li>
              <li className="text-charcoal font-bold truncate">{service.title}</li>
            </ol>
          </nav>

          {/* Service Badge & H1 */}
          <ScrollReveal>
            <div className="flex flex-wrap items-center gap-2.5 mb-5">
              <span className="nm-raised text-gold-dark px-4 py-1 rounded-full inline-flex items-center gap-2 text-[11px] font-bold tracking-wider uppercase border border-border">
                <Sparkles size={12} className="text-gold-dark" />
                {spec?.badge || "Professional Civil Engineering"}
              </span>
              <span className="text-[11px] font-bold text-charcoal bg-white/80 border border-border px-3 py-1 rounded-full nm-inset">
                Coimbatore &amp; Tamil Nadu
              </span>
            </div>

            <h1
              className="font-heading font-bold text-charcoal mb-6 leading-[1.12]"
              style={{ fontSize: "var(--text-h1)" }}
            >
              {service.title} in <em className="text-gold-dark not-italic">Coimbatore</em>
            </h1>

            <p className="text-base md:text-lg text-concrete leading-relaxed max-w-3xl mb-8">
              {spec?.tagline || service.shortDescription}
            </p>

            {/* Quick Action Badges */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#quote-section"
                className="px-6 py-3.5 rounded-2xl bg-charcoal text-white hover:bg-gold hover:text-charcoal font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-md inline-flex items-center gap-2"
              >
                <span>Request Detailed Quote</span>
                <ArrowRight size={15} />
              </a>

              <a
                href={`https://wa.me/919486038761?text=${encodeURIComponent(
                  `Hello Prasanth Associates, I would like to consult about ${service.title} in Coimbatore.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-2xl bg-[#25D366] text-white hover:bg-[#1EBE5D] font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-md inline-flex items-center gap-2"
              >
                <MessageCircle size={16} />
                <span>WhatsApp Senior Engineer</span>
              </a>

            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── 2. Performance & SLA Metrics Bar ──────────────────────────── */}
      {spec && (
        <section className="py-6 bg-linen border-b border-border">
          <div className="container max-w-5xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="p-3 bg-white/70 rounded-2xl border border-border/80">
                <div className="text-xs text-concrete font-medium">{spec.slaLabel}</div>
                <div className="text-sm md:text-base font-bold text-charcoal mt-0.5">{spec.sla}</div>
              </div>
              <div className="p-3 bg-white/70 rounded-2xl border border-border/80">
                <div className="text-xs text-concrete font-medium">{spec.credentialLabel}</div>
                <div className="text-sm md:text-base font-bold text-gold-dark mt-0.5">{spec.credentialBadge}</div>
              </div>
              <div className="p-3 bg-white/70 rounded-2xl border border-border/80">
                <div className="text-xs text-concrete font-medium">Headquarters</div>
                <div className="text-sm md:text-base font-bold text-charcoal mt-0.5">Gandhipuram, Coimbatore</div>
              </div>
              <div className="p-3 bg-white/70 rounded-2xl border border-border/80">
                <div className="text-xs text-concrete font-medium">Contract Guarantee</div>
                <div className="text-sm md:text-base font-bold text-charcoal mt-0.5">Legally Locked BoQ</div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── 3. Engineering Scope & In-Depth Overview ──────────────────── */}
      <section className="section bg-[var(--canvas-bg)] scroll-mt-28" id="overview">
        <div className="container max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Content (7 Cols) */}
            <div className="lg:col-span-7 space-y-8">
              <ScrollReveal>
                <span className="badge-gold mb-3 inline-flex">
                  <ShieldCheck size={12} className="text-gold" />
                  {methodology.badge}
                </span>
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-charcoal mb-4">
                  {methodology.title}
                </h2>
                <div className="space-y-4 text-concrete text-sm md:text-base leading-relaxed">
                  <p>{service.description}</p>
                  <p>{methodology.secondParagraph}</p>
                </div>
              </ScrollReveal>

              {/* Highlight Box if present */}
              {spec?.highlightBox && (
                <ScrollReveal delay={100}>
                  <div className="neu-glass rounded-3xl p-6 md:p-8 border border-gold/40 relative overflow-hidden bg-gold/[0.03]">
                    <h3 className="font-heading text-lg font-bold text-charcoal mb-2">
                      {spec.highlightBox.title}
                    </h3>
                    <p className="text-concrete text-xs md:text-sm leading-relaxed mb-4">
                      {spec.highlightBox.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {spec.highlightBox.badges.map((b) => (
                        <span
                          key={b}
                          className="px-3 py-1 rounded-full text-[11px] font-bold bg-white text-charcoal border border-border shadow-2xs"
                        >
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              )}

              {/* 3-Step Execution Sequence */}
              {spec?.steps && (
                <ScrollReveal delay={150}>
                  <h3 className="font-heading text-xl font-bold text-charcoal mb-4">
                    Our 3-Stage Delivery Sequence
                  </h3>
                  <div className="space-y-4">
                    {spec.steps.map((st) => (
                      <div
                        key={st.n}
                        className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-border"
                      >
                        <span className="text-2xl font-heading font-bold text-gold-dark leading-none">
                          {st.n}
                        </span>
                        <div>
                          <h4 className="font-bold text-charcoal text-sm mb-1">{st.title}</h4>
                          <p className="text-concrete text-xs leading-relaxed">{st.body}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollReveal>
              )}

              {/* Key Deliverables Matrix */}
              <ScrollReveal delay={200}>
                <h3 className="font-heading text-xl font-bold text-charcoal mb-4">
                  {spec?.deliverablesHeading || "Technical Specifications & Deliverables"}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {service.features.map((feat) => (
                    <div
                      key={feat}
                      className="p-4 rounded-2xl bg-white/90 border border-border flex items-start gap-3"
                    >
                      <CheckCircle2 size={16} className="text-gold-dark flex-shrink-0 mt-0.5" />
                      <span className="text-xs font-semibold text-charcoal leading-snug">{feat}</span>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>

            {/* Right Column: Quote Form & Trust Anchor (5 Cols) */}
            <div className="lg:col-span-5 scroll-mt-32" id="quote-section">
              <div className="sticky top-28 space-y-6">
                <ContactForm isEstimate={true} serviceSlug={slug} serviceTitle={service.title} />

                <div className="p-4 rounded-2xl bg-white/70 border border-border/80 text-center">
                  <p className="text-[11px] text-concrete">
                    Prefer discussing directly with our senior engineer?
                  </p>
                  <a
                    href={`tel:${company.phone}`}
                    className="text-sm font-bold text-charcoal hover:text-gold-dark transition-colors inline-flex items-center gap-1.5 mt-1 font-mono"
                  >
                    <Phone size={13} className="text-gold-dark" />
                    {company.phone}
                  </a>
                </div>

                {/* Building Studio Planner Cross-Promotion */}
                <div className="p-6 rounded-3xl bg-charcoal text-warm-white text-center space-y-3">
                  <Compass size={24} className="text-gold mx-auto" />
                  <h4 className="font-heading text-base font-bold">Have Specific Plot Dimensions?</h4>
                  <p className="text-xs text-concrete-lighter leading-relaxed">
                    Test different layouts, setbacks, and room configurations in our interactive Building Studio.
                  </p>
                  <Link
                    href="/plan-home"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gold text-charcoal hover:bg-gold-dark transition-colors text-xs font-bold uppercase tracking-wider w-full"
                  >
                    <span>Open Building Planner</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. Relevant Projects Spotlight ───────────────────────────── */}
      {relevantProjects.length > 0 && (
        <section className="py-20 bg-linen border-y border-border">
          <div className="container max-w-5xl">
            <div className="flex items-center justify-between mb-10">
              <div>
                <span className="badge-gold mb-2 inline-flex">Real Track Record</span>
                <h3 className="font-heading text-2xl md:text-3xl font-bold text-charcoal">
                  Featured Projects in Coimbatore &amp; Tamil Nadu
                </h3>
              </div>
              <Link
                href="/projects"
                className="text-xs font-bold text-gold-dark hover:text-charcoal flex items-center gap-1 transition-colors uppercase tracking-wider"
              >
                <span>View All 250+ Projects</span>
                <ArrowRight size={13} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relevantProjects.map((p) => (
                <div
                  key={p.slug}
                  className="bg-white rounded-3xl overflow-hidden border border-border shadow-sm group hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="relative h-60 w-full overflow-hidden bg-slate-100">
                    <img
                      src={p.image}
                      alt={`${p.title} - ${p.type} in ${p.location}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-charcoal/80 text-white text-[10px] font-bold uppercase tracking-wider backdrop-blur-md">
                      {p.type}
                    </span>
                    <span className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-white/90 text-charcoal text-[11px] font-bold shadow-sm">
                      {p.area}
                    </span>
                  </div>
                  <div className="p-6">
                    <div className="text-xs text-concrete mb-1 flex items-center gap-1">
                      <span>{p.location}</span> • <span>Completed in {p.year}</span>
                    </div>
                    <h4 className="font-heading text-lg font-bold text-charcoal mb-2 group-hover:text-gold-dark transition-colors">
                      {p.title}
                    </h4>
                    <p className="text-concrete text-xs line-clamp-2 leading-relaxed mb-4">
                      {p.shortDescription}
                    </p>
                    <Link
                      href={`/projects/${p.slug}`}
                      className="text-xs font-bold text-charcoal hover:text-gold-dark inline-flex items-center gap-1 transition-colors uppercase tracking-wider"
                    >
                      <span>Read Case Study</span>
                      <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 5. Frequently Asked Questions (FAQ) Section ────────────────── */}
      <section className="section bg-[var(--canvas-bg)]">
        <div className="container max-w-4xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="badge-gold mb-2 inline-flex">
              <HelpCircle size={12} className="text-gold" />
              Frequently Asked Questions
            </span>
            <h3 className="font-heading text-2xl md:text-3xl font-bold text-charcoal">
              Frequently Asked Questions About {service.title}
            </h3>
            <p className="text-concrete text-xs md:text-sm mt-2">
              Clear answers to common questions about construction costs, bylaws, timelines, and material quality in Coimbatore.
            </p>
          </div>

          <div className="space-y-4">
            {serviceFaqs.map((faq, i) => (
              <div
                key={i}
                className="neu-glass rounded-2xl p-6 border border-border/80 space-y-2 bg-white/80"
              >
                <h4 className="font-heading text-base md:text-lg font-bold text-charcoal flex items-start gap-2.5">
                  <span className="text-gold-dark font-bold">Q:</span>
                  <span>{faq.q}</span>
                </h4>
                <p className="text-concrete text-xs md:text-sm leading-relaxed pl-6">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        headline={`Ready to build with Coimbatore's leading civil engineers?`}
        subtitle="Schedule an on-site consultation or visit our Gandhipuram head office to review floor plans and material samples."
      />
    </>
  );
}
