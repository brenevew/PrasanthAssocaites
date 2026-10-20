export interface QualityCapability {
  title: string;
  description: string;
  icon: string;
}

export const qualityCapabilities: QualityCapability[] = [
  {
    title: "Structural Engineering",
    description:
      "Every project is designed with detailed structural calculations, ensuring foundations, beams, columns, and slabs are engineered for long-term durability and safety.",
    icon: "Shield",
  },
  {
    title: "Soil Analysis",
    description:
      "Before construction begins, comprehensive soil testing determines bearing capacity, water table depth, and soil composition to inform foundation design.",
    icon: "Layers",
  },
  {
    title: "Concrete Quality",
    description:
      "We use design-mix concrete with strict quality protocols — slump tests, cube testing, and proper curing schedules to ensure structural integrity.",
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
      "Multi-layer waterproofing systems for basements, terraces, bathrooms, and wet areas — using proven membrane and coating technologies.",
    icon: "Droplets",
  },
  {
    title: "Electrical Systems",
    description:
      "Electrical design considers current capacity, future load requirements, safety systems, and energy efficiency — with concealed wiring and modular fittings.",
    icon: "Zap",
  },
  {
    title: "Plumbing & Sanitary",
    description:
      "CPVC and PPR piping systems, pressure testing, proper gradient calculations, and water-efficient fixtures ensure reliable, long-lasting plumbing infrastructure.",
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
      "Passive design strategies — orientation, natural ventilation, daylighting, and insulation — reduce energy consumption without compromising comfort.",
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
      "Every project is designed around structural integrity and long-term durability. We invest in engineering before construction begins.",
    icon: "Compass",
  },
  {
    title: "Transparent Pricing",
    description:
      "Clear, itemized estimates with documented scope. No hidden costs, no ambiguous line items. You know exactly what you're paying for.",
    icon: "FileText",
  },
  {
    title: "Quality Materials",
    description:
      "Materials are selected based on performance, durability, and suitability — not lowest cost. Every material is verified before use.",
    icon: "Gem",
  },
  {
    title: "Experienced Team",
    description:
      "Architects, structural engineers, project managers, and skilled workers — each bringing expertise to their area of responsibility.",
    icon: "Users",
  },
  {
    title: "Project Management",
    description:
      "Professional scheduling, milestone tracking, quality checkpoints, and regular progress reporting keep every project organized and on track.",
    icon: "BarChart3",
  },
  {
    title: "On-Time Execution",
    description:
      "Structured planning, proactive material procurement, and disciplined progress tracking minimize delays and deliver projects on schedule.",
    icon: "Clock",
  },
];
