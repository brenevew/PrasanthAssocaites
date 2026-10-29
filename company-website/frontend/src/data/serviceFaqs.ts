/**
 * Questions and answers shown on each service landing page and mirrored in its
 * FAQPage structured data. Visible answers and structured data share one source;
 * their presence does not establish search visibility or a rich-result benefit.
 *
 * Rules: answer first in one sentence, then the detail; plain English; only
 * facts the business has confirmed. No prices, guarantees, registrations or
 * brand names, and no em dashes or spaced hyphens. Answers may link with
 * [text](/path); the structured data gets the plain text. The turnkey service has its
 * own long-form page with its own FAQ, so it is not listed here.
 */

export interface ServiceFaq {
  q: string;
  a: string;
}

const offices =
  "Our head office is in Gandhipuram, Coimbatore, and our branch is on Ooty Main Road, Gudalur.";

export const serviceFaqs: Record<string, ServiceFaq[]> = {
  "residential-construction": [
    {
      q: "What does house construction with Prasanth Associates include?",
      a: "The agreed scope can cover design, approval drawings, foundation and structure, waterproofing, electrical and plumbing, flooring and finishes. Ask for an itemised estimate with written inclusions, exclusions and the process for changes. Our [builder-selection guide](/blog/questions-to-ask-building-contractor-coimbatore-nilgiris) explains how to compare the proposed scope with completed work. If you are weighing up contract types, see [turnkey, labour contract or item-rate](/blog/turnkey-vs-labour-contract).",
    },
    {
      q: "How long does it take to build a house?",
      a: "The programme depends on the design, building size, approval process, access and site conditions. Hill projects also need planning around weather-dependent work. Ask for a site-specific schedule that records these assumptions and the decisions needed from you. Dates on completed case studies describe those projects, rather than a standard duration for every house.",
    },
    {
      q: "Do you build houses in Ooty and the Nilgiris?",
      a: `Yes. We build houses across Coimbatore and the Nilgiris, including Ooty, Coonoor, Kotagiri and Gudalur. ${offices} For hill plots, discuss levels, drainage, access and the permissions applicable to the site before settling the design. Our [Gudalur residence](/projects/residential-construction-project) is a completed local example.`,
    },
    {
      q: "How should I compare house builders in Coimbatore?",
      a: "Compare relevant completed houses, the scope shown in the drawings and estimate, supervision arrangements and the process for changes. Our [Perur residence](/projects/residential-building-perur-coimbatore) is a 3,500 sq. ft. house completed in 2020. Use its case study to ask about planning and coordination, then request a proposal based on your own plot and requirements.",
    },
  ],
  "villa-construction": [
    {
      q: "What is included in villa construction?",
      a: "Architectural design, structural engineering, construction and coordinated interiors under one team. Villas usually add features such as double-height living spaces, courtyards, landscaped outdoor areas and smart home wiring, and all of these are planned into the drawings before work starts.",
    },
    {
      q: "Have you built villas or bungalows in the Nilgiris?",
      a: "Yes. One example is a 12,120 sq. ft. tea bungalow for Pricol Limited inside a tea plantation in Gudalur, built between 2015 and 2017. The site could only be reached across a river, so material transport was planned as carefully as the building.",
    },
    {
      q: "What should I send to get a villa quote?",
      a: "Your plot size and location, the number of bedrooms and floors you want, any features you have in mind such as a courtyard or pool, and your planned start date. Photos of the plot and any sketches help. We then visit the site and prepare an itemised estimate.",
    },
    {
      q: "What needs checking before building a villa on a Nilgiris hill plot?",
      a: "Start with site levels, water movement, approach access and the permissions applicable to the plot. The engineer should identify the investigations needed for the proposed structure. Our [hill-plot guide](/blog/building-on-sloping-plot-ooty-gudalur) uses completed Ooty and Gudalur projects to explain access, drainage and weather questions to discuss before agreeing a design or programme.",
    },
  ],
  "commercial-construction": [
    {
      q: "What kinds of commercial buildings do you construct?",
      a: "Shops and showrooms, office buildings, hotels, schools and mixed-use buildings. We handle the architecture, structural engineering, construction and electrical and plumbing services together, so the drawings and the site work stay coordinated.",
    },
    {
      q: "Can you build in a busy town centre?",
      a: "Yes. [Sasthapuri Hotels](/projects/sasthapuri) is a 38,879 sq. ft. commercial building completed in Gudalur in 2016. Its case study records limited working and storage space, phased construction and coordination of material movement. For a new town-centre site, access and storage arrangements need to be assessed for that particular project.",
    },
    {
      q: "Where do you take commercial projects?",
      a: `Across Coimbatore and the Nilgiris. ${offices} We have built commercial and school buildings in Gudalur and Ooty, including Christus Rex Higher Secondary School in Ooty.`,
    },
  ],
  "industrial-factory-construction": [
    {
      q: "What does factory construction include?",
      a: "Pre-engineered building (PEB) sheds and RCC factory buildings, machinery foundations, heavy-duty industrial flooring, drainage, and fire protection networks. We plan the layout around your production flow and the loads your machines put on the floor.",
    },
    {
      q: "What should I send for a factory or shed quote?",
      a: "The plot size and location, the floor area and clear height you need, the type of machinery and its approximate weight, crane requirements if any, and your target start date. A site visit then confirms soil and access before we prepare the estimate.",
    },
    {
      q: "Do you build factories outside Coimbatore?",
      a: `Yes, across Coimbatore and the Nilgiris. ${offices}`,
    },
  ],
  "smart-homes": [
    {
      q: "What can a smart home system control?",
      a: "Lighting scenes, motorised curtains and blinds, air conditioning, door locks and video doorbells, security sensors and multi-room audio, all from one app or by voice. We plan it with wired and wireless controls to suit the house.",
    },
    {
      q: "When should smart home wiring be planned?",
      a: "Before construction, ideally while the electrical drawings are being made. Conduits and control wiring are then concealed in the walls and slabs, which is neater and more reliable than adding devices after the house is finished. Existing homes can still be upgraded with wireless devices.",
    },
    {
      q: "Do you install smart home systems in the Nilgiris?",
      a: `Yes, in new and existing homes across Coimbatore and the Nilgiris. ${offices}`,
    },
  ],
  renovation: [
    {
      q: "What renovation work do you take on?",
      a: "Full house renovations, layout changes, kitchen and bathroom upgrades, waterproofing repairs, structural strengthening and adding floors to existing buildings. Our engineers assess the existing structure before any wall is removed or floor is added.",
    },
    {
      q: "Can you renovate older or heritage buildings?",
      a: "Yes. We renovated the British-era Director's Building at Manjushree Plantation in New Hope, O'Valley, in the Nilgiris, a 4,904 sq. ft. building set among cardamom plants. The work started with assessing the old structure's condition.",
    },
    {
      q: "Can I add a floor to my existing house?",
      a: "Feasibility depends on the existing structure, proposed loads and permissions applicable to the building. Start with an engineer's assessment and any available original drawings. The assessment should establish whether further investigation or strengthening is needed before deciding on an additional floor; the existing building's appearance alone cannot establish its capacity.",
    },
  ],
  "construction-work-consulting": [
    {
      q: "What does construction consulting involve?",
      a: "We act as your independent engineers while another contractor builds. That includes site inspections at key stages, checking work against the drawings, reviewing the contractor's bills and BoQ, and advising on material quality. We work for you, not the contractor.",
    },
    {
      q: "When is a site inspection most useful?",
      a: "Inspection before concrete placement is an important stage because reinforcement becomes harder to inspect once covered. Waterproofing before finishes is another useful checkpoint. Agree the inspection stages with the engineer for your project, including what needs to be reviewed and recorded before the next activity proceeds.",
    },
    {
      q: "Can you review my contractor's bill?",
      a: "Yes. We compare running bills and the final bill with the agreed BoQ and the work actually done on site, and report any differences in quantities or rates in writing.",
    },
  ],
  "architectural-designs": [
    {
      q: "What do your architectural design services include?",
      a: "2D floor plans drawn for your plot, 3D front elevations, approval (sanction) drawings and working drawings for your builder. Vastu-based planning is available on request. The structural, electrical and plumbing drawings can be prepared alongside so they all agree.",
    },
    {
      q: "What should I have ready before getting a house plan drawn?",
      a: "Your plot documents (sale deed, patta, FMB sketch), the plot measurements and which side faces the road, a list of rooms and how your family will use them, any Vastu preference, and a realistic budget. [Our article on preparing for a house plan](/blog/before-you-draw-a-house-plan) explains each one.",
    },
    {
      q: "Can you get my building plan approved?",
      a: "We can assist with approval drawings, application preparation and follow-up. The applicable authority and document requirements depend on the plot and proposal, so confirm them for your site before submission. Approval is the authority's decision. Agree the application support included in your appointment, whether it is a separate service or part of a construction project.",
    },
    {
      q: "What should I check before planning a building in Ooty or the Nilgiris?",
      a: "Bring the plot documents, available survey, site photographs and intended building use. Ask the design team to check site levels, access, water movement and the permissions applicable to that land. Our [Nilgiris builder guide](/blog/questions-to-ask-building-contractor-coimbatore-nilgiris) explains how to discuss these questions alongside supervision and the proposed construction scope.",
    },
  ],
  "interior-designs": [
    {
      q: "What is included in your interior design service?",
      a: "The service covers layouts for kitchens, wardrobes, ceilings, lighting, TV units, pooja units and storage, with visualisations to review the proposal. Agree the rooms, drawings, materials and installation responsibilities in your scope. Coordinating those decisions before work starts helps the design and site teams work from the same requirements.",
    },
    {
      q: "Can I see the interiors before they are built?",
      a: "Yes. We prepare 3D views of each room for you to review and change. Once you approve them, our team works from those views and drawings on site, and any change is discussed with you first.",
    },
    {
      q: "Do you do interiors for offices and cafés too?",
      a: "Yes. Our design work includes office interiors and café interiors as well as homes. Examples are on our projects page under Commercial Interiors.",
    },
  ],
  "structural-drawings": [
    {
      q: "What are structural drawings and why do I need them?",
      a: "They show how the building stands up: footing sizes, column positions, beam and slab reinforcement and bar bending schedules. Builders use them on site, and approval authorities and banks often ask for them. They are designed from your architectural plan and the soil test results.",
    },
    {
      q: "Do I need a soil test before structural design?",
      a: "Ask the structural engineer to specify the ground investigation needed for your plot and proposed building. Ground conditions inform foundation design alongside building loads, levels and other site constraints. A neighbouring building or a standard house plan cannot establish the foundation requirements for your site.",
    },
    {
      q: "Can you prepare structural drawings for another architect's plan?",
      a: "Yes. Send us the architectural drawings and plot details, and we design the structure to match. We coordinate with your architect if the structure needs any change to the layout.",
    },
  ],
  "electrical-drawings": [
    {
      q: "What do electrical drawings show?",
      a: "They show proposed switches, sockets, lighting and fan points, circuits, distribution boards and earthing arrangements. They support coordination of room requirements and electrical loads. Safety also depends on appropriate design, equipment, installation and testing; a drawing by itself does not establish that an installed system is safe.",
    },
    {
      q: "Why plan electrical points before construction?",
      a: "Conduits are laid inside slabs and walls during construction. Planning the points first avoids breaking walls later to add sockets, and it is the time to allow for air conditioners, a car charger, solar or smart home wiring.",
    },
    {
      q: "Do you prepare electrical drawings on their own?",
      a: `Yes, as a separate service or together with the architectural and structural drawings. ${offices}`,
    },
  ],
  "plumbing-drawings": [
    {
      q: "What do plumbing drawings include?",
      a: "They show water supply, hot and cold water routes, drainage and waste pipes, inspection chambers, storage and rainwater arrangements. Testing requirements should be specified for the particular system, with checks planned before concealed work is covered. The appropriate test for a water supply line may differ from a drainage test.",
    },
    {
      q: "Why do plumbing drawings matter?",
      a: "They help coordinate wet areas, pipe routes, access for maintenance and connections before construction work conceals them. Reviewing the routes with architectural and structural drawings can identify clashes early. Installation quality and testing still matter; having drawings does not eliminate the possibility of leaks or later changes.",
    },
    {
      q: "Do you include rainwater harvesting?",
      a: "Yes. Rainwater harvesting is part of our plumbing drawings and is designed to the requirements that apply to your plot.",
    },
  ],
  "landscaping-designs": [
    {
      q: "What does landscape design include?",
      a: "A garden layout and planting plan, lawns, pathways and driveways, drip and sprinkler irrigation, outdoor lighting and seating areas, and terrace or balcony gardens. We choose plants suited to the local climate so the garden is easy to maintain.",
    },
    {
      q: "Do you design gardens for hill properties in the Nilgiris?",
      a: `Yes. Sloping hill plots need careful drainage and plants that suit the cooler climate, and we plan for both. ${offices}`,
    },
    {
      q: "Can landscaping be planned together with the house?",
      a: "Yes. Planning driveways, drainage, outdoor lighting and irrigation alongside the building helps coordinate external levels and service routes. Discuss these requirements before external finishes are installed, so the landscape and building teams can identify work that needs to happen in sequence.",
    },
  ],
  "bank-valuation-report": [
    {
      q: "What is a bank valuation report?",
      a: "It is an engineer's report stating the fair market value of a property, prepared after checking the documents and inspecting the site. Banks ask for one before a home loan, mortgage or loan against property. It is also used for visa and net worth purposes.",
    },
    {
      q: "What documents are needed for a property valuation?",
      a: "Usually the title deed, patta and chitta, parent documents, encumbrance certificate and the approved building plan, if there is a building. Share your bank's checklist and format at the start, because each bank has its own.",
    },
    {
      q: "Will my bank accept the report?",
      a: "Acceptance is decided by the bank. We prepare the report to the bank's checklist and format, so ask your bank which valuers it accepts before you book the inspection.",
    },
  ],
  "structural-stability-certificate": [
    {
      q: "What is a structural stability certificate?",
      a: "It is an engineer's certificate confirming that a building is structurally safe for its use. Schools, factories and some licensing authorities ask for one. It is issued after an inspection of the structure, and lists any repairs needed first.",
    },
    {
      q: "What happens during a stability inspection?",
      a: "Our engineer checks the columns, beams, slabs and foundations for cracks, corrosion and settlement, reviews the loads the building carries and, where needed, carries out tests on the concrete. The findings and any required repairs are written into the report.",
    },
    {
      q: "Who needs a stability certificate?",
      a: "Commonly schools for recognition, factories for licence renewals, and owners planning to add a floor or change a building's use. Ask the authority requesting it for its format, and share it with us before the inspection.",
    },
  ],
  "detailed-estimation-costing": [
    {
      q: "What is a BOQ, or bill of quantities?",
      a: "A document that lists every item of construction work with its quantity and rate: excavation, concrete, steel, brickwork, plastering, flooring, painting, electrical and plumbing. It shows exactly what the total cost is made of, which a single rate per square foot cannot.",
    },
    {
      q: "How does a detailed estimate help me?",
      a: "It helps you compare contractor quotes line by line, identify missing items or allowances, plan cash flow and check bills during construction. Ask which drawings, quantities, specifications and pricing assumptions the estimate uses. Record how provisional items and subsequent changes will be measured and priced.",
    },
    {
      q: "What do you need to prepare an estimate?",
      a: "The architectural drawings, the structural drawings if they exist, and your choice of finishes. Without drawings we can give an approximate estimate from the plan size, and refine it once the drawings are ready.",
    },
  ],
  "chartered-engineer-valuation": [
    {
      q: "What is a technical asset valuation?",
      a: "It assesses plant, machinery, industrial buildings or other fixed assets using an inspection and an agreed valuation basis. Condition, age and available asset records inform the assessment. Tell us the intended recipient and purpose before booking, and confirm their requirements for the report and who may prepare it.",
    },
    {
      q: "What do you need for a machinery valuation?",
      a: "Provide the asset list with makes, models and years, available purchase invoices and access to inspect the machines. Share the intended recipient's checklist and report requirements first, including any requirements for the person preparing it, so the proposed appointment can be checked against that purpose.",
    },
    {
      q: "Do you value assets outside Coimbatore?",
      a: `Yes, across Coimbatore and the Nilgiris. ${offices}`,
    },
  ],
  "property-acquisition-advisory": [
    {
      q: "What does property buying advice include?",
      a: "Help finding a property that fits your needs, checking the title documents, encumbrance certificate and approvals before you pay an advance, a site and structural assessment where there is a building, and support through registration.",
    },
    {
      q: "What should I check before buying a plot or house?",
      a: "The title chain and parent documents, the encumbrance certificate, patta and chitta in the seller's name, the FMB sketch against the land on the ground, layout or building approvals, and road access. We review these and report any concerns to you in writing.",
    },
    {
      q: "Which areas do you advise on?",
      a: `Properties across Coimbatore and the Nilgiris. ${offices}`,
    },
  ],
  "land-plot-transactions": [
    {
      q: "How do you help with buying or selling land?",
      a: "We help find suitable plots, verify the title and encumbrance records, survey the boundaries against the FMB sketch, check zoning and approvals, and support the sale deed, registration and mutation.",
    },
    {
      q: "Why is a boundary survey important?",
      a: "A survey compares measurements on the ground with the available boundary records and can identify discrepancies before a transaction. Ask the surveyor to explain any differences and have unresolved boundary or title questions reviewed before proceeding. A survey does not by itself resolve ownership disputes.",
    },
    {
      q: "Which areas do you cover for land transactions?",
      a: `Coimbatore and the Nilgiris. ${offices}`,
    },
  ],
  "real-estate-investment-consulting": [
    {
      q: "What does property investment consulting include?",
      a: "Analysis of locations and their growth, rental yield and return estimates, checking the risks of a specific property, and planning how and when to exit. Recommendations are based on market data and infrastructure plans that we share with you.",
    },
    {
      q: "Do you advise NRIs investing in property?",
      a: "Yes. We help with choosing and checking property, documentation and, if needed, managing the property after purchase through our property management service.",
    },
    {
      q: "Which markets do you advise on?",
      a: `Coimbatore and the Nilgiris. ${offices}`,
    },
  ],
  "property-portfolio-management": [
    {
      q: "What does property management include?",
      a: "Finding and screening tenants, rent collection, maintenance and repairs, regular inspections and monthly reports on rent, costs and the property's condition. It suits owners who live elsewhere, including NRIs.",
    },
    {
      q: "How will I know what is happening with my property?",
      a: "You receive a monthly report covering tenant status, rent received, maintenance done and its cost, and the property's condition.",
    },
    {
      q: "Which areas do you manage properties in?",
      a: `Coimbatore and the Nilgiris. ${offices}`,
    },
  ],
};
