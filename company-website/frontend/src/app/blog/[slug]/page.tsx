import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts } from "@/data/blog";
import { projects } from "@/data/projects";
import { company } from "@/data/company";
import { blurProps } from "@/data/imageBlur";
import { ORG_ID, SITE_URL, pageOpenGraph } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import Button from "@/components/ui/Button";
import ProjectCard from "@/components/ui/ProjectCard";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return blogPosts.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((entry) => entry.slug === slug);
  if (!post) notFound();
  return {
    title: post.metadataTitle,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: `${SITE_URL}/blog/${post.slug}` },
    openGraph: {
      ...pageOpenGraph(`/blog/${post.slug}`, `${post.title} | Prasanth Associates`, post.description, [
        { url: post.image, alt: post.imageAlt },
      ]),
      type: "article",
      publishedTime: post.datePublished,
      modifiedTime: post.dateModified,
    },
  };
}

function formatDate(date: string) {
  return new Date(`${date}T00:00:00+05:30`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((entry) => entry.slug === slug);
  if (!post) notFound();
  const url = `${SITE_URL}/blog/${post.slug}`;
  const featured = post.projectSlugs
    .map((projectSlug) => projects.find((project) => project.slug === projectSlug))
    .filter((project) => project !== undefined);
  const office = company.offices.find((entry) => entry.label === (post.region === "coimbatore" ? "Coimbatore" : "Gudalur"))!;

  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "BlogPosting",
            "@id": `${url}#article`,
            headline: post.title,
            description: post.description,
            image: `${SITE_URL}${post.image}`,
            url,
            datePublished: post.datePublished,
            dateModified: post.dateModified,
            inLanguage: "en-IN",
            author: { "@id": ORG_ID },
            publisher: { "@id": ORG_ID },
            mainEntityOfPage: url,
            about: featured.map((project) => ({
              "@type": "CreativeWork",
              name: project.title,
              url: `${SITE_URL}/projects/${project.slug}`,
            })),
          },
          {
            "@type": "FAQPage",
            "@id": `${url}#faq`,
            mainEntity: post.questions.map(({ question, answer }) => ({
              "@type": "Question",
              name: question,
              acceptedAnswer: { "@type": "Answer", text: answer },
            })),
          },
          {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
              { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
              { "@type": "ListItem", position: 3, name: post.title, item: url },
            ],
          },
        ],
      }} />

      <section className="bg-linen border-b border-border py-16 md:py-24">
        <div className="container max-w-4xl">
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-concrete">
            <Link href="/" className="underline">Home</Link>
            {" / "}<Link href="/blog" className="underline">Blog</Link>
            {" / "}<span aria-current="page">Article</span>
          </nav>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-charcoal mb-6">{post.title}</h1>
          <p className="text-sm text-concrete mb-8">
            By {company.name} · <time dateTime={post.datePublished}>{formatDate(post.datePublished)}</time>
          </p>
          <div className="space-y-4">
            {post.intro.map((text) => (
              <p key={text} className="text-lg text-concrete leading-relaxed">{text}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background pt-12">
        <div className="container max-w-4xl">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl border border-border">
            <Image
              src={post.image}
              alt={post.imageAlt}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 896px) 100vw, 896px"
              {...blurProps(post.image)}
            />
          </div>
        </div>
      </section>

      <section className="section bg-background">
        <div className="container max-w-4xl space-y-12">
          {post.sections.map((section) => {
            const project = section.projectSlug ? projects.find((entry) => entry.slug === section.projectSlug) : undefined;
            return (
              <div key={section.title}>
                <h2 className="font-heading text-3xl font-semibold text-charcoal mb-4">{section.title}</h2>
                <div className="space-y-4">
                  {section.paragraphs.map((text) => (
                    <p key={text} className="text-concrete leading-relaxed">{text}</p>
                  ))}
                </div>
                {section.list && (
                  <>
                    <h3 className="font-heading text-lg font-semibold text-charcoal mt-6 mb-3">Questions to ask for your project</h3>
                    <ul className="space-y-2 list-disc pl-6 text-charcoal">
                      {section.list.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                  </>
                )}
                {project && (
                  <p className="mt-6">
                    <Link href={`/projects/${project.slug}`} className="font-semibold text-gold-dark underline underline-offset-4">
                      Read the case study: {project.title}
                    </Link>
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {featured.length > 0 && (
        <section className="section bg-linen">
          <div className="container">
            <h2 className="font-heading text-3xl font-semibold text-charcoal mb-8 text-center">The projects in this article</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {featured.map((project) => <ProjectCard key={project.slug} project={project} />)}
            </div>
          </div>
        </section>
      )}

      <section className="section bg-background">
        <div className="container max-w-4xl">
          <h2 className="font-heading text-3xl font-semibold text-charcoal mb-8">Common questions</h2>
          <div className="space-y-8">
            {post.questions.map(({ question, answer }) => (
              <div key={question}>
                <h3 className="font-heading text-xl font-semibold text-charcoal mb-3">{question}</h3>
                <p className="text-concrete leading-relaxed">{answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-linen">
        <div className="container max-w-4xl">
          <h2 className="font-heading text-3xl font-semibold text-charcoal mb-6">Planning a project?</h2>
          <address className="not-italic text-concrete leading-relaxed">
            {company.name}, {office.label} {office.badge}<br />
            {office.street}, {office.city}, {office.state} {office.pincode}<br />
            <a href={`tel:${office.phone.replace(/\s/g, "")}`} className="text-gold-dark underline">{office.phone}</a>
          </address>
          <div className="flex flex-wrap gap-4 mt-8">
            <Button href="/request-quote">Request a quote</Button>
            <Button href="/contact" variant="secondary">Contact our team</Button>
          </div>
          <h3 className="font-heading text-xl font-semibold text-charcoal mt-12 mb-4">Related pages</h3>
          <ul className="grid gap-4 sm:grid-cols-2">
            {post.related.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-gold-dark underline underline-offset-4">{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
