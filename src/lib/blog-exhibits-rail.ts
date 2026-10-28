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
      "April 2024 compendium, reconfirm. The step-up starts after 6 hours. One hour on 58 wagons is ₹8,700 in the body of this guide.",
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
  "Demurrage is the wagon. Wharfage is the goods on railway land. Detention is the road truck. The April 2024 compendium base is ₹150 per eight-wheeler-hour. Corrigendum 56 of 19 March 2025 removed automatic penal demurrage. A notified congestion rate can still go up to six times the base after 24 hours' notice.",
  "A dedicated freight corridor changes the rail leg on the sections that are open, including double-stack where that section allows it. It does not remove the truck at each end.",
  "A rake that is not over-dimensional, and that has no leg by ship, uses one day of e-way bill validity per 200 km or part. The 20 km clock is not a rail rule.",
] as const;

export const railReferences = [
  "Railways Act, 1989. The goods tariff, the commodity class, and the composition circular for the wagon you will indent are the booking documents. This article does not reprint a class rate.",
  "[Rates Master Circular compendium, April 2024](https://ccai.co.in/wp-content/uploads/2024/04/MoR-Notice-dtd-03.04.2024.pdf), restating Corrigendum No. 32 of 13 September 2022. Base demurrage Rs 150 per eight-wheeled wagon per hour or part, then 10 percent higher after 6 hours, 25 percent after 12, 50 percent after 24, twice the base after 48, and three times after 72. [Corrigendum No. 56 of 19 March 2025](https://nfr.indianrailways.gov.in/railwayboard/uploads/directorate/traffic_comm/Review%20of%20Demurrage%20and%20Penal%20Demurrage%20(Corrigendum%20No_56)%20dated%2019_03_2025.pdf) removed automatic penal demurrage. The same letter allows a notified congestion rate, after 24 hours' notice, up to six times the base. A 13 March 2026 notice on the same subject is listed and should be read before this table is treated as the last word.",
  "Free time at a non-engine-on-load goods shed, same compendium. Open wagons such as BOXN: manual load and unload 9 hours, mechanised load 5 hours, mechanised unload 7 hours. Flat wagons such as BFNS: manual 8 hours load and 8 hours unload, mechanised load 6 hours. One late wagon demurrages every wagon in the group. Engine-on-load terminals are a different table.",
  "Wharfage in that compendium is a different charge: Group I Rs 150, Group II Rs 120, Group III Rs 75 per wagon per hour. Do not call it demurrage.",
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
        ["The siding and the wagon", "Free time will be missed, or the piece will not fit", "One hour on 58 wagons is ₹8,700 at the April 2024 base"],
      ],
    },
  ],
  "Demurrage, wharfage, and FOIS": [
    {
      kind: "bars",
      caption: "Free time in hours. Non-engine-on-load goods shed.",
      source: "April 2024 compendium. Open wagon: manual 9 and 9, mechanised load 5, mechanised unload 7. Flat wagon: manual 8 and 8, mechanised load 6. Engine-on-load terminals are a different table.",
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
      source: "Times the base of ₹150 per eight-wheeled wagon per hour. After 6 hours, 12, 24, 48, and 72. Corrigendum 56 of 19 March 2025 keeps this ordinary top at three times the base. A notified congestion rate can go up to six times after 24 hours' notice.",
      unit: "× base",
      items: [
        { label: "First 6 hours", value: 1 },
        { label: "After 6 hours", value: 1.1 },
        { label: "After 12 hours", value: 1.25 },
        { label: "After 24 hours", value: 1.5 },
        { label: "After 48 hours", value: 2 },
        { label: "After 72 hours", value: 3 },
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
      source: "Same April 2024 compendium, per wagon per hour. Confirm the group before the invoice.",
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
