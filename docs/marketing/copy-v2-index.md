# Copy V2  -  Library Index

| Field | Value |
|-------|-------|
| **Purpose** | Map of enterprise marketing copy drafts (`copy-v2-a` … `copy-v2-n`) |
| **Relationship to `copy.md`** | `copy.md` = live site snapshot · V2 = rewrite target |
| **Status** | **12 complete** · 1 stub (`copy-v2-k`) · ready for phased implementation |
| **Last reviewed** | July 2026 |

---

## File map

| File | Page / scope | Status | Maps to route |
|------|----------------|:------:|---------------|
| [copy-v2-a.md](./copy-v2-a.md) | Brand & messaging foundation | ✅ | All pages (reference) |
| [copy-v2-b.md](./copy-v2-b.md) | Home | ✅ | `/` |
| [copy-v2-c.md](./copy-v2-c.md) | Services | ✅ | `/services` |
| [copy-v2-d.md](./copy-v2-d.md) | Fleet & capacity | ✅ | `/fleet` |
| [copy-v2-e.md](./copy-v2-e.md) | TranZfort network | ✅ | `/network` |
| [copy-v2-f.md](./copy-v2-f.md) | ZAFTYS TSM / Platform | ✅ | `/technology` |
| [copy-v2-g.md](./copy-v2-g.md) | Trust & company (About) | ✅ | `/about` |
| [copy-v2-h.md](./copy-v2-h.md) | Partner program | ✅ | `/partner` |
| [copy-v2-i.md](./copy-v2-i.md) | Resources / knowledge center | ✅ | **Not routed** (future) |
| [copy-v2-j.md](./copy-v2-j.md) | Contact & consultation | ✅ | `/contact` |
| [copy-v2-k.md](./copy-v2-k.md) | UI copy library | ⬜ Stub | See `copy-v2-a` §Forms/UI |
| [copy-v2-l.md](./copy-v2-l.md) | SEO, metadata & legal | ✅ | All routes + `/privacy`, `/terms` |
| [copy-v2-m.md](./copy-v2-m.md) | Industries hub | ✅ | `/industries` |
| [copy-v2-n.md](./copy-v2-n.md) | Careers | ✅ | `/careers` |

---

## Low priority (live copy only in `copy.md`)

| Route | Notes |
|-------|--------|
| `/login` | Portal shell  -  meta in `copy-v2-l` |
| `404` | Meta in `copy-v2-l` |

---

## Recommended implementation order

| Phase | Files | Pages |
|-------|-------|-------|
| **0** | `copy-v2-a`, `copy-v2-l` | Voice rules + meta pass |
| **1** | `copy-v2-e`, `copy-v2-d` | Network, Fleet |
| **2** | `copy-v2-c`, `copy-v2-f` | Services, Platform |
| **3** | `copy-v2-b` (section-by-section) | Home |
| **4** | `copy-v2-g`, `copy-v2-h`, `copy-v2-m`, `copy-v2-n` | About, Partner, Industries, Careers |
| **5** | `copy-v2-j` | Contact |
| **Defer** | `copy-v2-i` | `/resources` |

---

## Open tasks

- [ ] Complete **copy-v2-k** (optional  -  extract from `copy-v2-a` or mark as alias)
- [ ] Legal review of **copy-v2-l** Privacy/Terms outlines before publish
- [ ] HR review of **copy-v2-n** job listings and perks language
- [ ] Sync approved V2 into `src/pages/*` and refresh `copy.md` snapshot
- [ ] WhatsApp remains primary CTA on site; V2 consultation CTAs as secondary

---

## Related docs

- [copy.md](./copy.md)  -  live site carbon copy
- [marketing-website-sitemap-new.md](./marketing-website-sitemap-new.md)  -  IA & task tracker
