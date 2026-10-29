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
}

export const locationPages: Record<LocationPage["slug"], LocationPage> = {
  coimbatore: {
    slug: "coimbatore",
    office: "Coimbatore",
    area: "coimbatore",
    breadcrumb: "Coimbatore",
    badge: "Head office · Gandhipuram",
    heading: "Construction Company in Coimbatore",
    intro:
      "Prasanth Associates is a construction company in Coimbatore offering house construction, villa construction, commercial building work and architectural design. From our head office in Gandhipuram on Sathy Road, we help clients develop their building requirements, coordinate drawings and plan construction. Whether you need a house plan or a team to take your project through construction, start with a discussion of your plot, budget and proposed scope.",
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
    googleRating: { rating: "4.9", reviews: 23 },
    conditionsHeading: "Planning your construction project in Coimbatore",
    conditions: [
      {
        title: "Plot information and approval responsibilities",
        body: "Bring available property documents, plot measurements and road details. Establish the authority and application requirements for your site, and agree who prepares and submits the drawings. Record approval support separately from the construction scope.",
      },
      {
        title: "Ground conditions and structural planning",
        body: "Ask the engineer what ground information and investigations your proposed building needs. Foundation and structural decisions depend on the actual site and building loads. A house built elsewhere in Coimbatore cannot establish the right design for your plot.",
      },
      {
        title: "Water, services and site access",
        body: "Discuss drainage, water storage, rainwater arrangements and utility connections alongside the house plan. The approach road and space for deliveries also need consideration. Resolve these requirements early so the drawings and estimate address the same work.",
      },
    ],
    services: [
      "residential-construction",
      "turnkey-construction",
      "commercial-construction",
      "architectural-designs",
      "interior-designs",
      "bank-valuation-report",
    ],
    servicesHeading: "Construction and design services in Coimbatore",
    servicesIntro: "Discuss a complete build or a separate design, interior or valuation appointment with our Gandhipuram office. The service pages explain the available scope and information to prepare for an enquiry.",
    projectsHeading: "Our work in Coimbatore",
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
        a: "Yes. We can prepare approval drawings and assist with the application and follow-up. The authority, document requirements and application route depend on the plot and proposed building, so they need checking for your site. Approval is the authority's decision. Our [plan approval article](/blog/building-plan-approval-coimbatore-nilgiris) explains what to discuss before submission.",
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
      "Prasanth Associates provides house construction, estate bungalow construction and commercial building services in Gudalur, The Nilgiris. Our branch on Ooty Main Road supports clients with architectural planning, coordinated drawings and construction requirements. Completed local work includes a family residence, the Pricol Limited tea bungalow and Sasthapuri Hotels. Tell us about your site and proposed building so we can discuss the scope, access and planning needs.",
    overview: [
      {
        heading: "Individual house construction in Gudalur",
        paragraphs: [
          "A house plan needs to respond to your family and the land it will stand on. Bring your plot information, room requirements and available drawings so the discussion can cover access, levels, daylight, ventilation and building services alongside the layout. Our [house construction service](/services/residential-construction) can be discussed as a complete build or alongside drawings you already have.",
          "Our [Gudalur residential project](/projects/residential-construction-project) is a 2,617 sq. ft. family house built during 2024–2025. The project record describes functional layouts, natural light and ventilation, and coordination of structural, electrical and plumbing work. These are useful points to review when planning your own home, while its design and programme must reflect your particular site.",
        ],
      },
      {
        heading: "Estate bungalows and construction on difficult-access sites",
        paragraphs: [
          "A plantation bungalow can involve access and delivery questions that affect the construction sequence. Our [Pricol Limited tea bungalow](/projects/pricol) in Gudalur is a completed 12,120 sq. ft. building on a tea-estate site reached across a river. Architecture, structural engineering, construction, MEP services and site coordination formed part of the recorded project scope.",
          "For a new [villa or bungalow project](/services/villa-construction), discuss the approach route, working space and movement of materials before agreeing the programme. Levels, water movement and ground conditions also need professional review. Our [hill-plot planning guide](/blog/building-on-sloping-plot-ooty-gudalur) sets out questions to raise before choosing a layout or foundation approach.",
        ],
      },
      {
        heading: "Commercial building work and renovation around Gudalur",
        paragraphs: [
          "Town-centre construction brings a different set of constraints. [Sasthapuri Hotels](/projects/sasthapuri), a 38,879 sq. ft. commercial building completed in Gudalur in 2016, required phased construction, organised storage and coordination within limited working space. If you are planning shops, offices or a hospitality building, explain the intended use, customer access, service requirements and fit-out scope alongside the proposed floor area.",
          "For an existing estate building, start with its condition and the changes you need. Our [Manjushree Director's Building renovation](/projects/manjushree) at New Hope, O'Valley, involved a 4,904 sq. ft. British-era building in a plantation setting. An engineer's assessment should inform proposed alterations. Discuss [renovation services](/services/renovation) with the available drawings, photographs and records of earlier work.",
        ],
      },
    ],
    googleRating: { rating: "4.9", reviews: 42 },
    conditionsHeading: "What to plan before construction in Gudalur",
    conditions: [
      {
        title: "Weather and the construction programme",
        body: "Ask which construction activities depend on suitable weather and how they will be sequenced. Discuss temporary protection, water management and finish requirements with the site team. The programme should record the conditions it assumes rather than rely on the dates of another completed project.",
      },
      {
        title: "Levels, ground conditions and drainage",
        body: "Where a plot slopes, have its levels and water movement assessed before settling the layout. The engineer should specify the investigations and structural design needed for the proposed building. Foundation or retaining arrangements from another site may not suit your land.",
      },
      {
        title: "Plot documents and application requirements",
        body: "Provide available land records and the intended building use. Ask the design team to establish the permissions, restrictions and application requirements that apply to your particular plot. Agree the scope of approval support before an application is prepared.",
      },
      {
        title: "Access, storage and material movement",
        body: "Review the approach route, delivery access and usable working space. The river crossing at Pricol and limited town-site space at Sasthapuri required different arrangements. A new project needs its own plan for moving and storing materials, coordinated with the construction stages.",
      },
    ],
    services: [
      "residential-construction",
      "villa-construction",
      "commercial-construction",
      "architectural-designs",
      "renovation",
      "structural-drawings",
    ],
    servicesHeading: "Construction and design services in Gudalur",
    servicesIntro: "Our Gudalur branch handles enquiries for houses, estate bungalows, commercial buildings and renovation, alongside architectural and structural design. Share your site details to discuss the services needed for your project.",
    projectsHeading: "Our work in and around Gudalur",
    faqs: [
      {
        q: "Where is your Gudalur office?",
        a: "Our branch is at No. 6, Thiruvalluvar Commercial Complex, near the SBI ATM on Ooty Main Road, Gudalur 643212. It is open Monday to Saturday, 9 am to 6 pm, and serves Gudalur and the rest of the Nilgiris.",
      },
      {
        q: "How much does it cost to build a house in Gudalur?",
        a: "Cost depends on the proposed floor area, ground conditions, access, structure, finishes and external works. Request an itemised estimate that identifies quantities, specifications, exclusions and provisional items. Agree how changes will be priced. Share your plot information and drawings so the team can discuss what is needed for a project-specific estimate.",
      },
      {
        q: "How long does a house take to build in Gudalur?",
        a: "The programme depends on the design, building size, permissions, access and weather-dependent activities. Ask for a project-specific sequence with the assumptions and client decisions recorded. Our completed Gudalur residence was built during 2024–2025, but those dates describe that project and do not establish a standard duration for another house.",
      },
      {
        q: "Can you build on a sloping plot in Gudalur?",
        a: "Feasibility depends on the actual plot, proposed building and permissions. Start with a professional review of levels, water movement, ground conditions and access. The engineer should identify the investigations and design needed before a foundation approach is chosen. Our [hill-plot planning guide](/blog/building-on-sloping-plot-ooty-gudalur) explains the questions to discuss.",
      },
      {
        q: "What have you built in Gudalur?",
        a: "Our Gudalur work includes the [Pricol Limited tea bungalow](/projects/pricol), [Sasthapuri Hotels](/projects/sasthapuri) in the town centre and a [2,617 sq. ft. family house](/projects/residential-construction-project) completed in 2025.",
      },
      {
        q: "Do you also work in Ooty, Coonoor and Kotagiri?",
        a: "Yes. Our Gudalur branch serves enquiries across the Nilgiris, including Ooty, Coonoor and Kotagiri. Our documented Ooty work includes [Christus Rex Higher Secondary School](/projects/rex-school) at Kandal. See our [Nilgiris service-area page](/locations/nilgiris-ooty) for the wider area, and share your exact site location when discussing a project.",
      },
      {
        q: "Can you prepare house plans and approval drawings for a Gudalur plot?",
        a: "Yes. We offer architectural plans, elevations and approval drawings, with structural, electrical and plumbing coordination available for the proposed building. Bring plot documents, measurements, site photographs and your room requirements. The applicable authority and submission requirements need to be checked for the site; preparing drawings does not by itself establish approval.",
      },
    ],
    formService: "residential-construction",
    whatsappMessage: "Hello Prasanth Associates, I would like to discuss building a house in Gudalur.",
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
