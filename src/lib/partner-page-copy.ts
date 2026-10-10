/**
 * /partner copy. Two labeled partnerships on one URL.
 * Fleet path keeps TranZfort terms. Ownership path is an enquiry.
 * No em dash.
 */

export type PartnerPath = "fleet" | "first-truck" | "expand";
export type ExpandMode = "tranzfort" | "ownership";

export const fleetCard = {
  id: "fleet-partner",
  title: "Already own a truck or fleet?",
  lead: "Connect with ZAFTYS for freight on corridors you run. You keep operating your trucks.",
  bullets: [
    "Freight on lanes you run. Search is free. Broker fee on booked loads.",
    "Verification before a ZAFTYS-contracted trip. Network trucks stay labeled as partner capacity.",
    "GST billing and TMS on trips ZAFTYS contracts.",
  ],
  steps: ["Register", "Verify", "Onboard", "Take loads"],
  cta: "Join as a fleet partner",
} as const;

export const ownershipCard = {
  id: "ownership-partner",
  title: "Want to start with a truck you own?",
  lead: "Enquire about a new or used truck and an operating partnership. You would own the truck.",
  bullets: [
    "You own the truck. ZAFTYS helps with freight, driver, dispatch, and reporting.",
    "Any vehicle loan is with a lender. We help you explore financing.",
    "First trucks are often explored around ₹10-15 lakh in starting capital.",
  ],
  steps: ["Apply", "Assess", "Select / finance", "Sign, then operate"],
  money: "Freight in, approved expenses and EMI out, remainder shared as the agreement says.",
  cta: "Start my trucking enquiry",
} as const;

export const fleetCountOptions = [
  { value: "1", label: "1 truck" },
  { value: "2-5", label: "2-5 trucks" },
  { value: "6-10", label: "6-10 trucks" },
  { value: "11-20", label: "11-20 trucks" },
  { value: "20+", label: "More than 20" },
] as const;

export const capitalOptions = [
  { value: "below-10", label: "Below ₹10 lakh" },
  { value: "10-15", label: "₹10-15 lakh" },
  { value: "15-25", label: "₹15-25 lakh" },
  { value: "25-plus", label: "₹25 lakh or more" },
] as const;

export const conditionOptions = [
  { value: "new", label: "New truck" },
  { value: "used", label: "Used truck" },
  { value: "guidance", label: "Open to guidance" },
] as const;

export const vehicleOptions = [
  { value: "open", label: "Open body" },
  { value: "container", label: "Container or trailer" },
  { value: "tipper", label: "Tipper" },
  { value: "tanker", label: "Tanker" },
  { value: "unsure", label: "Not sure yet" },
] as const;

export const additionalVehicleOptions = [
  { value: "1", label: "1 vehicle" },
  { value: "2-5", label: "2-5 vehicles" },
  { value: "6+", label: "6 or more" },
] as const;

export const partnerFaqs = {
  fleetTitle: "TranZfort and network loads",
  ownershipTitle: "Truck ownership partnership",
  fleet: [
    {
      q: "Can I join TranZfort without a truck?",
      a: "The fleet path is for people who already operate a truck. If you are still buying your first vehicle, use the ownership enquiry.",
    },
    {
      q: "What does it cost to find loads?",
      a: "Listing and search are free. Truckers pay a broker fee on booked loads. Registration, documents, insurance, and a real operating pattern are checked before a ZAFTYS-contracted trip. Those trips can be billed through ZAFTYS and closed in ZAFTYS TMS.",
    },
    {
      q: "How do I get loads on TranZfort?",
      a: "After verification, you find freight on corridors you already run. Network trucks stay labeled as partner capacity. Listing and search are free. A broker fee applies on booked loads.",
    },
  ],
  ownership: [
    {
      q: "Can I enquire before I own a truck?",
      a: "Yes. The enquiry is a conversation about fit. Operations under a partnership start only after you have a truck and a signed agreement.",
    },
    {
      q: "Is ₹10-15 lakh enough to start?",
      a: "It is a typical starting-capital band for a first-truck conversation, not a sticker price. Vehicle cost, down payment, and working capital sit around that figure. A used truck can be discussed after inspection and price.",
    },
    {
      q: "Who owns the truck, and who takes the loan?",
      a: "You own the truck, subject to registration and any financing on the vehicle. If there is a loan, you are the borrower. The lender decides approval. ZAFTYS does not take ownership or that loan by coordinating logistics.",
    },
    {
      q: "How is profit calculated, and how does ZAFTYS earn?",
      a: "Freight collected, minus operating expenses, EMI, and agreed reserves. What remains is shared under the partnership agreement. Fuel, tolls, driver cost, and repairs are operating costs. On TranZfort, ZAFTYS charges a broker fee on booked loads. On an ownership partnership, ZAFTYS earns as the operating agreement specifies.",
    },
    {
      q: "Can I add another truck later?",
      a: "Yes. An ownership partnership can start with one truck and discuss another when the work supports it. Exit and sale follow the agreement, the vehicle papers, and the financier's terms.",
    },
  ],
} as const;

export const formCopy = {
  title: "Partnership enquiry",
  lead: "Pick a path. We reply from the desk. We do not ask for identity documents.",
  consent:
    "Submitting sends these details to the ZAFTYS desk so we can reply. We do not ask for Aadhaar, PAN, or bank details on this form.",
  successFleet: "Application received. Our fleet team will contact you about verification and next steps.",
  successOwnership:
    "Enquiry received. ZAFTYS will review fit and follow up.",
  error: "Something went wrong. Please try again later.",
} as const;

export const closeCopy = {
  h2: "Prefer to talk first?",
  lead: "WhatsApp or email the desk. TranZfort stays the live marketplace if you already have a truck.",
} as const;
