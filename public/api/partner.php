<?php
// Partner registration endpoint
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

$company = trim($input['company'] ?? '');
$contact = trim($input['contact'] ?? '');
$phone   = trim($input['phone'] ?? '');
$fleet   = trim($input['fleet'] ?? '');

if ($company === '' || $contact === '' || $phone === '') {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Missing required fields']);
    exit;
}

$to = 'contact@zaftys.com';
$subject = 'New Partner Registration';

$body  = "A new partner registration was submitted from the website.\n\n";
$body .= "Company: $company\n";
$body .= "Contact Person: $contact\n";
$body .= "Phone: $phone\n";
if ($fleet !== '') {
    $body .= "Fleet Size: $fleet\n";
}

$headers = "From: ZAFTYS Partners <no-reply@zaftys.com>\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

if (mail($to, $subject, $body, $headers)) {
    echo json_encode(['success' => true, 'message' => 'Application submitted']);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Failed to send email']);
}
