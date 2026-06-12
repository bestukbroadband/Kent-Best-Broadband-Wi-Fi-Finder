/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import siteConfig, { activeRegionKey } from "../config/siteConfig";

export interface SEOInternalLink {
  label: string;
  targetId: string; // The activeTab page ID, postcode prefix, town ID, or provider category
  type: "seo-page" | "postcode" | "town" | "provider" | "broadband-type" | "guide";
  url: string;      // Simulated URL path for search indexing
}

const baseDomain = siteConfig.regionSlug === "wiltshire"
  ? "https://www.wiltshirebroadbandfinder.co.uk"
  : "https://www.kentbroadbandfinder.co.uk";

// 1. Main SEO Pages Group
export const mainSeoPages: SEOInternalLink[] = [
  {
    label: `Best broadband in ${siteConfig.regionName}`,
    targetId: `best-broadband-${siteConfig.regionSlug}`,
    type: "seo-page",
    url: `${baseDomain}/guide/best-broadband-in-${siteConfig.regionSlug}`
  },
  {
    label: `Best WiFi in ${siteConfig.regionName}`,
    targetId: `best-wifi-${siteConfig.regionSlug}`,
    type: "seo-page",
    url: `${baseDomain}/guide/best-wifi-in-${siteConfig.regionSlug}`
  },
  {
    label: `Best internet provider in ${siteConfig.regionName}`,
    targetId: `best-internet-provider-${siteConfig.regionSlug}`,
    type: "seo-page",
    url: `${baseDomain}/guide/best-internet-provider-in-${siteConfig.regionSlug}`
  }
];

// 2. Postcode Pages Group
export const postcodePages: SEOInternalLink[] = activeRegionKey === "kent" ? [
  {
    label: "Broadband in CT1",
    targetId: "CT1",
    type: "postcode",
    url: `${baseDomain}/broadband/ct1_canterbury_central`
  },
  {
    label: "Broadband in TN1",
    targetId: "TN1",
    type: "postcode",
    url: `${baseDomain}/broadband/tn1_tunbridge_wells_central`
  },
  {
    label: "Broadband in ME14",
    targetId: "ME14",
    type: "postcode",
    url: `${baseDomain}/broadband/me14_maidstone_central`
  }
] : [
  {
    label: "Broadband in SN10",
    targetId: "SN10",
    type: "postcode",
    url: `${baseDomain}/broadband/sn10_devizes`
  },
  {
    label: "Broadband in BA14",
    targetId: "BA14",
    type: "postcode",
    url: `${baseDomain}/broadband/ba14_trowbridge_midsomer`
  },
  {
    label: "Broadband in SP1",
    targetId: "SP1",
    type: "postcode",
    url: `${baseDomain}/broadband/sp1_salisbury_center`
  }
];

// 3. Town Pages Group
export const townPages: SEOInternalLink[] = activeRegionKey === "kent" ? [
  {
    label: "Broadband in Tunbridge Wells",
    targetId: "tunbridgewells",
    type: "town",
    url: `${baseDomain}/town/tunbridgewells`
  },
  {
    label: "Broadband in Canterbury",
    targetId: "canterbury",
    type: "town",
    url: `${baseDomain}/town/canterbury`
  },
  {
    label: "Broadband in Maidstone",
    targetId: "maidstone",
    type: "town",
    url: `${baseDomain}/town/maidstone`
  },
  {
    label: "Broadband in Ashford",
    targetId: "ashford",
    type: "town",
    url: `${baseDomain}/town/ashford`
  },
  {
    label: "Broadband in Sevenoaks",
    targetId: "sevenoaks",
    type: "town",
    url: `${baseDomain}/town/sevenoaks`
  }
] : [
  {
    label: "Broadband in Devizes",
    targetId: "devizes",
    type: "town",
    url: `${baseDomain}/town/devizes`
  },
  {
    label: "Broadband in Trowbridge",
    targetId: "trowbridge",
    type: "town",
    url: `${baseDomain}/town/trowbridge`
  },
  {
    label: "Broadband in Salisbury",
    targetId: "salisbury",
    type: "town",
    url: `${baseDomain}/town/salisbury`
  },
  {
    label: "Broadband in Chippenham",
    targetId: "chippenham",
    type: "town",
    url: `${baseDomain}/town/chippenham`
  },
  {
    label: "Broadband in Marlborough",
    targetId: "marlborough",
    type: "town",
    url: `${baseDomain}/town/marlborough`
  }
];

// 4. Provider Guides/Pages Group
export const providerPages: SEOInternalLink[] = activeRegionKey === "kent" ? [
  {
    label: `Trooli Broadband ${siteConfig.regionName}`,
    targetId: "alt-net",
    type: "provider",
    url: `${baseDomain}/providers#trooli`
  },
  {
    label: `Vfast Broadband ${siteConfig.regionName}`,
    targetId: "alt-net",
    type: "provider",
    url: `${baseDomain}/providers#vfast`
  },
  {
    label: `Starlink Broadband ${siteConfig.regionName}`,
    targetId: "alt-net",
    type: "provider",
    url: `${baseDomain}/providers#starlink`
  }
] : [
  {
    label: "Trooli Broadband Wiltshire",
    targetId: "alt-net",
    type: "provider",
    url: `${baseDomain}/providers#trooli`
  },
  {
    label: "Wessex Internet Wiltshire",
    targetId: "alt-net",
    type: "provider",
    url: `${baseDomain}/providers#wessex`
  },
  {
    label: "Gigaclear Broadband Wiltshire",
    targetId: "alt-net",
    type: "provider",
    url: `${baseDomain}/providers#gigaclear`
  },
  {
    label: "Truespeed Broadband Wiltshire",
    targetId: "alt-net",
    type: "provider",
    url: `${baseDomain}/providers#truespeed`
  }
];

// 5. Broadband Type Pages Group
export const broadbandTypePages: SEOInternalLink[] = [
  {
    label: `Rural broadband in ${siteConfig.regionName}`,
    targetId: `best-rural-broadband-${siteConfig.regionSlug}`,
    type: "broadband-type",
    url: `${baseDomain}/guide/best-rural-broadband-in-${siteConfig.regionSlug}`
  },
  {
    label: `Full fibre broadband in ${siteConfig.regionName}`,
    targetId: `full-fibre-broadband-${siteConfig.regionSlug}`,
    type: "broadband-type",
    url: `${baseDomain}/guide/full-fibre-broadband-${siteConfig.regionSlug}`
  },
  {
    label: `Alternative network broadband in ${siteConfig.regionName}`,
    targetId: `alternative-network-broadband-${siteConfig.regionSlug}`,
    type: "broadband-type",
    url: `${baseDomain}/guide/alternative-network-broadband-${siteConfig.regionSlug}`
  }
];

// 6. Guide Pages Group
export const guidePages: SEOInternalLink[] = [
  {
    label: "Rural Villages and Towns Guide",
    targetId: "best-rural-broadband-villages-towns",
    type: "guide",
    url: `${baseDomain}/guide/best-broadband-for-rural-${siteConfig.regionSlug}-villages-and-towns`
  },
  {
    label: `${siteConfig.regionName} Broadband Deals`,
    targetId: `broadband-deals-${siteConfig.regionSlug}`,
    type: "guide",
    url: `${baseDomain}/guide/broadband-deals-${siteConfig.regionSlug}`
  },
  {
    label: `Broadband Providers ${siteConfig.regionName}`,
    targetId: `broadband-providers-${siteConfig.regionSlug}`,
    type: "guide",
    url: `${baseDomain}/guide/broadband-providers-${siteConfig.regionSlug}`
  }
];
