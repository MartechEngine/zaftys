<?php
require_once __DIR__ . '/_bootstrap.php';

if (!zaftys_rate_limit('contact')) {
    echo json_encode(['success' => true, 'message' => 'Message sent successfully']);
    exit;
}

$input = zaftys_json_input();
if ($input === null) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid request']);
    exit;
}

if (zaftys_honeypot($input)) {
    echo json_encode(['success' => true, 'message' => 'Message sent successfully']);
    exit;
}

$name = zaftys_clip((string) ($input['name'] ?? ''), 120);
$email = zaftys_clip((string) ($input['email'] ?? ''), 255);
$phone = zaftys_clip((string) ($input['phone'] ?? ''), 40);
$interest = zaftys_clip((string) ($input['interest'] ?? 'General Inquiry'), 80);
$message = zaftys_clip((string) ($input['message'] ?? ''), 5000);

if ($name === '' || $email === '' || $message === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid fields']);
    exit;
}

$to = (string) zaftys_secret('mail_contact', 'contact@zaftys.com');
$subject = 'New Website Inquiry: ' . $interest;
$body = "New message from the ZAFTYS contact form.\n\n";
$body .= "Name: {$name}\nEmail: {$email}\nPhone: {$phone}\nInterest: {$interest}\n\nMessage:\n{$message}\n";
$body .= zaftys_email_client_meta();

if (zaftys_smtp_send($to, $subject, $body, $email)) {
    echo json_encode(['success' => true, 'message' => 'Message sent successfully']);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Failed to send email']);
}
