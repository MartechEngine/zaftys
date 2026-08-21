/**
 * Homepage section sequence — locked to positioning narrative.
 *
 * Story arc (logistics first; Network and Platform as layers):
 *   WHAT → HOW → PLATFORM → NETWORK → WHO → KNOW → ACT
 */
export const homeSectionSequence = [
  {
    id: "hero",
    order: 1,
    narrative: "WHAT + PROOF",
    job: "Heavy freight promise, primary CTA, trust strip",
    pillar: "Logistics",
  },
  {
    id: "operating-model",
    order: 2,
    narrative: "HOW",
    job: "Define ZAFTYS as an operator (fleet + contract + network), not broker or SaaS",
    pillar: "Logistics",
  },
  {
    id: "platform",
    order: 3,
    narrative: "PLATFORM",
    job: "ZAFTYS TMS — prove the desk runs on real software",
    pillar: "Platform",
  },
  {
    id: "network",
    order: 4,
    narrative: "NETWORK",
    job: "TranZfort and labeled capacity overflow — separate from TMS",
    pillar: "Network",
  },
  {
    id: "industries",
    order: 5,
    narrative: "WHO",
    job: "Industrial verticals where that model is applied",
    pillar: "Industries",
  },
  {
    id: "insights",
    order: 6,
    narrative: "KNOW",
    job: "Intelligence + research teaser; tertiary pillar",
    pillar: "Intelligence",
  },
  {
    id: "final-cta",
    order: 7,
    narrative: "ACT",
    job: "Convert — Request Transportation",
    pillar: "Logistics",
  },
] as const;

export type HomeSectionId = (typeof homeSectionSequence)[number]["id"];
