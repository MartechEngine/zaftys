import type { BlogSection } from "@/lib/blog-data";
import { odcExhibits } from "@/lib/blog-exhibits-odc";

export const odcFaqs = [
  {
    question: "What is over dimensional cargo in India?",
    answer:
      "Over dimensional cargo (ODC) is a load that exceeds the dimension in Central Motor Vehicles Rules, 1989, Rule 93 for the vehicle and the load. GSR 414(E) of 26 June 2020 sets the ordinary sizes: an N2 or N3 goods vehicle is 2.6 m wide, 12 m long, and 4.0 m high. A semi-trailer with a tractor, and a truck-trailer or tractor-trailer, are 2.6 m wide, 18.75 m long, and 4.0 m high. A modular hydraulic trailer with a puller is 3.0 m wide, 29.0 m long, and 4.75 m high. An indivisible load is not over height at 4.0 m. The same notification allows an indivisible load up to 4.75 m high, and GSR 435(E), published on 24 June 2021, says an N2 or N3 vehicle carrying an indivisible load shall not exceed 4.75 m.",
  },
  {
    question: "What width can move without a police escort?",
    answer:
      "The width inside Rule 93 needs no ODC escort, because it is not ODC. Above that, the permission letter and the state police order set the escort. There is no single national millimetre you should print as 'no escort above this line.'",
  },
  {
    question: "How many axle lines does a 120-tonne piece need?",
    answer:
      "The 27 October 2025 circular draws the HT charts so the load per axle row does not exceed 18 tonnes. In that table, the column headed number of axles is the same unit: HT-1 is 4 and 72 tonnes, because 4 times 18 is 72. A drawing that counts the left stub and the right stub as two axles is not that count. In the workshop on this page, cargo 120 tonnes plus trailer tare 40 tonnes is 160 tonnes. At that 18-tonne unit, 160 / 18 = 8.89, so 9 lines. If one bridge is posted at 15 tonnes per line, 160 / 15 = 10.67, so 11 lines. Round up. The portal can still refuse a span. Nine lines and eleven lines are the workshop, not the statute.",
  },
  {
    question: "How long does an ODC permission take?",
    answer:
      "On the 27 October 2025 MoRTH circular, HT-1 to HT-3 can clear on payment when the route passes the bridge screen. HT-4 to HT-13 go to the regional office, which has up to 7 days to review the bridge list. If that office does not update the list, the portal treats the selected route as feasible and opens the fee. The letter still issues only after payment. Silence is not the letter, and it is not a refusal. State roads, a power-line shutdown, and a railway span are extra clocks. Those clocks are not a statutory service level you can copy from a blog.",
  },
  {
    question: "How is toll charged on a modular hydraulic trailer?",
    answer:
      "Not from the ordinary FASTag category table, once the combination no longer matches a category the lane can read. Budget the permission fee and the plaza's special-passage receipt. Do not multiply a car toll by ten and call it a rule. The FASTag and GNSS guide on this site is for ordinary trucks.",
  },
  {
    question: "Who pays if a wire hits the cargo after a valid MoRTH letter?",
    answer:
      "The MoRTH letter is a road permission. It is not a distribution-company shutdown. A feasible route on the screen is not a promise that a wire will clear the cargo. Wire lifting or isolation is a separate job with the utility. Cargo insurance and the contract decide the money. The National Highways Authority of India is not the insurer of the wire because the portal said the route was feasible.",
  },
  {
    question: "Can a mechanical low-bed carry a load taller than the Rule 93 height?",
    answer:
      "Yes, if it is permitted as over-dimensional cargo and the trailer, the axles, and the bridges can take the mass. Hydraulic equipment is for mass and for deck control. It is not the only legal way to be over height.",
  },
  {
    question: "How long is an ODC e-way bill valid?",
    answer:
      "Under CGST Rule 138(10), over-dimensional cargo is one day for the first 20 km and one further day for every 20 km or part. A 400 km leg is 20 days. A 410 km leg is 21 days. The same 20 km clock applies to a multimodal shipment that has at least one leg by ship. An ordinary in-gauge load, including a rail rake that is not over-dimensional and has no ship leg, stays on one day per 200 km or part. Confirm the rule on the portal before the method statement quotes it.",
  },
  {
    question: "Is there a national hydraulic axle trailer cost per km?",
    answer:
      "No. Split axle-line hire, the puller, fuel, route preparation, permissions, the toll receipt, empty return, and waiting. A heavy pull near 0.8 to 1.2 km per litre is a planning range for fuel, not a hire rate. On 100 km at 0.8 km per litre that is 125 litres. At the Delhi diesel print of ₹95.20 used in the freight-rate workshop, that is ₹11,900. At 1.2 km per litre it is 83.33 litres and ₹7,933. Empty return is its own quotation line. A normal per-km card does not price this move.",
  },
  {
    question: "What is the difference between ODC and OWC in India?",
    answer:
      "Over-dimensional cargo (ODC) exceeds a dimension in Central Motor Vehicles Rules, 1989, Rule 93 for the vehicle that carries it. Overweight cargo (OWC) is a mass or an axle load above what that vehicle, or a bridge on the route, may carry. A transformer can be both. A long column can be over length and still inside the axle law. The HT class on the MoRTH portal is the axle-line combination, HT-1 to HT-13, not a marketing band such as everything above a remembered tonne figure.",
  },
  {
    question: "What is the maximum height of a truck in India under Rule 93?",
    answer:
      "GSR 414(E) of 26 June 2020 substituted Rule 93. An ordinary N2 or N3 goods vehicle is 2.6 m wide, 12 m long, and 4.0 m high. A semi-trailer with a tractor, and a truck-trailer or tractor-trailer, are 2.6 m wide, 18.75 m long, and 4.0 m high. A closed body, or an ISO, fabricated, or refrigerated container, on an N-category vehicle or a semi-trailer is not above 4.52 m. A modular hydraulic trailer with a puller is 3.0 m wide, 29.0 m long, and 4.75 m high. A single module with at most eight axle rows is 3.0 m by 19.0 m by 4.75 m. An indivisible load may be up to 4.75 m high under that notification, and GSR 435(E), published on 24 June 2021, says an N2 or N3 vehicle engaged to carry an indivisible load shall not exceed 4.75 m. A divisible load stays on the 4.0 m row. These figures are not a loaded-height certificate for one piece.",
  },
  {
    question: "What are the HT-1 to HT-13 gross weights?",
    answer:
      "The MoRTH circular of 27 October 2025 draws the charts so the load per axle row does not exceed 18 tonnes. Gross vehicle weight without the puller: HT-1 is 4 axle rows and 72 tonnes, HT-2 is 6 and 108, HT-3 is 8 and 144, HT-4 is 10 and 180, HT-5 is 12 and 216, HT-6 is 14 and 252, HT-7 is 16 and 288, HT-8 is 18 and 324, HT-9 is 20 and 360. HT-10 is 8+8 and 288 tonnes, HT-11 is 10+10 and 360, HT-12 is 14+14 and 504, HT-13 is 16+16 and 576. HT-10 and HT-11 use a turn-table bolster. HT-12 and HT-13 use a girder. On HT-10 to HT-13 the attachment weight is part of gross vehicle weight and has to be declared. The circular treats the puller as a 3-axle ballast tractor of up to 25 tonnes with ballast, outside those table figures.",
  },
  {
    question: "Does silence from the regional office mean an ODC permission?",
    answer:
      "No. On HT-4 to HT-13 the 27 October 2025 circular gives the regional office up to 7 days to review the bridge list. If it does not update the list, the portal treats the selected route as feasible and opens the fee. The permission letter still issues only after payment. If the office objects because of a bridge, pick another route. A fee not paid within 7 days of the demand withdraws the system approval. HT-1 to HT-3 can clear on payment when the route passes the bridge screen.",
  },
  {
    question: "Which bridges will not get an ODC permission?",
    answer:
      "The 27 October 2025 circular will not grant a movement on a simply supported bridge of more than 50 m span that is not designed for SV loading of IRC 6, on a non-simply-supported bridge not designed for that SV loading, on HT-12 or HT-13 over a non-simply-supported bridge even when it is designed for SV loading, on a bridge coded red or orange as distressed, on a bridge already under a load restriction, or on a bridge designed by the limit-state method rather than SV loading of IRC 6. The 2012 study behind the charts does not apply to bridges designed to IRC 6 and IRC 112 limit state. A longer span than the charts cover needs its own study.",
  },
  {
    question: "What if ODC height is more than 4.75 metres?",
    answer:
      "The 27 October 2025 circular says a loaded height above 4.75 m has to use a portal route with no overhead structure, rail overbridge, road underbridge, or underpass in the way, or the permission excludes those structures and the applicant makes the diversions. Regional offices upload the physical vertical clearance. A wire that clears an empty deck may not clear the loaded height. Deck height plus cargo height is the number the survey measures.",
  },
  {
    question: "Does a MoRTH ODC letter cover state highways?",
    answer:
      "No. The letter from www.morth-owc.nic.in is a national-highway permission for one indivisible unit on HT-1 to HT-13. State highways, municipal roads, a power-line shutdown, and a railway span are separate clocks. Paragraph 13 of the 27 October 2025 circular charges the national-highway journey at ₹1,200, ₹2,400, ₹3,600, or ₹4,800 per 50 km or part, by the same HT bands, when gross combination weight including the puller stays inside the permitted limit. The Madhya Pradesh Road Development Corporation order of 14 July 2025 uses those same four bands on MPRDC roads. The state charge does not replace the national-highway fee, and neither figure is a trailer hire rate.",
  },
] as const;

export const odcSections: readonly BlogSection[] = [
  {
    heading: "What counts as over dimensional cargo",
    paragraphs: [
      "Over dimensional cargo guidelines India start from one envelope, not from a trailer brochure. GSR 414(E) of 26 June 2020, Gazette Extraordinary No. 314, substituted Rule 93 of the Central Motor Vehicles Rules, 1989, and came into force on publication. An ordinary N2 or N3 goods vehicle is 2.6 m wide, 12 m long, and 4.0 m high. N1, the two-axle row in that table, is 2.6 m wide, 6.5 m long, and 3.0 m high. A semi-trailer with a tractor, and a truck-trailer or tractor-trailer, are 2.6 m wide, 18.75 m long, and 4.0 m high. A closed body, or an ISO, fabricated, or refrigerated container, on an N-category vehicle or a semi-trailer is not above 4.52 m. A modular hydraulic trailer with a puller is 3.0 m wide, 29.0 m long, and 4.75 m high. A single module with at most eight axle rows is 3.0 m by 19.0 m by 4.75 m. For an indivisible load, the same notification permits height up to 4.75 m, and a 200 mm projection on each side when the vehicle is 2.6 m wide, with the paint and lamp conditions written in the rule. GSR 435(E) of 18 June 2021, published on 24 June 2021, inserts the N-category sentence: an N2 or N3 vehicle engaged to carry an indivisible load shall not exceed 4.75 m in overall height. A divisible load does not take that height. A load above the limit that applies to that vehicle and that load is over-dimensional. These are category limits, not a loaded-height certificate for one piece.",
      "A load is over-dimensional (ODC) when a dimension exceeds that envelope. It is overweight (OWC) when the mass, or an axle load, exceeds what that vehicle may carry, including a bridge limit below the vehicle's own rating. A transformer can be both. A long column can be over length and still inside the axle law. The [axle and GVW guide](/blog/india-axle-load-gvw-limits-heavy-freight) stops at the ordinary 49-tonne rigid and 55-tonne combination caps in MoRTH S.O. 3467(E) of 16 July 2018. That notification leaves a modular hydraulic trailer to a permission. This article is that permission.",
      "Do not use a phrase like 'Category III means everything above 150 tonnes.' The portal class is the HT number from the axle-line combination, HT-1 to HT-13. A marketing band is not the letter. A piece that still measures inside Rule 93 does not become ODC because the crate looks awkward. It also does not stay an ordinary truck because someone called the trailer a low-bed.",
    ],
    exhibits: odcExhibits["What counts as over dimensional cargo"],
  },
  {
    heading: "The trailer and the puller",
    paragraphs: [
      "A modular hydraulic trailer is a set of axle lines. Each line carries a pair of axles and a bank of tyres. Hydraulic suspension shares the load and can keep the deck level. Steering is linked so the tail follows the turn instead of cutting the corner. Three-point and four-point hydraulic circuits are how the deck is kept stable. The manufacturer's manual is the definition. A diagram on a blog is not a stability certificate.",
      "The puller is a ballast tractor. The drawbar pull has to climb the grade with the combination behind it. On a ghat the configuration may be a puller plus a pushing tractor. Power in the 400 to 650 hp class is the market conversation for heavy pullers. It is not a Ministry of Road Transport and Highways (MoRTH) minimum. Specify the grade, the combination weight, and the pull the tractor can actually deliver. A nameplate horsepower does not cross a posted bridge. The 27 October 2025 circular treats the puller, for the chart, as a 3-axle ballast tractor of up to 25 tonnes with ballast. The HT gross weights in the table are without that puller. A heavier tractor in the market does not raise the chart. It is still a vehicle the portal has to accept.",
      "The class is the axle-row combination, not a slogan. HT-1 is four axle rows and 72 tonnes. Each step up to HT-9 adds two axle rows and 36 tonnes, which is two rows at the circular's 18-tonne cap. HT-10 and HT-11 are paired modules with a turn-table bolster, 8+8 at 288 tonnes and 10+10 at 360 tonnes. HT-12 and HT-13 are girder arrangements, 14+14 at 504 tonnes and 16+16 at 576 tonnes. On HT-10 to HT-13 the weight of the attachment is part of gross vehicle weight and has to be declared on the application. Pick the class that clears the lowest bridge, not the class that looks closest to the cargo weight.",
      "Wind blades, transformers, and pressure vessels are not interchangeable loads. The lashing plan is part of the survey, not a note added on the road. The deck arrangement changes with the piece: a drop deck when height is the problem and the mass is moderate, a high girder or vessel bridge when the piece is tall, a Schnabel arrangement when the cargo itself is the structural member between two trailer sets, and an extendable deck for a blade or a long column.",
    ],
    exhibits: odcExhibits["The trailer and the puller"],
  },
  {
    heading: "Axle lines, bridges, and stability",
    paragraphs: [
      "How many axle lines is a screening sum. It is not the permission. N lines equals cargo weight plus trailer weight, divided by the allowable gross per axle line. That allowable figure is the MoRTH chart for the HT class, then reduced if a bridge on the route is posted lower. Round up. Add a line rather than 'using the tolerance.' The 5 percent enforcement allowance in the ordinary axle rules is not extra saleable tonnes, and it is not a reason to drop an axle line on a bridge.",
      "Workshop, not a permit. The 27 October 2025 circular draws the HT charts so the load per axle row does not exceed 18 tonnes. Paragraph 14.1 of that circular treats an axle row found above 18.0 tonnes during the move as a breach of the permission. That figure is still not the axle limit for an ordinary truck. The table's column headed number of axles is that same unit. HT-1 is 4 and 72 tonnes, which is 4 times 18. Count a line once. Do not count the left stub and the right stub as two. Cargo 120 tonnes plus trailer tare 40 tonnes is 160 tonnes. At that chart, 160 / 18 = 8.89, so 9 lines. If one bridge is posted at 15 tonnes per line, 160 / 15 = 10.67, so 11 lines, or a different route. Nine and eleven are the workshop applied to that cap. The same circular blocks a route on the portal when a bridge on that path is in a class the selected HT combination may not cross. The portal check is the control. The sum is how you brief the surveyor before you open the portal.",
      "A static tip angle is a screening picture, not a certificate. Theta equals the arctangent of track width over twice the height of the centre of gravity. That is the angle at which a rigid block would tip. A hydraulic trailer with a free hydraulic circuit is not a rigid block. A road cross-fall of 6 to 8 degrees is a road-geometry warning. It is not theta, and it is not a national 'maximum safe camber.' The structural engineer on the survey signs the camber limit for that combination and that cargo. Do not print a degree on this page until the cargo drawing gives the track and the centre of gravity.",
      "The charts are not a promise on every span. The circular's own summary says HT-1, HT-2, and HT-3 may be permitted on the specified bridge types and span lengths in those charts. HT-4 to HT-13 may move only up to the gross vehicle weight in the chart, or a lower figure written in a cell for that carriageway. The portal blocks a route when a bridge on it is in a class the selected combination may not cross. Simply supported spans longer than 50 m that are not designed for SV loading of IRC 6, bridges that are not simply supported and are not designed for that loading, distressed bridges coded red or orange, bridges already under a load restriction, and bridges designed by the limit-state method rather than SV loading of IRC 6 are in the refusal list for HT-1 to HT-13. HT-12 and HT-13 are also refused on bridges that are not simply supported, even when those bridges were designed for SV loading. A span or a structure the charts do not cover needs its own study.",
      "The 2012 study behind those charts covered simply supported spans from 5 m to 50 m. The circular says its recommendations do not apply to bridges designed on the limit-state principles in IRC 6 and IRC 112. Do not brief a new limit-state bridge as if the 2012 chart had already cleared it.",
    ],
    exhibits: odcExhibits["Axle lines, bridges, and stability"],
  },
  {
    heading: "The route survey",
    paragraphs: [
      "Walk or drive the road the trailer will use, in the same direction, with the loaded dimensions drawn on a pole or a model if the piece is not yet on the trailer. Record the horizontal problem and the vertical problem separately. Turning radius at junctions, roundabouts, toll mouths, and ghat hairpins is the horizontal file. The trailer steers, but the pulled length still needs the road. High-tension lines, rail overbridges, toll canopies, footbridges, and trees are the vertical file. A line that clears an empty trailer may not clear the loaded deck. Deck height plus cargo height is the number that matters.",
      "The ground file is rail level crossings, humps, and a dip that bottoms a low girder. The bridge file is the span, the posting, and the HT class the portal will accept. The report is geo-tagged photographs, the measurement, and a named engineer for any bridge or culvert that is not an obvious pass. A drone pass is a useful picture. It does not replace the measurement at the wire. If the piece is also a hazardous tank or reactor, the panel, the transport emergency card, and the vessel approval are a second file: the [chemical transportation rules](/blog/chemical-hazchem-transportation-india-peso-trem-tanker-safety). A route survey does not replace that file.",
      "There is no published national rate for how many surveys need civil work. Do not print a percentage. This route needs a wire lift, a booth moved, a tree cut, or it does not. Put that job on its own invoice. A sentence in the method statement that says 'route feasible' is not a civil contract.",
      "Loaded height above 4.75 m is a route choice, not a hope. The 27 October 2025 circular says the applicant then selects a portal route with no overhead structure, rail overbridge, road underbridge, or underpass in the loaded height, or the permission excludes those structures and the applicant makes the diversions. Regional offices are told to upload the physical vertical clearance from road level. A clearance published for an empty road is not the clearance under a loaded deck. Measure deck height plus cargo height at the wire, the canopy, and the footbridge.",
      "Write the survey so a person who was not on the drive can refuse the route. Each obstruction gets a photograph, a measurement, and a decision: pass, lift, divert, or stop. Name the engineer for any bridge or culvert that is not an obvious pass. Name the utility if a conductor is inside the loaded height. Name the police stretch if the letter will require an escort there. A drone film with no measurements is a picture, not a survey.",
    ],
    exhibits: odcExhibits["The route survey"],
  },
  {
    heading: "The MoRTH permission portal",
    paragraphs: [
      "For a single indivisible unit on HT-1 to HT-13 on national highways, the procedure in circular RW/NH-35072/01/2010-S&R(B) of 27 October 2025 is a sequence, not a login. The consignor or consignee, registered on the portal, uploads cargo dimensions, origin, and destination, and nominates a registered transporter. The transporter accepts and uploads the modular trailer, the puller, the driver, and a route with a station at least every 100 km. The portal checks puller, trailer, and driver documents from VAHAN and Sarathi. Sarathi is the Parivahan driving-licence register. A failed document cannot pay and proceed.",
      "The transporter then declares the movement conditions and picks a route the bridge screen will allow. HT-1 to HT-3: if the route passes, the fee demand is immediate and the permission letter can issue on payment. HT-4 to HT-13: the application goes to the regional office of MoRTH, the National Highways Authority of India (NHAI), or the National Highways and Infrastructure Development Corporation (NHIDCL). The circular gives that office up to 7 days to review the bridge list. If the office does not update the list in those 7 days, the portal treats the selected route as feasible and opens the fee. The letter still issues only after payment. If the office objects because of a bridge, pick another route. A fee not paid within 7 days of the demand withdraws the system approval. Silence is not the letter.",
      "State highways, municipal roads, a distribution-company shutdown, and a railway span are not covered by that national-highway letter. Paragraph 13 of the same circular sets the national-highway fee at ₹1,200, ₹2,400, ₹3,600, and ₹4,800 per 50 km or part, for HT-1 to HT-3, HT-4 to HT-6, HT-7 to HT-9, and HT-10 to HT-13, when gross combination weight including the puller stays inside the permitted limit. Madhya Pradesh Road Development Corporation, in its order of 14 July 2025, uses those same bands on its own roads. Pay the authority whose road you are on. Neither figure is a trailer hire rate. AIS-140 tracking is a condition in the circular: the portal asks whether a compliant device is fitted, and a non-compliant vehicle is not supposed to proceed. Confirm that question on the live form the week you apply.",
    ],
    exhibits: odcExhibits["The MoRTH permission portal"],
  },
  {
    heading: "Speed, escort, and the toll plaza",
    paragraphs: [
      "The permission letter sets speed, hours, escort, and parking. A speed copied from a blog is not a statute. Annexure-VI of the 27 October 2025 circular is the conditions sheet for that letter. Read the speed, the hours, the escort, the route, and the parking place off the letter you were issued. Do not freeze a kilometre-per-hour from a remembered band. Night parking belongs on a surveyed bay, not on a village shoulder. If the letter says daylight only, a night run to save a day voids the operational assumption in the insurance warranty.",
      "At a toll plaza the combination may not fit the lane. The passage is then a planned offline move: which booth, whether an island is temporarily opened, and what receipt you will get. Keep that receipt. The [FASTag and GNSS guide](/blog/fastag-mlff-gnss-tolling-india-freight) explains how an ordinary plaza bills an ordinary truck. Do not force this combination into a per-km GNSS example, and do not multiply a car toll by ten.",
      "The e-way bill clock is the other timer. Under CGST Rule 138(10), ordinary cargo is one day for the first 200 km and one further day for every 200 km or part. Over-dimensional cargo is one day for the first 20 km and one further day for every 20 km or part. The same 20 km clock applies when the shipment is multimodal and at least one leg is by ship. A rail leg by itself is not that ship leg. A 400 km over-dimensional leg is exactly 20 days. A 410 km leg is 21 days. Confirm the rule on the portal before the method statement quotes it. Part B, the vehicle number, still has to be current before the combination leaves. The billing steps are in the [e-way bill guide](/blog/epod-fastag-eway-bill-billing-india). The ordinary freight stack, diesel and toll and a markup, is a different article: [how to calculate truck freight rates in India](/blog/truck-freight-rates-india-cost-rate-benchmarking-guide).",
    ],
    exhibits: odcExhibits["Speed, escort, and the toll plaza"],
  },
  {
    heading: "How to price a project move",
    paragraphs: [
      "There is no honest single hydraulic axle trailer cost per km for India. People search for one because a normal full truckload (FTL) is priced that way. This move is not that card. Project cargo is the commercial name when the piece is a transformer, a vessel, a column, or a blade. Ask for the drawing before you ask for a rate. The shipper has to give the cargo dimensions, the cargo weight, the centre of gravity if the manufacturer issued it, the pickup and delivery addresses, how the piece will be loaded and unloaded, the delivery window, and the cargo drawing or technical note that exists. A weight with no drawing cannot pick an HT class. A drawing with no route cannot price a wire lift. Lines that are not in the file stay provisional.",
      "Split axle-line hire, the puller, fuel, route preparation, permissions, toll, empty return, and waiting. Not every line is on every move. Axle-line hire is the trailer, per day or per trip, including the days it sits under the piece. Ask for a day count from mobilisation to release. The puller is the tractor, the driver, and the ballast, separate from the trailer.",
      "Fuel is the burn of that puller, and of a second tractor if one is pushing. A heavy pull can be near 0.8 to 1.2 km per litre. That is a workshop range, not a test certificate. On 100 km at 0.8 km per litre the puller uses 125 litres. At the Delhi diesel print of ₹95.20 used in the freight-rate workshop, that is ₹11,900. At 1.2 km per litre the same 100 km is 100 / 1.2 litres, 83.33 litres, and ₹7,933. Price the litres. Do not turn the range into a hire rate per km. Route preparation is each named invoice: a wire lift, a tree cut, a temporary mat, a bypass. Permissions are the MoRTH fee, the state fee, the police escort, and the municipal receipt. Toll is the special-passage receipt. Empty return is the trailer and the puller back to base, or on to the next job. Quote that leg on its own line. Waiting is a day rate, written before the move, for a shutdown that slips or a bridge inspection that slips.",
      "A normal FTL per-km card, including the diesel clause, does not price this. The diesel post already keeps an ODC permit out of the fuel uplift. There is no honest multiple of a normal trailer rate. The operating home for a repeating heavy move is a [dedicated fleet](/logistics/dedicated-fleet). This article does not claim a ZAFTYS-owned hydraulic fleet.",
    ],
    exhibits: odcExhibits["How to price a project move"],
  },
  {
    heading: "Insurance and lashing",
    paragraphs: [
      "Cargo cover for a project piece is usually a transit or marine-cum-erection policy with a route warranty. The warranty assumes the surveyed route and the permission conditions. A shortcut that avoids a stalled escort can be the exclusion that defeats the claim. The surveyor named in the policy should see the lashing before the trailer rolls, if the slip says so.",
      "Lashing is chains, binders, and dunnage rated for the piece, in a pattern the cargo drawing allows. Weld-on lugs are a cargo-owner decision. The trailer operator does not invent attachment points on a transformer. Write the lashing plan into the method statement. A photograph of chains after the fact is not the plan.",
      "The same honesty applies to the incident story. There is no ZAFTYS count of how often a wire, a bridge, or a night run causes a loss. Count your own near misses. Use them in the next survey. Do not borrow a percentage so the chart looks finished.",
      "Before the trailer rolls, the file should be able to show four assumptions the warranty is using. The route is the surveyed route, not a later shortcut around a stalled escort. The hours are the hours on the letter. If the letter says daylight, a night run is outside that assumption. The lashing is the pattern the cargo drawing allows. The surveyor named on the slip has seen that lashing, if the slip says so. A missing assumption is a conversation with the insurer before the move, not a surprise after a claim.",
    ],
    exhibits: odcExhibits["Insurance and lashing"],
  },
  {
    heading: "What the dispatch file must hold",
    paragraphs: [
      "The file for one move is six papers, and none of them replaces the others. The permission letter, with the Annexure-VI conditions the circular attaches. The route survey. The cargo drawing, including the centre of gravity if the manufacturer issued one. The puller and modular-trailer papers, with the drivers checked on Sarathi. The utility shutdown or the police escort receipt when the survey or the letter requires it. The insurance slip, and the named surveyor's lashing sign-off if the slip requires it. A portal screenshot is not the letter. A letter is not a promise about the wire.",
      "Hold the trip in one record: the HT class, the axle-line count you briefed, the bridge that set the derate if there was one, the puller registration, and the driver checked on Sarathi. [ZAFTYS TMS](/zaftys-tms) can hold that pack and the road legs around the move. It does not issue a MoRTH permission. If the paperwork is missing, the gate stays closed. That is the same rule the [axle guide](/blog/india-axle-load-gvw-limits-heavy-freight) already states for a modular trailer.",
      "Ordinary plant windows, body choice, and a bay slot are a different guide: [planning commercial shipments](/blog/planning-industrial-shipments). Use that guide when the piece still fits Rule 93. Use this one when it does not, or when the mass needs axle lines.",
    ],
    exhibits: odcExhibits["What the dispatch file must hold"],
  },
];
