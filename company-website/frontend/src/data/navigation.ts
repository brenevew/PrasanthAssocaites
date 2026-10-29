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

export interface NavGroup {
  label: string;
  links: NavItem[];
}

// Every service page, by sector. The header menu only renders when opened, so
// this footer is the one crawlable link to each service from every page.
export const footerServiceGroups: NavGroup[] = [
  {
    label: "Construction",
    links: [
      { label: "Residential House Construction", href: "/services/residential-construction" },
      { label: "Luxury Villa Construction", href: "/services/villa-construction" },
      { label: "Commercial Building Contracting", href: "/services/commercial-construction" },
      { label: "Turnkey Design & Build", href: "/services/turnkey-design-build-coimbatore" },
      { label: "Industrial & Factory Construction", href: "/services/industrial-factory-construction" },
      { label: "Smart Home Automation", href: "/services/smart-homes" },
      { label: "Renovation & Retrofitting", href: "/services/renovation" },
      { label: "Construction Consulting", href: "/services/construction-work-consulting" },
    ],
  },
  {
    label: "Design & Drawings",
    links: [
      { label: "Building Plans & Architectural Design", href: "/services/architectural-designs" },
      { label: "Structural Drawings", href: "/services/structural-drawings" },
      { label: "Electrical Drawings", href: "/services/electrical-drawings" },
      { label: "Plumbing Drawings", href: "/services/plumbing-drawings" },
      { label: "Interior Design", href: "/services/interior-designs" },
      { label: "Landscape Design", href: "/services/landscaping-designs" },
    ],
  },
  {
    label: "Estimates & Valuation",
    links: [
      { label: "Bank Valuation Reports", href: "/services/bank-valuation-report" },
      { label: "Structural Stability Certificate", href: "/services/structural-stability-certificate" },
      { label: "Estimation & Costing (BoQ)", href: "/services/detailed-estimation-costing" },
      { label: "Chartered Engineer Valuation", href: "/services/chartered-engineer-valuation" },
    ],
  },
  {
    label: "Property",
    links: [
      { label: "Property Acquisition Advisory", href: "/services/property-acquisition-advisory" },
      { label: "Land & Plot Transactions", href: "/services/land-plot-transactions" },
      { label: "Real Estate Investment Consulting", href: "/services/real-estate-investment-consulting" },
      { label: "Property Portfolio Management", href: "/services/property-portfolio-management" },
    ],
  },
];

export const footerServiceLinks: NavItem[] = footerServiceGroups.flatMap((group) => group.links);

export const footerLocationLinks: NavItem[] = [
  { label: "Coimbatore (HQ)", href: "/locations/coimbatore" },
  { label: "Ooty & the Nilgiris", href: "/locations/nilgiris-ooty" },
  { label: "Gudalur", href: "/locations/gudalur" },
];
