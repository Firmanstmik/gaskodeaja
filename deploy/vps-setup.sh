#!/bin/bash
set -euo pipefail

APP_DIR="/var/www/gaskodeaja"
DB_NAME="gaskodeaja"
DB_USER="gaskodeaja"
FRONTEND_PORT=3025
MYSQL_ROOT_PASS="${MYSQL_ROOT_PASS:-}"

if [ -z "$MYSQL_ROOT_PASS" ]; then
  echo "Set MYSQL_ROOT_PASS env var" >&2
  exit 1
fi

DB_PASS=$(openssl rand -base64 24 | tr -dc 'A-Za-z0-9' | head -c 24)

mysql -uroot -p"${MYSQL_ROOT_PASS}" -e "CREATE DATABASE IF NOT EXISTS ${DB_NAME} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
mysql -uroot -p"${MYSQL_ROOT_PASS}" -e "CREATE USER IF NOT EXISTS '${DB_USER}'@'localhost' IDENTIFIED BY '${DB_PASS}';"
mysql -uroot -p"${MYSQL_ROOT_PASS}" -e "GRANT ALL PRIVILEGES ON ${DB_NAME}.* TO '${DB_USER}'@'localhost'; FLUSH PRIVILEGES;"
echo "DB_PASSWORD=${DB_PASS}" > "${APP_DIR}/.db-credentials"
chmod 600 "${APP_DIR}/.db-credentials"

cd "${APP_DIR}/GasKodeWeb"
cp -n .env.example .env || true

composer install --no-dev --optimize-autoloader --no-interaction

php artisan key:generate --force
php artisan jwt:secret --force 2>/dev/null || true

APP_KEY_VAL=$(grep '^APP_KEY=' .env | cut -d= -f2-)
JWT_SECRET_VAL=$(grep '^JWT_SECRET=' .env 2>/dev/null | cut -d= -f2- || echo "")

cat > .env <<ENVEOF
APP_NAME=GasKodeAja
APP_ENV=production
APP_KEY=${APP_KEY_VAL}
APP_DEBUG=false
APP_URL=https://gaskodeaja.com
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=${DB_NAME}
DB_USERNAME=${DB_USER}
DB_PASSWORD=${DB_PASS}
SESSION_DRIVER=database
SESSION_LIFETIME=120
CACHE_STORE=database
QUEUE_CONNECTION=database
FILESYSTEM_DISK=public
LOG_CHANNEL=stack
LOG_LEVEL=error
JWT_SECRET=${JWT_SECRET_VAL}
ENVEOF

mkdir -p public/uploads/hero
php artisan migrate --force
php artisan db:seed --force
php artisan storage:link --force 2>/dev/null || true
php artisan config:cache
php artisan route:cache
php artisan view:cache
chown -R www-data:www-data storage bootstrap/cache public/uploads
chmod -R 775 storage bootstrap/cache public/uploads

cd "${APP_DIR}/gaskode-frontend"
cat > .env.local <<ENVEOF
NEXT_PUBLIC_API_URL=https://gaskodeaja.com/api
NEXT_PUBLIC_STORAGE_URL=https://gaskodeaja.com/storage
NEXT_PUBLIC_IMG_URL=https://gaskodeaja.com
ENVEOF

npm ci
npm run build

pm2 delete gaskodeaja-frontend 2>/dev/null || true
pm2 start node_modules/next/dist/bin/next --name gaskodeaja-frontend -- start -p ${FRONTEND_PORT}
pm2 save

sed -i 's/\r$//' "${APP_DIR}/deploy/nginx-gaskodeaja.conf"
cp "${APP_DIR}/deploy/nginx-gaskodeaja.conf" /etc/nginx/sites-available/gaskodeaja.com
ln -sf /etc/nginx/sites-available/gaskodeaja.com /etc/nginx/sites-enabled/gaskodeaja.com
nginx -t && systemctl reload nginx

echo "DONE https://gaskodeaja.com"
