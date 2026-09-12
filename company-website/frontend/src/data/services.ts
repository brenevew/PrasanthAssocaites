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
      "Individual custom homes and duplex residences built with 100% Vastu compliance, Fe550D TMT reinforcement, and legally binding fixed-price BoQ.",
    description:
      "Every home is a generational landmark. We design and construct custom residences balancing scientific Vastu architecture, spatial efficiency, and engineered durability. From geotechnical soil analysis and heavy RCC foundation casting to Kajaria/Somany vitrified finishes and multi-layer waterproofing, every milestone is supervised by senior civil engineers with zero escalation clauses.",
    icon: "Home",
    features: [
      "100% Vastu-aligned architectural layouts",
      "Fe550D TMT steel & 53-grade certified cement",
      "Multi-layer chemical waterproofing on slabs & wet areas",
      "Branded sanitary & electrical fittings (Jaquar/Kohler)",
      "Conduit pre-wiring for solar & rainwater percolation pit",
      "Legally locked line-item BoQ with zero price escalation",
    ],
  },
  {
    slug: "villa-construction",
    title: "Villa Construction",
    shortDescription:
      "Signature architectural residences blending double-height living, natural imported marble, private courtyards, and artisan craftsmanship.",
    description:
      "Our villa projects represent the pinnacle of architectural living. Designed for discerning homeowners, each villa is an exclusive statement with expansive glass facades, floating cantilever stairs, hand-picked Italian Statuario marble, and private plunge pools. We coordinate every trade under white-glove supervision to ensure peerless aesthetic and structural perfection.",
    icon: "Building2",
    features: [
      "Double-height living & panoramic glass facades",
      "Hand-picked Italian marble & aged teakwood joinery",
      "Private courtyard pools & landscaped timber decks",
      "Integrated KNX smart automation & ambient lighting",
      "Thermal-break insulation & acoustic ceiling shielding",
      "Dedicated mastercraft civil engineer & white-glove PM",
    ],
  },
  {
    slug: "commercial-construction",
    title: "Commercial Building & Retail Construction",
    shortDescription:
      "Corporate offices, retail hubs, and mixed-use commercial developments engineered for high footfalls, safety compliance, and maximum rental yields.",
    description:
      "Commercial developments require uncompromising precision, structural speed, and statutory compliance. We engineer corporate towers, retail arcades, and commercial complexes with column-free post-tensioned spans, high-efficiency MEP shafts, certified fire suppression networks, and NBC-compliant life-safety provisions.",
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
      "Complete concept-to-key delivery with single-point accountability covering design, government sanctions, civil execution, and interior handover.",
    description:
      "Eliminate the stress of juggling multiple contractors, architects, and government offices. Our turnkey delivery provides full accountability under a single comprehensive contract. We manage land surveying, architectural drafting, municipality plan sanctions, raw material procurement, civil contracting, and final interior commissioning.",
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
      "Heavy-duty manufacturing plants, pre-engineered building (PEB) factory sheds, and certified industrial fire networks.",
    description:
      "Engineered for heavy industrial operations, logistics, and manufacturing. We build high-tensile PEB steel sheds, reinforced machinery foundations, heavy load-bearing industrial flooring, and complete fire hydrant/sprinkler protection networks compliant with industrial safety regulations.",
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
      "Intelligent KNX/Zigbee home automation for centralized lighting, biometric security, climate control, and voice-assisted living.",
    description:
      "Smart living designed into the walls from day one. We engineer concealed structured cabling and wireless mesh networks that unify smart lighting scenes, motorized drapery, multi-zone VRV air conditioning, biometric security locks, and perimeter CCTV surveillance into intuitive smartphone and touch-panel controls.",
    icon: "Cpu",
    features: [
      "Centralized lighting scene automation & mood presets",
      "Multi-zone VRV/VRF smart climate regulation",
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
      "Transforming aging properties into contemporary luxury spaces with structural column jacketing, interior modernization, and spatial reorganization.",
    description:
      "Breathe new life and modern value into existing properties. We specialize in non-destructive structural retrofitting, load-bearing redistribution, floorplan modernization, and complete MEP upgrades, preserving architectural heritage while delivering state-of-the-art living comforts.",
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
      "Independent engineering supervision, BoQ rate validation, contractor billing audits, and quality control checklists for private builders.",
    description:
      "Protect your capital investment with veteran civil engineering oversight. We act as your independent owner's engineer—verifying contractor workmanship, cross-checking raw material test certificates, auditing bill of quantities to prevent overcharging, and resolving complex on-site engineering challenges.",
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
      "Comprehensive architectural planning, building concepts, spatial design, and detailed blueprint drafting.",
    description:
      "Our architectural team crafts innovative, functional, and aesthetically striking designs tailored to your spatial needs. From conceptual blueprints to structural planning, we translate visions into buildable, sustainable realities.",
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
      "Bespoke interior styling, space makeovers, indoor aesthetics, and customized interior decoration.",
    description:
      "We create sophisticated indoor environments that blend ergonomics with high-end aesthetic appeal. Our bespoke interior solutions transform raw spaces into beautifully curated living and working environments.",
    icon: "Palette",
    features: [
      "Interior Styling",
      "Space Makeover",
      "Indoor Aesthetics",
      "Interior Decorating",
      "Bespoke Interiors",
    ],
  },
  {
    slug: "landscaping-designs",
    title: "Landscaping Designs",
    shortDescription:
      "Landscape architecture, outdoor living design, garden crafting, and tranquil green space creation.",
    description:
      "We harmonize architecture with nature by designing serene outdoor spaces, gardens, and exterior environments. Our landscaping expertise elevates property value and creates refreshing green sanctuaries.",
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
      "We prepare authoritative, bank-approved property valuation and appraisal reports accepted by leading nationalized and private banks. Our registered valuers conduct rigorous on-site inspections, land cost assessments, and structural depreciation analyses to provide precise valuation certifications for home loans, mortgages, asset declarations, and visa processing.",
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
      "Certified structural stability inspections and safety certifications issued by licensed Chartered Structural Engineers. We verify structural soundness, load-bearing capacities, seismic resilience, and foundation health for factory license renewals, school/college building clearances, commercial occupancy approvals, and vintage building renovations.",
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
      "Comprehensive itemized cost estimation and Bill of Quantities (BOQ) prepared with micro-level accuracy. We break down concrete volumes, steel tonnage, brickwork, finishing materials, and labor schedules to protect you against budget overflows and enable transparent contractor tendering.",
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
      "Government-registered Chartered Engineer certifications and technical valuation services for industrial machinery, commercial infrastructure, and corporate fixed assets. We deliver legally valid technical documentation for customs clearances, bank collateral, asset liquidation, insurance audits, and legal dispute resolutions.",
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
      "Strategic counsel for identifying, evaluating, and securing high-potential residential and commercial properties.",
    description:
      "Our property acquisition advisory service guides discerning buyers through every stage of the acquisition journey — from market intelligence and location shortlisting to legal due diligence, negotiation strategy, and registration support. We combine deep local market expertise with rigorous technical assessment to ensure every investment decision is informed, protected, and positioned for long-term value appreciation.",
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
      "End-to-end facilitation of premium residential and commercial land acquisitions, sales, and plot development.",
    description:
      "We facilitate seamless land and plot transactions for buyers, sellers, and developers — handling everything from property sourcing, boundary verification, and legal encumbrance checks to negotiation, documentation, and sub-registrar formalities. Our deep knowledge of local zoning laws, DTCP layouts, and municipal bylaws ensures every transaction is legally sound and investment-grade.",
    icon: "Map",
    features: [
      "Premium plot sourcing & curation",
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
      "Data-driven advisory for maximizing returns on residential, commercial, and mixed-use property investments.",
    description:
      "Our real estate investment consulting practice delivers institutional-grade market analysis, yield forecasting, and risk assessment for individual investors, NRIs, and corporate entities. We evaluate micro-market dynamics, infrastructure growth corridors, rental yield potential, and capital appreciation trajectories to build conviction behind every property investment decision.",
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
      "Comprehensive stewardship of multi-property holdings — from tenant acquisition and lease management to asset optimization.",
    description:
      "We provide end-to-end portfolio management services for property owners holding multiple residential, commercial, or mixed-use assets. Our team handles tenant sourcing, lease documentation, rent collection, periodic property inspections, maintenance coordination, and strategic disposition planning — allowing owners to realize maximum returns with zero operational burden.",
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
