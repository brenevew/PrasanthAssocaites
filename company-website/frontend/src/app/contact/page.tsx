import { Metadata } from "next";
import ContactPageClient from "./ContactPageClient";
import { SITE_URL, pageOpenGraph } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contact: Coimbatore & Gudalur Offices",
  description:
    "Call, email or visit our offices in Gandhipuram, Coimbatore and Gudalur, The Nilgiris. Free consultation for construction and design projects.",
  keywords: [
    "Prasanth Associates contact",
    "construction company Gandhipuram Coimbatore",
    "builders office Coimbatore",
    "building contractors Gudalur Nilgiris",
  ],
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
  openGraph: pageOpenGraph(
    "/contact",
    "Contact: Coimbatore & Gudalur Offices | Prasanth Associates",
    "Call, email or visit our offices in Gandhipuram, Coimbatore and Gudalur, The Nilgiris. Free consultation for construction and design projects."
  ),
};

export default function ContactPage() {
  return <ContactPageClient />;
}
