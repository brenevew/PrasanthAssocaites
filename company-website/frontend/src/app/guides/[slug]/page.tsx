import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { guides } from "@/data/guides";
import { company } from "@/data/company";
import { ORG_ID, SITE_URL, pageOpenGraph } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import Button from "@/components/ui/Button";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return guides.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = guides.find((entry) => entry.slug === slug);
  if (!guide) notFound();
  return {
    title: guide.metadataTitle,
    description: guide.description,
    keywords: guide.keywords,
    alternates: { canonical: `${SITE_URL}/guides/${guide.slug}` },
    openGraph: {
      ...pageOpenGraph(`/guides/${guide.slug}`, `${guide.title} | Prasanth Associates`, guide.description),
      type: "article",
    },
  };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = guides.find((entry) => entry.slug === slug);
  if (!guide) notFound();
  const url = `${SITE_URL}/guides/${guide.slug}`;
  const isNilgiris = guide.region === "nilgiris";
  const office = company.offices.find((entry) => entry.label === (isNilgiris ? "Gudalur" : "Coimbatore"))!;

  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Article",
            "@id": `${url}#article`,
            headline: guide.title,
            description: guide.description,
            url,
            datePublished: guide.datePublished,
            dateModified: guide.datePublished,
            inLanguage: "en-IN",
            author: { "@id": ORG_ID },
            publisher: { "@id": ORG_ID },
            mainEntityOfPage: url,
          },
          {
            "@type": "FAQPage",
            "@id": `${url}#faq`,
            mainEntity: guide.questions.map(({ question, answer }) => ({
              "@type": "Question",
              name: question,
              acceptedAnswer: { "@type": "Answer", text: answer },
            })),
          },
          {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
              { "@type": "ListItem", position: 2, name: guide.title, item: url },
            ],
          },
        ],
      }} />

      <section className="bg-linen border-b border-border py-16 md:py-24">
        <div className="container max-w-4xl">
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-concrete">
            <Link href="/" className="underline">Home</Link>
            {" / "}<span aria-current="page">Guide</span>
          </nav>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-charcoal mb-6">{guide.title}</h1>
          <p className="text-lg text-concrete leading-relaxed">{guide.intro}</p>
        </div>
      </section>

      <section className="section bg-background">
        <div className="container max-w-4xl space-y-12">
          {guide.sections.map((section) => (
            <div key={section.title}>
              <h2 className="font-heading text-3xl font-semibold text-charcoal mb-4">{section.title}</h2>
              <div className="space-y-4">
                {section.paragraphs.map((text) => (
                  <p key={text} className="text-concrete leading-relaxed">{text}</p>
                ))}
              </div>
              {section.checks && (
                <ul className="mt-4 space-y-2 list-disc pl-6 text-charcoal">
                  {section.checks.map((check) => <li key={check}>{check}</li>)}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="section bg-linen">
        <div className="container max-w-4xl">
          <h2 className="font-heading text-3xl font-semibold text-charcoal mb-6">{guide.ourAnswer.title}</h2>
          <ul className="space-y-3 list-disc pl-6 text-charcoal">
            {guide.ourAnswer.points.map((point) => <li key={point}>{point}</li>)}
          </ul>
          <address className="not-italic text-concrete leading-relaxed mt-8">
            {company.name}, {office.label} {office.badge}<br />
            {office.street}, {office.city}, {office.state} {office.pincode}<br />
            <a href={`tel:${office.phone.replace(/\s/g, "")}`} className="text-gold-dark underline">{office.phone}</a>
          </address>
          <div className="flex flex-wrap gap-4 mt-8">
            <Button href="/request-quote">Request a quote</Button>
            <Button href="/contact" variant="secondary">Contact our team</Button>
          </div>
        </div>
      </section>

      <section className="section bg-background">
        <div className="container max-w-4xl">
          <h2 className="font-heading text-3xl font-semibold text-charcoal mb-8">Common questions</h2>
          <div className="space-y-8">
            {guide.questions.map(({ question, answer }) => (
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
          <h2 className="font-heading text-3xl font-semibold text-charcoal mb-6">Related pages</h2>
          <ul className="grid gap-4 sm:grid-cols-2">
            {guide.related.map((link) => (
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
