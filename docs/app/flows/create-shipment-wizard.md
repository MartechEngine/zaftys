# Flow — Create Shipment Wizard

| Priority | P2 — post-MVP |

---

## Steps

```mermaid
flowchart LR
  S1[1 Client] --> S2[2 Route]
  S2 --> S3[3 Load details]
  S3 --> S4[4 Schedule]
  S4 --> S5[5 Review]
  S5 --> S6[Create → Unassigned queue]
```

---

## Step details

| Step | Fields |
|------|--------|
| Client | Client org, contact, GSTIN |
| Route | Origin, destination, corridor |
| Load | Commodity, tonnage, axle requirement |
| Schedule | Pickup window, plant slot, delivery ETA |
| Review | Summary + create button |

---

## Post-create

Redirect to `/dispatch` with new card highlighted.

Route: `/shipments/new`

---

## Document history

| Date | Change |
|------|--------|
| Jul 2026 | Initial wizard flow |
