/**
 * Home page sections that tie the services to the places we work in.
 * Same copy rules as the location pages: confirmed facts only (towns and
 * projects from data/projects.ts), no prices or guarantees.
 */

export interface HomeSector {
  /** Section id on /services (serviceCategories id). */
  id: string;
  label: string;
  body: string;
  /** A few service pages, by slug; the "all" link goes to the sector on /services. */
  links: { slug: string; label: string }[];
  allLabel: string;
}

export const homeSectors: HomeSector[] = [
  {
    id: "construction",
    label: "Civil Construction",
    body: "Houses, villas, apartments, resorts, commercial buildings and factories, built as a turnkey project or to drawings you already have.",
    links: [
      { slug: "residential-construction", label: "House construction" },
      { slug: "villa-construction", label: "Villa and bungalow construction" },
      { slug: "apartment-construction", label: "Apartments" },
      { slug: "resort-homestay-construction", label: "Resorts and homestays" },
      { slug: "commercial-construction", label: "Commercial building construction" },
      { slug: "turnkey-construction", label: "Turnkey design and build" },
      { slug: "renovation", label: "Renovation and retrofitting" },
    ],
    allLabel: "All 10 construction services",
  },
  {
    id: "design",
    label: "Design & Architecture",
    body: "House plans, 3D elevations and approval drawings, with structural, electrical and plumbing drawings for the same building.",
    links: [
      { slug: "architectural-designs", label: "Architecture and house plans" },
      { slug: "structural-drawings", label: "Structural drawings" },
      { slug: "interior-designs", label: "Interior design" },
      { slug: "landscaping-designs", label: "Landscape design" },
    ],
    allLabel: "All 6 design services",
  },
  {
    id: "valuation",
    label: "Estimate & Valuation",
    body: "Bank valuation reports, structural stability certificates and itemised estimates, each prepared after a site inspection.",
    links: [
      { slug: "bank-valuation-report", label: "Bank valuation reports" },
      { slug: "structural-stability-certificate", label: "Structural stability certificates" },
      { slug: "detailed-estimation-costing", label: "Detailed estimate and BoQ" },
      { slug: "chartered-engineer-valuation", label: "Machinery and technical valuation" },
    ],
    allLabel: "All 4 valuation services",
  },
  {
    id: "realestate",
    label: "Property & Investments",
    body: "Document, approval and boundary checks before you buy land or a house, and management of property you already own.",
    links: [
      { slug: "property-acquisition-advisory", label: "Property buying advice" },
      { slug: "land-plot-transactions", label: "Real estate plots" },
      { slug: "real-estate-investment-consulting", label: "Property investment advice" },
      { slug: "property-portfolio-management", label: "Property management" },
    ],
    allLabel: "All 4 property services",
  },
];

export interface HomeTown {
  name: string;
  note: string;
  href: string;
  linkLabel: string;
}

export const homeTowns: HomeTown[] = [
  {
    name: "Coimbatore",
    note: "Our head office is in Gandhipuram. We build houses, villas, commercial buildings and factories across the city, and our 3,500 sq. ft. house in Perur was completed in 2020.",
    href: "/locations/coimbatore",
    linkLabel: "Building contractors in Coimbatore",
  },
  {
    name: "Ooty",
    note: "Our Ooty work includes Christus Rex Higher Secondary School at Kandal, The Oxford Continental School at Bandi Shola and a family house.",
    href: "/locations/nilgiris-ooty",
    linkLabel: "Builders in Ooty",
  },
  {
    name: "Coonoor",
    note: "We have built in Coonoor and take house, villa and renovation projects in and around the town. Site work is planned around the north-east monsoon, from October to December.",
    href: "/locations/nilgiris-ooty",
    linkLabel: "Builders in Coonoor",
  },
  {
    name: "Kotagiri",
    note: "We have built in Kotagiri and take house and villa projects there. Like Coonoor, it gets its heaviest rain from October to December.",
    href: "/locations/nilgiris-ooty",
    linkLabel: "Builders in Kotagiri",
  },
  {
    name: "Gudalur",
    note: "Our Gudalur branch is on Ooty Main Road. Our work here includes the Pricol Limited tea bungalow, Sasthapuri Hotels in the town centre and a 2,617 sq. ft. family house.",
    href: "/locations/gudalur",
    linkLabel: "Builders in Gudalur",
  },
];
