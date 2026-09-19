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
  ChevronRight,
  ArrowRight,
  MessageCircle,
  Navigation,
  ExternalLink,
  CloudRain,
  Mountain,
  Trees,
  FileCheck2,
  Hammer,
  Truck,
} from "lucide-react";

const CANONICAL_URL = "https://prasanthassociates.com/locations/gudalur";
const BRANCH_ID = "https://prasanthassociates.com#gudalur-branch";

export const metadata: Metadata = {
  title: "Individual House Contractors in Gudalur | Branch Office",
  description:
    "Building contractors in Gudalur, The Nilgiris. Our branch office on Ooty Main Road builds individual houses and estate bungalows engineered for 2,500mm+ monsoon rainfall, sloping laterite terrain and Nilgiris hill-area building rules.",
  keywords: [
    "individual house contractors in Gudalur",
    "building contractors Gudalur",
    "house construction Gudalur",
    "civil contractors Gudalur Nilgiris",
    "estate bungalow builders Gudalur",
    "home builders Gudalur Tamil Nadu",
  ],
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    title: "Individual House Contractors in Gudalur | Prasanth Associates",
    description:
      "Our Nilgiris branch office builds individual houses and estate bungalows across Gudalur, engineered for heavy monsoon exposure and sloping hill terrain.",
    url: CANONICAL_URL,
    type: "website",
    locale: "en_IN",
    siteName: "Prasanth Associates",
    images: [{ url: "/images/hero/hero-main.webp", width: 1200, height: 630, alt: "Prasanth Associates" }],
  },
};

const climateEngineering = [
  {
    icon: CloudRain,
    title: "Built for Gudalur's Rainfall, Not Plains Rainfall",
    body:
      "Gudalur sits on the southwest monsoon's windward approach and takes substantially heavier and longer rainfall than Coimbatore or the Ooty plateau. That changes the detailing: steeper roof pitches with generous overhangs, oversized gutters and downpipes sized to peak intensity rather than annual average, and continuous damp-proof courses. Wall assemblies are specified to dry outward, because a detail that merely resists water will trap it over a monsoon that runs for months.",
  },
  {
    icon: Mountain,
    title: "Sloping Sites & Retaining Structures",
    body:
      "Very few Gudalur plots are genuinely flat. We survey the gradient and design stepped or split-level footings that follow the contour instead of demanding expensive cut-and-fill, with engineered RCC retaining walls that include weep holes and granular backfill drainage. An undrained retaining wall on a hill slope accumulates hydrostatic pressure through the monsoon and is among the most common structural failures we are called in to assess.",
  },
  {
    icon: Trees,
    title: "Laterite Hill Soil & Foundation Selection",
    body:
      "The Gudalur belt runs to lateritic and loamy hill soil over weathered rock at variable depth, so bearing capacity can differ significantly across a single plot. We commission an SBC test with bore logs positioned across the footprint rather than a single central hole, and select between stepped isolated footings, strip footings or a raft from that data.",
  },
  {
    icon: Hammer,
    title: "Damp, Fungal Growth & Interior Durability",
    body:
      "Prolonged humidity is the defining maintenance problem for Nilgiris homes. We specify cavity or rendered wall build-ups with breathable exterior finishes, anti-fungal treatment behind wet walls, cross-ventilated roof voids, and hardwood or engineered timber that has been properly seasoned for hill humidity rather than supplied to plains specification.",
  },
  {
    icon: FileCheck2,
    title: "Nilgiris Hill Area Approvals",
    body:
      "The Nilgiris is a regulated hill district, and construction here carries constraints that do not apply in Coimbatore — gradient and site coverage restrictions, height limits, and additional scrutiny for plots near reserve forest boundaries, which matters around Gudalur given its proximity to Mudumalai. We verify patta and land classification, confirm what the Gudalur municipal and district authorities require for your specific plot, and prepare the sanction drawings accordingly.",
  },
  {
    icon: Truck,
    title: "Material Logistics on Ghat Roads",
    body:
      "Every load of steel, cement and aggregate reaches a Gudalur site over ghat roads, which affects both cost and schedule in ways plains contractors routinely underestimate. We plan procurement in consolidated deliveries scheduled around monsoon windows and hold buffer stock on site, so that a week of heavy rain interrupts progress rather than halting it.",
  },
];

const buildTypes = [
  { name: "Individual houses", desc: "Single-family homes on sloping plots across Gudalur town and the surrounding settlements." },
  { name: "Estate bungalows", desc: "Residences on tea, coffee, pepper and cardamom holdings, including restoration of older estate houses." },
  { name: "Retirement & second homes", desc: "Low-maintenance hill residences for owners living primarily in Coimbatore, Bengaluru or Kerala." },
  { name: "Commercial buildings", desc: "Small commercial blocks and shop-cum-residence buildings along the Ooty Main Road corridor." },
];

const faqs = [
  {
    q: "Where is your Gudalur office located?",
    a: "Our Nilgiris branch office is at No: 6, Thiruvalluvar Commercial Complex, near the SBI ATM on Ooty Main Road, Gudalur – 643212. It is a staffed branch, not a correspondence address, and it serves Gudalur along with the wider Nilgiris district.",
  },
  {
    q: "What does house construction cost per square foot in Gudalur?",
    a: "Indicative ranges run ₹2,100–₹2,800/sq. ft. for standard residential specification, and ₹3,000–₹4,000/sq. ft. for premium estate bungalow specification. Hill construction carries a genuine premium over Coimbatore rates because of ghat-road material logistics, slope foundation work, retaining structures and the heavier weatherproofing the climate demands. Your itemized BoQ after the soil test is the binding figure.",
  },
  {
    q: "How long does a house take to build in Gudalur?",
    a: "Typically 10–14 months for an individual house, against 8–11 months for equivalent work in Coimbatore. The difference is largely monsoon scheduling — certain activities such as external plastering, painting and roof waterproofing need dry windows, so the programme is built around the rainfall calendar rather than assuming continuous working.",
  },
  {
    q: "Can you build on a steeply sloping plot?",
    a: "Yes, and most Gudalur plots slope to some degree. Stepped and split-level foundations that follow the natural contour are usually more economical than levelling a site, and they disturb slope stability less. The gradient, soil bearing data and drainage path determine the approach, which is why the feasibility survey precedes any design work.",
  },
  {
    q: "Do you handle approvals for Nilgiris hill area plots?",
    a: "Yes. We verify patta and land classification, establish which authority has jurisdiction over your plot, and prepare and file the sanction drawings. Nilgiris hill-area rules are stricter than plains rules on gradient, coverage and height, and plots near reserve forest boundaries attract additional scrutiny — we confirm these constraints during feasibility rather than discovering them after design.",
  },
  {
    q: "Do you also work in Ooty, Coonoor and Kotagiri?",
    a: "Yes. Gudalur is our branch office, but we build across the Nilgiris district. Our Nilgiris and Ooty regional page covers hillside villa work in Ooty, Coonoor and Kotagiri, where the higher elevation brings colder curing conditions and a different construction profile from Gudalur.",
  },
];

const gudalurSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "HomeAndConstructionBusiness",
      "@id": BRANCH_ID,
      name: `${company.name} — Gudalur Branch Office`,
      image: "https://prasanthassociates.com/images/hero/hero-main.webp",
      url: CANONICAL_URL,
      priceRange: "₹₹₹",
      parentOrganization: { "@id": "https://prasanthassociates.com#organization" },
      address: {
        "@type": "PostalAddress",
        streetAddress: "No: 6, Thiruvalluvar Commercial Complex, Near SBI ATM, Ooty Main Road",
        addressLocality: "Gudalur",
        addressRegion: "Tamil Nadu",
        postalCode: "643212",
        addressCountry: "IN",
      },
      geo: { "@type": "GeoCoordinates", latitude: 11.5001001, longitude: 76.4937999 },
      areaServed: [
        { "@type": "City", name: "Gudalur" },
        { "@type": "AdministrativeArea", name: "The Nilgiris" },
      ],
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          opens: "09:00",
          closes: "18:00",
        },
      ],
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
        { "@type": "ListItem", position: 2, name: "Locations", item: "https://prasanthassociates.com/locations/nilgiris-ooty" },
        { "@type": "ListItem", position: 3, name: "Gudalur", item: CANONICAL_URL },
      ],
    },
  ],
};

export default function GudalurLocationPage() {
  const gudalurOffice = company.offices.find((o) => o.label === "Gudalur") || company.offices[1];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(gudalurSchema).replace(/</g, "\\u003c"),
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
                <Link href="/locations/nilgiris-ooty" className="hover:text-gold-dark transition-colors">
                  Nilgiris
                </Link>
              </li>
              <li>
                <ChevronRight size={12} className="text-concrete-lighter" />
              </li>
              <li className="text-charcoal font-bold">Gudalur</li>
            </ol>
          </nav>

          <ScrollReveal>
            <div className="flex flex-wrap items-center gap-2.5 mb-5">
              <span className="nm-raised text-gold-dark px-4 py-1 rounded-full inline-flex items-center gap-2 text-[11px] font-bold tracking-wider uppercase border border-border">
                <MapPin size={12} className="text-gold-dark" />
                Branch Office · Ooty Main Road, Gudalur
              </span>
              <span className="text-[11px] font-bold text-charcoal bg-white/80 border border-border px-3 py-1 rounded-full nm-inset">
                Individual Houses &amp; Estate Bungalows
              </span>
            </div>

            <h1
              className="font-heading font-bold text-charcoal mb-6 leading-[1.12]"
              style={{ fontSize: "var(--text-h1)" }}
            >
              Individual House Contractors in{" "}
              <em className="text-gold-dark not-italic">Gudalur</em>
            </h1>

            <p className="text-base md:text-lg text-concrete leading-relaxed max-w-3xl mb-8">
              We keep a staffed branch office on Ooty Main Road, so Gudalur projects are supervised by
              engineers who live with this climate rather than visiting it. Homes here are detailed for
              a monsoon that runs for months, plots that slope, and material that arrives by ghat road.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#gudalur-consultation"
                className="px-6 py-3.5 rounded-2xl bg-charcoal text-white hover:bg-gold hover:text-charcoal font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-md inline-flex items-center gap-2"
              >
                <span>Book a Site Visit</span>
                <ArrowRight size={15} />
              </a>

              <a
                href={gudalurOffice.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 rounded-2xl bg-white border border-border text-charcoal hover:text-gold-dark font-bold text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-2"
              >
                <Navigation size={15} className="text-gold" />
                <span>Directions to Branch Office</span>
                <ExternalLink size={12} />
              </a>

              <a
                href={`https://wa.me/919486038761?text=${encodeURIComponent(
                  "Hello Prasanth Associates, I would like to discuss building a house in Gudalur."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 rounded-2xl bg-[#25D366] text-white hover:bg-[#1EBE5D] font-bold text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-2 shadow-sm"
              >
                <MessageCircle size={15} />
                <span>WhatsApp Branch</span>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── 2. Branch office + map ───────────────────────────────────── */}
      <section className="py-12 bg-linen border-b border-border">
        <div className="container max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white rounded-3xl p-8 border border-border shadow-sm space-y-5">
                <span className="text-[10px] font-bold uppercase tracking-widest text-gold-dark bg-gold/15 px-3 py-1 rounded-full border border-gold/30 inline-block">
                  Nilgiris Branch Office
                </span>

                <div>
                  <h2 className="font-heading text-xl font-bold text-charcoal">{company.name}</h2>
                  <p className="text-xs text-concrete mt-1">Thiruvalluvar Commercial Complex, Gudalur</p>
                </div>

                <div className="space-y-3.5 text-xs text-charcoal pt-3 border-t border-border">
                  <div className="flex items-start gap-3">
                    <MapPin size={16} className="text-gold-dark flex-shrink-0 mt-0.5" />
                    <span className="leading-relaxed">
                      {gudalurOffice.street}, {gudalurOffice.city} – {gudalurOffice.pincode}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone size={15} className="text-gold-dark flex-shrink-0" />
                    <a href={`tel:${gudalurOffice.phone}`} className="font-mono font-bold hover:text-gold-dark transition-colors">
                      {gudalurOffice.phone}
                    </a>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail size={15} className="text-gold-dark flex-shrink-0" />
                    <a href={`mailto:${gudalurOffice.email}`} className="hover:text-gold-dark transition-colors">
                      {gudalurOffice.email}
                    </a>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock size={15} className="text-gold-dark flex-shrink-0" />
                    <span>Monday – Saturday: 9:00 AM – 6:00 PM</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 h-[380px] rounded-3xl overflow-hidden shadow-lg border border-border">
              <iframe
                src={gudalurOffice.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Prasanth Associates Gudalur Branch Office Map"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Engineering for Gudalur conditions ────────────────────── */}
      <section className="py-14 md:py-20 bg-[var(--canvas-bg)]">
        <div className="container max-w-5xl space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="badge-gold mb-2 inline-flex">Hill Construction Engineering</span>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-charcoal">
              What Building in Gudalur Actually Demands
            </h2>
            <p className="text-concrete text-xs md:text-sm mt-2">
              A specification that performs in Coimbatore will not survive a Gudalur monsoon. These are
              the decisions that determine whether a hill home holds up over decades.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {climateEngineering.map((item) => (
              <ScrollReveal key={item.title}>
                <div className="p-6 rounded-3xl bg-white border border-border shadow-2xs hover:border-gold transition-colors h-full">
                  <div className="w-10 h-10 rounded-xl bg-gold/15 border border-gold/30 flex items-center justify-center mb-4">
                    <item.icon size={18} className="text-gold-dark" />
                  </div>
                  <h3 className="font-heading font-bold text-charcoal text-base mb-2">{item.title}</h3>
                  <p className="text-concrete text-xs leading-relaxed">{item.body}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. What we build + gallery ───────────────────────────────── */}
      <section className="py-14 md:py-20 bg-linen border-y border-border">
        <div className="container max-w-5xl space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="badge-gold mb-2 inline-flex">Project Types</span>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-charcoal">
              What We Build Around Gudalur
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {buildTypes.map((b) => (
              <div key={b.name} className="p-6 rounded-3xl bg-white border border-border shadow-2xs space-y-2">
                <div className="flex items-center gap-2 text-charcoal font-heading font-bold text-base">
                  <span className="w-2 h-2 rounded-full bg-gold" />
                  <h3>{b.name}</h3>
                </div>
                <p className="text-concrete text-xs leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-2xl bg-white border border-border flex items-start gap-3">
            <Mountain size={16} className="text-gold-dark flex-shrink-0 mt-0.5" />
            <p className="text-xs text-concrete leading-relaxed">
              Building higher up the plateau instead? Our{" "}
              <Link href="/locations/nilgiris-ooty" className="text-gold-dark font-bold hover:underline">
                Nilgiris &amp; Ooty regional page
              </Link>{" "}
              covers hillside villa construction in Ooty, Coonoor and Kotagiri, where colder curing
              conditions and higher elevation change the structural approach.
            </p>
          </div>
        </div>
      </section>

      {/* ── 5. FAQ ───────────────────────────────────────────────────── */}
      <section className="py-14 md:py-20 bg-[var(--canvas-bg)]">
        <div className="container max-w-3xl space-y-8">
          <div className="text-center">
            <span className="badge-gold mb-2 inline-flex">Frequently Asked Questions</span>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-charcoal">
              Building a House in Gudalur — Common Questions
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

      {/* ── 6. Lead form ─────────────────────────────────────────────── */}
      <section className="py-14 md:py-20 bg-[var(--canvas-bg)]" id="gudalur-consultation">
        <div className="container max-w-3xl">
          <div>
            <div className="text-center max-w-xl mx-auto mb-6">
              <span className="badge-gold mb-2 inline-flex">Gudalur Project Enquiry</span>
              <h3 className="font-heading text-2xl font-bold text-charcoal">
                Discuss Your Gudalur Home or Estate Project
              </h3>
              <p className="text-concrete text-xs md:text-sm mt-1">
                Tell us your plot location and what you want to build. Our branch engineer will review
                the gradient, soil profile and approval path before visiting the site with you.
              </p>
            </div>

            <ContactForm isEstimate={true} serviceSlug="residential-construction" />
          </div>
        </div>
      </section>

      <CTABanner
        headline="Planning to build in Gudalur or the wider Nilgiris?"
        subtitle="Visit our Ooty Main Road branch office, or book an engineer visit to your plot."
        primaryCTA={{ label: "Book a Site Visit", href: "#gudalur-consultation" }}
        secondaryCTA={{ label: "Nilgiris & Ooty Projects", href: "/locations/nilgiris-ooty" }}
      />
    </>
  );
}
