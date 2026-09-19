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
  { label: "Residential House Construction", href: "/services#residential-construction" },
  { label: "Luxury Villa Construction", href: "/services#villa-construction" },
  { label: "Commercial Building Contracting", href: "/services#commercial-construction" },
  { label: "Turnkey Design & Build", href: "/services/turnkey-design-build-coimbatore" },
  { label: "Industrial & Factory Construction", href: "/services#industrial-factory-construction" },
  { label: "Structural Stability Certificate", href: "/services#structural-stability-certificate" },
  { label: "Bank Valuation Reports", href: "/services#bank-valuation-report" },
];

export const footerLocationLinks: NavItem[] = [
  { label: "Construction in Coimbatore (HQ)", href: "/locations/coimbatore" },
  { label: "Construction in Nilgiris & Ooty", href: "/locations/nilgiris-ooty" },
  { label: "Civil Contracting across Tamil Nadu", href: "/contact" },
];
