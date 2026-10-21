import { serviceCategories } from "@/data/serviceCategories";
import { getServicePath } from "@/data/serviceRoutes";
import { sendToGa4 } from "@/lib/ga4";

/** Sanitized event hooks. Forwarded to GA4 (see ga4.ts) only when a Measurement ID is configured. */
export type EventName =
  | "cta_click" | "form_submit" | "page_view" | "project_view"
  | "service_view" | "filter_change" | "service_select"
  | "quote_submit" | "whatsapp_click" | "phone_click";

interface EventProperties {
  category?: string;
  label?: string;
  value?: string;
  page?: string;
  [key: string]: string | number | boolean | undefined;
}

const slugs = serviceCategories.flatMap((category) => category.slugs);
const publicPaths = new Set([
  "/", "/services", "/projects", "/about", "/contact", "/request-quote",
  "/plan-home", "/property-investment", "/locations/coimbatore",
  "/locations/nilgiris-ooty", "/locations/gudalur", ...slugs.map(getServicePath),
]);
let landingPage: string | undefined;

export function safePagePath(pathname: string): string {
  return publicPaths.has(pathname) ? pathname : "/other";
}

export function serviceForPath(pathname: string): string | undefined {
  return slugs.find((slug) => getServicePath(slug) === pathname);
}

/** Free-text locations may contain addresses; expose only a known town/district. */
export function coarseLocation(value?: string): string | undefined {
  const locations = ["coimbatore", "ooty", "coonoor", "kotagiri", "gudalur", "nilgiris", "mettupalayam"];
  return locations.find((location) => new RegExp(`\\b${location}\\b`, "i").test(value || ""));
}

export function trackEvent(name: EventName, properties?: EventProperties): void {
  if (process.env.NODE_ENV === "development") console.log(`[Analytics] ${name}`, properties);
  if (typeof window !== "undefined") {
    sendToGa4(name, properties);
    window.dispatchEvent(new CustomEvent("prasanth:analytics", { detail: { name, properties } }));
  }
}

/** All lead instrumentation goes through this allowlist, never through raw form data. */
export function trackLeadEvent(
  name: EventName,
  context: { service?: string; location?: string; form?: "contact" | "quote" | "planner" } = {}
): void {
  if (typeof window === "undefined") return;
  try {
    const page = safePagePath(window.location.pathname);
    landingPage ??= page;
    const queryService = new URLSearchParams(window.location.search).get("service") || undefined;
    const candidate = context.service || serviceForPath(page) || queryService;
    const service = candidate && slugs.includes(candidate) ? candidate : undefined;
    const location = coarseLocation(context.location);
    trackEvent(name, {
      page,
      landing_page: landingPage,
      service,
      sector: serviceCategories.find((category) => category.slugs.includes(service || ""))?.id,
      location,
      form: context.form,
    });
  } catch {
    // Measurement must never interrupt a successful enquiry or navigation.
  }
}
