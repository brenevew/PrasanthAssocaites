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
  { label: "Blog", href: "/blog" },
  { label: "Contact & Offices", href: "/contact" },
];

// Ordered by service priority; each Coimbatore page is followed by its
// Nilgiris counterpart where one exists.
export const footerServiceLinks: NavItem[] = [
  { label: "House Plans & 3D Design, Coimbatore", href: serviceHref("architectural-designs") },
  { label: "House Plans & Approval, Nilgiris", href: "/services/building-plan-approval-nilgiris" },
  { label: "House Construction, Coimbatore", href: serviceHref("residential-construction") },
  { label: "House Construction, Nilgiris", href: "/services/house-construction-nilgiris" },
  { label: "Villa Construction, Coimbatore", href: serviceHref("villa-construction") },
  { label: "Villa Construction, Nilgiris", href: "/services/villa-construction-nilgiris" },
  { label: "Commercial Building Contracting", href: serviceHref("commercial-construction") },
  { label: "Interior Design & Execution", href: serviceHref("interior-designs") },
  { label: "Turnkey Design & Build", href: serviceHref("turnkey-construction") },
  { label: "Industrial & Factory Construction", href: serviceHref("industrial-factory-construction") },
  { label: "Structural Stability Certificate", href: serviceHref("structural-stability-certificate") },
  { label: "Bank Valuation Reports", href: serviceHref("bank-valuation-report") },
];

export const footerLocationLinks: NavItem[] = [
  { label: "Coimbatore (HQ)", href: "/locations/coimbatore" },
  { label: "Gudalur", href: "/locations/gudalur" },
  { label: "Nilgiris & Ooty", href: "/locations/nilgiris-ooty" },
];
