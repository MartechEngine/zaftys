import type { BlogSection } from "@/lib/blog-data";
import { freightRateExhibits } from "@/lib/blog-exhibits-freight-rates";

export const freightRateFaqs = [
  {
    question: "What is the legal difference between GVW and payload?",
    answer:
      "GVW, or GCW on a combination, is the maximum all-up weight. MoRTH notification S.O. 3467(E) of 16 July 2018 caps it by axle type, then at 49 tonnes for a rigid vehicle and 55 tonnes for a semi-articulated trailer or truck-trailer. Payload is that ceiling minus tare. The notification does not publish payload. The 5% allowance is for section 113(3) compliance. It is not extra saleable tonnes in the rate card.",
  },
  {
    question: "How should a plant settle weighbridge differences?",
    answer:
      "Write a commercial tolerance and a cash rule for the kilos beyond it. This guide's example uses 0.2% to 0.3% of dispatch weight. That is not an industry standard and not a statutory allowance. A 0.5% swing on 34 tonnes is 170 kg. The statutory 5% gross vehicle weight (GVW) band is an enforcement tolerance. Using it as the shortage clause gives away about 1.7 tonnes on a 34 tonne load.",
  },
  {
    question: "Who pays loading and unloading labour?",
    answer:
      "The Carriage by Road Act, 2007 does not set a tariff for loading and unloading labour. Indian invoices often call that charge hamali. Section 8 requires a goods forwarding note. Sections 10 to 12 deal with loss, damage, delay, and criminal acts of the carrier or their servants. The labour is allocated in the forwarding note and the freight contract. If the contract is silent, you have a dispute, not a deemed statutory charge.",
  },
  {
    question: "Why do port container drayage rates move by season?",
    answer:
      "The trailer and the box follow different empties. A harvest, a festival, or a vessel bunching can empty the driver stand while the line is still short of boxes inland. That cycle is not the domestic 49T cost stack. Read the [container trucking guide](/blog/container-trucking-logistics-india) before you paste a per tonne-kilometre (PTKM) figure onto a 20-foot drayage move.",
  },
  {
    question: "How do you calculate truck freight per km in India?",
    answer:
      "Add fuel (diesel price divided by loaded km per litre), diesel exhaust fluid (DEF), toll, and a driver trip allowance. Add tyre and maintenance. Add monthly standing cost divided by the kilometres the truck will actually run. Then apply one markup on cost and a pricing adjustment for empty-return risk. On this workshop's 49T example, Delhi diesel of ₹95.20 on 19 Oct 2026 prints about ₹74.63 per km after a 12% markup on cost and an adjustment of 1.05. That is an illustration, not a national average and not a ZAFTYS quote.",
  },
  {
    question: "What is a fair truck freight rate per tonne-km?",
    answer:
      "This dossier draws an illustrative window of ₹1.60 to ₹2.35 per net tonne-kilometre around a loaded multi-axle trip longer than 800 km, after margin, when the return is not a dead end. The edges are planning bounds, not a fitted national sample. The engine in this article is ₹74.63 per km on 34 tonnes, which is ₹2.19. Divide your own normalised trip rupees by billed tonnes, then by lane kilometres.",
  },
] as const;

export const freightRateSections: readonly BlogSection[] = [
  {
    heading: "The dual realities of freight pricing in India",
    paragraphs: [
      "Indian road freight is priced in two rooms that rarely show each other their arithmetic. Asset owners and industrial 3PLs build a rate from the truck's cost stack, then add a markup, then adjust for the chance the truck comes back empty. Truck stands and wholesale markets clear a rate from how many trucks are free that morning and how many loads are still waiting. Both numbers can be called the market on the same Tuesday. They answer different questions.",
      "Cost-plus is the right room for a plant that needs the same trailer every day. The owner can show the litres, the FASTag file, the EMI, and the kilometres. A rate that ignores that stack holds only until the owner stops placing trucks. Spot is the right room for a surge the contract fleet cannot cover. The price is a clearing price. It can sit well away from last month's card because the stand is empty, not because diesel moved by that much. How to size that overflow is in the [spot market vs dedicated fleets guide](/blog/spot-market-vs-dedicated-fleet-india).",
      "Between the plant and the truck there is often a booking agent, then a commission agent, then the owner. An unverified illustration used here is 8% to 15% of the freight across two tiers, on loads where the agent does not supply the trailer, the driver, the insurance, or the FASTag. It is not a measured national average and it is not a statutory brokerage cap. A contract card with named vehicles, or a 3PL that places its own fleet and labels any overflow, removes the tier.",
      "A card worth signing can be rebuilt from the cost stack later in this guide. Diesel moves through one clause, on one city's IOCL or PPAC print, up and down. The method is in the [diesel surcharge guide](/blog/diesel-surcharge-freight-contract-india). Toll is either inside the lump sum or reimbursed from FASTag, never both. The card is rebased on a date.",
    ],
    exhibits: freightRateExhibits["The dual realities of freight pricing in India"],
  },
  {
    heading: "Per kilometre, per tonne, or a lump sum",
    paragraphs: [
      "A full truck load in India is usually asked for as truck transport charges per km, a freight rate per tonne, or one trip fare. Those are three units, not three markets. Pick the unit from the cargo and the route, then write the exclusions in the same clause. Most bid gaps later in this guide are two units pretending to be one price.",
      "Use ₹/km for dedicated fleets, plant shuttles, and milk runs, where the route repeats and the payload changes. You are buying kilometres. The failure mode is the kilometre itself: a longer path, a private odometer photo, or a via that was never in the tender. Lock a geofenced shortest practical route and a kilometre cap. [ZAFTYS TMS](/zaftys-tms) can hold that corridor. A GPS dot that only proves the truck moved cannot.",
      "Use ₹/MT for dense bulk: steel, cement, ores, clinker, where the trailer cubes out on weight. The shipper pays for tonnes. The owner still pays for the whole vehicle. Those facts meet in the guaranteed minimum weight (GMW). Freight rupees equal the greater of actual billed tonnes and the GMW, times the ₹/MT rate. Without a GMW, the owner prices the worst payload into every bid. Dead-freight is a commercial allowance. It is not permission to cross the gross vehicle weight (GVW) on the registration certificate.",
      "Use ₹/trip on a high-frequency trunk with a stable payload and a stable route. One number is easy for a plant P&L. It is also where unlisted charges hide: a plaza that opened after the tender, a municipal green tax, a second drop, a tarpaulin, a dunnage set. Write an inclusion list. Keep extra drops, ODC permits, detention after free time, and any new plaza on their own lines. A new plaza is a FASTag pass-through. It is not a reason to reopen the whole card.",
    ],
    exhibits: freightRateExhibits["Per kilometre, per tonne, or a lump sum"],
  },
  {
    heading: "The truck cost stack",
    paragraphs: [
      "This is a carrier P&L a shipper can audit, not a ZAFTYS fleet cost file and not a national average. Every rupee per kilometre in the ₹63.46 stack is a loaded outbound kilometre. Empty kilometres are not averaged into it. Actual cost moves with the vehicle, the payload, the route, monthly kilometres, the fuel city, the plaza list, and that fleet's own EMI and crew. Variable running cost is diesel, AdBlue, an outbound toll assumption, and a driver trip allowance. Wear is tyres and maintenance on the same loaded-kilometre basis. Fixed cost is the monthly standing pool, divided by the kilometres the truck actually runs. The allowance is not also inside the standing pool.",
    ],
    subsections: [
      {
        heading: "Diesel and the city print",
        exhibits: freightRateExhibits["Diesel and the city print"],
        paragraphs: [
          "Loaded consumption on a 49T class trailer in this workshop is 2.8 to 3.2 km per litre on the highway, with the load on. Fuel rupees per km equal the diesel price divided by that mileage. Empty running is handled in the backhaul factor, not by pretending the loaded figure is a round trip.",
          "On the 19 Oct 2026 Delhi print of ₹95.20 per litre, PPAC's own IOCL-outlet note, 3.0 km/L is ₹31.73 per km. The same mileage at a Hyderabad reprint of ₹104.23 per litre is ₹34.74 per km. That is ₹3.01 per km before any toll. State VAT is already inside the retail print. You do not add it again. You do name the city and the date. Delhi is the official observation. Hyderabad is a newspaper reprint of the city price, not a second PPAC metro row. An older card of Delhi near ₹87.62 matches the neighbourhood of the pre-15 May 2026 print (the May hike took Delhi from ₹87.67 to ₹90.67). It is a base-date candidate for an old contract. It is the wrong baseline for a tender written in October 2026, and none of these prints is a permanent benchmark.",
        ],
      },
      {
        heading: "AdBlue",
        exhibits: freightRateExhibits["AdBlue"],
        paragraphs: [
          "BS-VI trucks with selective catalytic reduction consume diesel exhaust fluid (DEF) with the diesel. This workshop uses 3.2% to 4.0% of diesel volume. At 3.0 km/L and 3.6%, that is 0.012 litres of DEF per km. A bulk tote at ₹36 to ₹44 per litre is about ₹0.43 to ₹0.53 per km. Pump retail at ₹55 to ₹70 per litre is about ₹0.66 to ₹0.84 per km. The engine later uses ₹40 per litre, which is ₹0.48 per km. Those tote and pump bands are workshop prices, not a national AdBlue index.",
          "DEF is not diesel. A fuel clause that swallows it cannot be audited when AdBlue moves and diesel does not. AITWA's May 2026 note already listed DEF as a cost that rose beside diesel. Keep it on its own line, or inside the base rate with its own review.",
        ],
      },
      {
        heading: "NHAI tolls",
        paragraphs: [
          "The National Highways Fee (Determination of Rates and Collection) Rules, 2008, rule 4, set the base year 2007-08 rate per km for a four-lane national highway. PIB has restated the same table: two-axle bus or truck ₹2.20, three-axle ₹2.40, multi-axle (four to six axles) ₹3.45, oversized vehicles (seven or more axles) ₹4.20. An expressway is 1.25 times the four-lane rate. A costly bypass is 1.5 times. Fees are revised each 1 April under rule 5: 3% a year without compounding from 1 April 2008, plus 40% of the WPI movement. In 2026 NHAI restored a WPI linking factor of 1.641 after a period at 1.561. The factor links index series. It is not itself the rupee per km.",
          "There is no single national MAV rupee for 2026. Each plaza is notified. Two public anchors are enough to stop a fake national number. The 2007-08 base is ₹3.45 per km. The Ganga Expressway, opened to toll on 29 Apr 2026, published ₹12.60 per km for multi-axle and ₹16.10 for oversized vehicles. That is a state expressway tariff. The workshop band used here for a mixed NHAI industrial corridor is ₹7.80 to ₹11.95 per km. Use it to sense-check a bid. Replace it with the FASTag statement before you award. Cash without a valid FASTag has been charged at a multiple of the tag fee. A contract that reimburses toll should say the FASTag fee, not the penalty multiple. Barrier-less gantries are covered in the [FASTag, MLFF, and GNSS guide](/blog/fastag-mlff-gnss-tolling-india-freight).",
        ],
      },
      {
        heading: "Tyres, maintenance, and the standing pool",
        exhibits: freightRateExhibits["Tyres, maintenance, and the standing pool"],
        paragraphs: [
          "A heavy tractor-trailer in this workshop carries 18 to 22 radial positions. The life model is 100,000 km original plus two cold retreads of 50,000 km each, so 200,000 km per position. Twenty positions, a ₹22,000 tyre, and a ₹6,000 retread land on ₹3.40 per km: 20 times ₹34,000, divided by 200,000. A fleet that buys a dearer tyre or kills casings early will not see ₹3.40. Ask for the casing count. Maintenance sits beside that at ₹2.80 per km for oil, grease, brake lining, and suspension. Together, wear is ₹6.20 per km.",
          "The standing pool in this example is ₹1,24,925 a month: EMI ₹85,000 (inside an unverified desk range of ₹78,000 to ₹92,000 for a 55T tractor-trailer), compliance ₹16,925, and base crew salary ₹23,000. The driver trip allowance is not in this pool, so it is not counted twice. Third-party cover is compulsory. Comprehensive cover is a contract choice. The rupees are not an IRDAI premium table and not a ZAFTYS fleet file. A national permit for a goods carriage sits under section 88 of the Motor Vehicles Act. Form 48 is widely used as the application. Use the form your RTO accepts.",
          "Divide ₹1,24,925 by 9,500 km and the standing cost is ₹13.15 per km. Divide the same pool by 6,000 km and it is ₹20.82 per km, which is ₹7.67 per km more. On a 1,580 km trip that difference is about ₹12,100. Fewer monthly kilometres raise fixed cost per kilometre. This comparison does not show that a gate delay always cuts a truck from 9,500 km to 6,000 km. That claim would need the fleet's own kilometre file. Gate design is still the subject of the [plant TAT guide](/blog/plant-detention-tat-yard-gate-india) and of the [cost leaks guide](/blog/5-hidden-cost-leaks-heavy-industrial-freight-tms-3pl-guide).",
        ],
      },
    ],
    exhibits: freightRateExhibits["The truck cost stack"],
  },
  {
    heading: "Vehicle class and payload",
    paragraphs: [
      "MoRTH notification S.O. 3467(E), dated 16 July 2018, fixes maximum safe axle weight. Gross vehicle weight shall not exceed the sum of those axle weights, and shall not exceed 49 tonnes for a rigid vehicle or 55 tonnes for a semi-articulated trailer or truck-trailer, other than a modular hydraulic trailer. A tolerance of 5% of GVW is allowed for compliance with section 113(3). Pneumatic suspension permits 1 tonne extra per axle where the notification marks it. That is a legal ceiling. Payload is permissible GVW minus tare. Tare is on the registration certificate and on your weighbridge. A 49T trailer in a broker's message is often the GCW class, not 49 tonnes of steel.",
      "The 5% tolerance is an enforcement allowance for scale variation. It is not a commercial payload you may sell in the tender. Loading to the ceiling plus 5% as a routine plan is how trucks get offloaded at a highway weighbridge. The full axle note is in the [GVW guide](/blog/india-axle-load-gvw-limits-heavy-freight).",
      "Running cost per kilometre rises with the vehicle. Freight cost per tonne-kilometre falls while the extra tonnes are legal and the truck is full. PTKM here means rupees per km divided by net billed tonnes, after the GMW, not the class name on the door. The same 34 tonnes and the same 1,580 km are used for the engine and for the worked bids. In the teaching ratios, a 16T at ₹28 per km and 10 tonnes is ₹2.80 PTKM before any markup. Those smaller-class ratios are illustrations, not surveyed fares. The 49T engine is ₹63.46 per km on 34 tonnes, which is ₹1.87 before markup. After a 12% markup on cost and a pricing adjustment of 1.05 that is ₹74.63 per km, or ₹2.19 PTKM. A's landed bid on the worked lane is ₹2.23. A shipper who awards the lowest ₹/km will prefer the smaller truck and pay the worse PTKM. The ₹1.60 to ₹2.35 window is an illustrative envelope drawn around that kind of long heavy haul. Its edges are not the output of a national sample. A bid inside the window is not automatically fair.",
    ],
    exhibits: freightRateExhibits["Vehicle class and payload"],
  },
  {
    heading: "Why the same route gets different bids",
    paragraphs: [
      "Picture a 30% spread on one lane, with four causes hiding inside one number. That 30% is a hypothetical. It is not a surveyed result for Indian freight, and this article has no sample of routes, vehicle classes, or dates behind it. The spread is not, by itself, evidence that one owner is dishonest. It is a reason to check whether the tender asked for a price and forgot the conditions.",
      "The first cause is who owns the asset. A direct owner prices EMI, diesel, driver, and a margin. A broker prices the owner's number plus the commission layer. A managed 3PL prices a placement SLA. Comparing the three on headline ₹/MT is a category error.",
      "The second is where the truck has to go next. An owner who will reload after your delivery can price the headhaul without a full empty return. An owner who will deadhead prices those kilometres into your coil. The next chapter writes that risk as β, a multiplier on the one-leg cost. It is not a percentage discount off the invoice.",
      "The third is when you pay. This workshop uses 14% to 18% a year as an assumed cost of an unsecured transporter receivable. It is not an RBI scheme rate. On ₹1,18,000 at 16% for 75 extra days, from a 15-day promise to a 90-day paper cycle, the drag is about ₹3,893. That is about 3.3% of freight. It can decide a close bid. It will not, on its own, explain a hypothetical 30% gap. It will come back dressed as a diesel revision if you refuse to write it down.",
      "The fourth is your gate. Drivers talk. A plant with a chronic 48-hour wait earns a premium, or a shortage of trucks, or both. Owners who already have a bay window inside a dedicated fleet do not price the same fear. If your history shows 48 hours and your bid sheet shows a 24-hour free time, the cheap bid is renting optimism.",
    ],
    exhibits: freightRateExhibits["Why the same route gets different bids"],
  },
  {
    heading: "The backhaul equation",
    paragraphs: [
      "Industrial India does not produce and consume in the same district. Steel, cement, and project cargo move out of eastern and western producing belts. Consumption centres send back a thinner mix. The truck still has to return. Balanced trunks reload at both ends. Primary headhauls get a partial reload. Dead-end corridors, including much of the Northeast, parts of Kerala, and Jammu and Kashmir lanes with thin return industry, send the truck home empty.",
      "This chapter uses β as a commercial pricing adjustment, not as a physical recalculation of fuel, toll, tyres, or salary. Call α an assumed share of loaded running cost that an empty leg might still consume. This dossier uses 0.40 to 0.70. It is not a measured empty-leg invoice. An empty truck still burns fuel, usually less fuel, can still meet toll plazas, and does not pay loading labour. Those return-leg costs can differ from the outbound leg. A return load depends on the corridor, the week, the vehicle, and whether the cargo on offer fits. The adjustment used here is β = 1 + empty-return probability × α. Empty-return probability is the chance the truck runs home without cargo. It is not the percentage by which every cost line grew, and it is not a discount off the invoice. If a return load covers only part of the empty-leg cost, scale α down by the credit you can show.",
      "A balanced lane with a 10% chance of running empty and α of 0.50 has β of 1.05. A lane empty half the time at α of 0.60 has β of 1.30. A dead end at 0.90 and 0.70 has β of 1.63. Under this pricing convention, that last case means the outbound shipper is asked to pay 63% above the marked-up one-leg cost because a return load is unlikely. It does not mean each cost line was remeasured and found to be 63% higher. Paying a round-trip kilometre rate on top of β is paying the empty risk twice. In the rate engine, β is applied once, after the 12% markup on cost, to the one-leg trip. The ₹8.40 per km toll inside the ₹63.46 stack is the outbound workshop assumption only. β does not attach a second plaza list. Replace β with the lane's own empty-running record before you sign.",
      "Return cargo credit should be a line the operator can show: the reload customer, the rate, and the kilometres. A verbal promise that the destination always has a load is a sales meeting. GPS is the measurement. How those empty kilometres show up in fleet planning is in the [empty return guide](/blog/reduce-empty-return-trips). Container lanes add a second empty, the box back to the port or ICD. Use the [container trucking guide](/blog/container-trucking-logistics-india) for that cycle, and keep domestic FTL β here.",
    ],
    exhibits: freightRateExhibits["The backhaul equation"],
  },
  {
    heading: "Eight steps to normalise a quote",
    paragraphs: [
      "Run every bid through the same eight steps before anyone is ranked L1. The output is net landed cost per tonne, not the number in the subject line.",
      "Freeze one origin fuel city and one date. For a single dispatch point, use IOCL retail diesel in that city. For a lane that refuels in several states, name PPAC and the weighting. Convert every bid to one toll treatment: the lump sum contains the plazas listed in the tender, or every bid adds the same FASTag estimate and later bills actuals. Use one free time for the whole tender. This example's contract pair is 24 hours to load and 24 hours to unload. That is not a claim that every Indian plant or transporter uses those hours. Demurrage after that is one ₹/hour by vehicle class. Add your last quarter's overrun to every bidder who does not already have a booked window.",
      "Loading and unloading labour, lashing, tarpaulin, and dunnage are either in the rate or on a schedule. Invoices in India often call the labour hamali. Lock the route, the kilometre cap, and a transit cap that fits e-way bill validity. Write a commercial shortage tolerance. This example uses 0.2% to 0.3% of dispatch weight. That is not an industry standard, and it is different from the 5% GVW enforcement tolerance under section 113(3). That tolerance is not permission to load extra payload. Gross every bid up to the credit your company actually pays. This workshop uses 16% a year when the contract is silent. That rate is an assumption, not an RBI scheme rate.",
      "Net landed cost per tonne (NLCT) is the normalised trip rupees divided by billed tonnes. PTKM is that NLCT divided by lane kilometres. The fuel clause that matches step 1 is a share of the diesel percent, applied to base freight only: uplift percent = S × (price now - price base) / price base × 100. S is the diesel share of base freight on that lane, from litres per km. Do not also apply the AITWA 0.65 card. Down as well as up. Toll, detention, handling, and empty kilometres stay outside.",
    ],
    exhibits: freightRateExhibits["Eight steps to normalise a quote"],
  },
  {
    heading: "Worked lane: Jamshedpur to Pune",
    paragraphs: [
      "Illustrative workshop, not a universal market result and not a ZAFTYS invoice. Steel coil. Planning distance 1,580 km on a locked corridor. Vehicle class: 49T tractor-trailer. Payable payload 34 tonnes, not gross vehicle weight, and the same 34 tonnes used in the PTKM lines. Lane volume 40 trips a month. That volume is about seven trucks if each runs near 9,500 km. Do not divide fixed cost by 40 × 1,580. One truck cannot do 63,200 km in a month. The ₹19,727 gap below depends on the detention, the handling charges, the payment terms, and the 16% financing rate assumed here.",
      "Transporter A quotes a full-truck lump sum of ₹1,18,000. It includes the tender plaza list, loading and unloading labour, lashing, tarpaulin, and a dedicated bay window. The payment term on the quote is 30 days from the invoice date. Transporter B quotes ₹2,950 per tonne of payable payload, with tolls at actuals. On 34 tonnes that is ₹1,00,300, which looks ₹17,700 cheaper. B's rate is valid for payment in 15 days from the invoice date, with 24 hours to load and 24 hours to unload free, then ₹1,000 per hour. Those clocks are this example's contract terms.",
      "Both sides should have attached the same workshop FASTag stack: 26 planning plazas, ₹13,272, which is ₹8.40 per km. That count is a workshop so the arithmetic can be checked. It is not a counted NHAI gazette. Replace it with the live statement before award. The plant pays this lane on a 60-day cycle. Last quarter, trucks without a booked window waited 20 hours past the 24-hour loading free time.",
      "Put the pieces back under those assumptions. None of these figures is a verified toll receipt or a published invoice. B adds ₹13,272 of illustrative toll and ₹3,400 of handling, lashing, and tarpaulin, and is then at ₹1,16,972, only about ₹1,000 under A's lump sum. The ₹3,400 is this example's allowance for loading and unloading labour, lashing, and tarpaulin. It is not a statutory schedule. The 20 hours past B's free time add ₹20,000, which is 20 × ₹1,000. This example treats the plant as paying 60 days from the invoice date. That is 30 days past A's quoted term and 45 days past B's quoted term. Financing at 16% a year is charged on the amount outstanding before detention: ₹1,552 on A's ₹1,18,000, and ₹2,307 on B's ₹1,16,972. Detention is not financed a second time inside the ₹2,307. Normalised trips, before GST: A ₹1,19,552, B ₹1,39,279. NLCT: ₹3,516 against ₹4,096 per tonne on 34 tonnes. PTKM: ₹2.23 against ₹2.59 on 1,580 km. B was ₹17,700 cheaper in the email and ₹19,727 more expensive after these eight steps. Change the detention, the handling, or the financing rate and that gap moves. A's ₹2.23 sits inside the illustrative ₹1.60 to ₹2.35 window. B's ₹2.59 sits above it because the quote was not a complete trip, not because it failed a national index.",
    ],
    exhibits: freightRateExhibits["Worked lane: Jamshedpur to Pune"],
  },
  {
    heading: "The four-stage rate engine",
    paragraphs: [
      "Build this in a sheet or in the TMS. Four stages. One lane. One vehicle class. Variable running expense is fuel plus DEF plus the outbound toll plus the driver trip allowance, times loaded lane km. Wear is tyres plus maintenance, times the same kilometres. Fixed cost is the monthly standing pool divided by expected kilometres, times lane km. The trip rate is that sum, times one plus a markup on cost, times β. The 12% used below is a markup on cost. It is not a 12% margin on the selling price. On the selling price, 12 divided by 112 is about 10.7%. GST is not inside the trip rate.",
      "On this lane the inputs are Delhi diesel at ₹95.20 on 19 Oct 2026, 3.0 km per litre, DEF at 3.6% and ₹40 per litre, an outbound toll assumption of ₹8.40 per km, a driver trip allowance of ₹3.50 per km, tyre ₹3.40, maintenance ₹2.80, the ₹1,24,925 pool over 9,500 km, 1,580 loaded km, a 12% markup on cost, and a pricing adjustment β of 1.05. Fuel is 95.20 divided by 3.0, which is ₹31.73 per km. Variable cost is ₹69,693.80. Wear is ₹9,796. Fixed cost is ₹20,777. The sum is ₹1,00,266.80. Times 1.12 is ₹1,12,298.82. Times 1.05 is ₹1,17,913.76, shown as ₹1,17,914. That figure is before GST. Transporter A's ₹1,18,000 is that engine within ₹86. It is not an official ZAFTYS quotation.",
      "If monthly kilometres are 6,000 instead of 9,500, replace ₹13.15 with ₹20.82. Fixed cost on the trip becomes about ₹32,896, and the trip rate moves by roughly ₹14,000 before you touch diesel. That is what lower utilisation does to this pool. It is not proof that one slow gate produced the missing 3,500 km. Truck transport charges per loaded kilometre on this workshop are ₹63.46 before markup. After the 12% markup and β of 1.05 they are ₹74.63 per km, or ₹2.19 per tonne-km on 34 tonnes.",
    ],
    exhibits: freightRateExhibits["The four-stage rate engine"],
    subsections: [
      {
        heading: "Defaults by vehicle class",
        exhibits: freightRateExhibits["Defaults by vehicle class"],
        paragraphs: [
          "Use these only until the fleet file replaces them. Diesel rupees per km use ₹95.20 and the midpoint mileage. Toll is a sense-check band, not a gazette. Standing pools and target kilometres are per truck, not per lane.",
          "A 16T or 19T plans at 5.5 km/L (₹17.31 of diesel), DEF ₹0.26, a driver allowance of ₹2.00, tyre ₹1.20, maintenance ₹1.10, a ₹55,000 monthly pool, 7,000 km, and 10 tonnes for PTKM. A 28T plans at 4.0 km/L (₹23.80), DEF ₹0.36, allowance ₹2.50, tyre ₹1.80, maintenance ₹1.60, ₹78,000, 8,000 km, 17 tonnes. A 35T plans at 3.6 km/L (₹26.44), DEF ₹0.40, allowance ₹3.00, tyre ₹2.40, maintenance ₹2.10, ₹98,000, 8,500 km, 22 tonnes. The 49T / 55T column is the engine above, with 34 tonnes on the PTKM line. These rows are planning defaults, not surveyed fares.",
        ],
      },
    ],
  },
  {
    heading: "What belongs in the tender file",
    paragraphs: [
      "Keep four citations with the rate card. MoRTH S.O. 3467(E) of 16 July 2018 for axle weights, the 49 tonne rigid cap, the 55 tonne combination cap, and the 5% section 113 tolerance. CGST rule 138(10) for e-way bill validity: one day up to 200 km, then one more day per 200 km or part, for ordinary cargo. A 1,580 km trip needs an eight-day validity plan. Over-dimensional cargo uses 20 km per day. The Carriage by Road Act, 2007 for the goods forwarding note and carrier liability, and the National Highways Fee Rules, 2008 for vehicle categories and the 2007-08 base rates. Plaza notifications remain the amount you pay.",
      "A rate you can defend has a city diesel print, a plaza list, a free-time clock, a GMW, a credit day counted from a named event, and a β that matches the return load you can see on GPS. Before you accept a quotation, confirm the vehicle, the payable payload, whether toll and handling sit inside the rate, the detention clock, and the tax treatment. Headline L1 without those facts is how the worked lane spends an extra ₹19,727 a trip, under its own assumptions, and still looks like a saving in the email. The questions under this article cover GVW versus payload, weighbridge tolerance, loading labour, port drayage, the per-km build, and the PTKM window.",
      "ZAFTYS runs this arithmetic on [dedicated fleets](/logistics/dedicated-fleet) and on [contract logistics](/logistics/contract-logistics) rate cards, with the corridor locked in [ZAFTYS TMS](/zaftys-tms). [Freight rate intelligence](/intelligence/freight-rates) is the lane view, with the limits written on that page. It is not a substitute for your FASTag file or your diesel print. Send origin, destination, vehicle class, payload, and whether toll sits inside the rate. The bids you already have can be normalised before anyone is crowned L1.",
    ],
  },
];
