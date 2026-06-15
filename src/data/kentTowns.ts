/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import { Town } from "../types";

export const kentTownsData: Town[] = [
  {
    id: "maidstone",
    name: "Maidstone",
    shortIntro: "Kent's county town benefits from extensive digital rollouts and multiple overlapping fibre networks. Competitive deals are actively fighting for dominance in major commercial and residential estates.",
    postcodeExamples: ["ME14 0", "ME15 1", "ME16 8"],
    nearbyTowns: ["West Malling", "Kings Hill", "Rochester", "Aylesford"],
    faqs: [
      {
        question: "Can I choose high speed internet in Maidstone?",
        answer: "Yes, standard FTTP lines from Openreach, alternative network providers, and cable operators cover the majority of urban Maidstone."
      }
    ]
  },
  {
    id: "kingshill",
    name: "Kings Hill",
    shortIntro: "This modern landscaped business and residential community near West Malling was designed with robust underground planning, facilitating high-speed fiber-to-the-premises across most blocks.",
    postcodeExamples: ["ME19 4"],
    nearbyTowns: ["West Malling", "Maidstone", "Tonbridge"],
    faqs: [
      {
        question: "Is full fiber available to all residences in Kings Hill?",
        answer: "Kings Hill has a very high full-fiber footprint due to its relatively recent construction, with Openreach and independent altnets tracking high availability percentages."
      }
    ]
  },
  {
    id: "canterbury",
    name: "Canterbury",
    shortIntro: "The historic city of Canterbury has highly competitive broadband rates. While student hubs enjoy comprehensive gigabit networks, parished outlying villages present unique altnet availability characteristics.",
    postcodeExamples: ["CT1 1", "CT1 2", "CT2 7"],
    nearbyTowns: ["Faversham", "Whitstable", "Herne Bay", "Margate"],
    faqs: [
      {
        question: "Who is the fastest broadband provider in Canterbury?",
        answer: "Gigabit cable networks and national provider FTTP options deliver speeds up to 1,000 Mbps in selected central sectors."
      }
    ]
  },
  {
    id: "ashford",
    name: "Ashford",
    shortIntro: "Ashford is a highly progressive transportation and housing hub. High-speed network rollouts and brand-new fiber-equipped property developments characterize outer Ashford lines.",
    postcodeExamples: ["TN23 1", "TN24 0"],
    nearbyTowns: ["Charing", "Tenterden", "Folkestone", "Dover"],
    faqs: [
      {
        question: "Is gigabit broadband standard in Ashford new builds?",
        answer: "Yes, development parcels are typically coupled with fiber layout contractors to secure instant gigabit links on move-in."
      }
    ]
  },
  {
    id: "dartford",
    name: "Dartford",
    shortIntro: "Dartford is exceptionally well-connected due to its proximity to Greater London. Residents can search high-speed mainstream plans or dedicated local commercial fiber lines.",
    postcodeExamples: ["DA1 1", "DA2 6"],
    nearbyTowns: ["Swanley", "Gravesend", "Rochester"],
    faqs: [
      {
        question: "Can I get reliable FTTP in Dartford?",
        answer: "Dartford boasts near-complete high-speed coverage, although specific older lanes require precise postcode checks on provider websites."
      }
    ]
  },
  {
    id: "sevenoaks",
    name: "Sevenoaks",
    shortIntro: "The Sevenoaks district has highly competitive mainstream options. However, parished lanes and rural wooded hills require individual checker verification owing to local topography.",
    postcodeExamples: ["TN13 1", "TN13 3", "TN15 0"],
    nearbyTowns: ["Tonbridge", "Tunbridge Wells", "Wrotham", "Swanley"],
    faqs: [
      {
        question: "Are independent altnets active in Sevenoaks?",
        answer: "Selected street rollouts from providers like Netomnia or Trooli have been recorded, alongside ubiquitous Openreach-based copper-to-fiber upgrades."
      }
    ]
  },
  {
    id: "tunbridgewells",
    name: "Tunbridge Wells",
    shortIntro: "Broadband availability around Royal Tunbridge Wells and Rusthall can vary significantly by house structure and private lanes. National providers are widespread across Openreach lines.",
    postcodeExamples: ["TN1 1", "TN2 3", "TN4 0"],
    nearbyTowns: ["Tonbridge", "Sevenoaks", "Kings Hill"],
    faqs: [
      {
        question: "Is full fibre broadband available in Tunbridge Wells?",
        answer: "FTTP is active across major central streets and residential segments. It requires check-to-check address confirmation on the provider's specific checker."
      }
    ]
  },
  {
    id: "folkestone",
    name: "Folkestone",
    shortIntro: "An active coastal town undergoing substantial artistic and residential redevelopment. Folkestone's network has seen significant FTTP improvements across the harbor and residential hills.",
    postcodeExamples: ["CT19 5", "CT20 1"],
    nearbyTowns: ["Dover", "Ashford", "Hythe"],
    faqs: [
      {
        question: "Who owns the fiber lines in Folkestone?",
        answer: "Openreach forms the main grid, but independent regional fiber operators have laid high-speed lines in selected areas."
      }
    ]
  },
  {
    id: "dover",
    name: "Dover",
    shortIntro: "A world-famous gateway port. Dover's unique white cliff valley creates signal pockets, making postcode-specific checks crucial for both fiber lines and 5G home broadband.",
    postcodeExamples: ["CT16 1", "CT17 9"],
    nearbyTowns: ["Folkestone", "Deal", "Canterbury"],
    faqs: [
      {
        question: "What rural alternate options serve Dover's outskirts?",
        answer: "Fixed-wireless links and high-speed satellite providers (like Starlink) help cover farms and cliffside hamlets where cables are not yet dug."
      }
    ]
  },
  {
    id: "whitstable",
    name: "Whitstable",
    shortIntro: "Famous for its oysters and coastal culture, Whitstable's residential neighborhoods enjoy a highly developed mainstream fiber footprint with emerging regional altnet offerings.",
    postcodeExamples: ["CT5 1", "CT5 4"],
    nearbyTowns: ["Canterbury", "Herne Bay", "Faversham"],
    faqs: [
      {
        question: "Can I get reliable speeds in Whitstable?",
        answer: "Yes, mainstream providers and altnets are highly tracking across central Whitstable. Address checks are recommended for beachfront lanes."
      }
    ]
  },
  {
    id: "margate",
    name: "Margate",
    shortIntro: "Margate's retro coastal vibe is matched by an improving digital layout. Central districts have reliable coverage, while older parished segments are slated for altnet upgrades.",
    postcodeExamples: ["CT9 1", "CT9 3"],
    nearbyTowns: ["Broadstairs", "Ramsgate", "Whitstable"],
    faqs: [
      {
        question: "What speeds are available in Margate?",
        answer: "Speeds range from standard copper broadband up to 900 Mbps FTTP depending on exact local cabinet distances."
      }
    ]
  },
  {
    id: "ramsgate",
    name: "Ramsgate",
    shortIntro: "Featuring the UK's only Royal Harbor, Ramsgate enjoys strong Openreach-based broadband coverage alongside expanding coastal fiber layouts from altnet builders.",
    postcodeExamples: ["CT11 7", "CT11 9"],
    nearbyTowns: ["Broadstairs", "Margate", "Sandwich"],
    faqs: [
      {
        question: "Is Ramsgate well served by high speed checks?",
        answer: "Most central postcodes return high-speed results, but individual checkers should always be run for precision."
      }
    ]
  },
  {
    id: "broadstairs",
    name: "Broadstairs",
    shortIntro: "Known for sandy beaches and historic cliff walks. Broadstairs has solid digital access from mainstream service providers, with private street checks recommended.",
    postcodeExamples: ["CT10 1", "CT10 2"],
    nearbyTowns: ["Ramsgate", "Margate", "Canterbury"],
    faqs: [
      {
        question: "Does Openreach FTTP cover Broadstairs?",
        answer: "Yes, Openreach has deployed high-speed fiber-to-the-premises to the majority of Broadstairs properties."
      }
    ]
  },
  {
    id: "westmalling",
    name: "West Malling",
    shortIntro: "A beautiful historic market town. Characterized by antique layouts and listed architecture, laying fiber has required specialized streetworks, though FTTP coverage is highly active.",
    postcodeExamples: ["ME19 6"],
    nearbyTowns: ["Kings Hill", "Maidstone", "Rochester"],
    faqs: [
      {
        question: "Why does West Malling have distinct coverage limits?",
        answer: "Protected timber-frame buildings and listed street grids require careful civil works, making wireless and specific altnets highly useful backups."
      }
    ]
  },
  {
    id: "swanley",
    name: "Swanley",
    shortIntro: "Positioned directly near Dartford and London bounds, Swanley enjoys comprehensive commuter commuter coverage, offering stellar mainstream speeds and local Altnets.",
    postcodeExamples: ["BR8 7", "BR8 8"],
    nearbyTowns: ["Dartford", "Sevenoaks", "Orpington"],
    faqs: [
      {
        question: "Does full fiber cover Swanley parishes?",
        answer: "Virtually all central blocks are fully mapped for high-speed fiber. Always double-check on provider platforms."
      }
    ]
  },
  {
    id: "rochester",
    name: "Rochester",
    shortIntro: "Rochester's historic castle and cathedral neighborhoods are served by a mix of traditional copper, coaxial cable, and modern direct-to-home fiber connections.",
    postcodeExamples: ["ME1 1", "ME2 2"],
    nearbyTowns: ["Chatham", "Gillingham", "Maidstone"],
    faqs: [
      {
        question: "Can I get gigabit fiber in Rochester?",
        answer: "Yes, both cable networks and Openreach FTTP are active in Rochester, giving speeds of 500-1000 Mbps."
      }
    ]
  },
  {
    id: "chatham",
    name: "Chatham",
    shortIntro: "Chatham's naval dockyard heritage meets an advanced digital backbone. Residents can find superfast and ultrafast checkers for almost all urban streets.",
    postcodeExamples: ["ME4 4", "ME5 0"],
    nearbyTowns: ["Rochester", "Gillingham", "Maidstone"],
    faqs: [
      {
        question: "Which networks handle Chatham broadband?",
        answer: "Major national brands run on local Openreach exchanges, and alternative networks are deployed near the Dockyard."
      }
    ]
  },
  {
    id: "gillingham",
    name: "Gillingham",
    shortIntro: "Gillingham resides in the Medway region, supporting highly competitive residential fiber links. Commuters can choose high-grade plans with multiple independent networks available to test.",
    postcodeExamples: ["ME7 1", "ME8 0"],
    nearbyTowns: ["Chatham", "Rochester", "Rainham"],
    faqs: [
      {
        question: "Who is the main network tracker for Gillingham?",
        answer: "Openreach and Virgin Media own the primary conduits, but various regional altnets are active."
      }
    ]
  }
];

export default kentTownsData;
