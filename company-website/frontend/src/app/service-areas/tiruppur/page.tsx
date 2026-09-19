import { Metadata } from "next";
import Link from "next/link";
import { company } from "@/data/company";
import ContactForm from "@/components/ui/ContactForm";
import ScrollReveal from "@/components/ui/ScrollReveal";
import CTABanner from "@/components/ui/CTABanner";
import {
  ChevronRight,
  ArrowRight,
  MessageCircle,
  Factory,
  Warehouse,
  Droplets,
  FileCheck2,
  Truck,
  ShieldCheck,
  Building2,
  CheckCircle2,
  Route,
} from "lucide-react";

const CANONICAL_URL = "https://prasanthassociates.com/service-areas/tiruppur";

export const metadata: Metadata = {
  title: "Commercial & Industrial Building Contractors Serving Tiruppur",
  description:
    "Commercial, factory and warehouse construction across Tiruppur, delivered from our Coimbatore head office. PEB industrial sheds, ZLD-compliant dyeing unit civil works, TNPCB and Factories Act coordination, itemized BoQ pricing.",
  keywords: [
    "commercial building contractors Tiruppur",
    "industrial construction Tiruppur",
    "factory construction companies Tiruppur",
    "warehouse construction Tiruppur",
    "garment factory building contractors Tiruppur",
    "PEB shed contractors Tiruppur",
    "knitwear unit construction Tiruppur",
  ],
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    title: "Commercial & Industrial Contractors Serving Tiruppur | Prasanth Associates",
    description:
      "Factory, warehouse and commercial construction in Tiruppur, delivered from our Coimbatore head office with full-time site supervision.",
    url: CANONICAL_URL,
    type: "website",
    locale: "en_IN",
    siteName: "Prasanth Associates",
    images: [{ url: "/images/hero/hero-main.webp", width: 1200, height: 630, alt: "Prasanth Associates" }],
  },
};

const buildTypes = [
  {
    icon: Factory,
    title: "Knitwear & Garment Production Units",
    body:
      "Column-free production floors built on pre-engineered steel (PEB) portal frames, sized for cutting, stitching and checking lines with clear spans of 18–30m. Floor slabs are specified for point loads from compactors and calendering machines rather than generic residential loading, and natural-light bays are planned to cut daytime lighting load on the shop floor.",
  },
  {
    icon: Droplets,
    title: "Dyeing & Processing Unit Civil Works",
    body:
      "Tiruppur's dyeing sector operates under a Zero Liquid Discharge mandate, so the civil scope is inseparable from effluent handling. We build acid-resistant tiled and epoxy-screed flooring, bunded chemical storage areas, RCC effluent collection tanks with chemical-resistant lining, and the structural platforms that carry the ETP/RO skids — coordinated against the TNPCB consent conditions for the site.",
  },
  {
    icon: Warehouse,
    title: "Warehousing & Godown Structures",
    body:
      "Export godowns and raw-material stores with FM-2-style floor flatness where forklift traffic demands it, ramp and dock-leveller pits set to container-bed height, and roof systems detailed for the monsoon runoff volumes the Kongu belt actually sees. Fire compartmentation and access roads are planned to satisfy the fire NOC at design stage, not retrofitted.",
  },
  {
    icon: Building2,
    title: "Commercial Buildings & Corporate Offices",
    body:
      "Buyer-facing showrooms, merchandising offices and corporate blocks for export houses, where the building is part of how an overseas buyer audits the supplier. M25 grade structural members for multi-storey frames, with MEP provisioning for server rooms, sampling units and conference facilities.",
  },
  {
    icon: ShieldCheck,
    title: "Worker Amenity & Hostel Blocks",
    body:
      "Compliant canteen, restroom and hostel accommodation blocks — increasingly scrutinised during international buyer and social-compliance audits. Built to the sanitation, ventilation and occupancy ratios those audits assess, with documentation suitable for submission.",
  },
  {
    icon: FileCheck2,
    title: "Approvals & Statutory Coordination",
    body:
      "Industrial projects in Tiruppur typically need building approval from the Tiruppur City Municipal Corporation or the relevant DTCP/LPA authority, TNPCB consent to establish and operate, a Factories Act licence, and a fire service NOC. We prepare and coordinate the civil and structural documentation each of these requires, and sequence them so one approval is not waiting on another.",
  },
];

const deliveryModel = [
  {
    icon: Route,
    title: "50km from our Coimbatore head office",
    body: "Tiruppur sits roughly 50km east of our Gandhipuram office along the Avinashi Road / NH-544 corridor — under 90 minutes, which makes same-day engineering visits practical throughout the build.",
  },
  {
    icon: Truck,
    title: "Resident site engineer, not a subcontracted crew",
    body: "Projects in Tiruppur are run by our own site engineer stationed at the site for the duration, reporting to the same principal engineer who signed off your structural drawings.",
  },
  {
    icon: CheckCircle2,
    title: "Material procurement on our Coimbatore rate contracts",
    body: "Steel, cement and aggregate are procured against the same rate contracts we use in Coimbatore, so a Tiruppur project is not priced against a thinner local supply chain.",
  },
];

const faqs = [
  {
    q: "Do you have an office in Tiruppur?",
    a: "No. Our offices are in Coimbatore (head office, Gandhipuram) and Gudalur in The Nilgiris. Tiruppur projects are delivered from the Coimbatore office, roughly 50km away, with a resident site engineer posted at your site for the duration of the build. We would rather state that plainly than imply a local branch we do not have.",
  },
  {
    q: "Does not having a local office affect supervision quality?",
    a: "Supervision is by a full-time site engineer stationed at the project, so day-to-day oversight is continuous regardless of where the office sits. The practical difference is that senior engineering review happens on a scheduled visit rather than an unannounced drop-in — which is why the milestone schedule and photographic progress reporting are contractual rather than informal.",
  },
  {
    q: "What does industrial construction cost per square foot in Tiruppur?",
    a: "Pre-engineered industrial sheds typically fall between ₹1,400–₹2,100/sq. ft. depending on clear span, eaves height and crane provision. RCC-framed commercial buildings run higher, generally ₹2,200–₹3,000/sq. ft. Dyeing and processing units vary widest because the effluent-handling civil scope dominates the cost. These are directional figures — the itemized BoQ issued after the soil test and structural design is the binding number.",
  },
  {
    q: "Can you handle TNPCB and Zero Liquid Discharge compliance requirements?",
    a: "We handle the civil and structural scope that the consent conditions depend on: effluent collection tanks, chemical-resistant flooring and bunding, ETP/RO equipment foundations and platforms, and the drainage separation that a ZLD system requires. The process design and consent application itself is normally handled by your environmental consultant, and we build to coordinate with it rather than replacing that role.",
  },
  {
    q: "How long does a factory or warehouse build take in Tiruppur?",
    a: "A straightforward PEB warehouse of 20,000–40,000 sq. ft. typically runs 5–7 months from foundation to handover, with steel fabrication lead time being the critical path. Production units with significant effluent or utility scope run 9–14 months. Statutory approval timelines sit outside our control and are tracked separately in the project schedule.",
  },
  {
    q: "What soil conditions should I expect on a Tiruppur industrial plot?",
    a: "The Tiruppur belt is generally flat with red loamy and gravelly strata offering reasonable bearing capacity, but black cotton soil pockets do occur, particularly toward the Palladam and Avinashi sides. Black cotton soil is expansive and will crack slab-on-grade floors if treated as ordinary fill, so we commission an SBC test and bore log for every plot and design the foundation and floor sub-base from that data.",
  },
];

const tiruppurSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${CANONICAL_URL}#service`,
      name: "Commercial & Industrial Construction — Tiruppur",
      serviceType: "Commercial and Industrial Building Construction",
      provider: { "@id": "https://prasanthassociates.com#organization" },
      areaServed: { "@type": "City", name: "Tiruppur" },
      description:
        "Factory, warehouse, dyeing unit and commercial building construction across Tiruppur, delivered from the Prasanth Associates head office in Coimbatore.",
      url: CANONICAL_URL,
    },
    {
      "@type": "FAQPage",
      "@id": `${CANONICAL_URL}#faq`,
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${CANONICAL_URL}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://prasanthassociates.com" },
        { "@type": "ListItem", position: 2, name: "Service Areas", item: "https://prasanthassociates.com/service-areas/tiruppur" },
        { "@type": "ListItem", position: 3, name: "Tiruppur", item: CANONICAL_URL },
      ],
    },
  ],
};

export default function TiruppurServiceAreaPage() {
  const headOffice = company.offices.find((o) => o.label === "Coimbatore") || company.offices[0];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(tiruppurSchema).replace(/</g, "\\u003c"),
        }}
      />

      {/* ── 1. Hero ──────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-14 bg-gradient-to-b from-[#FAF8F5] to-[var(--canvas-bg)] text-charcoal border-b border-border overflow-hidden">
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
                <Link href="/services" className="hover:text-gold-dark transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <ChevronRight size={12} className="text-concrete-lighter" />
              </li>
              <li className="text-charcoal font-bold">Tiruppur Service Area</li>
            </ol>
          </nav>

          <ScrollReveal>
            <div className="flex flex-wrap items-center gap-2.5 mb-5">
              <span className="nm-raised text-gold-dark px-4 py-1 rounded-full inline-flex items-center gap-2 text-[11px] font-bold tracking-wider uppercase border border-border">
                <Route size={12} className="text-gold-dark" />
                Service Area · Delivered from Coimbatore
              </span>
              <span className="text-[11px] font-bold text-charcoal bg-white/80 border border-border px-3 py-1 rounded-full nm-inset">
                Industrial · Commercial · Warehousing
              </span>
            </div>

            <h1
              className="font-heading font-bold text-charcoal mb-6 leading-[1.12]"
              style={{ fontSize: "var(--text-h1)" }}
            >
              Commercial &amp; Industrial Building Contractors Serving{" "}
              <em className="text-gold-dark not-italic">Tiruppur</em>
            </h1>

            <p className="text-base md:text-lg text-concrete leading-relaxed max-w-3xl mb-4">
              Factory units, export godowns, dyeing and processing facilities, and corporate blocks
              across Tiruppur — engineered for the loads, effluent handling and buyer-audit standards
              the knitwear sector actually operates under.
            </p>

            <div className="flex items-start gap-3 p-4 rounded-2xl bg-white/80 border border-border max-w-3xl mb-8">
              <Route size={16} className="text-gold-dark flex-shrink-0 mt-0.5" />
              <p className="text-xs text-charcoal leading-relaxed">
                <strong>We do not have an office in Tiruppur.</strong> Projects here are delivered from
                our Coimbatore head office at Gandhipuram, roughly 50km away, with a resident site
                engineer posted at your site for the full duration of the build.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#tiruppur-consultation"
                className="px-6 py-3.5 rounded-2xl bg-charcoal text-white hover:bg-gold hover:text-charcoal font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-md inline-flex items-center gap-2"
              >
                <span>Book a Site Feasibility Visit</span>
                <ArrowRight size={15} />
              </a>

              <a
                href={`https://wa.me/919486038761?text=${encodeURIComponent(
                  "Hello Prasanth Associates, I would like to discuss an industrial or commercial project in Tiruppur."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 rounded-2xl bg-[#25D366] text-white hover:bg-[#1EBE5D] font-bold text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-2 shadow-sm"
              >
                <MessageCircle size={15} />
                <span>WhatsApp Us</span>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── 2. How we deliver without a local office ─────────────────── */}
      <section className="py-14 md:py-20 bg-linen border-b border-border">
        <div className="container max-w-5xl space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="badge-gold mb-2 inline-flex">How Delivery Works</span>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-charcoal">
              Run From Coimbatore, Supervised On-Site in Tiruppur
            </h2>
            <p className="text-concrete text-xs md:text-sm mt-2">
              A single engineering team carries your project end to end, rather than handing execution
              to a local subcontractor once the drawings are signed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {deliveryModel.map((d) => (
              <div key={d.title} className="p-6 rounded-3xl bg-white border border-border shadow-2xs space-y-3">
                <div className="w-10 h-10 rounded-xl bg-gold/15 border border-gold/30 flex items-center justify-center">
                  <d.icon size={18} className="text-gold-dark" />
                </div>
                <h3 className="font-heading font-bold text-charcoal text-base">{d.title}</h3>
                <p className="text-concrete text-xs leading-relaxed">{d.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. What we build in Tiruppur ─────────────────────────────── */}
      <section className="py-14 md:py-20 bg-[var(--canvas-bg)]">
        <div className="container max-w-5xl space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="badge-gold mb-2 inline-flex">Built for the Knitwear Belt</span>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-charcoal">
              What We Build Across Tiruppur
            </h2>
            <p className="text-concrete text-xs md:text-sm mt-2">
              Tiruppur is an export manufacturing economy, and its buildings carry loads, chemicals and
              audit scrutiny that generic commercial construction does not account for.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {buildTypes.map((b) => (
              <ScrollReveal key={b.title}>
                <div className="p-6 rounded-3xl bg-white border border-border shadow-2xs hover:border-gold transition-colors h-full">
                  <div className="w-10 h-10 rounded-xl bg-gold/15 border border-gold/30 flex items-center justify-center mb-4">
                    <b.icon size={18} className="text-gold-dark" />
                  </div>
                  <h3 className="font-heading font-bold text-charcoal text-base mb-2">{b.title}</h3>
                  <p className="text-concrete text-xs leading-relaxed">{b.body}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. FAQ ───────────────────────────────────────────────────── */}
      <section className="py-14 md:py-20 bg-linen border-y border-border">
        <div className="container max-w-3xl space-y-8">
          <div className="text-center">
            <span className="badge-gold mb-2 inline-flex">Frequently Asked Questions</span>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-charcoal">
              Building in Tiruppur — Common Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq) => (
              <details
                key={faq.q}
                className="group p-5 rounded-2xl bg-white border border-border open:border-gold transition-colors"
              >
                <summary className="cursor-pointer font-heading font-bold text-charcoal text-sm flex items-center justify-between gap-4 list-none">
                  {faq.q}
                  <ChevronRight
                    size={16}
                    className="text-gold-dark flex-shrink-0 transition-transform group-open:rotate-90"
                  />
                </summary>
                <p className="text-concrete text-xs leading-relaxed mt-3">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Head office reference + form ──────────────────────────── */}
      <section className="py-14 md:py-20 bg-[var(--canvas-bg)]" id="tiruppur-consultation">
        <div className="container max-w-3xl space-y-6">
          <div className="p-5 rounded-2xl bg-white border border-border flex items-start gap-3">
            <Building2 size={16} className="text-gold-dark flex-shrink-0 mt-0.5" />
            <p className="text-xs text-concrete leading-relaxed">
              Tiruppur enquiries are handled from our head office at {headOffice.street},{" "}
              {headOffice.city} – {headOffice.pincode}. See the{" "}
              <Link href="/locations/coimbatore" className="text-gold-dark font-bold hover:underline">
                Coimbatore office page
              </Link>{" "}
              for directions, or read how our{" "}
              <Link
                href="/services/turnkey-design-build-coimbatore"
                className="text-gold-dark font-bold hover:underline"
              >
                turnkey design &amp; build contract
              </Link>{" "}
              works.
            </p>
          </div>

          <div>
            <div className="text-center max-w-xl mx-auto mb-6">
              <span className="badge-gold mb-2 inline-flex">Tiruppur Project Enquiry</span>
              <h3 className="font-heading text-2xl font-bold text-charcoal">
                Discuss Your Tiruppur Factory or Commercial Build
              </h3>
              <p className="text-concrete text-xs md:text-sm mt-1">
                Share your plot location and production requirement. A principal engineer will review
                the soil profile, statutory path and structural approach before we schedule a site visit.
              </p>
            </div>

            <ContactForm isEstimate={true} serviceSlug="industrial-factory-construction" />
          </div>
        </div>
      </section>

      <CTABanner
        headline="Planning a factory, godown or commercial block in Tiruppur?"
        subtitle="Book a site feasibility visit with the engineering team that will actually run your project."
        primaryCTA={{ label: "Book a Site Visit", href: "#tiruppur-consultation" }}
        secondaryCTA={{ label: "View All Services", href: "/services" }}
      />
    </>
  );
}
