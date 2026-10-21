import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, ChevronRight, Compass } from "lucide-react";
import { services } from "@/data/services";
import { serviceCategories, plannableSlugs, designSlugs } from "@/data/serviceCategories";
import { getServicePath } from "@/data/serviceRoutes";
import { SITE_URL } from "@/lib/seo";
import { serviceMetadata, serviceSchema } from "@/lib/serviceSeo";
import JsonLd from "@/components/seo/JsonLd";
import Button from "@/components/ui/Button";
import ContactForm from "@/components/ui/ContactForm";
import CTABanner from "@/components/ui/CTABanner";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface Props { params: Promise<{ slug: string }> }

export const dynamicParams = false;

export function generateStaticParams() {
  return services
    .filter((service) => getServicePath(service.slug) === `/services/${service.slug}`)
    .map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!services.some((service) => service.slug === slug)) notFound();
  return serviceMetadata(slug);
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = services.find((entry) => entry.slug === slug);
  if (!service) notFound();
  const category = serviceCategories.find((entry) => entry.slugs.includes(slug))!;
  const hasPlanner = plannableSlugs.includes(slug) || designSlugs.includes(slug);
  const url = `${SITE_URL}${getServicePath(slug)}`;

  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@graph": [
          serviceSchema(service),
          {
            "@type": "BreadcrumbList",
            "@id": `${url}#breadcrumb`,
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
              { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` },
              { "@type": "ListItem", position: 3, name: service.title, item: url },
            ],
          },
        ],
      }} />
      <section className="relative pt-36 pb-24 bg-gradient-to-b from-[#FAF8F5] to-[var(--canvas-bg)] text-charcoal overflow-hidden border-b border-border">
        <div className="absolute inset-0 blueprint-grid opacity-15" />
        <div className="container relative z-10 max-w-5xl">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs text-concrete mb-8">
            <Link href="/">Home</Link><ChevronRight size={12} aria-hidden="true" />
            <Link href="/services">Services</Link><ChevronRight size={12} aria-hidden="true" />
            <span aria-current="page">{service.title}</span>
          </nav>
          <ScrollReveal>
            <span className="badge-gold mb-4 inline-flex">{category.label}</span>
            <h1 className="font-heading font-bold text-charcoal mb-6 leading-tight" style={{ fontSize: "var(--text-h1)" }}>{service.title}</h1>
            <p className="text-base md:text-lg text-concrete leading-relaxed max-w-3xl mb-8">{service.shortDescription}</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button href={`/request-quote?service=${slug}`} variant="primary">Request Quote<ArrowRight size={14} /></Button>
              {hasPlanner && <Button href="/plan-home" variant="outline"><Compass size={14} />Building Planner</Button>}
            </div>
          </ScrollReveal>
        </div>
      </section>
      <section className="section bg-[var(--canvas-bg)]">
        <div className="container max-w-5xl">
          <ScrollReveal>
            <div className="neu-glass rounded-3xl p-8 md:p-12">
              <p className="text-concrete leading-relaxed mb-8">{service.description}</p>
              <h2 className="text-xl font-heading font-bold text-charcoal mb-6">Key Capabilities &amp; Specifications</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.features.map((feature) => <li key={feature} className="flex items-start gap-2"><CheckCircle2 size={16} className="text-gold flex-shrink-0 mt-0.5" /><span className="text-sm text-concrete">{feature}</span></li>)}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </section>
      <section className="py-14 md:py-20 bg-linen border-y border-border">
        <div className="container max-w-3xl">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-charcoal mb-8">Request Quote</h2>
          <ContactForm isEstimate serviceSlug={slug} serviceTitle={service.title} />
        </div>
      </section>
      <CTABanner />
    </>
  );
}
