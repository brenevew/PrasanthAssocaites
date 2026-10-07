export interface Service {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  icon: string;
  features: string[];
}

export const services: Service[] = [
  {
    slug: "residential-construction",
    title: "Residential Construction",
    shortDescription:
      "Custom homes and duplexes. Vastu-compliant, Fe550D TMT steel, and a fixed-price BoQ you sign before we start.",
    description:
      "We design and build homes that follow Vastu, use space well and are built to last. A senior civil engineer supervises every stage, from the soil test and foundation to the tiling and waterproofing. The price is fixed in the contract, with no escalation clauses.",
    icon: "Home",
    features: [
      "100% Vastu-aligned architectural layouts",
      "Fe550D TMT steel & 53-grade certified cement",
      "Multi-layer chemical waterproofing on slabs & wet areas",
      "Premium-grade sanitary & electrical fittings from leading manufacturers",
      "Conduit pre-wiring for solar & rainwater percolation pit",
      "Legally locked line-item BoQ with zero price escalation",
    ],
  },
  {
    slug: "villa-construction",
    title: "Villa Construction",
    shortDescription:
      "Architect-designed villas with double-height living rooms, imported marble, private courtyards and skilled craftwork.",
    description:
      "Large glass facades, cantilevered stairs, hand-picked Italian marble, private plunge pools. One project manager coordinates every trade on site, so the finish matches the drawings.",
    icon: "Building2",
    features: [
      "Double-height living & panoramic glass facades",
      "Hand-picked Italian marble & aged teakwood joinery",
      "Private courtyard pools & landscaped timber decks",
      "Integrated smart home automation & ambient lighting",
      "Thermal-break insulation & acoustic ceiling shielding",
      "Dedicated site engineer & project manager",
    ],
  },
  {
    slug: "commercial-construction",
    title: "Commercial Building & Retail Construction",
    shortDescription:
      "Offices, retail and mixed-use buildings designed for heavy footfall, fire compliance and good rental returns.",
    description:
      "Commercial buildings have to go up fast and pass inspection. We build offices, retail arcades and complexes with column-free post-tensioned floors, efficient MEP shafts, certified fire suppression and NBC-compliant life safety.",
    icon: "Building",
    features: [
      "Column-free post-tensioned large floorplates",
      "NBC fire suppression & emergency egress networks",
      "High-capacity passenger & service elevator shafts",
      "Energy-efficient low-E glass facade glazing",
      "Basement multi-level parking with rainwater recharge",
      "Full statutory building approvals & completion sanction",
    ],
  },
  {
    slug: "turnkey-construction",
    title: "Turnkey Design and Construction",
    shortDescription:
      "One contract and one team, from design and approvals through construction and interiors to the keys.",
    description:
      "No juggling separate architects, contractors and government offices. We handle the survey, drawings, plan sanction, material purchase, construction and interiors under a single contract, and we answer for all of it.",
    icon: "Key",
    features: [
      "Single point of legal & engineering responsibility",
      "Sanction approvals & municipality plan clearances",
      "Transparent milestone billing with live app tracking",
      "Independent stage-by-stage quality audits",
      "Material testing certificates for all concrete & steel batches",
      "Guaranteed handover date backed by contract penalty clause",
    ],
  },
  {
    slug: "industrial-factory-construction",
    title: "Industrial & Factory Construction",
    shortDescription:
      "Manufacturing plants, pre-engineered (PEB) factory sheds and certified fire protection.",
    description:
      "For manufacturing and logistics. We build high-tensile PEB steel sheds, machinery foundations and heavy-duty industrial floors, plus hydrant and sprinkler systems that meet industrial safety rules.",
    icon: "Factory",
    features: [
      "High-tensile PEB steel structures with 10T crane provisions",
      "Heavy machinery vibration-damped concrete foundations",
      "Industrial fire hydrant & automatic sprinkler networks",
      "Hazardous area ventilation & fume extraction conduits",
      "Laser-screed heavy-duty VDF flooring with metallic hardeners",
      "Statutory Factory Inspectorate (DISH) & Fire NOC clearances",
    ],
  },
  {
    slug: "smart-homes",
    title: "Smart Home Automation",
    shortDescription:
      "Wired and wireless automation for lighting, security, climate and voice control.",
    description:
      "Planned into the walls before they are plastered. Concealed cabling and a wireless mesh tie together lighting scenes, motorized curtains, multi-zone air conditioning, biometric locks and CCTV, all run from your phone or a wall panel.",
    icon: "Cpu",
    features: [
      "Centralized lighting scene automation & mood presets",
      "Multi-zone smart climate regulation",
      "Biometric keyless access & video door intercom",
      "Motorized curtain, drape & skylight automation",
      "Whole-home architectural audio distribution",
      "Real-time energy consumption monitoring & solar sync",
    ],
  },
  {
    slug: "renovation",
    title: "Renovation & Structural Retrofitting",
    shortDescription:
      "Older buildings strengthened, replanned and refitted, including column jacketing and new layouts.",
    description:
      "We test the structure without breaking it, strengthen what needs it, open up the floor plan and replace the plumbing and wiring. The character of the building stays, and the services are brought up to date.",
    icon: "Hammer",
    features: [
      "Non-destructive rebound hammer & ultrasonic testing",
      "RCC column jacketing & structural load redistribution",
      "Complete spatial floorplan reconfiguration & wall removals",
      "Plumbing, electrical & waterproofing overhaul",
      "Contemporary facade facelift & terrace rejuvenation",
      "Phased scheduling for minimal occupancy disruption",
    ],
  },
  {
    slug: "construction-work-consulting",
    title: "Construction Consulting & Project Management",
    shortDescription:
      "Independent supervision, BoQ rate checks, contractor bill audits and quality checklists for private builders.",
    description:
      "We act as your independent engineer on someone else's build. We check the workmanship, verify material test certificates, audit the BoQ for overcharging and sort out engineering problems on site.",
    icon: "ClipboardList",
    features: [
      "Independent third-party site quality inspections",
      "Contractor Bill of Quantities (BoQ) rate validation",
      "Concrete cube test & steel tensile audit verification",
      "Milestone-based contractor payment certification",
      "Construction delay diagnosis & recovery planning",
      "Defect liability checklist & final handover inspection",
    ],
  },
  {
    slug: "architectural-designs",
    title: "Architectural Designs",
    shortDescription:
      "Planning, concepts, space layout and detailed working drawings.",
    description:
      "Designs that fit your plot, your budget and how you live, and that can actually be built. We take the brief through concept, layout and structural planning to drawings ready for site.",
    icon: "Compass",
    features: [
      "Architectural Planning",
      "Building Design",
      "Blueprint & Drafting",
      "Spatial Architecture",
      "Structural Concepts",
    ],
  },
  {
    slug: "interior-designs",
    title: "Interior Designs",
    shortDescription:
      "Custom interiors, makeovers and decoration.",
    description:
      "Interiors that are comfortable to use and good to look at. We take bare shells to finished homes and offices, with joinery, lighting and materials chosen to fit.",
    icon: "Palette",
    features: [
      "Interior Styling",
      "Space Makeover",
      "Indoor Aesthetics",
      "Interior Decorating",
      "Custom Interiors",
    ],
  },
  {
    slug: "structural-drawings",
    title: "Structural Drawings",
    shortDescription:
      "Stamped RCC structural drawings, footing schedules, column layouts, beam and slab reinforcement details ready for site execution.",
    description:
      "Structural drawings translate an architectural concept into something a site team can actually build safely. Our engineers size every member against the soil bearing capacity returned by your SBC test and the load path of the building, then issue fully detailed RCC drawings, footing schedules, column orientation, beam reinforcement cut-lengths, and slab bar-bending schedules. Drawings are formatted for municipal plan sanction and carry the engineer's stamp lenders and approval authorities require.",
    icon: "PencilRuler",
    features: [
      "Footing & foundation layout schedules",
      "Column orientation & reinforcement details",
      "Beam and slab bar-bending schedules (BBS)",
      "Fe 550D TMT specification with lap and anchorage detailing",
      "Designed against site-specific SBC and bore log data",
      "Stamped drawings formatted for DTCP/LPA/CCMC sanction",
    ],
  },
  {
    slug: "electrical-drawings",
    title: "Electrical Drawings",
    shortDescription:
      "Concealed conduit routing, load-calculated distribution boards, earthing layouts, and point-wise electrical schematics.",
    description:
      "An electrical layout drawn after the walls are up is a retrofit, not a design. We prepare point-wise electrical drawings before casting, conduit routing, switchboard elevations, DB positions, and circuit segregation, with distribution boards sized against calculated connected load rather than a rule of thumb. Layouts include dedicated circuits for kitchen, HVAC and utility loads, ELCB/MCB protection schedules, earthing design, and conduit provisioning for solar, inverter and smart-home systems.",
    icon: "Zap",
    features: [
      "Point-wise lighting, power & switchboard layouts",
      "Connected load calculation & DB sizing schedule",
      "Circuit segregation with ELCB/MCB protection design",
      "Earthing and lightning protection layouts",
      "Conduit provisioning for solar, inverter & automation",
      "Single-line diagrams (SLD) for sanction and EB connection",
    ],
  },
  {
    slug: "plumbing-drawings",
    title: "Plumbing Drawings",
    shortDescription:
      "Water supply, drainage and sanitary layouts with CPVC/UPVC routing, slope-calculated waste lines and rainwater harvesting design.",
    description:
      "Plumbing drawings fix the position of every wet point, pipe run and inspection chamber before the first slab is cast, which is what prevents the chased walls and re-laid floors that follow guesswork. We produce water supply schematics on CPVC for hot lines and UPVC for cold and drainage, waste and soil lines drawn to calculated fall, and sump and overhead tank capacities sized against actual occupancy. Rainwater harvesting pits are designed to the recharge norms mandated for your plot area.",
    icon: "Droplets",
    features: [
      "Water supply schematics (CPVC hot / UPVC cold)",
      "Soil, waste & vent lines drawn to calculated slope",
      "Sump and OHT capacity sized against occupancy",
      "Inspection chamber and manhole positioning",
      "Rainwater harvesting and percolation pit design",
      "Pressure-test and pre-concealment inspection schedule",
    ],
  },
  {
    slug: "landscaping-designs",
    title: "Landscaping Designs",
    shortDescription:
      "Gardens, courtyards, terraces and outdoor living spaces.",
    description:
      "Outdoor spaces designed with the building, not added after it. Good landscaping makes a property more pleasant to live in and adds to its value.",
    icon: "Trees",
    features: [
      "Outdoor Living Design",
      "Landscape Architecture",
      "Garden Crafting",
      "Exterior Styling",
      "Green Spaces Design",
    ],
  },
  {
    slug: "bank-valuation-report",
    title: "Bank Valuation Report",
    shortDescription:
      "Certified property valuation reports for home loans, mortgages, commercial financing, and banking compliance.",
    description:
      "Valuation reports accepted by nationalized and private banks. Our registered valuers inspect the site, assess land cost and structural depreciation, and certify a value for home loans, mortgages, asset declarations and visa applications.",
    icon: "Landmark",
    features: [
      "Home Loan Approvals",
      "Mortgage & Financing Valuation",
      "Fair Market Value Assessment",
      "Depreciation & Land Evaluation",
      "Registered Valuer Certification",
      "Tax & Visa Net Worth Reports",
    ],
  },
  {
    slug: "structural-stability-certificate",
    title: "Structural Stability Certificate",
    shortDescription:
      "Official stability certifications, load audits, and structural safety assessments for residential, industrial, and commercial premises.",
    description:
      "Stability certificates signed by licensed Chartered Structural Engineers. We check soundness, load capacity, seismic resilience and foundations for factory licence renewals, school and college clearances, commercial occupancy and renovation of old buildings.",
    icon: "ShieldCheck",
    features: [
      "Factory & Industrial Clearances",
      "School & Commercial Approvals",
      "Load-bearing & NDT Audits",
      "Seismic Resilience Analysis",
      "Vintage Building Fitness Report",
      "Chartered Engineer Sign-off",
    ],
  },
  {
    slug: "detailed-estimation-costing",
    title: "Detailed Estimation & Costing (BOQ)",
    shortDescription:
      "Itemized quantity surveys, Bill of Quantities (BOQ), material estimation, and budget feasibility forecasts.",
    description:
      "A line-by-line Bill of Quantities: concrete volumes, steel tonnage, brickwork, finishes and labour. You know the cost before you build, and contractors bid against the same document.",
    icon: "Calculator",
    features: [
      "Line-Item Bill of Quantities (BOQ)",
      "Material Quantity Take-offs",
      "Labor & Machinery Schedules",
      "Budget Overrun Protection",
      "Contractor Tender Analysis",
      "Stage-wise Cash Flow Planning",
    ],
  },
  {
    slug: "chartered-engineer-valuation",
    title: "Chartered Engineer & Technical Valuation",
    shortDescription:
      "Technical asset appraisals, machinery valuation, customs certification, and government regulatory clearances.",
    description:
      "Certificates from a government-registered Chartered Engineer, and technical valuations of machinery, commercial buildings and fixed assets. Accepted for customs, bank collateral, liquidation, insurance audits and legal disputes.",
    icon: "FileCheck",
    features: [
      "Plant & Machinery Valuation",
      "Customs & EPCG Clearance",
      "Bank Collateral Assessment",
      "Insurance Asset Certification",
      "Mergers & Asset Liquidation",
      "Legal & Statutory Compliance",
    ],
  },
  {
    slug: "property-acquisition-advisory",
    title: "Property Acquisition Advisory",
    shortDescription:
      "Help finding, checking and buying the right residential or commercial property.",
    description:
      "We shortlist locations, check the title, negotiate the price and see the registration through. Because we are engineers as well as advisors, we also tell you what the building or plot is actually worth.",
    icon: "MapPin",
    features: [
      "Market intelligence & location analysis",
      "Legal title verification & due diligence",
      "Fair market value negotiation",
      "DTCP & CMDA approval verification",
      "Registration & stamp duty guidance",
      "Post-acquisition development advisory",
    ],
  },
  {
    slug: "land-plot-transactions",
    title: "Land & Plot Transactions",
    shortDescription:
      "Buying, selling and developing residential and commercial land.",
    description:
      "For buyers, sellers and developers. We source plots, verify boundaries and encumbrances, negotiate, prepare documents and handle the sub-registrar office. We know the local zoning rules, DTCP layouts and bylaws, so the deal holds up legally.",
    icon: "Map",
    features: [
      "Plot sourcing & shortlisting",
      "Boundary survey & FMB verification",
      "Encumbrance & title chain audit",
      "Zoning & land-use compliance check",
      "Sale deed & registration facilitation",
      "Plot development feasibility analysis",
    ],
  },
  {
    slug: "real-estate-investment-consulting",
    title: "Real Estate Investment Consulting",
    shortDescription:
      "Advice backed by market data on residential, commercial and mixed-use investments.",
    description:
      "For individual investors, NRIs and companies. We look at the local market, upcoming infrastructure, rental yield and likely appreciation, and tell you plainly whether a property is worth buying.",
    icon: "TrendingUp",
    features: [
      "Micro-market growth analysis",
      "Rental yield & ROI forecasting",
      "NRI investment advisory & compliance",
      "Infrastructure corridor mapping",
      "Risk assessment & exit strategy",
      "Diversified portfolio construction",
    ],
  },
  {
    slug: "property-portfolio-management",
    title: "Property Portfolio Management",
    shortDescription:
      "We run your properties, from finding tenants and managing leases to keeping the assets earning.",
    description:
      "For owners of several residential, commercial or mixed-use properties. We find tenants, draw up leases, collect rent, inspect the properties, arrange maintenance and plan sales. You get the income without the day-to-day work.",
    icon: "LayoutDashboard",
    features: [
      "Tenant sourcing & screening",
      "Lease documentation & compliance",
      "Rent collection & disbursement",
      "Property inspection & maintenance",
      "Asset performance reporting",
      "Strategic disposition planning",
    ],
  },
];
