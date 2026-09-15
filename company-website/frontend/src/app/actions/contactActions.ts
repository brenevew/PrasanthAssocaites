"use server";

import { sendToGoogleSheet } from "@/lib/googleSheets";
import { generateRefCode, saveSubmission } from "@/lib/db";
import type { Attachment } from "@/lib/attachments";
import { rateLimit, getClientIpFromHeaders } from "@/lib/rateLimit";

const LEAD_FORM_LIMIT = 5;
const LEAD_FORM_WINDOW_MS = 10 * 60 * 1000;

export interface ActionResult {
  success: boolean;
  message: string;
  refCode?: string;
  data?: unknown;
  errors?: Record<string, string>;
}

export async function submitContactForm(formData: FormData): Promise<ActionResult> {
  try {
    const ip = await getClientIpFromHeaders();
    const limitResult = rateLimit(`contact-form:${ip}`, LEAD_FORM_LIMIT, LEAD_FORM_WINDOW_MS);
    if (!limitResult.success) {
      return {
        success: false,
        message: `Too many submissions from this device. Please try again in ${Math.ceil(limitResult.retryAfterSeconds / 60)} minute(s).`,
      };
    }

    const name = formData.get("name")?.toString().trim();
    const phone = formData.get("phone")?.toString().trim();
    const email = formData.get("email")?.toString().trim();
    const projectType = formData.get("projectType")?.toString().trim();
    const location = formData.get("location")?.toString().trim();
    const message = formData.get("message")?.toString().trim();
    const isEstimate = formData.get("isEstimate") === "true";
    const budget = formData.get("budget")?.toString().trim();
    const timeline = formData.get("timeline")?.toString().trim();

    // Files were already uploaded to Drive by /api/upload; the form carries
    // only their URLs, which keeps this action well under the 1MB body limit.
    let attachments: Attachment[] = [];
    const rawAttachments = formData.get("attachments")?.toString();
    if (rawAttachments) {
      try {
        const parsed = JSON.parse(rawAttachments);
        if (Array.isArray(parsed)) {
          attachments = parsed
            .filter((a) => a && typeof a.url === "string" && typeof a.name === "string")
            .slice(0, 10);
        }
      } catch {
        console.warn("[contact] Ignoring malformed attachments field.");
      }
    }

    // Validation
    const errors: Record<string, string> = {};
    if (!name || name.length < 2) {
      errors.name = "Full name is required (at least 2 characters).";
    }
    if (!phone || phone.length < 8) {
      errors.phone = "Valid phone number is required.";
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Please enter a valid email address.";
    }
    if (!projectType) {
      errors.projectType = "Please select a project type.";
    }
    if (!location) {
      errors.location = "Project location is required.";
    }

    if (Object.keys(errors).length > 0) {
      return {
        success: false,
        message: "Please fix the highlighted errors.",
        errors,
      };
    }

    const payload = {
      type: isEstimate ? ("estimate" as const) : ("contact" as const),
      name: name!,
      phone: phone!,
      email: email || undefined,
      projectType: projectType!,
      location: location!,
      message: message || undefined,
      budget: budget || undefined,
      timeline: timeline || undefined,
    };

    const refCode = generateRefCode();

    // ── Sync to Google Sheet (the system of record) ──
    const detailsArray = [
      message ? `Message: ${message}` : null,
      timeline ? `Timeline: ${timeline}` : null,
      budget ? `Budget: ${budget}` : null,
    ].filter(Boolean);

    const sheetResult = await sendToGoogleSheet({
      formType: isEstimate ? "Request Quote" : "Contact Us",
      refCode,
      name: name!,
      phone: phone!,
      email: email || undefined,
      projectType: projectType!,
      location: location!,
      estimatedBudget: budget || undefined,
      details: detailsArray.join(" | ") || undefined,
      attachments,
    });

    if (!sheetResult.success) {
      // The lead is never dropped silently: it stays in the server logs with its
      // ref code so it can be reconciled into the Sheet by hand.
      console.error(
        `[contact] Google Sheets sync failed for ${refCode} (${payload.type}). Lead payload:`,
        JSON.stringify({ refCode, ...payload })
      );
    }

    // Mirror to the local dev store (best-effort; a no-op in production).
    const savedRecord = saveSubmission(payload, refCode);

    return {
      success: true,
      message: "Thank you! Your request has been logged successfully.",
      refCode,
      data: savedRecord,
    };
  } catch (error) {
    console.error("Contact form error:", error);
    return {
      success: false,
      message: "An error occurred while submitting your request. Please try again.",
    };
  }
}

export async function submitCalculatedEstimate(estimateData: {
  name: string;
  phone: string;
  email?: string;
  location: string;
  projectType: string;
  builtUpAreaSqFt: number;
  packageType: string;
  addons: string[];
  estimatedTotal: number;
  attachments?: Attachment[];
}): Promise<ActionResult> {
  try {
    const ip = await getClientIpFromHeaders();
    const limitResult = rateLimit(`estimate-form:${ip}`, LEAD_FORM_LIMIT, LEAD_FORM_WINDOW_MS);
    if (!limitResult.success) {
      return {
        success: false,
        message: `Too many submissions from this device. Please try again in ${Math.ceil(limitResult.retryAfterSeconds / 60)} minute(s).`,
      };
    }

    if (!estimateData.name || !estimateData.phone || !estimateData.location) {
      return {
        success: false,
        message: "Name, phone number, and location are required.",
      };
    }

    const payload = {
      type: "estimate" as const,
      name: estimateData.name,
      phone: estimateData.phone,
      email: estimateData.email,
      projectType: estimateData.projectType,
      location: estimateData.location,
      budget: `₹ ${estimateData.estimatedTotal.toLocaleString()}`,
      calculatedEstimate: {
        builtUpAreaSqFt: estimateData.builtUpAreaSqFt,
        packageType: estimateData.packageType,
        addons: estimateData.addons,
        estimatedTotal: estimateData.estimatedTotal,
      },
    };

    const refCode = generateRefCode();

    // ── Sync to Google Sheet (the system of record) ──
    const sheetResult = await sendToGoogleSheet({
      formType: "Request Quote",
      refCode,
      name: estimateData.name,
      phone: estimateData.phone,
      email: estimateData.email,
      projectType: estimateData.projectType,
      location: estimateData.location,
      estimatedBudget: estimateData.estimatedTotal,
      details: `Package: ${estimateData.packageType} | Area: ${estimateData.builtUpAreaSqFt} sq ft | Addons: ${
        estimateData.addons?.join(", ") || "None"
      }`,
      attachments: estimateData.attachments,
    });

    if (!sheetResult.success) {
      console.error(
        `[estimate] Google Sheets sync failed for ${refCode}. Lead payload:`,
        JSON.stringify({ refCode, ...payload })
      );
    }

    const savedRecord = saveSubmission(payload, refCode);

    return {
      success: true,
      message: "Thank you! Your estimate request has been logged successfully.",
      refCode,
      data: savedRecord,
    };
  } catch (error) {
    console.error("Error submitting calculated estimate:", error);
    return {
      success: false,
      message: "Failed to submit estimate. Please try again.",
    };
  }
}
