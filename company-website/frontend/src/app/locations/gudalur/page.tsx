import { Metadata } from "next";
import { company } from "@/data/company";
import { projects } from "@/data/projects";
import { services } from "@/data/services";
import { getServicePath } from "@/data/serviceRoutes";
import { locationPages } from "@/data/locationPages";
import { SITE_URL, pageOpenGraph } from "@/lib/seo";
import LocationLanding from "@/components/locations/LocationLanding";

const CANONICAL_URL = `${SITE_URL}/locations/gudalur`;
const BRANCH_ID = `${SITE_URL}#gudalur-branch`;
const gudalurOffice = company.offices.find((office) => office.label === "Gudalur") || company.offices[1];
const SEO_TITLE = "Builders & Building Contractors in Gudalur | Prasanth Associates";
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
    "builders in Gudalur",
    "construction company in Gudalur",
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

// Photos of completed Gudalur projects, all shown on this page.
const gudalurPhotos = ["residential-construction-project", "pricol", "sasthapruri"]
  .map((slug) => projects.find((project) => project.slug === slug)?.image)
  .filter((src) => src !== undefined)
  .map((src) => `${SITE_URL}${src}`);

const entitySchema = {
  "@type": "HomeAndConstructionBusiness",
  "@id": BRANCH_ID,
  name: `${company.name} - Gudalur Branch Office`,
  image: gudalurPhotos,
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
  // The services listed on this page, each pointing at its own service page.
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Construction and design services in Gudalur",
    itemListElement: locationPages.gudalur.services.map((slug) => {
      const service = services.find((entry) => entry.slug === slug)!;
      return {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          "@id": `${SITE_URL}/services#${slug}`,
          name: service.title,
          url: `${SITE_URL}${getServicePath(slug)}`,
        },
      };
    }),
  },
};

// Describes this page and ties it to the branch it is about.
const webPageSchema = {
  "@type": "WebPage",
  "@id": `${CANONICAL_URL}#webpage`,
  url: CANONICAL_URL,
  name: SEO_TITLE,
  description: SEO_DESCRIPTION,
  inLanguage: "en-IN",
  isPartOf: { "@id": `${SITE_URL}#website` },
  about: { "@id": BRANCH_ID },
  mainEntity: { "@id": BRANCH_ID },
  breadcrumb: { "@id": `${CANONICAL_URL}#breadcrumb` },
  primaryImageOfPage: { "@type": "ImageObject", url: gudalurPhotos[0] },
};

export default function GudalurLocationPage() {
  return (
    <LocationLanding
      page={locationPages.gudalur}
      entitySchema={entitySchema}
      extraSchema={[webPageSchema]}
      parent={{ name: "Nilgiris", href: "/locations/nilgiris-ooty" }}
    />
  );
}
