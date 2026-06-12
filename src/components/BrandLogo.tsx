/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React from "react";
import { siteSettingsData } from "../data/siteSettings";
import siteConfig from "../config/siteConfig";

interface BrandLogoProps {
  variant?: "header" | "footer" | "iconOnly" | "darkBackground" | "lightBackground" | "appIcon";
  size?: number | string;
  showText?: boolean;
  backgroundMode?: "light" | "dark";
  className?: string;
}

export function BrandLogo({
  variant = "header",
  size,
  showText = true,
  backgroundMode = "dark",
  className = ""
}: BrandLogoProps) {
  // Determine physical size classes
  let logoSizeClass = "w-10 h-10";
  if (size) {
    logoSizeClass = typeof size === "number" ? `w-[${size}px] h-[${size}px]` : `${size}`;
  } else if (variant === "footer") {
    logoSizeClass = "w-12 h-12";
  } else if (variant === "iconOnly") {
    logoSizeClass = "w-10 h-10";
  } else if (variant === "appIcon") {
    logoSizeClass = "w-16 h-16";
  }

  // Choose the background styling based on variant or backgroundMode
  const isDarkBg = variant === "darkBackground" || variant === "footer" || (variant !== "lightBackground" && backgroundMode === "dark");
  
  // Outer enclosure styling based on variant
  let outerContainerStyle = "flex items-center justify-center rounded-xl overflow-hidden shadow-inner transition-colors border";
  if (variant === "appIcon") {
    outerContainerStyle += " bg-[#f9f7f0] border-slate-200 p-2 shadow-md rounded-2xl";
  } else if (isDarkBg) {
    outerContainerStyle += " bg-slate-950/80 border-brand-gold/40 hover:border-brand-gold p-1";
  } else {
    outerContainerStyle += " bg-slate-50 border-slate-200 hover:border-slate-300 p-1";
  }

  // SVG graphic definition
  const renderSvgGraphic = () => {
    if (siteConfig.regionSlug === "kent") {
      return (
        <svg
          className="w-full h-full"
          viewBox="0 0 500 500"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Render solid white background if requested by variant */}
          {(variant === "appIcon" || variant === "lightBackground") && (
            <rect width="500" height="500" rx="95" fill="#fbfafa" />
          )}
          
          <g id="kent-coastal-brand">
            {/* WiFi wave paths (Coastal blue: #085175) */}
            <path d="M152 115 A 138 138 0 0 1 348 115" stroke="#085175" strokeWidth="25" strokeLinecap="round" fill="none" />
            <path d="M182 145 A 95 95 0 0 1 318 145" stroke="#085175" strokeWidth="21" strokeLinecap="round" fill="none" />
            <path d="M213 176 A 51 51 0 0 1 287 176" stroke="#085175" strokeWidth="17" strokeLinecap="round" fill="none" />
            
            {/* Warm Sun dot (Golden Amber: #e29930) */}
            <circle cx="250" cy="216" r="15" fill="#e29930" />

            {/* Cliff and landscape scenery mapped with coordinates and styled */}
            <g clipPath="url(#cliffClipBrand)">
              <clipPath id="cliffClipBrand">
                <rect x="0" y="220" width="500" height="280" rx="95" />
              </clipPath>
              
              {/* Base deep navy ocean terrain */}
              <path d="M0 220 L500 240 L500 500 L0 500 Z" fill="#01334d" />
              
              {/* Coastal blue water body on the right */}
              <path d="M 230 330 C 310 320, 380 310, 500 300 L 500 500 L 160 500 Q 200 420, 230 330 Z" fill="#085175" />
              
              {/* Winding Chalk Road/Beach curving upwards to the cliffs */}
              <path d="M170 500 C 228 445, 210 405, 232 375 L 246 375 C 224 415, 246 455, 192 500 Z" fill="#faf9f5" />

              {/* Dover Cliffs Shaded Shaded Blocks (Slate grey-blue background shadows) */}
              <path d="M 175 340 L 210 235 H 250 L 265 315 Z" fill="#afb9bf" />
              <path d="M 245 315 L 275 250 H 310 L 320 310 Z" fill="#afb9bf" />
              <path d="M 310 310 L 335 258 H 365 L 375 310 Z" fill="#afb9bf" />

              {/* Dover Cliffs Highlight Pillars (Chalk/Pure soft white) */}
              <path d="M 50 380 C 110 355, 135 320, 155 240 L 210 242 L 230 340 C 185 335, 100 345, 50 380 Z" fill="#fcfbfa" />
              <path d="M 218 335 C 230 270, 236 245, 246 238 L 290 242 L 272 328 Z" fill="#fcfbfa" />
              <path d="M 268 325 L 280 252 L 312 254 L 302 320 Z" fill="#fcfbfa" />
              <path d="M 300 320 L 308 262 L 336 264 L 330 320 Z" fill="#fcfbfa" />
              <path d="M 328 320 L 336 270 L 356 272 L 348 320 Z" fill="#fcfbfa" />
            </g>
          </g>
        </svg>
      );
    }

    // Colors based on the visual reqs (Wiltshire Fallback)
    const tealColor = "#ea580c"; // High fidelity vibrant orange
    const creamColor = "#fffbeb"; // Warm cream white background path
    const goldColor = "#fbbf24"; // Vibrant gold central dot
    
    const strokeColor = tealColor;
    const pathFill = creamColor;
    const dotFill = goldColor;

    return (
      <svg
        className="w-full h-full"
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* If appIcon variant, we can add a subtle background inside the SVG itself or let the container handle it */}
        {variant === "appIcon" && (
          <rect width="500" height="500" rx="100" fill="#f9f7f1" />
        )}
        
        {/* WiFi Arches */}
        <path
          d="M165 115 C205 75, 295 75, 335 115"
          stroke={strokeColor}
          strokeWidth="28"
          strokeLinecap="round"
        />
        <path
          d="M195 150 C222 120, 278 120, 305 150"
          stroke={strokeColor}
          strokeWidth="24"
          strokeLinecap="round"
        />
        <path
          d="M225 185 C238 168, 262 168, 275 185"
          stroke={strokeColor}
          strokeWidth="18"
          strokeLinecap="round"
        />
        
        {/* Golden Central Dot / Sun transmitter */}
        <circle cx="250" cy="225" r="21" fill={dotFill} />

        {/* Stonehenge Stones (Teal Monoliths) Arranged Geometrically */}
        {/* Outermost Left */}
        <path
          d="M150 340 L165 300 Q168 290, 178 295 L190 300 Q192 310, 185 340 Z"
          fill={tealColor}
        />
        {/* Inner Left */}
        <path
          d="M195 330 L212 245 Q216 230, 235 235 L248 240 Q250 255, 230 330 Z"
          fill={tealColor}
        />
        {/* Center Pillar (Tallest) */}
        <path
          d="M240 330 L248 220 Q250 205, 270 205 L285 220 Q285 240, 275 330 Z"
          fill={tealColor}
        />
        {/* Inner Right */}
        <path
          d="M280 330 L295 250 Q298 238, 318 242 L330 252 Q328 268, 312 330 Z"
          fill={tealColor}
        />
         {/* Outermost Right */}
        <path
          d="M333 345 L346 300 Q348 290, 358 294 L370 299 Q370 310, 363 345 Z"
          fill={tealColor}
        />

        {/* Lower Hills Contour with White winding path */}
        {/* Hills background container block */}
        <path
          d="M70 350 Q160 335, 250 350 Q340 335, 430 350 C430 460, 70 460, 70 350 Z"
          fill={tealColor}
        />
        
        {/* Winding Cream Path */}
        <path
          d="M145 448 C200 420, 210 395, 245 372 C280 350, 305 352, 345 352 C340 356, 315 356, 290 375 Q265 395, 205 448 Z"
          fill={pathFill}
        />
      </svg>
    );
  };

  if (variant === "iconOnly") {
    return (
      <div className={`${outerContainerStyle} ${logoSizeClass} ${className}`} id="brand-logo-icon">
        {renderSvgGraphic()}
      </div>
    );
  }

  // Default block rendering with text side-by-side or stacked
  return (
    <div className={`flex items-center gap-3 ${className}`} id="brand-logo-full">
      <div className={`${outerContainerStyle} ${logoSizeClass}`}>
        {renderSvgGraphic()}
      </div>
      {showText && (
        <div className="flex flex-col text-left leading-tight">
          <span className={`text-sm font-black tracking-tight font-sans ${isDarkBg ? "text-white" : "text-slate-900"}`}>
            {siteSettingsData.brandName}
          </span>
          <span className="text-[9px] uppercase font-bold tracking-widest text-brand-gold -mt-0.5 block leading-none">
            Rural {siteConfig.regionName} Broadband Finder
          </span>
        </div>
      )}
    </div>
  );
}

export default BrandLogo;
