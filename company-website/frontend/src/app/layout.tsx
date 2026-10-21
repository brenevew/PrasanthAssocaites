import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import LeadAnalytics from "@/components/analytics/LeadAnalytics";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import Script from "next/script";
import { GA_MEASUREMENT_ID, ga4BootstrapScript } from "@/lib/ga4";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppWidget from "@/components/ui/WhatsAppWidget";
import { company } from "@/data/company";
import { SITE_URL, OG_IMAGE, pageOpenGraph, ORG_ID, GUDALUR_BRANCH_ID } from "@/lib/seo";
import { services } from "@/data/services";
import { getServicePath } from "@/data/serviceRoutes";
import { serviceCategories } from "@/data/serviceCategories";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const siteUrl = SITE_URL;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${company.name} | Construction Company in Coimbatore`,
    template: `%s | ${company.name}`,
  },
  description: `${company.name} is a construction and design company in Coimbatore, Tamil Nadu.`,
  // Fallback only: every page sets its own openGraph via pageOpenGraph().
  openGraph: pageOpenGraph("/", `${company.name} | Construction Company in Coimbatore`, company.description),
  twitter: {
    card: "summary_large_image",
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION?.trim() || undefined,
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "GeneralContractor",
      "@id": ORG_ID,
      name: company.name,
      description: company.description,
      url: siteUrl,
      logo: `${siteUrl}/images/logo.svg`,
      image: `${siteUrl}${OG_IMAGE.url}`,
      telephone: company.phone.replace(/\s/g, ""),
      email: company.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: company.address.street,
        addressLocality: company.address.city,
        addressRegion: company.address.state,
        postalCode: company.address.pincode,
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 11.017756,
        longitude: 76.9688517,
      },
      hasMap: company.offices[0]?.mapLink,
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          opens: "09:00",
          closes: "18:00",
        },
      ],
      // The Gudalur branch is described in full (geo, hours, FAQ) on its own
      // location page under this same @id; here it is only linked.
      department: { "@id": GUDALUR_BRANCH_ID },
      // Only places the site's own pages describe serving.
      areaServed: [
        { "@type": "City", name: "Coimbatore" },
        { "@type": "City", name: "Mettupalayam" },
        { "@type": "AdministrativeArea", name: "The Nilgiris" },
        { "@type": "City", name: "Ooty" },
        { "@type": "City", name: "Coonoor" },
        { "@type": "City", name: "Kotagiri" },
        { "@type": "City", name: "Gudalur" },
      ],
      knowsAbout: [
        "House construction",
        "Villa construction",
        "Commercial building construction",
        "Factory and PEB shed construction",
        "Turnkey design and build",
        "Architectural design",
        "3D elevation design",
        "Interior design",
        "Structural drawings",
        "Building plan approval drawings",
        "Bill of Quantities estimation",
        "Bank property valuation",
        "Structural stability certificates",
        "Property and real estate advisory",
        "Vastu-compliant house planning",
        "Hillside construction in The Nilgiris",
      ],
      // Mirrors the services listed on /services, grouped as they are there.
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Construction, design, valuation and property services",
        itemListElement: serviceCategories.map((category) => ({
          "@type": "OfferCatalog",
          name: category.label,
          itemListElement: category.slugs
            .map((slug) => services.find((s) => s.slug === slug))
            .filter((s) => s !== undefined)
            .map((s) => ({
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: s.title,
                description: s.shortDescription,
                "@id": `${siteUrl}/services#${s.slug}`,
                url: `${siteUrl}${getServicePath(s.slug)}`,
                provider: { "@id": ORG_ID },
              },
            })),
        })),
      },
      sameAs: [company.social.instagram, company.social.facebook, company.social.linkedin],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}#website`,
      url: siteUrl,
      name: company.name,
      publisher: { "@id": ORG_ID },
      inLanguage: "en-IN",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en" data-scroll-behavior="smooth" className={`scroll-smooth ${inter.variable} ${cormorant.variable}`}>
      <body className="min-h-screen flex flex-col font-body text-foreground bg-background antialiased">
        {/* GA4 consent defaults + event queue, before hydration so the first
            tracking-hook events aren't lost. Root layout is the documented place
            for beforeInteractive scripts in the App Router. */}
        {GA_MEASUREMENT_ID && (
          <Script id="ga4-bootstrap" strategy="beforeInteractive">
            {ga4BootstrapScript()}
          </Script>
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema).replace(/</g, "\\u003c"),
          }}
        />

        <LeadAnalytics />
        <GoogleAnalytics />
        <Header />
        <main className="flex-grow pt-24 md:pt-[104px]">
          {children}
        </main>
        <Footer />
        <WhatsAppWidget />
      </body>
    </html>
  );
}
