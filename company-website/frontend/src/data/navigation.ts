import { serviceHref } from "./serviceLinks";

export interface NavItem {
  label: string;
  href: string;
}

export const mainNavItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Building Planner", href: "/plan-home" },
  { label: "Property & Investment", href: "/property-investment" },
  { label: "Contact", href: "/contact" },
];

export const footerNavItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Services Hub", href: "/services" },
  { label: "Projects Portfolio", href: "/projects" },
  { label: "Building Planner Studio", href: "/plan-home" },
  { label: "About Us", href: "/about" },
  { label: "Contact & Offices", href: "/contact" },
];

export const footerServiceLinks: NavItem[] = [
  { label: "Residential House Construction", href: "/services/house-construction-coimbatore" },
  { label: "Luxury Villa Construction", href: "/services/villa-construction-coimbatore" },
  { label: "Commercial Building Contracting", href: "/services/commercial-construction-coimbatore" },
  { label: "Turnkey Design & Build", href: "/services/turnkey-design-build-coimbatore" },
  { label: "House Construction, Nilgiris", href: "/services/house-construction-nilgiris" },
  { label: "Industrial & Factory Construction", href: serviceHref("industrial-factory-construction") },
  { label: "Structural Stability Certificate", href: serviceHref("structural-stability-certificate") },
  { label: "Bank Valuation Reports", href: serviceHref("bank-valuation-report") },
];

export const footerLocationLinks: NavItem[] = [
  { label: "Coimbatore (HQ)", href: "/locations/coimbatore" },
  { label: "Gudalur", href: "/locations/gudalur" },
  { label: "Nilgiris & Ooty", href: "/locations/nilgiris-ooty" },
];
