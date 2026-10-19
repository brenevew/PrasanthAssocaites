"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Maximize2 } from "lucide-react";
import { projectPhotoAlt, projectPhotos, type Project } from "@/data/projects";
import { blurProps } from "@/data/imageBlur";
import Lightbox from "./Lightbox";

interface ProjectCardProps {
  project: Project;
  /** Set only for above-the-fold cards — preloading every card stalls the page. */
  priority?: boolean;
}

export default function ProjectCard({ project, priority = false }: ProjectCardProps) {
  const images = useMemo(() => projectPhotos(project), [project]);
  const [photoIndex, setPhotoIndex] = useState<number | null>(null);
  const cover = images[0];

  return (
    <div
      className="group block relative rounded-3xl nm-raised p-3.5 transition-all duration-400 hover:-translate-y-2"
      id={`project-${project.slug}`}
    >
      {/* The completed cover stays visible while other photos are browsed in the viewer. */}
      <button
        type="button"
        onClick={() => setPhotoIndex(0)}
        aria-label={`View ${project.title} photos`}
        className="relative block w-full aspect-[4/3] overflow-hidden rounded-2xl border border-white/60 cursor-pointer text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
      >
        <Image
          src={cover.src}
          alt={projectPhotoAlt(project, cover.src)}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={priority}
          {...blurProps(cover.src)}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(11,30,61,0.92)] via-[rgba(11,30,61,0.35)] to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-400" />

        {project.status === "ongoing" && (
          <span className="absolute top-4 left-4 px-3.5 py-1 text-[11px] font-bold tracking-wider uppercase nm-gold-raised text-charcoal rounded-full">
            Ongoing
          </span>
        )}

        <span className="absolute top-4 right-4 flex items-center gap-2 rounded-full bg-charcoal/70 px-3 py-2 text-xs font-semibold text-white">
          <Maximize2 size={15} aria-hidden="true" />
          {images.length > 1 ? `${images.length} photos` : "View photo"}
        </span>

        <div className="absolute bottom-3 left-3 right-3 p-4 rounded-xl nm-dark-raised text-white transition-all duration-300">
          <p className="text-[10px] text-gold font-bold tracking-widest uppercase mb-1">
            {[project.type, project.area]
              .filter((v) => v && v !== "To be confirmed")
              .join(" · ")}
          </p>
          <h3 className="text-lg font-heading font-bold text-warm-white mb-1 leading-snug">
            {project.title}
          </h3>
          {project.location && <p className="text-xs text-concrete-lighter">{project.location}</p>}
        </div>
      </button>

      <Link
        href={`/projects/${project.slug}`}
        className="mt-3 block rounded-xl px-3 py-3 text-sm font-semibold text-charcoal underline decoration-gold underline-offset-4 hover:text-gold-dark focus-visible:outline-2 focus-visible:outline-gold"
        aria-label={`View project details: ${project.title}`}
      >
        View project details
      </Link>

      {photoIndex !== null && (
        <Lightbox
          images={images}
          index={photoIndex}
          onClose={() => setPhotoIndex(null)}
          onNavigate={setPhotoIndex}
        />
      )}
    </div>
  );
}
