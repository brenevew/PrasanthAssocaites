import { Metadata } from "next";
import { locationPages } from "@/data/locationPages";
import { SITE_URL, pageOpenGraph, COIMBATORE_OFFICE_ID } from "@/lib/seo";
import { coimbatoreOfficeEntity, locationWebPage } from "@/lib/officeSchema";
import LocationLanding from "@/components/locations/LocationLanding";

const SEO_TITLE = "Building Contractors in Coimbatore | Prasanth Associates";
const SEO_DESCRIPTION = "House construction contractors in Coimbatore: plans, structural drawings, construction and an itemised BoQ from our Gandhipuram office. Request a quote.";

export const metadata: Metadata = {
  title: { absolute: SEO_TITLE },
  description: SEO_DESCRIPTION,
  keywords: [
    "building contractors in Coimbatore",
    "house construction contractors in Coimbatore",
    "construction services in Coimbatore",
    "civil contractors Coimbatore",
    "house construction in Kovai",
    "building plan approval Coimbatore",
    "structural drawings Coimbatore",
    "building contractors Gandhipuram",
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
    <LocationLanding
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
