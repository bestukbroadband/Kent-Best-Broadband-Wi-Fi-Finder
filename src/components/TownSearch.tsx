/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
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
    const formElement = document.getElementById("enquiry-section-anchor") || document.getElementById("lead-enquiry-form") || document.getElementById("contact-tab-content");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const isKent = siteConfig.regionSlug === "kent";

  return (
    <div className="bg-[#12192c] border-2 border-slate-700/80 rounded-2xl p-5 md:p-6 shadow-xl space-y-4" id="town-browser">
      <div className="space-y-1">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5 leading-none font-sans">
          <MapPin className="h-4.5 w-4.5 text-brand-gold" />
          Browse by {siteConfig.regionName} Town or Village
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed font-semibold">
          Select your local market town or surrounding village parish to see specific altnet deployments, reviews, nearby coverage, and customized FAQs.
        </p>
      </div>

      <div className="relative font-sans">
        <input
          type="text"
          placeholder={isKent ? "Search town or city (e.g. Maidstone, Sevenoaks...)" : "Search town, village or parish (e.g. Worton, Devizes...)"}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-3.5 py-2.5 pl-9 rounded-lg text-xs border border-slate-700 bg-slate-900 text-white placeholder-slate-450 outline-hidden focus:border-brand-gold focus:ring-1 focus:ring-brand-gold"
        />
        <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 max-h-[220px] overflow-y-auto pr-1">
        {filteredTowns.length > 0 ? (
          filteredTowns.map((town) => (
            <button
              key={town.id}
              onClick={() => onTownSelect(town.id)}
              className="py-2.5 px-3 rounded-lg border border-slate-700 text-left bg-slate-900/50 hover:bg-brand-gold/15 hover:border-brand-gold transition-colors text-xs font-bold text-slate-100 truncate flex justify-between items-center group cursor-pointer"
              id={`town-btn-${town.id}`}
            >
              <span>{town.name}</span>
              <ArrowRight className="h-3 w-3 text-slate-400 group-hover:text-brand-gold group-hover:translate-x-0.5 transition-all shrink-0 ml-1.5" />
            </button>
          ))
        ) : (
          <p className="text-xs text-slate-450 col-span-full py-4 text-center font-medium">
            {isKent 
              ? "No matching Kent town or village found. Try searching Maidstone or Sevenoaks."
              : "No matching Wiltshire town or village found. Try searching Devizes or Worton."}
          </p>
        )}
      </div>

      <div className="bg-slate-900/60 border border-brand-gold/30 p-3 rounded-lg flex items-center justify-between text-[11px] text-slate-300 leading-tight font-medium">
        <span>Standard coverage records active for {siteConfig.regionName} parishes.</span>
        <a 
          href="#enquiry-section-anchor" 
          onClick={handleScrollToEnquiry}
          className="text-brand-gold font-bold hover:text-brand-gold-hover hover:underline"
        >
          Request additions &rarr;
        </a>
      </div>
    </div>
  );
}
export default TownSearch;
