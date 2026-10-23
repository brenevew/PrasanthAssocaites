import Link from "next/link";
import {
  ArrowRight, Building2, CheckCircle2, ChevronRight, Clock, Compass, FileText, MapPin, MessageCircle, Phone,
} from "lucide-react";
import { services, type Service } from "@/data/services";
import { serviceCategories, plannableSlugs, designSlugs } from "@/data/serviceCategories";
import { getServicePath } from "@/data/serviceRoutes";
import { servicePageContent } from "@/data/servicePageContent";
import type { ServiceFaq } from "@/data/serviceFaqs";
import type { Project } from "@/data/projects";
import { blogPosts } from "@/data/blog";
import { company } from "@/data/company";
import { SITE_URL } from "@/lib/seo";
import { serviceSchema } from "@/lib/serviceSeo";
import JsonLd from "@/components/seo/JsonLd";
import AnswerText, { plainText } from "@/components/ui/AnswerText";
import Button from "@/components/ui/Button";
import ContactForm from "@/components/ui/ContactForm";
import ProjectCard from "@/components/ui/ProjectCard";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { serviceIcons as iconMap } from "./serviceIcons";

const WHATSAPP_NUMBER = "919360337733";
const telHref = `tel:${company.phone.replace(/\s/g, "")}`;

interface ServiceLandingProps {
  service: Service;
  faqs: ServiceFaq[];
  /** Completed projects to show as evidence; the section is hidden when empty. */
  projects: Project[];
  projectsHeading?: string;
  /** Page heading and intro when they differ from the catalogue (e.g. a city page). */
  heading?: string;
  intro?: string;
  /** Replaces the default Service structured data. */
  schema?: Record<string, unknown>;
  /** Extra section rendered after "How it works". */
  children?: React.ReactNode;
}

/**
 * The service landing page layout shared by /services/<slug> and the turnkey
 * page: hero, what's included, how it works, completed work, questions,
 * further reading, related services and the quote form.
 */
export default function ServiceLanding({
  service, faqs, projects, projectsHeading, heading, intro, schema, children,
}: ServiceLandingProps) {
  const slug = service.slug;
  const category = serviceCategories.find((entry) => entry.slugs.includes(slug))!;
  const hasPlanner = plannableSlugs.includes(slug) || designSlugs.includes(slug);
  const url = `${SITE_URL}${getServicePath(slug)}`;
  const content = servicePageContent[slug];
  const Icon = iconMap[service.icon] ?? Building2;
  const relatedArticles = blogPosts.filter((post) => post.relatedServices.includes(slug)).slice(0, 3);
  const relatedServices = (content?.related ?? [])
    .map((relatedSlug) => services.find((entry) => entry.slug === relatedSlug))
    .filter((entry) => entry !== undefined);
  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hello Prasanth Associates, I would like to know more about ${service.title}.`
  )}`;
  // Sections alternate canvas and linen backgrounds; optional ones shift the pattern.
  const hasProjects = projects.length > 0;

  const glance = [
    { icon: MapPin, label: "Where we work", value: "Coimbatore and the Nilgiris" },
    { icon: Building2, label: "Offices", value: company.offices.map((office) => office.label).join(" and ") },
    { icon: FileText, label: "Quote", value: "In writing, before any work starts" },
    { icon: Clock, label: "Reply", value: "Usually within 24 hours" },
  ];

  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@graph": [
          schema ?? serviceSchema(service),
          // Mirrors the visible questions below exactly, so answer engines can quote them.
          ...(faqs.length
            ? [{
                "@type": "FAQPage",
                "@id": `${url}#faq`,
                mainEntity: faqs.map((faq) => ({
                  "@type": "Question",
                  name: faq.q,
                  acceptedAnswer: { "@type": "Answer", text: plainText(faq.a) },
                })),
              }]
            : []),
          {
            "@type": "BreadcrumbList",
            "@id": `${url}#breadcrumb`,
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
              { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` },
              { "@type": "ListItem", position: 3, name: heading ?? service.title, item: url },
            ],
          },
        ],
      }} />

      {/* Hero */}
      <section className="relative pt-32 md:pt-36 pb-16 md:pb-20 bg-gradient-to-b from-[#FAF8F5] to-[var(--canvas-bg)] text-charcoal overflow-hidden border-b border-border">
        <div className="absolute inset-0 blueprint-grid opacity-15" />
        <div className="liquid-glow" style={{ width: 520, height: 320, top: -80, right: -120, opacity: 0.3 }} />
        <div className="container relative z-10">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs text-concrete mb-8">
            <Link href="/" className="hover:text-gold-dark">Home</Link><ChevronRight size={12} aria-hidden="true" />
            <Link href="/services" className="hover:text-gold-dark">Services</Link><ChevronRight size={12} aria-hidden="true" />
            <span aria-current="page" className="text-charcoal">{heading ?? service.title}</span>
          </nav>
          <div className="grid lg:grid-cols-[1fr_360px] gap-10 lg:gap-14 items-start">
            <ScrollReveal>
              <span className="badge-gold mb-4 inline-flex">{category.label}</span>
              <h1 className="font-heading font-bold text-charcoal mb-5 leading-tight text-balance" style={{ fontSize: "var(--text-h1)" }}>{heading ?? service.title}</h1>
              <p className="text-base md:text-lg text-concrete leading-relaxed max-w-2xl mb-8">{intro ?? service.shortDescription}</p>
              <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3">
                <Button href="#quote" variant="primary">Request a Quote<ArrowRight size={14} /></Button>
                <Button href={telHref} variant="outline"><Phone size={14} />Call {company.phone}</Button>
                {hasPlanner && <Button href="/plan-home" variant="ghost"><Compass size={14} />Building Planner</Button>}
              </div>
            </ScrollReveal>
            <ScrollReveal delay={120}>
              <aside aria-label="At a glance" className="neu-glass rounded-3xl p-6 md:p-7">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl nm-inset text-gold-dark flex items-center justify-center flex-shrink-0">
                    <Icon size={24} strokeWidth={1.6} />
                  </div>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-concrete">At a glance</p>
                </div>
                <dl className="space-y-4">
                  {glance.map(({ icon: GlanceIcon, label, value }) => (
                    <div key={label} className="flex items-start gap-3">
                      <GlanceIcon size={16} className="text-gold-dark mt-0.5 flex-shrink-0" aria-hidden="true" />
                      <div>
                        <dt className="text-[11px] font-bold uppercase tracking-wider text-concrete-light">{label}</dt>
                        <dd className="text-sm font-semibold text-charcoal">{value}</dd>
                      </div>
                    </div>
                  ))}
                </dl>
              </aside>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Overview and what's included */}
      <section className="py-16 md:py-24 bg-[var(--canvas-bg)]">
        <div className="container">
          <div className="grid lg:grid-cols-[2fr_3fr] gap-10 lg:gap-16 items-start">
            <ScrollReveal>
              <span className="badge-gold mb-3 inline-flex">Overview</span>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-charcoal mb-5 leading-snug">What this service covers</h2>
              <p className="text-concrete leading-relaxed">{service.description}</p>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <h3 className="text-[11px] font-bold uppercase tracking-widest text-concrete mb-4">What&apos;s included</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 rounded-2xl bg-white border border-border px-4 py-3.5 shadow-2xs">
                    <CheckCircle2 size={18} className="text-gold-dark flex-shrink-0 mt-px" aria-hidden="true" />
                    <span className="text-sm text-charcoal leading-snug">{feature}</span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* How it works */}
      {content && (
        <section className="py-16 md:py-24 bg-linen border-y border-border">
          <div className="container">
            <ScrollReveal>
              <div className="max-w-2xl mb-10 md:mb-12">
                <span className="badge-gold mb-3 inline-flex">How it works</span>
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-charcoal leading-snug">From first call to finished work</h2>
              </div>
            </ScrollReveal>
            <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {content.steps.map((step, i) => (
                <ScrollReveal key={step.title} delay={i * 80}>
                  <li className="relative h-full rounded-3xl nm-raised-sm bg-[var(--canvas-bg)] p-6">
                    <span className="font-heading text-4xl font-bold text-gold/50 leading-none select-none" aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-heading text-lg font-bold text-charcoal mt-3 mb-2">{step.title}</h3>
                    <p className="text-sm text-concrete leading-relaxed">{step.body}</p>
                  </li>
                </ScrollReveal>
              ))}
            </ol>
          </div>
        </section>
      )}

      {children}

      {/* Completed work */}
      {hasProjects && (
        <section className="py-16 md:py-24 bg-[var(--canvas-bg)]">
          <div className="container">
            <ScrollReveal>
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
                <div>
                  <span className="badge-gold mb-3 inline-flex">Our work</span>
                  <h2 className="font-heading text-2xl md:text-3xl font-bold text-charcoal leading-snug">{projectsHeading ?? "Completed projects like this"}</h2>
                </div>
                <Link href="/projects" className="inline-flex items-center gap-2 text-sm font-semibold text-charcoal hover:text-gold-dark">
                  All projects<ArrowRight size={14} />
                </Link>
              </div>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => <ProjectCard key={project.slug} project={project} />)}
            </div>
          </div>
        </section>
      )}

      {/* Questions */}
      {faqs.length > 0 && (
        <section id="faq" className={`py-16 md:py-24 scroll-mt-32 ${hasProjects ? "bg-linen border-y border-border" : "bg-[var(--canvas-bg)]"}`}>
          <div className="container">
            <div className="grid lg:grid-cols-[2fr_3fr] gap-10 lg:gap-16 items-start">
              <ScrollReveal>
                <span className="badge-gold mb-3 inline-flex">Questions</span>
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-charcoal mb-4 leading-snug">Common questions about {service.title.toLowerCase()}</h2>
                <p className="text-concrete leading-relaxed mb-6">If your question is not here, call or message us. We are happy to talk it through before you decide anything.</p>
                <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3">
                  <Button href={telHref} variant="outline" size="sm"><Phone size={13} />{company.phone}</Button>
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-white px-5 py-2 text-xs font-semibold tracking-wider text-charcoal shadow-xs hover:bg-linen hover:border-charcoal/40 transition-all"
                  >
                    <MessageCircle size={13} />WhatsApp us
                  </a>
                </div>
              </ScrollReveal>
              <div className="space-y-3">
                {faqs.map((faq, i) => (
                  <details key={faq.q} open={i === 0} className="group rounded-2xl bg-white border border-border open:border-gold/70 open:shadow-sm transition-colors">
                    <summary className="cursor-pointer p-5 font-heading font-bold text-charcoal text-base flex items-center justify-between gap-4 list-none [&::-webkit-details-marker]:hidden">
                      <h3>{faq.q}</h3>
                      <ChevronRight size={16} aria-hidden="true" className="text-gold-dark flex-shrink-0 transition-transform group-open:rotate-90" />
                    </summary>
                    <p className="text-concrete text-sm leading-relaxed px-5 pb-5 -mt-1"><AnswerText text={faq.a} /></p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Reading and related services */}
      {(relatedArticles.length > 0 || relatedServices.length > 0) && (
        <section className={`py-16 md:py-24 ${hasProjects ? "bg-[var(--canvas-bg)]" : "bg-linen border-y border-border"}`}>
          <div className="container space-y-14">
            {relatedArticles.length > 0 && (
              <div>
                <h2 className="font-heading text-xl md:text-2xl font-bold text-charcoal mb-6">Further reading</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {relatedArticles.map((post) => (
                    <Link key={post.slug} href={`/blog/${post.slug}`} className="group rounded-2xl bg-white border border-border p-5 hover:border-gold/70 transition-colors">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gold-dark mb-2">{post.category}</p>
                      <h3 className="font-heading font-bold text-charcoal leading-snug mb-3">{post.title}</h3>
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-concrete group-hover:text-gold-dark">Read the article<ArrowRight size={12} /></span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
            {relatedServices.length > 0 && (
              <div>
                <h2 className="font-heading text-xl md:text-2xl font-bold text-charcoal mb-6">Related services</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {relatedServices.map((related) => {
                    const RelatedIcon = iconMap[related.icon] ?? Building2;
                    return (
                      <Link key={related.slug} href={getServicePath(related.slug)} className="group flex flex-col rounded-2xl neu-glass p-5 hover:-translate-y-1 transition-transform">
                        <div className="w-11 h-11 rounded-xl nm-inset text-charcoal group-hover:text-gold-dark flex items-center justify-center mb-4">
                          <RelatedIcon size={18} strokeWidth={1.7} />
                        </div>
                        <h3 className="font-heading font-bold text-charcoal leading-snug mb-2">{related.title}</h3>
                        <p className="text-sm text-concrete leading-relaxed mb-4 flex-grow">{related.shortDescription}</p>
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-charcoal group-hover:text-gold-dark">View service<ArrowRight size={12} /></span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Quote */}
      <section id="quote" className="relative py-16 md:py-24 bg-gradient-to-br from-[#FAF8F5] via-[#F7F5F0] to-[#EFECE6] border-t border-border scroll-mt-28 overflow-hidden">
        <div className="absolute inset-0 blueprint-grid opacity-10" />
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-[2fr_3fr] gap-10 lg:gap-16 items-start">
            <ScrollReveal>
              <span className="badge-gold mb-3 inline-flex">Request a quote</span>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-charcoal mb-4 leading-snug">Tell us about your {category.id === "realestate" ? "property" : "project"}</h2>
              <p className="text-concrete leading-relaxed mb-6">Share a few details and we will get back to you.</p>
              <ol className="space-y-4 mb-8">
                {[
                  "We reply, usually within 24 hours.",
                  "We talk through what you need and visit the site if it helps.",
                  "You receive a written quote before any work starts.",
                ].map((line, i) => (
                  <li key={line} className="flex items-start gap-3">
                    <span className="w-7 h-7 rounded-full nm-gold-raised text-charcoal text-xs font-bold flex items-center justify-center flex-shrink-0">{i + 1}</span>
                    <span className="text-sm text-charcoal leading-relaxed pt-1">{line}</span>
                  </li>
                ))}
              </ol>
              <p className="text-sm text-concrete">
                Prefer to talk? Call <a href={telHref} className="font-semibold text-charcoal hover:text-gold-dark">{company.phone}</a> or{" "}
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="font-semibold text-charcoal hover:text-gold-dark">message us on WhatsApp</a>.
              </p>
              <p className="text-sm text-concrete mt-3">
                Want to choose options first? Use the{" "}
                <Link href={`/request-quote?service=${slug}`} className="font-semibold text-charcoal hover:text-gold-dark underline underline-offset-4">detailed quote form</Link>.
              </p>
            </ScrollReveal>
            <ContactForm isEstimate serviceSlug={slug} serviceTitle={service.title} />
          </div>
        </div>
      </section>
    </>
  );
}
