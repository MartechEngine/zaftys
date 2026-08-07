export type TripStatus = "at_plant" | "in_transit" | "at_weighbridge" | "delivered";

export type DemoTrip = {
  id: string;
  cargo: string;
  route: string;
  vehicle: string;
  driver: string;
  origin: "Own fleet" | "Network";
  status: TripStatus;
};

export const STATUS_ORDER: TripStatus[] = [
  "at_plant",
  "in_transit",
  "at_weighbridge",
  "delivered",
];

export const STATUS_LABEL: Record<TripStatus, string> = {
  at_plant: "At plant",
  in_transit: "In transit",
  at_weighbridge: "Weighbridge",
  delivered: "Delivered",
};

export const STATUS_CLASS: Record<TripStatus, string> = {
  at_plant: "tms-status-plant",
  in_transit: "tms-status-transit",
  at_weighbridge: "tms-status-weigh",
  delivered: "tms-status-delivered",
};

export const BOARD_COLUMNS: { key: TripStatus; label: string }[] = [
  { key: "at_plant", label: "At plant" },
  { key: "in_transit", label: "En route" },
  { key: "at_weighbridge", label: "Weighbridge" },
  { key: "delivered", label: "Delivered" },
];

/** Fixture trips  -  sample corridor data for marketing sneak peek */
export const DEMO_TRIPS: DemoTrip[] = [
  {
    id: "ZFT-2026-0142",
    cargo: "Bagged cement · 28T",
    route: "Amravati → Nagpur",
    vehicle: "MH-27-AX-4412 · Tipper",
    driver: "R. Patil",
    origin: "Own fleet",
    status: "at_plant",
  },
  {
    id: "ZFT-2026-0138",
    cargo: "Steel coils · 32T",
    route: "Jalna → Pune",
    vehicle: "MH-12-CD-9081 · Flatbed",
    driver: "S. Jadhav",
    origin: "Own fleet",
    status: "in_transit",
  },
  {
    id: "ZFT-2026-0131",
    cargo: "Aggregates · 25T",
    route: "Chandrapur → Wardha",
    vehicle: "MH-34-EF-2207 · Tipper",
    driver: "A. Deshmukh",
    origin: "Network",
    status: "at_weighbridge",
  },
  {
    id: "ZFT-2026-0124",
    cargo: "Clinker · 30T",
    route: "Yavatmal → Akola",
    vehicle: "MH-29-GH-5519 · Tipper",
    driver: "V. More",
    origin: "Own fleet",
    status: "delivered",
  },
];

export const DEMO_KPIS = [
  { label: "Active trips", value: "18" },
  { label: "At plant", value: "4" },
  { label: "Exceptions", value: "1" },
  { label: "ePOD today", value: "7" },
] as const;
