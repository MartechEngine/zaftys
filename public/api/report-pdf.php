<?php
/**
 * Stream a gated market-report PDF after a valid access token.
 * GET /api/report-pdf.php?slug=...&token=...
 */
require_once __DIR__ . '/_config.php';
require_once __DIR__ . '/_db.php';
require_once __DIR__ . '/_rate-limit.php';

header('X-Robots-Tag: noindex, nofollow');
header('Cache-Control: no-store');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers: Content-Type');
    header('Access-Control-Allow-Methods: GET, OPTIONS');
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    header('Content-Type: application/json');
    echo json_encode(['success' => false, 'error' => 'Method Not Allowed']);
    exit;
}

if (!zaftys_rate_limit('report-pdf', 30, 600)) {
    http_response_code(429);
    header('Content-Type: application/json');
    echo json_encode(['success' => false, 'error' => 'Too many requests']);
    exit;
}

$slug = preg_replace('/[^a-z0-9\-]/i', '', (string) ($_GET['slug'] ?? '')) ?? '';
$token = preg_replace('/[^a-f0-9]/i', '', (string) ($_GET['token'] ?? '')) ?? '';

$files = [
    'global-logistics-market-2027-2036' => 'global-logistics-market-2027-2036.pdf',
    'digital-freight-matching-market-2027-2036' => 'digital-freight-matching-market-2027-2036.pdf',
];

if ($slug === '' || $token === '' || strlen($token) !== 64 || !isset($files[$slug])) {
    http_response_code(403);
    header('Content-Type: application/json');
    echo json_encode(['success' => false, 'error' => 'Access denied']);
    exit;
}

$pdo = zaftys_pdo();
if (!$pdo) {
    http_response_code(500);
    header('Content-Type: application/json');
    echo json_encode(['success' => false, 'error' => 'Unavailable']);
    exit;
}

try {
    $stmt = $pdo->prepare(
        'SELECT id FROM zaftys_report_leads
         WHERE access_token = :token
           AND (expires_at IS NULL OR expires_at > CURRENT_TIMESTAMP)
         LIMIT 1'
    );
    $stmt->execute([':token' => $token]);
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
} catch (Throwable $e) {
    http_response_code(500);
    header('Content-Type: application/json');
    echo json_encode(['success' => false, 'error' => 'Unavailable']);
    exit;
}

if (!$row) {
    http_response_code(403);
    header('Content-Type: application/json');
    echo json_encode(['success' => false, 'error' => 'Access denied. Please unlock the report again.']);
    exit;
}

$path = dirname(__DIR__) . '/files/market-reports/' . $files[$slug];
if (!is_readable($path)) {
    http_response_code(404);
    header('Content-Type: application/json');
    echo json_encode(['success' => false, 'error' => 'Report file missing']);
    exit;
}

$filename = $files[$slug];
$disposition = (isset($_GET['download']) && $_GET['download'] === '1') ? 'attachment' : 'inline';

header('Content-Type: application/pdf');
header('Content-Length: ' . (string) filesize($path));
header('Content-Disposition: ' . $disposition . '; filename="' . $filename . '"');
header('X-Content-Type-Options: nosniff');
readfile($path);
exit;
