/**
 * Buyer guides: long-form answers to "which builder should I choose" searches
 * ("best construction company in Coimbatore", "top builders", "which builder is
 * best"). They answer the question honestly, as a checklist, instead of
 * ranking competitors or calling ourselves the best.
 *
 * Every statement about Prasanth Associates must match the rest of the site.
 * No numeric prices here: rates are awaiting business revision (see homeFaqs.ts).
 */

export interface Guide {
  slug: string;
  region: "coimbatore" | "nilgiris";
  title: string;
  metadataTitle: string;
  description: string;
  datePublished: string;
  intro: string;
  sections: { title: string; paragraphs: string[]; checks?: string[] }[];
  ourAnswer: { title: string; points: string[] };
  questions: { question: string; answer: string }[];
  keywords: string[];
  related: { href: string; label: string }[];
}

export const guides: Guide[] = [
  {
    slug: "how-to-choose-a-construction-company-coimbatore",
    region: "coimbatore",
    title: "How to Choose a Construction Company in Coimbatore",
    metadataTitle: "How to Choose a Builder in Coimbatore",
    description:
      "Which builder is best in Coimbatore? Seven checks before you sign: what the sq ft rate includes, supervision, approvals, soil test, payments and contract.",
    datePublished: "2026-10-12",
    intro:
      "Search for the best construction company in Coimbatore and you will find long lists, but no list can tell you which builder suits your plot, budget and family. The right one is the builder who passes the checks below for your project. Use them to compare any companies on your shortlist, including us.",
    sections: [
      {
        title: "1. Find out what the square-foot rate includes",
        paragraphs: [
          "Two quotes at a similar rate per sq ft can cover very different work. One may include the plan approval, electrical and plumbing, sump, septic tank and compound wall; another may leave them out and add them later.",
          "Ask every builder for an itemized estimate, a bill of quantities (BOQ), that lists each item of work with its quantity, material grade and price. Compare the BOQs line by line, not the headline rate.",
        ],
        checks: [
          "Are design fees, approval fees and EB and water connections included?",
          "Are the brands or grades of steel, cement, tiles and fittings written down?",
          "What is excluded, and how will extras be priced?",
        ],
      },
      {
        title: "2. Ask who will supervise your site",
        paragraphs: [
          "Most construction problems start on site, not on paper: wrong steel spacing, thin cover, poor curing. Ask whether a qualified civil engineer will check the work at each stage, or only visit occasionally.",
          "A good builder can tell you which stages are inspected before the next one starts (footing, columns, slab casting, brickwork) and whether concrete cube tests are done.",
        ],
        checks: [
          "Is there a named site engineer for your project?",
          "Which stages are inspected, and will you get a record of the checks?",
        ],
      },
      {
        title: "3. Check how the plan approval will be handled",
        paragraphs: [
          "Depending on where your plot is, the approval may come from the Coimbatore City Municipal Corporation (CCMC), a Local Planning Authority or DTCP. Building before approval, or changing the structure after it, causes problems later with loans, EB connections and resale.",
          "Ask who prepares the sanction drawings, who files them, and whether the builder follows up until the approval is issued.",
        ],
      },
      {
        title: "4. Ask about the soil test and foundation",
        paragraphs: [
          "Soil in Coimbatore varies from one area to the next, from red gravelly soil to harder rock and black cotton soil. A builder who designs every foundation the same way, without a soil test, is guessing.",
          "Ask whether a soil bearing capacity (SBC) test will be done and whether the footing design will be based on it.",
        ],
      },
      {
        title: "5. Look at the payment schedule",
        paragraphs: [
          "Payments should follow completed work: plinth, each slab, brickwork, plastering, finishing. Be careful with large advances before work starts, or stages that are not clearly defined.",
        ],
        checks: [
          "Is each payment linked to a stage you can see on site?",
          "Is a portion held back until handover and snag fixing?",
        ],
      },
      {
        title: "6. See finished work and read recent reviews",
        paragraphs: [
          "Visit a completed house and, if possible, a site under construction. Look at the finishing, the plastering lines and the waterproofing on the terrace and bathrooms.",
          "Read the builder's recent Google reviews rather than only the star rating, and ask to speak to one or two past clients.",
        ],
      },
      {
        title: "7. Read the contract before you sign",
        paragraphs: [
          "The contract should state the price, the scope through the BOQ, the payment stages, the handover date and the warranty. Look closely at any clause that allows the price to rise during construction, and at how design changes will be priced.",
        ],
        checks: [
          "Is the price fixed, or can it escalate with material prices?",
          "Is there a handover date, and what happens if it is missed?",
          "What warranty is given on the structure and waterproofing?",
        ],
      },
    ],
    ourAnswer: {
      title: "How Prasanth Associates answers these checks",
      points: [
        "An itemized, fixed-price BOQ signed before construction starts, with no escalation clauses.",
        "Engineer-supervised construction, with each stage inspected against a checklist before the next starts.",
        "Building plan approval handled end to end: drawings, filing and follow-up.",
        "A soil test for every project, with the foundation designed from the results.",
        "Stage-wise payments tied to completed work.",
        "Rated 4.9 on Google across our Coimbatore and Gudalur offices.",
      ],
    },
    questions: [
      {
        question: "Which is the best construction company in Coimbatore?",
        answer:
          "There is no single best builder for every project. The best choice for you is the company that gives an itemized BOQ, has an engineer supervising the site, handles approvals properly, tests the soil, links payments to completed stages and has good recent reviews. Compare your shortlist on these points.",
      },
      {
        question: "What should I ask a builder before signing the contract?",
        answer:
          "Ask what the rate includes, who supervises the site, who handles the approval, whether a soil test will be done, how payments are staged, whether the price can increase, the handover date and the warranty. Get the answers in writing.",
      },
      {
        question: "Is the lowest per sq ft quote the best option?",
        answer:
          "Not always. A low rate can leave out approval, electrical and plumbing, the sump or the compound wall, or use lower material grades. Compare itemized BOQs for the same scope before deciding.",
      },
      {
        question: "Should the builder handle the building plan approval?",
        answer:
          "It helps when one team prepares the drawings, files the approval and builds to the approved plan, because the structure and the sanction stay consistent. Confirm who is responsible in the contract.",
      },
    ],
    keywords: [
      "best construction company in Coimbatore",
      "top construction companies in Coimbatore",
      "which builder is best in Coimbatore",
      "how to choose a builder in Coimbatore",
      "best builders in Coimbatore for house construction",
      "questions to ask a building contractor",
    ],
    related: [
      { href: "/services/house-construction-coimbatore", label: "House construction in Coimbatore" },
      { href: "/services/turnkey-design-build-coimbatore", label: "Turnkey design and build" },
      { href: "/services/building-estimation-boq-coimbatore", label: "Building estimates and BOQ" },
      { href: "/locations/coimbatore", label: "Our Coimbatore office" },
    ],
  },
  {
    slug: "how-to-choose-a-builder-nilgiris",
    region: "nilgiris",
    title: "How to Choose a Builder in the Nilgiris",
    metadataTitle: "Choosing a Builder in Ooty & the Nilgiris",
    description:
      "Building in Ooty, Coonoor, Kotagiri or Gudalur? What to check in a hill builder: slope foundations, monsoon detailing, hill approvals and local supervision.",
    datePublished: "2026-10-12",
    intro:
      "A house in the Nilgiris faces conditions a plains builder rarely deals with: steep plots, months of monsoon rain, fog, cold and materials that come up the ghat road. When you compare builders for Ooty, Coonoor, Kotagiri or Gudalur, these are the questions that separate a hill builder from one who has only built on flat land.",
    sections: [
      {
        title: "1. Check that someone will supervise locally",
        paragraphs: [
          "A builder based only in the plains may visit a hill site once a week. Monsoon damage, slope movement and material delays need quicker decisions than that. Ask where the supervising engineer is based and how often they will be on your site.",
        ],
      },
      {
        title: "2. Ask how they build on a slope",
        paragraphs: [
          "Most Nilgiris plots slope. Ask whether the builder follows the contour with stepped or split-level footings, or levels the site with cutting and filling, which usually costs more and disturbs the slope.",
          "Retaining walls must drain. Ask about weep holes and drainage behind the wall; an undrained retaining wall builds up water pressure through the monsoon and is a common cause of failure.",
        ],
      },
      {
        title: "3. Ask about the soil test",
        paragraphs: [
          "Hill soil can change within one plot. A single test hole in the middle is not enough; bore samples should be taken across the building footprint and the foundation chosen from the results. On the higher plateau, some sloping sites need piles down to rock.",
        ],
      },
      {
        title: "4. Check their monsoon and damp detailing",
        paragraphs: [
          "Ask how the roof, gutters and walls will handle long, heavy rain: steeper roof pitches, wide overhangs, gutters sized for the heaviest rain and walls that can dry out. Inside, ask about anti-fungal treatment and seasoned timber that suits hill humidity.",
        ],
        checks: [
          "What waterproofing goes on the roof and external walls?",
          "How will damp be kept out of bedrooms and wardrobes?",
        ],
      },
      {
        title: "5. Make sure they know the hill-area approval rules",
        paragraphs: [
          "The Nilgiris is a regulated hill district, with rules on slope, site coverage and building height that are stricter than in Coimbatore. Plots near reserve forest boundaries get extra scrutiny. A builder should check these before designing, not after.",
        ],
      },
      {
        title: "6. Be realistic about the timeline",
        paragraphs: [
          "External plastering, painting and roof waterproofing need dry weather, so hill projects are planned around the monsoon. A builder who promises plains-speed construction in the hills either has not planned for the rain or will rush work that should wait.",
        ],
      },
      {
        title: "7. Ask to see their hill projects",
        paragraphs: [
          "Ask for houses the builder has completed in the Nilgiris, ideally ones that have been through a few monsoons. Look at the walls, ceilings and timber for damp, and ask the owners how the house has held up.",
        ],
      },
    ],
    ourAnswer: {
      title: "How Prasanth Associates answers these checks",
      points: [
        "A staffed branch office on Ooty Main Road, Gudalur, with engineers who supervise hill sites.",
        "Houses built in Gudalur, Ooty, Coonoor and Kotagiri.",
        "Stepped foundations and drained retaining walls, designed from soil tests across the plot.",
        "Monsoon-ready roofs and walls, anti-fungal treatment and seasoned timber.",
        "Hill-area approvals checked before design, with sanction drawings filed and followed up.",
        "An itemized, fixed-price BOQ signed before construction starts.",
      ],
    },
    questions: [
      {
        question: "Which is the best builder in Ooty or the Nilgiris?",
        answer:
          "The best builder for a hill house is one who supervises locally, designs foundations from a proper soil test, details the house for long monsoons, knows the hill-area approval rules and can show you Nilgiris houses that have been through several monsoons.",
      },
      {
        question: "Can a builder from Coimbatore build my house in Ooty?",
        answer:
          "Yes, if they have hill experience and someone supervising close to the site. Ask how often the engineer will visit and how they handle slope foundations, monsoon detailing and hill-area approvals.",
      },
      {
        question: "Why does building in the Nilgiris take longer?",
        answer:
          "Some work needs dry weather, so it is scheduled around the monsoon. Materials also come up the ghat road. A realistic programme plans for both.",
      },
      {
        question: "Is building approval harder in the Nilgiris?",
        answer:
          "The rules are stricter on slope, coverage and height, and plots near forests get extra checks. Have the plot checked before paying for a design.",
      },
    ],
    keywords: [
      "best builders in Ooty",
      "best construction company in Nilgiris",
      "builders in Coonoor",
      "construction company in Gudalur",
      "how to choose a builder in Ooty",
      "hill house construction tips Nilgiris",
    ],
    related: [
      { href: "/services/house-construction-nilgiris", label: "House construction in the Nilgiris" },
      { href: "/services/villa-construction-nilgiris", label: "Villa and estate bungalow construction" },
      { href: "/services/building-plan-approval-nilgiris", label: "House plans and building approval in the Nilgiris" },
      { href: "/locations/gudalur", label: "Our Gudalur branch office" },
    ],
  },
];
