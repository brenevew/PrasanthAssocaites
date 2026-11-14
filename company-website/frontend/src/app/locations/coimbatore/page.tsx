import { Metadata } from "next";
import { locationPages } from "@/data/locationPages";
import { SITE_URL, pageOpenGraph, COIMBATORE_OFFICE_ID } from "@/lib/seo";
import { coimbatoreOfficeEntity, locationWebPage } from "@/lib/officeSchema";
import { locationShowcase } from "@/data/locationShowcase";
import LocationShowcase from "@/components/locations/LocationShowcase";

const SEO_TITLE = "Builders & Contractors in Coimbatore | Prasanth Associates";
const SEO_DESCRIPTION = "Builders in Coimbatore for house construction, villas and commercial buildings. A construction company in Gandhipuram with its own engineers and itemised BoQ.";

export const metadata: Metadata = {
  title: { absolute: SEO_TITLE },
  description: SEO_DESCRIPTION,
  keywords: [
    "builders in Coimbatore",
    "building contractors in Coimbatore",
    "construction company in Coimbatore",
    "house construction in Coimbatore",
    "house builders in Coimbatore",
    "civil engineers in Coimbatore",
    "builders in Gandhipuram",
    "house plan approval Coimbatore",
    "structural drawings Coimbatore",
    "kovai builders",
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

// The service this page offers, provided by the office it describes.
const serviceSchema = {
  "@type": "Service",
  "@id": `${SITE_URL}/locations/coimbatore#service`,
  name: "Building construction in Coimbatore",
  serviceType: "Building construction",
  description: locationPages.coimbatore.intro,
  url: `${SITE_URL}/locations/coimbatore`,
  provider: { "@id": COIMBATORE_OFFICE_ID },
  areaServed: { "@type": "City", name: "Coimbatore" },
};

export default function CoimbatoreLocationPage() {
  return (
    <LocationShowcase
      showcase={locationShowcase.coimbatore}
      page={locationPages.coimbatore}
      entitySchema={coimbatoreOfficeEntity}
      extraSchema={[
        locationWebPage({
          path: "/locations/coimbatore",
          name: SEO_TITLE,
          description: SEO_DESCRIPTION,
          officeId: COIMBATORE_OFFICE_ID,
          isOfficePage: true,
        }),
        serviceSchema,
      ]}
      parent={{ name: "Locations", href: "/contact" }}
    />
  );
}
