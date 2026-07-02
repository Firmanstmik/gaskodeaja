#!/bin/bash
cd /var/www/gaskodeaja/GasKodeWeb

echo "=== Create storage symlink ==="
php artisan storage:link 2>&1
ls -la public/storage 2>&1

echo ""
echo "=== Set hero image_path ==="
mysql -uroot -p12345 gaskodeaja -e "UPDATE heroes SET image_path='uploads/hero/1777399962_Hero-Section.webp' WHERE id=1;"
mysql -uroot -p12345 gaskodeaja -N -e "SELECT id, image_path FROM heroes;"

echo ""
echo "=== Permissions ==="
chown -R www-data:www-data storage bootstrap/cache public/uploads
chmod -R 775 storage bootstrap/cache public/uploads
echo "DONE"
