import type { ServiceSlug } from "./serviceLinks";

/**
 * How people in Coimbatore actually search for each service: short, plain,
 * Indian-English phrasing ("sq ft rate", "godown", "plan drawing", "patta and
 * EC check") rather than formal brochure language.
 *
 * - `keywords` are the standard search phrases for the service (the formal
 *   "architects in Coimbatore" kind). They feed the page's keywords meta tag;
 *   the same phrases already lead the page's title, description and H1.
 * - `aliases` are other names for the service. They feed page keywords and the
 *   Service schema's alternateName; they are not shown as a keyword list.
 * - `questions` are added to the visible FAQ on each service page, worded the
 *   way the search is typed and answered in simple English.
 *
 * Every answer must be backed by something the site already states (service
 * data, rate cards, quote options). Prices quoted here are the design fees
 * listed in the building planner, or the indicative ranges published on the
 * turnkey page; update both places together. Misspellings are deliberately not
 * targeted: Google corrects them, and printing them would look careless.
 */
export const serviceSearchTerms: Partial<
  Record<
    ServiceSlug,
    { keywords: string[]; aliases: string[]; questions: { question: string; answer: string }[] }
  >
> = {
  "residential-construction": {
    keywords: [
      "house construction company in Coimbatore",
      "residential construction company in Coimbatore",
      "home builders in Coimbatore",
      "house builders in Coimbatore",
      "building contractors in Coimbatore",
      "independent house construction in Coimbatore",
      "house construction cost in Coimbatore",
      "construction company in Coimbatore",
      "home builders in Coimbatore for individual houses",
      "duplex house construction in Coimbatore",
      "house construction cost per sq ft in Coimbatore",
      "CCMC building plan approval",
    ],
    aliases: ["house construction", "home construction", "building contractor", "house builders", "civil contractor", "independent house construction", "duplex house construction"],
    questions: [
      {
        question: "House construction rate per sq ft in Coimbatore?",
        answer: "Our turnkey page lists indicative 2026 ranges of about ₹1,850–₹2,400 per sq ft for standard specification and ₹2,600–₹3,600 per sq ft for luxury villa specification. Your actual rate depends on the plot, number of floors and finishes, and is fixed in an itemized BoQ before work starts.",
      },
      {
        question: "Low budget house construction: can it be done?",
        answer: "Share your budget along with the rooms you need. The plan, floor area and finishes can be adjusted to fit it, and the BoQ shows the cost of each item so you can decide where to save.",
      },
      {
        question: "2 BHK or 3 BHK house construction in Coimbatore?",
        answer: "Yes. We build 2 BHK and 3 BHK independent houses, duplex homes and larger family houses. The quote form lets you choose the configuration and approximate built-up area.",
      },
      {
        question: "How many months to build a house?",
        answer: "Construction of an independent house usually takes about 8 to 12 months, plus time for design and approval. The schedule for your house is set out stage by stage before work starts.",
      },
      {
        question: "Building contractor near me in Coimbatore?",
        answer: "Our office is on Sathy Road, Gandhipuram, and we take up house construction across Coimbatore (Kovai). Send your plot location through the quote form or call the office to arrange a site visit.",
      },
    ],
  },
  "villa-construction": {
    keywords: [
      "villa construction in Coimbatore",
      "luxury villa builders in Coimbatore",
      "villa construction company Coimbatore",
      "luxury home builders Coimbatore",
      "villa construction cost per sq ft Coimbatore",
    ],
    aliases: ["luxury villa construction", "villa builders", "bungalow construction", "luxury house construction"],
    questions: [
      {
        question: "Luxury villa construction cost per sq ft in Coimbatore?",
        answer: "Our turnkey page lists an indicative 2026 range of about ₹2,600–₹3,600 per sq ft for luxury villa specification. Imported marble, pools, automation and landscaping change the figure, so each item is priced separately in the BoQ.",
      },
      {
        question: "Bungalow construction: is it the same as a villa?",
        answer: "Yes. The villa service covers independent bungalows and large family homes with features such as courtyards, private pools and double-height living rooms.",
      },
    ],
  },
  "commercial-construction": {
    keywords: [
      "commercial construction company in Coimbatore",
      "commercial building contractors in Coimbatore",
      "office building construction Coimbatore",
      "shopping complex construction Coimbatore",
      "mixed-use building construction Coimbatore",
    ],
    aliases: ["commercial building contractors", "shop building construction", "office building construction", "shopping complex construction", "commercial complex construction"],
    questions: [
      {
        question: "Shops on the ground floor and a house above: can you build it?",
        answer: "Yes. Mixed-use buildings, such as shops or offices below with a residence above, are part of the commercial construction service. Tell us how each floor will be used so access, parking and services can be planned for both.",
      },
      {
        question: "Shop building or commercial complex construction in Coimbatore?",
        answer: "Yes. We build shops, showrooms, offices and commercial complexes. Share the plot size, road width and number of floors so the allowed floor area and parking can be checked first.",
      },
    ],
  },
  "industrial-factory-construction": {
    keywords: [
      "factory construction in Coimbatore",
      "PEB shed contractors in Coimbatore",
      "industrial shed construction Coimbatore",
      "warehouse construction company Coimbatore",
      "pre-engineered building contractors Coimbatore",
      "industrial building contractors Coimbatore",
    ],
    aliases: ["PEB shed", "industrial shed", "factory shed construction", "godown construction", "warehouse construction", "steel shed"],
    questions: [
      {
        question: "Godown or warehouse construction in Coimbatore?",
        answer: "Yes. A godown or storage warehouse can be built as a PEB steel shed. Tell us the floor area, clear height, how goods will be loaded and the size of vehicles that need access.",
      },
      {
        question: "Do you also get factory approval and fire NOC?",
        answer: "Yes. The industrial service includes the Factory Inspectorate (DISH) plan approval, Fire Department NOC and Pollution Control Board clearances needed for the building.",
      },
    ],
  },
  "smart-homes": {
    keywords: [
      "home automation in Coimbatore",
      "smart home automation company Coimbatore",
      "home automation system for new house",
      "smart lighting and curtain automation Coimbatore",
    ],
    aliases: ["home automation", "smart home", "smart switches", "house automation"],
    questions: [
      {
        question: "Home automation for a new house: when should I plan it?",
        answer: "Plan it before brickwork and plastering. The cables are run during that stage, so walls do not need to be broken later. For a finished house, wireless options are available.",
      },
    ],
  },
  renovation: {
    keywords: [
      "house renovation in Coimbatore",
      "home renovation contractors Coimbatore",
      "building renovation and retrofitting Coimbatore",
      "house extension contractors Coimbatore",
      "structural retrofitting Coimbatore",
      "old house renovation cost Coimbatore",
    ],
    aliases: ["house renovation", "old house renovation", "house extension", "first floor construction on existing house", "building strengthening", "house repair work"],
    questions: [
      {
        question: "First floor construction on an existing house: is it possible?",
        answer: "Often, yes. An engineer first checks the existing columns, beams and foundation. If they need strengthening, column and beam jacketing can be done so the building can safely take the new floor.",
      },
      {
        question: "Wall dampness and leakage in an old house: can it be fixed?",
        answer: "Yes. Damp walls are treated with pressure chemical injection and polymer waterproofing as part of the renovation service.",
      },
      {
        question: "Old house repair and renovation: where to start?",
        answer: "Start with a structural check. It shows which repairs are needed for safety and which are only for looks, so you can plan the budget in the right order.",
      },
    ],
  },
  "construction-work-consulting": {
    keywords: [
      "construction consultants in Coimbatore",
      "construction project management Coimbatore",
      "third party quality inspection construction Coimbatore",
      "civil engineering consultants Coimbatore",
      "site supervision services Coimbatore",
    ],
    aliases: ["civil engineer consultant", "site engineer", "third party inspection", "construction quality check", "construction supervision"],
    questions: [
      {
        question: "Civil engineer site visit in Coimbatore for my house work?",
        answer: "Yes. An engineer can visit at key stages such as excavation, footing, slab casting and brickwork, check the work against the drawings and give you a written report.",
      },
      {
        question: "Third party quality check for my house construction?",
        answer: "Yes. We work only for you, independent of your contractor. Checks include steel and concrete quality, cube test results and the contractor's bills.",
      },
    ],
  },
  "architectural-designs": {
    keywords: [
      "architects in Coimbatore",
      "residential architects in Coimbatore",
      "house plan design Coimbatore",
      "architectural design services Coimbatore",
      "3D elevation design Coimbatore",
      "building plan approval Coimbatore",
      "Vastu house plan Coimbatore",
    ],
    aliases: ["house plan", "building plan", "house plan drawing", "architect", "home design", "elevation design", "3D elevation", "building plan approval"],
    questions: [
      {
        question: "House plan drawing cost per sq ft?",
        answer: "The building planner lists an architectural floor plan with Vastu consideration from ₹1.20 per sq ft, and a complete working drawing set at ₹5.00 per sq ft. The final fee depends on the drawings you need.",
      },
      {
        question: "Front elevation or 3D elevation design cost?",
        answer: "Listed design fees per floor: 2D elevation ₹800, single-side 3D elevation ₹3,500, double-side 3D elevation ₹5,500, and Kerala style ₹7,500.",
      },
      {
        question: "Building plan approval in Coimbatore: do you handle it?",
        answer: "Yes. We prepare the approval drawings (listed at ₹3.00 per sq ft) and take care of filing and follow-up with the approving authority until the plan is approved.",
      },
      {
        question: "House plan for a 30x40 or 40x60 plot?",
        answer: "Yes. Send the plot size in feet, the facing direction, the number of floors and the rooms you need. The plan is drawn to fit your plot, setbacks and Vastu preferences.",
      },
    ],
  },
  "structural-drawings": {
    keywords: [
      "structural engineers in Coimbatore",
      "structural design consultants Coimbatore",
      "RCC structural drawings Coimbatore",
      "structural drawing for house Coimbatore",
    ],
    aliases: ["structural design", "RCC design", "column and beam design", "structural engineer", "footing design"],
    questions: [
      {
        question: "Structural drawing cost per sq ft?",
        answer: "The building planner lists structural drawings (beam, column, footing and slab design) at ₹3.00 per sq ft, and a column layout plan at ₹1.50 per sq ft.",
      },
      {
        question: "Structural engineer for my house in Coimbatore?",
        answer: "Yes. Our engineers design the footings, columns, beams and slabs from your soil test and plan, and issue stamped drawings that can be used for approval and on site.",
      },
    ],
  },
  "electrical-drawings": {
    keywords: [
      "electrical drawing for house Coimbatore",
      "electrical design consultants Coimbatore",
      "house wiring plan Coimbatore",
      "electrical load calculation Coimbatore",
    ],
    aliases: ["electrical plan", "house wiring diagram", "electrical layout", "EB load calculation"],
    questions: [
      {
        question: "Electrical drawing cost for a house?",
        answer: "The building planner lists a basic electrical plan at ₹1.20 per sq ft and a full electrical plan, with load calculation and DB design, at ₹2.50 per sq ft.",
      },
      {
        question: "EB load calculation for a new connection?",
        answer: "Yes. The full electrical plan includes the connected load calculation and a single-line diagram that can be used for the EB service connection.",
      },
    ],
  },
  "plumbing-drawings": {
    keywords: [
      "plumbing design consultants Coimbatore",
      "plumbing drawing for house Coimbatore",
      "drainage and water supply design Coimbatore",
      "rainwater harvesting design Coimbatore",
    ],
    aliases: ["plumbing plan", "water line drawing", "drainage plan", "septic tank design", "sump design"],
    questions: [
      {
        question: "Plumbing drawing cost for a house?",
        answer: "The building planner lists a basic plumbing plan at ₹1.20 per sq ft and a full plumbing plan, including water supply, drainage and septic system design, at ₹2.50 per sq ft.",
      },
      {
        question: "Septic tank and sump size for my house?",
        answer: "Yes. Sump and overhead tank capacities are worked out from the number of people living in the house, and the septic system is designed with the drainage layout.",
      },
    ],
  },
  "interior-designs": {
    keywords: [
      "interior designers in Coimbatore",
      "home interior designers Coimbatore",
      "interior design company Coimbatore",
      "modular kitchen designers Coimbatore",
      "office interior designers Coimbatore",
    ],
    aliases: ["interior designer", "home interior", "modular kitchen", "wardrobe design", "false ceiling", "interior works"],
    questions: [
      {
        question: "Modular kitchen design cost?",
        answer: "Modular kitchen design, with layout and working drawings, is listed at ₹3,000 in the building planner. Making and fitting the kitchen depends on its size and materials and is quoted separately.",
      },
      {
        question: "False ceiling and lighting design for my house?",
        answer: "Yes. The planner lists false ceiling design at ₹2.00 per sq ft and lighting design at ₹1.50 per sq ft. Both are usually planned together.",
      },
    ],
  },
  "landscaping-designs": {
    keywords: [
      "landscape designers in Coimbatore",
      "landscape architects Coimbatore",
      "garden design services Coimbatore",
      "terrace garden design Coimbatore",
    ],
    aliases: ["garden design", "landscaping", "terrace garden", "lawn design"],
    questions: [
      {
        question: "Garden design cost for a house?",
        answer: "Landscape design for a house garden and exterior is listed at ₹2,500 in the building planner. Plants, paving and irrigation work are quoted separately.",
      },
    ],
  },
  "bank-valuation-report": {
    keywords: [
      "property valuers in Coimbatore",
      "bank approved valuers Coimbatore",
      "property valuation report Coimbatore",
      "registered valuer Coimbatore",
      "home loan valuation Coimbatore",
    ],
    aliases: ["property valuation", "property valuer", "land valuation", "house valuation for bank loan", "valuation certificate"],
    questions: [
      {
        question: "Property valuer near me in Coimbatore?",
        answer: "Our registered valuers work from the Gandhipuram office in Coimbatore. Send the property location, the bank's name and the purpose of the valuation to book an inspection.",
      },
      {
        question: "How many days for a valuation report?",
        answer: "The service is listed with a 24 to 48 hour turnaround. The exact time depends on when the documents are ready and the site can be inspected.",
      },
      {
        question: "Valuation certificate for a visa or income tax?",
        answer: "Yes. Besides home loans, reports are prepared for visa net-worth certification, capital gains and dividing property between family members.",
      },
    ],
  },
  "structural-stability-certificate": {
    keywords: [
      "structural stability certificate Coimbatore",
      "building stability certificate Coimbatore",
      "structural safety audit Coimbatore",
      "stability certificate for school building Tamil Nadu",
      "factory stability certificate Coimbatore",
    ],
    aliases: ["building stability certificate", "stability certificate for school", "factory stability certificate", "structural safety audit"],
    questions: [
      {
        question: "Stability certificate for school recognition or renewal?",
        answer: "Yes. Structural stability certificates are prepared for school and college recognition, after an on-site inspection and testing by a chartered structural engineer.",
      },
      {
        question: "How many days for a stability certificate?",
        answer: "The service is listed at 2 to 4 working days, including on-site non-destructive testing. Larger or older buildings can take longer.",
      },
    ],
  },
  "detailed-estimation-costing": {
    keywords: [
      "building estimation services Coimbatore",
      "BOQ preparation Coimbatore",
      "construction cost estimation Coimbatore",
      "quantity surveyors in Coimbatore",
      "house construction estimate Coimbatore",
    ],
    aliases: ["building estimate", "BOQ", "construction estimate", "house construction estimate", "quantity estimate"],
    questions: [
      {
        question: "Estimate for house construction: what is the fee?",
        answer: "The building planner lists an estimate and BOQ (material and cost estimation) at ₹2.00 per sq ft of built-up area.",
      },
    ],
  },
  "chartered-engineer-valuation": {
    keywords: [
      "chartered engineer in Coimbatore",
      "chartered engineer certificate Coimbatore",
      "plant and machinery valuation Coimbatore",
      "technical valuation services Coimbatore",
    ],
    aliases: ["chartered engineer certificate", "CE certificate", "machinery valuation", "plant and machinery valuation"],
    questions: [
      {
        question: "CE certificate for imported machinery or EPCG?",
        answer: "Yes. A chartered engineer certifies imported capital goods for customs duty exemption and EPCG compliance, after checking the invoices and inspecting the machines.",
      },
    ],
  },
  "property-acquisition-advisory": {
    keywords: [
      "property consultants in Coimbatore",
      "real estate consultants in Coimbatore",
      "property buying advisory Coimbatore",
      "property document verification Coimbatore",
    ],
    aliases: ["property consultant", "real estate consultant", "property advisor", "property document verification"],
    questions: [
      {
        question: "Patta and EC check before buying property?",
        answer: "Yes. Before you buy, we verify the Encumbrance Certificate, the parent deed chain, patta and chitta, and the DTCP or CMDA approval.",
      },
      {
        question: "DTCP approved or not: can you check?",
        answer: "Yes. Approval status is one of the standard checks, along with the title documents and the boundary measurements on site.",
      },
    ],
  },
  "land-plot-transactions": {
    keywords: [
      "land consultants in Coimbatore",
      "plot consultants Coimbatore",
      "DTCP approved plots in Coimbatore",
      "land legal verification Coimbatore",
    ],
    aliases: ["land consultant", "plot consultant", "DTCP approved plots", "land document verification", "land survey"],
    questions: [
      {
        question: "DTCP approved plots in Coimbatore: can you help?",
        answer: "Yes. We look for DTCP-approved plots that match your size, budget and preferred area, and check each one before you decide.",
      },
      {
        question: "FMB sketch or boundary survey for my land?",
        answer: "Yes. A licensed surveyor checks the boundaries against the Field Measurement Book (FMB) records and revenue maps.",
      },
    ],
  },
  "real-estate-investment-consulting": {
    keywords: [
      "real estate investment consultants Coimbatore",
      "property investment advisors Coimbatore",
      "NRI property investment Coimbatore",
      "best areas to invest in Coimbatore real estate",
    ],
    aliases: ["property investment advisor", "real estate investment consultant", "NRI property investment"],
    questions: [
      {
        question: "Which area is good to buy property in Coimbatore for investment?",
        answer: "It depends on your budget, how long you plan to hold, and whether you want rent or resale. The service compares areas by upcoming infrastructure, rental demand and price trends. Returns cannot be guaranteed.",
      },
    ],
  },
  "property-portfolio-management": {
    keywords: [
      "property management services in Coimbatore",
      "rental property management Coimbatore",
      "NRI property management Coimbatore",
      "tenant management services Coimbatore",
    ],
    aliases: ["property management", "rental management", "rent collection", "NRI property management"],
    questions: [
      {
        question: "Rent collection and tenant management in Coimbatore?",
        answer: "Yes. Rent collection, tenant agreements, police verification and regular inspections are part of the property management service.",
      },
    ],
  },
};
