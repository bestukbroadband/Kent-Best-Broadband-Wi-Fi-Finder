/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

// Regional configuration definitions
export const regions = {
  wiltshire: {
    siteName: "Wiltshire Broadband Finder",
    shortName: "Wiltshire Broadband",
    regionName: "Wiltshire",
    regionSlug: "wiltshire",
    countyOrRegion: "Wiltshire",
    homepageTitle: "Find local broadband options for Wiltshire villages and towns",
    homepageSubtitle: "Compare full fibre networks, alternative networks, 5G home broadband, wireless and national providers across Wiltshire. Search your town, village or postcode area and request an address-level check.",
    seoTitle: "Best Broadband for Wiltshire Villages and Towns | Wiltshire Broadband Finder",
    seoDescription: "Find and compare the best broadband deals in rural Wiltshire. Compare alternative networks (altnets) and mainstream providers with transparent coverage checks.",
    primaryKeywords: "Wiltshire rural broadband finder",
    secondaryKeywords: ["wiltshire broadband core", "rural telecom solutions", "village fibre voucher"],
    contactEmail: "bestukbroadband@proton.me", // updated email
    utmSource: "wiltshire_broadband_finder",
    utmCampaign: "wiltshire-launch",
    githubPagesBasePath: "/best-broadband-wiltshire/",
    logoPath: "/favicon.svg",
    faviconPath: "/favicon.svg",
    appIconPath: "/icons/wbbw-app-icon.png",
    ogImagePath: "/icons/og-image.png",
    nearbyRegions: ["Somerset", "Gloucestershire", "Dorset", "Hampshire", "Berkshire"],
    providerRelevance: {
      wessex: "regionally_relevant",
      openreach: "openreach_serving",
      bt: "openreach_serving",
      toob: "limited_chippenham"
    },
    footerProjectName: "Wiltshire Broadband Finder"
  },
  kent: {
    siteName: "Best Broadband in Kent",
    shortName: "Kent Broadband Finder",
    regionName: "Kent",
    regionSlug: "kent",
    countyOrRegion: "Kent",
    baseUrl: "https://bestukbroadband.github.io/best-broadband-kent/",
    githubPagesBasePath: "/best-broadband-kent/",
    contactEmail: "bestbroadbandinyourtown@gmail.com",
    defaultUtmSource: "site_referral",
    defaultUtmMedium: "referral",
    defaultUtmCampaign: "kent_broadband_listing",
    weeklyOfferCampaign: "kent_weekly_offer",
    postcodeCampaign: "kent_postcode_page",
    comparisonSourceCampaign: "kent_comparison_source_reference",
    offerCampaign: "kent_tracked_broadband_offer",
    logoPath: "/best-broadband-kent/icons/kent-broadband-logo.png",
    faviconPath: "/best-broadband-kent/icons/favicon-32.png",
    appIconPath: "/best-broadband-kent/icons/android-chrome-512.png",
    ogImagePath: "/best-broadband-kent/og/kent-broadband-og.png",
    homepageTitle: "Find local broadband options for Kent villages and towns",
    homepageSubtitle: "Compare full fibre networks, alternative networks, 5G home broadband, wireless and national providers across Kent. Search your town, village or postcode area and request an address-level check.",
    seoTitle: "Best Broadband for Kent Villages and Towns | Kent Broadband Finder",
    seoDescription: "Compare listed broadband, WiFi and internet provider options across Kent towns, villages and postcode areas. Check tracked offers, provider notes and address level availability before ordering.",
    primaryKeywords: "Kent rural broadband finder",
    secondaryKeywords: ["kent broadband core", "rural telecom solutions", "village fibre voucher"],
    nearbyRegions: ["Sussex", "Surrey", "London", "Essex"],
    providerRelevance: {
      wessex: "not_relevant",
      openreach: "openreach_serving",
      bt: "openreach_serving",
      toob: "not_relevant"
    },
    footerProjectName: "Kent Broadband Finder"
  }
};

export default regions;
