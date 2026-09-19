import Link from "next/link";
import { company } from "@/data/company";
import { footerNavItems, footerServiceLinks, footerLocationLinks, footerServiceAreaLinks } from "@/data/navigation";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-linen text-charcoal relative overflow-hidden border-t border-border">
      {/* Blueprint grid subtle texture */}
      <div className="absolute inset-0 blueprint-grid opacity-10" />
      {/* Gold top rule */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />

      <div className="container relative z-10 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">

          {/* Brand (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="inline-flex items-center gap-3.5 group text-charcoal select-none">
              <img src="/images/logo.svg" alt="Prasanth Associates Logo" className="w-9 h-9 object-contain group-hover:scale-105 transition-transform duration-300 filter drop-shadow-[0_2px_4px_rgba(11,30,61,0.20)]" />
              <div className="flex flex-col leading-tight">
                <div className="flex items-center gap-1.5 font-heading">
                  <span className="font-bold text-xl text-charcoal tracking-tight">Prasanth</span>
                  <span className="font-bold text-xl text-charcoal tracking-tight">Associates</span>
                </div>
                <span className="mt-1 text-[10px] font-semibold text-gold-dark/85 tracking-[0.1em] uppercase">
                  {company.disciplines}
                </span>
              </div>
            </Link>
            <p className="text-concrete leading-relaxed text-sm max-w-xs">
              {company.description}
            </p>
            {/* Social icons */}
            <div className="flex gap-3 pt-2">
              {Object.entries(company.social).map(([platform, url]) => (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-full bg-white border border-border shadow-xs flex items-center justify-center text-charcoal hover:bg-charcoal hover:text-white transition-all duration-300 text-xs font-bold"
                  aria-label={`Visit our ${platform} page`}
                >
                  {platform.slice(0, 2).toUpperCase()}
                </a>
              ))}
            </div>

            {/* Quick Location Badges */}
            <div className="pt-2">
              <h5 className="text-[11px] font-bold text-gold-dark tracking-widest uppercase mb-2">Regional Offices</h5>
              <div className="flex flex-col gap-1.5">
                {footerLocationLinks.map((loc) => (
                  <Link
                    key={loc.label}
                    href={loc.href}
                    className="text-xs text-charcoal/80 hover:text-gold-dark font-medium flex items-center gap-1.5 transition-colors"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block" />
                    <span>{loc.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Areas served without a local office */}
            <div className="pt-2">
              <h5 className="text-[11px] font-bold text-gold-dark tracking-widest uppercase mb-2">Areas We Serve</h5>
              <div className="flex flex-col gap-1.5">
                {footerServiceAreaLinks.map((area) => (
                  <Link
                    key={area.label}
                    href={area.href}
                    className="text-xs text-charcoal/80 hover:text-gold-dark font-medium flex items-center gap-1.5 transition-colors"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block" />
                    <span>{area.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-5">
            <h4 className="font-heading text-sm font-bold text-gold-dark tracking-widest uppercase">
              Company
            </h4>
            <ul className="space-y-3">
              {footerNavItems.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-concrete hover:text-gold-dark transition-colors text-sm font-medium"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services (3 cols) */}
          <div className="lg:col-span-3 space-y-5">
            <h4 className="font-heading text-sm font-bold text-gold-dark tracking-widest uppercase">
              Services
            </h4>
            <ul className="space-y-3">
              {footerServiceLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-concrete hover:text-gold-dark transition-colors text-sm font-medium"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact (3 cols) */}
          <div className="lg:col-span-3 space-y-5">
            <h4 className="font-heading text-sm font-bold text-gold-dark tracking-widest uppercase">
              Contact
            </h4>
            <ul className="space-y-5">
              <li className="flex items-start gap-3.5">
                <span className="w-9 h-9 rounded-xl bg-white border border-border shadow-2xs flex items-center justify-center flex-shrink-0">
                  <Phone size={14} className="text-gold-dark" />
                </span>
                <a href={`tel:${company.phone}`} className="text-charcoal hover:text-gold-dark text-sm transition-colors mt-1.5 font-medium">
                  {company.phone}
                </a>
              </li>
              <li className="flex items-start gap-3.5">
                <span className="w-9 h-9 rounded-xl bg-white border border-border shadow-2xs flex items-center justify-center flex-shrink-0">
                  <Mail size={14} className="text-gold-dark" />
                </span>
                <a href={`mailto:${company.email}`} className="text-charcoal hover:text-gold-dark text-sm transition-colors mt-1.5 font-medium break-all">
                  {company.email}
                </a>
              </li>
              <li className="flex items-start gap-3.5">
                <span className="w-9 h-9 rounded-xl bg-white border border-border shadow-2xs flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin size={14} className="text-gold-dark" />
                </span>
                <p className="text-charcoal text-sm leading-relaxed font-medium">
                  {company.address.street}<br />
                  {company.address.city}, {company.address.state} {company.address.pincode}
                </p>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-concrete-light">
            &copy; {currentYear} {company.name}. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-concrete-light">
            <Link href="/privacy" className="hover:text-charcoal transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-charcoal transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
