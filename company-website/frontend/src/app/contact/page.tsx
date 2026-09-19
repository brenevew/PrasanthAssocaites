import { Metadata } from "next";
import ContactPageClient from "./ContactPageClient";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Visit our offices in Coimbatore and Gudalur, or reach out online. Prasanth Associates is ready to discuss your construction or design project.",
  alternates: {
    canonical: "https://prasanthassociates.com/contact",
  },
};

export default function ContactPage() {
  return <ContactPageClient />;
}
