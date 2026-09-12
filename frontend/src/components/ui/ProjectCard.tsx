import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block relative rounded-3xl nm-raised p-3.5 transition-all duration-400 hover:-translate-y-2"
      id={`project-${project.slug}`}
    >
      {/* Sunken Image Frame */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/60">
        <Image
          src={project.image}
          alt={`${project.title} — ${project.type} in ${project.location}`}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(11,30,61,0.92)] via-[rgba(11,30,61,0.35)] to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-400" />

        {/* Neumorphic Status Badge */}
        {project.status === "ongoing" && (
          <span className="absolute top-4 left-4 px-3.5 py-1 text-[11px] font-bold tracking-wider uppercase nm-gold-raised text-charcoal rounded-full">
            Ongoing
          </span>
        )}

        {/* Tactile Hover Arrow Button */}
        <div className="absolute top-4 right-4 w-11 h-11 rounded-full flex items-center justify-center nm-gold-raised text-charcoal opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7 17L17 7" />
            <path d="M7 7h10v10" />
          </svg>
        </div>

        {/* Bottom Info Overlay */}
        <div className="absolute bottom-3 left-3 right-3 p-4 rounded-xl nm-dark-raised text-white transition-all duration-300">
          <p className="text-[10px] text-gold font-bold tracking-widest uppercase mb-1">
            {project.type} · {project.area}
          </p>
          <h3 className="text-lg font-heading font-bold text-warm-white mb-1 leading-snug">
            {project.title}
          </h3>
          <p className="text-xs text-concrete-lighter">
            {project.location}
          </p>
        </div>
      </div>
    </Link>
  );
}
