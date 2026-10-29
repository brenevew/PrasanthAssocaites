export interface QualityCapability {
  title: string;
  description: string;
  icon: string;
}

export const qualityCapabilities: QualityCapability[] = [
  {
    title: "Structural Engineering",
    description:
      "Foundations, beams, columns and slabs are sized from structural calculations, and the site follows the approved structural drawings.",
    icon: "Shield",
  },
  {
    title: "Soil Analysis",
    description:
      "Where the site calls for it, soil testing for bearing capacity and water table depth informs the foundation design before work starts.",
    icon: "Layers",
  },
  {
    title: "Concrete Quality",
    description:
      "Concrete to the grade in the specification, checked with slump and cube tests, and cured to a set schedule.",
    icon: "Box",
  },
  {
    title: "Steel Reinforcement",
    description:
      "Steel checked against mill certificates, with bar bending schedules taken from the approved structural drawings and cover checked before concreting.",
    icon: "Construction",
  },
  {
    title: "Waterproofing",
    description:
      "Waterproofing for terraces, bathrooms, wet areas and basements, chosen for the exposure each one faces, including Nilgiris rainfall.",
    icon: "Droplets",
  },
  {
    title: "Electrical Systems",
    description:
      "Electrical design considers current capacity, future load requirements, safety systems, and energy efficiency, with concealed wiring and modular fittings.",
    icon: "Zap",
  },
  {
    title: "Plumbing & Sanitary",
    description:
      "CPVC and PPR piping, pressure-tested and laid to the drainage gradients in the plumbing drawings.",
    icon: "Pipette",
  },
  {
    title: "HVAC Design",
    description:
      "For commercial buildings and homes that need it, HVAC is planned with the layout, so ducts and units are not an afterthought.",
    icon: "Wind",
  },
  {
    title: "Fire Safety",
    description:
      "The fire safety measures the building type requires, such as fire-rated construction, detectors and exit routes, are planned into the design.",
    icon: "Flame",
  },
  {
    title: "Energy Efficiency",
    description:
      "Orientation, natural ventilation and daylight are considered in the plan, to reduce the energy a building needs.",
    icon: "Sun",
  },
];

export interface Differentiator {
  title: string;
  description: string;
  icon: string;
}

export const differentiators: Differentiator[] = [
  {
    title: "Engineering First",
    description:
      "Structural drawings and calculations are prepared before construction begins, and the site works from them.",
    icon: "Compass",
  },
  {
    title: "Transparent Pricing",
    description:
      "Clear, itemised estimates with documented scope. The price is fixed for the agreed scope, and every line item says what it covers.",
    icon: "FileText",
  },
  {
    title: "Quality Materials",
    description:
      "Materials are named in the BoQ by grade and specification, so you know what goes into the building before work starts.",
    icon: "Gem",
  },
  {
    title: "Experienced Team",
    description:
      "Architects, structural engineers and site engineers in one team, with offices in Coimbatore and Gudalur.",
    icon: "Users",
  },
  {
    title: "Project Management",
    description:
      "Work is planned in stages, with checks at each stage and regular progress updates for the owner.",
    icon: "BarChart3",
  },
  {
    title: "Planned Execution",
    description:
      "Structured planning, proactive material procurement, and disciplined progress tracking keep work moving against the schedule agreed for your project.",
    icon: "Clock",
  },
];
