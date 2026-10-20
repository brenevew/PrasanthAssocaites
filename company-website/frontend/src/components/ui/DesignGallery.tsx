"use client";

import { useState } from "react";
import Image from "next/image";
import { designGalleryImages, designGroups, type DesignGroup } from "@/data/designGallery";
import { blurProps } from "@/data/imageBlur";
import Lightbox from "./Lightbox";

/**
 * Design work not tied to a single named project (elevations, landscaping,
 * interiors), filterable by group. Clicking a photo opens it maximized and the
 * lightbox steps through the current filter only; nothing here navigates away.
 */
export default function DesignGallery() {
  const [activeGroup, setActiveGroup] = useState<DesignGroup | "all">("all");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const images =
    activeGroup === "all" ? designGalleryImages : designGalleryImages.filter((img) => img.group === activeGroup);
  const lightboxImages = images.map((img) => ({ src: img.src, caption: img.caption }));

  const filters = [
    { value: "all" as const, label: "All", count: designGalleryImages.length },
    ...designGroups.map((g) => ({
      ...g,
      count: designGalleryImages.filter((img) => img.group === g.value).length,
    })),
  ];

  return (
    <>
      <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-10" role="group" aria-label="Filter designs">
        {filters.map((filter) => {
          const active = activeGroup === filter.value;
          return (
            <button
              key={filter.value}
              type="button"
              onClick={() => {
                setActiveGroup(filter.value);
                setOpenIndex(null);
              }}
              aria-pressed={active}
              className={`inline-flex items-center gap-2 px-5 py-2 text-xs font-semibold tracking-wider uppercase rounded-full transition-all duration-250 border cursor-pointer ${
                active
                  ? "bg-[#1A1714] text-white border-[#1A1714] shadow-sm"
                  : "bg-white text-charcoal border-border hover:border-charcoal/40 hover:bg-linen shadow-2xs"
              }`}
            >
              {filter.label}
              <span
                className={`rounded-full px-1.5 py-0.5 text-[10px] leading-none ${
                  active ? "bg-white/15 text-white" : "bg-linen text-concrete"
                }`}
              >
                {filter.count}
              </span>
            </button>
          );
        })}
      </div>

      <div key={activeGroup} className="columns-2 sm:columns-3 lg:columns-4 gap-4 [column-fill:_balance]">
        {images.map((img, index) => (
          <button
            key={img.src}
            type="button"
            onClick={() => setOpenIndex(index)}
            aria-label={`View photo: ${img.alt}`}
            className="relative block w-full mb-4 break-inside-avoid overflow-hidden rounded-2xl nm-raised group cursor-pointer text-left"
          >
            <Image
              src={img.src}
              alt={img.alt}
              width={img.width}
              height={img.height}
              className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              loading="lazy"
              {...blurProps(img.src)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(11,30,61,0.65)] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="absolute left-3 bottom-3 right-3 text-xs font-semibold text-white opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
              {img.caption}
            </span>
          </button>
        ))}
      </div>

      {openIndex !== null && (
        <Lightbox
          images={lightboxImages}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onNavigate={setOpenIndex}
        />
      )}
    </>
  );
}
