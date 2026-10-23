import { Metadata } from "next";
import { company } from "@/data/company";
import { locationPages } from "@/data/locationPages";
import { SITE_URL, pageOpenGraph } from "@/lib/seo";
import LocationLanding from "@/components/locations/LocationLanding";

const CANONICAL_URL = `${SITE_URL}/locations/gudalur`;
const BRANCH_ID = `${SITE_URL}#gudalur-branch`;
const gudalurOffice = company.offices.find((office) => office.label === "Gudalur") || company.offices[1];
const SEO_TITLE = "Building Contractors in Gudalur | Prasanth Associates";
const SEO_DESCRIPTION = "Building contractors in Gudalur for houses, estate bungalows and commercial projects. View completed local work and contact our Ooty Main Road branch.";

export const metadata: Metadata = {
  title: { absolute: SEO_TITLE },
  description: SEO_DESCRIPTION,
  keywords: [
    "individual house contractors in Gudalur",
    "building contractors Gudalur",
    "house construction Gudalur",
    "civil contractors Gudalur Nilgiris",
    "estate bungalow builders Gudalur",
    "home builders Gudalur Tamil Nadu",
  ],
  alternates: {
    canonical: `${SITE_URL}/locations/gudalur`,
  },
  openGraph: pageOpenGraph(
    "/locations/gudalur",
    SEO_TITLE,
    SEO_DESCRIPTION
  ),
};

const entitySchema = {
  "@type": "HomeAndConstructionBusiness",
  "@id": BRANCH_ID,
  name: `${company.name} - Gudalur Branch Office`,
  image: `${SITE_URL}/images/hero/hero-main.webp`,
  url: CANONICAL_URL,
  telephone: gudalurOffice.phone.replace(/\s/g, ""),
  email: gudalurOffice.email,
  hasMap: gudalurOffice.mapLink,
  parentOrganization: { "@id": `${SITE_URL}#organization` },
  address: {
    "@type": "PostalAddress",
    streetAddress: gudalurOffice.street,
    addressLocality: "Gudalur",
    addressRegion: "Tamil Nadu",
    postalCode: gudalurOffice.pincode,
    addressCountry: "IN",
  },
  geo: { "@type": "GeoCoordinates", latitude: 11.5001001, longitude: 76.4937999 },
  // Same branch entity as the Nilgiris page (shared @id), so the same areas.
  areaServed: [
    { "@type": "City", name: "Gudalur" },
    { "@type": "AdministrativeArea", name: "The Nilgiris" },
    { "@type": "City", name: "Ooty" },
    { "@type": "City", name: "Coonoor" },
    { "@type": "City", name: "Kotagiri" },
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "18:00",
    },
  ],
};

export default function GudalurLocationPage() {
  return (
    <LocationLanding
      page={locationPages.gudalur}
      entitySchema={entitySchema}
      parent={{ name: "Nilgiris", href: "/locations/nilgiris-ooty" }}
    />
  );
}
