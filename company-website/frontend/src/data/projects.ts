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
  /** Optional case-study detail; the project page renders each list only when present. */
  /** Heading for the challenge section when it describes requirements instead (default "The Challenge"). */
  challengeHeading?: string;
  /** Extra label/value pairs for the overview bar (e.g. building character, setting). */
  facts?: { label: string; value: string }[];
  scope?: string[];
  challengePoints?: string[];
  approachSteps?: { title: string; description: string }[];
  stages?: string[];
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
    slug: "pricol",
    title: "Pricol Limited Tea Bungalow",
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
      "/images/projects/Villa/luxury-villa-under-construction-pricol-prasanth-associates.webp",
      "/images/projects/Villa/luxury-villa-under-construction-pricol-prasanth-associates-1.webp",
      "/images/projects/Villa/luxury-villa-under-construction-pricol-prasanth-associates-2.webp",
      "/images/projects/Villa/luxury-villa-under-construction-pricol-prasanth-associates-3.webp",
    ],
    shortDescription:
      "A 12,120 sq. ft. tea bungalow for Pricol Limited, built inside a tea plantation in Gudalur. Reaching the site meant crossing a river, so access and logistics were planned around it.",
    challenge:
      "The bungalow sits within a tea plantation, and the river had to be crossed to reach the construction site. Every load of material, every piece of equipment and every worker had to come in that way.",
    designApproach:
      "We planned the job around the site's access and setting, and kept the architectural, structural and MEP work coordinated from start to finish.",
    constructionMethod:
      "Work started in 2015 and moved through each stage in sequence, with the remote site setting the pace of material deliveries and manpower. The bungalow was completed in 2017.",
    result:
      "A completed 12,120 sq. ft. tea bungalow within the tea-estate landscape, built on a site that could only be reached across a river.",
    scope: [
      "Architecture",
      "Structural Engineering",
      "Construction",
      "MEP Services",
      "Project Planning & Coordination",
      "Site Execution & Supervision",
    ],
    challengePoints: [
      "River crossing and site access",
      "Construction within an established tea plantation",
      "Transporting construction materials and equipment",
      "Site logistics in a natural setting",
      "Coordinating architectural, structural and MEP works",
    ],
    approachSteps: [
      {
        title: "Site access planning",
        description: "Planned the movement of manpower, materials and equipment around how the site could be reached.",
      },
      {
        title: "Construction logistics",
        description: "Organised material transport and resources so work on site was not held up.",
      },
      {
        title: "Site-sensitive planning",
        description: "Scheduled construction with the surrounding tea plantation and landscape in mind.",
      },
      {
        title: "Integrated engineering",
        description: "Coordinated architectural, structural and MEP requirements throughout the project.",
      },
      {
        title: "Organised execution",
        description: "Sequenced construction activities to manage the constraints of a remote site.",
      },
    ],
    stages: [
      "Site Planning",
      "Architectural Design",
      "Structural Engineering",
      "Site Preparation",
      "Foundation",
      "Structural Construction",
      "MEP Works",
      "Finishing",
      "Completion",
    ],
  },
  {
    slug: "sasthapruri",
    title: "Sasthapuri Hotels",
    location: "Gudalur, The Nilgiris",
    category: "commercial",
    status: "completed",
    type: "Commercial Building",
    area: "38,879 sq. ft.",
    year: "2016",
    duration: "2014–2016",
    client: "Sasthapuri Hotels",
    image: "/images/projects/Commercial/modern-commercial-building-design-construction-gudalur-sasthapuri-hotels.webp",
    galleryImages: [
      "/images/projects/Commercial/modern-commercial-building-design-construction-gudalur-sasthapuri-hotels.webp",
      "/images/projects/Commercial/modern-commercial-building-design-under-construction-gudalur-sasthapuri-hotels.webp",
    ],
    shortDescription:
      "A 38,879 sq. ft. commercial building for Sasthapuri Hotels in the main town area of Gudalur. We handled the architecture, structural engineering, construction and MEP.",
    challenge:
      "The site is in the main town area of Gudalur. Building there meant working in a busy, active area with limited room to work and store materials, while keeping disruption to the neighbourhood low.",
    designApproach:
      "We planned and scheduled the work in detail, made careful use of the limited site area, and kept the architectural, structural and MEP work coordinated to avoid clashes during construction.",
    constructionMethod:
      "Construction started in 2014 and ran in phases, so different activities could progress side by side without crowding the site. Regular supervision kept the work in line with the design. The building was completed in 2016.",
    result:
      "A completed 38,879 sq. ft. commercial building in the centre of Gudalur, delivered from design through construction by one team.",
    scope: [
      "Architecture",
      "Structural Engineering",
      "Construction",
      "MEP Services",
      "Project Planning & Coordination",
      "Site Execution & Supervision",
    ],
    challengePoints: [
      "Construction within a busy town environment",
      "Limited working and storage space",
      "Material transport and handling",
      "Coordinating work within an active surrounding area",
      "Keeping an organised construction sequence",
      "Coordinating structural, architectural and MEP works",
      "Minimising disruption to the surrounding area",
    ],
    approachSteps: [
      {
        title: "Detailed project planning",
        description: "Planned and scheduled construction activities from the first stage through completion.",
      },
      {
        title: "Organised site management",
        description: "Coordinated material storage, movement and work on site to make the most of the available area.",
      },
      {
        title: "Integrated design coordination",
        description: "Coordinated architectural, structural and MEP requirements to reduce conflicts during construction.",
      },
      {
        title: "Phased construction",
        description: "Sequenced the work so different activities could progress while the site stayed coordinated.",
      },
      {
        title: "Quality and supervision",
        description: "Regular site supervision kept the work in line with the planned design and execution.",
      },
    ],
    stages: [
      "Planning",
      "Architectural Design",
      "Structural Engineering",
      "Site Preparation",
      "Civil Construction",
      "MEP Works",
      "Finishing",
      "Completion",
    ],
  },
  {
    slug: "rex-school",
    title: "Christus Rex Higher Secondary School",
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
      "A 12,000 sq. ft. school building for Christus Rex Higher Secondary School on Woodcock Road, Kandal, Ooty, designed and built for hill-region conditions.",
    challenge:
      "Building in Ooty meant planning for heavy, unpredictable rain, sloping and uneven ground, and difficult material transport. Many activities depended on the weather, and the site needed proper drainage and water management.",
    designApproach:
      "We planned the work around the site conditions and local weather, and matched the structural design and construction method to a hill-region building.",
    constructionMethod:
      "Construction started in 2018. Activities were scheduled to keep rain delays to a minimum, and the architectural, structural and MEP teams stayed coordinated throughout. The building was completed in 2019.",
    result:
      "A completed 12,000 sq. ft. school building that meets the school's functional needs and was built for Ooty's hill conditions.",
    scope: [
      "Architectural Design",
      "Structural Engineering",
      "Construction",
      "MEP Services",
      "Project Planning & Coordination",
      "Site Execution & Supervision",
    ],
    challengePoints: [
      "Heavy and unpredictable rainfall",
      "Hill-region site conditions",
      "Sloping and uneven terrain",
      "Difficult logistics and material transport",
      "Weather-dependent construction activities",
      "Drainage and water management",
      "Coordinating structural and MEP works on a difficult site",
    ],
    approachSteps: [
      {
        title: "Detailed planning",
        description: "Planned construction activities around the site conditions and local weather patterns.",
      },
      {
        title: "Structural coordination",
        description: "Matched the structural design and construction method to the needs of a hill-region building.",
      },
      {
        title: "Weather management",
        description: "Organised activities to keep delays from Ooty's rain and changing weather to a minimum.",
      },
      {
        title: "Site coordination",
        description: "Kept architecture, structural works, construction and MEP coordinated throughout the project.",
      },
      {
        title: "Quality construction",
        description: "Paid continuous attention to construction quality, workmanship and site management.",
      },
    ],
    stages: [
      "Planning",
      "Architectural Design",
      "Structural Design",
      "Site Preparation",
      "Civil Construction",
      "MEP Works",
      "Finishing",
      "Completion",
    ],
  },
  {
    slug: "oxford-school",
    title: "The Oxford Continental School",
    location: "Bandi Shola, Ooty",
    category: "commercial",
    status: "completed",
    type: "Educational Institution",
    area: "To be confirmed", // [PLACEHOLDER]
    year: "To be confirmed", // [PLACEHOLDER]
    duration: "To be confirmed", // [PLACEHOLDER]
    client: "The Oxford Continental School",
    image: "/images/projects/Schools/oxford-school-building-construction-prasanth-associates.webp",
    galleryImages: [
      "/images/projects/Schools/oxford-school-building-construction-prasanth-associates.webp",
    ],
    shortDescription:
      "A school building project completed by Prasanth Associates, built to support daily academic use with durable, low-maintenance construction. Full project description to be added.", // [PLACEHOLDER]
    challenge: "Project narrative to be added.", // [PLACEHOLDER]
    designApproach: "Project narrative to be added.", // [PLACEHOLDER]
    constructionMethod: "Project narrative to be added.", // [PLACEHOLDER]
    result: "Project narrative to be added.", // [PLACEHOLDER]
  },
  {
    slug: "manjushree",
    title: "Director's Building Renovation, Manjushree Plantation",
    location: "New Hope, O'Valley, The Nilgiris",
    category: "renovation",
    status: "completed",
    type: "Building Renovation",
    area: "4,904 sq. ft.",
    year: "", // not supplied yet
    duration: "", // not supplied yet
    client: "Manjushree Plantation Limited",
    image: "/images/projects/Renovation/manjushree-residential-building-renovation-prasanth-associates.webp",
    galleryImages: [
      "/images/projects/Renovation/manjushree-residential-building-renovation-prasanth-associates.webp",
      "/images/projects/Renovation/manjushree-residential-building-under-renovation-prasanth-associates-1.webp",
      "/images/projects/Renovation/manjushree-residential-building-under-renovation-prasanth-associates-2.webp",
    ],
    shortDescription:
      "Renovation of the British-era Director's Building at Manjushree Plantation, New Hope, set among cardamom plants beneath the mountain slopes of O'Valley in the Nilgiris.",
    challenge:
      "The Director's Building is an old British-era building standing among cardamom plants beneath the surrounding mountain slopes. Working on an older structure in a hillside plantation meant assessing its existing condition first, then planning and coordinating the renovation work carefully.",
    designApproach:
      "We took a planned, organised approach, paying attention to the existing building, its surroundings and what the renovation needed to achieve. The aim was to improve the building while respecting its original character and the plantation setting.",
    constructionMethod: "", // not supplied yet
    result: "", // not supplied yet
    facts: [
      { label: "Building Character", value: "British-era" },
      { label: "Setting", value: "Cardamom plantation beneath mountain slopes" },
    ],
    challengePoints: [
      "Renovating an existing British-era building",
      "Assessing the old building's condition",
      "Working within a cardamom plantation",
      "Site access and material transport",
      "Weather exposure and moisture management",
      "Coordinating renovation work within the existing structure",
    ],
  },
  {
    slug: "residential-construction-project",
    title: "Residential Building in Gudalur",
    location: "Gudalur, The Nilgiris",
    category: "residential",
    status: "completed",
    type: "Residential Building",
    area: "2,617 sq. ft.",
    year: "2025",
    duration: "2024–2025",
    client: "Private Client",
    image: "/images/projects/Residential/residential-building-construction-gudalur-prasanth-associates.webp",
    galleryImages: [
      "/images/projects/Residential/residential-building-construction-gudalur-prasanth-associates.webp",
      "/images/projects/Residential/residential-building-under-construction-gudalur-prasanth-associates.webp",
      "/images/projects/Residential/residential-building-under-construction-gudalur-prasanth-associates-1.webp",
      "/images/projects/Residential/residential-building-under-construction-gudalur-prasanth-associates-2.webp",
      "/images/projects/Residential/residential-building-under-construction-gudalur-prasanth-associates-3.webp",
      "/images/projects/Residential/residential-building-under-construction-gudalur-prasanth-associates-4.webp",
      "/images/projects/Residential/residential-building-under-construction-gudalur-prasanth-associates-5.webp",
      "/images/projects/Residential/residential-building-under-construction-gudalur-prasanth-associates-6.webp",
    ],
    shortDescription:
      "A 2,617 sq. ft. residential building in Gudalur, built in 2024–2025 and planned around everyday living: functional room layouts, natural light and ventilation.",
    challengeHeading: "Project Requirements",
    challenge:
      "The house was designed to accommodate the requirements of everyday living. The key planning considerations were:",
    designApproach:
      "We coordinated the design requirements with construction on site, working through architectural planning, structural coordination, construction and finishing according to the agreed scope.",
    constructionMethod: "", // not supplied yet
    result: "", // not supplied yet
    challengePoints: [
      "Functional space planning",
      "Efficient room layouts and circulation",
      "Structural planning and coordination",
      "Natural lighting and ventilation",
      "Material selection and construction quality",
      "Coordination of building services",
    ],
    // Scope of work not listed: the supplied details mark it "to be confirmed".
  },
  {
    slug: "residential-building-ooty",
    title: "Residential Building in Ooty",
    location: "Ooty, The Nilgiris",
    category: "residential",
    status: "completed",
    type: "Residential Building",
    area: "To be confirmed", // [PLACEHOLDER]
    year: "To be confirmed", // [PLACEHOLDER]
    duration: "To be confirmed", // [PLACEHOLDER]
    client: "Private Client",
    image: "/images/projects/Residential/residential-building-construction-ooty-prasanth-associates.webp",
    galleryImages: [
      "/images/projects/Residential/residential-building-construction-ooty-prasanth-associates.webp",
    ],
    shortDescription:
      "A residential building in Ooty completed by Prasanth Associates. Full project description to be added.", // [PLACEHOLDER]
    challenge: "Project narrative to be added.", // [PLACEHOLDER]
    designApproach: "Project narrative to be added.", // [PLACEHOLDER]
    constructionMethod: "Project narrative to be added.", // [PLACEHOLDER]
    result: "Project narrative to be added.", // [PLACEHOLDER]
  },
  {
    slug: "residential-building-perur-coimbatore",
    title: "Residential Building in Perur",
    location: "Perur, Coimbatore",
    category: "residential",
    status: "completed",
    type: "Residential Building",
    area: "3,500 sq. ft.",
    year: "2020",
    duration: "", // start year not supplied yet
    client: "Private Client",
    image: "/images/projects/Residential/residential-building-construction-perur-prasanth-associates.webp",
    galleryImages: [
      "/images/projects/Residential/residential-building-construction-perur-prasanth-associates.webp",
      "/images/projects/Residential/residential-building-under-construction-perur-prasanth-associates.webp",
    ],
    shortDescription:
      "A 3,500 sq. ft. residential building in Perur, Coimbatore, completed in 2020 and planned around comfortable everyday living.",
    challengeHeading: "Project Requirements",
    challenge:
      "The house was designed around the needs of comfortable everyday living. The key considerations were:",
    designApproach:
      "We coordinated the design requirements with site execution through to completion in 2020.",
    constructionMethod: "", // not supplied yet
    result: "", // not supplied yet
    challengePoints: [
      "Functional floor planning",
      "Efficient use of space",
      "Structural design and coordination",
      "Natural lighting and ventilation",
      "Material selection and construction quality",
      "Coordination of electrical and plumbing services",
    ],
    // Scope of work not listed: the supplied details say it depends on the work undertaken.
  },
];

/** Descriptive alt text for a project photo; marks under-construction and under-renovation shots. */
export function projectPhotoAlt(project: Pick<Project, "title" | "type">, src: string): string {
  const stage = src.includes("under-construction")
    ? " during construction"
    : src.includes("under-renovation")
      ? " during renovation"
      : "";
  return `${project.title}, ${project.type.toLowerCase()} by Prasanth Associates${stage}`;
}

/** True when a project has written case-study detail worth linking to. */
export function hasDetailsPage(project: Project): boolean {
  return Boolean(project.scope || project.challengePoints || project.approachSteps);
}

export const projectCategories: { value: ProjectCategory | "all"; label: string }[] = [
  { value: "all", label: "All Projects" },
  { value: "villa", label: "Villas" },
  { value: "residential", label: "Residential" },
  { value: "commercial", label: "Commercial" },
  { value: "renovation", label: "Renovation" },
  { value: "ongoing", label: "Ongoing" },
];
