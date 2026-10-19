import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { servicePages } from "@/data/servicePages";
import { projects } from "@/data/projects";
import { services } from "@/data/services";
import { company } from "@/data/company";
import { serviceCategories, plannableSlugs, designSlugs } from "@/data/serviceCategories";
import { serviceHref } from "@/data/serviceLinks";
import { ORG_ID, GUDALUR_BRANCH_ID, SITE_URL, pageOpenGraph } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import Button from "@/components/ui/Button";
import ProjectCard from "@/components/ui/ProjectCard";
import DesignGallery from "@/components/ui/DesignGallery";
import { designGalleryImages } from "@/data/designGallery";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return servicePages.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = servicePages.find((entry) => entry.slug === slug);
  if (!page) notFound();
  // Google shows ~60 characters. When "<service>, Coimbatore & Nilgiris" plus
  // the " | Prasanth Associates" suffix would be cut off, drop the suffix so
  // the service and both regions stay visible (the brand is in the schema).
  const pageTitle = page.metadataTitle || page.title;
  return {
    title: pageTitle.length + " | Prasanth Associates".length > 65 ? { absolute: pageTitle } : pageTitle,
    description: page.description,
    keywords: [
      ...new Set([...(page.keywords ?? []), ...(page.aliases ?? []).map((alias) => `${alias} Coimbatore`)]),
    ],
    alternates: { canonical: `${SITE_URL}/services/${page.slug}` },
    openGraph: pageOpenGraph(`/services/${page.slug}`, `${page.title} | Prasanth Associates`, page.description),
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const page = servicePages.find((entry) => entry.slug === slug);
  if (!page) notFound();
  const service = services.find((entry) => entry.slug === page.serviceSlug);
  if (!service) notFound();
  const regionName = page.location === "nilgiris" ? "Nilgiris" : page.location === "coimbatore" ? "Coimbatore" : "";
  const relatedProjects = projects
    .filter((project) => project.category === page.projectCategory)
    .sort((a, b) => Number(regionName !== "" && b.location.includes(regionName)) - Number(regionName !== "" && a.location.includes(regionName)));
  const category = serviceCategories.find((entry) => entry.slugs.includes(service.slug));
  const relatedServices = services.filter((entry) => entry.slug !== service.slug && category?.slugs.includes(entry.slug));
  const canPlan = plannableSlugs.includes(service.slug) || designSlugs.includes(service.slug);
  const isNilgiris = page.location === "nilgiris";
  const isBoth = page.location === "both";
  const office = company.offices.find((entry) => entry.label === (isNilgiris ? "Gudalur" : "Coimbatore"))!;
  const gudalurOffice = company.offices.find((entry) => entry.label === "Gudalur")!;
  const nilgirisAreas = [
    { "@type": "AdministrativeArea", name: "The Nilgiris" },
    ...["Gudalur", "Ooty", "Coonoor", "Kotagiri"].map((name) => ({ "@type": "City", name })),
  ];
  const url = `${SITE_URL}/services/${page.slug}`;
  // The same service written for the other region, e.g. Coimbatore house
  // construction <-> Nilgiris house construction.
  const counterpart = servicePages.find(
    (entry) => entry.serviceSlug === page.serviceSlug && (entry.location === "nilgiris") !== isNilgiris
  );
  const nilgirisSiblings = servicePages.filter((entry) => entry.location === "nilgiris" && entry.slug !== page.slug);

  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Service",
            "@id": isNilgiris ? `${url}#service` : `${SITE_URL}/services#${service.slug}`,
            name: page.title,
            serviceType: service.title,
            ...(page.aliases?.length ? { alternateName: page.aliases } : {}),
            description: page.description,
            url,
            provider: { "@id": isNilgiris ? GUDALUR_BRANCH_ID : ORG_ID },
            areaServed: isNilgiris
              ? nilgirisAreas
              : isBoth
                ? [{ "@type": "City", name: "Coimbatore", alternateName: "Kovai" }, ...nilgirisAreas]
                : { "@type": "City", name: "Coimbatore", alternateName: "Kovai" },
          },
          {
            // Mirrors the visible "Questions before you start" section below.
            "@type": "FAQPage",
            "@id": `${url}#faq`,
            mainEntity: page.questions.map(({ question, answer }) => ({
              "@type": "Question",
              name: question,
              acceptedAnswer: { "@type": "Answer", text: answer },
            })),
          },
          {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
              { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` },
              { "@type": "ListItem", position: 3, name: page.title, item: url },
            ],
          },
        ],
      }} />

      <section className="bg-linen border-b border-border py-16 md:py-24">
        <div className="container max-w-4xl">
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-concrete">
            <Link href="/" className="underline">Home</Link>
            {" / "}<Link href="/services" className="underline">Services</Link>
            {" / "}<span aria-current="page">{service.title}</span>
          </nav>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-charcoal mb-6">{page.title}</h1>
          <p className="text-lg text-concrete leading-relaxed mb-8">{page.intro}</p>
          <div className="flex flex-wrap gap-4">
            <Button href={`/request-quote?service=${service.slug}`}>Request a quote</Button>
            <Button href={canPlan ? "/plan-home" : "/contact"} variant="secondary">
              {canPlan ? "Plan your building" : "Contact our team"}
            </Button>
          </div>
        </div>
      </section>

      <section className="section bg-background">
        <div className="container max-w-4xl space-y-12">
          {page.sections.map((section) => (
            <div key={section.title}>
              <h2 className="font-heading text-3xl font-semibold text-charcoal mb-4">{section.title}</h2>
              <p className="text-concrete leading-relaxed">{section.text}</p>
            </div>
          ))}
          {page.scopeItems && (
            <div>
              <h2 className="font-heading text-3xl font-semibold text-charcoal mb-6">What we design</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {page.scopeItems.map((item) => (
                  <li key={item.title} className="rounded-2xl border border-border bg-white p-5">
                    <h3 className="font-heading text-lg font-bold text-charcoal mb-1">{item.title}</h3>
                    <p className="text-concrete text-sm leading-relaxed">{item.text}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {page.process && (
            <div>
              <h2 className="font-heading text-3xl font-semibold text-charcoal mb-6">How it works</h2>
              <ol className="space-y-5">
                {page.process.map((step, index) => (
                  <li key={step.title} className="flex gap-4">
                    <span className="w-8 h-8 rounded-full bg-linen border border-border flex items-center justify-center text-sm font-bold text-gold-dark flex-shrink-0">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="font-heading text-lg font-bold text-charcoal">{step.title}</h3>
                      <p className="text-concrete leading-relaxed">{step.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
              {page.processNote && <p className="text-concrete leading-relaxed mt-6">{page.processNote}</p>}
            </div>
          )}
          <div>
            <h2 className="font-heading text-3xl font-semibold text-charcoal mb-4">
              {isNilgiris
                ? "Discuss your site with our Nilgiris team"
                : isBoth
                  ? "Discuss your project in Coimbatore or the Nilgiris"
                  : "Discuss your site with our Coimbatore team"}
            </h2>
            <p className="text-concrete leading-relaxed">
              {isNilgiris
                ? "Our staffed branch office on Ooty Main Road, Gudalur, serves Gudalur, Ooty, Coonoor, Kotagiri and the rest of the Nilgiris district. Share the plot location and the work you need so a branch engineer can review it and arrange a site visit."
                : isBoth
                  ? "Our Gandhipuram office serves Coimbatore, also known as Kovai, and our branch office on Ooty Main Road, Gudalur, serves the Nilgiris. Share the property location and the work you need so the nearer office can discuss the scope and arrange the next step."
                  : "Our Gandhipuram office serves Coimbatore, also known as Kovai. Share the property location and the work you need so we can discuss the scope and arrange the next step."}
            </p>
            <address className="not-italic text-concrete leading-relaxed mt-4">
              {company.name}{isBoth && `, ${office.label} ${office.badge}`}<br />
              {office.street}, {office.city}, {office.state} {office.pincode}<br />
              <a href={`tel:${office.phone.replace(/\s/g, "")}`} className="text-gold-dark underline">{office.phone}</a>
            </address>
            {isBoth && (
              <address className="not-italic text-concrete leading-relaxed mt-4">
                {company.name}, {gudalurOffice.label} {gudalurOffice.badge}<br />
                {gudalurOffice.street}, Gudalur, {gudalurOffice.city}, {gudalurOffice.state} {gudalurOffice.pincode}<br />
                <a href={`tel:${gudalurOffice.phone.replace(/\s/g, "")}`} className="text-gold-dark underline">{gudalurOffice.phone}</a>
              </address>
            )}
            <Link href={isNilgiris ? "/locations/gudalur" : "/locations/coimbatore"} className="inline-block mt-4 text-gold-dark underline">
              {isNilgiris ? "Gudalur branch office hours and directions" : "Office hours and directions in Coimbatore"}
            </Link>
            {isBoth && (
              <Link href="/locations/gudalur" className="block mt-2 text-gold-dark underline">
                Gudalur branch office hours and directions
              </Link>
            )}
            {counterpart && (
              <p className="text-concrete leading-relaxed mt-4">
                {isNilgiris ? "Building in Coimbatore? See " : "Building in the Nilgiris? See "}
                <Link href={`/services/${counterpart.slug}`} className="text-gold-dark underline">{counterpart.title}</Link>.
              </p>
            )}
          </div>
        </div>
      </section>

      {page.designGallery === "interiors" && (
        <section className="section bg-linen">
          <div className="container">
            <h2 className="font-heading text-3xl font-semibold text-charcoal mb-3">Interior work</h2>
            <p className="text-concrete mb-8">
              Kitchens, living spaces, bedrooms, bathrooms and a café interior from our design portfolio.
            </p>
            <DesignGallery images={designGalleryImages.filter((img) => !img.src.includes("landscape"))} />
          </div>
        </section>
      )}

      {relatedProjects.length > 0 && (
        <section className="section bg-linen">
          <div className="container">
            <h2 className="font-heading text-3xl font-semibold text-charcoal mb-8">From our project portfolio</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProjects.map((project) => <ProjectCard key={project.slug} project={project} />)}
            </div>
          </div>
        </section>
      )}

      <section id="faq" className="section bg-background scroll-mt-32">
        <div className="container max-w-4xl">
          <h2 className="font-heading text-3xl font-semibold text-charcoal mb-8">Questions before you start</h2>
          <div className="space-y-8">
            {page.questions.map(({ question, answer }) => (
              <div key={question}>
                <h3 className="font-heading text-xl font-semibold text-charcoal mb-3">{question}</h3>
                <p className="text-concrete leading-relaxed">{answer}</p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Button href={`/request-quote?service=${service.slug}`}>Discuss your project</Button>
          </div>
        </div>
      </section>

      <section className="section bg-linen">
        <div className="container max-w-4xl">
          <h2 className="font-heading text-3xl font-semibold text-charcoal mb-6">Related services</h2>
          <ul className="grid gap-4 sm:grid-cols-2">
            {isNilgiris ? (
              <>
                {nilgirisSiblings.map((related) => (
                  <li key={related.slug}>
                    <Link href={`/services/${related.slug}`} className="text-gold-dark underline underline-offset-4">{related.title}</Link>
                  </li>
                ))}
                <li>
                  <Link href="/locations/nilgiris-ooty" className="text-gold-dark underline underline-offset-4">Building in Ooty, Coonoor and Kotagiri</Link>
                </li>
                <li>
                  <Link href="/locations/gudalur" className="text-gold-dark underline underline-offset-4">Building in Gudalur</Link>
                </li>
              </>
            ) : (
              relatedServices.map((related) => (
                <li key={related.slug}>
                  <Link href={serviceHref(related.slug)} className="text-gold-dark underline underline-offset-4">{related.title}</Link>
                </li>
              ))
            )}
          </ul>
          <Link href="/services" className="inline-block mt-6 text-gold-dark underline">
            {isNilgiris || isBoth ? "View all services" : "View all services in Coimbatore"}
          </Link>
        </div>
      </section>
    </>
  );
}
