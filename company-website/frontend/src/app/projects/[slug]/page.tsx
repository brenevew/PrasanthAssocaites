import Image from "next/image";
import { blurProps } from "@/data/imageBlur";
import { notFound } from "next/navigation";
import { Metadata } from "next";
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

  return {
    title: project.title,
    description: project.shortDescription,
    openGraph: {
      title: project.title,
      description: project.shortDescription,
      images: [project.image],
    },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] mt-[-104px]">
        <div className="absolute inset-0 z-0">
          <Image
            src={project.image}
            alt={project.title}
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
              <span className="w-1.5 h-1.5 rounded-full bg-concrete-lighter" />
              <span className="text-sm font-medium text-concrete-lighter">
                {project.location}
              </span>
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
            <div className="px-4">
              <p className="text-xs text-concrete uppercase tracking-wider mb-1 font-semibold">Client</p>
              <p className="font-medium text-charcoal">{project.client}</p>
            </div>
            <div className="px-4">
              <p className="text-xs text-concrete uppercase tracking-wider mb-1 font-semibold">Built-up Area</p>
              <p className="font-medium text-charcoal">{project.area}</p>
            </div>
            <div className="px-4">
              <p className="text-xs text-concrete uppercase tracking-wider mb-1 font-semibold">Duration</p>
              <p className="font-medium text-charcoal">{project.duration}</p>
            </div>
            <div className="px-4">
              <p className="text-xs text-concrete uppercase tracking-wider mb-1 font-semibold">Completion</p>
              <p className="font-medium text-charcoal">{project.year}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Project Story */}
      <section className="section bg-background">
        <div className="container max-w-4xl">
          <div className="space-y-16">
            <ScrollReveal>
              <h2 className="font-heading text-3xl text-charcoal mb-6 font-semibold">The Challenge</h2>
              <p className="text-lg text-concrete leading-relaxed">
                {project.challenge}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <h2 className="font-heading text-3xl text-charcoal mb-6 font-semibold">Design Approach</h2>
              <p className="text-lg text-concrete leading-relaxed">
                {project.designApproach}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <h2 className="font-heading text-3xl text-charcoal mb-6 font-semibold">Construction & Engineering</h2>
              <p className="text-lg text-concrete leading-relaxed">
                {project.constructionMethod}
              </p>
            </ScrollReveal>

            {/* Gallery */}
            {project.galleryImages.length > 0 && (
              <ScrollReveal delay={300} className="grid grid-cols-1 md:grid-cols-2 gap-6 my-12">
                {project.galleryImages.map((img, idx) => (
                  <div key={idx} className="relative aspect-[4/3] w-full group">
                    <Image
                      src={img}
                      alt={`${project.title} gallery image ${idx + 1}`}
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

            <ScrollReveal>
              <h2 className="font-heading text-3xl text-charcoal mb-6 font-semibold">The Result</h2>
              <div className="p-8 bg-surface border-l-4 border-gold shadow-sm">
                <p className="text-lg text-charcoal font-medium leading-relaxed italic">
                  {project.result}
                </p>
              </div>
            </ScrollReveal>
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
