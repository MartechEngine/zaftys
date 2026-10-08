/** Deep-research exhibits: FASTag, MLFF, and GNSS tolling for Indian freight.
 * Pure TypeScript. Zero em-dashes or en-dashes; spaced hyphens only.
 */
import { zaftysViz } from "@/lib/blog-exhibits-tms-eval";
import type { BlogExhibit, BlogKpi } from "@/lib/blog-data";

export const tollGnssKpis: readonly BlogKpi[] = [
  {
    value: "6.23 crore",
    label: "Active FASTags, June 2026",
    detail:
      "Lok Sabha reply, 30 July 2026. This is the live collection system. It is not a ZAFTYS count.",
  },
  {
    value: ">98%",
    label: "User fee through FASTag",
    detail:
      "PIB, 22 July 2026. Cash is no longer the audit path. The statement is.",
  },
  {
    value: "Named plazas",
    label: "Where MLFF is live",
    detail:
      "Barrier-free gantries still debit FASTag. Five were live on 30 July 2026. The 1 October release names a wider set. It is not a national switch-off of booms.",
  },
  {
    value: "No timeline",
    label: "GNSS replacement",
    detail:
      "The same July reply: expert committees asked for more work on security, privacy, breach, and control. Satellite billing is not the national bill.",
  },
  {
    value: "20 km",
    label: "GNSS waiver, with a miss",
    detail:
      "Written in the 2024 fee rules for a non-national-permit vehicle, per direction, per day, on the same section. A national permit truck does not get it.",
  },
  {
    value: "₹270",
    label: "Workshop section fee",
    detail:
      "Teaching only: ₹4.50 per km times a 60 km section. A 4 km hop can still pay ₹270 at an open plaza or an MLFF gantry.",
  },
] as const;

export const tollGnssTakeaways = [
  "FASTag is still the national toll system. Barrier-free MLFF removes the stop at named plazas. It does not start pay-per-kilometre billing.",
  "In July 2026 the government said there is no timeline to replace plazas with GNSS. The 2024 distance rule is written. It is not the operating bill.",
  "The 20 km zero does not apply to a national permit vehicle. Most interstate plant trucks should not be sold that waiver.",
  "A wrong tag class, a dead balance, or a round monthly toll allowance will still fail an audit after the boom is gone.",
  "Toll stays on its own bill line. It does not belong inside the diesel percent.",
] as const;

export const tollGnssReferences = [
  "[PIB, 22 July 2026, FASTag based toll collection and digital tolling system](https://www.pib.gov.in/PressReleasePage.aspx?PRID=2287760): more than 98% of user fee through FASTag, the car annual pass, the acquirer, NPCI, and issuer path, and the decision to pursue MLFF while GPS tolling stays under deliberation.",
  "[Lok Sabha unstarred question 2017, answered 30 July 2026](https://sansad.in/getFile/lsapps/loksabhaquestions/annex/188/AU2017_R7HYyw.pdf): about 6.23 crore active FASTags in June 2026, the 60 km plaza-spacing rule, five live MLFF plazas, 104 more identified, and no GNSS replacement timeline.",
  "[PIB, 1 October 2026, Tamil Nadu's first barrierless MLFF plaza](https://www.pib.gov.in/PressReleasePage.aspx?PRID=2317639): Paranur plus Chorayasi, Mundka, Shahjahanpur, Daulatpura, Manoharpura, and Gharaunda. The debit is still FASTag. A low balance can become an electronic notice.",
  "National Highways Fee (Determination of Rates and Collection) Amendment Rules, 2024, reported in force on 10 September 2024 and later listed as G.S.R. 556(E) dated 9 September 2024. The [Rajya Sabha papers laid on 18 December 2024](https://cms.rajyasabha.nic.in/UploadedFiles/Debates/OfficialDebatesDatewise/Floor/266/18122024/18122024.pdf) record the notification. Confirm the gazette text before a contract quotes the 20 km zero or the double fee.",
  "[Indian Express, 10 September 2024](https://indianexpress.com/article/business/national-highway-free-travel-up-to-20-km-for-satellite-system-equipped-vehicles-9560711/) and [The Hindu, 10 September 2024](https://www.thehindu.com/news/national/no-highway-toll-fee-up-to-20-km-for-vehicles-with-gnss/article68629265.ece): reporting of that GNSS amendment. The Express report said the GNSS-lane tender was not finalised.",
  "[NHAI, 7 June 2024](https://nhai.gov.in/nhai/sites/default/files/2024-06/Press_Release_GNSS_EOI.pdf) and the [IHMCL GNSS concept note, 29 June 2024](https://ihmcl.co.in/wp-content/uploads/2024/06/Concept-Paper-GNSS-based-ETC_V6_29.06.24.pdf): hybrid design and an AIS-140 device as the proposed on-board unit. Design history, not an October 2026 fitment order.",
  "[ZAFTYS diesel surcharge guide](/blog/diesel-surcharge-freight-contract-india): source of the older ₹3 to ₹7 per km toll workshop band inside a ₹26 to ₹37 variable-cost band. Teaching context, not a plaza tariff or national toll share.",
] as const;

export const tollGnssExhibits: Record<string, readonly BlogExhibit[]> = {
  "Three toll systems, and only one of them is the national default": [
    {
      kind: "timeline",
      caption: "What changed, and what is still only a design",
      source: "NHAI and IHMCL, June 2024. Fee-rule reporting, September 2024. PIB, 22 July 2026 and 1 October 2026. Lok Sabha reply, 30 July 2026.",
      items: [
        {
          phase: "June 2024",
          title: "A hybrid is designed",
          body: "NHAI and IHMCL describe FASTag lanes beside GNSS lanes, and an AIS-140 unit as the proposed device. This is a concept, not a fitment order.",
        },
        {
          phase: "10 Sep 2024",
          title: "The distance rule is written",
          body: "The fee-rule amendment, as reported, sets a 20 km zero for some vehicles and a double fee in an earmarked GNSS lane. It does not switch the country over.",
        },
        {
          phase: "15 Aug 2025",
          title: "The car pass starts",
          body: "The ₹3,075 FASTag annual pass is for non-commercial cars, jeeps, and vans. It does not cover a goods trailer.",
        },
        {
          phase: "22 Jul 2026",
          title: "FASTag is still the rail",
          body: "PIB says more than 98% of user fee is collected through FASTag, and that GPS tolling stays under deliberation.",
        },
        {
          phase: "30 Jul 2026",
          title: "Parliament names the limit",
          body: "About 6.23 crore active tags in June 2026. MLFF is live at five plazas. There is no timeline to replace plazas with GNSS.",
        },
        {
          phase: "1 Oct 2026",
          title: "The live gantry list widens",
          body: "PIB names a wider barrier-free set, including Shahjahanpur and Paranur. The debit is still FASTag.",
        },
      ],
    },
    {
      kind: "callout",
      caption: "The national collection rail in one published number",
      source: "PIB, 22 July 2026. No unpublished remainder is inferred.",
      items: [
        {
          title: "More than 98% through FASTag",
          body: "PIB reports that more than 98% of national-highway user fee is collected through FASTag. That establishes the live system. It does not publish a precise split for the small remainder.",
          tone: "navy",
        },
      ],
    },
    {
      kind: "flow",
      caption: "Where a real FASTag debit has to pass",
      source: "PIB, 22 July 2026. If a bill cannot name this path, it is an allowance, not an electronic toll.",
      items: [
        { title: "Plaza software", body: "The gantry or the barrier plaza records the tag, the class, and the time." },
        { title: "Acquirer bank", body: "The plaza's bank takes the debit into the clearing path." },
        { title: "NPCI", body: "The central clearing house moves the user fee." },
        { title: "Issuer bank", body: "The tag issuer posts the rupee the freight bill should match." },
      ],
    },
    {
      kind: "table",
      caption: "What a truck can actually be billed under in October 2026",
      source: "PIB, 22 July 2026 and 1 October 2026. Lok Sabha reply, 30 July 2026.",
      headers: ["System", "State", "What the truck pays"],
      rows: [
        ["FASTag at a barrier plaza", "National default", "The notified fee for that plaza and vehicle class"],
        ["MLFF gantry", "Live at a named list, not every plaza", "The same FASTag fee, without a required stop"],
        ["GNSS distance billing", "Rule written in 2024. No replacement timeline", "Actual kilometres, only if that section is operating as GNSS"],
      ],
    },
    {
      kind: "callout",
      caption: "Three sentences that keep the draft honest",
      source: "Checked 8 Oct 2026. Not a ZAFTYS toll index.",
      items: [
        {
          title: "The boom can go. The section fee can stay.",
          body: "MLFF is a gantry with RFID readers and number-plate cameras. It still debits FASTag.",
          tone: "navy",
        },
        {
          title: "The car pass is not a truck product.",
          body: "The ₹3,075 annual pass is for non-commercial cars, jeeps, and vans. It does not cover a trailer.",
          tone: "teal",
        },
        {
          title: "Satellite billing has no switch-on date.",
          body: "Expert committees asked for more work on security, privacy, breach, and operational control.",
          tone: "warm",
        },
      ],
    },
  ],

  "Why a four kilometre hop can still pay for sixty": [
    {
      kind: "donut",
      caption: "One workshop kilometre. Toll is 16% of the named lines, not of every truck in India.",
      source:
        "Teaching stack only: diesel ₹22, toll ₹5, tyre ₹4.50. Those three lines sum to ₹31.50. Shares round to 70, 16, and 14. Not an NHAI tariff.",
      slices: [
        { label: "Diesel", value: 70, color: zaftysViz.navy },
        { label: "Toll", value: 16, color: zaftysViz.primary },
        { label: "Tyre", value: 14, color: zaftysViz.teal },
      ],
    },
    {
      kind: "image",
      caption: "Section fee on an open plaza. A short hop can pay for the whole notified length.",
      source: "Workshop rate only: ₹4.50 per km and a 60 km section. Not a 2026 multi-axle tariff.",
      src: "/images/blog/toll-section-fee.png",
      alt: "Open plaza section fee equals rate times notified length, with a workshop result of ₹270 for both 4 km and 60 km",
    },
    {
      kind: "table",
      caption: "Same workshop section, two different uses",
      source: "Rule 8(2) of the 2008 fee rules, as stated in the 30 July 2026 Lok Sabha reply: another plaza is not normally set within 60 km on the same section in the same direction.",
      headers: ["Use of the 60 km section", "Open plaza or MLFF", "Why"],
      rows: [
        ["4 km", "₹270", "The plaza stands for the notified section"],
        ["60 km", "₹270", "The same section fee"],
      ],
    },
  ],

  "Distance-based tolling: the GNSS rule, and who the 20 km waiver misses": [
    {
      kind: "bars",
      caption: "A 4 km hop on the workshop section. Only the GNSS columns are distance-based, and only if that section is operating.",
      source: "Teaching rate ₹4.50 per km. National permit pays actual km. Another vehicle can deduct 20 km. Open plaza and MLFF stay on the section fee.",
      unit: "₹",
      items: [
        { label: "Open plaza or MLFF", value: 270 },
        { label: "GNSS, national permit", value: 18 },
        { label: "GNSS, other vehicle", value: 0 },
      ],
    },
    {
      kind: "bars",
      caption: "The same section when all 60 km are used.",
      source: "Workshop only. A national permit truck pays the full ₹270. Another vehicle pays ₹180 after the 20 km zero.",
      unit: "₹",
      items: [
        { label: "Open plaza or MLFF", value: 270 },
        { label: "GNSS, national permit", value: 270 },
        { label: "GNSS, other vehicle", value: 180 },
      ],
    },
    {
      kind: "bars",
      caption: "The double fee is a lane mistake, not a new national fine.",
      source: "Reported 2024 rule: a vehicle without a valid GNSS unit that enters an earmarked GNSS lane pays twice the user fee. Workshop section fee ₹270, so twice is ₹540. It does not apply at a plaza with no such lane.",
      unit: "₹",
      items: [
        { label: "Section fee", value: 270 },
        { label: "Twice, wrong lane", value: 540 },
      ],
    },
    {
      kind: "image",
      caption: "GNSS fee shapes. Use them only if the section is actually operating that way.",
      source: "2024 fee-rule amendment, as reported. ₹4.50 per km is a teaching rate.",
      src: "/images/blog/toll-gnss-waiver.png",
      alt: "GNSS workshop fees: a national permit truck pays for actual kilometres, and another vehicle can deduct 20 km",
    },
    {
      kind: "table",
      caption: "One 60 km section, three ways it can be billed",
      source: "Open plaza and MLFF use the section fee. GNSS columns apply only on an operating GNSS section.",
      headers: ["Distance used", "Open plaza or MLFF", "GNSS, national permit", "GNSS, other vehicle"],
      rows: [
        ["4 km", "₹270", "₹18", "₹0"],
        ["25 km", "₹270", "₹112.50", "₹22.50"],
        ["60 km", "₹270", "₹270", "₹180"],
      ],
    },
  ],

  "Barrier-free MLFF plazas: what changes on the road": [
    {
      kind: "bars",
      caption: "MLFF on 30 July 2026. A short live list, a longer awarded list, and a much longer identified list.",
      source: "Lok Sabha unstarred question 2017, answered 30 July 2026. Five live, 17 awarded, 104 identified. Not a national switch-off of booms.",
      unit: "plazas",
      items: [
        { label: "Live", value: 5 },
        { label: "Awarded", value: 17 },
        { label: "Identified", value: 104 },
      ],
    },
    {
      kind: "table",
      caption: "Plazas named live by 1 October 2026",
      source: "PIB release 2317639. The 30 July reply had named five as live and had not yet included Shahjahanpur or Paranur. Re-check before calling a later plaza live.",
      headers: ["Plaza", "Place named in the releases", "Collection"],
      rows: [
        ["Choryasi / Chorayasi", "NH-48, Gujarat", "FASTag, barrier-free"],
        ["Mundka", "UER-II, Delhi", "FASTag, barrier-free"],
        ["Gharaunda", "NH-44, Haryana", "FASTag, barrier-free"],
        ["Daulatpura", "NH-48, Rajasthan", "FASTag, barrier-free"],
        ["Manoharpura", "NH-48, Rajasthan", "FASTag, barrier-free"],
        ["Shahjahanpur", "NH-48, Rajasthan, in the October release", "FASTag, barrier-free"],
        ["Paranur", "Tambaram to Tindivanam, Tamil Nadu", "FASTag, barrier-free"],
      ],
    },
    {
      kind: "tiles",
      caption: "What the desk changes when the boom is gone",
      source: "PIB, 1 October 2026. No minute or litre saving is claimed.",
      items: [
        {
          title: "Class before the gantry",
          body: "A wrong vehicle class is still a wrong debit. There may be no window where someone can argue it.",
        },
        {
          title: "Balance for the whole lane",
          body: "A low FASTag balance can become an electronic notice after the truck has passed.",
        },
        {
          title: "Mixed lanes stay mixed",
          body: "One trip can still see a barrier plaza and an MLFF gantry. Do not price the corridor as if every boom has gone.",
        },
      ],
    },
  ],

  "The GNSS on-board unit that was designed, and not yet ordered": [
    {
      kind: "steps",
      caption: "The 2024 design, in the order IHMCL described it",
      source: "IHMCL concept note, 29 June 2024, and the NHAI expression of interest, 7 June 2024. Not a 2026 fitment order.",
      items: [
        { title: "A location device", body: "The paper pointed at a fully compliant AIS-140 vehicle-location unit." },
        { title: "Anonymised pings", body: "Time and location would go to the toll charger with a virtual identity and the vehicle class." },
        { title: "Purpose limit", body: "Pings that are not on the tolled highway were meant to be discarded." },
        { title: "The existing tag", body: "The issuer would map the unit to the FASTag the vehicle already uses." },
        { title: "Cameras still matter", body: "A GNSS lane would still need cameras, because a unit can fail and an unequipped truck can enter it." },
      ],
    },
  ],

  "FASTag toll reconciliation on a freight bill": [
    {
      kind: "image",
      caption: "Six checks before a toll rupee is accepted",
      source: "Workshop audit. A gantry feed is live only where the product and the plaza actually provide it.",
      src: "/images/blog/toll-bill-flow.png",
      alt: "Six step toll audit from vehicle class and balance to a debit attached to the trip, with diesel kept off the line",
    },
    {
      kind: "table",
      caption: "What the toll line has to show",
      source: "PIB, 22 July 2026: a FASTag debit passes through the plaza acquirer, NPCI, and the issuer bank.",
      headers: ["Line", "Source", "Fail looks like"],
      rows: [
        ["Plaza or gantry", "FASTag statement", "A monthly lump with no place name"],
        ["Time", "Same statement", "A debit that cannot be tied to the trip"],
        ["Vehicle and class", "Tag, RC, and the body on the trip", "A truck tag on a tractor-trailer, or the reverse"],
        ["Amount", "Issuer debit", "A round allowance that nobody can re-run"],
        ["Trip", "Loading and delivery record", "A toll folder that sits outside the freight bill"],
      ],
    },
  ],

  "Twenty checks: do now, wait, and do not sign": [
    {
      kind: "table",
      caption: "Do these ten before the next toll-heavy contract",
      source: "Live FASTag and MLFF practice. Not a GNSS rollout plan.",
      headers: ["#", "Check", "Pass looks like"],
      rows: [
        ["1", "Tag inventory", "One live tag per commercial vehicle, issuer known"],
        ["2", "Class", "Tag class matches the RC and the body on the trip"],
        ["3", "Balance", "Someone owns the top-up, and a failed debit is seen the same day"],
        ["4", "Statement", "Plaza or gantry, time, class, and rupee are on the debit"],
        ["5", "Trip match", "The debit sits on the same trip as the loading date"],
        ["6", "MLFF list", "The lane is checked against the current live list"],
        ["7", "Electronic notice", "A failed read has an owner. It does not wait for month-end"],
        ["8", "Diesel line", "Toll is not inside the fuel percent"],
        ["9", "Annual pass", "No car pass has been booked against a goods vehicle"],
        ["10", "Fleet label", "Own, contract, or overflow is named; a partner tag is not booked as a company tag"],
      ],
    },
    {
      kind: "table",
      caption: "Leave these ten out until a section is actually operating as GNSS",
      source: "2024 amendment, as reported. Counsel should read the gazette before any of these lines is signed.",
      headers: ["#", "Check", "Pass looks like"],
      rows: [
        ["11", "Section status", "The clause names an operating GNSS section, not all national highways"],
        ["12", "Permit", "National permit vehicles are outside the 20 km zero"],
        ["13", "Direction and day", "20 km is per direction, per day, on that section"],
        ["14", "Distance source", "Kilometres come from the notified system, not the driver's odometer"],
        ["15", "Rate", "The rupee per km is the notified class rate, not the workshop 4.50"],
        ["16", "Lane mistake", "The double fee is written only for an earmarked GNSS lane"],
        ["17", "Unit", "Any on-board-unit line cites the rule in force, not the 2024 concept paper"],
        ["18", "Fallback", "A missing GNSS record has a written payable amount"],
        ["19", "Privacy", "Location use is limited to the tolled section and the toll charge"],
        ["20", "Reset", "If the section leaves GNSS, the contract returns to the plaza rule"],
      ],
    },
  ],
};
