"use client";

import { MAX_FILE_BYTES } from "@/lib/attachments";

/**
 * Client-side image downscaling.
 *
 * Site photos straight off a phone are routinely 4-8 MB, which is well over the
 * 2 MB per-file limit and slow to upload on an Indian mobile connection.
 * Resizing in the browser before upload typically turns a 6 MB photo into
 * ~300 KB, so the limit almost never bites in practice.
 *
 * Quality steps down until the result fits MAX_FILE_BYTES, then a final pass
 * shrinks the dimensions if an unusually detailed image is still too large.
 *
 * Anything that is not a canvas-decodable image (PDF, and HEIC in most
 * browsers) is passed through untouched and must already be within the limit.
 */

const MAX_DIMENSION = 1600;
const QUALITY_STEPS = [0.82, 0.7, 0.6, 0.5];
const FALLBACK_DIMENSION = 1000;

/** Formats the canvas can reliably decode and re-encode. */
const COMPRESSIBLE = ["image/jpeg", "image/png", "image/webp"];

function drawToCanvas(bitmap: ImageBitmap, maxDimension: number): HTMLCanvasElement | null {
  const scale = Math.min(1, maxDimension / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);

  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  return canvas;
}

function toBlob(canvas: HTMLCanvasElement, quality: number): Promise<Blob | null> {
  return new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg", quality));
}

export async function compressImage(file: File): Promise<File> {
  if (!COMPRESSIBLE.includes(file.type)) return file;

  try {
    const bitmap = await createImageBitmap(file);

    // Already comfortably within the limit and not oversized — leave it alone
    // rather than re-encoding and losing quality for nothing.
    if (
      file.size <= MAX_FILE_BYTES / 2 &&
      Math.max(bitmap.width, bitmap.height) <= MAX_DIMENSION
    ) {
      bitmap.close();
      return file;
    }

    let canvas = drawToCanvas(bitmap, MAX_DIMENSION);
    if (!canvas) {
      bitmap.close();
      return file;
    }

    let best: Blob | null = null;

    for (const quality of QUALITY_STEPS) {
      const blob = await toBlob(canvas, quality);
      if (!blob) continue;
      best = blob;
      if (blob.size <= MAX_FILE_BYTES) break;
    }

    // Still too big at the lowest quality: shrink the dimensions as well.
    if (best && best.size > MAX_FILE_BYTES) {
      const smaller = drawToCanvas(bitmap, FALLBACK_DIMENSION);
      if (smaller) {
        canvas = smaller;
        for (const quality of QUALITY_STEPS) {
          const blob = await toBlob(canvas, quality);
          if (!blob) continue;
          best = blob;
          if (blob.size <= MAX_FILE_BYTES) break;
        }
      }
    }

    bitmap.close();

    if (!best || best.size >= file.size) return file;

    const newName = file.name.replace(/\.[^.]+$/, "") + ".jpg";
    return new File([best], newName, { type: "image/jpeg", lastModified: Date.now() });
  } catch {
    // A decode failure is not worth failing the upload over — send the original
    // and let the size check decide.
    return file;
  }
}
