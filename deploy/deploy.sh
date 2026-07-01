#!/bin/bash
set -euo pipefail

APP_DIR="/var/www/gaskodeaja"
REPO_URL="${REPO_URL:-https://github.com/Firmanstmik/gaskodeaja.git}"
BRANCH="${BRANCH:-main}"
DB_NAME="gaskodeaja"
DB_USER="gaskodeaja"
FRONTEND_PORT=3025

echo "==> Deploy GasKode Aja"

if [ ! -f "$APP_DIR/GasKodeWeb/artisan" ]; then
  rm -rf "$APP_DIR"
  git clone --branch "$BRANCH" "$REPO_URL" "$APP_DIR"
elif [ -d "$APP_DIR/.git" ]; then
  cd "$APP_DIR"
  git fetch origin
  git reset --hard "origin/$BRANCH"
fi

cd "$APP_DIR"

if ! mysql -e "USE $DB_NAME" 2>/dev/null; then
  DB_PASS=$(openssl rand -base64 24 | tr -dc 'A-Za-z0-9' | head -c 24)
  mysql -e "CREATE DATABASE IF NOT EXISTS $DB_NAME CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
  mysql -e "CREATE USER IF NOT EXISTS '$DB_USER'@'localhost' IDENTIFIED BY '$DB_PASS';"
  mysql -e "GRANT ALL PRIVILEGES ON $DB_NAME.* TO '$DB_USER'@'localhost'; FLUSH PRIVILEGES;"
  echo "DB_PASSWORD=$DB_PASS" > "$APP_DIR/.db-credentials"
  chmod 600 "$APP_DIR/.db-credentials"
  echo "Database credentials saved to $APP_DIR/.db-credentials"
fi

if [ ! -f "$APP_DIR/.db-credentials" ]; then
  echo "ERROR: .db-credentials missing. Create database manually." >&2
  exit 1
fi

DB_PASS=$(grep DB_PASSWORD "$APP_DIR/.db-credentials" | cut -d= -f2)

cd "$APP_DIR/GasKodeWeb"
if [ ! -f .env ]; then
  cp .env.example .env
fi
php artisan key:generate --force
php artisan jwt:secret --force 2>/dev/null || true

APP_KEY_VAL=$(grep '^APP_KEY=' .env | cut -d= -f2-)
JWT_SECRET_VAL=$(grep '^JWT_SECRET=' .env 2>/dev/null | cut -d= -f2- || echo "")

cat > .env <<EOF
APP_NAME=GasKodeAja
APP_ENV=production
APP_KEY=${APP_KEY_VAL}
APP_DEBUG=false
APP_URL=https://gaskodeaja.com

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=$DB_NAME
DB_USERNAME=$DB_USER
DB_PASSWORD=$DB_PASS

SESSION_DRIVER=database
SESSION_LIFETIME=120
CACHE_STORE=database
QUEUE_CONNECTION=database
FILESYSTEM_DISK=public

LOG_CHANNEL=stack
LOG_LEVEL=error
JWT_SECRET=${JWT_SECRET_VAL}
EOF

composer install --no-dev --optimize-autoloader --no-interaction
mkdir -p public/uploads/hero
php artisan migrate --force
php artisan db:seed --force
php artisan storage:link --force 2>/dev/null || true
php artisan config:cache
php artisan route:cache
php artisan view:cache
chown -R www-data:www-data storage bootstrap/cache public/uploads
chmod -R 775 storage bootstrap/cache public/uploads

cd "$APP_DIR/gaskode-frontend"
cat > .env.local <<EOF
NEXT_PUBLIC_API_URL=https://gaskodeaja.com/api
NEXT_PUBLIC_STORAGE_URL=https://gaskodeaja.com/storage
NEXT_PUBLIC_IMG_URL=https://gaskodeaja.com
EOF

npm ci
npm run build

pm2 delete gaskodeaja-frontend 2>/dev/null || true
pm2 start node_modules/next/dist/bin/next --name gaskodeaja-frontend -- start -p $FRONTEND_PORT
pm2 save

cp "$APP_DIR/deploy/nginx-gaskodeaja.conf" /etc/nginx/sites-available/gaskodeaja.com
ln -sf /etc/nginx/sites-available/gaskodeaja.com /etc/nginx/sites-enabled/gaskodeaja.com
nginx -t && systemctl reload nginx

echo "==> Deploy selesai! https://gaskodeaja.com"
