# API Conventions — TSM BFF

| Base URL | `https://app.zaftys.com/api` |

---

## Versioning

Unversioned `/api/*` for full product. Add `/api/v1/*` prefix if breaking changes needed.

---

## Authentication

| Type | Header |
|------|--------|
| Session | Cookie `session=...` |
| Public track | Token in URL path `/api/track/:token` |

---

## Response format

### Success

```json
{
  "data": { },
  "meta": { "timestamp": "2026-07-11T10:00:00Z" }
}
```

### Error

```json
{
  "error": {
    "code": "SHIPMENT_NOT_FOUND",
    "message": "Shipment not found."
  }
}
```

---

## HTTP status codes

| Code | Use |
|------|-----|
| 200 | OK |
| 201 | Created |
| 400 | Validation error |
| 401 | Unauthenticated |
| 403 | Forbidden (RBAC) |
| 404 | Not found |
| 429 | Rate limited |
| 500 | Server error |

---

## Pagination

Query: `?page=1&limit=25`

Response meta:

```json
{
  "meta": {
    "page": 1,
    "limit": 25,
    "total": 142
  }
}
```

---

## Related

- [bff-endpoints.md](./bff-endpoints.md) — full endpoint catalog
- [openapi.md](./openapi.md)

---

## Document history

| Date | Change |
|------|--------|
| Jul 2026 | Initial API conventions |
