export interface Service {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  icon: string;
  features: string[];
}

/**
 * Service catalogue. Shown on the service pages, the Services page cards, the
 * service pop-up, the header menu, structured data and llms.txt.
 *
 * Copy rules (keep every service consistent):
 * - shortDescription: one plain sentence saying what the service is.
 * - description: 2 to 4 sentences, "we" and "you", no marketing adjectives.
 * - features: 6 concrete items, sentence case, under ~45 characters.
 * - Only confirmed facts: no prices, guarantees, registrations, brand names or
 *   unverified specifications; no em dashes or spaced hyphens.
 */
export const services: Service[] = [
  {
    slug: "residential-construction",
    title: "Residential Construction",
    shortDescription:
      "Individual houses built from the first plan to handover, on an itemised BoQ, with our engineers checking every stage on site.",
    description:
      "We build individual houses and duplexes for families in Coimbatore and the Nilgiris. The work starts with a soil test and a plan drawn for your plot, and the price is set by an itemised BoQ before anything is built. Our engineers inspect each stage, from footings to finishing, before the next one begins.",
    icon: "Home",
    features: [
      "Floor plan and 3D elevation for your plot",
      "Soil test before the foundation is designed",
      "Help with plan approval",
      "RCC structure built to structural drawings",
      "Waterproofing for roof and bathrooms",
      "Itemised BoQ fixing the price for the scope",
    ],
  },
  {
    slug: "villa-construction",
    title: "Villa Construction",
    shortDescription:
      "Villas and estate bungalows designed and built by one team, with the architecture, structure and interiors planned together.",
    description:
      "A villa has more going on than a standard house: larger spans, more glass, outdoor living areas and often built-in interiors. We plan the architecture, structure and services together, so these details are drawn, priced and agreed before construction starts. In the Nilgiris we have built estate bungalows on plantation land, including a site that could only be reached across a river.",
    icon: "Building2",
    features: [
      "Architectural design and 3D views",
      "Structure designed for larger, open spaces",
      "Courtyards, terraces and outdoor areas",
      "Interiors designed with the building",
      "Smart home wiring planned in advance",
      "Itemised BoQ and written schedule",
    ],
  },
  {
    slug: "commercial-construction",
    title: "Commercial Building & Retail Construction",
    shortDescription:
      "Shops, showrooms, offices, hotels and schools, built with the architecture, structure and services coordinated from the start.",
    description:
      "Commercial buildings carry more people, heavier services and stricter approval checks than houses. We coordinate the architectural, structural, electrical and plumbing drawings before work starts, so problems are solved on paper rather than on site. Our commercial work includes Sasthapuri Hotels in Gudalur town and Christus Rex Higher Secondary School in Ooty.",
    icon: "Building",
    features: [
      "Layouts planned around how it will be used",
      "Structural design for commercial loads",
      "Electrical, plumbing and fire safety plans",
      "Approval drawings and application support",
      "Phased work for busy or tight sites",
      "Itemised BoQ and written schedule",
    ],
  },
  {
    slug: "turnkey-construction",
    title: "Turnkey Design and Construction",
    shortDescription:
      "One contract covering design, approval support, construction and interiors, so you deal with one team from the first plan to the keys.",
    description:
      "Turnkey means we take responsibility for the whole job: drawings, approval support, construction and interiors, under one contract and one schedule. You make the decisions and we coordinate the people and the work. The price is set by an itemised BoQ for the agreed scope before construction starts.",
    icon: "Key",
    features: [
      "One contract and one point of contact",
      "Design, approval support, build, interiors",
      "Itemised BoQ for the agreed scope",
      "Payments linked to completed stages",
      "Engineer inspections at each stage",
      "Written schedule with a handover date",
    ],
  },
  {
    slug: "industrial-factory-construction",
    title: "Industrial & Factory Construction",
    shortDescription:
      "Factory buildings and pre-engineered (PEB) steel sheds, with foundations and floors designed for your machines.",
    description:
      "A factory building has to suit the work done inside it. We plan the layout around your production flow, design foundations for the machines you will install, and specify floors for the loads and traffic they will carry. We build both RCC factory buildings and pre-engineered steel sheds, with drainage and fire protection planned in.",
    icon: "Factory",
    features: [
      "Pre-engineered steel sheds and RCC buildings",
      "Machine foundations designed for the load",
      "Industrial floors for heavy traffic",
      "Drainage and fire protection planning",
      "Approval drawings and application support",
      "Itemised BoQ and written schedule",
    ],
  },
  {
    slug: "smart-homes",
    title: "Smart Home Automation",
    shortDescription:
      "Lighting, curtains, climate, door locks and cameras you can control from your phone, planned into the house before the walls are finished.",
    description:
      "Smart home systems work best when the wiring is planned during construction. We design the control points, conduits and network along with your electrical drawings, then install and set up the devices. For existing homes we use wireless devices, so walls do not have to be broken.",
    icon: "Cpu",
    features: [
      "Lighting scenes and dimming",
      "Motorised curtains and blinds",
      "Air conditioning control",
      "Smart locks, video doorbell and cameras",
      "Multi-room audio",
      "Control from one app or by voice",
    ],
  },
  {
    slug: "renovation",
    title: "Renovation & Structural Retrofitting",
    shortDescription:
      "Renovations, layout changes, repairs and floor additions, starting with a check of the existing structure.",
    description:
      "Every renovation starts with what is already there. Our engineers check the existing structure before we remove a wall or add a floor, and tell you plainly what needs strengthening. We then handle the work, from structural repairs and waterproofing to new kitchens, bathrooms and finishes, phased around you if you are living in the building. Our renovation work includes the British-era Director's Building at Manjushree Plantation in the Nilgiris.",
    icon: "Hammer",
    features: [
      "Structural check before any work",
      "Column and beam strengthening",
      "Layout changes and wall removal",
      "Kitchen, bathroom and finish upgrades",
      "Waterproofing and leak repairs",
      "Floor additions after a structural check",
    ],
  },
  {
    slug: "construction-work-consulting",
    title: "Construction Consulting & Project Management",
    shortDescription:
      "Independent site inspections, bill checks and quality advice while another contractor builds for you.",
    description:
      "If you have hired a contractor, we can be your engineers on site. We inspect the work at the stages that matter most, check bills against the BoQ and the work actually done, and tell you in writing what needs correcting. We work for you, not the contractor.",
    icon: "ClipboardList",
    features: [
      "Site inspections at key stages",
      "Steel and concrete checks before pouring",
      "Contractor bill and BoQ checks",
      "Material quality advice",
      "Written inspection reports",
      "Final handover inspection",
    ],
  },
  {
    slug: "architectural-designs",
    title: "Architectural Designs",
    shortDescription:
      "House plans, 3D elevations and approval drawings, drawn for your plot, your family and the rules that apply to it.",
    description:
      "A good plan starts with the plot: its size, road side, setbacks and slope. We draw the floor plan around how your family lives, show you the 3D elevation, and prepare the approval drawings and the working drawings your builder will use. Structural, electrical and plumbing drawings can be prepared alongside, so they all agree.",
    icon: "Compass",
    features: [
      "2D floor plans for your plot",
      "3D front elevation",
      "Vastu-based planning on request",
      "Approval (sanction) drawings",
      "Working drawings for construction",
      "Structural and services drawings",
    ],
  },
  {
    slug: "interior-designs",
    title: "Interior Designs",
    shortDescription:
      "Kitchens, wardrobes, ceilings, lighting and storage for homes and offices, designed in 3D and installed by our team.",
    description:
      "We design interiors room by room and show them to you in 3D before anything is made. Once you approve the views, our team makes and installs the kitchen, wardrobes, units and ceilings, so what is built matches what you saw. We design for homes and offices.",
    icon: "Palette",
    features: [
      "Modular kitchens and wardrobes",
      "False ceilings and lighting",
      "TV units, pooja units and storage",
      "3D views of each room",
      "Material and finish selection",
      "Supply and installation by our team",
    ],
  },
  {
    slug: "structural-drawings",
    title: "Structural Drawings",
    shortDescription:
      "Foundation, column, beam and slab drawings that show the site team exactly how to build the structure safely.",
    description:
      "Structural drawings turn the architectural plan into something a site team can build safely. Our engineers design the footings from the soil test results, then size and detail the columns, beams and slabs, with bar bending schedules for the steel. The drawings are prepared in the format that approval authorities and banks ask for.",
    icon: "PencilRuler",
    features: [
      "Footing and foundation drawings",
      "Column layout and details",
      "Beam and slab reinforcement drawings",
      "Bar bending schedules",
      "Design based on the soil test",
      "Drawings ready for approval",
    ],
  },
  {
    slug: "electrical-drawings",
    title: "Electrical Drawings",
    shortDescription:
      "Switch, socket and light layouts, circuits and earthing, planned before the walls go up.",
    description:
      "Electrical drawings decide where every switch, socket and light goes, and how the circuits and distribution board are arranged. We plan them around how you will use each room, and allow for air conditioners, a car charger, solar or smart home wiring if you want them. Planned early, nothing has to be broken open later.",
    icon: "Zap",
    features: [
      "Switch, socket and light layouts",
      "Circuit and distribution board planning",
      "Earthing layout",
      "Points for air conditioners and appliances",
      "Provision for solar and smart home wiring",
      "Single-line diagram for the EB connection",
    ],
  },
  {
    slug: "plumbing-drawings",
    title: "Plumbing Drawings",
    shortDescription:
      "Water supply, drainage and rainwater harvesting drawings, so every pipe run is fixed before the slab is cast.",
    description:
      "Most leaks and blocked drains come from pipes laid without a plan. Our plumbing drawings fix every wet point, pipe route and inspection chamber before construction, with drains laid to the right slope and tanks sized for the people who will live there. Rainwater harvesting is included.",
    icon: "Droplets",
    features: [
      "Water supply layout, hot and cold",
      "Drainage lines laid to the right slope",
      "Sump and overhead tank sizing",
      "Inspection chamber positions",
      "Rainwater harvesting",
      "Pressure test before walls are closed",
    ],
  },
  {
    slug: "landscaping-designs",
    title: "Landscaping Designs",
    shortDescription:
      "Garden layouts, planting, paths, irrigation and outdoor lighting, planned for the local climate and easy upkeep.",
    description:
      "We design gardens and outdoor spaces around how you want to use them and how much upkeep you want. Plants are chosen for the local climate, whether that is Coimbatore's heat or the cooler Nilgiris, and drainage, irrigation and lighting are planned with the layout. Terraces and balconies can be planted too.",
    icon: "Trees",
    features: [
      "Garden layout and planting plan",
      "Lawns, paths and driveways",
      "Drip and sprinkler irrigation",
      "Outdoor lighting and seating",
      "Terrace and balcony gardens",
      "Drainage planned with the layout",
    ],
  },
  {
    slug: "bank-valuation-report",
    title: "Bank Valuation Report",
    shortDescription:
      "Property valuation reports for home loans, mortgages and loans against property, prepared after a site inspection.",
    description:
      "A bank valuation report states what a property is worth and how that value was reached. We check the documents, inspect and measure the property, and prepare the report in the format your bank asks for. The same report can support visa, net worth and family property decisions. Acceptance is decided by the bank, so check which valuers it accepts.",
    icon: "Landmark",
    features: [
      "Document check",
      "Site inspection and measurements",
      "Land and building valuation",
      "Report in your bank's format",
      "Site photographs",
      "Use for loans, visas and net worth",
    ],
  },
  {
    slug: "structural-stability-certificate",
    title: "Structural Stability Certificate",
    shortDescription:
      "An engineer's inspection and certificate confirming that a building is structurally safe for its use.",
    description:
      "Schools, factories and some licensing authorities ask for a structural stability certificate. Our structural engineers inspect the building, check its columns, beams, slabs and foundations for distress, test the concrete where needed, and certify whether it is fit for its use. Any repairs needed first are listed in the report.",
    icon: "ShieldCheck",
    features: [
      "Inspection of the structure",
      "Crack and corrosion survey",
      "Concrete testing where needed",
      "Load review for the building's use",
      "Repairs listed if needed",
      "Certificate in the required format",
    ],
  },
  {
    slug: "detailed-estimation-costing",
    title: "Detailed Estimation & Costing (BOQ)",
    shortDescription:
      "Itemised estimates and bills of quantities that show exactly what a building will cost, item by item.",
    description:
      "A rate per square foot hides what is included. A bill of quantities lists every item of work with its quantity and rate, so you can see what you are paying for, compare contractor quotes fairly and plan your payments. We prepare BOQs from your drawings and check the quantities and rates against standard schedules of rates.",
    icon: "Calculator",
    features: [
      "Itemised bill of quantities",
      "Material quantities",
      "Labour and stage-wise costs",
      "Comparison of contractor quotes",
      "Cash flow plan by stage",
      "Checks against standard rates",
    ],
  },
  {
    slug: "chartered-engineer-valuation",
    title: "Chartered Engineer & Technical Valuation",
    shortDescription:
      "Engineer valuations of machinery, industrial buildings and other fixed assets, for banks, audits, insurance and customs.",
    description:
      "Businesses need technical valuations for bank loans, audits, insurance claims, customs and insolvency matters. We inspect the assets, assess their condition, age and replacement cost, and prepare a report to the requirements of whoever asked for it.",
    icon: "FileCheck",
    features: [
      "Plant and machinery valuation",
      "Industrial building valuation",
      "Reports for bank loans",
      "Reports for insurance and audits",
      "Customs and EPCG reports",
      "Insolvency and asset sale reports",
    ],
  },
  {
    slug: "property-acquisition-advisory",
    title: "Property Acquisition Advisory",
    shortDescription:
      "Help finding and checking a property before you buy: documents, approvals, condition and value.",
    description:
      "Property purchases go wrong most often in the documents. We help you find suitable properties, check the title, encumbrance certificate and approvals before you pay an advance, inspect the building if there is one, and support you through registration. Any concerns are reported to you in writing.",
    icon: "MapPin",
    features: [
      "Property search to your brief",
      "Title and document checks",
      "Approval checks",
      "Building condition check",
      "Value assessment",
      "Registration support",
    ],
  },
  {
    slug: "land-plot-transactions",
    title: "Land & Plot Transactions",
    shortDescription:
      "Support for buying or selling land: title checks, boundary survey, approvals and registration.",
    description:
      "Land deals depend on clean documents and correct boundaries. We check the title chain and encumbrance records, survey the boundaries against the FMB sketch, check zoning and layout approvals, and support the sale deed, registration and mutation.",
    icon: "Map",
    features: [
      "Plot search to your brief",
      "Title chain and EC check",
      "Boundary survey against the FMB sketch",
      "Zoning and approval check",
      "Sale deed and registration support",
      "Development feasibility check",
    ],
  },
  {
    slug: "real-estate-investment-consulting",
    title: "Real Estate Investment Consulting",
    shortDescription:
      "Advice on where and what to buy as an investment, based on location, rental demand and risk.",
    description:
      "We help investors, including NRIs, decide where and what to buy. We look at how a location is growing, the rent a property can earn, the risks in the specific property and its documents, and when you might sell. You get our reasoning and the data behind it, not just a recommendation.",
    icon: "TrendingUp",
    features: [
      "Location and growth analysis",
      "Rental yield estimates",
      "Property-specific risk check",
      "NRI investment support",
      "Exit planning",
      "Portfolio review",
    ],
  },
  {
    slug: "property-portfolio-management",
    title: "Property Portfolio Management",
    shortDescription:
      "Tenants, rent, maintenance and monthly reports for owners who cannot manage their property themselves.",
    description:
      "If you own property you cannot look after yourself, including from abroad, we can manage it for you. We find and screen tenants, collect rent, arrange maintenance and repairs, inspect the property regularly, and send you a monthly report.",
    icon: "LayoutDashboard",
    features: [
      "Tenant search and screening",
      "Lease agreements",
      "Rent collection",
      "Maintenance and repairs",
      "Regular inspections",
      "Monthly owner reports",
    ],
  },
];
