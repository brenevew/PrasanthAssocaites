import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight, BedDouble, Building2, Factory, KeyRound, CheckCircle2, ChevronRight, Clock, CloudRain, DraftingCompass, Hammer, House, Mail,
  MapPin, MessageCircle, Navigation, Phone, Plus, ReceiptText, Hotel, School, Sofa, Star, Store, Trees, Users,
  type LucideIcon,
} from "lucide-react";
import type { LocationPage } from "@/data/locationPages";
import type { LocationShowcase as ShowcaseData, ShowcaseIcon } from "@/data/locationShowcase";
import { getServicePath } from "@/data/serviceRoutes";
import { projects, projectAreas, hasDetailsPage } from "@/data/projects";
import { blogPosts } from "@/data/blog";
import { blurProps } from "@/data/imageBlur";
import { company } from "@/data/company";
import { SITE_URL } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import AnswerText, { plainText } from "@/components/ui/AnswerText";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import Button from "@/components/ui/Button";
import ContactForm from "@/components/ui/ContactForm";
import ProjectCard from "@/components/ui/ProjectCard";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";

const WHATSAPP_NUMBER = "919360337733";
const HOURS = "Monday to Saturday, 9 am to 6 pm";
// Button never wraps by default; long page-supplied labels must, on phones.
const WRAP = "whitespace-normal! text-center max-w-full";

const icons: Record<ShowcaseIcon, LucideIcon> = {
  house: House,
  villa: Trees,
  school: School,
  store: Store,
  renovation: Hammer,
  plans: DraftingCompass,
  interiors: Sofa,
  engineering: Building2,
  boq: ReceiptText,
  team: Users,
  weather: CloudRain,
  hospitality: BedDouble,
  apartment: Hotel,
  factory: Factory,
  turnkey: KeyRound,
};

interface LocationShowcaseProps {
  page: LocationPage;
  showcase: ShowcaseData;
  /** The office or business entity for this page (LocalBusiness / GeneralContractor). */
  entitySchema: Record<string, unknown>;
  /** Breadcrumb parent between Home and this page. */
  parent: { name: string; href: string };
  /** Further structured data nodes for this page (e.g. its WebPage). */
  extraSchema?: Record<string, unknown>[];
}

/** Small gold pill above a heading, as on the home page. */
function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="badge-gold mb-6 inline-flex">
      <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block" />
      {children}
    </span>
  );
}

/**
 * Layout for the location pages (Coimbatore, Ooty and Gudalur), built from the
 * home page's sections: photo hero, counter strip, story with a rating badge,
 * neu-glass cards, alternating canvas and linen bands, and the numbered FAQ.
 *
 * The copy, FAQs and structured data come from data/locationPages.ts; the extra
 * sections (offerings, story, counters, guides) from data/locationShowcase.ts.
 */
export default function LocationShowcase({ page, showcase, entitySchema, parent, extraSchema = [] }: LocationShowcaseProps) {
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
  // Project facts (location, type, area, dates) come from the project records.
  const caseStudies = (page.caseStudies?.items ?? []).flatMap((item) => {
    const project = projects.find((entry) => entry.slug === item.slug && hasDetailsPage(entry));
    return project ? [{ item, project }] : [];
  });
  const guides = showcase.guides.slugs.flatMap((slug) => blogPosts.filter((post) => post.slug === slug));
  const stats = [
    { value: page.googleRating.rating, suffix: "★", label: "Google Rating" },
    { value: String(page.googleRating.reviews), suffix: "", label: "Google Reviews" },
    ...showcase.stats.map((stat) => {
      const match = stat.value.match(/^([\d.]+)(.*)$/);
      return { value: match?.[1] ?? stat.value, suffix: match?.[2] ?? "", label: stat.label };
    }),
  ];

  // After the hero, counters and story, sections alternate linen and canvas
  // in the order they render, as on the home page.
  let sectionIndex = 0;
  const band = () =>
    sectionIndex++ % 2 === 0 ? "bg-linen border-y border-border" : "bg-[var(--canvas-bg)]";

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

      {/* ── Hero ───────────────────────────────────────────────────── */}
      <section className="relative min-h-[95vh] flex items-center mt-[-104px] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={showcase.heroImage.src}
            alt={showcase.heroImage.alt}
            fill
            className="object-cover"
            loading="eager"
            fetchPriority="high"
            sizes="100vw"
            {...blurProps(showcase.heroImage.src)}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[rgba(247,245,240,0.96)] via-[rgba(247,245,240,0.88)] to-[rgba(247,245,240,0.45)]" />
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[var(--canvas-bg)] to-transparent" />
        </div>
        <div className="liquid-glow" style={{ width: 600, height: 600, top: "15%", left: "-10%", opacity: 0.4 }} />
        <div className="liquid-glow" style={{ width: 450, height: 450, bottom: "5%", right: "10%", opacity: 0.25 }} />

        <div className="container relative z-10 pt-36 pb-16">
          <div className="max-w-2xl">
            <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs text-concrete mb-8">
              <Link href="/" className="hover:text-gold-dark">Home</Link><ChevronRight size={12} aria-hidden="true" />
              <Link href={parent.href} className="hover:text-gold-dark">{parent.name}</Link><ChevronRight size={12} aria-hidden="true" />
              <span aria-current="page" className="text-charcoal">{page.breadcrumb}</span>
            </nav>
            <ScrollReveal>
              <Badge>{page.badge}</Badge>
              <h1 className="font-heading font-bold text-charcoal leading-[1.08] mb-7 text-balance" style={{ fontSize: "var(--text-h1)" }}>
                {page.heading}
              </h1>
              <p className="font-heading text-2xl md:text-3xl text-gold-dark font-semibold -mt-3 mb-7">{showcase.heroTagline}</p>
            </ScrollReveal>
            <ScrollReveal delay={160}>
              <p className="text-lg text-concrete mb-6 leading-relaxed">{page.intro}</p>
              {page.heroNote && (
                <p className="text-sm font-semibold text-charcoal leading-relaxed mb-7 border-l-2 border-gold pl-4">{page.heroNote}</p>
              )}
            </ScrollReveal>

            {/* Office chip and rating, in the style of the home page office chips */}
            <ScrollReveal delay={200} className="mb-8 flex flex-wrap items-center gap-2.5">
              <a
                href={office.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full border border-border bg-white/70 py-1.5 pl-2 pr-3.5 shadow-2xs backdrop-blur-md transition-all hover:-translate-y-0.5 hover:border-gold hover:bg-white"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold/15 text-gold-dark transition-colors group-hover:bg-charcoal group-hover:text-white">
                  <MapPin size={13} strokeWidth={2.25} />
                </span>
                <span className="text-sm font-semibold text-charcoal">{office.label}</span>
                <span className="hidden sm:inline text-xs text-concrete">{office.badge}</span>
              </a>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-white/70 py-1.5 pl-2 pr-3.5 shadow-2xs backdrop-blur-md">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold/15 text-gold-dark">
                  <Star size={13} strokeWidth={2.25} />
                </span>
                <span className="text-sm font-semibold text-charcoal">{page.googleRating.rating}★</span>
                <span className="text-xs text-concrete">{page.googleRating.reviews} Google reviews</span>
              </span>
            </ScrollReveal>

            <ScrollReveal delay={240} className="flex flex-col sm:flex-row sm:flex-wrap gap-3">
              <Button href="#enquiry" variant="primary" size="lg" className={WRAP}>{page.quoteLabel ?? "Request a Quote"}<ArrowRight size={16} /></Button>
              <Button href={telHref} variant="outline" size="lg"><Phone size={15} />Call {office.phone}</Button>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-sm font-semibold tracking-wide text-charcoal hover:bg-white/70 transition-all"
              >
                <MessageCircle size={15} className="text-[#25D366]" />{page.whatsappLabel ?? "WhatsApp us"}
              </a>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Counters ───────────────────────────────────────────────── */}
      <section aria-label="Prasanth Associates in figures" className="py-12 bg-[var(--canvas-bg)] relative overflow-hidden">
        <div className="liquid-glow" style={{ width: 450, height: 350, top: "-30%", left: "15%", opacity: 0.5 }} />
        <div className="liquid-glow" style={{ width: 400, height: 300, top: "-20%", right: "10%", opacity: 0.35 }} />
        <div className="container relative z-10">
          <ScrollReveal>
            <div className="neu-glass-panel rounded-3xl p-8 md:p-12">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6 md:divide-x divide-border/60">
                {stats.map((stat, index) => (
                  <div key={stat.label} className="px-4 text-center first:pl-0 last:pr-0">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} label={stat.label} duration={2500 + index * 200} />
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Story ──────────────────────────────────────────────────── */}
      <section className="section bg-[var(--canvas-bg)] relative overflow-hidden">
        <div className="liquid-glow" style={{ width: 500, height: 500, top: "20%", right: "-5%", opacity: 0.3 }} />
        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-24 items-center">
            <ScrollReveal className="relative order-2 lg:order-1">
              {/* Landscape frame: the hill-station building photos are wide shots. */}
              <div className="relative aspect-[4/3] w-full max-w-xl mx-auto lg:max-w-none">
                <div className="absolute inset-0 nm-dark-raised translate-x-4 translate-y-4 rounded-3xl z-0" />
                <Image
                  src={showcase.aboutImage.src}
                  alt={showcase.aboutImage.alt}
                  fill
                  className="object-cover z-10 rounded-3xl border border-white/60 shadow-xl"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  {...blurProps(showcase.aboutImage.src)}
                />
                <div className="absolute -bottom-5 -right-5 z-20 neu-glass rounded-2xl px-5 py-4">
                  <p className="text-xs text-concrete font-medium mb-0.5">Google rating</p>
                  <p className="text-2xl font-heading font-bold text-charcoal">{page.googleRating.rating} ★</p>
                  {page.reviewsLink ? (
                    <a href={office.mapLink} target="_blank" rel="noopener noreferrer" className="text-[10px] text-concrete-light hover:text-gold-dark underline-offset-2 hover:underline">
                      From {page.googleRating.reviews} Google reviews
                    </a>
                  ) : (
                    <p className="text-[10px] text-concrete-light">From {page.googleRating.reviews} Google reviews</p>
                  )}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={150} className="order-1 lg:order-2">
              <Badge>{showcase.about.eyebrow}</Badge>
              <h2 className="font-heading font-bold text-charcoal mb-7 leading-tight text-balance" style={{ fontSize: "var(--text-h2)" }}>
                {showcase.about.heading}
              </h2>
              <div className="space-y-5 text-concrete leading-relaxed mb-8">
                {showcase.about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
              <ul className="space-y-3 mb-10">
                {showcase.about.values.map((value) => (
                  <li key={value.label} className="flex items-center gap-3 text-charcoal font-semibold text-sm">
                    <span className="w-6 h-6 rounded-full nm-inset-sm flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 size={13} className="text-gold-dark" />
                    </span>
                    {value.label}
                  </li>
                ))}
              </ul>
              <Button href="/about" variant="primary" size="md">Discover Our Story<ArrowRight size={16} /></Button>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── What we build (new) ────────────────────────────────────── */}
      <section className={`section relative overflow-hidden ${band()}`}>
        <div className="absolute inset-0 blueprint-grid opacity-10" />
        <div className="liquid-glow" style={{ width: 650, height: 450, top: "10%", left: "-5%", opacity: 0.25 }} />
        <div className="container relative z-10">
          <ScrollReveal>
            <SectionHeading badge="What we build" title={showcase.offerings.heading} subtitle={showcase.offerings.intro} />
          </ScrollReveal>
          <div className={`grid grid-cols-1 sm:grid-cols-2 gap-6 ${showcase.offerings.items.length % 4 === 0 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
            {showcase.offerings.items.map((item, i) => {
              const Icon = icons[item.icon];
              return (
                <ScrollReveal key={item.title} delay={(i % 4) * 100}>
                  <Link href={getServicePath(item.slug)} className="group h-full flex flex-col gap-4 neu-glass rounded-3xl p-6.5 hover:-translate-y-1 transition-transform">
                    <div className="w-12 h-12 rounded-2xl nm-inset flex items-center justify-center text-gold-dark flex-shrink-0">
                      <Icon size={20} strokeWidth={1.7} aria-hidden="true" />
                    </div>
                    <h3 className="font-heading text-xl font-bold text-charcoal leading-snug">{item.title}</h3>
                    <p className="text-concrete text-sm leading-relaxed flex-1">{item.body}</p>
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-gold-dark group-hover:text-charcoal">
                      View service<ArrowRight size={12} />
                    </span>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Local conditions (home "How we work" layout) ───────────── */}
      <section className={`section relative overflow-hidden ${band()}`}>
        <div className="liquid-glow" style={{ width: 450, height: 450, bottom: "10%", right: "10%", opacity: 0.3 }} />
        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-14 lg:gap-12">
            <div className="lg:col-span-2">
              <ScrollReveal>
                <div className="lg:sticky top-32 space-y-6">
                  <Badge>Local knowledge</Badge>
                  <h2 className="font-heading font-bold text-charcoal leading-tight text-balance" style={{ fontSize: "var(--text-h2)" }}>
                    {page.conditionsHeading}
                  </h2>
                  <div className="gold-line" />
                  {page.conditionsCta && (
                    <Button href="#enquiry" variant="gold" size="md" className={WRAP}>{page.conditionsCta}<ArrowRight size={14} /></Button>
                  )}
                </div>
              </ScrollReveal>
            </div>
            <ol className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {page.conditions.map((item, i) => (
                <ScrollReveal key={item.title} delay={(i % 2) * 80} className={page.conditions.length % 2 === 1 && i === page.conditions.length - 1 ? "sm:col-span-2" : ""}>
                  <li className="neu-glass p-6.5 rounded-3xl h-full flex flex-col gap-4">
                    <div className="w-11 h-11 rounded-2xl nm-inset flex items-center justify-center flex-shrink-0">
                      <span className="text-gold-dark text-sm font-bold" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <h3 className="text-base font-heading font-bold text-charcoal">{item.title}</h3>
                    <p className="text-concrete text-sm leading-relaxed flex-1">{item.body}</p>
                  </li>
                </ScrollReveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ── Towns ──────────────────────────────────────────────────── */}
      {page.places && (
        <section className={`section relative overflow-hidden ${band()}`}>
          <div className="container relative z-10">
            <ScrollReveal>
              <SectionHeading badge="Where we work" title="Towns we have built in" />
            </ScrollReveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {page.places.map((place, i) => {
                const body = (
                  <>
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin size={16} className="text-gold-dark" aria-hidden="true" />
                      <h3 className="font-heading text-lg font-bold text-charcoal">{place.name}</h3>
                    </div>
                    <p className="text-sm text-concrete leading-relaxed mb-4">{place.note}</p>
                    {place.href && (
                      <span className="mt-auto inline-flex items-center gap-1.5 text-xs font-semibold text-charcoal group-hover:text-gold-dark">Branch office page<ArrowRight size={12} /></span>
                    )}
                  </>
                );
                const className = "group h-full flex flex-col rounded-2xl bg-white border border-border p-6 shadow-2xs";
                return (
                  <ScrollReveal key={place.name} delay={(i % 4) * 100}>
                    {place.href ? (
                      <Link href={place.href} className={`${className} hover:border-gold/70 transition-colors`}>{body}</Link>
                    ) : (
                      <div className={className}>{body}</div>
                    )}
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── Completed work ─────────────────────────────────────────── */}
      {areaProjects.length > 0 && (
        <section id="projects" className={`section relative overflow-hidden scroll-mt-24 ${band()}`}>
          <div className="absolute inset-0 blueprint-grid opacity-10" />
          <div className="liquid-glow" style={{ width: 650, height: 450, top: "10%", left: "-5%", opacity: 0.25 }} />
          <div className="container relative z-10">
            <ScrollReveal>
              <SectionHeading badge="Our work" title={page.projectsHeading} />
            </ScrollReveal>
            <div className={`grid grid-cols-1 gap-7 ${
              areaProjects.length === 1 ? "max-w-md mx-auto" : areaProjects.length === 2 ? "md:grid-cols-2 max-w-4xl mx-auto" : "md:grid-cols-2 lg:grid-cols-3"
            }`}>
              {areaProjects.map((project, i) => (
                <ScrollReveal key={project.slug} delay={(i % 3) * 130}>
                  <ProjectCard project={project} />
                </ScrollReveal>
              ))}
            </div>
            <div className="mt-16 text-center">
              <ScrollReveal delay={350}>
                <Button href="/projects" variant="gold" size="lg">Explore All Projects<ArrowRight size={16} /></Button>
              </ScrollReveal>
            </div>
          </div>
        </section>
      )}

      {/* ── What documented projects involved ──────────────────────── */}
      {caseStudies.length > 0 && page.caseStudies && (
        <section className={`section relative overflow-hidden ${band()}`}>
          <div className="liquid-glow" style={{ width: 500, height: 400, top: "20%", left: "30%", opacity: 0.25 }} />
          <div className="container relative z-10">
            <ScrollReveal>
              <SectionHeading badge="Project notes" title={page.caseStudies.heading} subtitle={page.caseStudies.intro} />
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {caseStudies.map(({ item, project }, i) => (
                <ScrollReveal key={item.slug} delay={(i % 2) * 100}>
                  <article className="h-full flex flex-col rounded-3xl neu-glass p-6 md:p-8">
                    <p className="text-[11px] font-bold uppercase tracking-widest text-gold-dark mb-3">
                      {[project.location, project.type, project.area, project.duration || project.year].filter(Boolean).join(" · ")}
                    </p>
                    <h3 className="font-heading text-xl md:text-2xl font-bold text-charcoal leading-snug mb-3">{item.heading}</h3>
                    <div className="space-y-3 text-sm text-concrete leading-relaxed flex-grow">
                      {item.paragraphs.map((paragraph) => <p key={paragraph}><AnswerText text={paragraph} /></p>)}
                    </div>
                    <Link href={`/projects/${project.slug}`} className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-gold-dark hover:text-charcoal">
                      {item.linkLabel}<ArrowRight size={12} />
                    </Link>
                  </article>
                </ScrollReveal>
              ))}
            </div>
            <div className="mt-12 text-center">
              <Button href="#enquiry" variant="outline" size="lg" className={WRAP}>{page.caseStudies.cta}<ArrowRight size={16} /></Button>
            </div>
          </div>
        </section>
      )}

      {/* ── Services by sector ─────────────────────────────────────── */}
      <section className={`section relative overflow-hidden ${band()}`}>
        <div className="container relative z-10">
          <ScrollReveal>
            <SectionHeading
              badge="Services"
              title={page.servicesHeading ?? "What we do here"}
              subtitle={page.servicesIntro ?? "All our services are available in Coimbatore and the Nilgiris. These are the ones people here ask for most."}
            />
          </ScrollReveal>
          {page.serviceSectors && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {page.serviceSectors.map((sector, i) => (
                <ScrollReveal key={sector.heading} delay={(i % 2) * 100}>
                  <div className="h-full flex flex-col rounded-3xl neu-glass p-6 md:p-7">
                    <h3 className="font-heading text-xl font-bold text-charcoal mb-2">{sector.heading}</h3>
                    <p className="text-sm text-concrete leading-relaxed mb-5">{sector.body}</p>
                    <ul className="space-y-3.5 mb-6">
                      {sector.links.map((link) => (
                        <li key={link.slug}>
                          <Link href={getServicePath(link.slug)} className="inline-flex items-center gap-1.5 text-sm font-semibold text-charcoal hover:text-gold-dark">
                            {link.label}<ArrowRight size={12} />
                          </Link>
                          {link.note && <p className="text-xs text-concrete leading-relaxed mt-0.5">{link.note}</p>}
                        </li>
                      ))}
                    </ul>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          )}
          <div className="mt-12 text-center">
            <Button href="/services" variant="gold" size="lg">All Services<ArrowRight size={16} /></Button>
          </div>
        </div>
      </section>

      {/* ── How a project runs ─────────────────────────────────────── */}
      {page.process && (
        <section className={`section relative overflow-hidden ${band()}`}>
          <div className="liquid-glow" style={{ width: 450, height: 450, top: "10%", left: "5%", opacity: 0.25 }} />
          <div className="container relative z-10">
            <ScrollReveal>
              <SectionHeading badge="How we work" title={page.process.heading} subtitle={page.process.intro} />
            </ScrollReveal>
            <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {page.process.steps.map((step, i) => (
                <ScrollReveal key={step.title} delay={(i % 4) * 80}>
                  <li className="neu-glass p-6.5 rounded-3xl h-full flex flex-col gap-4">
                    <div className="w-11 h-11 rounded-2xl nm-inset flex items-center justify-center flex-shrink-0">
                      <span className="text-gold-dark text-sm font-bold" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <h3 className="text-base font-heading font-bold text-charcoal">{step.title}</h3>
                    <p className="text-concrete text-sm leading-relaxed flex-1">{step.body}</p>
                  </li>
                </ScrollReveal>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* ── Itemised BoQ and pricing ───────────────────────────────── */}
      {page.pricing && (
        <section className={`section relative overflow-hidden ${band()}`}>
          <div className="liquid-glow" style={{ width: 500, height: 500, top: "20%", right: "-5%", opacity: 0.3 }} />
          <div className="container relative z-10">
            <div className="grid lg:grid-cols-[3fr_2fr] gap-12 lg:gap-16 items-start">
              <ScrollReveal>
                <Badge>Transparent pricing</Badge>
                <h2 className="font-heading font-bold text-charcoal mb-5 leading-tight text-balance" style={{ fontSize: "var(--text-h2)" }}>
                  {page.pricing.heading}
                </h2>
                <div className="gold-line mb-7" />
                <div className="space-y-5 text-concrete leading-relaxed">
                  {page.pricing.paragraphs.map((paragraph) => <p key={paragraph}><AnswerText text={paragraph} /></p>)}
                </div>
              </ScrollReveal>
              <ScrollReveal delay={120}>
                <div className="rounded-3xl neu-glass p-6 md:p-8">
                  <h3 className="font-heading text-xl font-bold text-charcoal mb-5">{page.pricing.itemsHeading}</h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-x-6 gap-y-3">
                    {page.pricing.items.map((item) => (
                      <li key={item} className="flex items-center gap-3 text-sm font-semibold text-charcoal">
                        <span className="w-6 h-6 rounded-full nm-inset-sm flex items-center justify-center flex-shrink-0">
                          <CheckCircle2 size={13} className="text-gold-dark" />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            </div>
            <ScrollReveal>
              <div className="mt-12 max-w-3xl space-y-5 text-concrete leading-relaxed">
                {page.pricing.afterItems.map((paragraph) => <p key={paragraph}><AnswerText text={paragraph} /></p>)}
              </div>
              <div className="mt-9">
                <Button href="#enquiry" variant="primary" size="lg" className={WRAP}>{page.pricing.cta}<ArrowRight size={16} /></Button>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* ── Guides from the blog (new) ─────────────────────────────── */}
      {guides.length > 0 && (
        <section className={`section relative overflow-hidden ${band()}`}>
          <div className="container relative z-10">
            <ScrollReveal>
              <SectionHeading badge="From our blog" title={showcase.guides.heading} subtitle={showcase.guides.intro} />
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {guides.map((post, i) => (
                <ScrollReveal key={post.slug} delay={i * 100}>
                  <Link href={`/blog/${post.slug}`} className="group h-full flex flex-col gap-4 rounded-3xl neu-glass p-6.5 hover:-translate-y-1 transition-transform">
                    <div className="w-11 h-11 rounded-2xl nm-inset flex items-center justify-center flex-shrink-0">
                      <span className="text-gold-dark text-sm font-bold" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <h3 className="font-heading text-xl font-bold text-charcoal leading-snug group-hover:text-gold-dark transition-colors">{post.title}</h3>
                    <p className="text-concrete text-sm leading-relaxed flex-1">{post.excerpt}</p>
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-gold-dark group-hover:text-charcoal">
                      Read the guide<ArrowRight size={12} />
                    </span>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Questions (home FAQ layout) ────────────────────────────── */}
      <section id="faq" className={`section relative overflow-hidden scroll-mt-32 ${band()}`}>
        <div className="liquid-glow" style={{ width: 500, height: 450, top: "10%", left: "-8%", opacity: 0.25 }} />
        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-32 space-y-8">
                <ScrollReveal>
                  <Badge>Questions</Badge>
                  <h2 className="font-heading font-bold text-charcoal leading-tight mb-5 text-balance" style={{ fontSize: "var(--text-h2)" }}>
                    Common questions about building in {page.breadcrumb.replace("&", "and")}
                  </h2>
                  <div className="gold-line mb-5" />
                  <p className="text-concrete leading-relaxed">If your question is not here, call or message us. We are happy to talk it through before you decide anything.</p>
                </ScrollReveal>
                <ScrollReveal delay={120} className="hidden lg:block">
                  <div className="neu-glass rounded-3xl p-6 sm:p-7">
                    <p className="font-heading text-xl font-bold text-charcoal mb-2">Still have a question?</p>
                    <p className="text-sm text-concrete leading-relaxed mb-5">Talk to our engineers at the {office.label} office, or send your plot details for a quote.</p>
                    <div className="space-y-2.5">
                      <a href={telHref} className="flex items-center gap-3 rounded-2xl bg-charcoal text-white px-4 py-3 text-sm font-semibold hover:bg-[#2C2723] transition-colors">
                        <Phone size={16} aria-hidden="true" />Call {office.phone}
                      </a>
                      <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-2xl bg-white border border-border px-4 py-3 text-sm font-semibold text-charcoal hover:border-gold/60 transition-colors">
                        <MessageCircle size={16} aria-hidden="true" className="text-[#25D366]" />Chat on WhatsApp
                      </a>
                      <a href="#enquiry" className="flex items-center justify-between gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-gold-dark hover:bg-gold/10 transition-colors">
                        Send your requirements<ArrowRight size={16} aria-hidden="true" />
                      </a>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
            <div className="lg:col-span-8">
              <div className="neu-glass rounded-3xl divide-y divide-border/70 overflow-hidden">
                {page.faqs.map((faq, i) => (
                  <details key={faq.q} open={i === 0} className="group/faq px-5 sm:px-7 transition-colors open:bg-white/60">
                    <summary className="flex cursor-pointer list-none items-center gap-4 sm:gap-5 py-5 sm:py-6 text-charcoal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-dark [&::-webkit-details-marker]:hidden">
                      <span className="w-7 shrink-0 text-xs font-bold tracking-wider text-concrete-light group-open/faq:text-gold-dark" aria-hidden="true">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="flex-1 font-heading text-lg sm:text-xl font-bold leading-snug group-open/faq:text-gold-dark transition-colors">{faq.q}</h3>
                      <span className="w-9 h-9 shrink-0 rounded-full nm-inset-sm flex items-center justify-center text-gold-dark">
                        <Plus size={16} aria-hidden="true" className="motion-safe:transition-transform group-open/faq:rotate-45" />
                      </span>
                    </summary>
                    <div className="pb-6 sm:pl-12 sm:pr-14">
                      <p className="text-[15px] text-concrete leading-7"><AnswerText text={faq.a} /></p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Visit ──────────────────────────────────────────────────── */}
      <section className={`section relative overflow-hidden ${band()}`}>
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-[2fr_3fr] gap-10 lg:gap-14 items-stretch">
            <ScrollReveal>
              <Badge>Visit us</Badge>
              <h2 className="font-heading font-bold text-charcoal mb-5 leading-tight" style={{ fontSize: "var(--text-h2)" }}>Our {office.label} office</h2>
              <div className="gold-line mb-7" />
              <ul className="space-y-3.5 text-sm text-charcoal mb-7">
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
                <li className="flex items-start gap-3">
                  <Clock size={16} className="text-gold-dark mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <span className="leading-relaxed">{HOURS}. Call ahead and we will make sure an engineer is free to meet you.</span>
                </li>
              </ul>
              <a
                href={office.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mb-8 inline-flex items-center justify-center gap-2 rounded-full border border-border bg-white px-7 py-3 text-sm font-semibold tracking-wide text-charcoal shadow-xs hover:bg-linen hover:border-charcoal/40 transition-all"
              >
                <Navigation size={14} />Get directions
              </a>
              <Link href={page.other.href} className="group block rounded-2xl bg-white border border-border p-5 shadow-2xs hover:border-gold/70 transition-colors">
                <p className="font-heading text-lg font-bold text-charcoal mb-1">{page.other.title}</p>
                <p className="text-sm text-concrete leading-relaxed mb-3">{page.other.body}</p>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-charcoal group-hover:text-gold-dark">Read more<ArrowRight size={12} /></span>
              </Link>
            </ScrollReveal>
            <div className="relative min-h-[320px] lg:min-h-[440px] rounded-3xl overflow-hidden border border-border shadow-sm bg-linen">
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

      {/* ── Enquiry (in the style of the home CTA banner) ──────────── */}
      <section id="enquiry" className="relative bg-gradient-to-br from-[#FAF8F5] via-[#F7F5F0] to-[#EFECE6] text-charcoal overflow-hidden py-24 md:py-32 border-y border-border scroll-mt-28">
        <div className="absolute inset-0 blueprint-grid opacity-15" />
        <div className="liquid-glow" style={{ width: 700, height: 400, top: -100, left: "30%", opacity: 0.35 }} />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-[2fr_3fr] gap-10 lg:gap-16 items-start">
            <ScrollReveal>
              <span className="inline-flex items-center gap-2 text-[0.72rem] font-bold tracking-[0.2em] uppercase text-gold-dark nm-raised px-4.5 py-1.5 rounded-full border border-border shadow-xs mb-6">
                <Phone size={12} className="text-gold-dark" />
                Request a quote
              </span>
              <h2 className="font-heading font-bold text-charcoal mb-5 leading-tight" style={{ fontSize: "var(--text-h2)" }}>Tell us about your project</h2>
              <p className="text-base md:text-lg text-concrete leading-relaxed mb-7">Share your plot location and what you want to build, and we will get back to you.</p>
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
        <section className="section bg-[var(--canvas-bg)]">
          <div className="container max-w-5xl space-y-12 md:space-y-16">
            {page.overview.map((section) => (
              <ScrollReveal key={section.heading}>
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-charcoal leading-snug mb-5">{section.heading}</h2>
                <div className="space-y-4 text-concrete leading-relaxed">
                  {section.paragraphs.map((paragraph) => <p key={paragraph}><AnswerText text={paragraph} /></p>)}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
