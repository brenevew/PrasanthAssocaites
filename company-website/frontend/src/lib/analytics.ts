/**
 * Lightweight analytics abstraction.
 * Logs events to console in development.
 * Replace the implementation with your analytics provider (GA4, Mixpanel, etc.)
 */

type EventName =
  | "cta_click"
  | "form_submit"
  | "page_view"
  | "project_view"
  | "service_view"
  | "filter_change";

interface EventProperties {
  category?: string;
  label?: string;
  value?: string;
  page?: string;
  [key: string]: string | number | boolean | undefined;
}

export function trackEvent(name: EventName, properties?: EventProperties): void {
  if (process.env.NODE_ENV === "development") {
    console.log(`[Analytics] ${name}`, properties);
  }

  // TODO: Wire to your analytics provider
  // Example for GA4:
  // if (typeof window !== 'undefined' && window.gtag) {
  //   window.gtag('event', name, properties);
  // }
}
