export type RateType = "per_sft" | "per_floor" | "fixed";

export interface ServiceItem {
  id: string;
  service: string;
  description: string;
  rateLabel: string;
  rateType: RateType;
  rateValue: number; // numeric value; for per_sft: per sq ft, for per_floor: per floor, for fixed: flat amount
}

export interface ServiceCategory {
  id: string;
  label: string;
  shortLabel: string;
  items: ServiceItem[];
}

export const serviceCategories: ServiceCategory[] = [
  {
    id: "arch",
    label: "Architectural & Site Plans",
    shortLabel: "Architecture",
    items: [
      { id: "arch-floor-plan", service: "Architectural Floor Plan", description: "Conceptual + detailed space planning with Vastu consideration", rateLabel: "₹1.20 / SFT", rateType: "per_sft", rateValue: 1.20 },
      { id: "arch-basic-elec", service: "Basic Electrical Plan", description: "Lighting layout, switch points & basic wiring plan", rateLabel: "₹1.20 / SFT", rateType: "per_sft", rateValue: 1.20 },
      { id: "arch-basic-plumb", service: "Basic Plumbing Plan", description: "Water inlet, outlet & drainage layout", rateLabel: "₹1.20 / SFT", rateType: "per_sft", rateValue: 1.20 },
      { id: "arch-full-elec", service: "Full Electrical Plan", description: "Load calculation, DB design & detailed wiring system", rateLabel: "₹2.50 / SFT", rateType: "per_sft", rateValue: 2.50 },
      { id: "arch-full-plumb", service: "Full Plumbing Plan", description: "Complete water supply, drainage & septic system design", rateLabel: "₹2.50 / SFT", rateType: "per_sft", rateValue: 2.50 },
      { id: "arch-elev-working", service: "Elevation Working Drawing", description: "Detailed construction-ready elevation drawings", rateLabel: "₹1,000 / Floor", rateType: "per_floor", rateValue: 1000 },
      { id: "arch-structural", service: "Structural Drawing", description: "Beam, column, footing & slab design with safety standards", rateLabel: "₹3.00 / SFT", rateType: "per_sft", rateValue: 3.00 },
      { id: "arch-column", service: "Column Layout Plan", description: "Structural grid layout with accurate column positioning", rateLabel: "₹1.50 / SFT", rateType: "per_sft", rateValue: 1.50 },
      { id: "arch-staircase", service: "Staircase Detail Drawing", description: "Sectional drawing with riser, tread & handrail details", rateLabel: "₹1,500 Fixed", rateType: "fixed", rateValue: 1500 },
      { id: "arch-terrace", service: "Terrace Layout Plan", description: "Drainage slope, overhead tank & service area planning", rateLabel: "₹1.00 / SFT", rateType: "per_sft", rateValue: 1.00 },
    ],
  },
  {
    id: "interior",
    label: "Interior Design Services",
    shortLabel: "Interior",
    items: [
      { id: "int-layout", service: "Interior Layout Plan", description: "Space planning & zoning", rateLabel: "₹2.00 / SFT", rateType: "per_sft", rateValue: 2.00 },
      { id: "int-furniture", service: "Furniture Layout Plan", description: "Furniture positioning & dimensions", rateLabel: "₹1.50 / SFT", rateType: "per_sft", rateValue: 1.50 },
      { id: "int-ceiling", service: "False Ceiling Design", description: "Gypsum/POP ceiling layout", rateLabel: "₹2.00 / SFT", rateType: "per_sft", rateValue: 2.00 },
      { id: "int-lighting", service: "Lighting Design", description: "Ambient, task & accent lighting", rateLabel: "₹1.50 / SFT", rateType: "per_sft", rateValue: 1.50 },
      { id: "int-kitchen", service: "Modular Kitchen Design", description: "Layout + working drawings", rateLabel: "₹3,000 Fixed", rateType: "fixed", rateValue: 3000 },
      { id: "int-wardrobe", service: "Wardrobe Design", description: "Elevation + internal layout", rateLabel: "₹2,000 Fixed", rateType: "fixed", rateValue: 2000 },
      { id: "int-tv", service: "TV Unit Design", description: "Custom elevation design", rateLabel: "₹1,500 Fixed", rateType: "fixed", rateValue: 1500 },
      { id: "int-bedroom", service: "Bedroom Interior Design", description: "Complete concept design", rateLabel: "₹5,000 / Room", rateType: "fixed", rateValue: 5000 },
      { id: "int-living", service: "Living Room Design", description: "Premium visual concept", rateLabel: "₹6,000 Fixed", rateType: "fixed", rateValue: 6000 },
      { id: "int-3d-views", service: "Interior 3D Views", description: "Realistic render per room", rateLabel: "₹2,500 / View", rateType: "fixed", rateValue: 2500 },
    ],
  },
  {
    id: "elevation",
    label: "Elevation & 3D Design",
    shortLabel: "3D & Elevation",
    items: [
      { id: "el-single", service: "Single Side Elevation (3D)", description: "One-side exterior design", rateLabel: "₹3,500 / Floor", rateType: "per_floor", rateValue: 3500 },
      { id: "el-double", service: "Double Side Elevation (3D)", description: "Two-side elevation design", rateLabel: "₹5,500 / Floor", rateType: "per_floor", rateValue: 5500 },
      { id: "el-kerala", service: "Kerala Style Elevation", description: "Traditional Kerala architecture", rateLabel: "₹7,500 / Floor", rateType: "per_floor", rateValue: 7500 },
      { id: "el-premium", service: "Premium / Traditional Design", description: "High-end customized elevation", rateLabel: "₹12,000 / Floor", rateType: "per_floor", rateValue: 12000 },
      { id: "el-2d", service: "2D Elevation Design", description: "Basic elevation drawing", rateLabel: "₹800 / Floor", rateType: "per_floor", rateValue: 800 },
      { id: "el-working", service: "Working Drawings", description: "Detailed execution drawings", rateLabel: "₹1,000 Fixed", rateType: "fixed", rateValue: 1000 },
      { id: "el-walk15", service: "Exterior Walkthrough (15 sec)", description: "3D animation", rateLabel: "₹1,500 Fixed", rateType: "fixed", rateValue: 1500 },
      { id: "el-walk30", service: "Walkthrough Video (30 sec)", description: "Premium animation", rateLabel: "₹3,000 Fixed", rateType: "fixed", rateValue: 3000 },
      { id: "el-3dplan", service: "3D Floor Plan", description: "Furnished 3D layout", rateLabel: "₹2,000 Fixed", rateType: "fixed", rateValue: 2000 },
      { id: "el-landscape", service: "Landscape Design", description: "Garden & exterior planning", rateLabel: "₹2,500 Fixed", rateType: "fixed", rateValue: 2500 },
    ],
  },
  {
    id: "approval",
    label: "Approval & Documentation",
    shortLabel: "Approval & BOQ",
    items: [
      { id: "ap-building", service: "Building Approval Drawing", description: "Municipality submission drawings", rateLabel: "₹3.00 / SFT", rateType: "per_sft", rateValue: 3.00 },
      { id: "ap-boq", service: "Estimate & BOQ", description: "Material + cost estimation", rateLabel: "₹2.00 / SFT", rateType: "per_sft", rateValue: 2.00 },
      { id: "ap-site", service: "Site Plan", description: "Plot layout with setbacks", rateLabel: "₹1,500 Fixed", rateType: "fixed", rateValue: 1500 },
      { id: "ap-section", service: "Section Drawings", description: "Building cross-sections", rateLabel: "₹1,500 Fixed", rateType: "fixed", rateValue: 1500 },
      { id: "ap-working-set", service: "Working Drawing Set", description: "Complete execution drawing package", rateLabel: "₹5.00 / SFT", rateType: "per_sft", rateValue: 5.00 },
      { id: "ap-asbuilt", service: "As-Built Drawing", description: "Final executed drawing reflecting actual site conditions", rateLabel: "₹2.00 / SFT", rateType: "per_sft", rateValue: 2.00 },
    ],
  },
];

// Legacy exports for the static rate card table
export type { ServiceCategoryTable } from "./rateCardsLegacy";
export { architecturalServicePlans, interiorDesignServicePlans, elevation3DServicePlans, approvalDocumentationServicePlans, signaturePackages } from "./rateCardsLegacy";
export type { ServicePlanItem, SignaturePackage } from "./rateCardsLegacy";
