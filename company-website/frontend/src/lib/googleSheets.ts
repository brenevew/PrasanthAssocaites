/**
 * Google Sheets Integration Utility
 *
 * Dispatches form submissions directly to a Google Sheet via a Google Apps
 * Script Web App. Requires zero paid third-party dependencies (no Zapier,
 * Make, etc.).
 *
 * Setup is documented end-to-end in /GOOGLE_SHEETS_DEPLOYMENT.md.
 * Server-side environment variables:
 *   GOOGLE_SHEETS_WEBHOOK_URL     — the deployed Apps Script /exec URL (required)
 *   GOOGLE_SHEETS_SHARED_SECRET   — token the script checks before writing (recommended)
 */

import { formatAttachmentsForSheet, type Attachment } from "@/lib/attachments";

export type FormType = "Contact Us" | "Request Quote" | "Building Planner" | "Quick Inquiry";

export const FORM_TYPES: FormType[] = [
  "Contact Us",
  "Request Quote",
  "Building Planner",
  "Quick Inquiry",
];

export interface GoogleSheetSubmission {
  formType: FormType;
  refCode?: string;
  name: string;
  phone: string;
  email?: string;
  projectType?: string;
  location?: string;
  estimatedBudget?: string | number;
  details?: string;
  /** Drive links for files the client attached to the form. */
  attachments?: Attachment[];
  submittedAt?: string;
}

export interface GoogleSheetResult {
  success: boolean;
  /** True when the webhook is not configured, as opposed to a genuine failure. */
  skipped?: boolean;
  error?: string;
}

const REQUEST_TIMEOUT_MS = 10_000;
const MAX_ATTEMPTS = 2;

function formatCurrency(value: string | number | undefined): string {
  if (value === undefined || value === null || value === "") return "N/A";
  if (typeof value === "number") {
    if (!Number.isFinite(value)) return "N/A";
    return `₹ ${value.toLocaleString("en-IN")}`;
  }
  // Strings arrive pre-formatted from the budget dropdowns (e.g. "₹ 25–40 Lakhs").
  return value;
}

export async function sendToGoogleSheet(data: GoogleSheetSubmission): Promise<GoogleSheetResult> {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

  if (!webhookUrl) {
    console.info(
      "[GoogleSheets] GOOGLE_SHEETS_WEBHOOK_URL is not set — submission was not synced to the Sheet. " +
        "See GOOGLE_SHEETS_DEPLOYMENT.md to configure it."
    );
    return { success: false, skipped: true, error: "GOOGLE_SHEETS_WEBHOOK_URL not configured" };
  }

  const payload = {
    token: process.env.GOOGLE_SHEETS_SHARED_SECRET || "",
    timestamp:
      data.submittedAt || new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
    formType: data.formType,
    refCode: data.refCode || "N/A",
    name: data.name || "N/A",
    phone: data.phone || "N/A",
    email: data.email || "N/A",
    projectType: data.projectType || "N/A",
    location: data.location || "N/A",
    estimatedCost: formatCurrency(data.estimatedBudget),
    details: data.details || "N/A",
    attachments: formatAttachmentsForSheet(data.attachments) || "N/A",
    attachmentCount: data.attachments?.length || 0,
  };

  let lastError = "Unknown error";

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      // Apps Script answers with a 302 to script.googleusercontent.com;
      // fetch follows that redirect automatically.
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
        cache: "no-store",
      });

      if (!response.ok) {
        lastError = `HTTP ${response.status}`;
        console.warn(
          `[GoogleSheets] Webhook responded ${response.status} (attempt ${attempt}/${MAX_ATTEMPTS}) for ${data.formType}`
        );
      } else {
        // The script reports application-level failures (e.g. a bad token) in the body.
        const body = await response.text();
        if (body.includes('"status":"error"') || body.includes('"status":"unauthorized"')) {
          console.error(`[GoogleSheets] Apps Script rejected the submission: ${body.slice(0, 300)}`);
          return { success: false, error: `Apps Script error: ${body.slice(0, 200)}` };
        }
        return { success: true };
      }
    } catch (err: unknown) {
      lastError = err instanceof Error ? err.message : String(err);
      console.warn(
        `[GoogleSheets] Sync attempt ${attempt}/${MAX_ATTEMPTS} failed for ${data.formType}: ${lastError}`
      );
    }

    if (attempt < MAX_ATTEMPTS) {
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  }

  console.error(
    `[GoogleSheets] Giving up after ${MAX_ATTEMPTS} attempts. ${data.formType} / ${data.refCode || "no-ref"} was NOT written to the Sheet: ${lastError}`
  );
  return { success: false, error: lastError };
}
