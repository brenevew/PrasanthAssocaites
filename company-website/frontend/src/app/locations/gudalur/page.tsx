import { Metadata } from "next";
import { locationPages } from "@/data/locationPages";
import { SITE_URL, pageOpenGraph, GUDALUR_BRANCH_ID } from "@/lib/seo";
import { gudalurBranchEntity, locationWebPage } from "@/lib/officeSchema";
import LocationLanding from "@/components/locations/LocationLanding";

const SEO_TITLE = "Builders in Gudalur, Nilgiris | Prasanth Associates";
const SEO_DESCRIPTION = "Builders in Gudalur for house construction, estate bungalows and commercial buildings. A construction company with its own engineers and itemised BoQ pricing.";

export const metadata: Metadata = {
  title: { absolute: SEO_TITLE },
  description: SEO_DESCRIPTION,
  keywords: [
    "builders in Gudalur",
    "construction company in Gudalur",
    "building contractors in Gudalur",
    "house construction in Gudalur",
    "civil engineers in Gudalur",
    "interior designers in Gudalur",
    "house plan approval Gudalur",
    "estate bungalow builders Gudalur",
    "builders in Pandalur and Devala",
    "construction company Nilgiris district",
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

// Describes this page and ties it to the branch it is about.
const webPageSchema = locationWebPage({
  path: "/locations/gudalur",
  name: SEO_TITLE,
  description: SEO_DESCRIPTION,
  officeId: GUDALUR_BRANCH_ID,
  isOfficePage: true,
  image: gudalurBranchEntity.image[0],
});

// The service this page offers, provided by the branch it describes.
const serviceSchema = {
  "@type": "Service",
  "@id": `${SITE_URL}/locations/gudalur#service`,
  name: "Building construction in Gudalur",
  serviceType: "Building construction",
  description: locationPages.gudalur.intro,
  url: `${SITE_URL}/locations/gudalur`,
  provider: { "@id": GUDALUR_BRANCH_ID },
  areaServed: [
    { "@type": "City", name: "Gudalur" },
    { "@type": "AdministrativeArea", name: "The Nilgiris" },
  ],
};

export default function GudalurLocationPage() {
  return (
    <LocationLanding
      page={locationPages.gudalur}
      entitySchema={gudalurBranchEntity}
      extraSchema={[webPageSchema, serviceSchema]}
      parent={{ name: "Nilgiris District", href: "/locations/nilgiris-ooty" }}
    />
  );
}
