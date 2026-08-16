-- Report download leads (email gate). Applied by POST /api/migrate.php with MIGRATE_TOKEN.

CREATE TABLE IF NOT EXISTS zaftys_report_leads (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(120) NOT NULL,
  job_title VARCHAR(120) NOT NULL,
  email VARCHAR(255) NOT NULL,
  report_slug VARCHAR(128) NOT NULL,
  access_token CHAR(64) NOT NULL,
  source_url VARCHAR(512) NULL DEFAULT NULL,
  consent_version VARCHAR(32) NULL DEFAULT NULL,

  utm_source VARCHAR(128) NULL DEFAULT NULL,
  utm_medium VARCHAR(128) NULL DEFAULT NULL,
  utm_campaign VARCHAR(255) NULL DEFAULT NULL,
  utm_content VARCHAR(255) NULL DEFAULT NULL,
  utm_term VARCHAR(255) NULL DEFAULT NULL,

  ip_hash CHAR(64) NULL DEFAULT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP NULL DEFAULT NULL,

  PRIMARY KEY (id),
  UNIQUE KEY uq_access_token (access_token),
  KEY idx_email (email),
  KEY idx_report_slug (report_slug),
  KEY idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
