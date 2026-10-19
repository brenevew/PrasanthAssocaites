import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "@/data/blog";
import { guides } from "@/data/guides";
import { blurProps } from "@/data/imageBlur";
import { SITE_URL, pageOpenGraph } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import { ArrowRight } from "lucide-react";

const description =
  "Articles on planning, designing and building in Coimbatore and the Nilgiris, drawn from Prasanth Associates' own completed projects.";

export const metadata: Metadata = {
  title: "Blog: Building in Coimbatore & the Nilgiris",
  description,
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: pageOpenGraph("/blog", "Blog | Prasanth Associates", description),
};

const regionLabel = { coimbatore: "Coimbatore", nilgiris: "The Nilgiris", both: "Coimbatore & the Nilgiris" } as const;

export default function BlogIndexPage() {
  const posts = [...blogPosts].sort((a, b) => b.datePublished.localeCompare(a.datePublished));

  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Blog",
        "@id": `${SITE_URL}/blog#blog`,
        name: "Prasanth Associates Blog",
        description,
        url: `${SITE_URL}/blog`,
        blogPost: posts.map((post) => ({
          "@type": "BlogPosting",
          headline: post.title,
          url: `${SITE_URL}/blog/${post.slug}`,
          datePublished: post.datePublished,
        })),
      }} />

      <section className="bg-linen border-b border-border py-16 md:py-24">
        <div className="container max-w-4xl">
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-concrete">
            <Link href="/" className="underline">Home</Link>
            {" / "}<span aria-current="page">Blog</span>
          </nav>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-charcoal mb-6">Blog</h1>
          <p className="text-lg text-concrete leading-relaxed">{description}</p>
        </div>
      </section>

      <section className="section bg-background">
        <div className="container max-w-5xl">
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link href={`/blog/${post.slug}`} className="group block h-full rounded-3xl border border-border bg-white overflow-hidden hover:border-gold transition-colors">
                  <div className="relative aspect-[16/9] w-full">
                    <Image
                      src={post.image}
                      alt={post.imageAlt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 480px"
                      {...blurProps(post.image)}
                    />
                  </div>
                  <div className="p-6 space-y-3">
                    <p className="text-xs font-bold uppercase tracking-widest text-gold-dark">
                      {regionLabel[post.region]} · <time dateTime={post.datePublished}>{post.datePublished}</time>
                    </p>
                    <h2 className="font-heading text-xl font-bold text-charcoal group-hover:text-gold-dark transition-colors">{post.title}</h2>
                    <p className="text-sm text-concrete leading-relaxed">{post.excerpt}</p>
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold-dark">
                      Read the article <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section bg-linen">
        <div className="container max-w-4xl">
          <h2 className="font-heading text-3xl font-semibold text-charcoal mb-6">Buyer guides</h2>
          <ul className="space-y-3">
            {guides.map((guide) => (
              <li key={guide.slug}>
                <Link href={`/guides/${guide.slug}`} className="text-gold-dark font-semibold underline underline-offset-4">{guide.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
