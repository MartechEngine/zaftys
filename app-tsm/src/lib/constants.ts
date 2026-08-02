export const APP_NAME = "ZAFTYS TSM";
export const APP_TAGLINE =
  "Operations become easier when everyone sees the same information.";
export const COMPANY_EMAIL = "info@zaftys.com";
export const MARKETING_URL = "https://zaftys.com";

export type ShipmentStatus =
  | "pending"
  | "dispatched"
  | "at_plant"
  | "in_transit"
  | "at_weighbridge"
  | "delivered"
  | "cancelled"
  | "exception";

export type OriginType = "fleet" | "network" | "handoff";

export interface Shipment {
  id: string;
  publicId: string;
  client: string;
  origin: string;
  destination: string;
  commodity: string;
  tonnageMt: number;
  status: ShipmentStatus;
  originType: OriginType;
  driver?: string;
  vehicle?: string;
  eta?: string;
  lrNumber?: string;
  /** TranZfort-aligned structured place / material (optional; set by catalog pickers). */
  originState?: string;
  originLat?: number;
  originLng?: number;
  originLabel?: string;
  destinationState?: string;
  destinationLat?: number;
  destinationLng?: number;
  destinationLabel?: string;
  materialCode?: string;
}

export const NAV_ITEMS = [
  { href: "/", label: "Command Center", icon: "LayoutDashboard" as const },
  { href: "/shipments", label: "Shipments", icon: "Package" as const },
  { href: "/dispatch", label: "Dispatch", icon: "Kanban" as const },
  { href: "/map", label: "Live Map", icon: "Map" as const },
  { href: "/fleet", label: "Fleet", icon: "Truck" as const },
] as const;
