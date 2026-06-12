/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SeoPageData } from "../types";
import { activeRegionKey } from "../config/siteConfig";
import siteConfig from "../config/siteConfig";

const rawTownPagesData: Record<string, SeoPageData> = {
  devizes: {
    pageTitle: "Best Listed Broadband Options to Check in Devizes | Wiltshire Broadband Finder",
    metaTitle: "Broadband in Devizes | Symmetrical Full Fibre Comparisons",
    metaDescription: "Check high speed internet availability in Devizes. Compare potential symmetrical gigabit fibre checkers, Trooli rural broadband packages, and national lines.",
    canonicalUrl: "https://www.wiltshirebroadbandfinder.co.uk/town/devizes",
    slug: "devizes",
    h1: "Broadband in Devizes",
    introCopy: "Broadband availability around Devizes and Market Lavington can vary by street and property. National providers may be available through Openreach based networks, while rural or alternative options should be checked by exact address. Use provider checkers and postcode tools before relying on any package or price.",
    postcodeTargets: ["SN10 1", "SN10 3", "SN10 5"],
    townTargets: ["devizes", "potterne", "worton"],
    primaryKeyword: "broadband choices to check in devizes",
    secondaryKeywords: ["Zzoomm checker Devizes", "Trooli broadband Potterne", "Devizes village address check"],
    faqItems: [
      {
        question: "Is Zzoomm active in Devizes?",
        answer: "Zzoomm is listed as an address-checker provider. Symmetrical fiber coverage is not universal and can vary dramatically by exact street segment. You must use their postcode checker to verify active service before ordering."
      },
      {
        question: "Which networks cover Potterne and Worton villages near Devizes?",
        answer: "Potterne and Worton are served by several regional altnets, but availability resides at the address level. An exact postcode search is required."
      }
    ],
    schemaType: "LocalBusiness",
    schemaJson: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Broadband Deals in Devizes",
      "description": "Compare high speed internet options across Devizes."
    }),
    ogTitle: "Best Broadband in Devizes - Wiltshire Finder",
    ogDescription: "Review the best full fibre speeds and rates in Devizes.",
    ogImage: "https://www.wiltshirebroadbandfinder.co.uk/images/og-devizes.jpg",
    twitterTitle: "Devizes Broadband Comparisons",
    twitterDescription: "Find fibre and hybrid-coaxial plans in Devizes towns.",
    twitterImage: "https://www.wiltshirebroadbandfinder.co.uk/images/twitter-devizes.jpg",
    lastUpdated: "2026-06-08",
    editorName: "Cane Editorial Team",
    reviewedBy: "Joshua Greedy",
    publishedBy: "Cane Communications Limited"
  },
  chippenham: {
    pageTitle: "Best Broadband Deals in Chippenham | Wiltshire Broadband Finder",
    metaTitle: "Broadband in Chippenham | Ultrafast Fibre Rankings",
    metaDescription: "Compare the best broadband speeds in Chippenham. Read about Trooli gigabit fibre, Truespeed price-freeze protection, and national Openreach lines.",
    canonicalUrl: "https://www.wiltshirebroadbandfinder.co.uk/town/chippenham",
    slug: "chippenham",
    h1: "Broadband in Chippenham",
    introCopy: "Chippenham enjoys excellent open accessibility. Local families can pick from Virgin Media gigabit cable, independent altnets, and standard retail brands.",
    postcodeTargets: ["SN14 0", "SN15 1", "SN15 3"],
    townTargets: ["chippenham", "lacock", "corsham"],
    primaryKeyword: "broadband in chippenham",
    secondaryKeywords: ["Truespeed Chippenham", "Virgin Media Chippenham", "Trooli Pewsham"],
    faqItems: [
      {
        question: "Who is the fastest broadband provider in Chippenham?",
        answer: "Virgin Media delivers gigabit cable speeds up to 1,130Mbps, while altnets like Trooli and Truespeed deliver robust 1,000Mbps symmetrical fibre."
      }
    ],
    schemaType: "WebPage",
    schemaJson: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Broadband Deals in Chippenham"
    }),
    ogTitle: "Broadband Options in Chippenham | Wiltshire Finder",
    ogDescription: "Compare plans from national names and local altnet systems.",
    ogImage: "https://www.wiltshirebroadbandfinder.co.uk/images/og-chippenham.jpg",
    twitterTitle: "Chippenham Fibre Deals",
    twitterDescription: "Examine high-performance internet packages in Chippenham.",
    twitterImage: "https://www.wiltshirebroadbandfinder.co.uk/images/twitter-chippenham.jpg",
    lastUpdated: "2026-06-08",
    editorName: "Cane Editorial Team",
    reviewedBy: "Joshua Greedy",
    publishedBy: "Cane Communications Limited"
  },
  trowbridge: {
    pageTitle: "Best Broadband Deals in Trowbridge | Wiltshire Broadband Finder",
    metaTitle: "Broadband in Trowbridge | Rated Full Fibre Packages",
    metaDescription: "Find the best home packages in Trowbridge. Compare Truespeed's local glass fibre, Openreach FTTP, and fast mainstream alternatives.",
    canonicalUrl: "https://www.wiltshirebroadbandfinder.co.uk/town/trowbridge",
    slug: "trowbridge",
    h1: "Broadband in Trowbridge",
    introCopy: "Wiltshire county town benefits from highly competitive broadband rates, with Truespeed and various mainstream providers actively expanding fibre networks.",
    postcodeTargets: ["BA14 0", "BA14 7", "BA14 8"],
    townTargets: ["trowbridge", "melksham", "bradford on avon"],
    primaryKeyword: "broadband trowbridge",
    secondaryKeywords: ["Truespeed Trowbridge", "cheap internet Trowbridge", "Westbury fibre"],
    faqItems: [
      {
        question: "Can I get Truespeed in Trowbridge?",
        answer: "Yes, Truespeed has built major network sectors in Trowbridge, giving residents contract-long price locks and equal upload rates."
      }
    ],
    schemaType: "WebPage",
    schemaJson: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Broadband Deals in Trowbridge"
    }),
    ogTitle: "Trowbridge Broadband Options | Wiltshire Finder",
    ogDescription: "Examine actual available speeds in the Wiltshire county capital.",
    ogImage: "https://www.wiltshirebroadbandfinder.co.uk/images/og-trowbridge.jpg",
    twitterTitle: "Trowbridge Broadband comparison",
    twitterDescription: "Symmetrical altnets and national options in Trowbridge.",
    twitterImage: "https://www.wiltshirebroadbandfinder.co.uk/images/twitter-trowbridge.jpg",
    lastUpdated: "2026-06-08",
    editorName: "Cane Editorial Team",
    reviewedBy: "Joshua Greedy",
    publishedBy: "Cane Communications Limited"
  },
  salisbury: {
    pageTitle: "Best Broadband Deals in Salisbury | Wiltshire Broadband Finder",
    metaTitle: "Broadband in Salisbury | Trial-City Full Fibre Coverage",
    metaDescription: "Browse broadband deals in Salisbury. Check near-universal Openreach FTTP coverage, Virgin Media gigabit cable, and local Wessex Internet packages.",
    canonicalUrl: "https://www.wiltshirebroadbandfinder.co.uk/town/salisbury",
    slug: "salisbury",
    h1: "Broadband in Salisbury",
    introCopy: "Salisbury was one of the UK's first trial cities for complete Openreach FTTP upgrades, resulting in exceptional fibre coverage across almost all central streets.",
    postcodeTargets: ["SP1 1", "SP1 2", "SP2 7", "SP2 8"],
    townTargets: ["salisbury", "wilton", "amesbury"],
    primaryKeyword: "broadband salisbury",
    secondaryKeywords: ["Salisbury fibre broadband", "Wessex Internet Salisbury", "Salisbury trial speeds"],
    faqItems: [
      {
        question: "Does Salisbury have complete full fibre?",
        answer: "Yes, because of the early Openreach full fibre trials, Salisbury features some of the highest FTTP density in Europe, exceeding 95% accessibility."
      }
    ],
    schemaType: "WebPage",
    schemaJson: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Broadband Deals in Salisbury"
    }),
    ogTitle: "Broadband Deals in Salisbury | Wiltshire Finder",
    ogDescription: "Compare gigabit systems in Wiltshire's cathedral city.",
    ogImage: "https://www.wiltshirebroadbandfinder.co.uk/images/og-salisbury.jpg",
    twitterTitle: "Salisbury Full Fibre Deals",
    twitterDescription: "Examine high broadband density packages in Salisbury.",
    twitterImage: "https://www.wiltshirebroadbandfinder.co.uk/images/twitter-salisbury.jpg",
    lastUpdated: "2026-06-08",
    editorName: "Cane Editorial Team",
    reviewedBy: "Joshua Greedy",
    publishedBy: "Cane Communications Limited"
  }
};

const townIdMap: Record<string, string> = {
  "devizes": "tunbridgewells",
  "chippenham": "canterbury",
  "trowbridge": "maidstone",
  "salisbury": "sevenoaks"
};

const townNameMap: Record<string, string> = {
  "Devizes": "Tunbridge Wells",
  "Chippenham": "Canterbury",
  "Trowbridge": "Maidstone",
  "Salisbury": "Sevenoaks"
};

const transformText = (text: string | any): any => {
  if (typeof text !== "string") return text;
  let result = text;
  
  if (activeRegionKey === "kent") {
    Object.entries(townNameMap).forEach(([oldName, newName]) => {
      const regex = new RegExp(oldName, "g");
      result = result.replace(regex, newName);
      
      const oldSlug = oldName.toLowerCase().replace(/ /g, "");
      const newSlug = newName.toLowerCase().replace(/ /g, "");
      const slugRegex = new RegExp(oldSlug, "g");
      result = result.replace(slugRegex, newSlug);
    });

    result = result
      .replace(/Wiltshire/g, siteConfig.regionName)
      .replace(/wiltshire/g, siteConfig.regionSlug)
      .replace(/South West/g, "South East");
  }
  return result;
};

const transformPage = (key: string, page: SeoPageData): SeoPageData => {
  const newPage = { ...page };
  const stringKeys: (keyof SeoPageData)[] = [
    "pageTitle", "metaTitle", "metaDescription", "canonicalUrl", "h1", 
    "heroIntro", "introCopy", "supportingIntro", "primaryKeyword", 
    "targetAudience", "ogTitle", "ogDescription", "twitterTitle", 
    "twitterDescription", "editorNote"
  ];
  
  stringKeys.forEach(k => {
    if (newPage[k]) {
      (newPage as any)[k] = transformText(newPage[k]);
    }
  });

  if (activeRegionKey === "kent") {
    const mappedKey = townIdMap[key] || key;
    newPage.slug = mappedKey;
    newPage.pageId = mappedKey;
    
    if (mappedKey === "tunbridgewells") {
      newPage.postcodeTargets = ["TN1 1", "TN2 3", "TN4 0"];
      newPage.townTargets = ["tunbridgewells", "rusthall"];
    } else if (mappedKey === "canterbury") {
      newPage.postcodeTargets = ["CT1 1", "CT1 2", "CT2 7"];
      newPage.townTargets = ["canterbury", "whitstable"];
    } else if (mappedKey === "maidstone") {
      newPage.postcodeTargets = ["ME14 0", "ME15 1", "ME16 8"];
      newPage.townTargets = ["maidstone", "snodland"];
    } else if (mappedKey === "sevenoaks") {
      newPage.postcodeTargets = ["TN13 1", "TN13 3", "TN15 0"];
      newPage.townTargets = ["sevenoaks", "boroughgreen"];
    }
  }

  if (newPage.secondaryKeywords) {
    newPage.secondaryKeywords = newPage.secondaryKeywords.map(transformText);
  }

  if (newPage.faqItems) {
    newPage.faqItems = newPage.faqItems.map(item => ({
      question: transformText(item.question),
      answer: transformText(item.answer)
    }));
  }

  return newPage;
};

export const townPagesData: Record<string, SeoPageData> = {};

Object.entries(rawTownPagesData).forEach(([key, page]) => {
  const newKey = activeRegionKey === "kent" ? (townIdMap[key] || key) : key;
  townPagesData[newKey] = transformPage(key, page);
});
