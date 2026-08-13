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
