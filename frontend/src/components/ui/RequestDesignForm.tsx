"use client";

import { useState, useRef, useMemo } from "react";
import {
  Upload,
  X,
  ArrowRight,
  ShieldCheck,
  Clock,
  Sparkles,
  User,
  Ruler,
  Check,
  Paperclip,
  ChevronDown,
  Plus,
  Trash2,
  Award,
  Receipt,
  Home,
} from "lucide-react";
import { serviceCategories, type ServiceItem } from "@/data/rateCards";
import { signaturePackages } from "@/data/rateCardsLegacy";

/* ─── Package Rate Values (parallel to signaturePackages array order) ─── */
const packageRates: Record<string, number> = {
  "Basic Package":    3.60,
  "Standard Package": 6.20,
  "Premium Package":  10.50,
  "Elite Package":    15.00,
};

/* ─── Types ─────────────────────────────────────────────────────────── */
interface UploadedFile {
  name: string;
  size: string;
  type: string;
  previewUrl?: string;
}

interface SelectedService {
  item: ServiceItem;
  qty: number; // floors or rooms/views for per_floor / unit-fixed services; 1 for per_sft/flat fixed
}

/* ─── Constants ─────────────────────────────────────────────────────── */
const projectTypes = ["Residential", "Commercial"];

const commercialTypes = [
  "Shop / Retail", "Office Building", "Restaurant / Café", "Hotel / Resort",
  "School / Educational", "Hospital / Clinic", "Warehouse / Factory", "Showroom"
];

interface CommercialTypeSpec {
  label1: string;
  label2: string;
  label3: string;
  facilities: string[];
}

const commercialSpecs: Record<string, CommercialTypeSpec> = {
  "Shop / Retail": {
    label1: "Shops / Stalls",
    label2: "Storage Rooms",
    label3: "Staff Restrooms",
    facilities: [
      "Display Windows", "Trial / Fitting Rooms", "Billing Counter",
      "Customer Parking", "HVAC / Air Conditioning", "Inventory Storage"
    ],
  },
  "Office Building": {
    label1: "Workspaces / Cabins",
    label2: "Conference Rooms",
    label3: "Restrooms",
    facilities: [
      "Reception / Front Desk", "Cafeteria / Pantry", "Server / IT Room",
      "Elevators / Stairwell", "Basement Parking", "Breakout Zones"
    ],
  },
  "Restaurant / Café": {
    label1: "Seating Zones",
    label2: "Commercial Kitchens",
    label3: "Guest Restrooms",
    facilities: [
      "Commercial Kitchen", "Bar Counter", "Outdoor / Patio Seating",
      "Buffet Area", "Customer Parking", "Pantry & Cold Storage", "Billing / POS Station"
    ],
  },
  "Hotel / Resort": {
    label1: "Guest Rooms / Suites",
    label2: "Dining / Banquet Halls",
    label3: "En-Suite Restrooms",
    facilities: [
      "Grand Lobby & Reception", "Banquet / Event Hall", "Swimming Pool & Spa",
      "Commercial Kitchen", "Valet / Basement Parking", "Laundry & Service Rooms", "Elevator Towers"
    ],
  },
  "School / Educational": {
    label1: "Classrooms / Labs",
    label2: "Halls / Auditoriums",
    label3: "Student Restrooms",
    facilities: [
      "Science / Computer Labs", "Library & Study Hall", "Playground / Sports Arena",
      "Administrative Office", "Staff Room", "Canteen / Cafeteria", "School Bus Bay"
    ],
  },
  "Hospital / Clinic": {
    label1: "Consultation Wards",
    label2: "Operation Theatres",
    label3: "Sanitised Restrooms",
    facilities: [
      "Emergency / Casualty Ward", "Pharmacy & Storage", "ICU / OT Suites",
      "Diagnostic / X-Ray Lab", "Doctor Cabins", "Ambulance Bay", "Stretcher Elevators"
    ],
  },
  "Warehouse / Factory": {
    label1: "Storage Bays",
    label2: "Loading Docks",
    label3: "Worker Restrooms",
    facilities: [
      "Heavy Duty Flooring", "High Ceiling Clearance", "Forklift Ramps",
      "Office Mezzanine", "Security Gate & Weighbridge", "Fire Suppression System", "Staff Locker Rooms"
    ],
  },
  "Showroom": {
    label1: "Display Floor Units",
    label2: "Customer Lounges",
    label3: "Visitor Restrooms",
    facilities: [
      "Double Height Glass Facade", "Spotlight & Accent Lighting", "VIP Negotiation Lounge",
      "Service Workshop", "Customer Parking", "Inventory Yard", "Branding & Signage Towers"
    ],
  },
};

const customHouseFacilityOptions = [
  "Pooja Room", "Home Theatre", "Study / Home Office", "Balcony / Open Terrace",
  "Open Kitchen / Island", "Car Parking / Garage", "Store Room / Utility", "Servant Room / Bath", "Courtyard / Lawn"
];

export interface PerFloorConfig {
  sft: string;
  bedrooms: number;
  kitchens: number;
  baths: number;
  livingHalls: number;
  facilities: string[];
}

const initialPerFloorConfigs: PerFloorConfig[] = [
  { sft: "1100", bedrooms: 2, kitchens: 1, baths: 2, livingHalls: 1, facilities: ["Car Parking / Garage", "Pooja Room"] },
  { sft: "1100", bedrooms: 2, kitchens: 1, baths: 2, livingHalls: 1, facilities: ["Balcony / Open Terrace"] },
  { sft: "1000", bedrooms: 2, kitchens: 1, baths: 2, livingHalls: 1, facilities: ["Balcony / Open Terrace"] },
  { sft: "1000", bedrooms: 2, kitchens: 1, baths: 2, livingHalls: 1, facilities: ["Balcony / Open Terrace"] },
];

const floorNames = ["Ground Floor", "1st Floor", "2nd Floor", "3rd Floor"];

const requirementChips = [
  "Master Bedroom", "Attached Baths", "Open Kitchen", "Pooja Room",
  "Car Parking", "Study / Office", "Vastu Compliant", "Balcony",
];

/* ─── Helpers ────────────────────────────────────────────────────────── */
function calcLineItem(svc: SelectedService, builtUpSft: number, floors: number): number {
  const { item, qty } = svc;
  switch (item.rateType) {
    case "per_sft":   return Math.round(builtUpSft * item.rateValue);
    case "per_floor": return Math.round(floors * item.rateValue * qty);
    case "fixed":     return Math.round(item.rateValue * qty);
    default:          return 0;
  }
}

function needsQty(item: ServiceItem): boolean {
  // per_floor always needs qty; fixed services that are "per room/view" conceptually also do
  return item.rateType === "per_floor" || (item.rateType === "fixed" && item.rateValue >= 1500);
}

/* ═══════════════════════════════════════════════════════════════════════
   COMPONENT
══════════════════════════════════════════════════════════════════════ */
export default function RequestDesignForm() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formTopRef   = useRef<HTMLDivElement>(null);

  /* Contact */
  const [name,  setName]  = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  /* Plot */
  const [plotDimensions, setPlotDimensions] = useState("30 × 50 ft");
  const [plotArea,       setPlotArea]       = useState("1500");
  const [builtUpArea,    setBuiltUpArea]    = useState("2200");
  const [numFloors,      setNumFloors]      = useState("2");
  const [selectedProjectType, setSelectedProjectType] = useState("Residential");

  /* Commercial Configuration State */
  const [commercialType,       setCommercialType]       = useState("Shop / Retail");
  const [commercialUnits,      setCommercialUnits]      = useState(2);
  const [commercialKitchens,   setCommercialKitchens]   = useState(1);
  const [commercialRestrooms,  setCommercialRestrooms]  = useState(2);
  const [commercialFacilities, setCommercialFacilities] = useState<string[]>(["Reception / Front Desk", "Parking Lot / Basement"]);

  /* Custom House Configuration State */
  const [sameFloorPlan,   setSameFloorPlan]   = useState(true);
  const [perFloorConfigs, setPerFloorConfigs] = useState<PerFloorConfig[]>(initialPerFloorConfigs);
  const [activeFloorIdx,  setActiveFloorIdx]  = useState<number>(0);

  const floors = parseInt(numFloors) || 1;

  // Calculate Total Built-up SFT from all floors for Residential
  const totalResidentialSft = useMemo(() => {
    if (sameFloorPlan) {
      const singleSft = parseInt(perFloorConfigs[0]?.sft || "1100") || 1100;
      return singleSft * floors;
    } else {
      let sum = 0;
      for (let i = 0; i < floors; i++) {
        sum += parseInt(perFloorConfigs[i]?.sft || "1000") || 1000;
      }
      return sum;
    }
  }, [sameFloorPlan, perFloorConfigs, floors]);

  const updateFloorConfig = <K extends keyof PerFloorConfig>(floorIdx: number, key: K, val: PerFloorConfig[K]) => {
    setPerFloorConfigs(prev => {
      const copy = [...prev];
      if (sameFloorPlan) {
        return copy.map(f => ({ ...f, [key]: val }));
      } else {
        copy[floorIdx] = { ...copy[floorIdx], [key]: val };
        return copy;
      }
    });
  };

  /* Service selection (dropdown-driven, per category) */
  const [selectedServices, setSelectedServices] = useState<SelectedService[]>([]);
  const [activeDropdownCat, setActiveDropdownCat] = useState<string | null>(null);

  /* Signature package selection (single package at a time, optional) */
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [packageDropdownOpen, setPackageDropdownOpen] = useState(false);

  /* Chips */
  const [selectedChips, setSelectedChips] = useState<string[]>([
    "Master Bedroom", "Open Kitchen", "Pooja Room", "Vastu Compliant",
  ]);

  /* Files */
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragging,    setIsDragging]    = useState(false);

  /* Form flow */
  const [status,              setStatus]              = useState<"idle" | "submitting" | "success">("idle");
  const [showPreview,         setShowPreview]         = useState(false);

  /* ── Derived values ──────────────────────────────────────────────── */
  const sft = selectedProjectType === "Residential"
    ? totalResidentialSft
    : (parseInt(builtUpArea) || parseInt(plotArea) || 1500);

  const packageFee = useMemo(() => {
    if (!selectedPackage) return 0;
    const rate = packageRates[selectedPackage] ?? 0;
    return Math.round(sft * rate);
  }, [selectedPackage, sft]);

  const grandTotal = useMemo(
    () => packageFee + selectedServices.reduce((sum, ss) => sum + calcLineItem(ss, sft, floors), 0),
    [packageFee, selectedServices, sft, floors]
  );

  /* ── Handlers ────────────────────────────────────────────────────── */
  const handlePlotDimensionsChange = (val: string) => {
    setPlotDimensions(val);
    const m = val.match(/\d+(\.\d+)?/g);
    if (m && m.length >= 2) {
      const w = parseFloat(m[0]), h = parseFloat(m[1]);
      if (w > 0 && h > 0) setPlotArea(Math.round(w * h).toString());
    }
  };

  const addService = (item: ServiceItem) => {
    if (selectedServices.find(s => s.item.id === item.id)) return;
    setSelectedServices(prev => [...prev, { item, qty: 1 }]);
    setActiveDropdownCat(null);
  };

  const selectPackage = (name: string) => {
    setSelectedPackage(prev => prev === name ? null : name);
    setPackageDropdownOpen(false);
  };

  const removeService = (id: string) => {
    setSelectedServices(prev => prev.filter(s => s.item.id !== id));
  };

  const updateQty = (id: string, qty: number) => {
    setSelectedServices(prev =>
      prev.map(s => s.item.id === id ? { ...s, qty: Math.max(1, qty) } : s)
    );
  };

  const handleFileUpload = (fileList: FileList | null) => {
    if (!fileList) return;
    Array.from(fileList).forEach(file => {
      const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
      setUploadedFiles(prev => [...prev, {
        name: file.name,
        size: `${sizeMB} MB`,
        type: file.type.includes("pdf") ? "PDF" : "Image",
        previewUrl: file.type.includes("image") ? URL.createObjectURL(file) : undefined,
      }]);
    });
  };

  const toggleChip = (chip: string) =>
    setSelectedChips(prev =>
      prev.includes(chip) ? prev.filter(c => c !== chip) : [...prev, chip]
    );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setTimeout(() => {
      setStatus("success");
      formTopRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 450);
  };

  /* ══════════════════════════════════════════════════════════════════
     SUCCESS SCREEN
  ══════════════════════════════════════════════════════════════════ */
  if (status === "success") {
    return (
      <div ref={formTopRef} className="max-w-4xl mx-auto space-y-6 py-2">
        <div className="glass-panel rounded-[32px] p-6 md:p-10 text-center border border-border/80 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-gold via-terracotta to-gold-dark" />

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/15 border border-gold/40 text-gold-dark font-bold text-xs uppercase tracking-widest mb-4">
            <span className="w-2 h-2 rounded-full bg-gold-dark animate-ping" />
            Architectural Review — In Progress
          </div>

          <h2 className="font-heading text-2xl md:text-4xl font-bold text-charcoal mb-3">
            Your home design request is with our architects.
          </h2>
          <p className="text-concrete text-sm max-w-xl mx-auto mb-6">
            Our architectural team will verify your selected services, plot measurements, and uploaded files. Your quotation arrives within 24 hours.
          </p>

          {/* Fee box */}
          <div className="bg-charcoal text-warm-white p-5 rounded-2xl max-w-lg mx-auto border border-white/10 shadow-xl mb-6">
            <div className="flex items-center justify-center gap-2 text-gold font-bold text-xs uppercase tracking-wider mb-1">
              <Clock size={14} /> Estimated Project Fee
            </div>
            <p className="text-3xl font-heading font-bold">
              ₹{grandTotal.toLocaleString("en-IN")}
            </p>
            {selectedPackage && (
              <p className="text-[11px] text-gold-light mt-0.5">
                {selectedPackage} · {sft.toLocaleString("en-IN")} SFT × ₹{packageRates[selectedPackage]?.toFixed(2)}/SFT = ₹{packageFee.toLocaleString("en-IN")}
              </p>
            )}
            <p className="text-[11px] text-white/60 mt-1">
              {selectedServices.length} add-on service{selectedServices.length !== 1 ? "s" : ""} · Sent to <strong className="text-gold-light">{email || "your email"}</strong>
            </p>
          </div>

          {/* 3-step */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-left border-t border-border/60 pt-6 text-xs">
            {[
              { step: "01", title: "Brief Received", desc: "Plot measurements & service selections logged." },
              { step: "02", title: "Architect Review", active: true, desc: "Setbacks, Vastu & room proportions evaluated." },
              { step: "03", title: "Email Delivery", desc: "Fixed-fee quotation arrives within 24 hours." },
            ].map(s => (
              <div key={s.step} className={`p-4 rounded-xl border ${s.active ? "border-gold/60 ring-1 ring-gold/40" : "border-border/60"} bg-white/80`}>
                <div className="font-mono font-bold text-gold-dark text-[10px] mb-0.5">{s.step} —</div>
                <h4 className="font-bold text-charcoal text-xs mb-0.5">{s.title}</h4>
                <p className="text-[10px] text-concrete">{s.desc}</p>
              </div>
            ))}
          </div>

          <button
            onClick={() => setShowPreview(!showPreview)}
            className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-concrete hover:text-charcoal cursor-pointer"
          >
            {showPreview ? "Hide" : "Preview"} Quotation Format
            <ChevronDown size={13} className={`transition-transform ${showPreview ? "rotate-180" : ""}`} />
          </button>
        </div>

        {showPreview && (
          <div className="glass-card p-6 rounded-2xl border border-border shadow-xl space-y-3 text-xs">
            <div className="flex justify-between border-b border-border pb-2">
              <span className="font-bold uppercase tracking-widest text-gold-dark text-[10px]">PREPARED QUOTATION</span>
              <span className="font-mono text-concrete text-[10px]">FIXED FEE GUARANTEE</span>
            </div>
            <p className="text-concrete">
              {selectedProjectType === "Commercial"
                ? `Commercial — ${commercialType} (${commercialUnits} Units, ${commercialKitchens} Pantry, ${commercialRestrooms} Restrooms)`
                : `Residential House (${floors} Floor${floors > 1 ? "s" : ""} ${sameFloorPlan && floors > 1 ? "Identical Plan" : "Custom Layout"} · ${perFloorConfigs[0]?.bedrooms || 2} Beds, ${perFloorConfigs[0]?.baths || 2} Baths per floor)`} · {plotDimensions} · {sft.toLocaleString("en-IN")} SFT Total Built-Up
            </p>
            <div className="space-y-1.5">
              {selectedServices.map(ss => (
                <div key={ss.item.id} className="flex justify-between items-center py-1 border-b border-border/40">
                  <span className="text-charcoal font-medium">{ss.item.service}</span>
                  <span className="font-mono font-bold text-gold-dark">₹{calcLineItem(ss, sft, floors).toLocaleString("en-IN")}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center bg-warm-white p-3 rounded-xl border border-border font-bold">
              <span className="text-charcoal">Total Estimated Fee</span>
              <span className="font-heading text-xl text-gold-dark">₹{grandTotal.toLocaleString("en-IN")}</span>
            </div>
          </div>
        )}
      </div>
    );
  }

  /* ══════════════════════════════════════════════════════════════════
     MAIN FORM
  ══════════════════════════════════════════════════════════════════ */
  return (
    <div ref={formTopRef} className="max-w-5xl mx-auto space-y-6">

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/15 border border-gold/30 text-[10px] font-bold tracking-widest uppercase text-gold-dark">
          <Sparkles size={11} /> Architectural Consultation Studio
        </span>
        <h1 className="font-heading font-bold text-2xl md:text-4xl text-charcoal leading-tight">
          Request a Home Design Brief
        </h1>
        <p className="text-concrete text-xs leading-relaxed max-w-lg mx-auto">
          Pick the exact services you need from each category. Your fee updates live as you select.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white/90 backdrop-blur-xl rounded-[32px] border border-border/80 shadow-2xl p-6 md:p-8 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

          {/* ── LEFT (7 cols) ─────────────────────────────────────────── */}
          <div className="lg:col-span-7 space-y-5">

            {/* 1. Contact */}
            <div className="bg-warm-white/80 p-4 rounded-2xl border border-border/70 space-y-2.5">
              <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-charcoal/70">
                <User size={12} className="text-gold-dark" />1. Contact Details
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <input type="text"  required value={name}  onChange={e => setName(e.target.value)}  placeholder="Full Name *"  className="px-3 py-2 bg-white border border-border text-charcoal text-xs rounded-xl focus:border-gold focus:outline-none" />
                <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="Email *"      className="px-3 py-2 bg-white border border-border text-charcoal text-xs rounded-xl focus:border-gold focus:outline-none" />
                <input type="tel"   required value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone *"      className="px-3 py-2 bg-white border border-border text-charcoal text-xs rounded-xl focus:border-gold focus:outline-none" />
              </div>
            </div>

            {/* 2. Plot dimensions & Area */}
            <div className="bg-warm-white/80 p-4 rounded-2xl border border-border/70 space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-charcoal/70">
                  <Ruler size={12} className="text-gold-dark" />2. Plot Dimensions &amp; Area
                </div>
                <span className="text-[10px] text-concrete font-medium">
                  {plotArea ? `Calculated Area: ${parseInt(plotArea).toLocaleString("en-IN")} SFT` : "Auto-calculates area"}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <div>
                  <label className="block text-[9px] font-bold uppercase text-concrete mb-1">Dimensions &amp; Area *</label>
                  <input type="text" required value={plotDimensions} onChange={e => handlePlotDimensionsChange(e.target.value)} placeholder="30 × 50 ft" className="w-full px-2.5 py-2 bg-white border border-border text-charcoal text-xs font-bold rounded-xl focus:border-gold focus:outline-none" />
                </div>
                <div>
                  <label className="block text-[9px] font-bold uppercase text-concrete mb-1">Built-up (SFT)</label>
                  <input type="text" value={builtUpArea} onChange={e => setBuiltUpArea(e.target.value)} placeholder="2200" className="w-full px-2.5 py-2 bg-white border border-border text-charcoal text-xs font-bold rounded-xl focus:border-gold focus:outline-none font-mono" />
                </div>
                <div>
                  <label className="block text-[9px] font-bold uppercase text-concrete mb-1">Floors</label>
                  <select value={numFloors} onChange={e => setNumFloors(e.target.value)} className="w-full px-2 py-2 bg-white border border-border text-charcoal text-xs rounded-xl focus:border-gold focus:outline-none">
                    <option value="1">1 (Ground)</option>
                    <option value="2">2 (G + 1)</option>
                    <option value="3">3 (G + 2)</option>
                    <option value="4">4 (G + 3)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* 3. Config */}
            <div className="bg-warm-white/80 p-4 rounded-2xl border border-border/70 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal/70">3. Configuration</span>
                <span className="text-[9px] font-bold text-gold-dark bg-gold/15 px-2 py-0.5 rounded-full uppercase tracking-wider">
                  {selectedProjectType === "Commercial" ? "Commercial Spec" : "Residential Spec"}
                </span>
              </div>

              <div className="bg-linen/80 p-1 rounded-xl flex flex-wrap sm:flex-nowrap gap-1 border border-border/60">
                {projectTypes.map(pt => (
                  <button key={pt} type="button" onClick={() => setSelectedProjectType(pt)}
                    className={`flex-1 py-1.5 px-2 text-xs font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap text-center ${selectedProjectType === pt ? "bg-charcoal text-warm-white shadow-sm" : "text-concrete hover:text-charcoal"}`}>
                    {pt}
                  </button>
                ))}
              </div>

              {/* Commercial Detailed Parameters */}
              {selectedProjectType === "Commercial" && (() => {
                const currentSpec = commercialSpecs[commercialType] || commercialSpecs["Shop / Retail"];
                return (
                  <div className="pt-2 border-t border-border/50 space-y-3 animate-fadeIn">
                    <div>
                      <label className="block text-[9px] font-bold uppercase tracking-wider text-concrete mb-1">Commercial Building Type</label>
                      <select
                        value={commercialType}
                        onChange={e => {
                          const newType = e.target.value;
                          setCommercialType(newType);
                          const spec = commercialSpecs[newType];
                          if (spec && spec.facilities.length >= 2) {
                            setCommercialFacilities([spec.facilities[0], spec.facilities[1]]);
                          }
                        }}
                        className="w-full px-3 py-2 bg-white border border-border text-charcoal text-xs font-bold rounded-xl focus:border-gold focus:outline-none"
                      >
                        {commercialTypes.map(ct => (
                          <option key={ct} value={ct}>{ct}</option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center">
                      {/* Counter 1 */}
                      <div className="bg-white p-2 rounded-xl border border-border/60">
                        <span className="block text-[9px] font-bold uppercase text-concrete mb-1 truncate">{currentSpec.label1}</span>
                        <div className="flex items-center justify-center gap-1.5">
                          <button type="button" onClick={() => setCommercialUnits(u => Math.max(1, u - 1))} className="w-5 h-5 rounded border border-border text-xs flex items-center justify-center font-bold text-concrete hover:text-charcoal cursor-pointer">−</button>
                          <span className="text-xs font-bold font-mono text-charcoal w-4">{commercialUnits}</span>
                          <button type="button" onClick={() => setCommercialUnits(u => u + 1)} className="w-5 h-5 rounded border border-border text-xs flex items-center justify-center font-bold text-concrete hover:text-charcoal cursor-pointer">+</button>
                        </div>
                      </div>

                      {/* Counter 2 */}
                      <div className="bg-white p-2 rounded-xl border border-border/60">
                        <span className="block text-[9px] font-bold uppercase text-concrete mb-1 truncate">{currentSpec.label2}</span>
                        <div className="flex items-center justify-center gap-1.5">
                          <button type="button" onClick={() => setCommercialKitchens(k => Math.max(0, k - 1))} className="w-5 h-5 rounded border border-border text-xs flex items-center justify-center font-bold text-concrete hover:text-charcoal cursor-pointer">−</button>
                          <span className="text-xs font-bold font-mono text-charcoal w-4">{commercialKitchens}</span>
                          <button type="button" onClick={() => setCommercialKitchens(k => k + 1)} className="w-5 h-5 rounded border border-border text-xs flex items-center justify-center font-bold text-concrete hover:text-charcoal cursor-pointer">+</button>
                        </div>
                      </div>

                      {/* Counter 3 */}
                      <div className="bg-white p-2 rounded-xl border border-border/60">
                        <span className="block text-[9px] font-bold uppercase text-concrete mb-1 truncate">{currentSpec.label3}</span>
                        <div className="flex items-center justify-center gap-1.5">
                          <button type="button" onClick={() => setCommercialRestrooms(r => Math.max(1, r - 1))} className="w-5 h-5 rounded border border-border text-xs flex items-center justify-center font-bold text-concrete hover:text-charcoal cursor-pointer">−</button>
                          <span className="text-xs font-bold font-mono text-charcoal w-4">{commercialRestrooms}</span>
                          <button type="button" onClick={() => setCommercialRestrooms(r => r + 1)} className="w-5 h-5 rounded border border-border text-xs flex items-center justify-center font-bold text-concrete hover:text-charcoal cursor-pointer">+</button>
                        </div>
                      </div>
                    </div>

                    {/* Commercial Facilities */}
                    <div className="space-y-1.5">
                      <span className="block text-[9px] font-bold uppercase tracking-wider text-concrete">Commercial Facilities &amp; Infrastructure ({commercialType})</span>
                      <div className="flex flex-wrap gap-1.5">
                        {currentSpec.facilities.map(opt => {
                          const active = commercialFacilities.includes(opt);
                          return (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => setCommercialFacilities(prev => active ? prev.filter(o => o !== opt) : [...prev, opt])}
                              className={`px-2 py-0.5 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                                active ? "bg-gold/20 text-gold-dark border border-gold/50" : "bg-white text-concrete border border-border hover:border-gold"
                              }`}
                            >
                              {active ? `✓ ${opt}` : `+ ${opt}`}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* Residential House Detailed Parameters */}
              {selectedProjectType === "Residential" && (
                <div className="pt-2 border-t border-border/50 space-y-4 animate-fadeIn">
                  {/* Step 1: Dimensions & Number of Floors */}
                  <div className="bg-white p-3.5 rounded-2xl border border-border/70 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal flex items-center gap-1.5">
                        <Ruler size={12} className="text-gold-dark" /> Step 1: Dimensions &amp; Number of Floors
                      </span>
                      <span className="text-[9px] font-bold text-gold-dark bg-gold/15 px-2 py-0.5 rounded-full">
                        {plotArea ? `${parseInt(plotArea).toLocaleString("en-IN")} SFT Plot` : "Auto-area"}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div>
                        <label className="block text-[9px] font-bold uppercase text-concrete mb-1">Dimensions &amp; Area *</label>
                        <input
                          type="text"
                          required
                          value={plotDimensions}
                          onChange={e => handlePlotDimensionsChange(e.target.value)}
                          placeholder="30 × 50 ft"
                          className="w-full px-2.5 py-1.5 bg-warm-white border border-border text-charcoal text-xs font-bold rounded-xl focus:border-gold focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] font-bold uppercase text-concrete mb-1">Number of Floors *</label>
                        <select
                          value={numFloors}
                          onChange={e => setNumFloors(e.target.value)}
                          className="w-full px-2 py-1.5 bg-warm-white border border-border text-charcoal text-xs font-bold rounded-xl focus:border-gold focus:outline-none"
                        >
                          <option value="1">1 Floor (Ground Only)</option>
                          <option value="2">2 Floors (Ground + 1st)</option>
                          <option value="3">3 Floors (Ground + 2 Floors)</option>
                          <option value="4">4 Floors (Ground + 3 Floors)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Same Floor Plan Toggle (When Floors > 1) */}
                  {floors > 1 && (
                    <div className="bg-linen/90 p-3 rounded-2xl border border-gold/40 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <input
                          type="checkbox"
                          id="sameFloorPlanCheck"
                          checked={sameFloorPlan}
                          onChange={e => setSameFloorPlan(e.target.checked)}
                          className="w-4 h-4 accent-gold-dark cursor-pointer rounded"
                        />
                        <label htmlFor="sameFloorPlanCheck" className="text-xs font-bold text-charcoal cursor-pointer">
                          Ground floor &amp; upper floors have the same floor plan (Identical Layout)
                        </label>
                      </div>
                      <span className="text-[9px] font-bold uppercase tracking-wider text-gold-dark bg-gold/20 px-2 py-0.5 rounded-full whitespace-nowrap">
                        {sameFloorPlan ? "Identical Layout" : "Custom Per Floor"}
                      </span>
                    </div>
                  )}

                  {/* Step 2: Per-Floor Built-up Area, Rooms & Options */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal flex items-center gap-1.5">
                        <Home size={12} className="text-gold-dark" /> Step 2: Floor Built-up Area &amp; Room Layout
                      </span>
                      <span className="text-[10px] font-mono font-bold text-gold-dark bg-gold/15 px-2.5 py-1 rounded-full">
                        Total Built-up: {totalResidentialSft.toLocaleString("en-IN")} SFT
                      </span>
                    </div>

                    {/* Floor Tabs when sameFloorPlan is FALSE and floors > 1 */}
                    {floors > 1 && !sameFloorPlan && (
                      <div className="flex gap-1.5 bg-linen/70 p-1 rounded-xl border border-border/60 overflow-x-auto">
                        {Array.from({ length: floors }).map((_, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setActiveFloorIdx(idx)}
                            className={`flex-1 py-1 px-3 text-xs font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap text-center ${
                              activeFloorIdx === idx ? "bg-charcoal text-warm-white shadow-sm" : "text-concrete hover:text-charcoal"
                            }`}
                          >
                            {floorNames[idx] || `Floor ${idx + 1}`}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Active Floor Configuration Box */}
                    {(() => {
                      const currentFloorIdx = (floors > 1 && !sameFloorPlan) ? activeFloorIdx : 0;
                      const currentConfig = perFloorConfigs[currentFloorIdx] || perFloorConfigs[0];
                      const activeLabel = sameFloorPlan
                        ? (floors > 1 ? `Identical Layout (All ${floors} Floors)` : "Ground Floor")
                        : (floorNames[currentFloorIdx] || `Floor ${currentFloorIdx + 1}`);

                      return (
                        <div className="bg-white p-3.5 rounded-2xl border border-border/70 space-y-3">
                          {/* Floor SFT Input */}
                          <div className="flex items-center justify-between gap-3 bg-warm-white p-2.5 rounded-xl border border-border/60">
                            <div>
                              <label className="block text-[10px] font-bold uppercase text-charcoal">
                                {activeLabel} Built-up Area (SFT) *
                              </label>
                              <span className="text-[9px] text-concrete">
                                {sameFloorPlan && floors > 1 ? `Calculates total as ${parseInt(currentConfig.sft || "0") * floors} SFT across ${floors} floors` : `Specify SFT for ${activeLabel}`}
                              </span>
                            </div>
                            <input
                              type="text"
                              required
                              value={currentConfig.sft}
                              onChange={e => updateFloorConfig(currentFloorIdx, "sft", e.target.value)}
                              placeholder="1100"
                              className="w-28 px-3 py-1.5 bg-white border border-border text-charcoal text-xs font-bold font-mono rounded-xl focus:border-gold focus:outline-none text-right"
                            />
                          </div>

                          {/* Room Counters */}
                          <div className="grid grid-cols-4 gap-1.5 text-center">
                            {/* Bedrooms */}
                            <div className="bg-linen/40 p-2 rounded-xl border border-border/60">
                              <span className="block text-[9px] font-bold uppercase text-concrete mb-1">Bedrooms</span>
                              <div className="flex items-center justify-center gap-1">
                                <button type="button" onClick={() => updateFloorConfig(currentFloorIdx, "bedrooms", Math.max(1, currentConfig.bedrooms - 1))} className="w-4 h-4 rounded border border-border text-xs flex items-center justify-center font-bold text-concrete hover:text-charcoal cursor-pointer">−</button>
                                <span className="text-xs font-bold font-mono text-charcoal w-3">{currentConfig.bedrooms}</span>
                                <button type="button" onClick={() => updateFloorConfig(currentFloorIdx, "bedrooms", currentConfig.bedrooms + 1)} className="w-4 h-4 rounded border border-border text-xs flex items-center justify-center font-bold text-concrete hover:text-charcoal cursor-pointer">+</button>
                              </div>
                            </div>

                            {/* Kitchens */}
                            <div className="bg-linen/40 p-2 rounded-xl border border-border/60">
                              <span className="block text-[9px] font-bold uppercase text-concrete mb-1">Kitchens</span>
                              <div className="flex items-center justify-center gap-1">
                                <button type="button" onClick={() => updateFloorConfig(currentFloorIdx, "kitchens", Math.max(0, currentConfig.kitchens - 1))} className="w-4 h-4 rounded border border-border text-xs flex items-center justify-center font-bold text-concrete hover:text-charcoal cursor-pointer">−</button>
                                <span className="text-xs font-bold font-mono text-charcoal w-3">{currentConfig.kitchens}</span>
                                <button type="button" onClick={() => updateFloorConfig(currentFloorIdx, "kitchens", currentConfig.kitchens + 1)} className="w-4 h-4 rounded border border-border text-xs flex items-center justify-center font-bold text-concrete hover:text-charcoal cursor-pointer">+</button>
                              </div>
                            </div>

                            {/* Bathrooms */}
                            <div className="bg-linen/40 p-2 rounded-xl border border-border/60">
                              <span className="block text-[9px] font-bold uppercase text-concrete mb-1">Baths</span>
                              <div className="flex items-center justify-center gap-1">
                                <button type="button" onClick={() => updateFloorConfig(currentFloorIdx, "baths", Math.max(1, currentConfig.baths - 1))} className="w-4 h-4 rounded border border-border text-xs flex items-center justify-center font-bold text-concrete hover:text-charcoal cursor-pointer">−</button>
                                <span className="text-xs font-bold font-mono text-charcoal w-3">{currentConfig.baths}</span>
                                <button type="button" onClick={() => updateFloorConfig(currentFloorIdx, "baths", currentConfig.baths + 1)} className="w-4 h-4 rounded border border-border text-xs flex items-center justify-center font-bold text-concrete hover:text-charcoal cursor-pointer">+</button>
                              </div>
                            </div>

                            {/* Living Halls */}
                            <div className="bg-linen/40 p-2 rounded-xl border border-border/60">
                              <span className="block text-[9px] font-bold uppercase text-concrete mb-1">Living Halls</span>
                              <div className="flex items-center justify-center gap-1">
                                <button type="button" onClick={() => updateFloorConfig(currentFloorIdx, "livingHalls", Math.max(1, currentConfig.livingHalls - 1))} className="w-4 h-4 rounded border border-border text-xs flex items-center justify-center font-bold text-concrete hover:text-charcoal cursor-pointer">−</button>
                                <span className="text-xs font-bold font-mono text-charcoal w-3">{currentConfig.livingHalls}</span>
                                <button type="button" onClick={() => updateFloorConfig(currentFloorIdx, "livingHalls", currentConfig.livingHalls + 1)} className="w-4 h-4 rounded border border-border text-xs flex items-center justify-center font-bold text-concrete hover:text-charcoal cursor-pointer">+</button>
                              </div>
                            </div>
                          </div>

                          {/* Special Amenities for active floor */}
                          <div className="space-y-1.5">
                            <span className="block text-[9px] font-bold uppercase tracking-wider text-concrete">
                              {activeLabel} Features &amp; Special Rooms
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {customHouseFacilityOptions.map(opt => {
                                const active = currentConfig.facilities.includes(opt);
                                return (
                                  <button
                                    key={opt}
                                    type="button"
                                    onClick={() => {
                                      const nextFacs = active
                                        ? currentConfig.facilities.filter(o => o !== opt)
                                        : [...currentConfig.facilities, opt];
                                      updateFloorConfig(currentFloorIdx, "facilities", nextFacs);
                                    }}
                                    className={`px-2 py-0.5 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                                      active ? "bg-gold/20 text-gold-dark border border-gold/50" : "bg-white text-concrete border border-border hover:border-gold"
                                    }`}
                                  >
                                    {active ? `✓ ${opt}` : `+ ${opt}`}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </div>
              )}
            </div>

            {/* 4. Service Selection — packages + per-category dropdowns */}
            <div className="bg-warm-white/80 p-4 rounded-2xl border border-gold/40 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal/80 flex items-center gap-1.5">
                  <Award size={13} className="text-gold-dark" />
                  4. Select Services (Official Rate Card)
                </span>
                <span className="text-[9px] font-bold text-gold-dark bg-gold/15 px-2 py-0.5 rounded-full">Package or individual</span>
              </div>

              {/* ── SIGNATURE PACKAGES DROPDOWN (primary option) ── */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => { setPackageDropdownOpen(o => !o); setActiveDropdownCat(null); }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl border text-xs font-bold cursor-pointer transition-all ${
                    selectedPackage
                      ? "border-gold bg-gold/15 text-charcoal"
                      : packageDropdownOpen
                      ? "border-gold bg-gold/10 text-charcoal"
                      : "border-border bg-white text-concrete hover:border-charcoal hover:text-charcoal"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Award size={13} className="text-gold-dark flex-shrink-0" />
                    <span>
                      {selectedPackage
                        ? <>{selectedPackage} &nbsp;<span className="text-gold-dark font-mono">₹{packageRates[selectedPackage]?.toFixed(2)}/SFT</span></>
                        : "Signature Package (recommended)"}
                    </span>
                  </span>
                  <div className="flex items-center gap-1.5">
                    {selectedPackage && (
                      <span
                        onClick={e => { e.stopPropagation(); setSelectedPackage(null); }}
                        className="text-concrete hover:text-red-500 cursor-pointer"
                      >
                        <X size={13} />
                      </span>
                    )}
                    <ChevronDown size={13} className={`transition-transform ${packageDropdownOpen ? "rotate-180" : ""}`} />
                  </div>
                </button>

                {packageDropdownOpen && (
                  <div className="absolute z-40 top-full mt-1 left-0 right-0 bg-white border border-border rounded-xl shadow-2xl overflow-hidden">
                    {signaturePackages.map(pkg => {
                      const rate = packageRates[pkg.name] ?? 0;
                      const est  = Math.round(sft * rate);
                      const active = selectedPackage === pkg.name;
                      return (
                        <button
                          key={pkg.name}
                          type="button"
                          onClick={() => selectPackage(pkg.name)}
                          className={`w-full text-left px-3 py-3 hover:bg-gold/10 border-b border-border/40 last:border-0 transition-colors cursor-pointer flex items-start justify-between gap-3 ${
                            active ? "bg-gold/15" : ""
                          }`}
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className="text-[11px] font-bold text-charcoal">{pkg.name}</span>
                              <span className="text-[9px] font-bold uppercase tracking-wide text-gold-dark bg-gold/20 px-1.5 py-0.5 rounded">{pkg.badge}</span>
                              {active && <Check size={12} className="text-gold-dark" strokeWidth={3} />}
                            </div>
                            <p className="text-[10px] text-concrete leading-tight">{pkg.includedServices}</p>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <div className="text-[10px] font-bold font-mono text-gold-dark">{pkg.rateFormula}</div>
                            <div className="text-[10px] text-concrete">Est. ₹{est.toLocaleString("en-IN")}</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* ── DIVIDER ── */}
              <div className="flex items-center gap-2">
                <div className="flex-1 h-px bg-border/60" />
                <span className="text-[9px] font-bold uppercase tracking-widest text-concrete">Or add individual services</span>
                <div className="flex-1 h-px bg-border/60" />
              </div>

              {/* ── INDIVIDUAL SERVICE DROPDOWNS (one per category) ── */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {serviceCategories.map((cat, catIndex) => {
                  const alreadySelectedIds = new Set(selectedServices.map(s => s.item.id));
                  const available = cat.items.filter(i => !alreadySelectedIds.has(i.id));
                  const isOpen = activeDropdownCat === cat.id;

                  return (
                    <div key={cat.id} className="relative">
                      <button
                        type="button"
                        onClick={() => setActiveDropdownCat(isOpen ? null : cat.id)}
                        className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border text-xs font-bold cursor-pointer transition-all ${
                          isOpen ? "border-gold bg-gold/10 text-charcoal shadow-sm" : "border-border bg-white text-concrete hover:border-charcoal hover:text-charcoal"
                        }`}
                      >
                        <span className="flex items-center gap-1.5 whitespace-nowrap">
                          <Plus size={12} className="text-gold-dark flex-shrink-0" />
                          <span>{cat.shortLabel}</span>
                        </span>
                        <ChevronDown size={13} className={`transition-transform flex-shrink-0 ml-2 ${isOpen ? "rotate-180" : ""}`} />
                      </button>

                      {isOpen && available.length > 0 && (
                        <div
                          className={`absolute z-40 top-full mt-1.5 ${
                            catIndex % 2 === 1 ? "right-0 left-auto sm:right-0" : "left-0"
                          } w-max min-w-full sm:min-w-[320px] max-w-[min(420px,94vw)] bg-white border border-border rounded-2xl shadow-2xl overflow-hidden max-h-72 overflow-y-auto divide-y divide-border/30`}
                        >
                          {available.map(item => (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => addService(item)}
                              className="w-full text-left px-3.5 py-2.5 hover:bg-gold/10 transition-colors cursor-pointer flex items-center justify-between gap-3 text-xs group"
                            >
                              <span className="text-[11px] font-semibold text-charcoal leading-snug text-left flex-1 whitespace-normal break-words group-hover:text-gold-dark transition-colors">
                                {item.service}
                              </span>
                              <span className="text-[10px] font-bold text-gold-dark whitespace-nowrap font-mono flex-shrink-0 bg-gold/10 px-2 py-0.5 rounded border border-gold/20">
                                {item.rateLabel}
                              </span>
                            </button>
                          ))}
                          {available.length === 0 && (
                            <div className="px-3 py-2 text-[11px] text-concrete">All services added</div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Selected services list */}
              {selectedServices.length > 0 && (
                <div className="mt-1 space-y-1.5 border-t border-border/50 pt-3">
                  {selectedServices.map(ss => {
                    const lineTotal = calcLineItem(ss, sft, floors);
                    const showQty = needsQty(ss.item);
                    return (
                      <div key={ss.item.id} className="flex items-center gap-2 bg-white p-2 rounded-xl border border-border/60">
                        <div className="flex-1 min-w-0">
                          <p className="text-[11px] font-bold text-charcoal truncate">{ss.item.service}</p>
                          <p className="text-[10px] text-concrete">{ss.item.rateLabel}</p>
                        </div>
                        {showQty && (
                          <div className="flex items-center gap-1 flex-shrink-0">
                            <button type="button" onClick={() => updateQty(ss.item.id, ss.qty - 1)} className="w-5 h-5 rounded border border-border text-xs flex items-center justify-center text-concrete hover:text-charcoal cursor-pointer">−</button>
                            <span className="w-5 text-center text-xs font-bold text-charcoal">{ss.qty}</span>
                            <button type="button" onClick={() => updateQty(ss.item.id, ss.qty + 1)} className="w-5 h-5 rounded border border-border text-xs flex items-center justify-center text-concrete hover:text-charcoal cursor-pointer">+</button>
                          </div>
                        )}
                        <span className="text-xs font-bold font-mono text-gold-dark w-20 text-right flex-shrink-0">
                          ₹{lineTotal.toLocaleString("en-IN")}
                        </span>
                        <button type="button" onClick={() => removeService(ss.item.id)} className="text-concrete hover:text-red-500 flex-shrink-0 cursor-pointer">
                          <Trash2 size={13} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}

              {selectedServices.length === 0 && (
                <p className="text-[11px] text-concrete text-center py-2">
                  Select services above — your fee builds up automatically.
                </p>
              )}
            </div>

          </div>

          {/* ── RIGHT (5 cols) ────────────────────────────────────────── */}
          <div className="lg:col-span-5 space-y-5">

            {/* Live Fee Total */}
            <div className="bg-charcoal text-white p-5 rounded-2xl border border-gold/40 shadow-xl space-y-3 relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-[9px] font-bold uppercase tracking-widest text-gold flex items-center gap-1.5">
                  <Receipt size={12} /> Live Estimated Fee
                </span>
                <span className="text-[9px] font-mono text-white/40">
                  {sft.toLocaleString("en-IN")} SFT · {floors} floor{floors > 1 ? "s" : ""}
                </span>
              </div>

              {!selectedPackage && selectedServices.length === 0 ? (
                <p className="text-white/40 text-xs py-2">Select a Signature Package or individual services to see your fee.</p>
              ) : (
                <div className="space-y-1.5 max-h-44 overflow-y-auto">
                  {/* Package line */}
                  {selectedPackage && (
                    <div className="flex justify-between text-[11px] pb-1.5 border-b border-white/10">
                      <span className="text-gold-light font-bold truncate pr-2 flex items-center gap-1">
                        <Award size={11} className="flex-shrink-0" />
                        {selectedPackage}
                      </span>
                      <span className="font-mono text-gold-light whitespace-nowrap font-bold">₹{packageFee.toLocaleString("en-IN")}</span>
                    </div>
                  )}
                  {/* Individual add-on lines */}
                  {selectedServices.map(ss => (
                    <div key={ss.item.id} className="flex justify-between text-[11px]">
                      <span className="text-white/70 truncate pr-2">{ss.item.service}</span>
                      <span className="font-mono text-gold-light whitespace-nowrap">₹{calcLineItem(ss, sft, floors).toLocaleString("en-IN")}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="border-t border-white/20 pt-2 flex items-center justify-between">
                <span className="text-xs font-bold text-white/70">Total Estimate</span>
                <span className="text-2xl font-heading font-bold text-warm-white">
                  {grandTotal > 0 ? `₹${grandTotal.toLocaleString("en-IN")}` : "—"}
                </span>
              </div>
              <p className="text-[9px] text-white/40">Final fee confirmed by architects within 24 hours.</p>
            </div>

            {/* Upload */}
            <div className="bg-warm-white/80 p-4 rounded-2xl border border-border/70 space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-charcoal/70">
                  <Upload size={12} className="text-gold-dark" />5. Upload Rough Plan / FMB
                </div>
                <span className="text-[9px] font-bold uppercase text-gold-dark bg-gold/15 px-2 py-0.5 rounded-full">Optional</span>
              </div>
              <div
                onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={e => { e.preventDefault(); setIsDragging(false); handleFileUpload(e.dataTransfer.files); }}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-3.5 text-center cursor-pointer transition-all ${isDragging ? "border-gold bg-gold/10" : "border-border hover:border-gold bg-white"}`}
              >
                <input ref={fileInputRef} type="file" multiple accept=".jpg,.jpeg,.png,.pdf,.heic" className="hidden" onChange={e => handleFileUpload(e.target.files)} />
                <Paperclip size={16} className="mx-auto text-gold-dark mb-1" />
                <p className="text-xs font-bold text-charcoal">Upload Rough Plan / FMB / Photos</p>
                <p className="text-[10px] text-concrete-light">JPG, PNG, PDF, HEIC</p>
              </div>
              {uploadedFiles.length > 0 && (
                <div className="space-y-1 max-h-20 overflow-y-auto">
                  {uploadedFiles.map((f, i) => (
                    <div key={i} className="bg-white p-1.5 rounded-lg border border-border flex items-center justify-between text-[10px]">
                      <span className="truncate font-medium text-charcoal max-w-[180px]">{f.name}</span>
                      <button type="button" onClick={() => setUploadedFiles(prev => prev.filter((_, idx) => idx !== i))} className="text-concrete hover:text-red-600"><X size={12} /></button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Chips */}
            <div className="bg-warm-white/80 p-3.5 rounded-2xl border border-border/70 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal/70 block">6. Room &amp; Feature Preferences</span>
              <div className="flex flex-wrap gap-1.5">
                {requirementChips.map(chip => {
                  const active = selectedChips.includes(chip);
                  return (
                    <button key={chip} type="button" onClick={() => toggleChip(chip)}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${active ? "bg-charcoal text-warm-white" : "bg-white text-concrete border border-border hover:border-gold"}`}>
                      {active ? `✓ ${chip}` : `+ ${chip}`}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Submit */}
            <div>
              <button
                type="submit"
                disabled={status === "submitting" || selectedServices.length === 0}
                className="w-full py-4 px-6 bg-charcoal text-warm-white hover:bg-charcoal-light rounded-2xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer shadow-xl transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "submitting" ? (
                  <span>Submitting to Architects…</span>
                ) : (
                  <>
                    <span>Submit for 24-Hour Review</span>
                    <ArrowRight size={15} className="text-gold" />
                  </>
                )}
              </button>
              {selectedServices.length === 0 && (
                <p className="text-[10px] text-concrete text-center mt-1.5">Select at least one service to submit.</p>
              )}
              <div className="flex items-center justify-center gap-1.5 text-[10px] text-concrete mt-2">
                <ShieldCheck size={13} className="text-gold-dark" />
                <span>Reviewed by in-house architects · 24-hour delivery</span>
              </div>
            </div>

          </div>
        </div>
      </form>
    </div>
  );
}
