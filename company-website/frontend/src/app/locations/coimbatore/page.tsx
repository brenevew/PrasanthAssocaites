import { Metadata } from "next";
import { locationPages } from "@/data/locationPages";
import { SITE_URL, pageOpenGraph, COIMBATORE_OFFICE_ID } from "@/lib/seo";
import { coimbatoreOfficeEntity, locationWebPage } from "@/lib/officeSchema";
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
      ]}
      parent={{ name: "Locations", href: "/contact" }}
    />
  );
}
