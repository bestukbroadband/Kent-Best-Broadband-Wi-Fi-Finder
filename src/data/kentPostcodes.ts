/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PostcodeArea } from "../types";

const kentRawAreas = [
  { prefix: "BR6", name: "Orpington/Kent Border", town: "Orpington" },
  { prefix: "BR8", name: "Swanley", town: "Swanley" },
  { prefix: "CT1", name: "Canterbury Central", town: "Canterbury" },
  { prefix: "CT2", name: "Canterbury North", town: "Canterbury" },
  { prefix: "CT3", name: "Canterbury East", town: "Canterbury" },
  { prefix: "CT4", name: "Canterbury South", town: "Canterbury" },
  { prefix: "CT5", name: "Whitstable", town: "Whitstable" },
  { prefix: "CT6", name: "Herne Bay", town: "Herne Bay" },
  { prefix: "CT7", name: "Birchington", town: "Birchington" },
  { prefix: "CT8", name: "Westgate on Sea", town: "Westgate on Sea" },
  { prefix: "CT9", name: "Margate", town: "Margate" },
  { prefix: "CT10", name: "Broadstairs", town: "Broadstairs" },
  { prefix: "CT11", name: "Ramsgate", town: "Ramsgate" },
  { prefix: "CT12", name: "Minster/Isle of Thanet", town: "Minster" },
  { prefix: "CT13", name: "Sandwich", town: "Sandwich" },
  { prefix: "CT14", name: "Deal", town: "Deal" },
  { prefix: "CT15", name: "Dover Rural", town: "Dover" },
  { prefix: "CT16", name: "Dover Central", town: "Dover" },
  { prefix: "CT17", name: "Dover South", town: "Dover" },
  { prefix: "CT18", name: "Folkestone Rural", town: "Folkestone" },
  { prefix: "CT19", name: "Folkestone Central", town: "Folkestone" },
  { prefix: "CT20", name: "Folkestone West", town: "Folkestone" },
  { prefix: "CT21", name: "Hythe", town: "Hythe" },
  { prefix: "DA1", name: "Dartford", town: "Dartford" },
  { prefix: "DA2", name: "Dartford East and Stone", town: "Dartford" },
  { prefix: "DA3", name: "Longfield", town: "Longfield" },
  { prefix: "DA4", name: "Farningham", town: "Farningham" },
  { prefix: "DA9", name: "Greenhithe", town: "Greenhithe" },
  { prefix: "DA10", name: "Swanscombe", town: "Swanscombe" },
  { prefix: "DA11", name: "Gravesend", town: "Gravesend" },
  { prefix: "DA12", name: "Gravesend East", town: "Gravesend" },
  { prefix: "DA13", name: "Meopham", town: "Meopham" },
  { prefix: "ME1", name: "Rochester", town: "Rochester" },
  { prefix: "ME2", name: "Strood", town: "Strood" },
  { prefix: "ME3", name: "Hoo Peninsula", town: "Hoo Peninsula" },
  { prefix: "ME4", name: "Chatham Central", town: "Chatham" },
  { prefix: "ME5", name: "Chatham South", town: "Chatham" },
  { prefix: "ME6", name: "Snodland", town: "Snodland" },
  { prefix: "ME7", name: "Gillingham", town: "Gillingham" },
  { prefix: "ME8", name: "Rainham", town: "Rainham" },
  { prefix: "ME9", name: "Sittingbourne Rural", town: "Sittingbourne" },
  { prefix: "ME10", name: "Sittingbourne Central", town: "Sittingbourne" },
  { prefix: "ME11", name: "Queenborough", town: "Queenborough" },
  { prefix: "ME12", name: "Isle of Sheppey", town: "Isle of Sheppey" },
  { prefix: "ME13", name: "Faversham", town: "Faversham" },
  { prefix: "ME14", name: "Maidstone Central and East", town: "Maidstone" },
  { prefix: "ME15", name: "Maidstone South", town: "Maidstone" },
  { prefix: "ME16", name: "Maidstone West", town: "Maidstone" },
  { prefix: "ME17", name: "Maidstone Rural", town: "Maidstone" },
  { prefix: "ME18", name: "Maidstone West Rural", town: "Maidstone" },
  { prefix: "ME19", name: "West Malling", town: "West Malling" },
  { prefix: "ME20", name: "Aylesford", town: "Aylesford" },
  { prefix: "TN1", name: "Tunbridge Wells Central", town: "Tunbridge Wells" },
  { prefix: "TN2", name: "Tunbridge Wells East", town: "Tunbridge Wells" },
  { prefix: "TN3", name: "Langton Green and Frant", town: "Tunbridge Wells" },
  { prefix: "TN4", name: "Tunbridge Wells North", town: "Tunbridge Wells" },
  { prefix: "TN8", name: "Edenbridge", town: "Edenbridge" },
  { prefix: "TN9", name: "Tonbridge Central", town: "Tonbridge" },
  { prefix: "TN10", name: "Tonbridge North", town: "Tonbridge" },
  { prefix: "TN11", name: "Tonbridge Rural", town: "Tonbridge" },
  { prefix: "TN12", name: "Paddock Wood", town: "Paddock Wood" },
  { prefix: "TN13", name: "Sevenoaks Central", town: "Sevenoaks" },
  { prefix: "TN14", name: "Sevenoaks North", town: "Sevenoaks" },
  { prefix: "TN15", name: "Sevenoaks East", town: "Sevenoaks" },
  { prefix: "TN16", name: "Westerham", town: "Westerham" },
  { prefix: "TN17", name: "Cranbrook", town: "Cranbrook" },
  { prefix: "TN18", name: "Hawkhurst", town: "Hawkhurst" },
  { prefix: "TN23", name: "Ashford South", town: "Ashford" },
  { prefix: "TN24", name: "Ashford North", town: "Ashford" },
  { prefix: "TN25", name: "Ashford Rural", town: "Ashford" },
  { prefix: "TN26", name: "Ashford West Rural", town: "Ashford" },
  { prefix: "TN27", name: "Headcorn", town: "Headcorn" },
  { prefix: "TN28", name: "New Romney", town: "New Romney" },
  { prefix: "TN29", name: "Lydd and Romney Marsh", town: "Lydd" },
  { prefix: "TN30", name: "Tenterden", town: "Tenterden" }
];

export const kentPostcodesData: PostcodeArea[] = kentRawAreas.map((item) => {
  const isCoreKentArea = true;
  const providerSearchEnabled = true;
  const slug = `broadband-${item.prefix.toLowerCase()}`;
  
  return {
    postcodePrefix: item.prefix,
    areaName: item.name,
    primaryTown: item.town,
    nearbyAreas: [item.town],
    county: "Kent",
    region: "South East",
    slug,
    introCopy: `${item.name} (${item.prefix}) covers parts of any of ${item.town} in Kent. Our local guide tracks broadband coverage across this district. Check broadband speed, contract terms and providers for your address.`,
    localBroadbandNotes: `Broadband availability in ${item.name} can vary by exact address, street and property type. Use the provider checkers to confirm current packages, speeds, installation options and pricing before ordering.`,
    postcodeExamples: [`${item.prefix} 1AA`, `${item.prefix} 2AA`],
    providerIds: ["bt", "sky", "talktalk", "virgin", "vodafone", "ee", "starlink"],
    seoTitle: `Best Broadband in ${item.name} | ${item.prefix} Listed Deals`,
    metaDescription: `Compare listed broadband packages in ${item.name} (${item.prefix}). Find provider check buttons and tracked offers for this area. Check address availability.`,
    h1: `Best Listed Broadband Deals in ${item.name} (${item.prefix})`,
    faqs: [
      {
        question: `How do I check exact broadband availability in ${item.prefix}?`,
        answer: `Broadband speeds and pricing vary from street to street. You should always use the direct provider availability checkers before ordering.`
      }
    ],
    nearbyPostcodes: [],
    lastUpdated: "June 12, 2026",
    isCoreKentArea,
    providerSearchEnabled
  } as any;
});

export default kentPostcodesData;
