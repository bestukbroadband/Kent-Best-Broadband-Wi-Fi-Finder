/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Search, ListChecks, CheckSquare, ShieldAlert } from "lucide-react";
import siteConfig from "../config/siteConfig";

export function HowItWorks() {
  const isKent = siteConfig.regionSlug === "kent";

  const steps = [
    {
      num: "1",
      title: "Enter your postcode area",
      desc: isKent 
        ? "Search by Kent postcode district, such as CT10, ME14, DA10 or TN13."
        : "Search by Wiltshire postcode district, such as SN10, SP4, BA15 or SN1.",
      icon: Search,
    },
    {
      num: "2",
      title: "See providers to check",
      desc: "We show national, regional and alternative providers that may be relevant to that area.",
      icon: ListChecks,
    },
    {
      num: "3",
      title: "Confirm with the provider",
      desc: "Use provider checkers to confirm exact availability, speed, installation and price.",
      icon: CheckSquare,
    },
  ];

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 md:p-8 space-y-6" id="how-it-works">
      <div className="text-center max-w-2xl mx-auto mb-2">
        <span className="text-xs font-black uppercase tracking-widest text-[#107c91]">How it works</span>
        <h2 className="text-2xl md:text-3xl font-black text-[#02263d] mt-1">
          Find your options in 3 simple steps
        </h2>
        <p className="text-sm text-slate-600 mt-2">
          We aggregate different digital infrastructures across {siteConfig.regionName} so you can quickly identify which address checks are worth executing.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div 
              key={idx} 
              className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-[#107c91] transition-all flex flex-col justify-between group shadow-sm"
              style={{ minHeight: "180px" }}
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className="p-3 bg-slate-100 rounded-xl text-[#02263d] group-hover:bg-[#107c91] group-hover:text-white transition-colors">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="text-3xl font-black text-slate-200 select-none font-sans group-hover:text-amber-500 transition-colors">
                    0{step.num}
                  </span>
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-[#02263d]">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Trust Credibility notice */}
      <div className="bg-amber-50 border border-amber-200/60 p-4 rounded-xl flex gap-3 text-xs leading-relaxed text-slate-700">
        <ShieldAlert className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
        <p>
          <span className="font-bold text-[#02263d]">Safety Advice:</span> Kent Broadband Finder is an independent lookup guide and does not sell plans or act as an ISP. Broadband speeds, service contracts, and prices must always be confirmed directly with the provider before placing an order.
        </p>
      </div>
    </div>
  );
}

export default HowItWorks;
