<?php
/**
 * Dynamic sitemap for Hostinger  -  reliable when static .xml misbehaves.
 * Keep in sync with scripts/generate-sitemap.mjs / public/sitemap.xml
 */
header('Content-Type: application/xml; charset=utf-8');
header('X-Robots-Tag: noindex'); // the sitemap itself; URLs inside are indexable
header('Cache-Control: public, max-age=3600');

$base = 'https://zaftys.com';
$today = date('Y-m-d');

$urls = [
  ['/', '1.0', 'weekly'],
  ['/services', '0.9', 'weekly'],
  ['/network', '0.9', 'weekly'],
  ['/technology', '0.9', 'weekly'],
  ['/fleet', '0.8', 'monthly'],
  ['/industries', '0.8', 'weekly'],
  ['/industries/cement', '0.7', 'monthly'],
  ['/industries/coal-mining', '0.7', 'monthly'],
  ['/industries/steel-metals', '0.7', 'monthly'],
  ['/industries/chemicals', '0.7', 'monthly'],
  ['/industries/manufacturing', '0.7', 'monthly'],
  ['/industries/fmcg', '0.7', 'monthly'],
  ['/industries/retail-distribution', '0.7', 'monthly'],
  ['/industries/industrial-logistics', '0.7', 'monthly'],
  ['/partner', '0.8', 'monthly'],
  ['/about', '0.7', 'monthly'],
  ['/contact', '0.8', 'monthly'],
  ['/careers', '0.5', 'monthly'],
  ['/resources', '0.8', 'weekly'],
  ['/resources/reports', '0.8', 'weekly'],
  ['/blog', '0.8', 'weekly'],
  ['/blog/tms-for-heavy-haul', '0.7', 'monthly'],
  ['/blog/steel-coil-transport-basics', '0.7', 'monthly'],
  ['/blog/cement-plant-loading-windows', '0.7', 'monthly'],
  ['/blog/planning-industrial-shipments', '0.7', 'monthly'],
  ['/blog/reduce-empty-return-trips', '0.7', 'monthly'],
  ['/resources/reports/global-logistics-market-2027-2036', '0.8', 'monthly'],
  ['/resources/reports/india-industrial-road-freight-2026', '0.7', 'monthly'],
  ['/resources/reports/cement-logistics-india-corridors', '0.7', 'monthly'],
  ['/resources/reports/steel-coil-transport-market-india', '0.7', 'monthly'],
  ['/resources/reports/coal-mining-tipper-logistics-india', '0.7', 'monthly'],
  ['/resources/reports/ftl-vs-ltl-industrial-india', '0.7', 'monthly'],
  ['/resources/reports/empty-miles-and-backhaul-india', '0.7', 'monthly'],
  ['/resources/reports/maharashtra-industrial-freight-corridors', '0.7', 'monthly'],
  ['/resources/reports/tms-adoption-heavy-haul-india', '0.7', 'monthly'],
  ['/resources/reports/warehouse-to-plant-supply-chain-india', '0.7', 'monthly'],
  ['/resources/reports/organized-fleet-vs-brokered-capacity', '0.7', 'monthly'],
  ['/privacy', '0.3', 'yearly'],
  ['/terms', '0.3', 'yearly'],
  ['/cookies', '0.3', 'yearly'],
  ['/legal-notice', '0.3', 'yearly'],
];

echo '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";
foreach ($urls as [$path, $priority, $freq]) {
  $loc = htmlspecialchars($base . ($path === '/' ? '/' : $path), ENT_XML1);
  echo "  <url>\n";
  echo "    <loc>{$loc}</loc>\n";
  echo "    <lastmod>{$today}</lastmod>\n";
  echo "    <changefreq>{$freq}</changefreq>\n";
  echo "    <priority>{$priority}</priority>\n";
  echo "  </url>\n";
}
echo "</urlset>\n";
