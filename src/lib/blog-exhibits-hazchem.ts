/** Deep-research exhibits: chemical and hazchem road transport in India. */
import { zaftysViz } from "@/lib/blog-exhibits-tms-eval";
import type { BlogExhibit, BlogKpi } from "@/lib/blog-data";

export const hazchemKpis: readonly BlogKpi[] = [
  {
    value: "Rule 134",
    label: "Emergency panel, three faces",
    detail:
      "CMVR rule 134: technical name at least 50 mm, UN class number (the digit) at least 100 mm, class label at least 260 mm square, on both sides and the rear.",
  },
  {
    value: "10 kg + 1 kg",
    label: "Petroleum extinguishers",
    detail:
      "Petroleum Rules, 2002, rule 72. Every vehicle transporting petroleum by road, including Class C: one 10 kg dry chemical powder away from the faucet, plus 1 kg in the cab. An acid that is not petroleum is outside this rule.",
  },
  {
    value: "5 yr / 2 yr",
    label: "SMPV vessel retest",
    detail:
      "SMPV (Unfired) Rules, 2016, rule 19. Hydraulic test within five years, or two years if the gas is corrosive or toxic. Relief valves: at least yearly.",
  },
  {
    value: "685 L",
    label: "Methanol expansion, workshop",
    detail:
      "20,000 litre shell, beta 0.00149 per °C, 25°C to 48°C. About 3.4%. Confirm beta on the MSDS. The PESO drawing wins if it keeps more space.",
  },
  {
    value: "24 V",
    label: "Petroleum electrical cap",
    detail:
      "Petroleum Rules, rule 71. Circuit pressure not over 24 volts, battery isolator in the cab, on the vehicles that rule covers.",
  },
  {
    value: "15 checks",
    label: "Plant gate list",
    detail:
      "A plant standard operating procedure, not a gazette. Papers, the vessel certificate, hardware, then the weighbridge. One miss stops the load.",
  },
] as const;

export const hazchemTakeaways = [
  "The consignor owns the UN number. The carrier owns the TREM card in the cab and the panel on the vehicle.",
  "A petroleum tank vehicle needs a PESO approval for that registration, a spark arrestor, a battery isolator, and the rule 72 extinguishers.",
  "Do not print a national gate-rejection rate or an incident pie. Count rejects at your own gate.",
  "Ullage is the approved drawing, checked with the expansion sum. The methanol workshop is 685 litres of vapour and 15,193 kg. Petroleum's 97 percent net is a different rule.",
  "A spot tanker is the wrong tool when a valve failure becomes an environmental case. Name the fleet and the wash certificate.",
  "An in-gauge chemical tanker uses one day of e-way bill validity per 200 km or part. The 20 km clock is over-dimensional cargo, or a multimodal shipment with a ship leg.",
] as const;

export const hazchemReferences = [
  "Central Motor Vehicles Rules, 1989, Rules 129 to 137. Rule 133: the driver keeps the written TREM card in the cab. Rule 134: emergency information panel on both sides and the rear, with the minimum letter sizes in the KPI strip.",
  "[Petroleum Rules, 2002](https://peso.gov.in/web/en/petroleum-rules-2002): rule 63 (tank vehicle to the Third Schedule and Chief Controller approval), rule 70 (spark arrestor), rule 71 (24 volt circuit and battery isolator), rule 72 (10 kg and 1 kg extinguishers), rule 73 (attendance), rule 74 (do not park within 9 metres of a fire), rule 75 (licence for Class A and Class B in bulk).",
  "[SMPV (Unfired) Rules, 2016, rule 19](https://indiankanoon.org/doc/143409438/): periodic hydraulic test not more than every five years, or every two years for corrosive or toxic gas. Rule 18: relief valves tested at least once a year. PESO road-tanker proformas also show a half-yearly examination under rule 44(2). Confirm that rule before a standard operating procedure says every six months for every tanker.",
  "Manufacture, Storage and Import of Hazardous Chemical Rules, 1989, under the Environment (Protection) Act, 1986. Plant occupier duties. They do not replace the card in the cab.",
  "[MoRTH S.O. 3467(E), 16 July 2018](https://taxguru.in/corporate-law/maximum-safe-axle-weight-transport-vehicles.html): axle weights and the 49 tonne and 55 tonne GVW caps still apply to the tanker. Petroleum Rules rule 64(4) points the tank vehicle back to that weight limit.",
  "Petroleum Rules, 2002, rule 64: net carrying capacity is 97 percent of gross for petroleum Class A and Class B, and 98 percent for Class C. A tank truck or tank semi-trailer shall not exceed 25 kilolitres net, an aircraft refueller 50 kilolitres, a tank trailer 5 kilolitres. Rule 66: a tank truck plus tank trailer shall not exceed 15 kilolitres, and no tank trailer is attached to a tank truck whose net capacity exceeds 12 kilolitres. Rule 124(4) is a fixed storage tank: air space not less than 5 percent of capacity, or the approved code, whichever is less. It is not the road-tanker fill.",
  "[Methanol Institute, physical properties of pure methanol](https://www.methanol.org/wp-content/uploads/2016/06/Physical-Properties-of-Pure-Methanol.pdf): cubic expansion 0.00149 per °C at 20°C and 0.00159 per °C at 40°C. Specific gravity 0.7866 at 25/4°C. The 685 litre and 15,193 kg lines are that sheet applied to a 20,000 litre shell. Confirm both on the product MSDS.",
] as const;

export const hazchemExhibits: Record<string, readonly BlogExhibit[]> = {
  "Four regimes on one vehicle": [
    {
      kind: "tiles",
      caption: "The same tanker can fail four different files.",
      source: "CMVR 1989, Petroleum Rules 2002, SMPV (Unfired) Rules 2016, MSIHC Rules 1989.",
      items: [
        { title: "CMVR 129 to 137", body: "Class label, TREM card, emergency panel, driver duty." },
        { title: "PESO vessel", body: "Petroleum tank lorry, or an SMPV pressure vessel. One approval does not cover the other." },
        { title: "MSIHC at the plant", body: "The occupier's safety report and emergency plan. Not a substitute for the cab card." },
        { title: "Axle law", body: "A valid drawing that is over the axle limit is still an illegal goods vehicle." },
      ],
    },
  ],
  "The panel and the TREM card": [
    {
      kind: "image",
      caption: "Rule 134 sizes at one scale. The large mark is the class label.",
      source: "Technical name at least 50 mm. The UN class number, the digit, at least 100 mm. Class label at least 260 mm square. The four-digit UN number is not that 100 mm line. Both sides and the rear.",
      src: "/images/blog/hazchem-panel-eip.png",
      alt: "Scale drawing of CMVR rule 134: a 260 millimetre class label beside a 100 millimetre class number and 50 millimetre name",
    },
    {
      kind: "table",
      caption: "The paper and the person who owns it.",
      source: "CMVR Rules 129 to 137 split the duties. The plant occupier rules do not move the card out of the cab.",
      headers: ["Record", "Owner", "A fail looks like"],
      rows: [
        ["UN number and proper shipping name", "Consignor", "The order, the card, and the panel disagree"],
        ["TREM card in the cab", "Carrier, for the trip", "The card is for the previous product"],
        ["Emergency panel, three faces", "Vehicle owner", "Right colours, letters under the rule 134 sizes"],
        ["Hazardous-goods endorsement", "Driver, checked on Sarathi, the Parivahan register", "A photograph of an old card"],
        ["PESO or SMPV certificate", "Vehicle owner, for this registration", "A valid drawing for a different vehicle"],
        ["MSDS", "Consignor, behind the card", "Treated as a substitute for the card"],
        ["Lorry receipt", "Carrier", "The goods description says only \"chemicals\""],
      ],
    },
  ],
  "Shell, lining, and ISO tank": [
    {
      kind: "table",
      caption: "Match the shell to the product. There is no universal chemical tanker.",
      source: "Operating selection. The fabricator's corrosion table and the PESO drawing beat a fleet average.",
      headers: ["Service", "Usual shell", "Watch"],
      rows: [
        ["Concentrated sulphuric acid", "Mild steel", "Dilute acid attacks steel. The concentration is the spec."],
        ["Hydrochloric acid", "Lined steel", "Stainless is not a universal acid tank."],
        ["Methanol and many solvents", "SS304 or SS316", "SS316 when chlorides or the purity spec require it."],
        ["Food or pharma, if specified", "Dedicated SS316", "A previous acid load ends the claim."],
        ["Compressed or liquefied gas", "SMPV vessel", "Not an atmospheric chemical tanker."],
      ],
    },
    {
      kind: "table",
      caption: "Dedicated road tanker versus an ISO tank on a chassis.",
      source: "T11 is a typical liquid tank container. T14 or T20 when the pressure spec requires it. Price the lane.",
      headers: ["Line", "Road tanker", "ISO tank"],
      rows: [
        ["Best use", "A repeating plant lane", "A lane that also has rail or a port"],
        ["Legal extra", "PESO approval for this vehicle", "Tank approval plus a chassis rated for the loaded tank"],
        ["Cleaning", "The wash bay you audit", "The same wash, plus the last depot certificate"],
        ["Empty return", "Back to the same plant", "Can be staged, or lost in a container yard"],
      ],
    },
    {
      kind: "table",
      caption: "Petroleum tank capacity. These cuts are petroleum, not every chemical.",
      source: "Petroleum Rules, 2002, rules 64 and 66, on the PESO text of the rules.",
      headers: ["Rule", "Limit", "What people miss"],
      rows: [
        ["64(2) Class A and B", "Net capacity 97% of gross", "A 20,000 litre gross shell certifies 19,400 litres"],
        ["64(2) Class C", "Net capacity 98% of gross", "That is a 2% cut, not the methanol heat screen"],
        ["64(3)", "Truck or semi-trailer 25 kL net", "Aircraft refueller 50 kL. Tank trailer 5 kL"],
        ["64(4)", "Weight is GVW minus unladen weight", "A legal litre can still be an illegal axle"],
        ["66(9)", "Truck plus trailer 15 kL", "The two tanks are one quantity"],
        ["66(10)", "No trailer if the truck net exceeds 12 kL", "A 14,000 litre truck does not tow a tank trailer"],
      ],
    },
  ],
  "Ullage, mass, and axle weight": [
    {
      kind: "image",
      caption: "Methanol workshop. 685 litres of expansion on a 20,000 litre shell.",
      source: "Beta 0.00149 per °C is the Methanol Institute figure at 20°C. The same sheet gives 0.00159 per °C at 40°C. Confirm the MSDS before you use either.",
      src: "/images/blog/hazchem-formula-ullage.png",
      alt: "Formula board for methanol vapour space: 20,000 litres times 0.00149 times 23 degrees equals 685 litres",
    },
    {
      kind: "image",
      caption: "The same workshop, turned into kilograms. 19,315 litres times 0.7866.",
      source: "Specific gravity 0.7866 at 25/4°C is the Methanol Institute figure for pure methanol. 15,193 kg is 19,315 times 0.7866. About 67 kg under a 97 percent fill of the same shell.",
      src: "/images/blog/hazchem-formula-mass.png",
      alt: "Formula board turning 19,315 litres of methanol at 0.7866 kilograms per litre into 15,193 kilograms",
    },
    {
      kind: "bars",
      caption: "Three different rules on one 20,000 litre shell. Not three ways to fill the same tanker.",
      source: "3.4 percent is the methanol heat screen only. 3 percent is Petroleum Rules rule 64(2) for Class A or B: net capacity is 97 percent of gross. 2 percent is the Class C cut, at 98 percent. Rule 124(4) is a fixed storage tank, not this chart: not less than 5 percent, or the tank code, whichever is less.",
      unit: "% of shell",
      items: [
        { label: "Methanol heat screen, 23°C rise", value: 3.4 },
        { label: "Petroleum Class A or B net cut, rule 64", value: 3 },
        { label: "Petroleum Class C net cut, rule 64", value: 2 },
      ],
    },
    {
      kind: "callout",
      caption: "Paste the MSDS beta before a second bar is drawn.",
      source: "A guessed beta would be read as a measured expansion.",
      items: [
        {
          title: "Product 2",
          body: "Paste the MSDS beta. Do not borrow the methanol figure.",
          tone: "warm",
        },
        {
          title: "Product 3",
          body: "Paste the MSDS beta. The approved drawing still wins if it keeps more vapour space.",
          tone: "navy",
        },
      ],
    },
    {
      kind: "image",
      caption: "A part-filled shell has a free surface. This board does not certify a curve speed.",
      source: "Speed is the tanker stability note plus the road rule.",
      src: "/images/blog/hazchem-slosh.png",
      alt: "Diagram of liquid shifting to the outside of a curve in a part-filled tanker",
    },
  ],
  "The plant gate": [
    {
      kind: "donut",
      caption: "Share of the 15 gate checks. This is a checklist mix, not a share of accidents.",
      source: "Counts are 5 papers, 4 hardware, 3 vessel, and 3 cab and weigh. The chart rounds those shares to 33, 27, 20, and 20.",
      slices: [
        { label: "Papers and identity", value: 33, color: zaftysViz.navy },
        { label: "Hardware", value: 27, color: zaftysViz.primary },
        { label: "Vessel approval", value: 20, color: zaftysViz.teal },
        { label: "Cab and weigh", value: 20, color: zaftysViz.warm },
      ],
    },
    {
      kind: "steps",
      caption: "Eight stages. A fail at any stage is a reject.",
      source: "Plant standard operating procedure. Petroleum extinguishers are rule 72: 10 kg plus 1 kg in the cab. The table under this list is the full fifteen checks.",
      items: [
        { title: "UN match", body: "The order, the card, and the panel name the same product." },
        { title: "TREM card", body: "In the cab, written for this product." },
        { title: "Licence", body: "Hazardous-goods endorsement. Check Sarathi." },
        { title: "PESO date", body: "This vehicle. The retest date is still valid." },
        { title: "Spark and cut-off", body: "Arrestor fitted. Battery isolator works." },
        { title: "Valves and earth", body: "Foot valve moves. Bonding is continuous." },
        { title: "Extinguishers", body: "Petroleum: 10 kg away from the faucet, plus 1 kg in the cab." },
        { title: "Weigh and ullage", body: "Axles legal. Vapour space kept." },
      ],
    },
    {
      kind: "table",
      caption: "Fifteen-point gate list. Print it. One miss stops the load.",
      source: "Items from CMVR or the Petroleum Rules are duties. The rest are the minimum a chemical gate should add.",
      headers: ["#", "Check", "Fail"],
      rows: [
        ["1", "UN number and Hazchem code match the order, the card, and the panel", "No load"],
        ["2", "Panel fitted on both sides and the rear, letters at the rule 134 sizes", "No load"],
        ["3", "TREM card in the cab for this product", "No load"],
        ["4", "Hazardous-goods endorsement on the licence. Check Sarathi, the Parivahan register", "No load"],
        ["5", "PESO or SMPV certificate matches this registration and this product family", "No load"],
        ["6", "Retest date on that certificate is still valid", "No load"],
        ["7", "Spark arrestor where the approval requires it", "No load"],
        ["8", "Battery isolator. Petroleum circuit not over 24 volts", "No load"],
        ["9", "Foot valve and emergency shut-off operate", "No load"],
        ["10", "Bonding lug continuous to the shell. Earth on before the hose opens", "No load"],
        ["11", "Petroleum: 10 kg dry powder away from the faucet, plus 1 kg in the cab", "No load"],
        ["12", "PPE and a spill kit for this UN number", "No load"],
        ["13", "Wash certificate if the previous product is incompatible", "No load"],
        ["14", "Tare, net, ullage, and axle groups inside the legal limits", "Trim or reject"],
        ["15", "Route and emergency number on the trip before the barrier opens", "No dispatch"],
      ],
    },
    {
      kind: "steps",
      caption: "One petroleum tanker that should not load. Illustrative gate, not a case file.",
      source: "Each fail is a rule already in this article. None of these is a national rejection rate.",
      items: [
        {
          title: "The plate and the certificate disagree",
          body: "The PESO approval names a different registration. Rule 63 is an approval of that vehicle.",
        },
        {
          title: "The plan is the gross litres",
          body: "Gross 20,000 litres, petroleum Class B. Rule 64(2) certifies 97 percent, which is 19,400 litres. The load sheet says 20,000.",
        },
        {
          title: "A trailer on a truck that is already over 12 kilolitres",
          body: "Rule 66(10). No tank trailer on a tank truck whose net capacity exceeds 12 kilolitres.",
        },
        {
          title: "One extinguisher, not the pair",
          body: "Rule 72. The 10 kg unit is on the vehicle. The 1 kg unit is not in the cab.",
        },
      ],
    },
  ],
  "Petroleum class, then the UN class": [
    {
      kind: "table",
      caption: "Petroleum class is a flash point. It is not a UN class.",
      source: "Petroleum Act, 1934, read with the Petroleum Rules. Flash point is the statutory cut.",
      headers: ["Class", "Flash point", "What changes on the road"],
      rows: [
        ["A", "Below 23°C", "Bulk needs a licence under rule 75. The stricter vehicle rules apply."],
        ["B", "23°C and above, below 65°C", "Bulk still needs the rule 75 licence. Net capacity is 97% of gross."],
        ["C", "65°C and above", "Outside several vehicle rules, including the 24 volt cap in rule 71. Net capacity is 98% of gross."],
      ],
    },
    {
      kind: "table",
      caption: "The nine dangerous-goods classes. The class does not change at a state border.",
      source: "Road practice under CMVR. A state may still add a route or an hour. Class 1 and some Class 7 movements are a different permission.",
      headers: ["Class", "Family", "Do not treat it as"],
      rows: [
        ["1", "Explosives", "A chemical tanker lane"],
        ["2", "Gases", "An atmospheric petroleum tank"],
        ["3", "Flammable liquids", "Automatically petroleum Class A"],
        ["4", "Flammable solids", "A tanker product by default"],
        ["5", "Oxidisers and organic peroxides", "A solvent tanker"],
        ["6", "Toxic and infectious", "A wash-and-go shell"],
        ["7", "Radioactive", "This guide"],
        ["8", "Corrosives", "Mild steel because the last acid load was"],
        ["9", "Miscellaneous", "A reason to skip the card"],
      ],
    },
  ],
  "Route, parking, and attendance": [
    {
      kind: "table",
      caption: "Petroleum attendance, parking, and the loading place.",
      source: "Petroleum Rules, 2002, rules 73, 74, and 76. These rows are petroleum. A chemical that is not petroleum still needs the road the police notification allows.",
      headers: ["Rule", "Duty", "The miss"],
      rows: [
        ["73", "Attended by someone who knows this part", "Left with vapour still in the tank, outside an approved place"],
        ["73, over 5 kL", "Driver plus one more person while moving, for petroleum other than Class C. Same when trailing", "A solo driver on a large Class A or Class B load"],
        ["74", "No parking on a public road, in a congested area, or within 9 metres of a fire", "Stopped beside a furnace or a tea stall"],
        ["76", "Load and unload at a licensed place approved for that class", "A roadside fill, or a fuel tank filled from the tanker"],
      ],
    },
  ],
  "The first hour of a spill": [
    {
      kind: "steps",
      caption: "What the card is for in the first hour. Not an incident database.",
      source: "The actions are the ones a TREM card is written to hold. The contract can split the invoice. It cannot delete the duties.",
      items: [
        { title: "Stop and warn", body: "The driver stops the vehicle and warns traffic. The carrier controls the vehicle." },
        { title: "Read this card", body: "Hazards, protective equipment, fire, and first aid are for this UN number, not the previous load." },
        { title: "Call the number on the panel", body: "That number is the number on the card, and it is answered." },
        { title: "Do not hose it into a drain", body: "A corrosive or a solvent washed off the road becomes a second release." },
        { title: "The consignor advises the product", body: "Wrong UN number on the order is the consignor's fact. The carrier still had to stop." },
      ],
    },
  ],
  "The carrier agreement": [
    {
      kind: "table",
      caption: "Contract lines a chemical lane adds to a freight rate. No rupees invented here.",
      source: "The kilometre, the toll, and the standing cost stay in the freight rate guide. These rows are the product conditions.",
      headers: ["Line", "What it holds", "What it is not"],
      rows: [
        ["UN list", "Only the numbers on the order", "A new product loaded because the shell was empty"],
        ["Wash certificate", "Named bay, before a product change", "A claim that it was cleaned in place"],
        ["Second person", "Where Petroleum Rule 73 requires one", "A helper added to every acid tanker by habit"],
        ["Cleanup split", "Who pays, and who owns the product advice", "An indemnity that deletes the driver's duty to stop"],
        ["Pollution exclusion", "Read before the first trip", "A goods-in-transit policy treated as environmental cover"],
      ],
    },
  ],
  "What the dispatch file must hold": [
    {
      kind: "flow",
      caption: "The sequence before the barrier. A photocopy from the last trip is not a step.",
      source: "Ordinary industrial documents are in the TMS control-stack guide. This product adds the panel, the card, and the vessel certificate.",
      items: [
        { title: "Order", body: "UN number, proper shipping name, quantity, and the loading temperature." },
        { title: "MSDS", body: "Beta and density for the ullage sum. It does not replace the card." },
        { title: "Card and panel", body: "Same UN number, same telephone, letters at the rule 134 sizes." },
        { title: "Vessel file", body: "PESO or SMPV for this registration, retest date still open." },
        { title: "Weigh", body: "Tare, net, ullage, and each axle group." },
        { title: "Lorry receipt", body: "The hazardous description, not the word chemicals." },
      ],
    },
  ],
} as const;
