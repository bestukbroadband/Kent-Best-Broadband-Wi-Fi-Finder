/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Town } from "../types";

export const kentTownsData: Town[] = [
  {
    id: "tunbridgewells",
    name: "Tunbridge Wells",
    shortIntro: "Broadband availability around Royal Tunbridge Wells and Rusthall can vary significantly by house structure and private lanes. National providers are widespread across Openreach lines, with select full fibre active checker systems.",
    postcodeExamples: ["TN1 1", "TN2 3", "TN4 0"],
    sponsoredBannerId: undefined,
    nearbyTowns: ["Tonbridge", "Sevenoaks", "Goudhurst", "Paddock Wood"],
    faqs: [
      {
        question: "Is full fibre broadband available in Tunbridge Wells?",
        answer: "Fibre-to-the-Premises (FTTP) is listed for select streets and residential segments, but coverage is not unified and requires check-to-check verification. Use specific provider checkers to confirm address status."
      },
      {
        question: "Which networks are active for checks in Tunbridge Wells?",
        answer: "Openreach-based providers like BT, Sky, and TalkTalk are heavily listed. Independent alternative networks may also have localized structures."
      }
    ]
  },
  {
    id: "canterbury",
    name: "Canterbury",
    shortIntro: "The historic city of Canterbury has highly competitive broadband rates. While the student hubs enjoy comprehensive copper and gigabit fibre networks, outlying parished villages have unique altnet availability characteristics.",
    postcodeExamples: ["CT1 1", "CT1 2", "CT2 7"],
    sponsoredBannerId: "banner-canterbury-1",
    nearbyTowns: ["Faversham", "Whitstable", "Herne Bay", "Margate"],
    faqs: [
      {
        question: "Who is the fastest broadband provider listed in Canterbury?",
        answer: "Mainstream providers on Openreach networks and Virgin Media lines deliver up to 1,000 Mbps gigabit capability in selected central sectors."
      }
    ]
  },
  {
    id: "maidstone",
    name: "Maidstone",
    shortIntro: "Kent's county town benefits from extensive digital rollouts. Competitive plans are fighting for dominance in major commercial and residential estates.",
    postcodeExamples: ["ME14 0", "ME15 1", "ME16 8"],
    nearbyTowns: ["Tonbridge", "Snodland", "Faversham", "Sittingbourne"],
    faqs: [
      {
        question: "Can I choose high speed internet in Maidstone?",
        answer: "Yes, standard FTTP lines and mainstream retail outlets are heavily listed for local checks."
      }
    ]
  },
  {
    id: "sevenoaks",
    name: "Sevenoaks",
    shortIntro: "Sevenoaks area has competitive options, but parished lanes require individual provider checking owing to topography. Check with your postcode before buying.",
    postcodeExamples: ["TN13 1", "TN13 3", "TN15 0"],
    nearbyTowns: ["Tonbridge", "Tunbridge Wells", "Borough Green", "Wrotham"],
    faqs: [
      {
        question: "Are independent altnets active in Sevenoaks?",
        answer: "Selected street rollouts have been reported. Standard Openreach based networks serve the core districts."
      }
    ]
  },
  {
    id: "ashford",
    name: "Ashford",
    shortIntro: "Ashford is a highly progressive transportation and digital hub with massive recent housebuilding. Most newly constructed homes are pre-fitted with full fibre.",
    postcodeExamples: ["TN23 1", "TN24 0"],
    nearbyTowns: ["Charing", "Tenterden", "Folkestone", "Hythe"],
    faqs: [
      {
        question: "Is gigabit broadband standard in Ashford new builds?",
        answer: "Generally yes, developer structures in Kent partner with fibre layout providers to ensure gigabit connectivity upon occupancy."
      }
    ]
  },
  {
    id: "tonbridge",
    name: "Tonbridge",
    shortIntro: "Tonbridge benefits from solid mainstream coverage, with competitive fibre networks active across school districts and commuter pathways.",
    postcodeExamples: ["TN9 1", "TN11 0"],
    nearbyTowns: ["Tunbridge Wells", "Sevenoaks", "Paddock Wood"],
    faqs: []
  },
  {
    id: "dartford",
    name: "Dartford",
    shortIntro: "Dartford is exceptionally well-connected digitally due to its proximity to London, enjoying multiple high-capacity corporate and retail infrastructures.",
    postcodeExamples: ["DA1 1", "DA11 2"],
    nearbyTowns: ["Gravesend", "Borough Green"],
    faqs: []
  },
  {
    id: "margate",
    name: "Margate",
    shortIntro: "Margate's coastal locations enjoy reliable mainstream service paths. Residents outside the town center should check local availability, as street connections vary.",
    postcodeExamples: ["CT9 1", "CT10 2"],
    nearbyTowns: ["Broadstairs", "Ramsgate", "Whitstable", "Canterbury"],
    faqs: []
  }
];

export default kentTownsData;
