<?php
require_once __DIR__ . '/_bootstrap.php';

if (!zaftys_rate_limit('partner')) {
    echo json_encode(['success' => true, 'message' => 'Application submitted']);
    exit;
}

$input = zaftys_json_input();
if ($input === null) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid request']);
    exit;
}

if (zaftys_honeypot($input)) {
    echo json_encode(['success' => true, 'message' => 'Application submitted']);
    exit;
}

$company = zaftys_clip((string) ($input['company'] ?? ''), 160);
$contact = zaftys_clip((string) ($input['contact'] ?? ''), 120);
$phone = zaftys_clip((string) ($input['phone'] ?? ''), 40);
$fleet = zaftys_clip((string) ($input['fleet'] ?? ''), 80);

if ($company === '' || $contact === '' || $phone === '') {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid fields']);
    exit;
}

$to = (string) zaftys_secret('mail_partner', 'partner@zaftys.com');
$subject = 'New Partner Registration';
$body = "New partner registration from the website.\n\n";
$body .= "Company: {$company}\nContact Person: {$contact}\nPhone: {$phone}\n";
if ($fleet !== '') {
    $body .= "Fleet Size: {$fleet}\n";
}
$body .= zaftys_email_client_meta();

if (zaftys_smtp_send($to, $subject, $body)) {
    echo json_encode(['success' => true, 'message' => 'Application submitted']);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Failed to send email']);
}
