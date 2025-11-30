<?php
// Prevent direct access
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method Not Allowed']);
    exit;
}

// Set headers
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Adjust this for stricter security if needed
header('Access-Control-Allow-Headers: Content-Type');

// Get JSON input
$input = json_decode(file_get_contents('php://input'), true);

// 1. Honeypot Check (Spam Protection)
// If the hidden 'website' field is filled, it's a bot.
if (!empty($input['website'])) {
    // Pretend to succeed so the bot doesn't try again
    echo json_encode(['success' => true, 'message' => 'Message sent successfully']);
    exit;
}

// 2. Validation
$name = trim($input['name'] ?? '');
$email = trim($input['email'] ?? '');
$phone = trim($input['phone'] ?? '');
$subject_interest = trim($input['interest'] ?? 'General Inquiry');
$message_content = trim($input['message'] ?? '');

if (empty($name) || empty($email) || empty($message_content)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Missing required fields']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid email format']);
    exit;
}

// 3. Prepare Email
$to = 'contact@zaftys.com'; // TARGET EMAIL
$subject = "New Website Inquiry: $subject_interest";

$email_body = "You have received a new message from your website contact form.\n\n";
$email_body .= "Name: $name\n";
$email_body .= "Email: $email\n";
$email_body .= "Phone: $phone\n";
$email_body .= "Interest: $subject_interest\n\n";
$email_body .= "Message:\n$message_content\n";

$headers = "From: no-reply@zaftys.com\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// 4. Send Email
if (mail($to, $subject, $email_body, $headers)) {
    echo json_encode(['success' => true, 'message' => 'Message sent successfully']);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Failed to send email']);
}
?>
