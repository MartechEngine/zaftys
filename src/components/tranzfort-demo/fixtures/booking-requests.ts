export type BookingRequest = {
  id: string;
  truckerName: string;
  rating: number;
  verified: boolean;
  bodyType: string;
  tyres: number;
  truckLabel: string;
  submittedAt?: string;
};

export const SAMPLE_BOOKING_REQUESTS: BookingRequest[] = [
  {
    id: "br-1",
    truckerName: "Rajesh K.",
    rating: 4.8,
    verified: true,
    bodyType: "Open",
    tyres: 10,
    truckLabel: "MH-12 AB 4521",
    submittedAt: "12 min ago",
  },
  {
    id: "br-2",
    truckerName: "Suresh M.",
    rating: 4.6,
    verified: true,
    bodyType: "Open",
    tyres: 12,
    truckLabel: "GJ-06 CD 8890",
  },
  {
    id: "br-3",
    truckerName: "Manjeet S.",
    rating: 4.9,
    verified: true,
    bodyType: "Container",
    tyres: 10,
    truckLabel: "PB-03 EF 2210",
  },
];
