import Link from "next/link";
import { ArrowRight, MessageCircle, Phone, Plus } from "lucide-react";
import { homeFaqGroups, homeFaqQuestions } from "@/data/homeFaqs";
import { company } from "@/data/company";
import JsonLd from "@/components/seo/JsonLd";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { SITE_URL } from "@/lib/seo";

/** Chat goes to the WhatsApp number; calls go to the office number. */
const WHATSAPP_URL = `https://wa.me/919360337733?text=${encodeURIComponent(
  "Hello Prasanth Associates, I have a question about my project."
)}`;

export default function HomeFaq() {
  return (
    <section
      id="faq"
      aria-label="Frequently asked questions"
      className="section bg-linen border-b border-border relative overflow-hidden scroll-mt-32"
    >
      {/* Mirrors the visible questions below, in the same order, so answer engines can quote them. */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "@id": `${SITE_URL}/#faq`,
          mainEntity: homeFaqQuestions.map(({ question, answer }) => ({
            "@type": "Question",
            name: question,
            acceptedAnswer: { "@type": "Answer", text: answer },
          })),
        }}
      />
      <div className="liquid-glow" style={{ width: 500, height: 450, top: "10%", left: "-8%", opacity: 0.25 }} />

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14">
          {/* Sidebar: heading, then a contact card (sticky on desktop) */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32 space-y-8">
              <ScrollReveal>
                <span className="badge-gold mb-5 inline-flex">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block" />
                  FAQs
                </span>
                <h2
                  className="font-heading font-bold text-charcoal leading-tight mb-5"
                  style={{ fontSize: "var(--text-h2)" }}
                >
                  Before you start
                  <br />
                  <em className="text-gold not-italic">your project</em>
                </h2>
                <div className="gold-line mb-5" />
                <p className="text-concrete leading-relaxed">
                  Clear answers about costs, plans, construction and working with our team.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={120} className="hidden lg:block">
                <FaqContactCard />
              </ScrollReveal>
            </div>
          </div>

          {/* Questions, grouped */}
          <div className="lg:col-span-8 space-y-10">
            {homeFaqGroups.map((group) => (
              <div key={group}>
                <h3 className="font-body text-[11px] font-bold tracking-[0.2em] uppercase text-gold-dark mb-4 pl-1">
                  {group}
                </h3>
                <div className="neu-glass rounded-3xl divide-y divide-border/70 overflow-hidden">
                  {homeFaqQuestions
                    .filter((faq) => faq.group === group)
                    .map((faq) => {
                      const { question, answer, links } = faq;
                      // Questions are stored in group order, so the list position is the running number.
                      const number = homeFaqQuestions.indexOf(faq) + 1;
                      return (
                        <details
                          key={question}
                          name="home-faq"
                          open={number === 1}
                          className="group/faq px-5 sm:px-7 transition-colors open:bg-white/60"
                        >
                          <summary className="flex cursor-pointer list-none items-center gap-4 sm:gap-5 py-5 sm:py-6 text-charcoal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-dark [&::-webkit-details-marker]:hidden">
                            <span className="w-7 shrink-0 text-xs font-bold tracking-wider text-concrete-light group-open/faq:text-gold-dark">
                              {String(number).padStart(2, "0")}
                            </span>
                            <span className="flex-1 font-heading text-lg sm:text-xl font-bold leading-snug group-open/faq:text-gold-dark transition-colors">
                              {question}
                            </span>
                            <span className="w-9 h-9 shrink-0 rounded-full nm-inset-sm flex items-center justify-center text-gold-dark">
                              <Plus
                                size={16}
                                aria-hidden="true"
                                className="motion-safe:transition-transform group-open/faq:rotate-45"
                              />
                            </span>
                          </summary>
                          <div className="pb-6 sm:pl-12 sm:pr-14">
                            <p className="text-[15px] text-concrete leading-7">{answer}</p>
                            {links.length > 0 && (
                              <div className="mt-4 flex flex-wrap gap-2.5">
                                {links.map(({ href, label }) => (
                                  <Link
                                    key={href}
                                    href={href}
                                    className="inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-gold/10 px-3.5 py-1.5 text-xs font-semibold text-gold-dark hover:bg-gold/20 hover:border-gold/60 transition-colors"
                                  >
                                    {label}
                                    <ArrowRight size={12} aria-hidden="true" />
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        </details>
                      );
                    })}
                </div>
              </div>
            ))}

            {/* On mobile the contact card follows the questions */}
            <div className="lg:hidden">
              <FaqContactCard />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FaqContactCard() {
  return (
    <div className="neu-glass rounded-3xl p-6 sm:p-7">
      <h3 className="font-heading text-xl font-bold text-charcoal mb-2">Still have a question?</h3>
      <p className="text-sm text-concrete leading-relaxed mb-5">
        Talk to our engineers and architects directly, or send your requirements for a quote.
      </p>
      <div className="space-y-2.5">
        <a
          href={`tel:${company.phone.replace(/\s/g, "")}`}
          className="flex items-center gap-3 rounded-2xl bg-charcoal text-white px-4 py-3 text-sm font-semibold hover:bg-[#2C2723] transition-colors"
        >
          <Phone size={16} aria-hidden="true" />
          Call {company.phone}
        </a>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 rounded-2xl bg-white border border-border px-4 py-3 text-sm font-semibold text-charcoal hover:border-gold/60 transition-colors"
        >
          <MessageCircle size={16} aria-hidden="true" className="text-[#25D366]" />
          Chat on WhatsApp
        </a>
        <Link
          href="/request-quote"
          className="flex items-center justify-between gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-gold-dark hover:bg-gold/10 transition-colors"
        >
          Send your requirements
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
      <p className="mt-5 pt-5 border-t border-border/70 text-xs text-concrete">
        Looking for something specific?{" "}
        <Link href="/services" className="font-semibold text-gold-dark underline underline-offset-4">
          Browse all services
        </Link>
      </p>
    </div>
  );
}
