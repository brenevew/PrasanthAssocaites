import type { LocationPage } from "./locationPages";

/**
 * Extra content for the location pages (/locations/coimbatore, /locations/nilgiris-ooty
 * and /locations/gudalur), rendered by components/locations/LocationShowcase.tsx
 * around the existing copy in locationPages.ts. Nothing here replaces that copy,
 * the metadata or the structured data.
 *
 * Same copy rules as locationPages.ts: plain English, confirmed facts only
 * (projects from data/projects.ts, "100+ homes" approved by the owner, the four
 * Nilgiris towns built in), no prices, guarantees or registrations, no em dashes.
 * Coimbatore is a newer office: no claims of long local history, and no
 * neighbourhoods named beyond Gandhipuram and Perur.
 */

export type ShowcaseIcon =
  | "house" | "villa" | "school" | "store" | "renovation" | "plans" | "interiors" | "hospitality" | "apartment"
  | "engineering" | "boq" | "team" | "weather" | "factory" | "turnkey";

export interface LocationShowcase {
  /** Full-width hero photo and the photo beside the "about" text. */
  heroImage: { src: string; alt: string };
  aboutImage: { src: string; alt: string };
  /** Short line under the hero heading, in the reference site's slider style. */
  heroTagline: string;
  /** Things built here (six or eight cards), each linking to its service page. */
  offerings: { heading: string; intro: string; items: { icon: ShowcaseIcon; title: string; body: string; slug: string }[] };
  about: { eyebrow: string; heading: string; paragraphs: string[]; values: { icon: ShowcaseIcon; label: string }[] };
  /** Verified figures only; the Google figures come from the page's googleRating. */
  stats: { value: string; label: string }[];
  /** Blog posts shown as numbered cards, by slug from data/blog.ts. */
  guides: { heading: string; intro: string; slugs: string[] };
}

const values: LocationShowcase["about"]["values"] = [
  { icon: "engineering", label: "Engineering first" },
  { icon: "boq", label: "Itemised BoQ pricing" },
  { icon: "team", label: "One team, design to handover" },
  { icon: "weather", label: "Planned for hill weather" },
];

export const locationShowcase: Record<LocationPage["slug"], LocationShowcase> = {
  coimbatore: {
    heroImage: {
      src: "/images/projects/Residential/residential-building-construction-perur-prasanth-associates.webp",
      alt: "Family house in Perur, Coimbatore, built by Prasanth Associates",
    },
    aboutImage: {
      src: "/images/projects/Designs/interior-design-commercial-office-room-3.webp",
      alt: "Office interior designed by Prasanth Associates",
    },
    heroTagline: "Houses, villas and commercial buildings across the city",
    offerings: {
      heading: "What we build in Coimbatore",
      intro: "Our Gandhipuram office takes projects across Coimbatore, from family houses and villas to apartments, shops, offices and factories.",
      items: [
        { icon: "house", title: "House construction", body: "Individual houses and duplexes from the first plan to handover, like our 3,500 sq. ft. house in Perur, completed in 2020.", slug: "residential-construction" },
        { icon: "villa", title: "Villas and bungalows", body: "Villas and bungalows with courtyards, terraces and interiors planned together with the building.", slug: "villa-construction" },
        { icon: "apartment", title: "Apartments", body: "Apartment blocks built for landowners and clients, and apartment projects we develop ourselves.", slug: "apartment-construction" },
        { icon: "store", title: "Commercial buildings", body: "Shops, showrooms, offices and hotels, planned around how the premises will be used and run.", slug: "commercial-construction" },
        { icon: "factory", title: "Factories and industrial sheds", body: "Factory buildings and PEB steel sheds, with floors and machine foundations designed for the load.", slug: "industrial-factory-construction" },
        { icon: "turnkey", title: "Turnkey design and build", body: "One contract for design, approval support, construction and interiors, priced through an itemised BoQ.", slug: "turnkey-construction" },
        { icon: "plans", title: "Architecture and house plans", body: "Floor plans, 3D elevations and approval drawings for your plot, with structural drawings to match.", slug: "architectural-designs" },
        { icon: "renovation", title: "Renovation and added floors", body: "Repairs, layout changes and floor additions, after an engineer has checked the existing structure.", slug: "renovation" },
      ],
    },
    about: {
      eyebrow: "About our Coimbatore office",
      heading: "A construction company in Gandhipuram",
      paragraphs: [
        "Prasanth Associates is a construction, engineering and design company with offices in Coimbatore and Gudalur. Our head office is in Sowma Complex on Sathy Road, Gandhipuram, where our builders, civil engineers and designers plan, price and supervise projects across Coimbatore.",
        "Our Coimbatore work includes a 3,500 sq. ft. family house in Perur, completed in 2020, and across both offices we have built more than 100 homes. Every construction project is priced through an itemised BoQ before work starts.",
      ],
      values: [
        { icon: "engineering", label: "Engineering first" },
        { icon: "boq", label: "Itemised BoQ pricing" },
        { icon: "team", label: "One team, design to handover" },
        { icon: "plans", label: "Approvals checked for your plot" },
      ],
    },
    stats: [
      { value: "100+", label: "Homes built" },
      { value: "2", label: "Offices" },
    ],
    guides: {
      heading: "Guides for building in Coimbatore",
      intro: "Plain-English articles from our engineers on approvals, estimates and choosing a builder.",
      slugs: ["building-plan-approval-coimbatore-nilgiris", "how-to-read-a-construction-boq", "questions-to-ask-building-contractor-coimbatore-nilgiris"],
    },
  },

  "nilgiris-ooty": {
    heroImage: {
      src: "/images/projects/Residential/residential-building-construction-ooty-prasanth-associates.webp",
      alt: "Residential building in Ooty built by Prasanth Associates, with stone retaining walls on a sloping plot",
    },
    aboutImage: {
      src: "/images/projects/Schools/oxford-school-building-construction-prasanth-associates.webp",
      alt: "The Oxford Continental School at Bandi Shola, Ooty, a hill-station school building by Prasanth Associates",
    },
    heroTagline: "Houses, villas and schools built for the hills",
    offerings: {
      heading: "What we build in Ooty, Coonoor and Kotagiri",
      intro: "From a cottage on a terraced plot to a school block on a working campus, every building starts with the slope, the soil and the weather in your town.",
      items: [
        { icon: "villa", title: "Villas and holiday homes", body: "Villas, cottages and holiday homes planned around the slope, the views and the cold, with interiors designed alongside the building.", slug: "villa-construction" },
        { icon: "house", title: "Independent houses", body: "Family houses on hill plots, from the level survey and soil test to handover, priced through an itemised BoQ before work starts.", slug: "residential-construction" },
        { icon: "hospitality", title: "Resorts and homestays", body: "Homestays, guest cottages and resorts on hill sites, planned around how the property will be run and the approvals for guest use.", slug: "resort-homestay-construction" },
        { icon: "school", title: "Schools and commercial buildings", body: "School blocks, shops, hotels and offices, such as our 12,000 sq. ft. school building at Kandal, Ooty.", slug: "commercial-construction" },
        { icon: "apartment", title: "Apartments", body: "Apartment buildings for landowners and clients, and apartment projects we develop ourselves, checked floor by floor.", slug: "apartment-construction" },
        { icon: "renovation", title: "Bungalow renovation", body: "Older and British-era bungalows checked by an engineer first, then repaired and upgraded while keeping their character.", slug: "renovation" },
        { icon: "plans", title: "Architecture and house plans", body: "Plans, elevations and approval drawings that follow the plot's levels, with help filing the application.", slug: "architectural-designs" },
        { icon: "interiors", title: "Interiors for a cool climate", body: "Kitchens, wardrobes, ceilings and finishes chosen to stay dry and comfortable through mist and monsoon.", slug: "interior-designs" },
      ],
    },
    about: {
      eyebrow: "About our Nilgiris work",
      heading: "Builders who plan for the hills first",
      paragraphs: [
        "Prasanth Associates is a construction, engineering and design company with offices in Coimbatore and Gudalur. Projects in Ooty, Coonoor and Kotagiri are run from our Gudalur branch on Ooty Main Road, so site visits, drawings and supervision come from one team.",
        "We have built schools, estate bungalows, commercial buildings and family houses across the Nilgiris district, and more than 100 homes overall. On a hill plot, the design starts only after the levels, the soil, the water and the access road have been checked.",
      ],
      values,
    },
    stats: [
      { value: "100+", label: "Homes built" },
      { value: "4", label: "Nilgiris towns built in" },
    ],
    guides: {
      heading: "Guides for building in the hills",
      intro: "Plain-English articles from our engineers on plots, approvals and older buildings in Ooty and the Nilgiris district.",
      slugs: ["building-on-sloping-plot-ooty-gudalur", "renovate-old-bungalow-nilgiris", "building-plan-approval-coimbatore-nilgiris"],
    },
  },

  gudalur: {
    heroImage: {
      src: "/images/projects/Villa/luxury-villa-construction-pricol-prasanth-associates-1.webp",
      alt: "Pricol Limited tea bungalow in Gudalur, built by Prasanth Associates",
    },
    aboutImage: {
      src: "/images/projects/Renovation/manjushree-residential-building-renovation-prasanth-associates.webp",
      alt: "The renovated British-era Director's Building at Manjushree Plantation, O'Valley, The Nilgiris, by Prasanth Associates",
    },
    heroTagline: "Houses, estate bungalows and commercial buildings",
    offerings: {
      heading: "What we build in Gudalur",
      intro: "Our Gudalur work covers family houses, estate bungalows, a town-centre hotel and the renovation of an older plantation building.",
      items: [
        { icon: "house", title: "Independent houses", body: "Family houses built from the plan to handover, like our 2,617 sq. ft. house in Gudalur, built during 2024 and 2025.", slug: "residential-construction" },
        { icon: "villa", title: "Estate and tea bungalows", body: "Villas and plantation bungalows, such as the 12,120 sq. ft. Pricol Limited tea bungalow reached across a river.", slug: "villa-construction" },
        { icon: "hospitality", title: "Resorts and homestays", body: "Homestays, guest cottages and resorts, with the rooms, kitchens and services planned for guests and the approvals checked first.", slug: "resort-homestay-construction" },
        { icon: "store", title: "Commercial buildings and hotels", body: "Shops, hotels and offices in the town, such as Sasthapuri Hotels, built in phases on a tight town-centre site.", slug: "commercial-construction" },
        { icon: "apartment", title: "Apartments", body: "Apartment buildings for landowners and clients, and apartment projects we develop ourselves, checked floor by floor.", slug: "apartment-construction" },
        { icon: "renovation", title: "Estate building renovation", body: "Older estate buildings assessed and renovated, like the British-era Director's Building at Manjushree Plantation, O'Valley.", slug: "renovation" },
        { icon: "plans", title: "Architecture, drawings and approvals", body: "House plans, structural drawings and approval drawings prepared by our own civil engineers for your plot.", slug: "architectural-designs" },
        { icon: "interiors", title: "Interiors and modular kitchens", body: "Modular kitchens, wardrobes, false ceilings and lighting, designed in 3D and installed by our team.", slug: "interior-designs" },
      ],
    },
    about: {
      eyebrow: "About our Gudalur branch",
      heading: "A construction company based in Gudalur",
      paragraphs: [
        "Prasanth Associates is a construction, engineering and design company with offices in Coimbatore and Gudalur. Our Gudalur branch, at Thiruvalluvar Commercial Complex on Ooty Main Road, is where our builders and civil engineers plan, price and supervise projects across Gudalur and the Nilgiris district.",
        "Our work in and around the town includes the Pricol Limited tea bungalow, Sasthapuri Hotels, a family house and the Manjushree renovation at O'Valley. Across both offices we have built more than 100 homes.",
      ],
      values,
    },
    stats: [
      { value: "100+", label: "Homes built" },
      { value: "4", label: "Nilgiris towns built in" },
    ],
    guides: {
      heading: "Guides for building in Gudalur",
      intro: "Plain-English articles from our engineers, drawn from our own projects in and around Gudalur.",
      slugs: ["building-on-sloping-plot-ooty-gudalur", "commercial-building-planning-gudalur", "how-to-read-a-construction-boq"],
    },
  },
};
