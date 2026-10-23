import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { services } from "@/data/services";
import { getServicePath } from "@/data/serviceRoutes";
import { serviceFaqs } from "@/data/serviceFaqs";
import { projects, projectServiceSlug } from "@/data/projects";
import { serviceMetadata } from "@/lib/serviceSeo";
import ServiceLanding from "@/components/services/ServiceLanding";

interface Props { params: Promise<{ slug: string }> }

// Services whose canonical page is /services/<slug>. The turnkey service has its
// own page; next.config redirects its short alias to that canonical URL.
const hasLandingPage = (slug: string) =>
  services.some((service) => service.slug === slug) && getServicePath(slug) === `/services/${slug}`;

// No `dynamicParams = false`: on Cloudflare (OpenNext) prebuilt pages aren't in a
// runtime cache, so that setting made every service URL 404 in production.
// Unknown slugs still 404 through notFound() below.
export function generateStaticParams() {
  return services.filter((service) => hasLandingPage(service.slug)).map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!hasLandingPage(slug)) notFound();
  return serviceMetadata(slug);
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = services.find((entry) => entry.slug === slug);
  if (!service || !hasLandingPage(slug)) notFound();

  return (
    <ServiceLanding
      service={service}
      faqs={serviceFaqs[slug] ?? []}
      projects={projects.filter((project) => projectServiceSlug(project) === slug).slice(0, 3)}
    />
  );
}
