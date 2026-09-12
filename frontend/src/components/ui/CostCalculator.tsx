"use client";

import { useState } from "react";
import { Calculator, Check, CheckCircle2, Send } from "lucide-react";
import { submitCalculatedEstimate } from "@/app/actions/contactActions";

const projectTypes = [
  { id: "residential", label: "Residential House", baseMultiplier: 1.0 },
  { id: "villa", label: "Luxury Villa", baseMultiplier: 1.25 },
  { id: "commercial", label: "Commercial Office", baseMultiplier: 1.15 },
  { id: "industrial", label: "Industrial Shed / Factory", baseMultiplier: 0.85 },
];

const packages = [
  {
    id: "standard",
    name: "Standard Package",
    ratePerSqFt: 1950,
    description: "Solid RCC structure, branded vitrified tiles, standard electricals & bath fittings.",
    badge: "Most Popular",
  },
  {
    id: "premium",
    name: "Premium Package",
    ratePerSqFt: 2650,
    description: "Teakwood doors, Italian marble flooring, Jaquar bath fittings, architectural elevation.",
    badge: "Recommended",
  },
  {
    id: "luxury",
    name: "Luxury Package",
    ratePerSqFt: 3800,
    description: "Imported marble, VRV air conditioning pre-piping, Kohler/Grohe luxury bath, high-end facade.",
    badge: "Ultra Luxury",
  },
];

const addonsList = [
  { id: "vastu", label: "Vastu Architecture & Compliance", price: 45000 },
  { id: "smarthome", label: "Smart Home Automation Pre-wiring", price: 120000 },
  { id: "landscaping", label: "Landscape & Garden Design", price: 85000 },
  { id: "solar", label: "Solar Rooftop Integration (5kW)", price: 150000 },
];

interface CostCalculatorProps {
  defaultType?: string;
}

export default function CostCalculator({ defaultType }: CostCalculatorProps = {}) {
  const [selectedType, setSelectedType] = useState(() => {
    if (defaultType && ["residential", "villa", "commercial", "industrial"].includes(defaultType)) {
      return defaultType;
    }
    return "residential";
  });

  const [prevDefaultType, setPrevDefaultType] = useState(defaultType);
  if (prevDefaultType !== defaultType) {
    setPrevDefaultType(defaultType);
    if (defaultType && ["residential", "villa", "commercial", "industrial"].includes(defaultType)) {
      setSelectedType(defaultType);
    }
  }

  const [areaSqFt, setAreaSqFt] = useState(2400);
  const [selectedPackage, setSelectedPackage] = useState("premium");
  const [selectedAddons, setSelectedAddons] = useState<string[]>(["vastu"]);

  // Form submission state inside calculator
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [refCode, setRefCode] = useState<string | null>(null);

  const toggleAddon = (id: string) => {
    if (selectedAddons.includes(id)) {
      setSelectedAddons(selectedAddons.filter((a) => a !== id));
    } else {
      setSelectedAddons([...selectedAddons, id]);
    }
  };

  // Calculate live estimate
  const currentProjectType = projectTypes.find((p) => p.id === selectedType)!;
  const currentPkg = packages.find((p) => p.id === selectedPackage)!;
  const addonsTotal = selectedAddons.reduce((sum, addonId) => {
    const item = addonsList.find((a) => a.id === addonId);
    return sum + (item ? item.price : 0);
  }, 0);

  const baseStructureCost = Math.round(
    areaSqFt * currentPkg.ratePerSqFt * currentProjectType.baseMultiplier
  );
  const totalEstimatedCost = baseStructureCost + addonsTotal;

  const handleEstimateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const res = await submitCalculatedEstimate({
      name,
      phone,
      email,
      location,
      projectType: currentProjectType.label,
      builtUpAreaSqFt: areaSqFt,
      packageType: currentPkg.name,
      addons: selectedAddons,
      estimatedTotal: totalEstimatedCost,
    });

    setSubmitting(false);
    if (res.success && res.refCode) {
      setRefCode(res.refCode);
    }
  };

  return (
    <div className="bg-surface border border-border shadow-md relative overflow-hidden">
      {/* Top Header Bar */}
      <div className="bg-charcoal text-white p-6 md:p-8 relative">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold via-gold-light to-gold-dark" />
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-full bg-gold/20 text-gold flex items-center justify-center">
            <Calculator size={20} />
          </div>
          <div>
            <span className="text-xs font-semibold text-gold uppercase tracking-wider block">
              Interactive Estimator
            </span>
            <h3 className="font-heading text-2xl font-bold text-warm-white">
              Construction Cost Calculator
            </h3>
          </div>
        </div>
        <p className="text-concrete-lighter text-sm max-w-xl leading-relaxed">
          Select your property parameters below to calculate an instant preliminary construction budget quote.
        </p>
      </div>

      <div className="p-6 md:p-10 space-y-10">
        {/* 1. Property Type Selection */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-charcoal mb-4">
            1. Select Project Type
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {projectTypes.map((pt) => (
              <button
                key={pt.id}
                type="button"
                onClick={() => setSelectedType(pt.id)}
                className={`p-3.5 text-xs font-semibold border text-center transition-all duration-200 ${
                  selectedType === pt.id
                    ? "bg-charcoal text-warm-white border-charcoal shadow-sm"
                    : "bg-white text-charcoal border-border hover:border-charcoal"
                }`}
              >
                {pt.label}
              </button>
            ))}
          </div>
        </div>

        {/* 2. Built-up Area Slider */}
        <div className="bg-warm-white p-6 border border-border/70">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <label htmlFor="areaInput" className="text-xs font-bold uppercase tracking-wider text-charcoal">
              2. Total Built-up Area (Sq. Ft.)
            </label>
            <div className="flex items-center gap-2">
              <input
                id="areaInput"
                type="number"
                min={500}
                max={15000}
                step={50}
                value={areaSqFt}
                onChange={(e) => setAreaSqFt(Number(e.target.value) || 500)}
                className="w-28 text-center font-heading font-bold text-lg text-charcoal bg-white border border-border py-1 px-2 focus:border-gold focus:outline-none"
              />
              <span className="text-xs font-semibold text-concrete">SQ. FT.</span>
            </div>
          </div>

          <input
            type="range"
            min={600}
            max={10000}
            step={100}
            value={areaSqFt}
            onChange={(e) => setAreaSqFt(Number(e.target.value))}
            className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-gold"
          />

          <div className="flex justify-between text-[11px] font-semibold text-concrete mt-2">
            <span>600 Sq.Ft.</span>
            <span>2,500 Sq.Ft.</span>
            <span>5,000 Sq.Ft.</span>
            <span>10,000 Sq.Ft.+</span>
          </div>
        </div>

        {/* 3. Package Selection */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-charcoal mb-4">
            3. Construction Quality Package
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {packages.map((pkg) => {
              const isSelected = selectedPackage === pkg.id;
              return (
                <div
                  key={pkg.id}
                  onClick={() => setSelectedPackage(pkg.id)}
                  className={`relative p-5 border cursor-pointer transition-all duration-300 ${
                    isSelected
                      ? "border-gold bg-gold/5 ring-1 ring-gold shadow-sm"
                      : "border-border bg-white hover:border-charcoal"
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold uppercase text-gold-dark bg-gold/15 px-2 py-0.5">
                      {pkg.badge}
                    </span>
                    {isSelected && <Check size={16} className="text-gold-dark" />}
                  </div>
                  <h4 className="font-heading text-lg font-bold text-charcoal mb-1">
                    {pkg.name}
                  </h4>
                  <p className="text-xs font-bold text-charcoal mb-3">
                    ₹{pkg.ratePerSqFt.toLocaleString("en-IN")} / sq. ft.
                  </p>
                  <p className="text-xs text-concrete leading-relaxed">
                    {pkg.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4. Optional Addons */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-charcoal mb-4">
            4. Custom Architectural & System Add-ons
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {addonsList.map((addon) => {
              const isChecked = selectedAddons.includes(addon.id);
              return (
                <div
                  key={addon.id}
                  onClick={() => toggleAddon(addon.id)}
                  className={`flex items-center justify-between p-3.5 border cursor-pointer text-xs font-semibold transition-all ${
                    isChecked
                      ? "bg-charcoal text-warm-white border-charcoal"
                      : "bg-white text-charcoal border-border hover:border-charcoal"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-4 h-4 border flex items-center justify-center ${
                        isChecked ? "border-gold bg-gold text-charcoal" : "border-concrete"
                      }`}
                    >
                      {isChecked && <Check size={12} strokeWidth={3} />}
                    </div>
                    <span>{addon.label}</span>
                  </div>
                  <span className={isChecked ? "text-gold" : "text-concrete"}>
                    +₹{addon.price.toLocaleString("en-IN")}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* 5. Live Calculation Result Box */}
        <div className="bg-charcoal text-warm-white p-6 md:p-8 border border-gold/30 relative">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/10">
            <div>
              <span className="text-xs font-semibold text-gold uppercase tracking-wider block mb-1">
                Estimated Total Construction Budget
              </span>
              <div className="font-heading text-3xl md:text-4xl font-bold text-warm-white">
                ₹{totalEstimatedCost.toLocaleString("en-IN")}
                <span className="text-xs font-normal text-concrete-lighter ml-2">
                  (Approx. ₹{Math.round(totalEstimatedCost / areaSqFt).toLocaleString("en-IN")} / sq.ft.)
                </span>
              </div>
            </div>

            <div className="text-xs text-concrete-lighter space-y-1">
              <p>✓ Includes Structural RCC &amp; Masonry</p>
              <p>✓ Includes Finishings &amp; Select Add-ons</p>
              <p>✓ Includes Architectural Consultation</p>
            </div>
          </div>

          {/* Quick Submission to Engineering Team */}
          {refCode ? (
            <div className="mt-6 p-4 bg-gold/15 border border-gold/40 text-center">
              <CheckCircle2 size={28} className="text-gold mx-auto mb-2" />
              <h4 className="font-heading text-lg font-bold text-warm-white mb-1">
                Quote Submitted Successfully!
              </h4>
              <p className="text-xs text-concrete-lighter mb-2">
                Your Reference Code is: <span className="text-gold font-mono font-bold">{refCode}</span>
              </p>
              <p className="text-xs text-concrete-lighter">
                Our estimation engineering team will contact you shortly to review the detailed bill of quantities.
              </p>
            </div>
          ) : (
            <form onSubmit={handleEstimateSubmit} className="mt-6 space-y-4">
              <p className="text-xs font-semibold text-gold uppercase tracking-wider">
                Lock in this quote &amp; request detailed BoQ breakdown
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name *"
                  className="px-3 py-2.5 text-xs bg-white/10 border border-white/20 text-white placeholder-concrete-lighter focus:border-gold focus:outline-none"
                />
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone Number *"
                  className="px-3 py-2.5 text-xs bg-white/10 border border-white/20 text-white placeholder-concrete-lighter focus:border-gold focus:outline-none"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email (Optional)"
                  className="px-3 py-2.5 text-xs bg-white/10 border border-white/20 text-white placeholder-concrete-lighter focus:border-gold focus:outline-none"
                />
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="City / Location *"
                  className="px-3 py-2.5 text-xs bg-white/10 border border-white/20 text-white placeholder-concrete-lighter focus:border-gold focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 bg-gold text-charcoal hover:bg-gold-dark transition-colors font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {submitting ? "Submitting..." : "Send Quote to Engineers"}
                <Send size={14} />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
