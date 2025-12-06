# Landing Page Pop Under

Landing page pop-under menggunakan React + Vite yang melakukan redirect ke berbagai platform e-commerce.

## Fitur

- Redirect otomatis ke Shopee (dengan support clickid parameter)
- Redirect ke TikTok Shop
- Redirect ke Lazada
- Redirect ke Traveloka
- Redirect ke ShopeeFood

## Instalasi

```bash
npm install
```

## Development

```bash
npm run dev
```

## Build

```bash
npm run build
```

File hasil build akan berada di folder `dist/`.

## Parameter URL

- `clickid`: Parameter untuk tracking Shopee (opsional)

Contoh: `?clickid=abc123`

## Deployment ke Vercel

Untuk panduan lengkap deployment ke Vercel, lihat file [DEPLOY_VERCEL.md](./DEPLOY_VERCEL.md)

### Quick Deploy

1. Push code ke Git repository (GitHub/GitLab/Bitbucket)
2. Import project di [Vercel Dashboard](https://vercel.com/dashboard)
3. Vercel akan otomatis detect dan deploy

Atau gunakan Vercel CLI:

```bash
npm install -g vercel
vercel login
vercel --prod
```

## File Konfigurasi

- `vercel.json` - Konfigurasi untuk Vercel deployment
- `DEPLOY_VERCEL.md` - Dokumentasi lengkap deployment

