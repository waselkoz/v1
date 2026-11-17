"use client";

import React from "react";

interface SyllabusSidesBgProps {
  className?: string;
}

/**
 * Responsive vector background framing the syllabus page on the left and right flanks,
 * faithfully recreating the teal abstract graphic with layered rounded cards, drop shadows,
 * 45° dot matrix grid, and white/teal angled hairpin strokes.
 */
export function SyllabusSidesBg({ className = "" }: SyllabusSidesBgProps) {
  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 pointer-events-none select-none overflow-hidden z-0 ${className}`}
    >
      {/* ================= LEFT FLANK: Teal Layered Rounded Cards, Dot Matrix & White Hairpin ================= */}
      <div className="absolute top-0 left-0 w-[220px] sm:w-[320px] md:w-[400px] lg:w-[480px] xl:w-[540px] h-[700px] sm:h-[900px] lg:h-[1100px]">
        <svg
          viewBox="0 0 540 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-cover"
          preserveAspectRatio="xMinYMin meet"
        >
          <defs>
            {/* Soft drop shadow for lower teal plane */}
            <filter id="leftTealShadowLower" x="-20%" y="-20%" width="160%" height="160%" filterUnits="userSpaceOnUse">
              <feDropShadow dx="12" dy="16" stdDeviation="16" floodColor="#012425" floodOpacity="0.22" />
            </filter>

            {/* Drop shadow for upper floating rounded card */}
            <filter id="leftCardShadowUpper" x="-20%" y="-20%" width="160%" height="160%" filterUnits="userSpaceOnUse">
              <feDropShadow dx="10" dy="14" stdDeviation="14" floodColor="#022a2b" floodOpacity="0.30" />
            </filter>

            {/* 45-degree Rotated Dot Matrix */}
            <pattern
              id="dotMatrixLeft"
              x="0"
              y="0"
              width="18"
              height="18"
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(45)"
            >
              <circle cx="9" cy="9" r="1.6" fill="#ffffff" opacity="0.85" />
            </pattern>

            {/* Dot Matrix Clip Mask */}
            <clipPath id="dotMatrixLeftClip">
              <polygon points="-50,380 180,220 280,480 80,680 -50,680" />
            </clipPath>
          </defs>

          {/* 1. Lower Teal Layer with Shadow */}
          <g filter="url(#leftTealShadowLower)">
            <path
              d="M -60,-20 L 220,-20 L 460,320 L 260,680 L -60,680 Z"
              fill="#0f9596"
            />
          </g>

          {/* 2. White Dot Matrix in Lower Left */}
          <g clipPath="url(#dotMatrixLeftClip)">
            <rect x="-50" y="200" width="360" height="480" fill="url(#dotMatrixLeft)" />
          </g>

          {/* 3. Parallel White Lines on Lower Teal Layer */}
          <line
            x1="250"
            y1="260"
            x2="370"
            y2="410"
            stroke="#ffffff"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <line
            x1="270"
            y1="420"
            x2="380"
            y2="560"
            stroke="#ffffff"
            strokeWidth="4.5"
            strokeLinecap="round"
          />

          {/* 4. Upper Floating Teal Card with Large Rounded Apex and Drop Shadow */}
          <g filter="url(#leftCardShadowUpper)">
            <path
              d="M -50,-50 L 240,-50 L 310,50 Q 345,95 305,140 L 40,520 L -50,520 Z"
              fill="#0f9596"
            />
          </g>

          {/* 5. Crisp White Hairpin Outline on Upper Card */}
          <path
            d="M -20,380 L 140,200 Q 170,165 200,200 L 250,260"
            stroke="#ffffff"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />

          {/* 6. Top White Slit Cut near upper edge */}
          <line
            x1="220"
            y1="25"
            x2="270"
            y2="80"
            stroke="#ffffff"
            strokeWidth="4.5"
            strokeLinecap="round"
          />

          {/* Secondary repeating teal shard lower down for tall viewports */}
          <g opacity="0.4" transform="translate(-100, 480)">
            <path d="M 0,200 L 240,40 L 360,260 L 120,440 Z" fill="#0f9596" />
            <line x1="160" y1="120" x2="280" y2="280" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />
          </g>
        </svg>
      </div>

      {/* ================= RIGHT FLANK: Teal Hairpin, Angled Accent Strokes ================= */}
      <div className="absolute top-0 right-0 w-[180px] sm:w-[260px] md:w-[340px] lg:w-[420px] h-[650px] sm:h-[850px] lg:h-[1050px]">
        <svg
          viewBox="0 0 420 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-cover"
          preserveAspectRatio="xMaxYMin meet"
        >
          {/* Top diagonal short teal line */}
          <line
            x1="80"
            y1="25"
            x2="140"
            y2="85"
            stroke="#0f9596"
            strokeWidth="5.5"
            strokeLinecap="round"
          />

          {/* Top-Right Teal Hairpin / Chevron */}
          <path
            d="M 230,80 L 330,190 Q 345,205 365,185 L 430,135"
            stroke="#0f9596"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />

          {/* Lower diagonal teal stroke parallel to 45° cut */}
          <line
            x1="120"
            y1="280"
            x2="330"
            y2="520"
            stroke="#0f9596"
            strokeWidth="6"
            strokeLinecap="round"
          />

          {/* Shorter parallel teal accent */}
          <line
            x1="220"
            y1="440"
            x2="370"
            y2="610"
            stroke="#0f9596"
            strokeWidth="4.5"
            strokeLinecap="round"
          />

          {/* Floating Lower Teal Accent Shape */}
          <path
            d="M 310,680 L 430,550 L 460,720 L 340,840 Z"
            fill="#0f9596"
            opacity="0.25"
          />
          <line
            x1="280"
            y1="670"
            x2="390"
            y2="800"
            stroke="#0f9596"
            strokeWidth="5"
            strokeLinecap="round"
            opacity="0.4"
          />
        </svg>
      </div>
    </div>
  );
}

/**
 * Standalone Hero Graphic Plaque faithfully recreating the user's uploaded card
 * (media_1794855113225_c63cb4e5.png) with layered turquoise cards, drop shadows,
 * 45° dot matrix, white hairpin curve, and crisp modern typography.
 */
export function CourseHeroGraphicPlaque({
  code,
  track,
  category
}: {
  code: string;
  track: string;
  category: string;
}) {
  return (
    <div className="relative w-full max-w-md h-[180px] sm:h-[210px] rounded-2xl bg-white border border-slate-200/90 shadow-xl shadow-teal-900/10 overflow-hidden select-none shrink-0 group hover:shadow-2xl hover:shadow-teal-900/15 transition-all duration-300">
      {/* Background SVG vector composition strictly matching user's image */}
      <svg
        viewBox="0 0 460 230"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <filter id="plaqueDropShadow" x="-20%" y="-20%" width="150%" height="150%">
            <feDropShadow dx="6" dy="10" stdDeviation="10" floodColor="#062e2e" floodOpacity="0.25" />
          </filter>

          <pattern
            id="plaqueDotGrid"
            x="0"
            y="0"
            width="14"
            height="14"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(45)"
          >
            <circle cx="7" cy="7" r="1.4" fill="#ffffff" opacity="0.9" />
          </pattern>

          <clipPath id="plaqueDotClip">
            <polygon points="-20,120 140,40 180,180 30,240 -20,240" />
          </clipPath>
        </defs>

        {/* 1. Lower Teal Background Shape */}
        <path
          d="M -40,-20 L 160,-20 L 320,170 L 120,250 L -40,250 Z"
          fill="#0f9596"
        />

        {/* 2. White Dot Matrix */}
        <g clipPath="url(#plaqueDotClip)">
          <rect x="-20" y="30" width="220" height="220" fill="url(#plaqueDotGrid)" />
        </g>

        {/* 3. White Diagonal Parallel Lines */}
        <line x1="160" y1="100" x2="230" y2="180" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" />
        <line x1="180" y1="170" x2="235" y2="230" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />

        {/* 4. Upper Floating Teal Card with Large Rounded Apex and Drop Shadow */}
        <g filter="url(#plaqueDropShadow)">
          <path
            d="M -30,-20 L 140,-20 L 180,40 Q 200,68 175,95 L 40,240 L -30,240 Z"
            fill="#0f9596"
          />
        </g>

        {/* 5. Crisp White Hairpin Curve */}
        <path
          d="M -10,180 L 80,85 Q 98,68 116,86 L 145,120"
          stroke="#ffffff"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* 6. Top Short White Slit */}
        <line x1="140" y1="10" x2="180" y2="55" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />

        {/* 7. Right Side: Top Short Teal Slit */}
        <line x1="330" y1="10" x2="360" y2="40" stroke="#0f9596" strokeWidth="3" strokeLinecap="round" />

        {/* 8. Right Side: Teal Hairpin Outline */}
        <path
          d="M 380,40 L 420,80 Q 432,92 445,80 L 470,55"
          stroke="#0f9596"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* 9. Right Side: Lower Long Diagonal Teal Line */}
        <line x1="260" y1="145" x2="350" y2="240" stroke="#0f9596" strokeWidth="3.5" strokeLinecap="round" />
      </svg>

      {/* Course Metadata Overlay on the Right White Area (Zero clashing with vector shapes) */}
      <div className="absolute top-0 right-0 bottom-0 w-[55%] p-4 sm:p-5 flex flex-col justify-between items-end text-right z-10">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-50 border border-teal-200 text-[10px] font-bold text-teal-800 tracking-wider uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Official Syllabus</span>
          </div>
          <h4 className="text-xl sm:text-2xl font-black text-[#0a2540] tracking-tight">
            {code}
          </h4>
          <p className="text-[11px] font-semibold text-slate-500 line-clamp-1">
            {track}
          </p>
        </div>

        <div className="pt-2 border-t border-slate-100 w-full flex items-center justify-between text-[10px]">
          <span className="text-slate-400 uppercase tracking-widest font-semibold">Self-Paced</span>
          <span className="font-bold text-teal-700 font-mono">2026 EDITION</span>
        </div>
      </div>
    </div>
  );
}

/**
 * Legacy wrapper exported for backward compatibility if needed.
 */
export function SyllabusAbstractBg({
  className = "",
  children
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <SyllabusSidesBg />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
