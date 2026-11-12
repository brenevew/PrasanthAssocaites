import type { Metadata } from "next";
import { services, type Service } from "@/data/services";
import { serviceCategories } from "@/data/serviceCategories";
import { getServicePath } from "@/data/serviceRoutes";
import { SITE_URL, ORG_ID, OG_IMAGE, pageOpenGraph } from "@/lib/seo";

interface ServiceSeoCopy {
  title: string;
  /** Page heading with the place names people search with. Falls back to the catalogue name. */
  h1?: string;
  description: string;
}

/** Metadata only. Visible service names, descriptions and specifications remain in services.ts. */
const copy: Record<string, ServiceSeoCopy> = {
  "residential-construction": {
    title: "House Construction, Coimbatore & Ooty",
    h1: "House Construction in Coimbatore and Ooty",
    description: "Custom homes and duplex construction in Coimbatore and Ooty. Explore residential planning, construction and itemised BoQ with Prasanth Associates.",
  },
  "villa-construction": {
    title: "Villa Construction, Coimbatore & Ooty",
    h1: "Villa Construction in Coimbatore and Ooty",
    description: "Explore villa construction in Coimbatore and Ooty, with architectural planning, courtyards and coordinated interiors from Prasanth Associates.",
  },
  "commercial-construction": {
    title: "Commercial Construction in Coimbatore",
    h1: "Commercial Construction in Coimbatore and Ooty",
    description: "Commercial buildings, offices and retail construction in Coimbatore and Ooty. Discuss layouts, structural works and MEP with Prasanth Associates.",
  },
  "turnkey-construction": {
    title: "Turnkey Design & Build, Coimbatore",
    h1: "Turnkey Design and Build in Coimbatore", // set on its own page
    description: "Turnkey design and build contractors in Coimbatore. One contract from soil test to handover, with DTCP/LPA approvals and itemized BoQ pricing.",
  },
  "industrial-factory-construction": {
    title: "Factory & PEB Construction, Coimbatore",
    h1: "Factory and PEB Shed Construction in Coimbatore",
    description: "Factory construction and PEB sheds in Coimbatore and Ooty, including machinery foundations, industrial flooring and fire protection networks.",
  },
  "smart-homes": {
    title: "Smart Home Automation in Coimbatore",
    h1: "Smart Home Automation in Coimbatore and Ooty",
    description: "Smart home automation for Coimbatore and Ooty properties: lighting, climate control, access security and structured cabling by Prasanth Associates.",
  },
  renovation: {
    title: "Home Renovation, Coimbatore & Ooty",
    h1: "House Renovation in Coimbatore and Ooty",
    description: "Renovation and structural retrofitting in Ooty and Coimbatore, including layout changes, column strengthening, waterproofing and MEP upgrades.",
  },
  "construction-work-consulting": {
    title: "Construction Consulting, Coimbatore",
    h1: "Construction Consultants in Coimbatore and Ooty",
    description: "Construction consulting in Coimbatore and Ooty. Independent site supervision, BoQ checks, contractor billing audits and handover inspections.",
  },
  "architectural-designs": {
    title: "Building Plans, Coimbatore & Ooty",
    h1: "House Plans and Building Design in Coimbatore and Ooty",
    description: "Architectural designs in Coimbatore and Ooty: 2D floor plans, 3D elevations, approval drawings and working drawings from Prasanth Associates.",
  },
  "interior-designs": {
    title: "Interior Design, Coimbatore & Ooty",
    h1: "Interior Designers in Coimbatore and Ooty",
    description: "Interior design and installation in Coimbatore and Ooty. Explore modular kitchens, wardrobes, ceilings, lighting and storage for homes and offices.",
  },
  "structural-drawings": {
    title: "Structural Drawings in Coimbatore",
    h1: "Structural Drawings and Design in Coimbatore and Ooty",
    description: "RCC structural drawings for Coimbatore and Ooty projects, covering foundations, columns, beams, slabs and reinforcement schedules for site execution.",
  },
  "electrical-drawings": {
    title: "Electrical Drawings in Coimbatore",
    h1: "Electrical Drawings in Coimbatore and Ooty",
    description: "Electrical drawings for Coimbatore and Ooty buildings: lighting points, conduit routes, distribution boards, earthing and single-line diagrams.",
  },
  "plumbing-drawings": {
    title: "Plumbing Plans, Coimbatore & Ooty",
    h1: "Plumbing Drawings in Coimbatore and Ooty",
    description: "Plumbing drawings in Coimbatore and Ooty, including water supply, sanitary drainage, tank sizing, inspection chambers and rainwater harvesting.",
  },
  "landscaping-designs": {
    title: "Landscape Design, Coimbatore & Ooty",
    h1: "Landscape Design in Coimbatore and Ooty",
    description: "Landscape design for Coimbatore and Ooty properties. Explore planting plans, lawns, pathways, irrigation, outdoor lighting and terrace gardens.",
  },
  "bank-valuation-report": {
    title: "Bank Valuation Reports in Coimbatore",
    h1: "Bank Valuation Reports in Coimbatore and Ooty",
    description: "Property valuation reports in Coimbatore and Ooty for home loans, mortgages and commercial financing, with site inspection and value assessment.",
  },
  "structural-stability-certificate": {
    title: "Stability Certificates, Coimbatore",
    h1: "Structural Stability Certificates in Coimbatore and Ooty",
    description: "Structural stability assessments in Coimbatore and Ooty for factories, schools and commercial buildings, including load reviews and inspections.",
  },
  "detailed-estimation-costing": {
    title: "BOQ & Cost Estimation in Coimbatore",
    h1: "Construction Estimates and BoQ in Coimbatore and Ooty",
    description: "Detailed estimation and costing for Coimbatore and Ooty projects. Itemised BoQ, material quantities, labour schedules and contractor tender analysis.",
  },
  "chartered-engineer-valuation": {
    title: "Technical Asset Valuation, Coimbatore",
    h1: "Machinery and Technical Valuation in Coimbatore and Ooty",
    description: "Chartered engineer and technical valuation services in Coimbatore and Ooty for machinery, fixed assets, collateral and insurance documentation.",
  },
  "property-acquisition-advisory": {
    title: "Property Buying Advice, Coimbatore",
    h1: "Property Buying Advice in Coimbatore and Ooty",
    description: "Property acquisition advice in Coimbatore and Ooty, from location analysis and title due diligence to negotiation and registration support.",
  },
  "land-plot-transactions": {
    title: "Land & Plot Transactions, Coimbatore",
    h1: "Land and Plot Transactions in Coimbatore and Ooty",
    description: "Land and plot transaction support in Coimbatore and Ooty: property sourcing, boundary checks, encumbrance review and registration assistance.",
  },
  "real-estate-investment-consulting": {
    title: "Property Investment Advice, Coimbatore",
    h1: "Property Investment Advice in Coimbatore and Ooty",
    description: "Real estate investment consulting in Coimbatore and Ooty, covering local market analysis, rental yields, risk assessment and investment planning.",
  },
  "property-portfolio-management": {
    title: "Property Management, Coimbatore",
    h1: "Property Management in Coimbatore and Ooty",
    description: "Property portfolio management in Coimbatore and Ooty: tenant sourcing, leases, rent collection, inspections, maintenance and asset reporting.",
  },
};

export const serviceSeo = services.map((service) => {
  const seo = copy[service.slug];
  const sector = serviceCategories.find((category) => category.slugs.includes(service.slug));
  if (!seo || !sector) throw new Error(`Missing service SEO or sector: ${service.slug}`);
  return {
    slug: service.slug,
    name: service.title,
    sector: sector.label,
    path: getServicePath(service.slug),
    title: `${seo.title} | Prasanth Associates`,
    h1: seo.h1 ?? service.title,
    description: seo.description,
  };
});

export function serviceMetadata(slug: string): Metadata {
  const seo = serviceSeo.find((entry) => entry.slug === slug);
  if (!seo) throw new Error(`Unknown service: ${slug}`);
  return {
    title: { absolute: seo.title },
    description: seo.description,
    alternates: { canonical: `${SITE_URL}${seo.path}` },
    robots: { index: true, follow: true },
    openGraph: pageOpenGraph(seo.path, seo.title, seo.description),
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: [{ url: OG_IMAGE.url, alt: OG_IMAGE.alt }],
    },
  };
}

export function serviceSchema(service: Service) {
  const seo = serviceSeo.find((entry) => entry.slug === service.slug);
  return {
    "@type": "Service",
    // Preserve entity identity used by the original hub and business catalog.
    "@id": `${SITE_URL}/services#${service.slug}`,
    name: service.title,
    serviceType: service.title,
    category: seo?.sector,
    description: service.shortDescription,
    url: `${SITE_URL}${getServicePath(service.slug)}`,
    provider: { "@id": ORG_ID },
    areaServed: [
      { "@type": "City", name: "Coimbatore" },
      { "@type": "AdministrativeArea", name: "The Nilgiris" },
      { "@type": "City", name: "Ooty" },
      { "@type": "City", name: "Coonoor" },
      { "@type": "City", name: "Kotagiri" },
      { "@type": "City", name: "Gudalur" },
    ],
  };
}
