export type StepId =
  | "welcome"
  | "setup"
  | "plot"
  | "footprint"
  | "road"
  | "level"
  | "floors_config"
  | "floor_planner"
  | "room_config"
  | "bathrooms"
  | "kitchen"
  | "living"
  | "utilities"
  | "review"
  | "report";

export interface ProjectSetupData {
  projectType: "Residential" | "Commercial";
  commercialType?: string;
  projectName: string;
  location: string;
  notes: string;
  clientName?: string;
  email?: string;
  phone?: string;
}

export interface PlotData {
  length: number;
  width: number;
  unit: "ft" | "m";
}

export interface BuildingFootprintData {
  length: number;
  width: number;
}

export interface RoadData {
  roadSide: "North" | "East" | "South" | "West";
  knowRoadWidth: "Yes" | "No";
  roadWidth: number;
  knowSetbacks: "Yes" | "No" | "Not Sure";
  frontSetback: number;
  rearSetback: number;
  leftSetback: number;
  rightSetback: number;
}

export interface RoadLevelData {
  level: "Below Road Level" | "Same as Road Level" | "Above Road Level";
  hasBasement: boolean;
}

export interface BedroomCustomization {
  id: string;
  title: string;
  type: "Master Bedroom" | "Normal Bedroom";
  attachedBath: boolean;
  dressingRoom: boolean;
  walkInWardrobe: boolean;
  balcony: boolean;
  preferredSize: "Compact (12x12)" | "Standard (14x16)" | "Spacious (16x20)";
}

export interface FloorRequirement {
  floorId: string;
  floorName: string;
  technicalName: string;
  isConfigured: boolean;
  builtUpSft: number;
  /** Only meaningful for the basement floor. Independent — a basement can have parking, custom rooms (via the full per-floor wizard), or both. */
  basementHasParking?: boolean;
  basementHasCustomRooms?: boolean;

  // Bedrooms
  masterBedroomsCount: number;
  normalBedroomsCount: number;
  bedroomCustomizations: BedroomCustomization[];

  // Bathrooms
  attachedBathsCount: number;
  commonBathsCount: number;
  hasGuestPowderRoom: boolean;

  // Kitchen
  hasKitchen: boolean;
  kitchenType: "Open" | "Semi-Open" | "Closed";
  hasUtilityWash: boolean;
  hasPantry: boolean;
  hasDiningArea: boolean;
  kitchenLocation: "Near Dining" | "Near Entrance" | "Rear Side" | "User Decides";

  // Living & Family Spaces
  livingSpaces: string[];

  // Other Utilities & Requirements
  otherFeatures: string[];
  parkingCarsCount: number;
  parkingTwoWheelersCount: number;
}

export interface EngineeringValidationWarning {
  id: string;
  type: "area" | "parking" | "plumbing" | "basement" | "setback";
  severity: "info" | "warning";
  title: string;
  message: string;
  actionText?: string;
  stepTarget?: StepId;
}

import type { Attachment } from "@/lib/attachments";

export interface PlannerState {
  currentStep: StepId;
  activeFloorId: string; // The floor currently being configured
  setup: ProjectSetupData;
  plot: PlotData;
  footprint: BuildingFootprintData;
  road: RoadData;
  roadLevel: RoadLevelData;
  floors: FloorRequirement[];
  /** Next architectural level to assign when a floor is added (never reused, even after removals). */
  nextFloorLevel: number;
  /** Site sketches / photos uploaded to Drive during the wizard. */
  attachments: Attachment[];
  lastSavedAt: string;
  savedRefCode?: string;
}
