<?php
/**
 * Copy to zaftys-secrets.php in this folder (above public_html on Hostinger).
 * Never commit zaftys-secrets.php.
 */
return [
    'smtp_host' => 'smtp.hostinger.com',
    'smtp_port' => 465,
    'smtp_encryption' => 'ssl',
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
