"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ProjectCard from "@/components/ui/ProjectCard";
import ProjectFilter from "@/components/ui/ProjectFilter";
import CTABanner from "@/components/ui/CTABanner";
import { projects, type ProjectCategory } from "@/data/projects";

export default function ProjectsClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const currentCategory = (searchParams.get("category") as ProjectCategory | "all") || "all";
  const currentSearch = searchParams.get("q") || "";

  const [searchTerm, setSearchTerm] = useState(currentSearch);

  const updateQueryParams = (newCategory: string, newSearch: string) => {
    const params = new URLSearchParams();
    if (newCategory && newCategory !== "all") {
      params.set("category", newCategory);
    }
    if (newSearch.trim()) {
      params.set("q", newSearch.trim());
    }
    const queryString = params.toString();
    startTransition(() => {
      router.push(queryString ? `/projects?${queryString}` : "/projects", { scroll: false });
    });
  };

  const handleCategoryChange = (cat: ProjectCategory | "all") => {
    updateQueryParams(cat, searchTerm);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchTerm(val);
    updateQueryParams(currentCategory, val);
  };

  const clearSearch = () => {
    setSearchTerm("");
    updateQueryParams(currentCategory, "");
  };

  // Filter projects dynamically
  const filteredProjects = projects.filter((p) => {
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
              Explore our portfolio of completed and ongoing construction developments across residential, villa, commercial, and industrial segments.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Filter & Live Search Bar */}
      <section className="section bg-background">
        <div className="container">
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
              Showing <strong className="text-charcoal font-semibold">{filteredProjects.length}</strong> of {projects.length} Projects
            </span>
            {isPending && <span className="text-gold font-medium animate-pulse">Updating results...</span>}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredProjects.map((project, index) => (
              <ScrollReveal key={project.slug} delay={(index % 6) * 100}>
                <ProjectCard project={project} />
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
                  updateQueryParams("all", "");
                }}
                className="px-5 py-2.5 bg-charcoal text-warm-white text-xs uppercase tracking-wider font-semibold hover:bg-gold hover:text-charcoal transition-colors"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>

      <CTABanner
        headline="See a project that inspires you?"
        subtitle="Talk with our engineering & design team about bringing a similar level of quality to your build."
      />
    </>
  );
}
