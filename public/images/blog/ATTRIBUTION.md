# Blog hero image attribution

Images live in `public/images/blog/`.

| Blog slug | File | Source |
|-----------|------|--------|
| reduce-empty-return-trips | `/images/blog/reduce-empty-return-trips.jpg` | Unsplash (CHUTTERSNAP) - free [Unsplash License](https://unsplash.com/license). Photo: [photo-1601584115197-04ecc0da31d7](https://unsplash.com/photos/photo-1601584115197-04ecc0da31d7) |
| planning-industrial-shipments | `/images/blog/planning-industrial-shipments.jpg` | Generated for ZAFTYS blog (ops planning scene) |
| cement-plant-loading-windows | `/images/blog/cement-plant-loading-windows.jpg` | Generated for ZAFTYS blog (tipper at plant) |
| steel-coil-transport-basics | `/images/blog/steel-coil-transport-basics.jpg` | Generated for ZAFTYS blog (coils on flatbed) |
| tms-for-heavy-haul | `/images/blog/tms-for-heavy-haul.jpg` | Generated for ZAFTYS blog (dispatch desk / TMS) |
| container-trucking-logistics-india | `/images/blog/container-trucking-logistics-india.jpg` | Generated for ZAFTYS blog (port hinterland containers) |
| truck-freight-rates-india-cost-rate-benchmarking-guide | `/images/blog/truck-freight-rates-india-cost-benchmark.jpg` | Generated for ZAFTYS blog (steel coils, Indian highway toll plaza). Not stamped. |
| transit-damage-shortage-cargo-insurance-india-carrier-liability-guide | `/images/blog/transit-damage-shortage-cargo-insurance-india.jpg` | Temporary reuse of planning-industrial-shipments warehouse hero pending a dedicated dock / claim-scene photo. Formula boards: `transit-rule12-ten-times-freight.png`, `transit-billable-shortage-equation.png` (rendered + stamped via `scripts/render-transit-damage-cards.py`). |
| ftl-vs-ptl-freight-services-india-cost-break-even-guide | `/images/blog/ftl-vs-ptl-freight-services-india.jpg` | Generated for ZAFTYS blog (sealed closed-body FTL loading at factory dock). Formula / waterfall boards via `scripts/render-ftl-vs-ptl-cards.py`. |
| online-truck-load-marketplaces-india-freight-apps-guide | `/images/blog/online-truck-load-marketplaces-india.jpg` | Generated for ZAFTYS blog (Transport Nagar / yard matching with dispatcher phone). Formula / process / waterfall boards via `scripts/render-load-marketplace-cards.py` (logo stamped once). |
| gst-on-gta-rcm-forward-charge-consignment-note-rules-guide | `/images/blog/gst-on-gta-rcm-forward-charge-india.jpg` | Generated for ZAFTYS blog (freight tax desk / consignment notes / GST portal). Formula / process / decision boards via `scripts/render-gta-gst-cards.py` (logo stamped once). |
| 32-feet-container-truck-dimensions-payload-sxl-mxl-guide | `/images/blog/32-feet-container-truck-sxl-mxl-india.jpg` | Generated for ZAFTYS blog (long 32-ft enclosed multi-axle container at factory dock; replaced shorter city-box hero). Formula / process / waterfall boards via `scripts/render-32ft-container-cards.py` (logo stamped once). |
| commercial-vehicle-verification-india-bogus-trucks-fraud-prevention | `/images/blog/commercial-vehicle-verification-india.jpg` | Generated for ZAFTYS blog (plant gate security verifying commercial truck plates/documents). Formula / process / waterfall boards via `scripts/render-vehicle-verification-cards.py` (logo stamped once). |
| transporter-indent-management-otif-india-placement-sla-guide | `/images/blog/transporter-indent-management-otif-india.jpg` | Generated for ZAFTYS blog (plant dispatch desk overlooking yard trucks / indent OTIF control). Formula / process / waterfall boards via `scripts/render-indent-otif-cards.py` (logo stamped once). |

## Scripts

- Re-download Unsplash set (may include older free stock picks): `powershell -ExecutionPolicy Bypass -File scripts/download-blog-images.ps1`
- Note: free stock rarely has accurate India cement-plant tipper / steel-coil flatbed shots, so four heroes were generated for topic fit. Empty-return hero kept as free Unsplash truck photography.

## Alt text (for CMS / blog-data)

| Slug | Suggested alt |
|------|----------------|
| reduce-empty-return-trips | Freight truck on an open highway under blue sky - industrial FTL corridor |
| planning-industrial-shipments | Load checklist and laptop with industrial truck loading in the background |
| cement-plant-loading-windows | Tipper trucks at a cement plant loading and weighbridge area |
| steel-coil-transport-basics | Steel coils secured on a flatbed trailer at an industrial yard |
| tms-for-heavy-haul | Dispatch desk with screens showing trip map and status for heavy-haul ops |
