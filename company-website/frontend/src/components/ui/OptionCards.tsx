"use client";

import { Check } from "lucide-react";

/**
 * Card group over real inputs, so keyboard nav and screen readers come free.
 * `multi` picks checkboxes (options combine) over radios (options exclude each
 * other) — a scope can be several things at once, a built-up area cannot.
 */
export default function OptionCards({
  name,
  legend,
  options,
  value,
  onChange,
  multi = false,
  compact = false,
}: {
  name: string;
  legend: string;
  options: { value: string; label: string }[];
  value: string[];
  onChange: (v: string[]) => void;
  multi?: boolean;
  compact?: boolean;
}) {
  const toggle = (v: string) =>
    multi
      ? onChange(value.includes(v) ? value.filter((x) => x !== v) : [...value, v])
      : onChange([v]);

  return (
    <fieldset>
      <legend className="mb-2 text-xs font-bold uppercase tracking-wider text-concrete">
        {legend}
        {multi && (
          <span className="ml-1.5 font-medium normal-case tracking-normal text-concrete-light">
            — select all that apply
          </span>
        )}
      </legend>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {options.map((opt) => {
          // Driven from state, not peer-checked: the marker is a *descendant* of
          // the input's sibling, which peer-* variants cannot reach.
          const isSelected = value.includes(opt.value);
          return (
            <label key={opt.value} className="relative cursor-pointer">
              <input
                type={multi ? "checkbox" : "radio"}
                name={multi ? `${name}[]` : name}
                value={opt.value}
                checked={isSelected}
                onChange={() => toggle(opt.value)}
                className="peer sr-only"
              />
              <span
                className={`flex h-full items-center gap-2.5 rounded-xl border transition-all peer-focus-visible:ring-2 peer-focus-visible:ring-gold peer-focus-visible:ring-offset-2 ${
                  compact ? "px-3 py-2 text-xs" : "px-3.5 py-3 text-sm"
                } ${
                  isSelected
                    ? "border-gold bg-gold/10 font-bold text-charcoal"
                    : "border-border bg-white/80 font-medium text-concrete hover:border-charcoal/30 hover:bg-white"
                }`}
              >
                <span
                  className={`flex h-4 w-4 flex-shrink-0 items-center justify-center border transition-colors ${
                    multi ? "rounded-[5px]" : "rounded-full"
                  } ${isSelected ? "border-gold bg-gold" : "border-border bg-white"}`}
                >
                  {multi ? (
                    <Check size={11} strokeWidth={3.5} className={isSelected ? "text-white" : "text-transparent"} />
                  ) : (
                    <span className={`h-2 w-2 rounded-full transition-colors ${isSelected ? "bg-white" : "bg-transparent"}`} />
                  )}
                </span>
                <span className="leading-snug">{opt.label}</span>
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
