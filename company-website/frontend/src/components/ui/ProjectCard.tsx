"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import type { Project } from "@/data/projects";
import { blurProps } from "@/data/imageBlur";
import Lightbox from "./Lightbox";

interface ProjectCardProps {
  project: Project;
  /** Set only for above-the-fold cards — preloading every card stalls the page. */
  priority?: boolean;
}

const AUTOPLAY_MS = 4000;

/** Show photo `next`, keeping every already-shown photo mounted for the crossfade. */
function reveal(prev: { index: number; mounted: number[] }, next: number, total: number) {
  const index = (next + total) % total;
  // Mount the following photo too, so the next transition has it ready.
  const wanted = [index, (index + 1) % total];
  const missing = wanted.filter((i) => !prev.mounted.includes(i));
  return missing.length === 0
    ? { index, mounted: prev.mounted }
    : { index, mounted: [...prev.mounted, ...missing] };
}

export default function ProjectCard({ project, priority = false }: ProjectCardProps) {
  // Every photo for this project, cover image first, no duplicates — named
  // and browsable right here in the grid, with a maximized view on click.
  // Nothing here ever navigates to a different page.
  const images = useMemo(() => {
    const all = [project.image, ...project.galleryImages];
    const unique = all.filter((src, idx) => all.indexOf(src) === idx);
    return unique.map((src, i) => ({
      src,
      caption: unique.length > 1 ? `${project.title} — Photo ${i + 1} of ${unique.length}` : project.title,
    }));
  }, [project.image, project.galleryImages, project.title]);

  // Only photos that have actually been shown get mounted, so a card costs one
  // image request on first paint instead of one per photo.
  const [view, setView] = useState<{ index: number; mounted: number[] }>({
    index: 0,
    mounted: [0],
  });
  const [isHovering, setIsHovering] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const hasMultiple = images.length > 1;
  const index = view.index;

  const showIndex = useCallback(
    (next: number) => setView((prev) => reveal(prev, next, images.length)),
    [images.length]
  );

  useEffect(() => {
    if (!hasMultiple || isHovering || lightboxOpen) return;
    const timer = setInterval(() => {
      setView((prev) => reveal(prev, prev.index + 1, images.length));
    }, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [hasMultiple, isHovering, lightboxOpen, images.length]);

  const goTo = (e: React.MouseEvent, newIndex: number) => {
    e.preventDefault();
    e.stopPropagation();
    showIndex(newIndex);
  };

  return (
    <div
      className="group block relative rounded-3xl nm-raised p-3.5 transition-all duration-400 hover:-translate-y-2"
      id={`project-${project.slug}`}
      onMouseEnter={() => {
        setIsHovering(true);
        // Hovering signals intent to browse — get the next photo ready.
        setView((prev) => reveal(prev, prev.index, images.length));
      }}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Sunken Image Frame — click opens the maximized photo, never navigates */}
      <button
        type="button"
        onClick={() => setLightboxOpen(true)}
        aria-label={`View ${project.title} photos`}
        className="relative block w-full aspect-[4/3] overflow-hidden rounded-2xl border border-white/60 cursor-pointer text-left"
      >
        {images.map((img, i) =>
          view.mounted.includes(i) ? (
            <Image
              key={img.src}
              src={img.src}
              alt={img.caption}
              fill
              className={`object-cover transition-opacity duration-500 ${
                i === index ? "opacity-100" : "opacity-0"
              }`}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority={priority && i === 0}
              {...blurProps(img.src)}
            />
          ) : null
        )}

        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(11,30,61,0.92)] via-[rgba(11,30,61,0.35)] to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-400" />

        {/* Neumorphic Status Badge */}
        {project.status === "ongoing" && (
          <span className="absolute top-4 left-4 px-3.5 py-1 text-[11px] font-bold tracking-wider uppercase nm-gold-raised text-charcoal rounded-full">
            Ongoing
          </span>
        )}

        {/* Maximize Hint */}
        <div className="absolute top-4 right-4 w-11 h-11 rounded-full flex items-center justify-center nm-gold-raised text-charcoal opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <Maximize2 size={16} />
        </div>

        {/* Multi-photo controls: prev/next + dots, never navigate on click */}
        {hasMultiple && (
          <>
            <span
              role="button"
              tabIndex={0}
              onClick={(e) => goTo(e, index - 1)}
              onKeyDown={(e) => e.key === "Enter" && goTo(e as unknown as React.MouseEvent, index - 1)}
              aria-label="Previous photo"
              className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center bg-charcoal/50 text-white opacity-0 group-hover:opacity-100 hover:bg-charcoal/80 transition-all duration-200 cursor-pointer"
            >
              <ChevronLeft size={16} />
            </span>
            <span
              role="button"
              tabIndex={0}
              onClick={(e) => goTo(e, index + 1)}
              onKeyDown={(e) => e.key === "Enter" && goTo(e as unknown as React.MouseEvent, index + 1)}
              aria-label="Next photo"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center bg-charcoal/50 text-white opacity-0 group-hover:opacity-100 hover:bg-charcoal/80 transition-all duration-200 cursor-pointer"
            >
              <ChevronRight size={16} />
            </span>

            <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10 px-2.5 py-1.5 rounded-full bg-charcoal/40">
              {images.map((img, i) => (
                <span
                  key={img.src}
                  role="button"
                  tabIndex={0}
                  onClick={(e) => goTo(e, i)}
                  onKeyDown={(e) => e.key === "Enter" && goTo(e as unknown as React.MouseEvent, i)}
                  aria-label={`Show photo ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    i === index ? "w-5 bg-gold" : "w-1.5 bg-white/70 hover:bg-white/95"
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {/* Bottom Info Overlay */}
        <div className="absolute bottom-3 left-3 right-3 p-4 rounded-xl nm-dark-raised text-white transition-all duration-300">
          <p className="text-[10px] text-gold font-bold tracking-widest uppercase mb-1">
            {[project.type, project.area]
              .filter((v) => v && v !== "To be confirmed")
              .join(" · ")}
          </p>
          <h3 className="text-lg font-heading font-bold text-warm-white mb-1 leading-snug">
            {project.title}
          </h3>
          <p className="text-xs text-concrete-lighter">
            {project.location}
          </p>
        </div>
      </button>

      {lightboxOpen && (
        <Lightbox
          images={images}
          index={index}
          onClose={() => setLightboxOpen(false)}
          onNavigate={showIndex}
        />
      )}
    </div>
  );
}
