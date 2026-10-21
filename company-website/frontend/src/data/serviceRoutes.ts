/** Keep the established turnkey URL; service identifiers and hash links stay stable. */
export function getServicePath(slug: string): string {
  return slug === "turnkey-construction"
    ? "/services/turnkey-design-build-coimbatore"
    : `/services/${slug}`;
}
