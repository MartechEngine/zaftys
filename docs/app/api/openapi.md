# OpenAPI Specification

| Status | Draft — expand when BFF is scaffolded |
|--------|----------------------------------------|

Full machine-readable spec will live here or at `openapi.yaml` in the portal repo.

---

## API paths (summary)

See [bff-endpoints.md](./bff-endpoints.md) for the complete list.

---

## Sample: Shipment schema

```yaml
Shipment:
  type: object
  required:
    - id
    - public_id
    - status
  properties:
    id:
      type: string
      format: uuid
    public_id:
      type: string
      example: ZFT-2026-0142
    status:
      type: string
      enum: [pending, dispatched, at_plant, in_transit, at_weighbridge, delivered, cancelled, exception]
    origin_type:
      type: string
      enum: [fleet, network, handoff]
    commodity:
      type: string
    tonnage_mt:
      type: number
    lr_number:
      type: string
    origin:
      $ref: '#/components/schemas/Place'
    destination:
      $ref: '#/components/schemas/Place'
    assigned_driver:
      $ref: '#/components/schemas/Driver'
    assigned_vehicle:
      $ref: '#/components/schemas/Vehicle'
    eta:
      type: string
      format: date-time
```

---

## Generation

When portal repo exists:

```bash
# Example: generate types from OpenAPI
npx openapi-typescript ./openapi.yaml -o ./src/types/api.ts
```

---

## Document history

| Date | Change |
|------|--------|
| Jul 2026 | Draft placeholder |
