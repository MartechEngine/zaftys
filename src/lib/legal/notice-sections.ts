import type { LegalSection } from "@/components/legal/LegalDocument";

export const noticeIntro =
  "This Legal Notice applies to information on the ZAFTYS website about logistics, transportation and technology-related services.";

export const noticeSections: LegalSection[] = [
  {
    id: "general",
    title: "1. General information",
    blocks: [
      {
        type: "p",
        text: "Website content should not be interpreted as a binding quotation, guaranteed vehicle availability, guaranteed freight rate, guaranteed delivery time, legal opinion, insurance commitment or Trip Confirmation - unless expressly identified as such in writing.",
      },
    ],
  },
  {
    id: "availability",
    title: "2. Vehicle availability",
    blocks: [
      {
        type: "p",
        text: "Vehicle information displayed or communicated through the website may be subject to availability. A Vehicle is not finally committed merely because information about it has been displayed or discussed. A Trip becomes commercially binding only when the relevant parties have accepted applicable commercial terms or otherwise created a binding arrangement.",
      },
    ],
  },
  {
    id: "rates",
    title: "3. Rates and commercial information",
    blocks: [
      {
        type: "p",
        text: "Rates, routes, availability and operational information may change based on market conditions, fuel, route conditions, vehicle availability, loading/unloading conditions, customer requirements, government restrictions and other factors. The applicable written commercial document controls the relevant Trip.",
      },
    ],
  },
  {
    id: "representation",
    title: "4. No unauthorised representation",
    blocks: [
      {
        type: "p",
        text: "No person may represent themselves as an authorised ZAFTYS representative unless authorised by ZAFTYS. If you receive a suspicious payment request, verify bank details directly with ZAFTYS before paying. ZAFTYS may change payment/bank details only through authorised communication.",
      },
    ],
  },
  {
    id: "electronic",
    title: "5. Legal effect of electronic transactions",
    blocks: [
      {
        type: "p",
        text: "Electronic communications and records may form part of a transaction where accepted or used by the relevant parties, subject to applicable law. ZAFTYS may retain electronic records for evidentiary, operational, accounting, security and legal purposes.",
      },
    ],
  },
];
