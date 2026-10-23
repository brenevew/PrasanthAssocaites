import { Metadata } from "next";
import { company } from "@/data/company";
import { locationPages } from "@/data/locationPages";
import { SITE_URL, pageOpenGraph } from "@/lib/seo";
import LocationLanding from "@/components/locations/LocationLanding";

export const metadata: Metadata = {
  title: "Builders in Ooty, Coonoor & Nilgiris",
  description:
    "Building contractors for Ooty, Coonoor, Kotagiri and Gudalur. House construction, building design and hillside work in the Nilgiris, from our Gudalur branch.",
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
    "Building contractors for Ooty, Coonoor, Kotagiri and Gudalur. House construction, building design and hillside work in the Nilgiris, from our Gudalur branch."
  ),
};

const office = company.offices.find((o) => o.label === "Gudalur") || company.offices[1];

// The Gudalur branch (shared @id with the Gudalur page, so Google sees one branch).
const entitySchema = {
  "@type": "HomeAndConstructionBusiness",
  "@id": `${SITE_URL}#gudalur-branch`,
  name: `${company.name} - Gudalur Branch Office`,
  parentOrganization: { "@id": `${SITE_URL}#organization` },
  image: `${SITE_URL}/images/projects/Residential/residential-building-construction-gudalur-prasanth-associates.webp`,
  telephone: office.phone.replace(/\s/g, ""),
  email: office.email,
  url: `${SITE_URL}/locations/gudalur`, // the branch's own page
  address: {
    "@type": "PostalAddress",
    streetAddress: office.street,
    addressLocality: "Gudalur",
    addressRegion: office.state,
    postalCode: office.pincode,
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 11.5001001,
    longitude: 76.4937999,
  },
  hasMap: office.mapLink,
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "18:00",
    },
  ],
  areaServed: [
    { "@type": "AdministrativeArea", name: "The Nilgiris" },
    { "@type": "City", name: "Ooty" },
    { "@type": "City", name: "Gudalur" },
    { "@type": "City", name: "Coonoor" },
    { "@type": "City", name: "Kotagiri" },
  ],
};

export default function NilgirisOotyLocationPage() {
  return (
    <LocationLanding
      page={locationPages["nilgiris-ooty"]}
      entitySchema={entitySchema}
      parent={{ name: "Locations", href: "/contact" }}
    />
  );
}
