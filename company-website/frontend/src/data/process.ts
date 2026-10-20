export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  details: string[];
}

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Consultation",
    description:
      "We begin with a detailed conversation to understand your vision, requirements, budget expectations, and timeline. This is a no-obligation discussion to assess feasibility and establish mutual fit.",
    details: [
      "Understanding your vision and requirements",
      "Site visit and initial assessment",
      "Budget range discussion",
      "Timeline expectations",
      "Feasibility evaluation",
    ],
  },
  {
    number: "02",
    title: "Site Evaluation",
    description:
      "Our engineering team evaluates the site — soil conditions, topography, access, orientation, and regulatory constraints — to inform the design and structural approach.",
    details: [
      "Soil testing and analysis",
      "Topographic survey",
      "Orientation and sunlight study",
      "Local regulation review",
      "Utility infrastructure assessment",
    ],
  },
  {
    number: "03",
    title: "Architectural Design",
    description:
      "Our architects develop the design based on your requirements and the site analysis. This includes floor plans, elevations, 3D visualizations, and material recommendations.",
    details: [
      "Concept development",
      "Floor plan design",
      "3D visualization",
      "Material palette selection",
      "Design review and revisions",
    ],
  },
  {
    number: "04",
    title: "Estimation & Planning",
    description:
      "We prepare a detailed, transparent cost estimate covering materials, labor, equipment, and contingencies. The scope of work is documented clearly to avoid ambiguity.",
    details: [
      "Detailed cost breakdown",
      "Material specifications",
      "Construction schedule",
      "Payment milestone plan",
      "Contract documentation",
    ],
  },
  {
    number: "05",
    title: "Approvals",
    description:
      "We manage the approval process — building permits, structural plan approvals, utility connections, and any regulatory requirements specific to your location.",
    details: [
      "Building permit application",
      "Structural plan approval",
      "Utility connection approvals",
      "Environmental clearances",
      "Regulatory compliance",
    ],
  },
  {
    number: "06",
    title: "Construction",
    description:
      "Construction begins with a dedicated project manager, regular progress reporting, and strict quality protocols at every stage — from foundation to finishing.",
    details: [
      "Foundation and structure",
      "MEP rough-in",
      "Masonry and finishing",
      "Interior and exterior work",
      "Regular progress updates",
    ],
  },
  {
    number: "07",
    title: "Quality Inspection",
    description:
      "Before handover, our quality team conducts a comprehensive inspection covering structural integrity, finishing quality, MEP systems, and compliance with approved drawings.",
    details: [
      "Structural integrity check",
      "Finishing quality audit",
      "Electrical and plumbing testing",
      "Safety compliance verification",
      "Punch list resolution",
    ],
  },
  {
    number: "08",
    title: "Handover",
    description:
      "We walk you through the completed project, hand over all documentation — drawings, warranties, maintenance guides — and provide post-construction support.",
    details: [
      "Final walkthrough",
      "Documentation handover",
      "Warranty information",
      "Maintenance guidelines",
      "Post-construction support",
    ],
  },
];
