import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppWidget from "@/components/ui/WhatsAppWidget";
import { company } from "@/data/company";

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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://prasanthassociates.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${company.name} | Construction Company in Coimbatore`,
    template: `%s | ${company.name}`,
  },
  description: `${company.name} provides construction services across Tamil Nadu.`,
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: company.name,
    url: siteUrl,
    images: [{ url: "/images/hero/hero-main.webp", width: 1200, height: 630, alt: company.name }],
  },
  twitter: {
    card: "summary_large_image",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "GeneralContractor",
      "@id": `${siteUrl}#organization`,
      name: company.name,
      description: company.description,
      url: siteUrl,
      logo: `${siteUrl}/images/logo.svg`,
      image: `${siteUrl}/images/hero/hero-main.webp`,
      telephone: company.phone.replace(/\s/g, ""),
      email: company.email,
      priceRange: "₹₹₹",
      address: {
        "@type": "PostalAddress",
        streetAddress: company.address.street,
        addressLocality: company.address.city,
        addressRegion: company.address.state,
        postalCode: company.address.pincode,
        addressCountry: "IN",
      },
      location: company.offices.map((office) => ({
        "@type": "Place",
        name: `${company.name} — ${office.label} ${office.badge}`,
        address: {
          "@type": "PostalAddress",
          streetAddress: office.street,
          addressLocality: office.city,
          addressRegion: office.state,
          postalCode: office.pincode,
          addressCountry: "IN",
        },
      })),
      areaServed: [
        "Coimbatore",
        "The Nilgiris",
        "Ooty",
        "Gudalur",
        "Coonoor",
        "Kothagiri",
        "Tiruppur",
        "Erode",
        "Salem",
        "Palakkad",
        "Pollachi",
        "Mettupalayam",
        "Anaikatti",
      ].map((name) => ({ "@type": "City", name })),
      sameAs: [company.social.instagram, company.social.facebook, company.social.linkedin],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}#website`,
      url: siteUrl,
      name: company.name,
      publisher: { "@id": `${siteUrl}#organization` },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema).replace(/</g, "\\u003c"),
          }}
        />

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
