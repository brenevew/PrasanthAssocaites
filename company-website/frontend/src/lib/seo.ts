import type { Metadata } from "next";
import { company } from "@/data/company";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://prasanthassociates.com";

/** Stable JSON-LD ids, so every page's schema points at the same two entities. */
export const ORG_ID = `${SITE_URL}#organization`;
export const GUDALUR_BRANCH_ID = `${SITE_URL}#gudalur-branch`;

/** 1200×630 JPG: the size and format every social platform previews reliably. */
export const OG_IMAGE = {
  url: "/images/og/og-default.jpg",
  width: 1200,
  height: 630,
  alt: company.name,
};

/**
 * Next merges metadata shallowly, so a page's `openGraph` replaces the
 * layout's wholesale. Every page builds its own through this helper so none
 * inherits the home page URL or loses siteName/locale/image.
 */
export function pageOpenGraph(
  path: string,
  title: string,
  description: string,
  images: NonNullable<Metadata["openGraph"]>["images"] = [OG_IMAGE]
): Metadata["openGraph"] {
  return {
    type: "website",
    locale: "en_IN",
    siteName: company.name,
    url: `${SITE_URL}${path}`,
    title,
    description,
    images,
  };
}
