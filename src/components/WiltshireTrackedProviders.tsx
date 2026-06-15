/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React from "react";
import { CheckCircle, Search, ExternalLink, Info, MapPin } from "lucide-react";
import { providerDirectoryData } from "../data/providerDirectory";
import siteConfig from "../config/siteConfig";

interface WiltshireTrackedProvidersProps {
  onCheckPostcodeClick?: () => void;
  onNavigateToDirectory?: () => void;
  onNavigateToProvider?: (slug: string) => void;
}

export function WiltshireTrackedProviders({
  onCheckPostcodeClick,
  onNavigateToDirectory,
  onNavigateToProvider
}: WiltshireTrackedProvidersProps) {
  // Filter relevant providers
  const localProviders = providerDirectoryData.filter(p => p.wiltshireRelevance);

  return (
    <section className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 space-y-6 shadow-sm" id="local-tracked-providers-section">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 text-left">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono tracking-wider uppercase bg-brand-green-light text-brand-green border border-brand-green/20">
            {siteConfig.regionName} Coverage Scope
          </div>
          <h2 className="text-xl md:text-2xl font-black font-sans tracking-tight text-[#02263d] leading-tight">
            Providers we track for {siteConfig.regionName} availability
          </h2>
          <p className="text-xs text-slate-600 max-w-2xl leading-relaxed font-semibold">
            We actively monitor listed network infrastructure, physical cabinets, and regional wireless beams across {siteConfig.regionName} parishes to provide granular connection analysis.
          </p>
        </div>

        {onNavigateToDirectory && (
          <button
            onClick={onNavigateToDirectory}
            className="shrink-0 self-start md:self-end px-4 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-250 hover:border-slate-350 text-slate-700 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
            id="view-full-directory-btn"
            style={{ minHeight: "36px" }}
          >
            <span>View Full Directory</span>
            <Search className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {/* Grid of highly polished light tracker cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {localProviders.map((provider) => {
          return (
            <div
              key={provider.providerId}
              className="bg-slate-50 hover:bg-slate-100/50 border border-slate-200 hover:border-slate-300 rounded-2xl p-4 transition-all flex flex-col justify-between gap-3 group relative text-left shadow-xs"
              id={`tracked-card-${provider.providerId}`}
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-extrabold text-[#02263d] text-sm leading-none group-hover:text-brand-green transition-colors">
                      {provider.displayName}
                    </h3>
                    <p className="text-[10px] text-slate-500 font-bold font-sans mt-1">
                      {provider.networkType} &bull; {provider.retailOrWholesale === "both" ? "Retail & Wholesale" : provider.retailOrWholesale === "wholesale" ? "Wholesale Only" : "Retail Connection"}
                    </p>
                  </div>
                  <span className={`text-[9px] font-bold font-sans uppercase tracking-wider px-2 py-0.5 rounded-md ${
                    provider.isMainstream 
                      ? "bg-blue-50 text-blue-700 border border-blue-200" 
                      : provider.isSatelliteProvider 
                        ? "bg-purple-50 text-purple-700 border border-purple-200" 
                        : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                  }`}>
                    {provider.isMainstream ? "Mainstream" : provider.isSatelliteProvider ? "LEO Satellite" : "Alternative Net"}
                  </span>
                </div>

                <p className="text-xs text-slate-650 leading-relaxed italic line-clamp-2">
                  &ldquo;{provider.coverageNotes}&rdquo;
                </p>

                {/* Categories Pills */}
                <div className="flex flex-wrap gap-1">
                  {provider.providerCategories.slice(0, 2).map((cat, idx) => (
                    <span 
                      key={idx}
                      className="text-[9px] font-mono bg-white text-slate-600 border border-slate-200 px-1.5 py-0.5 rounded font-semibold"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200 flex items-center justify-between gap-2 mt-1">
                {/* Internal Profile Link */}
                {onNavigateToProvider && (
                  <button
                    onClick={() => onNavigateToProvider(provider.slug)}
                    className="text-[10.5px] font-black text-[#107c91] hover:text-cyan-800 transition-colors flex items-center gap-1 cursor-pointer bg-none border-none p-0"
                    id={`view-profile-${provider.providerId}`}
                    style={{ minHeight: "32px" }}
                  >
                    <span>View Profile</span>
                    <ArrowRightIcon />
                  </button>
                )}

                {/* Direct action Check button */}
                <a
                  href={`${provider.baseUrl}?utm_source=${provider.utmSource || siteConfig.utmSource || "kent_broadband_listing"}&utm_medium=tracked_section&utm_campaign=${provider.utmCampaign || "provider_link"}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10.5px] font-bold text-slate-700 hover:text-slate-900 transition-colors flex items-center gap-1 cursor-pointer"
                  id={`offsite-link-${provider.providerId}`}
                  style={{ minHeight: "32px" }}
                >
                  <span>Visit Site</span>
                  <ExternalLink className="h-3 w-3 text-slate-400" />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Structured Legal Disclaimer */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 flex items-start gap-2.5 text-xs text-slate-600 leading-relaxed text-left">
        <Info className="h-5 w-5 text-brand-green shrink-0 mt-0.5" />
        <div>
          <span className="font-extrabold text-[#02263d]">{siteConfig.regionName} Tracker Guidance:</span> Provider relevance and inclusion in our tracking directory are determined based on reported regional network lines, listed local coverage, or potential availability around {siteConfig.regionName} parishes. Final speed rates, installation times, and pricing must be verified directly at address level on the provider’s website. Sourced information acts as a comparison only.
        </div>
      </div>
    </section>
  );
}

function ArrowRightIcon() {
  return (
    <svg className="h-2.5 w-2.5 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}
