import {
  Building, Building2, Calculator, ClipboardList, Compass, Cpu, Droplets, Factory, FileCheck, Hammer, Home,
  Key, Landmark, LayoutDashboard, Map, MapPin, Palette, PencilRuler, ShieldCheck, Trees, TrendingUp, Zap,
} from "lucide-react";

/** Lucide icon for each `service.icon` name in data/services.ts. */
export const serviceIcons: Record<string, React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }>> = {
  Home, Building2, Building, Key, Hammer, Cpu, Factory, Compass, Palette, Trees, ClipboardList,
  Landmark, ShieldCheck, Calculator, FileCheck, MapPin, Map, TrendingUp, LayoutDashboard,
  PencilRuler, Zap, Droplets,
};
