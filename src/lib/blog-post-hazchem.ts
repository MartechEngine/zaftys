import type { BlogSection } from "@/lib/blog-data";
import { hazchemExhibits } from "@/lib/blog-exhibits-hazchem";

export const hazchemFaqs = [
  {
    question: "What is a TREM card?",
    answer:
      "A transport emergency (TREM) card is the driver's action sheet for one United Nations number: the hazards, the protective equipment, what to do in a spill or a fire, and first aid. Central Motor Vehicles Rules, 1989, rule 133 requires the driver to keep that written card in the cab for the movement. The material safety data sheet does not replace it. A lorry receipt that says only \"chemicals\" is not a TREM card.",
  },
  {
    question: "What must an emergency information panel show?",
    answer:
      "CMVR rule 134 requires the panel on both sides and the rear. The English text of G.S.R. 590(E), in the Gazette of 2 June 1989, says the class label is not less than 260 mm square. The Hindi text of that same notification says 250 mm square. G.S.R. 338(E) of 26 March 1993 does not change the size. The technical name, and the emergency name and telephone, are at least 50 mm in that English text. The India Code consolidation prints a 100 mm class digit and a 250 mm label. The 1989 Gazette drawing does not. It is an 800 mm by 600 mm panel, and it marks the UN number line at 15 mm.",
  },
  {
    question: "What is a Hazchem code?",
    answer:
      "On an Indian emergency panel, the Hazchem code is the emergency action code for that product: what to use on a fire, whether a spill is diluted or contained, and what protection is required. Copy it from the transport emergency card for this United Nations number. Do not reconstruct it from memory or from the previous load. This guide does not print a sample code.",
  },
  {
    question: "What happens if a chemical tanker moves without a panel or a TREM card?",
    answer:
      "The vehicle can be stopped. Central Motor Vehicles Rules, 1989, Rules 129 to 137 split the duties: the consignor declares the product, the owner fits the vehicle, and the driver carries the transport emergency (TREM) card. Prosecution can also sit under the Motor Vehicles Act and, where a release harms the environment, under the Environment (Protection) Act, 1986. Quote the section and the fine in force on the audit date. Do not memorise one blog figure as the only penalty.",
  },
  {
    question: "What is the difference between petroleum Class A, Class B, and Class C?",
    answer:
      "It is a flash-point cut in the Petroleum Act, 1934, not a United Nations class. Class A is below 23°C. Class B is 23°C and above but below 65°C. Class C is 65°C and above. Bulk Class A and Class B need a licence under Petroleum Rules rule 75. Several vehicle rules, including the 24 volt cap in rule 71, do not apply to Class C. Methanol is a Class 3 flammable liquid. It is not petroleum merely because its flash point is low.",
  },
  {
    question: "Can a petroleum tank be filled to its gross capacity?",
    answer:
      "No. Petroleum Rules rule 64(2) sets net carrying capacity at 97 percent of gross for Class A and Class B, and 98 percent for Class C. On a 20,000 litre gross shell that is 19,400 litres or 19,600 litres. Rule 64(3) also caps a tank truck or tank semi-trailer at 25 kilolitres net, a tank trailer at 5 kilolitres, and an aircraft refueller at 50 kilolitres. Rule 64(4) then says the weight still has to fit the gross vehicle weight law. None of these percentages is the ullage for an acid or a solvent that is not petroleum.",
  },
  {
    question: "Is 3 to 5 percent ullage a national rule for every chemical tanker?",
    answer:
      "No. For petroleum on a road tank, use rule 64(2). For a fixed storage tank at an installation, rule 124(4) keeps an air space of not less than 5 percent of capacity, or the space in the approved tank code, whichever is less. A methanol workshop at beta 0.00149 per °C, from 25°C to 48°C, needs about 685 litres on a 20,000 litre shell, which is about 3.4 percent, then about 15,193 kg at a specific gravity of 0.7866. Confirm beta and density on the material safety data sheet (MSDS). If the approved drawing already keeps more space, the drawing wins.",
  },
  {
    question: "Can an ISO tank move on any skeletal trailer?",
    answer:
      "Only when that trailer is rated for the loaded tank, the twistlocks and the frame match the tank, and the axle loads stay inside the law. A skeletal trailer bought for empty boxes, or for a light 20-foot box, is not automatically legal under a full tank. The tank's own approval does not rate the trailer. Weigh the combination the way the axle and GVW guide describes.",
  },
  {
    question: "How often is a tanker retested?",
    answer:
      "Use the date on the certificate for that vessel. Under the Static and Mobile Pressure Vessels (Unfired) Rules, 2016, rule 19, the hydraulic test is not more than every five years, or every two years if the gas is corrosive or toxic. Rule 18(xiii) tests relief valves at least once a year. That yearly test stays in place. On a road tanker carrying a flammable, toxic, or corrosive gas, rule 18(xiv) also says those relief valves are replaced with new valves every ten years, or sooner if they are found defective in operation or at a test, whichever is earlier. The ten-year replacement does not take the place of the yearly test. Rule 44, in the 2016 text, makes the licensee responsible for keeping the vehicle road-worthy. That text does not set a six-month examination, and it has no sub-rule 44(2). Do not print every six months for every tanker unless the certificate for that vessel says so. A petroleum tank lorry follows the Petroleum Rules, not the gas-vessel interval.",
  },
  {
    question: "Where can a petroleum tank vehicle be loaded?",
    answer:
      "Rule 76: at a place inside premises licensed under the Petroleum Rules and approved in writing by the Chief Controller for that class. Petroleum Class C may be loaded or unloaded where the Act allows it to be stored without a licence. A tank wagon may use a railway siding earmarked for it. Unloading somewhere else is allowed when an accident or a breakdown forces it, with precautions against fire and with supervision. Do not refill a motor-vehicle fuel tank directly from the tank vehicle. The aircraft exception is in the same rule.",
  },
  {
    question: "Who contains a roadside spill?",
    answer:
      "The driver starts the actions on the TREM card. The carrier controls the vehicle. The consignor owns the product identity and the emergency advice. Occupier duties under the hazardous-chemical rules apply at the plant. A district administration can direct the cleanup. The contract can split the invoice. It cannot delete those duties.",
  },
  {
    question: "Who is responsible for the UN number on a chemical tanker?",
    answer:
      "The consignor puts the United Nations number and the proper shipping name on the order. The carrier does not invent either from the previous load. The order, the panel, and the card have to show the same number before the barrier opens. If they disagree, the driver still stops. Sorting which company was wrong is not the first action.",
  },
  {
    question: "How many extinguishers does a petroleum tank vehicle carry?",
    answer:
      "Petroleum Rules, 2002, rule 72: every vehicle transporting petroleum by road carries one 10 kg dry chemical powder extinguisher, or an equivalent, away from the discharge faucets, plus one 1 kg dry chemical powder extinguisher in the driver's cab. Petroleum Class C is included. An acid or a solvent that is not petroleum is outside this rule.",
  },
  {
    question: "When does a petroleum tanker need a second person?",
    answer:
      "Petroleum Rules rule 73: the vehicle is attended by someone who knows this part of the rules. Above 5 kilolitres of petroleum other than Class C, or when a tank trailer is being towed, the driver plus one more person are required while the vehicle is moving. An empty tank that is not gas-free may be left only at a place the Chief Controller has approved. This is a petroleum rule. It is not an extra person on every chemical tanker.",
  },
  {
    question: "Where can a petroleum tank vehicle be parked?",
    answer:
      "Petroleum Rules rule 74: do not park on a public road, in a congested area, or within 9 metres of a fire. Loading and unloading are rule 76, which is a different sentence: a licensed place approved in writing for that class, with the named exceptions for Class C storage the Act allows, a railway siding for tank wagons, and unloading after an accident or breakdown.",
  },
  {
    question: "How long is an e-way bill valid for a chemical tanker in India?",
    answer:
      "Under CGST Rule 138(10), a tanker that stays inside the Rule 93 limits for that vehicle is ordinary cargo: one day for the first 200 km, and one further day for every 200 km or part. The one-day-per-20 km clock applies to over-dimensional cargo, and to a multimodal shipment with at least one leg by ship. A chemical tanker is not on the shorter clock merely because the product is hazardous. If the load also exceeds Rule 93, use the over-dimensional cargo rule.",
  },
  {
    question: "Does a PESO petroleum approval cover an LPG or ammonia tanker?",
    answer:
      "No. Petroleum Rules, 2002, rule 63 approves a petroleum tank vehicle built to the Third Schedule, for that registration. A pressure vessel for compressed or liquefied gas follows the Static and Mobile Pressure Vessels (Unfired) Rules, 2016. A petroleum tank-lorry approval does not cover an LPG or ammonia vessel, and an SMPV certificate does not turn an atmospheric solvent tanker into a pressure vessel.",
  },
] as const;

export const hazchemSections: readonly BlogSection[] = [
  {
    heading: "Four regimes on one vehicle",
    paragraphs: [
      "Chemical transportation rules in India are four files on one registration, not one national permit. A gate that checks only one of them will pass a vehicle the next file would stop. The Central Motor Vehicles Rules, 1989 (CMVR), Rules 129 to 137, are the road rules: what the consignor declares, what the owner fits, what the driver carries, the emergency information panel, and the transport emergency (TREM) card. The class-label size is the English text of the 2 June 1989 Gazette: not less than 260 mm square. The Hindi text of that notification says 250 mm square, and the India Code consolidation follows the Hindi figure. G.S.R. 338(E) of 26 March 1993 does not change it.",
      "The Petroleum and Explosives Safety Organisation (PESO) approves the vessel, not the trip. Petroleum Rules, 2002, under the Petroleum Act, 1934, cover tank vehicles that carry petroleum. Rule 63 requires the tank vehicle to be built to the Third Schedule and approved in writing by the Chief Controller. The tank is fabricated and mounted by a manufacturer the Chief Controller has approved, against a drawing. That approval names the type and, on the vehicle licence, the registration. A general national permit is not that licence. The Static and Mobile Pressure Vessels (Unfired) Rules, 2016, cover a pressure vessel that carries compressed or liquefied gas. A petroleum tank-lorry approval does not cover an LPG or ammonia vessel, and an SMPV certificate does not turn an atmospheric solvent tanker into a pressure vessel.",
      "The Manufacture, Storage and Import of Hazardous Chemical Rules, 1989, under the Environment (Protection) Act, 1986, sit on the occupier of the site. Isolation, the safety report, and the on-site emergency plan are plant duties. They do not replace the card in the cab. A plant can be compliant at the fence and still dispatch a vehicle the road rules would stop. Gross vehicle weight (GVW) law still applies on top of all three. MoRTH notification S.O. 3467(E) of 16 July 2018 caps axle weights, then the rigid vehicle and the combination. Petroleum Rules rule 64(4) says the same thing in petroleum language: the safe carrying weight shall not exceed the difference between unladen weight and the maximum gross weight for that class of vehicle. A PESO-approved tanker that is over an axle is an illegal goods vehicle with a valid vessel drawing.",
      "The ordinary freight stack, diesel, toll, and a markup on cost, is a different article: [how to calculate truck freight rates in India](/blog/truck-freight-rates-india-cost-rate-benchmarking-guide). Goods and services tax (GST) stays outside the trip rate, as it does there. The axle method is in the [axle and GVW guide](/blog/india-axle-load-gvw-limits-heavy-freight). This article is the file that decides whether the vehicle is allowed to load at all.",
    ],
    exhibits: hazchemExhibits["Four regimes on one vehicle"],
  },
  {
    heading: "Petroleum class, then the UN class",
    paragraphs: [
      "People use \"chemical,\" \"petroleum,\" and \"hazchem\" as if they were one permit. They are three cuts. Petroleum class is a flash point under the Petroleum Act. The United Nations (UN) class is the dangerous-goods family on the panel. Hazchem, on an Indian emergency panel, is the emergency action code for that product. A solvent can be UN Class 3 and still not be petroleum. A petroleum Class C product can be outside several of the vehicle rules that a Class A product must meet. Writing one standard operating procedure for \"all tankers\" is how a Class C vehicle is failed for a rule that does not cover it, and how a Class A vehicle is passed because the last Class C load was fine.",
    ],
    subsections: [
      {
        heading: "Class A, Class B, and Class C",
        paragraphs: [
          "Class A is petroleum with a flash point below 23°C. Class B is 23°C and above but below 65°C. Class C is 65°C and above. Rule 75 requires a licence to transport Class A or Class B in bulk by road. The railway, acting as a carrier, and a licensed refueller moving inside one aerodrome, are the exceptions written in that rule. Rule 62 says this part of the rules does not apply to Class A in a quantity not exceeding 100 litres, or to petroleum of any other class otherwise than in bulk, subject to rule 67, or to petroleum moved by the Defence Forces of the Union. A 20,000 litre tank is bulk. The small-quantity sentence will not save it.",
          "Which vehicle rules apply depends on the class. Rule 71, the 24 volt circuit and the battery isolator, is for petroleum other than Class C. Rule 70, the spark arrestor, the exhaust in front of the tank, and the flame arrester on the air intake, is drafted for petroleum other than Class B carried otherwise than in bulk, and other than Class C. Read the rule before the gate pastes it onto every acid tanker and every Class C vehicle in the district. Rule 73 still wants the vehicle attended, and above 5 kilolitres of petroleum other than Class C it wants the driver and one more person while the vehicle is moving. Rule 74: do not park a vehicle carrying petroleum within 9 metres of a fire, or on a public road, or in a congested area.",
        ],
      },
      {
        heading: "Nine classes, and the ones this guide is not",
        paragraphs: [
          "Road practice follows the nine dangerous-goods classes: explosives, gases, flammable liquids, flammable solids, oxidisers and organic peroxides, toxic and infectious substances, radioactive material, corrosives, and miscellaneous. A state may add a curfew or a route ban. The class does not change at the border. The movement condition can. Class 1 explosives and some Class 7 movements are a different permission set. Do not treat them as a chemical tanker lane, and do not use this article as their standard operating procedure.",
          "Methanol is the worked liquid later in this guide because its expansion coefficient and its specific gravity are on a published physical-property sheet. Its flash point on that sheet is low enough that a reader will want to call it petroleum Class A. Do not. Petroleum is the Act's product. Methanol is UN 1230, a Class 3 flammable liquid, and it follows the chemical tanker file: the panel, the card, the shell, and the drawing. Where a petroleum rule is used beside it, the sentence says so.",
        ],
      },
    ],
    exhibits: hazchemExhibits["Petroleum class, then the UN class"],
  },
  {
    heading: "The panel and the TREM card",
    paragraphs: [
      "The panel and the card do different jobs. The emergency information panel is what a person outside the cab can read without opening a door. The TREM card is what the driver uses once the door is open. A vehicle with a correct panel and no card, or a correct card and a panel for the previous product, fails. So does a lorry receipt that says \"chemicals\" and nothing else. The receipt is the commercial paper. It is not the card.",
    ],
    subsections: [
      {
        heading: "Letter sizes, three faces",
        exhibits: hazchemExhibits["The panel and the TREM card"],
        paragraphs: [
          "CMVR rule 134 requires the panel on both sides and the rear. The English text of G.S.R. 590(E), Gazette of India Extraordinary, No. 287, 2 June 1989, says the class label is not less than 260 mm square, the technical name is not less than 50 mm high, and the emergency name and telephone are not less than 50 mm high. The Hindi text of that same notification says the class label is not less than 250 mm square. G.S.R. 338(E), Gazette Extraordinary No. 114, 26 March 1993, inserts the trip sticker and renumbers the old sub-rule. It does not change the size. The India Code consolidation prints 250 mm and also prints a United Nations class number, the digit in the rule 137 table, at not less than 100 mm. That 100 mm sentence is not in the 1989 Gazette text that was opened. The drawing in that Gazette is an 800 mm by 600 mm panel. It marks the UN number line and the Hazchem line at 15 mm, and the emergency-dial line at 30 mm. Those drawing marks sit below the 50 mm prose minimum, so they are not permission to print the name or the telephone under 50 mm. Measure the class label against the English text: under 260 mm square is a fail against that text.",
          "The telephone on the panel has to be the number on the card, and it has to be answered for the hours that tanker can be on the road. A switchboard that closes at 18:00 is not an emergency number for a vehicle that will still be on a highway at 23:00. Rule 133 requires the driver to keep the written TREM card in the cab for the movement. The card is the action sheet for that UN number: hazards, protective equipment, spillage, fire, and first aid. Put it in a language the driver can use. English plus Hindi is plant practice on many lanes. It is not a letter size in rule 134.",
        ],
      },
      {
        heading: "Who owns the number",
        paragraphs: [
          "The consignor owns the accuracy of the product identity, the UN number, the Hazchem code, and the emergency actions. The carrier owns the presence of the card, the panel, and a driver who can produce both at a check post. The driver owns the endorsement on the licence. The vehicle owner owns the PESO or SMPV certificate for that registration. Mixing those owners is how a gate argues with the wrong company for an hour and then loads anyway.",
          "The material safety data sheet (MSDS) is the plant document behind the card. It does not replace the card. Put the UN number, the proper shipping name, the Hazchem code, and the emergency number on the dispatch record in [ZAFTYS TMS](/zaftys-tms), so the gate is not checking a photocopy against the product from the last trip. The document sequence for an ordinary industrial load is in [Industrial TMS for India](/blog/industrial-tms-control-stack-india). This product adds the panel, the card, and the PESO certificate to that sequence.",
        ],
      },
    ],
  },
  {
    heading: "Shell, lining, and ISO tank",
    paragraphs: [
      "There is no universal chemical tanker. The shell is a corrosion decision and a pressure decision. The chassis is a weight decision. An approval for one of them does not settle the other. A fleet that offers \"a chemical tanker\" without the product, the concentration, and the registration number is offering a vehicle you cannot yet accept or reject.",
    ],
    subsections: [
      {
        heading: "Which steel, for which product",
        paragraphs: [
          "Concentrated sulphuric acid at ambient temperature is often carried in mild steel. Dilute acid attacks that steel. The concentration on the order is the specification, and a tank that was right for 98 percent acid is the wrong tank for a dilute stream from a different process. Hydrochloric acid is a lining decision. Stainless steel is not a universal acid tank. Methanol and many solvents go in stainless: SS316 where chlorides or a purity specification require it, SS304 where the product and the cleaning chemical allow it. The fabricator's corrosion table beats a fleet average.",
          "A food or pharma claim, where the specification says so, needs a dedicated SS316 shell and a wash certificate. A previous acid load ends that claim. Compressed or liquefied gas belongs in an SMPV pressure vessel, not in an atmospheric chemical tanker. If the product family changes, the certificate has to change with it. A petroleum approval does not become an acid approval because the shell is stainless.",
        ],
      },
      {
        heading: "A road tanker is not an ISO tank",
        paragraphs: [
          "A dedicated road tanker is a vehicle. An ISO tank is a tank in a frame. T11 is a typical liquid tank container. T14 or T20 is the step when the pressure or the relief specification requires it. The tank can move on a container chassis, and on rail or a ship when those approvals exist. The chassis still has to be rated for the loaded tank. Twistlocks, the frame, and the axle groups are part of the load, not a detail after the tank hire. A skeletal trailer bought for empty boxes is not rated by the tank's data plate.",
          "Do not publish a claim that an ISO tank is cheaper. Price the lane: tank hire, chassis hire, lifts, cleaning, and the empty. A road tanker is one asset and one empty return to the same plant. An ISO tank can be staged. It can also disappear into a container yard. The empty is a commercial line. It is also a product-control line, because a tank that sat for a week with an unknown heel is not the tank you approved on Monday.",
        ],
      },
      {
        heading: "Petroleum capacity, trailers, and the hardware list",
        paragraphs: [
          "For petroleum, rule 64 is the capacity rule, and it is easy to misread as a chemical-tanker rule. Net carrying capacity is 97 percent of gross for Class A and Class B, and 98 percent for Class C. The rule says the limit is to be read so the tank may contain the specified quantity under varying temperature. It does not say you may fill the gross and call the extra a temperature allowance. On a 20,000 litre gross shell the Class A or Class B net is 19,400 litres. The Class C net is 19,600 litres. A tank truck or tank semi-trailer shall not exceed 25 kilolitres net. An aircraft refueller shall not exceed 50. A tank trailer shall not exceed 5.",
          "Rule 66 is the trailer rule. Not more than one tank trailer, and only behind a vehicle used exclusively for petroleum. A tank trailer is not attached to a tank semi-trailer or to another trailer. Where a tank trailer is attached to a tank truck, the two together shall not exceed 15 kilolitres. No tank trailer is attached to a tank truck whose own net capacity exceeds 12 kilolitres. A 14,000 litre truck does not tow a tank trailer, even if the trailer is inside its own 5 kilolitre cap. In a thickly populated area that combination also needs the written permission of the district authority. Rule 65: a tank vehicle meant for petroleum in bulk is not used for another purpose unless the Chief Controller authorises it in writing. Rule 69: the vehicle does not carry some other article while it is carrying petroleum, unless that too is authorised in writing.",
          "Hardware that fails a serious petroleum gate is the hardware in rules 70 to 72, on the vehicles those rules cover. Spark arrestor on the exhaust. Exhaust in front of the tank. Flame arrester on the air intake. Circuit not over 24 volts where rule 71 applies, battery isolator in the cab, junction boxes sealed. Rule 72 is every vehicle transporting petroleum by road, including Class C: one 10 kg dry chemical powder extinguisher, or an equivalent, away from the discharge faucet, and one 1 kg dry chemical powder extinguisher in the cab. An acid that is not petroleum is outside rule 72. A foot valve and an emergency shut-off have to move. A bonding lug has to be continuous to the shell, not a painted stud. If the PESO drawing shows an item the rules do not name, its absence is still a reject. If the drawing does not show it, do not invent a fitment and then fail every tanker in the district.",
        ],
      },
    ],
    exhibits: hazchemExhibits["Shell, lining, and ISO tank"],
  },
  {
    heading: "Ullage, mass, and axle weight",
    paragraphs: [
      "Liquids expand. A shell filled to the brim at the loading temperature will vent or pressure up when the day is hotter. The screening sum is vapour space equals shell volume times beta times the temperature rise. Beta is the volumetric expansion coefficient from the MSDS or a physical-property table. It is not a fleet average. The peak temperature is the highest you will actually meet on that route and that season. Load mass is then the density at the loading temperature times the volume that remains after the vapour space. Two plants can share a shell drawing and still have different fill limits, because one route sees 48°C in the shell and the other does not.",
    ],
    subsections: [
      {
        heading: "The methanol workshop",
        paragraphs: [
          "The worked case is pure methanol, and it is a workshop. The Methanol Institute sheet gives a cubic expansion of 0.00149 per °C at 20°C, and 0.00159 per °C at 40°C. This screen uses 0.00149. Load at 25°C. Peak 48°C. The rise is 23 degrees. On a 20,000 litre shell, 20,000 times 0.00149 times 23 is 685 litres, about 3.4 percent. The volume left is 19,315 litres. The same sheet gives specific gravity 0.7866 at 25/4°C, which is 0.7866 kilograms per litre. Mass is 19,315 times 0.7866, which is 15,193 kilograms.",
          "Hold the beta at the 40°C figure and the same rise needs 20,000 times 0.00159 times 23, which is 731 litres. The mass falls to about 15,157 kilograms. The difference is about 36 kilograms. That is the sensitivity of the coefficient, not a second product and not a safety factor you may ignore. Confirm both numbers on the MSDS before anyone uses the sum. If the approved drawing already keeps a larger vapour space, the drawing wins. The sum is the check. It is not a licence to fill tighter.",
        ],
      },
      {
        heading: "Why 97 percent, 98 percent, and 5 percent are different sentences",
        paragraphs: [
          "Petroleum Rules rule 64(2) is the road-tanker sentence, and only for petroleum. Class A and Class B: net capacity 97 percent of gross, so a 20,000 litre gross shell certifies 19,400 litres. Class C: 98 percent, which is 19,600 litres. Filling this methanol workshop to that 97 percent line would put 19,400 litres in the shell, 85 litres more than the 685 litre screen allows. At 0.7866 kilograms per litre that is about 67 kilograms of product the heat screen says should still be vapour space. The petroleum percentage is not a permission to ignore the methanol sum, and the methanol sum is not a permission to rewrite rule 64 for diesel.",
          "The 5 percent figure is rule 124(4), and it is a fixed storage tank at an installation, not a road tanker. The air space shall be not less than 5 percent of the tank's capacity, or the space prescribed in the approved tank code, whichever is less. \"Whichever is less\" means a code that keeps 3 percent is the rule for that tank, not a blog that remembers only the 5. On a 20,000 litre road shell, 5 percent would be 1,000 litres of vapour and about 14,945 kilograms of this methanol, roughly 248 kilograms under the heat-screen load. That is a different tank and a different rule. Do not paste it onto an acid tanker, and do not paste it onto a petroleum road tank whose net capacity is already set by rule 64(2).",
        ],
      },
      {
        heading: "Free surface, then the axles",
        paragraphs: [
          "A part-filled atmospheric shell has a free surface. On a curve the liquid moves outward and the centre of gravity moves with it. The awkward case is a part load in one large compartment, not a brimful tanker and not a near-empty one. Fill compartments in the order the manufacturer gives you. Refuse a plan that leaves a free surface in one big compartment because the order was short. A short order is a reason to use a smaller compartment or a smaller vehicle. It is not a reason to send 12 tonnes rolling in a 20,000 litre single shell. This article does not certify a safe curve speed. The tanker stability note and the speed on the permit do that.",
          "Compartment loading changes axle weights even when the total mass is legal. Weigh the combination. A legal GVW with a heavy rear compartment is still an axle offence. The 5 percent enforcement tolerance in the Motor Vehicles Act is not saleable payload. The same point is in the [axle guide](/blog/india-axle-load-gvw-limits-heavy-freight). On this methanol workshop the planning mass is 15,193 kilograms of product before you add the unladen vehicle. That mass does not tell you the axle groups. Only the weighbridge does.",
        ],
      },
    ],
    exhibits: hazchemExhibits["Ullage, mass, and axle weight"],
  },
  {
    heading: "The plant gate",
    paragraphs: [
      "Count valve, earth, and electrical rejects at your own gate for the last 90 days. There is no published national rejection rate to copy. A missing TREM card, a lorry receipt with no hazardous description, or a weighbridge ticket that does not match the loaded mass holds that trip. The delay is your queue.",
      "The list below collapses the gate into eight stages. The table is the full fifteen checks. Items that come from CMVR or the Petroleum Rules are duties. The rest are the minimum a chemical gate should add. A fail before the weighbridge is an environment, health, and safety fail. A fail on weight is a trim or a reject. Both stop the vehicle. The driving licence has to carry the hazardous-goods endorsement. Check it on Sarathi, the Parivahan driving-licence register. Do not trust a photograph of an old card. Confirm the current licence rule and the approved course before the standard operating procedure quotes a syllabus or a number of days.",
    ],
    subsections: [
      {
        heading: "One tanker that should not load",
        paragraphs: [
          "Illustrative gate, not a case file and not a ZAFTYS incident. A petroleum Class B tank truck reports for a bulk load. The gross shell is marked 20,000 litres. The load sheet asks for 20,000 litres. Rule 64(2) certifies 97 percent, which is 19,400 litres, so the sheet is already 600 litres over the net. The PESO approval on the file names a different registration. A tank trailer is coupled behind it, and the truck's own net is above 12 kilolitres, which rule 66(10) forbids. The 10 kg extinguisher is on the vehicle. The 1 kg extinguisher is not in the cab, which fails rule 72. Any one of those stops the load. Together they are a vehicle that should not have been called.",
          "A methanol tanker on the next bay is a different file. The order says UN 1230. The card in the cab is for the previous solvent. That is a no-load under the panel-and-card rule, before anyone discusses litres. If the card matches, the heat screen still caps this workshop at 19,315 litres and about 15,193 kilograms, unless the drawing keeps more vapour space. Do not \"correct\" the methanol fill up to 19,400 litres because the petroleum truck next to it is allowed a 97 percent net. Logging the reject in [ZAFTYS TMS](/zaftys-tms) turns a shouted gate into a carrier record. A truck that waited and then failed is the same leak described in [5 hidden cost leaks in heavy industrial freight](/blog/5-hidden-cost-leaks-heavy-industrial-freight-tms-3pl-guide).",
        ],
      },
    ],
    exhibits: hazchemExhibits["The plant gate"],
  },
  {
    heading: "Route, parking, and attendance",
    paragraphs: [
      "Municipal orders restrict hazardous vehicles by hour and by road. Mumbai, Delhi-NCR, and Bengaluru each publish their own window, and those windows are not the same sentence copied into three cities. A corridor note that says \"no city driving in the peak\" is not a substitute for the current police notification on that road. Tunnel and bridge bans are road-specific. Put the allowed road on the trip, not in a driver's memory. A geofence that alarms when the vehicle leaves the corridor is the control. It does not, by itself, create criminal liability, and it does not replace the driver's duty.",
      "For petroleum, the parking and attendance rules are already written. Rule 74: no parking on a public road, in a congested area, or within 9 metres of a fire. Rule 73: the vehicle is attended by a person who knows this part of the rules. Above 5 kilolitres of petroleum other than Class C, or when the vehicle is trailing another while carrying petroleum other than Class C, the driver and at least one more person attend it while it is moving. An empty tank that is not free of vapour may be left unattended only in a place the Chief Controller has approved in writing. \"Empty\" is not \"gas free.\"",
      "Rule 76 is the loading place. Petroleum is loaded and unloaded inside premises licensed under these rules and approved in writing for that class, with the exceptions the rule names: Class C where the Act allows unlicensed storage, a tank wagon at an earmarked railway siding, and an unloading forced by accident or breakdown, with fire precautions and supervision. The vehicle stays attended until the valves are shut and the filling pipe and discharge faucets are closed. Do not fill a motor-vehicle fuel tank directly from the tank vehicle. The aircraft case is the proviso, not a general permission.",
      "AIS-140 is a device specification for vehicle tracking on certain classes of vehicle. Whether this tanker must carry one is a permit and registration question. A phone dot is not an AIS-140 device. Driving-hour limits for goods vehicles are the Motor Vehicles Act and the CMVR limits, plus whatever shorter cap the plant writes for hazardous loads. Write the shorter cap in the contract if you want it. Do not describe a plant cap as a statute.",
    ],
    exhibits: hazchemExhibits["Route, parking, and attendance"],
  },
  {
    heading: "The first hour of a spill",
    paragraphs: [
      "The card exists for this hour. The driver stops, warns traffic, and calls the number on the card. The driver carries out only the actions that card assigns to the driver for that UN number, and only if the driver was trained for them. Entering the release, touching the product, or fighting a fire is for the responders the card names. A passer-by does not start a cleanup. The carrier controls the vehicle. The consignor owns the product advice and the accuracy of the UN number that put those actions on the card. A district administration can direct the cleanup. Occupier duties apply at the plant. None of those roles is optional because the contract has a strong indemnity clause.",
      "Do not hose a corrosive or a solvent into an open drain to clear the road. That is a second release, and it is often the one that reaches a watercourse before anyone opens the card. Do not borrow the fire method from the previous product. A water-reactive load and a flammable solvent do not share an action. If the card, the panel, and the order disagree, the driver still stops. Sorting the paperwork is not the first action.",
      "There is no ZAFTYS chart of incident causes on this page. Count your own spills, your own near misses, and your own gate rejects. Use those counts in the quarterly review.",
    ],
    exhibits: hazchemExhibits["The first hour of a spill"],
  },
  {
    heading: "The carrier agreement",
    paragraphs: [
      "A spot tanker from an open board is the wrong tool when a valve failure becomes an environmental case. The sourcing logic is the same as the [spot market versus dedicated fleets guide](/blog/spot-market-vs-dedicated-fleet-india). Spot covers a true surplus on a general lane. A named fleet covers a load you cannot insure after the fact. A product change makes that sharper, because the wash bay is part of the service. The operating home for a repeating tanker lane is a [dedicated fleet](/logistics/dedicated-fleet). The industry page is [chemical logistics](/industries/chemicals).",
      "Write the limits as contract terms, in the same way the freight guide writes fuel, toll, and detention as separate lines. The carrier carries only the UN numbers on the list. A new product is a variation, not a dispatch habit. The PESO or SMPV approval, the licence endorsement, the panel, the card, and the extinguishers are conditions of loading. A missing item is a rejected reporting. It is not a detention claim against the plant. The rupee stack for the kilometre, the toll, and the standing cost stays in the [freight rate guide](/blog/truck-freight-rates-india-cost-rate-benchmarking-guide). This contract adds the lines that guide does not have: wash, vapour space, a second person where rule 73 requires one, and a cleanup split.",
      "Name the wash bay. A certificate of cleanliness, or a cleanliness inspection, comes before a product change. A claim that the tank was cleaned in place is not the certificate. Empty return and cleaning time are priced lines. They are not a surprise detention bill after the vehicle has already been rejected for a heel of the last product. Rule 65, where it applies, already says a petroleum tank vehicle is not used for some other purpose unless the Chief Controller has said so. The contract should not quietly ask the same shell to carry an unlisted UN number on the way back.",
      "On a spill, the carrier stops, warns traffic, calls the number on the card, and does not hose a corrosive into a drain. The consignor supplies the product response. The contract should say who pays the cleanup. Indian law can reach the driver, the carrier, and the consignor. A clause that makes the carrier pay for the consignor's wrong UN number will not survive the first real incident. Cargo transit cover is not an environmental-remediation policy. Read the exclusions for pollution and for a defect in the vehicle. A goods-in-transit policy that excludes pollution is not the cover the product requires.",
    ],
    exhibits: hazchemExhibits["The carrier agreement"],
  },
  {
    heading: "What the dispatch file must hold",
    paragraphs: [
      "Keep the citations with the trip, the way the freight guide keeps the axle notification and the e-way bill rule with the rate card. CMVR Rules 129 to 137 for the declaration, the card, and the panel sizes. Petroleum Rules rules 63 to 76 for the vehicle, the net capacity, the trailer, the extinguishers, the attendance, the parking, and the loading place, on petroleum only. SMPV rules 18 and 19 for relief valves and the hydraulic interval, on pressure vessels only. Rule 124(4) if someone tries to paste the storage-tank air space onto the road shell. MoRTH S.O. 3467(E) of 16 July 2018 for the axles. The Methanol Institute sheet only if the product is methanol and the MSDS agrees.",
      "The dispatch record should be able to show, for this trip, the UN number, the proper shipping name, the loading temperature, the beta and density used, the vapour space kept, the registration on the vessel certificate, the retest date, the telephone that will be answered, and the weighbridge ticket with axle groups. A file that has the freight rate and not those lines is a commercial file. It is not a chemical dispatch. Under CGST Rule 138(10), a tanker that stays inside the Rule 93 limits for that vehicle uses one day of e-way bill validity per 200 km or part. The one-day-per-20 km clock is for over-dimensional cargo, and for a multimodal shipment with at least one leg by ship. A chemical tanker is not on that shorter clock merely because it is hazardous. If the load also exceeds Rule 93, use the [over dimensional cargo guidelines](/blog/odc-cargo-india-morth-hydraulic-trailer-route-survey-permits). A bulk product that moves as a rake, with trucks only at each end, is the [rail freight guide](/blog/rail-rakes-vs-road-ftl-india-dedicated-freight-corridor). The billing workflow for the e-way bill is in the [e-way bill guide](/blog/epod-fastag-eway-bill-billing-india). [ZAFTYS TMS](/zaftys-tms) is where that record can sit on the same trip as the weight. It does not replace the card in the cab.",
      "Before the barrier opens, confirm the vehicle, the product, the panel sizes, the card, the net litres against the rule that actually applies, and the mass against the axles. Headline readiness, a driver who has arrived, is how the worked petroleum truck in this article would have been loaded 600 litres over its certified net, with the wrong registration on the approval and a missing cab extinguisher. The questions under this article cover the panel and the card, petroleum class, the 97 percent net, ullage, the ISO tank chassis, the retest interval, where a petroleum tank may be loaded, and who contains a spill.",
    ],
    exhibits: hazchemExhibits["What the dispatch file must hold"],
  },
];
