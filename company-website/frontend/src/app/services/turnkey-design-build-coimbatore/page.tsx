import { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/ui/ContactForm";
import ScrollReveal from "@/components/ui/ScrollReveal";
import CTABanner from "@/components/ui/CTABanner";
import {
  ChevronRight,
  ArrowRight,
  MessageCircle,
  ShieldCheck,
  Layers,
  Droplets,
  Zap,
  FileCheck2,
  ClipboardList,
  Building2,
  Home,
  Factory,
  Ruler,
  CheckCircle2,
  Landmark,
} from "lucide-react";

const CANONICAL_URL = "https://prasanthassociates.com/services/turnkey-design-build-coimbatore";

export const metadata: Metadata = {
  title: "Prasanth Associates | Turnkey Design & Build — Coimbatore",
  description:
    "DTCP/LPA-compliant turnkey design and build contractors in Coimbatore. Single-contract delivery from soil investigation to handover, with Fe 550D TMT steel, M20/M25 mix design, and itemized BoQ pricing.",
  keywords: [
    "turnkey builders in Coimbatore",
    "turnkey design and build Coimbatore",
    "turnkey construction company Coimbatore",
    "DTCP approved contractors Coimbatore",
    "CCMC building approval consultants",
    "structural stability certificate consultants Coimbatore",
    "bank valuation report civil engineer Coimbatore",
    "luxury villa construction Coimbatore",
    "commercial building contractors Coimbatore",
  ],
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    title: "Turnkey Design & Build Contractors in Coimbatore | Prasanth Associates",
    description:
      "Single-point engineering accountability from soil test to handover — DTCP/LPA approvals, structural design, civil execution, MEP, and interiors under one itemized contract.",
    url: CANONICAL_URL,
    type: "website",
    locale: "en_IN",
    siteName: "Prasanth Associates",
  },
};

const structuralPillars = [
  {
    icon: Layers,
    title: "Structural Steel & Concrete Mix Design",
    body:
      "Reinforcement is specified in Fe 550D TMT bars for main structural members, sourced with mill test certificates for every batch. Concrete grade is selected by member and load path: M20 design mix for plinth beams, footings, and residential slabs; M25 for columns, transfer beams, and any structure exceeding G+2. Every pour is verified with cube testing at 7, 14, and 28 days, and slump tests are logged on-site before placement.",
  },
  {
    icon: Ruler,
    title: "Foundation Design for Coimbatore's Soil Profile",
    body:
      "Coimbatore's subsoil varies sharply across the city — red gravelly and lateritic strata around Saravanampatti and Thudiyalur, harder rock-bearing strata near Vadavalli and Thondamuthur, and pockets of expansive black cotton soil closer to Sulur and the Noyyal belt. We commission a soil investigation report (SBC test and bore log) before finalizing footing type, choosing between isolated footings, combined footings, or a raft foundation based on the safe bearing capacity returned, not a standard default.",
  },
  {
    icon: Droplets,
    title: "Waterproofing & Groundwater Management",
    body:
      "Basement and podium levels are treated with crystalline waterproofing admixtures dosed at the batching stage, and terraces and wet areas receive torch-applied APP membrane with a protective screed. Where the water table is shallow — common in low-lying stretches near Ondipudur and along the Noyyal river corridor — we specify additional tanking and a perimeter french drain to keep hydrostatic pressure off the substructure.",
  },
  {
    icon: Zap,
    title: "MEP Design (Electrical, Plumbing, HVAC Provisioning)",
    body:
      "Electrical layouts use concealed PVC conduit with ELCB and MCB distribution boards sized to connected load, with dedicated circuits for kitchen, HVAC, and utility loads. Plumbing runs on CPVC for hot lines and UPVC for cold and drainage, pressure-tested before wall closure. Rainwater harvesting pits are sized to CCMC's mandated norms for the plot area, and sump/OHT capacity is calculated against occupancy, not a flat assumption.",
  },
  {
    icon: FileCheck2,
    title: "DTCP / LPA / CCMC Approval Management",
    body:
      "Depending on the plot's jurisdiction — Coimbatore City Municipal Corporation (CCMC) limits, or an outlying Local Planning Authority (LPA) / DTCP-controlled panchayat area — the approval pathway differs. We handle patta and FMB verification, FSI and setback compliance checks, structural drawing submission for plan sanction, and the building permit application, then close the loop with the completion certificate required for occupancy and utility connections.",
  },
  {
    icon: ShieldCheck,
    title: "Structural Stability Certificates & Bank Valuation Reports",
    body:
      "For existing structures being extended, mortgaged, or sold, our structural engineers issue Structural Stability Certificates after a physical condition assessment (crack mapping, rebound hammer testing where warranted, and load-bearing review). We also prepare Bank Valuation Reports formatted to the documentation standards used by nationalized and private lenders operating in Coimbatore.",
  },
];

const workflow = [
  {
    step: "01",
    title: "Site Feasibility & Soil Investigation",
    body: "Topographic survey, soil test (SBC/bore log), setback and FSI check against the plot's zoning classification, and a written feasibility brief before any design spend.",
  },
  {
    step: "02",
    title: "Architectural & Structural Design",
    body: "2D floor plans, 3D massing and elevations, structural drawings (footing, column, beam, and slab schedules), and MEP layouts, iterated with the client before submission.",
  },
  {
    step: "03",
    title: "Itemized BoQ & Contract Sign-Off",
    body: "A line-by-line Bill of Quantities covering material grade, brand allowances, and labor scope — reviewed jointly so pricing is fixed before the first excavation.",
  },
  {
    step: "04",
    title: "DTCP / LPA / CCMC Approval Filing",
    body: "Plan sanction, building permit, and any variance applications are filed and tracked to approval, with the client copied on every submission milestone.",
  },
  {
    step: "05",
    title: "Civil Execution & Milestone Tracking",
    body: "Excavation through superstructure is tracked against a milestone schedule shared with the client, with third-party cube test reports issued at each concrete pour.",
  },
  {
    step: "06",
    title: "MEP, Interiors, Snagging & Handover",
    body: "First and second fix MEP, finishing, a joint snag-list walkthrough, and handover with as-built drawings, warranty documentation, and the completion certificate.",
  },
];

const neighborhoodNotes = [
  { name: "Gandhipuram & Sathy Road", note: "Our head office corridor — dense commercial frontage, mixed-use redevelopment, and CCMC core-zone approval requirements." },
  { name: "Saravanampatti & Kalapatti", note: "Tech-corridor residential layouts and gated villa communities on gravelly soil; favors isolated footings with moderate SBC." },
  { name: "Peelamedu & Avinashi Road", note: "Institutional and commercial towers requiring higher-grade M25 structural members and stricter fire/setback compliance." },
  { name: "RS Puram & Race Course", note: "High-value individual bungalows and renovation-heavy structural stability certificate work on older plots." },
  { name: "Vadavalli & Thondamuthur", note: "Rock-bearing strata suited to shallow foundations; scenic elevation-facing custom villa builds." },
  { name: "Sulur & Ondipudur belt", note: "Industrial and warehousing plots with shallow water tables — waterproofing and drainage design are load-bearing decisions here, not finishing items." },
];

const faqs = [
  {
    q: "What is the realistic timeline for a turnkey design and build project in Coimbatore?",
    a: "For an independent residential home (G+1 to G+2, roughly 2,000–3,500 sq. ft.), design and approval typically take 6–8 weeks and civil-to-handover construction runs 8–11 months, depending on approval turnaround from CCMC or the local DTCP/LPA office. Commercial and industrial builds run longer due to structural load requirements and fire-safety NOC dependencies — we issue a project-specific schedule during the feasibility stage rather than quoting a generic figure.",
  },
  {
    q: "What does turnkey construction cost per square foot in Coimbatore?",
    a: "Indicative ranges for 2026 fall between ₹1,850–₹2,400/sq. ft. for standard residential specification, and ₹2,600–₹3,600/sq. ft. for luxury villa specification with premium waterproofing, smart-home provisioning, and higher-grade finishes. Commercial and industrial shell construction is quoted separately based on span, load, and MEP density. These figures are directional — your itemized BoQ, generated after the soil test and design stage, is the binding number.",
  },
  {
    q: "Do I need DTCP approval, LPA approval, or CCMC approval for my plot?",
    a: "It depends on jurisdiction. Plots within Coimbatore City Municipal Corporation limits go through CCMC's building plan sanction process. Plots in surrounding panchayats or growth areas typically fall under a Local Planning Authority (LPA) or DTCP-controlled zone, each with distinct FSI and setback norms. We verify jurisdiction from your patta and FMB sketch during the feasibility stage and file with the correct authority — misfiling is one of the most common causes of approval delay.",
  },
  {
    q: "How do you account for Coimbatore's varying soil and groundwater conditions?",
    a: "We do not use a single default foundation design across the city. A soil investigation (SBC test and bore log) is commissioned for every project, and the footing type — isolated, combined, or raft — is selected from that data. In low-lying or shallow-water-table zones, we add tanking and perimeter drainage at the foundation stage rather than treating waterproofing as a finishing-stage add-on.",
  },
  {
    q: "Is the pricing really fixed, or are there hidden escalation costs?",
    a: "The itemized BoQ signed before construction begins specifies material grade, brand allowances, and quantities line by line. Costs only move if the client requests a scope change (e.g., upgrading a finish or altering the structural plan) — any such change is documented and priced before execution, not added retroactively to the final bill.",
  },
  {
    q: "Can I get a Structural Stability Certificate for an existing building?",
    a: "Yes. Our structural engineers conduct a physical condition assessment — crack mapping, rebound hammer testing where the concrete's history warrants it, and a load-bearing review — and issue a certificate suitable for bank loan documentation, insurance, or statutory compliance filings.",
  },
  {
    q: "What warranty applies to the structural work?",
    a: "Structural work (RCC framework, footing, and waterproofing at the substructure) carries a workmanship warranty documented in the contract, separate from manufacturer warranties on fittings, electrical components, and finishes, which are passed through at handover.",
  },
  {
    q: "Can the design be modified after construction has started?",
    a: "Structural elements (footing, column positions, beam spans) are locked once DTCP/LPA/CCMC approval is granted, since any change requires a revised sanction. Non-structural elements — internal partitions, finishes, MEP fixtures — can be revised through a documented change order without restarting the approval process.",
  },
];

const localSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${CANONICAL_URL}#service`,
      name: "Turnkey Design & Build — Coimbatore",
      serviceType: "Turnkey Design and Construction",
      provider: {
        "@type": "GeneralContractor",
        name: "Prasanth Associates",
        telephone: "+919486038761",
        email: "info@prasanthassociates.com",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Second Floor, Sowma Complex, Gandhipuram, Sathy Road",
          addressLocality: "Coimbatore",
          addressRegion: "Tamil Nadu",
          postalCode: "641012",
          addressCountry: "IN",
        },
      },
      areaServed: {
        "@type": "City",
        name: "Coimbatore",
      },
      description:
        "Single-contract turnkey design and build service covering soil investigation, DTCP/LPA/CCMC approvals, structural and MEP design, civil execution, and interior handover in Coimbatore.",
      url: CANONICAL_URL,
    },
    {
      "@type": "FAQPage",
      "@id": `${CANONICAL_URL}#faq`,
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: f.a,
        },
      })),
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${CANONICAL_URL}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://prasanthassociates.com" },
        { "@type": "ListItem", position: 2, name: "Services", item: "https://prasanthassociates.com/services" },
        { "@type": "ListItem", position: 3, name: "Turnkey Design & Build — Coimbatore", item: CANONICAL_URL },
      ],
    },
  ],
};

export default function TurnkeyDesignBuildCoimbatorePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localSchema).replace(/</g, "\\u003c"),
        }}
      />

      {/* ── 1. Hero ──────────────────────────────────────────────────── */}
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
                <Link href="/services" className="hover:text-gold-dark transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <ChevronRight size={12} className="text-concrete-lighter" />
              </li>
              <li className="text-charcoal font-bold">Turnkey Design & Build — Coimbatore</li>
            </ol>
          </nav>

          <ScrollReveal>
            <div className="flex flex-wrap items-center gap-2.5 mb-5">
              <span className="nm-raised text-gold-dark px-4 py-1 rounded-full inline-flex items-center gap-2 text-[11px] font-bold tracking-wider uppercase border border-border">
                <Landmark size={12} className="text-gold-dark" />
                Engineering-First · Gandhipuram, Coimbatore
              </span>
              <span className="text-[11px] font-bold text-charcoal bg-white/80 border border-border px-3 py-1 rounded-full nm-inset">
                Single Contract, Soil Test to Handover
              </span>
            </div>

            <h1
              className="font-heading font-bold text-charcoal mb-6 leading-[1.12]"
              style={{ fontSize: "var(--text-h1)" }}
            >
              Turnkey Design &amp; Build Contractors in{" "}
              <em className="text-gold-dark not-italic">Coimbatore</em>
            </h1>

            <p className="text-base md:text-lg text-concrete leading-relaxed max-w-3xl mb-8">
              One engineering contract, one accountable team, from the soil investigation on your plot
              through DTCP/LPA/CCMC approval, structural execution, MEP, and final handover. No
              architect-versus-contractor finger-pointing, no verbal cost escalations — every material
              grade and quantity is fixed in an itemized Bill of Quantities before excavation starts.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#feasibility-consultation"
                className="px-6 py-3.5 rounded-2xl bg-charcoal text-white hover:bg-gold hover:text-charcoal font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-md inline-flex items-center gap-2"
              >
                <span>Book a Site Feasibility Consultation</span>
                <ArrowRight size={15} />
              </a>

              <a
                href="#feasibility-consultation"
                className="px-5 py-3.5 rounded-2xl bg-white border border-border text-charcoal hover:text-gold-dark font-bold text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-2"
              >
                <ClipboardList size={15} className="text-gold" />
                <span>Request a Structural Brief Review</span>
              </a>

              <a
                href={`https://wa.me/919486038761?text=${encodeURIComponent(
                  "Hello Prasanth Associates, I would like a turnkey design and build consultation for a project in Coimbatore."
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

      {/* ── 2. What "Turnkey" Actually Means Here ───────────────────── */}
      <section className="section bg-linen border-b border-border">
        <div className="container max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5">
            <span className="badge-gold mb-3 inline-flex">Single-Point Accountability</span>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-charcoal leading-tight">
              A Single Contract From Land Survey to Final Snag-List
            </h2>
            <p className="text-concrete text-sm mt-4 leading-relaxed">
              Splitting a project across a separate architect, structural consultant, and civil
              contractor creates gaps where accountability disappears — a design change that no one
              re-costs, a foundation detail the contractor was never told about. Our turnkey scope
              closes those gaps under one engineering-led contract.
            </p>
          </div>
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              "Topographic survey & soil investigation",
              "2D/3D architectural design & elevations",
              "Structural design (footing, column, beam, slab)",
              "MEP design — electrical, plumbing, provisioning",
              "DTCP / LPA / CCMC plan sanction & permits",
              "Civil execution with milestone tracking",
              "Interior design & smart home integration",
              "Structural stability & bank valuation reports",
            ].map((item) => (
              <div key={item} className="flex items-start gap-2.5 p-4 rounded-2xl bg-white border border-border">
                <CheckCircle2 size={16} className="text-gold-dark flex-shrink-0 mt-0.5" />
                <span className="text-xs text-charcoal font-medium leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Engineering Specification Detail ─────────────────────── */}
      <section className="section bg-[var(--canvas-bg)]">
        <div className="container max-w-5xl space-y-12">
          <div className="text-center max-w-2xl mx-auto">
            <span className="badge-gold mb-2 inline-flex">Engineering-First Philosophy</span>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-charcoal">
              Built to Specification, Not Site Guesswork
            </h2>
            <p className="text-concrete text-xs md:text-sm mt-2">
              Every material grade, structural decision, and approval step below is decided by
              site-specific data — not applied as a citywide default.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {structuralPillars.map((pillar) => (
              <ScrollReveal key={pillar.title}>
                <div className="p-6 rounded-3xl bg-white border border-border shadow-2xs hover:border-gold transition-colors h-full">
                  <div className="w-10 h-10 rounded-xl bg-gold/15 border border-gold/30 flex items-center justify-center mb-4">
                    <pillar.icon size={18} className="text-gold-dark" />
                  </div>
                  <h3 className="font-heading font-bold text-charcoal text-base mb-2">{pillar.title}</h3>
                  <p className="text-concrete text-xs leading-relaxed">{pillar.body}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Local Relevance — Coimbatore Micro-Markets ───────────── */}
      <section className="section bg-linen border-y border-border">
        <div className="container max-w-5xl space-y-10">
          <div className="text-center max-w-2xl mx-auto">
            <span className="badge-gold mb-2 inline-flex">Local Site Knowledge</span>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-charcoal">
              Construction Conditions Across Coimbatore
            </h2>
            <p className="text-concrete text-xs md:text-sm mt-2">
              Operating from Gandhipuram on Sathy Road, our site engineers carry direct experience of
              how soil, water table, and municipal jurisdiction shift block by block across the city.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {neighborhoodNotes.map((n) => (
              <div
                key={n.name}
                className="p-6 rounded-3xl bg-white border border-border shadow-2xs hover:border-gold transition-colors space-y-2"
              >
                <div className="flex items-center gap-2 text-charcoal font-heading font-bold text-base">
                  <span className="w-2 h-2 rounded-full bg-gold" />
                  <h3>{n.name}</h3>
                </div>
                <p className="text-concrete text-xs leading-relaxed">{n.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Delivery Workflow ─────────────────────────────────────── */}
      <section className="section bg-[var(--canvas-bg)]">
        <div className="container max-w-5xl space-y-10">
          <div className="text-center max-w-2xl mx-auto">
            <span className="badge-gold mb-2 inline-flex">Project Management Workflow</span>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-charcoal">
              Our 6-Stage Turnkey Delivery Workflow
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workflow.map((step) => (
              <div key={step.step} className="p-6 rounded-3xl bg-white border border-border shadow-2xs space-y-3">
                <span className="font-heading text-3xl font-bold text-gold/50">{step.step}</span>
                <h3 className="font-heading font-bold text-charcoal text-base">{step.title}</h3>
                <p className="text-concrete text-xs leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. Project Gallery Placeholders ──────────────────────────── */}
      <section className="section bg-linen border-y border-border">
        <div className="container max-w-5xl space-y-10">
          <div className="text-center max-w-2xl mx-auto">
            <span className="badge-gold mb-2 inline-flex">Delivered in Coimbatore</span>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-charcoal">
              Turnkey Projects Across Residential, Commercial &amp; Industrial
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Home, alt: "[Image: Completed G+2 luxury villa with landscaped courtyard - Residential Client - Vadavalli, Coimbatore]" },
              { icon: Building2, alt: "[Image: Commercial office tower facade under construction - Commercial Client - Gandhipuram, Coimbatore]" },
              { icon: Factory, alt: "[Image: Pre-engineered industrial warehouse shed with RCC foundation - Industrial Client - Sulur, Coimbatore]" },
              { icon: Home, alt: "[Image: Interior-fitted duplex living room with smart home panel - Residential Client - Saravanampatti, Coimbatore]" },
              { icon: Building2, alt: "[Image: Retail fit-out storefront on ground floor commercial unit - Commercial Client - Avinashi Road, Coimbatore]" },
              { icon: Ruler, alt: "[Image: Site engineer reviewing structural drawings on active RCC framework - Residential Client - Thudiyalur, Coimbatore]" },
            ].map((img, i) => (
              <div
                key={i}
                role="img"
                aria-label={img.alt}
                className="aspect-[4/3] rounded-3xl bg-white border border-border border-dashed flex flex-col items-center justify-center gap-3 text-center p-6"
              >
                <img.icon size={28} className="text-gold-dark/60" />
                <span className="text-[10px] text-concrete-lighter leading-relaxed px-2">{img.alt}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. FAQ ───────────────────────────────────────────────────── */}
      <section className="section bg-[var(--canvas-bg)]">
        <div className="container max-w-3xl space-y-10">
          <div className="text-center">
            <span className="badge-gold mb-2 inline-flex">Frequently Asked Questions</span>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-charcoal">
              Turnkey Construction in Coimbatore — Buyer Questions
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

      {/* ── 8. Feasibility Consultation Form ─────────────────────────── */}
      <section className="section bg-[var(--canvas-bg)]" id="feasibility-consultation">
        <div className="container max-w-3xl">
          <div className="neu-glass rounded-3xl p-8 md:p-10 border border-white/90 shadow-2xl">
            <div className="text-center max-w-xl mx-auto mb-8">
              <span className="badge-gold mb-2 inline-flex">Book a Site Visit</span>
              <h3 className="font-heading text-2xl font-bold text-charcoal">
                Book a Site Feasibility Consultation or Structural Brief Review
              </h3>
              <p className="text-concrete text-xs md:text-sm mt-1">
                Share your plot location and project scope. A principal civil engineer reviews the
                jurisdiction (CCMC / LPA / DTCP), soil profile, and approval path before we schedule an
                in-person site visit — no cost or obligation for the initial review.
              </p>
            </div>

            <ContactForm
              isEstimate={true}
              serviceSlug="turnkey-construction"
              serviceTitle="Turnkey Design & Build"
            />
          </div>
        </div>
      </section>

      <CTABanner
        headline="Ready to put your Coimbatore project under one accountable contract?"
        subtitle="From soil investigation to handover — book a site feasibility consultation with our engineering team."
        primaryCTA={{ label: "Book Site Feasibility Consultation", href: "#feasibility-consultation" }}
        secondaryCTA={{ label: "View All Services", href: "/services" }}
      />
    </>
  );
}
