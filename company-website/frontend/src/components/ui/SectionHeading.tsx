interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  light?: boolean;
}

export default function SectionHeading({
  badge,
  title,
  subtitle,
  align = "center",
  light = false,
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center items-center" : "text-left items-start";

  return (
    <div className={`flex flex-col gap-5 mb-14 md:mb-18 ${alignClass}`}>
      {badge && (
        <span
          className={`text-[0.7rem] font-bold tracking-[0.22em] uppercase inline-flex items-center gap-2 ${
            light
              ? "text-gold-light bg-white/10 border border-gold-light/30 px-3 py-1 rounded-full"
              : "badge-gold"
          }`}
        >
          <span
            className={`w-1 h-1 rounded-full inline-block ${light ? "bg-gold-light" : "bg-gold"}`}
          />
          {badge}
        </span>
      )}
      <h2
        className={`font-heading font-bold text-balance leading-tight ${
          light ? "text-warm-white" : "text-charcoal"
        }`}
        style={{ fontSize: "var(--text-h2)" }}
      >
        {title}
      </h2>
      {align === "center" ? (
        <div className="flex justify-center">
          <div className="gold-line" />
        </div>
      ) : (
        <div className="gold-line" />
      )}
      {subtitle && (
        <p
          className={`max-w-xl text-base md:text-lg leading-relaxed ${
            light ? "text-concrete-lighter" : "text-concrete"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
