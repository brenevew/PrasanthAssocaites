"use client";

import { useMemo, useState } from "react";
import { Download, FileText, Loader2, Mail, MessageCircle, Send, Share2 } from "lucide-react";
import type { PlannerState } from "./types";
import { company } from "@/data/company";
import { trackLeadEvent } from "@/lib/analytics";
import { plannerPdfFile, plannerSummaryText, type PlanContact } from "@/lib/plannerPdf";

const WHATSAPP_NUMBER = "919360337733";

interface PlanSharePanelProps {
  state: PlannerState;
  contact: PlanContact;
  /**
   * Submits the plan online (to the Google Sheet) again. When given, the panel
   * shows it as the first option, above the PDF options. Leave it out where the
   * page already shows its own submit button (the review step).
   */
  onSubmit?: () => void;
  isSubmitting?: boolean;
  /** Shown as a "view the report" link when given (on the review step). */
  onViewReport?: () => void;
}

type Shared = "whatsapp" | "email" | "download" | null;

/**
 * Shown when submitting the plan online (to the Google Sheet) did not go
 * through. Submitting again stays available, and the same details are offered
 * as a PDF to send on WhatsApp or by email. Browsers can't attach
 * a file to a WhatsApp or mailto link, so those buttons save the PDF and open
 * the chat or email with the summary typed in, ready for the PDF to be
 * attached. Where the device can share files (most phones), "Share PDF" hands
 * the file itself to the share sheet.
 */
export default function PlanSharePanel({ state, contact, onSubmit, isSubmitting, onViewReport }: PlanSharePanelProps) {
  // Built once when the panel appears, so every button below works on the
  // first tap; building on click would lose the tap and popups get blocked.
  const { name, email, phone } = contact;
  const file = useMemo(() => plannerPdfFile(state, { name, email, phone }), [state, name, email, phone]);
  const [shared, setShared] = useState<Shared>(null);
  // The panel only appears after a client-side action, never in server HTML,
  // so reading navigator during render can't cause a hydration mismatch.
  const canShareFile = useMemo(() => {
    try {
      return typeof navigator !== "undefined" && typeof navigator.canShare === "function" && navigator.canShare({ files: [file] });
    } catch {
      return false;
    }
  }, [file]);

  const summary = plannerSummaryText(state, contact);
  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hello Prasanth Associates, here is my house plan from your website. I am attaching the PDF (${file.name}).\n\n${summary}`
  )}`;
  const mailtoHref =
    `mailto:${company.email}?subject=${encodeURIComponent(`House plan requirements - ${contact.name || "Building Planner"}`)}` +
    `&body=${encodeURIComponent(`Hello Prasanth Associates,\n\nPlease find my house plan requirements attached (${file.name}).\n\n${summary}\n\nThank you.`)}`;

  // Saves the PDF to the device. Runs inside the click, so the browser allows it.
  const downloadPdf = () => {
    const url = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = url;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    link.remove();
    // Give the browser time to start the download before releasing the file.
    setTimeout(() => URL.revokeObjectURL(url), 30_000);
  };

  const shareFile = async () => {
    try {
      await navigator.share({ files: [file], title: "House plan requirements", text: summary });
      trackLeadEvent("whatsapp_click", { form: "planner" });
    } catch {
      // Cancelled or unsupported: the other buttons still work.
    }
  };

  const buttonBase =
    "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition-colors";

  return (
    <div role="region" aria-label="Send your plan to our team" className="rounded-3xl border border-gold/40 bg-[#FAF6EE] p-5 sm:p-6 space-y-4">
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-gold-dark border border-[#EBDCC5]">
          <FileText size={18} />
        </span>
        <div className="space-y-1">
          <p className="font-heading text-lg font-bold text-charcoal leading-snug">Your plan hasn&apos;t reached us yet</p>
          <p className="text-xs text-concrete leading-relaxed">
            Submitting online didn&apos;t go through just now. {onSubmit ? "Try submitting again" : "You can submit again"}, or send
            the same details as a PDF on WhatsApp or by email and an engineer will get back to you.
          </p>
        </div>
      </div>

      {onSubmit && (
        <>
          <button
            type="button"
            onClick={onSubmit}
            disabled={isSubmitting}
            className={`${buttonBase} w-full bg-charcoal text-white hover:bg-black disabled:opacity-70 cursor-pointer`}
          >
            {isSubmitting ? <Loader2 size={16} className="animate-spin text-gold" /> : <Send size={16} className="text-gold" />}
            {isSubmitting ? "Submitting..." : "Submit to our team"}
          </button>
          <div className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest text-concrete-light" aria-hidden="true">
            <span className="h-px flex-1 bg-[#EBDCC5]" /> or send it as a PDF <span className="h-px flex-1 bg-[#EBDCC5]" />
          </div>
        </>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            downloadPdf();
            setShared("whatsapp");
            trackLeadEvent("whatsapp_click", { form: "planner" });
          }}
          className={`${buttonBase} bg-[#25D366] text-white hover:bg-[#20ba59]`}
        >
          <MessageCircle size={16} /> Share PDF on WhatsApp
        </a>
        <a
          href={mailtoHref}
          onClick={() => {
            downloadPdf();
            setShared("email");
          }}
          className={`${buttonBase} border border-charcoal bg-white text-charcoal hover:bg-linen`}
        >
          <Mail size={16} /> Share PDF by email
        </a>
        {canShareFile && (
          <button type="button" onClick={shareFile} className={`${buttonBase} border border-border bg-white text-charcoal hover:border-gold/60 cursor-pointer`}>
            <Share2 size={16} className="text-gold-dark" /> Share PDF from this device
          </button>
        )}
        <button
          type="button"
          onClick={() => {
            downloadPdf();
            setShared("download");
          }}
          className={`${buttonBase} border border-border bg-white text-charcoal hover:border-gold/60 cursor-pointer ${canShareFile ? "" : "sm:col-span-2"}`}
        >
          <Download size={16} className="text-gold-dark" /> Download PDF
        </button>
      </div>

      {shared && (
        <p role="status" className="rounded-xl bg-white border border-border px-4 py-3 text-xs text-charcoal leading-relaxed">
          <strong>{file.name}</strong> has been saved to your device.{" "}
          {shared === "whatsapp" && "In the WhatsApp chat that opened, tap the attach (paperclip) button, choose Document, select this PDF and send."}
          {shared === "email" && `In the email that opened to ${company.email}, attach this PDF and send.`}
          {shared === "download" && `Send it to us on WhatsApp at ${company.phone} or by email at ${company.email}.`}
        </p>
      )}

      {onViewReport && (
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-[#EBDCC5] pt-3 text-xs">
          {onViewReport && (
            <button type="button" onClick={onViewReport} className="font-semibold text-concrete underline underline-offset-4 hover:text-charcoal cursor-pointer">
              View the full report
            </button>
          )}
        </div>
      )}
    </div>
  );
}
