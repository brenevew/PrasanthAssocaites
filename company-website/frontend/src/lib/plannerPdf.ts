import type { PlannerState, FloorRequirement } from "@/components/planner/types";
import { company } from "@/data/company";
import { SimplePdf, PDF_COLORS, toPdfText } from "@/lib/simplePdf";

/**
 * The Building Planner's requirements as a shareable PDF and a short text
 * summary. Used when the plan can't be sent to the team automatically, so the
 * client can send it on WhatsApp or by email instead. It carries the same
 * details the Sheet would have received; no prices or cost estimates.
 */

export interface PlanContact {
  name: string;
  email: string;
  phone: string;
  /** Optional "Where do you live now?" answer. */
  residence?: string;
}

const yesNo = (value: boolean) => (value ? "Yes" : "No");
const list = (items: string[]) => (items.length ? items.join(", ") : "None selected");

function areaLabel(unit: string) {
  return unit === "m" ? "sq. m" : "sq. ft.";
}

function totals(state: PlannerState) {
  const footprintArea = Math.round(state.footprint.length * state.footprint.width);
  return {
    plotArea: Math.round(state.plot.length * state.plot.width),
    footprintArea,
    builtUp: state.floors.reduce((sum, fl) => sum + (fl.builtUpSft || footprintArea), 0),
    bedrooms: state.floors.reduce((sum, fl) => sum + fl.masterBedroomsCount + fl.normalBedroomsCount, 0),
    bathrooms: state.floors.reduce((sum, fl) => sum + fl.attachedBathsCount + fl.commonBathsCount + (fl.hasGuestPowderRoom ? 1 : 0), 0),
    kitchens: state.floors.reduce((sum, fl) => sum + (fl.hasKitchen ? 1 : 0), 0),
    cars: state.floors.reduce((sum, fl) => sum + (fl.parkingCarsCount || 0), 0),
    twoWheelers: state.floors.reduce((sum, fl) => sum + (fl.parkingTwoWheelersCount || 0), 0),
  };
}

/** A file name the client can recognise when attaching it, e.g. "House-Plan-Ravi-Kumar.pdf". */
export function plannerPdfFileName(contact: PlanContact): string {
  const name = toPdfText(contact.name).replace(/[^A-Za-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return `House-Plan-${name || "Requirements"}.pdf`;
}

/** Plain-text summary for the WhatsApp or email message that goes with the PDF. */
export function plannerSummaryText(state: PlannerState, contact: PlanContact): string {
  const t = totals(state);
  const unit = areaLabel(state.plot.unit);
  return [
    `Name: ${contact.name || "-"}`,
    `Mobile: ${contact.phone || "-"}`,
    contact.email ? `Email: ${contact.email}` : null,
    contact.residence ? `Lives in: ${contact.residence}` : null,
    `Project: ${state.setup.projectName || "Residential project"}`,
    `Location: ${state.setup.location || "Not given"}`,
    `Plot: ${state.plot.width} x ${state.plot.length} ${state.plot.unit} (${t.plotArea.toLocaleString("en-IN")} ${unit})`,
    `Floors: ${state.floors.map((fl) => fl.floorName).join(", ")}`,
    `Built-up: about ${t.builtUp.toLocaleString("en-IN")} ${unit}`,
    `Bedrooms: ${t.bedrooms}, Bathrooms: ${t.bathrooms}, Car parking: ${t.cars}`,
  ]
    .filter(Boolean)
    .join("\n");
}

function floorBlock(pdf: SimplePdf, fl: FloorRequirement, unit: string) {
  pdf.ensureSpace(90);
  pdf.gap(8);
  pdf.paragraph(`${fl.floorName}${fl.builtUpSft ? `  (${fl.builtUpSft.toLocaleString("en-IN")} ${unit})` : ""}`, { size: 11, bold: true });
  pdf.gap(2);
  if (fl.floorId === "basement") {
    pdf.row("Basement use", [fl.basementHasParking ? "Parking" : null, fl.basementHasCustomRooms ? "Rooms" : null].filter(Boolean).join(" and ") || "-");
  }
  pdf.row("Bedrooms", `${fl.masterBedroomsCount + fl.normalBedroomsCount} (${fl.masterBedroomsCount} master, ${fl.normalBedroomsCount} standard)`);
  for (const bed of fl.bedroomCustomizations) {
    const extras = [
      bed.attachedBath ? "attached bath" : null,
      bed.dressingRoom ? "dressing room" : null,
      bed.walkInWardrobe ? "walk-in wardrobe" : null,
      bed.balcony ? "balcony" : null,
    ].filter(Boolean);
    pdf.row(`  ${bed.title}`, `${bed.type}, ${bed.preferredSize}${extras.length ? `, ${extras.join(", ")}` : ""}`);
  }
  pdf.row("Bathrooms", `${fl.attachedBathsCount} attached, ${fl.commonBathsCount} common${fl.hasGuestPowderRoom ? ", guest powder room" : ""}`);
  pdf.row(
    "Kitchen",
    fl.hasKitchen
      ? `${fl.kitchenType} kitchen, ${fl.kitchenLocation === "User Decides" ? "location to be decided" : fl.kitchenLocation.toLowerCase()}; utility/wash: ${yesNo(fl.hasUtilityWash)}, pantry: ${yesNo(fl.hasPantry)}, dining: ${yesNo(fl.hasDiningArea)}`
      : "No kitchen on this floor"
  );
  pdf.row("Living spaces", list(fl.livingSpaces));
  pdf.row("Other features", list(fl.otherFeatures));
  if (fl.parkingCarsCount || fl.parkingTwoWheelersCount) {
    pdf.row("Parking", `${fl.parkingCarsCount} cars, ${fl.parkingTwoWheelersCount} two-wheelers`);
  }
}

/** Builds the PDF and returns it as a binary string (ASCII only, one char per byte). */
export function buildPlannerPdf(state: PlannerState, contact: PlanContact, date = new Date()): string {
  const t = totals(state);
  const unit = areaLabel(state.plot.unit);
  const pdf = new SimplePdf();

  pdf.paragraph(company.name, { size: 10, bold: true, color: PDF_COLORS.gold });
  pdf.gap(4);
  pdf.paragraph("House Plan Requirements", { size: 20, bold: true });
  pdf.paragraph(
    `Prepared with the Building Planner on ${date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}`,
    { size: 9.5, color: PDF_COLORS.muted }
  );
  pdf.gap(10);
  pdf.rule(PDF_COLORS.text);

  pdf.heading("Client details");
  pdf.row("Name", contact.name);
  pdf.row("Mobile", contact.phone);
  pdf.row("Email", contact.email);
  if (contact.residence) pdf.row("Lives in", contact.residence);

  pdf.heading("1. Project");
  pdf.row("Project name", state.setup.projectName || "Residential project");
  pdf.row("Type", state.setup.projectType + (state.setup.commercialType ? ` (${state.setup.commercialType})` : ""));
  pdf.row("Location", state.setup.location || "Not given");
  if (state.setup.notes) pdf.row("Notes", state.setup.notes);

  pdf.heading("2. Plot and footprint");
  pdf.row("Plot size", `${state.plot.width} x ${state.plot.length} ${state.plot.unit}  (${t.plotArea.toLocaleString("en-IN")} ${unit})`);
  pdf.row("Building footprint", `${state.footprint.width} x ${state.footprint.length} ${state.plot.unit}  (${t.footprintArea.toLocaleString("en-IN")} ${unit})`);
  if (t.plotArea > 0) pdf.row("Plot coverage", `${Math.round((t.footprintArea / t.plotArea) * 100)}% of the plot`);

  pdf.heading("3. Road and site level");
  pdf.row("Road side", `${state.road.roadSide} facing`);
  pdf.row("Road width", state.road.knowRoadWidth === "Yes" && state.road.roadWidth ? `${state.road.roadWidth} ft` : "Not known");
  pdf.row(
    "Setbacks",
    state.road.knowSetbacks === "Yes"
      ? `Front ${state.road.frontSetback}, rear ${state.road.rearSetback}, left ${state.road.leftSetback}, right ${state.road.rightSetback} (${state.plot.unit})`
      : state.road.knowSetbacks === "No" ? "Not known" : "Not sure"
  );
  pdf.row("Plot level", state.roadLevel.level);

  pdf.heading(`4. Floors (${state.floors.length})`);
  pdf.row("Levels", state.floors.map((fl) => fl.floorName).join(", "));
  for (const fl of state.floors) floorBlock(pdf, fl, unit);

  pdf.heading("5. Totals");
  pdf.row("Total built-up", `About ${t.builtUp.toLocaleString("en-IN")} ${unit}`);
  pdf.row("Bedrooms", String(t.bedrooms));
  pdf.row("Bathrooms", String(t.bathrooms));
  pdf.row("Kitchens", String(t.kitchens));
  pdf.row("Parking", `${t.cars} cars, ${t.twoWheelers} two-wheelers`);

  if (state.attachments.length) {
    pdf.heading("6. Files uploaded");
    for (const file of state.attachments) pdf.row(file.name, file.url);
  }

  pdf.gap(16);
  pdf.rule();
  pdf.gap(4);
  pdf.paragraph(
    "These are preliminary requirements for discussion. Our engineers will review them with you, visit the site and prepare drawings and an itemised estimate for your plot.",
    { size: 9, color: PDF_COLORS.muted }
  );
  pdf.paragraph(`${company.name}  |  ${company.phone}  |  ${company.email}  |  prasanthassociates.com`, { size: 9, color: PDF_COLORS.muted });

  return pdf.output(`${company.name}  |  House Plan Requirements`);
}

/** The PDF as a File, ready to download or hand to the device's share sheet. */
export function plannerPdfFile(state: PlannerState, contact: PlanContact): File {
  const binary = buildPlannerPdf(state, contact);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return new File([bytes], plannerPdfFileName(contact), { type: "application/pdf" });
}
