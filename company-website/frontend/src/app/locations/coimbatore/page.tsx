import { Metadata } from "next";
import Link from "next/link";
import { company } from "@/data/company";
import { projects } from "@/data/projects";
import ContactForm from "@/components/ui/ContactForm";
import ScrollReveal from "@/components/ui/ScrollReveal";
import CTABanner from "@/components/ui/CTABanner";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  CheckCircle2,
  Navigation,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Building2,
  Home,
  Calculator,
  MessageCircle,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Construction Company in Coimbatore | Building Contractors & Turnkey Builders | Prasanth Associates",
  description:
    "Top-rated construction company & building contractors in Coimbatore. Head office at Gandhipuram. Specializing in individual house construction, luxury villas, commercial buildings & turnkey contracts across Coimbatore.",
  keywords: [
    "construction company in Coimbatore",
    "builders in Coimbatore",
    "building contractors in Coimbatore",
    "civil contractors Coimbatore",
    "house construction company Coimbatore",
    "turnkey builders Coimbatore",
    "residential construction Coimbatore Gandhipuram",
  ],
  alternates: {
    canonical: "https://prasanthassociates.com/locations/coimbatore",
  },
  openGraph: {
    title: "Construction Company in Coimbatore | Prasanth Associates",
    description:
      "Leading civil contractors and building construction firm in Coimbatore. 15+ years experience, 250+ projects delivered with zero cost escalation.",
    url: "https://prasanthassociates.com/locations/coimbatore",
    type: "website",
    locale: "en_IN",
    siteName: "Prasanth Associates",
  },
};

export default function CoimbatoreLocationPage() {
  const canonicalUrl = "https://prasanthassociates.com/locations/coimbatore";
  const coimbatoreOffice = company.offices.find((o) => o.label === "Coimbatore") || company.offices[0];
  const coimbatoreProjects = projects.filter((p) => p.location.includes("Coimbatore"));

  const coimbatoreNeighborhoods = [
    { name: "Gandhipuram", desc: "Headquarters location; commercial hubs, retail complexes, and urban residential developments." },
    { name: "Peelamedu & Avinashi Road", desc: "IT parks, educational institutions, premium luxury apartments, and commercial towers." },
    { name: "Saravanampatti", desc: "Tech corridor; residential layouts, duplex homes, and gated villa communities." },
    { name: "RS Puram & Race Course", desc: "High-end luxury bungalows, architectural villas, and corporate office spaces." },
    { name: "Vadavalli & Thondamuthur", desc: "Scenic mountain-facing residential homes, sustainable green villas, and custom duplexes." },
    { name: "Thudiyalur & Mettupalayam Road", desc: "Growing residential colonies, commercial arcades, and individual houses on red gravelly soil." },
  ];

  const localSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "HomeAndConstructionBusiness",
        "@id": `${canonicalUrl}#localbusiness`,
        name: `${company.name} - Coimbatore Head Office`,
        image: "https://prasanthassociates.com/images/hero/hero-main.png",
        telephone: coimbatoreOffice.phone,
        email: coimbatoreOffice.email,
        url: canonicalUrl,
        priceRange: "₹₹₹",
        address: {
          "@type": "PostalAddress",
          streetAddress: coimbatoreOffice.street,
          addressLocality: coimbatoreOffice.city,
          addressRegion: coimbatoreOffice.state,
          postalCode: coimbatoreOffice.pincode,
          addressCountry: "IN",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 11.017756,
          longitude: 76.9688517,
        },
        hasMap: coimbatoreOffice.mapLink,
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            opens: "09:00",
            closes: "18:00",
          },
        ],
        areaServed: [
          { "@type": "City", name: "Coimbatore" },
          { "@type": "AdministrativeArea", name: "Tamil Nadu" },
        ],
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
            name: "Locations",
            item: "https://prasanthassociates.com/contact",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Coimbatore",
            item: canonicalUrl,
          },
        ],
      },
    ],
  };

  return (
    <>
      {/* Schema.org Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localSchema).replace(/</g, "\\u003c"),
        }}
      />

      {/* ── 1. Hero & Local Breadcrumb ─────────────────────────────────── */}
      <section className="relative pt-36 pb-20 bg-gradient-to-b from-[#FAF8F5] to-[var(--canvas-bg)] text-charcoal border-b border-border overflow-hidden">
        <div className="absolute inset-0 blueprint-grid opacity-10" />
        <div
          className="liquid-glow"
          style={{ width: 550, height: 450, top: -60, right: "15%", opacity: 0.25 }}
        />

        <div className="container relative z-10 max-w-5xl">
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
                <Link href="/contact" className="hover:text-gold-dark transition-colors">
                  Locations
                </Link>
              </li>
              <li>
                <ChevronRight size={12} className="text-concrete-lighter" />
              </li>
              <li className="text-charcoal font-bold">Coimbatore (Head Office)</li>
            </ol>
          </nav>

          <ScrollReveal>
            <div className="flex flex-wrap items-center gap-2.5 mb-5">
              <span className="nm-raised text-gold-dark px-4 py-1 rounded-full inline-flex items-center gap-2 text-[11px] font-bold tracking-wider uppercase border border-border">
                <MapPin size={12} className="text-gold-dark" />
                Headquarters · Gandhipuram, Coimbatore
              </span>
              <span className="text-[11px] font-bold text-charcoal bg-white/80 border border-border px-3 py-1 rounded-full nm-inset">
                15+ Years in Manchester of South India
              </span>
            </div>

            <h1
              className="font-heading font-bold text-charcoal mb-6 leading-[1.12]"
              style={{ fontSize: "var(--text-h1)" }}
            >
              Construction Company in <em className="text-gold-dark not-italic">Coimbatore</em>
            </h1>

            <p className="text-base md:text-lg text-concrete leading-relaxed max-w-3xl mb-8">
              From our headquarters on Sathy Road, Gandhipuram, Prasanth Associates has delivered over 250+
              landmark homes, luxury villas, and commercial buildings across Coimbatore. We combine rigorous
              civil engineering, CCMC municipal approval management, and legally binding fixed-price BoQ contracts.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#local-contact-form"
                className="px-6 py-3.5 rounded-2xl bg-charcoal text-white hover:bg-gold hover:text-charcoal font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-md inline-flex items-center gap-2"
              >
                <span>Book Site Consultation</span>
                <ArrowRight size={15} />
              </a>

              <a
                href={coimbatoreOffice.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 rounded-2xl bg-white border border-border text-charcoal hover:text-gold-dark font-bold text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-2"
              >
                <Navigation size={15} className="text-gold" />
                <span>Get Directions in Google Maps</span>
                <ExternalLink size={12} />
              </a>

              <a
                href={`https://wa.me/919486038761?text=${encodeURIComponent(
                  "Hello Prasanth Associates, I would like to schedule an in-person meeting at your Gandhipuram office."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 rounded-2xl bg-[#25D366] text-white hover:bg-[#1EBE5D] font-bold text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-2 shadow-sm"
              >
                <MessageCircle size={15} />
                <span>WhatsApp Head Office</span>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── 2. Office Information & Maps Section ──────────────────────── */}
      <section className="py-16 bg-linen border-b border-border">
        <div className="container max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Office Details Card */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white rounded-3xl p-8 border border-border shadow-sm space-y-5">
                <span className="text-[10px] font-bold uppercase tracking-widest text-gold-dark bg-gold/15 px-3 py-1 rounded-full border border-gold/30 inline-block">
                  Registered Headquarters
                </span>

                <div>
                  <h3 className="font-heading text-xl font-bold text-charcoal">
                    Prasanth Associates
                  </h3>
                  <p className="text-xs text-concrete mt-1">
                    Second Floor, Sowma Complex, Gandhipuram, Coimbatore
                  </p>
                </div>

                <div className="space-y-3.5 text-xs text-charcoal pt-3 border-t border-border">
                  <div className="flex items-start gap-3">
                    <MapPin size={16} className="text-gold-dark flex-shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{coimbatoreOffice.street}, Coimbatore – {coimbatoreOffice.pincode}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone size={15} className="text-gold-dark flex-shrink-0" />
                    <a href={`tel:${coimbatoreOffice.phone}`} className="font-mono font-bold hover:text-gold-dark transition-colors">
                      {coimbatoreOffice.phone}
                    </a>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail size={15} className="text-gold-dark flex-shrink-0" />
                    <a href={`mailto:${coimbatoreOffice.email}`} className="hover:text-gold-dark transition-colors">
                      {coimbatoreOffice.email}
                    </a>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock size={15} className="text-gold-dark flex-shrink-0" />
                    <span>Monday – Saturday: 9:00 AM – 6:00 PM</span>
                  </div>
                </div>


              </div>
            </div>

            {/* Embedded Google Map */}
            <div className="lg:col-span-7 h-[380px] rounded-3xl overflow-hidden shadow-lg border border-border">
              <iframe
                src={coimbatoreOffice.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Prasanth Associates Coimbatore Office Map"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Neighborhoods Served Across Coimbatore ─────────────────── */}
      <section className="section bg-[var(--canvas-bg)]">
        <div className="container max-w-5xl space-y-12">
          <div className="text-center max-w-2xl mx-auto">
            <span className="badge-gold mb-2 inline-flex">Local Coverage</span>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-charcoal">
              Neighborhoods We Actively Build in Coimbatore
            </h2>
            <p className="text-concrete text-xs md:text-sm mt-2">
              Our site engineers and supervisory crews manage active residential and commercial projects throughout greater Coimbatore.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {coimbatoreNeighborhoods.map((n) => (
              <div
                key={n.name}
                className="p-6 rounded-3xl bg-white border border-border shadow-2xs hover:border-gold transition-colors space-y-2"
              >
                <div className="flex items-center gap-2 text-charcoal font-heading font-bold text-base">
                  <span className="w-2 h-2 rounded-full bg-gold" />
                  <h4>{n.name}</h4>
                </div>
                <p className="text-concrete text-xs leading-relaxed">
                  {n.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Coimbatore Projects Portfolio Showcase ─────────────────── */}
      {coimbatoreProjects.length > 0 && (
        <section className="py-20 bg-linen border-y border-border">
          <div className="container max-w-5xl space-y-10">
            <div className="flex items-center justify-between">
              <div>
                <span className="badge-gold mb-2 inline-flex">Completed Works</span>
                <h3 className="font-heading text-2xl md:text-3xl font-bold text-charcoal">
                  Recent Projects Completed in Coimbatore
                </h3>
              </div>
              <Link
                href="/projects"
                className="text-xs font-bold text-gold-dark hover:text-charcoal uppercase tracking-wider flex items-center gap-1"
              >
                <span>View Full Portfolio</span>
                <ArrowRight size={13} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {coimbatoreProjects.slice(0, 3).map((proj) => (
                <div
                  key={proj.slug}
                  className="bg-white rounded-3xl overflow-hidden border border-border shadow-xs group"
                >
                  <div className="h-48 relative overflow-hidden bg-slate-100">
                    <img
                      src={proj.image}
                      alt={`${proj.title} Coimbatore`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-charcoal/80 text-white text-[10px] font-bold uppercase">
                      {proj.type}
                    </span>
                  </div>
                  <div className="p-5 space-y-2">
                    <h4 className="font-heading font-bold text-charcoal text-base group-hover:text-gold-dark transition-colors">
                      {proj.title}
                    </h4>
                    <p className="text-concrete text-xs line-clamp-2 leading-relaxed">
                      {proj.shortDescription}
                    </p>
                    <div className="pt-2">
                      <Link
                        href={`/projects/${proj.slug}`}
                        className="text-xs font-bold text-gold-dark hover:text-charcoal flex items-center gap-1 uppercase tracking-wider"
                      >
                        <span>Case Study</span>
                        <ArrowRight size={11} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 5. Local Lead Form Section ────────────────────────────────── */}
      <section className="section bg-[var(--canvas-bg)]" id="local-contact-form">
        <div className="container max-w-3xl">
          <div className="neu-glass rounded-3xl p-8 md:p-10 border border-white/90 shadow-2xl">
            <div className="text-center max-w-xl mx-auto mb-8">
              <span className="badge-gold mb-2 inline-flex">Coimbatore Building Consultation</span>
              <h3 className="font-heading text-2xl font-bold text-charcoal">
                Discuss Your Coimbatore Construction Project
              </h3>
              <p className="text-concrete text-xs md:text-sm mt-1">
                Tell us about your plot location and building plans. A principal civil engineer will review your inquiry and schedule an in-person meeting.
              </p>
            </div>

            <ContactForm isEstimate={true} />
          </div>
        </div>
      </section>

      <CTABanner
        headline="Ready to build your dream home in Coimbatore?"
        subtitle="Visit our Gandhipuram office or book an on-site engineer visit today."
      />
    </>
  );
}
