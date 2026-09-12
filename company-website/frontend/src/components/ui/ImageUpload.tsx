"use client";

import React, { useRef, useState } from "react";
import { Upload, Paperclip, X, FileText, Image as ImageIcon, Loader2, CheckCircle2 } from "lucide-react";
import {
  ACCEPT_ATTRIBUTE,
  MAX_FILES,
  MAX_FILE_BYTES,
  MAX_ORIGINAL_BYTES,
  MAX_TOTAL_BYTES,
  formatBytes,
  isAllowedMimeType,
  totalBytes,
  type Attachment,
} from "@/lib/attachments";
import { compressImage } from "@/lib/compressImage";
import type { FormType } from "@/lib/googleSheets";

interface ImageUploadProps {
  /** Attachments uploaded so far. Controlled by the parent form. */
  value: Attachment[];
  onChange: (attachments: Attachment[]) => void;
  /** Which form this upload belongs to — decides the Drive subfolder. */
  formType: FormType;
  label?: string;
  hint?: string;
  /** Compact styling for the express planner's narrow sidebar. */
  compact?: boolean;
  /** Lets the parent block submission while an upload is still running. */
  onUploadingChange?: (isUploading: boolean) => void;
}

export default function ImageUpload({
  value,
  onChange,
  formType,
  label = "Upload Plan, Sketch or Site Photo",
  hint = "JPG, PNG, WebP, HEIC or PDF",
  compact = false,
  onUploadingChange,
}: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [pending, setPending] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const isUploading = pending.length > 0;

  const setUploading = (names: string[]) => {
    setPending(names);
    onUploadingChange?.(names.length > 0);
  };

  const handleFiles = async (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    setError(null);

    const incoming = Array.from(fileList);
    const room = MAX_FILES - value.length;

    if (room <= 0) {
      setError(`You can attach up to ${MAX_FILES} files.`);
      return;
    }

    const accepted: File[] = [];
    for (const file of incoming.slice(0, room)) {
      if (!isAllowedMimeType(file.type)) {
        setError(`"${file.name}" is not a supported file type.`);
        continue;
      }
      if (file.size > MAX_ORIGINAL_BYTES) {
        setError(
          `"${file.name}" is ${formatBytes(file.size)}, which is too large to process. Please choose a smaller file.`
        );
        continue;
      }
      accepted.push(file);
    }

    if (incoming.length > room) {
      setError(`Only the first ${room} file${room === 1 ? "" : "s"} were added (limit ${MAX_FILES}).`);
    }

    if (accepted.length === 0) return;

    setUploading(accepted.map((f) => f.name));

    const uploaded: Attachment[] = [];
    // Tracked locally because `value` does not update until this batch finishes.
    let usedBytes = totalBytes(value);

    for (const original of accepted) {
      try {
        // Compress first: the limits apply to what is actually stored, and a
        // typical phone photo only comes under 2 MB after downscaling.
        const file = await compressImage(original);

        if (file.size > MAX_FILE_BYTES) {
          setError(
            `"${original.name}" is still ${formatBytes(file.size)} after compression — the limit is ${formatBytes(
              MAX_FILE_BYTES
            )} per file.`
          );
          continue;
        }

        if (usedBytes + file.size > MAX_TOTAL_BYTES) {
          setError(
            `Adding "${original.name}" would exceed the ${formatBytes(
              MAX_TOTAL_BYTES
            )} total limit. ${formatBytes(MAX_TOTAL_BYTES - usedBytes)} remaining — remove a file or choose a smaller one.`
          );
          continue;
        }

        const body = new FormData();
        body.append("file", file);
        body.append("formType", formType);
        body.append("usedBytes", String(usedBytes));

        const res = await fetch("/api/upload", { method: "POST", body });
        const json = await res.json().catch(() => null);

        if (!res.ok || !json?.success) {
          setError(json?.error || `Could not upload "${original.name}". Please try again.`);
          continue;
        }

        const attachment = json.attachment as Attachment;
        uploaded.push(attachment);
        usedBytes += attachment.bytes || file.size;
      } catch {
        setError(`Could not upload "${original.name}". Please check your connection.`);
      }
    }

    setUploading([]);

    if (uploaded.length > 0) {
      onChange([...value, ...uploaded]);
    }

    // Allow re-selecting the same file after a removal.
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeAt = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const usedBytes = totalBytes(value);
  const remainingBytes = Math.max(0, MAX_TOTAL_BYTES - usedBytes);
  // Anything under ~50 KB of headroom is not worth offering another slot for.
  const atLimit = value.length >= MAX_FILES || remainingBytes < 50 * 1024;

  return (
    <div className={compact ? "space-y-2.5" : "space-y-3"}>
      <div className="flex items-center justify-between">
        <span
          className={`font-bold uppercase tracking-wider text-charcoal flex items-center gap-1.5 ${
            compact ? "text-[10px] text-charcoal/70" : "text-xs"
          }`}
        >
          <Upload size={compact ? 12 : 15} className="text-gold-dark" /> {label}
        </span>
        <span className="text-[9px] font-bold uppercase text-gold-dark bg-gold/15 px-2 py-0.5 rounded-full">
          Optional
        </span>
      </div>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          if (!atLimit && !isUploading) setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          if (!atLimit && !isUploading) handleFiles(e.dataTransfer.files);
        }}
        onClick={() => {
          if (!atLimit && !isUploading) fileInputRef.current?.click();
        }}
        role="button"
        tabIndex={atLimit || isUploading ? -1 : 0}
        aria-label={label}
        aria-disabled={atLimit || isUploading}
        onKeyDown={(e) => {
          if ((e.key === "Enter" || e.key === " ") && !atLimit && !isUploading) {
            e.preventDefault();
            fileInputRef.current?.click();
          }
        }}
        className={`border-2 border-dashed rounded-xl text-center transition-all ${
          compact ? "p-3.5" : "p-6"
        } ${
          atLimit || isUploading
            ? "border-border bg-linen/50 cursor-not-allowed opacity-70"
            : isDragging
              ? "border-gold bg-gold/10 cursor-pointer"
              : "border-border hover:border-gold bg-white cursor-pointer"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={ACCEPT_ATTRIBUTE}
          className="hidden"
          disabled={atLimit || isUploading}
          onChange={(e) => handleFiles(e.target.files)}
        />

        {isUploading ? (
          <>
            <Loader2 size={compact ? 16 : 24} className="mx-auto text-gold-dark mb-1 animate-spin" />
            <p className={`font-bold text-charcoal ${compact ? "text-xs" : "text-sm"}`}>
              Uploading {pending.length} file{pending.length === 1 ? "" : "s"}…
            </p>
            <p className="text-[10px] text-concrete">Please keep this page open.</p>
          </>
        ) : (
          <>
            <Paperclip size={compact ? 16 : 24} className="mx-auto text-gold-dark mb-1" />
            <p className={`font-bold text-charcoal ${compact ? "text-xs" : "text-sm"}`}>
              {atLimit
                ? value.length >= MAX_FILES
                  ? `Maximum ${MAX_FILES} files attached`
                  : `${formatBytes(MAX_TOTAL_BYTES)} upload limit reached`
                : "Click or Drag & Drop"}
            </p>
            <p className="text-[10px] text-concrete">
              {atLimit
                ? "Remove a file to add another"
                : `${hint} · max ${formatBytes(MAX_FILE_BYTES)} per file, ${formatBytes(
                    MAX_TOTAL_BYTES
                  )} in total`}
            </p>
          </>
        )}
      </div>

      {error && (
        <p className="text-[11px] text-red-600 font-medium leading-snug" role="alert">
          {error}
        </p>
      )}

      {value.length > 0 && (
        <p className="text-[10px] text-concrete font-medium">
          {value.length} of {MAX_FILES} files · {formatBytes(usedBytes)} of{" "}
          {formatBytes(MAX_TOTAL_BYTES)} used
        </p>
      )}

      {value.length > 0 && (
        <ul className="space-y-1 max-h-32 overflow-y-auto">
          {value.map((file, i) => (
            <li
              key={`${file.url}-${i}`}
              className="bg-white p-2 rounded-lg border border-border flex items-center justify-between gap-2 text-[11px]"
            >
              <span className="flex items-center gap-1.5 min-w-0">
                {file.name.toLowerCase().endsWith(".pdf") ? (
                  <FileText size={13} className="text-gold-dark shrink-0" />
                ) : (
                  <ImageIcon size={13} className="text-gold-dark shrink-0" />
                )}
                <span className="truncate font-medium text-charcoal">{file.name}</span>
                <span className="text-concrete shrink-0">({file.size})</span>
                <CheckCircle2 size={12} className="text-emerald-600 shrink-0" aria-label="Uploaded" />
              </span>
              <button
                type="button"
                onClick={() => removeAt(i)}
                className="text-concrete hover:text-red-600 shrink-0"
                aria-label={`Remove ${file.name}`}
              >
                <X size={13} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
