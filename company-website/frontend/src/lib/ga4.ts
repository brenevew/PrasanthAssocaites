import { serviceCategories } from "@/data/serviceCategories";
import { services } from "@/data/services";

/**
 * Google Analytics 4 bridge for the local tracking hooks in `analytics.ts`.
 *
 * The hooks already strip personal data (names, phones, emails, messages,
 * addresses, query strings). This module maps their sanitized events onto GA4
 * names and an explicit parameter allowlist, so nothing else can reach Google.
 *
 * Set NEXT_PUBLIC_GA_MEASUREMENT_ID to enable it (build and runtime on
 * Cloudflare). Without it the server renders no tag, so nothing is sent.
 */

const rawId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() ?? "";
export const GA_MEASUREMENT_ID = /^G-[A-Z0-9]+$/.test(rawId) ? rawId : "";
export const GA_DEBUG = process.env.NEXT_PUBLIC_GA_DEBUG === "true";

/**
 * Consent Mode v2: analytics storage is denied by default for visitors in the
 * EEA, UK and Switzerland (where prior cookie consent is required) and granted
 * elsewhere. Advertising storage is denied everywhere; the site runs no ads.
 * Denied regions still send cookieless pings that GA4 can model.
 */
export const CONSENT_DENIED_REGIONS = [
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", "HU",
  "IE", "IT", "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK", "SI", "ES",
  "SE", "IS", "LI", "NO", "GB", "CH",
];

/** Local hook properties as produced by `trackLeadEvent`. */
interface HookProperties {
  page?: string;
  landing_page?: string;
  service?: string;
  sector?: string;
  location?: string;
  form?: string;
  [key: string]: string | number | boolean | undefined;
}

type Ga4Params = Record<string, string>;

const serviceTitles = new Map(services.map((service) => [service.slug, service.title]));
const sectorLabels = new Map(serviceCategories.map((category) => [category.id, category.label]));

/** Region implied by a location page, used when no location was entered. */
const pageRegions: Record<string, string> = {
  "/locations/coimbatore": "coimbatore",
  "/locations/nilgiris-ooty": "nilgiris",
  "/locations/gudalur": "gudalur",
  "/services/turnkey-design-build-coimbatore": "coimbatore",
};

/**
 * Hook event -> GA4 event name. `page_view` is intentionally absent: GA4 sends
 * the first page view itself and counts in-site navigation through Enhanced
 * Measurement, so forwarding it would double count.
 */
const EVENT_MAP: Record<string, string> = {
  service_view: "service_view",
  service_select: "service_select",
  whatsapp_click: "whatsapp_click",
  phone_click: "phone_click",
  // GA4's recommended lead event. The hooks fire these only after the server
  // confirms a successful submission.
  quote_submit: "generate_lead",
  form_submit: "generate_lead",
};

/**
 * Pure mapping from a sanitized hook event to a GA4 event, or null when the
 * event should not be sent. Only the parameters built here ever reach GA4.
 */
export function toGa4Event(
  name: string,
  properties: HookProperties = {},
  origin = ""
): { name: string; params: Ga4Params } | null {
  const gaName = EVENT_MAP[name];
  if (!gaName) return null;

  const params: Ga4Params = {};
  const serviceName = properties.service ? serviceTitles.get(properties.service) : undefined;
  const sectorName = properties.sector ? sectorLabels.get(properties.sector) : undefined;
  const location = properties.location || (properties.page ? pageRegions[properties.page] : undefined);

  if (serviceName) params.service_name = serviceName;
  if (sectorName) params.service_sector = sectorName;
  if (location) params.service_location = location;
  // page/landing_page are allowlisted paths ("/other" for anything else); no query or hash.
  if (properties.page) params.page_location = `${origin}${properties.page}`;
  if (properties.landing_page) params.landing_page = properties.landing_page;
  if (gaName === "generate_lead" && properties.form) params.form_type = properties.form;
  return { name: gaName, params };
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Sends a sanitized hook event to GA4. Never throws.
 *
 * Deliberately checks for window.gtag rather than GA_MEASUREMENT_ID: the server
 * renders the gtag bootstrap only when an ID is configured, while the browser
 * bundle may not have the ID inlined (e.g. it was a runtime-only variable on
 * Cloudflare). Checking the ID here silently dropped every custom event live.
 */
export function sendToGa4(name: string, properties?: HookProperties): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  try {
    const event = toGa4Event(name, properties, window.location.origin);
    if (event) window.gtag("event", event.name, event.params);
  } catch {
    // Measurement must never interrupt the page.
  }
}

/** Inline bootstrap: consent defaults first, then the GA4 config. */
export function ga4BootstrapScript(): string {
  const config: Record<string, unknown> = {
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  };
  if (GA_DEBUG) config.debug_mode = true;
  return [
    "window.dataLayer=window.dataLayer||[];",
    "function gtag(){dataLayer.push(arguments);}",
    "window.gtag=gtag;",
    "gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'granted'});",
    `gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',region:${JSON.stringify(CONSENT_DENIED_REGIONS)}});`,
    "gtag('js',new Date());",
    `gtag('config',${JSON.stringify(GA_MEASUREMENT_ID)},${JSON.stringify(config)});`,
  ].join("");
}
