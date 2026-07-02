#!/bin/bash
echo "=== TABLE ROW COUNTS (gaskodeaja) ==="
for t in users heroes brandings services portfolios posts testimonials categories service_plans leads question_answers cara_kerjas visi_misis contact_mes contact_submissions footer_setups; do
  c=$(mysql -uroot -p12345 -N -e "SELECT COUNT(*) FROM gaskodeaja.$t" 2>/dev/null)
  echo "$t = ${c:-ERR}"
done

echo ""
echo "=== UPLOADS DIR ==="
ls -la /var/www/gaskodeaja/GasKodeWeb/public/uploads/ 2>/dev/null
echo "--- uploads/hero ---"
ls -la /var/www/gaskodeaja/GasKodeWeb/public/uploads/hero/ 2>/dev/null

echo ""
echo "=== STORAGE SYMLINK ==="
ls -la /var/www/gaskodeaja/GasKodeWeb/public/storage 2>/dev/null || echo "NO storage symlink"

echo ""
echo "=== storage/app/public ==="
ls -la /var/www/gaskodeaja/GasKodeWeb/storage/app/public/ 2>/dev/null

echo ""
echo "=== PM2 ==="
pm2 describe gaskodeaja-frontend 2>/dev/null | grep -E "status|uptime|restart" | head -5

echo ""
echo "=== HERO image_path in DB ==="
mysql -uroot -p12345 -N -e "SELECT id, image_path FROM gaskodeaja.heroes" 2>/dev/null
