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
  ['/industries/retail', '0.7', 'monthly'],
  ['/industries/industrial-logistics', '0.7', 'monthly'],
  ['/partner', '0.8', 'monthly'],
  ['/about', '0.7', 'monthly'],
  ['/contact', '0.8', 'monthly'],
  ['/careers', '0.5', 'monthly'],
  ['/blog', '0.8', 'weekly'],
  ['/blog/tms-for-heavy-haul', '0.7', 'monthly'],
  ['/blog/steel-coil-transport-basics', '0.7', 'monthly'],
  ['/blog/cement-plant-loading-windows', '0.7', 'monthly'],
  ['/blog/planning-industrial-shipments', '0.7', 'monthly'],
  ['/blog/reduce-empty-return-trips', '0.7', 'monthly'],
  ['/privacy', '0.3', 'yearly'],
  ['/terms', '0.3', 'yearly'],
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
