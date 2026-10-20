export type DesignGroup = "exterior" | "residential-interior" | "commercial-interior";

export interface DesignGalleryImage {
  src: string;
  group: DesignGroup;
  /** Short visible label, also used as the lightbox caption. */
  caption: string;
  alt: string;
  width: number;
  height: number;
}

export const designGroups: { value: DesignGroup; label: string }[] = [
  { value: "exterior", label: "Exterior & Elevations" },
  { value: "residential-interior", label: "Residential Interiors" },
  { value: "commercial-interior", label: "Commercial Interiors" },
];

/**
 * Design work not tied to a single named project: elevations, landscaping and
 * interiors. Grouped from the source file names in image-originals/images/projects/Designs
 * ({exterior|interior}-design-{residential|commercial|landscape}-{subject}-{n}), kept in
 * group order. Images live in /public/images/projects/Designs/. width/height are the
 * published dimensions, so the masonry grid shows each photo at its true aspect ratio.
 */
export const designGalleryImages: DesignGalleryImage[] = [
  { src: "/images/projects/Designs/exterior-design-residential-elevation-1.webp", group: "exterior", caption: "Residential elevation design", alt: "Residential elevation design by Prasanth Associates", width: 1086, height: 1448 },
  { src: "/images/projects/Designs/exterior-design-residential-elevation-2.webp", group: "exterior", caption: "Residential elevation design", alt: "Residential elevation design by Prasanth Associates", width: 1920, height: 1080 },
  { src: "/images/projects/Designs/exterior-design-residential-elevation-3.webp", group: "exterior", caption: "Residential elevation design", alt: "Residential elevation design by Prasanth Associates", width: 1920, height: 1280 },
  { src: "/images/projects/Designs/exterior-design-residential-elevation-4.webp", group: "exterior", caption: "Residential elevation design", alt: "Residential elevation design by Prasanth Associates", width: 1920, height: 1537 },
  { src: "/images/projects/Designs/exterior-design-residential-elevation-5.webp", group: "exterior", caption: "Residential elevation design", alt: "Residential elevation design by Prasanth Associates", width: 1537, height: 1920 },
  { src: "/images/projects/Designs/exterior-design-residential-elevation-6.webp", group: "exterior", caption: "Residential elevation design", alt: "Residential elevation design by Prasanth Associates", width: 1920, height: 1440 },
  { src: "/images/projects/Designs/exterior-design-landscape-1.webp", group: "exterior", caption: "Landscape design", alt: "Landscape design by Prasanth Associates", width: 1536, height: 1024 },
  { src: "/images/projects/Designs/interior-design-residential-hall-1.webp", group: "residential-interior", caption: "Living hall interior", alt: "Living hall interior by Prasanth Associates", width: 1672, height: 941 },
  { src: "/images/projects/Designs/interior-design-residential-hall-2.webp", group: "residential-interior", caption: "Living hall interior", alt: "Living hall interior by Prasanth Associates", width: 1448, height: 1086 },
  { src: "/images/projects/Designs/interior-design-residential-hall-3.webp", group: "residential-interior", caption: "Living hall interior", alt: "Living hall interior by Prasanth Associates", width: 1536, height: 1024 },
  { src: "/images/projects/Designs/interior-design-residential-hall-4.webp", group: "residential-interior", caption: "Living hall interior", alt: "Living hall interior by Prasanth Associates", width: 1227, height: 1281 },
  { src: "/images/projects/Designs/interior-design-residential-hall-5.webp", group: "residential-interior", caption: "Living hall interior", alt: "Living hall interior by Prasanth Associates", width: 1672, height: 941 },
  { src: "/images/projects/Designs/interior-design-residential-hall-6.webp", group: "residential-interior", caption: "Living hall interior", alt: "Living hall interior by Prasanth Associates", width: 1086, height: 1448 },
  { src: "/images/projects/Designs/interior-design-residential-hall-7.webp", group: "residential-interior", caption: "Living hall interior", alt: "Living hall interior by Prasanth Associates", width: 1672, height: 941 },
  { src: "/images/projects/Designs/interior-design-residential-kitchen-1.webp", group: "residential-interior", caption: "Kitchen interior", alt: "Kitchen interior by Prasanth Associates", width: 1086, height: 1448 },
  { src: "/images/projects/Designs/interior-design-residential-kitchen-2.webp", group: "residential-interior", caption: "Kitchen interior", alt: "Kitchen interior by Prasanth Associates", width: 1671, height: 941 },
  { src: "/images/projects/Designs/interior-design-residential-kitchen-3.webp", group: "residential-interior", caption: "Kitchen interior", alt: "Kitchen interior by Prasanth Associates", width: 1672, height: 941 },
  { src: "/images/projects/Designs/interior-design-residential-bedroom-1.webp", group: "residential-interior", caption: "Bedroom interior", alt: "Bedroom interior by Prasanth Associates", width: 1672, height: 941 },
  { src: "/images/projects/Designs/interior-design-residential-bedroom-2.webp", group: "residential-interior", caption: "Bedroom interior", alt: "Bedroom interior by Prasanth Associates", width: 1316, height: 1195 },
  { src: "/images/projects/Designs/interior-design-residential-bedroom-3.webp", group: "residential-interior", caption: "Bedroom interior", alt: "Bedroom interior by Prasanth Associates", width: 1647, height: 955 },
  { src: "/images/projects/Designs/interior-design-residential-bedroom-4.webp", group: "residential-interior", caption: "Bedroom interior", alt: "Bedroom interior by Prasanth Associates", width: 1604, height: 981 },
  { src: "/images/projects/Designs/interior-design-residential-bedroom-6.webp", group: "residential-interior", caption: "Bedroom interior", alt: "Bedroom interior by Prasanth Associates", width: 1672, height: 941 },
  { src: "/images/projects/Designs/interior-design-residential-bedroom-7.webp", group: "residential-interior", caption: "Bedroom interior", alt: "Bedroom interior by Prasanth Associates", width: 1672, height: 941 },
  { src: "/images/projects/Designs/interior-design-residential-bedroom-8.webp", group: "residential-interior", caption: "Bedroom interior", alt: "Bedroom interior by Prasanth Associates", width: 1536, height: 1024 },
  { src: "/images/projects/Designs/interior-design-residential-bathroom-1.webp", group: "residential-interior", caption: "Bathroom interior", alt: "Bathroom interior by Prasanth Associates", width: 941, height: 1672 },
  { src: "/images/projects/Designs/interior-design-residential-bathroom-2.webp", group: "residential-interior", caption: "Bathroom interior", alt: "Bathroom interior by Prasanth Associates", width: 1024, height: 1536 },
  { src: "/images/projects/Designs/interior-design-commercial-office-room-1.webp", group: "commercial-interior", caption: "Office interior", alt: "Office interior by Prasanth Associates", width: 1672, height: 941 },
  { src: "/images/projects/Designs/interior-design-commercial-office-room-2.webp", group: "commercial-interior", caption: "Office interior", alt: "Office interior by Prasanth Associates", width: 1672, height: 941 },
  { src: "/images/projects/Designs/interior-design-commercial-office-room-3.webp", group: "commercial-interior", caption: "Office interior", alt: "Office interior by Prasanth Associates", width: 1448, height: 1086 },
  { src: "/images/projects/Designs/interior-design-commercial-office-room-4.webp", group: "commercial-interior", caption: "Office interior", alt: "Office interior by Prasanth Associates", width: 1672, height: 941 },
  { src: "/images/projects/Designs/interior-design-commercial-office-room-5.webp", group: "commercial-interior", caption: "Office interior", alt: "Office interior by Prasanth Associates", width: 1672, height: 941 },
  { src: "/images/projects/Designs/interior-design-commercial-cafe-room-1.webp", group: "commercial-interior", caption: "Café interior", alt: "Café interior by Prasanth Associates", width: 1672, height: 941 },
];
