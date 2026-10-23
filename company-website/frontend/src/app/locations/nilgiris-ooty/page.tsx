import { Metadata } from "next";
import Link from "next/link";
import { company } from "@/data/company";
import { projects, hasDetailsPage } from "@/data/projects";
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
  Mountain,
  Trees,
  MessageCircle,
  ArrowRight,
} from "lucide-react";
import { SITE_URL, pageOpenGraph } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Builders in Ooty, Coonoor & Nilgiris",
  description:
    "Building contractors for Ooty, Coonoor, Kotagiri and Gudalur. House construction, building design and hillside work in the Nilgiris, from our Gudalur branch.",
  keywords: [
    "builders in Nilgiris",
    "house construction in Ooty",
    "hill station builders Ooty",
    "villa construction Ooty",
    "hill station builders Tamil Nadu",
    "civil contractors Nilgiris",
    "builders in Ooty",
    "construction company in Ooty",
    "house construction in Coonoor",
    "builders in Coonoor",
    "house construction in Kotagiri",
    "building contractors in Kotagiri",
    "construction company Nilgiris",
  ],
  alternates: {
    canonical: `${SITE_URL}/locations/nilgiris-ooty`,
  },
  openGraph: pageOpenGraph(
    "/locations/nilgiris-ooty",
    "Builders in Ooty, Coonoor & Nilgiris | Prasanth Associates",
    "Building contractors for Ooty, Coonoor, Kotagiri and Gudalur. House construction, building design and hillside work in the Nilgiris, from our Gudalur branch."
  ),
};

export default function NilgirisOotyLocationPage() {
  const canonicalUrl = `${SITE_URL}/locations/nilgiris-ooty`;
  const nilgirisOffice = company.offices.find((o) => o.label === "Gudalur") || company.offices[1];
  // Featured project: a genuine Ooty project with a written case study, so the
  // heading, badge and facts below all come from data/projects.ts.
  const ootyProjects = projects.filter((p) => p.location.includes("Ooty") && hasDetailsPage(p));

  const nilgirisHubs = [
    { name: "Ooty (Udhagamandalam)", desc: "Luxury holiday residences, hillside duplex homes, and heritage stone bungalow restorations." },
    { name: "Gudalur", desc: "Regional branch office hub; agricultural estate bungalows, commercial complexes, and private residences." },
    { name: "Coonoor", desc: "Tea estate private villas, panoramic valley residences, and colonial-style architectural homes." },
    { name: "Kotagiri", desc: "Eco-friendly mountain villas, lightweight structural steel additions, and off-grid solar-integrated homes." },
  ];

  const nilgirisSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "HomeAndConstructionBusiness",
        "@id": `${SITE_URL}#gudalur-branch`,
        name: `${company.name} - Gudalur Branch Office`,
        parentOrganization: { "@id": `${SITE_URL}#organization` },
        image: `${SITE_URL}/images/projects/Residential/residential-building-construction-gudalur-prasanth-associates.webp`,
        telephone: nilgirisOffice.phone.replace(/\s/g, ""),
        email: nilgirisOffice.email,
        url: `${SITE_URL}/locations/gudalur`, // the branch's own page
        address: {
          "@type": "PostalAddress",
          streetAddress: nilgirisOffice.street,
          addressLocality: "Gudalur",
          addressRegion: nilgirisOffice.state,
          postalCode: nilgirisOffice.pincode,
          addressCountry: "IN",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 11.5001001,
          longitude: 76.4937999,
        },
        hasMap: nilgirisOffice.mapLink,
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            opens: "09:00",
            closes: "18:00",
          },
        ],
        areaServed: [
          { "@type": "AdministrativeArea", name: "The Nilgiris" },
          { "@type": "City", name: "Ooty" },
          { "@type": "City", name: "Gudalur" },
          { "@type": "City", name: "Coonoor" },
          { "@type": "City", name: "Kotagiri" },
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
            name: "Nilgiris & Ooty",
            item: canonicalUrl,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(nilgirisSchema).replace(/</g, "\\u003c"),
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
              <li className="text-charcoal font-bold">The Nilgiris &amp; Ooty</li>
            </ol>
          </nav>

          <ScrollReveal>
            <div className="flex flex-wrap items-center gap-2.5 mb-5">
              <span className="nm-raised text-gold-dark px-4 py-1 rounded-full inline-flex items-center gap-2 text-[11px] font-bold tracking-wider uppercase border border-border">
                <Trees size={12} className="text-gold-dark" />
                Branch Office · Gudalur, The Nilgiris
              </span>
              <span className="text-[11px] font-bold text-charcoal bg-white/80 border border-border px-3 py-1 rounded-full nm-inset">
                Hill Station Civil Engineering Specialists
              </span>
            </div>

            <h1
              className="font-heading font-bold text-charcoal mb-6 leading-[1.12]"
              style={{ fontSize: "var(--text-h1)" }}
            >
              Builders &amp; Construction in <em className="text-gold-dark not-italic">The Nilgiris &amp; Ooty</em>
            </h1>

            <p className="text-base md:text-lg text-concrete leading-relaxed max-w-3xl mb-8">
              Constructing in the Western Ghats demands specialized engineering: bedrock pile foundations,
              geotechnical slope anchoring, cold-weather concrete mix designs, and multi-barrier waterproofing.
              Through our branch office in Gudalur, Prasanth Associates delivers bespoke hillside homes and estates.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#local-contact-form"
                className="px-6 py-3.5 rounded-2xl bg-charcoal text-white hover:bg-gold hover:text-charcoal font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-md inline-flex items-center gap-2"
              >
                <span>Consult Nilgiris Architect</span>
                <ArrowRight size={15} />
              </a>

              <a
                href={nilgirisOffice.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 rounded-2xl bg-white border border-border text-charcoal hover:text-gold-dark font-bold text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-2"
              >
                <Navigation size={15} className="text-gold" />
                <span>Get Directions to Gudalur Office</span>
                <ExternalLink size={12} />
              </a>

              <a
                href={`https://wa.me/919360337733?text=${encodeURIComponent(
                  "Hello Prasanth Associates, I want to discuss a construction project in The Nilgiris / Ooty."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 rounded-2xl bg-[#25D366] text-white hover:bg-[#1EBE5D] font-bold text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-2 shadow-sm"
              >
                <MessageCircle size={15} />
                <span>WhatsApp Nilgiris Team</span>
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
                  Regional Branch Office
                </span>

                <div>
                  <h3 className="font-heading text-xl font-bold text-charcoal">
                    Prasanth Associates (Nilgiris)
                  </h3>
                  <p className="text-xs text-concrete mt-1">
                    Thiruvalluvar Commercial Complex, Ooty Main Road, Gudalur
                  </p>
                </div>

                <div className="space-y-3.5 text-xs text-charcoal pt-3 border-t border-border">
                  <div className="flex items-start gap-3">
                    <MapPin size={16} className="text-gold-dark flex-shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{nilgirisOffice.street}, {nilgirisOffice.city} – {nilgirisOffice.pincode}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone size={15} className="text-gold-dark flex-shrink-0" />
                    <a href={`tel:${nilgirisOffice.phone}`} className="font-mono font-bold hover:text-gold-dark transition-colors">
                      {nilgirisOffice.phone}
                    </a>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail size={15} className="text-gold-dark flex-shrink-0" />
                    <a href={`mailto:${nilgirisOffice.email}`} className="hover:text-gold-dark transition-colors">
                      {nilgirisOffice.email}
                    </a>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock size={15} className="text-gold-dark flex-shrink-0" />
                    <span>Monday – Saturday: 9:00 AM – 6:00 PM</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <Link
                    href="/services/villa-construction"
                    className="flex items-center justify-between p-3 rounded-2xl bg-linen hover:bg-gold/15 border border-border transition-colors text-xs font-bold text-charcoal"
                  >
                    <span>View Luxury Villa Construction Capabilities</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            </div>

            {/* Embedded Google Map */}
            <div className="lg:col-span-7 h-[380px] rounded-3xl overflow-hidden shadow-lg border border-border">
              <iframe
                src={nilgirisOffice.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Prasanth Associates Gudalur Nilgiris Office Map"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Hillside Construction Engineering Strengths ────────────── */}
      <section className="section bg-[var(--canvas-bg)]">
        <div className="container max-w-5xl space-y-12">
          <div className="text-center max-w-2xl mx-auto">
            <span className="badge-gold mb-2 inline-flex">Hillside Expertise</span>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-charcoal">
              Why Building in The Nilgiris Requires Special Engineering
            </h2>
            <p className="text-concrete text-xs md:text-sm mt-2">
              Unlike plains construction in Coimbatore, building in Ooty and Gudalur involves slope stability, high rainfall, and cold climate curing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-white border border-border shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-gold/15 text-gold-dark flex items-center justify-center font-bold">
                01
              </div>
              <h4 className="font-heading font-bold text-base text-charcoal">
                Bedrock Piling &amp; Slope Anchoring
              </h4>
              <p className="text-concrete text-xs leading-relaxed">
                Sloping plots require micro-piles drilled into granite bedrock combined with reinforced concrete retaining walls to eliminate landslide or downhill slip risks.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-border shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-gold/15 text-gold-dark flex items-center justify-center font-bold">
                02
              </div>
              <h4 className="font-heading font-bold text-base text-charcoal">
                Cold-Weather Curing Protocols
              </h4>
              <p className="text-concrete text-xs leading-relaxed">
                Low temperatures in Ooty slow concrete hydration. We use specialized non-chloride accelerators and insulated formwork to ensure structural strength reaches 100% design capacity.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-border shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-gold/15 text-gold-dark flex items-center justify-center font-bold">
                03
              </div>
              <h4 className="font-heading font-bold text-base text-charcoal">
                Multi-Layer Moisture Barriers
              </h4>
              <p className="text-concrete text-xs leading-relaxed">
                Persistent hill fogs and heavy monsoon rains cause dampness in poorly built homes. We install crystalline waterproofing membranes on all exterior masonry and roof eaves.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. Nilgiris Projects Showcase ─────────────────────────────── */}
      {ootyProjects.length > 0 && (
        <section className="py-20 bg-linen border-y border-border">
          <div className="container max-w-5xl space-y-10">
            <div>
              <span className="badge-gold mb-2 inline-flex">Hillside Portfolio</span>
              <h3 className="font-heading text-2xl md:text-3xl font-bold text-charcoal">
                Real Project: {ootyProjects[0].title}, Ooty
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white rounded-3xl p-6 md:p-8 border border-border">
              <div className="relative h-64 md:h-80 w-full rounded-2xl overflow-hidden bg-slate-100">
                <img
                  src={ootyProjects[0].image}
                  loading="lazy"
                  decoding="async"
                  alt={`${ootyProjects[0].title}, ${ootyProjects[0].type.toLowerCase()} by Prasanth Associates`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gold-dark bg-gold/10 px-3 py-1 rounded-full">
                  {ootyProjects[0].status === "completed" ? `Completed ${ootyProjects[0].year}` : "In progress"}
                </span>
                <h4 className="font-heading text-2xl font-bold text-charcoal">
                  {ootyProjects[0].title}
                </h4>
                <p className="text-concrete text-xs leading-relaxed">
                  {ootyProjects[0].shortDescription}
                </p>
                <div className="text-xs text-concrete space-y-1 border-y border-border py-3">
                  <div><strong>Location:</strong> {ootyProjects[0].location}</div>
                  <div><strong>Built-up Area:</strong> {ootyProjects[0].area}</div>
                  {ootyProjects[0].duration && (
                    <div><strong>Project Period:</strong> {ootyProjects[0].duration}</div>
                  )}
                </div>
                <Link
                  href={`/projects/${ootyProjects[0].slug}`}
                  className="inline-flex items-center gap-2 text-xs font-bold text-charcoal hover:text-gold-dark uppercase tracking-wider"
                >
                  <span>Read Full Case Study</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="pb-4 bg-[var(--canvas-bg)]">
        <div className="container max-w-5xl">
          <Link
            href="/locations/gudalur"
            className="flex items-center justify-between gap-4 p-6 rounded-3xl bg-white border border-border hover:border-gold transition-colors"
          >
            <div>
              <h3 className="font-heading font-bold text-charcoal text-base">
                Building in Gudalur specifically?
              </h3>
              <p className="text-concrete text-xs mt-1">
                Our Gudalur branch office page covers individual house construction at lower elevation - 
                heavier monsoon exposure, sloping laterite plots and ghat-road material logistics.
              </p>
            </div>
            <ArrowRight size={18} className="text-gold-dark flex-shrink-0" />
          </Link>
        </div>
      </section>

      {/* ── 5. Local Lead Form Section ────────────────────────────────── */}
      <section className="section bg-[var(--canvas-bg)]" id="local-contact-form">
        <div className="container max-w-3xl">
          <div className="neu-glass rounded-3xl p-8 md:p-10 border border-white/90 shadow-2xl">
            <div className="text-center max-w-xl mx-auto mb-8">
              <span className="badge-gold mb-2 inline-flex">Nilgiris Site Feasibility</span>
              <h3 className="font-heading text-2xl font-bold text-charcoal">
                Plan Your Hillside Project in The Nilgiris
              </h3>
              <p className="text-concrete text-xs md:text-sm mt-1">
                Tell us about your plot location in Ooty, Gudalur, Coonoor, or Kotagiri. Our regional civil engineers will evaluate soil and slope feasibility.
              </p>
            </div>

            <ContactForm isEstimate={true} />
          </div>
        </div>
      </section>

      <CTABanner
        headline="Building an estate or mountain villa in The Nilgiris?"
        subtitle="Consult our specialized hill-construction engineering team for a soil and slope feasibility review."
      />
    </>
  );
}
