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
  /** Services Prasanth Associates provided on this project. */
  scope?: string[];
  challengePoints?: string[];
  solutionSteps?: { title: string; text: string }[];
  /** Stages in the order the project was executed. */
  executionStages?: string[];
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
    image: "/images/projects/Schools/oxford-school-building-construction-prasanth-associates.webp",
    galleryImages: [
      "/images/projects/Schools/oxford-school-building-construction-prasanth-associates.webp",
    ],
    shortDescription:
      "A school building project completed by Prasanth Associates.",
    challenge: "",
    designApproach: "",
    constructionMethod: "",
    result: "",
  },
  {
    slug: "rex-school",
    title: "Christus Rex Higher Secondary School, Ooty",
    location: "Kandal, Ooty, The Nilgiris",
    category: "commercial",
    status: "completed",
    type: "Educational Building",
    area: "12,000 sq. ft.",
    year: "2019",
    duration: "2018–2019",
    client: "Christus Rex Higher Secondary School",
    image: "/images/projects/Schools/rex-school-building-construction-prasanth-associates.webp",
    galleryImages: [
      "/images/projects/Schools/rex-school-building-construction-prasanth-associates.webp",
      "/images/projects/Schools/rex-school-building-under-construction-prasanth-associates-1.webp",
      "/images/projects/Schools/rex-school-building-under-construction-prasanth-associates-2.webp",
    ],
    shortDescription:
      "A 12,000 sq. ft. educational building for Christus Rex Higher Secondary School on Woodcock Road, Kandal, in Ooty. Prasanth Associates provided the architectural design, structural engineering, MEP services and construction for this hill site.",
    challenge: "Building in Ooty's hill region meant heavy, unpredictable rain, sloping and uneven ground, difficult logistics for materials, and site work that depended on the weather. Drainage and water management had to be designed in, and the structural and MEP work coordinated under these conditions.",
    designApproach: "",
    constructionMethod: "",
    result: "The 12,000 sq. ft. educational building was completed in 2019. It met the school's functional requirements while dealing with the demands of construction in Ooty's hill environment.",
    scope: ["Architectural design", "Structural engineering", "Construction", "MEP services", "Project planning & coordination", "Site execution & supervision"],
    challengePoints: [
      "Heavy and unpredictable rainfall",
      "Hill-region site conditions",
      "Difficult construction logistics",
      "Sloping, uneven terrain",
      "Transporting materials",
      "Weather-dependent construction activities",
      "Drainage and water management",
      "Coordinating structural and MEP works on a hill site",
    ],
    solutionSteps: [
      { title: "Detailed planning", text: "Construction activities were planned around the site conditions and local weather patterns." },
      { title: "Structural coordination", text: "The structural design and construction method were coordinated to suit a building in the hills." },
      { title: "Weather management", text: "Work was organized to limit delays from Ooty's rainfall and changing weather." },
      { title: "Site coordination", text: "Architecture, structural work, construction and MEP services were coordinated throughout." },
      { title: "Quality construction", text: "Construction quality, workmanship and site management were watched continuously." },
    ],
    executionStages: ["Planning", "Architectural design", "Structural design", "Site preparation", "Civil construction", "MEP works", "Finishing", "Completion"],
  },
  {
    slug: "sasthapruri",
    title: "Sasthapuri Hotels, Gudalur",
    location: "Gudalur, The Nilgiris",
    category: "commercial",
    status: "completed",
    type: "Commercial Building",
    area: "38,879.21 sq. ft.",
    year: "2016",
    duration: "2014–2016",
    client: "Sasthapuri Hotels",
    image: "/images/projects/Commercial/modern-commercial-building-design-construction-gudalur-sasthapuri-hotels.webp",
    galleryImages: [
      "/images/projects/Commercial/modern-commercial-building-design-construction-gudalur-sasthapuri-hotels.webp",
      "/images/projects/Commercial/modern-commercial-building-design-under-construction-gudalur-sasthapuri-hotels.webp",
    ],
    shortDescription:
      "A 38,879 sq. ft. commercial building for Sasthapuri Hotels in the main town area of Gudalur. Prasanth Associates delivered it from architectural design and structural engineering through MEP services and construction.",
    challenge: "The building sits in the main town area of Gudalur. Working in an active town meant limited space for storage and working, careful handling of every material delivery, and a construction sequence organized to keep disruption to the surrounding area low.",
    designApproach: "",
    constructionMethod: "",
    result: "Completed in 2016, the 38,879 sq. ft. building became a significant development in Gudalur's town centre. It reflects the planning, site coordination and organized execution that large commercial work in a busy town requires.",
    scope: ["Architecture", "Structural engineering", "Construction", "MEP services", "Project planning & coordination", "Site execution & supervision"],
    challengePoints: [
      "Construction within a busy town",
      "Limited working and storage space",
      "Material transportation and handling",
      "Coordinating work within an active surrounding area",
      "Maintaining an organized construction sequence",
      "Coordinating structural, architectural and MEP works",
      "Minimizing disruption to the surrounding area",
    ],
    solutionSteps: [
      { title: "Detailed project planning", text: "Construction activities were planned and scheduled systematically from the first stages through completion." },
      { title: "Organized site management", text: "Material storage, movement and work were coordinated to make effective use of the available site area." },
      { title: "Integrated design coordination", text: "Architectural, structural and MEP requirements were coordinated throughout to reduce conflicts during construction." },
      { title: "Phased construction", text: "The construction sequence was organized so different activities could progress efficiently while the site stayed coordinated." },
      { title: "Quality and supervision", text: "Regular site supervision kept the work to the planned design and construction quality." },
    ],
    executionStages: ["Planning", "Architectural design", "Structural engineering", "Site preparation", "Civil construction", "MEP works", "Finishing", "Completion"],
  },
  {
    slug: "pricol",
    title: "Pricol Limited Tea Bungalow, Gudalur",
    location: "Gudalur, The Nilgiris",
    category: "villa",
    status: "completed",
    type: "Tea Bungalow",
    area: "12,120 sq. ft.",
    year: "2017",
    duration: "2015–2017",
    client: "Pricol Limited",
    image: "/images/projects/Villa/luxury-villa-construction-pricol-prasanth-associates-1.webp",
    galleryImages: [
      "/images/projects/Villa/luxury-villa-construction-pricol-prasanth-associates-1.webp",
      "/images/projects/Villa/pricol-1.webp",
      "/images/projects/Villa/luxury-villa-under-construction-pricol-prasanth-associates.webp",
      "/images/projects/Villa/luxury-villa-under-construction-pricol-prasanth-associates-1.webp",
      "/images/projects/Villa/luxury-villa-under-construction-pricol-prasanth-associates-2.webp",
      "/images/projects/Villa/luxury-villa-under-construction-pricol-prasanth-associates-3.webp",
    ],
    shortDescription:
      "A 12,120 sq. ft. tea bungalow for Pricol Limited, built within a tea plantation near Gudalur. Prasanth Associates provided the architecture, structural engineering, MEP services and construction, on a site reached by crossing a river.",
    challenge: "The bungalow stands inside an established tea plantation, and reaching the site meant crossing a river. Every worker, load of material and piece of equipment had to make that crossing, and the work had to respect the working plantation around it while the architectural, structural and MEP work stayed in step.",
    designApproach: "",
    constructionMethod: "",
    result: "The 12,120 sq. ft. tea bungalow was completed in 2017. It shows what careful planning, construction logistics and coordination make possible on a remote tea-estate site.",
    scope: ["Architecture", "Structural engineering", "Construction", "MEP services", "Project planning & coordination", "Site execution & supervision"],
    challengePoints: [
      "River crossing and site access",
      "Construction within an established tea plantation",
      "Transporting construction materials and equipment",
      "Site logistics in a natural setting",
      "Coordinating architectural, structural and MEP work",
    ],
    solutionSteps: [
      { title: "Site access planning", text: "The movement of manpower, materials and equipment was planned around how the site could be reached." },
      { title: "Construction logistics", text: "Material transport and resources were organized so work on site could continue efficiently." },
      { title: "Site-sensitive planning", text: "Construction activities were coordinated with the surrounding tea plantation and landscape in mind." },
      { title: "Integrated engineering", text: "Architectural, structural and MEP requirements were coordinated throughout the project." },
      { title: "Organized execution", text: "Construction was sequenced systematically to manage the demands of a remote site." },
    ],
    executionStages: ["Site planning", "Architectural design", "Structural engineering", "Site preparation", "Foundation", "Structural construction", "MEP works", "Finishing", "Completion"],
  },
  {
    slug: "manjushree",
    title: "Manjushree",
    location: "",
    category: "residential",
    status: "completed",
    type: "Residential Building",
    area: "",
    year: "",
    duration: "",
    client: "Private Client",
    image: "/images/projects/Villa/manjushree-residential-building-construction-prasanth-associates.webp",
    galleryImages: [
      "/images/projects/Villa/manjushree-residential-building-construction-prasanth-associates.webp",
    ],
    shortDescription:
      "A residential building completed by Prasanth Associates.",
    challenge: "",
    designApproach: "",
    constructionMethod: "",
    result: "",
  },
  {
    slug: "residential-construction-project",
    title: "Residential Building in Gudalur",
    location: "Gudalur, The Nilgiris",
    category: "residential",
    status: "completed",
    type: "Residential Building",
    area: "",
    year: "",
    duration: "",
    client: "Private Client",
    image: "/images/projects/Residential/residential-building-construction-gudalur-prasanth-associates.webp",
    galleryImages: [
      "/images/projects/Residential/residential-building-construction-gudalur-prasanth-associates.webp",
      "/images/projects/Residential/residential-building-under-construction-gudalur-prasanth-associates-1.webp",
      "/images/projects/Residential/residential-building-under-construction-gudalur-prasanth-associates-2.webp",
      "/images/projects/Residential/residential-building-under-construction-gudalur-prasanth-associates-3.webp",
      "/images/projects/Residential/residential-building-under-construction-gudalur-prasanth-associates-4.webp",
      "/images/projects/Residential/residential-building-under-construction-gudalur-prasanth-associates-5.webp",
      "/images/projects/Residential/residential-building-under-construction-gudalur-prasanth-associates.webp",
      "/images/projects/Residential/residential-building-under-construction-gudalur-prasanth-associates-6.webp",
    ],
    shortDescription:
      "A residential building in Gudalur, built by Prasanth Associates. The gallery follows the work from the foundations to finishing.",
    challenge: "",
    designApproach: "",
    constructionMethod: "",
    result: "",
  },
  {
    slug: "residential-building-ooty",
    title: "Residential Building in Ooty",
    location: "Ooty, The Nilgiris",
    category: "residential",
    status: "completed",
    type: "Residential Building",
    area: "",
    year: "",
    duration: "",
    client: "Private Client",
    image: "/images/projects/Residential/residential-building-construction-ooty-prasanth-associates.webp",
    galleryImages: [
      "/images/projects/Residential/residential-building-construction-ooty-prasanth-associates.webp",
    ],
    shortDescription:
      "A residential building in Ooty, built by Prasanth Associates.",
    challenge: "",
    designApproach: "",
    constructionMethod: "",
    result: "",
  },
  {
    slug: "residential-building-perur-coimbatore",
    title: "Residential Building in Perur, Coimbatore",
    location: "Perur, Coimbatore",
    category: "residential",
    status: "completed",
    type: "Residential Building",
    area: "",
    year: "",
    duration: "",
    client: "Private Client",
    image: "/images/projects/Residential/residential-building-construction-perur-prasanth-associates.webp",
    galleryImages: [
      "/images/projects/Residential/residential-building-construction-perur-prasanth-associates.webp",
      "/images/projects/Residential/residential-building-under-construction-perur-prasanth-associates.webp",
    ],
    shortDescription:
      "A two-storey residential building in Perur, Coimbatore, built by Prasanth Associates. The gallery includes the house before finishing.",
    challenge: "",
    designApproach: "",
    constructionMethod: "",
    result: "",
  },
];

/** Alt text for a project photo; file names mark progress photos with "under-construction". */
export function projectPhotoAlt(project: Pick<Project, "title" | "type">, src: string): string {
  const stage = src.includes("under-construction") ? " during construction" : "";
  return `${project.title}, ${project.type.toLowerCase()} by Prasanth Associates${stage}`;
}

export function projectPhotoStage(src: string): "Under construction" | "Completed project" {
  return src.includes("under-construction") ? "Under construction" : "Completed project";
}

/** Keep completed views first and retain every progress photo for the gallery. */
export function projectPhotos(project: Pick<Project, "title" | "image" | "galleryImages">) {
  return [...new Set([project.image, ...project.galleryImages])]
    .sort((a, b) => Number(a.includes("under-construction")) - Number(b.includes("under-construction")))
    .map((src) => ({
      src,
      stage: projectPhotoStage(src),
      caption: `${projectPhotoStage(src)} — ${project.title}`,
    }));
}

export const projectCategories: { value: ProjectCategory | "all"; label: string }[] = [
  { value: "all", label: "All Projects" },
  { value: "villa", label: "Villas" },
  { value: "residential", label: "Residential" },
  { value: "commercial", label: "Commercial" },
  { value: "renovation", label: "Renovation" },
  { value: "ongoing", label: "Ongoing" },
];
