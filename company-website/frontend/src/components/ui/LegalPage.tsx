import type { ReactNode } from "react";

interface LegalSection {
  heading: string;
  body: ReactNode;
}

interface LegalPageProps {
  title: string;
  lastUpdated: string;
  intro: ReactNode;
  sections: LegalSection[];
}

/** Shared layout for the Privacy Policy and Terms of Service pages. */
export default function LegalPage({ title, lastUpdated, intro, sections }: LegalPageProps) {
  return (
    <>
      {/* Same compact hero as the Contact page */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-[#FAF8F5] to-[var(--canvas-bg)] pb-10 pt-28 text-charcoal">
        <div className="absolute inset-0 blueprint-grid opacity-10" />
        <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />

        <div className="container relative z-10 max-w-3xl text-center">
          <h1
            className="mb-3 text-balance font-heading font-bold leading-tight text-charcoal"
            style={{ fontSize: "var(--text-h2)" }}
          >
            {title}
          </h1>
          <p className="text-center text-xs font-medium uppercase tracking-widest text-concrete">
            Last updated: {lastUpdated}
          </p>
        </div>
      </section>

      <section className="bg-[var(--canvas-bg)] py-14 md:py-20">
        <div className="container max-w-3xl">
          <div className="mb-10 space-y-4 text-sm leading-relaxed text-concrete md:text-base">{intro}</div>

          <div className="space-y-10">
            {sections.map((section, i) => (
              <div key={section.heading}>
                <h2 className="mb-3 font-heading text-xl font-bold text-charcoal md:text-2xl">
                  {i + 1}. {section.heading}
                </h2>
                <div className="space-y-3 text-sm leading-relaxed text-concrete md:text-base [&_li]:ml-5 [&_li]:list-disc [&_li]:pl-1 [&_ul]:space-y-1.5 [&_a]:font-semibold [&_a]:text-gold-dark hover:[&_a]:underline">
                  {section.body}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
