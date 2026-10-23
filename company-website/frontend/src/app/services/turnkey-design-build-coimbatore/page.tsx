import type { Metadata } from "next";
import Link from "next/link";
import { Droplets, FileCheck2, Layers } from "lucide-react";
import { services } from "@/data/services";
import type { ServiceFaq } from "@/data/serviceFaqs";
import { projects, projectAreas } from "@/data/projects";
import { SITE_URL, ORG_ID } from "@/lib/seo";
import { serviceMetadata } from "@/lib/serviceSeo";
import ServiceLanding from "@/components/services/ServiceLanding";
import ScrollReveal from "@/components/ui/ScrollReveal";

const CANONICAL_URL = `${SITE_URL}/services/turnkey-design-build-coimbatore`;

export const metadata: Metadata = serviceMetadata("turnkey-construction");

const service = services.find((entry) => entry.slug === "turnkey-construction")!;

// Same copy rules as serviceFaqs.ts: answer first, plain English, confirmed facts
// only, no prices, guarantees, registrations, em dashes or spaced hyphens.
const faqs: ServiceFaq[] = [
  {
    q: "What does turnkey construction include?",
    a: "One contract covers the soil test, design, structural and services drawings, help with plan approval, construction and interiors. You deal with one team and one schedule, and the scope is written into an itemised BoQ before any work starts.",
  },
  {
    q: "How long does a turnkey house take in Coimbatore?",
    a: "It depends on the size and design of the building, the approval process for your plot and the decisions you make along the way. We give you a written schedule for your own project after the site visit and design stage, rather than a standard figure.",
  },
  {
    q: "What does turnkey construction cost per square foot in Coimbatore?",
    a: "We do not quote a standard rate per square foot, because a single rate hides what is included. After the site visit and design, we price your building in an itemised BoQ, so you can see the cost of each item of work. Our [guide to reading a BOQ](/blog/how-to-read-a-construction-boq) explains what to look for.",
  },
  {
    q: "Which authority approves a building plan in Coimbatore?",
    a: "It depends on where the plot is. Plots inside Coimbatore Corporation limits go to CCMC, and plots outside usually come under DTCP or the local planning authority. We check this from your plot documents early and help prepare the application; the decision rests with the authority. Our [plan approval article](/blog/building-plan-approval-coimbatore-nilgiris) covers the steps.",
  },
  {
    q: "Is the turnkey price fixed?",
    a: "Yes, for the agreed scope. The itemised BoQ you sign lists the materials, quantities and stage payments. The price changes only if you change the scope, and any change is priced and agreed in writing before the work is done.",
  },
  {
    q: "Why do you test the soil before designing the foundation?",
    a: "Soil conditions vary across Coimbatore, so the foundation is designed from a soil test on your plot rather than a standard design. Where the ground stays wet, drainage and waterproofing are planned at the foundation stage instead of being added later.",
  },
  {
    q: "Can I change the design after construction starts?",
    a: "Changes to finishes, internal walls and fittings can usually be made through a written change order, priced before the work is done. Changes to the structure or the approved plan are harder and may need a revised approval, so it is best to settle them at the design stage.",
  },
];

const schema = {
  "@type": "Service",
  // Same entity as the turnkey card in the /services catalog.
  "@id": `${SITE_URL}/services#turnkey-construction`,
  name: "Turnkey Design and Build, Coimbatore",
  serviceType: service.title,
  category: "Civil Construction",
  provider: { "@id": ORG_ID },
  areaServed: { "@type": "City", name: "Coimbatore", alternateName: "Kovai" },
  description: service.shortDescription,
  url: CANONICAL_URL,
};

const localNotes = [
  {
    icon: FileCheck2,
    title: "Approvals depend on the plot",
    body: "CCMC handles plots inside Corporation limits; DTCP or the local planning authority handles most plots outside. We check which applies from your patta and FMB sketch before the drawings are made.",
  },
  {
    icon: Layers,
    title: "Soil varies across the city",
    body: "Ground conditions change from one part of Coimbatore to another, so we design the footings from a soil test on your plot.",
  },
  {
    icon: Droplets,
    title: "Drainage on low ground",
    body: "Where water collects, drainage and waterproofing are planned with the foundation, when they are easiest to get right.",
  },
];

export default function TurnkeyDesignBuildCoimbatorePage() {
  const coimbatoreProjects = projects.filter((project) => projectAreas(project).includes("coimbatore")).slice(0, 3);

  return (
    <ServiceLanding
      service={service}
      faqs={faqs}
      projects={coimbatoreProjects}
      projectsHeading="Our work in Coimbatore"
      heading="Turnkey Design and Build in Coimbatore"
      intro="One contract and one team for your building in Coimbatore, from the soil test and design to approval support, construction and interiors, priced in an itemised BoQ."
      schema={schema}
    >
      <section className="py-16 md:py-24 bg-[var(--canvas-bg)] border-b border-border">
        <div className="container">
          <ScrollReveal>
            <div className="max-w-2xl mb-10">
              <span className="badge-gold mb-3 inline-flex">Building in Coimbatore</span>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-charcoal leading-snug mb-4">What we check before we design</h2>
              <p className="text-concrete leading-relaxed">
                Our head office is in Gandhipuram. These are the local questions we answer for every plot before the
                drawings are made. See also <Link href="/locations/coimbatore" className="text-gold-dark font-semibold underline underline-offset-4">building in Coimbatore</Link>.
              </p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {localNotes.map(({ icon: NoteIcon, title, body }, i) => (
              <ScrollReveal key={title} delay={i * 80}>
                <div className="h-full rounded-3xl bg-white border border-border p-6 shadow-2xs">
                  <div className="w-11 h-11 rounded-xl nm-inset text-gold-dark flex items-center justify-center mb-4">
                    <NoteIcon size={18} strokeWidth={1.7} />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-charcoal mb-2">{title}</h3>
                  <p className="text-sm text-concrete leading-relaxed">{body}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </ServiceLanding>
  );
}
