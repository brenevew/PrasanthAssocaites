import { serviceHref } from "./serviceLinks";

interface HomeFaqQuestion {
  question: string;
  answer: string;
  links: { href: string; label: string }[];
}

/**
 * Homepage overview. Detailed technical questions live on the service pages.
 * Process and project examples come from process.ts, quality.ts and projects.ts.
 * Price figures are awaiting business revision; do not publish numeric rates here.
 */
export const homeFaqQuestions: HomeFaqQuestion[] = [
  {
    question: "What services do you offer?",
    answer: "We prepare building plans and approval drawings, design houses and commercial buildings including 3D elevations, build houses, villas, commercial buildings and factory sheds, and design and install interiors. You can also come to us for renovation, home automation, engineering drawings, building estimates, valuation reports and property support. You can request a single service or discuss a complete project with the team.",
    links: [{ href: "/services", label: "Find the service you need" }],
  },
  {
    question: "Where are your offices, and which areas do you cover?",
    answer: "Our head office is in Gandhipuram, Coimbatore, also known as Kovai, and takes projects across Coimbatore. Our Gudalur branch is on Ooty Main Road in the Nilgiris and covers Ooty, Coonoor, Kotagiri and Gudalur. Send the property address or map location and the work you need so the team can confirm coverage and discuss a site visit.",
    links: [
      { href: "/locations/coimbatore", label: "Building in Coimbatore" },
      { href: "/locations/nilgiris-ooty", label: "Building in Ooty and the Nilgiris" },
      { href: "/contact", label: "Office addresses and contact details" },
    ],
  },
  {
    question: "How should I choose a builder?",
    answer: "The best builder for you is the one that gives an itemized BOQ, has an engineer supervising the site, handles the plan approval properly, tests the soil and links payments to completed work. Our guides list the checks to compare any builder, including us.",
    links: [
      { href: "/guides/how-to-choose-a-construction-company-coimbatore", label: "How to choose a construction company in Coimbatore" },
      { href: "/guides/how-to-choose-a-builder-nilgiris", label: "How to choose a builder in the Nilgiris" },
    ],
  },
  {
    question: "How is the cost of building my house calculated?",
    answer: "We prepare an itemized estimate that lists the agreed work, materials, labour and equipment. Your floor area, site conditions and finish choices affect the cost. When comparing quotes, check whether drawings, electrical and plumbing work, finishes and outdoor work are included. A bill of quantities, or BOQ, breaks the work into quantities and prices.",
    links: [{ href: `${serviceHref("detailed-estimation-costing")}#faq`, label: "Questions about estimates and BOQ" }],
  },
  {
    question: "Can I ask for a quote before I have a house plan?",
    answer: "Yes. Send your plot location and dimensions, the rooms and floors you want, and your approximate budget. Add sketches, drawings or photographs if you have them. Our first discussion covers your needs, budget and timing; the site review and design then help define the work for a detailed estimate.",
    links: [
      { href: "/request-quote", label: "Send your project requirements" },
      { href: "/plan-home", label: "Organize your rooms with the building planner" },
    ],
  },
  {
    question: "Can you prepare the house plan if I already have a builder?",
    answer: "Yes. Architectural design is a separate service. Share your plot measurements, road-facing direction, room list and any Vastu preferences. We can discuss floor plans, elevations and the detailed drawings your builder needs. Agree which structural, electrical and plumbing drawings are included, along with the design revisions.",
    links: [{ href: `${serviceHref("architectural-designs")}#faq`, label: "Questions about house plans and design" }],
  },
  {
    question: "What does turnkey construction include?",
    answer: "Turnkey means one team handles the agreed design and building work through handover. Our process brings together site evaluation, drawings, estimates, construction and final checks. Your contract should list the included work, material choices and payment stages. Ask for any requested change to be described and priced before that work starts.",
    links: [{ href: `${serviceHref("turnkey-construction")}#faq`, label: "Questions about turnkey construction" }],
  },
  {
    question: "How is the construction timeline planned?",
    answer: "We work from a schedule with clear stages: site review, design, cost planning, approvals, construction, inspection and handover. Tell us your preferred completion date during the first discussion. The building size, approval process, site access and your material selections affect the schedule agreed for your project.",
    links: [{ href: "/about#how-it-works", label: "See our process from consultation to handover" }],
  },
  {
    question: "How will I know the work is progressing properly?",
    answer: "Our construction process includes a dedicated project manager, checks at each stage and regular progress reports. Before handover, the team checks the structure, finishes, electrical and plumbing work against the agreed drawings. If another contractor is building for you, you can separately request our site inspection and bill-review services.",
    links: [{ href: `${serviceHref("construction-work-consulting")}#faq`, label: "Questions about site inspections and contractor bills" }],
  },
  {
    question: "Can you renovate my old house or update only the interiors?",
    answer: "Yes. You can discuss repairs, a new room layout, kitchen or wardrobe interiors, or a larger renovation. Send photographs and explain what you want to change and whether you will stay in the house during the work. Changes such as removing walls or adding a floor need an engineering assessment first.",
    links: [
      { href: `${serviceHref("renovation")}#faq`, label: "Renovation questions" },
      { href: `${serviceHref("interior-designs")}#faq`, label: "Interior design questions" },
    ],
  },
  {
    question: "Can I get a bank valuation report or building stability certificate?",
    answer: "Yes. These are separate services with different purposes. Share the property details and the bank’s or other recipient’s checklist. We can then discuss the documents, inspection and report needed. Confirm the required professional credentials and format with the recipient; the report’s findings depend on the assessment.",
    links: [
      { href: `${serviceHref("bank-valuation-report")}#faq`, label: "Bank valuation questions" },
      { href: `${serviceHref("structural-stability-certificate")}#faq`, label: "Building stability questions" },
    ],
  },
  {
    question: "Can you help me buy, sell or manage a property?",
    answer: "We offer property buying advice, land and plot transaction support, investment consulting and property management. Tell us whether you need help reviewing a property, finding a plot, arranging tenants or managing maintenance. The team can discuss the work, fees, reporting and decisions you want to keep with you.",
    links: [{ href: "/property-investment", label: "Explore property services" }],
  },
  {
    question: "Where can I see examples of your completed work?",
    answer: "Our portfolio includes the Pricol Limited tea bungalow and Sasthapuri Hotels in Gudalur, Christus Rex Higher Secondary School in Ooty, Oxford School, and houses in Perur (Coimbatore), Gudalur and Ooty. The project galleries show photographs of our work, including some taken during construction. When you enquire, mention the type of building or finish that interests you so the team can discuss examples relevant to your plans.",
    links: [
      { href: "/projects/pricol", label: "View the Pricol tea bungalow" },
      { href: "/projects/residential-building-perur-coimbatore", label: "View the house in Perur, Coimbatore" },
      { href: "/projects/residential-building-ooty", label: "View the house in Ooty" },
      { href: "/projects", label: "Browse all projects" },
    ],
  },
];
