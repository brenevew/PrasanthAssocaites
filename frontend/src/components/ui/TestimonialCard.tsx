import type { Testimonial } from "@/data/testimonials";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="nm-raised p-7 md:p-8 rounded-3xl flex flex-col h-full transition-all duration-300 hover:-translate-y-1">
      {/* Sunken Quote Icon Socket */}
      <div className="w-11 h-11 rounded-2xl nm-inset flex items-center justify-center mb-5 flex-shrink-0">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="var(--color-gold)"
          className="opacity-90"
        >
          <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
          <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
        </svg>
      </div>

      {/* Quote */}
      <blockquote className="text-charcoal leading-relaxed mb-6 flex-grow text-sm md:text-base font-medium">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>

      {/* Attribution */}
      <div className="pt-4 mt-auto border-t border-border/70">
        <div className="flex items-center gap-3.5">
          {/* Avatar badge */}
          <div className="w-10 h-10 rounded-full nm-dark-raised text-gold font-bold text-xs flex items-center justify-center flex-shrink-0 border border-gold/30">
            {testimonial.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <div>
            <p className="font-bold text-xs text-charcoal">
              {testimonial.name}
            </p>
            <p className="text-[11px] text-concrete">
              {testimonial.role} · {testimonial.location}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
