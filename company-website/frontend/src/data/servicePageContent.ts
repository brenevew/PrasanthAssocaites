/**
 * Extra content for the service landing pages (/services/<slug>): how the work
 * runs, step by step, and which other services to suggest next.
 *
 * Same copy rules as services.ts: four steps per service, a short title and one
 * or two plain sentences each; only confirmed facts; no prices, guarantees,
 * registrations or brand names; no em dashes or spaced hyphens.
 */

export interface ServiceStep {
  title: string;
  body: string;
}

export interface ServicePageContent {
  steps: [ServiceStep, ServiceStep, ServiceStep, ServiceStep];
  /** Slugs of other services worth reading next. */
  related: [string, string, string];
}

export const servicePageContent: Record<string, ServicePageContent> = {
  "residential-construction": {
    steps: [
      { title: "Site visit and brief", body: "We visit the plot, talk through the rooms you need and how you live, and note access, levels and drainage." },
      { title: "Plans and estimate", body: "We draw the plan and elevation, then price the work in an itemised BoQ so you can see what is included." },
      { title: "Approval and agreement", body: "We help with the approval drawings and application, and the agreement records the scope, schedule and stage payments." },
      { title: "Construction and handover", body: "Our engineers check each stage before the next begins, and we walk through the finished house with you at handover." },
    ],
    related: ["architectural-designs", "interior-designs", "detailed-estimation-costing"],
  },
  "villa-construction": {
    steps: [
      { title: "Site and brief", body: "We study the plot, the views, the slope and the access, and list how you want to use the house and the outdoor spaces." },
      { title: "Design together", body: "Architecture, structure, services and interiors are drawn together, with 3D views so you can see the villa before it is built." },
      { title: "Itemised BoQ", body: "Every item is priced in the BoQ, including the special features, so the price is fixed for the agreed scope." },
      { title: "Build and handover", body: "One team builds the structure and the interiors, with engineer checks at each stage and a joint walkthrough at the end." },
    ],
    related: ["interior-designs", "landscaping-designs", "smart-homes"],
  },
  "commercial-construction": {
    steps: [
      { title: "Use and site", body: "We start with how the building will be used: visitors, staff, stock, parking and services, along with the site's access." },
      { title: "Coordinated drawings", body: "Architectural, structural, electrical and plumbing drawings are prepared together and checked against each other." },
      { title: "BoQ and programme", body: "We price the work in an itemised BoQ and agree a programme, phased if the site is busy or tight." },
      { title: "Construction", body: "Our engineers supervise the work stage by stage and keep you updated until handover." },
    ],
    related: ["structural-drawings", "electrical-drawings", "structural-stability-certificate"],
  },
  "turnkey-construction": {
    steps: [
      { title: "Site visit and soil test", body: "We visit the plot, check the documents and access, and arrange a soil test before the foundation is designed." },
      { title: "Design and BoQ", body: "We prepare the architectural, structural and services drawings, then price everything in an itemised BoQ." },
      { title: "Approval and agreement", body: "We help with the approval application, and one agreement records the scope, schedule and stage payments." },
      { title: "Build, interiors, handover", body: "Our engineers check each stage of construction and interiors, and we walk through the finished building with you." },
    ],
    related: ["architectural-designs", "interior-designs", "detailed-estimation-costing"],
  },
  "industrial-factory-construction": {
    steps: [
      { title: "Process and loads", body: "We look at your production flow, the machines you will install and their weights, and any crane or storage needs." },
      { title: "Layout and design", body: "We design the layout, the shed or RCC frame, the machine foundations and the floor for those loads." },
      { title: "BoQ and schedule", body: "The work is priced in an itemised BoQ with a written schedule, so you can plan installation and start-up." },
      { title: "Build and handover", body: "Our engineers supervise the work, including foundations and floors, and hand over the building ready for fit-out." },
    ],
    related: ["structural-drawings", "electrical-drawings", "chartered-engineer-valuation"],
  },
  "smart-homes": {
    steps: [
      { title: "What you want to control", body: "We go room by room to decide what you want to control, from lights and curtains to locks and cameras." },
      { title: "Wiring plan", body: "Control points and conduits are added to the electrical drawings, so the wiring goes in before the walls are finished." },
      { title: "Install and set up", body: "We install the devices, set up scenes and connect everything to one app." },
      { title: "Show you how", body: "We walk your family through using the system and adjust the settings once you have lived with it." },
    ],
    related: ["electrical-drawings", "residential-construction", "interior-designs"],
  },
  renovation: {
    steps: [
      { title: "Inspect the structure", body: "Our engineers check the existing building, look for cracks, damp and corrosion, and review any old drawings." },
      { title: "Plan the work", body: "We draw the changes, list any strengthening needed, and agree how to phase the work if you are living there." },
      { title: "Itemised BoQ", body: "The work is priced item by item, so you can see the structural repairs and the finishes separately." },
      { title: "Renovate and hand over", body: "We carry out the repairs first and the finishes last, with engineer checks along the way." },
    ],
    related: ["structural-stability-certificate", "interior-designs", "construction-work-consulting"],
  },
  "construction-work-consulting": {
    steps: [
      { title: "Review the paperwork", body: "We read your drawings, contract and BoQ so we know what the contractor has agreed to build." },
      { title: "Agree the stages", body: "Together we decide which stages we will inspect, such as foundations, steel before each slab, and waterproofing." },
      { title: "Inspect and report", body: "We inspect on site and send you a written report of what is right and what needs correcting." },
      { title: "Bills and handover", body: "We check the contractor's bills against the work done and inspect the building before you accept it." },
    ],
    related: ["detailed-estimation-costing", "structural-stability-certificate", "structural-drawings"],
  },
  "architectural-designs": {
    steps: [
      { title: "Plot and brief", body: "We study your plot documents and measurements, and list the rooms you need and how your family uses them." },
      { title: "Floor plan options", body: "We draw floor plan options and revise them with you until the layout works." },
      { title: "3D elevation", body: "Once the plan is fixed, we design the front elevation and show it to you in 3D." },
      { title: "Approval and working drawings", body: "We prepare the approval drawings and the working drawings your builder will use on site." },
    ],
    related: ["structural-drawings", "interior-designs", "residential-construction"],
  },
  "interior-designs": {
    steps: [
      { title: "Measure and brief", body: "We measure each room and note how you use it, what you need to store and the look you like." },
      { title: "3D design", body: "We design each room and show it to you in 3D, revising until you are happy." },
      { title: "Materials and estimate", body: "You choose the materials and finishes, and we price the work item by item." },
      { title: "Make and install", body: "Our team makes and installs the kitchen, wardrobes and units, then fixes anything you point out at handover." },
    ],
    related: ["architectural-designs", "electrical-drawings", "smart-homes"],
  },
  "structural-drawings": {
    steps: [
      { title: "Plan and soil data", body: "We start from the architectural plan and the soil test results for your plot." },
      { title: "Design the structure", body: "Our engineers design the footings, columns, beams and slabs for the loads they will carry." },
      { title: "Detail the steel", body: "We draw the reinforcement details and bar bending schedules the site team will build from." },
      { title: "Issue and support", body: "We issue the drawings and answer the site team's questions while the structure is built." },
    ],
    related: ["architectural-designs", "detailed-estimation-costing", "construction-work-consulting"],
  },
  "electrical-drawings": {
    steps: [
      { title: "Room by room", body: "We go through each room to decide where you need lights, switches, sockets and appliances." },
      { title: "Point layout", body: "We mark every point on the plan, with provision for air conditioners, solar or smart home wiring if you want them." },
      { title: "Circuits and board", body: "We arrange the circuits, the distribution board and the earthing layout." },
      { title: "Issue for site", body: "You get drawings your electrician can wire from, before the walls are plastered." },
    ],
    related: ["plumbing-drawings", "smart-homes", "architectural-designs"],
  },
  "plumbing-drawings": {
    steps: [
      { title: "Wet points", body: "We mark every tap, shower, toilet, sink and appliance point on the plan." },
      { title: "Supply and drainage", body: "We route the water supply and the drainage lines, with slopes and inspection chambers marked." },
      { title: "Tanks and rainwater", body: "We size the sump and overhead tank and add rainwater harvesting." },
      { title: "Issue for site", body: "You get drawings your plumber can follow, so pipes are laid before the slab is cast." },
    ],
    related: ["electrical-drawings", "architectural-designs", "residential-construction"],
  },
  "landscaping-designs": {
    steps: [
      { title: "Site and use", body: "We look at the space, sun, soil and drainage, and how you want to use the garden." },
      { title: "Layout", body: "We draw the layout of lawns, beds, paths, seating and lighting." },
      { title: "Planting plan", body: "We choose plants that suit the local climate and the upkeep you want." },
      { title: "Irrigation and drainage", body: "We plan the irrigation, drainage and lighting runs, so the garden can be built from the drawings." },
    ],
    related: ["villa-construction", "architectural-designs", "interior-designs"],
  },
  "bank-valuation-report": {
    steps: [
      { title: "Send the documents", body: "Share the sale deed, patta, approved plan and any other documents your bank has asked for." },
      { title: "Site inspection", body: "We visit the property, measure it and photograph it." },
      { title: "Valuation", body: "We value the land and the building and record how the value was reached." },
      { title: "Report", body: "You receive the report in your bank's format." },
    ],
    related: ["chartered-engineer-valuation", "property-acquisition-advisory", "structural-stability-certificate"],
  },
  "structural-stability-certificate": {
    steps: [
      { title: "Documents", body: "Share any drawings you have and tell us who has asked for the certificate and why." },
      { title: "Inspection", body: "Our engineers inspect the columns, beams, slabs and foundations, and test the concrete where needed." },
      { title: "Assessment", body: "We check whether the structure is fit for its use and list any repairs needed first." },
      { title: "Certificate", body: "We issue the certificate in the format the authority or institution requires." },
    ],
    related: ["renovation", "bank-valuation-report", "construction-work-consulting"],
  },
  "detailed-estimation-costing": {
    steps: [
      { title: "Drawings", body: "Send us the architectural and structural drawings, and a specification if you have one." },
      { title: "Quantities", body: "We measure every item of work from the drawings." },
      { title: "Rates", body: "We apply rates and check them against standard schedules of rates." },
      { title: "BOQ and review", body: "You get the itemised BOQ, and we can use it to compare the quotes you receive." },
    ],
    related: ["construction-work-consulting", "structural-drawings", "residential-construction"],
  },
  "chartered-engineer-valuation": {
    steps: [
      { title: "Purpose", body: "Tell us who needs the valuation and why, so the report meets their requirements." },
      { title: "Asset list", body: "Share the list of assets with invoices and any earlier reports." },
      { title: "Inspection", body: "We inspect the assets and assess their condition, age and replacement cost." },
      { title: "Report", body: "We prepare the report in the format the bank, auditor or authority asks for." },
    ],
    related: ["bank-valuation-report", "industrial-factory-construction", "structural-stability-certificate"],
  },
  "property-acquisition-advisory": {
    steps: [
      { title: "Your brief", body: "Tell us what you are looking for, where, and the budget you have in mind." },
      { title: "Shortlist", body: "We find and visit properties that match, and shortlist the suitable ones." },
      { title: "Checks", body: "We check the title, encumbrance certificate, approvals and the building's condition, and tell you the value we see." },
      { title: "Purchase", body: "We support you through the agreement and registration." },
    ],
    related: ["land-plot-transactions", "bank-valuation-report", "real-estate-investment-consulting"],
  },
  "land-plot-transactions": {
    steps: [
      { title: "Documents", body: "We collect the title documents, patta, FMB sketch and encumbrance certificate." },
      { title: "Title check", body: "We trace the title chain and check the encumbrance records." },
      { title: "Survey and approvals", body: "We survey the boundaries on site and check the zoning and layout approvals." },
      { title: "Registration", body: "We support the sale deed, registration and the transfer of records." },
    ],
    related: ["property-acquisition-advisory", "architectural-designs", "real-estate-investment-consulting"],
  },
  "real-estate-investment-consulting": {
    steps: [
      { title: "Your goals", body: "We talk through your budget, how long you plan to hold, and the return you are looking for." },
      { title: "Location study", body: "We look at how the shortlisted locations are growing and what rent is achievable there." },
      { title: "Property checks", body: "We check the documents and condition of the specific property before you commit." },
      { title: "Recommendation", body: "We give you our recommendation in writing, with the reasoning and the data behind it." },
    ],
    related: ["property-acquisition-advisory", "property-portfolio-management", "land-plot-transactions"],
  },
  "property-portfolio-management": {
    steps: [
      { title: "Take over", body: "We inspect each property, record its condition and set up the paperwork." },
      { title: "Tenants", body: "We find and screen tenants and prepare the lease agreements." },
      { title: "Day to day", body: "We collect rent, arrange maintenance and repairs, and inspect regularly." },
      { title: "Monthly report", body: "You get a monthly report covering rent, expenses and anything that needs your decision." },
    ],
    related: ["real-estate-investment-consulting", "renovation", "property-acquisition-advisory"],
  },
};
