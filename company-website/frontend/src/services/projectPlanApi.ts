import type { PlannerState } from "@/components/planner/types";
import type { Attachment } from "@/lib/attachments";
import { trackLeadEvent } from "@/lib/analytics";

export interface ProjectPlanPayload {
  name: string;
  email: string;
  phone: string;
  projectType: "Residential" | "Commercial" | string;
  commercialType?: string;
  commercialDetails?: {
    units: number;
    kitchens: number;
    restrooms: number;
    facilities: string[];
  };
  projectName?: string;
  location?: string;

  plotLength?: number;
  plotWidth?: number;
  plotUnit?: "ft" | "m" | string;
  plotAreaSft?: number;

  footprintLength?: number;
  footprintWidth?: number;

  roadSide?: string;
  roadWidth?: number;
  roadLevel?: string;
  hasBasement?: boolean;
  /** e.g. "Parking (4 cars, 4 two-wheelers) + Custom Rooms" — only set when hasBasement is true. */
  basementSummary?: string;

  frontSetback?: number;
  rearSetback?: number;
  leftSetback?: number;
  rightSetback?: number;

  totalBuiltUpSft?: number;
  numFloors?: number;
  parkingCarsCount?: number;
  parkingTwoWheelersCount?: number;

  floorDetails?: string;
  selectedPackage?: string;
  selectedServices?: string;
  selectedFeatures?: string;
  estimatedFee?: number;
  specialNotes?: string;

  plannerStateJson?: string;
  attachments?: Attachment[];
}

export interface ProjectPlanResponse {
  id: number;
  refCode: string;
  name: string;
  email: string;
  phone: string;
  projectType: string;
  commercialType?: string;
  projectName?: string;
  location?: string;
  plotLength?: number;
  plotWidth?: number;
  plotUnit?: string;
  plotAreaSft?: number;
  totalBuiltUpSft?: number;
  numFloors?: number;
  floorDetails?: string;
  selectedPackage?: string;
  selectedServices?: string;
  selectedFeatures?: string;
  parkingCarsCount?: number;
  parkingTwoWheelersCount?: number;
  roadSide?: string;
  estimatedFee?: number;
  specialNotes?: string;
  status: string;
  createdAt: string;
}

export interface ProjectPlanSummary {
  id: number;
  refCode: string;
  name: string;
  email: string;
  phone: string;
  projectType: string;
  commercialType?: string;
  projectName?: string;
  location?: string;
  plotAreaSft?: number;
  totalBuiltUpSft?: number;
  numFloors?: number;
  estimatedFee?: number;
  status: string;
  createdAt: string;
}

export interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

// Local cache for client-side storage
const STORAGE_KEY = "prasanth_project_plans";

function getLocalPlans(): ProjectPlanResponse[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveLocalPlan(plan: ProjectPlanResponse) {
  if (typeof window === "undefined") return;
  try {
    const plans = getLocalPlans();
    plans.unshift(plan);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(plans));
  } catch (e) {
    console.warn("Could not save plan to localStorage:", e);
  }
}

/**
 * Save project plan submission directly to Google Sheets & local cache
 */
export async function saveProjectPlan(payload: ProjectPlanPayload): Promise<ProjectPlanResponse> {
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const refCode = `PRJ-${new Date().getFullYear()}-${randomNum}`;

  const planResponse: ProjectPlanResponse = {
    id: Date.now(),
    refCode,
    name: payload.name,
    email: payload.email,
    phone: payload.phone,
    projectType: payload.projectType,
    commercialType: payload.commercialType,
    projectName: payload.projectName,
    location: payload.location || "Tamil Nadu",
    plotLength: payload.plotLength,
    plotWidth: payload.plotWidth,
    plotUnit: payload.plotUnit,
    plotAreaSft: payload.plotAreaSft,
    totalBuiltUpSft: payload.totalBuiltUpSft,
    numFloors: payload.numFloors,
    floorDetails: payload.floorDetails,
    selectedPackage: payload.selectedPackage,
    selectedServices: payload.selectedServices,
    selectedFeatures: payload.selectedFeatures,
    parkingCarsCount: payload.parkingCarsCount,
    parkingTwoWheelersCount: payload.parkingTwoWheelersCount,
    roadSide: payload.roadSide,
    estimatedFee: payload.estimatedFee,
    specialNotes: payload.specialNotes,
    status: "NEW",
    createdAt: new Date().toISOString(),
  };

  // The team must receive the plan before it is treated as submitted locally.
  const {
    name, phone, email, projectType, commercialType, location,
    estimatedFee, attachments, ...requirements
  } = payload;

  let res: Response;
  try {
    res = await fetch("/api/sync-sheets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        formType: "Building Planner",
        refCode: planResponse.refCode,
        name,
        phone,
        email,
        projectType: projectType + (commercialType ? ` (${commercialType})` : ""),
        location: location || "Tamil Nadu",
        estimatedBudget: estimatedFee,
        // Keep every requirement, including floor/room configurations and the
        // individual services. Contact fields have their own Sheet columns.
        details: JSON.stringify(requirements, null, 2),
        attachments: attachments || [],
      }),
    });
  } catch (sheetErr) {
    console.warn("[GoogleSheets] Project plan submission failed:", sheetErr);
    throw new Error("We couldn't save your project plan. Please try again or contact us by phone or WhatsApp.");
  }

  const result = await res.json().catch(() => null);
  if (!res.ok || result?.success !== true) {
    throw new Error(
      typeof result?.error === "string"
        ? result.error
        : "We couldn't save your project plan. Please try again or contact us by phone or WhatsApp."
    );
  }

  saveLocalPlan(planResponse);
  trackLeadEvent("form_submit", { form: "planner", location: payload.location });
  return planResponse;
}

/**
 * Retrieve project plans list from local storage
 */
export async function getProjectPlans(
  status?: string,
  page: number = 0,
  size: number = 20
): Promise<PaginatedResponse<ProjectPlanSummary>> {
  const all = getLocalPlans();
  const filtered = status ? all.filter(p => p.status === status) : all;
  const start = page * size;
  const content = filtered.slice(start, start + size);

  return {
    content,
    totalElements: filtered.length,
    totalPages: Math.ceil(filtered.length / size) || 1,
    size,
    number: page,
  };
}

/**
 * Retrieve single project plan details by ID
 */
export async function getProjectPlanById(id: number): Promise<ProjectPlanResponse> {
  const all = getLocalPlans();
  const plan = all.find(p => p.id === id);
  if (!plan) {
    throw new Error(`Project plan #${id} not found.`);
  }
  return plan;
}

/**
 * Retrieve single project plan details by Reference Code
 */
export async function getProjectPlanByRefCode(refCode: string): Promise<ProjectPlanResponse> {
  const all = getLocalPlans();
  const plan = all.find(p => p.refCode.toUpperCase() === refCode.toUpperCase());
  if (!plan) {
    throw new Error(`Project plan with ref code ${refCode} not found.`);
  }
  return plan;
}

/**
 * Helper to construct payload from PlannerState
 */
export function buildPayloadFromPlannerState(
  state: PlannerState,
  contact: { name: string; email: string; phone: string }
): ProjectPlanPayload {
  const footprintArea = Math.round(state.footprint.length * state.footprint.width);
  const totalBuiltUp = state.floors.reduce((acc, f) => acc + (f.builtUpSft || footprintArea), 0);
  const plotArea = Math.round(state.plot.length * state.plot.width);
  const cars = state.floors.reduce((sum, f) => sum + (f.parkingCarsCount || 0), 0);
  const twoWheelers = state.floors.reduce((sum, f) => sum + (f.parkingTwoWheelersCount || 0), 0);
  const estimatedCost = totalBuiltUp * 2200;

  const basementFloor = state.floors.find((f) => f.floorId === "basement");
  const basementSummary = basementFloor
    ? [
        basementFloor.basementHasParking ? `Parking (${basementFloor.parkingCarsCount || 0} cars, ${basementFloor.parkingTwoWheelersCount || 0} two-wheelers)` : null,
        basementFloor.basementHasCustomRooms ? "Custom Rooms" : null,
      ].filter(Boolean).join(" + ")
    : undefined;

  return {
    name: contact.name,
    email: contact.email,
    phone: contact.phone,
    projectType: state.setup.projectType,
    commercialType: state.setup.commercialType,
    projectName:
      state.setup.projectName ||
      `${state.setup.projectType} Project at ${state.setup.location || "Tamil Nadu"}`,
    location: state.setup.location,
    plotLength: state.plot.length,
    plotWidth: state.plot.width,
    plotUnit: state.plot.unit,
    plotAreaSft: plotArea,
    footprintLength: state.footprint.length,
    footprintWidth: state.footprint.width,
    numFloors: state.floors.length,
    totalBuiltUpSft: totalBuiltUp,
    floorDetails: JSON.stringify(state.floors),
    parkingCarsCount: cars,
    parkingTwoWheelersCount: twoWheelers,
    roadSide: state.road.roadSide,
    roadWidth: state.road.roadWidth,
    roadLevel: state.roadLevel.level,
    hasBasement: !!basementFloor,
    basementSummary,
    frontSetback: state.road.frontSetback,
    rearSetback: state.road.rearSetback,
    leftSetback: state.road.leftSetback,
    rightSetback: state.road.rightSetback,
    estimatedFee: estimatedCost,
    specialNotes: state.setup.notes,
    attachments: state.attachments,
  };
}
