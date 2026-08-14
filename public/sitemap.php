<?php
/**
 * Sitemap endpoint for Hostinger. Serves the generated sitemap.xml
 * with an explicit XML content type (static .xml can misbehave on some hosts).
 * Source of truth: scripts/generate-sitemap.mjs → public/sitemap.xml
 */
header('Content-Type: application/xml; charset=utf-8');
header('X-Robots-Tag: noindex');
header('Cache-Control: public, max-age=3600');

$xml = __DIR__ . '/sitemap.xml';
if (!is_readable($xml)) {
  http_response_code(503);
  echo '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
  echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>' . "\n";
  exit;
}

readfile($xml);
