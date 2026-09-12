import { Metadata } from "next";
import ServicesPageClient from "./ServicesPageClient";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Comprehensive construction and design services including residential, villa, commercial, industrial, factory, architectural, interior, and landscaping projects.",
};

export default function ServicesPage() {
  return <ServicesPageClient />;
}
