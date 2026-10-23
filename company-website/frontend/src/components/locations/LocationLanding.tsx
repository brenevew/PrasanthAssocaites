import Link from "next/link";
import {
  ArrowRight, Building2, ChevronRight, Clock, ExternalLink, Mail, MapPin, MessageCircle, Navigation, Phone, Star,
} from "lucide-react";
import type { LocationPage } from "@/data/locationPages";
import { services } from "@/data/services";
import { getServicePath } from "@/data/serviceRoutes";
import { projects, projectAreas, hasDetailsPage } from "@/data/projects";
import { company } from "@/data/company";
import { SITE_URL } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import AnswerText, { plainText } from "@/components/ui/AnswerText";
import Button from "@/components/ui/Button";
import ContactForm from "@/components/ui/ContactForm";
import ProjectCard from "@/components/ui/ProjectCard";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { serviceIcons } from "@/components/services/serviceIcons";

const WHATSAPP_NUMBER = "919360337733";
const HOURS = "Monday to Saturday, 9 am to 6 pm";

interface LocationLandingProps {
  page: LocationPage;
  /** The office or business entity for this page (LocalBusiness / GeneralContractor). */
  entitySchema: Record<string, unknown>;
  /** Breadcrumb parent between Home and this page. */
  parent: { name: string; href: string };
  /** Further structured data nodes for this page (e.g. its WebPage). */
  extraSchema?: Record<string, unknown>[];
}

/**
 * Layout shared by the office location pages: hero with the office card, local
 * conditions, towns, completed projects, services, questions, map and enquiry.
 */
export default function LocationLanding({ page, entitySchema, parent, extraSchema = [] }: LocationLandingProps) {
  const url = `${SITE_URL}/locations/${page.slug}`;
  const office = company.offices.find((entry) => entry.label === page.office) ?? company.offices[0];
  const telHref = `tel:${office.phone.replace(/\s/g, "")}`;
  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(page.whatsappMessage)}`;
  const town = page.office === "Gudalur" ? "Gudalur" : office.city;
  const address = `${office.street}, ${town} ${office.pincode}`;
  // Case studies first, then photo-only projects.
  const areaProjects = projects
    .filter((project) => projectAreas(project).includes(page.area))
    .sort((a, b) => Number(hasDetailsPage(b)) - Number(hasDetailsPage(a)))
    .slice(0, 6);
  const pageServices = page.services
    .map((slug) => services.find((service) => service.slug === slug))
    .filter((service) => service !== undefined);

  // Sections alternate canvas and linen backgrounds in the order they render.
  let sectionIndex = 0;
  const band = () => (sectionIndex++ % 2 === 0 ? "bg-[var(--canvas-bg)]" : "bg-linen border-y border-border");

  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@graph": [
          entitySchema,
          ...extraSchema,
          // Mirrors the visible questions below exactly.
          {
            "@type": "FAQPage",
            "@id": `${url}#faq`,
            mainEntity: page.faqs.map((faq) => ({
              "@type": "Question",
              name: faq.q,
              acceptedAnswer: { "@type": "Answer", text: plainText(faq.a) },
            })),
          },
          {
            "@type": "BreadcrumbList",
            "@id": `${url}#breadcrumb`,
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
              { "@type": "ListItem", position: 2, name: parent.name, item: `${SITE_URL}${parent.href}` },
              { "@type": "ListItem", position: 3, name: page.breadcrumb, item: url },
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
            <Link href={parent.href} className="hover:text-gold-dark">{parent.name}</Link><ChevronRight size={12} aria-hidden="true" />
            <span aria-current="page" className="text-charcoal">{page.breadcrumb}</span>
          </nav>
          <div className="grid lg:grid-cols-[1fr_380px] gap-10 lg:gap-14 items-start">
            <ScrollReveal>
              <span className="badge-gold mb-4 inline-flex">{page.badge}</span>
              <h1 className="font-heading font-bold text-charcoal mb-5 leading-tight text-balance" style={{ fontSize: "var(--text-h1)" }}>{page.heading}</h1>
              <p className="text-base md:text-lg text-concrete leading-relaxed max-w-2xl mb-8">{page.intro}</p>
              <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3">
                <Button href="#enquiry" variant="primary">Request a Quote<ArrowRight size={14} /></Button>
                <Button href={telHref} variant="outline"><Phone size={14} />Call {office.phone}</Button>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 text-sm font-semibold tracking-wide text-charcoal hover:bg-linen/80 transition-all"
                >
                  <MessageCircle size={14} />WhatsApp us
                </a>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={120}>
              <aside aria-label={`${office.label} office`} className="neu-glass rounded-3xl p-6 md:p-7">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-12 h-12 rounded-2xl nm-inset text-gold-dark flex items-center justify-center flex-shrink-0">
                    <Building2 size={22} strokeWidth={1.6} />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-widest text-concrete">{office.badge}</p>
                    <p className="font-heading text-lg font-bold text-charcoal leading-snug">{company.name}, {office.label}</p>
                  </div>
                </div>
                <ul className="space-y-3.5 text-sm text-charcoal">
                  <li className="flex items-start gap-3">
                    <MapPin size={16} className="text-gold-dark mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <span className="leading-relaxed">{address}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Phone size={16} className="text-gold-dark flex-shrink-0" aria-hidden="true" />
                    <a href={telHref} className="font-semibold hover:text-gold-dark">{office.phone}</a>
                  </li>
                  <li className="flex items-center gap-3">
                    <Mail size={16} className="text-gold-dark flex-shrink-0" aria-hidden="true" />
                    <a href={`mailto:${office.email}`} className="hover:text-gold-dark break-all">{office.email}</a>
                  </li>
                  <li className="flex items-center gap-3">
                    <Clock size={16} className="text-gold-dark flex-shrink-0" aria-hidden="true" />
                    <span>{HOURS}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Star size={16} className="text-gold-dark flex-shrink-0" aria-hidden="true" />
                    <span>{page.googleRating.rating}★ from {page.googleRating.reviews} Google reviews</span>
                  </li>
                </ul>
                <a
                  href={office.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 flex items-center justify-center gap-2 rounded-full border border-border bg-white px-5 py-2.5 text-xs font-semibold tracking-wider text-charcoal shadow-xs hover:bg-linen hover:border-charcoal/40 transition-all"
                >
                  <Navigation size={13} />Get directions<ExternalLink size={11} />
                </a>
              </aside>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Local conditions */}
      <section className={`py-16 md:py-24 ${band()}`}>
        <div className="container">
          <ScrollReveal>
            <div className="max-w-2xl mb-10 md:mb-12">
              <span className="badge-gold mb-3 inline-flex">Local knowledge</span>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-charcoal leading-snug">{page.conditionsHeading}</h2>
            </div>
          </ScrollReveal>
          <ol className={`grid grid-cols-1 sm:grid-cols-2 gap-5 ${page.conditions.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
            {page.conditions.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 80}>
                <li className="h-full rounded-3xl nm-raised-sm bg-[var(--canvas-bg)] p-6">
                  <span className="font-heading text-4xl font-bold text-gold/50 leading-none select-none" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-heading text-lg font-bold text-charcoal mt-3 mb-2">{item.title}</h3>
                  <p className="text-sm text-concrete leading-relaxed">{item.body}</p>
                </li>
              </ScrollReveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Towns */}
      {page.places && (
        <section className={`py-16 md:py-24 ${band()}`}>
          <div className="container">
            <ScrollReveal>
              <div className="max-w-2xl mb-10">
                <span className="badge-gold mb-3 inline-flex">Where we work</span>
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-charcoal leading-snug">Towns we have built in</h2>
              </div>
            </ScrollReveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {page.places.map((place) => {
                const body = (
                  <>
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin size={16} className="text-gold-dark" aria-hidden="true" />
                      <h3 className="font-heading text-lg font-bold text-charcoal">{place.name}</h3>
                    </div>
                    <p className="text-sm text-concrete leading-relaxed">{place.note}</p>
                    {place.href && (
                      <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-charcoal group-hover:text-gold-dark">Branch office page<ArrowRight size={12} /></span>
                    )}
                  </>
                );
                const className = "group h-full flex flex-col rounded-2xl bg-white border border-border p-5 shadow-2xs";
                return place.href ? (
                  <Link key={place.name} href={place.href} className={`${className} hover:border-gold/70 transition-colors`}>{body}</Link>
                ) : (
                  <div key={place.name} className={className}>{body}</div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Completed work */}
      {areaProjects.length > 0 && (
        <section className={`py-16 md:py-24 ${band()}`}>
          <div className="container">
            <ScrollReveal>
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
                <div>
                  <span className="badge-gold mb-3 inline-flex">Our work</span>
                  <h2 className="font-heading text-2xl md:text-3xl font-bold text-charcoal leading-snug">{page.projectsHeading}</h2>
                </div>
                <Link href="/projects" className="inline-flex items-center gap-2 text-sm font-semibold text-charcoal hover:text-gold-dark">
                  All projects<ArrowRight size={14} />
                </Link>
              </div>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {areaProjects.map((project) => <ProjectCard key={project.slug} project={project} />)}
            </div>
          </div>
        </section>
      )}

      {/* Services */}
      <section className={`py-16 md:py-24 ${band()}`}>
        <div className="container">
          <ScrollReveal>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
              <div className="max-w-2xl">
                <span className="badge-gold mb-3 inline-flex">Services</span>
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-charcoal leading-snug mb-3">{page.servicesHeading ?? "What we do here"}</h2>
                <p className="text-concrete leading-relaxed">{page.servicesIntro ?? "All our services are available in Coimbatore and the Nilgiris. These are the ones people here ask for most."}</p>
              </div>
              <Link href="/services" className="inline-flex items-center gap-2 text-sm font-semibold text-charcoal hover:text-gold-dark flex-shrink-0">
                All services<ArrowRight size={14} />
              </Link>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {pageServices.map((service) => {
              const Icon = serviceIcons[service.icon] ?? Building2;
              return (
                <Link key={service.slug} href={getServicePath(service.slug)} className="group flex flex-col rounded-2xl neu-glass p-5 hover:-translate-y-1 transition-transform">
                  <div className="w-11 h-11 rounded-xl nm-inset text-charcoal group-hover:text-gold-dark flex items-center justify-center mb-4">
                    <Icon size={18} strokeWidth={1.7} />
                  </div>
                  <h3 className="font-heading font-bold text-charcoal leading-snug mb-2">{service.title}</h3>
                  <p className="text-sm text-concrete leading-relaxed mb-4 flex-grow">{service.shortDescription}</p>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-charcoal group-hover:text-gold-dark">View service<ArrowRight size={12} /></span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Questions */}
      <section id="faq" className={`py-16 md:py-24 scroll-mt-32 ${band()}`}>
        <div className="container">
          <div className="grid lg:grid-cols-[2fr_3fr] gap-10 lg:gap-16 items-start">
            <ScrollReveal>
              <span className="badge-gold mb-3 inline-flex">Questions</span>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-charcoal mb-4 leading-snug">Common questions about building in {page.breadcrumb.replace("&", "and")}</h2>
              <p className="text-concrete leading-relaxed">If your question is not here, call or message us. We are happy to talk it through before you decide anything.</p>
            </ScrollReveal>
            <div className="space-y-3">
              {page.faqs.map((faq, i) => (
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

      {/* Visit */}
      <section className={`py-16 md:py-24 ${band()}`}>
        <div className="container">
          <div className="grid lg:grid-cols-[2fr_3fr] gap-10 lg:gap-16 items-stretch">
            <ScrollReveal>
              <span className="badge-gold mb-3 inline-flex">Visit us</span>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-charcoal mb-4 leading-snug">Our {office.label} office</h2>
              <p className="text-concrete leading-relaxed mb-2">{address}</p>
              <p className="text-concrete leading-relaxed mb-6">{HOURS}. Call ahead and we will make sure an engineer is free to meet you.</p>
              <Link href={page.other.href} className="group block rounded-2xl bg-white border border-border p-5 hover:border-gold/70 transition-colors">
                <p className="font-heading font-bold text-charcoal mb-1">{page.other.title}</p>
                <p className="text-sm text-concrete leading-relaxed mb-3">{page.other.body}</p>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-charcoal group-hover:text-gold-dark">Read more<ArrowRight size={12} /></span>
              </Link>
            </ScrollReveal>
            <div className="relative min-h-[320px] lg:min-h-[400px] rounded-3xl overflow-hidden border border-border shadow-sm bg-linen">
              <iframe
                src={office.mapEmbedUrl}
                className="absolute inset-0 w-full h-full"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Map of the ${company.name} ${office.label} office`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Enquiry */}
      <section id="enquiry" className="relative py-16 md:py-24 bg-gradient-to-br from-[#FAF8F5] via-[#F7F5F0] to-[#EFECE6] border-t border-border scroll-mt-28 overflow-hidden">
        <div className="absolute inset-0 blueprint-grid opacity-10" />
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-[2fr_3fr] gap-10 lg:gap-16 items-start">
            <ScrollReveal>
              <span className="badge-gold mb-3 inline-flex">Request a quote</span>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-charcoal mb-4 leading-snug">Tell us about your project</h2>
              <p className="text-concrete leading-relaxed mb-6">Share your plot location and what you want to build, and we will get back to you.</p>
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
                Prefer to talk? Call <a href={telHref} className="font-semibold text-charcoal hover:text-gold-dark">{office.phone}</a> or{" "}
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="font-semibold text-charcoal hover:text-gold-dark">message us on WhatsApp</a>.
              </p>
            </ScrollReveal>
            <ContactForm isEstimate serviceSlug={page.formService} />
          </div>
        </div>
      </section>

      {/* Location-specific guidance at the bottom, after the enquiry form. */}
      {page.overview && (
        <section className={`py-16 md:py-24 ${band()} border-t border-border`}>
          <div className="container max-w-5xl space-y-12 md:space-y-16">
            {page.overview.map((section) => (
              <ScrollReveal key={section.heading}>
                <div>
                  <h2 className="font-heading text-2xl md:text-3xl font-bold text-charcoal leading-snug mb-5">{section.heading}</h2>
                  <div className="space-y-4 text-concrete leading-relaxed">
                    {section.paragraphs.map((paragraph) => <p key={paragraph}><AnswerText text={paragraph} /></p>)}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
