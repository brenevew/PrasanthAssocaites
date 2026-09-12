"use client";

import React from "react";
import { RoadData } from "./types";

interface PlotSvgDiagramProps {
  plotLength: number;
  plotWidth: number;
  buildingLength?: number;
  buildingWidth?: number;
  roadSide?: RoadData["roadSide"];
  showBuilding?: boolean;
}

export default function PlotSvgDiagram({
  plotLength = 60,
  plotWidth = 40,
  buildingLength = 45,
  buildingWidth = 30,
  roadSide = "East",
  showBuilding = true,
}: PlotSvgDiagramProps) {
  const plotArea = Math.round(plotLength * plotWidth);
  const buildingArea = Math.round(buildingLength * buildingWidth);

  // SVG viewport dimensions
  const svgW = 340;
  const svgH = 260;
  const padding = 40;

  // Compute scale aspect ratio
  const maxDimX = svgW - padding * 2;
  const maxDimY = svgH - padding * 2;

  const scale = Math.min(maxDimX / (plotWidth || 1), maxDimY / (plotLength || 1));

  const scaledPlotW = Math.max(80, plotWidth * scale);
  const scaledPlotH = Math.max(80, plotLength * scale);

  const plotX = (svgW - scaledPlotW) / 2;
  const plotY = (svgH - scaledPlotH) / 2;

  // Scaled Building
  const bW = Math.min(scaledPlotW - 8, Math.max(40, buildingWidth * scale));
  const bH = Math.min(scaledPlotH - 8, Math.max(40, buildingLength * scale));
  const bX = plotX + (scaledPlotW - bW) / 2;
  const bY = plotY + (scaledPlotH - bH) / 2;

  return (
    <div className="w-full bg-linen/50 rounded-2xl p-4 border border-border/80 flex flex-col items-center justify-center relative overflow-hidden shadow-inner">
      {/* Dynamic Road Ribbon */}
      <div className="absolute inset-x-0 top-2 flex justify-center z-10">
        <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-0.5 rounded-full bg-charcoal/90 text-gold-light border border-gold/30 shadow-sm flex items-center gap-1.5">
          <span>Road Side:</span>
          <span className="text-white font-bold">{roadSide}</span>
        </span>
      </div>

      <svg width="100%" height="240" viewBox={`0 0 ${svgW} ${svgH}`} className="overflow-visible select-none">
        <defs>
          <pattern id="grid" width="16" height="16" patternUnits="userSpaceOnUse">
            <path d="M 16 0 L 0 0 0 16" fill="none" stroke="rgba(0,0,0,0.04)" strokeWidth="1" />
          </pattern>

          <linearGradient id="plotGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fdfbf7" />
            <stop offset="100%" stopColor="#f4efe6" />
          </linearGradient>

          <linearGradient id="buildingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>

          <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.1" />
          </filter>
        </defs>

        {/* Background Grid */}
        <rect width={svgW} height={svgH} fill="url(#grid)" rx="16" />

        {/* Road Strip Visualization */}
        {roadSide === "North" && (
          <rect x="10" y="8" width={svgW - 20} height="12" fill="#cbd5e1" rx="4" opacity="0.6" />
        )}
        {roadSide === "South" && (
          <rect x="10" y={svgH - 20} width={svgW - 20} height="12" fill="#cbd5e1" rx="4" opacity="0.6" />
        )}
        {roadSide === "West" && (
          <rect x="8" y="10" width="12" height={svgH - 20} fill="#cbd5e1" rx="4" opacity="0.6" />
        )}
        {roadSide === "East" && (
          <rect x={svgW - 20} y="10" width="12" height={svgH - 20} fill="#cbd5e1" rx="4" opacity="0.6" />
        )}

        {/* Plot Area Outer Rectangle */}
        <rect
          x={plotX}
          y={plotY}
          width={scaledPlotW}
          height={scaledPlotH}
          fill="url(#plotGradient)"
          stroke="#ca8a04"
          strokeWidth="2"
          strokeDasharray="4 3"
          rx="12"
          filter="url(#shadow)"
          className="transition-all duration-300"
        />

        {/* Plot Dimension Text Labels */}
        <text
          x={plotX + scaledPlotW / 2}
          y={plotY - 8}
          textAnchor="middle"
          className="text-[11px] font-mono font-bold fill-charcoal"
        >
          {plotWidth} ft (Width)
        </text>

        <text
          x={plotX - 10}
          y={plotY + scaledPlotH / 2}
          textAnchor="middle"
          transform={`rotate(-90 ${plotX - 10} ${plotY + scaledPlotH / 2})`}
          className="text-[11px] font-mono font-bold fill-charcoal"
        >
          {plotLength} ft (Length)
        </text>

        {/* Proposed Building Footprint */}
        {showBuilding && (
          <g className="transition-all duration-300">
            <rect
              x={bX}
              y={bY}
              width={bW}
              height={bH}
              fill="url(#buildingGradient)"
              stroke="#e2e8f0"
              strokeWidth="1.5"
              rx="8"
              filter="url(#shadow)"
            />
            {/* Building Centered Label */}
            <text
              x={bX + bW / 2}
              y={bY + bH / 2 - 4}
              textAnchor="middle"
              className="text-[10px] font-bold fill-gold-light uppercase tracking-wider"
            >
              Building Footprint
            </text>
            <text
              x={bX + bW / 2}
              y={bY + bH / 2 + 10}
              textAnchor="middle"
              className="text-[11px] font-mono font-bold fill-white"
            >
              {buildingWidth} × {buildingLength} ft ({buildingArea.toLocaleString()} SFT)
            </text>
          </g>
        )}
      </svg>

      {/* Legend Footer */}
      <div className="w-full flex items-center justify-between mt-2 pt-2 border-t border-border/60 text-[10px]">
        <div className="flex items-center gap-1.5 text-concrete font-medium">
          <span className="w-3 h-3 rounded bg-linen border border-gold-dark inline-block" />
          <span>Plot Area: <strong className="text-charcoal font-mono">{plotArea.toLocaleString()} SFT</strong></span>
        </div>
        {showBuilding && (
          <div className="flex items-center gap-1.5 text-concrete font-medium">
            <span className="w-3 h-3 rounded bg-charcoal inline-block" />
            <span>Building Area: <strong className="text-charcoal font-mono">{buildingArea.toLocaleString()} SFT</strong></span>
          </div>
        )}
      </div>
    </div>
  );
}
