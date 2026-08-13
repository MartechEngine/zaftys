<?php

function zaftys_pdo(): ?PDO
{
    static $pdo = null;
    if ($pdo instanceof PDO) {
        return $pdo;
    }

    $name = (string) zaftys_secret('db_name');
    $user = (string) zaftys_secret('db_user');
    if ($name === '' || $user === '') {
        return null;
    }

    $host = (string) zaftys_secret('db_host', 'localhost');
    $pass = (string) zaftys_secret('db_pass');

    try {
        $pdo = new PDO(
            "mysql:host={$host};dbname={$name};charset=utf8mb4",
            $user,
            $pass,
            [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            ]
        );
        return $pdo;
    } catch (Throwable $e) {
        return null;
    }
}
