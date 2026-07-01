#!/bin/bash
set -euo pipefail
DB_PASS=$(grep DB_PASSWORD /var/www/gaskodeaja/.db-credentials | cut -d= -f2)
mysql -uroot -p12345 -e "ALTER USER 'gaskodeaja'@'localhost' IDENTIFIED BY '${DB_PASS}'; FLUSH PRIVILEGES;"
cd /var/www/gaskodeaja/GasKodeWeb
php artisan migrate --force
php artisan db:seed --force
php artisan storage:link --force 2>/dev/null || true
php artisan config:cache
php artisan route:cache
php artisan view:cache
chown -R www-data:www-data storage bootstrap/cache public/uploads
echo BACKEND_OK
