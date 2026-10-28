import type { BlogSection } from "@/lib/blog-data";
import { railExhibits } from "@/lib/blog-exhibits-rail";

export const railFaqs = [
  {
    question: "When is rail freight cheaper than road freight in India?",
    answer:
      "When railway freight plus both truck ends plus handling plus the stock you lock into a full rake is below the road fleet you would have sent. The screening line is distance = fixed ends / (road rate per tonne-kilometre minus rail rate per tonne-kilometre). Workshop A on this page crosses at 650 km. Workshop B, with costlier ends, crosses at 1,385 km. There is no national distance at which rail wins. If rail is not cheaper per tonne-kilometre, there is no crossing point.",
  },
  {
    question: "What does a dedicated freight corridor change?",
    answer:
      "A dedicated freight corridor (DFC) is a freight-only alignment on the sections that are open. The Western DFC changes the rail leg of a container move toward the Jawaharlal Nehru Port side, including double-stack where the route allows. The Eastern DFC is the coal, steel, cement, fertiliser, and power belt. Neither corridor removes the truck from the plant to the siding, or from the railhead to the customer. Check Dedicated Freight Corridor Corporation of India section status the month you move.",
  },
  {
    question: "How many trucks replace a 3,000-tonne rake?",
    answer:
      "On the 34-tonne payable payload used in the freight-rate guide, 3,000 / 34 = 88.2, so 89 trips. Do not divide by 49 tonnes. That figure is a gross vehicle weight cap for a rigid truck, not coil payload. 3,000 / 49 is about 61 trucks, and that sum understates the fleet.",
  },
  {
    question: "What volume books a full rake?",
    answer:
      "The composition in the current goods circular: wagon type, number of wagons, and permissible carrying capacity (PCC). Tonnes equal wagons times PCC. A mini-rake and a two-point rake exist under their own rules. Do not take a tonne band from a blog as the booking minimum.",
  },
  {
    question: "What is the difference between demurrage, wharfage, and detention?",
    answer:
      "Demurrage is the charge for holding the railway's wagons past free time. Wharfage is the charge for goods left on railway premises past free time. Detention, in a road contract, is the truck waiting at a plant. They are three charges. Do not use one word for all three, and do not freeze one rupee rate in a standard operating procedure. Attach the current circular.",
  },
  {
    question: "How does railway demurrage step up?",
    answer:
      "On the April 2024 compendium of the Rates Master Circular, restating Corrigendum No. 32 of 13 September 2022, base demurrage is ₹150 per eight-wheeled wagon per hour or part. It is 10 percent higher after 6 hours, 25 percent after 12, 50 percent after 24, twice the base after 48, and three times after 72. One hour on 58 wagons is ₹8,700. The seventh hour is ₹165 per wagon, ₹9,570. Corrigendum No. 56 of 19 March 2025 removed automatic penal demurrage. The ordinary slabs still stop at three times the base after 72 hours. The same letter lets a zone raise the rate for congestion at a terminal or a steel plant, after 24 hours' notice, up to six times the base, for a notified period. A trade-association list includes a 13 March 2026 item headed Review of Demurrage and Penal Demurrage. Read that letter before this table is treated as the last word.",
  },
  {
    question: "Which wagon is used for steel coil?",
    answer:
      "BFNS and the related flat types are the usual stock, loaded to the diagram for that wagon. Nothing in the wagon code prevents a derailment. A coil that would be illegal on a road trailer is not made safe by being called a rake. Any leg that is a trailer still follows the steel coil guide: bed, securement, and axle groups. A piece that will not fit the wagon diagram is a road move, and if it also exceeds Rule 93 it is over-dimensional cargo.",
  },
  {
    question: "Can a manufacturer run its own wagons?",
    answer:
      "Yes, under the wagon-investment schemes Indian Railways has notified. The names and the eligible routes change. General-purpose wagons, automobile freight, special freight, and a container-train operator licence are different products. The manufacturer owns or leases the wagons. Indian Railways still runs the path. Owning a wagon is not a private railway.",
  },
  {
    question: "Does a dedicated freight corridor remove the first and last mile?",
    answer:
      "No. The truck from the plant to the siding, and the truck from the railhead to the customer, stay on the invoice. In the 1,400 km steel workshop on this page those two ends plus handling are ₹495 of a ₹1,849 rail stack, about 27 percent. Demurrage, wharfage, and the rate advice stay as well. An open section changes the rail path, including double-stack only where that section allows it. It does not change those lines.",
  },
  {
    question: "What is railway demurrage in India?",
    answer:
      "Demurrage is the charge for holding the railway's wagons past free time. The April 2024 compendium, restating Corrigendum No. 32 of 13 September 2022, sets a base of ₹150 per eight-wheeled wagon per hour or part. After 6 hours the rate is 10 percent higher, after 12 hours 25 percent, after 24 hours 50 percent, after 48 hours twice the base, and after 72 hours three times the base. One hour on 58 wagons is ₹8,700. The seventh hour is ₹165 per wagon, ₹9,570. One late wagon demurrages the whole placement. Wharfage is a different charge, for goods left on railway premises. Reconfirm the letter in force.",
  },
  {
    question: "Is penal demurrage still charged on Indian Railways?",
    answer:
      "Corrigendum No. 56 of 19 March 2025 removed the automatic penal-demurrage slab. The ordinary steps drawn on this page still run up to three times the base after 72 hours. If a terminal or a steel plant is congested, that letter allows the zone to notify a higher rate, up to six times the base, after 24 hours' notice, for a stated period. That is not the rate for an ordinary late hour. A 13 March 2026 notice is listed under the same subject. Read it before a procedure freezes these steps.",
  },
  {
    question: "What is free time for loading a BOXN or a BFNS wagon?",
    answer:
      "At a non-engine-on-load goods shed, the April 2024 compendium is not one number. Open wagons such as BOXN: manual load and unload 9 hours, mechanised load 5 hours, mechanised unload 7 hours. Flat wagons such as BFNS: manual 8 hours to load and 8 hours to unload, mechanised load 6 hours. The compendium does not state a mechanised unload time for flats. Engine-on-load terminals are a different table. Do not mix them.",
  },
  {
    question: "Why is 49 tonnes the wrong number of tonnes per truck for a coil rake?",
    answer:
      "49 tonnes is a gross vehicle weight cap for a rigid truck under MoRTH S.O. 3467(E) of 16 July 2018. It is not coil payload. The freight-rate guide uses 34 tonnes payable payload on a heavy articulated example. A 3,000-tonne rake is 3,000 / 34 = 88.2, so 89 trips. Dividing by 49 gives about 61 trucks and understates the fleet by about a third. The road rate in the workshop is already a rate per payable tonne.",
  },
  {
    question: "How long is an e-way bill valid for a rail rake?",
    answer:
      "Under CGST Rule 138(10), a rake that is not over-dimensional, and that has no leg by ship, is ordinary cargo: one day for the first 200 km, and one further day for every 200 km or part. The one-day-per-20 km clock is for over-dimensional cargo, and for a multimodal shipment with at least one leg by ship. A rail leg by itself is not that ship leg.",
  },
  {
    question: "When should a shipper keep trucks instead of booking a rake?",
    answer:
      "Keep the trucks when the rail rate is not cheaper per tonne-kilometre, because then the formula has no crossing point. Keep them when the two road ends are large for the distance, as in the workshop that crosses only at about 1,385 km. Keep them when the customer does not want the whole batch at once, when the siding cannot finish inside free time, or when the piece will not fit the wagon diagram. An open dedicated freight corridor does not repair any of those four failures.",
  },
  {
    question: "What is the difference between FOIS and a road transport system?",
    answer:
      "The Freight Operations Information System (FOIS) is how Indian Railways shows the rake. The electronic railway receipt is the rail document. A road transport system holds the two truck indents, the plant gate, and the proof of delivery. ZAFTYS TMS can hold those road legs and the document pack. It is not FOIS, and this guide does not claim a live FOIS integration.",
  },
] as const;

export const railSections: readonly BlogSection[] = [
  {
    heading: "Rail freight vs road freight in India",
    paragraphs: [
      "Rail freight vs road freight in India is a landed-cost question, not a slogan about the dedicated freight corridor. Road still carries most domestic freight. This site already treats road as on the order of 70 percent of domestic goods movement, from NITI Aayog and RMI, Fast Tracking Freight in India, June 2021. That is an order of magnitude for that paper's year. It is not this year's audit, and it is not a reason to draw a pie of road, rail, and water that you cannot attach to a table. The National Logistics Policy (2022) and the National Rail Plan treat a higher rail share as a way to cut the logistics share of GDP. The policy aim is not a rate.",
      "The commercial question is narrower. For a plant that already has a road rate per tonne, rail wins only when the railway freight plus the two road ends plus handling plus the inventory you lock into a full rake is cheaper than the road fleet you would have sent. An environmental target is a second column. It does not replace the first. A shift from diesel road to electric rail cuts tank-to-wheel carbon dioxide. The percent depends on the factor you name, a GHG Protocol set or a Central Electricity Authority grid factor for electric rail. Do not invent a percent. Green freight credits are a contract instrument if a buyer is paying for them. They are not a railway receipt.",
      "The road rupee itself is built in [how to calculate truck freight rates in India](/blog/truck-freight-rates-india-cost-rate-benchmarking-guide). This article does not rebuild diesel, toll, and a markup. It asks when that road card loses to a rake, after the trucks at each end are put back in.",
      "Four tests decide that question, and a corridor slogan fails all four. The rail rate has to be cheaper per tonne-kilometre, or the formula has no crossing point. The two road ends have to be small enough for the distance you actually run. The customer has to want the batch, because a rake is stock as well as freight. The siding has to finish inside free time, and the piece has to fit the wagon diagram. The chapters below work each test with a number you can rebuild. They do not publish a national break-even.",
    ],
  },
  {
    heading: "What a dedicated freight corridor changes",
    paragraphs: [
      "The Dedicated Freight Corridor Corporation of India has two main projects. The Western dedicated freight corridor runs from the Dadri side toward the Jawaharlal Nehru Port side of the western belt. The operational point for a shipper is double-stack container capacity and a freight-only alignment on the sections that are open. It changes the rail leg of an export or import box. It does not remove the chassis move at the port or at the inland terminal. That road leg is the [container trucking guide](/blog/container-trucking-logistics-india).",
      "The Eastern dedicated freight corridor is the coal, steel, cement, fertiliser, and power belt, from the Ludhiana side toward Sonnagar and the Dankuni end. Sections have opened in stages. A 'DFC rate' for a plant still depends on whether the rake is on the freight corridor for the long leg and on Indian Railways for the feeder. Check the section status the month you publish a case. This article does not freeze a commissioned kilometre.",
      "Most plants are not on the corridor. The rake reaches a junction, a private siding, or a private freight terminal, and a truck does the rest. That truck is ordinary full truckload (FTL), often a short haul with a high rupee per km. Ignoring it is how a rail case looks cheaper in a board pack than it is on the invoice. The feeder is priced with the freight-rate guide, not with a corridor average.",
      "Ask four questions before anyone writes 'DFC' on a slide. Is the long leg on an open freight-corridor section this month, or only on a map of the finished project? Does that open section allow double-stack, or only a single stack? Where does the rake leave the corridor and join Indian Railways for the feeder? Who owns the truck at the plant and the truck at the customer, and what do those two short hauls cost per tonne? An open section changes the rail path. It does not change demurrage, wharfage, the rate advice, or those two trucks.",
      "Container Corporation of India, or another container-train operator, can run the box train. The chassis that takes the box off the terminal is still a road move. Price it from the [container trucking guide](/blog/container-trucking-logistics-india), including the empty return of the trailer. A double-stack saving on the rail leg that is then eaten by a day of trailer detention at the terminal is not a corridor win.",
    ],
    exhibits: railExhibits["What a dedicated freight corridor changes"],
  },
  {
    heading: "Wagon type, then the rake",
    paragraphs: [
      "Match the wagon to the cargo. Coal, iron ore, limestone, and clinker in bulk usually move in open BOXN or BOXNHL wagons, against a tipper or a bulk trailer on the road. Bagged cement, grain, and fertiliser usually move in covered BCN or BCNHL wagons. Steel coil, plate, billet, and fabrications usually move on flat BFNS wagons and the related BRN and BFN types. ISO containers move on BLCA or BLCB well or flat wagons. Container Corporation of India (CONCOR), or another container-train operator, runs that train. Double-stack only where the route allows it. The chassis move at each end is still the [container trucking guide](/blog/container-trucking-logistics-india).",
      "The current composition and the permissible carrying capacity are on the indent, not in this table. A BOXN rake and a BCNHL rake are not the same wagon count. Tonnes equal wagons times permissible carrying capacity. Do not book from a tonne band in a blog. A mini-rake and a two-point rake exist under their own rules. Read those rules before you promise a small lot the railway will not place. Permissible carrying capacity is also not the road payload. A wagon that is legal at its PCC can still put an illegal axle load on the trailer that collects it.",
      "Write the loading diagram into the dispatch file the way a road gate writes the axle groups. Coil, plate, and a fabrication do not share a lashing picture because they share the letters BFNS. The diagram for that wagon is the limit. A piece that will not fit is not a rake. Securement on the road leg stays in the [steel coil guide](/blog/steel-coil-transport-basics). A road end that is a hazardous tank still needs the [chemical transportation rules](/blog/chemical-hazchem-transportation-india-peso-trem-tanker-safety).",
      "A BFNS is the usual flat for coils. It is not a statutory guarantee against derailment. The road ends also stay inside [axle and GVW limits](/blog/india-axle-load-gvw-limits-heavy-freight). Weigh the trailer that collects the coil. A legal wagon does not legalise the axle group on that trailer.",
    ],
    exhibits: railExhibits["Wagon type, then the rake"],
  },
  {
    heading: "The rail cost stack",
    paragraphs: [
      "Base haulage is the Indian Railways goods tariff for the commodity class, the distance, and any concession or station-to-station rate you have actually signed. The rate advice names the class. Class 100 is the usual base of the general scale. The advice can sit on another class, including a class outside any band you remember. The rupee is the rate advice, not a blog. Do not paste a class rate from memory into a board pack.",
      "Then the lines that sit outside base haulage. A truck from the plant to the loading siding or private freight terminal. A crane or a tippler, dunnage, and lashing. Siding or private-freight-terminal charges. Wharfage if goods wait on railway premises past free time. Demurrage if wagons are held past free time for loading or unloading. A truck from the destination railhead to the customer. Loss, moisture, and pilferage on a bulk commodity that was handled twice. Weigh both ends. The difference is a commercial tolerance you write down, the same way the road guide treats shortage. It is not 'rail always loses more.'",
      "The [cost-leaks guide](/blog/5-hidden-cost-leaks-heavy-industrial-freight-tms-3pl-guide) still applies to both road ends. Rail does not close a plant gate that holds a truck for a day. A private freight terminal charge is not drayage, and drayage is not demurrage. Keep the words apart or the invoice will not match the case.",
      "Read the seven lines as a checklist, not as a second workshop. Base haulage is the only line that comes from the rate advice. First mile, handling, the siding or private freight terminal, wharfage, demurrage, and last mile are the lines a corridor average hides. In the 1,400 km steel sketch later in this article, the two truck ends plus handling are ₹495 of a ₹1,849 rail stack, about 27 percent. That share is the sketch. Your siding will not match it. The point of the list is that each line has its own document.",
    ],
    exhibits: railExhibits["The rail cost stack"],
  },
  {
    heading: "Break-even distance",
    paragraphs: [
      "Per tonne, with one destination, road cost equals the road rate per tonne-kilometre times distance. Rail cost equals the fixed ends, plus the rail rate per tonne-kilometre times distance, plus a demurrage allowance if you want one in the screen. Fixed ends are first-mile trucking plus last-mile trucking plus handling, in rupees per tonne. Set the two costs equal and ignore demurrage for the screening line. Distance equals fixed ends divided by the gap between the road rate and the rail rate.",
      "Rail has to be cheaper per tonne-kilometre or there is no crossing point. A short lane with a costly siding never crosses, however modern the corridor looks on a map. Workshop A, a favourable feeder: fixed ends ₹650 per tonne, road ₹2.40 per tonne-km, rail base ₹1.40. The gap is ₹1.00. Distance is 650 / 1.00 = 650 km. Workshop B, a costly feeder: fixed ends ₹1,800 per tonne, road ₹2.20, rail base ₹0.90. The gap is ₹1.30. Distance is 1,800 / 1.30 = 1,384.6 km, about 1,385 km.",
      "Workshop A is one set of assumptions. Workshop B is another. Print the formula and your four inputs. Do not treat either distance as India's break-even. Add a demurrage allowance if the siding regularly misses free time. It behaves like extra fixed cost and pushes the distance out. The sentence to keep is: divide the two road ends by the gap between the two rates per tonne-kilometre.",
    ],
    exhibits: railExhibits["Break-even distance"],
  },
  {
    heading: "Inventory and the batch",
    paragraphs: [
      "A rake is a batch. About 89 road trips, the same 3,000 tonnes at 34 tonnes payload, spread over days, is a different cash cycle from one train that must be produced, loaded, and then sold. Screening interest uses half the batch as a rough pipeline average, not as a treasury standard. Cost equals that half-batch, times unit value, times the weighted average cost of capital (WACC), times extra days over 365.",
      "Workshop: 3,000 tonnes, value ₹55,000 per tonne, WACC 12 percent, rail pipeline 6 days longer than the truck plan. Average extra stock is 1,500 tonnes. Value is 1,500 × 55,000 = ₹8.25 crore. Six days at 12 percent is 8.25 crore × 0.12 × 6 / 365 = about ₹1.63 lakh. Per tonne that is about ₹54. The half-batch is a sketch. A treasury team can replace it. Do not replace the arithmetic with a round number that no longer divides.",
      "₹54 per tonne will not, by itself, overturn a freight gap of several hundred rupees. It will overturn a gap that was already close, and it gets large if the rake waits a week for a full batch the customer did not want yet. The hybrid that usually survives is rail to a regional stock point on a steady product, and road FTL for the customer's dated order. That road FTL is still [dedicated fleet](/logistics/dedicated-fleet) work, and the steady product still has to fit the wagon.",
    ],
    exhibits: railExhibits["Inventory and the batch"],
  },
  {
    heading: "A 1,400 km steel workshop",
    paragraphs: [
      "This scenario is invented so the arithmetic can be checked. It is not a ZAFTYS lane and not a freight index. Hot-rolled coil, 3,000 tonnes, 1,400 km, from an Odisha or Jharkhand railhead story to a north-Indian railhead, then a short road leg. Rebuild it with the rate advice and the road card before anyone uses it in a tender.",
      "Do not size the road fleet on 49 tonnes. That figure is a gross vehicle weight cap for a rigid truck, not coil payload. The rate guide uses 34 tonnes payable payload on a heavy articulated example. 3,000 / 34 = 88.2, so 89 trucks. 3,000 / 49 = 61.2, so about 61 trucks if someone wrongly treats gross vehicle weight as payload. That rejected sum understates the fleet by about a third. Using it will show a fake road cost as well as a fake fleet, because the per-tonne road rate in this workshop is already a rate per payable tonne, not a rate per gross tonne.",
      "Rail model, workshop inputs, per tonne. Rail base ₹0.90 × 1,400 = ₹1,260. First mile, 40 km at ₹3.50, is ₹140. Last mile, 50 km at ₹3.50, is ₹175. Crane, dunnage, and lashing, an allowance of ₹180. Demurrage allowance ₹40, assuming free time is met. Inventory ₹54 from the previous chapter. Rail landed is ₹1,849 per tonne, and ₹55,47,000 on 3,000 tonnes. Road is ₹2.20 × 1,400 = ₹3,080 per tonne, and ₹92,40,000 on 3,000 tonnes. Rail lands about ₹1,231 per tonne under road in this sketch. The two truck ends plus handling are ₹495 of the ₹1,849 rail stack, about 27 percent before you argue about the rounding of the donut. Change the rail rate to ₹1.60 per tonne-km and the rail base rises by ₹980 per tonne. The gap shrinks by that ₹980. The donut is this stack only. It is not India's rail rupee.",
      "Transit time is a second column. A rake is the Freight Operations Information System (FOIS) schedule plus loading and the two truck ends. A dedicated freight corridor helps only on the portion of the path that is actually on the corridor. The commercial home for the coil is [steel and metals](/industries/steel-metals). The commercial home for the road ends is [industrial freight](/logistics/industrial-freight).",
    ],
    exhibits: railExhibits["A 1,400 km steel workshop"],
  },
  {
    heading: "Demurrage, wharfage, and FOIS",
    paragraphs: [
      "Demurrage is the charge for holding the railway's wagons past free time. Wharfage is the charge for goods left on railway premises past free time. Detention is what a road contract calls the truck waiting at a plant. They are not the same word. Write 'free time and the stepped rate as per the circular attached to this procedure,' and attach it. Free time is not one number, and the rupee is not a band you remember.",
      "The April 2024 compendium of the Rates Master Circular, restating Corrigendum No. 32 of 13 September 2022, is the ordinary step table drawn on this page. Base demurrage is ₹150 per eight-wheeled wagon per hour or part. After 6 hours the rate is 10 percent higher, after 12 hours 25 percent, after 24 hours 50 percent, after 48 hours twice the base, and after 72 hours three times the base. Corrigendum No. 56 of 19 March 2025 removed automatic penal demurrage and kept that ordinary top at three times the base. The same letter allows a notified congestion rate, after 24 hours' notice at a terminal or a steel plant, up to six times the base. A 13 March 2026 item on the same subject is listed by a coal-consumers' association. Read it before the procedure treats March 2025 as the last word. On 58 eight-wheeler wagons, one hour at the base is 58 × 150 = ₹8,700. Four hours, still inside the first 6, is ₹34,800. The seventh hour is at ₹165 per wagon, which is ₹9,570 for that hour. One late wagon demurrages every wagon in the group. The whole placement is one unit.",
      "Free time at a non-engine-on-load goods shed, same compendium, is not one number. Open wagons such as BOXN: manual load and unload 9 hours, mechanised load 5 hours, mechanised unload 7 hours. Flat wagons such as BFNS: manual 8 hours to load and 8 hours to unload, mechanised load 6 hours. Engine-on-load terminals are a different table. Do not mix them into these bars. Wharfage in that compendium is Group I ₹150, Group II ₹120, and Group III ₹75 per wagon per hour. That is the goods. It is not demurrage.",
      "The operational control is labour and machines sized for that free time. A manual gang that cannot finish a BCN rake inside the window is a demurrage plan, not a traffic surprise. A tippler or a gantry is justified when the demurrage you already pay is larger than the machine. Count your own bills. FOIS is how the railway shows the rake. The electronic railway receipt (e-RR) is the rail document. Match it to the truck indents on both ends in the same trip file. [ZAFTYS TMS](/zaftys-tms) can hold the road legs and the document pack. It is not FOIS, and this article does not claim a live FOIS integration.",
      "Three clocks, three owners. Demurrage belongs to the operating department's wagon and to the party that held it. Wharfage belongs to the goods sitting on railway land. Detention belongs to the road contract at the plant or at the customer. A board pack that adds them into one 'delay' line will not match any of the three invoices. Attach the free-time circular to the procedure. Do not replace it with a sentence someone remembers.",
    ],
    exhibits: railExhibits["Demurrage, wharfage, and FOIS"],
  },
  {
    heading: "When to keep the trucks",
    paragraphs: [
      "Keep the trucks when any one of the four tests fails. If rail is not cheaper per tonne-kilometre, distance equals the fixed ends divided by zero or by a negative gap, and there is no crossing point. A modern corridor does not create that gap. The rate advice does.",
      "Keep the trucks when the ends are large for the lane. Workshop A on this page, fixed ends of ₹650 per tonne and a ₹1.00 gap, crosses at 650 km. Workshop B, fixed ends of ₹1,800 per tonne and a ₹1.30 gap, crosses at about 1,385 km. Both are labelled workshops. A 400 km lane with Workshop B's ends does not become a rail lane because someone remembers the shorter workshop. Print your four inputs.",
      "Keep the trucks when the customer does not want the batch. The inventory sketch is 3,000 tonnes, ₹55,000 per tonne, 12 percent, and six extra days: about ₹1.63 lakh, about ₹54 per tonne. That will not overturn a freight gap of several hundred rupees. It will overturn a gap that was already close, and it gets large if the rake waits a week for a full batch. The hybrid that usually survives is rail to a regional stock point on a steady product, and road full truckload for the dated order.",
      "Keep the trucks when the siding cannot finish inside free time, or when the piece will not fit the wagon. One late wagon demurrages the placement. On 58 eight-wheelers, one hour at the April 2024 base is ₹8,700. A coil, a plate, and a fabrication do not become safe because the indent says BFNS. If the piece also exceeds Rule 93, the road move is the [over dimensional cargo guide](/blog/odc-cargo-india-morth-hydraulic-trailer-route-survey-permits). An open freight-corridor section repairs none of these.",
    ],
    exhibits: railExhibits["When to keep the trucks"],
  },
  {
    heading: "What the dispatch file must hold",
    paragraphs: [
      "The file is the indent, the wagon type and the permissible carrying capacity, the placement time, the free-time circular you attached, the electronic railway receipt, and the two road indents. Weigh the rake and weigh the trucks. A shortage tolerance belongs in the contract, written down, not discovered at the customer. The road ends use the same gate, tare, and axle loop as any other full truckload. Under CGST Rule 138(10), a rake that is not over-dimensional, and that has no leg by ship, uses one day of e-way bill validity per 200 km or part. The one-day-per-20 km clock is for over-dimensional cargo, and for a multimodal shipment with at least one leg by ship. A rail leg by itself is not that ship leg. The billing steps are in the [e-way bill guide](/blog/epod-fastag-eway-bill-billing-india).",
      "There is no separate multimodal product page. The road leg is a [dedicated fleet](/logistics/dedicated-fleet) when it repeats, and [industrial freight](/logistics/industrial-freight) when the cargo is steel, cement, coal, or a similar plant commodity. A spot truck at a railhead is how a rake that was 'cheaper on the slide' waits for a vehicle that was never planned.",
      "Before you shift a lane, write the four break-even inputs, the payload you will actually bill, and the demurrage circular date. If any of the three is missing, the case is a slogan. The questions under this article cover the formula, the corridor, the truck count, demurrage against wharfage, the coil wagon, and owned wagons.",
    ],
  },
];
