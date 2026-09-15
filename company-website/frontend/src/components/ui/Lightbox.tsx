"use client";

import { useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { blurProps } from "@/data/imageBlur";

export interface LightboxImage {
  src: string;
  caption: string;
}

interface LightboxProps {
  images: LightboxImage[];
  index: number;
  onClose: () => void;
  onNavigate: (newIndex: number) => void;
}

/**
 * Full-screen photo viewer, rendered via a portal so it always covers the
 * whole viewport regardless of any transformed/positioned ancestor (e.g. a
 * card with a hover transform). Never navigates the page — Escape, the
 * close button, or clicking the backdrop all just close the overlay.
 */
export default function Lightbox({ images, index, onClose, onNavigate }: LightboxProps) {
  const hasMultiple = images.length > 1;

  const goTo = useCallback(
    (newIndex: number) => {
      onNavigate((newIndex + images.length) % images.length);
    },
    [images.length, onNavigate]
  );

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (hasMultiple && e.key === "ArrowLeft") goTo(index - 1);
      if (hasMultiple && e.key === "ArrowRight") goTo(index + 1);
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, goTo, hasMultiple, index]);

  const current = images[index];
  if (!current) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-black animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={current.caption}
    >
      {/* Close Button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        aria-label="Close"
        className="absolute top-4 right-4 sm:top-6 sm:right-6 w-11 h-11 rounded-full flex items-center justify-center bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer z-10"
      >
        <X size={22} />
      </button>

      {/* Prev / Next */}
      {hasMultiple && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goTo(index - 1);
            }}
            aria-label="Previous photo"
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer z-10"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goTo(index + 1);
            }}
            aria-label="Next photo"
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer z-10"
          >
            <ChevronRight size={22} />
          </button>
        </>
      )}

      {/* Maximized Image — clicking it (or anywhere on the backdrop) closes, same as the X button */}
      <div className="relative w-full flex-1 flex items-center justify-center px-4 py-20 sm:px-16 pointer-events-none">
        <div className="relative w-full h-full max-w-5xl">
          <Image
            src={current.src}
            alt={current.caption}
            fill
            className="object-contain"
            sizes="100vw"
            priority
            {...blurProps(current.src)}
          />
        </div>
      </div>

      {/* Caption + position */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-white/10 text-white text-xs sm:text-sm font-medium text-center max-w-[90vw] truncate pointer-events-none">
        {current.caption}
        {hasMultiple && <span className="text-white/60"> · {index + 1} / {images.length}</span>}
      </div>
    </div>,
    document.body
  );
}
