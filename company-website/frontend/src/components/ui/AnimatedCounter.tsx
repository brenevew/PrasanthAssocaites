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
  // The real value is rendered on the server, so crawlers, no-JS visitors and
  // anyone who sees the counter before it animates get the genuine number.
  const [displayValue, setDisplayValue] = useState(value);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const numericMatch = value.match(/^([\d.]+)/);
    if (!numericMatch) return;
    const target = parseFloat(numericMatch[1]);
    const nonNumericSuffix = value.replace(/^[\d.]+/, "");

    let frame = 0;
    let firstCallback = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        // The first callback reports where the counter is on load. If it is
        // already on screen, leave the real number alone: resetting it to 0
        // would flash a wrong value. Only count up when it scrolls into view.
        if (firstCallback) {
          firstCallback = false;
          if (entry.isIntersecting) {
            observer.disconnect();
            return;
          }
        }
        if (!entry.isIntersecting) return;
        observer.disconnect();

        const startTime = performance.now();
        const animate = (currentTime: number) => {
          const progress = Math.min((currentTime - startTime) / duration, 1);
          const current = target * (1 - Math.pow(1 - progress, 3)); // ease-out cubic
          if (progress < 1) {
            setDisplayValue(
              (target >= 100 ? Math.floor(current) : current.toFixed(target % 1 !== 0 ? 1 : 0)) + nonNumericSuffix
            );
            frame = requestAnimationFrame(animate);
          } else {
            setDisplayValue(value);
          }
        };
        frame = requestAnimationFrame(animate);
      },
      { threshold: 0.3 }
    );
    observer.observe(element);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, duration]);

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
