// Grouping of the 15-entry STEP_SEQUENCE into the phases shown in the step rail.
// stepMin/stepMax are indices into STEP_SEQUENCE in ApplePlannerApp.
export interface PlannerPhase {
  label: string;
  description: string;
  stepMin: number;
  stepMax: number;
}

export const PLANNER_PHASES: PlannerPhase[] = [
  { label: "Project", description: "Category & identity", stepMin: 0, stepMax: 1 },
  { label: "Plot", description: "Boundary & footprint", stepMin: 2, stepMax: 3 },
  { label: "Level", description: "Road & terrain", stepMin: 4, stepMax: 5 },
  { label: "Floors", description: "Building levels", stepMin: 6, stepMax: 7 },
  { label: "Rooms", description: "Floor-by-floor", stepMin: 8, stepMax: 11 },
  { label: "Services", description: "Utilities & outdoors", stepMin: 12, stepMax: 12 },
  { label: "Review", description: "Validation audit", stepMin: 13, stepMax: 13 },
  { label: "Report", description: "Final brief", stepMin: 14, stepMax: 14 },
];

export const getActivePhase = (stepIndex: number): PlannerPhase | undefined =>
  PLANNER_PHASES.find((p) => stepIndex >= p.stepMin && stepIndex <= p.stepMax);
