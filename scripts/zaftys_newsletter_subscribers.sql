-- Source copy for phpMyAdmin. CI deploys public/config/migrations/001_newsletter.sql
-- and applies it via POST /api/migrate.php (MIGRATE_TOKEN).

CREATE TABLE IF NOT EXISTS zaftys_newsletter_subscribers (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  email VARCHAR(255) NOT NULL,
  source VARCHAR(64) NOT NULL DEFAULT 'footer',
  status ENUM('pending', 'active', 'unsubscribed')
    NOT NULL DEFAULT 'pending',

  subscribed_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  confirmed_at TIMESTAMP NULL DEFAULT NULL,
  unsubscribed_at TIMESTAMP NULL DEFAULT NULL,

  consent_at TIMESTAMP NULL DEFAULT NULL,
  consent_version VARCHAR(32) NULL DEFAULT NULL,

  source_url VARCHAR(512) NULL DEFAULT NULL,

  utm_source VARCHAR(128) NULL DEFAULT NULL,
  utm_medium VARCHAR(128) NULL DEFAULT NULL,
  utm_campaign VARCHAR(255) NULL DEFAULT NULL,
  utm_content VARCHAR(255) NULL DEFAULT NULL,
  utm_term VARCHAR(255) NULL DEFAULT NULL,

  ip_hash CHAR(64) NULL DEFAULT NULL,

  PRIMARY KEY (id),
  UNIQUE KEY uq_email (email),
  KEY idx_status (status),
  KEY idx_source (source),
  KEY idx_subscribed_at (subscribed_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
