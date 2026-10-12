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
 * Empty fields are awaiting verified business information and are omitted
 * from public pages. Add only confirmed locations, measurements and narratives.
 * Images reference files in /public/images/projects/.
 */
export const projects: Project[] = [
  {
    slug: "oxford-school",
    title: "Oxford School",
    location: "",
    category: "commercial",
    status: "completed",
    type: "Educational Institution",
    area: "",
    year: "",
    duration: "",
    client: "Oxford School",
    image: "/images/projects/Commercial/oxford-school.webp",
    galleryImages: ["/images/projects/Commercial/oxford-school.webp"],
    shortDescription:
      "A school building project completed by Prasanth Associates.",
    challenge: "",
    designApproach: "",
    constructionMethod: "",
    result: "",
  },
  {
    slug: "rex-school",
    title: "Rex School",
    location: "",
    category: "commercial",
    status: "completed",
    type: "Educational Institution",
    area: "",
    year: "",
    duration: "",
    client: "Rex School",
    image: "/images/projects/Commercial/rex-school.webp",
    galleryImages: ["/images/projects/Commercial/rex-school.webp"],
    shortDescription:
      "A school building project completed by Prasanth Associates.",
    challenge: "",
    designApproach: "",
    constructionMethod: "",
    result: "",
  },
  {
    slug: "sasthapruri",
    title: "Sasthapruri",
    location: "",
    category: "commercial",
    status: "completed",
    type: "Commercial Building",
    area: "",
    year: "",
    duration: "",
    client: "",
    image: "/images/projects/Commercial/sasthapruri.webp",
    galleryImages: ["/images/projects/Commercial/sasthapruri.webp"],
    shortDescription:
      "A commercial construction project completed by Prasanth Associates.",
    challenge: "",
    designApproach: "",
    constructionMethod: "",
    result: "",
  },
  {
    slug: "pricol",
    title: "Pricol",
    location: "",
    category: "villa",
    status: "completed",
    type: "Villa",
    area: "",
    year: "",
    duration: "",
    client: "Private Client",
    image: "/images/projects/Villa/pricol-1.webp",
    galleryImages: [
      "/images/projects/Villa/pricol-1.webp",
      "/images/projects/Villa/pricol-2.webp",
    ],
    shortDescription:
      "A villa construction project completed by Prasanth Associates.",
    challenge: "",
    designApproach: "",
    constructionMethod: "",
    result: "",
  },
  {
    slug: "manjushree",
    title: "Manjushree",
    location: "",
    category: "villa",
    status: "completed",
    type: "Villa",
    area: "",
    year: "",
    duration: "",
    client: "Private Client",
    image: "/images/projects/Villa/manjushree-1.webp",
    galleryImages: ["/images/projects/Villa/manjushree-1.webp"],
    shortDescription:
      "A villa construction project completed by Prasanth Associates.",
    challenge: "",
    designApproach: "",
    constructionMethod: "",
    result: "",
  },
  {
    slug: "residential-construction-project",
    title: "Residential Construction Project",
    location: "",
    category: "residential",
    status: "completed",
    type: "Independent House",
    area: "",
    year: "",
    duration: "",
    client: "Private Client",
    image: "/images/projects/Residential/residential-site-1.webp",
    galleryImages: [
      "/images/projects/Residential/residential-site-1.webp",
      "/images/projects/Residential/residential-site-2.webp",
      "/images/projects/Residential/residential-site-3.webp",
    ],
    shortDescription:
      "A residential construction project completed by Prasanth Associates.",
    challenge: "",
    designApproach: "",
    constructionMethod: "",
    result: "",
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
