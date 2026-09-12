"use client";

import React, { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";

interface WhatsAppWidgetProps {
  phoneNumber?: string;
  defaultMessage?: string;
}

const QUICK_TEMPLATES = [
  "I need a floor plan design for my plot",
  "I want an architectural cost estimate",
  "I want to book a site consultation",
  "I have a rough sketch to share",
];

export default function WhatsAppWidget({
  phoneNumber = "919486038761",
  defaultMessage = "Hello Prasanth Associates, I would like to enquire about your architectural design services.",
}: WhatsAppWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [customerMsg, setCustomerMsg] = useState("");

  const cleanPhone = phoneNumber.replace(/[^0-9]/g, "");

  const handleSendWhatsApp = (customText?: string) => {
    const textToSend = customText || customerMsg || defaultMessage;
    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(textToSend)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 font-sans">
      
      {/* Interactive Customer WhatsApp Message Modal */}
      {isOpen && (
        <div className="bg-white/95 backdrop-blur-xl border border-border/80 rounded-3xl p-5 shadow-2xl w-80 sm:w-96 space-y-3.5 animate-fadeIn border-t-4 border-t-[#25D366]">
          {/* Modal Header */}
          <div className="flex items-center justify-between pb-2 border-b border-border/60">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-[#25D366] text-white flex items-center justify-center font-bold shadow-md">
                <MessageCircle size={20} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-charcoal">Prasanth Associates</h4>
                <p className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Architect Online on WhatsApp
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-concrete hover:text-charcoal p-1.5 rounded-full hover:bg-warm-white transition-all cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          {/* Intro Text */}
          <p className="text-xs text-concrete leading-relaxed bg-warm-white p-3 rounded-2xl border border-border/60 text-justify">
            Type your message or project question below to chat directly with our senior architectural team on WhatsApp.
          </p>

          {/* Quick Topic Chips */}
          <div className="space-y-1.5">
            <span className="text-[9px] font-bold uppercase tracking-wider text-concrete block">Quick Questions:</span>
            <div className="flex flex-wrap gap-1">
              {QUICK_TEMPLATES.map((tmpl) => (
                <button
                  key={tmpl}
                  type="button"
                  onClick={() => setCustomerMsg(tmpl)}
                  className="px-2.5 py-1 rounded-xl text-[10px] font-semibold bg-linen/80 hover:bg-gold/20 text-charcoal border border-border/70 hover:border-gold transition-all text-left cursor-pointer"
                >
                  + {tmpl}
                </button>
              ))}
            </div>
          </div>

          {/* Customer Message Input Box */}
          <div className="space-y-2">
            <label className="block text-[9px] font-bold uppercase text-concrete">Your Message *</label>
            <textarea
              value={customerMsg}
              onChange={(e) => setCustomerMsg(e.target.value)}
              placeholder="Type your message here (e.g. My plot is 30x50 ft in Coimbatore...)"
              rows={3}
              className="w-full text-xs p-3 border border-border/80 rounded-2xl focus:border-[#25D366] focus:outline-none resize-none bg-white text-charcoal placeholder:text-concrete/60"
            />

            <button
              type="button"
              onClick={() => handleSendWhatsApp()}
              className="w-full py-3 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-2xl text-xs font-bold uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Send Message via WhatsApp</span>
              <Send size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Floating Action Launcher Button */}
      <div className="relative group">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="relative bg-[#25D366] hover:bg-[#20ba59] text-white p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center cursor-pointer border-2 border-white"
          aria-label="Chat on WhatsApp"
        >
          {/* decorative only — animate-ping sweeps a wide box that would otherwise swallow
              clicks on anything nearby (e.g. the planner's fixed action bar) */}
          <span className="pointer-events-none absolute -inset-1 rounded-full bg-[#25D366]/40 animate-ping opacity-75" />
          <MessageCircle size={26} className="relative z-10" />
        </button>

        {/* Hover Tooltip Label */}
        {!isOpen && (
          <div className="absolute right-full top-1/2 -translate-y-1/2 mr-3 px-3.5 py-1.5 bg-charcoal text-white text-[11px] font-bold rounded-xl shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Enter Message via WhatsApp
          </div>
        )}
      </div>

    </div>
  );
}
