import { getServicePath } from "./serviceRoutes";

// Published service URLs from d24468b. Keep each old intent mapped to the
// corresponding current service, even when multiple locations share a page.
const legacyServices: Record<string, string> = {
  "house-construction-coimbatore": "residential-construction",
  "villa-construction-coimbatore": "villa-construction",
  "commercial-construction-coimbatore": "commercial-construction",
  "factory-shed-construction-coimbatore": "industrial-factory-construction",
  "home-automation-coimbatore": "smart-homes",
  "house-renovation-coimbatore": "renovation",
  "construction-consulting-coimbatore": "construction-work-consulting",
  "architectural-house-plans-coimbatore": "architectural-designs",
  "structural-drawings-coimbatore": "structural-drawings",
  "electrical-drawings-coimbatore": "electrical-drawings",
  "plumbing-drawings-coimbatore": "plumbing-drawings",
  "interior-design-coimbatore": "interior-designs",
  "landscape-design-coimbatore": "landscaping-designs",
  "bank-property-valuation-coimbatore": "bank-valuation-report",
  "structural-stability-certificate-coimbatore": "structural-stability-certificate",
  "building-estimation-boq-coimbatore": "detailed-estimation-costing",
  "chartered-engineer-valuation-coimbatore": "chartered-engineer-valuation",
  "property-buying-advisory-coimbatore": "property-acquisition-advisory",
  "land-plot-consultants-coimbatore": "land-plot-transactions",
  "property-investment-consulting-coimbatore": "real-estate-investment-consulting",
  "property-management-coimbatore": "property-portfolio-management",
  "house-construction-nilgiris": "residential-construction",
  "villa-construction-nilgiris": "villa-construction",
  "building-plan-approval-nilgiris": "architectural-designs",
};

const builderGuide = "/blog/questions-to-ask-building-contractor-coimbatore-nilgiris";

export const legacyRedirects = [
  ...Object.entries(legacyServices).map(([slug, service]) => ({
    source: `/services/${slug}`,
    destination: getServicePath(service),
    permanent: true,
  })),
  ...[
    "/guides/how-to-choose-a-construction-company-coimbatore",
    "/guides/how-to-choose-a-builder-nilgiris",
  ].map((source) => ({ source, destination: builderGuide, permanent: true })),
];
