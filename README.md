# Landing Page Deeplink React

Landing page pop-under menggunakan React + Vite yang melakukan redirect ke berbagai platform e-commerce menggunakan deeplink.

> **Update Terakhir**: 2 Februari 2026 - Refactor struktur file JSON untuk kemudahan penggunaan

## Fitur

- ✅ Redirect otomatis ke Shopee (format reactPath)
- ✅ Redirect ke TikTok Shop
- ✅ Redirect ke Lazada
- ✅ Redirect ke Traveloka
- ✅ Redirect ke ShopeeFood
- ✅ Konfigurasi deeplink via file JSON (mudah di-edit)
- ✅ Pengaturan enable/disable dan delay per platform

---

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

---

## 📁 Struktur File Konfigurasi

Semua konfigurasi deeplink berada di folder `json/`:

```
json/
├── pengaturan-redirect.json      # Pengaturan utama (enable/disable, delay)
├── deeplink-shopee-react.json    # Deeplink Shopee (reactPath format)
├── deeplink-tiktok.json          # Deeplink TikTok Shop
├── deeplink-lazada.json          # Deeplink Lazada
├── deeplink-traveloka.json       # Deeplink Traveloka
└── deeplink-shopeefood.json      # Deeplink ShopeeFood
```

---

## 🚀 Cara Penggunaan

### Step 1: Mengatur Redirect (Enable/Disable & Delay)

Edit file `json/pengaturan-redirect.json`:

```json
{
  "shopee": {
    "enabled": true, // true = aktif, false = nonaktif
    "delay": 1 // delay dalam milidetik
  },
  "tiktok": {
    "enabled": true,
    "delay": 1
  }
  // ... platform lainnya
}
```

### Step 2: Menambah/Mengedit Deeplink Shopee

Edit file `json/deeplink-shopee-react.json`:

```json
{
  "shopee-deeplink": [
    "shopeeid://reactPath?navigate_url=...&version=1",
    "shopeeid://reactPath?navigate_url=...&version=1"
  ]
}
```

**Format Shopee ReactPath**:

```
shopeeid://reactPath?navigate_url={encoded_url}&path=shopee%2FTRANSFER_PAGE&tab=buy&...&version=1
```

### Step 3: Menambah/Mengedit Deeplink TikTok

Edit file `json/deeplink-tiktok.json`:

```json
{
  "tiktok-deeplink": [
    "snssdk1180://ec/pdp?biz_type=0&...",
    "snssdk1180://ec/pdp?biz_type=0&..."
  ]
}
```

### Step 4: Menambah/Mengedit Deeplink Lazada

Edit file `json/deeplink-lazada.json`:

```json
{
  "lazada-deeplink": ["lazada://id/web?url=...", "lazada://id/web?url=..."]
}
```

### Step 5: Menambah/Mengedit Deeplink Traveloka

Edit file `json/deeplink-traveloka.json`:

```json
{
  "traveloka-deeplink": [
    "traveloka://hotel/detail/spec?hotelId=...",
    "traveloka://hotel/detail/spec?hotelId=..."
  ]
}
```

### Step 6: Menambah/Mengedit Deeplink ShopeeFood

Edit file `json/deeplink-shopeefood.json`:

```json
{
  "shopeefood-deeplink": ["https://spf.shopee.co.id/xxxxx"]
}
```

---

## 🔧 Contoh Konfigurasi

### Menonaktifkan TikTok & Lazada

```json
// json/pengaturan-redirect.json
{
  "shopee": { "enabled": true, "delay": 1 },
  "tiktok": { "enabled": false, "delay": 1 },
  "lazada": { "enabled": false, "delay": 1 },
  "traveloka": { "enabled": true, "delay": 1 },
  "shopeefood": { "enabled": true, "delay": 1 }
}
```

### Menambah Delay untuk Performa

```json
{
  "shopee": { "enabled": true, "delay": 100 },
  "tiktok": { "enabled": true, "delay": 200 },
  "lazada": { "enabled": true, "delay": 300 }
}
```

---

## Parameter URL

- `clickid`: Parameter untuk tracking Shopee (opsional)

Contoh: `?clickid=abc123`

---

## Deployment

### Deployment ke Vercel

Untuk panduan lengkap deployment ke Vercel, lihat file [DEPLOY_VERCEL.md](./DEPLOY_VERCEL.md)

**Quick Deploy**:

1. Push code ke Git repository (GitHub/GitLab/Bitbucket)
2. Import project di [Vercel Dashboard](https://vercel.com/dashboard)
3. Vercel akan otomatis detect dan deploy

### Deployment ke CyberPanel

Untuk panduan lengkap deployment ke CyberPanel, lihat file [DEPLOY_CYBERPANEL.md](./DEPLOY_CYBERPANEL.md)

**Quick Deploy**:

1. Build aplikasi: `npm run build`
2. Upload folder `dist/` ke `public_html` di CyberPanel
3. Konfigurasi rewrite rules untuk SPA
4. Issue SSL certificate

---

## 📋 File Konfigurasi

| File                            | Deskripsi                         |
| ------------------------------- | --------------------------------- |
| `json/pengaturan-redirect.json` | Pengaturan utama redirect         |
| `json/deeplink-*.json`          | File deeplink per platform        |
| `vercel.json`                   | Konfigurasi Vercel deployment     |
| `DEPLOY_VERCEL.md`              | Dokumentasi deployment Vercel     |
| `DEPLOY_CYBERPANEL.md`          | Dokumentasi deployment CyberPanel |

---

## 📝 Changelog

### 2 Februari 2026

- ✨ Refactor: Semua deeplink dipindahkan ke file JSON terpisah
- ✨ Baru: File `pengaturan-redirect.json` untuk kontrol enable/disable dan delay
- ✨ Baru: Format Shopee menggunakan reactPath (bukan navRoute)
- 📁 Struktur folder `json/` yang lebih rapi dan mudah di-maintain
