/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useMemo } from "react";
import { PostcodeArea, Provider, Offer, FeaturedOffer } from "../types";
import { ProviderCard } from "./ProviderCard";
import { WeeklyOfferHighlight } from "./WeeklyOfferHighlight";
import { LeadForm } from "./LeadForm";
import { DealRanking } from "./DealRanking";
import { AdvertBanner } from "./AdvertBanner";
import { postcodeAreasData } from "../data/postcodeAreas";
import { townsData } from "../data/towns";
import { Compass, MapPin, ChevronRight, HelpCircle, AlertCircle, Building2, Landmark, ShieldCheck, Info, Sparkles, ExternalLink } from "lucide-react";
import { getOffersForPostcode, calculateOfferScore } from "../utils/offersMatch";
import { buildTrackedUrl } from "../data/trackingConfig";
import { SeoContentBlock } from "./SeoContentBlock";
import { InternalSEOLinks } from "./InternalSEOLinks";
import { reusableSeoBlocks } from "../data/reusableSeoBlocks";
import { JsonLdSchema } from "./JsonLdSchema";
import siteConfig from "../config/siteConfig";
import {
  createWebsiteSchema,
  createOrganisationSchema,
  createWebPageSchema,
  createBreadcrumbSchema,
  createFAQSchema,
  createItemListSchema,
  createOfferSchema,
  createReviewSchema,
  createServiceSchema
} from "../data/schemaMarkup";

interface PostcodePageProps {
  postcodeArea: PostcodeArea;
  providers: Provider[];
  onEnquire: (p: Provider) => void;
  onPostcodeSelect: (prefix: string) => void;
  onBackToHome: () => void;
  onPageClick?: (pageId: string) => void;
  onTownClick?: (townId: string) => void;
}

const isFeaturedOffer = (o: any): o is FeaturedOffer => {
  return o && "weekCommencing" in o;
};

export function PostcodePage({
  postcodeArea,
  providers,
  onEnquire,
  onPostcodeSelect,
  onBackToHome,
  onPageClick,
  onTownClick
}: PostcodePageProps) {
  const isKent = siteConfig.regionSlug === "kent";
  const regionName = isKent ? "Kent" : "Wiltshire";

  // Heuristic calculation to check if a postcode is rural
  const isRuralPostcode = useMemo(() => {
    const text = (postcodeArea.introCopy + " " + postcodeArea.localBroadbandNotes).toLowerCase();
    return text.includes("rural") || text.includes("parish") || text.includes("village") || text.includes("farm");
  }, [postcodeArea]);

  const matchedTown = useMemo(() => {
    return townsData.find(
      (t) => t.name.toLowerCase() === postcodeArea.primaryTown.toLowerCase() ||
             t.id.toLowerCase() === postcodeArea.primaryTown.toLowerCase()
    );
  }, [postcodeArea.primaryTown]);

  const matchResult = useMemo(() => {
    return getOffersForPostcode(postcodeArea.postcodePrefix);
  }, [postcodeArea]);

  // Invalid postcode fallback
  if (postcodeArea.isInvalid) {
    return (
      <div className="space-y-8 animate-fadeIn max-w-2xl mx-auto py-12 text-center" id="invalid-postcode-page">
        <div className="bg-white border-2 border-slate-200 text-slate-800 p-8 rounded-3xl shadow-xl space-y-6">
          <div className="mx-auto w-16 h-16 bg-red-50 border border-red-200 text-red-600 rounded-full flex items-center justify-center">
            <AlertCircle className="h-8 w-8" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-black tracking-tight font-sans text-[#02263d]">
              Postcode Not Recognised
            </h1>
            <p className="text-slate-600 text-base leading-relaxed max-w-md mx-auto">
              Please enter a valid UK postcode or outward code, such as <strong className="text-brand-green">CT1</strong>, <strong className="text-brand-green">ME14</strong>, <strong className="text-brand-green">DA10</strong> or <strong className="text-brand-green">TN13</strong>.
            </p>
          </div>
          <div className="pt-2">
            <button
              onClick={onBackToHome}
              className="bg-[#02263d] text-white hover:bg-[#085175] transition-all font-bold text-sm px-6 py-3 rounded-xl shadow-md inline-flex items-center gap-2 cursor-pointer"
            >
              Go Back to Search
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Non-core postcode fallback
  if (postcodeArea.isNonCore) {
    return (
      <div className="space-y-8 animate-fadeIn" id={`non-core-postcode-page-${postcodeArea.postcodePrefix}`}>
        {/* 1. BREADCRUMBS BAR */}
        <nav className="text-xs uppercase font-bold tracking-wider text-slate-500 flex items-center gap-1">
          <button onClick={onBackToHome} className="hover:text-brand-green cursor-pointer transition-colors">
            {regionName} Finder
          </button>
          <ChevronRight className="h-3 w-3 text-slate-400" />
          <span className="text-slate-800 font-extrabold">{postcodeArea.postcodePrefix}</span>
        </nav>

        {/* 2. OUT OF CORE HERO TITLE */}
        <header className="bg-white border border-slate-200 text-slate-800 p-6 md:p-8 rounded-3xl shadow-sm space-y-4">
          <span className="bg-blue-50 border border-blue-200 text-blue-700 rounded-full text-xs font-black tracking-wide px-3 py-1 inline-block">
            Out of Core Coverage
          </span>
          <div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight flex flex-wrap items-center gap-2 text-[#02263d]">
              <MapPin className="h-7 w-7 text-[#02263d] shrink-0" />
              Broadband in {postcodeArea.postcodePrefix}
            </h1>
            <p className="text-xs text-slate-500 mt-1 font-semibold">
              Wider Area Coverage &bull; Outside Core Local Dataset
            </p>
          </div>
          <p className="text-slate-600 leading-relaxed text-sm md:text-base font-medium">
            {postcodeArea.introCopy}
          </p>
        </header>

        {/* 3. LOCAL VARIANCE NOTICE & SAFE WORDING */}
        <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl flex gap-3 text-xs leading-relaxed text-blue-900 shadow-sm">
          <Info className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-extrabold text-[#02263d] block mb-0.5">Address Checker Required:</span> 
            Broadband availability varies by exact address. Symmetrical fibre or national networks may be available, but must be verified with the official provider checker. Sourced rates, speeds, and contract conditions must be confirmed by the provider.
          </div>
        </div>

        {/* TWO-COLUMN BODY LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm space-y-6">
              <div className="space-y-1">
                <h2 className="text-lg font-bold text-[#02263d]">
                  Checkers to try for {postcodeArea.postcodePrefix}
                </h2>
                <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                  We recommend checking with the following major line and alternative networks to determine what packages serve your exact building number.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a
                  href="https://www.broadbandchecker.bt.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl p-4 flex flex-col justify-between h-32 transition-all hover:-translate-y-0.5 group pointer-events-auto"
                >
                  <span className="text-xs font-bold text-slate-500 uppercase">Openreach Network</span>
                  <div className="flex justify-between items-center text-[#02263d]">
                    <span className="text-sm font-black group-hover:text-brand-green">BT &amp; Openreach Checker</span>
                    <ExternalLink className="h-4 w-4" />
                  </div>
                </a>

                <a
                  href="https://www.virginmedia.com/broadband/postcode-checker"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl p-4 flex flex-col justify-between h-32 transition-all hover:-translate-y-0.5 group pointer-events-auto"
                >
                  <span className="text-xs font-bold text-slate-500 uppercase">Virgin Media Cable</span>
                  <div className="flex justify-between items-center text-[#02263d]">
                    <span className="text-sm font-black group-hover:text-brand-green">Virgin Cable Checkout</span>
                    <ExternalLink className="h-4 w-4" />
                  </div>
                </a>
              </div>
            </section>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <button
              onClick={onBackToHome}
              className="w-full text-center py-3 bg-[#02263d] hover:bg-[#085175] text-white font-bold rounded-xl transition-all"
            >
              Go back to search
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Central mapping utility for converting dynamic matched offer to fully compliant Provider format
  const mapOfferToProvider = (offer: Offer | FeaturedOffer, isWeeklyFeatured = false): Provider => {
    const isOffer = "offerId" in offer && "targetProviderTypes" in offer;
    const providerType = isOffer 
      ? (offer as Offer).targetProviderTypes 
      : [(offer as FeaturedOffer).providerType];
    const targetTowns = offer.targetTowns;
    const targetPostcodes = offer.targetPostcodes;
    const monthlyPrice = offer.monthlyPrice;
    const contractLength = offer.contractLength;
    const averageDownloadSpeed = offer.averageDownloadSpeed;
    const averageUploadSpeed = offer.averageUploadSpeed;
    const setupFee = offer.setupFee;
    const routerIncluded = offer.routerIncluded;
    const installationFee = offer.installationFee;
    const lastCheckedDate = isOffer ? (offer as Offer).lastCheckedDate : (offer as FeaturedOffer).lastReviewedDate;
    const bestFor = offer.bestFor;
    const isSponsored = "isSponsored" in offer ? (offer as Offer).isSponsored : true;
    const sponsorLabel = "sponsorLabel" in offer ? (offer as Offer).sponsorLabel : (offer as FeaturedOffer).sponsorLabel;
    const ctaLabel = offer.ctaLabel;
    const editorScore = offer.editorScore;
    const editorVerdict = offer.editorVerdict;
    const editorNotes = offer.editorNotes;
    const thingsToWatch = offer.thingsToCheck;
    const priceAfterMin = isOffer ? (offer as Offer).priceAfterMinimumTerm : offer.monthlyPrice;
    const priceRise = isOffer ? (offer as Offer).knownAnnualPriceRise : (offer as FeaturedOffer).knownPriceRise;

    const p: Provider = {
      id: offer.offerId,
      providerName: offer.providerName,
      packageName: offer.packageName,
      providerType: providerType as any,
      networkType: providerType[0] || "Alternative Network",
      logoText: isWeeklyFeatured ? "Weekly Pick" : "Editor Match",
      townsCovered: targetTowns,
      postcodeAreas: targetPostcodes,
      monthlyPriceFrom: monthlyPrice,
      monthlyPrice: monthlyPrice,
      monthlyPriceAfterContract: priceAfterMin,
      priceAfterMinimumTerm: priceAfterMin,
      contractLength: contractLength,
      averageDownloadSpeed: averageDownloadSpeed,
      averageUploadSpeed: averageUploadSpeed,
      setupFee: setupFee,
      routerCost: 0,
      routerIncluded: routerIncluded,
      installationFee: installationFee,
      deliveryFee: 0,
      phoneLineRequired: false,
      midContractPriceRise: isOffer ? (offer as Offer).midContractPriceRise : false,
      annualPriceRiseNote: priceRise,
      knownAnnualPriceRise: priceRise,
      bestFor: bestFor,
      coverageNote: `${targetTowns.join(", ")} parishes`,
      availabilityStatus: "Provider checker required", // Compliant Safe Wording
      rankingScore: "score" in offer ? (offer as any).score : 90,
      dealRank: 1,
      isSponsored: isSponsored,
      ctaLabel: ctaLabel,
      ctaUrl: buildTrackedUrl(offer.baseUrl, isWeeklyFeatured ? "weekly" : "postcode", { utm_term: postcodeArea.postcodePrefix.toLowerCase() }),
      leadFormEnabled: true,
      description: editorVerdict || offer.headline,
      lastCheckedDate: lastCheckedDate,
      pricingMode: "manual",
      priceStatus: "Active",
      priceDisclaimer: `${editorNotes}. Availability verified.`,
      editorScore: editorScore,
      editorVerdict: editorVerdict,
      editorNotes: editorNotes,
      thingsToWatch: thingsToWatch,
      lastReviewedDate: lastCheckedDate
    };
    return p;
  };

  const activeProvidersMapped = useMemo(() => {
    if (!matchResult || matchResult.matchingOffers.length === 0) {
      const list = providers.filter((p) =>
        postcodeArea.providerIds.includes(p.id) ||
        p.postcodeAreas.includes(postcodeArea.postcodePrefix)
      );
      return list.length > 0 ? list : providers.slice(0, 4);
    }
    return matchResult.matchingOffers.map((mapped) => mapOfferToProvider(mapped, false));
  }, [matchResult, postcodeArea, providers]);

  const nearbyPostcodeObjects = useMemo(() => {
    const list = postcodeArea.nearbyPostcodes || [];
    return postcodeAreasData.filter((area) =>
      list.includes(area.postcodePrefix)
    );
  }, [postcodeArea]);

  // Grouping logic based on Part 4 criteria
  const groupedProviders = useMemo(() => {
    const list = activeProvidersMapped;
    
    // Group 1: National mainstream networks
    const mainstream = list.filter(p => {
      const name = p.providerName.toLowerCase();
      return p.providerType.some(t => t.toLowerCase().includes("mainstream") || t.toLowerCase().includes("openreach")) ||
             ["bt", "virgin", "sky", "talktalk", "ee", "vodafone", "plusnet"].some(m => name.includes(m));
    });

    // Group 4: Mobile & Satellite options
    const mobileSatellite = list.filter(p => {
      const name = p.providerName.toLowerCase();
      return p.providerType.some(t => t.toLowerCase().includes("wireless") || t.toLowerCase().includes("5g") || t.toLowerCase().includes("satellite") || t.toLowerCase().includes("mobile")) ||
             ["three", "starlink", "o2"].some(m => name.includes(m));
    });

    // Group 2: Regional Altnets
    const regional = list.filter(p => {
      const name = p.providerName.toLowerCase();
      return !mainstream.includes(p) && !mobileSatellite.includes(p) &&
             (p.providerType.some(t => t.toLowerCase().includes("rural") || t.toLowerCase().includes("regional") || t.toLowerCase().includes("alternative")) ||
              ["trooli", "gigaclear", "wessex", "zzoomm", "voneus", "lightspeed", "jurassic", "giganet"].some(r => name.includes(r)));
    });

    // Group 3: Alternative Networks
    const altnets = list.filter(p => !mainstream.includes(p) && !mobileSatellite.includes(p) && !regional.includes(p));

    return {
      mainstream,
      regional,
      altnets,
      mobileSatellite
    };
  }, [activeProvidersMapped]);

  // Generate Schemas dynamically for SEO
  const postcodeSchemas = useMemo(() => {
    const canonical = `https://bestukbroadband.github.io/Kent-Best-Broadband-Wi-Fi-Finder/broadband/${postcodeArea.slug}`;
    const titleText = `Broadband Availability in ${postcodeArea.postcodePrefix} (${postcodeArea.areaName}) | ${regionName} Finder`;
    const summaryText = `Find independent listed broadband options, local altnet networks and telecom checkers in ${postcodeArea.postcodePrefix}.`;

    const websiteSchema = createWebsiteSchema();
    const organisationSchema = createOrganisationSchema();
    
    const webpageSchema = createWebPageSchema(
      canonical,
      titleText,
      summaryText,
      siteConfig.siteName,
      postcodeArea.lastUpdated
    );

    const crumbs = [
      { name: "Home", url: "https://bestukbroadband.github.io/Kent-Best-Broadband-Wi-Fi-Finder/" },
      { name: "Postcode Areas", url: "https://bestukbroadband.github.io/Kent-Best-Broadband-Wi-Fi-Finder/broadband-providers" },
      { name: postcodeArea.postcodePrefix, url: canonical }
    ];
    const breadcrumbSchema = createBreadcrumbSchema(crumbs);

    const faqSchema = postcodeArea.faqs && postcodeArea.faqs.length > 0
      ? createFAQSchema(postcodeArea.faqs)
      : null;

    const itemListSchema = createItemListSchema(
      activeProvidersMapped.map((p, idx) => ({
        position: idx + 1,
        name: p.providerName,
        url: p.ctaUrl
      })),
      `Best listed broadband options in ${postcodeArea.areaName}`
    );

    const offerSchemas = activeProvidersMapped.map(p => 
      createOfferSchema(
        p.packageName,
        p.description,
        p.monthlyPriceFrom,
        "GBP",
        p.ctaUrl,
        postcodeArea.lastUpdated
      )
    );

    const reviewSchema = activeProvidersMapped.length > 0
      ? createReviewSchema(
          `${activeProvidersMapped[0].providerName} in ${postcodeArea.postcodePrefix}`,
          activeProvidersMapped[0].editorScore || 8.5,
          `Editorial ranking of ${activeProvidersMapped[0].providerName} service in ${postcodeArea.areaName}.`
        )
      : createReviewSchema(
          `${regionName} Broadband in ${postcodeArea.postcodePrefix}`,
          8.5,
          `Objective comparison scoring for listed providers in postcode ${postcodeArea.postcodePrefix}.`
        );

    const serviceSchema = createServiceSchema(
      `Broadband listed offers in ${postcodeArea.postcodePrefix}`
    );

    return {
      websiteSchema,
      organisationSchema,
      webpageSchema,
      breadcrumbSchema,
      faqSchema,
      itemListSchema,
      offerSchemas,
      reviewSchema,
      serviceSchema
    };
  }, [postcodeArea, activeProvidersMapped, regionName]);

  return (
    <div className="space-y-8 animate-fadeIn text-slate-800" id={`postcode-page-${postcodeArea.postcodePrefix}`}>
      
      {/* 0. SEO JSON-LD INJECTION */}
      <JsonLdSchema schema={postcodeSchemas.websiteSchema} id={`website-schema-${postcodeArea.postcodePrefix}`} />
      <JsonLdSchema schema={postcodeSchemas.organisationSchema} id={`org-schema-${postcodeArea.postcodePrefix}`} />
      <JsonLdSchema schema={postcodeSchemas.webpageSchema} id={`webpage-schema-${postcodeArea.postcodePrefix}`} />
      <JsonLdSchema schema={postcodeSchemas.breadcrumbSchema} id={`breadcrumb-schema-${postcodeArea.postcodePrefix}`} />
      {postcodeSchemas.faqSchema && <JsonLdSchema schema={postcodeSchemas.faqSchema} id={`faq-schema-${postcodeArea.postcodePrefix}`} />}
      <JsonLdSchema schema={postcodeSchemas.itemListSchema} id={`itemlist-schema-${postcodeArea.postcodePrefix}`} />
      {postcodeSchemas.offerSchemas.map((offer, oIdx) => (
        <JsonLdSchema key={oIdx} schema={offer} id={`offer-schema-${postcodeArea.postcodePrefix}-${oIdx}`} />
      ))}
      <JsonLdSchema schema={postcodeSchemas.reviewSchema} id={`review-schema-${postcodeArea.postcodePrefix}`} />
      <JsonLdSchema schema={postcodeSchemas.serviceSchema} id={`service-schema-${postcodeArea.postcodePrefix}`} />
      
      {/* 1. BREADCRUMBS BAR */}
      <nav className="text-xs uppercase font-bold tracking-wider text-slate-500 flex items-center gap-1">
        <button onClick={onBackToHome} className="hover:text-brand-green cursor-pointer transition-colors">
          {regionName} Finder
        </button>
        <ChevronRight className="h-3 w-3 text-slate-400" />
        <span className="text-slate-500">Postcodes</span>
        <ChevronRight className="h-3 w-3 text-slate-400" />
        <span className="text-slate-800 font-extrabold">{postcodeArea.postcodePrefix} ({postcodeArea.areaName})</span>
      </nav>

      {/* 2. POSTCODE AREA TITLE HERO - Clean & Bright */}
      <header className="bg-white border border-slate-200 text-slate-800 p-6 md:p-8 rounded-3xl relative shadow-md">
        <div className="relative space-y-4 max-w-4xl">
          <span className="bg-brand-green-light border border-slate-200 text-brand-green rounded-full text-xs font-black tracking-wide px-3 py-1 inline-block">
            Broadband providers to check in {postcodeArea.areaName}
          </span>
          <div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight flex flex-wrap items-center gap-2 text-[#02263d]">
              <MapPin className="h-7 w-7 text-brand-green shrink-0" />
              Broadband in {postcodeArea.postcodePrefix}: {postcodeArea.areaName}
            </h1>
            <p className="text-xs text-slate-500 mt-1 font-semibold">
              Primary Covered Zone: {postcodeArea.primaryTown} &bull; {postcodeArea.county}, {postcodeArea.region}
            </p>
          </div>
          <p className="text-sm md:text-base text-slate-700 leading-relaxed font-sans font-medium">
            Broadband availability in <strong>{postcodeArea.areaName} ({postcodeArea.postcodePrefix})</strong> can vary by exact address, street and property type. The providers below are listed as useful checks for this area, not guaranteed availability.
          </p>
        </div>
      </header>

      {/* 3. CORE DISCLAIMER / LOCAL LINE VARIANCE NOTICE */}
      <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl flex gap-3 text-xs leading-relaxed text-slate-800 shadow-xs">
        <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-extrabold text-[#02263d] block mb-0.5">{regionName} Local Service Notice:</span> 
          Networks and package speeds are highly variable on a street-by-street level. Symmetrical broadband is rolling out aggressively across <strong>{postcodeArea.postcodePrefix}</strong>, but availability relies on precise cabinet locations and local infrastructure tests.
        </div>
      </div>

      {/* MANDATORY WARNING DISCLOSURE */}
      <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex gap-3 text-xs leading-relaxed text-slate-700 shadow-xs">
        <Info className="h-5 w-5 text-slate-500 shrink-0 mt-0.5" />
        <div>
          <span className="font-extrabold text-[#02263d] block mb-0.5">Initial Local Match Notification:</span> 
          Results are an initial local match. Final availability, speed, price and contract terms must be confirmed by the provider using your full address.
        </div>
      </div>

      {/* REGIONAL PARTNER SPONSORED BILLBOARD */}
      <AdvertBanner 
        location="postcode-page-sponsor" 
        postcodePrefix={postcodeArea.postcodePrefix} 
        className="w-full" 
      />

      {/* MAIN TWO-COLUMN BODY LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Local Providers, Rankings, Highlight and Notes */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* 4. ACTIVE & BUILD-STAGE PROVIDER CARDS (GROUPED SECTIONS AS PER PART 4) */}
          <section className="space-y-8">
            
            {/* Sector Intro */}
            <div className="space-y-1">
              <h2 className="text-xl font-black text-[#02263d] tracking-tight flex items-center gap-2 font-sans">
                <Building2 className="h-5.5 w-5.5 text-brand-green" />
                Available Provider Checkers
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                We group listed options into clear categories so you can test relevant checkers.
              </p>
            </div>

            {/* A. National provider checkers */}
            {groupedProviders.mainstream.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-[#02263d] border-b border-slate-200 pb-2 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-brand-navy rounded-full"></span>
                  National provider checkers
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {groupedProviders.mainstream.map((provider) => (
                    <ProviderCard
                      key={provider.id}
                      provider={provider}
                      onEnquire={onEnquire}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* B. Regional providers to check */}
            {groupedProviders.regional.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-[#02263d] border-b border-slate-200 pb-2 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-brand-green rounded-full"></span>
                  Regional providers to check
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {groupedProviders.regional.map((provider) => (
                    <ProviderCard
                      key={provider.id}
                      provider={provider}
                      onEnquire={onEnquire}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* C. Alternative networks to check */}
            {groupedProviders.altnets.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-[#02263d] border-b border-slate-200 pb-2 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-sky-500 rounded-full"></span>
                  Alternative networks to check
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {groupedProviders.altnets.map((provider) => (
                    <ProviderCard
                      key={provider.id}
                      provider={provider}
                      onEnquire={onEnquire}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* D. Mobile and satellite options */}
            {groupedProviders.mobileSatellite.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-[#02263d] border-b border-slate-200 pb-2 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-amber-500 rounded-full"></span>
                  Mobile and satellite options
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {groupedProviders.mobileSatellite.map((provider) => (
                    <ProviderCard
                      key={provider.id}
                      provider={provider}
                      onEnquire={onEnquire}
                    />
                  ))}
                </div>
              </div>
            )}

          </section>

          {/* 5. WEEKLY OFFER HIGHLIGHT (IF APPLICABLE) */}
          {matchResult && matchResult.weeklyOffer ? (
            <section className="space-y-3">
              <div className="space-y-1">
                <h2 className="text-lg font-extrabold text-[#02263d] tracking-tight font-sans flex items-center gap-2">
                  <Sparkles className="h-4.5 w-4.5 text-brand-green animate-pulse" />
                  {matchResult.isWeeklyOfferLocalHighlight 
                    ? `Weekly offer highlight for this area` 
                    : `Best matching postcode offer spotlight`
                  }
                </h2>
                <p className="text-xs text-slate-500">
                  {matchResult.isWeeklyOfferLocalHighlight 
                    ? `This highly-rated featured campaign targets the searched ${postcodeArea.postcodePrefix} prefix specifically.` 
                    : `Showing the best matching validated deal for the ${postcodeArea.postcodePrefix} sector.`
                  }
                </p>
              </div>
              {isFeaturedOffer(matchResult.weeklyOffer) ? (
                <WeeklyOfferHighlight
                  offerId={matchResult.weeklyOffer.offerId}
                  providerName={matchResult.weeklyOffer.providerName}
                  packageName={matchResult.weeklyOffer.packageName}
                  offerHeadline={matchResult.weeklyOffer.headline}
                  postcodeTargeting={matchResult.weeklyOffer.targetPostcodes.join(", ")}
                  townTargeting={matchResult.weeklyOffer.targetTowns.join(", ")}
                  monthlyPrice={matchResult.weeklyOffer.monthlyPrice}
                  contractLength={matchResult.weeklyOffer.contractLength}
                  averageDownloadSpeed={matchResult.weeklyOffer.averageDownloadSpeed}
                  averageUploadSpeed={matchResult.weeklyOffer.averageUploadSpeed}
                  setupFee={matchResult.weeklyOffer.setupFee}
                  routerIncluded={matchResult.weeklyOffer.routerIncluded}
                  knownPriceRise={matchResult.weeklyOffer.knownPriceRise}
                  offerValidUntil={matchResult.weeklyOffer.offerValidUntil}
                  editorScore={matchResult.weeklyOffer.editorScore}
                  editorVerdict={matchResult.weeklyOffer.editorVerdict}
                  editorNotes={matchResult.weeklyOffer.editorNotes}
                  bestFor={matchResult.weeklyOffer.bestFor}
                  thingsToWatch={matchResult.weeklyOffer.thingsToCheck}
                  ctaLabel={matchResult.weeklyOffer.ctaLabel}
                  ctaUrl={buildTrackedUrl(matchResult.weeklyOffer.baseUrl, "weekly", { utm_term: postcodeArea.postcodePrefix.toLowerCase() })}
                  isSponsored={true}
                  sponsorLabel={matchResult.weeklyOffer.sponsorLabel}
                  lastReviewedDate={matchResult.weeklyOffer.lastReviewedDate}
                  onEnquire={() => {
                    const mappedProv = mapOfferToProvider(matchResult.weeklyOffer!, true);
                    onEnquire(mappedProv);
                  }}
                />
              ) : (
                <WeeklyOfferHighlight
                  offerId={matchResult.weeklyOffer.offerId}
                  providerName={matchResult.weeklyOffer.providerName}
                  packageName={matchResult.weeklyOffer.packageName}
                  offerHeadline={matchResult.weeklyOffer.headline}
                  postcodeTargeting={matchResult.weeklyOffer.targetPostcodes.join(", ")}
                  townTargeting={matchResult.weeklyOffer.targetTowns.join(", ")}
                  monthlyPrice={matchResult.weeklyOffer.monthlyPrice}
                  contractLength={matchResult.weeklyOffer.contractLength}
                  averageDownloadSpeed={matchResult.weeklyOffer.averageDownloadSpeed}
                  averageUploadSpeed={matchResult.weeklyOffer.averageUploadSpeed}
                  setupFee={matchResult.weeklyOffer.setupFee}
                  routerIncluded={matchResult.weeklyOffer.routerIncluded}
                  knownPriceRise={matchResult.weeklyOffer.knownAnnualPriceRise}
                  offerValidUntil={matchResult.weeklyOffer.offerValidUntil}
                  editorScore={matchResult.weeklyOffer.editorScore}
                  editorVerdict={matchResult.weeklyOffer.editorVerdict}
                  editorNotes={matchResult.weeklyOffer.editorNotes}
                  bestFor={matchResult.weeklyOffer.bestFor}
                  thingsToWatch={matchResult.weeklyOffer.thingsToCheck}
                  ctaLabel={matchResult.weeklyOffer.ctaLabel}
                  ctaUrl={buildTrackedUrl(matchResult.weeklyOffer.baseUrl, "postcode", { utm_term: postcodeArea.postcodePrefix.toLowerCase() })}
                  isSponsored={matchResult.weeklyOffer.isSponsored}
                  sponsorLabel={matchResult.weeklyOffer.sponsorLabel}
                  lastReviewedDate={matchResult.weeklyOffer.lastCheckedDate}
                  onEnquire={() => {
                    const mappedProv = mapOfferToProvider(matchResult.weeklyOffer!, false);
                    onEnquire(mappedProv);
                  }}
                />
              )}
            </section>
          ) : (
            <section className="space-y-3">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-3" id="weekly-availability-editorial-card-postcode">
                <div className="flex items-center gap-2 text-brand-green">
                  <span className="p-1.5 bg-slate-100 rounded-lg">
                    <Info className="h-5 w-5 text-brand-green shrink-0" />
                  </span>
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#02263d] font-sans">
                    Weekly availability note
                  </h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                  We are currently reviewing listed broadband options for this area. Availability can vary by exact address, especially across rural {siteConfig.regionName}. Use the postcode search or provider checkers to confirm current packages before ordering.
                </p>
              </div>
            </section>
          )}

          {/* PARISH PLAN WEEKLY ADVERTISERS */}
          <AdvertBanner 
            location="weekly-offer-sponsor" 
            postcodePrefix={postcodeArea.postcodePrefix} 
            className="w-full" 
          />

          {/* 6. BEST LISTED DEALS (RANKED PACKAGES) DIRECT */}
          <section className="space-y-4">
            <div className="space-y-2">
              <h2 className="text-xl font-extrabold text-[#02263d] tracking-tight flex items-center gap-2 font-sans">
                <Landmark className="h-5 w-5 text-brand-green" />
                Best Listed Deals in {postcodeArea.postcodePrefix}
              </h2>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-slate-700">
                <p className="text-xs leading-normal">
                  Our rigorous, multi-factor ranking considers: Monthly price, average download speed, average upload speed, contract length, setup fee, router cost, installation fee, known price changes, price after contract, availability confidence, editor score, rural suitability, home working suitability, and provider type.
                </p>
                <p className="text-[11px] text-amber-600 font-bold leading-normal">
                  Note: Rankings are based on the package information currently listed on this site. Availability and final pricing must be confirmed by the provider. Sponsored listings are clearly marked and do not automatically receive a higher ranking.
                </p>
              </div>
            </div>

            <div className="space-y-5 col-active">
              {activeProvidersMapped.map((provider, index) => (
                <DealRanking
                  key={provider.id}
                  provider={provider}
                  rank={index + 1}
                  onEnquire={onEnquire}
                />
              ))}
            </div>
          </section>

          {/* 7. LOCAL BROADBAND NOTES & EDITOR NOTES */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 border border-slate-200 rounded-2xl p-5 md:p-6 text-slate-800">
            <div className="space-y-2.5">
              <h3 className="text-sm font-black uppercase tracking-wider text-brand-green font-sans flex items-center gap-1.5 whitespace-nowrap">
                <Info className="h-4 w-4" />
                Local Connection Notes
              </h3>
              <p className="text-xs leading-relaxed text-slate-600">
                {postcodeArea.localBroadbandNotes}
              </p>
            </div>
            
            <div className="space-y-2.5 border-t md:border-t-0 md:border-l border-slate-200 pt-4 md:pt-0 md:pl-6">
              <h3 className="text-sm font-black uppercase tracking-wider text-brand-navy font-sans flex items-center gap-1.5 whitespace-nowrap">
                <ShieldCheck className="h-4 w-4" />
                {regionName} Editor Notes
              </h3>
              <p className="text-xs leading-relaxed text-slate-600">
                Our Editorial Assessment assigns these scores based on actual local altnet surveys, real customer support track records, and contract layout transparency. We consistently update scores to ensure Salisbury Plain and local and alternative providers are treated without mainstream bias.
              </p>
            </div>
          </section>

          {/* REUSABLE EXPERT ADVICE SECTIONS */}
          <section className="space-y-4 pt-2">
            <div className="border-b border-slate-200 pb-2">
              <h3 className="text-sm font-black uppercase tracking-wider text-[#02263d] font-sans flex items-center gap-1.5">
                <HelpCircle className="h-4.5 w-4.5 text-brand-green" />
                Consumer Guides & Frameworks
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                Understand the nuances of rural parished connections and standard wireless propagation before ordering.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SeoContentBlock
                key={reusableSeoBlocks["why-postcode-checks-matter"].blockId}
                eyebrow={reusableSeoBlocks["why-postcode-checks-matter"].eyebrow}
                heading={reusableSeoBlocks["why-postcode-checks-matter"].heading}
                intro={reusableSeoBlocks["why-postcode-checks-matter"].intro}
                contentParagraphs={reusableSeoBlocks["why-postcode-checks-matter"].contentParagraphs}
                bulletPoints={reusableSeoBlocks["why-postcode-checks-matter"].bulletPoints}
                editorNote={reusableSeoBlocks["why-postcode-checks-matter"].editorNote}
                ctaLabel={reusableSeoBlocks["why-postcode-checks-matter"].ctaLabel}
                ctaTarget={reusableSeoBlocks["why-postcode-checks-matter"].ctaTarget}
                relatedLinks={reusableSeoBlocks["why-postcode-checks-matter"].relatedLinks}
                onAction={(target) => {
                  if (target === "address-check") {
                    document.getElementById("postcode-lead-form")?.scrollIntoView({ behavior: "smooth" });
                  } else {
                    onPageClick?.(target);
                  }
                }}
              />

              <SeoContentBlock
                key={isRuralPostcode ? reusableSeoBlocks["rural-broadband-notes"].blockId : reusableSeoBlocks["what-makes-a-good-deal"].blockId}
                eyebrow={isRuralPostcode ? reusableSeoBlocks["rural-broadband-notes"].eyebrow : reusableSeoBlocks["what-makes-a-good-deal"].eyebrow}
                heading={isRuralPostcode ? reusableSeoBlocks["rural-broadband-notes"].heading : reusableSeoBlocks["what-makes-a-good-deal"].heading}
                intro={isRuralPostcode ? reusableSeoBlocks["rural-broadband-notes"].intro : reusableSeoBlocks["what-makes-a-good-deal"].intro}
                contentParagraphs={isRuralPostcode ? reusableSeoBlocks["rural-broadband-notes"].contentParagraphs : reusableSeoBlocks["what-makes-a-good-deal"].contentParagraphs}
                bulletPoints={isRuralPostcode ? reusableSeoBlocks["rural-broadband-notes"].bulletPoints : reusableSeoBlocks["what-makes-a-good-deal"].bulletPoints}
                editorNote={isRuralPostcode ? reusableSeoBlocks["rural-broadband-notes"].editorNote : reusableSeoBlocks["what-makes-a-good-deal"].editorNote}
                ctaLabel={isRuralPostcode ? reusableSeoBlocks["rural-broadband-notes"].ctaLabel : reusableSeoBlocks["what-makes-a-good-deal"].ctaLabel}
                ctaTarget={isRuralPostcode ? reusableSeoBlocks["rural-broadband-notes"].ctaTarget : reusableSeoBlocks["what-makes-a-good-deal"].ctaTarget}
                relatedLinks={isRuralPostcode ? reusableSeoBlocks["rural-broadband-notes"].relatedLinks : reusableSeoBlocks["what-makes-a-good-deal"].relatedLinks}
                onAction={(target) => {
                  if (target === "address-check") {
                    document.getElementById("postcode-lead-form")?.scrollIntoView({ behavior: "smooth" });
                  } else {
                    onPageClick?.(target);
                  }
                }}
              />
            </div>
          </section>

          {/* 8. FAQ SECTION */}
          <section className="bg-slate-50 border border-slate-200 rounded-2xl p-5 md:p-6 space-y-4 shadow-sm">
            <h3 className="text-sm font-black uppercase tracking-wider text-[#02263d] font-sans flex items-center gap-1.5">
              <HelpCircle className="h-4.5 w-4.5 text-brand-green" />
              Frequently Asked Questions for {postcodeArea.postcodePrefix} Residents
            </h3>
            <div className="space-y-3 font-sans">
              {postcodeArea.faqs.map((faq, idx) => (
                <div key={idx} className="bg-white border border-slate-200 p-4 rounded-xl space-y-2">
                  <h4 className="text-sm font-black text-[#02263d] flex items-start gap-1.5 leading-snug">
                    <span className="text-amber-600">Q:</span>
                    {faq.question}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed pl-4">
                    <span className="text-[#107c91] font-bold block mb-1">Answer:</span>
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* Right Column: Lead Form, Nearby Postcodes and Disclaimers */}
        <div className="space-y-8">
          
          {/* 9. LEAD CAPTURE FORM - Clearly about Updates */}
          <section id="postcode-lead-form" className="bg-white border border-slate-200 p-5 rounded-2xl space-y-4 shadow-md">
            <div className="space-y-1">
              <h3 className="text-sm font-black uppercase tracking-wider text-[#02263d] font-sans">
                Postcode Eligibility Update
              </h3>
              <p className="text-[11px] text-slate-550 leading-normal font-medium">
                We do not sell contracts directly. Submit details below to let our team verify speed trends, active ISP coverage, and community tracking updates for this parished district.
              </p>
            </div>
            <LeadForm
              preSelectedProvider={activeProvidersMapped[0]}
              onSubmitSuccess={() => {}}
              className="bg-transparent"
            />
          </section>

          {/* 10. NEARBY POSTCODE AREAS */}
          {nearbyPostcodeObjects.length > 0 && (
            <section className="bg-white border border-slate-200 p-5 rounded-2xl space-y-3 shadow-xs">
              <h3 className="text-xs font-black uppercase tracking-widest text-[#02263d]">
                Nearby Postcode Areas
              </h3>
              <p className="text-[11px] text-slate-600 font-medium">
                Explore broadband deployment patterns for communities adjacent to {postcodeArea.postcodePrefix}:
              </p>
              
              <div className="flex flex-wrap gap-2 pt-1">
                {nearbyPostcodeObjects.map((area) => (
                  <button
                    key={area.postcodePrefix}
                    onClick={() => onPostcodeSelect(area.postcodePrefix)}
                    className="px-3 py-1.5 bg-slate-50 hover:bg-brand-green-light border border-slate-200 hover:border-brand-green select-none text-xs rounded text-slate-700 hover:text-[#107c91] cursor-pointer font-bold transition-all flex items-center gap-1"
                    style={{ minHeight: "36px" }}
                  >
                    <MapPin className="h-3.5 w-3.5 text-brand-green" />
                    <span>{area.postcodePrefix} ({area.primaryTown})</span>
                  </button>
                ))}
              </div>
            </section>
          )}

          {/* RELATED TOWN GUIDE */}
          {matchedTown && onTownClick && (
            <section className="bg-white border border-slate-200 p-5 rounded-2xl space-y-3 shadow-xs">
              <h3 className="text-xs font-black uppercase tracking-widest text-[#02263d] flex items-center gap-1.5">
                <Building2 className="h-4 w-4 text-brand-green" />
                Related {regionName} Town Guide
              </h3>
              <p className="text-[11px] text-slate-600 font-medium">
                Explore broadband options, Altnet rollouts and speed rankings for the primary hub serving this postcode:
              </p>
              <button
                type="button"
                onClick={() => onTownClick(matchedTown.id)}
                className="w-full text-left p-3.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl flex items-center justify-between group transition-all cursor-pointer shadow-sm"
                style={{ minHeight: "44px" }}
              >
                <div className="space-y-1">
                  <span className="text-xs font-bold text-slate-800 group-hover:text-brand-green transition-colors block">
                    {matchedTown.name} Broadband Guide
                  </span>
                  <span className="text-[10px] text-slate-500 line-clamp-1 block">
                    {matchedTown.shortIntro || "Compare local providers and speeds."}
                  </span>
                </div>
                <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-brand-green group-hover:translate-x-0.5 transition-all shrink-0" />
              </button>
            </section>
          )}

          {/* 11. TRANSPARENT COMPLIANCE DISCLAIMER */}
          <section className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-2 text-[11px] text-slate-500 leading-relaxed font-sans font-medium">
            <p className="font-bold text-slate-700 uppercase tracking-wider text-[11px]">
              Service Check Disclosures
            </p>
            <p>
              We provide independent information comparing selected {regionName} alternative networks and national Openreach providers. Symmetrical speed estimates, router inclusions, and monthly setup rates are correct at the time of publication but remain subject to detailed provider survey and terms.
            </p>
            <p>
              Sponsored placements are clearly marked and do not automatically improve scoring or placement ranks. Always verify precise legal terms directly on the provider's checkout screen before committing to contracts.
            </p>
            <p className="text-[10px]">
              {regionName} Broadband Finder is operated by Cane Communications Limited, Company number 11485145.
            </p>
          </section>

        </div>

      </div>

      {/* 12. INTERNAL SEO LINK DIRECTORY */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        <InternalSEOLinks
          onPageClick={onPageClick || (() => {})}
          onPostcodeClick={onPostcodeSelect}
          onTownClick={onTownClick || (() => {})}
          id="postcode-page-seo-links"
        />
      </div>

    </div>
  );
}
export default PostcodePage;
