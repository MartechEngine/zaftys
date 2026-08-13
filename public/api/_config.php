<?php

function zaftys_secrets(): array
{
    static $cached = null;
    if (is_array($cached)) {
        return $cached;
    }

    $candidates = [
        dirname(__DIR__, 2) . '/config/zaftys-secrets.php',
        dirname(__DIR__) . '/config/zaftys-secrets.php',
    ];

    foreach ($candidates as $path) {
        if (is_readable($path)) {
            $data = require $path;
            if (is_array($data)) {
                $cached = $data;
                return $cached;
            }
        }
    }

    $cached = [];
    return $cached;
}

function zaftys_secret(string $key, $default = '')
{
    $all = zaftys_secrets();
    return $all[$key] ?? $default;
}

function zaftys_provided_ops_token(): string
{
    $provided = '';
    $auth = (string) ($_SERVER['HTTP_AUTHORIZATION'] ?? $_SERVER['REDIRECT_HTTP_AUTHORIZATION'] ?? '');
    if (preg_match('/^Bearer\s+(.+)$/i', $auth, $m)) {
        $provided = trim($m[1]);
    }
    if ($provided === '') {
        $provided = trim((string) ($_SERVER['HTTP_X_ZAFTYS_MIGRATE_TOKEN'] ?? ''));
    }
    if ($provided === '') {
        $body = json_decode((string) file_get_contents('php://input'), true);
        if (is_array($body) && isset($body['token'])) {
            $provided = trim((string) $body['token']);
        }
    }
    return $provided;
}

function zaftys_ops_token_configured(): bool
{
    $expected = (string) zaftys_secret('migrate_token', '');
    return $expected !== '' && $expected !== 'CHANGE_ME';
}

function zaftys_ops_token_valid(): bool
{
    if (!zaftys_ops_token_configured()) {
        return false;
    }
    $expected = (string) zaftys_secret('migrate_token', '');
    $provided = zaftys_provided_ops_token();
    return $provided !== '' && hash_equals($expected, $provided);
}
