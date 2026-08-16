<?php
/**
 * Capture report download leads and issue an access token for PDF download / read.
 */
require_once __DIR__ . '/_bootstrap.php';
require_once __DIR__ . '/_db.php';

if (!zaftys_rate_limit('report-lead', 8, 600)) {
    http_response_code(429);
    echo json_encode(['success' => false, 'error' => 'Too many attempts. Please try again in a few minutes.']);
    exit;
}

$input = zaftys_json_input();
if ($input === null) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid request']);
    exit;
}

if (zaftys_honeypot($input)) {
    echo json_encode(['success' => true, 'message' => 'Access granted', 'access_token' => bin2hex(random_bytes(32))]);
    exit;
}

$name = zaftys_clip((string) ($input['name'] ?? ''), 120);
$jobTitle = zaftys_clip((string) ($input['job_title'] ?? ''), 120);
$email = strtolower(zaftys_clip((string) ($input['email'] ?? ''), 255));
$reportSlug = zaftys_clip((string) ($input['report_slug'] ?? ''), 128);
$sourceUrl = zaftys_clip((string) ($input['source_url'] ?? ''), 512);
$consentVersion = zaftys_clip((string) ($input['consent_version'] ?? 'report-lead-v1'), 32);
$utmSource = zaftys_clip((string) ($input['utm_source'] ?? ''), 128);
$utmMedium = zaftys_clip((string) ($input['utm_medium'] ?? ''), 128);
$utmCampaign = zaftys_clip((string) ($input['utm_campaign'] ?? ''), 255);
$utmContent = zaftys_clip((string) ($input['utm_content'] ?? ''), 255);
$utmTerm = zaftys_clip((string) ($input['utm_term'] ?? ''), 255);

$allowedSlugs = [
    'global-logistics-market-2027-2036',
    'digital-freight-matching-market-2027-2036',
];

if ($name === '' || $jobTitle === '' || $email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Please enter your name, job title, and a valid company email.']);
    exit;
}

if ($reportSlug === '' || !in_array($reportSlug, $allowedSlugs, true)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Unknown report']);
    exit;
}

$host = strtolower((string) substr(strrchr($email, '@') ?: '', 1));
$freeHosts = [
    'gmail.com', 'googlemail.com', 'yahoo.com', 'yahoo.co.in', 'ymail.com',
    'hotmail.com', 'outlook.com', 'live.com', 'msn.com', 'icloud.com', 'me.com',
    'aol.com', 'proton.me', 'protonmail.com', 'gmx.com', 'mail.com', 'zoho.com',
    'yandex.com', 'rediffmail.com',
];
if ($host === '' || in_array($host, $freeHosts, true)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Please use your company email address.']);
    exit;
}

$pdo = zaftys_pdo();
if (!$pdo) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Download unlock unavailable right now. Please try again shortly.']);
    exit;
}

$accessToken = bin2hex(random_bytes(32));
$expiresAt = (new DateTimeImmutable('+90 days'))->format('Y-m-d H:i:s');

try {
    $stmt = $pdo->prepare(
        'INSERT INTO zaftys_report_leads
            (name, job_title, email, report_slug, access_token, source_url, consent_version,
             utm_source, utm_medium, utm_campaign, utm_content, utm_term, ip_hash, expires_at)
         VALUES
            (:name, :job_title, :email, :report_slug, :access_token, :source_url, :consent_version,
             :utm_source, :utm_medium, :utm_campaign, :utm_content, :utm_term, :ip_hash, :expires_at)'
    );
    $stmt->execute([
        ':name' => $name,
        ':job_title' => $jobTitle,
        ':email' => $email,
        ':report_slug' => $reportSlug,
        ':access_token' => $accessToken,
        ':source_url' => $sourceUrl !== '' ? $sourceUrl : null,
        ':consent_version' => $consentVersion !== '' ? $consentVersion : 'report-lead-v1',
        ':utm_source' => $utmSource !== '' ? $utmSource : null,
        ':utm_medium' => $utmMedium !== '' ? $utmMedium : null,
        ':utm_campaign' => $utmCampaign !== '' ? $utmCampaign : null,
        ':utm_content' => $utmContent !== '' ? $utmContent : null,
        ':utm_term' => $utmTerm !== '' ? $utmTerm : null,
        ':ip_hash' => zaftys_ip_hash(),
        ':expires_at' => $expiresAt,
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Could not unlock the report. Please try again.']);
    exit;
}

// Also add to newsletter list (idempotent on duplicate email).
try {
    $news = $pdo->prepare(
        'INSERT INTO zaftys_newsletter_subscribers
            (email, source, status, consent_at, consent_version, source_url,
             utm_source, utm_medium, utm_campaign, utm_content, utm_term, ip_hash)
         VALUES
            (:email, \'report-download\', \'active\', CURRENT_TIMESTAMP, :consent_version, :source_url,
             :utm_source, :utm_medium, :utm_campaign, :utm_content, :utm_term, :ip_hash)'
    );
    $news->execute([
        ':email' => $email,
        ':consent_version' => $consentVersion !== '' ? $consentVersion : 'report-lead-v1',
        ':source_url' => $sourceUrl !== '' ? $sourceUrl : null,
        ':utm_source' => $utmSource !== '' ? $utmSource : null,
        ':utm_medium' => $utmMedium !== '' ? $utmMedium : null,
        ':utm_campaign' => $utmCampaign !== '' ? $utmCampaign : null,
        ':utm_content' => $utmContent !== '' ? $utmContent : null,
        ':utm_term' => $utmTerm !== '' ? $utmTerm : null,
        ':ip_hash' => zaftys_ip_hash(),
    ]);
} catch (PDOException $e) {
    // Duplicate email is fine.
    if ($e->getCode() !== '23000') {
        // Non-fatal for unlock; lead row already saved.
    }
}

$to = (string) zaftys_secret('mail_subscribers', 'subscribers@zaftys.com');
$alert = "New report download unlock (also added to newsletter).\n\n";
$alert .= "Name: {$name}\n";
$alert .= "Job title: {$jobTitle}\n";
$alert .= "Company email: {$email}\n";
$alert .= "Report: {$reportSlug}\n";
$alert .= "Source: report-download\n";
if ($sourceUrl !== '') {
    $alert .= "Page: {$sourceUrl}\n";
}
if ($utmSource !== '' || $utmCampaign !== '') {
    $alert .= "UTM: {$utmSource} / {$utmMedium} / {$utmCampaign}\n";
}
$alert .= zaftys_email_client_meta();
zaftys_smtp_send($to, 'Report unlock + subscribe: ' . $reportSlug, $alert);

echo json_encode([
    'success' => true,
    'message' => 'Access granted',
    'access_token' => $accessToken,
    'expires_at' => $expiresAt,
]);
