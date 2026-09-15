import { Metadata } from "next";
import ProjectsClient from "./ProjectsClient";
import { projects, type ProjectCategory } from "@/data/projects";

export const metadata: Metadata = {
  title: "Our Projects",
  description:
    "Explore our portfolio of completed and ongoing construction developments across residential, villa, commercial, and industrial segments.",
};

interface ProjectsPageProps {
  searchParams: Promise<{ category?: string; q?: string }>;
}

/**
 * Filters on the server so the grid — and every photo tag — is in the initial
 * HTML. Previously this page read the filters via useSearchParams(), which
 * pushed the whole portfolio behind a client-render bailout: nothing but a
 * "Loading..." string shipped, and photos only began downloading after
 * hydration. The client component re-filters locally to keep search instant.
 */
export default async function ProjectsPage({ searchParams }: ProjectsPageProps) {
  const { category, q } = await searchParams;

  const initialCategory = (category as ProjectCategory | "all") || "all";
  const initialSearch = q || "";

  return (
    <ProjectsClient
      allProjects={projects}
      initialCategory={initialCategory}
      initialSearch={initialSearch}
    />
  );
}
