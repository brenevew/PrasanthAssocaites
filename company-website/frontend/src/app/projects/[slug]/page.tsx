import Image from "next/image";
import Link from "next/link";
import { blurProps } from "@/data/imageBlur";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { SITE_URL, pageOpenGraph } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import { projects } from "@/data/projects";
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

  const description = `${project.title}: ${project.type.toLowerCase()} by Prasanth Associates${project.location ? ` in ${project.location}` : ""}. Browse project photographs and discuss a similar build.`;

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
    { label: "Built-up area", value: project.area },
    { label: "Duration", value: project.duration },
    { label: "Completion", value: project.year },
  ].filter((fact) => fact.value);
  const story = [
    { title: "The Challenge", text: project.challenge },
    { title: "Design Approach", text: project.designApproach },
    { title: "Construction & Engineering", text: project.constructionMethod },
    { title: "The Result", text: project.result },
  ].filter((section) => section.text);

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
            alt={`${project.title}, ${project.type.toLowerCase()} by Prasanth Associates`}
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
            {story.map((section) => (
              <ScrollReveal key={section.title}>
                <h2 className="font-heading text-3xl text-charcoal mb-6 font-semibold">{section.title}</h2>
                <p className="text-lg text-concrete leading-relaxed">{section.text}</p>
              </ScrollReveal>
            ))}

            {/* Gallery */}
            {project.galleryImages.length > 0 && (
              <ScrollReveal delay={300} className="grid grid-cols-1 md:grid-cols-2 gap-6 my-12">
                {project.galleryImages.map((img, idx) => (
                  <div key={idx} className="relative aspect-[4/3] w-full group">
                    <Image
                      src={img}
                      alt={`${project.title}, ${project.type.toLowerCase()} by Prasanth Associates (gallery photo ${idx + 1})`}
                      fill
                      className="object-cover border border-border"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      loading="lazy"
                      {...blurProps(img)}
                    />
                  </div>
                ))}
              </ScrollReveal>
            )}

            <Link href="/projects" className="inline-block font-semibold text-gold-dark underline underline-offset-4">
              Explore all construction projects
            </Link>
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
