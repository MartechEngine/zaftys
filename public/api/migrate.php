<?php
/**
 * One-shot / idempotent DB migrations. POST only.
 * Auth: Authorization: Bearer <token>  or  X-Zaftys-Migrate-Token
 */
require_once __DIR__ . '/_config.php';
require_once __DIR__ . '/_db.php';

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

$dir = dirname(__DIR__) . '/config/migrations';
$files = glob($dir . '/*.sql') ?: [];
sort($files, SORT_STRING);

if ($files === []) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'No migrations']);
    exit;
}

$applied = [];
try {
    foreach ($files as $file) {
        $sql = trim((string) file_get_contents($file));
        if ($sql === '') {
            continue;
        }
        $pdo->exec($sql);
        $applied[] = basename($file);
    }
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Migration failed']);
    exit;
}

echo json_encode(['success' => true, 'applied' => $applied]);
