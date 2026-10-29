"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { ArrowRight, Search, X } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ProjectCard from "@/components/ui/ProjectCard";
import ProjectFilter from "@/components/ui/ProjectFilter";
import DesignGallery from "@/components/ui/DesignGallery";
import CTABanner from "@/components/ui/CTABanner";
import { designGalleryImages } from "@/data/designGallery";
import { blurProps } from "@/data/imageBlur";
import type { Project, ProjectCategory } from "@/data/projects";

export type ProjectsView = "projects" | "designs";

interface ProjectsClientProps {
  allProjects: Project[];
  initialCategory: ProjectCategory | "all";
  initialSearch: string;
  initialView: ProjectsView;
}

/**
 * Seeds the filters from ?category=&q=&view=. useSearchParams() suspends while
 * the page is prerendered, so the page wraps this in a Suspense boundary whose
 * fallback is <ProjectsClient> with the default filters — the full grid still
 * ships in the static HTML.
 */
export function ProjectsFromUrl({ allProjects }: { allProjects: Project[] }) {
  const searchParams = useSearchParams();
  return (
    <ProjectsClient
      allProjects={allProjects}
      initialCategory={(searchParams.get("category") as ProjectCategory | "all") || "all"}
      initialSearch={searchParams.get("q") || ""}
      initialView={searchParams.get("view") === "designs" ? "designs" : "projects"}
    />
  );
}

export default function ProjectsClient({
  allProjects,
  initialCategory,
  initialSearch,
  initialView,
}: ProjectsClientProps) {
  // Filters live in local state, seeded from the URL the server rendered with.
  // Keeping them out of useSearchParams() is what lets this page prerender —
  // and filtering locally keeps typing in the search box instant.
  const [currentCategory, setCurrentCategory] = useState<ProjectCategory | "all">(initialCategory);
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [view, setView] = useState<ProjectsView>(initialView);
  const currentSearch = searchTerm;

  // Keep the URL shareable/bookmarkable without triggering a re-render round trip.
  const syncUrl = (newCategory: string, newSearch: string, newView: ProjectsView = view) => {
    const params = new URLSearchParams();
    if (newView === "designs") {
      params.set("view", "designs");
    }
    if (newCategory && newCategory !== "all") {
      params.set("category", newCategory);
    }
    if (newSearch.trim()) {
      params.set("q", newSearch.trim());
    }
    const queryString = params.toString();
    window.history.replaceState(null, "", queryString ? `/projects?${queryString}` : "/projects");
  };

  const handleCategoryChange = (cat: ProjectCategory | "all") => {
    setCurrentCategory(cat);
    syncUrl(cat, searchTerm);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchTerm(val);
    syncUrl(currentCategory, val);
  };

  const handleViewChange = (newView: ProjectsView) => {
    setView(newView);
    syncUrl(currentCategory, searchTerm, newView);
  };

  // Projects and designs get equal billing: two showcase tabs, one panel each.
  const showcases = [
    {
      value: "projects" as const,
      label: "Built Projects",
      description: "Homes, schools, hotels and commercial buildings, with photos from the site.",
      image: allProjects[0]?.image,
    },
    {
      value: "designs" as const,
      label: "Designs",
      description: "House elevations, landscaping, and residential and commercial interiors.",
      image: designGalleryImages[0]?.src,
    },
  ];

  const clearSearch = () => {
    setSearchTerm("");
    syncUrl(currentCategory, "");
  };

  // Filter projects dynamically
  const filteredProjects = allProjects.filter((p) => {
    const matchesCategory =
      currentCategory === "all" || p.category === currentCategory;
    const q = currentSearch.toLowerCase().trim();
    const matchesQuery =
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.shortDescription.toLowerCase().includes(q) ||
      p.location.toLowerCase().includes(q) ||
      p.type.toLowerCase().includes(q);

    return matchesCategory && matchesQuery;
  });

  return (
    <>
      {/* Hero Banner */}
      <section className="relative pt-32 pb-16 bg-gradient-to-b from-[#FAF8F5] to-[var(--canvas-bg)] text-charcoal border-b border-border overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%231A1714' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />

        <div className="container relative z-10 text-center max-w-3xl">
          <ScrollReveal>
            <span className="inline-block px-3.5 py-1 rounded-full text-xs font-semibold tracking-[0.2em] uppercase text-gold-dark nm-raised border border-border shadow-2xs mb-4">
              Architectural Portfolio
            </span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-charcoal font-bold mb-6 leading-tight">
              Selected Projects
            </h1>
            <p className="text-lg text-concrete leading-relaxed">
              Buildings we have built, and the elevations and interiors our team has designed.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Showcase tabs: built projects and designs side by side */}
      <section className="pt-12 md:pt-16 bg-background">
        <div className="container">
          <div role="tablist" aria-label="Projects and designs" className="grid grid-cols-2 gap-3 sm:gap-6 max-w-5xl mx-auto">
            {showcases.map((item) => {
              const active = view === item.value;
              return (
                <button
                  key={item.value}
                  type="button"
                  role="tab"
                  id={`tab-${item.value}`}
                  aria-selected={active}
                  aria-controls={`panel-${item.value}`}
                  onClick={() => handleViewChange(item.value)}
                  className={`group relative overflow-hidden rounded-3xl text-left aspect-[4/5] sm:aspect-[16/9] cursor-pointer transition-all duration-300 ${
                    active
                      ? "ring-2 ring-gold ring-offset-4 ring-offset-[var(--canvas-bg)] shadow-xl"
                      : "nm-raised hover:-translate-y-1"
                  }`}
                >
                  {item.image && (
                    <Image
                      src={item.image}
                      alt=""
                      fill
                      loading="eager"
                      className={`object-cover transition-transform duration-700 group-hover:scale-105 ${active ? "" : "saturate-[0.85]"}`}
                      sizes="(max-width: 640px) 50vw, 512px"
                      {...blurProps(item.image)}
                    />
                  )}
                  <div className={`absolute inset-0 bg-gradient-to-t from-[rgba(26,23,20,0.92)] via-[rgba(26,23,20,0.55)] to-[rgba(26,23,20,0.05)] transition-opacity ${active ? "opacity-100" : "opacity-90"}`} />
                  {active && (
                    <span className="absolute top-3 left-3 sm:top-4 sm:left-4 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase nm-gold-raised text-charcoal">
                      Viewing
                    </span>
                  )}
                  <span className="absolute inset-x-0 bottom-0 p-4 sm:p-7 flex flex-col gap-1 sm:gap-2 text-white">
                    <span className="font-heading text-xl sm:text-3xl lg:text-4xl font-bold leading-tight">{item.label}</span>
                    <span className="hidden sm:block text-sm text-white/80 leading-relaxed max-w-sm">{item.description}</span>
                    <span className={`mt-1 sm:mt-2 inline-flex items-center gap-1.5 text-xs font-semibold ${active ? "text-gold-light" : "text-white"}`}>
                      {active ? "Showing below" : `View ${item.label.toLowerCase()}`}
                      <ArrowRight size={13} className={`transition-transform ${active ? "rotate-90" : "group-hover:translate-x-1"}`} />
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Built projects: filter & live search. Both panels stay in the HTML; only the active one shows. */}
      <section
        id="panel-projects"
        role="tabpanel"
        aria-labelledby="tab-projects"
        hidden={view !== "projects"}
        className="pt-10 md:pt-14 pb-20 md:pb-28 bg-background scroll-mt-28"
      >
        <div className="container">
          <h2 className="sr-only">Built Projects</h2>
          <ScrollReveal className="max-w-xl mx-auto mb-10">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-concrete">
                <Search size={18} />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search projects by name, location, or type..."
                className="w-full pl-11 pr-10 py-3.5 bg-surface border border-border text-charcoal text-sm focus:border-gold focus:ring-1 focus:ring-gold shadow-sm transition-all duration-200"
              />
              {searchTerm && (
                <button
                  onClick={clearSearch}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-concrete hover:text-charcoal"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <ProjectFilter
              activeCategory={currentCategory}
              onCategoryChange={handleCategoryChange}
            />
          </ScrollReveal>

          {/* Results Counter */}
          <div className="flex justify-between items-center mb-8 pb-4 border-b border-border text-xs text-concrete">
            <span>
              Showing <strong className="text-charcoal font-semibold">{filteredProjects.length}</strong> of {allProjects.length} Projects
            </span>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredProjects.map((project, index) => (
              <ScrollReveal key={project.slug} delay={(index % 6) * 100}>
                <ProjectCard project={project} priority={index < 3} />
              </ScrollReveal>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-20 bg-surface border border-border p-8">
              <h3 className="font-heading text-xl font-bold text-charcoal mb-2">No Projects Match Your Search</h3>
              <p className="text-concrete text-sm mb-6">
                Try searching for a different keyword or select another category filter.
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setCurrentCategory("all");
                  syncUrl("all", "");
                }}
                className="px-5 py-2.5 bg-charcoal text-warm-white text-xs uppercase tracking-wider font-semibold hover:bg-gold hover:text-charcoal transition-colors"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Designs: elevations, landscaping and interiors */}
      <section
        id="panel-designs"
        role="tabpanel"
        aria-labelledby="tab-designs"
        hidden={view !== "designs"}
        className="pt-10 md:pt-14 pb-20 md:pb-28 bg-background scroll-mt-28"
      >
        <div className="container">
          <h2 className="sr-only">Designs</h2>
          <DesignGallery />
        </div>
      </section>

      <CTABanner
        headline="See a project that inspires you?"
        subtitle="Talk with our engineering & design team about bringing a similar level of quality to your build."
      />
    </>
  );
}
