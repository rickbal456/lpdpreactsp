# Deployment ke CyberPanel

Panduan lengkap untuk deploy aplikasi React + Vite ke CyberPanel.

## Prasyarat

- Akses ke CyberPanel dengan hak admin atau user
- Domain yang sudah dikonfigurasi di CyberPanel
- Node.js terinstall di server (untuk build)
- SSH access ke server

## Langkah-Langkah Deployment

### 1. Build Aplikasi

Build aplikasi di lokal terlebih dahulu:

```bash
npm install
npm run build
```

Folder `dist/` akan berisi file-file statis yang siap di-deploy.

### 2. Login ke CyberPanel

1. Akses CyberPanel melalui `https://your-server-ip:8090`
2. Login dengan kredensial Anda

### 3. Buat Website (Jika Belum Ada)

1. Navigasi ke **Websites > Create Website**
2. Isi detail:
   - **Select Package**: Pilih package yang sesuai
   - **Select Owner**: Pilih owner
   - **Domain Name**: Masukkan domain Anda (contoh: `landingpage.domain.com`)
   - **Email**: Masukkan email admin
   - **PHP Version**: Pilih static (tidak perlu PHP)
3. Klik **Create Website**

### 4. Upload File

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
# Connect via SSH
ssh user@your-server-ip

# Navigate ke document root
cd /home/domain.com/public_html

# Upload menggunakan SCP (dari komputer lokal)
scp -r dist/* user@your-server-ip:/home/domain.com/public_html/
```

#### Metode 3: Menggunakan Git (Recommended)

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

### 5. Konfigurasi Rewrite Rules

Untuk SPA (Single Page Application), Anda perlu mengkonfigurasi rewrite rules agar routing berfungsi dengan benar.

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

### 6. Setup SSL (Recommended)

1. Navigasi ke **SSL > Manage SSL**
2. Pilih website Anda
3. Klik **Issue SSL** untuk mendapatkan sertifikat Let's Encrypt gratis
4. Tunggu proses selesai

### 7. Force HTTPS (Optional)

Tambahkan ke `.htaccess` atau vHost config:

```apache
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

## Struktur Folder di Server

Setelah deployment, struktur folder seharusnya:

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

## Troubleshooting

### Halaman Blank / White Screen

- Pastikan semua file dari folder `dist/` sudah ter-upload
- Cek console browser untuk error JavaScript
- Pastikan path di `vite.config.js` benar (`base: '/'`)

### 404 Error pada Refresh

- Pastikan rewrite rules sudah dikonfigurasi dengan benar
- Restart LiteSpeed setelah mengubah vHost config

### File Tidak Ditemukan

- Cek permission folder: `chmod 755 public_html`
- Cek permission file: `chmod 644 public_html/*`

### CSS/JS Tidak Ter-load

- Pastikan `base` di `vite.config.js` sesuai dengan path deployment
- Clear browser cache

## Automasi Deployment (CI/CD)

### Menggunakan GitHub Actions

Buat file `.github/workflows/deploy.yml`:

```yaml
name: Deploy to CyberPanel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: "18"

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Deploy to server
        uses: appleboy/scp-action@master
        with:
          host: ${{ secrets.SERVER_HOST }}
          username: ${{ secrets.SERVER_USER }}
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          source: "dist/*"
          target: "/home/domain.com/public_html"
          strip_components: 1
```

Tambahkan secrets di GitHub:

- `SERVER_HOST`: IP atau hostname server
- `SERVER_USER`: Username SSH
- `SSH_PRIVATE_KEY`: Private key untuk SSH

## Tips Performa

1. **Enable Caching**: Konfigurasi cache headers untuk aset statis
2. **Gzip Compression**: Aktifkan kompresi di LiteSpeed
3. **CDN**: Gunakan CDN seperti Cloudflare untuk performa lebih baik

## Referensi

- [CyberPanel Documentation](https://docs.cyberpanel.net/)
- [OpenLiteSpeed Rewrite Rules](https://openlitespeed.org/kb/rewrite-rules/)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
