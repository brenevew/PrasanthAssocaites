import { NextRequest, NextResponse } from "next/server";
import {
  MAX_FILE_BYTES,
  MAX_TOTAL_BYTES,
  formatBytes,
  isAllowedMimeType,
} from "@/lib/attachments";
import { FORM_TYPES, type FormType } from "@/lib/googleSheets";

// Drive round-trips can be slow; give the request room beyond the platform default.
export const maxDuration = 60;

/**
 * Receives one file as multipart/form-data, then hands it to the Google Apps
 * Script, which stores it in Google Drive and returns a shareable URL.
 *
 * Files deliberately do NOT travel through the Contact / Request Quote Server
 * Actions: those are capped at a 1MB request body by Next.js. Uploading through
 * this Route Handler keeps the Server Action payload down to a few short URLs.
 */
export async function POST(req: NextRequest) {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

  if (!webhookUrl) {
    return NextResponse.json(
      {
        success: false,
        error:
          "File uploads are not configured on this site. Please email your files to us instead.",
      },
      { status: 503 }
    );
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file");
    const rawFormType = formData.get("formType");
    const rawUsedBytes = formData.get("usedBytes");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { success: false, error: "No file was received." },
        { status: 400 }
      );
    }

    if (!isAllowedMimeType(file.type)) {
      return NextResponse.json(
        {
          success: false,
          error: "Unsupported file type. Please upload a JPG, PNG, WebP, HEIC or PDF.",
        },
        { status: 415 }
      );
    }

    if (file.size === 0) {
      return NextResponse.json(
        { success: false, error: "That file appears to be empty." },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_BYTES) {
      return NextResponse.json(
        {
          success: false,
          error: `File is too large (${formatBytes(file.size)}). The limit is ${formatBytes(
            MAX_FILE_BYTES
          )} per file.`,
        },
        { status: 413 }
      );
    }

    // How many bytes this visitor has already stored for the form they are
    // filling in. Uploads are stateless one-per-request, so the running total is
    // reported by the client; a tampered value is bounded by the per-file limit
    // above and the MAX_FILES cap, so the worst case stays small.
    const usedBytes = Number(rawUsedBytes);
    if (Number.isFinite(usedBytes) && usedBytes > 0 && usedBytes + file.size > MAX_TOTAL_BYTES) {
      return NextResponse.json(
        {
          success: false,
          error: `This file would exceed the ${formatBytes(
            MAX_TOTAL_BYTES
          )} total upload limit. Please remove a file or choose a smaller one.`,
        },
        { status: 413 }
      );
    }

    const formType: FormType =
      typeof rawFormType === "string" && (FORM_TYPES as readonly string[]).includes(rawFormType)
        ? (rawFormType as FormType)
        : "Building Planner";

    // Strip directory components and control characters, and keep the name short.
    const safeName =
      (file.name || "upload")
        .replace(/[/\\]/g, "_")
        .replace(/[\u0000-\u001f\u007f]/g, "")
        .slice(-120) || "upload";

    const base64 = Buffer.from(await file.arrayBuffer()).toString("base64");

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "upload",
        token: process.env.GOOGLE_SHEETS_SHARED_SECRET || "",
        formType,
        fileName: safeName,
        mimeType: file.type,
        fileData: base64,
      }),
      signal: AbortSignal.timeout(45_000),
      cache: "no-store",
    });

    if (!response.ok) {
      console.error(`[upload] Apps Script responded ${response.status} for ${safeName}`);
      return NextResponse.json(
        { success: false, error: "Upload failed. Please try again." },
        { status: 502 }
      );
    }

    const result = await response.json().catch(() => null);

    if (!result || result.status !== "success" || !result.url) {
      console.error(
        `[upload] Apps Script rejected ${safeName}:`,
        JSON.stringify(result)?.slice(0, 300)
      );
      return NextResponse.json(
        { success: false, error: "Upload was rejected by the storage service." },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      attachment: {
        name: result.name || safeName,
        url: result.url,
        size: formatBytes(file.size),
        bytes: file.size,
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[upload] Failed:", message);
    return NextResponse.json(
      { success: false, error: "Upload failed. Please try again." },
      { status: 500 }
    );
  }
}
