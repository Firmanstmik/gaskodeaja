# GasKode Aja

Monorepo website company profile + CMS admin.

## Struktur

- `gaskode-frontend/` — Next.js 16 (public site + admin dashboard)
- `GasKodeWeb/` — Laravel 12 REST API (JWT auth)
- `deploy/` — Nginx config & deploy script untuk VPS

## Development Lokal

### Backend
```bash
cd GasKodeWeb
cp .env.example .env
composer install
php artisan key:generate
php artisan jwt:secret --force
touch database/database.sqlite
php artisan migrate --seed
php artisan serve --port=8006
```

### Frontend
```bash
cd gaskode-frontend
cp .env.example .env.local
# Edit NEXT_PUBLIC_API_URL=http://127.0.0.1:8006/api
npm install
npm run dev
```

## Deploy VPS (gaskodeaja.com)

```bash
ssh root@76.13.23.143
bash /var/www/gaskodeaja/deploy/deploy.sh
```

## Default Admin (setelah seed)

- Email: `admin@gaskodeaja.com`
- Password: `GaskodeAdmin2026!` — **ganti segera setelah login pertama**
