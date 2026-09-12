"use client";

import React, { useState, useRef, useMemo, useEffect } from "react";
import {
  X,
  User,
  Ruler,
  Check,
  ChevronDown,
  ChevronUp,
  Plus,
  Award,
  Send,
  CheckCircle2,
  Trash2,
  Layers,
  Maximize2,
  Minimize2,
  MessageCircle,
  Loader2,
  AlertCircle,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { serviceCategories, type ServiceItem } from "@/data/rateCards";
import { signaturePackages } from "@/data/rateCardsLegacy";
import { saveProjectPlan, ProjectPlanPayload, ProjectPlanResponse } from "@/services/projectPlanApi";
import ImageUpload from "@/components/ui/ImageUpload";
import type { Attachment } from "@/lib/attachments";

const packageRates: Record<string, number> = {
  "Basic Package": 3.60,
  "Standard Package": 6.20,
  "Premium Package": 10.50,
  "Elite Package": 15.00,
};

interface SelectedService {
  item: ServiceItem;
  qty: number;
}

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

export interface DynamicFloorLevel {
  id: string;
  name: string;
  length: string;
  breadth: string;
  bedrooms: number;
  kitchens: number;
  baths: number;
  livingHalls: number;
}

const getArchitecturalFloorName = (index: number): string => {
  if (index === 0) return "Ground Floor";
  if (index === 1) return "1st Floor";
  if (index === 2) return "2nd Floor";
  if (index === 3) return "3rd Floor";
  return `${index}th Floor`;
};

const defaultFloorNames = ["Ground Floor", "1st Floor", "2nd Floor", "3rd Floor", "4th Floor", "5th Floor", "6th Floor", "7th Floor"];

const initialFloorLevels: DynamicFloorLevel[] = [
  { id: "ground", name: "Ground Floor", length: "30", breadth: "40", bedrooms: 2, kitchens: 1, baths: 2, livingHalls: 1 },
  { id: "floor_1", name: "1st Floor", length: "30", breadth: "40", bedrooms: 2, kitchens: 1, baths: 2, livingHalls: 1 },
];

const residentialRequirementChips = [
  "Master Bedroom", "Attached Baths", "Open Kitchen", "Pooja Room",
  "Car Parking", "Study / Office", "Vastu Compliant", "Balcony",
];

const commercialRequirementChips = [
  "Glass Facade", "HVAC Air Conditioning", "EV Charging Bays",
  "Customer & Staff Parking", "Freight / Loading Access", "Heavy Duty Flooring",
  "CCTV & Access Control", "Fire Suppression System", "Passenger Elevators",
  "Generator Power Backup", "Mezzanine Office", "High Ceiling Clearance"
];

function calcLineItem(svc: SelectedService, builtUpSft: number, floors: number): number {
  const { item, qty } = svc;
  switch (item.rateType) {
    case "per_sft":   return Math.round(builtUpSft * item.rateValue);
    case "per_floor": return Math.round(floors * item.rateValue * qty);
    case "fixed":     return Math.round(item.rateValue * qty);
    default:          return 0;
  }
}

interface SimplePlannerFormProps {
  forcedType?: "Residential" | "Commercial";
}

export default function SimplePlannerForm({ forcedType }: SimplePlannerFormProps) {
  const formTopRef = useRef<HTMLDivElement>(null);

  /* Selected Project Type (Residential vs Commercial) */
  const [selectedProjectType, setSelectedProjectType] = useState<string>(forcedType || "Residential");

  const [prevForcedType, setPrevForcedType] = useState(forcedType);
  if (prevForcedType !== forcedType) {
    setPrevForcedType(forcedType);
    if (forcedType) {
      setSelectedProjectType(forcedType);
    }
  }

  /* Contact Information */
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  /* Plot Length, Width & Reference Title */
  const [plotLength, setPlotLength] = useState("30");
  const [plotWidth, setPlotWidth] = useState("50");
  const [projectName, setProjectName] = useState("");

  /* Dynamic Floor Levels & Maximize/Minimize (Expanded/Collapsed) State */
  const [floorLevels, setFloorLevels] = useState<DynamicFloorLevel[]>(initialFloorLevels);
  const [expandedFloorIds, setExpandedFloorIds] = useState<string[]>(["ground"]);

  /* Commercial Specifications */
  const [commercialType, setCommercialType] = useState("Shop / Retail");
  const [commercialUnits, setCommercialUnits] = useState(2);
  const [commercialKitchens, setCommercialKitchens] = useState(1);
  const [commercialRestrooms, setCommercialRestrooms] = useState(2);
  const [commercialFacilities, setCommercialFacilities] = useState<string[]>(["Display Windows", "Customer Parking"]);

  /* Vehicle Parking & Road */
  const [cars, setCars] = useState(2);
  const [twoWheelers, setTwoWheelers] = useState(2);
  const [roadFacing, setRoadFacing] = useState("East");
  const [specialNotes, setSpecialNotes] = useState("");

  /* Rate Cards & Services */
  const [selectedServices, setSelectedServices] = useState<SelectedService[]>([]);
  const [activeDropdownCat, setActiveDropdownCat] = useState<string | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [packageDropdownOpen, setPackageDropdownOpen] = useState(false);

  /* Requirement Chips */
  const [selectedChips, setSelectedChips] = useState<string[]>(
    forcedType === "Commercial" ? ["Glass Facade", "HVAC Air Conditioning", "Customer & Staff Parking"] : ["Master Bedroom", "Open Kitchen", "Pooja Room", "Vastu Compliant"]
  );

  /* Switch default chips when project type toggles */
  const [prevProjectTypeForChips, setPrevProjectTypeForChips] = useState(selectedProjectType);
  if (prevProjectTypeForChips !== selectedProjectType) {
    setPrevProjectTypeForChips(selectedProjectType);
    if (selectedProjectType === "Commercial") {
      setSelectedChips(["Glass Facade", "HVAC Air Conditioning", "Customer & Staff Parking"]);
    } else {
      setSelectedChips(["Master Bedroom", "Open Kitchen", "Pooja Room", "Vastu Compliant"]);
    }
  }

  /* Files & Submission */
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submittedPlan, setSubmittedPlan] = useState<ProjectPlanResponse | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  /* ── Live Calculations ─────────────────────────────────────────── */
  const plotAreaNum = (parseFloat(plotLength) || 0) * (parseFloat(plotWidth) || 0);

  // Total Built-up SFT summed across all floor levels
  const totalAllFloorsSft = useMemo(() => {
    return floorLevels.reduce((sum, fl) => {
      const flSft = (parseFloat(fl.length) || 0) * (parseFloat(fl.breadth) || 0);
      return sum + flSft;
    }, 0);
  }, [floorLevels]);

  const numFloorsCount = floorLevels.length;

  const sft = selectedProjectType === "Residential"
    ? totalAllFloorsSft
    : (plotAreaNum * numFloorsCount || 2200);

  const packageFee = useMemo(() => {
    if (!selectedPackage) return 0;
    const rate = packageRates[selectedPackage] ?? 0;
    return Math.round(sft * rate);
  }, [selectedPackage, sft]);

  const grandTotal = useMemo(
    () => packageFee + selectedServices.reduce((sum, ss) => sum + calcLineItem(ss, sft, numFloorsCount), 0),
    [packageFee, selectedServices, sft, numFloorsCount]
  );

  /* ── Floor Level Dynamic & Expand/Collapse Handlers ──────────── */
  const toggleFloorExpand = (id: string) => {
    setExpandedFloorIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const expandAllFloors = () => {
    setExpandedFloorIds(floorLevels.map(f => f.id));
  };

  const collapseAllFloors = () => {
    setExpandedFloorIds([]);
  };

  const addFloorLevel = () => {
    const newId = `floor_${Date.now()}`;
    setFloorLevels((prev) => {
      const baseLength = prev[0]?.length || "30";
      const baseBreadth = prev[0]?.breadth || "40";

      const newFloor: DynamicFloorLevel = {
        id: newId,
        name: "",
        length: baseLength,
        breadth: baseBreadth,
        bedrooms: 2,
        kitchens: 1,
        baths: 2,
        livingHalls: 1,
      };

      const updated = [...prev, newFloor];
      // Always re-index floor names in strict architectural order: Ground Floor, 1st Floor, 2nd Floor...
      return updated.map((f, idx) => ({
        ...f,
        name: getArchitecturalFloorName(idx),
      }));
    });
    setExpandedFloorIds((prev) => [...prev, newId]);
  };

  const removeFloorLevel = (id: string) => {
    setFloorLevels((prev) => {
      if (prev.length <= 1) return prev;
      const filtered = prev.filter((f) => f.id !== id);
      // Re-index remaining floors so level 0 is always Ground Floor, level 1 is 1st Floor, etc.
      return filtered.map((f, idx) => ({
        ...f,
        name: getArchitecturalFloorName(idx),
      }));
    });
    setExpandedFloorIds((prev) => prev.filter((x) => x !== id));
  };

  const moveFloorLevel = (fromIndex: number, toIndex: number) => {
    setFloorLevels((prev) => {
      if (fromIndex < 0 || fromIndex >= prev.length || toIndex < 0 || toIndex >= prev.length) return prev;
      const copy = [...prev];
      const [movedItem] = copy.splice(fromIndex, 1);
      copy.splice(toIndex, 0, movedItem);
      // Re-index names to maintain proper architectural floor order
      return copy.map((f, idx) => ({
        ...f,
        name: getArchitecturalFloorName(idx),
      }));
    });
  };

  const updateFloorLevel = (id: string, updates: Partial<DynamicFloorLevel>) => {
    setFloorLevels((prev) => {
      const copy = [...prev];
      const idx = copy.findIndex(f => f.id === id);
      if (idx !== -1) {
        copy[idx] = { ...copy[idx], ...updates };
      }
      return copy;
    });
  };

  const toggleChip = (chip: string) => {
    setSelectedChips(prev =>
      prev.includes(chip) ? prev.filter(c => c !== chip) : [...prev, chip]
    );
  };

  const addService = (item: ServiceItem) => {
    if (selectedServices.find(s => s.item.id === item.id)) return;
    setSelectedServices(prev => [...prev, { item, qty: 1 }]);
    setActiveDropdownCat(null);
  };

  const removeService = (id: string) => {
    setSelectedServices(prev => prev.filter(s => s.item.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isUploading) return;
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const payload: ProjectPlanPayload = {
        name,
        email,
        phone,
        projectType: selectedProjectType,
        commercialType: selectedProjectType === "Commercial" ? commercialType : undefined,
        projectName: projectName || (selectedProjectType === "Commercial" ? "Commercial Building Project" : "Residential House Project"),
        plotLength: parseFloat(plotLength) || 0,
        plotWidth: parseFloat(plotWidth) || 0,
        plotUnit: "ft",
        plotAreaSft: plotAreaNum,
        numFloors: floorLevels.length,
        totalBuiltUpSft: totalAllFloorsSft,
        floorDetails: JSON.stringify(floorLevels),
        selectedPackage: selectedPackage || undefined,
        selectedServices: selectedServices.length > 0 ? JSON.stringify(selectedServices.map(s => ({ id: s.item.id, title: s.item.service, qty: s.qty }))) : undefined,
        selectedFeatures: selectedChips.join(", "),
        parkingCarsCount: cars,
        parkingTwoWheelersCount: twoWheelers,
        roadSide: roadFacing,
        estimatedFee: grandTotal > 0 ? grandTotal : undefined,
        specialNotes: specialNotes || undefined,
        attachments,
      };

      const result = await saveProjectPlan(payload);
      setSubmittedPlan(result);
      setIsSubmitted(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to submit project plan. Please try again.";
      setSubmitError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    const refCode = submittedPlan?.refCode || "PRJ-" + new Date().toISOString().slice(0, 10).replace(/-/g, "");
    return (
      <div className="bg-white border border-border rounded-3xl p-8 text-center space-y-6 max-w-xl mx-auto shadow-2xl animate-fadeIn">
        <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-emerald-600 border border-emerald-200">
          <CheckCircle2 size={36} />
        </div>
        <div className="space-y-2">
          <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
            Plan Stored Successfully
          </span>
          <h3 className="font-heading font-bold text-2xl text-charcoal">Project Plan Received!</h3>
          <p className="text-concrete text-xs leading-relaxed">
            Thank you, <strong className="text-charcoal">{name || "Valued Client"}</strong>. Your project plan has been safely recorded in our database. Our architecture and engineering team will review your specifications.
          </p>
        </div>

        <div className="bg-warm-white p-4 rounded-2xl border border-border/80 text-left space-y-3 font-sans">
          <div className="flex justify-between items-center pb-2 border-b border-border/60">
            <span className="text-xs text-concrete font-bold uppercase">Reference Code</span>
            <span className="font-mono font-bold text-sm bg-gold/20 text-gold-dark px-2.5 py-0.5 rounded-md">
              {refCode}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-concrete block text-[10px] uppercase">Project Type</span>
              <strong className="text-charcoal">{selectedProjectType}</strong>
            </div>
            <div>
              <span className="text-concrete block text-[10px] uppercase">Total Built-Up</span>
              <strong className="text-charcoal">{totalAllFloorsSft.toLocaleString("en-IN")} SFT</strong>
            </div>
            <div>
              <span className="text-concrete block text-[10px] uppercase">Floors</span>
              <strong className="text-charcoal">{floorLevels.length} Levels</strong>
            </div>
            <div>
              <span className="text-concrete block text-[10px] uppercase">Est. Fee</span>
              <strong className="text-gold-dark">{grandTotal > 0 ? `₹${grandTotal.toLocaleString("en-IN")}` : "Custom Quote"}</strong>
            </div>
          </div>
        </div>

        <div className="space-y-3 pt-2">
          <button
            type="button"
            onClick={() => {
              const floorDetailsText = floorLevels.map((f, idx) => `  • ${getArchitecturalFloorName(idx)}: ${f.length}x${f.breadth} ft (${(parseFloat(f.length)||0)*(parseFloat(f.breadth)||0)} SFT)`).join('\n');
              const msg = `*Project Plan Inquiry [Ref: ${refCode}]*\n\n*Client Name:* ${name || "Client"}\n*Phone:* ${phone || "Not specified"}\n*Project Type:* ${selectedProjectType}\n*Plot:* ${plotLength} x ${plotWidth} ft (${plotAreaNum.toLocaleString('en-IN')} SFT)\n*Total Floors:* ${floorLevels.length} Levels\n*Total Built-up:* ${totalAllFloorsSft.toLocaleString('en-IN')} SFT\n\n*Floor Breakdown:*\n${floorDetailsText}\n\n${selectedPackage ? `*Package:* ${selectedPackage}\n` : ''}${grandTotal > 0 ? `*Est. Fee:* ₹${grandTotal.toLocaleString('en-IN')}\n` : ''}\nReference: ${refCode}`;
              const url = `https://wa.me/919486038761?text=${encodeURIComponent(msg)}`;
              window.open(url, "_blank", "noopener,noreferrer");
            }}
            className="w-full py-3.5 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-2xl text-xs font-bold uppercase tracking-widest transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
          >
            <MessageCircle size={16} />
            <span>Discuss on WhatsApp with Ref #{refCode}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setIsSubmitted(false);
              setSubmittedPlan(null);
            }}
            className="w-full py-3 bg-linen text-charcoal rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-gold/20 transition-all cursor-pointer border border-border"
          >
            Submit Another Project Plan
          </button>
        </div>
      </div>
    );
  }

  return (
    <div ref={formTopRef} className="max-w-5xl mx-auto space-y-6">
      <form onSubmit={handleSubmit} className="bg-white/90 backdrop-blur-xl rounded-[32px] border border-border/80 shadow-2xl p-6 md:p-8 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

          {/* ── LEFT (7 COLS): Form Fields ────────────────────────────── */}
          <div className="lg:col-span-7 space-y-5">

            {/* 1. Contact Information */}
            <div className="bg-warm-white/80 p-4 rounded-2xl border border-border/70 space-y-2.5">
              <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-charcoal/70">
                <User size={12} className="text-gold-dark" /> 1. Your Contact Information
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Full Name *"
                  className="px-3 py-2 bg-white border border-border text-charcoal text-xs rounded-xl focus:border-gold focus:outline-none"
                />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Email Address *"
                  className="px-3 py-2 bg-white border border-border text-charcoal text-xs rounded-xl focus:border-gold focus:outline-none"
                />
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="Phone Number *"
                  className="px-3 py-2 bg-white border border-border text-charcoal text-xs rounded-xl focus:border-gold focus:outline-none"
                />
              </div>
            </div>

            {/* 2. Plot Dimensions & Land Details */}
            <div className="bg-warm-white/80 p-4 rounded-2xl border border-border/70 space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-charcoal/70">
                  <Ruler size={12} className="text-gold-dark" /> 2. Plot &amp; Land Details
                </div>
                <span className="text-[10px] text-concrete font-medium font-mono">
                  {plotAreaNum > 0 ? `Calculated Plot: ${plotAreaNum.toLocaleString("en-IN")} SFT` : "Auto-calculated plot area"}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[9px] font-bold uppercase text-concrete mb-1">Plot Length &amp; Width (ft) *</label>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      required
                      value={plotLength}
                      onChange={e => setPlotLength(e.target.value)}
                      placeholder="30"
                      className="w-full px-2.5 py-2 bg-white border border-border text-charcoal text-xs font-bold rounded-xl focus:border-gold focus:outline-none text-center font-mono"
                    />
                    <span className="text-concrete font-bold text-xs">×</span>
                    <input
                      type="number"
                      required
                      value={plotWidth}
                      onChange={e => setPlotWidth(e.target.value)}
                      placeholder="50"
                      className="w-full px-2.5 py-2 bg-white border border-border text-charcoal text-xs font-bold rounded-xl focus:border-gold focus:outline-none text-center font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[9px] font-bold uppercase text-concrete mb-1">Project Name (Optional)</label>
                  <input
                    type="text"
                    value={projectName}
                    onChange={e => setProjectName(e.target.value)}
                    placeholder={selectedProjectType === "Commercial" ? "e.g. Apex Commercial Plaza" : "e.g. Greenwood Family Villa"}
                    className="w-full px-2.5 py-2 bg-white border border-border text-charcoal text-xs font-bold rounded-xl focus:border-gold focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* 3. Floor Layout & Room Details */}
            <div className="bg-warm-white/80 p-4 rounded-2xl border border-border/70 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal/70 flex items-center gap-1.5">
                    <Layers size={13} className="text-gold-dark" /> 3. Floor Layout &amp; Room Details ({numFloorsCount} {numFloorsCount === 1 ? "Floor" : "Floors"})
                  </span>
                  
                  {/* Expand / Collapse All Quick Controls */}
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-concrete">
                    <button
                      type="button"
                      onClick={expandAllFloors}
                      className="hover:text-charcoal transition-colors cursor-pointer"
                    >
                      Expand All
                    </button>
                    <span>•</span>
                    <button
                      type="button"
                      onClick={collapseAllFloors}
                      className="hover:text-charcoal transition-colors cursor-pointer"
                    >
                      Collapse All
                    </button>
                  </div>
                </div>
                
                {/* Aggregated Total SFT Badge */}
                <div className="bg-gold/20 border border-gold/50 text-gold-dark px-3 py-1 rounded-xl flex items-center gap-1.5 text-xs font-bold font-mono">
                  <span className="text-[10px] text-charcoal/70 uppercase">Total Built-up:</span>
                  <span>{totalAllFloorsSft.toLocaleString("en-IN")} SFT</span>
                </div>
              </div>

              {/* Dynamic Collapsible Floor Cards List */}
              <div className="space-y-2.5">
                {floorLevels.map((fl, flIdx) => {
                  const flSft = (parseFloat(fl.length) || 0) * (parseFloat(fl.breadth) || 0);
                  const isExpanded = expandedFloorIds.includes(fl.id);
                  const floorDisplayName = getArchitecturalFloorName(flIdx);

                  return (
                    <div
                      key={fl.id}
                      className={`bg-white rounded-2xl border transition-all duration-200 shadow-xs ${
                        isExpanded ? "border-gold ring-1 ring-gold/30 p-3.5 space-y-3" : "border-border/80 p-3 hover:border-gold/50"
                      }`}
                    >
                      {/* Card Header Toggle Bar */}
                      <div
                        onClick={() => toggleFloorExpand(fl.id)}
                        className="flex items-center justify-between cursor-pointer select-none"
                      >
                        <div className="flex items-center gap-2.5">
                          <button
                            type="button"
                            className="w-6 h-6 rounded-lg bg-linen/80 flex items-center justify-center text-charcoal hover:bg-gold/20 transition-colors"
                          >
                            {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                          </button>
                          
                          <span className="text-xs font-bold text-charcoal flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-gold-dark" />
                            {floorDisplayName}
                          </span>

                          {/* Minimized Quick Specs Indicator */}
                          {!isExpanded && (
                            <span className="text-[11px] text-concrete font-medium hidden sm:inline border-l border-border pl-2.5">
                              {selectedProjectType === "Commercial"
                                ? `${fl.length || 0} × ${fl.breadth || 0} ft • Commercial Floor Space`
                                : `${fl.length || 0} × ${fl.breadth || 0} ft • ${fl.bedrooms} Bed, ${fl.kitchens} Kitchen, ${fl.baths} Bath`
                              }
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                          <span className="text-xs font-mono font-bold text-gold-dark bg-gold/15 px-2.5 py-0.5 rounded-full">
                            {flSft.toLocaleString("en-IN")} SFT
                          </span>

                          {/* Move Floor Up/Down controls */}
                          {floorLevels.length > 1 && (
                            <div className="flex items-center gap-0.5">
                              {flIdx > 0 && (
                                <button
                                  type="button"
                                  onClick={() => moveFloorLevel(flIdx, flIdx - 1)}
                                  className="text-concrete hover:text-charcoal transition-colors p-1 cursor-pointer"
                                  title="Move Floor Down (swap with lower level)"
                                >
                                  <ArrowUp size={13} />
                                </button>
                              )}
                              {flIdx < floorLevels.length - 1 && (
                                <button
                                  type="button"
                                  onClick={() => moveFloorLevel(flIdx, flIdx + 1)}
                                  className="text-concrete hover:text-charcoal transition-colors p-1 cursor-pointer"
                                  title="Move Floor Up (swap with upper level)"
                                >
                                  <ArrowDown size={13} />
                                </button>
                              )}
                            </div>
                          )}

                          <button
                            type="button"
                            onClick={() => toggleFloorExpand(fl.id)}
                            className="text-concrete hover:text-charcoal transition-colors p-1 cursor-pointer"
                            title={isExpanded ? "Minimize Card" : "Maximize Card"}
                          >
                            {isExpanded ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
                          </button>

                          {floorLevels.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeFloorLevel(fl.id)}
                              className="text-concrete hover:text-red-600 transition-colors p-1 cursor-pointer"
                              title="Delete Floor"
                            >
                              <Trash2 size={14} />
                            </button>
                          )}
                        </div>
                      </div>

                      {/* EXPANDED CARD BODY */}
                      {isExpanded && (
                        <div className="pt-2 border-t border-border/50 space-y-3 animate-fadeIn">
                          {/* Length & Breadth Inputs */}
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[9px] font-bold uppercase text-concrete mb-1">Floor Length (ft)</label>
                              <input
                                type="number"
                                required
                                value={fl.length}
                                onChange={(e) => updateFloorLevel(fl.id, { length: e.target.value })}
                                placeholder="30"
                                className="w-full px-3 py-2 bg-warm-white border border-border text-charcoal text-xs font-bold font-mono rounded-xl focus:border-gold focus:outline-none"
                              />
                            </div>

                            <div>
                              <label className="block text-[9px] font-bold uppercase text-concrete mb-1">Floor Width (ft)</label>
                              <input
                                type="number"
                                required
                                value={fl.breadth}
                                onChange={(e) => updateFloorLevel(fl.id, { breadth: e.target.value })}
                                placeholder="40"
                                className="w-full px-3 py-2 bg-warm-white border border-border text-charcoal text-xs font-bold font-mono rounded-xl focus:border-gold focus:outline-none"
                              />
                            </div>
                          </div>

                          {/* Room Counters */}
                          {selectedProjectType === "Residential" ? (
                            <div className="grid grid-cols-4 gap-2 pt-2 border-t border-border/40 text-center">
                              <div className="bg-linen/40 p-2 rounded-xl border border-border/50">
                                <span className="block text-[9px] font-bold uppercase text-concrete mb-1">Bedrooms</span>
                                <div className="flex items-center justify-center gap-1">
                                  <button type="button" onClick={() => updateFloorLevel(fl.id, { bedrooms: Math.max(1, fl.bedrooms - 1) })} className="w-5 h-5 rounded border border-border text-xs flex items-center justify-center font-bold text-concrete hover:text-charcoal cursor-pointer">−</button>
                                  <span className="text-xs font-bold font-mono text-charcoal w-4">{fl.bedrooms}</span>
                                  <button type="button" onClick={() => updateFloorLevel(fl.id, { bedrooms: fl.bedrooms + 1 })} className="w-5 h-5 rounded border border-border text-xs flex items-center justify-center font-bold text-concrete hover:text-charcoal cursor-pointer">+</button>
                                </div>
                              </div>

                              <div className="bg-linen/40 p-2 rounded-xl border border-border/50">
                                <span className="block text-[9px] font-bold uppercase text-concrete mb-1">Kitchens</span>
                                <div className="flex items-center justify-center gap-1">
                                  <button type="button" onClick={() => updateFloorLevel(fl.id, { kitchens: Math.max(0, fl.kitchens - 1) })} className="w-5 h-5 rounded border border-border text-xs flex items-center justify-center font-bold text-concrete hover:text-charcoal cursor-pointer">−</button>
                                  <span className="text-xs font-bold font-mono text-charcoal w-4">{fl.kitchens}</span>
                                  <button type="button" onClick={() => updateFloorLevel(fl.id, { kitchens: fl.kitchens + 1 })} className="w-5 h-5 rounded border border-border text-xs flex items-center justify-center font-bold text-concrete hover:text-charcoal cursor-pointer">+</button>
                                </div>
                              </div>

                              <div className="bg-linen/40 p-2 rounded-xl border border-border/50">
                                <span className="block text-[9px] font-bold uppercase text-concrete mb-1">Baths</span>
                                <div className="flex items-center justify-center gap-1">
                                  <button type="button" onClick={() => updateFloorLevel(fl.id, { baths: Math.max(1, fl.baths - 1) })} className="w-5 h-5 rounded border border-border text-xs flex items-center justify-center font-bold text-concrete hover:text-charcoal cursor-pointer">−</button>
                                  <span className="text-xs font-bold font-mono text-charcoal w-4">{fl.baths}</span>
                                  <button type="button" onClick={() => updateFloorLevel(fl.id, { baths: fl.baths + 1 })} className="w-5 h-5 rounded border border-border text-xs flex items-center justify-center font-bold text-concrete hover:text-charcoal cursor-pointer">+</button>
                                </div>
                              </div>

                              <div className="bg-linen/40 p-2 rounded-xl border border-border/50">
                                <span className="block text-[9px] font-bold uppercase text-concrete mb-1">Living Halls</span>
                                <div className="flex items-center justify-center gap-1">
                                  <button type="button" onClick={() => updateFloorLevel(fl.id, { livingHalls: Math.max(0, fl.livingHalls - 1) })} className="w-5 h-5 rounded border border-border text-xs flex items-center justify-center font-bold text-concrete hover:text-charcoal cursor-pointer">−</button>
                                  <span className="text-xs font-bold font-mono text-charcoal w-4">{fl.livingHalls}</span>
                                  <button type="button" onClick={() => updateFloorLevel(fl.id, { livingHalls: fl.livingHalls + 1 })} className="w-5 h-5 rounded border border-border text-xs flex items-center justify-center font-bold text-concrete hover:text-charcoal cursor-pointer">+</button>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-border/40 text-center">
                              <div className="bg-linen/40 p-2 rounded-xl border border-border/50">
                                <span className="block text-[9px] font-bold uppercase text-concrete mb-1">Units / Cabins</span>
                                <div className="flex items-center justify-center gap-1">
                                  <button type="button" onClick={() => updateFloorLevel(fl.id, { bedrooms: Math.max(1, fl.bedrooms - 1) })} className="w-5 h-5 rounded border border-border text-xs flex items-center justify-center font-bold text-concrete hover:text-charcoal cursor-pointer">−</button>
                                  <span className="text-xs font-bold font-mono text-charcoal w-4">{fl.bedrooms}</span>
                                  <button type="button" onClick={() => updateFloorLevel(fl.id, { bedrooms: fl.bedrooms + 1 })} className="w-5 h-5 rounded border border-border text-xs flex items-center justify-center font-bold text-concrete hover:text-charcoal cursor-pointer">+</button>
                                </div>
                              </div>

                              <div className="bg-linen/40 p-2 rounded-xl border border-border/50">
                                <span className="block text-[9px] font-bold uppercase text-concrete mb-1">Restrooms</span>
                                <div className="flex items-center justify-center gap-1">
                                  <button type="button" onClick={() => updateFloorLevel(fl.id, { baths: Math.max(1, fl.baths - 1) })} className="w-5 h-5 rounded border border-border text-xs flex items-center justify-center font-bold text-concrete hover:text-charcoal cursor-pointer">−</button>
                                  <span className="text-xs font-bold font-mono text-charcoal w-4">{fl.baths}</span>
                                  <button type="button" onClick={() => updateFloorLevel(fl.id, { baths: fl.baths + 1 })} className="w-5 h-5 rounded border border-border text-xs flex items-center justify-center font-bold text-concrete hover:text-charcoal cursor-pointer">+</button>
                                </div>
                              </div>

                              <div className="bg-linen/40 p-2 rounded-xl border border-border/50">
                                <span className="block text-[9px] font-bold uppercase text-concrete mb-1">Utility / Service Rooms</span>
                                <div className="flex items-center justify-center gap-1">
                                  <button type="button" onClick={() => updateFloorLevel(fl.id, { kitchens: Math.max(0, fl.kitchens - 1) })} className="w-5 h-5 rounded border border-border text-xs flex items-center justify-center font-bold text-concrete hover:text-charcoal cursor-pointer">−</button>
                                  <span className="text-xs font-bold font-mono text-charcoal w-4">{fl.kitchens}</span>
                                  <button type="button" onClick={() => updateFloorLevel(fl.id, { kitchens: fl.kitchens + 1 })} className="w-5 h-5 rounded border border-border text-xs flex items-center justify-center font-bold text-concrete hover:text-charcoal cursor-pointer">+</button>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Add Floor Button */}
              <button
                type="button"
                onClick={addFloorLevel}
                className="w-full py-2.5 border-2 border-dashed border-gold/60 hover:border-gold hover:bg-gold/10 text-gold-dark rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Plus size={15} />
                <span>+ Add Another Floor</span>
              </button>
            </div>

            {/* 4. Commercial Details */}
            {selectedProjectType === "Commercial" && (() => {
              const currentSpec = commercialSpecs[commercialType] || commercialSpecs["Shop / Retail"];
              return (
                <div className="bg-warm-white/80 p-4 rounded-2xl border border-border/70 space-y-3 animate-fadeIn">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal/70 block">
                    4. Commercial Building Details
                  </span>
                  <div>
                    <label className="block text-[9px] font-bold uppercase tracking-wider text-concrete mb-1">Building Category</label>
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
                    <div className="bg-white p-2.5 rounded-xl border border-border/60">
                      <span className="block text-[9px] font-bold uppercase text-concrete mb-1 truncate">{currentSpec.label1}</span>
                      <div className="flex items-center justify-center gap-1.5">
                        <button type="button" onClick={() => setCommercialUnits(u => Math.max(1, u - 1))} className="w-5 h-5 rounded border border-border text-xs flex items-center justify-center font-bold text-concrete hover:text-charcoal cursor-pointer">−</button>
                        <span className="text-xs font-bold font-mono text-charcoal w-4">{commercialUnits}</span>
                        <button type="button" onClick={() => setCommercialUnits(u => u + 1)} className="w-5 h-5 rounded border border-border text-xs flex items-center justify-center font-bold text-concrete hover:text-charcoal cursor-pointer">+</button>
                      </div>
                    </div>

                    <div className="bg-white p-2.5 rounded-xl border border-border/60">
                      <span className="block text-[9px] font-bold uppercase text-concrete mb-1 truncate">{currentSpec.label2}</span>
                      <div className="flex items-center justify-center gap-1.5">
                        <button type="button" onClick={() => setCommercialKitchens(k => Math.max(0, k - 1))} className="w-5 h-5 rounded border border-border text-xs flex items-center justify-center font-bold text-concrete hover:text-charcoal cursor-pointer">−</button>
                        <span className="text-xs font-bold font-mono text-charcoal w-4">{commercialKitchens}</span>
                        <button type="button" onClick={() => setCommercialKitchens(k => k + 1)} className="w-5 h-5 rounded border border-border text-xs flex items-center justify-center font-bold text-concrete hover:text-charcoal cursor-pointer">+</button>
                      </div>
                    </div>

                    <div className="bg-white p-2.5 rounded-xl border border-border/60">
                      <span className="block text-[9px] font-bold uppercase text-concrete mb-1 truncate">{currentSpec.label3}</span>
                      <div className="flex items-center justify-center gap-1.5">
                        <button type="button" onClick={() => setCommercialRestrooms(r => Math.max(1, r - 1))} className="w-5 h-5 rounded border border-border text-xs flex items-center justify-center font-bold text-concrete hover:text-charcoal cursor-pointer">−</button>
                        <span className="text-xs font-bold font-mono text-charcoal w-4">{commercialRestrooms}</span>
                        <button type="button" onClick={() => setCommercialRestrooms(r => r + 1)} className="w-5 h-5 rounded border border-border text-xs flex items-center justify-center font-bold text-concrete hover:text-charcoal cursor-pointer">+</button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <span className="block text-[9px] font-bold uppercase tracking-wider text-concrete">Key Features &amp; Infrastructure</span>
                    <div className="flex flex-wrap gap-1.5">
                      {currentSpec.facilities.map(opt => {
                        const active = commercialFacilities.includes(opt);
                        return (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => setCommercialFacilities(prev => active ? prev.filter(o => o !== opt) : [...prev, opt])}
                            className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
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

            {/* 5. Features & Preferences */}
            <div className="bg-warm-white/80 p-4 rounded-2xl border border-border/70 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal/70 block">
                {selectedProjectType === "Commercial" ? "5. Commercial Features & Preferences" : "5. Preferred Room Features"}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {(selectedProjectType === "Commercial" ? commercialRequirementChips : residentialRequirementChips).map(chip => {
                  const active = selectedChips.includes(chip);
                  return (
                    <button
                      key={chip}
                      type="button"
                      onClick={() => toggleChip(chip)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        active ? "bg-gold/20 text-gold-dark border border-gold/50 font-bold" : "bg-white text-charcoal/70 border border-border hover:border-gold/60"
                      }`}
                    >
                      {active ? `✓ ${chip}` : `+ ${chip}`}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* ── RIGHT (5 COLS): Pricing & Summary ─────────────────────── */}
          <div className="lg:col-span-5 space-y-5">

            {/* Total Built-up Summary */}
            <div className="bg-gradient-to-br from-charcoal to-black text-white p-5 rounded-2xl space-y-3 shadow-xl border border-white/10">
              <div className="flex items-center justify-between border-b border-white/15 pb-2">
                <span className="text-xs font-bold uppercase tracking-widest text-gold flex items-center gap-1.5">
                  <Layers size={14} /> Total Built-up Area
                </span>
                <span className="text-[10px] font-mono bg-gold/20 text-gold-light px-2 py-0.5 rounded-full font-bold">
                  {numFloorsCount} {numFloorsCount === 1 ? "Level" : "Levels"}
                </span>
              </div>

              <div className="flex items-baseline justify-between">
                <span className="text-xs text-white/70">Total Area (All Floors)</span>
                <span className="text-2xl font-heading font-bold text-gold font-mono">
                  {totalAllFloorsSft.toLocaleString("en-IN")} SFT
                </span>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-white/10 text-xs">
                {floorLevels.map((fl, flIdx) => {
                  const flSft = (parseFloat(fl.length) || 0) * (parseFloat(fl.breadth) || 0);
                  const floorDisplayName = getArchitecturalFloorName(flIdx);
                  return (
                    <div key={fl.id} className="flex justify-between text-[11px] text-white/70">
                      <span>{floorDisplayName} ({fl.length || 0} × {fl.breadth || 0} ft)</span>
                      <span className="font-mono text-white font-bold">{flSft.toLocaleString("en-IN")} SFT</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Select Services & Rate Cards */}
            <div className="bg-warm-white/80 p-4 rounded-2xl border border-border/70 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal/70 flex items-center gap-1.5">
                  <Award size={12} className="text-gold-dark" /> Select Services &amp; Packages
                </span>
                <span className="text-[9px] font-bold text-gold-dark bg-gold/15 px-2 py-0.5 rounded-full">Package or individual</span>
              </div>

              {/* Signature Packages Dropdown */}
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
                        : "Signature Package (Recommended)"}
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
                          onClick={() => { setSelectedPackage(active ? null : pkg.name); setPackageDropdownOpen(false); }}
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

              <div className="flex items-center gap-2">
                <div className="flex-1 h-px bg-border/60" />
                <span className="text-[9px] font-bold uppercase tracking-widest text-concrete">Or add individual services</span>
                <div className="flex-1 h-px bg-border/60" />
              </div>

              {/* Individual Services */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 shadow-xs">
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

                      {isOpen && (
                        <div
                          className={`absolute z-40 top-full mt-1.5 ${
                            catIndex % 2 === 1 ? "right-0 left-auto sm:right-0" : "left-0"
                          } w-max min-w-full sm:min-w-[320px] max-w-[min(420px,94vw)] bg-white border border-border/90 rounded-2xl shadow-2xl overflow-hidden py-1 max-h-80 overflow-y-auto divide-y divide-border/30`}
                        >
                          {available.length === 0 ? (
                            <div className="px-3.5 py-2.5 text-[11px] text-concrete italic">All services in this category selected</div>
                          ) : (
                            available.map(item => (
                              <button
                                key={item.id}
                                type="button"
                                onClick={() => addService(item)}
                                className="w-full text-left px-3.5 py-2.5 hover:bg-gold/10 transition-colors cursor-pointer flex items-center justify-between gap-3 text-xs group"
                              >
                                <span className="font-semibold text-charcoal leading-snug text-left flex-1 whitespace-normal break-words group-hover:text-gold-dark transition-colors">
                                  {item.service}
                                </span>
                                <span className="font-mono text-gold-dark text-[10px] font-bold flex-shrink-0 whitespace-nowrap bg-gold/10 px-2 py-0.5 rounded border border-gold/20">
                                  {item.rateLabel}
                                </span>
                              </button>
                            ))
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Selected Services Line Items */}
              {selectedServices.length > 0 && (
                <div className="space-y-1.5 pt-1">
                  {selectedServices.map(ss => (
                    <div key={ss.item.id} className="bg-white p-2.5 rounded-xl border border-border flex items-center justify-between gap-2 text-xs">
                      <span className="font-semibold text-charcoal leading-snug flex-1 whitespace-normal">{ss.item.service}</span>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="font-mono text-gold-dark font-bold text-[11px]">₹{calcLineItem(ss, sft, numFloorsCount).toLocaleString("en-IN")}</span>
                        <button type="button" onClick={() => removeService(ss.item.id)} className="text-concrete hover:text-red-600 p-1 cursor-pointer"><X size={13} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Estimated Design Fee Summary */}
            <div className="bg-charcoal text-white p-4 rounded-2xl space-y-3 shadow-lg">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white/80 uppercase tracking-widest text-[10px]">Total Built-up</span>
                <span className="font-mono text-gold font-bold">{sft.toLocaleString("en-IN")} SFT ({numFloorsCount} F)</span>
              </div>

              {!selectedPackage && selectedServices.length === 0 ? (
                <p className="text-white/40 text-xs py-1">Select a Signature Package or individual services to calculate your design fee.</p>
              ) : (
                <div className="space-y-1.5 max-h-44 overflow-y-auto">
                  {selectedPackage && (
                    <div className="flex justify-between text-[11px] pb-1 border-b border-white/10">
                      <span className="text-gold-light font-bold truncate pr-2 flex items-center gap-1">
                        <Award size={11} className="flex-shrink-0" />
                        {selectedPackage}
                      </span>
                      <span className="font-mono text-gold-light whitespace-nowrap font-bold">₹{packageFee.toLocaleString("en-IN")}</span>
                    </div>
                  )}
                  {selectedServices.map(ss => (
                    <div key={ss.item.id} className="flex justify-between items-center text-[11px] gap-2">
                      <span className="text-white/80 pr-2 flex-1 leading-snug whitespace-normal">{ss.item.service}</span>
                      <span className="font-mono text-gold-light whitespace-nowrap flex-shrink-0">₹{calcLineItem(ss, sft, numFloorsCount).toLocaleString("en-IN")}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="border-t border-white/20 pt-2 flex items-center justify-between">
                <span className="text-xs font-bold text-white/70">Total Estimated Fee</span>
                <span className="text-2xl font-heading font-bold text-warm-white">
                  {grandTotal > 0 ? `₹${grandTotal.toLocaleString("en-IN")}` : "—"}
                </span>
              </div>
            </div>

            {/* Upload Plot Plan or Sketch */}
            <div className="bg-warm-white/80 p-4 rounded-2xl border border-border/70">
              <ImageUpload
                value={attachments}
                onChange={setAttachments}
                onUploadingChange={setIsUploading}
                formType="Building Planner"
                label="Upload Plot Plan or Sketch"
                hint="Plan, photo or sketch"
                compact
              />
            </div>


            {/* Any Specific Requirements or Notes */}
            <div className="bg-warm-white/80 p-4 rounded-2xl border border-border/70 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal/70 block">Any Specific Requirements or Notes</span>
              <textarea
                value={specialNotes}
                onChange={e => setSpecialNotes(e.target.value)}
                placeholder="Mention any architectural preferences, Vastu directives, or specific client requests..."
                rows={2}
                className="w-full px-3 py-2 bg-white border border-border text-charcoal text-xs rounded-xl focus:border-gold focus:outline-none resize-none placeholder:text-concrete/60"
              />
            </div>

            {/* Submit Error Message if any */}
            {submitError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-start gap-2">
                <AlertCircle size={15} className="shrink-0 mt-0.5" />
                <span>{submitError}</span>
              </div>
            )}

            {/* Submit & WhatsApp Action Buttons */}
            <div className="space-y-2.5">
              <button
                type="submit"
                disabled={isSubmitting || isUploading}
                className="w-full py-3.5 bg-gold hover:bg-gold-light disabled:opacity-70 disabled:cursor-not-allowed text-charcoal rounded-2xl text-xs font-bold uppercase tracking-widest transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={15} className="animate-spin" />
                    <span>Saving Project Plan...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Your Project Plan</span>
                    <Send size={14} />
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  const floorDetailsText = floorLevels.map((f, idx) => `  • ${getArchitecturalFloorName(idx)}: ${f.length}x${f.breadth} ft (${(parseFloat(f.length)||0)*(parseFloat(f.breadth)||0)} SFT)`).join('\n');
                  const msg = `*Project Plan Inquiry - Prasanth Associates*\n\n*Client Name:* ${name || "Client"}\n*Phone:* ${phone || "Not specified"}\n*Project Type:* ${selectedProjectType}\n*Plot Dimensions:* ${plotLength} x ${plotWidth} ft (${plotAreaNum.toLocaleString('en-IN')} SFT)\n*Total Floors:* ${numFloorsCount} Levels\n*Total Built-up Area:* ${totalAllFloorsSft.toLocaleString('en-IN')} SFT\n\n*Floor Breakdown:*\n${floorDetailsText}\n\n${selectedPackage ? `*Selected Package:* ${selectedPackage}\n` : ''}${grandTotal > 0 ? `*Est. Design Fee:* ₹${grandTotal.toLocaleString('en-IN')}\n` : ''}\nI would like to discuss this plan with your senior architect.`;
                  const url = `https://wa.me/919486038761?text=${encodeURIComponent(msg)}`;
                  window.open(url, "_blank", "noopener,noreferrer");
                }}
                className="w-full py-3.5 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-2xl text-xs font-bold uppercase tracking-widest transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle size={15} />
                <span>Send Plan via WhatsApp</span>
              </button>
            </div>

          </div>

        </div>
      </form>
    </div>
  );
}
