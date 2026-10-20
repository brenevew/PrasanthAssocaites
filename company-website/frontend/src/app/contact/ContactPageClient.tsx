"use client";

import { MapPin, Phone, Mail, Clock, ExternalLink, Navigation, CheckCircle2 } from "lucide-react";
import { company } from "@/data/company";
import ContactForm from "@/components/ui/ContactForm";
import ScrollReveal from "@/components/ui/ScrollReveal";

const offices = company.offices;

export default function ContactPageClient() {
  return (
    <>
      {/* ── Compact Hero ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-[#FAF8F5] to-[var(--canvas-bg)] pb-10 pt-28 text-charcoal">
        <div className="absolute inset-0 blueprint-grid opacity-10" />
        <div className="liquid-glow" style={{ width: 700, height: 400, top: -120, left: "25%", opacity: 0.28 }} />
        <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />

        <div className="container relative z-10 max-w-3xl text-center">
          <ScrollReveal>
            <h1
              className="mb-4 text-balance font-heading font-bold leading-tight text-charcoal"
              style={{ fontSize: "var(--text-h2)" }}
            >
              Get in Touch with Our{" "}
              <em className="not-italic text-gold-dark">Architectural Team</em>
            </h1>
            <p className="mx-auto mb-6 max-w-xl text-sm leading-relaxed text-concrete md:text-base">
              Visit our offices in Coimbatore or Gudalur, call our engineering team
              directly, or send us a message.
            </p>

            {/* Immediate contact actions — no scrolling needed to call or email */}
            <div className="mb-5 flex flex-wrap justify-center gap-3">
              <a
                href={`tel:${company.phone.replace(/\s/g, "")}`}
                className="inline-flex items-center gap-2 rounded-2xl bg-charcoal px-5 py-3 text-xs font-bold text-white transition-colors hover:bg-black"
              >
                <Phone size={14} className="text-gold" />
                {company.phone}
              </a>
              <a
                href={`mailto:${company.email}`}
                className="inline-flex items-center gap-2 rounded-2xl border border-border bg-white px-5 py-3 text-xs font-bold text-charcoal transition-colors hover:bg-gold/10"
              >
                <Mail size={14} className="text-gold-dark" />
                Email us
              </a>
            </div>

            <div className="flex flex-wrap justify-center gap-2.5">
              {[
                "24-Hour Response Guarantee",
                "Free Engineering Consultation",
                "100% Fixed BoQ Pricing",
              ].map((item) => (
                <span
                  key={item}
                  className="nm-raised inline-flex items-center gap-2 rounded-full border border-slate-300/80 px-3.5 py-1.5 text-[11px] font-medium text-charcoal shadow-2xs"
                >
                  <CheckCircle2 size={12} className="text-gold-dark" />
                  {item}
                </span>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Offices + Form side by side (previously three stacked sections) ── */}
      <section className="bg-background py-14">
        <div className="container max-w-6xl">
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">

            {/* Offices: details and map merged into one card each */}
            <div className="lg:col-span-5">
              <ScrollReveal>
                <h2 className="mb-4 font-heading text-xl font-bold text-charcoal">
                  Our Offices
                </h2>

                <div className="space-y-5">
                  {offices.map((off) => (
                    <div
                      key={off.city}
                      className="relative overflow-hidden rounded-3xl border border-border bg-white shadow-sm transition-shadow duration-300 hover:shadow-md"
                    >
                      <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-gold via-gold-light to-gold-dark" />

                      <div className="p-6">
                        <span className="mb-3 inline-block rounded-full border border-gold/25 bg-gold/12 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-gold-dark">
                          {off.badge}
                        </span>

                        <h3 className="mb-3.5 font-heading text-xl font-bold text-charcoal">
                          {off.label}
                        </h3>

                        <ul className="space-y-3 text-sm">
                          <li className="flex items-start gap-2.5">
                            <MapPin size={16} className="mt-0.5 flex-shrink-0 text-gold" />
                            <div>
                              <p className="font-medium leading-relaxed text-charcoal">{off.street}</p>
                              <p className="text-xs text-concrete">
                                {off.city}, {off.state} – {off.pincode}
                              </p>
                            </div>
                          </li>

                          <li className="flex items-center gap-2.5">
                            <Phone size={16} className="flex-shrink-0 text-gold" />
                            <a
                              href={`tel:${off.phone.replace(/\s/g, "")}`}
                              className="text-sm font-bold text-charcoal transition-colors hover:text-gold"
                            >
                              {off.phone}
                            </a>
                          </li>

                          <li className="flex items-center gap-2.5">
                            <Mail size={16} className="flex-shrink-0 text-gold" />
                            <a
                              href={`mailto:${off.email}`}
                              className="break-all text-sm text-concrete transition-colors hover:text-gold"
                            >
                              {off.email}
                            </a>
                          </li>

                          <li className="flex items-center gap-2.5">
                            <Clock size={16} className="flex-shrink-0 text-gold" />
                            <span className="text-xs text-concrete">
                              Mon–Sat <strong className="text-charcoal">{company.hours.weekdays}</strong>
                              {" · "}Sun <strong className="text-charcoal">{company.hours.sunday}</strong>
                            </span>
                          </li>
                        </ul>
                      </div>

                      {/* Map lives in the same card — no duplicate offices section */}
                      <div className="h-40 w-full border-y border-border">
                        <iframe
                          src={off.mapEmbedUrl}
                          width="100%"
                          height="100%"
                          style={{ border: 0 }}
                          allowFullScreen
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          title={`${off.label} office location map`}
                        />
                      </div>

                      <a
                        href={off.mapLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 bg-charcoal px-4 py-3 text-xs font-bold uppercase tracking-widest text-warm-white transition-all duration-300 hover:bg-gold hover:text-charcoal"
                      >
                        <Navigation size={13} />
                        Get Directions
                        <ExternalLink size={11} />
                      </a>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>

            {/* Message form */}
            <div className="lg:col-span-7">
              <ScrollReveal delay={80}>
                <ContactForm />
              </ScrollReveal>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
