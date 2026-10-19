/**
 * Blog posts: articles that answer a planning question using Prasanth
 * Associates' own completed projects as evidence. Each post links to the
 * case studies it draws on, and those case studies link back.
 *
 * Every fact about a project must match data/projects.ts. Don't publish
 * figures, approvals or methods the business hasn't confirmed.
 */

export interface BlogPost {
  slug: string;
  region: "coimbatore" | "nilgiris" | "both";
  title: string;
  metadataTitle: string;
  description: string;
  excerpt: string;
  datePublished: string;
  dateModified: string;
  /** Cover photo; must exist in /public. */
  image: string;
  imageAlt: string;
  intro: string[];
  sections: {
    title: string;
    paragraphs: string[];
    list?: string[];
    /** Case study this section draws on. */
    projectSlug?: string;
  }[];
  questions: { question: string; answer: string }[];
  /** Case studies the post draws on; they link back to the post. */
  projectSlugs: string[];
  related: { href: string; label: string }[];
  keywords: string[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "building-in-the-nilgiris-lessons-from-three-projects",
    region: "nilgiris",
    title: "Building in the Nilgiris: Lessons from a Tea Estate, a Town-Centre Hotel and a School in Ooty",
    metadataTitle: "Building in the Nilgiris: Lessons from 3 Projects",
    description:
      "A river crossing to a tea estate, a busy Gudalur town centre, and Ooty's rain: what three completed Nilgiris projects show about planning a building in the hills.",
    excerpt:
      "Three completed projects, three different problems: a tea bungalow reached across a river, a 38,879 sq. ft. commercial building in Gudalur town, and a school built through Ooty's rain.",
    datePublished: "2026-10-19",
    dateModified: "2026-10-19",
    image: "/images/projects/Commercial/modern-commercial-building-design-construction-gudalur-sasthapuri-hotels.webp",
    imageAlt: "Sasthapuri Hotels commercial building in Gudalur, designed and built by Prasanth Associates",
    intro: [
      "Most advice about building in the Nilgiris talks about slopes and monsoons. Those matter, but the projects we have delivered across the district show that the hardest part is often something else: how materials reach the site, how much room there is to work, and how the programme copes with the weather.",
      "Between 2014 and 2019 we completed three very different buildings in the Nilgiris: a 12,120 sq. ft. tea bungalow for Pricol Limited near Gudalur, a 38,879 sq. ft. commercial building for Sasthapuri Hotels in Gudalur town, and a 12,000 sq. ft. educational building for Christus Rex Higher Secondary School in Ooty. On all three we provided the architecture, structural engineering, MEP services and construction. Here is what each one shows, and what it means if you are planning a building in the hills.",
    ],
    sections: [
      {
        title: "1. On a remote site, plan the route before the building",
        projectSlug: "pricol",
        paragraphs: [
          "The Pricol Limited tea bungalow stands inside an established tea plantation, and reaching the site meant crossing a river. Every worker, every load of material and every piece of equipment had to make that crossing. The work also had to fit around a working plantation and its landscape.",
          "So access was planned first. We worked out how manpower, materials and equipment would move given how the site could be reached, organized transport around that, and sequenced construction to suit a remote site. The 12,120 sq. ft. bungalow was started in 2015 and completed in 2017.",
          "Estates, farmland and plots at the end of narrow roads are common in the Nilgiris. On sites like these, access decides the cost and the schedule as much as the design does.",
        ],
        list: [
          "How will a loaded truck reach the plot, in dry weather and in the monsoon?",
          "Where will materials be unloaded and stored, and how far must they be carried by hand?",
          "Does anything on the route need permission, such as a private estate road or a crossing?",
          "Will the work have to fit around an active estate, farm or neighbours?",
        ],
      },
      {
        title: "2. In a busy town, space and sequence are the constraints",
        projectSlug: "sasthapruri",
        paragraphs: [
          "Sasthapuri Hotels is a 38,879 sq. ft. commercial building in the main town area of Gudalur. The challenge there was the opposite of a remote estate: plenty of access, but very little room. There was limited space to work and store materials, deliveries had to be handled carefully, and the surrounding town had to keep functioning.",
          "We planned and scheduled the work systematically, coordinated material storage and movement to use the available site area, and organized construction in phases so different activities could progress without getting in each other's way. Regular supervision kept the work to the planned design. The building was started in 2014 and completed in 2016.",
          "Coordinating the architectural, structural and MEP work early mattered just as much. On a tight town site, a clash between a beam and a duct discovered during construction costs far more time than it would on an open plot.",
        ],
        list: [
          "Where will materials be stored when the site has no spare ground?",
          "When can deliveries arrive without blocking the road or neighbouring businesses?",
          "Are the structural, electrical and plumbing drawings coordinated before work starts?",
        ],
      },
      {
        title: "3. In Ooty, the programme has to be built around the weather",
        projectSlug: "rex-school",
        paragraphs: [
          "The 12,000 sq. ft. educational building for Christus Rex Higher Secondary School, on Woodcock Road in Kandal, Ooty, faced the conditions most people associate with the hills: heavy and unpredictable rain, sloping and uneven ground, difficult logistics, and site work that depends on the weather. Drainage and water management had to be part of the design from the start.",
          "We planned construction around the site conditions and local weather patterns, coordinated the structural design and construction method to suit a hill building, and organized the work to limit delays from Ooty's rainfall. The building was started in 2018 and completed in 2019.",
          "The campus stayed in use while the work went on. In the school management's own words: \"Adding a new three-story block to our active campus required precise planning. The team delivered exceptional structural work and managed the construction seamlessly, ensuring student safety and minimal disruption to our daily school schedule.\"",
        ],
        list: [
          "Is the schedule planned around the rainy months, or does it assume continuous work?",
          "How will rainwater be drained away from the building and the slope?",
          "If the building is in use nearby, such as a school, home or business, how will people be kept safe during work?",
        ],
      },
      {
        title: "What the three projects have in common",
        paragraphs: [
          "The three sites had different problems, but they were delivered in the same way. One team handled the architectural design, structural engineering, MEP services, construction and site supervision, and each project followed the same sequence: planning, architectural design, structural engineering, site preparation, construction, MEP works, finishing and completion.",
          "That matters most in the hills, where a design change during construction is slower and costlier to absorb. When the people drawing the building are also responsible for building it, access, space and weather are considered while the design is still on paper.",
        ],
      },
    ],
    questions: [
      {
        question: "Can you build on a tea estate or a remote plot in the Nilgiris?",
        answer:
          "Yes. Our Pricol Limited tea bungalow near Gudalur stands inside a tea plantation, and reaching the site meant crossing a river. Access and material logistics were planned before construction started. For any estate plot, have the land records and approval requirements checked before design work begins.",
      },
      {
        question: "Do you take on commercial and institutional buildings in the Nilgiris?",
        answer:
          "Yes. Examples include the 38,879 sq. ft. Sasthapuri Hotels commercial building in Gudalur and a 12,000 sq. ft. educational building for Christus Rex Higher Secondary School in Ooty.",
      },
      {
        question: "Do you provide the architecture and MEP as well as construction?",
        answer:
          "Yes. On all three projects in this article we provided the architecture, structural engineering, MEP services, construction and site supervision as one team.",
      },
      {
        question: "How long do larger buildings take in the Nilgiris?",
        answer:
          "It depends on the size, the site and the weather. The projects in this article ran from 2014 to 2016, 2015 to 2017 and 2018 to 2019. Your programme should be planned around the monsoon and the site's access from the start.",
      },
    ],
    projectSlugs: ["pricol", "sasthapruri", "rex-school"],
    related: [
      { href: "/locations/nilgiris-ooty", label: "Building in Ooty and the Nilgiris" },
      { href: "/services/commercial-construction-coimbatore", label: "Commercial construction" },
      { href: "/services/villa-construction-nilgiris", label: "Villa and estate bungalow construction in the Nilgiris" },
      { href: "/services/building-plan-approval-nilgiris", label: "House plans and building approval in the Nilgiris" },
      { href: "/guides/how-to-choose-a-builder-nilgiris", label: "Guide: how to choose a builder in the Nilgiris" },
    ],
    keywords: [
      "construction in the Nilgiris",
      "building in Ooty",
      "tea estate bungalow construction",
      "commercial building construction Gudalur",
      "school building construction Ooty",
      "hill station construction challenges",
    ],
  },
];
