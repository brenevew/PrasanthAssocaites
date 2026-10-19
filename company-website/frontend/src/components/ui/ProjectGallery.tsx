"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Maximize2 } from "lucide-react";
import { projectPhotoAlt, projectPhotos, type Project } from "@/data/projects";
import { blurProps } from "@/data/imageBlur";
import Lightbox from "./Lightbox";

export default function ProjectGallery({ project }: { project: Project }) {
  const photos = useMemo(() => projectPhotos(project), [project]);
  const [photoIndex, setPhotoIndex] = useState<number | null>(null);

  return (
    <section aria-label={`${project.title} photo gallery`}>
      <h2 className="font-heading text-3xl text-charcoal mb-6 font-semibold">Project Photos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {photos.map((photo, index) => (
          <figure key={photo.src} className="overflow-hidden rounded-2xl border border-border bg-linen">
            <button
              type="button"
              onClick={() => setPhotoIndex(index)}
              aria-label={`Enlarge ${photo.stage.toLowerCase()} photo ${index + 1} of ${project.title}`}
              className="relative block aspect-[4/3] w-full cursor-zoom-in focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-gold"
            >
              <Image
                src={photo.src}
                alt={projectPhotoAlt(project, photo.src)}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 448px"
                loading="lazy"
                {...blurProps(photo.src)}
              />
              <span className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-charcoal/70 text-white">
                <Maximize2 size={16} aria-hidden="true" />
              </span>
            </button>
            <figcaption className="flex items-center justify-between gap-3 px-4 py-3 text-sm">
              <span className="font-semibold text-charcoal">{photo.stage}</span>
              <span className="text-concrete">Photo {index + 1} of {photos.length}</span>
            </figcaption>
          </figure>
        ))}
      </div>

      {photoIndex !== null && (
        <Lightbox
          images={photos}
          index={photoIndex}
          onClose={() => setPhotoIndex(null)}
          onNavigate={setPhotoIndex}
        />
      )}
    </section>
  );
}
