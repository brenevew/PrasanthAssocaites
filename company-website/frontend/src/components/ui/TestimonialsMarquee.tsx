import { testimonials } from "@/data/testimonials";
import TestimonialCard from "./TestimonialCard";

/**
 * Continuously scrolling ("running") strip of testimonial cards.
 * The list is rendered twice back-to-back and animated by exactly -50%,
 * so the loop point is seamless. Hovering/focusing pauses the scroll so
 * a card can be read in full.
 */
export default function TestimonialsMarquee() {
  return (
    <div className="marquee-mask overflow-hidden">
      <div className="marquee-track flex w-max gap-6">
        {testimonials.map((testimonial) => (
          <div key={testimonial.name} className="w-[300px] sm:w-[340px] md:w-[380px] flex-shrink-0">
            <TestimonialCard testimonial={testimonial} />
          </div>
        ))}
        {testimonials.map((testimonial) => (
          <div
            key={`${testimonial.name}-repeat`}
            className="w-[300px] sm:w-[340px] md:w-[380px] flex-shrink-0"
            aria-hidden="true"
          >
            <TestimonialCard testimonial={testimonial} />
          </div>
        ))}
      </div>
    </div>
  );
}
