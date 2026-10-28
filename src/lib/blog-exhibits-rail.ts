/** Deep-research exhibits: rail rakes versus road FTL in India. */
import { zaftysViz } from "@/lib/blog-exhibits-tms-eval";
import type { BlogExhibit, BlogKpi } from "@/lib/blog-data";

export const railKpis: readonly BlogKpi[] = [
  {
    value: "34 t",
    label: "Payable payload",
    detail:
      "The rate guide's heavy articulated example. 49 tonnes is a rigid-truck gross vehicle weight cap, not coil payload. 3,000 tonnes at 34 tonnes is 89 trips.",
  },
  {
    value: "3 clocks",
    label: "Do not mix the words",
    detail:
      "Demurrage is the wagon. Wharfage is the goods on railway land. Detention is the road truck at a plant.",
  },
  {
    value: "₹150",
    label: "Base, per eight-wheeler-hour",
    detail:
      "Corrigendum 61 of 13 March 2026, from 1 April 2026 to 31 March 2027. Beyond 96 hours the rate is six times the base. One hour on 58 wagons is ₹8,700 in the body. That is one hour, not the placement.",
  },
  {
    value: "Not one number",
    label: "Free time",
    detail:
      "Open BOXN manual load and unload are 9 hours. Mechanised load is 5. Flat BFNS manual is 8 and 8. Engine-on-load is a different table.",
  },
  {
    value: "Two ends",
    label: "A corridor does not remove them",
    detail:
      "An open dedicated freight corridor changes the rail leg. The truck at the plant and the truck at the customer stay on the invoice.",
  },
  {
    value: "D = ends / gap",
    label: "The screening line",
    detail:
      "Distance equals the two road ends divided by the gap between the road rate and the rail rate. The worked crossings stay in the chapter. They are not a national threshold.",
  },
] as const;

export const railTakeaways = [
  "Rail wins only when railway freight plus both road ends plus handling plus the stock locked in a rake is cheaper than the road fleet you would have sent.",
  "Distance equals the two road ends divided by the gap between the two rates per tonne-kilometre. There is no national distance at which rail wins.",
  "Size the road fleet on payable payload. On the 34-tonne example in the rate guide, 3,000 tonnes is 89 trucks. 49 tonnes is a gross vehicle weight cap, not coil payload.",
  "Demurrage is the wagon. Wharfage is the goods on railway land. Detention is the road truck. From 1 April 2026 to 31 March 2027 the base is ₹150 per eight-wheeler-hour. Beyond 96 hours the rate is six times the base. The April 2024 compendium still holds the free-time hours and the wharfage groups.",
  "A dedicated freight corridor changes the rail leg on the sections that are open, including double-stack where that section allows it. It does not remove the truck at each end.",
  "A rake that is not over-dimensional, and that has no leg by ship, uses one day of e-way bill validity per 200 km or part. The 20 km clock is not a rail rule.",
] as const;

export const railReferences = [
  "Railways Act, 1989. The goods tariff, the commodity class, and the composition circular for the wagon you will indent are the booking documents. This article does not reprint a class rate.",
  "[Corrigendum No. 61, 13 March 2026](https://rb.indianrailways.gov.in/uploads/directorate/traffic_comm/2026/Review%20of%20Demurrage%20Penal%20Demurrage_001.pdf), in force from 1 April 2026 to 31 March 2027. Base Rs 150 per eight-wheeled wagon per hour or part. Then plus 10 percent beyond 6 hours, plus 25 percent beyond 12, plus 50 percent beyond 24, twice beyond 48, three times beyond 72 and up to 96, and six times beyond 96 hours. That last band is the penal demurrage rate. Corrigendum No. 56 of 19 March 2025 ended on 31 March 2026. The 5 March 2026 letter is waiver and write-off, not this rate. The [April 2024 compendium](https://ccai.co.in/wp-content/uploads/2024/04/MoR-Notice-dtd-03.04.2024.pdf) still holds free time and wharfage. It is not the rate table from 1 April 2026.",
  "Free time at a non-engine-on-load goods shed, same compendium. Open wagons such as BOXN: manual load and unload 9 hours, mechanised load 5 hours, mechanised unload 7 hours. Flat wagons such as BFNS: manual 8 hours load and 8 hours unload, mechanised load 6 hours. Corrigendum No. 14 of 21 October 2020 may permit one extra hour per rake for covering open wagons with tarpaulins during loading of a loose or bulk commodity, including at an engine-on-load siding. A [3 December 2024 letter](https://rb.indianrailways.gov.in/uploads/directorate/traffic_comm/Rates_Master_Circulars/2024/Additional%20free%20time%20for%20covering%20wagons%20with%20tarpaulins%20during%20loading%20of%20loose%20bulk%20commodities%20dated%2003_12_2024.pdf) says open wagons means top-open stock such as BOXN and BOBRN. That hour is not drawn on the bars. It is not an uncovering hour and not a coil flat. A 10 September 2026 letter says the existing guidelines hold. Engine-on-load terminals are a different table.",
  "Wharfage in the April 2024 compendium is a different charge: Group I Rs 150, Group II Rs 120, Group III Rs 75 per wagon per hour. Corrigendum No. 61 does not reset it. Do not call it demurrage.",
  "National Logistics Policy, 2022, for the policy aim of a higher rail share. It is not a freight rate. Dedicated Freight Corridor Corporation of India section status for the Western and Eastern corridors should be checked the month you move. This article does not freeze a commissioned kilometre.",
  "[MoRTH S.O. 3467(E), 16 July 2018](https://taxguru.in/corporate-law/maximum-safe-axle-weight-transport-vehicles.html): the road ends of a rake stay inside axle law. The freight-rate guide uses 34 tonnes payable payload on a heavy articulated example. Do not divide a rake by the 49-tonne gross vehicle weight.",
  "[Central Goods and Services Tax Rules, 2017, Rule 138(10)](https://taxinformation.cbic.gov.in/content/html/tax_repository/gst/rules/cgst_rules/active/chapter16/rule138_v1.00.html): one day per 200 km or part for ordinary cargo, including a rake that is not over-dimensional and has no leg by ship. One day per 20 km or part for over-dimensional cargo, and for a multimodal shipment with at least one leg by ship.",
  "NITI Aayog and RMI, Fast Tracking Freight in India (June 2021), already cited on this site for road on the order of 70 percent of domestic goods movement. That is an order of magnitude for that paper's year. It is not this year's modal audit.",
] as const;

export const railExhibits: Record<string, readonly BlogExhibit[]> = {
  "What a dedicated freight corridor changes": [
    {
      kind: "table",
      caption: "What an open section changes, and what it leaves on the invoice.",
      source: "Western: Dadri side toward the Jawaharlal Nehru Port side, double-stack where the route is open. Eastern: Ludhiana side toward Sonnagar and Dankuni, opened in stages. This table does not freeze a commissioned kilometre.",
      headers: ["An open section", "Changes", "Does not change"],
      rows: [
        ["The rail path", "A freight-only alignment on the sections that are open", "A feeder that is still on Indian Railways"],
        ["Containers", "Double-stack where that section allows it", "The chassis move, which is still the container trucking guide"],
        ["The two road ends", "Nothing. The trucks stay", "Plant to siding, and railhead to customer"],
        ["The clocks", "Nothing", "Demurrage, wharfage, and the rate advice"],
      ],
    },
  ],
  "Wagon type, then the rake": [
    {
      kind: "table",
      caption: "Match the wagon to the cargo. The indent has the permissible carrying capacity.",
      source: "Usual Indian Railways types. A BOXN rake and a BCNHL rake are not the same wagon count. Do not book from a tonne band in a blog.",
      headers: ["Cargo", "Usual wagon", "Road alternative"],
      rows: [
        ["Coal, iron ore, limestone, clinker", "Open BOXN, BOXNHL", "Tipper or bulk trailer"],
        ["Bagged cement, grain, fertiliser", "Covered BCN, BCNHL", "Covered truck"],
        ["Coil, plate, billet, fabrications", "Flat BFNS, and related BRN or BFN types", "Coil trailer. Securement is the steel coil guide"],
        ["ISO containers", "BLCA or BLCB, double-stack where the route allows", "Skeletal trailer"],
      ],
    },
  ],
  "The rail cost stack": [
    {
      kind: "table",
      caption: "Seven lines. Definitions, not a second rupee workshop.",
      source: "The rupee is the rate advice and the road card. This table only separates the words.",
      headers: ["Line", "What it is", "What it is not"],
      rows: [
        ["Base haulage", "The goods tariff for the class on the rate advice", "A class remembered from a band"],
        ["First mile", "Truck from the plant to the siding or terminal", "Included in the railway receipt"],
        ["Handling", "Crane, tippler, dunnage, lashing", "Free because the rake is large"],
        ["Siding or terminal", "Private siding or private freight terminal charge", "Drayage"],
        ["Wharfage", "Goods left on railway premises past free time", "Demurrage"],
        ["Demurrage", "Wagons held past free time", "The road truck waiting at a plant"],
        ["Last mile", "Truck from the railhead to the customer", "Removed because a corridor is open"],
      ],
    },
  ],
  "Break-even distance": [
    {
      kind: "image",
      caption: "Same formula. Workshop A is 650 km. Workshop B is 1,385 km.",
      source: "D = fixed ends / (road rate minus rail rate), in rupees per tonne and rupees per tonne-kilometre. Your four inputs. Not a national threshold.",
      src: "/images/blog/rail-breakeven.png",
      alt: "Two worked break-even distances, 650 kilometres and 1,385 kilometres, from the same formula",
    },
  ],
  "Inventory and the batch": [
    {
      kind: "image",
      caption: "Six extra days on 3,000 tonnes. About ₹54 per tonne.",
      source: "Half the batch times ₹55,000 times 12 percent times 6 / 365. About ₹1.63 lakh. A pipeline average, not a treasury standard.",
      src: "/images/blog/rail-inventory.png",
      alt: "Inventory formula board showing about 1.63 lakh rupees of interest, about 54 rupees per tonne",
    },
  ],
  "A 1,400 km steel workshop": [
    {
      kind: "donut",
      caption: "One 1,400 km workshop. Not India's rail rupee.",
      source: "Rail stack ₹1,849 per tonne: rail base ₹1,260 (68%), both road ends ₹315 (17%), crane and lashing ₹180 (10%), demurrage allowance plus inventory ₹94 (5%). Slices are those shares, rounded.",
      slices: [
        { label: "Rail base", value: 68, color: zaftysViz.navy },
        { label: "Both road ends", value: 17, color: zaftysViz.primary },
        { label: "Crane and lashing", value: 10, color: zaftysViz.teal },
        { label: "Demurrage and inventory", value: 5, color: zaftysViz.warm },
      ],
    },
    {
      kind: "table",
      caption: "The same workshop in rupees. Rebuild it with the rate advice.",
      source: "3,000 tonnes. Inventory interest is the Chapter on the batch, rounded to ₹54 per tonne. 89 road trips, not a 49-tonne payload.",
      headers: ["Line", "Basis", "₹ / t"],
      rows: [
        ["Rail base", "₹0.90 per t-km × 1,400 km", "1,260"],
        ["First mile", "₹3.50 per t-km × 40 km", "140"],
        ["Last mile", "₹3.50 per t-km × 50 km", "175"],
        ["Crane, dunnage, lashing", "Allowance", "180"],
        ["Demurrage allowance", "Free time assumed met", "40"],
        ["Inventory", "Six extra days", "54"],
        ["Rail landed", "Sum", "1,849"],
        ["Road FTL", "₹2.20 per t-km × 1,400 km", "3,080"],
      ],
    },
    {
      kind: "table",
      caption: "What this workshop includes. Invented inputs. Not a quotation.",
      source: "Hot-rolled coil, 3,000 tonnes, 1,400 km between invented railheads. Transit time is not stated. Shunting, insurance, damage, and empty return are excluded.",
      headers: ["Field", "In this workshop", "What it is not"],
      rows: [
        ["Shipment", "3,000 t hot-rolled coil", "A ZAFTYS lane or a national index"],
        ["Road line-haul", "₹2.20 per t-km, ₹3,080 per tonne", "A current market quote"],
        ["Rail line-haul", "₹0.90 per t-km, ₹1,260 per tonne", "The goods tariff for your class"],
        ["First and last mile", "₹140 plus ₹175 per tonne", "Included in the railway receipt"],
        ["Handling", "₹180 allowance", "A crane tariff"],
        ["Demurrage", "₹40, and only if free time is met", "The bill if a wagon is late"],
        ["Inventory", "₹54 per tonne, six extra days", "A treasury standard"],
        ["Rail total", "₹1,849 per tonne", "A price you can book"],
        ["Excluded", "Shunting, insurance, damage, empty return", "Zero because they are missing"],
      ],
    },
  ],
  "When to keep the trucks": [
    {
      kind: "table",
      caption: "Four failures. An open corridor repairs none of them.",
      source: "The distances and the rupees are the labelled workshops in this article. They are not a national threshold.",
      headers: ["Test", "Keep the trucks when", "The number on this page"],
      rows: [
        ["Rate gap", "Rail is not cheaper per tonne-kilometre", "No crossing point. Do not divide by zero"],
        ["The two ends", "Fixed ends are large for the lane", "Workshop A crosses at 650 km. Workshop B at about 1,385 km"],
        ["The batch", "The customer does not want the rake at once", "Six extra days in the sketch is about ₹54 per tonne"],
        ["The siding and the wagon", "Free time will be missed, or the piece will not fit", "One hour on 58 wagons is ₹8,700. That is 58 times the base, not the placement"],
      ],
    },
  ],
  "Demurrage, wharfage, and FOIS": [
    {
      kind: "bars",
      caption: "Free time in hours. Non-engine-on-load goods shed.",
      source: "April 2024 compendium. Corrigendum 61 does not replace these hours. Open wagon: manual 9 and 9, mechanised load 5, mechanised unload 7. Flat wagon: manual 8 and 8, mechanised load 6. One extra hour for covering top-open wagons during loading is not drawn here. Uncovering at unload is not that hour. Engine-on-load is a different table.",
      unit: "hours",
      items: [
        { label: "Open wagon, manual load", value: 9 },
        { label: "Open wagon, manual unload", value: 9 },
        { label: "Open wagon, mechanised load", value: 5 },
        { label: "Open wagon, mechanised unload", value: 7 },
        { label: "Flat wagon, manual load", value: 8 },
        { label: "Flat wagon, manual unload", value: 8 },
        { label: "Flat wagon, mechanised load", value: 6 },
      ],
    },
    {
      kind: "bars",
      caption: "Demurrage step-up on the base rate. Reconfirm the circular.",
      source: "Corrigendum 61 of 13 March 2026, from 1 April 2026 to 31 March 2027. Base ₹150 per eight-wheeled wagon per hour or part. Six times the base applies only beyond 96 hours.",
      unit: "× base",
      items: [
        { label: "Up to 6 hours", value: 1 },
        { label: "Beyond 6, up to 12", value: 1.1 },
        { label: "Beyond 12, up to 24", value: 1.25 },
        { label: "Beyond 24, up to 48", value: 1.5 },
        { label: "Beyond 48, up to 72", value: 2 },
        { label: "Beyond 72, up to 96", value: 3 },
        { label: "Beyond 96 hours", value: 6 },
      ],
    },
    {
      kind: "image",
      caption: "58 wagons, one hour late, then the seventh hour.",
      source: "58 × ₹150 = ₹8,700. Four hours inside the first band: ₹34,800. The seventh hour is ₹165 per wagon, ₹9,570. One late wagon demurrages the group.",
      src: "/images/blog/rail-demurrage.png",
      alt: "Demurrage arithmetic for 58 eight-wheeler wagons at 150 rupees, then a 10 percent step",
    },
    {
      kind: "table",
      caption: "Wharfage is the goods. It is not demurrage.",
      source: "April 2024 compendium, per wagon per hour. Corrigendum 61 of 13 March 2026 does not reset these wharfage groups. Confirm the group before the invoice.",
      headers: ["Group", "₹ per wagon-hour", "What it is not"],
      rows: [
        ["I", "150", "Not the wagon detention charge"],
        ["II", "120", "Not a road-truck detention rate"],
        ["III", "75", "Not a number to freeze if the circular moves"],
      ],
    },
    {
      kind: "steps",
      caption: "Six stages. Each one has a document.",
      source: "FOIS shows the rake. The electronic railway receipt is the rail document. ZAFTYS TMS can hold the road legs. It is not FOIS.",
      items: [
        { title: "Indent", body: "Wagon type, wagon count, and permissible carrying capacity." },
        { title: "Placement", body: "The free-time clock starts. Size the gang for that window." },
        { title: "Load inside free time", body: "One late wagon demurrages every wagon in the group." },
        { title: "Electronic railway receipt", body: "Match it to the truck indents on both ends." },
        { title: "Destination free time", body: "Unload before the same kind of clock runs out." },
        { title: "Road dispatch", body: "Ordinary full truckload, priced as a short haul." },
      ],
    },
  ],
};
