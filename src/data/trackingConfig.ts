/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import siteConfig from "../config/siteConfig";
import { getProviderLink } from "./providerLinks";

export interface TrackingParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
}

/**
 * Builds a URL with complete UTM tracking parameters following regional rules.
 */
export function buildTrackedUrl(
  baseUrl: string | undefined,
  contentType: "provider_card" | "offer_card" | "comparison_source" | "weekly_offer_watch" | "postcode_page" | "default" | "weekly" | "postcode" = "default",
  customParams: Partial<TrackingParams> = {}
): string {
  // If no URL exists, we shouldn't use an empty URL or #.
  if (!baseUrl || baseUrl === "" || baseUrl === "#" || baseUrl.startsWith("#")) {
    return "";
  }

  const regionSlug = (siteConfig.regionSlug || "kent").toLowerCase();
  const sourceName = regionSlug === "wiltshire" ? "wiltshirebroadbandfinder" : "kentbroadbandfinder";
  const mediumName = "outbound";
  const campaignName = regionSlug;

  const defaultContentMap = {
    provider_card: "provider_card",
    offer_card: "offer_card",
    comparison_source: "comparison_source",
    weekly_offer_watch: "weekly_offer_watch",
    weekly: "weekly_offer_watch",
    postcode_page: "postcode_matches",
    postcode: "postcode_matches",
    default: "provider_card"
  };

  try {
    const urlObj = new URL(baseUrl.startsWith("http") ? baseUrl : `https://${baseUrl}`);
    
    // Resolve postcode prefix or "general"
    let contentVal = "general";
    if (customParams.utm_content) {
      contentVal = customParams.utm_content;
    } else if (customParams.utm_term && customParams.utm_term !== "postcode_or_area" && customParams.utm_term !== "homepage_featured" && customParams.utm_term !== "news_ticker_static" && customParams.utm_term !== "directory_view") {
      contentVal = customParams.utm_term;
    }

    const defaults: TrackingParams = {
      utm_source: sourceName,
      utm_medium: mediumName,
      utm_campaign: campaignName,
      utm_content: contentVal.toUpperCase(),
      utm_term: customParams.utm_term || "postcode_or_area",
    };

    const finalParams = {
      ...defaults,
      ...customParams,
    };

    Object.entries(finalParams).forEach(([key, value]) => {
      if (value) {
        urlObj.searchParams.set(key, value);
      }
    });

    return urlObj.toString();
  } catch (e) {
    // Fallback if URL parsing fails
    const cleanedUrl = baseUrl;
    const separator = cleanedUrl.includes("?") ? "&" : "?";
    
    let contentVal = "general";
    if (customParams.utm_content) {
      contentVal = customParams.utm_content;
    } else if (customParams.utm_term && customParams.utm_term !== "postcode_or_area" && customParams.utm_term !== "homepage_featured" && customParams.utm_term !== "news_ticker_static" && customParams.utm_term !== "directory_view") {
      contentVal = customParams.utm_term;
    }

    const utmSourceObj = sourceName;
    const utmMediumObj = mediumName;
    const utmCampaignObj = campaignName;
    const utmContentObj = contentVal.toUpperCase();
    const utmTermObj = customParams.utm_term || "postcode_or_area";

    return `${cleanedUrl}${separator}utm_source=${encodeURIComponent(utmSourceObj)}&utm_medium=${encodeURIComponent(utmMediumObj)}&utm_campaign=${encodeURIComponent(utmCampaignObj)}&utm_content=${encodeURIComponent(utmContentObj)}&utm_term=${encodeURIComponent(utmTermObj)}`;
  }
}

/**
 * Resolves a reliable working CTA URL for any provider/offer
 */
export function getProviderCtaUrl(
  providerId: string,
  offer?: any,
  regionSlug?: string,
  postcodeArea?: string
): string {
  let targetUrl = "";

  // 1. If offer.sourceUrl exists, use that.
  if (offer && offer.sourceUrl) {
    targetUrl = offer.sourceUrl;
  } else {
    // 2. Else if provider availabilityCheckerUrl exists, use that.
    // 3. Else if provider broadbandDealsUrl exists, use that.
    // 4. Else if provider officialWebsite exists, use that.
    const pLink = getProviderLink(providerId);
    if (pLink) {
      if (pLink.availabilityCheckerUrl) {
        targetUrl = pLink.availabilityCheckerUrl;
      } else if (pLink.broadbandDealsUrl) {
        targetUrl = pLink.broadbandDealsUrl;
      } else if (pLink.officialWebsite) {
        targetUrl = pLink.officialWebsite;
      }
    }
  }

  // 5. Fallback - we do not link to the contact form for provider queries anymore.
  if (!targetUrl || targetUrl === "" || targetUrl === "#") {
    return "";
  }

  // Part 5 Content mapping
  let contentType: "provider_card" | "offer_card" | "comparison_source" | "weekly_offer_watch" | "postcode_page" | "default" | "weekly" | "postcode" = "default";
  
  if (offer) {
    if (offer.isWeeklyFeatured || offer.isWeeklyOffer) {
      contentType = "weekly_offer_watch";
    } else {
      contentType = "offer_card";
    }
  } else {
    contentType = "provider_card";
  }

  const utmTerm = postcodeArea ? postcodeArea.toLowerCase().replace(/\s+/g, "") : "postcode_or_area";

  return buildTrackedUrl(targetUrl, contentType, {
    utm_term: utmTerm
  });
}

/**
 * Determines public friendly CTA copy for the buttons, adhering strictly to public copywriting guidelines.
 */
export function getProviderCtaLabel(providerId: string, offer?: any): string {
  const ctaUrl = getProviderCtaUrl(providerId, offer);
  if (!ctaUrl) {
    return "Provider link being reviewed";
  }

  // If availability is address_check_required, label is standard
  const availability = offer?.availability || offer?.availabilityStatus;
  const isAddressCheck = availability === "address_check_required" || 
                         availability === "Address check required" || 
                         offer?.requiresAddressCheck === true || 
                         (offer?.notes?.toLowerCase().includes("address_check_required"));

  if (isAddressCheck) {
    return "Check address availability";
  }

  const pLink = getProviderLink(providerId);

  // If provider availabilityCheckerUrl exists, primary button should be: Check availability
  if (pLink?.availabilityCheckerUrl) {
    return "Check availability";
  }

  // If provider broadbandDealsUrl exists, secondary button should be: View provider packages
  if (pLink?.broadbandDealsUrl) {
    return "View provider packages";
  }

  // If only officialWebsite exists, button should be: Visit provider
  if (pLink?.officialWebsite) {
    return "Visit provider";
  }

  // If source is a comparison source
  const isComparison = offer?.sourceType === "comparison" || 
                       (offer?.sourceName && ["uswitch", "compare", "genie", "market", "expert", "which", "thinkbroadband", "ispreview", "ofcom"].some(name => offer.sourceName.toLowerCase().includes(name)));
  if (isComparison) {
    return "Compare broadband deals";
  }

  return "Visit provider";
}
