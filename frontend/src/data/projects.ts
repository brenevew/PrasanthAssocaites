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
 * Project data — replace with actual project details.
 * Images reference files in /public/images/projects/.
 */
export const projects: Project[] = [
  {
    slug: "greenwood-villa",
    title: "Greenwood Villa",
    location: "Coimbatore, Tamil Nadu",
    category: "villa",
    status: "completed",
    type: "Luxury Villa",
    area: "4,500 Sq. Ft.",
    year: "2024",
    duration: "14 Months",
    client: "Private Client", // [PLACEHOLDER]
    image: "/images/projects/greenwood-villa.png",
    galleryImages: [
      "/images/projects/greenwood-villa.png",
      "/images/projects/lakeside-interior.png",
    ],
    shortDescription:
      "A contemporary luxury villa set within a lush tropical landscape, featuring open living spaces, a private pool, and seamless indoor-outdoor connectivity.",
    challenge:
      "The client envisioned a home that felt expansive and connected to nature, while maintaining complete privacy from the surrounding neighborhood. The sloping site added structural complexity to the foundation design.",
    designApproach:
      "The architectural concept centers on horizontality — long, low roof lines that extend beyond the building envelope to create shaded outdoor living areas. Floor-to-ceiling glazing on the garden side dissolves the boundary between interior and landscape. Natural materials — exposed concrete, teak wood, and local stone — provide tactile warmth.",
    constructionMethod:
      "A reinforced concrete frame was designed to accommodate the large cantilevers and open spans. Waterproofing was engineered as a multi-layer system given the pool proximity. The construction followed a strict quality protocol with material testing at each critical stage.",
    result:
      "The completed villa delivers on the original vision — a private retreat that feels both luxurious and grounded. The pool terrace has become the family's primary living space, and the material palette has aged gracefully with the landscape.",
  },
  {
    slug: "skyline-towers",
    title: "Skyline Towers",
    location: "Coimbatore, Tamil Nadu",
    category: "commercial",
    status: "completed",
    type: "Commercial Office",
    area: "32,000 Sq. Ft.",
    year: "2023",
    duration: "18 Months",
    client: "Corporate Client", // [PLACEHOLDER]
    image: "/images/projects/skyline-towers.png",
    galleryImages: ["/images/projects/skyline-towers.png"],
    shortDescription:
      "A modern commercial office complex with a glass curtain wall facade, efficient floor plates, and full MEP infrastructure for multi-tenant occupancy.",
    challenge:
      "The project required creating a landmark commercial presence on a constrained urban site, with complex coordination between structural, electrical, HVAC, and fire safety systems across multiple floors.",
    designApproach:
      "The facade uses a unitized glass curtain wall system that maximizes natural daylight while controlling solar heat gain. The floor plates are column-free for tenant flexibility, with services concentrated in a central core.",
    constructionMethod:
      "Steel-concrete composite construction enabled faster floor cycles and reduced overall construction time. A full BMS (Building Management System) was integrated during construction for energy-efficient operations.",
    result:
      "The building achieved full occupancy within six months of completion, with tenants citing the quality of construction, natural light, and energy efficiency as primary factors in their leasing decisions.",
  },
  {
    slug: "lakeside-residence",
    title: "Lakeside Residence",
    location: "Ooty, Tamil Nadu",
    category: "residential",
    status: "completed",
    type: "Independent House",
    area: "3,200 Sq. Ft.",
    year: "2024",
    duration: "12 Months",
    client: "Private Client", // [PLACEHOLDER]
    image: "/images/projects/lakeside-interior.png",
    galleryImages: [
      "/images/projects/lakeside-interior.png",
      "/images/projects/greenwood-villa.png",
    ],
    shortDescription:
      "A warm, contemporary family home designed around double-height living spaces, natural materials, and curated views of the surrounding hills.",
    challenge:
      "Building at elevation in Ooty presented unique challenges — cold climate considerations, hillside foundation engineering, and material logistics for a remote site required careful planning.",
    designApproach:
      "The design embraces the hillside setting with split-level living areas that follow the natural terrain. Double-height windows in the living room frame views of the valley. Warm wood, exposed concrete ceilings, and natural stone create an atmosphere that feels both modern and mountain-appropriate.",
    constructionMethod:
      "Deep pile foundations were used to anchor the structure to the hillside bedrock. The concrete mix was designed for cold-weather curing, and a dedicated material staging area was established at the base of the access road.",
    result:
      "The residence has become the family's primary weekend home, with the living spaces performing exactly as intended — warm, light-filled, and deeply connected to the landscape.",
  },
  {
    slug: "horizon-residences",
    title: "Horizon Residences",
    location: "Coimbatore, Tamil Nadu",
    category: "residential",
    status: "completed",
    type: "Apartment Complex",
    area: "18,000 Sq. Ft.",
    year: "2023",
    duration: "16 Months",
    client: "Development Client", // [PLACEHOLDER]
    image: "/images/projects/horizon-residences.png",
    galleryImages: ["/images/projects/horizon-residences.png"],
    shortDescription:
      "A boutique residential apartment building with 12 premium units, landscaped common areas, and modern amenities in a prime urban location.",
    challenge:
      "The project needed to maximize unit count and quality on a mid-sized urban plot, while creating a sense of spaciousness and community that differentiates it from typical apartment construction.",
    designApproach:
      "Each apartment features cross-ventilation, balconies with planter boxes, and optimized layouts that avoid wasted corridor space. The ground floor integrates a landscaped courtyard that functions as a shared community space.",
    constructionMethod:
      "Conventional RCC frame construction with an emphasis on finishing quality. Concealed plumbing and electrical, vitrified tile flooring, and modular kitchen provisions were standard across all units.",
    result:
      "All 12 units were sold before construction completion, with buyers citing the finishing quality and landscape design as key differentiators from competing projects in the area.",
  },
  {
    slug: "heritage-house-renovation",
    title: "Heritage House Renovation",
    location: "Coimbatore, Tamil Nadu",
    category: "renovation",
    status: "completed",
    type: "Heritage Renovation",
    area: "2,800 Sq. Ft.",
    year: "2024",
    duration: "8 Months",
    client: "Private Client", // [PLACEHOLDER]
    image: "/images/projects/heritage-house.png",
    galleryImages: ["/images/projects/heritage-house.png"],
    shortDescription:
      "A sensitive renovation of a heritage bungalow, preserving its original character while adding contemporary extensions and modern systems.",
    challenge:
      "The century-old bungalow had significant structural deterioration while possessing architectural character worth preserving. The challenge was to strengthen the structure, modernize the systems, and add a contemporary extension — without losing the building's heritage identity.",
    designApproach:
      "The original brick and timber structure was carefully restored. A new glass and steel extension was designed as a deliberately contemporary addition that contrasts with the heritage fabric rather than mimicking it, creating an honest dialogue between old and new.",
    constructionMethod:
      "Structural steel reinforcement was inserted into the existing masonry walls using minimally invasive techniques. The new extension uses a lightweight steel frame that imposes minimal load on the original foundations.",
    result:
      "The renovated bungalow successfully combines heritage character with modern functionality. The original timber details, restored brickwork, and new glass extension create a home that respects its history while serving contemporary life.",
  },
  {
    slug: "urban-edge-residences",
    title: "Urban Edge Residences",
    location: "Coimbatore, Tamil Nadu",
    category: "villa",
    status: "ongoing",
    type: "Villa Community",
    area: "45,000 Sq. Ft.",
    year: "2025",
    duration: "24 Months (Est.)",
    client: "Development Client", // [PLACEHOLDER]
    image: "/images/projects/greenwood-villa.png",
    galleryImages: ["/images/projects/greenwood-villa.png"],
    shortDescription:
      "An upcoming gated community of 8 premium villas with shared amenities, designed for modern urban families seeking space and community.",
    challenge:
      "Designing a villa community that balances individual privacy with shared community spaces, while maintaining consistent architectural quality across all 8 units.",
    designApproach:
      "Each villa has a unique floor plan adapted to its plot orientation, but all share a consistent material palette and design language. Shared amenities include a community garden, walking paths, and a clubhouse.",
    constructionMethod:
      "Foundation work is complete for all 8 units. Structural construction is progressing in phases to optimize crew allocation and material procurement.",
    result:
      "Currently under construction with an estimated completion in 2025. 6 of 8 units have been pre-sold based on architectural renders and material samples.",
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
