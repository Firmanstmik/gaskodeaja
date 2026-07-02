#!/bin/bash
set -euo pipefail

MYSQL_ROOT_PASS="${MYSQL_ROOT_PASS:-12345}"
DB_NAME="gaskodeaja"
DB_USER="gaskodeaja"
SQL_FILE="/tmp/gaskoseweb.sql"

echo "=== Import database asli ke $DB_NAME ==="

if [ ! -f "$SQL_FILE" ]; then
  echo "ERROR: $SQL_FILE tidak ditemukan" >&2
  exit 1
fi

# Simpan password user app jika sudah ada
if [ -f /var/www/gaskodeaja/.db-credentials ]; then
  DB_PASS=$(grep DB_PASSWORD /var/www/gaskodeaja/.db-credentials | cut -d= -f2)
else
  DB_PASS=$(openssl rand -base64 24 | tr -dc 'A-Za-z0-9' | head -c 24)
  echo "DB_PASSWORD=$DB_PASS" > /var/www/gaskodeaja/.db-credentials
  chmod 600 /var/www/gaskodeaja/.db-credentials
fi

echo "=== Drop & recreate database ==="
mysql -uroot -p"${MYSQL_ROOT_PASS}" -e "DROP DATABASE IF EXISTS ${DB_NAME};"
mysql -uroot -p"${MYSQL_ROOT_PASS}" -e "CREATE DATABASE ${DB_NAME} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
mysql -uroot -p"${MYSQL_ROOT_PASS}" -e "CREATE USER IF NOT EXISTS '${DB_USER}'@'localhost' IDENTIFIED BY '${DB_PASS}';"
mysql -uroot -p"${MYSQL_ROOT_PASS}" -e "GRANT ALL PRIVILEGES ON ${DB_NAME}.* TO '${DB_USER}'@'localhost'; FLUSH PRIVILEGES;"

echo "=== Import SQL dump ==="
mysql -uroot -p"${MYSQL_ROOT_PASS}" "${DB_NAME}" < "${SQL_FILE}"

echo "=== Row counts ==="
for t in users heroes brandings services portfolios posts testimonials categories service_plans leads question_answers cara_kerjas visi_misis contact_mes contact_submissions footer_setups; do
  c=$(mysql -uroot -p"${MYSQL_ROOT_PASS}" -N -e "SELECT COUNT(*) FROM ${DB_NAME}.${t}" 2>/dev/null || echo "N/A")
  echo "$t = $c"
done

echo "=== Clear Laravel cache ==="
cd /var/www/gaskodeaja/GasKodeWeb
php artisan config:clear
php artisan cache:clear
php artisan config:cache
php artisan route:cache

echo "=== Restart frontend ==="
pm2 restart gaskodeaja-frontend 2>/dev/null || true

echo "IMPORT_DONE"
