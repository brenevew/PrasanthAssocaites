import { company } from "@/data/company";
import { projects } from "@/data/projects";
import { services } from "@/data/services";
import { getServicePath } from "@/data/serviceRoutes";
import { locationPages } from "@/data/locationPages";
import { SITE_URL, ORG_ID, COIMBATORE_OFFICE_ID, GUDALUR_BRANCH_ID } from "@/lib/seo";

/**
 * JSON-LD for the two staffed offices. Each office node is built once here and
 * reused by every page that describes it: Google merges nodes that share an
 * @id, so two pages emitting different properties under one id leave the
 * merged entity depending on crawl order.
 */

const openingHours = [
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "09:00",
    closes: "18:00",
  },
];

const coimbatoreOffice = company.offices.find((o) => o.label === "Coimbatore") || company.offices[0];
const gudalurOffice = company.offices.find((o) => o.label === "Gudalur") || company.offices[1];

/** The head office. Its own id, so it never overwrites the organisation node. */
export const coimbatoreOfficeEntity = {
  "@type": "GeneralContractor",
  "@id": COIMBATORE_OFFICE_ID,
  name: `${company.name} - Coimbatore Head Office`,
  parentOrganization: { "@id": ORG_ID },
  url: `${SITE_URL}/locations/coimbatore`,
  image: `${SITE_URL}/images/hero/hero-main.webp`,
  telephone: coimbatoreOffice.phone.replace(/\s/g, ""),
  email: coimbatoreOffice.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: coimbatoreOffice.street,
    addressLocality: coimbatoreOffice.city,
    addressRegion: coimbatoreOffice.state,
    postalCode: coimbatoreOffice.pincode,
    addressCountry: "IN",
  },
  geo: { "@type": "GeoCoordinates", latitude: 11.017756, longitude: 76.9688517 },
  hasMap: coimbatoreOffice.mapLink,
  // The office's Google Business Profile.
  sameAs: [coimbatoreOffice.mapLink],
  openingHoursSpecification: openingHours,
  areaServed: [{ "@type": "AdministrativeArea", name: "Coimbatore district" }],
};

// Photos of completed Gudalur projects, all shown on the Gudalur page.
const gudalurPhotos = ["residential-construction-project", "pricol", "sasthapuri"]
  .map((slug) => projects.find((project) => project.slug === slug)?.image)
  .filter((src) => src !== undefined)
  .map((src) => `${SITE_URL}${src}`);

/** The Gudalur branch, shared by the Gudalur and Nilgiris pages. */
export const gudalurBranchEntity = {
  "@type": "GeneralContractor",
  "@id": GUDALUR_BRANCH_ID,
  name: `${company.name} - Gudalur Branch Office`,
  parentOrganization: { "@id": ORG_ID },
  url: `${SITE_URL}/locations/gudalur`, // the branch's own page
  image: gudalurPhotos,
  telephone: gudalurOffice.phone.replace(/\s/g, ""),
  email: gudalurOffice.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: gudalurOffice.street,
    // company.ts stores the district as the city; the visible address says Gudalur.
    addressLocality: "Gudalur",
    addressRegion: gudalurOffice.state,
    postalCode: gudalurOffice.pincode,
    addressCountry: "IN",
  },
  geo: { "@type": "GeoCoordinates", latitude: 11.5001001, longitude: 76.4937999 },
  hasMap: gudalurOffice.mapLink,
  // The branch's Google Business Profile (its title is still being renamed;
  // the link is stable, so the old name never enters the schema).
  sameAs: [gudalurOffice.mapLink],
  openingHoursSpecification: openingHours,
  areaServed: [
    { "@type": "AdministrativeArea", name: "The Nilgiris" },
    { "@type": "City", name: "Gudalur" },
    { "@type": "City", name: "Ooty" },
    { "@type": "City", name: "Coonoor" },
    { "@type": "City", name: "Kotagiri" },
  ],
  // The services listed on the Gudalur page, each pointing at its own service page.
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

/** A WebPage node tying a location page to the office it describes. */
export function locationWebPage({
  path,
  name,
  description,
  officeId,
  isOfficePage,
  image,
}: {
  path: string;
  name: string;
  description: string;
  officeId: string;
  /** True on the office's own page; other pages are only `about` it. */
  isOfficePage: boolean;
  image?: string;
}) {
  const url = `${SITE_URL}${path}`;
  return {
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: "en-IN",
    isPartOf: { "@id": `${SITE_URL}#website` },
    about: { "@id": officeId },
    ...(isOfficePage ? { mainEntity: { "@id": officeId } } : {}),
    breadcrumb: { "@id": `${url}#breadcrumb` },
    ...(image ? { primaryImageOfPage: { "@type": "ImageObject", url: image } } : {}),
  };
}
