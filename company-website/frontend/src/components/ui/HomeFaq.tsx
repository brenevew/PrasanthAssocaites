import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { homeFaqQuestions } from "@/data/homeFaqs";
import SectionHeading from "@/components/ui/SectionHeading";
import JsonLd from "@/components/seo/JsonLd";
import { SITE_URL } from "@/lib/seo";

export default function HomeFaq() {
  return (
    <section id="faq" aria-label="Frequently asked questions" className="section bg-linen border-b border-border scroll-mt-32">
      {/* Mirrors the visible questions below, so answer engines can quote them. */}
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#faq`,
        mainEntity: homeFaqQuestions.map(({ question, answer }) => ({
          "@type": "Question",
          name: question,
          acceptedAnswer: { "@type": "Answer", text: answer },
        })),
      }} />
      <div className="mx-auto w-full px-4 sm:px-6 lg:w-[75%] lg:px-0">
        <SectionHeading
          badge="FAQs"
          title="Before you start your project"
          subtitle="Clear answers about costs, plans, construction and working with our team."
        />
        <div className="space-y-4">
          {homeFaqQuestions.map(({ question, answer, links }, index) => (
            <details key={question} open={index === 0} className="group neu-glass rounded-2xl p-4 sm:p-6 open:border-gold/60">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-lg text-charcoal focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-dark [&::-webkit-details-marker]:hidden">
                <h3 className="font-heading text-lg sm:text-xl font-semibold">{question}</h3>
                <ChevronDown size={20} aria-hidden="true" className="shrink-0 text-gold-dark motion-safe:transition-transform group-open:rotate-180" />
              </summary>
              <div className="pt-4 text-base text-concrete leading-7">
                <p>{answer}</p>
                <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
                  {links.map(({ href, label }) => (
                    <Link key={href} href={href} className="text-gold-dark font-semibold underline underline-offset-4">
                      {label}
                    </Link>
                  ))}
                </div>
              </div>
            </details>
          ))}
        </div>
        <p className="mt-8 text-center text-base text-concrete leading-7">
          Need more detail? Browse <Link href="/services" className="text-gold-dark font-semibold underline underline-offset-4">all services and their FAQs</Link>,
          or <Link href="/contact" className="text-gold-dark font-semibold underline underline-offset-4">talk to our team about your project</Link>.
        </p>
      </div>
    </section>
  );
}
