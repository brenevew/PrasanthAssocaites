import { Metadata } from "next";
import { SITE_URL, pageOpenGraph } from "@/lib/seo";
import ContactPageClient from "./ContactPageClient";

export const metadata: Metadata = {
  title: "Contact Us, Coimbatore & Gudalur Offices",
  description:
    "Call, email or visit our offices in Gandhipuram, Coimbatore and Gudalur, The Nilgiris. Free consultation for construction and design projects.",
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
  openGraph: pageOpenGraph(
    "/contact",
    "Contact Us, Coimbatore & Gudalur Offices | Prasanth Associates",
    "Call, email or visit our offices in Gandhipuram, Coimbatore and Gudalur, The Nilgiris. Free consultation for construction and design projects."
  ),
};

export default function ContactPage() {
  return <ContactPageClient />;
}
