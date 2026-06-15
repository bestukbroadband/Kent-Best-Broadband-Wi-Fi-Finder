/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState } from "react";
import { Mail, CheckCircle, ShieldCheck } from "lucide-react";
import { AdvertBanner } from "./AdvertBanner";
import siteConfig from "../config/siteConfig";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const isKent = siteConfig.regionSlug === "kent";
  const headingText = isKent ? "Get Kent broadband updates" : "Wiltshire Rural Fibre & Mast Tracker";
  const descText = isKent 
    ? "Sign up for occasional updates about broadband availability, tracked offers, rural connectivity news and provider changes across Kent. We do not sell broadband directly and cannot confirm address level availability."
    : "Sign up to receive monthly notifications of new altnet fibre rollouts, government Project Gigabit approvals, and 5G mast installations within Wiltshire villages.";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    // Log the submission as requested under guidelines
    console.log("[Newsletter Signup] New submission recorded:", {
      email,
      timestamp: new Date().toISOString()
    });

    setIsSubmitted(true);
    setEmail("");
  };

  return (
    <div className="bg-[#107c91] text-white rounded-3xl p-6 md:p-8 shadow-md space-y-6" id="newsletter-signup-box">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl font-sans text-left">
          <span className="text-[10px] font-bold tracking-widest text-[#a5f3fc] uppercase leading-none block">
            STAY UPDATED
          </span>
          <h2 className="text-xl md:text-2xl font-black tracking-tight text-white">
            {headingText}
          </h2>
          <p className="text-xs text-cyan-50 leading-relaxed font-semibold">
            {descText}
          </p>
        </div>

        <div className="w-full md:w-auto shrink-0 md:min-w-[320px]">
          {isSubmitted ? (
            <div className="flex items-center gap-2 text-xs text-white bg-white/10 border border-white/20 p-3.5 rounded-xl text-left">
              <CheckCircle className="h-5 w-5 shrink-0 text-[#a5f3fc]" />
              <p className="font-bold">Thanks for signing up! We'll keep you posted on {siteConfig.regionName} broadband developments.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="email"
                  placeholder="name@email.co.uk"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 pl-9 rounded-lg text-xs bg-white/10 border border-white/20 focus:border-[#a5f3fc] focus:bg-white/20 text-white outline-none placeholder:text-cyan-100"
                  style={{ minHeight: "44px" }}
                />
                <Mail className="absolute left-3 top-3.5 h-4 w-4 text-cyan-100" />
              </div>
              <button
                type="submit"
                className="px-4 py-2.5 bg-white hover:bg-slate-100 text-[#107c91] rounded-lg text-xs font-black transition-all cursor-pointer shadow-xs leading-none"
                style={{ minHeight: "44px" }}
              >
                Track Now
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="pt-4 border-t border-white/15">
        <AdvertBanner location="newsletter-sponsor" className="p-0 border-none bg-transparent" />
      </div>
    </div>
  );
}

export default NewsletterSignup;
