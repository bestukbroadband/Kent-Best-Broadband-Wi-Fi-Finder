/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ProviderLink {
  providerId: string;
  providerName: string;
  officialWebsite: string;
  availabilityCheckerUrl: string;
  broadbandDealsUrl?: string;
  customerSupportUrl?: string;
  sourceType?: string;
  defaultCtaLabel?: string;
  notes?: string;
  isActive: boolean;
}

export const providerLinksData: ProviderLink[] = [
  {
    providerId: "zzoomm",
    providerName: "Zzoomm",
    officialWebsite: "https://zzoomm.com/",
    availabilityCheckerUrl: "https://zzoomm.com/buy/check",
    broadbandDealsUrl: "https://zzoomm.com/full-fibre-broadband-in-my-area",
    isActive: true
  },
  {
    providerId: "airband",
    providerName: "Airband",
    officialWebsite: "https://www.airband.co.uk/",
    availabilityCheckerUrl: "https://www.airband.co.uk/check-availability/",
    isActive: true
  },
  {
    providerId: "trooli",
    providerName: "Trooli",
    officialWebsite: "https://www.trooli.com/",
    availabilityCheckerUrl: "https://www.trooli.com/check-availability/",
    isActive: true
  },
  {
    providerId: "wessex",
    providerName: "Wessex Internet",
    officialWebsite: "https://www.wessexinternet.com/",
    availabilityCheckerUrl: "https://www.wessexinternet.com/check-availability/",
    broadbandDealsUrl: "https://www.wessexinternet.com/wiltshire-broadband/",
    isActive: true
  },
  {
    providerId: "truespeed",
    providerName: "Truespeed",
    officialWebsite: "https://www.truespeed.com/",
    availabilityCheckerUrl: "https://www.truespeed.com/check-availability/",
    isActive: true
  },
  {
    providerId: "gigaclear",
    providerName: "Gigaclear",
    officialWebsite: "https://www.gigaclear.com/",
    availabilityCheckerUrl: "https://www.gigaclear.com/check-availability/",
    isActive: true
  },
  {
    providerId: "voneus",
    providerName: "Voneus",
    officialWebsite: "https://www.voneus.com/",
    availabilityCheckerUrl: "https://www.voneus.com/check-availability/",
    isActive: true
  },
  {
    providerId: "openreach",
    providerName: "Openreach",
    officialWebsite: "https://www.openreach.com/",
    availabilityCheckerUrl: "https://www.openreach.com/fibre-checker",
    isActive: true
  },
  {
    providerId: "ofcom",
    providerName: "Ofcom",
    officialWebsite: "https://www.ofcom.org.uk/",
    availabilityCheckerUrl: "https://checker.ofcom.org.uk/en-gb/broadband-coverage",
    isActive: true
  },
  {
    providerId: "bt",
    providerName: "BT",
    officialWebsite: "https://www.bt.com/",
    availabilityCheckerUrl: "https://www.bt.com/broadband",
    isActive: true
  },
  {
    providerId: "ee",
    providerName: "EE",
    officialWebsite: "https://ee.co.uk/",
    availabilityCheckerUrl: "https://ee.co.uk/broadband",
    isActive: true
  },
  {
    providerId: "ee5g",
    providerName: "EE 5G",
    officialWebsite: "https://ee.co.uk/",
    availabilityCheckerUrl: "https://ee.co.uk/broadband",
    isActive: true
  },
  {
    providerId: "sky",
    providerName: "Sky",
    officialWebsite: "https://www.sky.com/",
    availabilityCheckerUrl: "https://www.sky.com/broadband",
    isActive: true
  },
  {
    providerId: "now",
    providerName: "NOW Broadband",
    officialWebsite: "https://www.nowtv.com/",
    availabilityCheckerUrl: "https://www.nowtv.com/broadband",
    isActive: true
  },
  {
    providerId: "talktalk",
    providerName: "TalkTalk",
    officialWebsite: "https://www.talktalk.co.uk/",
    availabilityCheckerUrl: "https://www.talktalk.co.uk/broadband",
    isActive: true
  },
  {
    providerId: "vodafone",
    providerName: "Vodafone",
    officialWebsite: "https://www.vodafone.co.uk/",
    availabilityCheckerUrl: "https://www.vodafone.co.uk/broadband",
    isActive: true
  },
  {
    providerId: "vodafone5g",
    providerName: "Vodafone 5G",
    officialWebsite: "https://www.vodafone.co.uk/",
    availabilityCheckerUrl: "https://www.vodafone.co.uk/broadband",
    isActive: true
  },
  {
    providerId: "plusnet",
    providerName: "Plusnet",
    officialWebsite: "https://www.plus.net/",
    availabilityCheckerUrl: "https://www.plus.net/broadband/",
    isActive: true
  },
  {
    providerId: "zen",
    providerName: "Zen Internet",
    officialWebsite: "https://www.zen.co.uk/",
    availabilityCheckerUrl: "https://www.zen.co.uk/broadband",
    isActive: true
  },
  {
    providerId: "virgin",
    providerName: "Virgin Media",
    officialWebsite: "https://www.virginmedia.com/",
    availabilityCheckerUrl: "https://www.virginmedia.com/broadband",
    isActive: true
  },
  {
    providerId: "three5g",
    providerName: "Three Broadband",
    officialWebsite: "https://www.three.co.uk/",
    availabilityCheckerUrl: "https://www.three.co.uk/broadband",
    isActive: true
  },
  {
    providerId: "hyperoptic",
    providerName: "Hyperoptic",
    officialWebsite: "https://www.hyperoptic.com/",
    availabilityCheckerUrl: "https://www.hyperoptic.com/broadband/",
    isActive: true
  },
  {
    providerId: "community",
    providerName: "Community Fibre",
    officialWebsite: "https://communityfibre.co.uk/",
    availabilityCheckerUrl: "https://communityfibre.co.uk/",
    isActive: true
  },
  {
    providerId: "toob",
    providerName: "toob",
    officialWebsite: "https://www.toob.co.uk/",
    availabilityCheckerUrl: "https://www.toob.co.uk/check-availability/",
    broadbandDealsUrl: "https://www.toob.co.uk/locations/chippenham/",
    isActive: true
  },
  {
    providerId: "youfibre",
    providerName: "YouFibre",
    officialWebsite: "https://www.youfibre.com/",
    availabilityCheckerUrl: "https://www.youfibre.com/check-availability/",
    isActive: true
  },
  {
    providerId: "brsk",
    providerName: "Brsk",
    officialWebsite: "https://www.brsk.co.uk/",
    availabilityCheckerUrl: "https://www.brsk.co.uk/check-availability",
    isActive: true
  },
  {
    providerId: "starlink",
    providerName: "Starlink",
    officialWebsite: "https://www.starlink.com/",
    availabilityCheckerUrl: "https://www.starlink.com/residential",
    isActive: true
  },
  {
    providerId: "allpoints",
    providerName: "AllPoints Fibre",
    officialWebsite: "https://www.allpointsfibre.com/",
    availabilityCheckerUrl: "https://www.allpointsfibre.com/",
    isActive: true
  },
  {
    providerId: "fibrenest",
    providerName: "FibreNest",
    officialWebsite: "https://www.fibrenest.com/",
    availabilityCheckerUrl: "https://www.fibrenest.com/",
    isActive: true
  },
  {
    providerId: "county",
    providerName: "County Broadband",
    officialWebsite: "https://countybroadband.co.uk/",
    availabilityCheckerUrl: "https://countybroadband.co.uk/",
    isActive: true
  },
  {
    providerId: "jurassic",
    providerName: "Jurassic Fibre",
    officialWebsite: "https://jurassic-fibre.com/",
    availabilityCheckerUrl: "https://jurassic-fibre.com/",
    isActive: true
  },
  {
    providerId: "gnetwork",
    providerName: "G.Network",
    officialWebsite: "https://www.g.network/",
    availabilityCheckerUrl: "https://www.g.network/",
    isActive: true
  },
  {
    providerId: "shell",
    providerName: "Shell Energy Broadband",
    officialWebsite: "https://www.shellenergy.co.uk/",
    availabilityCheckerUrl: "https://www.shellenergy.co.uk/",
    isActive: true
  },
  {
    providerId: "uw",
    providerName: "Utility Warehouse",
    officialWebsite: "https://uw.co.uk/",
    availabilityCheckerUrl: "https://uw.co.uk/services/broadband",
    isActive: true
  }
];

// Helper search map indexed by canonical lowercase IDs and variations
export const providerLinksMap: Record<string, ProviderLink> = {};

providerLinksData.forEach((link) => {
  const normId = link.providerId.toLowerCase();
  providerLinksMap[normId] = link;
  
  // Register common aliases
  if (normId === "community") {
    providerLinksMap["communityfibre"] = link;
    providerLinksMap["community-fibre"] = link;
  }
  if (normId === "three5g") {
    providerLinksMap["three"] = link;
    providerLinksMap["three-broadband"] = link;
  }
  if (normId === "virgin") {
    providerLinksMap["virgin-media"] = link;
    providerLinksMap["virginmedia"] = link;
  }
  if (normId === "zen") {
    providerLinksMap["zen-internet"] = link;
  }
  if (normId === "now") {
    providerLinksMap["now-broadband"] = link;
  }
  if (normId === "ee5g") {
    providerLinksMap["ee"] = link;
  }
  if (normId === "vodafone5g") {
    providerLinksMap["vodafone"] = link;
  }
});

export function getProviderLink(providerId: string): ProviderLink | undefined {
  if (!providerId) return undefined;
  return providerLinksMap[providerId.toLowerCase()];
}

export function getProviderLinkByName(name: string): ProviderLink | undefined {
  if (!name) return undefined;
  const lowerName = name.toLowerCase();
  
  // Try exact lookup first
  const exact = providerLinksMap[lowerName];
  if (exact) return exact;
  
  // Try sub-string or matching words
  return providerLinksData.find(link => 
    lowerName.includes(link.providerName.toLowerCase()) || 
    link.providerName.toLowerCase().includes(lowerName)
  );
}
