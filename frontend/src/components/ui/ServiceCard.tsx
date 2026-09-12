import {
  Home,
  Building2,
  Building,
  Key,
  Hammer,
  Cpu,
  Factory,
  Compass,
  Palette,
  Trees,
} from "lucide-react";
import type { Service } from "@/data/services";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Home,
  Building2,
  Building,
  Key,
  Hammer,
  Cpu,
  Factory,
  Compass,
  Palette,
  Trees,
};

interface ServiceCardProps {
  service: Service;
  index: number;
}

export default function ServiceCard({ service, index }: ServiceCardProps) {
  const IconComponent = iconMap[service.icon];

  return (
    <div
      className="group relative p-7 md:p-8 rounded-3xl nm-raised transition-all duration-300 hover:-translate-y-1.5 flex flex-col h-full"
      id={`service-${service.slug}`}
    >
      {/* Number Header */}
      <div className="flex items-start justify-between mb-6">
        {/* Sunken Neumorphic Icon Socket */}
        <div className="w-13 h-13 rounded-2xl nm-inset flex items-center justify-center text-charcoal group-hover:text-gold-dark transition-all duration-300">
          {IconComponent && <IconComponent size={22} />}
        </div>
        <span className="text-4xl font-heading font-bold text-concrete-lighter/40 group-hover:text-gold/40 transition-colors duration-300 select-none">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* Content */}
      <h3 className="text-xl font-heading font-bold text-charcoal mb-3 group-hover:text-gold-dark transition-colors duration-300">
        {service.title}
      </h3>
      <p className="text-concrete leading-relaxed mb-6 text-sm flex-grow">
        {service.shortDescription}
      </p>

      {/* CTA Pill */}
      <div className="pt-2 mt-auto">
        <span className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-charcoal group-hover:text-gold-dark transition-colors duration-300">
          Learn More
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transform group-hover:translate-x-1.5 transition-transform duration-300"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </span>
      </div>

      {/* Subtle Gold rim accent on hover */}
      <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-gold/30 transition-colors duration-300 pointer-events-none" />
    </div>
  );
}
