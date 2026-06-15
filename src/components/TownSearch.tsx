/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState } from "react";
import { townsData } from "../data/towns";
import { Search, MapPin, ArrowRight } from "lucide-react";
import { Town } from "../types";
import siteConfig from "../config/siteConfig";

interface TownSearchProps {
  onTownSelect: (townId: string) => void;
}

export function TownSearch({ onTownSelect }: TownSearchProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTowns = townsData.filter((town) =>
    town.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    town.postcodeExamples.some((p) => p.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleScrollToEnquiry = (e: React.MouseEvent) => {
    e.preventDefault();
    const formElement = document.getElementById("newsletter-signup-box") || document.getElementById("lead-form-card");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const isKent = siteConfig.regionSlug === "kent";

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-5" id="town-browser">
      <div className="space-y-1.5 text-left">
        <span className="text-[10px] font-bold text-[#107c91] uppercase tracking-widest block leading-none">
          LOCAL SEARCH
        </span>
        <h3 className="text-xl font-black text-[#02263d] tracking-tight flex items-center gap-1.5 leading-none font-sans">
          <MapPin className="h-5 w-5 text-brand-green" />
          Popular {siteConfig.regionName} Areas &amp; Towns
        </h3>
        <p className="text-xs text-slate-600 leading-relaxed font-semibold">
          Select or search your local market town or surrounding village parish to inspect specific speed checks, broadband coverage notes, and local FAQs.
        </p>
      </div>

      <div className="relative font-sans text-left">
        <input
          type="text"
          placeholder={isKent ? "Search town or village (e.g. Maidstone, Sevenoaks, Kings Hill...)" : "Search town or village (e.g. Worton, Devizes, Chippenham...)"}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-3.5 py-2.5 pl-9 rounded-lg text-xs border border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-450 outline-none focus:border-brand-green focus:bg-white"
          style={{ minHeight: "44px" }}
        />
        <Search className="absolute left-3 top-3.5 h-4 w-4 text-slate-450" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 max-h-[220px] overflow-y-auto pr-1">
        {filteredTowns.length > 0 ? (
          filteredTowns.map((town) => (
            <button
              key={town.id}
              onClick={() => onTownSelect(town.id)}
              className="py-2.5 px-3 rounded-lg border border-slate-200 text-left bg-slate-50 hover:bg-brand-green-light/20 hover:border-brand-green transition-colors text-xs font-bold text-slate-700 truncate flex justify-between items-center group cursor-pointer shadow-xs"
              id={`town-btn-${town.id}`}
              style={{ minHeight: "40px" }}
            >
              <span className="truncate">{town.name}</span>
              <ArrowRight className="h-3 w-3 text-slate-400 group-hover:text-brand-green group-hover:translate-x-0.5 transition-all shrink-0 ml-1.5" />
            </button>
          ))
        ) : (
          <p className="text-xs text-slate-500 col-span-full py-4 text-center font-medium">
            {isKent 
              ? "No matching Kent town or village found. Try searching Maidstone or Sevenoaks."
              : "No matching Wiltshire town or village found. Try searching Devizes or Worton."}
          </p>
        )}
      </div>

      <div className="bg-slate-50 border border-slate-200 p-3 rounded-lg flex items-center justify-between text-[11px] text-slate-650 leading-tight font-semibold text-left">
        <span>Standard coverage records active for {siteConfig.regionName} parishes.</span>
        <a 
          href="#newsletter-signup-box" 
          onClick={handleScrollToEnquiry}
          className="text-brand-green font-black hover:text-brand-green-hover hover:underline"
        >
          Get availability updates &rarr;
        </a>
      </div>
    </div>
  );
}

export default TownSearch;
