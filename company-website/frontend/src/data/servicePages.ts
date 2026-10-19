import type { ProjectCategory } from "./projects";
import { serviceRoutes, type ServiceSlug } from "./serviceLinks";
import { serviceSearchTerms } from "./serviceSearchTerms";

/**
 * "both": one page covers Coimbatore and the Nilgiris (the service is the same
 * in either region). "coimbatore" / "nilgiris": the service has a separate page
 * per region because hill conditions change the work.
 */
export type ServiceLocation = "coimbatore" | "nilgiris" | "both";

interface ServicePage {
  slug: string;
  /** Which region(s) the page covers. */
  location?: ServiceLocation;
  serviceSlug: ServiceSlug;
  title: string;
  metadataTitle?: string;
  description: string;
  intro: string;
  projectCategory?: ProjectCategory;
  sections: { title: string; text: string }[];
  /** "What we cover" cards, e.g. the rooms an interior service includes. */
  scopeItems?: { title: string; text: string }[];
  /** Ordered steps of how the service is delivered. */
  process?: { title: string; text: string }[];
  processNote?: string;
  /** Show the design gallery photos whose file path matches this filter. */
  designGallery?: "interiors";
  questions: { question: string; answer: string }[];
  /** Standard search phrases plus other names for the service (meta + schema only). */
  keywords?: string[];
  aliases?: string[];
}

/** Editorial pages for services with enough distinct information to stand alone. */
const servicePageContent: (Omit<ServicePage, "slug"> & { slug?: string })[] = [
  {
    location: "coimbatore",
    serviceSlug: "residential-construction",
    title: "House Construction in Coimbatore",
    description: "House construction in Coimbatore by Prasanth Associates, home builders and building contractors. Plan your house, compare costs and see our projects.",
    intro: "Planning an independent house or duplex in Coimbatore starts with how you want to live: the rooms you need, the space available and the budget you can commit. Prasanth Associates brings architectural planning and construction together so those decisions can be considered before work begins on site.",
    projectCategory: "residential",
    sections: [
      { title: "Plan the home around your plot", text: "Share the plot dimensions, road access, preferred number of floors and room requirements. Include parking, stairs, daylight, ventilation and any Vastu preferences in the brief. The building planner helps you collect these requirements for the team to review; it does not replace a site assessment or approved drawings." },
      { title: "Understand the construction scope", text: "Discuss the foundation, structure, waterproofing, electrical and plumbing work alongside finishes. Record material specifications and responsibilities in the project scope. If you already have drawings, send them with the enquiry so the discussion can focus on construction requirements and any information still needed." },
      { title: "Compare the complete budget", text: "A square-foot rate is only useful when the included work is clear. Plot conditions, floor area, structural requirements, finish selections and external works affect the scope. Ask for an itemized bill of quantities and clarify how design fees, approvals, utility connections and later changes will be handled before agreeing the contract." },
      { title: "Homes we build in Coimbatore", text: "We build 2 BHK and 3 BHK independent houses, duplex homes, larger family houses and villas, designed to Vastu where you want it, as well as renovation and rebuilding of older homes. Every house is planned for its own plot, budget and family rather than adapted from a standard plan. Our completed work in Coimbatore includes a two-storey house in Perur, shown in our project portfolio, and projects in Gandhipuram, where our office is." },
      { title: "Areas we cover across Coimbatore", text: "From our office on Sathy Road, Gandhipuram, we take up house construction anywhere in Coimbatore (Kovai), including RS Puram, Saibaba Colony, Race Course, Peelamedu, Avinashi Road, Saravanampatti, Kalapatti, Ganapathy, Thudiyalur, Vadavalli, Perur, Singanallur, Podanur and Sundarapuram. Send your plot location and our engineers will review it and arrange a site visit." },
      { title: "Design and drawings for your house", text: "Your house is designed before it is built: a site plan and architectural floor plans for every floor, 3D elevation views, structural drawings with footing, column, beam and slab schedules, electrical and plumbing layouts, and the approval drawings for sanction. Interior designs for the kitchen, wardrobes and living spaces can be added. The drawings are revised with you before submission, so the plan is settled before construction starts." },
      { title: "Construction stages, from soil test to handover", text: "Each house follows the same sequence: site feasibility and a soil test (SBC and bore log), design and drawings, an itemized BoQ and contract, approval filing, then excavation, foundation and structure, with cube test reports for the concrete. Masonry, electrical and plumbing work follow, then flooring, doors, windows and painting. The house is handed over after a joint snag-list walkthrough, with as-built drawings and warranty documents. An engineer inspects each stage against a checklist before the next one starts." },
      { title: "Materials and specification", text: "The structure uses Fe550D TMT steel and 53-grade cement, with footings designed from your soil test. Waterproofing is applied in layers on the roof slab, sunken bathrooms and foundation. Finishes include vitrified tiles, quality sanitary fittings and washable emulsion paint, and the house can be pre-piped for a rainwater percolation pit and rooftop solar. Every material grade, brand allowance and quantity is written line by line into your BoQ, so you can compare it with any other quote." },
      { title: "Approvals in Coimbatore", text: "Which authority approves your plan depends on where the plot is. Plots within Coimbatore City Municipal Corporation limits go through CCMC's building plan sanction, while plots in surrounding panchayats and growth areas usually fall under a Local Planning Authority (LPA) or DTCP, each with its own setback and FSI rules. We check the jurisdiction first, prepare the approval drawings to suit it, and file and follow up the application until it is approved." },
      { title: "Fixed price and milestone payments", text: "The itemized BoQ signed before construction fixes the price, specification and brands. The cost only changes if you ask for a change, such as a better finish or a different layout, and any change is written down and priced before the work is done. Payments are linked to construction milestones set out in the contract, so you pay as each stage is completed." },
    ],
    questions: [
      { question: "How much does it cost to build a house in Coimbatore?", answer: "The house construction cost depends on built-up area, number of floors, site conditions, materials and the agreed scope. Send your plot details and room requirements for a quote, and compare what each square-foot rate includes before choosing a builder." },
      { question: "Can I enquire before I have a floor plan?", answer: "Yes. Send your plot dimensions, room requirements and any sketches or reference images. You can use the building planner to organize the brief before requesting a quote." },
      { question: "What information helps with a construction quote?", answer: "Provide the site location, plot dimensions, proposed floors, approximate built-up area and preferred finishes. Existing drawings and site photographs help the team understand your requirements." },
      { question: "Can I include Vastu preferences?", answer: "Yes. Include your preferences in the initial brief so they can be considered alongside space planning, daylight and the plot layout." },
      { question: "Can I see houses you have built in Coimbatore?", answer: "Yes. Our project portfolio includes a two-storey house in Perur, Coimbatore, with photographs taken during and after construction. Ask the team about other completed homes similar to the house you are planning." },
      { question: "Do you handle building plan approval in Coimbatore?", answer: "Yes. We check whether your plot falls under CCMC, an LPA or DTCP, prepare the approval drawings to suit, and file and follow up the application until it is approved." },
      { question: "Is the price fixed once construction starts?", answer: "Yes. The itemized BoQ signed before construction fixes the price and specification. The cost only changes if you request a change, and any change is priced and agreed before the work is done." },
      { question: "How are payments made during house construction?", answer: "Payments are linked to construction milestones, such as foundation, roof slab and finishing, which are set out in the contract. You pay as each stage is completed." },
      { question: "How is construction quality checked?", answer: "An engineer inspects each stage against a checklist before the next stage starts, and cube test reports are issued for the concrete. Before handover, the house is checked in a joint snag-list walkthrough." },
      { question: "What warranty do you give on house construction?", answer: "Structural work, including the RCC frame, footings and substructure waterproofing, carries a workmanship warranty documented in the contract. Manufacturer warranties on fittings, electrical components and finishes are handed over to you at completion." },
      { question: "What is not included in a per sq ft construction rate?", answer: "It varies between builders. Items often priced separately include the compound wall and gate, sump and septic tank, electricity connection, approval fees and a lift. Your BoQ from us lists each item, so you can see exactly what is and is not included." },
      { question: "Can you build a duplex house or a villa in Coimbatore?", answer: "Yes. We build duplex homes and villas as well as independent houses. Villas have their own page, covering design features, finishes and external works." },
      { question: "Can interiors be included with house construction?", answer: "Yes. Interiors such as the modular kitchen and wardrobes can be included in the same contract, so one team takes the house from plan to move-in. The BoQ lists exactly which interior items are included." },
    ],
  },
  {
    location: "coimbatore",
    serviceSlug: "villa-construction",
    title: "Villa Construction in Coimbatore",
    description: "Villa construction in Coimbatore by Prasanth Associates. Explore design choices, finish coordination, project photographs and planning your villa brief.",
    intro: "A villa brings the building, interiors and outdoor spaces into one design. Prasanth Associates offers villa construction in Coimbatore, coordinating architectural features and finishing work through the project team. Start with a brief that explains your priorities, from private family spaces to entertaining and outdoor living.",
    projectCategory: "villa",
    sections: [
      { title: "Choose the spaces that matter to you", text: "Double-height living rooms, courtyards, large glazed openings and terraces each change how a home feels and functions. Identify which features are essential and which are optional. Consider privacy, daylight, upkeep and how the spaces connect rather than selecting features only from reference photographs." },
      { title: "Coordinate finishes and building services", text: "Marble, joinery, lighting, glazing and automation need to fit the architectural plan. Discuss selections while the drawings and scope are being developed, including where equipment, conduits and access for maintenance will go. This gives the team a clearer brief for coordinating the trades involved in the build." },
      { title: "Define the villa budget and external works", text: "A villa budget should distinguish the main building from interiors, landscaping, boundary walls and optional features such as a pool. Specifications and quantities make proposals easier to compare. Confirm the agreed scope and responsibility for each package, including the process for reviewing a change in material or design." },
    ],
    questions: [
      { question: "Can I include a courtyard or double-height living area?", answer: "These are features offered within the villa service. Share your preferences at the brief stage so the design can be considered against the plot, structure and budget." },
      { question: "Should interiors be considered before construction?", answer: "Discuss them early. Furniture layouts, lighting, plumbing and automation requirements influence decisions that are easier to coordinate while drawings are being prepared." },
      { question: "Can I see examples of your villa work?", answer: "Yes. The Pricol Limited tea bungalow in Gudalur, a 12,120 sq. ft. residence built within a tea plantation, includes photographs taken during construction. Use the project links below to browse it." },
    ],
  },
  {
    location: "both",
    serviceSlug: "commercial-construction",
    title: "Commercial Construction in Coimbatore & the Nilgiris",
    metadataTitle: "Commercial Construction, Coimbatore & Nilgiris",
    description: "Commercial construction in Coimbatore and the Nilgiris: offices, shops, showrooms and mixed-use buildings, from design and approvals to handover.",
    intro: "An office, retail building or mixed-use development needs a brief built around its intended use. Prasanth Associates offers commercial construction in Coimbatore and the Nilgiris, bringing building design, construction and service coordination into the project discussion. Tell us who will use the building and how the space needs to operate.",
    projectCategory: "commercial",
    sections: [
      { title: "Define how the building will be used", text: "Start with the proposed use, number of floors, approximate floor area and expected occupancy. Identify customer access, staff circulation, deliveries, parking and any tenant requirements. For a mixed-use building, explain how the different uses should connect and which facilities they will share." },
      { title: "Coordinate structure and building services", text: "Commercial projects bring together floor layouts, structural spans, service shafts, electrical loads, plumbing and vertical circulation. Discuss these together while the scope is being developed. Fire and life-safety requirements and the approvals applicable to the site need project-specific review; an enquiry or preliminary layout is not an approval." },
      { title: "Separate shell construction from fit-out", text: "Clarify whether the brief covers the building shell, common areas, tenant interiors or all three. Facades, lifts, building services and finish specifications affect the budget and sequence of work. Existing drawings, a tenant brief and the desired opening date help identify what needs to be resolved before a construction programme is agreed." },
    ],
    questions: [
      { question: "What types of commercial building can I discuss?", answer: "The service covers offices, retail arcades, commercial complexes and mixed-use buildings. Describe the intended use and site location when requesting a quote." },
      { question: "What should I include in my enquiry?", answer: "Share the plot details, proposed use, floor area, drawings if available, and whether the scope includes tenant interiors. Include your target schedule and any access constraints." },
      { question: "Can you review an existing commercial design?", answer: "Send the available drawings and explain whether you need construction, design coordination or independent project consulting. The team can then discuss the relevant service and information needed." },
    ],
  },
  {
    location: "both",
    serviceSlug: "industrial-factory-construction",
    title: "Factory & PEB Sheds in Coimbatore & the Nilgiris",
    metadataTitle: "Factory & PEB Sheds in Coimbatore & Nilgiris",
    description: "Factory, warehouse and PEB shed construction in Coimbatore and the Nilgiris. Steel sheds, industrial floors, crane beams and factory approvals.",
    intro: "Prasanth Associates offers factory construction and industrial shed building in Coimbatore and the Nilgiris. A PEB, or pre-engineered building, uses a designed steel frame to create space for manufacturing, storage or a workshop. We discuss the building together with the equipment, vehicle access and services it needs.",
    sections: [
      {
        title: "Factory shed, warehouse or workshop?",
        text: "Describe what happens inside the shed before choosing its size. A storage warehouse needs access for goods and vehicles; a manufacturing unit may need machine foundations, lifting equipment and separate work areas. Share the required clear height, span, loading arrangements and any plans for future expansion."
      },
      {
        title: "Plan the industrial construction scope",
        text: "Discuss steel fabrication, foundations, roofing, floor finish, drainage, ventilation and electrical requirements together. Crane loads and machinery details affect the engineering brief. Ask the team to separate civil works, equipment and approval-related work in the proposal so that the responsibility for each package is clear."
      }
    ],
    questions: [
      {
        question: "Can you build a factory shed in Coimbatore?",
        answer: "Yes. The industrial construction service covers factories, PEB steel sheds, warehouses and workshops. Send the site location and the intended use so the team can discuss a suitable scope."
      },
      {
        question: "How much does a PEB shed cost?",
        answer: "The quote depends on covered area, clear height, structural span, equipment loads, roofing and floor specifications. Send these details for an itemized proposal; a shed rate alone does not describe the complete project."
      },
      {
        question: "Can I send a machinery layout before the building plan?",
        answer: "Yes. Machine positions, foundation requirements and material movement help define the building layout. Include information supplied by your equipment vendors."
      }
    ]
  },
  {
    location: "both",
    serviceSlug: "smart-homes",
    title: "Home Automation in Coimbatore & the Nilgiris",
    metadataTitle: "Home Automation in Coimbatore & Nilgiris",
    description: "Smart home automation in Coimbatore and the Nilgiris for lighting, curtains, security and climate. Wired systems for new homes, wireless for existing ones.",
    intro: "Make lighting, curtains, security and room controls work together with smart home automation in Coimbatore and the Nilgiris. Prasanth Associates coordinates automation with electrical planning and interiors, whether you are building a new house or considering changes to an existing home.",
    sections: [
      {
        title: "Choose what you want to control",
        text: "Start with daily routines: switching off lights when you leave, opening curtains in the morning or checking entry access. Identify the rooms and devices involved. Lighting scenes, motorized curtains, climate control, cameras and access systems should be planned around the people using the home."
      },
      {
        title: "Wired automation or a wireless retrofit",
        text: "In a new build, cable routes and equipment locations can be coordinated before plastering. For a completed house, discuss wireless options and how much alteration you are comfortable with. Existing wiring, network coverage, device compatibility and the need for physical switches all shape the proposed system."
      }
    ],
    questions: [
      {
        question: "Can I make my existing house a smart home?",
        answer: "Existing homes can be reviewed for retrofit automation. Share the rooms, current switches and devices you want to control; the team can discuss which changes fit the property."
      },
      {
        question: "Can lights and curtains work from my phone?",
        answer: "Lighting and motorized curtain control are part of the service. The available phone, wall-panel and voice controls depend on the selected equipment and its compatibility."
      },
      {
        question: "What affects home automation cost?",
        answer: "The number of rooms, control points, devices, cabling changes and integration requirements affect the quote. A room-by-room list makes different proposals easier to compare."
      }
    ]
  },
  {
    location: "both",
    serviceSlug: "renovation",
    title: "House Renovation in Coimbatore & the Nilgiris",
    metadataTitle: "House Renovation in Coimbatore & Nilgiris",
    description: "House renovation and retrofitting in Coimbatore and the Nilgiris: old-home repairs, new layouts, waterproofing, rewiring and structural strengthening.",
    intro: "Prasanth Associates renovates older houses and other buildings in Coimbatore and the Nilgiris. The work can include a home makeover, revised room layouts, plumbing and electrical upgrades, waterproofing or structural strengthening. The starting point is understanding the existing building and the changes you need.",
    sections: [
      {
        title: "Separate repairs from a home makeover",
        text: "List the problems you want to solve, such as leaks, worn finishes, inconvenient rooms or outdated services. Add photographs and any available drawings. Cosmetic work and structural alterations need different assessments, so identify which requests change the appearance and which affect the building itself."
      },
      {
        title: "Plan work around an occupied building",
        text: "Tell the team whether people will remain in the property during renovation. Access, dust, noise, storage and temporary interruptions to water or power affect the work sequence. Agree which rooms will be available at each stage and document what happens if hidden defects are found after opening up finishes."
      }
    ],
    questions: [
      {
        question: "Can you renovate an old house in Coimbatore?",
        answer: "Yes. Share the location, approximate building age, photographs and the repairs or layout changes you have in mind. An assessment helps distinguish refurbishment from structural retrofitting."
      },
      {
        question: "Can I remove a wall or add another floor?",
        answer: "These changes need a project-specific structural assessment before a scope can be agreed. Send existing drawings if available and describe the proposed change; photographs alone are not enough to determine feasibility."
      },
      {
        question: "How is house renovation cost estimated?",
        answer: "The estimate depends on the condition of the building, work area, repair scope, finish choices and access. Ask for separate items for repairs, new work and any provisional allowances."
      }
    ]
  },
  {
    location: "both",
    serviceSlug: "construction-work-consulting",
    title: "Construction Consulting in Coimbatore & the Nilgiris",
    metadataTitle: "Construction Consulting, Coimbatore & Nilgiris",
    description: "Construction consulting in Coimbatore and the Nilgiris: site supervision, quality inspections, contractor bill checks, BOQ reviews and handover.",
    intro: "If you already have a building contractor, Prasanth Associates can support you with construction consulting and project management in Coimbatore and the Nilgiris. An independent engineering review can help you understand site progress, workmanship, quantities and contractor payment requests.",
    sections: [
      {
        title: "Site supervision with a clear brief",
        text: "Explain whether you need periodic inspections, milestone reviews or broader project coordination. Share the approved drawings, agreed specifications, schedule and current construction stage. Define inspection frequency and reporting expectations so that the consulting role is clear to both you and the contractor."
      },
      {
        title: "Review bills, quality and handover",
        text: "Contractor bill checks compare the claimed work with the contract scope and supporting measurements. Quality reviews can cover workmanship, available material test records and outstanding defects. At handover, a documented snag list helps you track what remains to be completed and who is responsible for closing each item."
      }
    ],
    questions: [
      {
        question: "Can an engineer check work done by my contractor?",
        answer: "Yes. Independent site quality inspections and construction consulting are offered. Send the site location, construction stage and the particular work you want reviewed."
      },
      {
        question: "Can you check whether my building bill is correct?",
        answer: "The team can review contractor quantities and BOQ rates against the agreed scope and available records. Provide the contract, drawings, bill and measurement details where available."
      },
      {
        question: "Do I need to change my builder?",
        answer: "The consulting service can support an existing project team. Agree the consultant’s responsibilities, reporting and access to the site before the engagement starts."
      }
    ]
  },
  {
    location: "coimbatore",
    serviceSlug: "architectural-designs",
    title: "House Plans & Architecture in Coimbatore",
    metadataTitle: "House Plans & 3D Elevation Design in Coimbatore",
    description: "2D floor plans, 3D elevations, working drawings and approval drawings for homes and commercial buildings in Coimbatore. Send your plot size to start.",
    intro: "A good house plan starts with your plot and how you want to use each room. Prasanth Associates offers architectural design in Coimbatore, from an initial layout and floor plan to coordinated working drawings for construction. You can enquire with a plot sketch before a detailed plan exists.",
    sections: [
      {
        title: "Turn your room list into a floor plan",
        text: "Share plot dimensions, road-facing direction, required floors, bedrooms, parking and any Vastu preferences. Include how your household may change over time. Room relationships, daylight, ventilation and stairs should be considered together, rather than fitting rooms into a plan selected only for its appearance."
      },
      {
        title: "Know which drawings you are requesting",
        text: "A concept layout explains how space is organized. Working drawings provide the detail needed by the construction team. Discuss whether your scope also needs elevations, structural drawings or electrical and plumbing layouts. Agree drawing stages, revisions and coordination responsibilities before the design work begins."
      }
    ],
    questions: [
      {
        question: "Can you draw a 2 BHK or 3 BHK house plan?",
        answer: "Yes. Share your plot dimensions, preferred floors and room requirements. The architectural planning discussion considers the layout, circulation and the space available on your site."
      },
      {
        question: "Can I get only the building plan without construction?",
        answer: "Architectural design is offered as a separate service. Specify which drawings you need and whether another contractor will execute the work."
      },
      {
        question: "Can you include Vastu in my house plan?",
        answer: "Include your Vastu preferences in the brief so they can be considered alongside the plot, room layout, daylight and ventilation."
      }
    ]
  },
  {
    location: "both",
    serviceSlug: "structural-drawings",
    title: "Structural Drawings in Coimbatore & the Nilgiris",
    metadataTitle: "Structural Drawings in Coimbatore & Nilgiris",
    description: "Structural drawings in Coimbatore and the Nilgiris for foundations, columns, beams and RCC slabs, designed from your soil report and building plan.",
    intro: "Structural drawings explain how the building is supported, from its foundation to its roof slab. Prasanth Associates prepares RCC structural drawings in Coimbatore and the Nilgiris, coordinating footing layouts, column positions, beams and reinforcement details with the architectural design.",
    sections: [
      {
        title: "Bring the architectural plan and soil information",
        text: "The structural brief needs the proposed use, floor count, room layouts and available site investigation information. Tell the engineer about tanks, large openings, equipment or intended future floors. These inputs help define the design scope and identify missing information before detailed drawings are prepared."
      },
      {
        title: "Drawings the site team can coordinate",
        text: "Discuss foundation schedules, column layouts, beam and slab details, and bar-bending schedules as part of the deliverables. Agree how drawing revisions will be issued and communicated. Architectural, plumbing and electrical changes should be coordinated with the structural design before the affected work proceeds."
      }
    ],
    questions: [
      {
        question: "Do you provide column and beam drawings?",
        answer: "Yes. The structural drawing service includes foundations, column layouts, beam and slab reinforcement details. Share the architectural plan and project requirements for a scope review."
      },
      {
        question: "Is a house floor plan the same as a structural drawing?",
        answer: "No. A floor plan shows room arrangements and circulation; structural drawings detail the supporting members and reinforcement. They need to be coordinated for the same building."
      },
      {
        question: "Can I use the same structural drawing for another plot?",
        answer: "Send both the intended building plan and the new site information for engineering review. A structural design depends on the specific loads, layout and ground information."
      }
    ]
  },
  {
    location: "both",
    serviceSlug: "electrical-drawings",
    title: "Electrical Drawings in Coimbatore & the Nilgiris",
    metadataTitle: "Electrical Drawings in Coimbatore & Nilgiris",
    description: "Electrical drawings and house wiring layouts in Coimbatore and the Nilgiris: lighting points, switches, circuits, DB sizing and load calculation.",
    intro: "Plan switches, lights and power points before electrical work begins. Prasanth Associates prepares electrical drawings in Coimbatore and the Nilgiris for houses and other buildings, coordinating wiring layouts with furniture, appliances and the building design.",
    sections: [
      {
        title: "Start with the way each room is used",
        text: "Share the floor plan, furniture positions and intended appliances. Kitchens, work areas, air conditioning and utility spaces have different requirements. Identify lighting preferences, switch access and any planned inverter, solar or automation provisions while the layout is being developed."
      },
      {
        title: "Coordinate wiring routes and schedules",
        text: "The drawing scope can include electrical points, conduit routes, switchboard locations, circuits and distribution-board schedules. Clarify whether you need a single-line diagram and any information requested by the project team. Coordinate revisions with structural and interior work to keep different drawing sets consistent."
      }
    ],
    questions: [
      {
        question: "Can you prepare a house wiring plan?",
        answer: "Yes. Send the floor plan and appliance requirements to discuss electrical point layouts, switches, circuit planning and the drawings needed by your electrician."
      },
      {
        question: "Can the plan include inverter and solar wiring?",
        answer: "Conduit provisioning for inverter, solar and automation systems is part of the electrical planning service. Describe your intended equipment so the interfaces can be discussed."
      },
      {
        question: "Can I request drawings if I already have an electrician?",
        answer: "Yes. Electrical design is a separate service. Explain what your electrician needs and which drawings already exist so the scope and coordination can be agreed."
      }
    ]
  },
  {
    location: "both",
    serviceSlug: "plumbing-drawings",
    title: "Plumbing Drawings in Coimbatore & the Nilgiris",
    metadataTitle: "Plumbing Drawings in Coimbatore & Nilgiris",
    description: "Plumbing drawings in Coimbatore and the Nilgiris for water supply, bathrooms, drainage, sumps and rainwater harvesting, planned before construction.",
    intro: "Prasanth Associates prepares plumbing drawings in Coimbatore and the Nilgiris to coordinate water supply, sanitary fittings and drainage with the building plan. Planning pipe routes, wet areas and access points together helps the construction team understand the work before services are concealed.",
    sections: [
      {
        title: "Locate bathrooms, kitchens and water storage",
        text: "Share the floor plans, number of users, bathroom and kitchen layouts, and proposed sump and overhead tank locations. Include hot-water requirements and any existing supply or drainage information. These details help define the plumbing design brief and the areas requiring site coordination."
      },
      {
        title: "Coordinate water, drainage and rainwater routes",
        text: "Discuss supply schematics, soil and waste lines, inspection chambers and rainwater harvesting as separate parts of the scope. Pipe routes and service openings need coordination with structural drawings. Agree how pressure tests, access for maintenance and drawing changes will be recorded during execution."
      }
    ],
    questions: [
      {
        question: "Can you make a water pipe layout for my house?",
        answer: "Yes. The plumbing drawing service covers water supply, sanitary and drainage layouts. Send your building plan and the locations of bathrooms, kitchen and water storage."
      },
      {
        question: "Can rainwater harvesting be included?",
        answer: "Rainwater harvesting and percolation pit design are offered within the plumbing scope. Share the site details so the team can identify the information needed for the design."
      },
      {
        question: "Can plumbing drawings be prepared for a renovation?",
        answer: "Share the existing plan, photographs and proposed alterations. The team can discuss a drawing scope after reviewing the existing services and the information available."
      }
    ]
  },
  {
    location: "both",
    serviceSlug: "interior-designs",
    title: "Interior Design in Coimbatore & the Nilgiris",
    metadataTitle: "Interior Design & Execution, Coimbatore & Nilgiris",
    description: "Home and office interiors designed and installed by one team in Coimbatore and the Nilgiris: modular kitchens, wardrobes, false ceilings, lighting and 3D views.",
    intro: "Prasanth Associates offers home and office interior design in Coimbatore and the Nilgiris. Whether you need a full interior scheme or a room makeover, the brief starts with how you use the space, the storage you need and the finishes you want to live with.",
    sections: [
      {
        title: "Plan rooms, storage and everyday use",
        text: "Bring a floor plan and photographs of the existing space. Identify furniture you want to keep, kitchen and wardrobe storage needs, work areas and lighting preferences. Describe priorities for each room so the design can balance appearance, comfort and the practical demands of daily use."
      },
      {
        title: "Compare materials and the complete interior scope",
        text: "Joinery, hardware, lighting, surface finishes and installation details affect both the budget and the result. Ask for the scope to distinguish design, supply and execution. Discuss sample selections, electrical changes and the handover sequence before work begins, particularly if other construction trades are still on site."
      },
      {
        title: "Plan the interiors while the house is being built",
        text: "If we are also designing or building your house, the interior layout can be settled before the walls are plastered and the floors laid. Light points, switch positions, kitchen and bathroom plumbing, and ceiling heights for false ceilings are then placed for the furniture that will actually go there, instead of being moved later. The same team prepares the interior drawings and coordinates them with the electrical and plumbing drawings."
      }
    ],
    scopeItems: [
      { title: "Modular kitchens", text: "A practical work triangle, pull-out drawers, tall pantry units and countertops, planned around how you cook." },
      { title: "Wardrobes & bedrooms", text: "Floor-to-ceiling wardrobes, walk-in closets and bedroom storage designed for what you need to keep." },
      { title: "Living rooms & TV units", text: "TV display consoles, storage and furniture layouts for the way your family uses the room." },
      { title: "False ceilings & lighting", text: "Cove lighting, track lights and lighting circuits planned together with the ceiling design." },
      { title: "Bathrooms & vanities", text: "Vanity and mirror units and bathroom finishes chosen to suit daily use." },
      { title: "Offices & cafés", text: "Commercial interiors planned around how staff and customers move through and use the space." },
    ],
    process: [
      { title: "Brief", text: "Your storage needs, colours, how your family uses each room and the finish you want. Bring a floor plan and photographs of the space." },
      { title: "3D views", text: "Room-by-room 3D views with realistic lighting and textures, shown alongside material samples, so you see the design before work starts." },
      { title: "Drawings & material specifications", text: "Carpentry and execution drawings, hardware codes, material and colour specifications for every item." },
      { title: "Execution", text: "Supply and installation to the agreed drawings and specifications, where your scope includes them, coordinated with any other trades still on site." },
    ],
    processNote: "The design pack, with 3D views, material specifications and carpentry drawings, typically takes 10 to 14 days once the brief is agreed. Execution time depends on the rooms, joinery quantities and materials, and is agreed with the scope.",
    designGallery: "interiors",
    questions: [
      {
        question: "Do you design interiors for a 2 BHK or 3 BHK house?",
        answer: "Yes. Share the floor plan, rooms to be included and your priorities for storage, finishes and furniture. The design brief can cover a whole home or selected areas."
      },
      {
        question: "Can I discuss kitchen and wardrobe interiors?",
        answer: "Kitchen storage, wardrobes and custom joinery can be included in the interior discussion. Provide dimensions or a floor plan and explain how you use the space."
      },
      {
        question: "What is the cost of home interiors in Coimbatore?",
        answer: "The quote depends on the rooms, joinery quantities, materials, hardware, lighting and execution scope. Share a budget and priority list so the team can discuss appropriate options."
      },
      {
        question: "Will I see the design before work starts?",
        answer: "Yes. You get room-by-room 3D views with lighting and textures, alongside material samples, before the execution drawings are prepared and before any work begins."
      },
      {
        question: "How long does interior design take?",
        answer: "The design pack, with 3D views, material specifications and carpentry drawings, typically takes 10 to 14 days once the brief is agreed. Execution time depends on the rooms, joinery quantities and materials, and is agreed with the scope."
      },
      {
        question: "Can you work with furniture I already have?",
        answer: "Yes. Tell us which furniture you want to keep when you share the brief, and the layout and storage are planned around it."
      },
      {
        question: "How do I get started with my home interiors?",
        answer: "Send your floor plan, photographs of the space, the rooms you want included and your budget through the quote form or WhatsApp. If the house is still being built, send the construction drawings too, so the interiors can be coordinated with the electrical and plumbing work."
      }
    ]
  },
  {
    location: "both",
    serviceSlug: "landscaping-designs",
    title: "Landscape Design in Coimbatore & the Nilgiris",
    metadataTitle: "Landscape Design in Coimbatore & Nilgiris",
    description: "Landscape design in Coimbatore and the Nilgiris for house gardens, courtyards and terraces. Plan outdoor seating, planting, pathways and easy-care maintenance.",
    intro: "Prasanth Associates designs gardens, courtyards and outdoor living spaces in Coimbatore and the Nilgiris. Landscape planning connects the building with the space around it, whether you want a place to sit, a planted entrance or a garden that fits your maintenance routine.",
    sections: [
      {
        title: "Describe how you want to use the garden",
        text: "Share a site plan, photographs and the areas available for planting, paths and seating. Include sunlight, access, existing trees and water availability in the discussion. A family garden, an office entrance and a private courtyard each need a different balance of circulation, planting and usable space."
      },
      {
        title: "Coordinate landscaping with the building",
        text: "Outdoor levels, drainage, water points and lighting need coordination with the building work. For terraces, discuss the existing structure and waterproofing before selecting features. Explain how much time you can give to maintenance so planting and material choices can be considered around that preference."
      }
    ],
    questions: [
      {
        question: "Can you design a small garden for my house?",
        answer: "Yes. Send the available dimensions, photographs and the way you want to use the space. Garden and courtyard design can be discussed for smaller areas as well as larger properties."
      },
      {
        question: "Do you design terrace gardens?",
        answer: "Terraces and outdoor living spaces are part of the landscape service. Share the building information so structural, drainage and waterproofing considerations can be reviewed with the design brief."
      },
      {
        question: "Can the garden be easy to maintain?",
        answer: "Tell the team your maintenance preferences, available water and how often the garden will be attended. These practical details help guide the design discussion."
      }
    ]
  },
  {
    location: "both",
    serviceSlug: "bank-valuation-report",
    title: "Bank Property Valuation in Coimbatore & the Nilgiris",
    metadataTitle: "Bank Property Valuation, Coimbatore & Nilgiris",
    description: "Property valuers in Coimbatore and the Nilgiris for bank loan and mortgage valuation reports. Registered valuers, site inspection and quick turnaround.",
    intro: "If your bank has asked for a property valuation report, Prasanth Associates offers bank valuation services in Coimbatore and the Nilgiris. The brief identifies the property, the purpose of the report and the lender’s requirements before the inspection and valuation work is arranged.",
    sections: [
      {
        title: "Start with the bank’s requirements",
        text: "Share the lender’s name, the reason for the report and any checklist or prescribed format it has supplied. Explain whether the property is land, a completed house, a commercial building or a project under construction. Confirm the required valuer eligibility with the lender before commissioning the report."
      },
      {
        title: "Prepare for the property inspection",
        text: "Send the available ownership and site documents, building drawings, area details and location. The team can identify which records are needed for the assignment and arrange access for inspection. Report scope and timing depend on the property, available documents and the intended recipient’s requirements."
      }
    ],
    questions: [
      {
        question: "Can I get a house valuation report for a bank loan?",
        answer: "Yes. Bank property valuation is offered for home loan and mortgage enquiries. Share the lender’s requirements first and confirm that the proposed valuer and report format meet them."
      },
      {
        question: "Will the report guarantee my loan approval?",
        answer: "No. A valuation report is one part of the bank’s assessment. The lending decision and acceptance of the report remain with the bank."
      },
      {
        question: "How much does a property valuation report cost?",
        answer: "The quote depends on the property type, inspection location, document review and reporting scope. Send the bank’s checklist and property details for a fee proposal."
      }
    ]
  },
  {
    location: "both",
    serviceSlug: "structural-stability-certificate",
    title: "Structural Stability Certificate in Coimbatore & the Nilgiris",
    metadataTitle: "Stability Certificate, Coimbatore & Nilgiris",
    description: "Structural stability certificates in Coimbatore and the Nilgiris for schools, colleges, factories and older buildings, after inspection and NDT tests.",
    intro: "Prasanth Associates offers structural stability assessment and certification services in Coimbatore and the Nilgiris. A building stability certificate starts with an engineering review of the existing structure and the purpose of the assessment, whether the enquiry concerns a school, factory, commercial building or older property.",
    sections: [
      {
        title: "Explain why the certificate is needed",
        text: "Send the request or checklist from the intended recipient, along with the building’s location, use, approximate age and available drawings. Describe any extensions, changes of use or observed defects. These details help the engineer define the inspection and the records needed for the assessment."
      },
      {
        title: "Assessment before certification",
        text: "The review may involve condition observations, a study of available drawings and records, and testing where the engineer identifies a need. Any findings or recommended work form part of the project discussion. The report’s conclusions depend on the assessment; a favourable certificate cannot be promised before inspection."
      }
    ],
    questions: [
      {
        question: "Do you arrange building stability certificates in Coimbatore?",
        answer: "Yes. Share the property details and the recipient’s requirements to discuss structural assessment and certification. Confirm the required engineer credentials and report format for your particular purpose."
      },
      {
        question: "Can I request a stability certificate for a school or factory?",
        answer: "Schools, factories and commercial buildings are covered by the service. Provide the relevant checklist, available drawings and access details for the engineering review."
      },
      {
        question: "Can a certificate be issued from photos alone?",
        answer: "Photographs can help with the initial enquiry, but the assessment scope and inspection requirements must be agreed with the engineer. Send existing drawings and any previous reports as well."
      }
    ]
  },
  {
    location: "both",
    serviceSlug: "detailed-estimation-costing",
    title: "Building Estimates & BOQ in Coimbatore & the Nilgiris",
    metadataTitle: "Building Estimates & BOQ, Coimbatore & Nilgiris",
    description: "Building cost estimates and BOQ preparation in Coimbatore and the Nilgiris: material quantities, labour items and contractor quote comparison.",
    intro: "Prasanth Associates prepares building estimates and bills of quantities in Coimbatore and the Nilgiris. A BOQ lists the work and measured quantities so you can understand the construction budget and compare contractor proposals against the same scope, rather than relying only on a square-foot rate.",
    sections: [
      {
        title: "From drawings to material quantities",
        text: "Provide the latest architectural and structural drawings, finish specifications and the work you want included. The estimate can organize concrete, reinforcement, masonry, finishes and labour into measurable items. Identify any design information that is still provisional so its effect on the estimate is visible."
      },
      {
        title: "Compare contractor quotations fairly",
        text: "Check that competing quotes refer to the same quantities, specifications and inclusions. Separate building work from external works, services or other packages where appropriate. Record exclusions and assumptions, then agree how the estimate will be revised if the drawings or selected materials change."
      }
    ],
    questions: [
      {
        question: "Can you estimate the cost to build my house?",
        answer: "Yes. Share the location, proposed built-up area, drawings and finish preferences. The detail available determines whether the team can prepare an initial budget or a measured itemized estimate."
      },
      {
        question: "What is a BOQ in simple words?",
        answer: "A bill of quantities is a list of construction work items and their quantities. With rates and specifications, it helps explain how the estimated project cost is built up."
      },
      {
        question: "Can you compare two builder quotations?",
        answer: "Contractor tender analysis and BOQ reviews are offered. Send both quotations with the drawings and specifications they were based on so differences in scope can be identified."
      }
    ]
  },
  {
    location: "both",
    serviceSlug: "chartered-engineer-valuation",
    title: "Chartered Engineer in Coimbatore & the Nilgiris",
    metadataTitle: "Chartered Engineer in Coimbatore & Nilgiris",
    description: "Chartered engineer and technical valuation services in Coimbatore and the Nilgiris for plant, machinery and fixed assets, customs and bank needs.",
    intro: "Prasanth Associates offers chartered engineer and technical valuation services in Coimbatore and the Nilgiris for plant, machinery and other fixed assets. Start by identifying the asset and the purpose of the report so the required inspection, records and reporting format can be discussed.",
    sections: [
      {
        title: "Identify the assets and the reporting purpose",
        text: "Provide an asset list with locations, equipment descriptions and available purchase or installation records. Explain whether the report is intended for a bank, insurance review, customs-related submission or another recipient. Share that recipient’s instructions before deciding the engagement scope."
      },
      {
        title: "Agree inspection and documentation needs",
        text: "Asset condition, available records and access arrangements shape the technical review. Discuss what will be inspected, which documents are missing and how the findings will be presented. Confirm the credentials and format required by the receiving organization before commissioning a certificate or valuation."
      }
    ],
    questions: [
      {
        question: "Can you provide a machinery valuation report?",
        answer: "Plant and machinery valuation is part of the technical valuation service. Send an asset list, location and the intended use of the report for a scope discussion."
      },
      {
        question: "Can I enquire about a chartered engineer certificate?",
        answer: "Yes. Explain which asset or equipment the certificate concerns and provide the recipient’s checklist. The team can discuss the required inspection and documentation."
      },
      {
        question: "Is this the same as a home loan valuation?",
        answer: "The intended purpose and assets differ. For a house or land report requested by a lender, use the bank property valuation service and share the lender’s instructions."
      }
    ]
  },
  {
    location: "both",
    serviceSlug: "property-acquisition-advisory",
    title: "Property Buying Advice in Coimbatore & the Nilgiris",
    metadataTitle: "Property Buying Advice, Coimbatore & Nilgiris",
    description: "Property buying advice in Coimbatore and the Nilgiris for homes and commercial buildings: shortlisting, site review, document checks and purchase.",
    intro: "Prasanth Associates helps buyers evaluate residential and commercial property in Coimbatore and the Nilgiris. Property acquisition advisory brings your location preferences, budget, intended use and available property information into one brief before you choose which options to pursue.",
    sections: [
      {
        title: "Build a shortlist around your needs",
        text: "Explain whether the purchase is for your own use, a business or another purpose. Share preferred areas, space requirements, access needs and budget. If you have already shortlisted properties, send the listing details and available plans so the review can focus on the differences that matter to you."
      },
      {
        title: "Agree the review and coordination scope",
        text: "Discuss site observations, available documents, price negotiation and transaction coordination as distinct parts of the engagement. Identify which checks require a surveyor, lawyer, lender or other professional, and who will arrange them. Record unresolved questions before making a purchase decision."
      }
    ],
    questions: [
      {
        question: "Can you help me buy a house in Coimbatore?",
        answer: "Property acquisition advisory covers residential and commercial buying enquiries. Send your preferred location, budget and requirements, or details of a property you have already found."
      },
      {
        question: "Can you review a property I found myself?",
        answer: "Yes. Share the property details and explain the checks or coordination you need. The team can discuss a scope around that particular property."
      },
      {
        question: "Does the advisory service include construction?",
        answer: "Construction is a separate service. If you intend to build or renovate after purchase, mention it in the brief so the property review can consider those plans."
      }
    ]
  },
  {
    location: "both",
    serviceSlug: "land-plot-transactions",
    title: "Land & Plot Consultants in Coimbatore & the Nilgiris",
    metadataTitle: "Land & Plot Consultants, Coimbatore & Nilgiris",
    description: "Land and plot consultants in Coimbatore and the Nilgiris: plot sourcing, boundary surveys, document checks, development plans and sale support.",
    intro: "Prasanth Associates supports land and plot transactions in Coimbatore and the Nilgiris for buyers, sellers and owners planning development. Tell us whether you need help finding a plot, reviewing one you have shortlisted or coordinating the next steps for a property you already own.",
    sections: [
      {
        title: "Review the plot and intended use together",
        text: "Share the location, survey details, available layout plan and the reason for the purchase or sale. A plot intended for a house has a different brief from land intended for a commercial building. Access, dimensions and the information available about boundaries should be considered alongside the asking price."
      },
      {
        title: "Prepare the records for a review",
        text: "Collect the documents and sketches already available and identify any gaps. Discuss the need for boundary verification, record review and specialist advice with the team. Agree the responsibilities for transaction coordination and any further checks before progressing with a sale or purchase."
      }
    ],
    questions: [
      {
        question: "Can you help find a house plot in Coimbatore?",
        answer: "Plot sourcing and shortlisting are part of the land transaction service. Send your preferred areas, approximate plot size, budget and intended building type."
      },
      {
        question: "Can you help with a plot I want to sell?",
        answer: "Yes. Provide the site location, dimensions and available records, and explain the support you need with the sale process."
      },
      {
        question: "Can you check a plot before I buy it?",
        answer: "The team can discuss the site and document review scope, including boundary and development questions. Identify any required specialist checks and the people responsible for completing them."
      }
    ]
  },
  {
    location: "both",
    serviceSlug: "real-estate-investment-consulting",
    title: "Property Investment Advice in Coimbatore & the Nilgiris",
    metadataTitle: "Property Investment Advice, Coimbatore & Nilgiris",
    description: "Real estate investment advice in Coimbatore and the Nilgiris: compare properties, rental assumptions, ongoing costs and your ownership goals.",
    intro: "Prasanth Associates offers real estate investment consulting in Coimbatore and the Nilgiris for individual owners, NRIs and businesses. The discussion starts with your objectives and the properties being considered, then examines the assumptions behind income, costs and a possible future sale.",
    sections: [
      {
        title: "Compare the same information for each property",
        text: "Bring the location, asking price, property condition, current occupancy and available rental information for each option. Include expected maintenance and other ownership costs in the brief. A useful comparison makes its assumptions explicit and distinguishes available evidence from estimates."
      },
      {
        title: "Define the decision you need help with",
        text: "Explain your intended holding period, whether you plan to use or rent the property, and the questions you want the review to answer. Discuss access to documents and any professional checks needed. Forecasts are estimates, and property values or rental outcomes cannot be guaranteed."
      }
    ],
    questions: [
      {
        question: "Can you help compare properties in Coimbatore?",
        answer: "Yes. Share the options you are considering and your objectives. The consulting scope can compare location, property condition, rental assumptions and costs."
      },
      {
        question: "Can an NRI enquire about a property investment?",
        answer: "NRI investment enquiries are included in the service. Explain where the property is, what information you already have and the local coordination you need."
      },
      {
        question: "Can you guarantee rental income or resale profit?",
        answer: "No. Rental income, occupancy and resale value depend on future conditions. The review should explain its assumptions and uncertainties so you can assess the options."
      }
    ]
  },
  {
    location: "both",
    serviceSlug: "property-portfolio-management",
    title: "Property Management in Coimbatore & the Nilgiris",
    metadataTitle: "Property Management in Coimbatore & Nilgiris",
    description: "Property management in Coimbatore and the Nilgiris for homes and commercial buildings: tenants, rent collection, inspections and maintenance.",
    intro: "Prasanth Associates offers property management in Coimbatore and the Nilgiris for owners of residential, commercial and mixed-use properties. The service can help coordinate tenants, rent collection, inspections and maintenance, with responsibilities agreed for each property.",
    sections: [
      {
        title: "Describe the properties and current arrangements",
        text: "Share the address, property type, occupancy status and any existing lease or maintenance arrangements. Explain which tasks you want managed and which you will handle yourself. For several properties, identify the contact person and reporting needs for each one."
      },
      {
        title: "Agree reporting and spending authority",
        text: "Set out how inspection findings, rent information and repair requests will be communicated. Agree who approves maintenance work, how costs are recorded and when reports will be provided. Clear instructions help the team coordinate day-to-day requests while keeping the owner involved in decisions."
      }
    ],
    questions: [
      {
        question: "Can you look after my rental property in Coimbatore?",
        answer: "Yes. Send the location, property type, occupancy status and the tasks you need help with, such as inspections, rent coordination or maintenance."
      },
      {
        question: "Can you manage property while I live outside Coimbatore?",
        answer: "Discuss the local coordination and reporting you need. The engagement can define a contact person, inspection arrangements and how you will approve work remotely."
      },
      {
        question: "Does property management include finding tenants?",
        answer: "Tenant sourcing and screening are listed services. Agree the scope, fees and responsibilities for your property before the engagement begins."
      }
    ]
  },
  // ── The Nilgiris (served from the Gudalur branch) ─────────────────────────
  // Facts here come from the Gudalur and Nilgiris location pages; keep the
  // three in step. Company has built in Gudalur, Ooty, Coonoor and Kotagiri.
  {
    slug: "house-construction-nilgiris",
    location: "nilgiris",
    projectCategory: "residential",
    serviceSlug: "residential-construction",
    title: "House Construction in the Nilgiris",
    metadataTitle: "House Construction in Ooty & the Nilgiris",
    description: "House construction in the Nilgiris: Gudalur, Ooty, Coonoor and Kotagiri. Slope foundations, monsoon-proof detailing and a fixed BoQ from our Gudalur branch.",
    intro: "Prasanth Associates builds houses across the Nilgiris from a staffed branch office on Ooty Main Road, Gudalur, and has built in Gudalur, Ooty, Coonoor and Kotagiri. A hill house has to cope with sloping plots, months of monsoon rain and materials that come up the ghat road, so the plan, foundation and waterproofing are decided for your site rather than copied from a plains design.",
    sections: [
      { title: "Plan the house around the slope", text: "Most hill plots slope. We survey the gradient first and design stepped or split-level footings that follow the land, which usually costs less than cutting and filling the site and disturbs the slope less. Retaining walls are designed with weep holes and drainage behind them, because an undrained wall builds up water pressure through the monsoon." },
      { title: "Foundations from a proper soil test", text: "Hill soil can change across a single plot. The soil test takes bore samples across the building footprint, not one hole in the middle, and the footing type is chosen from those results. On the higher plateau around Ooty, sloping sites can need piles taken down to rock." },
      { title: "Detail every wall and roof for long monsoons", text: "Roofs get steeper pitches and wide overhangs, gutters are sized for the heaviest rain, and walls are built to dry out rather than trap moisture. Anti-fungal treatment, ventilated roof spaces and properly seasoned timber keep the inside of the house dry and healthy in hill humidity." },
      { title: "Budget for hill conditions", text: "Indicative ranges are about ₹2,100–₹2,800 per sq ft for standard specification and ₹3,000–₹4,000 per sq ft for premium estate bungalows. Hill building costs more than Coimbatore because of ghat-road transport, slope foundations, retaining walls and heavier weatherproofing. Your fixed price comes from an itemized BoQ after the soil test." },
    ],
    questions: [
      { question: "House construction cost per sq ft in Ooty or Gudalur?", answer: "Indicative ranges are about ₹2,100–₹2,800 per sq ft for standard specification and ₹3,000–₹4,000 per sq ft for premium estate bungalows. The exact price is fixed in an itemized BoQ after the soil test." },
      { question: "How many months to build a house in the Nilgiris?", answer: "Usually 10 to 14 months for an individual house, compared with 8 to 11 months in Coimbatore. External plastering, painting and roof waterproofing need dry weather, so the work is planned around the monsoon." },
      { question: "Can you build on a steep sloping plot?", answer: "Yes. Most Nilgiris plots slope. Stepped and split-level foundations that follow the land are usually cheaper than levelling the site. The survey and soil test decide the design." },
      { question: "Builders in Ooty, Coonoor and Kotagiri, or only Gudalur?", answer: "We work across the Nilgiris district and have built in Gudalur, Ooty, Coonoor and Kotagiri. Projects are run from our Gudalur branch office." },
      { question: "Can I build a second home in the Nilgiris while living in Coimbatore or Bengaluru?", answer: "Yes. We build second homes and retirement homes for owners who live in Coimbatore, Bengaluru or Kerala. Engineers from the Gudalur branch supervise the site, and the houses are designed to need little maintenance." },
    ],
    keywords: ["house construction in Ooty", "builders in Ooty", "house construction in Gudalur", "building contractors in Gudalur", "builders in Coonoor", "house construction in Coonoor", "house construction in Kotagiri", "construction company in Nilgiris", "house construction cost in Ooty", "hill house construction Nilgiris"],
    aliases: ["hill house construction", "home builders in the Nilgiris", "building contractor in Ooty", "house builders in Gudalur"],
  },
  {
    slug: "villa-construction-nilgiris",
    location: "nilgiris",
    projectCategory: "villa",
    serviceSlug: "villa-construction",
    title: "Villa & Estate Bungalow Construction in the Nilgiris",
    metadataTitle: "Villa Construction in Ooty & the Nilgiris",
    description: "Villas and estate bungalows in Ooty, Coonoor, Kotagiri and Gudalur, built for hillside plots, cold-weather concrete and heavy monsoon rain.",
    intro: "Hillside villas, holiday homes and estate bungalows on tea, coffee and spice holdings are a large part of our Nilgiris work. Higher up the plateau in Ooty, Coonoor and Kotagiri, colder temperatures and steeper sites change how the structure is built. Around Gudalur, heavier monsoon rain changes the detailing. The Gudalur branch plans and supervises both.",
    sections: [
      { title: "Hold the villa firmly on a hillside", text: "On sloping plots, the foundation can combine piles taken down to rock with reinforced concrete retaining walls, so the building and its terraces cannot slip downhill. The design follows the contour, which also gives villas their stepped terraces and views." },
      { title: "Concrete that reaches full strength in the cold", text: "Low temperatures in Ooty slow the setting of concrete. We use non-chloride accelerators and insulated formwork so the concrete still reaches the strength it was designed for." },
      { title: "Keep fog and rain out of the finishes", text: "Hill fog and long monsoons cause damp in poorly built homes. Crystalline waterproofing on exterior masonry and roof eaves, breathable wall finishes and seasoned hardwood protect marble, joinery and interiors over the years." },
      { title: "Restore an older estate bungalow", text: "Restoration of older estate houses is part of the work: strengthening the structure, curing damp and updating services while keeping the character of the bungalow." },
    ],
    questions: [
      { question: "Villa construction cost per sq ft in Ooty?", answer: "The indicative range for a premium estate bungalow or villa in the Nilgiris is about ₹3,000–₹4,000 per sq ft. Finishes, pools and landscaping change the figure, so everything is priced item by item in the BoQ after the soil test." },
      { question: "Cottage or bungalow construction in Coonoor or Kotagiri?", answer: "Yes. We have built in both Coonoor and Kotagiri, as well as Ooty and Gudalur. Send the plot location and what you want to build." },
      { question: "Why does concrete need special care in Ooty?", answer: "Cold weather slows the chemical reaction that makes concrete harden. Without accelerators and insulated formwork, it may not reach its design strength." },
    ],
    keywords: ["villa construction in Ooty", "villa builders in Ooty", "estate bungalow construction Nilgiris", "luxury villa construction Coonoor", "villa construction Kotagiri", "cottage construction Ooty", "holiday home construction Nilgiris"],
    aliases: ["estate bungalow construction", "hill villa construction", "cottage construction", "holiday home builders"],
  },
  {
    slug: "building-plan-approval-nilgiris",
    location: "nilgiris",
    serviceSlug: "architectural-designs",
    title: "House Plans & Building Approval in the Nilgiris",
    metadataTitle: "Building Plans & Approval in Ooty & the Nilgiris",
    description: "House plans and building approval in the Nilgiris: patta checks, hill-area rules on slope, coverage and height, and sanction drawings filed for you.",
    intro: "The Nilgiris is a regulated hill district. Plots here face rules on gradient, site coverage and building height that do not apply in Coimbatore, and plots near reserve forests get extra scrutiny. We check these before the design starts, draw the plan to fit them, and file and follow up the approval for you.",
    sections: [
      { title: "Check the plot before drawing the plan", text: "We verify the patta and land classification, find out which authority has jurisdiction over your plot, and confirm what it requires. Constraints found now shape the design, instead of being discovered after the drawings are done." },
      { title: "Design within the hill-area rules", text: "Gradient, coverage and height limits decide how much you can build and where. The plan is drawn to the contour of the plot after a survey, with your room needs and Vastu preferences included where the site allows." },
      { title: "Sanction drawings filed and followed up", text: "We prepare the sanction drawings, file them with the authority and follow up until the plan is approved. Structural, electrical and plumbing drawings for construction can be prepared alongside." },
    ],
    questions: [
      { question: "Building plan approval in Ooty or Gudalur: do you handle it?", answer: "Yes, from start to finish. We check the land records, prepare the sanction drawings, file them and follow up until the plan is approved." },
      { question: "Is building approval different in the Nilgiris than in Coimbatore?", answer: "Yes. Hill-area rules are stricter on slope, site coverage and building height, and plots near reserve forest boundaries, such as around Gudalur near Mudumalai, get additional scrutiny." },
      { question: "House plan for a sloping plot in Ooty?", answer: "Yes. The plot is surveyed first and the plan is drawn to follow the slope, which usually saves on cutting, filling and retaining walls." },
      { question: "Can I build on a plot near a forest area?", answer: "It depends on the plot's classification and distance from the forest boundary. We confirm the restrictions during the feasibility check, before design work starts." },
    ],
    keywords: ["building plan approval Ooty", "building plan approval Nilgiris", "house plan approval Gudalur", "architects in Ooty", "house plan design Nilgiris", "hill area building rules Nilgiris", "house plan for sloping plot"],
    aliases: ["building approval", "plan sanction", "house plan drawing", "architect"],
  },
];

export const servicePages: ServicePage[] = servicePageContent.map((page) => {
  // The shared search terms are written for the Coimbatore pages; Nilgiris
  // pages carry their own keywords and questions.
  const search = page.location === "nilgiris" ? undefined : serviceSearchTerms[page.serviceSlug];
  const both = page.location === "both";
  const shortName = page.title.replace(/ in Coimbatore & the Nilgiris$/, "");
  const keywords = page.keywords ?? search?.keywords;
  return {
    ...page,
    slug: page.slug ?? serviceRoutes[page.serviceSlug],
    // Plain-language questions, worded the way people search, follow the originals.
    questions: [
      ...page.questions,
      ...(search?.questions ?? []),
      ...(both
        ? [{
            question: `${shortName} in Ooty, Coonoor or Gudalur?`,
            answer: "Yes. This service is available across the Nilgiris, including Ooty, Coonoor, Kotagiri and Gudalur, based on your requirements. Our branch office on Ooty Main Road, Gudalur, handles enquiries and site visits in the district.",
          }]
        : []),
    ],
    // Pages covering both regions also target the Nilgiris forms of their top searches.
    keywords: both && keywords
      ? [
          ...keywords,
          ...keywords
            .filter((k) => k.includes("Coimbatore"))
            .slice(0, 3)
            .flatMap((k) => [k.replace("Coimbatore", "Ooty"), k.replace("Coimbatore", "Nilgiris")]),
        ]
      : keywords,
    aliases: page.aliases ?? search?.aliases,
  };
});
