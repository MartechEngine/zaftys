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

$path = zaftys_clip((string) ($input['path'] ?? ''), 20);
$expandMode = zaftys_clip((string) ($input['expandMode'] ?? ''), 20);
$company = zaftys_clip((string) ($input['company'] ?? ''), 160);
$contact = zaftys_clip((string) ($input['contact'] ?? ''), 120);
$phoneRaw = zaftys_clip((string) ($input['phone'] ?? ''), 40);
$phone = zaftys_partner_mobile($phoneRaw);
$email = zaftys_clip((string) ($input['email'] ?? ''), 160);
$fleet = zaftys_clip((string) ($input['fleet'] ?? ''), 40);
$location = zaftys_clip((string) ($input['location'] ?? ''), 120);
$vehicleType = zaftys_clip((string) ($input['vehicleType'] ?? ''), 80);
$freight = zaftys_clip((string) ($input['freight'] ?? ''), 160);
$capital = zaftys_clip((string) ($input['capital'] ?? ''), 40);
$truckCondition = zaftys_clip((string) ($input['truckCondition'] ?? ''), 40);
$experience = zaftys_clip((string) ($input['experience'] ?? ''), 500);
$additionalVehicles = zaftys_clip((string) ($input['additionalVehicles'] ?? ''), 40);
$financingNote = zaftys_clip((string) ($input['financingNote'] ?? ''), 300);

$knownPaths = ['', 'fleet', 'first-truck', 'expand'];
$knownExpandModes = ['tranzfort', 'ownership'];
$knownFleetSizes = ['1', '1-5', '2-5', '6-10', '6-20', '11-20', '20+', 'more-than-20'];
$knownVehicleTypes = ['', 'open', 'container', 'tipper', 'tanker', 'unsure'];
$knownCapitalBands = ['', 'below-10', '10-15', '15-25', '25-plus'];
$knownTruckConditions = ['', 'new', 'used', 'guidance'];
$knownAdditionalVehicles = ['', '1', '2-5', '6+'];

if (!in_array($path, $knownPaths, true)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid fields']);
    exit;
}

if ($path !== 'expand') {
    $expandMode = '';
}

if ($path === 'expand' && !in_array($expandMode, $knownExpandModes, true)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid fields']);
    exit;
}

if ($path !== 'fleet' && $path !== 'expand') {
    $fleet = '';
}

if ($path !== 'fleet' && !($path === 'expand' && $expandMode === 'tranzfort')) {
    $freight = '';
}

if ($path !== 'expand') {
    $additionalVehicles = '';
}

if ($path !== 'first-truck') {
    $truckCondition = '';
    $experience = '';
}

if ($path !== 'first-truck' && !($path === 'expand' && $expandMode === 'ownership')) {
    $capital = '';
    $financingNote = '';
}

$needsCompany = $path === '' || $path === 'fleet' || ($path === 'expand' && $expandMode === 'tranzfort');
$needsFleet = $path === 'fleet' || $path === 'expand';
$needsLocation = $path !== '';
$needsFirstTruckDetails = $path === 'first-truck';
$needsAdditionalVehicles = $path === 'expand';

if (
    $contact === ''
    || $phone === ''
    || ($needsCompany && $company === '')
    || ($needsFleet && $fleet === '')
    || ($needsLocation && $location === '')
    || ($needsFirstTruckDetails && ($capital === '' || $truckCondition === ''))
    || ($needsAdditionalVehicles && $additionalVehicles === '')
) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid fields']);
    exit;
}

if (
    ($needsFleet && !in_array($fleet, $knownFleetSizes, true))
    || !in_array($vehicleType, $knownVehicleTypes, true)
    || !in_array($capital, $knownCapitalBands, true)
    || !in_array($truckCondition, $knownTruckConditions, true)
    || !in_array($additionalVehicles, $knownAdditionalVehicles, true)
) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid fields']);
    exit;
}

if ($email !== '' && filter_var($email, FILTER_VALIDATE_EMAIL) === false) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid fields']);
    exit;
}

$subject = 'New Partner Registration';
if ($path === 'fleet') {
    $subject = 'Partner enquiry: fleet';
} elseif ($path === 'first-truck') {
    $subject = 'Partner enquiry: first truck';
} elseif ($path === 'expand') {
    $subject = $expandMode === 'ownership'
        ? 'Partner enquiry: expand ownership'
        : 'Partner enquiry: expand fleet';
}

$lines = [
    'New partner enquiry from the website.',
    '',
    'Path: ' . ($path === '' ? 'fleet (legacy form)' : $path),
];
if ($expandMode !== '') {
    $lines[] = 'Expand mode: ' . $expandMode;
}
$lines[] = 'Contact: ' . $contact;
$lines[] = 'Phone: ' . $phone;
if ($company !== '') {
    $lines[] = 'Company: ' . $company;
}
if ($email !== '') {
    $lines[] = 'Email: ' . $email;
}
if ($fleet !== '') {
    $lines[] = 'Fleet size: ' . $fleet;
}
if ($additionalVehicles !== '') {
    $lines[] = 'Additional vehicles: ' . $additionalVehicles;
}
if ($location !== '') {
    $lines[] = 'Location: ' . $location;
}
if ($vehicleType !== '') {
    $lines[] = 'Vehicle type: ' . $vehicleType;
}
if (($path === '' || $path === 'fleet' || $expandMode === 'tranzfort') && $freight !== '') {
    $lines[] = 'Freight: ' . $freight;
}
if (($path === 'first-truck' || $expandMode === 'ownership') && $capital !== '') {
    $lines[] = 'Capital band: ' . $capital;
}
if ($path === 'first-truck' && $truckCondition !== '') {
    $lines[] = 'Truck condition: ' . $truckCondition;
}
if ($path === 'expand' && $expandMode === 'ownership' && $financingNote !== '') {
    $lines[] = 'Financing note: ' . $financingNote;
}
if ($path === 'first-truck' && $experience !== '') {
    $lines[] = 'Experience: ' . $experience;
}

$body = implode("\n", $lines) . "\n" . zaftys_email_client_meta();
$to = (string) zaftys_secret('mail_partner', 'partner@zaftys.com');

if (zaftys_smtp_send($to, $subject, $body)) {
    echo json_encode(['success' => true, 'message' => 'Application submitted']);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Failed to send email']);
}

function zaftys_partner_mobile(string $phone): string
{
    $digits = preg_replace('/\D+/', '', $phone) ?? '';
    if (str_starts_with($digits, '91') && strlen($digits) === 12) {
        $digits = substr($digits, 2);
    }
    if (str_starts_with($digits, '0') && strlen($digits) === 11) {
        $digits = substr($digits, 1);
    }
    if (!preg_match('/^[6-9]\d{9}$/', $digits)) {
        return '';
    }
    return $digits;
}
