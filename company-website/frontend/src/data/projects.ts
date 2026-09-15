export type ProjectCategory =
  | "residential"
  | "villa"
  | "commercial"
  | "renovation"
  | "ongoing";

export type ProjectStatus = "completed" | "ongoing";

export interface Project {
  slug: string;
  title: string;
  location: string;
  category: ProjectCategory;
  status: ProjectStatus;
  type: string;
  area: string;
  year: string;
  duration: string;
  client: string;
  image: string;
  galleryImages: string[];
  shortDescription: string;
  challenge: string;
  designApproach: string;
  constructionMethod: string;
  result: string;
}

/**
 * Project data — these are real, completed Prasanth Associates projects.
 * Fields marked [PLACEHOLDER] are honest stand-ins (no invented client
 * facts) — replace with the real location, area, year, client and
 * narrative before publishing. Images reference files in
 * /public/images/projects/.
 */
export const projects: Project[] = [
  {
    slug: "oxford-school",
    title: "Oxford School",
    location: "Tamil Nadu", // [PLACEHOLDER]
    category: "commercial",
    status: "completed",
    type: "Educational Institution",
    area: "To be confirmed", // [PLACEHOLDER]
    year: "To be confirmed", // [PLACEHOLDER]
    duration: "To be confirmed", // [PLACEHOLDER]
    client: "Oxford School",
    image: "/images/projects/Commercial/oxford-school.webp",
    galleryImages: ["/images/projects/Commercial/oxford-school.webp"],
    shortDescription:
      "A school building project completed by Prasanth Associates, built to support daily academic use with durable, low-maintenance construction. Full project description to be added.", // [PLACEHOLDER]
    challenge: "Project narrative to be added.", // [PLACEHOLDER]
    designApproach: "Project narrative to be added.", // [PLACEHOLDER]
    constructionMethod: "Project narrative to be added.", // [PLACEHOLDER]
    result: "Project narrative to be added.", // [PLACEHOLDER]
  },
  {
    slug: "rex-school",
    title: "Rex School",
    location: "Tamil Nadu", // [PLACEHOLDER]
    category: "commercial",
    status: "completed",
    type: "Educational Institution",
    area: "To be confirmed", // [PLACEHOLDER]
    year: "To be confirmed", // [PLACEHOLDER]
    duration: "To be confirmed", // [PLACEHOLDER]
    client: "Rex School",
    image: "/images/projects/Commercial/rex-school.webp",
    galleryImages: ["/images/projects/Commercial/rex-school.webp"],
    shortDescription:
      "A school building project completed by Prasanth Associates, built to support daily academic use with durable, low-maintenance construction. Full project description to be added.", // [PLACEHOLDER]
    challenge: "Project narrative to be added.", // [PLACEHOLDER]
    designApproach: "Project narrative to be added.", // [PLACEHOLDER]
    constructionMethod: "Project narrative to be added.", // [PLACEHOLDER]
    result: "Project narrative to be added.", // [PLACEHOLDER]
  },
  {
    slug: "sasthapruri",
    title: "Sasthapruri",
    location: "Tamil Nadu", // [PLACEHOLDER]
    category: "commercial",
    status: "completed",
    type: "Commercial Building",
    area: "To be confirmed", // [PLACEHOLDER]
    year: "To be confirmed", // [PLACEHOLDER]
    duration: "To be confirmed", // [PLACEHOLDER]
    client: "Sasthapruri", // [PLACEHOLDER]
    image: "/images/projects/Commercial/sasthapruri.webp",
    galleryImages: ["/images/projects/Commercial/sasthapruri.webp"],
    shortDescription:
      "A commercial construction project completed by Prasanth Associates. Full project description to be added.", // [PLACEHOLDER]
    challenge: "Project narrative to be added.", // [PLACEHOLDER]
    designApproach: "Project narrative to be added.", // [PLACEHOLDER]
    constructionMethod: "Project narrative to be added.", // [PLACEHOLDER]
    result: "Project narrative to be added.", // [PLACEHOLDER]
  },
  {
    slug: "pricol",
    title: "Pricol",
    location: "Coimbatore, Tamil Nadu", // [PLACEHOLDER]
    category: "villa",
    status: "completed",
    type: "Villa",
    area: "To be confirmed", // [PLACEHOLDER]
    year: "To be confirmed", // [PLACEHOLDER]
    duration: "To be confirmed", // [PLACEHOLDER]
    client: "Private Client", // [PLACEHOLDER]
    image: "/images/projects/Villa/pricol-1.webp",
    galleryImages: [
      "/images/projects/Villa/pricol-1.webp",
      "/images/projects/Villa/pricol-2.webp",
    ],
    shortDescription:
      "A villa construction project completed by Prasanth Associates. Full project description to be added.", // [PLACEHOLDER]
    challenge: "Project narrative to be added.", // [PLACEHOLDER]
    designApproach: "Project narrative to be added.", // [PLACEHOLDER]
    constructionMethod: "Project narrative to be added.", // [PLACEHOLDER]
    result: "Project narrative to be added.", // [PLACEHOLDER]
  },
  {
    slug: "manjushree",
    title: "Manjushree",
    location: "Coimbatore, Tamil Nadu", // [PLACEHOLDER]
    category: "villa",
    status: "completed",
    type: "Villa",
    area: "To be confirmed", // [PLACEHOLDER]
    year: "To be confirmed", // [PLACEHOLDER]
    duration: "To be confirmed", // [PLACEHOLDER]
    client: "Private Client", // [PLACEHOLDER]
    image: "/images/projects/Villa/manjushree-1.webp",
    galleryImages: ["/images/projects/Villa/manjushree-1.webp"],
    shortDescription:
      "A villa construction project completed by Prasanth Associates. Full project description to be added.", // [PLACEHOLDER]
    challenge: "Project narrative to be added.", // [PLACEHOLDER]
    designApproach: "Project narrative to be added.", // [PLACEHOLDER]
    constructionMethod: "Project narrative to be added.", // [PLACEHOLDER]
    result: "Project narrative to be added.", // [PLACEHOLDER]
  },
  {
    slug: "residential-construction-project",
    title: "Residential Construction Project",
    location: "Coimbatore, Tamil Nadu", // [PLACEHOLDER]
    category: "residential",
    status: "completed",
    type: "Independent House",
    area: "To be confirmed", // [PLACEHOLDER]
    year: "To be confirmed", // [PLACEHOLDER]
    duration: "To be confirmed", // [PLACEHOLDER]
    client: "Private Client", // [PLACEHOLDER]
    image: "/images/projects/Residential/residential-site-1.webp",
    galleryImages: [
      "/images/projects/Residential/residential-site-1.webp",
      "/images/projects/Residential/residential-site-2.webp",
      "/images/projects/Residential/residential-site-3.webp",
    ],
    shortDescription:
      "A residential construction project completed by Prasanth Associates. Full project description to be added.", // [PLACEHOLDER]
    challenge: "Project narrative to be added.", // [PLACEHOLDER]
    designApproach: "Project narrative to be added.", // [PLACEHOLDER]
    constructionMethod: "Project narrative to be added.", // [PLACEHOLDER]
    result: "Project narrative to be added.", // [PLACEHOLDER]
  },
];

export const projectCategories: { value: ProjectCategory | "all"; label: string }[] = [
  { value: "all", label: "All Projects" },
  { value: "villa", label: "Villas" },
  { value: "residential", label: "Residential" },
  { value: "commercial", label: "Commercial" },
  { value: "renovation", label: "Renovation" },
  { value: "ongoing", label: "Ongoing" },
];
