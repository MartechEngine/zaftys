-- Exact visitor IP log. Purged after 90 days by /api/visit-digest.php.
-- Applied by POST /api/migrate.php with X-Zaftys-Migrate-Token.

CREATE TABLE IF NOT EXISTS zaftys_page_visits (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  visited_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  ip VARCHAR(45) NOT NULL,
  path VARCHAR(512) NOT NULL,
  referrer VARCHAR(512) NULL DEFAULT NULL,
  user_agent VARCHAR(512) NULL DEFAULT NULL,
  utm_source VARCHAR(128) NULL DEFAULT NULL,
  utm_medium VARCHAR(128) NULL DEFAULT NULL,
  utm_campaign VARCHAR(255) NULL DEFAULT NULL,
  utm_content VARCHAR(255) NULL DEFAULT NULL,
  utm_term VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (id),
  KEY idx_visited_at (visited_at),
  KEY idx_ip (ip)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
