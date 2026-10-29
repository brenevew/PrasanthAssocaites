import { Metadata } from "next";
import { Suspense } from "react";
import ProjectsClient, { ProjectsFromUrl } from "./ProjectsClient";
import { projects } from "@/data/projects";
import { SITE_URL, pageOpenGraph } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Projects in Coimbatore & the Nilgiris",
  description:
    "Completed and ongoing work by Prasanth Associates: homes, villas, schools and commercial buildings in Coimbatore and the Nilgiris.",
  keywords: [
    "construction projects Coimbatore",
    "villa projects Coimbatore",
    "school building construction Tamil Nadu",
    "house construction photos Coimbatore",
    "construction projects Ooty",
    "house construction photos Nilgiris",
  ],
  alternates: {
    canonical: `${SITE_URL}/projects`,
  },
  openGraph: pageOpenGraph(
    "/projects",
    "Projects in Coimbatore & the Nilgiris | Prasanth Associates",
    "Completed and ongoing work by Prasanth Associates: homes, villas, schools and commercial buildings in Coimbatore and the Nilgiris."
  ),
};

/**
 * Prerendered, so Cloudflare serves it from the cache instead of rendering the
 * whole portfolio per request (which hit error 1102, the Worker CPU limit).
 * The static HTML holds the unfiltered grid with every photo tag; the
 * ?category=&q=&view= filters are applied in the browser by ProjectsFromUrl.
 */
export default function ProjectsPage() {
  const unfiltered = (
    <ProjectsClient
      allProjects={projects}
      initialCategory="all"
      initialSearch=""
      initialView="projects"
    />
  );

  return (
    <Suspense fallback={unfiltered}>
      <ProjectsFromUrl allProjects={projects} />
    </Suspense>
  );
}
