export interface DesignGalleryImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

/**
 * Interior finishing & design photos, not tied to a single named project.
 * Images reference files in /public/images/projects/Designs/.
 * width/height are the real source dimensions (needed so the masonry
 * gallery renders each photo at its true aspect ratio instead of a crop).
 */
export const designGalleryImages: DesignGalleryImage[] = [
  { src: "/images/projects/Designs/hall-1.webp", alt: "Living hall interior finish", width: 1672, height: 941 },
  { src: "/images/projects/Designs/kitchen-1.webp", alt: "Kitchen interior finish", width: 1671, height: 941 },
  { src: "/images/projects/Designs/kitchen-2.webp", alt: "Kitchen interior finish", width: 1672, height: 941 },
  { src: "/images/projects/Designs/bathroom-2.webp", alt: "Bathroom interior finish", width: 1024, height: 1536 },
  { src: "/images/projects/Designs/cafe-interior.webp", alt: "Cafe interior finish", width: 1672, height: 941 },
  { src: "/images/projects/Designs/landscape-design.webp", alt: "Landscape design", width: 1536, height: 1024 },
  { src: "/images/projects/Designs/interior-3.webp", alt: "Interior finishing detail", width: 1672, height: 941 },
  { src: "/images/projects/Designs/interior-5.webp", alt: "Interior finishing detail", width: 1672, height: 941 },
  { src: "/images/projects/Designs/interior-6.webp", alt: "Interior finishing detail", width: 1086, height: 1448 },
  { src: "/images/projects/Designs/interior-7.webp", alt: "Interior finishing detail", width: 1086, height: 1448 },
  { src: "/images/projects/Designs/interior-9.webp", alt: "Interior finishing detail", width: 1227, height: 1281 },
  { src: "/images/projects/Designs/interior-12.webp", alt: "Interior finishing detail", width: 1536, height: 1024 },
  { src: "/images/projects/Designs/interior-14.webp", alt: "Interior finishing detail", width: 1448, height: 1086 },
  { src: "/images/projects/Designs/interior-18.webp", alt: "Interior finishing detail", width: 1672, height: 941 },
];
