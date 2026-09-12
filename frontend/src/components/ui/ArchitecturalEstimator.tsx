"use client";

import { useState } from "react";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Send,
  Layers,
  Building,
  Ruler,
  User,
  Mail,
  Phone,
  Paperclip,
  Check,
  Zap,
  ShieldCheck,
  FileCheck,
  Sliders,
  ChevronRight,
  RefreshCw
} from "lucide-react";

interface EstimatorResult {
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  configuration: string;
  dimensions: string;
  totalSqFt: number;
  serviceCategory: "2D Floor Plan Only" | "3D Walkthrough & Rendering" | "Both (2D & 3D)";
  referenceMaterial: string;
  ratePerSqFt: number;
  baseCost: number;
  complexityMultiplier: number;
  complexityAmount: number;
  finalPrice: number;
  estimatedTimeline: string;
  designPhilosophy: string;
  structuralFootprint: string;
  itemizedFormula: string;
  refCode: string;
}

export default function ArchitecturalEstimator() {
  // Input States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [configuration, setConfiguration] = useState("3BHK");
  const [customConfig, setCustomConfig] = useState("");
  const [plotDimensions, setPlotDimensions] = useState("30x40 ft");
  const [totalSqFt, setTotalSqFt] = useState(1200);
  const [serviceCategory, setServiceCategory] = useState<"2D Floor Plan Only" | "3D Walkthrough & Rendering" | "Both (2D & 3D)">("Both (2D & 3D)");
  const [referenceMaterial, setReferenceMaterial] = useState("Modern Minimalist Villa with Central Courtyard");

  // UX Control States
  const [isCalculated, setIsCalculated] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState<EstimatorResult | null>(null);
  const [copied, setCopied] = useState(false);

  // Pricing Rates (in INR ₹)
  const RATES = {
    "2D Floor Plan Only": 20,
    "3D Walkthrough & Rendering": 50,
    "Both (2D & 3D)": 65,
  };

  const DUPLEX_MULTIPLIER = 0.25;

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCalculating(true);

    setTimeout(() => {
      const selectedConfig = configuration === "Custom" ? (customConfig || "Custom Villa") : configuration;
      const isDuplex = selectedConfig.toLowerCase().includes("duplex");
      const rate = RATES[serviceCategory];
      const baseCost = totalSqFt * rate;
      const multiplier = isDuplex ? DUPLEX_MULTIPLIER : 0;
      const complexityAmount = Math.round(baseCost * multiplier);
      const finalPrice = baseCost + complexityAmount;

      // Intelligent Timeline
      let timeline = "2 - 3 Business Days";
      if (serviceCategory === "Both (2D & 3D)" || isDuplex || totalSqFt > 2500) {
        timeline = "4 - 5 Business Days";
      }

      // Design Philosophy Synthesis
      let philosophy = "Biophilic open-plan living optimized for continuous natural ventilation, Vaastu alignment, and fluid spatial progression.";
      if (serviceCategory === "3D Walkthrough & Rendering") {
        philosophy = "Photorealistic architectural visualization emphasizing ambient lighting, tactile material textures, and volumetric depth.";
      } else if (serviceCategory === "Both (2D & 3D)") {
        philosophy = "Unified structural planning integrating precision CAD floor drafts with immersive high-definition 3D spatial walkthroughs.";
      }

      const generatedRefCode = `PA-EST-${Math.floor(100000 + Math.random() * 900000)}`;
      const footprint = `${totalSqFt} sq.ft. (${plotDimensions})`;
      const itemizedFormula = `(₹${rate}/sq.ft. × ${totalSqFt} sq.ft.)${multiplier > 0 ? ` + 25% Multi-level Engineering` : ""}`;

      setResult({
        clientName: name || "Valued Client",
        clientEmail: email || "client@prasanthassociates.com",
        clientPhone: phone || "+91 94433 78901",
        configuration: selectedConfig,
        dimensions: plotDimensions,
        totalSqFt,
        serviceCategory,
        referenceMaterial: referenceMaterial || "Standard Modern Layout",
        ratePerSqFt: rate,
        baseCost,
        complexityMultiplier: multiplier,
        complexityAmount,
        finalPrice,
        estimatedTimeline: timeline,
        designPhilosophy: philosophy,
        structuralFootprint: footprint,
        itemizedFormula,
        refCode: generatedRefCode,
      });

      setIsCalculating(false);
      setIsCalculated(true);
    }, 350);
  };

  const copyQuotation = () => {
    if (!result) return;
    const text = `PRASANTH ASSOCIATES - ARCHITECTURAL QUOTATION\nRef: ${result.refCode}\nClient: ${result.clientName}\nConfiguration: ${result.configuration} (${result.dimensions})\nService: ${result.serviceCategory}\nArea: ${result.totalSqFt} sq.ft.\nFinal Price: ₹${result.finalPrice.toLocaleString("en-IN")}\nTimeline: ${result.estimatedTimeline}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="instant-estimator" className="relative py-12 overflow-hidden scroll-mt-28">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] liquid-glow opacity-50 z-0" />

      <div className="container relative z-10">
        
        {/* Neumorphic Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="badge-gold mb-4 inline-flex">
            <Zap size={12} className="text-gold-dark fill-gold" />
            Instant Price Calculator
          </span>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-charcoal mb-4 tracking-tight leading-tight">
            Architectural Floor Plan &amp; Cost Brief
          </h2>
          <p className="text-concrete text-base leading-relaxed">
            Specify your layout dimensions and spatial preferences. Our automated engine delivers an instantaneous, structural price quotation and architectural design brief.
          </p>
        </div>

        {/* Main Neumorphic Card Container */}
        <div className="nm-raised rounded-[36px] p-6 md:p-10 relative overflow-hidden border border-white/70">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Control Panel (6 cols on lg) */}
            <form onSubmit={handleCalculate} className="lg:col-span-6 flex flex-col justify-between space-y-6 nm-flat p-6 md:p-8 rounded-[28px]">
              
              {/* 1. Client Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-concrete">
                    Step 1 of 4 · Contact Details
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block" />
                </div>

                <div className="space-y-3">
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your Name *"
                      className="w-full pl-10 pr-4 py-3 text-xs placeholder:text-concrete-lighter"
                    />
                    <User size={15} className="absolute left-3.5 top-3.5 text-concrete-light" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="relative">
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email Address *"
                        className="w-full pl-10 pr-4 py-3 text-xs placeholder:text-concrete-lighter"
                      />
                      <Mail size={15} className="absolute left-3.5 top-3.5 text-concrete-light" />
                    </div>

                    <div className="relative">
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Phone Number *"
                        className="w-full pl-10 pr-4 py-3 text-xs placeholder:text-concrete-lighter"
                      />
                      <Phone size={15} className="absolute left-3.5 top-3.5 text-concrete-light" />
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. Neumorphic Segmented Control: Configuration */}
              <div className="space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-concrete block">
                  Step 2 of 4 · Configuration
                </span>

                <div className="nm-inset-deep p-1 rounded-2xl flex items-center gap-1">
                  {["1BHK", "2BHK", "3BHK", "Duplex", "Custom"].map((cfg) => {
                    const active = configuration === cfg;
                    return (
                      <button
                        key={cfg}
                        type="button"
                        onClick={() => setConfiguration(cfg)}
                        className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all duration-250 cursor-pointer ${
                          active
                            ? "nm-gold-raised font-bold text-charcoal scale-[1.02]"
                            : "text-concrete hover:text-charcoal"
                        }`}
                      >
                        {cfg}
                      </button>
                    );
                  })}
                </div>

                {configuration === "Custom" && (
                  <input
                    type="text"
                    value={customConfig}
                    onChange={(e) => setCustomConfig(e.target.value)}
                    placeholder="Specify custom layout (e.g. 4BHK Villa with Courtyard)"
                    className="w-full px-4 py-2.5 text-xs text-charcoal"
                  />
                )}
              </div>

              {/* 3. Plot Dimensions & Built-up Area Slider */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-concrete">
                    Step 3 of 4 · Built-Up Footprint
                  </span>
                  <span className="text-xs font-mono font-bold text-charcoal">
                    {totalSqFt.toLocaleString("en-IN")} Sq. Ft.
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-2">
                  <input
                    type="text"
                    value={plotDimensions}
                    onChange={(e) => setPlotDimensions(e.target.value)}
                    placeholder="Dimensions (e.g. 30x40 ft)"
                    className="w-full px-3.5 py-2.5 text-xs text-charcoal"
                  />
                  <div className="flex items-center gap-2 nm-inset px-3 py-2 rounded-2xl">
                    <input
                      type="number"
                      min={400}
                      max={15000}
                      step={50}
                      value={totalSqFt}
                      onChange={(e) => setTotalSqFt(Number(e.target.value) || 400)}
                      className="w-full text-xs font-bold text-charcoal focus:outline-none bg-transparent"
                    />
                    <span className="text-[10px] font-bold text-concrete uppercase">SQFT</span>
                  </div>
                </div>

                {/* Tactile Slider */}
                <input
                  type="range"
                  min={500}
                  max={8000}
                  step={50}
                  value={totalSqFt}
                  onChange={(e) => setTotalSqFt(Number(e.target.value))}
                  className="w-full h-2 bg-slate-300 rounded-lg appearance-none cursor-pointer accent-gold nm-inset-sm"
                />
              </div>

              {/* 4. Service Category Deliverable Format */}
              <div className="space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-concrete block">
                  Step 4 of 4 · Deliverable Format
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {(["2D Floor Plan Only", "3D Walkthrough & Rendering", "Both (2D & 3D)"] as const).map((cat) => {
                    const selected = serviceCategory === cat;
                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setServiceCategory(cat)}
                        className={`p-3 rounded-2xl text-[11px] font-bold transition-all text-left flex flex-col justify-between gap-1.5 cursor-pointer ${
                          selected
                            ? "nm-gold-raised text-charcoal font-bold"
                            : "nm-interactive text-concrete hover:text-charcoal"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="truncate">{cat.split(" ")[0]} {cat.includes("3D") ? "3D" : "Layout"}</span>
                          {selected && <CheckCircle2 size={13} className="text-charcoal flex-shrink-0" />}
                        </div>
                        <span className="text-[10px] font-mono text-charcoal/80 font-bold">
                          ₹{RATES[cat]}/sqft
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Reference Description */}
              <div className="relative">
                <input
                  type="text"
                  value={referenceMaterial}
                  onChange={(e) => setReferenceMaterial(e.target.value)}
                  placeholder="Style Reference (e.g. Modern Villa with Courtyard)"
                  className="w-full pl-9 pr-4 py-2.5 text-xs text-charcoal"
                />
                <Paperclip size={14} className="absolute left-3 top-3.5 text-concrete-light" />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isCalculating}
                className="w-full py-4 px-6 nm-dark-interactive text-warm-white rounded-2xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-50"
              >
                {isCalculating ? (
                  <span className="flex items-center gap-2">
                    <RefreshCw size={14} className="animate-spin text-gold" />
                    Calculating Structural Brief…
                  </span>
                ) : (
                  <>
                    <span>Generate Price &amp; Design Brief</span>
                    <ArrowRight size={15} className="text-gold" />
                  </>
                )}
              </button>
            </form>

            {/* Right Output Panel: Neumorphic Receipt Card Style */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              {!isCalculated || !result ? (
                <div className="h-full nm-inset rounded-[28px] p-8 text-center flex flex-col items-center justify-center min-h-[500px]">
                  <div className="w-16 h-16 rounded-2xl nm-raised text-gold-dark flex items-center justify-center mb-5">
                    <FileCheck size={28} />
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-charcoal mb-2">
                    Instant Quotation Preview
                  </h3>
                  <p className="text-concrete text-xs max-w-xs leading-relaxed mb-6">
                    Fill out your contact details and spatial requirements on the left to immediately generate your formal architectural brief and quotation.
                  </p>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full nm-raised text-[11px] font-bold text-charcoal">
                    <ShieldCheck size={14} className="text-gold-dark" />
                    100% Structural Price Lock Guarantee
                  </div>
                </div>
              ) : (
                <div className="space-y-5 animate-fadeIn">
                  
                  {/* SECTION A: INTERNAL ARCHITECTURAL BRIEF */}
                  <div className="nm-dark-raised text-white p-6 rounded-[24px] relative overflow-hidden">
                    <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
                      <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-gold bg-gold/15 px-3 py-1 rounded-full border border-gold/30">
                        SECTION A: INTERNAL ARCHITECTURAL BRIEF
                      </span>
                      <span className="text-[9px] font-mono text-white/50">CONFIDENTIAL</span>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-gold block mb-1">
                          Design Philosophy:
                        </span>
                        <p className="text-xs text-white/85 nm-dark-inset p-3 rounded-xl leading-relaxed italic">
                          &quot;{result.designPhilosophy}&quot;
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-[11px]">
                        <div className="nm-dark-inset p-2.5 rounded-xl">
                          <span className="text-[9px] uppercase tracking-wider text-concrete-lighter block">Footprint</span>
                          <span className="font-bold text-white truncate block">{result.structuralFootprint}</span>
                        </div>

                        <div className="nm-dark-inset p-2.5 rounded-xl">
                          <span className="text-[9px] uppercase tracking-wider text-concrete-lighter block">Delivery Channel</span>
                          <span className="font-bold text-gold-light truncate block">{result.clientEmail}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* SECTION B: CLIENT-FACING QUOTATION */}
                  <div className="nm-raised p-6 rounded-[24px] space-y-4 border border-white/70">
                    <div className="flex items-center justify-between pb-3 border-b border-border/70">
                      <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-charcoal nm-inset-sm px-3 py-1 rounded-full">
                        SECTION B: CLIENT QUOTATION
                      </span>
                      <button
                        onClick={copyQuotation}
                        className="text-[10px] font-bold uppercase tracking-wider text-gold-dark hover:text-charcoal transition-colors cursor-pointer flex items-center gap-1"
                      >
                        {copied ? "Copied to Clipboard!" : "Copy Quotation"}
                      </button>
                    </div>

                    <div>
                      <h4 className="font-heading text-lg font-bold text-charcoal mb-0.5">
                        Hello, {result.clientName}
                      </h4>
                      <p className="text-concrete text-xs">
                        Official structural design pricing for your <strong className="text-charcoal">{result.configuration}</strong> project:
                      </p>
                    </div>

                    {/* Itemized Calculation Box */}
                    <div className="nm-inset p-4 rounded-2xl space-y-2 text-xs">
                      <div className="flex justify-between border-b border-border/60 pb-1.5">
                        <span className="text-concrete">Configuration:</span>
                        <span className="font-bold text-charcoal">{result.configuration} ({result.dimensions})</span>
                      </div>

                      <div className="flex justify-between border-b border-border/60 pb-1.5">
                        <span className="text-concrete">Service Scope:</span>
                        <span className="font-bold text-charcoal">{result.serviceCategory}</span>
                      </div>

                      <div className="flex justify-between border-b border-border/60 pb-1.5">
                        <span className="text-concrete">Itemized Base Formula:</span>
                        <span className="font-mono text-charcoal">{result.itemizedFormula}</span>
                      </div>

                      <div className="flex justify-between items-center pt-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-charcoal">Final Structural Design Price:</span>
                        <span className="font-heading text-2xl font-bold text-gold-dark">
                          ₹{result.finalPrice.toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>

                    {/* Timeline & Next Steps */}
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="p-3 nm-flat rounded-xl">
                        <span className="text-[9px] font-bold uppercase tracking-wider text-concrete block">Draft Timeline</span>
                        <span className="font-bold text-charcoal flex items-center gap-1 mt-0.5">
                          <CheckCircle2 size={12} className="text-gold-dark" />
                          {result.estimatedTimeline}
                        </span>
                      </div>

                      <div className="p-3 nm-flat rounded-xl">
                        <span className="text-[9px] font-bold uppercase tracking-wider text-concrete block">Reference Code</span>
                        <span className="font-mono font-bold text-gold-dark mt-0.5 block">{result.refCode}</span>
                      </div>
                    </div>

                    <p className="text-[11px] text-concrete leading-relaxed nm-inset-sm p-3 rounded-xl">
                      <strong>Next Steps:</strong> Your structural blueprints and 3D walkthrough files will land directly in your inbox at <span className="text-charcoal font-semibold">{result.clientEmail}</span> within {result.estimatedTimeline}.
                    </p>
                  </div>

                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
