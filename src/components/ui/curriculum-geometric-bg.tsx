"use client";

import React from "react";

export function CurriculumGeometricBg() {
  return (
    <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
      {/* ================= TOP RIGHT GREEN GEOMETRIC SHARDS ================= */}
      <div className="absolute -top-4 -right-4 w-[280px] sm:w-[420px] md:w-[520px] lg:w-[620px] h-[340px] sm:h-[480px] md:h-[580px] lg:h-[680px]">
        <svg
          viewBox="0 0 500 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-cover"
          preserveAspectRatio="xMaxYMin meet"
        >
          {/* Main Dark Forest Green Base */}
          <polygon
            points="340,0 500,0 500,260 460,200 400,80"
            fill="#15803d"
          />
          {/* Rich Emerald Transition Shard */}
          <polygon
            points="280,0 390,0 500,220 470,250 410,130 330,40"
            fill="#16a34a"
          />
          {/* Bright Lime Green Facet */}
          <polygon
            points="220,0 310,0 480,240 450,260 370,100"
            fill="#84cc16"
          />
          {/* Sharp Floating Lime Blade (Left) */}
          <polygon
            points="180,35 260,10 225,95"
            fill="#a3e635"
          />
          {/* Diagonal White Architectural Slit Cut */}
          <polygon
            points="260,85 340,110 325,120 250,95"
            fill="#ffffff"
          />
          {/* Secondary Emerald Shard */}
          <polygon
            points="310,95 440,165 410,195 295,115"
            fill="#22c55e"
          />
          {/* Lower Right Pointed Shard */}
          <polygon
            points="440,210 495,330 460,320 430,240"
            fill="#65a30d"
          />
          {/* Downward Needle Accent */}
          <polygon
            points="465,310 498,420 480,390"
            fill="#84cc16"
          />
          {/* Small Floating Lime Fragment */}
          <polygon
            points="390,140 425,150 405,175"
            fill="#bef264"
          />
        </svg>
      </div>

      {/* ================= BOTTOM LEFT BLUE GEOMETRIC SHARDS ================= */}
      <div className="absolute -bottom-4 -left-4 w-[280px] sm:w-[420px] md:w-[520px] lg:w-[620px] h-[360px] sm:h-[500px] md:h-[620px] lg:h-[720px]">
        <svg
          viewBox="0 0 500 650"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-cover"
          preserveAspectRatio="xMinYMax meet"
        >
          {/* Deep Navy/Sapphire Corner Base */}
          <polygon
            points="0,490 0,650 190,650 75,540"
            fill="#082b54"
          />
          {/* Royal Blue Diagonal Band */}
          <polygon
            points="0,380 0,500 90,560 180,650 240,650 55,420"
            fill="#0256b9"
          />
          {/* Electric Azure Blue Ribbon */}
          <polygon
            points="0,305 45,375 135,515 210,615 185,650 110,650 0,515"
            fill="#0077b6"
          />
          {/* Dynamic White Architectural Cut / Spacer */}
          <polygon
            points="45,395 65,405 130,515 115,525"
            fill="#ffffff"
          />
          {/* Bright Electric Cyan Outer Shard */}
          <polygon
            points="18,280 55,355 145,490 205,580 175,580 95,465 0,320"
            fill="#00b4d8"
          />
          {/* Floating Cyan/Sky Blue Accent Tip */}
          <polygon
            points="125,505 185,575 220,635 195,640 150,575"
            fill="#0284c7"
          />
          {/* Sharp Upward Shard (Left Edge) */}
          <polygon
            points="0,420 38,470 20,490 0,465"
            fill="#38bdf8"
          />
          {/* Floating Angular Blue Needle */}
          <polygon
            points="70,440 120,480 95,505"
            fill="#0096c7"
          />
        </svg>
      </div>
    </div>
  );
}
