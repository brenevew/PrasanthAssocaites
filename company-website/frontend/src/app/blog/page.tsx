import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { blogPosts, readingMinutes, formatPostDate } from "@/data/blog";
import { blurProps } from "@/data/imageBlur";
import { SITE_URL, pageOpenGraph, ORG_ID } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import ScrollReveal from "@/components/ui/ScrollReveal";
import CTABanner from "@/components/ui/CTABanner";

const description =
  "Practical articles on house plans, approvals, estimates, valuation and building in Coimbatore and the Nilgiris, from the team at Prasanth Associates.";

export const metadata: Metadata = {
  title: "Building Blog, Coimbatore & Nilgiris",
  description,
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: pageOpenGraph("/blog", "Blog | Prasanth Associates", description),
};

export default function BlogPage() {
  const posts = [...blogPosts].sort((a, b) => b.datePublished.localeCompare(a.datePublished));

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Blog",
              "@id": `${SITE_URL}/blog#blog`,
              name: "Prasanth Associates Blog",
              description,
              url: `${SITE_URL}/blog`,
              publisher: { "@id": ORG_ID },
              blogPost: posts.map((post) => ({
                "@type": "BlogPosting",
                // Same node as the post's own page, not a second, anonymous one.
                "@id": `${SITE_URL}/blog/${post.slug}#article`,
                headline: post.title,
                url: `${SITE_URL}/blog/${post.slug}`,
                datePublished: post.datePublished,
              })),
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
                { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
              ],
            },
          ],
        }}
      />

      {/* Hero, matching the Projects page */}
      <section className="relative pt-32 pb-16 bg-gradient-to-b from-[#FAF8F5] to-[var(--canvas-bg)] text-charcoal border-b border-border overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />
        <div className="container relative z-10 text-center max-w-3xl">
          <ScrollReveal>
            <span className="inline-block px-3.5 py-1 rounded-full text-xs font-semibold tracking-[0.2em] uppercase text-gold-dark nm-raised border border-border shadow-2xs mb-4">
              Blog
            </span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-charcoal font-bold mb-6 leading-tight">
              Notes from the Site
            </h1>
            <p className="text-lg text-concrete leading-relaxed">{description}</p>
          </ScrollReveal>
        </div>
      </section>

      <section className="section bg-background">
        <div className="container max-w-6xl">
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {posts.map((post, index) => (
              <li key={post.slug}>
                <ScrollReveal delay={(index % 3) * 100} className="h-full">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group flex flex-col h-full rounded-3xl nm-raised p-3.5 transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl">
                      <Image
                        src={post.image}
                        alt={post.imageAlt}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        loading={index < 3 ? "eager" : "lazy"}
                        {...blurProps(post.image)}
                      />
                    </div>
                    <div className="flex flex-col flex-1 gap-3 px-3 pt-5 pb-3">
                      <p className="text-[11px] font-bold uppercase tracking-widest text-gold-dark">
                        {post.category} · <time dateTime={post.datePublished}>{formatPostDate(post.datePublished)}</time>
                      </p>
                      <h2 className="font-heading text-xl font-bold text-charcoal leading-snug group-hover:text-gold-dark transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-sm text-concrete leading-relaxed flex-1">{post.excerpt}</p>
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-charcoal group-hover:text-gold-dark transition-colors">
                        Read article · {readingMinutes(post)} min <ArrowRight size={13} />
                      </span>
                    </div>
                  </Link>
                </ScrollReveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
