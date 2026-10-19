import Image from "next/image";
import Link from "next/link";
import { blurProps } from "@/data/imageBlur";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { SITE_URL, pageOpenGraph } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import { projects, projectPhotoAlt, type Project } from "@/data/projects";
import { testimonials } from "@/data/testimonials";
import { blogPosts } from "@/data/blog";
import { serviceHref } from "@/data/serviceLinks";
import CTABanner from "@/components/ui/CTABanner";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ProjectGallery from "@/components/ui/ProjectGallery";

interface Props {
  params: Promise<{ slug: string }>;
}

/** The service and regional pages a project is evidence for. */
function relatedLinks(project: Project) {
  const nilgiris = project.location.includes("Nilgiris");
  const coimbatore = project.location.includes("Coimbatore");
  const links: { href: string; label: string }[] = [];
  if (project.category === "commercial") {
    links.push({ href: serviceHref("commercial-construction"), label: "Commercial construction" });
  } else if (project.category === "villa") {
    links.push(nilgiris
      ? { href: "/services/villa-construction-nilgiris", label: "Villa & estate bungalow construction in the Nilgiris" }
      : { href: serviceHref("villa-construction"), label: "Villa construction" });
  } else {
    links.push(nilgiris
      ? { href: "/services/house-construction-nilgiris", label: "House construction in the Nilgiris" }
      : { href: serviceHref("residential-construction"), label: "House construction in Coimbatore" });
  }
  if (project.scope?.some((item) => item.toLowerCase().includes("architect"))) {
    links.push(nilgiris
      ? { href: "/services/building-plan-approval-nilgiris", label: "House plans & building approval in the Nilgiris" }
      : { href: serviceHref("architectural-designs"), label: "Architectural design" });
  }
  if (nilgiris) links.push({ href: "/locations/nilgiris-ooty", label: "Building in Ooty and the Nilgiris" });
  if (coimbatore) links.push({ href: "/locations/coimbatore", label: "Building in Coimbatore" });
  return links;
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

  const description = project.scope
    ? project.shortDescription
    : `${project.title}: ${project.type.toLowerCase()} by Prasanth Associates${project.location ? ` in ${project.location}` : ""}. Browse project photographs and discuss a similar build.`;

  return {
    title: project.title,
    description,
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

  const facts = [
    { label: "Project type", value: project.type },
    { label: "Status", value: project.status === "completed" ? "Completed" : "Ongoing" },
    { label: "Client", value: project.client },
    { label: "Location", value: project.location },
    { label: "Project area", value: project.area },
    { label: "Project period", value: project.duration },
    { label: "Completion", value: project.year },
  ].filter((fact) => fact.value);
  const story = [
    { title: "Design Approach", text: project.designApproach },
    { title: "Construction & Engineering", text: project.constructionMethod },
  ].filter((section) => section.text);
  const testimonial = testimonials.find((entry) => entry.name === project.client);
  const related = relatedLinks(project);
  const posts = blogPosts.filter((post) => post.projectSlugs.includes(project.slug));

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Projects", item: `${SITE_URL}/projects` },
      { "@type": "ListItem", position: 3, name: project.title, item: `${SITE_URL}/projects/${project.slug}` },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] mt-[-104px]">
        <div className="absolute inset-0 z-0">
          <Image
            src={project.image}
            alt={projectPhotoAlt(project, project.image)}
            fill
            className="object-cover"
            priority
            sizes="100vw"
            {...blurProps(project.image)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(26,26,26,0.9)] via-[rgba(26,26,26,0.4)] to-transparent" />
        </div>
        
        <div className="container relative z-10 h-full flex flex-col justify-end pb-16">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-sm font-semibold tracking-wider uppercase text-gold">
                {project.type}
              </span>
              {project.location && (
                <span className="text-sm font-medium text-concrete-lighter">{project.location}</span>
              )}
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white font-bold mb-4 drop-shadow-md">
              {project.title}
            </h1>
          </ScrollReveal>
        </div>
      </section>

      <section className="bg-linen text-charcoal border-y border-border py-8">
        <div className="container">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-concrete">
            <Link href="/" className="underline">Home</Link>
            {" / "}<Link href="/projects" className="underline">Projects</Link>
            {" / "}<span aria-current="page">{project.title}</span>
          </nav>
          <dl className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt className="text-xs text-concrete uppercase tracking-wider mb-1 font-semibold">{fact.label}</dt>
                <dd className="font-medium text-charcoal">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section bg-background">
        <div className="container max-w-4xl">
          <div className="space-y-16">
            <div>
              <h2 className="font-heading text-3xl text-charcoal mb-6 font-semibold">Project Overview</h2>
              <p className="text-lg text-concrete leading-relaxed">{project.shortDescription}</p>
            </div>
            {project.scope && (
              <div>
                <h2 className="font-heading text-3xl text-charcoal mb-6 font-semibold">Scope of Work</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.scope.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-charcoal font-medium">
                      <span className="w-2 h-2 rounded-full bg-gold flex-shrink-0" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {(project.challenge || project.challengePoints) && (
              <ScrollReveal>
                <h2 className="font-heading text-3xl text-charcoal mb-6 font-semibold">The Challenge</h2>
                {project.challenge && <p className="text-lg text-concrete leading-relaxed">{project.challenge}</p>}
                {project.challengePoints && (
                  <ul className="mt-6 space-y-2 list-disc pl-6 text-charcoal">
                    {project.challengePoints.map((point) => <li key={point}>{point}</li>)}
                  </ul>
                )}
              </ScrollReveal>
            )}

            {project.solutionSteps && (
              <ScrollReveal>
                <h2 className="font-heading text-3xl text-charcoal mb-6 font-semibold">Our Approach</h2>
                <ol className="space-y-5">
                  {project.solutionSteps.map((step, index) => (
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
              </ScrollReveal>
            )}

            {story.map((section) => (
              <ScrollReveal key={section.title}>
                <h2 className="font-heading text-3xl text-charcoal mb-6 font-semibold">{section.title}</h2>
                <p className="text-lg text-concrete leading-relaxed">{section.text}</p>
              </ScrollReveal>
            ))}

            {project.executionStages && (
              <div>
                <h2 className="font-heading text-3xl text-charcoal mb-6 font-semibold">Project Execution</h2>
                <ol className="flex flex-wrap items-center gap-2 text-sm">
                  {project.executionStages.map((stage, index) => (
                    <li key={stage} className="flex items-center gap-2">
                      <span className="px-3 py-1.5 rounded-full bg-linen border border-border text-charcoal font-medium">{stage}</span>
                      {index < project.executionStages!.length - 1 && <span className="text-gold-dark" aria-hidden="true">→</span>}
                    </li>
                  ))}
                </ol>
                {project.duration && (
                  <p className="text-concrete mt-4">Started in {project.duration.split("–")[0]} and completed in {project.year}.</p>
                )}
              </div>
            )}

            {project.result && (
              <ScrollReveal>
                <h2 className="font-heading text-3xl text-charcoal mb-6 font-semibold">The Result</h2>
                <p className="text-lg text-concrete leading-relaxed">{project.result}</p>
              </ScrollReveal>
            )}

            {testimonial && (
              <figure className="border-l-4 border-gold pl-6">
                <blockquote className="text-lg text-charcoal leading-relaxed italic">&ldquo;{testimonial.quote}&rdquo;</blockquote>
                <figcaption className="mt-3 text-sm text-concrete">
                  {testimonial.name}, {testimonial.role}
                </figcaption>
              </figure>
            )}

            <ProjectGallery project={project} />

            <div>
              <h2 className="font-heading text-2xl text-charcoal mb-4 font-semibold">Related</h2>
              <ul className="space-y-2">
                {related.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="font-semibold text-gold-dark underline underline-offset-4">{link.label}</Link>
                  </li>
                ))}
                {posts.map((post) => (
                  <li key={post.slug}>
                    <Link href={`/blog/${post.slug}`} className="font-semibold text-gold-dark underline underline-offset-4">Blog: {post.title}</Link>
                  </li>
                ))}
                <li>
                  <Link href="/projects" className="font-semibold text-gold-dark underline underline-offset-4">Explore all construction projects</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <CTABanner
        headline="Want a similar project?"
        subtitle="Talk to our engineering and design team to understand how we can approach your vision."
      />
    </>
  );
}
