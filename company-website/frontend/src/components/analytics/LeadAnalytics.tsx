"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { serviceForPath, trackLeadEvent } from "@/lib/analytics";

/** No rendered elements. One delegated listener covers existing telephone, WhatsApp, directions and quote links. */
export default function LeadAnalytics() {
  const pathname = usePathname();
  const lastPath = useRef<string | null>(null);

  useEffect(() => {
    if (lastPath.current === pathname) return;
    lastPath.current = pathname;
    trackLeadEvent(serviceForPath(pathname) ? "service_view" : "page_view");
  }, [pathname]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const link = event.target instanceof Element ? event.target.closest("a[href]") : null;
      if (!(link instanceof HTMLAnchorElement)) return;
      if (link.protocol === "tel:") trackLeadEvent("phone_click");
      else if (link.hostname === "wa.me" || link.hostname === "api.whatsapp.com") trackLeadEvent("whatsapp_click");
      else if (/(^|\.)google\.[a-z.]+$/.test(link.hostname) && link.pathname.startsWith("/maps")) trackLeadEvent("directions_click");
      else if (link.hostname === window.location.hostname
        && (link.pathname === "/request-quote" || ((link.hash === "#enquiry" || link.hash === "#quote") && link.pathname === window.location.pathname))) {
        trackLeadEvent("quote_cta_click");
      }
    };
    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, []);

  return null;
}
