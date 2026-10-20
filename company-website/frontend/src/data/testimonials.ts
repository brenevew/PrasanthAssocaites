export interface Testimonial {
  name: string;
  project: string;
  location: string;
  quote: string;
  role: string;
}

/**
 * Testimonials — replace with real customer feedback.
 * All names and quotes below are placeholder content.
 */
export const testimonials: Testimonial[] = [
  {
    name: "Vijay Raghavan", // [PLACEHOLDER]
    project: "Residential Construction",
    location: "Coimbatore",
    quote:
      "The entire construction process was transparent from day one. Weekly updates, documented progress, and no surprises on the budget. The team delivered exactly what was promised, and the finishing quality exceeded our expectations.",
    role: "Homeowner",
  },
  {
    name: "Priya", // [PLACEHOLDER]
    project: "Villa Construction",
    location: "Ooty",
    quote:
      "What impressed us most was their attention to structural details that most builders overlook — waterproofing, concrete quality, and electrical planning. Three years in, and the house performs flawlessly.",
    role: "Villa Owner",
  },
  {
    name: "Suresh Ramanathan", // [PLACEHOLDER]
    project: "Commercial Office",
    location: "Coimbatore",
    quote:
      "We chose Prasanth Associates for our office building because of their commercial construction experience. They managed approvals, coordinated MEP systems, and delivered the project on schedule. Professional throughout.",
    role: "Business Owner",
  },
  {
    name: "Dinesh Mani", // [PLACEHOLDER]
    project: "Home Renovation",
    location: "Gudalur",
    quote:
      "Our 30-year-old home needed serious structural work. The team assessed every detail, explained what needed to be done, and transformed the space without disrupting our daily life more than necessary. Outstanding work.",
    role: "Homeowner",
  },
   {
  name: "Christus Rex Higher Secondary School",
  project: "3-Floor School Building Extension",
  location: "Ooty",
  quote:
    "Adding a new three-story block to our active campus required precise planning. The team delivered exceptional structural work and managed the construction seamlessly, ensuring student safety and minimal disruption to our daily school schedule.",
  role: "School Management / Correspondent",
},
  {
    name: "Confidential", // [PLACEHOLDER]
    project: "Smart Home Villa",
    location: "Kanniyakumarai",
    quote:
      "We wanted a home that integrates technology seamlessly — automated lighting, security, climate control. The team planned the smart systems during the design phase itself, not as an afterthought. The result feels effortless to live in.",
    role: "Villa Owner",
  },
];
