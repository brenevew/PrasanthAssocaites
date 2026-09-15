import { NextRequest, NextResponse } from "next/server";
import { FORM_TYPES, sendToGoogleSheet, type FormType } from "@/lib/googleSheets";
import type { Attachment } from "@/lib/attachments";
import { rateLimit, getClientIp } from "@/lib/rateLimit";

const SYNC_LIMIT = 15;
const SYNC_WINDOW_MS = 10 * 60 * 1000;

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const limitResult = rateLimit(`sync-sheets:${ip}`, SYNC_LIMIT, SYNC_WINDOW_MS);
  if (!limitResult.success) {
    return NextResponse.json(
      { success: false, error: "Too many submissions. Please wait a bit before trying again." },
      { status: 429, headers: { "Retry-After": String(limitResult.retryAfterSeconds) } }
    );
  }

  try {
    const contentType = req.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      return NextResponse.json(
        { success: false, error: "Invalid Content-Type. Expected application/json" },
        { status: 415 }
      );
    }

    const body = await req.json();

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { success: false, error: "Invalid request payload" },
        { status: 400 }
      );
    }

    const name = typeof body.name === "string" ? body.name.trim().slice(0, 100) : "";
    const phone = typeof body.phone === "string" ? body.phone.trim().slice(0, 30) : "";

    if (!name || !phone) {
      return NextResponse.json(
        { success: false, error: "Name and phone number are required." },
        { status: 400 }
      );
    }

    const email = typeof body.email === "string" ? body.email.trim().slice(0, 150) : undefined;
    const projectType = typeof body.projectType === "string" ? body.projectType.trim().slice(0, 100) : undefined;
    const location = typeof body.location === "string" ? body.location.trim().slice(0, 150) : undefined;
    const refCode = typeof body.refCode === "string" ? body.refCode.trim().slice(0, 50) : undefined;
    const formType: FormType =
      typeof body.formType === "string" && (FORM_TYPES as string[]).includes(body.formType)
        ? (body.formType as FormType)
        : "Building Planner";
    const details = typeof body.details === "string" ? body.details.trim().slice(0, 2000) : undefined;
    const estimatedBudget = body.estimatedBudget || body.estimatedFee;

    // Attachments are Drive URLs produced by /api/upload, never raw file data.
    const attachments: Attachment[] = Array.isArray(body.attachments)
      ? body.attachments
          .filter(
            (a: unknown): a is Attachment =>
              !!a &&
              typeof a === "object" &&
              typeof (a as Attachment).url === "string" &&
              typeof (a as Attachment).name === "string"
          )
          .slice(0, 10)
          .map((a: Attachment) => ({
            name: a.name.slice(0, 150),
            url: a.url.slice(0, 500),
            size: typeof a.size === "string" ? a.size.slice(0, 20) : "",
          }))
      : [];

    const result = await sendToGoogleSheet({
      formType,
      refCode,
      name,
      phone,
      email,
      projectType,
      location,
      estimatedBudget: typeof estimatedBudget === "number" || typeof estimatedBudget === "string" ? estimatedBudget : undefined,
      details,
      attachments,
    });

    if (!result.success) {
      console.error(
        `[sync-sheets] Sheet write failed for ${formType} / ${refCode || "no-ref"}. Lead payload:`,
        JSON.stringify({ formType, refCode, name, phone, email, projectType, location })
      );
    }

    return NextResponse.json(result);
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Failed to sync to Google Sheets";
    console.error("[API sync-sheets error]", errorMsg);
    return NextResponse.json(
      { success: false, error: errorMsg },
      { status: 500 }
    );
  }
}
