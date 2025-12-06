# Panduan Deploy ke Vercel

Dokumentasi lengkap untuk deploy landing page pop-under ke Vercel.

## Prasyarat

1. Akun Vercel (gratis di [vercel.com](https://vercel.com))
2. Git repository (GitHub, GitLab, atau Bitbucket)
3. Node.js terinstall di local (untuk testing)

## Metode 1: Deploy via Vercel Dashboard (Recommended)

### Langkah 1: Push ke Git Repository

```bash
# Inisialisasi git (jika belum)
git init

# Tambahkan semua file
git add .

# Commit
git commit -m "Initial commit: Landing page pop-under"

# Tambahkan remote repository (contoh GitHub)
git remote add origin https://github.com/username/landingpageppopunder.git

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

## Konfigurasi Khusus

### File vercel.json (Opsional)

Buat file `vercel.json` di root project untuk konfigurasi tambahan:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

### Environment Variables (Jika Diperlukan)

Jika ada environment variables:

1. Buka project di Vercel Dashboard
2. Go to **Settings** → **Environment Variables**
3. Tambahkan variables yang diperlukan

## Testing Setelah Deploy

Setelah deploy selesai, test dengan:

1. **URL Production:** `https://your-project.vercel.app`
2. **Dengan Parameter:** `https://your-project.vercel.app/?clickid=test123`

## Custom Domain (Opsional)

### Setup Custom Domain

1. Buka project di Vercel Dashboard
2. Go to **Settings** → **Domains**
3. Tambahkan domain Anda
4. Ikuti instruksi untuk setup DNS

### DNS Configuration

Tambahkan record berikut di DNS provider:

- **Type:** CNAME
- **Name:** `@` atau `www`
- **Value:** `cname.vercel-dns.com`

## Troubleshooting

### Build Fails

**Error:** Build command failed

**Solusi:**
- Pastikan `package.json` memiliki script `build`
- Check Node.js version (Vercel menggunakan Node 18.x default)
- Lihat build logs di Vercel Dashboard

### Redirect Tidak Bekerja

**Error:** Redirect tidak berfungsi di production

**Solusi:**
- Pastikan semua URL menggunakan protocol lengkap (`https://`)
- Check browser console untuk error
- Pastikan deep links valid

### 404 Error

**Error:** Halaman tidak ditemukan saat refresh

**Solusi:**
- Pastikan `vercel.json` memiliki routing untuk SPA
- Atau gunakan konfigurasi routing di Vercel Dashboard

## Monitoring & Analytics

### Vercel Analytics

1. Buka project di Vercel Dashboard
2. Go to **Analytics** tab
3. Enable analytics untuk tracking

### Custom Analytics

Tambahkan tracking code di `index.html` jika diperlukan:

```html
<!-- Google Analytics contoh -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
```

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

## Best Practices

1. **Environment Variables:** Jangan commit sensitive data
2. **Build Optimization:** Pastikan build size optimal
3. **Caching:** Vercel otomatis cache static assets
4. **HTTPS:** Vercel otomatis provide SSL certificate
5. **Performance:** Monitor Core Web Vitals di Analytics

## Support

- **Vercel Docs:** [vercel.com/docs](https://vercel.com/docs)
- **Vercel Discord:** [vercel.com/discord](https://vercel.com/discord)
- **GitHub Issues:** Buat issue di repository project

## Checklist Sebelum Deploy

- [ ] Code sudah di-push ke Git repository
- [ ] `package.json` memiliki script `build`
- [ ] Test build lokal dengan `npm run build`
- [ ] Semua URL redirect sudah valid
- [ ] Environment variables sudah di-set (jika ada)
- [ ] Custom domain sudah di-setup (jika ada)

---

**Selamat!** Landing page Anda sudah siap di production! 🚀

