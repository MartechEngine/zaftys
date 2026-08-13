<?php

function zaftys_smtp_read($fp): string
{
    $resp = '';
    while (($line = fgets($fp, 515)) !== false) {
        $resp .= $line;
        if (isset($line[3]) && $line[3] === ' ') {
            break;
        }
    }
    return $resp;
}

function zaftys_smtp_cmd($fp, ?string $cmd, int $expect): bool
{
    if ($cmd !== null) {
        fwrite($fp, $cmd . "\r\n");
    }
    $resp = zaftys_smtp_read($fp);
    $code = (int) substr($resp, 0, 3);
    return $code === $expect;
}

function zaftys_smtp_send(string $to, string $subject, string $body, string $replyTo = ''): bool
{
    $host = (string) zaftys_secret('smtp_host');
    $port = (int) zaftys_secret('smtp_port', 465);
    $enc = strtolower((string) zaftys_secret('smtp_encryption', 'ssl'));
    $user = (string) zaftys_secret('smtp_user');
    $pass = (string) zaftys_secret('smtp_pass');
    $from = (string) zaftys_secret('smtp_from', $user);
    $fromName = (string) zaftys_secret('smtp_from_name', 'ZAFTYS Website');

    if ($host === '' || $user === '' || $pass === '' || $pass === 'CHANGE_ME') {
        return false;
    }

    $remote = ($enc === 'ssl' ? 'ssl://' : '') . $host . ':' . $port;
    $fp = @stream_socket_client($remote, $errno, $errstr, 20, STREAM_CLIENT_CONNECT);
    if (!$fp) {
        return false;
    }
    stream_set_timeout($fp, 20);

    if (!zaftys_smtp_cmd($fp, null, 220)) {
        fclose($fp);
        return false;
    }
    if (!zaftys_smtp_cmd($fp, 'EHLO zaftys.com', 250)) {
        fclose($fp);
        return false;
    }

    if ($enc === 'tls') {
        if (!zaftys_smtp_cmd($fp, 'STARTTLS', 220)) {
            fclose($fp);
            return false;
        }
        if (!stream_socket_enable_crypto($fp, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) {
            fclose($fp);
            return false;
        }
        if (!zaftys_smtp_cmd($fp, 'EHLO zaftys.com', 250)) {
            fclose($fp);
            return false;
        }
    }

    if (!zaftys_smtp_cmd($fp, 'AUTH LOGIN', 334)) {
        fclose($fp);
        return false;
    }
    if (!zaftys_smtp_cmd($fp, base64_encode($user), 334)) {
        fclose($fp);
        return false;
    }
    if (!zaftys_smtp_cmd($fp, base64_encode($pass), 235)) {
        fclose($fp);
        return false;
    }
    if (!zaftys_smtp_cmd($fp, 'MAIL FROM:<' . $from . '>', 250)) {
        fclose($fp);
        return false;
    }
    if (!zaftys_smtp_cmd($fp, 'RCPT TO:<' . $to . '>', 250)) {
        fclose($fp);
        return false;
    }
    if (!zaftys_smtp_cmd($fp, 'DATA', 354)) {
        fclose($fp);
        return false;
    }

    $encodedSubject = '=?UTF-8?B?' . base64_encode($subject) . '?=';
    $headers = [
        'From: ' . $fromName . ' <' . $from . '>',
        'To: ' . $to,
        'Subject: ' . $encodedSubject,
        'MIME-Version: 1.0',
        'Content-Type: text/plain; charset=UTF-8',
        'Content-Transfer-Encoding: 8bit',
        'X-Mailer: ZAFTYS-Website',
    ];
    if ($replyTo !== '' && filter_var($replyTo, FILTER_VALIDATE_EMAIL)) {
        $headers[] = 'Reply-To: ' . $replyTo;
    }

    $safeBody = str_replace(["\r\n.", "\n."], ["\r\n..", "\n.."], $body);
    $payload = implode("\r\n", $headers) . "\r\n\r\n" . $safeBody . "\r\n.";
    fwrite($fp, $payload . "\r\n");

    $ok = zaftys_smtp_cmd($fp, null, 250);
    zaftys_smtp_cmd($fp, 'QUIT', 221);
    fclose($fp);
    return $ok;
}

function zaftys_json_input(int $maxBytes = 32768): ?array
{
    $raw = file_get_contents('php://input');
    if ($raw === false || strlen($raw) > $maxBytes) {
        return null;
    }
    $data = json_decode($raw, true);
    return is_array($data) ? $data : null;
}

function zaftys_honeypot(array $input): bool
{
    return trim((string) ($input['website'] ?? '')) !== '';
}

function zaftys_clip(string $value, int $max): string
{
    $value = trim($value);
    if (function_exists('mb_substr')) {
        return mb_substr($value, 0, $max);
    }
    return substr($value, 0, $max);
}
