import { Metadata } from "next";
import { locationPages } from "@/data/locationPages";
import { SITE_URL, pageOpenGraph, GUDALUR_BRANCH_ID } from "@/lib/seo";
import { gudalurBranchEntity, locationWebPage } from "@/lib/officeSchema";
import LocationLanding from "@/components/locations/LocationLanding";

const SEO_DESCRIPTION =
  "Building contractors for Ooty, Coonoor, Kotagiri and Gudalur. House construction, building design and hillside work in the Nilgiris, from our Gudalur branch.";

export const metadata: Metadata = {
  title: "Builders in Ooty, Coonoor & Nilgiris",
  description: SEO_DESCRIPTION,
  keywords: [
    "builders in Nilgiris",
    "house construction in Ooty",
    "hill station builders Ooty",
    "villa construction Ooty",
    "hill station builders Tamil Nadu",
    "civil contractors Nilgiris",
    "builders in Ooty",
    "construction company in Ooty",
    "house construction in Coonoor",
    "builders in Coonoor",
    "house construction in Kotagiri",
    "building contractors in Kotagiri",
    "construction company Nilgiris",
  ],
  alternates: {
    canonical: `${SITE_URL}/locations/nilgiris-ooty`,
  },
  openGraph: pageOpenGraph(
    "/locations/nilgiris-ooty",
    "Builders in Ooty, Coonoor & Nilgiris | Prasanth Associates",
    SEO_DESCRIPTION
  ),
};

export default function NilgirisOotyLocationPage() {
  return (
    <LocationLanding
      page={locationPages["nilgiris-ooty"]}
      entitySchema={gudalurBranchEntity}
      extraSchema={[
        locationWebPage({
          path: "/locations/nilgiris-ooty",
          name: "Builders in Ooty, Coonoor & Nilgiris | Prasanth Associates",
          description: SEO_DESCRIPTION,
          officeId: GUDALUR_BRANCH_ID,
          isOfficePage: false,
        }),
      ]}
      parent={{ name: "Locations", href: "/contact" }}
    />
  );
}
