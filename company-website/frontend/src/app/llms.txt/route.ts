import { company } from "@/data/company";
import { services } from "@/data/services";
import { serviceCategories } from "@/data/serviceCategories";
import { SITE_URL } from "@/lib/seo";

/**
 * /llms.txt — a plain-text fact sheet for AI search engines (llmstxt.org).
 * Built from the same data the pages render, so it can never say anything
 * the website itself does not. Not linked from any page.
 */
export const dynamic = "force-static";

export function GET() {
  const stat = (label: string) => {
    const s = company.stats.find((x) => x.label === label);
    return s ? `${s.value}${s.suffix}` : null;
  };

  const serviceSections = serviceCategories
    .map((category) => {
      const lines = category.slugs
        .map((slug) => services.find((s) => s.slug === slug))
        .filter((s) => s !== undefined)
        .map((s) => `- [${s.title}](${SITE_URL}/services#${s.slug}): ${s.shortDescription}`);
      return `### ${category.label}\n\n${lines.join("\n")}`;
    })
    .join("\n\n");

  const offices = company.offices
    .map(
      (o) =>
        `- ${o.label} ${o.badge}: ${o.street}, ${o.city}, ${o.state} ${o.pincode}, India. Phone ${o.phone}. Email ${o.email}. Map: ${o.mapLink}`
    )
    .join("\n");

  const years = stat("Years Experience");
  const projectsDelivered = stat("Projects Delivered");

  const body = `# ${company.name}

> ${company.name} is a construction, architecture and engineering firm based in Coimbatore, Tamil Nadu, India, with a branch office in Gudalur, The Nilgiris. It designs and builds houses, villas, commercial buildings and factories, prepares architectural, 3D, structural, electrical and plumbing drawings, and provides bank valuation reports, structural stability certificates, cost estimates (BoQ) and property advisory.

${[years && `- Years in business: ${years}`, projectsDelivered && `- Projects delivered: ${projectsDelivered}`].filter(Boolean).join("\n")}
- Head office: Gandhipuram, Coimbatore
- Branch office: Gudalur, The Nilgiris
- Primary service area: Coimbatore and surrounding areas, including Saravanampatti, Vadavalli, Thudiyalur, Peelamedu, RS Puram, Kalapatti, Sulur and Mettupalayam
- Secondary service area: The Nilgiris district, including Ooty, Coonoor, Kotagiri and Gudalur
- Pricing model: itemized, fixed-price Bill of Quantities (BoQ) signed before construction starts
- Website: ${SITE_URL}

## Contact

${offices}
- Opening hours: Monday to Saturday, ${company.hours.weekdays}. Sunday closed.
- Get a quote: ${SITE_URL}/request-quote
- Contact page: ${SITE_URL}/contact

## Services

${serviceSections}

## Key pages

- [Home](${SITE_URL}/)
- [All services](${SITE_URL}/services)
- [Turnkey design and build in Coimbatore](${SITE_URL}/services/turnkey-design-build-coimbatore)
- [Construction company in Coimbatore](${SITE_URL}/locations/coimbatore)
- [Builders in The Nilgiris and Ooty](${SITE_URL}/locations/nilgiris-ooty)
- [House contractors in Gudalur](${SITE_URL}/locations/gudalur)
- [Property and investment advisory](${SITE_URL}/property-investment)
- [Projects](${SITE_URL}/projects)
- [Building planner](${SITE_URL}/plan-home)
- [About](${SITE_URL}/about)

## Profiles

- Instagram: ${company.social.instagram}
- Facebook: ${company.social.facebook}
- LinkedIn: ${company.social.linkedin}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
