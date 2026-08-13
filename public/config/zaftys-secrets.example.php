<?php
/**
 * Copy this file to zaftys-secrets.php in the same folder
 * (or to /config/zaftys-secrets.php above public_html).
 * Never commit zaftys-secrets.php.
 *
 * Hostinger: Email → client config for SMTP. Databases → MySQL for db_*.
 */
return [
    'smtp_host' => 'smtp.hostinger.com',
    'smtp_port' => 465,
    'smtp_encryption' => 'ssl', // ssl (465) or tls (587)
    'smtp_user' => 'no-reply@zaftys.com',
    'smtp_pass' => 'CHANGE_ME',
    'smtp_from' => 'no-reply@zaftys.com',
    'smtp_from_name' => 'ZAFTYS Website',

    'mail_contact' => 'contact@zaftys.com',
    'mail_subscribers' => 'subscribers@zaftys.com',
    'mail_partner' => 'partner@zaftys.com',
    'mail_careers' => 'careers@zaftys.com',
    'mail_visits' => 'info@zaftys.com',

    'db_host' => 'localhost',
    'db_name' => '',
    'db_user' => '',
    'db_pass' => '',

    'ip_hash_salt' => 'CHANGE_ME_RANDOM_STRING',
    'migrate_token' => 'CHANGE_ME',
];
