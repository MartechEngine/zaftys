/** Deep-research exhibits: truck freight rates in India.
 * Pure TypeScript. Zero em-dashes or en-dashes; spaced hyphens only.
 */
import { zaftysViz } from "@/lib/blog-exhibits-tms-eval";
import type { BlogExhibit, BlogKpi } from "@/lib/blog-data";

export const freightRateKpis: readonly BlogKpi[] = [
  {
    value: "₹1.60-2.35",
    label: "Workshop PTKM, long heavy haul",
    detail:
      "Net rupees per tonne-kilometre for a loaded multi-axle trip longer than 800 km, after a fair margin, on a corridor that is not a dead end. Not a ZAFTYS national index.",
  },
  {
    value: "48-56%",
    label: "Diesel and DEF in this workshop",
    detail:
      "Diesel plus DEF on the ₹63.46 pre-margin stack. The donut's 50 paise is diesel alone. Diesel plus DEF is about 51 paise. The 48% to 56% band is that pair. Crisil's 50% to 60% and AITWA's 65% are different pies.",
  },
  {
    value: "₹9.03/L",
    label: "Delhi to Hyderabad diesel gap",
    detail:
      "19 Oct 2026 prints: Delhi diesel ₹95.20/L, Hyderabad ₹104.23/L. An older card near ₹87.62 in Delhi is a pre-15 May 2026 baseline.",
  },
  {
    value: "₹3.45/km",
    label: "2007-08 MAV base, not today's plaza",
    detail:
      "Fee Rules 2008, four-lane NH, 4-to-6 axle. Expressways are 1.25 times. Ganga Expressway published ₹12.60/km for multi-axle from 29 Apr 2026. Workshop corridor band: ₹7.80 to ₹11.95/km.",
  },
  {
    value: "α 0.40-0.70",
    label: "Empty-leg cost ratio",
    detail:
      "Empty running cost as a share of loaded running cost. Lane multiplier β = 1 + khali probability × α. Do not cut the invoice by 40%.",
  },
  {
    value: "8 steps",
    label: "Before anyone is ranked L1",
    detail:
      "One fuel city, one toll treatment, one detention clock, one hamali rule, one credit day. Rank net landed cost per tonne.",
  },
] as const;

export const freightRateTakeaways = [
  "A ₹/km bid, a ₹/MT bid, and a lump sum are not the same product. Normalise toll, detention, hamali, and credit before you rank them.",
  "On 19 Oct 2026 Delhi diesel was ₹95.20/L and Hyderabad was ₹104.23/L. Name the origin city. Do not freeze a tender on a pre-May ₹87 print.",
  "NHAI's 2007-08 base for a 4-to-6 axle vehicle is ₹3.45/km. The rupee on your FASTag file is the plaza notification after WPI, not that base.",
  "Standing cost on the workshop pool is ₹13.15/km at 9,500 km a month and ₹20.82/km at 6,000 km. A 48-hour gate moves the rate before diesel does.",
  "On the Jamshedpur to Pune workshop, the ₹2,950/MT bid looked ₹17,700 cheaper and landed ₹19,727 higher once toll, hamali, detention, and 60-day credit were put back.",
] as const;

export const freightRateReferences = [
  "Diesel prints for 19 Oct 2026: Delhi ₹95.20/L and Mumbai ₹97.83/L in the PPAC / IOCL metro series as republished that day ([fuelprice.co.in, 19 Oct 2026](https://fuelprice.co.in/news/petrol-diesel-prices-october-19-2026)). Hyderabad diesel ₹104.23/L the same day ([The Hindu BusinessLine](https://www.thehindubusinessline.com/fuel-prices/diesel-price-today/KbzeCKFB/hyderabad/), [Times of India](https://timesofindia.indiatimes.com/business/fuel-price/diesel-price/diesel-price-in-hyderabad)). Re-read the table on bill day.",
  "[MoRTH S.O. 3467(E), 16 July 2018](https://taxguru.in/corporate-law/maximum-safe-axle-weight-transport-vehicles.html): safe axle weights under section 58 of the Motor Vehicles Act, 1988. GVW ceiling 49 tonnes rigid and 55 tonnes for semi-articulated trailers and truck-trailers. 5% GVW tolerance for section 113(3). Pneumatic suspension: +1 tonne per axle where marked.",
  "[National Highways Fee Rules, 2008, rule 4](https://indiankanoon.org/doc/61639226/) and [PIB restatement](https://www.pib.gov.in/PressReleasePage.aspx?PRID=1983060): 2007-08 base per km on a four-lane NH. Two-axle ₹2.20, three-axle ₹2.40, MAV (4 to 6 axles) ₹3.45, seven or more axles ₹4.20. Expressway multiple 1.25. Annual revision each 1 April under rule 5.",
  "Ganga Expressway toll from 29 Apr 2026, as stated by the UPEDA chief engineer and reported the same day: multi-axle ₹12.60/km, oversized ₹16.10/km, bus and truck ₹8.20/km. A state expressway tariff, not the NHAI base table.",
  "[CGST Rules, rule 138(10)](https://taxinformation.cbic.gov.in/content/html/tax_repository/gst/rules/cgst_rules/active/chapter16/rule138_v1.00.html): e-way bill validity is one day up to 200 km, then one more day per 200 km or part, for ordinary cargo. Over-dimensional cargo uses 20 km per day.",
  "[Carriage by Road Act, 2007](https://indiankanoon.org/doc/53171702/): goods forwarding note (section 8), common-carrier liability for loss, damage, and delay (sections 10 to 12). The Act does not set a hamali tariff.",
  "Crisil, April 2026: fuel nearly 50% to 60% of transporter operating expenses. AITWA circular, 19 May 2026, as reported: diesel about 65% of running cost. Use one denominator. The diesel clause itself is in the diesel surcharge guide.",
] as const;

export const freightRateExhibits: Record<string, readonly BlogExhibit[]> = {
  "The dual realities of freight pricing in India": [
    {
      kind: "flow",
      caption: "Two rooms price the same truck. A contract card is the third room.",
      source: "Operating picture for industrial FTL. The 8% to 15% broker band is a desk range, not a statutory cap.",
      items: [
        {
          title: "Cost-plus",
          body: "The owner prices diesel, DEF, toll, tyre, EMI, permit, crew, kilometres, margin, and backhaul.",
        },
        {
          title: "Spot stand",
          body: "The nagar clears a rate from trucks free this morning and loads still waiting past noon.",
        },
        {
          title: "Signed card",
          body: "One fuel city, one toll rule, one detention clock, reviewed on a date. Not a fresh argument per headline.",
        },
      ],
    },
    {
      kind: "callout",
      caption: "What a fair card has to name",
      source: "Tender checklist. Not a ZAFTYS rate.",
      items: [
        {
          title: "Rebuildable base",
          body: "The number can be walked back to the four-stage rate engine.",
          tone: "navy",
        },
        {
          title: "One diesel clause",
          body: "Up and down, on one IOCL or PPAC print. Toll stays off that line.",
          tone: "teal",
        },
        {
          title: "Broker cut, if any",
          body: "Two tiers can add 8% to 15% without supplying the trailer. Name the owner or label the 3PL.",
          tone: "warm",
        },
      ],
    },
  ],
  "Per kilometre, per tonne, or a lump sum": [
    {
      kind: "table",
      caption: "Pick the unit from the work, then write the exclusions in the same clause.",
      source: "Contract design for industrial FTL. GMW is a commercial floor. It is not permission to cross the GVW on the RC.",
      headers: ["Unit", "Use it when", "Failure if you stay silent"],
      rows: [
        ["₹/km", "Dedicated fleet, shuttle, milk run", "A longer path or a private odometer inflates the bill"],
        ["₹/MT", "Dense bulk: steel, cement, ore", "No guaranteed minimum weight, so a light load still pays a full truck"],
        ["₹/trip", "Stable trunk lane, stable payload", "New tolls, green tax, a second drop, tarpaulin, and dunnage appear later"],
      ],
    },
  ],
  "The truck cost stack": [
    {
      kind: "donut",
      caption: "What sits inside one pre-margin rupee on the 49T workshop. 100 paise, one denominator.",
      source:
        "Rounded shares of ₹63.46 per km before margin. The 50 slice is diesel only (₹31.73 at Delhi on 19 Oct 2026, 3.0 km/L). Diesel plus DEF is about 51 paise of the same rupee. Standing ₹13.15. Toll ₹8.40. Tyre ₹3.40 plus maintenance ₹2.80. Bhatta ₹3.50 plus DEF ₹0.48. Not a Crisil pie and not a national index.",
      slices: [
        { label: "Diesel", value: 50, color: zaftysViz.navy },
        { label: "Standing cost", value: 21, color: zaftysViz.primary },
        { label: "NHAI toll", value: 13, color: zaftysViz.teal },
        { label: "Tyre and maintenance", value: 10, color: zaftysViz.warm },
        { label: "Bhatta and DEF", value: 6, color: zaftysViz.primaryBright },
      ],
    },
    {
      kind: "bars",
      caption: "Published fuel shares. Different denominators, so they are bars, not a second donut.",
      source:
        "Crisil, April 2026: fuel nearly 50% to 60% of transporter operating expenses. AITWA circular, 19 May 2026: diesel about 65% of running cost. Do not average them into the 50 paise slice above.",
      unit: "%",
      items: [
        { label: "Crisil operating expenses, low", value: 50 },
        { label: "Crisil operating expenses, high", value: 60 },
        { label: "AITWA running cost", value: 65 },
      ],
    },
    {
      kind: "table",
      caption: "Diesel ₹/km at the 19 Oct 2026 prints, loaded.",
      source: "City prints named in the references. Mileage is a workshop. 3.0 km/L is the 49T planning point used on the fuel board.",
      headers: ["Print", "₹/L", "At 2.8 km/L", "At 3.0 km/L", "At 3.2 km/L"],
      rows: [
        ["Delhi", "95.20", "34.00", "31.73", "29.75"],
        ["Hyderabad", "104.23", "37.23", "34.74", "32.57"],
      ],
    },
  ],
  "Diesel and the city print": [
    {
      kind: "image",
      caption: "Fuel rupees per km. Delhi and Hyderabad on the same 3.0 km/L engine.",
      source: "19 Oct 2026 retail prints. Workshop mileage. The +₹3.01 is 34.74 minus 31.73, which is 9.5% on the Delhi burn.",
      src: "/images/blog/freight-formula-fuel.png",
      alt: "Fuel per kilometre formula: Delhi Rs 95.20 divided by 3.0 km per litre equals Rs 31.73, Hyderabad Rs 104.23 equals Rs 34.74",
    },
  ],
  AdBlue: [
    {
      kind: "image",
      caption: "DEF litres beside diesel. The engine uses the bulk tote, not the pump.",
      source: "Workshop. 3.6% of diesel volume at 3.0 km/L is 0.012 L/km. Bulk ₹40/L is ₹0.48/km. Retail ₹55 to ₹70/L is ₹0.66 to ₹0.84/km. Not a national AdBlue index, and not a diesel clause.",
      src: "/images/blog/freight-formula-adblue.png",
      alt: "AdBlue formula: 0.036 times one divided by loaded km per litre. At 3.0 km per litre and Rs 40, that is Rs 0.48 per km",
    },
  ],
  "Tyres, maintenance, and the standing pool": [
    {
      kind: "image",
      caption: "Tyre life across 20 positions, two retreads, 200,000 km.",
      source: "Workshop prices: new tyre ₹22,000, retread ₹6,000. Output ₹3.40 per km.",
      src: "/images/blog/freight-formula-tyre.png",
      alt: "Tyre amortisation: 20 positions times Rs 22,000 plus two retreads of Rs 6,000, divided by 200,000 km, equals Rs 3.40 per km",
    },
    {
      kind: "image",
      caption: "The same monthly pool at 9,500 km and at 6,000 km.",
      source: "₹1,24,925 is EMI ₹85,000, compliance ₹16,925, and base crew ₹23,000. Bhatta is outside this pool.",
      src: "/images/blog/freight-formula-fixed.png",
      alt: "Standing cost formula: Rs 1,24,925 divided by 9,500 km is Rs 13.15, and divided by 6,000 km is Rs 20.82",
    },
  ],
  "Vehicle class and payload": [
    {
      kind: "table",
      caption: "Class names are market language. The legal ceiling is the RC plus S.O. 3467(E).",
      source: "Tare and payload are workshop bands. Confirm the registration certificate. The 5% figure is an enforcement tolerance, not saleable payload.",
      headers: ["Market name", "Legal ceiling to check", "Workshop payload", "Workshop km/L"],
      rows: [
        ["16T / 19T ICV", "GVW on the RC", "9 to 12 t", "5.0 to 6.5"],
        ["28T, 10-wheeler", "Rigid cap 49 t", "16 to 18 t", "3.8 to 4.5"],
        ["35T, 12-wheeler", "Rigid cap 49 t", "21 to 24 t", "3.4 to 4.0"],
        ["42T, 14-wheeler", "Rigid cap 49 t", "26 to 29 t", "3.2 to 3.6"],
        ["49T combination", "RC, toward 55 t if articulated", "30 to 34 t", "3.0 to 3.4"],
        ["55T semi-trailer", "55 t GCW", "34 to 37 t", "2.8 to 3.2"],
      ],
    },
    {
      kind: "bars",
      caption: "Workshop PTKM before margin. Lowest ₹/km is not lowest ₹ per tonne-km.",
      source: "16T, 28T, and 35T are teaching ratios: ₹28/km on 10 t, ₹38/km on 17 t, ₹46/km on 22 t. The 49T bar is the engine: ₹63.46/km on 34 t is ₹1.87 before margin. After 12% and β 1.05 it is ₹2.19. A's landed bid on the worked lane is ₹2.23.",
      unit: "₹ PTKM",
      items: [
        { label: "16T ICV", value: 2.8 },
        { label: "28T", value: 2.24 },
        { label: "35T", value: 2.09 },
        { label: "49T engine", value: 1.87 },
      ],
    },
  ],
  "Why the same route gets different bids": [
    {
      kind: "tiles",
      caption: "Four reasons a 30% spread can be honest and still be unauditable.",
      source: "Desk pattern. The 14% to 18% credit rate is a workshop for unsecured transporter receivables, not an RBI scheme rate.",
      items: [
        {
          title: "Who owns the asset",
          body: "Owner, broker, and managed 3PL are different products. An 8% to 15% commission layer does not buy a trailer.",
        },
        {
          title: "Where the truck goes next",
          body: "A reload in the destination city and a deadhead home are different β. Same diesel, different bid.",
        },
        {
          title: "When you pay",
          body: "₹1,18,000 at 16% for 75 extra days is about ₹3,893. It decides a close bid. It does not explain a 30% gap alone.",
        },
        {
          title: "What your gate feels like",
          body: "A plant with a chronic 48-hour wait pays in demurrage or in trucks that stop coming.",
        },
      ],
    },
  ],
  "The backhaul equation": [
    {
      kind: "image",
      caption: "β = 1 + khali probability × α. The bars are the uplift above a full return load.",
      source:
        "α is 0.40 to 0.70 of loaded running cost. Balanced trunk β 1.05 (p 0.10, α 0.50). Industrial headhaul β 1.30 (p 0.50, α 0.60). Deficit β 1.63 (p 0.90, α 0.70). The Jamshedpur engine uses β 1.05, not the 1.30 bar.",
      src: "/images/blog/freight-formula-backhaul.png",
      alt: "Backhaul formula beta equals 1 plus khali probability times alpha, with corridor results 1.05, 1.30, and 1.63",
    },
    {
      kind: "table",
      caption: "The three bars, with the probability and alpha that produce them.",
      source: "Workshop. A verbal promise that the destination always has a load is not a measured khali probability.",
      headers: ["Corridor", "Khali probability", "α", "β"],
      rows: [
        ["Balanced trunk, Delhi to Mumbai", "0.10", "0.50", "1.05"],
        ["Industrial headhaul, partial reload", "0.50", "0.60", "1.30"],
        ["Deficit, toward Guwahati or Kerala", "0.90", "0.70", "1.63"],
      ],
    },
  ],
  "Eight steps to normalise a quote": [
    {
      kind: "image",
      caption: "The eight steps as one pass. Row two reads back toward net landed cost.",
      source: "Same rules as the list under this board. Free time of 24 h load and 24 h unload is the pair this dossier writes down.",
      src: "/images/blog/freight-normalise-flow.png",
      alt: "Eight-step quote normalisation, from base fuel index through toll, detention, hamali, transit, weight, credit, and net landed cost",
    },
    {
      kind: "steps",
      caption: "Run every bid through the same eight steps. Rank NLCT, not the email subject.",
      source: "Procurement SOP. Free time of 24 h load and 24 h unload is the standard this dossier writes down. Your plant may use another pair. It may not use a different pair per bidder.",
      items: [
        { title: "Origin fuel", body: "One city, one date, IOCL or PPAC. Attach the print." },
        { title: "Toll", body: "All-in on a named plaza list, or FASTag actuals. Not both, and not neither." },
        { title: "Detention", body: "One free-time clock and one ₹/hour. Add your own gate history." },
        { title: "Hamali", body: "Labour, lashing, tarpaulin, dunnage. As applicable is not a schedule." },
        { title: "Corridor", body: "Locked route, kilometre cap, transit cap that fits the e-way bill." },
        { title: "Shortage", body: "0.2% to 0.3% of dispatch weight. Not the 5% GVW enforcement band." },
        { title: "Credit", body: "Gross every bid up to the day accounts payable actually pays." },
        { title: "NLCT", body: "Normalised trip rupees divided by billed tonnes. Keep PTKM beside it." },
      ],
    },
  ],
  "Worked lane: Jamshedpur to Pune": [
    {
      kind: "image",
      caption: "B's headline, then the costs the email left off, then A's landed trip.",
      source:
        "Workshop. Toll ₹13,272 is 26 planning plazas, not a counted gazette. Hamali ₹3,400. Detention is 20 hours at ₹1,000. Credit at 16% a year for 45 extra days on ₹1,16,972 is ₹2,307. A's normalised trip is ₹1,19,552. B lands at ₹1,39,279, which is ₹19,727 (14.2%) higher.",
      src: "/images/blog/freight-bid-waterfall.png",
      alt: "Waterfall from Transporter B headline Rs 1,00,300 through toll, hamali, detention, and credit to Rs 1,39,279, beside Transporter A at Rs 1,19,552",
    },
  ],
  "The four-stage rate engine": [
    {
      kind: "image",
      caption: "Variable, wear, and standing cost, then one margin and one beta.",
      source: "₹69,693.80 + ₹9,796.00 + ₹20,777.00 = ₹1,00,266.80. Times 1.12 is ₹1,12,298.82. Times 1.05 is ₹1,17,913.76, which rounds to ₹1,17,914.",
      src: "/images/blog/freight-formula-engine.png",
      alt: "Rate engine: variable Rs 69,693.80 plus wear Rs 9,796 plus fixed Rs 20,777, times 1.12 margin, times 1.05 beta, equals Rs 1,17,914",
    },
    {
      kind: "table",
      caption: "Jamshedpur engine. Output ₹1,17,914, within ₹86 of Transporter A's lump sum.",
      source: "Delhi ₹95.20, 3.0 km/L, DEF 3.6% at ₹40/L, toll ₹8.40/km, bhatta ₹3.50, tyre ₹3.40, maintenance ₹2.80, pool ₹1,24,925 over 9,500 km, 1,580 km, margin 12%, β 1.05.",
      headers: ["Stage", "₹/km", "₹ on 1,580 km"],
      rows: [
        ["Fuel", "31.73", "50,133.40"],
        ["DEF", "0.48", "758.40"],
        ["Toll", "8.40", "13,272.00"],
        ["Bhatta", "3.50", "5,530.00"],
        ["E_var", "44.11", "69,693.80"],
        ["E_wear", "6.20", "9,796.00"],
        ["E_fixed", "13.15", "20,777.00"],
        ["Cost", "63.46", "1,00,266.80"],
        ["After 12% and β 1.05", "74.63", "1,17,914"],
      ],
    },
  ],
  "Defaults by vehicle class": [
    {
      kind: "table",
      caption: "Workshop defaults until the fleet file replaces them. The 49T row is the engine.",
      source: "Diesel uses ₹95.20 and the midpoint mileage. DEF is 3.6% of diesel volume at a ₹40 tote. Toll is not a column: it is a plaza list, and a 16T is not on the ₹3.45 MAV base. Pools and target kilometres are per truck.",
      headers: ["Class", "km/L", "Diesel", "DEF", "Bhatta", "Tyre", "Maint.", "Pool / mo", "Target km", "Payload"],
      rows: [
        ["16T / 19T", "5.5", "17.31", "0.26", "2.00", "1.20", "1.10", "55,000", "7,000", "10 t"],
        ["28T", "4.0", "23.80", "0.36", "2.50", "1.80", "1.60", "78,000", "8,000", "17 t"],
        ["35T", "3.6", "26.44", "0.40", "3.00", "2.40", "2.10", "98,000", "8,500", "22 t"],
        ["49T / 55T", "3.0", "31.73", "0.48", "3.50", "3.40", "2.80", "1,24,925", "9,500", "34 t"],
      ],
    },
  ],
};
