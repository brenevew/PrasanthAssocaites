import { Metadata } from "next";
import { SITE_URL, pageOpenGraph, ORG_ID } from "@/lib/seo";
import { services } from "@/data/services";
import { serviceHref } from "@/data/serviceLinks";
import JsonLd from "@/components/seo/JsonLd";
import ServicesPageClient from "./ServicesPageClient";

export const metadata: Metadata = {
  title: { absolute: "Services in Coimbatore & the Nilgiris | Prasanth Associates" },
  description:
    "Construction and design in Coimbatore and the Nilgiris: houses, villas, commercial buildings, factories, house plans, approvals, interiors and valuations.",
  keywords: [
    "construction services in Coimbatore",
    "construction company in Coimbatore",
    "architects in Coimbatore",
    "interior designers in Coimbatore",
    "building plan approval Coimbatore",
    "property valuers in Coimbatore",
    "structural engineers in Coimbatore",
    "PEB shed contractors in Coimbatore",
  ],
  alternates: {
    canonical: `${SITE_URL}/services`,
  },
  openGraph: pageOpenGraph(
    "/services",
    "Construction & Design Services in Coimbatore | Prasanth Associates",
    "Construction and design in Coimbatore and the Nilgiris: houses, villas, commercial buildings, factories, house plans, approvals, interiors and valuations."
  ),
};

// Every service card on this page, as Service entities provided by the organisation.
const servicesSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ItemList",
      "@id": `${SITE_URL}/services#list`,
      name: "Services by Prasanth Associates",
      numberOfItems: services.length,
      itemListElement: services.map((service, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Service",
          "@id": `${SITE_URL}/services#${service.slug}`,
          name: service.title,
          description: service.shortDescription,
          url: `${SITE_URL}${serviceHref(service.slug)}`,
          provider: { "@id": ORG_ID },
          areaServed: [
            { "@type": "City", name: "Coimbatore" },
            { "@type": "AdministrativeArea", name: "The Nilgiris" },
          ],
        },
      })),
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${SITE_URL}/services#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` },
      ],
    },
  ],
};

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={servicesSchema} />
      <ServicesPageClient />
    </>
  );
}
