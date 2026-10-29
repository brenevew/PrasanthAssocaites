import Image from "next/image";
import { blurProps } from "@/data/imageBlur";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { SITE_URL, pageOpenGraph, ORG_ID, GUDALUR_BRANCH_ID } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import Link from "next/link";
import { projects, projectPhotoAlt, hasDetailsPage, projectLocationLink, projectServiceSlug, projectAreas } from "@/data/projects";
import { getServicePath } from "@/data/serviceRoutes";
import { blogPosts } from "@/data/blog";
import CTABanner from "@/components/ui/CTABanner";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  
  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  // Projects without a written case study still have placeholder text in
  // shortDescription, so they get a factual generated description instead.
  const description = hasDetailsPage(project)
    ? project.seoDescription ?? project.shortDescription
    : `${project.title}: ${project.type.toLowerCase()} by Prasanth Associates${project.location ? ` in ${project.location}` : ""}. Browse project photographs and discuss a similar build.`;

  return {
    title: project.seoTitle ?? project.title,
    description,
    // Placeholder pages stay reachable but out of search results until their
    // case study is written; hasDetailsPage() flips this automatically.
    ...(hasDetailsPage(project) ? {} : { robots: { index: false, follow: true } }),
    alternates: {
      canonical: `${SITE_URL}/projects/${project.slug}`,
    },
    openGraph: pageOpenGraph(
      `/projects/${project.slug}`,
      `${project.title} | Prasanth Associates`,
      description,
      [{ url: project.image, alt: project.title }]
    ),
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  // Leave out anything not supplied yet rather than showing an empty or placeholder value.
  const overview = [
    { label: "Client", value: project.client },
    { label: "Built-up Area", value: project.area },
    { label: "Project Period", value: project.duration },
    { label: "Completion", value: project.year },
    ...(project.facts ?? []),
  ].filter((item) => item.value && item.value !== "To be confirmed");

  const serviceSlug = projectServiceSlug(project);
  const locationLink = projectLocationLink(project);
  const relatedArticles = blogPosts.filter((post) => post.relatedProjects?.includes(project.slug)).slice(0, 3);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Projects", item: `${SITE_URL}/projects` },
      { "@type": "ListItem", position: 3, name: project.title, item: `${SITE_URL}/projects/${project.slug}` },
    ],
  };

  // Gudalur case studies: describe the page and the building, and tie both to the
  // Gudalur branch. Only recorded facts (title, town, photo) are used.
  const pageUrl = `${SITE_URL}/projects/${project.slug}`;
  const gudalurPageSchema = projectAreas(project).includes("gudalur") && hasDetailsPage(project)
    ? {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: `${project.seoTitle ?? project.title} | Prasanth Associates`,
        description: project.seoDescription ?? project.shortDescription,
        inLanguage: "en-IN",
        isPartOf: { "@id": `${SITE_URL}#website` },
        publisher: { "@id": ORG_ID },
        mentions: { "@id": GUDALUR_BRANCH_ID },
        primaryImageOfPage: { "@type": "ImageObject", url: `${SITE_URL}${project.image}` },
        about: {
          "@type": "Place",
          name: project.title,
          address: {
            "@type": "PostalAddress",
            addressLocality: "Gudalur",
            addressRegion: "Tamil Nadu",
            addressCountry: "IN",
          },
          containedInPlace: { "@type": "AdministrativeArea", name: "The Nilgiris" },
        },
      }
    : null;

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      {gudalurPageSchema && <JsonLd data={gudalurPageSchema} />}
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] mt-[-104px]">
        <div className="absolute inset-0 z-0">
          <Image
            src={project.image}
            alt={projectPhotoAlt(project, project.image)}
            fill
            className="object-cover"
            loading="eager"
            fetchPriority="high"
            sizes="100vw"
            {...blurProps(project.image)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(26,26,26,0.9)] via-[rgba(26,26,26,0.4)] to-transparent" />
        </div>
        
        <div className="container relative z-10 h-full flex flex-col justify-end pb-16">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-4">
              {/* Same look as plain text; the links tie each project to its service
                  and location pages for visitors and crawlers. */}
              {serviceSlug ? (
                <Link href={getServicePath(serviceSlug)} className="text-sm font-semibold tracking-wider uppercase text-gold">
                  {project.type}
                </Link>
              ) : (
                <span className="text-sm font-semibold tracking-wider uppercase text-gold">{project.type}</span>
              )}
              <span className="w-1.5 h-1.5 rounded-full bg-concrete-lighter" />
              {locationLink?.href === "/locations/gudalur" && project.location.endsWith(", The Nilgiris") ? (
                // Gudalur projects also point at the Nilgiris hub page.
                <span className="text-sm font-medium text-concrete-lighter">
                  <Link href={locationLink.href}>{project.location.replace(/, The Nilgiris$/, "")}</Link>
                  {", "}
                  <Link href="/locations/nilgiris-ooty">The Nilgiris</Link>
                </span>
              ) : locationLink ? (
                <Link href={locationLink.href} className="text-sm font-medium text-concrete-lighter">
                  {project.location}
                </Link>
              ) : (
                <span className="text-sm font-medium text-concrete-lighter">{project.location}</span>
              )}
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white font-bold mb-4 drop-shadow-md">
              {project.title}
            </h1>
          </ScrollReveal>
        </div>
      </section>

      {/* Project Overview Bar */}
      <section className="bg-linen text-charcoal border-y border-border py-8">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-x-0 md:divide-x divide-border">
            {overview.map((item) => (
              <div key={item.label} className="px-4">
                <p className="text-xs text-concrete uppercase tracking-wider mb-1 font-semibold">{item.label}</p>
                <p className="font-medium text-charcoal">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Story */}
      <section className="section bg-background">
        <div className="container max-w-4xl">
          <div className="space-y-16">
            {project.scope && (
              <ScrollReveal>
                <h2 className="font-heading text-3xl text-charcoal mb-6 font-semibold">Scope of Work</h2>
                <ul className="flex flex-wrap gap-3">
                  {project.scope.map((item) => (
                    <li key={item} className="badge-gold">
                      {item}
                    </li>
                  ))}
                </ul>
              </ScrollReveal>
            )}

            {(project.challenge || project.challengePoints) && (
            <ScrollReveal>
              <h2 className="font-heading text-3xl text-charcoal mb-6 font-semibold">{project.challengeHeading ?? "The Challenge"}</h2>
              {project.challenge && (
                <p className="text-lg text-concrete leading-relaxed">
                  {project.challenge}
                </p>
              )}
              {project.challengePoints && (
                <ul className="mt-6 space-y-3">
                  {project.challengePoints.map((point) => (
                    <li key={point} className="flex items-start gap-3 text-charcoal">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2.5 flex-shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              )}
            </ScrollReveal>
            )}

            {(project.designApproach || project.approachSteps) && (
            <ScrollReveal delay={100}>
              <h2 className="font-heading text-3xl text-charcoal mb-6 font-semibold">Our Approach</h2>
              {project.designApproach && (
                <p className="text-lg text-concrete leading-relaxed">
                  {project.designApproach}
                </p>
              )}
              {project.approachSteps && (
                <ol className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
                  {project.approachSteps.map((step, idx) => (
                    <li key={step.title} className="neu-glass rounded-2xl p-6">
                      <p className="text-xs font-bold tracking-wider uppercase text-gold-dark mb-2">
                        {String(idx + 1).padStart(2, "0")}
                      </p>
                      <h3 className="font-heading text-lg font-bold text-charcoal mb-2">{step.title}</h3>
                      <p className="text-sm text-concrete leading-relaxed">{step.description}</p>
                    </li>
                  ))}
                </ol>
              )}
            </ScrollReveal>
            )}

            {(project.constructionMethod || project.stages) && (
            <ScrollReveal delay={200}>
              <h2 className="font-heading text-3xl text-charcoal mb-6 font-semibold">Construction & Engineering</h2>
              {project.constructionMethod && (
                <p className="text-lg text-concrete leading-relaxed">
                  {project.constructionMethod}
                </p>
              )}
              {project.stages && (
                <ol className="mt-6 flex flex-wrap items-center gap-2 text-sm">
                  {project.stages.map((stage, idx) => (
                    <li key={stage} className="flex items-center gap-2">
                      <span className="nm-raised-sm rounded-full px-3.5 py-1.5 text-charcoal font-medium">
                        {stage}
                      </span>
                      {idx < project.stages!.length - 1 && (
                        <span aria-hidden="true" className="text-gold-dark">→</span>
                      )}
                    </li>
                  ))}
                </ol>
              )}
            </ScrollReveal>
            )}

            {/* Gallery */}
            {project.galleryImages.length > 0 && (
              <ScrollReveal delay={300} className="grid grid-cols-1 md:grid-cols-2 gap-6 my-12">
                {project.galleryImages.map((img, idx) => (
                  <div key={idx} className="relative aspect-[4/3] w-full group">
                    <Image
                      src={img}
                      alt={projectPhotoAlt(project, img, idx + 1)}
                      fill
                      className="object-cover border border-border"
                      // The gallery column caps each photo at about 400px wide on desktop.
                      sizes="(max-width: 768px) 100vw, 400px"
                      loading="lazy"
                      {...blurProps(img)}
                    />
                  </div>
                ))}
              </ScrollReveal>
            )}

            {project.result && (
            <ScrollReveal>
              <h2 className="font-heading text-3xl text-charcoal mb-6 font-semibold">The Result</h2>
              <div className="p-8 bg-surface border-l-4 border-gold shadow-sm">
                <p className="text-lg text-charcoal font-medium leading-relaxed italic">
                  {project.result}
                </p>
              </div>
            </ScrollReveal>
            )}
          </div>
        </div>
      </section>

      {relatedArticles.length > 0 && (
        <section className="py-14 md:py-20 bg-linen border-y border-border">
          <div className="container max-w-5xl">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-charcoal mb-8">Planning a similar project?</h2>
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((post) => (
                <li key={post.slug}>
                  <Link href={`/blog/${post.slug}`} className="group block h-full p-6 rounded-3xl bg-white border border-border hover:border-gold transition-colors">
                    <h3 className="font-heading text-lg font-bold text-charcoal leading-snug group-hover:text-gold-dark">{post.title}</h3>
                    <p className="mt-3 text-sm text-concrete leading-relaxed">{post.excerpt}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <CTABanner
        headline="Want a similar project?"
        subtitle="Talk to our engineering and design team to understand how we can approach your vision."
      />
    </>
  );
}
