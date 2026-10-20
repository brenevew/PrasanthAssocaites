import { Metadata } from "next";
import ProjectsClient from "./ProjectsClient";
import { projects, type ProjectCategory } from "@/data/projects";
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

interface ProjectsPageProps {
  searchParams: Promise<{ category?: string; q?: string; view?: string }>;
}

/**
 * Filters on the server so the grid — and every photo tag — is in the initial
 * HTML. Previously this page read the filters via useSearchParams(), which
 * pushed the whole portfolio behind a client-render bailout: nothing but a
 * "Loading..." string shipped, and photos only began downloading after
 * hydration. The client component re-filters locally to keep search instant.
 */
export default async function ProjectsPage({ searchParams }: ProjectsPageProps) {
  const { category, q, view } = await searchParams;

  const initialCategory = (category as ProjectCategory | "all") || "all";
  const initialSearch = q || "";

  return (
    <ProjectsClient
      allProjects={projects}
      initialCategory={initialCategory}
      initialSearch={initialSearch}
      initialView={view === "designs" ? "designs" : "projects"}
    />
  );
}
