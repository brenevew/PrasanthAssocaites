import type { Metadata } from "next";
import { SITE_URL, pageOpenGraph } from "@/lib/seo";
import { Suspense } from "react";
import PlanHomeClient from "./PlanHomeClient";

export const metadata: Metadata = {
  title: "Residential & Commercial Building Planner",
  description:
    "Plan your house or commercial building: plot size, floors, rooms, parking and design packages. An architect reviews every plan within 24 hours.",
  alternates: {
    canonical: `${SITE_URL}/plan-home`,
  },
  openGraph: pageOpenGraph(
    "/plan-home",
    "Residential & Commercial Building Planner | Prasanth Associates",
    "Plan your house or commercial building: plot size, floors, rooms, parking and design packages. An architect reviews every plan within 24 hours."
  ),
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
