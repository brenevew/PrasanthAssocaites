import { Metadata } from "next";
import { locationPages } from "@/data/locationPages";
import { SITE_URL, pageOpenGraph, GUDALUR_BRANCH_ID } from "@/lib/seo";
import { gudalurBranchEntity, locationWebPage } from "@/lib/officeSchema";
import LocationLanding from "@/components/locations/LocationLanding";

const SEO_TITLE = "Gudalur Building Contractors, Nilgiris | Prasanth Associates";
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

// Describes this page and ties it to the branch it is about.
const webPageSchema = locationWebPage({
  path: "/locations/gudalur",
  name: SEO_TITLE,
  description: SEO_DESCRIPTION,
  officeId: GUDALUR_BRANCH_ID,
  isOfficePage: true,
  image: gudalurBranchEntity.image[0],
});

export default function GudalurLocationPage() {
  return (
    <LocationLanding
      page={locationPages.gudalur}
      entitySchema={gudalurBranchEntity}
      extraSchema={[webPageSchema]}
      parent={{ name: "Nilgiris", href: "/locations/nilgiris-ooty" }}
    />
  );
}
