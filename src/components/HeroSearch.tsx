/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Search, MapPin, ShieldAlert, Sparkles } from "lucide-react";
import siteConfig from "../config/siteConfig";

interface HeroSearchProps {
  onSearchSubmit: (query: string) => void;
  onListProviderClick: () => void;
  className?: string;
}

export function HeroSearch({ onSearchSubmit, className = "" }: HeroSearchProps) {
  const [query, setQuery] = useState("");

  const isKent = siteConfig.regionSlug === "kent";

  // Wording as strictly requested by the user
  const mainTitle = isKent 
    ? "Best broadband in Kent" 
    : "Best broadband in Wiltshire";

  const subtitle = isKent
    ? "Check listed broadband, WiFi and internet provider options across Kent towns, villages and postcode areas. Enter your postcode area to see providers and availability checkers to try."
    : "Check listed broadband, WiFi and internet provider options across Wiltshire towns, villages and postcode areas. Enter your postcode area to see providers and availability checkers to try.";

  const trustNote = "Availability varies by exact address. Always confirm speeds, prices and contract terms with the provider before ordering.";

  const placeholderText = isKent 
    ? "Enter postcode or area, e.g. ME19, CT10, DA10, TN13" 
    : "Enter postcode or area, e.g. SN10, SP4, BA15, SN1";

  // Highly relevant Kent chips (and Wiltshire fallback)
  const quickSearches = isKent 
    ? ["ME19", "CT10", "DA10", "TN13", "Maidstone", "Kings Hill", "Canterbury", "Sevenoaks"]
    : ["SN10", "SP4", "BA15", "SN1", "Devizes", "Salisbury", "Chippenham", "Marlborough"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchSubmit(query);
  };

  const handleQuickSelect = (area: string) => {
    setQuery(area);
    onSearchSubmit(area);
  };

  return (
    <div 
      className={`relative rounded-3xl p-6 md:p-10 border-2 border-slate-200 bg-white shadow-xl text-slate-800 flex flex-col justify-between ${className}`} 
      id="hero-comparison-banner"
    >
      <div className="relative z-10 space-y-6 max-w-4xl">
        
        {/* Dynamic Category Badging - Clean & Simple */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-green-light border border-slate-200 text-brand-green rounded-full text-xs font-semibold">
            <Sparkles className="h-3.5 w-3.5 text-brand-green" />
            Independent Advisory Guide
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-50 border border-slate-200 text-slate-600 rounded-full text-xs font-medium">
            No direct sales — we list and link to checkers
          </span>
        </div>

        {/* Hero Headings */}
        <div className="space-y-3">
          <h1 className="text-brand-navy font-black text-3xl sm:text-4xl md:text-5xl leading-tight tracking-tight">
            {mainTitle}
          </h1>
          
          <p className="text-slate-700 text-base md:text-lg leading-relaxed max-w-3xl">
            {subtitle}
          </p>

          <p className="text-slate-500 text-sm italic font-medium max-w-3xl border-l-4 border-amber-500 pl-3 py-0.5">
            {trustNote}
          </p>
        </div>

        {/* Postcode Search Container - Main Visual Focus */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 md:p-6 space-y-4 shadow-sm">
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <label htmlFor="hero-search-input" className="sr-only">
                Enter your postcode or area
              </label>
              <input
                id="hero-search-input"
                type="text"
                placeholder={placeholderText}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full px-4 py-4 pl-12 rounded-xl text-base text-slate-900 bg-white border border-slate-300 hover:border-slate-400 focus:border-brand-blue focus:outline-none transition-all font-sans font-medium shadow-xs"
                style={{ minHeight: "48px" }}
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            </div>
            
            <button
              type="submit"
              className="px-8 py-4 bg-[#02263d] hover:bg-[#085175] text-white text-base font-black rounded-xl transition-all shadow-md flex items-center justify-center gap-2 select-none group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy"
              style={{ minHeight: "48px" }}
            >
              <span>Check my area</span>
            </button>
          </form>

          {/* DYNAMIC POSTCODE HELPER & QUICK SELECTS */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-xs text-slate-600 font-extrabold uppercase tracking-wide flex items-center gap-1 shrink-0">
              <MapPin className="h-4 w-4 text-brand-green" />
              Quick Searches:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {quickSearches.map((area) => (
                <button
                  key={area}
                  type="button"
                  onClick={() => handleQuickSelect(area)}
                  className="px-3 py-1.5 text-xs font-semibold bg-white hover:bg-brand-green-light border border-slate-200 hover:border-brand-green text-slate-700 hover:text-brand-green rounded-lg transition-all cursor-pointer"
                  style={{ minHeight: "36px" }}
                >
                  {area}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Small Credibility Badgers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-slate-100 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-green" />
            <span>Independent Information Guide</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-navy" />
            <span>Postcode-level lists</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <span>Provider checkers required</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>We do not sell broadband directly</span>
          </div>
        </div>

      </div>
    </div>
  );
}

export default HeroSearch;
