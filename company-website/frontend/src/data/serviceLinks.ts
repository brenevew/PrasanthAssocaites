/** Canonical service routes, kept small for navigation and client components. */
export const serviceRoutes = {
  "residential-construction": "house-construction-coimbatore",
  "villa-construction": "villa-construction-coimbatore",
  "commercial-construction": "commercial-construction-coimbatore",
  "turnkey-construction": "turnkey-design-build-coimbatore",
  "industrial-factory-construction": "factory-shed-construction-coimbatore",
  "smart-homes": "home-automation-coimbatore",
  renovation: "house-renovation-coimbatore",
  "construction-work-consulting": "construction-consulting-coimbatore",
  "architectural-designs": "architectural-house-plans-coimbatore",
  "structural-drawings": "structural-drawings-coimbatore",
  "electrical-drawings": "electrical-drawings-coimbatore",
  "plumbing-drawings": "plumbing-drawings-coimbatore",
  "interior-designs": "interior-design-coimbatore",
  "landscaping-designs": "landscape-design-coimbatore",
  "bank-valuation-report": "bank-property-valuation-coimbatore",
  "structural-stability-certificate": "structural-stability-certificate-coimbatore",
  "detailed-estimation-costing": "building-estimation-boq-coimbatore",
  "chartered-engineer-valuation": "chartered-engineer-valuation-coimbatore",
  "property-acquisition-advisory": "property-buying-advisory-coimbatore",
  "land-plot-transactions": "land-plot-consultants-coimbatore",
  "real-estate-investment-consulting": "property-investment-consulting-coimbatore",
  "property-portfolio-management": "property-management-coimbatore",
} as const;

export type ServiceSlug = keyof typeof serviceRoutes;

export function serviceHref(slug: string): string {
  const route = Object.hasOwn(serviceRoutes, slug) ? serviceRoutes[slug as ServiceSlug] : undefined;
  return route ? `/services/${route}` : `/services#${encodeURIComponent(slug)}`;
}
