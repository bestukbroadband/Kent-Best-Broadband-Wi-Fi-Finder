/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ComparisonSourceLink {
  sourceId: string;
  sourceName: string;
  officialWebsite: string;
  providerPageUrl?: string;
  mapUrl?: string;
  checkerUrl?: string;
}

export const comparisonSourceLinksData: ComparisonSourceLink[] = [
  {
    sourceId: "uswitch",
    sourceName: "Uswitch",
    officialWebsite: "https://www.uswitch.com/broadband/",
    providerPageUrl: "https://www.uswitch.com/broadband/providers/"
  },
  {
    sourceId: "compare-the-market",
    sourceName: "Compare the Market",
    officialWebsite: "https://www.comparethemarket.com/broadband/"
  },
  {
    sourceId: "broadband-genie",
    sourceName: "Broadband Genie",
    officialWebsite: "https://www.broadband.co.uk/"
  },
  {
    sourceId: "moneysupermarket",
    sourceName: "MoneySuperMarket",
    officialWebsite: "https://www.moneysupermarket.com/broadband/"
  },
  {
    sourceId: "moneysavingexpert",
    sourceName: "MoneySavingExpert",
    officialWebsite: "https://www.moneysavingexpert.com/compare-broadband-deals/"
  },
  {
    sourceId: "which-broadband",
    sourceName: "Which Broadband",
    officialWebsite: "https://broadband.which.co.uk/"
  },
  {
    sourceId: "thinkbroadband",
    sourceName: "ThinkBroadband",
    officialWebsite: "https://www.thinkbroadband.com/",
    mapUrl: "https://labs.thinkbroadband.com/local/broadband-map"
  },
  {
    sourceId: "ispreview",
    sourceName: "ISPreview",
    officialWebsite: "https://www.ispreview.co.uk/"
  },
  {
    sourceId: "ofcom-checker",
    sourceName: "Ofcom checker",
    officialWebsite: "https://www.ofcom.org.uk/",
    checkerUrl: "https://checker.ofcom.org.uk/en-gb/broadband-coverage"
  },
  {
    sourceId: "openreach-checker",
    sourceName: "Openreach fibre checker",
    officialWebsite: "https://www.openreach.com/",
    checkerUrl: "https://www.openreach.com/fibre-checker"
  }
];

export const comparisonSourceLinksMap: Record<string, ComparisonSourceLink> = {};

comparisonSourceLinksData.forEach((link) => {
  comparisonSourceLinksMap[link.sourceId.toLowerCase()] = link;
});

export function getComparisonSourceLink(sourceId: string): ComparisonSourceLink | undefined {
  if (!sourceId) return undefined;
  return comparisonSourceLinksMap[sourceId.toLowerCase()];
}
