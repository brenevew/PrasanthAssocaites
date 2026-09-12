export interface ServicePlanItem {
  no: number;
  service: string;
  description: string;
  rate: string;
}

export interface ServiceCategoryTable {
  id: string;
  categoryTitle: string;
  categorySubtitle: string;
  items: ServicePlanItem[];
}

export const architecturalServicePlans: ServicePlanItem[] = [
  { no: 1, service: "Architectural Floor Plan", description: "Conceptual + detailed space planning with Vastu consideration", rate: "₹ 1.20 / SFT" },
  { no: 2, service: "Basic Electrical Plan", description: "Lighting layout, switch points & basic wiring plan", rate: "₹ 1.20 / SFT" },
  { no: 3, service: "Basic Plumbing Plan", description: "Water inlet, outlet & drainage layout", rate: "₹ 1.20 / SFT" },
  { no: 4, service: "Full Electrical Plan", description: "Load calculation, DB design & detailed wiring system", rate: "₹ 2.50 / SFT" },
  { no: 5, service: "Full Plumbing Plan", description: "Complete water supply, drainage & septic system design", rate: "₹ 2.50 / SFT" },
  { no: 6, service: "Elevation Working Drawing", description: "Detailed construction-ready elevation drawings", rate: "₹ 1,000 / Floor" },
  { no: 7, service: "Structural Drawing", description: "Beam, column, footing & slab design with safety standards", rate: "₹ 3.00 / SFT" },
  { no: 8, service: "Column Layout Plan", description: "Structural grid layout with accurate column positioning", rate: "₹ 1.50 / SFT" },
  { no: 9, service: "Staircase Detail Drawing", description: "Sectional drawing with riser, tread & handrail details", rate: "₹ 1,500" },
  { no: 10, service: "Terrace Layout Plan", description: "Drainage slope, overhead tank & service area planning", rate: "₹ 1.00 / SFT" },
];

export const interiorDesignServicePlans: ServicePlanItem[] = [
  { no: 1, service: "Interior Layout Plan", description: "Space planning & zoning", rate: "₹ 2.00 / SFT" },
  { no: 2, service: "Furniture Layout Plan", description: "Furniture positioning & dimensions", rate: "₹ 1.50 / SFT" },
  { no: 3, service: "False Ceiling Design", description: "Gypsum/POP ceiling layout", rate: "₹ 2.00 / SFT" },
  { no: 4, service: "Lighting Design", description: "Ambient, task & accent lighting", rate: "₹ 1.50 / SFT" },
  { no: 5, service: "Modular Kitchen Design", description: "Layout + working drawings", rate: "₹ 3,000" },
  { no: 6, service: "Wardrobe Design", description: "Elevation + internal layout", rate: "₹ 2,000" },
  { no: 7, service: "TV Unit Design", description: "Custom elevation design", rate: "₹ 1,500" },
  { no: 8, service: "Bedroom Interior Design", description: "Complete concept design", rate: "₹ 5,000 / Room" },
  { no: 9, service: "Living Room Design", description: "Premium visual concept", rate: "₹ 6,000" },
  { no: 10, service: "Interior 3D Views", description: "Realistic render per room", rate: "₹ 2,500 / View" },
];

export const elevation3DServicePlans: ServicePlanItem[] = [
  { no: 1, service: "Single Side Elevation (3D)", description: "One-side exterior design", rate: "₹ 3,500 / Floor" },
  { no: 2, service: "Double Side Elevation (3D)", description: "Two-side elevation design", rate: "₹ 5,500 / Floor" },
  { no: 3, service: "Kerala Style Elevation", description: "Traditional Kerala architecture", rate: "₹ 7,500 / Floor" },
  { no: 4, service: "Premium / Traditional Design", description: "High-end customized elevation", rate: "₹ 12,000 / Floor" },
  { no: 5, service: "2D Elevation Design", description: "Basic elevation drawing", rate: "₹ 800 / Floor" },
  { no: 6, service: "Working Drawings", description: "Detailed execution drawings", rate: "₹ 1,000" },
  { no: 7, service: "Exterior Walkthrough Video (15 sec)", description: "3D animation", rate: "₹ 1,500" },
  { no: 8, service: "Walkthrough Video (30 sec)", description: "Premium animation", rate: "₹ 3,000" },
  { no: 9, service: "3D Floor Plan", description: "Furnished 3D layout", rate: "₹ 2,000" },
  { no: 10, service: "Landscape Design", description: "Garden & exterior planning", rate: "₹ 2,500" },
];

export const approvalDocumentationServicePlans: ServicePlanItem[] = [
  { no: 1, service: "Building Approval Drawing", description: "Municipality submission drawings", rate: "₹ 3.00 / SFT" },
  { no: 2, service: "Estimate & BOQ", description: "Material + cost estimation", rate: "₹ 2.00 / SFT" },
  { no: 3, service: "Site Plan", description: "Plot layout with setbacks", rate: "₹ 1,500" },
  { no: 4, service: "Section Drawings", description: "Building cross-sections", rate: "₹ 1,500" },
  { no: 5, service: "Working Drawing Set", description: "Complete execution drawing package", rate: "₹ 5.00 / SFT" },
  { no: 6, service: "As-Built Drawing", description: "Final executed drawing reflecting actual site conditions", rate: "₹ 2.00 / SFT" },
];

export interface SignaturePackage {
  name: string;
  badge?: string;
  includedServices: string;
  rateFormula: string;
  description: string;
}

export const signaturePackages: SignaturePackage[] = [
  {
    name: "Basic Package",
    badge: "Essential",
    includedServices: "Floor Plan + Basic Electrical + Basic Plumbing",
    rateFormula: "₹ 3.60 / SFT",
    description: "Standard architectural floor layout with basic utility layouts.",
  },
  {
    name: "Standard Package",
    badge: "Most Popular",
    includedServices: "Floor Plan + Full Electrical + Full Plumbing",
    rateFormula: "₹ 6.20 / SFT",
    description: "Complete execution-ready floor plan with comprehensive MEP design.",
  },
  {
    name: "Premium Package",
    badge: "Architect Choice",
    includedServices: "All Plans + Structural + 3D Elevation + Working Drawing",
    rateFormula: "₹ 9.50 – ₹ 12.00 / SFT",
    description: "Full architectural, structural & 3D exterior package ready for site construction.",
  },
  {
    name: "Elite Package",
    badge: "Flagship",
    includedServices: "Complete Design + Interior + 3D + Walkthrough + BOQ",
    rateFormula: "₹ 15.00+ / SFT",
    description: "Turnkey luxury architectural, interior, 3D animation and cost estimation package.",
  },
];
