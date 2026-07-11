<?php
// Careers general application endpoint
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method Not Allowed']);
    exit;
}

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');

$input = json_decode(file_get_contents('php://input'), true);

// Honeypot
if (!empty($input['website'] ?? '')) {
    echo json_encode(['success' => true, 'message' => 'Application submitted']);
    exit;
}

$name  = trim($input['name'] ?? '');
$email = trim($input['email'] ?? '');
$resumeFileName = trim($input['resumeFileName'] ?? '');

if ($name === '' || $email === '') {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Missing required fields']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid email format']);
    exit;
}

$to = 'contact@zaftys.com';
$subject = 'New Careers Application (General)';

$body  = "A new general careers application was submitted from the website.\n\n";
$body .= "Name: $name\n";
$body .= "Email: $email\n";
if ($resumeFileName !== '') {
    $body .= "Resume file name (not attached): $resumeFileName\n";
}

$headers = "From: ZAFTYS Careers <no-reply@zaftys.com>\r\n";
$headers .= "Reply-To: $name <$email>\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

if (mail($to, $subject, $body, $headers)) {
    echo json_encode(['success' => true, 'message' => 'Application submitted']);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Failed to send email']);
}
