"use client";

import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  value: string;
  suffix?: string;
  label: string;
  duration?: number;
}

export default function AnimatedCounter({
  value,
  suffix = "",
  label,
  duration = 2000,
}: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState("0");
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Respect reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          if (prefersReducedMotion) {
            setDisplayValue(value);
            return;
          }

          // Parse numeric value (handle "2M" etc.)
          const numericMatch = value.match(/^([\d.]+)/);
          if (!numericMatch) {
            setDisplayValue(value);
            return;
          }

          const target = parseFloat(numericMatch[1]);
          const nonNumericSuffix = value.replace(/^[\d.]+/, "");
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = target * eased;

            if (target >= 100) {
              setDisplayValue(Math.floor(current) + nonNumericSuffix);
            } else {
              setDisplayValue(
                current.toFixed(target % 1 !== 0 ? 1 : 0) + nonNumericSuffix
              );
            }

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setDisplayValue(value);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [value, duration, hasAnimated]);

  return (
    <div ref={ref} className="text-center">
      <div className="flex items-baseline justify-center gap-0.5">
        <span
          className="font-heading font-bold text-charcoal"
          style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
        >
          {displayValue}
        </span>
        <span
          className="font-heading font-bold text-gold"
          style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}
        >
          {suffix}
        </span>
      </div>
      <p className="mt-2 text-sm text-concrete tracking-wide uppercase">
        {label}
      </p>
    </div>
  );
}
