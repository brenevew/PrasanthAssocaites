"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronDown, ChevronRight, ArrowRight, Sparkles, Calculator,
  Home, Building2, Building, Key, Factory, Cpu, Hammer, ClipboardList,
  Compass, Palette, Trees, Landmark, ShieldCheck, FileCheck,
  MapPin, Map, TrendingUp, LayoutDashboard
} from "lucide-react";
import { company } from "@/data/company";
import { mainNavItems } from "@/data/navigation";
import { serviceCategories, plannableSlugs, designSlugs } from "@/data/serviceCategories";
import { Service, services } from "@/data/services";
import ServiceDetailModal from "@/components/ui/ServiceDetailModal";
import MobileNav from "./MobileNav";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }>> = {
  Home, Building2, Building, Key, Factory, Cpu, Hammer, ClipboardList,
  Compass, Palette, Trees, Landmark, ShieldCheck, Calculator, FileCheck,
  MapPin, Map, TrendingUp, LayoutDashboard,
};

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState("construction");
  const [selectedServiceModal, setSelectedServiceModal] = useState<Service | null>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 25);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on route changes
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setIsServicesOpen(false);
  }

  const handleMouseEnterServices = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setIsServicesOpen(true);
  };

  const handleMouseLeaveServices = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsServicesOpen(false);
    }, 200);
  };

  const currentCategory = serviceCategories.find((c) => c.id === hoveredCategory) || serviceCategories[0];
  const currentServices = services.filter((s) => currentCategory.slugs.includes(s.slug));

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-400 ${
          isScrolled ? "py-2.5" : "py-4"
        }`}
      >
        <div className="container">
          <div
            className={`transition-all duration-400 rounded-full flex items-center justify-between px-5 md:px-6 py-3 border ${
                isScrolled
                  ? "bg-white/95 backdrop-blur-xl border-border shadow-[0_10px_35px_rgba(40,35,30,0.08)]"
                  : "bg-white/90 backdrop-blur-lg border-white/80 shadow-[0_8px_30px_rgba(40,35,30,0.05)]"
              }`}
          >
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-3.5 text-charcoal group flex-shrink-0 select-none"
            >
              <img
                src="/images/logo.svg"
                alt="Prasanth Associates Logo"
                className="w-8 h-8 md:w-9 md:h-9 object-contain group-hover:scale-105 transition-transform duration-300 filter drop-shadow-[0_2px_4px_rgba(11,30,61,0.20)]"
              />
              <div className="flex flex-col leading-tight">
                <div className="flex items-center gap-1.5">
                  <span className="font-heading font-bold text-xl text-charcoal tracking-tight">
                    Prasanth
                  </span>
                  <span className="font-heading font-bold text-xl text-charcoal tracking-tight">
                    Associates
                  </span>
                </div>
                <span className="hidden sm:block mt-0.5 text-[9px] md:text-[10px] font-semibold text-gold-dark/85 tracking-[0.1em] uppercase whitespace-nowrap">
                  {company.disciplines}
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-4">
              <ul className="flex items-center gap-1 p-1 rounded-full bg-linen border border-border shadow-inner">
                {mainNavItems.map((item) => {
                  const isActive = pathname === item.href;
                  const isServicesItem = item.href === "/services";

                  return (
                    <li
                      key={item.href}
                      className="relative"
                      onMouseEnter={isServicesItem ? handleMouseEnterServices : undefined}
                      onMouseLeave={isServicesItem ? handleMouseLeaveServices : undefined}
                    >
                      <Link
                        href={item.href}
                        className={`relative text-[11px] font-semibold tracking-widest uppercase px-4 py-2 rounded-full transition-all duration-250 inline-flex items-center gap-1.5 ${
                          isActive
                            ? "bg-[#1A1714] text-white font-bold shadow-sm"
                            : isServicesItem && isServicesOpen
                            ? "bg-white text-charcoal font-bold shadow-2xs"
                            : item.href === "/plan-home"
                            ? "text-gold-dark font-bold hover:bg-white/80 hover:text-gold"
                            : "text-slate hover:text-charcoal hover:bg-white/80"
                        }`}
                      >
                        <span>{item.label}</span>
                        {isServicesItem && (
                          <ChevronDown
                            size={12}
                            className={`transition-transform duration-250 ${
                              isServicesOpen ? "rotate-180 text-gold-dark" : "text-slate-light"
                            }`}
                          />
                        )}
                      </Link>

                      {/* Mega Menu Dropdown on Hover */}
                      {isServicesItem && isServicesOpen && (
                        <div
                          className="absolute top-full left-1/2 -translate-x-[260px] pt-3 z-50 w-[840px] max-w-[calc(100vw-40px)]"
                          onMouseEnter={handleMouseEnterServices}
                          onMouseLeave={handleMouseLeaveServices}
                        >
                          {/* Light Combination Dropdown Container */}
                          <div className="bg-white border border-[#EAE5DD] rounded-3xl p-5 shadow-[0_25px_70px_rgba(40,35,30,0.14)] relative overflow-hidden text-left">
                            {/* Subtle Ambient Warm Glow */}
                            <div
                              className="absolute top-0 right-0 w-80 h-80 rounded-full bg-gold/10 blur-3xl pointer-events-none"
                            />

                            <div className="grid grid-cols-12 gap-5 relative z-10">
                              {/* Left Column: Initial Set of Category Tabs */}
                              <div className="col-span-4 bg-linen rounded-2xl p-2.5 flex flex-col gap-1.5 border border-[#EAE5DD] shadow-inner">
                                <div className="px-3 py-1.5 mb-1 flex items-center justify-between border-b border-[#EAE5DD] pb-2">
                                  <span className="text-[11px] font-bold uppercase tracking-widest text-gold-dark">
                                    Categories
                                  </span>
                                  <span className="text-[10px] font-bold text-slate-light">4 Sectors</span>
                                </div>

                                {serviceCategories.map((cat) => {
                                  const isCatActive = hoveredCategory === cat.id;
                                  const CatIcon = iconMap[cat.iconName] || Hammer;
                                  return (
                                    <button
                                      key={cat.id}
                                      type="button"
                                      onMouseEnter={() => setHoveredCategory(cat.id)}
                                      onClick={() => setHoveredCategory(cat.id)}
                                      className={`w-full text-left px-3.5 py-3 rounded-xl transition-all duration-200 flex items-center justify-between group cursor-pointer ${
                                        isCatActive
                                          ? "bg-[#1A1714] text-white font-bold shadow-md scale-[1.01]"
                                          : "text-charcoal hover:text-charcoal hover:bg-white/80"
                                      }`}
                                    >
                                      <div className="flex items-center gap-3 min-w-0">
                                        <div
                                          className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                                            isCatActive
                                              ? "bg-white/15 text-white"
                                              : "bg-white text-slate group-hover:text-gold-dark shadow-2xs"
                                          }`}
                                        >
                                          <CatIcon size={16} />
                                        </div>
                                        <div className="min-w-0">
                                          <div className={`text-xs font-bold truncate leading-snug ${isCatActive ? "text-white" : "text-charcoal"}`}>
                                            {cat.label}
                                          </div>
                                          <div
                                            className={`text-[10px] truncate ${
                                              isCatActive ? "text-white/80 font-medium" : "text-slate-light"
                                            }`}
                                          >
                                            {cat.badge}
                                          </div>
                                        </div>
                                      </div>
                                      <ChevronRight
                                        size={14}
                                        className={`transition-transform flex-shrink-0 ${
                                          isCatActive
                                            ? "text-white translate-x-0.5"
                                            : "text-slate-light group-hover:text-charcoal"
                                        }`}
                                      />
                                    </button>
                                  );
                                })}

                                <div className="mt-auto pt-3 px-3 pb-1 border-t border-[#EAE5DD]">
                                  <p className="text-[10px] text-slate-light leading-relaxed">
                                    Hover any category to view full technical services.
                                  </p>
                                </div>
                              </div>

                              {/* Right Column: Detailed Tabs/Services */}
                              <div className="col-span-8 flex flex-col justify-between">
                                <div>
                                  {/* Category Header with Browse All link */}
                                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#EAE5DD]">
                                    <div>
                                      <h4 className="text-sm font-heading font-bold text-charcoal flex items-center gap-2">
                                        <span>{currentCategory?.label}</span>
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-gold-dark bg-[#FAF6EE] border border-[#EBDCC5] px-2 py-0.5 rounded-full">
                                          {currentCategory?.badge}
                                        </span>
                                      </h4>
                                      <p className="text-xs text-concrete line-clamp-1 mt-0.5">
                                        {currentCategory?.description}
                                      </p>
                                    </div>
                                    <Link
                                      href={`/services#${currentCategory?.id}`}
                                      onClick={() => setIsServicesOpen(false)}
                                      className="text-xs font-bold text-gold-dark hover:text-gold transition-colors flex items-center gap-1 flex-shrink-0 group"
                                    >
                                      <span>Browse All</span>
                                      <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                                    </Link>
                                  </div>

                                  {/* Detailed Services Grid: Crawlable Links for Search Engines & Instant Navigation */}
                                  <div className="grid grid-cols-2 gap-2.5 max-h-[350px] overflow-y-auto pr-1">
                                    {currentServices.map((svc) => {
                                      const SvcIcon = iconMap[svc.icon] || Building2;

                                      return (
                                        <Link
                                          key={svc.slug}
                                          href={`/services#${svc.slug}`}
                                          onClick={() => setIsServicesOpen(false)}
                                          className="p-3 rounded-xl border border-[#EAE5DD] bg-white hover:bg-[#FAF8F5] hover:border-gold transition-all duration-200 group flex items-start gap-3 shadow-xs hover:shadow-md text-left cursor-pointer w-full"
                                        >
                                          <div className="w-8 h-8 rounded-lg bg-[#FAF6EE] border border-[#EBDCC5] text-gold-dark flex items-center justify-center flex-shrink-0 group-hover:bg-[#1A1714] group-hover:text-white transition-all">
                                            <SvcIcon size={16} />
                                          </div>
                                          <div className="min-w-0 flex-1">
                                            <div className="text-xs font-bold text-charcoal group-hover:text-gold-dark transition-colors leading-snug">
                                              {svc.title}
                                            </div>
                                            <div className="text-[11px] text-concrete line-clamp-2 mt-0.5 leading-relaxed group-hover:text-charcoal">
                                              {svc.shortDescription}
                                            </div>
                                            <div className="flex items-center gap-1 mt-2 text-[10px] font-semibold text-gold-dark/80 group-hover:text-gold-dark transition-colors">
                                              <span>View Details &amp; Quote</span>
                                              <ArrowRight size={11} className="group-hover:translate-x-1 transition-transform" />
                                            </div>
                                          </div>
                                        </Link>
                                      );
                                    })}
                                  </div>
                                </div>

                                {/* Bottom Info & Browse All Bar */}
                                <div className="mt-3 pt-3 border-t border-[#EAE5DD] flex items-center justify-between">
                                  <div className="flex items-center gap-1.5 text-xs text-concrete">
                                    <Sparkles size={12} className="text-gold-dark" />
                                    <span>Click any service to view full specifications, quote &amp; building planner</span>
                                  </div>
                                  <Link
                                    href="/services"
                                    onClick={() => setIsServicesOpen(false)}
                                    className="text-xs font-bold text-gold-dark hover:text-gold transition-colors flex items-center gap-1.5 group"
                                  >
                                    <span>Browse All Services</span>
                                    <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Mobile Hamburger */}
            <button
              className="lg:hidden w-11 h-11 rounded-full bg-white border border-border shadow-xs flex items-center justify-center text-charcoal hover:text-gold-dark transition-colors focus:outline-none"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="8" x2="21" y2="8" />
                <line x1="3" y1="16" x2="21" y2="16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <MobileNav isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      {/* Detailed Service Card Modal: Opened when selecting any card */}
      <ServiceDetailModal
        service={selectedServiceModal}
        isOpen={selectedServiceModal !== null}
        onClose={() => setSelectedServiceModal(null)}
      />
    </>
  );
}


