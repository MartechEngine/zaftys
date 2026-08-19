/**
 * Homepage section sequence — locked to positioning narrative.
 *
 * Story arc (logistics first, technology earned):
 *   WHAT → PROOF → HOW → TOOLS → WHO → KNOW → ACT
 *
 * Industries follow Platform so tools are proven before vertical tiles —
 * "here's how we run freight" then "here's who we run it for".
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
    narrative: "TOOLS",
    job: "TMS + Tranzfort immediately after operating model — prove the desk runs on real software",
    pillar: "Platform",
  },
  {
    id: "industries",
    order: 4,
    narrative: "WHO",
    job: "Industrial verticals where that model and platform are applied",
    pillar: "Logistics / Industries",
  },
  {
    id: "insights",
    order: 5,
    narrative: "KNOW",
    job: "Intelligence + research teaser; tertiary pillar",
    pillar: "Intelligence",
  },
  {
    id: "final-cta",
    order: 6,
    narrative: "ACT",
    job: "Convert — Request Transportation",
    pillar: "Logistics",
  },
] as const;

export type HomeSectionId = (typeof homeSectionSequence)[number]["id"];
