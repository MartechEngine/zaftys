# India Compliance Fields

| Field | Value |
|-------|-------|
| **Parent** | [domain-model.md](../data/domain-model.md) |

Fields required for Indian industrial freight operations. MVP = capture + store; integrations = Phase 4.

---

## Organization

| Field | Required | Notes |
|-------|----------|-------|
| Legal name | ✅ | ZAFTYS Logistics |
| GSTIN | P2 | 15-char GST identification |
| Billing address | ✅ | Amravati HQ |
| PAN | P2 | For invoicing |

---

## Shipment / LR

| Field | MVP | Notes |
|-------|-----|-------|
| LR number | ✅ | Manual or auto-generated |
| LR date | ✅ | |
| Consignor name + GSTIN | ✅ | |
| Consignee name + GSTIN | P2 | |
| From / To (city + pin) | ✅ | |
| Commodity description | ✅ | cement, steel, etc. |
| Quantity / tonnage (MT) | ✅ | |
| Vehicle registration | ✅ | When assigned |
| Driver name + license | ✅ | When assigned |
| Freight amount | P4 | Billing phase |
| E-way bill number | P4 | Integration |

---

## Vehicle documents

| Document | Expiry tracked | Alert |
|----------|----------------|-------|
| Registration Certificate (RC) | ✅ | 30-day warning |
| Fitness certificate | ✅ | 30-day warning |
| Insurance | ✅ | 30-day warning |
| National permit | P2 | Interstate |
| State permit | P2 | |
| PUC | P2 | Pollution under control |

---

## Driver documents

| Document | Expiry tracked |
|----------|------------------|
| Driving license | ✅ |
| Aadhaar / ID | P2 |
| Medical fitness | P2 |

---

## Weighbridge (Phase 2)

| Field | Notes |
|-------|-------|
| Gross weight | MT |
| Tare weight | MT |
| Net weight | MT |
| Weighbridge slip photo | ePOD attachment type |
| Location + timestamp | Geotag |

---

## GST billing (Phase 4)

| Field | Notes |
|-------|-------|
| HSN/SAC code | Service classification |
| CGST / SGST / IGST split | By lane |
| Invoice number | Linked to shipment |
| Tally voucher export | Integration |

---

## Document history

| Date | Change |
|------|--------|
| Jul 2026 | Initial field list |
