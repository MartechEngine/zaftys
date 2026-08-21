<?php

/**
 * Approximate country / region / city / ISP from a public IP.
 * Uses ipwho.is (HTTPS, no key). Cached per IP on zaftys_page_visits.
 * City-level only - not GPS. Mobile ISPs are often the carrier hub city.
 *
 * @return array{country: ?string, region: ?string, city: ?string, isp: ?string}
 */
function zaftys_geo_empty(): array
{
    return [
        'country' => null,
        'region' => null,
        'city' => null,
        'isp' => null,
    ];
}

function zaftys_geo_http_get(string $url, int $timeout = 2): string
{
    if (function_exists('curl_init')) {
        $ch = curl_init($url);
        if ($ch === false) {
            return '';
        }
        curl_setopt_array($ch, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT => $timeout,
            CURLOPT_CONNECTTIMEOUT => $timeout,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_USERAGENT => 'ZAFTYS-Website/1.0',
        ]);
        $out = curl_exec($ch);
        curl_close($ch);
        return is_string($out) ? $out : '';
    }

    $ctx = stream_context_create([
        'http' => ['timeout' => $timeout, 'header' => "User-Agent: ZAFTYS-Website/1.0\r\n"],
        'ssl' => ['verify_peer' => true, 'verify_peer_name' => true],
    ]);
    $out = @file_get_contents($url, false, $ctx);
    return is_string($out) ? $out : '';
}

function zaftys_geo_lookup_remote(string $ip): array
{
    $geo = zaftys_geo_empty();
    if (!filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE)) {
        return $geo;
    }

    $raw = zaftys_geo_http_get('https://ipwho.is/' . rawurlencode($ip) . '?fields=success,country,region,city,connection');
    if ($raw === '') {
        return $geo;
    }
    $data = json_decode($raw, true);
    if (!is_array($data) || empty($data['success'])) {
        return $geo;
    }

    $conn = is_array($data['connection'] ?? null) ? $data['connection'] : [];
    $geo['country'] = zaftys_clip((string) ($data['country'] ?? ''), 64) ?: null;
    $geo['region'] = zaftys_clip((string) ($data['region'] ?? ''), 128) ?: null;
    $geo['city'] = zaftys_clip((string) ($data['city'] ?? ''), 128) ?: null;
    $isp = (string) ($conn['isp'] ?? $conn['org'] ?? '');
    $geo['isp'] = zaftys_clip($isp, 255) ?: null;
    return $geo;
}

function zaftys_ensure_page_visit_geo_columns(PDO $pdo): void
{
    static $done = false;
    if ($done) {
        return;
    }
    try {
        $check = $pdo->query("SHOW COLUMNS FROM zaftys_page_visits LIKE 'geo_city'");
        if ($check && $check->fetch()) {
            $done = true;
            return;
        }
        $pdo->exec(
            'ALTER TABLE zaftys_page_visits
                ADD COLUMN geo_country VARCHAR(64) NULL,
                ADD COLUMN geo_region VARCHAR(128) NULL,
                ADD COLUMN geo_city VARCHAR(128) NULL,
                ADD COLUMN geo_isp VARCHAR(255) NULL'
        );
    } catch (Throwable $e) {
        /* table may not exist yet */
    }
    $done = true;
}

/**
 * Reuse a recent lookup for this IP, otherwise call ipwho.is once.
 *
 * @return array{country: ?string, region: ?string, city: ?string, isp: ?string}
 */
function zaftys_geo_for_ip(PDO $pdo, string $ip): array
{
    $geo = zaftys_geo_empty();
    if ($ip === '' || $ip === '0.0.0.0') {
        return $geo;
    }

    try {
        zaftys_ensure_page_visit_geo_columns($pdo);
        $stmt = $pdo->prepare(
            'SELECT geo_country, geo_region, geo_city, geo_isp
             FROM zaftys_page_visits
             WHERE ip = :ip AND (geo_city IS NOT NULL OR geo_country IS NOT NULL)
             ORDER BY id DESC
             LIMIT 1'
        );
        $stmt->execute([':ip' => $ip]);
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        if (is_array($row) && (($row['geo_city'] ?? '') !== '' || ($row['geo_country'] ?? '') !== '')) {
            return [
                'country' => $row['geo_country'] !== null ? (string) $row['geo_country'] : null,
                'region' => $row['geo_region'] !== null ? (string) $row['geo_region'] : null,
                'city' => $row['geo_city'] !== null ? (string) $row['geo_city'] : null,
                'isp' => $row['geo_isp'] !== null ? (string) $row['geo_isp'] : null,
            ];
        }
    } catch (Throwable $e) {
        /* fall through to remote lookup */
    }

    return zaftys_geo_lookup_remote($ip);
}

function zaftys_geo_email_line(array $geo): string
{
    $parts = array_filter([
        $geo['city'] ?? null,
        $geo['region'] ?? null,
        $geo['country'] ?? null,
    ]);
    $place = implode(', ', $parts);
    $isp = (string) ($geo['isp'] ?? '');
    if ($place === '' && $isp === '') {
        return '';
    }
    $line = 'IP location (approx): ';
    $line .= $place !== '' ? $place : 'unknown city';
    if ($isp !== '') {
        $line .= ' / ' . $isp;
    }
    return $line . "\n";
}
