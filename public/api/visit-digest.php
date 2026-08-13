<?php
/**
 * Daily job: email last-24h visit CSV, then delete rows older than 90 days.
 * Auth: Authorization: Bearer <token>  or  X-Zaftys-Migrate-Token
 */
require_once __DIR__ . '/_config.php';
require_once __DIR__ . '/_mail.php';
require_once __DIR__ . '/_db.php';
require_once __DIR__ . '/_geo.php';

const ZAFTS_VISIT_CSV_MAX_ROWS = 15000;

header('Content-Type: application/json');
header('X-Robots-Tag: noindex, nofollow');
header('Cache-Control: no-store');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method Not Allowed']);
    exit;
}

if (!zaftys_ops_token_configured()) {
    http_response_code(404);
    echo json_encode(['success' => false, 'error' => 'Not found']);
    exit;
}

if (!zaftys_ops_token_valid()) {
    http_response_code(401);
    echo json_encode(['success' => false, 'error' => 'Unauthorized']);
    exit;
}

$pdo = zaftys_pdo();
if (!$pdo) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Database unavailable']);
    exit;
}

zaftys_ensure_page_visit_geo_columns($pdo);

function zaftys_csv_field($value): string
{
    $text = $value === null ? '' : (string) $value;
    return '"' . str_replace('"', '""', $text) . '"';
}

try {
    $stmt = $pdo->query(
        'SELECT visited_at, ip, path, referrer, user_agent,
                utm_source, utm_medium, utm_campaign, utm_content, utm_term,
                geo_country, geo_region, geo_city, geo_isp
         FROM zaftys_page_visits
         WHERE visited_at >= DATE_SUB(UTC_TIMESTAMP(), INTERVAL 24 HOUR)
         ORDER BY visited_at ASC
         LIMIT ' . (ZAFTS_VISIT_CSV_MAX_ROWS + 1)
    );
    $rows = $stmt ? $stmt->fetchAll(PDO::FETCH_ASSOC) : [];
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Query failed']);
    exit;
}

$truncated = count($rows) > ZAFTS_VISIT_CSV_MAX_ROWS;
if ($truncated) {
    $rows = array_slice($rows, 0, ZAFTS_VISIT_CSV_MAX_ROWS);
}

$uniqueIps = [];
$geoByIp = [];
foreach ($rows as $row) {
    $ip = (string) ($row['ip'] ?? '');
    if ($ip === '') {
        continue;
    }
    $uniqueIps[$ip] = true;
    if (isset($geoByIp[$ip])) {
        continue;
    }
    if (($row['geo_city'] ?? '') !== '' || ($row['geo_country'] ?? '') !== '') {
        $geoByIp[$ip] = [
            'country' => $row['geo_country'] ?? null,
            'region' => $row['geo_region'] ?? null,
            'city' => $row['geo_city'] ?? null,
            'isp' => $row['geo_isp'] ?? null,
        ];
        continue;
    }
    $geoByIp[$ip] = zaftys_geo_for_ip($pdo, $ip);
}

$csv = "visited_at,ip,country,region,city,isp,path,referrer,user_agent,utm_source,utm_medium,utm_campaign,utm_content,utm_term\n";
foreach ($rows as $row) {
    $ip = (string) ($row['ip'] ?? '');
    $geo = $geoByIp[$ip] ?? zaftys_geo_empty();
    $csv .= implode(',', [
        zaftys_csv_field($row['visited_at'] ?? ''),
        zaftys_csv_field($ip),
        zaftys_csv_field($geo['country'] ?? ''),
        zaftys_csv_field($geo['region'] ?? ''),
        zaftys_csv_field($geo['city'] ?? ''),
        zaftys_csv_field($geo['isp'] ?? ''),
        zaftys_csv_field($row['path'] ?? ''),
        zaftys_csv_field($row['referrer'] ?? ''),
        zaftys_csv_field($row['user_agent'] ?? ''),
        zaftys_csv_field($row['utm_source'] ?? ''),
        zaftys_csv_field($row['utm_medium'] ?? ''),
        zaftys_csv_field($row['utm_campaign'] ?? ''),
        zaftys_csv_field($row['utm_content'] ?? ''),
        zaftys_csv_field($row['utm_term'] ?? ''),
    ]) . "\n";
}

$day = gmdate('Y-m-d');
$filename = 'zaftys-visits-' . $day . '.csv';
$to = (string) zaftys_secret('mail_visits', 'info@zaftys.com');
$subject = 'ZAFTYS website visitors (last 24 hours) — ' . $day;
$body = "Last 24 hours of zaftys.com page views (one row per page).\n\n";
$body .= 'Page views: ' . count($rows) . "\n";
$body .= 'Unique IPs: ' . count($uniqueIps) . "\n";
if ($truncated) {
    $body .= 'CSV truncated at ' . ZAFTS_VISIT_CSV_MAX_ROWS . " rows.\n";
}
$body .= "Times are stored in UTC. Country/region/city/ISP are approximate (IP lookup), not GPS.\n";
$body .= "Visit rows older than 90 days are deleted from Hostinger after this job.\n";
$body .= "This CSV is also kept in this email; database deletion does not remove mail already received.\n";

$sent = zaftys_smtp_send($to, $subject, $body, '', [
    'filename' => $filename,
    'content' => $csv,
    'mime' => 'text/csv; charset=UTF-8',
]);

if (!$sent) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Email failed', 'rows' => count($rows)]);
    exit;
}

$purged = 0;
try {
    $purge = $pdo->exec(
        'DELETE FROM zaftys_page_visits WHERE visited_at < DATE_SUB(UTC_TIMESTAMP(), INTERVAL 90 DAY)'
    );
    if (is_int($purge) || is_numeric($purge)) {
        $purged = (int) $purge;
    }
} catch (Throwable $e) {
    echo json_encode([
        'success' => true,
        'emailed' => true,
        'rows' => count($rows),
        'unique_ips' => count($uniqueIps),
        'purged' => null,
        'purge_error' => true,
    ]);
    exit;
}

echo json_encode([
    'success' => true,
    'emailed' => true,
    'to' => $to,
    'rows' => count($rows),
    'unique_ips' => count($uniqueIps),
    'truncated' => $truncated,
    'purged' => $purged,
]);
