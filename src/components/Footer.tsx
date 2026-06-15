/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React from "react";
import { Network, HelpCircle, Mail, Map } from "lucide-react";
import { siteSettingsData } from "../data/siteSettings";
import { providerCategoriesData } from "../data/providerCategories";
import { townsData } from "../data/towns";
import { BrandLogo } from "./BrandLogo";
import siteConfig from "../config/siteConfig";

interface FooterProps {
  onNavClick: (tabId: string) => void;
  activeTab: string;
}

export function Footer({ onNavClick, activeTab }: FooterProps) {
  const isKent = siteConfig.regionSlug === "kent";
  const titleText = isKent ? "Kent Broadband Finder" : "Wiltshire Broadband Finder";
  const subtitleText = isKent 
    ? "Independent local broadband information and listing guide" 
    : "Independent Wiltshire local broadband comparison tracker";

  const handleLinkClick = (tabId: string) => {
    onNavClick(tabId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleTownClick = (townId: string) => {
    onNavClick(`town-${townId}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const featuredTowns = townsData.slice(0, 8);

  const disclaimerText = isKent
    ? "Kent Broadband Finder does not sell broadband directly. Always confirm availability, speeds, pricing, installation and contract terms with the provider before ordering."
    : "Wiltshire Broadband Finder does not sell broadband directly. Always confirm availability, speeds, pricing, installation and contract terms with the provider before ordering.";

  return (
    <footer className="bg-[#02263d] border-t border-slate-700/60 text-slate-100 text-xs py-12 md:py-16" id="site-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* FOOTER MULTICOLUMNS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* SITE INFO AND BRAND COLUMN */}
          <div className="space-y-4 md:col-span-1 text-left">
            <BrandLogo variant="footer" showText={true} backgroundMode="dark" />
            <div className="space-y-1">
              <h3 className="text-xs font-black text-white tracking-wider font-sans uppercase">
                {titleText}
              </h3>
              <p className="text-[10px] text-slate-300 leading-normal font-semibold">
                {subtitleText}
              </p>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed font-medium">
              Assisting {siteConfig.regionName} households and businesses in checking listed broadband, full fibre, regional altnets, 5G, and satellite checkers.
            </p>
            <div className="text-[10px] text-slate-300 space-y-1.5 leading-tight">
              <p className="font-extrabold text-brand-gold">Project of: {siteSettingsData.owner.companyName}</p>
              <p>Company Reg No: {siteSettingsData.owner.companyNumber}</p>
              <p>Enquiry Email: <a href={`mailto:${siteSettingsData.owner.contactEmail}`} className="text-brand-gold hover:underline transition-colors font-bold" id="footer-contact-email-link">Info</a></p>
            </div>
          </div>

          {/* SEO GUIDES COLUMN */}
          <div className="space-y-3 text-left">
            <h4 className="text-brand-gold text-xs font-black uppercase tracking-widest border-b border-slate-700/60 pb-2">
              Broadband Guides
            </h4>
            <ul className="space-y-2 text-[11px] font-semibold">
              <li>
                <button onClick={() => handleLinkClick(`best-broadband-${siteConfig.regionSlug}`)} className="text-slate-100 hover:text-brand-gold hover:underline transition-colors cursor-pointer text-left">
                  Best Broadband in {siteConfig.regionName}
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick(`best-wifi-${siteConfig.regionSlug}`)} className="text-slate-100 hover:text-brand-gold hover:underline transition-colors cursor-pointer text-left">
                  Best WiFi in {siteConfig.regionName}
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick(`rural-broadband-${siteConfig.regionSlug}`)} className="text-slate-100 hover:text-brand-gold hover:underline transition-colors cursor-pointer text-left">
                  Best Rural Broadband
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick(`full-fibre-broadband-${siteConfig.regionSlug}`)} className="text-slate-100 hover:text-brand-gold hover:underline transition-colors cursor-pointer text-left">
                  Full Fibre {siteConfig.regionName}
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick(`alternative-network-broadband-${siteConfig.regionSlug}`)} className="text-slate-100 hover:text-brand-gold hover:underline transition-colors cursor-pointer text-left">
                  Alternative Networks
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick(`broadband-deals-${siteConfig.regionSlug}`)} className="text-slate-100 hover:text-brand-gold hover:underline transition-colors cursor-pointer text-left">
                  Broadband Deals {siteConfig.regionName}
                </button>
              </li>
            </ul>
          </div>

          {/* POPULAR TOWNS COLUMN */}
          <div className="space-y-3 text-left">
            <h4 className="text-brand-gold text-xs font-black uppercase tracking-widest border-b border-slate-700/60 pb-2">
              {siteConfig.regionName} Towns Covered
            </h4>
            <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 text-[11px] font-semibold text-left">
              {featuredTowns.map((town) => (
                <button
                  key={town.id}
                  onClick={() => handleTownClick(town.id)}
                  className="text-slate-100 hover:text-brand-gold hover:underline transition-colors text-left truncate cursor-pointer"
                >
                  {town.name}
                </button>
              ))}
            </div>
          </div>

          {/* COMPLIANCE PAGES COLUMN */}
          <div className="space-y-3 text-left">
            <h4 className="text-brand-gold text-xs font-black uppercase tracking-widest border-b border-slate-700/60 pb-2">
              Legal &amp; Info
            </h4>
            <ul className="space-y-2 text-[11px] font-semibold">
              <li>
                <button onClick={() => handleLinkClick("list-provider")} className="text-brand-gold hover:text-brand-gold-hover hover:underline transition-colors cursor-pointer text-left font-black">
                  List Your Broadband Service
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick("advertise")} className="text-brand-gold hover:text-brand-gold-hover hover:underline transition-colors cursor-pointer text-left font-black">
                  Advertise With Us
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick("how-we-track-offers")} className="text-slate-100 hover:text-brand-gold hover:underline transition-colors cursor-pointer text-left font-black">
                  How We Track Offers
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick("get-updates")} className="text-brand-gold hover:text-brand-gold-hover hover:underline transition-colors cursor-pointer text-left font-black">
                  Get Updates
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick("providers-directory")} className="text-slate-100 hover:text-brand-gold hover:underline transition-colors cursor-pointer text-left">
                  Broadband Providers
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick("privacy")} className="text-slate-100 hover:text-brand-gold hover:underline transition-colors cursor-pointer text-left">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick("terms")} className="text-slate-100 hover:text-brand-gold hover:underline transition-colors cursor-pointer text-left">
                  Terms of Use
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick("cookie")} className="text-slate-100 hover:text-brand-gold hover:underline transition-colors cursor-pointer text-left">
                  Cookie Policy
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* REGULATORY DISCLAIMER ZONE */}
        <div className="pt-8 border-t border-slate-700/60 space-y-4 text-left">
          <div className="bg-[#06314f] p-4 rounded-xl border border-brand-teal/30 text-[10.5px] leading-relaxed text-slate-100 space-y-2.5 shadow-sm text-left">
            <p>
              <strong>Availability Disclaimer:</strong> {disclaimerText}
            </p>
            <p>
              <strong>Commission Wording Detail:</strong> {siteSettingsData.disclaimers.commissionNotice} {siteSettingsData.disclaimers.marketLimitNotice} We make zero guarantees regarding line speeds, active promotions, or package costs. Sourced rates remain subject to precise address test.
            </p>
          </div>

          {/* COPYRIGHT SHIELD */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-slate-300 font-sans">
            <p>{siteSettingsData.disclaimers.footerCopyright}</p>
            <p>{siteSettingsData.disclaimers.footerTradingStyle}</p>
          </div>
        </div>

      </div>
    </footer>
  );
}
export default Footer;
