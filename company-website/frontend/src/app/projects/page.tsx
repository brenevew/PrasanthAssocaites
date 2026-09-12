import { Metadata } from "next";
import { Suspense } from "react";
import ProjectsClient from "./ProjectsClient";

export const metadata: Metadata = {
  title: "Our Projects",
  description:
    "Explore our portfolio of completed and ongoing construction developments across residential, villa, commercial, and industrial segments.",
};

export default function ProjectsPage() {
  return (
    <Suspense fallback={
      <div className="py-32 text-center text-concrete text-sm">
        Loading project portfolio...
      </div>
    }>
      <ProjectsClient />
    </Suspense>
  );
}
