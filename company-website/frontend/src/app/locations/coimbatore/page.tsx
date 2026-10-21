import { Metadata } from "next";
import Link from "next/link";
import { company } from "@/data/company";
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
import { SITE_URL, pageOpenGraph, ORG_ID } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Building Contractors in Coimbatore",
  description:
    "Building contractors in Coimbatore with a head office in Gandhipuram. Individual houses, luxury villas, commercial buildings and turnkey contracts.",
  keywords: [
    "construction company in Coimbatore",
    "builders in Coimbatore",
    "building contractors in Coimbatore",
    "civil contractors Coimbatore",
    "house construction company Coimbatore",
    "turnkey builders Coimbatore",
    "residential construction Coimbatore Gandhipuram",
    "home builders in Coimbatore",
    "house construction in Kovai",
    "construction company Gandhipuram",
  ],
  alternates: {
    canonical: `${SITE_URL}/locations/coimbatore`,
  },
  openGraph: pageOpenGraph(
    "/locations/coimbatore",
    "Construction Company in Coimbatore | Prasanth Associates",
    "Civil contractors with a head office in Gandhipuram, Coimbatore. 100+ homes built, on itemised BoQ contracts."
  ),
};

export default function CoimbatoreLocationPage() {
  const canonicalUrl = `${SITE_URL}/locations/coimbatore`;
  const coimbatoreOffice = company.offices.find((o) => o.label === "Coimbatore") || company.offices[0];

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
        "@type": "GeneralContractor",
        // Same entity as the site-wide organisation; this page adds local detail.
        "@id": ORG_ID,
        name: company.name,
        image: `${SITE_URL}/images/hero/hero-main.webp`,
        telephone: coimbatoreOffice.phone,
        email: coimbatoreOffice.email,
        url: canonicalUrl,
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
            item: `${SITE_URL}`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Locations",
            item: `${SITE_URL}/contact`,
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
            </div>

            <h1
              className="font-heading font-bold text-charcoal mb-6 leading-[1.12]"
              style={{ fontSize: "var(--text-h1)" }}
            >
              Construction Company in <em className="text-gold-dark not-italic">Coimbatore</em>
            </h1>

            <p className="text-base md:text-lg text-concrete leading-relaxed max-w-3xl mb-8">
              From our head office on Sathy Road, Gandhipuram, Prasanth Associates designs and builds homes,
              villas and commercial buildings across Coimbatore. We have built 100+ homes, we handle the
              engineering and CCMC approvals, and every job runs on an itemised BoQ that fixes the price for the agreed scope.
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
                href={`https://wa.me/919360337733?text=${encodeURIComponent(
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

      <section className="pb-4 bg-[var(--canvas-bg)]">
        <div className="container max-w-5xl">
          <Link
            href="/services/turnkey-design-build-coimbatore"
            className="flex items-center justify-between gap-4 p-6 rounded-3xl bg-white border border-border hover:border-gold transition-colors"
          >
            <div>
              <h3 className="font-heading font-bold text-charcoal text-base">
                Turnkey Design &amp; Build in Coimbatore
              </h3>
              <p className="text-concrete text-xs mt-1">
                One contract from soil investigation and DTCP/LPA approval to handover, with itemized BoQ pricing.
              </p>
            </div>
            <ArrowRight size={18} className="text-gold-dark flex-shrink-0" />
          </Link>
        </div>
      </section>

      {/* ── 4. Local Lead Form Section ────────────────────────────────── */}
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
