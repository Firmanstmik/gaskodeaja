#!/bin/bash
set -euo pipefail
cd /var/www/gaskodeaja/gaskode-frontend
cat > .env.local <<EOF
NEXT_PUBLIC_API_URL=https://gaskodeaja.com/api
NEXT_PUBLIC_STORAGE_URL=https://gaskodeaja.com/storage
NEXT_PUBLIC_IMG_URL=https://gaskodeaja.com
EOF
npm ci
npm run build
pm2 delete gaskodeaja-frontend 2>/dev/null || true
pm2 start node_modules/next/dist/bin/next --name gaskodeaja-frontend -- start -p 3025
pm2 save
sed -i 's/\r$//' /var/www/gaskodeaja/deploy/nginx-gaskodeaja.conf
cp /var/www/gaskodeaja/deploy/nginx-gaskodeaja.conf /etc/nginx/sites-available/gaskodeaja.com
ln -sf /etc/nginx/sites-available/gaskodeaja.com /etc/nginx/sites-enabled/gaskodeaja.com
nginx -t && systemctl reload nginx
echo FRONTEND_OK
