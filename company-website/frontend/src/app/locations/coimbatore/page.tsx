import { Metadata } from "next";
import { company } from "@/data/company";
import { locationPages } from "@/data/locationPages";
import { SITE_URL, pageOpenGraph, ORG_ID } from "@/lib/seo";
import LocationLanding from "@/components/locations/LocationLanding";

const SEO_TITLE = "Construction Company in Coimbatore | Prasanth Associates";
const SEO_DESCRIPTION = "Construction company in Coimbatore for houses, villas, commercial buildings and architectural plans. Visit our Gandhipuram office and see our Perur project.";

export const metadata: Metadata = {
  title: { absolute: SEO_TITLE },
  description: SEO_DESCRIPTION,
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
    SEO_TITLE,
    SEO_DESCRIPTION
  ),
};

const office = company.offices.find((o) => o.label === "Coimbatore") || company.offices[0];

// Same entity as the site-wide organisation; this page adds local detail.
const entitySchema = {
  "@type": "GeneralContractor",
  // Same entity as the site-wide organisation; this page adds local detail.
  "@id": ORG_ID,
  name: company.name,
  image: `${SITE_URL}/images/hero/hero-main.webp`,
  telephone: office.phone.replace(/\s/g, ""),
  email: office.email,
  url: `${SITE_URL}/locations/coimbatore`,
  address: {
    "@type": "PostalAddress",
    streetAddress: office.street,
    addressLocality: office.city,
    addressRegion: office.state,
    postalCode: office.pincode,
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 11.017756,
    longitude: 76.9688517,
  },
  hasMap: office.mapLink,
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
};

export default function CoimbatoreLocationPage() {
  return (
    <LocationLanding
      page={locationPages.coimbatore}
      entitySchema={entitySchema}
      parent={{ name: "Locations", href: "/contact" }}
    />
  );
}
