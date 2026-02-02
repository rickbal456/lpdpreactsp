# Panduan Deploy ke Vercel

Dokumentasi lengkap untuk deploy landing page deeplink ke Vercel.

> **Update Terakhir**: 2 Februari 2026

## Prasyarat

1. Akun Vercel (gratis di [vercel.com](https://vercel.com))
2. Git repository (GitHub, GitLab, atau Bitbucket)
3. Node.js terinstall di local (untuk testing)

---

## Struktur File Konfigurasi

Sebelum deploy, pastikan semua file konfigurasi sudah benar:

```
json/
├── pengaturan-redirect.json      # Pengaturan enable/disable & delay
├── deeplink-shopee-react.json    # Deeplink Shopee (reactPath)
├── deeplink-tiktok.json          # Deeplink TikTok Shop
├── deeplink-lazada.json          # Deeplink Lazada
├── deeplink-traveloka.json       # Deeplink Traveloka
└── deeplink-shopeefood.json      # Deeplink ShopeeFood
```

> **Catatan**: File JSON ini akan di-bundle saat build, jadi tidak ada file terpisah yang perlu di-upload.

---

## Metode 1: Deploy via Vercel Dashboard (Recommended)

### Langkah 1: Push ke Git Repository

```bash
# Inisialisasi git (jika belum)
git init

# Tambahkan semua file
git add .

# Commit
git commit -m "Initial commit: Landing page deeplink"

# Tambahkan remote repository
git remote add origin https://github.com/username/repo.git

# Push ke repository
git push -u origin main
```

### Langkah 2: Import Project di Vercel

1. Login ke [Vercel Dashboard](https://vercel.com/dashboard)
2. Klik **"Add New..."** → **"Project"**
3. Pilih repository yang sudah di-push
4. Vercel akan otomatis detect framework (Vite + React)

### Langkah 3: Konfigurasi Build Settings

Vercel biasanya auto-detect, tapi pastikan:

- **Framework Preset:** Vite
- **Root Directory:** `./` (default)
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

### Langkah 4: Deploy

1. Klik **"Deploy"**
2. Tunggu proses build selesai (biasanya 1-2 menit)
3. Setelah selesai, dapatkan URL production

---

## Metode 2: Deploy via Vercel CLI

### Install Vercel CLI

```bash
npm install -g vercel
```

### Login ke Vercel

```bash
vercel login
```

### Deploy

```bash
# Deploy ke preview
vercel

# Deploy ke production
vercel --prod
```

---

## Update Deeplink Setelah Deploy

### Cara Update Deeplink

1. Edit file JSON di folder `json/` sesuai kebutuhan
2. Commit dan push perubahan

```bash
git add json/
git commit -m "Update deeplink configuration"
git push
```

3. Vercel akan otomatis redeploy

### Contoh: Menonaktifkan TikTok

Edit `json/pengaturan-redirect.json`:

```json
{
  "tiktok": {
    "enabled": false,
    "delay": 1
  }
}
```

Lalu commit dan push.

---

## Konfigurasi Khusus

### File vercel.json

Project sudah memiliki `vercel.json` untuk konfigurasi SPA routing:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

### Custom Domain (Opsional)

1. Buka project di Vercel Dashboard
2. Go to **Settings** → **Domains**
3. Tambahkan domain Anda
4. Ikuti instruksi untuk setup DNS

---

## Troubleshooting

### Redirect Tidak Bekerja

- Pastikan file `json/pengaturan-redirect.json` memiliki `"enabled": true`
- Pastikan array deeplink tidak kosong di file JSON masing-masing platform
- Check browser console untuk error

### 404 Error

- Pastikan `vercel.json` memiliki routing untuk SPA
- Atau gunakan konfigurasi routing di Vercel Dashboard

### Deeplink Tidak Terupdate

- Pastikan sudah commit dan push perubahan
- Tunggu Vercel selesai redeploy (lihat di Dashboard)
- Clear browser cache

---

## Testing Setelah Deploy

Setelah deploy selesai, test dengan:

1. **URL Production:** `https://your-project.vercel.app`
2. **Dengan Parameter:** `https://your-project.vercel.app/?clickid=test123`

---

## Checklist Sebelum Deploy

- [ ] Semua file JSON deeplink sudah diisi dengan benar
- [ ] `pengaturan-redirect.json` sudah dikonfigurasi sesuai kebutuhan
- [ ] Code sudah di-push ke Git repository
- [ ] Test build lokal dengan `npm run build`
- [ ] Semua URL deeplink sudah valid

---

## Update Deployment

### Auto Deploy

Setiap push ke branch `main` akan otomatis trigger deployment.

### Manual Deploy

```bash
# Via CLI
vercel --prod

# Via Dashboard
# Klik "Redeploy" di Vercel Dashboard
```

---

## Referensi

- **Vercel Docs:** [vercel.com/docs](https://vercel.com/docs)
- **Vite Deployment:** [vitejs.dev/guide/static-deploy](https://vitejs.dev/guide/static-deploy.html)

---

**Selamat!** Landing page deeplink Anda sudah siap di production! 🚀
