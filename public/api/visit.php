<?php
require_once __DIR__ . '/_bootstrap.php';
require_once __DIR__ . '/_db.php';

header('X-Robots-Tag: noindex, nofollow');
header('Cache-Control: no-store');

if (!zaftys_rate_limit('visit', 120, 600)) {
    echo json_encode(['success' => true]);
    exit;
}

$input = zaftys_json_input();
if ($input === null) {
    $input = [];
}

$path = zaftys_clip((string) ($input['path'] ?? '/'), 512);
if ($path === '' || $path[0] !== '/') {
    $path = '/';
}
if (str_starts_with($path, '/api/')) {
    echo json_encode(['success' => true]);
    exit;
}

$referrer = zaftys_clip((string) ($input['referrer'] ?? ''), 512);
$userAgent = zaftys_clip((string) ($input['user_agent'] ?? ($_SERVER['HTTP_USER_AGENT'] ?? '')), 512);
$utmSource = zaftys_clip((string) ($input['utm_source'] ?? ''), 128);
$utmMedium = zaftys_clip((string) ($input['utm_medium'] ?? ''), 128);
$utmCampaign = zaftys_clip((string) ($input['utm_campaign'] ?? ''), 255);
$utmContent = zaftys_clip((string) ($input['utm_content'] ?? ''), 255);
$utmTerm = zaftys_clip((string) ($input['utm_term'] ?? ''), 255);

$pdo = zaftys_pdo();
if (!$pdo) {
    echo json_encode(['success' => true]);
    exit;
}

try {
    $stmt = $pdo->prepare(
        'INSERT INTO zaftys_page_visits
            (ip, path, referrer, user_agent, utm_source, utm_medium, utm_campaign, utm_content, utm_term)
         VALUES
            (:ip, :path, :referrer, :user_agent, :utm_source, :utm_medium, :utm_campaign, :utm_content, :utm_term)'
    );
    $stmt->execute([
        ':ip' => zaftys_client_ip(),
        ':path' => $path,
        ':referrer' => $referrer !== '' ? $referrer : null,
        ':user_agent' => $userAgent !== '' ? $userAgent : null,
        ':utm_source' => $utmSource !== '' ? $utmSource : null,
        ':utm_medium' => $utmMedium !== '' ? $utmMedium : null,
        ':utm_campaign' => $utmCampaign !== '' ? $utmCampaign : null,
        ':utm_content' => $utmContent !== '' ? $utmContent : null,
        ':utm_term' => $utmTerm !== '' ? $utmTerm : null,
    ]);
} catch (Throwable $e) {
    echo json_encode(['success' => true]);
    exit;
}

echo json_encode(['success' => true]);
