/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Provider } from "../types";
import { Sparkles, Calendar, MapPin, ExternalLink } from "lucide-react";
import { EditorScoreCard } from "./EditorScoreCard";
import { PriceDetails } from "./PriceDetails";
import siteConfig from "../config/siteConfig";
import { getProviderCtaUrl, getProviderCtaLabel } from "../data/trackingConfig";

interface SponsoredDealCardProps {
  key?: any;
  provider: Provider;
  onEnquire: (p: Provider) => void;
}

export function SponsoredDealCard({ provider, onEnquire }: SponsoredDealCardProps) {
  const ctaUrl = getProviderCtaUrl(provider.id);
  const ctaLabel = getProviderCtaLabel(provider.id);
  const isExternal = !ctaUrl.startsWith("#");

  return (
    <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-5 border-2 border-amber-300 shadow-sm relative overflow-hidden" id={`spon-deal-${provider.id}`}>
      {/* AD REVEAL HEADER */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-amber-250 pb-2.5 mb-4">
        <span className="text-[10px] font-extrabold uppercase text-amber-700 tracking-wider flex items-center gap-1">
          <Sparkles className="h-3.5 w-3.5" />
          {siteConfig.regionName} Deal Spotlight
        </span>
        <span className="text-[8.5px] font-bold tracking-widest text-amber-800 uppercase bg-amber-200 px-2 py-0.5 rounded border border-amber-300 shrink-0">
          SPONSORED PLACEMENT
        </span>
      </div>

      <div className="space-y-4">
        {/* Title Specs */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div className="space-y-0.5">
            <h3 className="text-base font-black text-slate-900 leading-tight">
              {provider.providerName} &ndash; {provider.packageName}
            </h3>
            <span className="text-xs text-slate-600 block">{provider.networkType}</span>
          </div>
          <div className="text-left sm:text-right">
            <span className="text-[9px] font-bold text-stone-500 uppercase tracking-widest block">Average Speed</span>
            <span className="text-sm font-extrabold text-stone-900">{provider.averageDownloadSpeed} Mbps</span>
          </div>
        </div>

        {/* Brand new robust pricing grid */}
        <PriceDetails
          monthlyPrice={provider.monthlyPrice}
          monthlyPriceFrom={provider.monthlyPriceFrom}
          monthlyPriceAfterContract={provider.monthlyPriceAfterContract}
          priceAfterMinimumTerm={provider.priceAfterMinimumTerm}
          contractLength={provider.contractLength}
          setupFee={provider.setupFee}
          routerCost={provider.routerCost}
          routerIncluded={provider.routerIncluded}
          installationFee={provider.installationFee}
          deliveryFee={provider.deliveryFee}
          midContractPriceRise={provider.midContractPriceRise}
          knownAnnualPriceRise={provider.knownAnnualPriceRise}
          annualPriceRiseNote={provider.annualPriceRiseNote}
          lastCheckedDate={provider.lastCheckedDate}
          priceStatus={provider.priceStatus}
          priceDisclaimer={provider.priceDisclaimer}
          isDark={false}
        />

        {/* Buttons / Actions bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-amber-250">
          <div className="w-full sm:w-auto">
            <EditorScoreCard provider={provider} isDark={false} />
          </div>
          
          {ctaUrl ? (
            <a
              href={ctaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold font-sans transition-colors cursor-pointer text-center flex items-center justify-center gap-1.5"
            >
              {ctaLabel}
              <ExternalLink className="h-3.5 w-3.5 shrink-0" />
            </a>
          ) : (
            <button
              disabled
              className="w-full sm:w-auto px-5 py-2.5 bg-slate-300 text-slate-500 rounded-lg text-xs font-bold font-sans cursor-not-allowed opacity-60 text-center"
            >
              Provider link being reviewed
            </button>
          )}
        </div>
        <p className="text-[9.5px] text-center text-amber-900/80 font-semibold leading-relaxed font-sans pt-1.5 border-t border-amber-200/50">
          We do not sell broadband directly. Provider pricing, availability, installation and contract terms must be confirmed on the provider’s website.
        </p>
      </div>
    </div>
  );
}

export default SponsoredDealCard;
