/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { FeaturedOffer } from "../types";
import { activeRegionKey } from "../config/siteConfig";

const rawFeaturedOfferData: FeaturedOffer = {
  offerId: "offer-zzoomm-500",
  weekCommencing: "2026-06-08",
  providerName: "Zzoomm",
  providerType: "Alternative network providers",
  packageName: "Homebi 500",
  headline: "Tracked Wiltshire Symmetrical 500Mbps Special",
  shortDescription: "Symmetrical super-fast speeds with a complete price freeze and zero setup fees for Calne and Melksham.",
  monthlyPrice: 27.95,
  contractLength: 12,
  averageDownloadSpeed: 500,
  averageUploadSpeed: 500,
  setupFee: 0,
  installationFee: 0,
  routerIncluded: true,
  knownPriceRise: "£0.00 (Fixed price for the standard duration of the contract)",
  priceAfterContract: 39.95,
  offerValidUntil: "2026-12-31",
  targetPostcodes: ["SN11", "SN12"],
  targetTowns: ["Calne", "Melksham"],
  editorScore: 9.2,
  editorVerdict: "Exceptional short contract speed offering with unmatched upload performance and a complete CPI price rise immunity.",
  editorNotes: "Zzoomm runs its network straight into Calne and Melksham properties. This is a top-performing listed campaign with no activation fees.",
  thingsToCheck: [
    "Verify pink street markings to ensure fibre is active on your specific street sector",
    "Does not include commercial copper backup or analogue landline service"
  ],
  bestFor: "Symmetrical full-fibre performance & fixed-price protection",
  sponsoredStatus: "sponsored",
  sponsorLabel: "Featured Weekly Offer",
  ctaLabel: "Check Zzoomm",
  baseUrl: "https://zzoomm.com/",
  utmSource: "wiltshire_broadband_finder",
  utmMedium: "referral",
  utmCampaign: "weekly_offer",
  utmContent: "weekly_highlight_card",
  utmTerm: "sn11_calne",
  lastReviewedDate: "2026-06-08",
  isLive: false // Deactivated on safety audit until fully verified pricing and coverage sources are established
};

export const featuredOfferData: FeaturedOffer = {
  ...rawFeaturedOfferData,
  headline: activeRegionKey === "kent"
    ? "Tracked Kent Symmetrical 500Mbps Special"
    : rawFeaturedOfferData.headline,
  shortDescription: activeRegionKey === "kent"
    ? "Symmetrical super-fast speeds with a complete price freeze and zero setup fees for Dartford and Sevenoaks."
    : rawFeaturedOfferData.shortDescription,
  targetPostcodes: activeRegionKey === "kent" ? ["DA1", "TN13"] : rawFeaturedOfferData.targetPostcodes,
  targetTowns: activeRegionKey === "kent" ? ["Dartford", "Sevenoaks"] : rawFeaturedOfferData.targetTowns,
  editorNotes: activeRegionKey === "kent"
    ? "Zzoomm is checked straight into Dartford and Sevenoaks properties. This is a top-performing listed campaign with no activation fees."
    : rawFeaturedOfferData.editorNotes,
  utmSource: activeRegionKey === "kent" ? "kent_broadband_finder" : "wiltshire_broadband_finder",
  utmTerm: activeRegionKey === "kent" ? "da1_dartford" : rawFeaturedOfferData.utmTerm
};
