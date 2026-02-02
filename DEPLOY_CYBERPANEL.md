# Deployment ke CyberPanel

Panduan lengkap untuk deploy aplikasi Landing Page Deeplink ke CyberPanel.

> **Update Terakhir**: 2 Februari 2026

## Prasyarat

- Akses ke CyberPanel dengan hak admin atau user
- Domain yang sudah dikonfigurasi di CyberPanel
- Node.js terinstall di lokal (untuk build)
- SSH access ke server (opsional)

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

> **Catatan**: File JSON ini akan di-bundle saat build, jadi hanya folder `dist/` yang perlu di-upload.

---

## Langkah-Langkah Deployment

### Step 1: Konfigurasi Deeplink

Sebelum build, pastikan semua deeplink sudah dikonfigurasi:

1. Edit `json/pengaturan-redirect.json` untuk enable/disable platform:

```json
{
  "shopee": { "enabled": true, "delay": 1 },
  "tiktok": { "enabled": true, "delay": 1 },
  "lazada": { "enabled": false, "delay": 1 },
  "traveloka": { "enabled": true, "delay": 1 },
  "shopeefood": { "enabled": true, "delay": 1 }
}
```

2. Edit file deeplink masing-masing platform di folder `json/`

### Step 2: Build Aplikasi

Build aplikasi di lokal:

```bash
npm install
npm run build
```

Folder `dist/` akan berisi file-file statis yang siap di-deploy.

### Step 3: Login ke CyberPanel

1. Akses CyberPanel melalui `https://your-server-ip:8090`
2. Login dengan kredensial Anda

### Step 4: Buat Website (Jika Belum Ada)

1. Navigasi ke **Websites > Create Website**
2. Isi detail:
   - **Select Package**: Pilih package yang sesuai
   - **Select Owner**: Pilih owner
   - **Domain Name**: Masukkan domain Anda
   - **Email**: Masukkan email admin
   - **PHP Version**: Pilih static (tidak perlu PHP)
3. Klik **Create Website**

### Step 5: Upload File

#### Metode 1: Menggunakan File Manager CyberPanel

1. Navigasi ke **Websites > List Websites**
2. Klik **File Manager** pada website yang sesuai
3. Masuk ke folder `public_html`
4. Hapus file default yang ada
5. Upload semua file dari folder `dist/`:
   - Klik **Upload**
   - Pilih semua file dari folder `dist/` lokal
   - Tunggu proses upload selesai

#### Metode 2: Menggunakan SFTP/SSH

```bash
# Upload menggunakan SCP (dari komputer lokal)
scp -r dist/* user@your-server-ip:/home/domain.com/public_html/
```

#### Metode 3: Menggunakan Git

```bash
# SSH ke server
ssh user@your-server-ip

# Navigate ke folder
cd /home/domain.com

# Clone repository
git clone https://github.com/username/repo.git temp

# Build di server (pastikan Node.js terinstall)
cd temp
npm install
npm run build

# Copy hasil build ke public_html
cp -r dist/* ../public_html/

# Cleanup
cd ..
rm -rf temp
```

### Step 6: Konfigurasi Rewrite Rules

Untuk SPA (Single Page Application), konfigurasi rewrite rules:

#### Untuk OpenLiteSpeed (Default CyberPanel)

1. Navigasi ke **Websites > List Websites**
2. Klik **vHost Conf** pada website Anda
3. Tambahkan konfigurasi berikut:

```apache
context / {
  location                /
  allowBrowse             1
  rewrite  {
    enable                1
    autoLoadHtaccess      1
    rules                 <<<END_rules
RewriteEngine On
RewriteBase /
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
END_rules
  }
}
```

4. Klik **Save**
5. Restart LiteSpeed: **Server Status > LiteSpeed Status > Graceful Restart**

#### Alternatif: Menggunakan .htaccess

Buat file `.htaccess` di folder `public_html`:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

### Step 7: Setup SSL (Recommended)

1. Navigasi ke **SSL > Manage SSL**
2. Pilih website Anda
3. Klik **Issue SSL** untuk mendapatkan sertifikat Let's Encrypt gratis
4. Tunggu proses selesai

---

## Update Deeplink Setelah Deploy

Untuk update deeplink setelah deploy:

1. Edit file JSON di folder `json/` sesuai kebutuhan
2. Build ulang: `npm run build`
3. Upload ulang folder `dist/` ke `public_html`

> **Tips**: Gunakan Git untuk mempermudah proses update

---

## Struktur Folder di Server

Setelah deployment:

```
/home/domain.com/
├── public_html/
│   ├── index.html
│   ├── assets/
│   │   ├── index-[hash].js
│   │   └── index-[hash].css
│   └── .htaccess (jika menggunakan)
└── ...
```

---

## Troubleshooting

### Halaman Blank / White Screen

- Pastikan semua file dari folder `dist/` sudah ter-upload
- Cek console browser untuk error JavaScript
- Pastikan path di `vite.config.js` benar (`base: '/'`)

### 404 Error pada Refresh

- Pastikan rewrite rules sudah dikonfigurasi dengan benar
- Restart LiteSpeed setelah mengubah vHost config

### Redirect Tidak Bekerja

- Pastikan `pengaturan-redirect.json` memiliki `"enabled": true`
- Pastikan array deeplink tidak kosong
- Build ulang dan upload ulang

### File Tidak Ditemukan

- Cek permission folder: `chmod 755 public_html`
- Cek permission file: `chmod 644 public_html/*`

---

## Checklist Sebelum Deploy

- [ ] Semua file JSON deeplink sudah diisi dengan benar
- [ ] `pengaturan-redirect.json` sudah dikonfigurasi
- [ ] Test build lokal dengan `npm run build`
- [ ] Semua URL deeplink sudah valid
- [ ] SSL certificate sudah di-issue

---

## Tips Performa

1. **Enable Caching**: Konfigurasi cache headers untuk aset statis
2. **Gzip Compression**: Aktifkan kompresi di LiteSpeed
3. **CDN**: Gunakan CDN seperti Cloudflare untuk performa lebih baik

---

## Referensi

- [CyberPanel Documentation](https://docs.cyberpanel.net/)
- [OpenLiteSpeed Rewrite Rules](https://openlitespeed.org/kb/rewrite-rules/)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)

---

**Selamat!** Landing page deeplink Anda sudah siap di production! 🚀
