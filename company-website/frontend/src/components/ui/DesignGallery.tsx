"use client";

import { useState } from "react";
import Image from "next/image";
import { designGalleryImages } from "@/data/designGallery";
import { blurProps } from "@/data/imageBlur";
import Lightbox from "./Lightbox";

/**
 * Grid of interior finishing / design photos that aren't tied to a single
 * named project — kitchens, bathrooms, landscaping, finishing details.
 * Clicking a photo opens it maximized; nothing here navigates away.
 */
export default function DesignGallery() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const lightboxImages = designGalleryImages.map((img) => ({ src: img.src, caption: img.alt }));

  return (
    <>
      <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 [column-fill:_balance]">
        {designGalleryImages.map((img, index) => (
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
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(11,30,61,0.55)] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
