import Button from "./Button";
import { ArrowRight, Phone } from "lucide-react";

interface CTABannerProps {
  headline?: string;
  subtitle?: string;
  primaryCTA?: { label: string; href: string };
  // Pass null to omit the secondary button entirely.
  secondaryCTA?: { label: string; href: string } | null;
}

export default function CTABanner({
  headline = "Planning to Build Your Dream Space?",
  subtitle = "Let's turn your vision into a thoughtfully designed, professionally engineered reality. Our team is ready to listen.",
  primaryCTA = { label: "Book a Free Consultation", href: "/contact" },
  secondaryCTA = null,
}: CTABannerProps) {
  return (
    <section className="relative bg-gradient-to-br from-[#FAF8F5] via-[#F7F5F0] to-[#EFECE6] text-charcoal overflow-hidden py-24 md:py-32 border-y border-border">
      {/* Blueprint grid texture */}
      <div className="absolute inset-0 blueprint-grid opacity-15" />

      {/* Ambient glow */}
      <div
        className="liquid-glow"
        style={{ width: 700, height: 400, top: -100, left: "30%", opacity: 0.35 }}
      />

      {/* Gold accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <span className="inline-flex items-center gap-2 text-[0.72rem] font-bold tracking-[0.2em] uppercase text-gold-dark nm-raised px-4.5 py-1.5 rounded-full border border-border shadow-xs">
            <Phone size={12} className="text-gold-dark" />
            Start Your Project Today
          </span>

          <h2
            className="font-heading font-bold text-charcoal leading-tight text-balance"
            style={{ fontSize: "var(--text-h2)" }}
          >
            {headline}
          </h2>

          <p className="text-base md:text-lg text-concrete max-w-xl mx-auto leading-relaxed">
            {subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button
              variant="primary"
              size="lg"
              href={primaryCTA.href}
              id="cta-banner-primary"
            >
              {primaryCTA.label}
              <ArrowRight size={16} />
            </Button>
            {secondaryCTA && (
              <Button
                variant="outline"
                size="lg"
                href={secondaryCTA.href}
                id="cta-banner-secondary"
              >
                {secondaryCTA.label}
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Bottom accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
    </section>
  );
}
