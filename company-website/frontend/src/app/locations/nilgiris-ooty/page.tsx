import { Metadata } from "next";
import { locationPages } from "@/data/locationPages";
import { SITE_URL, pageOpenGraph, GUDALUR_BRANCH_ID } from "@/lib/seo";
import { gudalurBranchEntity, locationWebPage } from "@/lib/officeSchema";
import LocationLanding from "@/components/locations/LocationLanding";

const SEO_TITLE = "Builders in Ooty, Coonoor & Kotagiri | Prasanth Associates";
const SEO_DESCRIPTION =
  "Builders in Ooty, Coonoor and Kotagiri for houses, villas, schools and renovation. House plans, hill-area approvals and itemised BoQ from our Gudalur branch.";

export const metadata: Metadata = {
  title: { absolute: SEO_TITLE },
  description: SEO_DESCRIPTION,
  keywords: [
    "builders in Ooty",
    "construction company in Ooty",
    "house builders in Ooty",
    "house construction cost in Ooty",
    "builders in Coonoor",
    "construction company in Coonoor",
    "builders in Kotagiri",
    "construction company in Kotagiri",
    "builders in Nilgiris",
    "building plan approval Nilgiris",
    "HACA approval",
    "architects and structural engineers in Ooty",
    "villa construction Ooty Coonoor Kotagiri",
  ],
  alternates: {
    canonical: `${SITE_URL}/locations/nilgiris-ooty`,
  },
  openGraph: pageOpenGraph(
    "/locations/nilgiris-ooty",
    SEO_TITLE,
    SEO_DESCRIPTION
  ),
};

// The service this page offers, provided by the Nilgiris branch.
const serviceSchema = {
  "@type": "Service",
  "@id": `${SITE_URL}/locations/nilgiris-ooty#service`,
  name: "Building construction in Ooty, Coonoor and Kotagiri",
  serviceType: "Building construction",
  description: locationPages["nilgiris-ooty"].intro,
  url: `${SITE_URL}/locations/nilgiris-ooty`,
  provider: { "@id": GUDALUR_BRANCH_ID },
  areaServed: [
    { "@type": "City", name: "Ooty" },
    { "@type": "City", name: "Coonoor" },
    { "@type": "City", name: "Kotagiri" },
    { "@type": "AdministrativeArea", name: "The Nilgiris" },
  ],
};

export default function NilgirisOotyLocationPage() {
  return (
    <LocationLanding
      page={locationPages["nilgiris-ooty"]}
      entitySchema={gudalurBranchEntity}
      extraSchema={[
        locationWebPage({
          path: "/locations/nilgiris-ooty",
          name: SEO_TITLE,
          description: SEO_DESCRIPTION,
          officeId: GUDALUR_BRANCH_ID,
          isOfficePage: false,
        }),
        serviceSchema,
      ]}
      parent={{ name: "Locations", href: "/contact" }}
    />
  );
}
