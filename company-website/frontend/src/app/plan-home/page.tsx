import type { Metadata } from "next";
import { Suspense } from "react";
import PlanHomeClient from "./PlanHomeClient";

export const metadata: Metadata = {
  title: "Residential & Commercial Building Planner",
  description:
    "Plan your residential house or commercial building construction. Choose plot dimensions, floor layout, rooms, commercial facilities, parking, and design packages.",
  alternates: {
    canonical: "https://prasanthassociates.com/plan-home",
  },
};

export default function PlanHomePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center text-concrete text-sm">
          Loading Home Planner…
        </div>
      }
    >
      <PlanHomeClient />
    </Suspense>
  );
}
