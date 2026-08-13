<?php

function zaftys_client_ip(): string
{
    $ip = $_SERVER['REMOTE_ADDR'] ?? '';
    return filter_var($ip, FILTER_VALIDATE_IP) ? $ip : '0.0.0.0';
}

function zaftys_ip_hash(): string
{
    $salt = (string) zaftys_secret('ip_hash_salt', 'zaftys');
    return hash('sha256', $salt . '|' . zaftys_client_ip());
}

/** Simple file limiter: $max hits per $windowSeconds per endpoint + IP hash. */
function zaftys_rate_limit(string $endpoint, int $max = 10, int $windowSeconds = 600): bool
{
    $dir = dirname(__DIR__) . '/config/rate-limit';
    if (!is_dir($dir) && !@mkdir($dir, 0700, true)) {
        return true;
    }

    $file = $dir . '/' . preg_replace('/[^a-z0-9_-]/i', '', $endpoint) . '-' . substr(zaftys_ip_hash(), 0, 16) . '.json';
    $now = time();
    $hits = [];

    if (is_readable($file)) {
        $raw = json_decode((string) file_get_contents($file), true);
        if (is_array($raw)) {
            $hits = array_values(array_filter($raw, static fn($t) => is_int($t) && $t > $now - $windowSeconds));
        }
    }

    if (count($hits) >= $max) {
        return false;
    }

    $hits[] = $now;
    @file_put_contents($file, json_encode($hits), LOCK_EX);
    return true;
}
