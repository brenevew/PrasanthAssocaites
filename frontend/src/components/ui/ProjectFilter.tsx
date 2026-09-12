"use client";

import { projectCategories, type ProjectCategory } from "@/data/projects";

interface ProjectFilterProps {
  activeCategory: ProjectCategory | "all";
  onCategoryChange: (category: ProjectCategory | "all") => void;
}

export default function ProjectFilter({
  activeCategory,
  onCategoryChange,
}: ProjectFilterProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
      {projectCategories.map((category) => (
        <button
          key={category.value}
          onClick={() => onCategoryChange(category.value as ProjectCategory | "all")}
          className={`px-5 py-2 text-xs font-semibold tracking-wider uppercase rounded-full transition-all duration-250 border cursor-pointer ${
            activeCategory === category.value
              ? "bg-[#1A1714] text-white border-[#1A1714] shadow-sm"
              : "bg-white text-charcoal border-border hover:border-charcoal/40 hover:bg-linen shadow-2xs"
          }`}
          aria-pressed={activeCategory === category.value}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
}
