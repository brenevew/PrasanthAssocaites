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
      "We talk through what you want to build, your budget and your timeline. There is no obligation.",
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
      "Our engineers check the soil, slope, access, orientation and local rules. The design and structure are based on what they find.",
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
      "Our architects produce floor plans, elevations, 3D views and a materials list from your brief and the site study.",
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
      "An itemized estimate covering materials, labour, equipment and contingencies, with the scope of work written down.",
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
      "We get the building permit, structural approval, utility connections and anything else your location requires.",
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
      "A dedicated project manager runs the site, with quality checks at every stage and regular progress reports.",
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
      "Before handover, our quality team inspects the structure, finishes, electrical and plumbing, and checks everything against the approved drawings.",
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
      "We walk you through the building and hand over the drawings, warranties and maintenance guides. Support continues after you move in.",
    details: [
      "Final walkthrough",
      "Documentation handover",
      "Warranty information",
      "Maintenance guidelines",
      "Post-construction support",
    ],
  },
];
