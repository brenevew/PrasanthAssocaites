import type { Metadata } from "next";
import { services, type Service } from "@/data/services";
import { serviceCategories } from "@/data/serviceCategories";
import { getServicePath } from "@/data/serviceRoutes";
import { SITE_URL, ORG_ID, OG_IMAGE, pageOpenGraph } from "@/lib/seo";

interface ServiceSeoCopy {
  title: string;
  description: string;
}

/** Metadata only. Visible service names, descriptions and specifications remain in services.ts. */
const copy: Record<string, ServiceSeoCopy> = {
  "residential-construction": {
    title: "House Construction, Coimbatore & Nilgiris",
    description: "Custom homes and duplex construction in Coimbatore and the Nilgiris. Explore residential planning, construction and itemised BoQ with Prasanth Associates.",
  },
  "villa-construction": {
    title: "Villa Construction, Coimbatore & Nilgiris",
    description: "Explore villa construction in Coimbatore and the Nilgiris, with architectural planning, courtyards and coordinated interiors from Prasanth Associates.",
  },
  "commercial-construction": {
    title: "Commercial Construction in Coimbatore",
    description: "Commercial buildings, offices and retail construction in Coimbatore and the Nilgiris. Discuss layouts, structural works and MEP with Prasanth Associates.",
  },
  "turnkey-construction": {
    title: "Turnkey Design & Build, Coimbatore",
    description: "Turnkey design and build contractors in Coimbatore. One contract from soil test to handover, with DTCP/LPA approvals and itemized BoQ pricing.",
  },
  "industrial-factory-construction": {
    title: "Factory & PEB Construction, Coimbatore",
    description: "Factory construction and PEB sheds in Coimbatore and the Nilgiris, including machinery foundations, industrial flooring and fire protection networks.",
  },
  "smart-homes": {
    title: "Smart Home Automation in Coimbatore",
    description: "Smart home automation for Coimbatore and Nilgiris properties: lighting, climate control, access security and structured cabling by Prasanth Associates.",
  },
  renovation: {
    title: "House Renovation, Coimbatore & Nilgiris",
    description: "Renovation and structural retrofitting in the Nilgiris and Coimbatore, including layout changes, column strengthening, waterproofing and MEP upgrades.",
  },
  "construction-work-consulting": {
    title: "Construction Consulting, Coimbatore",
    description: "Construction consulting in Coimbatore and the Nilgiris. Independent site supervision, BoQ checks, contractor billing audits and handover inspections.",
  },
  "architectural-designs": {
    title: "Building Plans, Coimbatore & Nilgiris",
    description: "Architectural designs in Coimbatore and the Nilgiris: 2D floor plans, 3D elevations, approval drawings and working drawings from Prasanth Associates.",
  },
  "interior-designs": {
    title: "Interior Design, Coimbatore & Nilgiris",
    description: "Interior design and installation in Coimbatore and the Nilgiris. Explore modular kitchens, wardrobes, ceilings, lighting and storage for homes and offices.",
  },
  "structural-drawings": {
    title: "Structural Drawings in Coimbatore",
    description: "RCC structural drawings for Coimbatore and Nilgiris projects, covering foundations, columns, beams, slabs and reinforcement schedules for site execution.",
  },
  "electrical-drawings": {
    title: "Electrical Drawings in Coimbatore",
    description: "Electrical drawings for Coimbatore and Nilgiris buildings: lighting points, conduit routes, distribution boards, earthing and single-line diagrams.",
  },
  "plumbing-drawings": {
    title: "Plumbing Drawings, Coimbatore & Nilgiris",
    description: "Plumbing drawings in Coimbatore and the Nilgiris, including water supply, sanitary drainage, tank sizing, inspection chambers and rainwater harvesting.",
  },
  "landscaping-designs": {
    title: "Landscape Design, Coimbatore & Nilgiris",
    description: "Landscape design for Coimbatore and Nilgiris properties. Explore planting plans, lawns, pathways, irrigation, outdoor lighting and terrace gardens.",
  },
  "bank-valuation-report": {
    title: "Bank Valuation Reports in Coimbatore",
    description: "Property valuation reports in Coimbatore and the Nilgiris for home loans, mortgages and commercial financing, with site inspection and value assessment.",
  },
  "structural-stability-certificate": {
    title: "Stability Certificates, Coimbatore",
    description: "Structural stability assessments in Coimbatore and the Nilgiris for factories, schools and commercial buildings, including load reviews and inspections.",
  },
  "detailed-estimation-costing": {
    title: "BOQ & Cost Estimation in Coimbatore",
    description: "Detailed estimation and costing for Coimbatore and Nilgiris projects. Itemised BoQ, material quantities, labour schedules and contractor tender analysis.",
  },
  "chartered-engineer-valuation": {
    title: "Technical Asset Valuation in Coimbatore",
    description: "Chartered engineer and technical valuation services in Coimbatore and the Nilgiris for machinery, fixed assets, collateral and insurance documentation.",
  },
  "property-acquisition-advisory": {
    title: "Property Acquisition Advice, Coimbatore",
    description: "Property acquisition advice in Coimbatore and the Nilgiris, from location analysis and title due diligence to negotiation and registration support.",
  },
  "land-plot-transactions": {
    title: "Land & Plot Transactions, Coimbatore",
    description: "Land and plot transaction support in Coimbatore and the Nilgiris: property sourcing, boundary checks, encumbrance review and registration assistance.",
  },
  "real-estate-investment-consulting": {
    title: "Property Investment Advice, Coimbatore",
    description: "Real estate investment consulting in Coimbatore and the Nilgiris, covering local market analysis, rental yields, risk assessment and investment planning.",
  },
  "property-portfolio-management": {
    title: "Property Management, Coimbatore",
    description: "Property portfolio management in Coimbatore and the Nilgiris: tenant sourcing, leases, rent collection, inspections, maintenance and asset reporting.",
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
    ],
  };
}
