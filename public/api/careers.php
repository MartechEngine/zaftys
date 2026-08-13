<?php
require_once __DIR__ . '/_bootstrap.php';

if (!zaftys_rate_limit('careers')) {
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

$name = zaftys_clip((string) ($input['name'] ?? ''), 120);
$email = zaftys_clip((string) ($input['email'] ?? ''), 255);
$resumeFileName = zaftys_clip((string) ($input['resumeFileName'] ?? ''), 200);

if ($name === '' || $email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid fields']);
    exit;
}

$to = (string) zaftys_secret('mail_careers', 'careers@zaftys.com');
$subject = 'New Careers Application (General)';
$body = "New general careers application from the website.\n\n";
$body .= "Name: {$name}\nEmail: {$email}\n";
if ($resumeFileName !== '') {
    $body .= "Resume file name (not attached): {$resumeFileName}\n";
}
$body .= zaftys_email_client_meta();

if (zaftys_smtp_send($to, $subject, $body, $email)) {
    echo json_encode(['success' => true, 'message' => 'Application submitted']);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Failed to send email']);
}
