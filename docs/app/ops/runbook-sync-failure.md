# Runbook — Sync Failure

| Severity | High — dispatch board stale |

---

## Symptoms

- Orange banner: "Network data is catching up"
- TranZfort bookings not appearing in Unassigned
- `last_sync_at` > 5 minutes

---

## Diagnosis

1. Check sync worker logs on VPS
2. Verify TranZfort Supabase reachable
3. Verify Fleetbase API healthy (`curl localhost:8000/health`)
4. Check dead letter queue / failed job table

---

## Resolution steps

| Step | Action |
|------|--------|
| 1 | Restart sync worker |
| 2 | If Supabase down — wait + notify TranZfort ops |
| 3 | If Fleetbase down — restart Docker stack |
| 4 | Manual replay: trigger sync for missed `trips` IDs |
| 5 | Verify booking appears in dispatch within 2 min |

---

## Manual replay (temporary)

```bash
# Example — implement in sync worker CLI
npm run sync:replay -- --trip-id=<uuid>
```

---

## Escalation

- > 30 min outage: notify leadership + use phone dispatch fallback
- Document incident in ops log

---

## Prevention

- Alert on sync lag > 5 min
- Idempotent upsert by `tranzfort_id`
- Weekly sync drill in staging

---

## Document history

| Date | Change |
|------|--------|
| Jul 2026 | Initial runbook |
