export interface ServiceCategory {
  id: string;
  label: string;
  shortLabel: string;
  description: string;
  iconName: string;
  badge: string;
  slugs: string[];
}

export const serviceCategories: ServiceCategory[] = [
  {
    id: "construction",
    label: "Civil Construction",
    shortLabel: "Construction",
    description: "Custom residential, villas, commercial complexes & industrial structures",
    iconName: "Hammer",
    badge: "8 Services",
    slugs: [
      "residential-construction",
      "villa-construction",
      "commercial-construction",
      "turnkey-construction",
      "industrial-factory-construction",
      "smart-homes",
      "renovation",
      "construction-work-consulting",
    ],
  },
  {
    id: "design",
    label: "Design & Architecture",
    shortLabel: "Design & Arch",
    description: "Architectural blueprints, structural & MEP drawings, interior styling & landscape design",
    iconName: "Compass",
    badge: "6 Disciplines",
    slugs: [
      "architectural-designs",
      "structural-drawings",
      "electrical-drawings",
      "plumbing-drawings",
      "interior-designs",
      "landscaping-designs",
    ],
  },
  {
    id: "valuation",
    label: "Estimate & Valuation",
    shortLabel: "Valuation & BOQ",
    description: "Bank valuation reports, structural stability certificates & itemized BOQ",
    iconName: "Landmark",
    badge: "4 Services",
    slugs: [
      "bank-valuation-report",
      "structural-stability-certificate",
      "detailed-estimation-costing",
      "chartered-engineer-valuation",
    ],
  },
  {
    id: "realestate",
    label: "Property & Investments",
    shortLabel: "Property",
    description: "Property acquisition advisory, land transactions & portfolio stewardship",
    iconName: "TrendingUp",
    badge: "4 Solutions",
    slugs: [
      "property-acquisition-advisory",
      "land-plot-transactions",
      "real-estate-investment-consulting",
      "property-portfolio-management",
    ],
  },
];

export const plannableSlugs = [
  "residential-construction",
  "villa-construction",
  "commercial-construction",
  "turnkey-construction",
  "industrial-factory-construction",
  "smart-homes",
  "renovation",
  "construction-work-consulting",
];

export const designSlugs = [
  "architectural-designs",
  "structural-drawings",
  "electrical-drawings",
  "plumbing-drawings",
  "interior-designs",
  "landscaping-designs",
];
