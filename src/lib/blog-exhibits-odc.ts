/** Deep-research exhibits: over-dimensional cargo in India. */
import type { BlogExhibit, BlogKpi } from "@/lib/blog-data";

export const odcKpis: readonly BlogKpi[] = [
  {
    value: "Rule 93",
    label: "Ordinary envelope",
    detail:
      "GSR 414(E) of 26 June 2020. Ordinary N2 or N3: 2.6 m by 12 m by 4.0 m. Semi-trailer with tractor, and truck-trailer: 2.6 m by 18.75 m by 4.0 m. Closed body or ISO container not above 4.52 m. Modular hydraulic trailer with a puller: 3.0 m by 29 m by 4.75 m. An indivisible load may be up to 4.75 m high. GSR 435(E), published 24 June 2021, says an N2 or N3 carrying an indivisible load shall not exceed 4.75 m.",
  },
  {
    value: "HT-1 to HT-13",
    label: "Hydraulic classes",
    detail:
      "MoRTH circular of 27 October 2025. A single indivisible ODC or OWC on a modular hydraulic trailer, on national highways. The class is the axle-line combination, not a marketing band.",
  },
  {
    value: "18 t",
    label: "Per axle row, on the HT chart",
    detail:
      "The 27 October 2025 circular draws the charts at not more than 18 tonnes per axle row, and paragraph 14.1 treats an axle row found above 18.0 tonnes on that move as a breach of the permission. It is not the axle limit for an ordinary truck. Workshop arithmetic: 120 t cargo plus 40 t trailer is 9 lines. A bridge posted at 15 t is 11 lines. Those counts are not a permission. The portal can still refuse a span.",
  },
  {
    value: "7 days",
    label: "HT-4 to HT-13 review",
    detail:
      "The regional office has up to 7 days to review the bridge list. If it does not update the list, the portal treats the route as feasible and opens the fee. The letter still issues only after payment. HT-1 to HT-3 can clear on payment when the route passes.",
  },
  {
    value: "20 km",
    label: "E-way bill, ODC",
    detail:
      "CGST Rule 138(10). Ordinary cargo, including an in-gauge tanker and a rail rake that is not over-dimensional, is one day per 200 km or part. Over-dimensional cargo, and a multimodal shipment with a ship leg, is one day per 20 km or part.",
  },
  {
    value: "₹1,200",
    label: "Lowest fee band, per 50 km",
    detail:
      "Paragraph 13 of the 27 October 2025 circular, for the national-highway journey: HT-1 to HT-3 ₹1,200, HT-4 to HT-6 ₹2,400, HT-7 to HT-9 ₹3,600, HT-10 to HT-13 ₹4,800 per 50 km or part, when gross combination weight including the puller stays inside the permitted limit. The Madhya Pradesh order of 14 July 2025 uses the same four bands on MPRDC roads. Neither figure is a trailer hire rate.",
  },
] as const;

export const odcTakeaways = [
  "Over-dimensional and overweight are different tests. A piece can be one, the other, or both.",
  "Rule 93 after GSR 414(E) is the ordinary envelope. An N3 goods vehicle is 2.6 m by 12 m by 4.0 m. A semi-trailer with a tractor is 2.6 m by 18.75 m by 4.0 m. A modular hydraulic trailer with a puller is 3.0 m by 29 m by 4.75 m. An indivisible load on an N2 or N3 may be up to 4.75 m high.",
  "The 27 October 2025 circular draws HT-1 to HT-13 at not more than 18 tonnes per axle row. The gross weights in that table are without the puller. HT-10 to HT-13 count the attachment weight inside gross vehicle weight.",
  "The permission letter sets speed, hours, and escort. If the regional office does not update the bridge list within 7 days, the portal opens the fee. The letter still issues only after payment.",
  "There is no honest national trailer-hire rate per km. The portal fee is a separate published band per 50 km. Split hire, puller, fuel, civil work, permissions, toll, empty return, and waiting.",
  "A MoRTH letter is a national-highway permission. State roads, a utility shutdown, a railway span, and a loaded height above 4.75 m are separate problems. The 2012 bridge study does not cover a limit-state bridge under IRC 6 or IRC 112.",
] as const;

export const odcReferences = [
  "Central Motor Vehicles Rules, 1989, Rule 93, substituted by [GSR 414(E) of 26 June 2020](https://cgtransport.gov.in/GadgetPDF_File/26062020_GSR%20414%28E%29-dated-26th-June-2020-regardind-dimension-of-vehicles-new.pdf), Gazette Extraordinary No. 314, in force on publication. Ordinary N2 or N3: 2.6 m wide, 12 m long, 4.0 m high. Semi-trailer with tractor, and truck-trailer or tractor-trailer: 2.6 m wide, 18.75 m long, 4.0 m high. Closed body or ISO, fabricated, or refrigerated container on an N-category vehicle or a semi-trailer: not above 4.52 m. Modular hydraulic trailer with a puller: 3.0 m wide, 29.0 m long, 4.75 m high. A single module with at most eight axle rows: 3.0 m by 19.0 m by 4.75 m. Indivisible-load height in that notification: up to 4.75 m. [GSR 435(E) of 18 June 2021](https://www.indiacode.nic.in/ViewFileUploaded?file=14th_gsr_435%28e%29_dated_18th_june_2021_indivisible_loads.pdf&path=AC_CEN_30_42_00009_198859_1517807326286%2Fnotificationindividualfile%2F), published 24 June 2021: an N2 or N3 vehicle engaged to carry an indivisible load shall not exceed 4.75 m.",
  "[MoRTH circular of 27 October 2025](https://morth.gov.in/backend/documents/uploaded/1778746634_CF1xP2qDBr.pdf), RW/NH-35072/01/2010-S&R(B): online permission for a single indivisible over-dimensional or overweight cargo on modular hydraulic trailers HT-1 to HT-13, on national highways, at www.morth-owc.nic.in. The charts are drawn at not more than 18 tonnes per axle row, and the table gross weight is without the puller. The puller on that chart is a 3-axle ballast tractor of up to 25 tonnes. Paragraph 13 sets the national-highway fee at ₹1,200, ₹2,400, ₹3,600, and ₹4,800 per 50 km or part, by those HT bands, when gross combination weight including the puller stays inside the permitted limit. HT-1 to HT-3 can issue on payment when the bridge screen passes. HT-4 to HT-13: if the regional office does not update the bridge list within 7 days, the portal treats the route as feasible and opens the fee. The letter issues on payment. This circular supersedes the guidelines of 17 January 2024 and 12 June 2024.",
  "[MoRTH S.O. 3467(E), 16 July 2018](https://taxguru.in/corporate-law/maximum-safe-axle-weight-transport-vehicles.html): ordinary axle weights and the 49 tonne rigid and 55 tonne combination caps. The notification leaves a modular hydraulic trailer to the permission. This move uses that permission. It does not repeal the axle guide for ordinary trucks.",
  "National Highways Fee (Determination of Rates and Collection) Rules, 2008, for ordinary vehicle categories only. A modular trailer that does not fit a lane is a special passage. Read the plaza receipt. Do not multiply a car toll by ten.",
  "[Madhya Pradesh Road Development Corporation order of 14 July 2025](https://apms.mp.gov.in/public_docs/OWC_ODL_Guidelines.pdf), on MPRDC roads: Rs 1,200, Rs 2,400, Rs 3,600, and Rs 4,800 per 50 km or part, for HT-1 to HT-3, HT-4 to HT-6, HT-7 to HT-9, and HT-10 to HT-13. That order adopts the bands then in the 17 January 2024 MoRTH circular. The 27 October 2025 circular prints the same bands for the national-highway journey. The Madhya Pradesh charge is still a state-road fee. It is not a trailer hire rate, and it does not replace the national-highway fee on a national highway.",
  "[Central Goods and Services Tax Rules, 2017, Rule 138(10)](https://taxinformation.cbic.gov.in/content/html/tax_repository/gst/rules/cgst_rules/active/chapter16/rule138_v1.00.html): one day per 200 km or part for ordinary cargo. One day per 20 km or part for over-dimensional cargo, and for a multimodal shipment with at least one leg by ship. A rail leg by itself is not that ship leg.",
] as const;

export const odcExhibits: Record<string, readonly BlogExhibit[]> = {
  "What counts as over dimensional cargo": [
    {
      kind: "table",
      caption: "Three working classes. Not a second statute.",
      source: "Rule 93 is the ordinary envelope. The HT number is the portal class for a single indivisible piece on a modular hydraulic trailer.",
      headers: ["Class", "What it usually is", "Equipment"],
      rows: [
        ["Inside the envelope, awkward", "Long steel or a tall crate that still measures inside Rule 93", "Semi-low or low-bed. No ODC permission"],
        ["ODC or OWC, mechanical", "Over length, width, or height. Mass still within the trailer and the bridges", "Low-bed or extendable, with permission if any dimension is outside Rule 93"],
        ["Hydraulic modular", "One indivisible heavy piece on axle lines", "HT-1 to HT-13, puller, MoRTH portal on national highways"],
      ],
    },
  ],
  "The trailer and the puller": [
    {
      kind: "tiles",
      caption: "Deck choice follows the piece. The loads are not interchangeable.",
      source: "Working descriptions. The manufacturer's manual is the definition of the hydraulic circuit.",
      items: [
        { title: "Drop deck or low bed", body: "Height is the problem and the mass is moderate." },
        { title: "High girder or vessel bridge", body: "The piece is tall and the deck has to pass under it." },
        { title: "Schnabel", body: "The cargo itself is the structural member between two trailer sets." },
        { title: "Extendable", body: "A blade or a long column. The lashing plan is part of the survey." },
      ],
    },
    {
      kind: "table",
      caption: "HT-1 to HT-13. Gross weight without the puller. Not a hire rate.",
      source: "MoRTH circular of 27 October 2025. The column in the circular is headed number of axles, and the same page caps each axle row at 18 tonnes. HT-1 is 4 and 72 tonnes, so those words are the same unit. Do not count the left stub and the right stub as two. Gross weight is without the puller. The puller is treated as a 3-axle ballast tractor of up to 25 tonnes with ballast. HT-10 to HT-13: attachment weight is part of gross vehicle weight and must be declared.",
      headers: ["Class", "Rows at 18 t", "Gross, tonnes", "Arrangement"],
      rows: [
        ["HT-1", "4", "72", "No bolster or girder named"],
        ["HT-2", "6", "108", "No bolster or girder named"],
        ["HT-3", "8", "144", "No bolster or girder named"],
        ["HT-4", "10", "180", "No bolster or girder named"],
        ["HT-5", "12", "216", "No bolster or girder named"],
        ["HT-6", "14", "252", "No bolster or girder named"],
        ["HT-7", "16", "288", "No bolster or girder named"],
        ["HT-8", "18", "324", "No bolster or girder named"],
        ["HT-9", "20", "360", "No bolster or girder named"],
        ["HT-10", "8+8", "288", "Turn-table bolster. Attachment is inside the gross"],
        ["HT-11", "10+10", "360", "Turn-table bolster. Attachment is inside the gross"],
        ["HT-12", "14+14", "504", "Girder. Attachment is inside the gross"],
        ["HT-13", "16+16", "576", "Girder. Attachment is inside the gross"],
      ],
    },
  ],
  "Axle lines, bridges, and stability": [
    {
      kind: "image",
      caption: "Screening sum. The portal can demand more.",
      source: "Workshop only. Cargo 120 tonnes, trailer 40 tonnes. 160 / 18 = 8.89, so 9 lines. 160 / 15 = 10.67, so 11 lines. Round up.",
      src: "/images/blog/odc-axle-lines.png",
      alt: "Formula board: axle lines equal cargo plus trailer divided by the allowable tonnes per line, giving 9 lines or 11 lines",
    },
    {
      kind: "image",
      caption: "A static tip sketch. It is not a camber certificate.",
      source: "Theta is arctan of track over twice the centre-of-gravity height, for a rigid block. A free hydraulic circuit is not that block. Six to eight degrees of cross-fall is a road warning, not theta.",
      src: "/images/blog/odc-tip-sketch.png",
      alt: "Formula board for the static tip angle, with a note that road cross-fall is not that angle",
    },
    {
      kind: "table",
      caption: "Bridges the 27 October 2025 circular will not clear.",
      source: "Circular RW/NH-35072/01/2010-S&R(B), paragraph 7. The 2012 study does not apply to a limit-state bridge under IRC 6 or IRC 112. A span the charts do not cover needs its own study.",
      headers: ["Bridge", "HT classes refused"],
      rows: [
        ["Simply supported span over 50 m, not designed for SV loading of IRC 6", "HT-1 to HT-13"],
        ["Not simply supported, and not designed for SV loading of IRC 6", "HT-1 to HT-13"],
        ["Not simply supported, even if designed for SV loading of IRC 6", "HT-12 and HT-13"],
        ["Coded red or orange as distressed on the portal", "HT-1 to HT-13"],
        ["Already under a load restriction, or rated under IRC 6 capacity", "HT-1 to HT-13"],
        ["Designed by the limit-state method, not SV loading of IRC 6", "HT-1 to HT-13"],
      ],
    },
  ],
  "The route survey": [
    {
      kind: "tiles",
      caption: "Walk the road the loaded trailer will use, in the same direction.",
      source: "A drone picture does not replace the measurement at the wire. There is no published national share of surveys that need civil work.",
      items: [
        { title: "Horizontal", body: "Junctions, roundabouts, toll mouths, and ghat hairpins. Steering helps. Length still needs the road." },
        { title: "Vertical", body: "High-tension lines, rail overbridges, toll canopies, footbridges, and trees. Deck height plus cargo height is the number." },
        { title: "Ground", body: "Rail crossings, humps, and a dip that bottoms a low girder." },
        { title: "Bridges", body: "Span, posting, and the HT class the portal will accept." },
      ],
    },
  ],
  "The MoRTH permission portal": [
    {
      kind: "steps",
      caption: "Six stages. A letter is the permission. A screen is not.",
      source: "MoRTH circular RW/NH-35072/01/2010-S&R(B), 27 October 2025, for a single indivisible unit on HT-1 to HT-13 on national highways.",
      items: [
        { title: "Consignor upload", body: "Dimensions, origin, and destination. Nominate a registered transporter." },
        { title: "Transporter file", body: "Modular trailer, puller, driver, and a route with a station at least every 100 km." },
        { title: "VAHAN and Sarathi", body: "A failed document cannot pay and proceed." },
        { title: "Bridge screen", body: "The transporter picks a route the selected HT class may cross." },
        { title: "HT-1 to HT-3", body: "If the route passes, the fee demand is immediate. The letter can issue on payment." },
        { title: "HT-4 to HT-13", body: "Up to 7 days on the bridge list. No update opens the fee. The letter still issues only after payment." },
      ],
    },
    {
      kind: "bars",
      caption: "Same four bands. National highways and MPRDC roads. Not a trailer hire rate.",
      source: "MoRTH circular of 27 October 2025, paragraph 13, per 50 km or part of the national-highway journey, when gross combination weight including the puller stays inside the permitted limit. Madhya Pradesh Road Development Corporation order of 14 July 2025 uses the same bands on its own roads.",
      unit: "₹ / 50 km",
      items: [
        { label: "HT-1 to HT-3", value: 1200 },
        { label: "HT-4 to HT-6", value: 2400 },
        { label: "HT-7 to HT-9", value: 3600 },
        { label: "HT-10 to HT-13", value: 4800 },
      ],
    },
  ],
  "How to price a project move": [
    {
      kind: "table",
      caption: "Split the quote. There is no single per-km hire for India.",
      source: "A normal full-truckload card does not price this move. Empty return is its own line.",
      headers: ["Line", "What it pays for", "How to ask"],
      rows: [
        ["Axle-line hire", "The trailer, including the days it is under the piece", "Days from mobilisation to release"],
        ["Puller", "Tractor, driver, ballast", "Separate from the trailer"],
        ["Fuel", "The puller, and a pusher if the grade needs one", "Litres, not a slogan"],
        ["Route preparation", "Wire lift, tree cut, mat, or bypass", "A named contractor invoice"],
        ["Permissions", "MoRTH, state, police, municipal", "Receipts"],
        ["Toll", "The special passage", "The plaza receipt"],
        ["Empty return", "Trailer and puller back to base, or to the next job", "Its own line"],
        ["Waiting", "A shutdown or a bridge inspection that slips", "A day rate written before the move"],
      ],
    },
    {
      kind: "image",
      caption: "Fuel is litres times the diesel print. It is not the trailer hire.",
      source: "Workshop range 0.8 to 1.2 km per litre for a heavy pull. 100 km at 0.8 km per litre is 125 litres. At the Delhi print of ₹95.20 used in the freight-rate guide, that is ₹11,900. At 1.2 km per litre, 100 / 1.2 is 83.33 litres and ₹7,933.",
      src: "/images/blog/odc-fuel-litres.png",
      alt: "Formula board converting a heavy-pull kilometre range into litres and a diesel cost",
    },
    {
      kind: "table",
      caption: "Mechanical low-bed versus hydraulic modular. No multiple of a normal rate.",
      source: "Speed comes from the permission letter in both columns. The bridge sees different things.",
      headers: ["Question", "Mechanical low-bed", "Hydraulic modular"],
      rows: [
        ["When it is the tool", "A dimension outside Rule 93, mass the trailer and the bridges can take", "One indivisible heavy piece, HT-1 to HT-13"],
        ["What the bridge sees", "That trailer's axle loads", "Gross per axle line, or the posting if it is lower"],
        ["Who sets the speed", "The permission letter", "The permission letter"],
        ["What the quote must split", "Hire, fuel, permits, empty return", "Axle-line hire, puller, fuel, civil work, permits, toll, empty return, waiting"],
      ],
    },
  ],
  "Speed, escort, and the toll plaza": [
    {
      kind: "table",
      caption: "Read these off the permission letter. Do not copy a speed from a blog.",
      source: "Annexure-VI of the MoRTH circular of 27 October 2025 is the conditions sheet. The numbers live on the letter you were issued.",
      headers: ["Line on the letter", "What it controls", "What a blog must not do"],
      rows: [
        ["Speed", "The combination on that route", "Treat a remembered speed band as a statute"],
        ["Hours", "Daylight, if the letter says daylight", "A night run to save a day"],
        ["Escort", "Pilot, warning vehicle, and people on the ground, as written", "Treat a typical hydraulic move as a national minimum"],
        ["Route", "The path the portal accepted", "A shortcut around a stalled escort"],
        ["Parking", "The surveyed bay named for the night", "A village shoulder"],
      ],
    },
  ],
  "Insurance and lashing": [
    {
      kind: "tiles",
      caption: "What a route warranty assumes. No incident chart.",
      source: "The slip and the cargo drawing. A photograph of chains after the fact is not the plan.",
      items: [
        { title: "Surveyed route", body: "The measurements and the path in the survey pack, not a later shortcut." },
        { title: "The letter's hours", body: "If the letter says daylight, a night run is outside the warranty assumption." },
        { title: "Lashing the drawing allows", body: "Chains, binders, and dunnage rated for the piece. No invented lugs on a transformer." },
        { title: "Named surveyor", body: "Sees the lashing before the trailer rolls, if the slip says so." },
      ],
    },
  ],
  "What the dispatch file must hold": [
    {
      kind: "steps",
      caption: "Six papers before the trailer rolls. A missing one stops the move.",
      source: "Annexure-VI of the 27 October 2025 circular is the conditions sheet on the letter. A utility shutdown and a surveyor sign-off apply when that letter or the insurance slip requires them.",
      items: [
        {
          title: "Permission letter",
          body: "The portal letter, including the Annexure-VI conditions: speed, hours, escort, and the route that was accepted.",
        },
        {
          title: "Route survey",
          body: "Measurements and photographs for the loaded path. Name the engineer where a bridge is not an obvious pass.",
        },
        {
          title: "Cargo drawing",
          body: "Dimensions, and the centre of gravity if the manufacturer issued it. The lashing plan has to match that drawing.",
        },
        {
          title: "Puller and trailer papers",
          body: "Registrations for the puller and the modular lines, and the drivers checked on Sarathi.",
        },
        {
          title: "Utility and escort",
          body: "The wire shutdown, or the police escort receipt, when the survey or the letter requires it. Not on every move.",
        },
        {
          title: "Route warranty",
          body: "The insurance slip for the surveyed route, and the named surveyor's lashing sign-off if the slip requires it.",
        },
      ],
    },
  ],
};
