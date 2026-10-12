"use client";

import { useEffect, useRef } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  threshold?: number;
}

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  threshold = 0.1,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const element = ref.current;
    if (!element || prefersReducedMotion || !("IntersectionObserver" in window)) return;

    // Keep server-rendered and above-the-fold content visible immediately.
    // Only enhance offscreen content once JavaScript is ready.
    if (element.getBoundingClientRect().top < window.innerHeight) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove("reveal-pending");
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );

    element.classList.add("reveal-pending");
    observer.observe(element);

    return () => {
      observer.disconnect();
      element.classList.remove("reveal-pending");
    };
  }, [threshold]);

  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
