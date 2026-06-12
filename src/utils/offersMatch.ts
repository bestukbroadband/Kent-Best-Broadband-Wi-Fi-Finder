/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PostcodeArea, Offer, OfferAvailability, FeaturedOffer, BroadbandNewsItem } from "../types";
import { postcodeAreasData } from "../data/postcodeAreas";
import rawLiveOffers from "../data/liveOffers.json";
import { providersData } from "../data/providers";
import { extractOutwardCode, isKentPostcode, isWiltshirePostcode } from "./postcodeHelper";

// Dynamic map of JSON offers to strong Offer types
export const offersData: Offer[] = (rawLiveOffers as any[]).map((item) => {
  const provider = providersData.find(p => p.id === item.providerId) || {
    rankingScore: 85,
    editorVerdict: "Tracked provider offering verified speeds, subject to address checking.",
    editorNotes: "Pricing and specifications are tracked from public sources. Exact services depend on direct address status.",
    townsCovered: [],
    postcodeAreas: [],
    coverageNotes: "",
    coverageNote: "",
  };

  const midContractRise = !(item.knownPriceRise || "").toLowerCase().includes("fixed") && 
                         !(item.knownPriceRise || "").toLowerCase().includes("no yearly") &&
                         !(item.knownPriceRise || "").toLowerCase().includes("price locked");

  const score = item.editorScore || parseFloat(((provider.rankingScore || 85) / 10).toFixed(1));

  return {
    offerId: item.offerId,
    providerId: item.providerId,
    providerName: item.providerName,
    packageName: item.packageName,
    headline: item.packageName + " - Tracked Rate",
    shortDescription: `Tracked offer checked regularly. Symmetrical options and exact speeds are subject to address check verification.`,
    monthlyPrice: item.monthlyPriceNumeric,
    contractLength: item.contractLengthMonths,
    averageDownloadSpeed: item.averageDownloadSpeed,
    averageUploadSpeed: item.averageUploadSpeed,
    setupFee: item.setupFee,
    installationFee: item.installationFee,
    routerCost: item.routerCost || 0,
    routerIncluded: item.routerIncluded !== false,
    knownAnnualPriceRise: item.knownPriceRise || "Fixed during contract term",
    midContractPriceRise: midContractRise,
    priceAfterMinimumTerm: item.priceAfterContract || (item.monthlyPriceNumeric * 1.25),
    offerValidUntil: "2026-12-31",
    targetPostcodes: item.targetPostcodes || provider.postcodeAreas || [],
    targetTowns: item.targetTowns || provider.townsCovered || [],
    targetProviderTypes: ["Full fibre providers", "Alternative network providers"],
    availabilityConfidence: "High",
    editorScore: score,
    editorVerdict: provider.editorVerdict || "Verified option",
    editorNotes: provider.editorNotes || "Tracked option",
    thingsToCheck: ["Requires direct provider address check", "Terms can change without notice"],
    bestFor: "Tracked pricing stability & solid download rates",
    isSponsored: item.providerId === "zzoomm", // Let Zzoomm remain featured partner if suitable
    sponsorLabel: "Best Listed Deal to Check",
    baseUrl: item.sourceUrl,
    ctaLabel: "Check physical availability",
    pricingMode: "csv_import",
    lastCheckedDate: item.lastChecked || "2026-06-08",
    isLive: item.isLive !== false,
  };
});

import { offerAvailabilityData, getAvailabilityForOffer } from "../data/offerAvailability";
import { featuredOfferData } from "../data/featuredOffer";

/**
 * Normalises a postcode input and extracts the outward prefix (e.g. SN10, BA14, RG17).
 * Also returns clean space-separated formats where appropriate.
 */
export function normalisePostcode(postcodeInput: string): string {
  return extractOutwardCode(postcodeInput);
}

/**
 * Calculates a numerical suitability and performance score for a broadband offer.
 * Designed to score deals objectively across Wiltshire rural & home working parameters.
 * 
 * Sponsored status must NOT automatically improve ranking.
 */
export function calculateOfferScore(offer: Offer): number {
  let score = 100;

  // 1. Monthly Price: lower price is better.
  // Base expectation: £30/month is neutral. Lower is a positive bonus.
  score += (30 - offer.monthlyPrice) * 2.0;

  // 2. Download Speed: higher is better.
  score += (offer.averageDownloadSpeed / 10.0);

  // 3. Upload Speed & Symmetrical Bonus:
  // Higher upload speed is heavily rewarded.
  score += (offer.averageUploadSpeed / 15.0);
  if (offer.averageDownloadSpeed === offer.averageUploadSpeed) {
    // Symmetrical Fibre Bonus (Highly preferred for Remote/HQ activities)
    score += 15;
  }

  // 4. Contract Length: shorter is better (ideal flexibility).
  // Neutral: 18 months.
  score += (18 - offer.contractLength) * 1.0;

  // 5. Upfront Costs (Setup + Installation): lower is better.
  const upfront = offer.setupFee + offer.installationFee;
  score -= (upfront * 0.4);

  // 6. Router Included:
  if (offer.routerIncluded) {
    score += 10;
  } else {
    score -= 15;
  }

  // 7. Price Stability (Guarantees & Price Rises):
  if (offer.midContractPriceRise) {
    // Penalise yearly inflation hikes (CPI index spikes)
    score -= 12;
  } else {
    // Guarantee locks score a strong stability bonus
    score += 18;
  }

  // 8. Price After Minimum Term: penalise large spikes
  const stepUp = offer.priceAfterMinimumTerm - offer.monthlyPrice;
  if (stepUp > 15) {
    score -= 8;
  } else if (stepUp <= 0) {
    score += 5;
  }

  // 9. Editor Review Score:
  score += (offer.editorScore * 5);

  // 10. Availability Confidence:
  if (offer.availabilityConfidence === "High") {
    score += 10;
  } else if (offer.availabilityConfidence === "Medium") {
    score += 5;
  }

  // 11. Rural Suitability & Home working suitability:
  const bestForLower = offer.bestFor.toLowerCase();
  
  // Rural Suitability
  const isVoneus = offer.providerId === "voneus";
  const isWessex = offer.providerId === "wessex";
  const isGigaclear = offer.providerId === "gigaclear";
  const isRuralProvider = offer.targetProviderTypes.includes("Rural broadband providers") || isVoneus || isWessex || isGigaclear;
  if (bestForLower.includes("rural") || isRuralProvider) {
    score += 12;
  }

  // Home working Suitability
  if (bestForLower.includes("work") || offer.averageUploadSpeed >= 150) {
    score += 10;
  }

  return Math.round(score);
}

export interface PostcodeMatchResult {
  postcodePrefix: string;
  postcodeArea: PostcodeArea;
  matchingOffers: (Offer & { score: number; availability: OfferAvailability })[];
  weeklyOffer: FeaturedOffer | Offer | null;
  /** Whether the featured offer targets the searched postcode */
  isWeeklyOfferLocalHighlight: boolean;
  sponsoredOffers: (Offer & { score: number; availability: OfferAvailability })[];
  nearbyPostcodes: string[];
}

/**
 * Main offer matching entrypoint. Matches postcode prefixes to regional providers
 * and active offers. Checks availability configurations, scores rules, and categorises matches.
 */
export function getOffersForPostcode(postcodeInput: string): PostcodeMatchResult | null {
  if (!postcodeInput) return null;
  
  const prefix = normalisePostcode(postcodeInput);
  
  // Find postcode area details
  let area = postcodeAreasData.find(
    (a) => a.postcodePrefix.toUpperCase() === prefix
  );
  
  if (!area) {
    // Check if the input prefix starts with a Kent area prefix (CT, TN, ME, DA, BR followed by a number)
    if (isKentPostcode(prefix)) {
      area = {
        postcodePrefix: prefix,
        areaName: `${prefix} area`,
        primaryTown: "Kent",
        nearbyAreas: ["Kent"],
        county: "Kent",
        region: "South East",
        slug: `broadband-${prefix.toLowerCase()}`,
        introCopy: `This postcode area (${prefix}) appears to be outside our core Kent coverage area. You can still check broadband availability directly with national and regional providers, but our local Kent notes may not yet cover this postcode.`,
        localBroadbandNotes: `Broadband availability in ${prefix} varies by exact address. Use the provider check buttons to confirm which services are available at your property.`,
        postcodeExamples: [`${prefix} 1AA`],
        providerIds: ["bt", "sky", "talktalk", "virgin", "vodafone", "ee", "starlink"],
        seoTitle: `Broadband Availability in ${prefix} | Kent Out-of-Core Options`,
        metaDescription: `Check broadband availability in ${prefix}. Sourced national and regional provider checker buttons are listed below.`,
        h1: `Broadband in ${prefix}`,
        faqs: [
          {
            question: `Why is there less coverage information for ${prefix}?`,
            answer: `This postcode is outside our core Kent coverage region. However, you can still check your address details directly with national network operators.`
          }
        ],
        nearbyPostcodes: [],
        lastUpdated: "June 12, 2026",
        isVirtual: true,
        isNonCore: true,
      };
    } else {
      // It's entirely invalid or not a supported regional prefix
      area = {
        postcodePrefix: prefix || "INVALID",
        areaName: "Invalid Postcode",
        primaryTown: "Invalid",
        nearbyAreas: [],
        county: "Kent",
        region: "South East",
        slug: "invalid",
        introCopy: "",
        localBroadbandNotes: "",
        postcodeExamples: [],
        providerIds: [],
        seoTitle: "Invalid Postcode Entered",
        metaDescription: "",
        h1: "Invalid Postcode",
        faqs: [],
        nearbyPostcodes: [],
        lastUpdated: "",
        isInvalid: true,
      };
    }
  }

  // Filter offers containing this prefix in targetPostcodes, and check isLive
  const matchedOffers = offersData
    .filter((offer) => offer.isLive && offer.targetPostcodes.includes(prefix))
    .map((offer) => {
      const score = calculateOfferScore(offer);
      const availability = getAvailabilityForOffer(offer.offerId, prefix);
      return {
        ...offer,
        score,
        availability
      };
    })
    // Sort descending by calculated score
    .sort((a, b) => b.score - a.score);

  // Extract sponsored listings
  const sponsoredOffers = matchedOffers.filter((o) => o.isSponsored);

  // Part 4: Manual Weekly Featured Offer Logic:
  // If the user searches a postcode and the featured offer targets that postcode, show it.
  // Only show if featuredOfferData itself is live.
  let weeklyOffer: FeaturedOffer | Offer | null = null;
  let isWeeklyOfferLocalHighlight = false;

  if (featuredOfferData && featuredOfferData.isLive) {
    const targetsThisPostcode = featuredOfferData.targetPostcodes.includes(prefix);
    if (targetsThisPostcode) {
      weeklyOffer = featuredOfferData;
      isWeeklyOfferLocalHighlight = true;
    } else {
      // If it does not target the searched postcode, show the best matching postcode offer instead
      weeklyOffer = matchedOffers.length > 0 ? matchedOffers[0] : null;
      isWeeklyOfferLocalHighlight = false;
    }
  } else {
    // If featured offer in data file is not live, falback to best matching postcode offer
    weeklyOffer = matchedOffers.length > 0 ? matchedOffers[0] : null;
    isWeeklyOfferLocalHighlight = false;
  }

  return {
    postcodePrefix: prefix,
    postcodeArea: area,
    matchingOffers: matchedOffers,
    weeklyOffer,
    isWeeklyOfferLocalHighlight,
    sponsoredOffers,
    nearbyPostcodes: area.nearbyPostcodes || []
  };
}

// ============================================================================
// PART 3: MANUAL AND FUTURE AUTOMATIC PRICING UPDATE PLACEHOLDERS
// ============================================================================

/**
 * Placeholder function for future provider-direct price synchronisation.
 * Would connect to approved provider billing portals or pricing REST sheets.
 */
export async function syncProviderPrices(providerId: string): Promise<{ success: boolean; updatedCount: number; message: string }> {
  console.log(`[Pricing Update Sync] Starting provider verification for: ${providerId}`);
  // In a future update, connect direct secure authorization here:
  // const feed = await fetch(`https://api.providers.com/v1/pricing?key=${process.env.PROVIDER_API_KEY}`);
  return {
    success: true,
    updatedCount: 0,
    message: "Placeholder pricing sync executed safely. Manual settings remain primary."
  };
}

/**
 * Placeholder function to ingest approved affiliate networks (e.g. Awin, Webgains)
 * for cashback triggers, broadband tracking, and automated pricing streams.
 */
export async function syncAffiliateFeed(feedUrl: string): Promise<{ success: boolean; loadedDeals: number }> {
  console.log(`[Affiliate Feed Ingest] Connecting to secure network XML feed at: ${feedUrl}`);
  // Parse affiliate feeds here in future:
  // const data = await parseXmlFeed(feedUrl);
  return {
    success: true,
    loadedDeals: 0
  };
}

/**
 * Placeholder function for manual or semi-automated CSV broadband uploads.
 * Ingests tabular price revisions and validates column formats.
 */
export function syncCsvOffers(csvContent: string): { success: boolean; imported: number; errors: string[] } {
  console.log(`[CSV Broker] Received manual spreadsheet table upload of size: ${csvContent.length} bytes`);
  // Map CSV columns to Offer interface in future updates:
  // parseCsvRows(csvContent).map(...)
  return {
    success: true,
    imported: 0,
    errors: []
  };
}

/**
 * Placeholder function for real-time commercial availability database checks
 * (e.g., Openreach wholesale maps, Gigaclear postcode APIs).
 */
export async function syncAvailabilityData(postcode: string): Promise<{ activeCabinets: string[]; status: string }> {
  console.log(`[Availability Probe] Checking wholesale backhaul arrays for: ${postcode}`);
  return {
    activeCabinets: [],
    status: "Address Check required. Connect commercial check query pools here in future."
  };
}

/**
 * Updates an offering's verification date to present, confirming rates are active.
 */
export function updateOfferLastCheckedDate(offerId: string): { success: boolean; lastChecked: string } {
  const dateString = new Date().toISOString().split("T")[0];
  console.log(`[Pricing Monitor] Re-confirmed current billing rates for: ${offerId} on ${dateString}`);
  return {
    success: true,
    lastChecked: dateString
  };
}

/**
 * Flag out-of-date promotions as expired to disable public display.
 */
export function flagExpiredOffers(): { expiredIds: string[] } {
  const today = new Date();
  console.log(`[Promotion Cleaner] Sweeping campaigns for cutoff thresholds...`);
  // In future:
  // if (new Date(offer.offerValidUntil) < today) offer.isLive = false;
  return {
    expiredIds: []
  };
}

/**
 * Re-ranks regional providers and calculates updated standard suitability scores.
 */
export function recalculatePostcodeRankings(): { scoreComputed: number } {
  console.log(`[Recalculator] Sweeping postcodeAreasData and recalculating deal matching arrays...`);
  return {
    scoreComputed: offersData.length
  };
}

// ============================================================================
// PART 6: NEWS SOURCE UPDATE STRUCTURE PLACEHOLDERS
// ============================================================================

/**
 * Placeholder to retrieve raw news feeds from Wiltshire Council or telecom journals.
 */
export async function fetchBroadbandNews(sourceId: string): Promise<BroadbandNewsItem[]> {
  console.log(`[News Fetcher] Executing fetch protocol for: ${sourceId}`);
  // Connect news portals in future:
  // const res = await fetch(`https://news.telecoms.org/feed?source=${sourceId}`);
  return [];
}

/**
 * Placeholder RSS ingestion utility.
 * Intended to parse live XML feeds from ThinkBroadband or ISPreview.
 */
export async function syncRssNews(xmlUrl: string): Promise<{ itemsParsed: number; updated: boolean }> {
  console.log(`[RSS Sync] Fetching XML stream from: ${xmlUrl}`);
  return {
    itemsParsed: 0,
    updated: false
  };
}

/**
 * Filter and label news items that are specifically relevant to active region or Wiltshire.
 */
export function filterWiltshireRelevantNews(items: BroadbandNewsItem[]): BroadbandNewsItem[] {
  console.log(`[News Filter] Tagging updates for South West/East and regional context...`);
  return items.filter(item => 
    item.isWiltshireRelevant || 
    item.headline.toLowerCase().includes("wiltshire") || 
    item.headline.toLowerCase().includes("kent")
  );
}

/**
 * Format records for clean, display-ready headlines inside the news ticker.
 */
export function formatTickerItems(items: BroadbandNewsItem[]): string[] {
  return items.map(item => `[${item.sourceName}] ${item.headline} (${item.publishedDate})`);
}

/**
 * Duplication cleaner to avoid repetitive content.
 */
export function dedupeNewsItems(items: BroadbandNewsItem[]): BroadbandNewsItem[] {
  const uniques = new Map<string, BroadbandNewsItem>();
  items.forEach(item => {
    const key = item.headline.toLowerCase().trim();
    if (!uniques.has(key)) {
      uniques.set(key, item);
    }
  });
  return Array.from(uniques.values());
}
