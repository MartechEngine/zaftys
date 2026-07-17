import type { Shipment } from "./constants";

export const mockShipments: Shipment[] = [
  {
    id: "1",
    publicId: "ZFT-2026-0142",
    client: "Acme Cement",
    origin: "Amravati",
    destination: "Nagpur",
    commodity: "Cement",
    tonnageMt: 32,
    status: "in_transit",
    originType: "fleet",
    driver: "R. Sharma",
    vehicle: "MH-27-AB-1234",
    eta: "Today, 2:00 PM",
    lrNumber: "LR-2026-8891",
  },
  {
    id: "2",
    publicId: "ZFT-2026-0143",
    client: "Steel Corp",
    origin: "Wardha",
    destination: "Pune",
    commodity: "Steel coils",
    tonnageMt: 28,
    status: "pending",
    originType: "network",
    eta: "Today, 4:30 PM",
  },
  {
    id: "3",
    publicId: "ZFT-2026-0138",
    client: "FMCG Distributors",
    origin: "Nagpur",
    destination: "Amravati",
    commodity: "FMCG",
    tonnageMt: 18,
    status: "delivered",
    originType: "fleet",
    driver: "A. Patil",
    vehicle: "MH-27-CD-5678",
    lrNumber: "LR-2026-8870",
  },
  {
    id: "4",
    publicId: "ZFT-2026-0140",
    client: "Mining Ltd",
    origin: "Chandrapur",
    destination: "Amravati",
    commodity: "Iron ore",
    tonnageMt: 40,
    status: "exception",
    originType: "fleet",
    driver: "V. Khan",
    vehicle: "MH-27-EF-9012",
    eta: "Delayed +45m",
  },
];

export const mockKpis = {
  activeTrips: 12,
  exceptions: 2,
  atPlant: 3,
  networkOverflow: 5,
};

export const mockExceptions = [
  {
    id: "4",
    publicId: "ZFT-2026-0140",
    reason: "Late ETA (+45m)",
  },
  {
    id: "2",
    publicId: "ZFT-2026-0143",
    reason: "Unassigned - network booking",
  },
];

export const mockVehicles = [
  {
    id: "v1",
    registration: "MH-27-AB-1234",
    type: "Multi-axle",
    capacityMt: 35,
    driver: "R. Sharma",
    status: "on_trip" as const,
    docs: "valid" as const,
  },
  {
    id: "v2",
    registration: "MH-27-CD-5678",
    type: "Trailer",
    capacityMt: 40,
    driver: "A. Patil",
    status: "available" as const,
    docs: "expiring" as const,
  },
];

export const mockDrivers = [
  {
    id: "d1",
    name: "R. Sharma",
    phone: "+91 98765 43210",
    license: "MH-2020-1234567",
    licenseExpiry: "2027-03-15",
    vehicle: "MH-27-AB-1234",
    status: "on_trip" as const,
  },
  {
    id: "d2",
    name: "A. Patil",
    phone: "+91 98765 43211",
    license: "MH-2019-7654321",
    licenseExpiry: "2026-08-20",
    vehicle: "MH-27-CD-5678",
    status: "on_duty" as const,
  },
];
