import type { ProjectArea } from "./projects";

/**
 * Content for the office location pages (/locations/<slug>), rendered by
 * components/locations/LocationLanding.tsx. The FAQs are mirrored in each page's
 * FAQPage structured data.
 *
 * Copy rules (same as the service pages): plain English; only confirmed facts
 * (towns and projects from data/projects.ts, ratings from the Google listings);
 * no prices, timelines in figures, guarantees, registrations or brand names;
 * no em dashes or spaced hyphens. Answers may link with [text](/path).
 */

export interface LocationFaq {
  q: string;
  a: string;
}

export interface LocationPage {
  slug: "coimbatore" | "gudalur" | "nilgiris-ooty";
  /** Which office this page belongs to (company.offices label). */
  office: "Coimbatore" | "Gudalur";
  /** Projects shown are those whose location falls in this area. */
  area: ProjectArea;
  breadcrumb: string;
  badge: string;
  heading: string;
  intro: string;
  /** Local editorial sections; links use the same syntax as FAQ answers. */
  overview?: { heading: string; paragraphs: string[] }[];
  servicesHeading?: string;
  servicesIntro?: string;
  /** The Google listing for this office (confirmed October 2026). */
  googleRating: { rating: string; reviews: number };
  conditions: { title: string; body: string }[];
  conditionsHeading: string;
  /** Towns or areas worked in, each with a plain note. Optional. */
  places?: { name: string; note: string; href?: string }[];
  services: string[];
  projectsHeading: string;
  faqs: LocationFaq[];
  /** Service preset on the quote form (Gudalur enquiries are mostly houses). */
  formService?: string;
  whatsappMessage: string;
  /** The other location page, suggested at the end. */
  other: { href: string; title: string; body: string };

  // Optional sections. Each renders only on pages that set it.
  /** A short line under the hero intro. */
  heroNote?: string;
  /** Hero button labels (defaults: "Request a Quote", "WhatsApp us"). */
  quoteLabel?: string;
  whatsappLabel?: string;
  /** Link the hero rating to the office's Google listing, where the reviews are. */
  reviewsLink?: boolean;
  /** A link to the enquiry form under the local-conditions cards. */
  conditionsCta?: string;
  /** Written notes on documented projects, each linking to its project page. */
  caseStudies?: {
    heading: string;
    intro: string;
    items: { slug: string; heading: string; paragraphs: string[]; linkLabel: string }[];
    cta: string;
  };
  /** Shown instead of the service cards: the four sectors, each with its service links. */
  serviceSectors?: { heading: string; body: string; links: { slug: string; label: string; note?: string }[] }[];
  /** How a project runs, stage by stage. */
  process?: { heading: string; intro: string; steps: { title: string; body: string }[] };
  /** How the itemised BoQ and the price work. */
  pricing?: { heading: string; paragraphs: string[]; itemsHeading: string; items: string[]; afterItems: string[]; cta: string };
}

export const locationPages: Record<LocationPage["slug"], LocationPage> = {
  coimbatore: {
    slug: "coimbatore",
    office: "Coimbatore",
    area: "coimbatore",
    breadcrumb: "Coimbatore",
    badge: "Head office · Gandhipuram",
    heading: "Building Contractors in Coimbatore",
    intro:
      "Prasanth Associates is a firm of building contractors in Coimbatore, with its head office in Gandhipuram on Sathy Road. We design and build houses, villas and commercial buildings, prepare house plans, structural drawings and estimates, and provide valuation and property services. Every construction project is priced through an itemised BoQ before work starts.",
    heroNote: "Engineering first, quality always. Structural drawings are ready before construction starts, and the site builds from them.",
    quoteLabel: "Request a House Construction Estimate",
    whatsappLabel: "Discuss your project on WhatsApp",
    reviewsLink: true,
    overview: [
      {
        heading: "House and villa construction in Coimbatore",
        paragraphs: [
          "An individual house starts with the way your family will use it. Room sizes, parking, stairs, daylight, ventilation and future requirements all belong in the brief before finishes are selected. Our [residential construction service](/services/residential-construction) brings these requirements together with structural planning and electrical and plumbing coordination. For a villa, discuss outdoor spaces, courtyards and interior requirements while the building layout is being developed.",
          "Our [completed residence in Perur](/projects/residential-building-perur-coimbatore) is a 3,500 sq. ft. house completed in 2020. Its case study describes functional space planning, natural light and ventilation, and coordination between the design and construction teams. Use this local example to discuss your priorities, then develop a proposal for the conditions and requirements of your own plot.",
        ],
      },
      {
        heading: "House plans, structural drawings and turnkey construction",
        paragraphs: [
          "You can approach us before a floor plan is ready or bring drawings prepared by another designer. Our [architectural design service](/services/architectural-designs) includes floor plans, elevations, approval drawings and working drawings. Structural, electrical and plumbing requirements need to be coordinated with the layout so the site team can work from a consistent set of information.",
          "For clients seeking design and construction through one appointment, our [turnkey design and build service in Coimbatore](/services/turnkey-design-build-coimbatore) brings these stages into an agreed scope. Discuss responsibilities for design, application support, construction, interiors and external works before the contract is settled. The relevant authority decides approval; the documents and application route need to be checked for your particular site.",
        ],
      },
      {
        heading: "Commercial construction and clear project estimates",
        paragraphs: [
          "For shops, offices and other [commercial buildings](/services/commercial-construction), explain how the premises will operate as well as the floor area you need. Customer access, staff circulation, deliveries, building services and tenant fit-out can affect both the layout and construction sequence. Identify which parts of the building you want included in the appointment before comparing proposals.",
          "A construction estimate should explain the work behind the total. Ask for quantities, specifications, inclusions, exclusions and the procedure for changes, rather than comparing a square-foot rate alone. Our [BOQ guide](/blog/how-to-read-a-construction-boq) explains what to review. We also provide [bank valuation reports](/services/bank-valuation-report); share the intended recipient's requirements when discussing a valuation appointment.",
        ],
      },
    ],
    googleRating: { rating: "4.9", reviews: 26 },
    conditionsHeading: "Planning your construction project in Coimbatore",
    conditions: [
      {
        title: "Which authority approves your plan",
        body: "Inside Coimbatore Corporation limits, building plans go to the Coimbatore City Municipal Corporation (CCMC). Most plots outside the limits come under the town and country planning department (DTCP) or the local planning authority. Tamil Nadu also has an online self-certification route for some small houses in approved layouts. Your patta, FMB sketch and layout approval show which route your plot takes, and we check this before the drawings are prepared. The authority makes the approval decision.",
      },
      {
        title: "Soil investigation before foundation design",
        body: "Ground conditions change from plot to plot, and some soils swell when wet and shrink as they dry, which can crack floors and walls. The structural engineer decides what soil investigation your building needs, then designs the foundations for the results and the building loads. Don't rely on the foundation used on a neighbouring plot.",
      },
      {
        title: "RCC structure and adding floors",
        body: "Houses here are usually reinforced concrete (RCC) frames, with each column and beam designed for the load it carries. If you may add a floor later, say so at the start so the columns and foundations are designed for it. An existing building needs a structural check by an engineer before any extension; our renovation service starts with that check.",
      },
      {
        title: "Building on narrow city plots",
        body: "On a narrow plot, setbacks, site coverage, road width and the height limit decide how much you can build, so the plan starts from those rules. Stairs, parking and daylight need careful placing when the side walls are close to the neighbours. Construction also needs a plan for storing materials and working without blocking the road.",
      },
      {
        title: "Heat, ventilation and rainwater",
        body: "Coimbatore summers are hot, so orientation, shaded windows, cross-ventilation and roof treatment make a real difference to comfort indoors. Tamil Nadu's building rules require rainwater harvesting structures on building sites, and storm water should be led into the ground where the soil allows. Both are planned in the drawings.",
      },
      {
        title: "Electrical and plumbing coordination",
        body: "Electrical and plumbing drawings are coordinated with the structure, so pipe and conduit routes, shafts and slab openings are fixed before concrete is poured. This avoids breaking into new slabs and walls later, and lets the estimate price the services work accurately.",
      },
    ],
    conditionsCta: "Discuss your plot with an engineer",
    services: [
      "residential-construction",
      "turnkey-construction",
      "commercial-construction",
      "architectural-designs",
      "interior-designs",
      "bank-valuation-report",
    ],
    servicesHeading: "Construction, design, valuation and property services in Coimbatore",
    servicesIntro: "All 22 of our services are available from the Gandhipuram office, as a complete project or on their own.",
    serviceSectors: [
      {
        heading: "Civil construction",
        body: "Houses, villas, shops, offices and factories, built as a complete turnkey project or to drawings you already have.",
        links: [
          { slug: "residential-construction", label: "House construction", note: "Individual houses and duplexes, from the first plan to handover." },
          { slug: "villa-construction", label: "Villa construction", note: "Villas with courtyards, terraces and interiors planned together with the building." },
          { slug: "commercial-construction", label: "Commercial and retail buildings", note: "Shops, showrooms, offices, hotels and schools, planned around how they will be used." },
          { slug: "turnkey-construction", label: "Turnkey design and build in Coimbatore", note: "Design, approval support, construction and interiors under one contract." },
          { slug: "industrial-factory-construction", label: "Factory and industrial shed construction", note: "Factory buildings and PEB steel sheds, with floors and machine foundations designed for the load." },
          { slug: "smart-homes", label: "Smart home automation", note: "Lighting, curtains, air conditioning, locks and cameras, wired in before the walls are finished." },
          { slug: "renovation", label: "Renovation and structural retrofitting", note: "Repairs, layout changes, strengthening and floor additions, after a structural check." },
          { slug: "construction-work-consulting", label: "Construction consulting and site inspection", note: "Independent inspections, steel and concrete checks and bill checks while another contractor builds." },
        ],
      },
      {
        heading: "Design and architecture",
        body: "Drawings for approval and for building, with the structural and services drawings coordinated for the same house.",
        links: [
          { slug: "architectural-designs", label: "House plans and architectural design", note: "2D floor plans, 3D elevations and approval drawings for your plot." },
          { slug: "interior-designs", label: "Interior design", note: "Kitchens, wardrobes, ceilings and lighting, designed in 3D and installed by our team." },
          { slug: "structural-drawings", label: "Structural drawings", note: "Footing, column, beam and slab drawings, with bar bending schedules for the site." },
          { slug: "electrical-drawings", label: "Electrical drawings", note: "Switch, socket and light layouts, circuits and earthing for each floor." },
          { slug: "plumbing-drawings", label: "Plumbing drawings", note: "Water supply, drainage, tank sizing and rainwater harvesting layouts." },
          { slug: "landscaping-designs", label: "Landscape design", note: "Garden layouts, planting, paths, irrigation and outdoor lighting." },
        ],
      },
      {
        heading: "Estimates and valuation",
        body: "Reports and estimates for banks, buyers, insurers and anyone comparing contractors' quotes.",
        links: [
          { slug: "bank-valuation-report", label: "Bank valuation reports", note: "Property valuations for home loans and loans against property, after a site inspection." },
          { slug: "structural-stability-certificate", label: "Structural stability certificates", note: "An engineer's inspection and certificate that a building is safe for its use." },
          { slug: "detailed-estimation-costing", label: "Detailed estimate and BoQ", note: "An itemised bill of quantities, so you know the cost before you build." },
          { slug: "chartered-engineer-valuation", label: "Plant, machinery and technical valuation", note: "Engineer valuations of machinery and industrial buildings for banks, audits and insurance." },
        ],
      },
      {
        heading: "Property and investment",
        body: "Help with buying, selling, investing in and managing property in and around Coimbatore.",
        links: [
          { slug: "property-acquisition-advisory", label: "Property buying advice", note: "Document, approval and condition checks before you buy a house or plot." },
          { slug: "land-plot-transactions", label: "Land and plot transactions", note: "Title and EC checks, boundary survey against the FMB sketch, and registration support." },
          { slug: "real-estate-investment-consulting", label: "Real estate investment advice", note: "Location, rental yield and risk checks for property bought as an investment, including for NRIs." },
          { slug: "property-portfolio-management", label: "Property management", note: "Tenants, rent collection, maintenance and monthly reports for owners who live elsewhere." },
        ],
      },
    ],
    projectsHeading: "Our work in Coimbatore",
    caseStudies: {
      heading: "Projects in detail",
      intro: "Our Perur house in Coimbatore, and our largest completed commercial building, in Gudalur.",
      items: [
        {
          slug: "residential-building-perur-coimbatore",
          heading: "Family house in Perur, Coimbatore",
          paragraphs: [
            "A 3,500 sq. ft. house in Perur, completed in 2020. The planning focused on functional floor plans and efficient use of space, natural light and ventilation, and structural design coordinated with the electrical and plumbing work.",
            "Material selection and construction quality were part of the brief, and the design team worked with the site team through to completion. If you are planning a family house in Coimbatore, it is a useful one to look at.",
          ],
          linkLabel: "See the Perur house",
        },
        {
          slug: "sasthapuri",
          heading: "Sasthapuri Hotels, Gudalur",
          paragraphs: [
            "Our largest completed commercial building is in Gudalur: 38,879 sq. ft. for Sasthapuri Hotels in the town centre. We handled the architecture, structural engineering, MEP services and construction.",
            "The site was in a busy area with little room to store materials, as many central Coimbatore sites are. Construction ran in phases so different trades could work without crowding the site.",
          ],
          linkLabel: "View the Sasthapuri Hotels project",
        },
      ],
      cta: "Discuss a similar project",
    },
    faqs: [
      {
        q: "Where is your Coimbatore office?",
        a: "Our head office is on the second floor of Sowma Complex, 2nd Street, Sathy Road, Gandhipuram, Coimbatore 641012. It is open Monday to Saturday, 9 am to 6 pm. Call +91 94860 38761 before you visit so we can make sure an engineer is free to meet you.",
      },
      {
        q: "Which parts of Coimbatore do you work in?",
        a: "We take projects across Coimbatore from our head office in Gandhipuram. A documented local example is our [3,500 sq. ft. residence in Perur](/projects/residential-building-perur-coimbatore), completed in 2020. Share your exact site location and proposed work when enquiring so the team can discuss access, requirements and the appropriate next step.",
      },
      {
        q: "Do you help with building plan approval in Coimbatore?",
        a: "Yes. We prepare the approval drawings, file the application and follow it up. Plots inside Coimbatore Corporation limits go to CCMC, most plots outside come under DTCP or the local planning authority, and some small houses in approved layouts can use Tamil Nadu's online self-certification route. The authority makes the decision. Our [plan approval article](/blog/building-plan-approval-coimbatore-nilgiris) lists the documents to prepare.",
      },
      {
        q: "Do you offer turnkey construction in Coimbatore?",
        a: "Yes. Our [turnkey design and build service](/services/turnkey-design-build-coimbatore) brings design, approval support, construction and interior requirements into an agreed appointment. Ask for written inclusions, specifications, exclusions and the process for changes. Confirm the scope of each stage before comparing the proposal with another contractor's quote.",
      },
      {
        q: "How do I get a construction quote in Coimbatore?",
        a: "Send the plot location, measurements, proposed building use, approximate floor area and any drawings or site photographs. Include your room requirements and finish preferences if available. Use this page's enquiry form, phone or WhatsApp to discuss the next step. The estimate should identify its assumptions, included work and any provisional allowances.",
      },
      {
        q: "How much does house construction cost in Coimbatore?",
        a: "The cost depends on floor area, structural requirements, site access, material choices and the agreed scope. Compare itemised quantities and specifications, including design fees, application support, interiors and external works where relevant. Our [guide to reading a construction BOQ](/blog/how-to-read-a-construction-boq) explains how to compare quotes beyond a headline square-foot rate.",
      },
      {
        q: "Is rainwater harvesting required for a new house in Coimbatore?",
        a: "Yes. Tamil Nadu's building rules require rainwater harvesting structures on building sites, and storm water should be led into the ground where the soil allows. The type and size of the system depend on the roof area, the plot and the soil. Our [plumbing drawings](/services/plumbing-drawings) include the rainwater harvesting layout.",
      },
      {
        q: "Do you build factories and industrial sheds around Coimbatore?",
        a: "Yes. We build factory buildings and pre-engineered (PEB) steel sheds, with machine foundations and floors designed for the loads they will carry. Send the plot location, the building size you need, the machinery and any crane or vehicle access requirements. See [factory and industrial shed construction](/services/industrial-factory-construction).",
      },
      {
        q: "Can I get structural drawings or a valuation without a construction contract?",
        a: "Yes. [Structural drawings](/services/structural-drawings), [structural stability certificates](/services/structural-stability-certificate), [bank valuation reports](/services/bank-valuation-report) and [detailed estimates](/services/detailed-estimation-costing) are each available on their own from our Gandhipuram office. Tell us what the document is for, such as a bank, an approval or comparing contractors' quotes, so it is prepared in the right form.",
      },
      {
        q: "My house has cracks in the walls or columns. What should I do?",
        a: "Have an engineer inspect it before you repair or extend. Some cracks are only in the plaster; others point to settlement, corroding steel or overloading, and those need a structural repair. Our [structural stability certificate](/services/structural-stability-certificate) inspection includes a crack and corrosion survey, and [renovation and retrofitting](/services/renovation) covers strengthening where it is needed.",
      },
    ],
    whatsappMessage: "Hello Prasanth Associates, I would like to discuss a building project in Coimbatore.",
    other: {
      href: "/locations/nilgiris-ooty",
      title: "Building in the Nilgiris?",
      body: "Our Gudalur branch handles projects in Ooty, Coonoor, Kotagiri and Gudalur.",
    },
  },

  gudalur: {
    slug: "gudalur",
    office: "Gudalur",
    area: "gudalur",
    breadcrumb: "Gudalur",
    badge: "Branch office · Ooty Main Road",
    heading: "Building Contractors in Gudalur",
    intro:
      "Prasanth Associates designs, engineers and builds houses, estate bungalows and commercial buildings in Gudalur and across the Nilgiris. One team coordinates the architecture, structural design and construction, and every project is priced through an itemised BoQ before work begins.",
    heroNote: "Engineering first, quality always. Structural drawings are ready before construction starts, and the site builds from them.",
    quoteLabel: "Request an Itemised Construction Quote",
    whatsappLabel: "Discuss your hill-site project",
    reviewsLink: true,
    googleRating: { rating: "4.9", reviews: 45 },
    conditionsHeading: "Planning for Gudalur's slopes, rain and approvals",
    conditions: [
      {
        title: "Land classification and building approvals",
        body: "Check how the plot is classified in the revenue records before you buy or design. Some land in the Gudalur area falls under Section 17 of the Gudalur Janmam Estates Act, where new construction is restricted. Plots in the Nilgiris hill areas can also need Hill Area Conservation Authority (HACA) clearance and no-objection certificates from departments such as forest and agricultural engineering, as well as planning permission. Under the Tamil Nadu building rules, planning permission does not replace clearances needed under other laws. We check which of these apply to your plot before the design is fixed and prepare the drawings to suit. The authorities make the approval decisions.",
      },
      {
        title: "Slope stabilisation and retaining wall engineering",
        body: "Work on a sloping plot starts with a level survey and an engineer's review of the ground. The engineer decides what soil or geotechnical investigation is needed, then designs the foundations, any retaining walls and the drainage behind them for that site. Drainage is designed with each wall so water cannot build up behind it, and excavation is planned so cut slopes stay safe during work.",
      },
      {
        title: "Heavy rainfall and waterproofing",
        body: "Gudalur gets the full south-west monsoon, roughly June to September, and is one of the wettest parts of the Nilgiris. On the site, that means ground graded away from the building, roof drainage sized for heavy rain, a raised plinth, and drains around foundations and retaining walls. Waterproofing for roofs, wet areas and walls is detailed in the drawings. Roofs, gutters and drains still need checking every year.",
      },
      {
        title: "Getting materials to estate sites",
        body: "Estate roads can be narrow and steep, and some sites have little room to unload or store materials. At the Pricol Limited tea bungalow, every load of material, every piece of equipment and every worker had to cross a river to reach the site, and deliveries and labour were planned around that. On a new estate project we look at the approach road, vehicle sizes, storage space and the estate's own work before agreeing the construction sequence.",
      },
      {
        title: "Planning for the climate",
        body: "Cool, damp weather and long monsoon spells mean a house needs good daylight, cross-ventilation and dry rooms. Orientation, window positions, roof overhangs and the walls and roof are decided together with the slope and the views. Our Gudalur family house was planned around functional layouts, natural light and ventilation.",
      },
    ],
    conditionsCta: "Discuss your hill-site project",
    places: [
      { name: "Gudalur", note: "Our branch office is here. Our work in the town includes the Pricol Limited tea bungalow, Sasthapuri Hotels in the town centre and a 2,617 sq. ft. family house." },
      { name: "O'Valley", note: "Renovation of the British-era Director's Building at Manjushree Plantation, New Hope, in a cardamom plantation setting." },
      { name: "Ooty", note: "Christus Rex Higher Secondary School at Kandal, school work at Bandi Shola and residential construction in the town." },
      { name: "Coonoor and Kotagiri", note: "We have built in both towns and take enquiries across them from the Gudalur branch." },
    ],
    projectsHeading: "Our work in and around Gudalur",
    caseStudies: {
      heading: "Four Nilgiris projects in detail",
      intro: "How we handled river access, a tight town site, a new family house and an old estate building.",
      items: [
        {
          slug: "pricol",
          heading: "Pricol Limited tea bungalow, Gudalur",
          paragraphs: [
            "A 12,120 sq. ft. bungalow for Pricol Limited inside a working tea plantation. The only way to the site was across a river, so every load of material, every piece of equipment and every worker came in that way.",
            "One team coordinated the architecture, structural engineering, MEP services and construction. The work was sequenced around deliveries across the river, and the bungalow was completed in 2017.",
          ],
          linkLabel: "Explore the Pricol bungalow project",
        },
        {
          slug: "sasthapuri",
          heading: "Sasthapuri Hotels, Gudalur town centre",
          paragraphs: [
            "A 38,879 sq. ft. commercial building in the main town area of Gudalur, in a busy area with little room to work or store materials. Construction ran in phases so different trades could work without crowding the site.",
            "The architectural, structural and MEP drawings were coordinated to avoid clashes on site, and regular supervision kept the work to the design. Disruption to the neighbourhood was kept low throughout.",
          ],
          linkLabel: "View the Sasthapuri Hotels project",
        },
        {
          slug: "residential-building-gudalur",
          heading: "Family house in Gudalur",
          paragraphs: [
            "A 2,617 sq. ft. independent house, our most recent completed house in Gudalur. The planning focused on room layouts and circulation, natural light, ventilation, and coordinating the structural, electrical and plumbing work with the architecture.",
            "If you are planning an independent house in Gudalur, it is a useful one to look at. Your own house will be designed for your plot, family and budget.",
          ],
          linkLabel: "See the Gudalur family house",
        },
        {
          slug: "manjushree",
          heading: "Manjushree Director's Building, O'Valley",
          paragraphs: [
            "Renovation of the 4,904 sq. ft. Director's Building at Manjushree Plantation, New Hope, O'Valley, an older British-era building among cardamom plants below the mountain slopes.",
            "We assessed the building's existing condition first, then planned the renovation around the building, its setting, access for materials, weather exposure and moisture. The aim was to improve the building while keeping its original character.",
          ],
          linkLabel: "Read about the Manjushree renovation",
        },
      ],
      cta: "Discuss a similar project",
    },
    services: [
      "residential-construction",
      "villa-construction",
      "commercial-construction",
      "architectural-designs",
      "renovation",
      "structural-drawings",
    ],
    servicesHeading: "Construction and design services in Gudalur",
    servicesIntro: "Every service in our four sectors is available from the Gudalur branch, as a complete project or on its own.",
    serviceSectors: [
      {
        heading: "Civil construction",
        body: "Independent houses, villas, estate bungalows and commercial buildings, built as a complete turnkey project or to drawings you already have. Older buildings can be renovated and structurally retrofitted, and we can act as your construction consultant on a project built by others.",
        links: [
          { slug: "residential-construction", label: "House construction" },
          { slug: "villa-construction", label: "Villa and bungalow construction" },
          { slug: "commercial-construction", label: "Commercial building construction" },
          { slug: "turnkey-construction", label: "Turnkey design and build" },
          { slug: "renovation", label: "Renovation and structural retrofitting" },
        ],
      },
      {
        heading: "Design and architecture",
        body: "Architectural plans, elevations and approval drawings, with structural, electrical and plumbing drawings coordinated for the same building. Design-only work is available if you already have a builder.",
        links: [
          { slug: "architectural-designs", label: "Architectural design and planning" },
          { slug: "structural-drawings", label: "Structural drawings and design" },
          { slug: "electrical-drawings", label: "Electrical drawings" },
          { slug: "plumbing-drawings", label: "Plumbing drawings" },
        ],
      },
      {
        heading: "Estimates and valuation",
        body: "Itemised estimates and BoQs that measure quantities and set out specifications before you commit, bank valuation reports for home loans, and structural stability certificates for existing buildings.",
        links: [
          { slug: "detailed-estimation-costing", label: "Detailed estimate and BoQ" },
          { slug: "bank-valuation-report", label: "Bank valuation reports" },
          { slug: "structural-stability-certificate", label: "Structural stability certificates" },
        ],
      },
      {
        heading: "Property and land",
        body: "Before buying land in the Nilgiris, check its title, classification and road access. Our property services cover these checks and the purchase.",
        links: [
          { slug: "property-acquisition-advisory", label: "Property acquisition advisory" },
          { slug: "land-plot-transactions", label: "Land and plot transactions" },
        ],
      },
    ],
    process: {
      heading: "From site assessment to final handover",
      intro: "A full turnkey project runs through every stage below. Design-only, estimate-only and consultancy work covers only the stages you engage us for.",
      steps: [
        { title: "Initial consultation", body: "We talk through your site, what you want to build, how it will be used and your budget. We usually reply to enquiries within 24 hours." },
        { title: "Site and feasibility assessment", body: "A site visit looks at access, levels, drainage and ground conditions, and we check the land classification and the approvals that may apply before any design is fixed." },
        { title: "Architectural and structural planning", body: "Plans, elevations and structural drawings are developed together, so the structure fits the layout you approve. Structural drawings are ready before construction starts." },
        { title: "Detailed estimate and BoQ", body: "The bill of quantities lists each item of work with its quantity, specification and rate, along with the assumptions, exclusions and any provisional allowances." },
        { title: "Contract and construction planning", body: "The agreed scope, payment stages, the process for pricing changes and the construction sequence are written down before work starts." },
        { title: "Construction and quality checks", body: "Work proceeds stage by stage against the drawings, with materials checked on delivery, regular site supervision and progress updates as each stage is completed." },
        { title: "Final inspection and handover", body: "Completed work is inspected against the agreed scope, outstanding items are closed out, and the building is handed over with the documents agreed in the contract." },
      ],
    },
    pricing: {
      heading: "How our itemised BoQ pricing works",
      paragraphs: [
        "A bill of quantities (BoQ) is an itemised list of every part of the work, with the quantity, specification and rate for each. You can see what the price covers before you sign and compare quotes item by item instead of by a single square-foot rate.",
        "On a hill site, the costs that vary most are ones a flat plot rarely has, such as excavation in rock or soft ground, deeper foundations, retaining walls and drainage. In a BoQ, each of these is a separate line with its own quantity and rate.",
      ],
      itemsHeading: "What a BoQ lists",
      items: [
        "Earthwork and excavation",
        "Foundations",
        "Reinforced concrete",
        "Masonry",
        "Roofing and roof drainage",
        "Waterproofing",
        "Electrical works",
        "Plumbing and sanitary works",
        "Doors and windows",
        "Flooring and finishes",
        "External works and site drainage",
        "Retaining structures, where needed",
      ],
      afterItems: [
        "Once the BoQ is signed, the price is fixed for that agreed scope and specification. It can change if you change the design or specification, if excavation finds ground conditions different from those assumed, if site access differs from what was planned, or if the rules change. The contract sets out how such changes are priced and approved. Our [guide to reading a construction BoQ](/blog/how-to-read-a-construction-boq) explains what to check before you sign.",
      ],
      cta: "Request a Detailed Construction Estimate",
    },
    faqs: [
      {
        q: "Who are the best building contractors in Gudalur for luxury villas?",
        a: "The best fit is a contractor who can show completed villas or bungalows of a similar size, tells you who prepares the architectural and structural drawings, and quotes with an itemised BoQ. Read their recent Google reviews too. Our Gudalur work includes the 12,120 sq. ft. [Pricol Limited tea bungalow](/projects/pricol), and our Gudalur branch is rated 4.9 on Google. See our [villa and bungalow construction](/services/villa-construction) service.",
      },
      {
        q: "How much does turnkey house construction cost per square foot in the Nilgiris?",
        a: "There is no single per-square-foot rate in the Nilgiris, because hill sites vary far more than flat plots. Cost depends on the specification and finishes, the structural design, the foundations the ground needs, any retaining walls, how easily materials reach the site, and whether design fees, approval work and taxes are included. A square-foot figure without those details is hard to compare. Share your plot details and requirements for a site-specific, itemised BoQ. Our [BoQ guide](/blog/how-to-read-a-construction-boq) shows what to check.",
      },
      {
        q: "What building approvals (like HACA) are needed to build a home in Gudalur?",
        a: "It depends on the plot, so start by checking the land's classification. A home needs planning permission from the local body or planning authority. Hill-area plots can also need Hill Area Conservation Authority (HACA) clearance and no-objection certificates from departments such as forest and agricultural engineering, and land under Section 17 of the Gudalur Janmam Estates Act carries further restrictions. We check what applies and can prepare and file the [approval drawings](/services/architectural-designs). The decision rests with the authorities.",
      },
      {
        q: "Can you construct an independent house on a highly sloping plantation plot?",
        a: "Often yes, after the site has been assessed, though not every steep plot is buildable. Feasibility depends on the slope, the soil and rock, groundwater, access for materials, and whether the land's classification and the hill-area rules allow a house there. A level survey and the soil investigation the engineer specifies come first. Foundations, retaining walls and drainage are then designed for that site. Sometimes the answer is a different position or a smaller footprint. Our [hill-plot guide](/blog/building-on-sloping-plot-ooty-gudalur) lists the questions to ask.",
      },
      {
        q: "What is included in a turnkey house construction contract in Gudalur?",
        a: "A turnkey contract covers the project from design to handover under one agreement: architectural and structural drawings, approval support where agreed, construction, building services and finishing, priced through an itemised BoQ. Exactly what is in and out, such as interiors, landscaping, compound walls, retaining walls or approval fees, is listed in the contract. Check the exclusions before you sign. See [turnkey design and build](/services/turnkey-design-build-coimbatore).",
      },
      {
        q: "Do you provide architectural and structural design under one team?",
        a: "Yes. Architectural plans and structural drawings are prepared and coordinated by the same team, with electrical and plumbing drawings coordinated for the same building, as on our [Pricol](/projects/pricol) and [Sasthapuri](/projects/sasthapuri) projects. You can engage us for design only, or for design and construction.",
      },
      {
        q: "How long does it take to build a house in the Nilgiris?",
        a: "It depends on the size and design of the house, the approvals needed, site access and the monsoon, so ask for a programme written for your project. Weather-dependent work such as excavation, foundations and roof concreting is best scheduled around the heaviest rain. Our Gudalur family house was built during 2024–2025. Your programme will depend on your own project.",
      },
      {
        q: "Can construction continue during heavy monsoon rainfall?",
        a: "Some of it can. Excavation, foundations, retaining walls and roof concreting are best done outside the heaviest rain. Internal work under a finished roof, such as plastering, electrical and plumbing, can usually continue. Plan the weather-sensitive stages around the south-west monsoon, with temporary cover and drainage on site.",
      },
      {
        q: "What is the cost of building a retaining wall in Gudalur?",
        a: "It depends on the wall's height and length, the soil and groundwater behind it, the wall type the engineer selects, the drainage it needs and access to the site, so it can only be priced once the wall is designed. A retaining wall holds back soil where ground levels change. On a slope it is often one of the largest items in the estimate. We can design it and show it as a separate line in your [detailed estimate](/services/detailed-estimation-costing).",
      },
      {
        q: "Do you construct tea estate bungalows and holiday homes?",
        a: "Yes. Our completed work includes the 12,120 sq. ft. [Pricol Limited tea bungalow](/projects/pricol) inside a tea plantation in Gudalur, reached across a river, and the renovation of the [Manjushree Director's Building](/projects/manjushree) at O'Valley. Holiday homes and villas are covered by our [villa and bungalow construction](/services/villa-construction) service.",
      },
      {
        q: "Can you renovate an old British-era bungalow in Ooty or Gudalur?",
        a: "Yes. Renovation starts with an assessment of the building's condition, structure and moisture problems, and of the changes you need, before any design is fixed. Our renovation of the British-era [Manjushree Director's Building](/projects/manjushree) at O'Valley, a 4,904 sq. ft. building in a plantation setting, followed that approach. See [renovation and retrofitting](/services/renovation) and our guide to [renovating an old Nilgiris bungalow](/blog/renovate-old-bungalow-nilgiris).",
      },
      {
        q: "How do you ensure transparent construction pricing?",
        a: "We price every project with an itemised BoQ, signed before construction starts. It lists each item of work with its quantity, specification and rate, and states what is excluded. The price is then fixed for that agreed scope, and the contract sets out how any changes are priced and approved.",
      },
      {
        q: "Do you provide structural engineering services without a full construction contract?",
        a: "Yes. You can engage us for [structural drawings](/services/structural-drawings) for a new building, or a [structural stability certificate](/services/structural-stability-certificate) for an existing one, without a construction contract. On hill sites, the structural design can include the foundations and retaining walls the site needs.",
      },
      {
        q: "What should I check before purchasing land for construction in the Nilgiris?",
        a: "Check the land's classification and title first: the patta, the encumbrance certificate, and whether it falls under Section 17 or any forest or hill-area restriction that limits building. Then check road access for construction vehicles, the slope and drainage of the plot, water and power, and how much of the plot the hill-area rules let you build on. Our [property acquisition advisory](/services/property-acquisition-advisory) helps you check title and approvals before you buy.",
      },
      {
        q: "How are material transportation and difficult site access handled?",
        a: "We plan around access before construction starts, looking at the approach road, the size of vehicle it can take, where materials can be unloaded and stored, and how they move on site. Deliveries and labour are then scheduled to the construction sequence. At the [Pricol tea bungalow](/projects/pricol) every load crossed a river to reach the site. At [Sasthapuri Hotels](/projects/sasthapuri) storage space in the town centre was limited.",
      },
      {
        q: "Can I get a detailed BoQ before starting construction?",
        a: "Yes. You receive a written, itemised BoQ before any work starts, and construction begins once it is agreed and signed. You can also order a [detailed estimate and BoQ](/services/detailed-estimation-costing) on its own to compare contractors' quotes.",
      },
      {
        q: "Do you undertake commercial construction projects in Gudalur?",
        a: "Yes. Our largest Gudalur project is [Sasthapuri Hotels](/projects/sasthapuri), a 38,879 sq. ft. commercial building in the town centre, completed in 2016 with architecture, structural engineering, MEP services and construction. We take on shops, offices, hotels and other [commercial buildings](/services/commercial-construction).",
      },
      {
        q: "How do you protect hill-station buildings from dampness and water ingress?",
        a: "We keep water away from the building with site grading and drains, roof drainage sized for monsoon rain, a raised plinth, a damp-proof course at the base of walls, waterproofing of roofs and wet areas, and drainage behind retaining walls. These details are in the drawings. Gutters, drains and roof joints should be checked after each monsoon.",
      },
      {
        q: "Do you also work in Ooty, Coonoor and Kotagiri?",
        a: "Yes. Our Gudalur branch serves enquiries across the Nilgiris, including Ooty, Coonoor and Kotagiri. Our documented Ooty work includes [Christus Rex Higher Secondary School](/projects/rex-school) at Kandal. See our [Nilgiris service-area page](/locations/nilgiris-ooty) for the wider area, and share your exact site location when discussing a project.",
      },
    ],
    formService: "residential-construction",
    whatsappMessage: "Hello Prasanth Associates, I would like to discuss a building project in Gudalur.",
    other: {
      href: "/locations/nilgiris-ooty",
      title: "Building higher up, in Ooty, Coonoor or Kotagiri?",
      body: "See our wider Nilgiris service area and completed Ooty projects, with questions to consider when planning a hill-site build.",
    },
  },

  "nilgiris-ooty": {
    slug: "nilgiris-ooty",
    office: "Gudalur",
    area: "nilgiris",
    breadcrumb: "Ooty & the Nilgiris",
    badge: "Nilgiris branch · Gudalur",
    heading: "Builders in Ooty and the Nilgiris",
    intro:
      "We build houses, villas, schools and commercial buildings across the Nilgiris from our branch office in Gudalur. We have worked in Ooty, Coonoor, Kotagiri and Gudalur, on sloping plots, plantation land and older buildings that needed careful renovation.",
    googleRating: { rating: "4.9", reviews: 42 },
    conditionsHeading: "What building in the hills involves",
    conditions: [
      {
        title: "Slopes and drainage",
        body: "We survey the levels and test the soil first, then design foundations and retaining walls for the slope, with drainage that takes monsoon water away from the building.",
      },
      {
        title: "Cold weather",
        body: "Concrete gains strength more slowly in the cold, so in Ooty and Kotagiri we allow longer curing before the next stage is loaded.",
      },
      {
        title: "Damp and mist",
        body: "Mist and long monsoons keep walls damp. We plan damp-proofing, roof drainage and ventilation, and choose finishes that cope with it.",
      },
      {
        title: "Hill area rules",
        body: "The Nilgiris has its own building rules for hill areas. We check the land classification and what applies to your plot before the design is fixed.",
      },
    ],
    places: [
      { name: "Ooty", note: "Christus Rex Higher Secondary School at Kandal, The Oxford Continental School and a family house." },
      { name: "Gudalur", note: "Our branch office. Projects include the Pricol tea bungalow, Sasthapuri Hotels and the Manjushree renovation at O'Valley.", href: "/locations/gudalur" },
      { name: "Coonoor", note: "We have built in Coonoor and take house and villa projects in and around the town." },
      { name: "Kotagiri", note: "We have built in Kotagiri and take house and villa projects in and around the town." },
    ],
    services: [
      "villa-construction",
      "residential-construction",
      "renovation",
      "commercial-construction",
      "architectural-designs",
      "structural-stability-certificate",
    ],
    projectsHeading: "Our work in the Nilgiris",
    faqs: [
      {
        q: "Do you build in Ooty?",
        a: "Yes. Our Ooty work includes [Christus Rex Higher Secondary School](/projects/rex-school), a 12,000 sq. ft. school building at Kandal completed in 2019, and a family house. Ooty projects are handled from our Gudalur branch office.",
      },
      {
        q: "Where is your Nilgiris office?",
        a: "Our Nilgiris branch is on Ooty Main Road in Gudalur, at No. 6, Thiruvalluvar Commercial Complex, near the SBI ATM. Our engineers go from there to sites in Ooty, Coonoor, Kotagiri and around Gudalur.",
      },
      {
        q: "What should I check before building on a hill plot?",
        a: "Check the land classification and approvals first, then the access road, the slope and where water runs during the monsoon. A soil test and level survey show what foundations the plot needs. Our [hill plot article](/blog/building-on-sloping-plot-ooty-gudalur) goes through these checks.",
      },
      {
        q: "Do you renovate older buildings in the Nilgiris?",
        a: "Yes. We renovated the British-era Director's Building at [Manjushree Plantation](/projects/manjushree) in O'Valley. Every renovation starts with an engineer checking the existing structure before any wall is removed or added.",
      },
      {
        q: "Do you build villas and estate bungalows in the Nilgiris?",
        a: "Yes. One example is the 12,120 sq. ft. [Pricol Limited tea bungalow](/projects/pricol) in Gudalur, on a plantation site reached across a river. See [villa construction](/services/villa-construction) for what the service includes.",
      },
    ],
    whatsappMessage: "Hello Prasanth Associates, I would like to discuss a building project in the Nilgiris.",
    other: {
      href: "/locations/coimbatore",
      title: "Building in Coimbatore?",
      body: "Our head office in Gandhipuram handles projects across Coimbatore.",
    },
  },
};
