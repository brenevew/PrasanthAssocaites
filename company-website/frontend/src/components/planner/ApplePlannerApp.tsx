"use client";

import React, { useState, useMemo, useRef } from "react";
import {
  StepId,
  PlannerState,
  FloorRequirement,
  EngineeringValidationWarning,
} from "./types";
import PlannerStepRail from "./PlannerStepRail";
import PlannerLiveSummary from "./PlannerLiveSummary";

import StepWelcome from "./steps/StepWelcome";
import StepProjectSetup from "./steps/StepProjectSetup";
import StepPlotDetails from "./steps/StepPlotDetails";
import StepConstructionDetails from "./steps/StepConstructionDetails";
import StepRoadDetails from "./steps/StepRoadDetails";
import StepRoadLevel from "./steps/StepRoadLevel";
import StepFloorConfig from "./steps/StepFloorConfig";
import StepFloorPlanner from "./steps/StepFloorPlanner";
import StepRoomConfig from "./steps/StepRoomConfig";
import StepBathrooms from "./steps/StepBathrooms";
import StepKitchen from "./steps/StepKitchen";
import StepLivingSpaces from "./steps/StepLivingSpaces";
import StepOtherRequirements from "./steps/StepOtherRequirements";
import StepReviewValidation from "./steps/StepReviewValidation";
import StepBuildingReport from "./steps/StepBuildingReport";

const STEP_SEQUENCE: StepId[] = [
  "welcome",
  "setup",
  "plot",
  "footprint",
  "road",
  "level",
  "floors_config",
  "floor_planner",
  "room_config",
  "bathrooms",
  "kitchen",
  "living",
  "utilities",
  "review",
  "report",
];

const getArchitecturalFloorName = (index: number): string => {
  if (index === 0) return "Ground Floor";
  if (index === 1) return "1st Floor";
  if (index === 2) return "2nd Floor";
  if (index === 3) return "3rd Floor";
  return `${index}th Floor`;
};

const initialFloor: FloorRequirement = {
  floorId: "ground",
  floorName: "Ground Floor",
  technicalName: "Ground Floor",
  isConfigured: false,
  builtUpSft: 0,
  masterBedroomsCount: 1,
  normalBedroomsCount: 1,
  bedroomCustomizations: [
    {
      id: "master_01",
      title: "Master Bedroom 01",
      type: "Master Bedroom",
      attachedBath: true,
      dressingRoom: true,
      walkInWardrobe: false,
      balcony: true,
      preferredSize: "Standard (14x16)",
    },
    {
      id: "normal_01",
      title: "Bedroom 01",
      type: "Normal Bedroom",
      attachedBath: false,
      dressingRoom: false,
      walkInWardrobe: false,
      balcony: false,
      preferredSize: "Standard (14x16)",
    },
  ],
  attachedBathsCount: 1,
  commonBathsCount: 1,
  hasGuestPowderRoom: true,
  hasKitchen: true,
  kitchenType: "Semi-Open",
  hasUtilityWash: true,
  hasPantry: true,
  hasDiningArea: true,
  kitchenLocation: "Near Dining",
  livingSpaces: ["Living Room", "Dining Room", "Pooja Room"],
  otherFeatures: ["Internal Staircase", "Veranda / Entrance Porch"],
  parkingCarsCount: 2,
  parkingTwoWheelersCount: 2,
};

const initialUpperFloor: FloorRequirement = {
  floorId: "first",
  floorName: "First Floor",
  technicalName: "1st Floor",
  isConfigured: false,
  builtUpSft: 0,
  masterBedroomsCount: 2,
  normalBedroomsCount: 1,
  bedroomCustomizations: [],
  attachedBathsCount: 2,
  commonBathsCount: 1,
  hasGuestPowderRoom: false,
  hasKitchen: false,
  kitchenType: "Open",
  hasUtilityWash: false,
  hasPantry: false,
  hasDiningArea: false,
  kitchenLocation: "User Decides",
  livingSpaces: ["Family Room", "Home Office"],
  otherFeatures: ["Balcony / Open Sitout"],
  parkingCarsCount: 0,
  parkingTwoWheelersCount: 0,
};

// Parking and Custom Rooms are independent — a basement can have either,
// or both at once. A basement with Custom Rooms on starts unconfigured and
// goes through the same per-floor wizard as any other floor; a Parking-only
// basement needs no room configuration, so it's marked configured right away.
const buildBasementFloor = (hasParking: boolean, hasCustomRooms: boolean): FloorRequirement => ({
  floorId: "basement",
  floorName: "Basement",
  technicalName: "Basement",
  isConfigured: !hasCustomRooms,
  builtUpSft: 0,
  basementHasParking: hasParking,
  basementHasCustomRooms: hasCustomRooms,
  masterBedroomsCount: 0,
  normalBedroomsCount: hasCustomRooms ? 1 : 0,
  bedroomCustomizations: [],
  attachedBathsCount: 0,
  commonBathsCount: hasCustomRooms ? 1 : 0,
  hasGuestPowderRoom: false,
  hasKitchen: false,
  kitchenType: "Open",
  hasUtilityWash: false,
  hasPantry: false,
  hasDiningArea: false,
  kitchenLocation: "User Decides",
  livingSpaces: hasParking && !hasCustomRooms ? ["Storage"] : [],
  otherFeatures: [],
  parkingCarsCount: hasParking ? 4 : 0,
  parkingTwoWheelersCount: hasParking ? 4 : 0,
});

export default function ApplePlannerApp() {
  const plannerRef = useRef<HTMLDivElement>(null);

  // Scrolls the planner itself (not the page) to the top of the viewport, so the
  // marketing hero above it on /plan-home doesn't push the new step's inputs below
  // the fold. Scrolling stays enabled — this just changes where each step lands.
  const scrollPlannerIntoView = () => {
    plannerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const [state, setState] = useState<PlannerState>({
    currentStep: "welcome",
    activeFloorId: "ground",
    attachments: [],
    setup: {
      projectType: "Residential",
      projectName: "My Family Home",
      location: "Hyderguda, Hyderabad",
      notes: "Modern 2-story residence with ample green ventilation.",
    },
    plot: {
      length: 0,
      width: 0,
      unit: "ft",
    },
    footprint: {
      length: 0,
      width: 0,
    },
    road: {
      roadSide: "East",
      knowRoadWidth: "Yes",
      roadWidth: 0,
      knowSetbacks: "Not Sure",
      frontSetback: 0,
      rearSetback: 0,
      leftSetback: 0,
      rightSetback: 0,
    },
    roadLevel: {
      level: "Same as Road Level",
      hasBasement: false,
    },
    floors: [initialFloor, initialUpperFloor],
    nextFloorLevel: 2,
    lastSavedAt: new Date().toLocaleTimeString(),
  });

  const stepIndex = STEP_SEQUENCE.indexOf(state.currentStep);
  const totalSteps = STEP_SEQUENCE.length - 1; // Excluding welcome step count

  // Active Floor object currently being edited
  const activeFloor = useMemo(() => {
    return state.floors.find((f) => f.floorId === state.activeFloorId) || state.floors[0];
  }, [state.floors, state.activeFloorId]);

  // Derived Real-Time Engineering Validation Warnings
  const warnings = useMemo<EngineeringValidationWarning[]>(() => {
    const list: EngineeringValidationWarning[] = [];
    const plotArea = Math.round(state.plot.length * state.plot.width);
    const footprintArea = Math.round(state.footprint.length * state.footprint.width);

    // Footprint vs Plot warning
    if (footprintArea > plotArea * 0.85 && plotArea > 0) {
      list.push({
        id: "footprint_tight",
        type: "area",
        severity: "info",
        title: "High Building Coverage",
        message: `Building footprint occupies ${Math.round((footprintArea / plotArea) * 100)}% of plot area. Ensure sufficient setback clearance per municipal bye-laws.`,
        stepTarget: "footprint",
      });
    }

    // Parking vs Footprint warning
    const groundFloor = state.floors.find((f) => f.floorId === "ground");
    if (groundFloor && groundFloor.parkingCarsCount >= 3) {
      list.push({
        id: "parking_footprint",
        type: "parking",
        severity: "info",
        title: "Parking Space Requirement",
        message: `${groundFloor.parkingCarsCount} car parking bays will occupy approx. ${groundFloor.parkingCarsCount * 180} SFT of ground floor footprint.`,
        stepTarget: "utilities",
      });
    }

    // Basement Notice
    if (state.roadLevel.level === "Below Road Level") {
      list.push({
        id: "basement_site",
        type: "basement",
        severity: "info",
        title: "Basement Feasibility Investigation",
        message: "Site soil testing and groundwater depth analysis required prior to excavation.",
        stepTarget: "level",
      });
    }

    return list;
  }, [state]);

  // Contextual Next Button Labels
  const nextButtonLabel = useMemo(() => {
    switch (state.currentStep) {
      case "welcome":
        return "Start Planning";
      case "setup":
        return "Continue to Plot Details";
      case "plot":
        return "Continue to Footprint";
      case "footprint":
        return "Continue to Road Level";
      case "road":
        return "Continue to Terrain Level";
      case "level":
        return "Configure Building Levels";
      case "floors_config":
        return "Go to Floor-by-Floor Planner";
      case "floor_planner":
        return "Continue to Utilities & Outdoors";
      case "room_config":
        return `Continue to ${activeFloor.floorName} Bathrooms`;
      case "bathrooms":
        return `Continue to ${activeFloor.floorName} Kitchen`;
      case "kitchen":
        return `Continue to ${activeFloor.floorName} Living Spaces`;
      case "living":
        return `Save & Return to Floor List`;
      case "utilities":
        return "Review Complete Requirements";
      case "review":
        return "Generate Building Report";
      case "report":
        return "Print Report";
      default:
        return "Continue";
    }
  }, [state.currentStep, activeFloor]);

  // Handler to navigate step
  const handleNavigate = (targetStep: StepId) => {
    setState((prev) => ({ ...prev, currentStep: targetStep }));
    scrollPlannerIntoView();
  };

  const handleNextStep = () => {
    // Living → mark floor configured, return to floor planner hub
    if (state.currentStep === "living") {
      setState((prev) => ({
        ...prev,
        floors: prev.floors.map((fl) =>
          fl.floorId === prev.activeFloorId ? { ...fl, isConfigured: true } : fl
        ),
        currentStep: "floor_planner",
      }));
      scrollPlannerIntoView();
      return;
    }

    // Floor planner hub → skip straight to utilities (bypass the per-floor sub-flow)
    if (state.currentStep === "floor_planner") {
      handleNavigate("utilities");
      return;
    }

    // room_config → bathrooms → kitchen → living (sequential sub-flow)
    // All other steps: advance one step in the sequence
    const currentIndex = STEP_SEQUENCE.indexOf(state.currentStep);
    if (currentIndex < STEP_SEQUENCE.length - 1) {
      handleNavigate(STEP_SEQUENCE[currentIndex + 1]);
    }
  };

  const handlePrevStep = () => {
    // From utilities, go back to floor planner hub
    if (state.currentStep === "utilities") {
      handleNavigate("floor_planner");
      return;
    }

    // From any per-floor sub-step, go back to floor planner hub
    if (
      state.currentStep === "room_config" ||
      state.currentStep === "bathrooms" ||
      state.currentStep === "kitchen" ||
      state.currentStep === "living"
    ) {
      // Within the sub-flow, go to the previous sub-step (not hub)
      const subFlow: StepId[] = ["room_config", "bathrooms", "kitchen", "living"];
      const idx = subFlow.indexOf(state.currentStep);
      if (idx > 0) {
        handleNavigate(subFlow[idx - 1]);
      } else {
        handleNavigate("floor_planner");
      }
      return;
    }

    const currentIndex = STEP_SEQUENCE.indexOf(state.currentStep);
    if (currentIndex > 0) {
      handleNavigate(STEP_SEQUENCE[currentIndex - 1]);
    }
  };

  // Select a specific floor to configure in floor room flow
  const handleStartFloorConfig = (floorId: string) => {
    setState((prev) => ({
      ...prev,
      activeFloorId: floorId,
      currentStep: "room_config",
    }));
    scrollPlannerIntoView();
  };

  // Add new floor level
  const handleAddFloor = () => {
    setState((prev) => {
      // Name the new floor by the next architectural level ever assigned —
      // not by the current floor count — so a level name is never reused
      // after an earlier floor at that level was deleted.
      const name = getArchitecturalFloorName(prev.nextFloorLevel);
      const newFl: FloorRequirement = {
        ...initialUpperFloor,
        floorId: `floor_${Date.now()}`,
        floorName: name,
        technicalName: name,
        isConfigured: false,
        builtUpSft: Math.round(prev.footprint.length * prev.footprint.width),
      };

      return {
        ...prev,
        floors: [...prev.floors, newFl],
        nextFloorLevel: prev.nextFloorLevel + 1,
      };
    });
  };

  // Remove floor level
  const handleRemoveFloor = (floorId: string) => {
    setState((prev) => {
      if (prev.floors.length <= 1) return prev;
      // Only drop the targeted floor — remaining floors keep the names they
      // already have (e.g. removing Ground Floor must not rename First Floor),
      // and nextFloorLevel is left untouched so a future "Add Floor" never
      // reissues a level name that's already been used.
      const filtered = prev.floors.filter((f) => f.floorId !== floorId);
      return {
        ...prev,
        floors: filtered,
        activeFloorId: filtered.some((f) => f.floorId === prev.activeFloorId)
          ? prev.activeFloorId
          : filtered[0]?.floorId,
      };
    });
  };

  // Reset floors back to the default Ground + First Floor setup
  const handleResetFloors = () => {
    setState((prev) => ({
      ...prev,
      floors: [initialFloor, initialUpperFloor],
      nextFloorLevel: 2,
      activeFloorId: "ground",
    }));
  };

  // Basement sits below Ground Floor: it doesn't consume a sequential level
  // number, so toggling it never renames any other floor. Parking and
  // Custom Rooms are independent — a basement can have either, or both.
  const handleRemoveBasement = () => {
    setState((prev) => {
      const filtered = prev.floors.filter((f) => f.floorId !== "basement");
      return {
        ...prev,
        floors: filtered,
        activeFloorId: prev.activeFloorId === "basement" ? filtered[0]?.floorId : prev.activeFloorId,
      };
    });
  };

  const handleToggleBasementOption = (option: "parking" | "custom") => {
    setState((prev) => {
      const existing = prev.floors.find((f) => f.floorId === "basement");
      const hasParking = option === "parking" ? !existing?.basementHasParking : !!existing?.basementHasParking;
      const hasCustomRooms = option === "custom" ? !existing?.basementHasCustomRooms : !!existing?.basementHasCustomRooms;

      if (!hasParking && !hasCustomRooms) {
        // Neither option left selected — nothing to configure, so drop the basement.
        const filtered = prev.floors.filter((f) => f.floorId !== "basement");
        return {
          ...prev,
          floors: filtered,
          activeFloorId: prev.activeFloorId === "basement" ? filtered[0]?.floorId : prev.activeFloorId,
        };
      }

      if (existing) {
        return {
          ...prev,
          floors: prev.floors.map((f) =>
            f.floorId === "basement"
              ? { ...f, basementHasParking: hasParking, basementHasCustomRooms: hasCustomRooms, isConfigured: !hasCustomRooms }
              : f
          ),
        };
      }

      const withoutBasement = prev.floors.filter((f) => f.floorId !== "basement");
      return { ...prev, floors: [buildBasementFloor(hasParking, hasCustomRooms), ...withoutBasement] };
    });
  };

  // Update any floor by id (not just the active one) — used for inline edits
  // like the basement's parking bay counters on the floors_config screen.
  const handleUpdateFloor = (floorId: string, updates: Partial<FloorRequirement>) => {
    setState((prev) => ({
      ...prev,
      floors: prev.floors.map((fl) => (fl.floorId === floorId ? { ...fl, ...updates } : fl)),
    }));
  };

  // Update Active Floor Object
  const handleUpdateActiveFloor = (updates: Partial<FloorRequirement>) => {
    setState((prev) => ({
      ...prev,
      floors: prev.floors.map((fl) =>
        fl.floorId === prev.activeFloorId ? { ...fl, ...updates } : fl
      ),
    }));
  };

  // Welcome and report are full-bleed: no step rail, no summary, no Back/Continue row
  // (each renders its own navigation inline).
  const showSidePanels =
    state.currentStep !== "welcome" && state.currentStep !== "report";

  return (
    // scroll-mt-24 keeps scrollPlannerIntoView() from landing under the fixed site header
    <div
      ref={plannerRef}
      className="flex min-h-screen scroll-mt-24 flex-col bg-background font-sans text-charcoal selection:bg-gold selection:text-charcoal"
    >
      {/* Three-Column Layout: step rail left, inputs centre, live summary right */}
      {/* a <div>, not <main>: the app-router layout already renders the page's <main> */}
      <div className="container max-w-[1600px] flex-1 px-4 py-8 md:px-6">
        {/* no items-start: columns must stretch to the row height, otherwise the sticky
            rail/summary have zero scroll range and just scroll away with the page */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">

          {/* Left Column: Step Progress Rail — the only progress indicator, so it shows
              at every width (stacks above the inputs on small screens) */}
          {showSidePanels && (
            <div className="min-w-0 lg:col-span-3 xl:col-span-2">
              <PlannerStepRail stepIndex={stepIndex} totalSteps={totalSteps} />
            </div>
          )}

          {/* Centre Column: Active Step Inputs */}
          <div
            className={
              showSidePanels
                ? "min-w-0 lg:col-span-9 xl:col-span-7"
                : "lg:col-span-12"
            }
          >
            {state.currentStep === "welcome" && (
              <StepWelcome
                onStart={() => handleNavigate("setup")}
                onContinue={() => handleNavigate("floor_planner")}
                hasExistingProject={true}
              />
            )}

            {state.currentStep === "setup" && (
              <StepProjectSetup
                data={state.setup}
                onChange={(updates) => setState((prev) => ({ ...prev, setup: { ...prev.setup, ...updates } }))}
                onNext={handleNextStep}
                onBack={handlePrevStep}
                nextLabel={nextButtonLabel}
              />
            )}

            {state.currentStep === "plot" && (
              <StepPlotDetails
                data={state.plot}
                onChange={(updates) => setState((prev) => ({ ...prev, plot: { ...prev.plot, ...updates } }))}
                onNext={handleNextStep}
                onBack={handlePrevStep}
                nextLabel={nextButtonLabel}
              />
            )}

            {state.currentStep === "footprint" && (
              <StepConstructionDetails
                footprint={state.footprint}
                plot={state.plot}
                onChange={(updates) => setState((prev) => ({ ...prev, footprint: { ...prev.footprint, ...updates } }))}
                onNext={handleNextStep}
                onBack={handlePrevStep}
                nextLabel={nextButtonLabel}
              />
            )}

            {state.currentStep === "road" && (
              <StepRoadDetails
                data={state.road}
                onChange={(updates) => setState((prev) => ({ ...prev, road: { ...prev.road, ...updates } }))}
                onNext={handleNextStep}
                onBack={handlePrevStep}
                nextLabel={nextButtonLabel}
              />
            )}

            {state.currentStep === "level" && (
              <StepRoadLevel
                data={state.roadLevel}
                onChange={(updates) => setState((prev) => ({ ...prev, roadLevel: { ...prev.roadLevel, ...updates } }))}
                onNext={handleNextStep}
                onBack={handlePrevStep}
                nextLabel={nextButtonLabel}
              />
            )}

            {state.currentStep === "floors_config" && (
              <StepFloorConfig
                floors={state.floors}
                onAddFloor={handleAddFloor}
                onRemoveFloor={handleRemoveFloor}
                onResetFloors={handleResetFloors}
                onRemoveBasement={handleRemoveBasement}
                onToggleBasementOption={handleToggleBasementOption}
                onUpdateFloor={handleUpdateFloor}
                onRenameFloor={() => {}}
                onNext={handleNextStep}
                onBack={handlePrevStep}
                nextLabel={nextButtonLabel}
              />
            )}

            {state.currentStep === "floor_planner" && (
              <StepFloorPlanner
                floors={state.floors}
                onSelectFloorToConfigure={handleStartFloorConfig}
                onNext={handleNextStep}
                onBack={handlePrevStep}
                nextLabel={nextButtonLabel}
              />
            )}

            {state.currentStep === "room_config" && (
              <StepRoomConfig
                floor={activeFloor}
                onChange={handleUpdateActiveFloor}
                onNext={handleNextStep}
                onBack={handlePrevStep}
                nextLabel={nextButtonLabel}
              />
            )}

            {state.currentStep === "bathrooms" && (
              <StepBathrooms
                floor={activeFloor}
                onChange={handleUpdateActiveFloor}
                onNext={handleNextStep}
                onBack={handlePrevStep}
                nextLabel={nextButtonLabel}
              />
            )}

            {state.currentStep === "kitchen" && (
              <StepKitchen
                floor={activeFloor}
                onChange={handleUpdateActiveFloor}
                onNext={handleNextStep}
                onBack={handlePrevStep}
                nextLabel={nextButtonLabel}
              />
            )}

            {state.currentStep === "living" && (
              <StepLivingSpaces
                floor={activeFloor}
                onChange={handleUpdateActiveFloor}
                onNext={handleNextStep}
                onBack={handlePrevStep}
                nextLabel={nextButtonLabel}
              />
            )}

            {state.currentStep === "utilities" && (
              <StepOtherRequirements
                floor={activeFloor}
                state={state}
                onChangeFloor={handleUpdateActiveFloor}
                onChangeAttachments={(attachments) =>
                  setState((prev) => ({ ...prev, attachments }))
                }
                onNext={handleNextStep}
                onBack={handlePrevStep}
                nextLabel={nextButtonLabel}
              />
            )}

            {state.currentStep === "review" && (
              <StepReviewValidation
                state={state}
                warnings={warnings}
                onNavigateToStep={handleNavigate}
                onUpdateSetup={(updates) => setState(prev => ({ ...prev, setup: { ...prev.setup, ...updates } }))}
                onGenerateReport={(savedRefCode) => {
                  if (savedRefCode) {
                    setState(prev => ({ ...prev, savedRefCode, currentStep: "report" }));
                  } else {
                    handleNavigate("report");
                  }
                }}
                onBack={handlePrevStep}
              />
            )}

            {state.currentStep === "report" && (
              <StepBuildingReport
                state={state}
                onEdit={() => handleNavigate("review")}
              />
            )}

          </div>

          {/* Right Column: Live Summary Widget (desktop) + Bottom Sheet (mobile) */}
          {showSidePanels && (
            <div className="min-w-0 xl:col-span-3">
              <PlannerLiveSummary
                state={state}
                warnings={warnings}
                onNavigateToStep={handleNavigate}
              />
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
