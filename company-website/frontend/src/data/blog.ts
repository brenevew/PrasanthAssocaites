/**
 * Blog articles. Written in plain English for clients, using only facts the
 * business has confirmed (see data/projects.ts for project figures). Rules:
 * no prices or project values, no invented statistics, no named registrations,
 * no em dashes or spaced hyphens in copy.
 *
 * Paragraphs and list items may contain links written as [text](/path).
 */

export type BlogBlock =
  | { h2: string }
  | { p: string }
  | { ul: string[] }
  | { ol: string[] }
  /** A comparison table; cells may contain links like paragraphs. */
  | { table: { caption: string; head: string[]; rows: string[][] } };

/** The readable text of a block, for word counts and copy checks. */
export function blockText(block: BlogBlock): string[] {
  if ("p" in block) return [block.p];
  if ("h2" in block) return [block.h2];
  if ("table" in block) return [block.table.caption, ...block.table.head, ...block.table.rows.flat()];
  return "ul" in block ? block.ul : block.ol;
}

export interface BlogPost {
  slug: string;
  title: string;
  /** Shorter title for search results (brand is appended; keep total under ~60). */
  seoTitle: string;
  /** Search-result description, ~150 characters. */
  description: string;
  /** Short summary for the blog list. */
  excerpt: string;
  category: "Construction" | "Design" | "Approvals" | "Estimates" | "Valuation";
  datePublished: string;
  /** Set only when the post is materially revised; otherwise the publish date stands. */
  dateModified?: string;
  image: string;
  imageAlt: string;
  /** Service slugs this article relates to (linked at the end of the article). */
  relatedServices: string[];
  /** Completed case studies supporting the article, using projects.ts slugs. */
  relatedProjects?: string[];
  /** Primary references for general guidance, separate from our project evidence. */
  references?: { label: string; href: string }[];
  body: BlogBlock[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "building-in-the-nilgiris-three-projects",
    title: "Building in the Nilgiris: what three of our projects taught us",
    seoTitle: "Building in the Nilgiris: 3 Projects",
    description:
      "A tea bungalow reached across a river, a hotel in busy Gudalur town and a school in rainy Ooty: how site access, space and weather shaped each build.",
    excerpt:
      "A tea bungalow reached across a river, a hotel in the middle of Gudalur and a school in Ooty's rain. Three very different sites, and what each one needed.",
    category: "Construction",
    datePublished: "2026-10-23",
    image: "/images/projects/Villa/luxury-villa-construction-pricol-prasanth-associates-1.webp",
    imageAlt: "Pricol Limited tea bungalow in Gudalur, built by Prasanth Associates",
    relatedServices: ["villa-construction", "commercial-construction", "architectural-designs"],
    relatedProjects: ["pricol", "sasthapuri", "rex-school"],
    body: [
      { p: "People often ask us whether building in the Nilgiris is really that different from building in Coimbatore. The short answer is yes. The concrete, steel and drawings are the same, but the site sets the pace of everything else. Here are three projects from our branch in Gudalur, and the one thing that shaped each of them most." },
      { h2: "1. A tea bungalow where the river was the road" },
      { p: "For [Pricol Limited's tea bungalow](/projects/pricol) in Gudalur, access was a central planning constraint. The site sits inside a tea plantation and could only be reached across a river. Materials, equipment and workers all had to make that crossing." },
      { p: "We planned the movement of people, materials and equipment around that access route. The construction sequence took the plantation setting into account, while architectural, structural and MEP work stayed coordinated. The project shows why a remote site's delivery arrangements belong in the planning discussion." },
      { p: "The finished bungalow is 12,120 sq. ft., built between 2015 and 2017. What we took away from it: on a remote site, the access plan is part of the design, and it needs the same attention as the structure." },
      { h2: "2. A hotel in the middle of a busy town" },
      { p: "[Sasthapuri Hotels](/projects/sasthapuri) had the opposite problem. The site was in the main town area of Gudalur, with traffic, neighbours and very little room to store anything. A 38,879 sq. ft. commercial building does not leave much space for stacking materials when the plot is in the town centre." },
      { p: "We broke the work into phases so that different activities could progress without crowding each other, and coordinated material storage and movement within the available space. Architectural, structural and MEP requirements were coordinated to reduce construction conflicts. The building was completed in 2016." },
      { h2: "3. A school that had to be built around the rain" },
      { p: "For [Christus Rex Higher Secondary School](/projects/rex-school) on Woodcock Road in Ooty, the weather wrote the schedule. Ooty's rain is heavy and hard to predict, the ground slopes, and some tasks simply cannot be done in the wet." },
      { p: "We planned the 12,000 sq. ft. building around that from the start. Work that needed dry weather was scheduled for drier windows, drainage was treated as a priority rather than a finishing detail, and the structural design was matched to a hillside site. The school was built between 2018 and 2019." },
      { h2: "What these projects have in common" },
      { ul: [
        "Plan the access before the building. On hill sites, how materials reach the plot can decide the timeline.",
        "Respect the weather. Build the schedule around the monsoon instead of hoping it stays dry.",
        "Coordinate the drawings early. Architectural, structural and services drawings need to agree before the relevant work proceeds on site.",
        "Account for the surroundings. A plantation setting and a busy town plot place different demands on site planning.",
      ] },
      { p: "If you are planning a house, villa or commercial building anywhere in the Nilgiris, our [Gudalur branch](/locations/gudalur) handles projects across [Ooty, Coonoor, Kotagiri and the rest of the district](/locations/nilgiris-ooty). Bring us your plot details and we will tell you honestly what the site will need." },
    ],
  },
  {
    slug: "before-you-draw-a-house-plan",
    title: "Before you draw a house plan: what to have ready",
    seoTitle: "Before You Draw a House Plan",
    description:
      "Plot documents, measurements, room list, budget and Vastu preferences: what to gather before your first meeting with an architect, and why each one matters.",
    excerpt:
      "A good first meeting with an architect saves weeks later. Here is what to gather before you sit down to plan your house, and why each item matters.",
    category: "Design",
    datePublished: "2026-10-23",
    image: "/images/projects/Designs/exterior-design-residential-elevation-1.webp",
    imageAlt: "3D front elevation of a two-storey house designed by Prasanth Associates",
    relatedServices: ["architectural-designs", "structural-drawings", "residential-construction"],
    relatedProjects: ["residential-building-perur-coimbatore", "residential-construction-project"],
    references: [{ label: "Bureau of Energy Efficiency: residential building envelope, daylight and ventilation", href: "https://beeindia.gov.in/show_content.php?lang=1&level=2&lid=328&ls_id=202" }],
    body: [
      { p: "Most people come to their first planning meeting with a picture of a house they like and a rough idea of how many bedrooms they want. That is a fine place to start. But a few documents and decisions, gathered beforehand, make the difference between a first draft that fits your plot and one that has to be redrawn." },
      { h2: "Your plot documents" },
      { p: "Before anyone draws a line, the plot itself needs checking. Bring copies of:" },
      { ul: [
        "The sale deed, and the patta and chitta in your name.",
        "The FMB sketch, which shows the official shape and measurements of the land.",
        "An encumbrance certificate, if you have one.",
        "The approved layout, if the plot is part of one.",
      ] },
      { p: "These tell the architect the exact boundaries and which authority will approve the plan. If the documents and the land on the ground do not match, it is far better to find out now than after the drawings are done." },
      { h2: "Measurements and the road" },
      { p: "Note the length and width of the plot, which side faces the road, and how wide the road is. Road width and plot size decide the setbacks, which is the open space you must leave around the building. Those setbacks often decide how big the house can be, so they shape the plan before anything else does." },
      { p: "If the plot is not level, say so. A slope changes the foundation, the parking and sometimes the whole layout. This matters a great deal in the Nilgiris, and it is worth a site visit before drawing." },
      { h2: "How you will live in the house" },
      { p: "A room list is useful, but a description of your day is more useful. Think about:" },
      { ul: [
        "Who will live in the house now, and who might in ten years: parents, children, guests.",
        "Whether anyone needs a bedroom on the ground floor.",
        "How you cook: an open kitchen, a closed one, a separate work area for washing.",
        "Where cars and two-wheelers will park.",
        "Whether you want room to add a floor later. That has to be designed into the structure from the start.",
      ] },
      { h2: "Vastu, if it matters to you" },
      { p: "Tell the architect at the first meeting if you want the plan to follow Vastu, and how strictly. It affects where the entrance, kitchen, pooja room and master bedroom go, and it is much easier to plan for than to fix afterwards." },
      { h2: "A realistic budget" },
      { p: "Share the amount you are comfortable spending on construction, not only the size you would like. A good architect will design to the budget, and it stops you falling in love with a plan you cannot build. Once the plan is ready, a [detailed estimate](/services/detailed-estimation-costing) will show what it really costs." },
      { h2: "What happens next" },
      { p: "With these in hand, the first draft of a [2D floor plan](/services/architectural-designs) usually needs far fewer rounds of changes. After you approve the layout, the 3D elevation, the [structural drawings](/services/structural-drawings) and the approval drawings follow from it." },
      { p: "If you would like to start before meeting anyone, our [building planner](/plan-home) lets you enter your plot and rooms online, and an architect reviews it. Our offices are in [Coimbatore](/locations/coimbatore) and [Gudalur](/locations/gudalur)." },
      { h2: "How do I plan for natural light and ventilation?" },
      { p: "Discuss daylight and airflow while the room layout is being developed. Bring information about the plot orientation, neighbouring buildings and the rooms you use most. The Bureau of Energy Efficiency includes natural ventilation and daylighting in its residential building envelope guidance; these are design considerations to review together, rather than additions after the drawings are finished." },
      { p: "Natural light and ventilation were recorded planning considerations in our [3,500 sq. ft. Perur home, completed in 2020](/projects/residential-building-perur-coimbatore), and our [2,617 sq. ft. Gudalur home, built in 2024–2025](/projects/residential-construction-project). Both projects also involved functional room planning and coordination of the structure and building services. They are examples of the questions we work through with a house owner, rather than a single floor plan to copy onto every plot." },
      { h2: "Can I reuse a floor plan from another completed house?" },
      { p: "Use a completed house to explain what you like, then ask the designer to check it against your own plot and requirements. The Perur and Gudalur projects differ in location and built-up area. Their published case studies show planning priorities, not an approved layout for another site. Share your room list, access needs and plot measurements so the design can be developed for your household." },
    ],
  },
  {
    slug: "building-plan-approval-coimbatore-nilgiris",
    title: "Building plan approval in Coimbatore and the Nilgiris: how it works",
    seoTitle: "Plan Approval in Coimbatore & Nilgiris",
    description:
      "Which authority approves your building plan, the documents you need, and why plots in the Nilgiris hill areas need extra checks. A plain guide for owners.",
    excerpt:
      "Who approves your plan depends on where your plot is. A plain guide to the authorities, the documents, and the extra checks in the Nilgiris.",
    category: "Approvals",
    datePublished: "2026-10-23",
    image: "/images/projects/Residential/residential-building-construction-perur-prasanth-associates.webp",
    imageAlt: "Two-storey house in Perur, Coimbatore, built by Prasanth Associates",
    relatedServices: ["architectural-designs", "structural-drawings", "turnkey-construction"],
    body: [
      { p: "Building plan approval is the step owners worry about most, usually because nobody has explained it simply. The process is not mysterious. It mostly comes down to three questions: who approves your plot, what they need to see, and whether your plot has any special rules." },
      { h2: "Who approves your plan" },
      { p: "It depends on where the plot is. Inside Coimbatore city limits, the corporation handles building approvals. In the growing areas around the city and in panchayat areas, approval usually goes through the local planning authority or the town and country planning department (DTCP). In the Nilgiris, the local body for your area is involved, and hill-area rules apply on top of the usual ones." },
      { table: {
        caption: "Who usually approves your plan, by where the plot is",
        head: ["Where the plot is", "Who usually approves", "What to check"],
        rows: [
          ["Inside Coimbatore city limits", "Coimbatore City Municipal Corporation (CCMC)", "Your patta and FMB sketch confirm the plot is inside the limits."],
          ["Growing areas around Coimbatore and panchayat areas", "The local planning authority or the town and country planning department (DTCP)", "Whether the plot is in an approved layout."],
          ["The Nilgiris", "The local body for your area, with hill-area rules on top", "Slope, site coverage, building height and nearness to forest areas."],
        ],
      } },
      { p: "Filing with the wrong office is one of the most common reasons for delay. Your patta and FMB sketch show where the land sits, and that tells you where the application goes." },
      { h2: "The documents you will usually need" },
      { ul: [
        "Sale deed, patta and chitta.",
        "FMB sketch and, where needed, an encumbrance certificate.",
        "Layout approval, if the plot is in an approved layout.",
        "The building plan drawings: site plan, floor plans, elevations and sections.",
        "Structural drawings, for buildings that require them.",
      ] },
      { p: "Exact requirements change from time to time and differ between authorities, so confirm the current list before you file." },
      { h2: "Setbacks, coverage and height" },
      { p: "Every plan is checked against the building rules: how far the building stands from the boundaries, how much of the plot it covers, how much floor area you can build in total, and how tall it can be. These depend mainly on the plot size and the width of the road in front. A plan drawn with the rules in mind from the first sketch goes through far more smoothly than one adjusted afterwards." },
      { h2: "Why the Nilgiris needs extra care" },
      { p: "The Nilgiris is a hill district, and building there carries limits that do not apply on the plains. Rules on slope, site coverage and building height are stricter, and plots near forest areas get closer scrutiny. Around Gudalur and Ooty we check these limits during the feasibility stage, before design starts, so you are not surprised after the drawings are finished." },
      { h2: "How long it takes" },
      { p: "Timelines vary with the authority, the type of building and how complete the application is. A complete, correct set of drawings and documents is the one thing in your control, and it makes the biggest difference." },
      { h2: "How we help" },
      { p: "We prepare the [approval drawings](/services/architectural-designs) and [structural drawings](/services/structural-drawings), file the application, and follow it up until the approval is issued. You can ask for this on its own, or as part of a [turnkey design and build](/services/turnkey-design-build-coimbatore) project. Talk to our team in [Coimbatore](/locations/coimbatore) or [Gudalur](/locations/gudalur) with your plot documents and we will tell you which route your plot takes." },
    ],
  },
  {
    slug: "how-to-read-a-construction-boq",
    title: "How to read a construction BOQ before you sign",
    seoTitle: "How to Read a Construction BOQ",
    description:
      "What a bill of quantities should list, how to compare quotes from different builders line by line, and the gaps that lead to extra costs later.",
    excerpt:
      "Two quotes for the same house can differ widely and both be honest. A bill of quantities shows you why. Here is how to read one.",
    category: "Estimates",
    datePublished: "2026-10-23",
    image: "/images/projects/Residential/residential-building-under-construction-gudalur-prasanth-associates-3.webp",
    imageAlt: "House under construction in Gudalur, built by Prasanth Associates",
    relatedServices: ["detailed-estimation-costing", "construction-work-consulting", "residential-construction"],
    body: [
      { p: "A quote that says only a rate per square foot tells you very little. Two builders can quote the same rate and mean completely different houses. A bill of quantities, or BOQ, is the document that shows what you are actually paying for." },
      { h2: "What a BOQ is" },
      { p: "A BOQ breaks the building into items of work, gives the quantity of each, and prices each one. Excavation in cubic metres, concrete in cubic metres, steel in kilograms, brickwork, plastering, flooring, painting, electrical and plumbing points: each is listed with a quantity and a rate. Add them up and you get the total." },
      { h2: "What a good BOQ should include" },
      { ul: [
        "Every stage of work, from site clearing and foundation to finishing and cleaning.",
        "Material specifications: the grade of concrete and steel, the type of blocks or bricks, the type and size of tiles.",
        "Brand or quality allowances for items like tiles, sanitary fittings, switches and paint, so you know what level of finish is assumed.",
        "Electrical and plumbing work in detail, with the number of points.",
        "Outdoor work: compound wall, gate, sump, septic tank, paving.",
        "What is excluded. This list matters as much as what is included.",
      ] },
      { h2: "How to compare two quotes" },
      { p: "Put the BOQs side by side and compare them line by line, not just the totals. The cheaper quote is often missing something: a lower grade of steel, fewer electrical points, no compound wall, or a smaller allowance for tiles that you will top up later. Once both quotes cover the same work at the same specification, the comparison becomes fair." },
      { h2: "Gaps that lead to extra costs" },
      { ul: [
        "Items marked as provisional or extra, with no rate given.",
        "Very low allowances for finishes, which almost every owner ends up increasing.",
        "Foundation quantities guessed without a soil test. Poor soil can change the foundation a great deal.",
        "No clear rule for how changes are priced once work starts.",
      ] },
      { h2: "Changes during construction" },
      { p: "Most cost overruns come from changes, not from fraud. That is normal: people change their minds once they see the house rising. What matters is that each change is written down and priced before the work is done, not added to the bill at the end. Ask how your builder handles this before you sign." },
      { h2: "Getting a BOQ checked" },
      { p: "We prepare [detailed estimates and BOQs](/services/detailed-estimation-costing) for owners, and we also review BOQs and running bills from other contractors as part of our [construction consulting](/services/construction-work-consulting) work. Either way, the aim is the same: you should know exactly what you are paying for before the first payment is made." },
    ],
  },
  {
    slug: "bank-valuation-report-or-stability-certificate",
    title: "Bank valuation report or structural stability certificate: which do you need?",
    seoTitle: "Valuation vs Stability Certificate",
    description:
      "They answer different questions. When banks ask for a valuation report, when schools and factories need a stability certificate, and how each is prepared.",
    excerpt:
      "One tells a bank what your property is worth. The other tells an authority your building is safe. Here is how to tell which one you have been asked for.",
    category: "Valuation",
    datePublished: "2026-10-23",
    image: "/images/projects/Commercial/modern-commercial-building-design-construction-gudalur-sasthapuri-hotels.webp",
    imageAlt: "Sasthapuri Hotels commercial building in Gudalur, built by Prasanth Associates",
    relatedServices: ["bank-valuation-report", "structural-stability-certificate", "chartered-engineer-valuation"],
    body: [
      { p: "We are often asked for \"a certificate for the building\", and the first question we ask back is: who wants it, and why? A bank valuation report and a structural stability certificate are both prepared by engineers after a site inspection, but they answer completely different questions." },
      { h2: "A valuation report answers: what is it worth?" },
      { p: "Banks ask for a valuation report before giving a home loan, a mortgage or a loan against property. It is also used for visa and net worth statements, for dividing family property, and for sale or purchase decisions." },
      { p: "The engineer visits the property, checks the documents, measures the building and assesses the land, the construction and its condition. The report then states a value, and explains how that value was reached. Banks usually have their own format and checklist, so share it with the valuer at the start." },
      { h2: "A stability certificate answers: is it safe?" },
      { p: "A structural stability certificate confirms that a building is structurally sound for its use. Schools are often asked for one, factories need one for licence renewals, and owners sometimes need one before adding a floor, changing how a building is used, or after visible damage." },
      { p: "Here the engineer looks at the structure itself: cracks, the condition of columns, beams and slabs, signs of settlement, and the loads the building carries. Where needed, simple tests are done on the concrete. The certificate states whether the building is fit for its purpose, and lists any repairs needed first." },
      { h2: "Side by side" },
      { table: {
        caption: "Bank valuation report and structural stability certificate compared",
        head: ["", "Bank valuation report", "Structural stability certificate"],
        rows: [
          ["The question it answers", "What is the property worth?", "Is the building structurally sound for its use?"],
          ["Usually asked for by", "Banks, buyers and embassies", "School departments, factory inspectors and licensing authorities"],
          ["Common reasons", "Home loans, mortgages, loans against property, visa and net worth statements, family property division, sale or purchase", "School and factory licence renewals, adding a floor, a change of use, or visible damage"],
          ["What the engineer checks", "The documents, the building's measurements, the land, the construction and its condition", "Cracks, columns, beams and slabs, signs of settlement and the loads carried, with simple concrete tests where needed"],
          ["What it states", "A value, and how that value was reached", "Whether the building is fit for its purpose, and any repairs needed first"],
        ],
      } },
      { h2: "A quick way to tell them apart" },
      { ul: [
        "If a bank, a buyer or an embassy is asking, you most likely need a valuation report.",
        "If a school department, a factory inspector or a licensing authority is asking, you most likely need a stability certificate.",
        "If you are planning to add a floor or change the use of a building, start with a structural assessment.",
      ] },
      { h2: "Before you book either one" },
      { p: "Ask the organisation requesting it for their format and any requirements for who may sign it. Have the property documents and any approved drawings ready, and make sure the engineer can access every part of the building during the visit." },
      { p: "We prepare [bank valuation reports](/services/bank-valuation-report), [structural stability certificates](/services/structural-stability-certificate) and [technical valuations of machinery and assets](/services/chartered-engineer-valuation). Tell us who the document is for, and we will tell you exactly what is needed." },
    ],
  },
  {
    slug: "questions-to-ask-building-contractor-coimbatore-nilgiris",
    title: "How do you choose a building contractor in Coimbatore or the Nilgiris?",
    seoTitle: "Choosing a Builder in Coimbatore & Nilgiris",
    description: "Questions to ask a builder about completed work, scope, site access and supervision, with examples from our Perur, Gudalur and Nilgiris projects.",
    excerpt: "Compare a contractor's evidence and proposed scope before comparing promises. Questions to take to your first meeting, illustrated by completed projects.",
    category: "Construction",
    datePublished: "2026-10-23",
    image: "/images/projects/Residential/residential-building-construction-perur-prasanth-associates.webp",
    imageAlt: "Completed 3,500 sq. ft. residential building in Perur, Coimbatore, by Prasanth Associates",
    relatedServices: ["residential-construction", "construction-work-consulting", "detailed-estimation-costing"],
    relatedProjects: ["residential-building-perur-coimbatore", "residential-construction-project", "pricol", "sasthapuri"],
    body: [
      { p: "Start with a contractor's completed work and the scope they propose for your own site. A house in Coimbatore, a plantation bungalow and a commercial building in Gudalur raise different planning questions. A useful first meeting connects the contractor's experience to those questions and records what the appointment will include." },
      { h2: "What should I check when choosing a construction company in Coimbatore?" },
      { p: "Start with a comparable completed house and ask how the builder will adapt that experience to your plot. Our Perur residence (3,500 sq. ft., completed 2020) is a local example; your house will have its own cost, foundation and programme. Share your plot measurements, road access and room requirements, then ask the engineer what ground information and investigations the proposed design needs." },
      { p: "Compare a written scope and itemised estimate alongside the drawings. Record who prepares each drawing, who handles the approval application, what the price includes, and how additional work will be agreed. Ask for the proposed supervision arrangements, payment stages and handover documents. Check any warranty terms in the actual agreement. Our [Coimbatore office page](/locations/coimbatore) provides contact details for discussing your site." },
      { h2: "What should I check when choosing a builder in Ooty or the Nilgiris?" },
      { p: "Ask how site levels, drainage, access and weather will be assessed before the programme is agreed. Have the design team identify the permissions applicable to your particular plot and proposed use, including any local constraints. Our [hill-plot planning guide](/blog/building-on-sloping-plot-ooty-gudalur) explains the questions to raise before design." },
      { p: "Request an explanation of material transport, working space and site supervision. At Pricol's Gudalur bungalow, the access route crossed a river; at Sasthapuri Hotels in Gudalur, limited working space required phased work and organised storage. These documented constraints are useful questions for a contractor meeting. For your own site, agree how weather-dependent work and delivery arrangements will be planned, and who will coordinate with you through our [Gudalur branch](/locations/gudalur)." },
      { h2: "Matching completed projects to your building" },
      { p: "Ask for examples that match your building type, location and site constraints. For a family house, our [Perur project](/projects/residential-building-perur-coimbatore) documents a 3,500 sq. ft. residence completed in 2020. Our [Gudalur residential project](/projects/residential-construction-project) documents a 2,617 sq. ft. home built in 2024–2025. Both describe functional planning, natural light and ventilation, and coordination between design and construction." },
      { p: "For a remote estate site, the [Pricol Limited tea bungalow](/projects/pricol) is a more relevant comparison: its access route crossed a river. For commercial work on a busy town site, [Sasthapuri Hotels](/projects/sasthapuri) provides a different example. Look beyond the photograph and ask which constraints the team actually handled." },
      { h2: "What the contractor actually did on those projects" },
      { p: "Ask whether the appointment covered design, structural engineering, construction, building services, supervision or only part of that work. The Pricol and Sasthapuri case studies identify architecture, structural engineering, construction, MEP services and project coordination within our scope. A completed building is useful evidence only when you understand the team's role in delivering it." },
      { h2: "Who will coordinate the drawings and supervise my site?" },
      { p: "Request the proposed responsibilities and communication route for your own project. Who resolves a drawing query? Who checks work against the agreed design? Who tells you when a decision is needed? Our Sasthapuri case study records regular supervision and coordination between architectural, structural and MEP work. Ask how that approach will be organised for the scale of your building." },
      { h2: "Checking the quote against the drawings" },
      { p: "Compare written inclusions, material specifications, exclusions and the procedure for changes. An attractive total does not explain who is responsible for every task. Our guide to [reading a construction BOQ](/blog/how-to-read-a-construction-boq) sets out the questions to ask when comparing estimates. Agree how revised work will be described and priced before it proceeds. If you are still choosing a contract type, compare [turnkey, labour and item-rate contracts](/blog/turnkey-vs-labour-contract) first." },
      { h2: "Site access and working space" },
      { p: "Bring photographs of the approach road and the plot, not just the proposed front elevation. Pricol required planning for materials, workers and equipment to cross a river. Sasthapuri required phased work and organised storage within a busy town site. These are different problems, so ask how your site will be handled." },
      { h2: "What should I ask about the construction programme?" },
      { p: "Ask for the proposed sequence, the decisions you must make and the site conditions the programme assumes. Sasthapuri took 2014–2016 and Pricol 2015–2017, but they are different buildings with different access, so use those dates as context, not as a guide to your house." },
      { h2: "What to bring to the first meeting" },
      { ul: [
        "Plot measurements, site photographs and available property documents.",
        "A room or space brief, with the priorities that matter most to the users.",
        "Any drawings already prepared and the work you want the contractor to handle.",
        "Questions about supervision, exclusions, changes and project stages.",
      ] },
      { p: "You can review our [completed projects](/projects) before discussing your site with our [Coimbatore office](/locations/coimbatore) or [Gudalur branch](/locations/gudalur). Use the case studies to ask specific questions about how a similar requirement would be approached on your plot." },
    ],
  },
  {
    slug: "building-on-sloping-plot-ooty-gudalur",
    title: "Can you build on a sloping plot in Ooty or Gudalur?",
    seoTitle: "Building on Sloping Plots in the Nilgiris",
    description: "What to check before designing for a hill plot: terrain, drainage, access and sequencing, illustrated by our completed Ooty school and Gudalur bungalow.",
    excerpt: "A hill plot needs an assessment before a floor plan. Our Ooty school and Gudalur tea bungalow show why terrain, water and access belong in early planning.",
    category: "Construction",
    datePublished: "2026-10-23",
    image: "/images/projects/Schools/rex-school-building-construction-prasanth-associates.webp",
    imageAlt: "Completed Christus Rex Higher Secondary School building in Kandal, Ooty, by Prasanth Associates",
    relatedServices: ["architectural-designs", "structural-drawings", "villa-construction"],
    relatedProjects: ["rex-school", "pricol"],
    references: [{ label: "NDMA and BIS: Simplified Guidelines for Earthquake Safety of Buildings, including site selection", href: "https://www.bis.gov.in/wp-content/uploads/2022/11/Simplified_Guidelines_Sep_20211-1.pdf" }],
    body: [
      { p: "Many sloping sites can be built on. Whether yours can depends on a site assessment, the building you want and the permissions that apply. Before choosing a layout, find out how the land, water and access will shape the design." },
      { h2: "What should be checked before drawing a house on a hill plot?" },
      { p: "Start with the site's levels, the proposed building position, water movement and the access route. Ask a qualified engineer what site investigations are needed before structural design. NDMA and BIS guidance emphasises professional investigation when assessing a hill site's vulnerability to landslides. A photograph or a standard floor plan cannot settle this." },
      { p: "Our [Christus Rex Higher Secondary School project](/projects/rex-school) in Kandal, Ooty, involved sloping and uneven terrain, difficult material transport and heavy, unpredictable rain. The completed building is 12,000 sq. ft.; work ran from 2018 to 2019. Its published case study describes structural and construction planning matched to those hill-region conditions." },
      { h2: "Plan drainage before construction starts" },
      { p: "Ask how water will be managed while the site is being worked on and when the building is in use. At Christus Rex, drainage and water management were recorded site challenges, alongside weather-dependent construction activities. That makes them early coordination questions for the design and site teams. The appropriate arrangement for your plot needs to be developed from its actual conditions." },
      { h2: "How can a difficult approach affect the building programme?" },
      { p: "Check how workers, materials and equipment will reach the plot at each stage. For the [Pricol Limited tea bungalow in Gudalur](/projects/pricol), reaching the site meant crossing a river. The completed 12,120 sq. ft. building required planning around that route and the surrounding tea plantation. Its construction sequence and delivery arrangements were part of the project planning, not a separate issue to resolve after design." },
      { h2: "How rain shapes the construction sequence" },
      { p: "Yes. The school case study records that activities were scheduled around Ooty's weather to minimise delays. A programme for a new hill project should identify weather-dependent work and how it connects to the remaining stages. Ask the team what weather the schedule assumes." },
      { h2: "Will my plot need the same foundation as another hill building?" },
      { p: "Have the structural engineer assess your site's requirements before choosing a foundation arrangement. Ask how the site's ground conditions, levels and proposed building will inform the design. Any proposed foundation or retaining work needs its own engineering design; the access and coordination lessons from another completed project are useful discussion points for that process." },
      { h2: "What to prepare before a site visit" },
      { ul: [
        "The plot location, boundary information and any available survey or drawings.",
        "Photographs showing the approach route, changes in level and surrounding ground.",
        "Information you have about water movement or access difficulties during rain.",
        "Your proposed building use, room requirements and any existing structures.",
      ] },
      { p: "Our [Ooty and Nilgiris page](/locations/nilgiris-ooty) and [Gudalur branch page](/locations/gudalur) explain where we work. The next step for a hill plot is a discussion based on the actual site, supported by architectural and structural advice." },
    ],
  },
  {
    slug: "renovate-old-bungalow-nilgiris",
    title: "Should you renovate or rebuild an old bungalow in the Nilgiris?",
    seoTitle: "Renovating an Old Bungalow in the Nilgiris",
    description: "Questions to resolve before renovating an older bungalow, with evidence from our 4,904 sq. ft. Manjushree Director's Building project in O'Valley.",
    excerpt: "Begin with the building's condition and what you need it to do. Our Manjushree renovation illustrates the importance of assessment and the plantation setting.",
    category: "Construction",
    datePublished: "2026-10-23",
    image: "/images/projects/Renovation/manjushree-residential-building-renovation-prasanth-associates.webp",
    imageAlt: "Director's Building at Manjushree Plantation in O'Valley, renovated by Prasanth Associates",
    relatedServices: ["renovation", "structural-drawings", "construction-work-consulting"],
    relatedProjects: ["manjushree"],
    body: [
      { p: "Age alone does not decide it. The building's condition and the changes you want do. A bungalow may have a layout or character worth keeping even when parts of it need repair. An inspection and a clear brief show whether renovation can meet your needs or whether rebuilding makes more sense." },
      { h2: "What should be assessed before an old bungalow is renovated?" },
      { p: "Ask the design and engineering team to inspect the existing building and identify what information is needed before changes are proposed. Bring any drawings, records of previous alterations and a description of the problems you want resolved. An on-site professional assessment is needed before deciding which structural changes are appropriate." },
      { p: "Our [Director's Building renovation at Manjushree Plantation](/projects/manjushree) involved a 4,904 sq. ft. British-era building at New Hope, O'Valley. The project record identifies assessment of the old building's condition as an early requirement, followed by planned coordination within the existing structure." },
      { h2: "Can renovation respect an older building's original character?" },
      { p: "That can be a design aim when it is compatible with the proposed work and the building's assessed condition. At Manjushree, the recorded approach was to improve the building while respecting its original character and plantation setting. Whether your building allows the same depends on its condition." },
      { p: "Before design starts, identify which spaces, features or relationships to the surroundings you want to keep. Then discuss how your new requirements can fit around them. This gives the team a clearer brief than asking for a general modernisation without deciding what matters about the existing building." },
      { h2: "Extra planning for a plantation setting" },
      { p: "Access, material movement, weather exposure and the surroundings should be discussed together. The Manjushree building stands among cardamom plants beneath mountain slopes. Its published challenges include site access, moisture management and coordination of renovation within the existing structure. Those recorded constraints help explain why the work needs more planning than a change to the interior finishes alone." },
      { h2: "How should I compare a renovation proposal with a rebuild proposal?" },
      { p: "Ask both proposals to describe the intended use, the work included, the investigations still needed and the assumptions being made. Compare them after the condition of the building has been assessed. Discuss the structure, finishes, building services, access and construction stages in each option, then ask which existing conditions could change the proposed scope." },
      { h2: "Removing walls or adding a floor" },
      { p: "Have the structural implications assessed before committing to the layout or starting work. Bring the proposed changes to the engineer and ask what existing information, inspections and design work are required for your property." },
      { h2: "What to bring to a renovation discussion" },
      { ul: [
        "Available drawings and any records of earlier additions or repairs.",
        "Photographs and a description of the existing building and its surroundings.",
        "A list of current problems and the rooms or uses you need after renovation.",
        "The features you want to retain and any known access constraints.",
      ] },
      { p: "Read the [Manjushree project record and photographs](/projects/manjushree), then discuss your building with our [renovation team](/services/renovation) through the [Gudalur branch](/locations/gudalur). The useful starting point is your building's condition and requirements." },
    ],
  },
  {
    slug: "commercial-building-planning-gudalur",
    title: "What should you plan before constructing a commercial building in Gudalur?",
    seoTitle: "Commercial Building Planning in Gudalur",
    description: "Questions about drawings, MEP, storage and construction phases on a busy town site, illustrated by our completed Sasthapuri Hotels project in Gudalur.",
    excerpt: "A town-centre site needs coordinated drawings and an organised construction sequence. Questions for owners, illustrated by the Sasthapuri Hotels project.",
    category: "Construction",
    datePublished: "2026-10-23",
    image: "/images/projects/Commercial/modern-commercial-building-design-construction-gudalur-sasthapuri-hotels.webp",
    imageAlt: "Completed 38,879 sq. ft. Sasthapuri Hotels commercial building in Gudalur by Prasanth Associates",
    relatedServices: ["commercial-construction", "structural-drawings", "electrical-drawings", "plumbing-drawings"],
    relatedProjects: ["sasthapuri"],
    references: [{ label: "Bureau of Indian Standards: National Building Code and its integrated approach", href: "https://www.bis.gov.in/standards/national-building-code/?lang=en" }],
    body: [
      { p: "Start with how the building will be used, which design responsibilities are included and how the site can accommodate construction. On a busy town plot, the available working area affects the movement of materials and the sequence of trades. Those questions need to be discussed alongside the architectural layout." },
      { h2: "What a completed Gudalur commercial project shows" },
      { p: "Our [Sasthapuri Hotels project](/projects/sasthapuri) is a completed 38,879 sq. ft. commercial building in the main town area of Gudalur. The published project period is 2014–2016. Our scope included architecture, structural engineering, construction, MEP services, planning and site supervision." },
      { p: "The recorded challenges were a busy surrounding area, limited working and storage space, material handling and coordination of different trades. Those are useful starting questions for an owner planning another town-site project, although the solution must be developed for that owner's building and plot." },
      { h2: "Which drawings and design responsibilities should be coordinated?" },
      { p: "Ask how the architectural, structural and building-services designs will be coordinated, and which team is responsible for each. The National Building Code's published contents cover an integrated approach, structural design, building services and plumbing. The design and approval requirements depend on how the building will be used, so the drawing list should come from your project's engineers and architects." },
      { p: "At Sasthapuri, coordinating architectural, structural and MEP requirements was part of the recorded approach to reducing construction conflicts. For a new commercial building, ask when those disciplines will review one another's drawings and how changes will be communicated to the people on site." },
      { h2: "What MEP means for your brief" },
      { p: "MEP refers to mechanical, electrical and plumbing services. Ask the design team which services your intended building use needs, who will design them and what is included in the appointment. Describe the expected users, activities and spaces in your brief so the design team can work out what is needed. At Sasthapuri, MEP coordination formed part of the work alongside architecture and structural engineering." },
      { h2: "Building on a site with little storage space" },
      { p: "Discuss material storage, movement, deliveries and the areas needed by different activities. Sasthapuri was built in phases so that work could progress without crowding the site. Its case study records organised site management and coordination of available space. Ask for the proposed arrangement on your own plot and how that arrangement changes as construction progresses." },
      { h2: "Who checks the work as the project progresses?" },
      { p: "Agree the site-supervision responsibilities and how questions or changes will be recorded. At Sasthapuri, regular supervision was used to keep execution in line with the planned design. For your building, identify who coordinates a query between the owner, designer and site team, and when your decisions will be needed." },
      { h2: "Can another project's dates tell me how long mine will take?" },
      { p: "They provide context, not a promised duration. Sasthapuri's published 2014–2016 period relates to that building's size, scope and circumstances. A new programme needs its own design brief, access arrangements, construction sequence and approval plan. Discuss those assumptions before agreeing a completion target." },
      { p: "Use the [Sasthapuri case study](/projects/sasthapuri) alongside our [commercial construction service](/services/commercial-construction) when preparing your brief. Our [Gudalur branch](/locations/gudalur) can discuss the building use, the plot and the design responsibilities you need covered." },
    ],
  },
  {
    slug: "turnkey-vs-labour-contract",
    title: "Turnkey, labour contract or item-rate: which suits your house?",
    seoTitle: "Turnkey vs Labour Contract for a House",
    description:
      "Turnkey, labour-only and item-rate contracts compared: who buys materials, who carries the risk, how the price is set, and which suits your house.",
    excerpt:
      "Three common ways to contract a house, compared side by side: who buys the materials, who designs, and who carries the risk when things change.",
    category: "Construction",
    datePublished: "2026-10-29",
    image: "/images/projects/Residential/residential-building-under-construction-perur-prasanth-associates.webp",
    imageAlt: "House under construction in Perur, Coimbatore, by Prasanth Associates",
    relatedServices: ["turnkey-construction", "detailed-estimation-costing", "construction-work-consulting"],
    body: [
      { p: "Most house quotes in Coimbatore follow one of three contract types. In a turnkey contract, one company designs the house, supplies the materials and builds it. In a labour contract, the contractor supplies the workers and you buy the materials. In an item-rate contract, you pay an agreed rate for each item of work, multiplied by the quantity measured on site. The real differences are who buys the materials, who designs the house and who carries the risk when quantities or plans change." },
      { p: "We offer turnkey design and build. If you choose a labour or item-rate contractor instead, we can still prepare your BoQ and check the work and the bills, as explained below." },
      { table: {
        caption: "How the three common house-construction contracts usually work",
        head: ["", "Turnkey (design and build)", "Labour contract", "Item-rate contract"],
        rows: [
          ["Who buys materials", "The contractor, to the specification in the BoQ", "You", "The contractor, included in each item's rate"],
          ["Who designs", "The contractor's team", "You appoint an architect and engineer separately", "Your architect and engineer; the contractor builds to their drawings"],
          ["How the price is set", "An itemised BoQ for the agreed scope", "A labour rate, by area or by stage; materials are paid for separately", "A rate for each item, multiplied by the measured quantity"],
          ["Who carries the quantity risk", "The contractor, within the agreed scope", "You, including wastage", "You pay for measured quantities; the contractor carries the rate"],
          ["Your time and effort", "Lowest", "Highest: buying, storing and checking materials", "Medium: measuring work and checking bills"],
          ["Changes", "A written change order, priced before the work is done", "You buy the extra materials and agree the labour again", "New items need new rates agreed"],
          ["Check before signing", "Inclusions, exclusions, specifications and stage payments", "Material quality, wastage and who supervises", "How work is measured, rates for extra items and who checks bills"],
          ["Suits owners who", "Want one point of responsibility", "Have time, supplier contacts and their own supervision", "Have an engineer to measure the work and check bills"],
        ],
      } },
      { h2: "What a turnkey contract covers" },
      { p: "Turnkey means one contract and one team for the whole building. In our [turnkey design and build service](/services/turnkey-design-build-coimbatore), that covers the soil test, the architectural design, the structural and services drawings, help with the plan approval, construction and interiors." },
      { p: "The scope is written into an itemised Bill of Quantities before work starts, and the price is fixed for that agreed scope. If you change something later, the change is priced in a written change order before the work is done. You deal with one team and one schedule." },
      { p: "The trade-off is direct control over purchasing. You choose the specifications and finishes, but you do not buy each load of materials yourself, so read the material specifications in the BoQ carefully before you sign." },
      { h2: "Labour contract vs material contract" },
      { p: "In a labour contract, sometimes called a labour-only contract, the contractor supplies the masons, helpers and other workers, and you buy the materials. In a material contract, the contractor supplies both the labour and the materials. A turnkey contract goes one step further and adds the design." },
      { p: "A labour contract gives you direct control over what you buy and from whom. It also hands you the work that comes with that control: ordering materials on time, storing them safely on site, checking quantities on delivery and keeping wastage down. If materials arrive late, the workers wait and the schedule slips." },
      { p: "You also need your own design. A labour contractor builds from drawings, so you appoint an architect and a structural engineer separately, and someone has to check that the work on site follows those drawings." },
      { p: "It suits owners who live near the site, know local suppliers and can spend time there, or who have an engineer they trust to supervise." },
      { h2: "Item rate contract for house construction" },
      { p: "In an item-rate contract, the contractor quotes a rate for each item of work: excavation and concrete by the cubic metre, steel by the kilogram, then brickwork, plastering, flooring and so on. The final bill is each rate multiplied by the quantity measured on site." },
      { p: "This works well when the quantities are measured properly, and it shows you the cost of each item. The risk sits in the measurements and in work that is not on the list. Before you sign, agree how each item will be measured, what rate applies to work not in the schedule, and who checks the bills before you pay." },
      { p: "Item-rate contracts suit owners who have their drawings ready and an engineer to measure the work and check each bill." },
      { h2: "Which is cheaper?" },
      { p: "A labour contract often looks cheapest at first, because the quote covers only the labour. That figure cannot be compared with a turnkey or item-rate quote until you add every material, the design fees, transport and wastage, and the time you will spend managing it all." },
      { p: "The fair way to compare is to price the same scope, at the same specification, item by item. That is what a BoQ does. Our guide to [reading a construction BOQ](/blog/how-to-read-a-construction-boq) shows how to put two quotes side by side and spot what one of them leaves out." },
      { h2: "If you choose a labour or item-rate contractor" },
      { p: "You can still have engineers on your side without a turnkey contract. We prepare [detailed estimates and BoQs](/services/detailed-estimation-costing) that set out the quantities and specifications, so you can price materials and compare contractors on the same basis." },
      { p: "Through our [construction consulting service](/services/construction-work-consulting), we review contractor bids before you sign, inspect the work at the stages that matter most, such as footings and slab casting, and check each bill against the BoQ and the work actually done. We work for you, not the contractor." },
      { h2: "Coimbatore and the Nilgiris" },
      { p: "On a hill site the choice of contract matters more, because getting materials to the plot is harder. At the [Pricol tea bungalow in Gudalur](/projects/pricol), the access route crossed a river. At [Christus Rex Higher Secondary School in Ooty](/projects/rex-school), material transport and heavy rain shaped the programme. Under a labour contract, you carry those logistics yourself, so plan for them before you choose. Our [Ooty and Nilgiris page](/locations/nilgiris-ooty) explains how we work across the district." },
      { h2: "Questions to ask before you sign" },
      { ul: [
        "Who prepares the architectural and structural drawings?",
        "Which materials does the contractor supply, and which do you buy?",
        "What is excluded from the quote?",
        "How are changes priced, and are they agreed in writing before the work is done?",
        "How will quantities be measured, and who checks the bills?",
        "What are the stage payments, and what work must be finished at each stage?",
      ] },
      { p: "Our list of [questions to ask a building contractor](/blog/questions-to-ask-building-contractor-coimbatore-nilgiris) covers the rest of a first meeting." },
      { h2: "Talk it through with us" },
      { p: "Bring your plot documents and any drawings to our [Coimbatore office](/locations/coimbatore) or [Gudalur branch](/locations/gudalur). We will explain how a turnkey contract would work for your house, or what you need in place if you prefer to manage a labour or item-rate contractor yourself." },
    ],
  },
];

/** Reading time in minutes, at about 200 words a minute. */
export function readingMinutes(post: BlogPost): number {
  const words = post.body
    .flatMap(blockText)
    .join(" ")
    .split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

/** "23 October 2026" style dates, independent of the server's locale. */
export function formatPostDate(iso: string): string {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${months[m - 1]} ${y}`;
}
