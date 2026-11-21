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
      a: `Yes. We build houses across Coimbatore and the Nilgiris, including Ooty, Coonoor, Kotagiri and Gudalur. ${offices} For hill plots, discuss levels, drainage, access and the permissions applicable to the site before settling the design. Our [Gudalur residence](/projects/residential-building-gudalur) is a completed local example.`,
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
      q: "Do you build villas in Coimbatore?",
      a: "Yes. Villas and bungalows in Coimbatore are designed and built from our head office in Gandhipuram, with the architecture, structure, services and interiors drawn together and priced in an itemised BoQ. Our documented Coimbatore home is a [3,500 sq. ft. house in Perur](/projects/residential-building-perur-coimbatore), completed in 2020. Bring your plot documents and a list of the spaces you want, indoors and out.",
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
  "apartment-construction": [
    {
      q: "Do you build apartments for landowners?",
      a: "Yes. We construct apartment buildings for landowners and clients, from the plans and approval drawings to handover, priced through an itemised BoQ. We also develop apartment projects of our own.",
    },
    {
      q: "What should I check before building apartments on my plot?",
      a: "Check the plot size, road width, setbacks and the number of floors the planning rules allow, because these decide how many units the plot can hold. Parking, water supply and drainage also need to fit. We check these first and prepare the [architectural](/services/architectural-designs) and [structural drawings](/services/structural-drawings).",
    },
    {
      q: "Do you sell apartments?",
      a: `We develop some apartment projects ourselves. Call or message us to ask which are available. ${offices}`,
    },
    {
      q: "How is an apartment building priced?",
      a: "Through an itemised BoQ that lists each item of work, including the structure, lifts, parking, water, drainage and finishes, with quantities and rates. The price is then fixed for the agreed scope. Our [BoQ guide](/blog/how-to-read-a-construction-boq) explains what to check before you sign.",
    },
  ],
  "resort-homestay-construction": [
    {
      q: "Do you build resorts and homestays?",
      a: `Yes. We design and build resorts, homestays and guest cottages. Our completed work includes the [Pricol Limited tea bungalow](/projects/pricol), a 12,120 sq. ft. homestay-style estate bungalow in Gudalur, and [Sasthapuri Hotels](/projects/sasthapuri), a 38,879 sq. ft. commercial building in Gudalur town. More homestay and resort projects are now in the approval stage. ${offices}`,
    },
    {
      q: "What approvals does a resort or homestay need?",
      a: "It depends on the land and the intended use, so check before the design is fixed. A building run for guests can need different permissions from a private house, and hill plots in the Nilgiris district can also need Hill Area Conservation Authority (HACA) clearance. We check what applies to your plot and prepare the [approval drawings](/services/architectural-designs). The authorities make the decision.",
    },
    {
      q: "Can I turn my house or bungalow into a homestay?",
      a: "Often, after an engineer has checked the building. We look at the structure, bathrooms and services, escape routes and parking, and whether the change of use needs a fresh approval. Our [renovation](/services/renovation) service covers the building work.",
    },
    {
      q: "Do you build resorts in Ooty, Coonoor and Kotagiri?",
      a: "Yes. Our Gudalur branch handles projects across the Nilgiris district, including Ooty, Coonoor and Kotagiri. On a hill site, the slope, drainage, monsoon rain and access road are planned before the layout. Our [hill-plot guide](/blog/building-on-sloping-plot-ooty-gudalur) explains what to check.",
    },
    {
      q: "Do you build homestays in Manjoor?",
      a: "Yes. Our Gudalur branch takes homestay and cottage projects across the Nilgiris district, including Manjoor (also spelt Manjur) on the road towards Mulli. Narrow access roads, longer material deliveries, nearby forest land and heavy monsoon rain all shape the plan, so we visit the plot before the design is fixed and price the work through an itemised BoQ.",
    },
    {
      q: "Can NRIs and OCI cardholders build a homestay in Ooty?",
      a: "Yes, on land they are allowed to own. NRIs and OCI cardholders can buy residential and commercial property in India, but not agricultural land, plantation property or farmhouses. Check the plot's classification first, then the approvals for guest use. We can design and build the homestay while you live in the UK, the USA or Australia, sending you the drawings, the itemised BoQ and progress updates.",
    },
    {
      q: "Can outsiders buy property in Ooty?",
      a: "Yes. People from outside the Nilgiris district or outside Tamil Nadu can buy property in Ooty, Coonoor and Kotagiri. What limits a purchase is the land itself: its classification, title, road access and the hill-area rules on what can be built there. Non-residents also cannot buy agricultural or plantation land. Our [property buying advice](/services/property-acquisition-advisory) covers these checks before you pay.",
    },
    {
      q: "How do I get a homestay licence in Tamil Nadu?",
      a: "Start with the building, not the licence. Registering a homestay with the tourism department and getting a licence from the local body only work for a building approved for guest use, and in the Nilgiris district that usually includes HACA clearance. Check the current registration steps with the tourism department and your local body. We prepare the [approval drawings](/services/architectural-designs) for the building itself.",
    },
    {
      q: "How much does it cost to build a homestay or resort in Ooty?",
      a: "It depends on the number of rooms, the specification, the slope and soil, retaining walls and drainage, how far materials travel, and services sized for every room in use. A square-foot rate from a flat city plot does not carry over to a hill site. We price each project with an itemised BoQ after a site visit, so you can compare it line by line. Our [BoQ guide](/blog/how-to-read-a-construction-boq) explains how to read one.",
    },
    {
      q: "Can you help me buy a resort or homestay that is for sale in Ooty?",
      a: "We do not list property for sale, but we can check one before you buy. Our [property buying advice](/services/property-acquisition-advisory) covers title, classification and approval checks, and our engineers can inspect the structure and whether the building is approved for guests. A [structural stability certificate](/services/structural-stability-certificate) is available for an existing building.",
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
      q: "Do you design interiors for homes in Coimbatore and Ooty?",
      a: "Yes. Interiors are designed and installed from our Gandhipuram office for Coimbatore homes, and from our Gudalur branch for homes in Ooty, Coonoor, Kotagiri and Gudalur. In Coimbatore the design is planned around heat, daylight and ventilation; in the cool, damp hills, kitchens, wardrobes and finishes are chosen to cope with moisture. Interiors can be part of a new house or a separate job in an existing one.",
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
      q: "Can NRIs in the UK, USA or Australia invest in a homestay in the Nilgiris district?",
      a: "Yes, on land that non-residents are allowed to own, which rules out agricultural and plantation land. Check the plot's classification and the approvals for guest use before you buy. We can check the property, then design and build the homestay through our [resort and homestay construction](/services/resort-homestay-construction) service while you live abroad.",
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
