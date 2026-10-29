import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { blogPosts, readingMinutes, formatPostDate, type BlogBlock } from "@/data/blog";
import { services } from "@/data/services";
import { projects, hasDetailsPage } from "@/data/projects";
import { getServicePath } from "@/data/serviceRoutes";
import { blurProps } from "@/data/imageBlur";
import { SITE_URL, pageOpenGraph, ORG_ID } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import ScrollReveal from "@/components/ui/ScrollReveal";
import CTABanner from "@/components/ui/CTABanner";

interface Props {
  params: Promise<{ slug: string }>;
}

// No `dynamicParams = false`: on Cloudflare (OpenNext) that makes every page 404.
// Unknown slugs still return a real 404 through notFound().
export function generateStaticParams() {
  return blogPosts.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((entry) => entry.slug === slug);
  if (!post) notFound();
  return {
    title: post.seoTitle,
    description: post.description,
    alternates: { canonical: `${SITE_URL}/blog/${post.slug}` },
    openGraph: {
      ...pageOpenGraph(`/blog/${post.slug}`, `${post.seoTitle} | Prasanth Associates`, post.description, [
        { url: post.image, alt: post.imageAlt },
      ]),
      type: "article",
      publishedTime: post.datePublished,
    },
  };
}

/** Renders [text](/path) inside a paragraph as site links; everything else is plain text. */
function Inline({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return (
    <>
      {parts.map((part, i) => {
        const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        return link ? (
          <Link key={i} href={link[2]} className="text-gold-dark font-semibold underline underline-offset-4 hover:text-charcoal">
            {link[1]}
          </Link>
        ) : (
          <span key={i}>{part}</span>
        );
      })}
    </>
  );
}

function Block({ block }: { block: BlogBlock }) {
  if ("h2" in block) {
    return <h2 className="font-heading text-2xl md:text-3xl font-bold text-charcoal mt-12 mb-4 leading-snug">{block.h2}</h2>;
  }
  if ("p" in block) {
    return (
      <p className="text-base md:text-lg text-concrete leading-relaxed mb-5">
        <Inline text={block.p} />
      </p>
    );
  }
  if ("table" in block) {
    const { caption, head, rows } = block.table;
    return (
      <div className="mb-8 overflow-x-auto rounded-2xl border border-border">
        <table className="w-full min-w-[520px] text-left text-sm md:text-base">
          <caption className="caption-top px-4 pt-4 pb-2 text-left text-xs font-bold uppercase tracking-wider text-concrete-light">
            {caption}
          </caption>
          <thead className="bg-linen">
            <tr>
              {head.map((cell) => (
                <th key={cell} scope="col" className="px-4 py-3 font-semibold text-charcoal">{cell}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, r) => (
              <tr key={r} className="border-t border-border align-top">
                {row.map((cell, c) =>
                  c === 0 ? (
                    <th key={c} scope="row" className="px-4 py-3 font-semibold text-charcoal">
                      <Inline text={cell} />
                    </th>
                  ) : (
                    <td key={c} className="px-4 py-3 text-concrete leading-relaxed">
                      <Inline text={cell} />
                    </td>
                  )
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  const items = "ul" in block ? block.ul : block.ol;
  const Tag = "ul" in block ? "ul" : "ol";
  return (
    <Tag className="mb-6 space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3 text-base md:text-lg text-concrete leading-relaxed">
          {"ol" in block ? (
            <span className="text-xs font-bold text-gold-dark mt-1.5 w-5 flex-shrink-0">{String(i + 1).padStart(2, "0")}</span>
          ) : (
            <span className="w-1.5 h-1.5 rounded-full bg-gold mt-3 flex-shrink-0" />
          )}
          <span>
            <Inline text={item} />
          </span>
        </li>
      ))}
    </Tag>
  );
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((entry) => entry.slug === slug);
  if (!post) notFound();

  const url = `${SITE_URL}/blog/${post.slug}`;
  const related = post.relatedServices
    .map((serviceSlug) => services.find((service) => service.slug === serviceSlug))
    .filter((service) => service !== undefined);
  const projectCases = projects.filter((project) =>
    post.relatedProjects?.includes(project.slug) && project.status === "completed" && hasDetailsPage(project)
  );
  // Posts sharing a service with this one first, then the same category, then the rest.
  const relevance = (entry: (typeof blogPosts)[number]) =>
    (entry.relatedServices.some((slug) => post.relatedServices.includes(slug)) ? 2 : 0) +
    (entry.category === post.category ? 1 : 0);
  const others = blogPosts
    .filter((entry) => entry.slug !== post.slug)
    .map((entry, index) => ({ entry, index }))
    .sort((a, b) => relevance(b.entry) - relevance(a.entry) || a.index - b.index)
    .slice(0, 3)
    .map(({ entry }) => entry);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "BlogPosting",
              "@id": `${url}#article`,
              headline: post.title,
              description: post.description,
              image: `${SITE_URL}${post.image}`,
              datePublished: post.datePublished,
              dateModified: post.dateModified ?? post.datePublished,
              author: { "@id": ORG_ID },
              publisher: { "@id": ORG_ID },
              mainEntityOfPage: { "@type": "WebPage", "@id": url },
              inLanguage: "en-IN",
              ...(projectCases.length ? {
                citation: projectCases.map((project) => ({
                  "@type": "WebPage",
                  name: project.title,
                  url: `${SITE_URL}/projects/${project.slug}`,
                })),
              } : {}),
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
        }}
      />

      {/* Hero, matching the project pages */}
      <section className="relative h-[55vh] min-h-[460px] mt-[-104px]">
        <div className="absolute inset-0 z-0">
          <Image src={post.image} alt={post.imageAlt} fill className="object-cover" loading="eager" fetchPriority="high" sizes="100vw" {...blurProps(post.image)} />
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(26,26,26,0.92)] via-[rgba(26,26,26,0.45)] to-transparent" />
        </div>
        <div className="container relative z-10 h-full flex flex-col justify-end pb-14 max-w-4xl">
          <ScrollReveal>
            <nav aria-label="Breadcrumb" className="mb-4 text-xs text-concrete-lighter">
              <Link href="/" className="hover:text-gold">Home</Link>
              <span className="mx-2">/</span>
              <Link href="/blog" className="hover:text-gold">Blog</Link>
            </nav>
            <p className="text-sm font-semibold tracking-wider uppercase text-gold mb-3">
              {post.category} · <time dateTime={post.datePublished}>{formatPostDate(post.datePublished)}</time> · {readingMinutes(post)} min read
            </p>
            <h1 className="font-heading text-3xl md:text-5xl text-white font-bold leading-tight drop-shadow-md">{post.title}</h1>
          </ScrollReveal>
        </div>
      </section>

      <article className="section bg-background">
        <div className="container max-w-3xl">
          {post.body.map((block, i) => (
            <Block key={i} block={block} />
          ))}

          {projectCases.length > 0 && (
            <section aria-labelledby="article-projects" className="mt-10 p-6 rounded-3xl bg-linen border border-border">
              <h2 id="article-projects" className="font-heading text-xl font-bold text-charcoal mb-4">Projects behind this article</h2>
              <ul className="space-y-4">
                {projectCases.map((project) => (
                  <li key={project.slug}>
                    <Link href={`/projects/${project.slug}`} className="inline-flex items-center gap-2 text-sm font-semibold text-charcoal hover:text-gold-dark">
                      {project.title} <ArrowRight size={13} />
                    </Link>
                    <p className="mt-1 text-xs text-concrete">{project.location} · {project.area}</p>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {post.references && post.references.length > 0 && (
            <section aria-labelledby="article-references" className="mt-8">
              <h2 id="article-references" className="font-heading text-lg font-bold text-charcoal mb-3">Further reading</h2>
              <ul className="space-y-2">
                {post.references.map((reference) => (
                  <li key={reference.href}>
                    <a href={reference.href} className="text-sm text-gold-dark underline underline-offset-4 hover:text-charcoal">{reference.label}</a>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <p className="mt-10 text-sm text-concrete-light">Written by the team at Prasanth Associates.</p>

          {related.length > 0 && (
            <div className="mt-10 p-6 rounded-3xl bg-white border border-border">
              <p className="text-[11px] font-bold uppercase tracking-widest text-gold-dark mb-3">Related services</p>
              <ul className="space-y-2">
                {related.map((service) => (
                  <li key={service.slug}>
                    <Link href={getServicePath(service.slug)} className="inline-flex items-center gap-2 text-sm font-semibold text-charcoal hover:text-gold-dark">
                      {service.title} <ArrowRight size={13} />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </article>

      {others.length > 0 && (
        <section className="py-14 md:py-20 bg-linen border-y border-border">
          <div className="container max-w-5xl">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-charcoal mb-8 text-center">More from the blog</h2>
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {others.map((other) => (
                <li key={other.slug}>
                  <Link href={`/blog/${other.slug}`} className="group block h-full p-6 rounded-3xl bg-white border border-border hover:border-gold transition-colors">
                    <p className="text-[11px] font-bold uppercase tracking-widest text-gold-dark mb-2">{other.category}</p>
                    <h3 className="font-heading text-lg font-bold text-charcoal leading-snug group-hover:text-gold-dark transition-colors">
                      {other.title}
                    </h3>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <CTABanner />
    </>
  );
}
