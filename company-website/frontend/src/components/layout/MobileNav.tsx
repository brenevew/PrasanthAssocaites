"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { company } from "@/data/company";
import { mainNavItems } from "@/data/navigation";
import { serviceCategories } from "@/data/serviceCategories";
import { services, type Service } from "@/data/services";
import Button from "../ui/Button";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  /** Opens the service card; the header owns that state. */
  onServiceSelect?: (service: Service) => void;
}

export default function MobileNav({ isOpen, onClose, onServiceSelect }: MobileNavProps) {
  const [servicesExpanded, setServicesExpanded] = useState(false);
  const [mobileCategory, setMobileCategory] = useState("construction");
  const pathname = usePathname();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-charcoal/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Nav Drawer */}
      <nav className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-[var(--ng-bg)] nm-raised-lg flex flex-col h-full overflow-y-auto border-l border-white/40">
        <div className="flex items-center justify-between p-5 border-b border-border/70">
          <div className="flex items-center gap-3 select-none">
              <img src="/images/logo.svg" alt="Logo" className="w-8 h-8 object-contain filter drop-shadow-[0_2px_4px_rgba(11,30,61,0.20)]" />
              <div className="flex flex-col leading-tight">
                <div className="flex items-center gap-1.5 font-heading">
                  <span className="font-bold text-lg text-charcoal tracking-tight">Prasanth</span>
                  <span className="font-bold text-lg text-charcoal tracking-tight">Associates</span>
                </div>
                <span className="mt-0.5 text-[8.5px] font-semibold text-gold-dark/85 tracking-[0.06em] uppercase whitespace-nowrap">
                  {company.disciplines}
                </span>
              </div>
          </div>
          <button
            onClick={onClose}
            className="w-11 h-11 rounded-full nm-interactive flex items-center justify-center text-charcoal hover:text-gold transition-colors focus:outline-none"
            aria-label="Close menu"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="flex flex-col py-6 px-6 space-y-3 flex-grow">
          {mainNavItems.map((item) => {
            const isActive = pathname === item.href;
            const isServicesItem = item.href === "/services";

            if (isServicesItem) {
              return (
                <div key={item.href} className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <Link
                      href="/services"
                      className={`flex-1 text-base font-heading font-bold px-5 py-3.5 rounded-2xl transition-all duration-200 ${
                        isActive
                          ? "nm-gold-raised text-charcoal"
                          : "nm-interactive text-charcoal hover:text-gold-dark"
                      }`}
                      onClick={onClose}
                    >
                      Services
                    </Link>
                    <button
                      type="button"
                      onClick={() => setServicesExpanded(!servicesExpanded)}
                      className="w-12 h-12 rounded-2xl nm-interactive flex items-center justify-center text-charcoal hover:text-gold"
                      aria-label="Toggle services list"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={`transition-transform duration-250 ${servicesExpanded ? "rotate-180 text-gold" : ""}`}
                      >
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </button>
                  </div>

                  {servicesExpanded && (
                    <div className="nm-inset rounded-2xl p-3 flex flex-col gap-2.5">
                      {/* Category Chips */}
                      <div className="flex flex-wrap gap-1.5 pb-2 border-b border-border/60">
                        {serviceCategories.map((cat) => (
                          <button
                            key={cat.id}
                            type="button"
                            onClick={() => setMobileCategory(cat.id)}
                            className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${
                              mobileCategory === cat.id
                                ? "nm-gold-raised text-charcoal"
                                : "text-concrete hover:text-charcoal"
                            }`}
                          >
                            {cat.shortLabel}
                          </button>
                        ))}
                      </div>

                      {/* Service Items for Active Mobile Category */}
                      <div className="flex flex-col gap-1.5 max-h-56 overflow-y-auto pr-1">
                        {services
                          .filter((s) =>
                            (serviceCategories.find((c) => c.id === mobileCategory) || serviceCategories[0]).slugs.includes(s.slug)
                          )
                          .map((s) => (
                            <button
                              key={s.slug}
                              type="button"
                              onClick={() => {
                                onClose();
                                onServiceSelect?.(s);
                              }}
                              className="px-3 py-2 rounded-xl text-xs font-semibold text-charcoal hover:text-gold-dark hover:bg-white/60 flex items-center justify-between transition-colors text-left w-full"
                            >
                              <span className="truncate">{s.title}</span>
                              <span className="text-[9px] font-bold text-gold uppercase ml-2 flex-shrink-0">
                                View →
                              </span>
                            </button>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-base font-heading font-bold px-5 py-3.5 rounded-2xl transition-all duration-200 ${
                  isActive
                    ? "nm-gold-raised text-charcoal"
                    : "nm-interactive text-charcoal hover:text-gold-dark"
                }`}
                onClick={onClose}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="p-6 border-t border-border/70 bg-[var(--ng-bg)]">
          <Button
            href="/contact"
            variant="secondary"
            className="w-full"
            onClick={onClose}
          >
            Book Consultation
          </Button>
        </div>
      </nav>
    </div>
  );
}
