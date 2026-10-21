"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { serviceForPath, trackLeadEvent } from "@/lib/analytics";

/** No rendered elements. One delegated listener covers existing telephone/WhatsApp links. */
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
    };
    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, []);

  return null;
}
