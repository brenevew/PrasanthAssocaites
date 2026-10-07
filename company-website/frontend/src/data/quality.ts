export interface QualityCapability {
  title: string;
  description: string;
  icon: string;
}

export const qualityCapabilities: QualityCapability[] = [
  {
    title: "Structural Engineering",
    description:
      "Foundations, beams, columns and slabs are sized by calculation, not by rule of thumb.",
    icon: "Shield",
  },
  {
    title: "Soil Analysis",
    description:
      "A soil test gives the bearing capacity, water table and soil type. The foundation is designed from those numbers.",
    icon: "Layers",
  },
  {
    title: "Concrete Quality",
    description:
      "Design-mix concrete, with slump tests, cube tests and a proper curing schedule.",
    icon: "Box",
  },
  {
    title: "Steel Reinforcement",
    description:
      "Steel quality is verified through mill certificates and on-site testing. Bar bending schedules follow approved structural drawings with mandatory cover checks.",
    icon: "Construction",
  },
  {
    title: "Waterproofing",
    description:
      "Multi-layer waterproofing for basements, terraces, bathrooms and other wet areas, using proven membranes and coatings.",
    icon: "Droplets",
  },
  {
    title: "Electrical Systems",
    description:
      "Wiring sized for today's load and future additions, with proper protection, concealed conduits and modular fittings.",
    icon: "Zap",
  },
  {
    title: "Plumbing & Sanitary",
    description:
      "CPVC and PPR pipes, pressure-tested, laid to calculated slopes and fitted with water-saving fixtures.",
    icon: "Pipette",
  },
  {
    title: "HVAC Design",
    description:
      "For commercial and premium residential projects, HVAC systems are designed for energy efficiency, indoor air quality, and occupant comfort.",
    icon: "Wind",
  },
  {
    title: "Fire Safety",
    description:
      "Fire-rated construction, sprinkler systems, smoke detectors, and compliant evacuation routes are integrated into the design from the beginning.",
    icon: "Flame",
  },
  {
    title: "Energy Efficiency",
    description:
      "Orientation, cross-ventilation, daylight and insulation cut energy use without making the house less comfortable.",
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
      "The structure is designed and checked before anyone picks up a shovel.",
    icon: "Compass",
  },
  {
    title: "Transparent Pricing",
    description:
      "Itemized estimates with the scope written down. No hidden costs and no vague line items.",
    icon: "FileText",
  },
  {
    title: "Quality Materials",
    description:
      "We choose materials for how they perform, not for the lowest price, and check every batch before it is used.",
    icon: "Gem",
  },
  {
    title: "In-House Team",
    description:
      "Architects, structural engineers, project managers and skilled tradespeople, each responsible for their own part of the job.",
    icon: "Users",
  },
  {
    title: "Project Management",
    description:
      "A schedule, milestones, quality checks at each stage and regular progress reports.",
    icon: "BarChart3",
  },
  {
    title: "On-Time Execution",
    description:
      "Materials are ordered ahead and progress is tracked against the schedule, so the handover date holds.",
    icon: "Clock",
  },
];
