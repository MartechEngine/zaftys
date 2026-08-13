<?php
require_once __DIR__ . '/_bootstrap.php';
require_once __DIR__ . '/_db.php';

if (!zaftys_rate_limit('newsletter')) {
    echo json_encode(['success' => true, 'message' => 'Subscribed']);
    exit;
}

$input = zaftys_json_input();
if ($input === null) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid request']);
    exit;
}

if (zaftys_honeypot($input)) {
    echo json_encode(['success' => true, 'message' => 'Subscribed']);
    exit;
}

$email = strtolower(zaftys_clip((string) ($input['email'] ?? ''), 255));
if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid email']);
    exit;
}

$allowedSources = ['footer', 'blog', 'landing-page', 'other'];
$source = zaftys_clip((string) ($input['source'] ?? 'footer'), 64);
if (!in_array($source, $allowedSources, true)) {
    $source = 'other';
}

$consentVersion = zaftys_clip((string) ($input['consent_version'] ?? 'newsletter-v1'), 32);
$sourceUrl = zaftys_clip((string) ($input['source_url'] ?? ''), 512);
$utmSource = zaftys_clip((string) ($input['utm_source'] ?? ''), 128);
$utmMedium = zaftys_clip((string) ($input['utm_medium'] ?? ''), 128);
$utmCampaign = zaftys_clip((string) ($input['utm_campaign'] ?? ''), 255);
$utmContent = zaftys_clip((string) ($input['utm_content'] ?? ''), 255);
$utmTerm = zaftys_clip((string) ($input['utm_term'] ?? ''), 255);

$pdo = zaftys_pdo();
if (!$pdo) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Subscription unavailable']);
    exit;
}

$isNew = true;
try {
    $stmt = $pdo->prepare(
        'INSERT INTO zaftys_newsletter_subscribers
            (email, source, status, consent_at, consent_version, source_url,
             utm_source, utm_medium, utm_campaign, utm_content, utm_term, ip_hash)
         VALUES
            (:email, :source, \'active\', CURRENT_TIMESTAMP, :consent_version, :source_url,
             :utm_source, :utm_medium, :utm_campaign, :utm_content, :utm_term, :ip_hash)'
    );
    $stmt->execute([
        ':email' => $email,
        ':source' => $source,
        ':consent_version' => $consentVersion !== '' ? $consentVersion : 'newsletter-v1',
        ':source_url' => $sourceUrl !== '' ? $sourceUrl : null,
        ':utm_source' => $utmSource !== '' ? $utmSource : null,
        ':utm_medium' => $utmMedium !== '' ? $utmMedium : null,
        ':utm_campaign' => $utmCampaign !== '' ? $utmCampaign : null,
        ':utm_content' => $utmContent !== '' ? $utmContent : null,
        ':utm_term' => $utmTerm !== '' ? $utmTerm : null,
        ':ip_hash' => zaftys_ip_hash(),
    ]);
} catch (PDOException $e) {
    if ($e->getCode() !== '23000') {
        http_response_code(500);
        echo json_encode(['success' => false, 'error' => 'Subscription failed']);
        exit;
    }
    $isNew = false;
}

if ($isNew) {
    $to = (string) zaftys_secret('mail_subscribers', 'subscribers@zaftys.com');
    $alert = "New newsletter subscriber.\n\nEmail: {$email}\nSource: {$source}\n";
    if ($sourceUrl !== '') {
        $alert .= "Page: {$sourceUrl}\n";
    }
    if ($utmSource !== '' || $utmCampaign !== '') {
        $alert .= "UTM: {$utmSource} / {$utmMedium} / {$utmCampaign}\n";
    }
    $alert .= zaftys_email_client_meta();
    zaftys_smtp_send($to, 'New Newsletter Subscriber', $alert);
}

echo json_encode(['success' => true, 'message' => 'Subscribed']);
