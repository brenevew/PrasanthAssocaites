/**
 * Shared contract for client-uploaded form attachments.
 *
 * Imported by both client components and server code, so it must stay free of
 * server-only imports.
 */

export interface Attachment {
  /** Original (sanitised) file name shown back to the client. */
  name: string;
  /** Google Drive URL returned by the Apps Script after the file is stored. */
  url: string;
  /** Human-readable size, e.g. "412 KB". */
  size: string;
  /** Exact stored size in bytes, used to enforce the per-submission total. */
  bytes: number;
}

/** Upload limits, enforced on the client for UX and again on the server. */
export const MAX_FILES = 5;

/**
 * Per-file and per-submission ceilings.
 *
 * Both apply to the bytes actually uploaded, i.e. AFTER the browser downscales
 * a photo. Measuring the original instead would reject almost every phone
 * photo (routinely 4-8 MB) even though it compresses to a few hundred KB.
 */
export const MAX_FILE_BYTES = 2 * 1024 * 1024; // 2 MB per file
export const MAX_TOTAL_BYTES = 5 * 1024 * 1024; // 5 MB across one submission

/**
 * Sanity ceiling on the file as picked, before compression. This only exists to
 * stop the browser trying to decode an enormous image; the real limit is
 * MAX_FILE_BYTES, applied to the compressed result.
 */
export const MAX_ORIGINAL_BYTES = 25 * 1024 * 1024;

export const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif",
  "application/pdf",
] as const;

export const ACCEPT_ATTRIBUTE = ".jpg,.jpeg,.png,.webp,.heic,.heif,.pdf";

export function isAllowedMimeType(type: string): boolean {
  return (ALLOWED_MIME_TYPES as readonly string[]).includes(type);
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/** Total stored size of an attachment set, in bytes. */
export function totalBytes(attachments: Attachment[]): number {
  return attachments.reduce((sum, a) => sum + (a.bytes || 0), 0);
}

/** Renders attachments for the "Attachments" column of the Google Sheet. */
export function formatAttachmentsForSheet(attachments: Attachment[] | undefined): string {
  if (!attachments || attachments.length === 0) return "";
  return attachments.map((a) => `${a.name}: ${a.url}`).join("\n");
}
