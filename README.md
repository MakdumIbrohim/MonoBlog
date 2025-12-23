# MonoBlog

Aplikasi blog full-stack yang dibangun dengan Laravel (backend) dan Next.js (frontend). Monorepo ini menyediakan platform blogging lengkap dengan autentikasi pengguna, manajemen postingan, komentar, dan kontrol akses berbasis peran.

## Fitur

- **Autentikasi Pengguna**: Registrasi, login, verifikasi email, reset kata sandi
- **Manajemen Postingan**: Buat, baca, perbarui, hapus postingan blog
- **Sistem Komentar**: Tambahkan komentar pada postingan
- **Akses Berbasis Peran**: Peran pengguna yang berbeda dengan izin
- **Desain Responsif**: UI modern dengan toggle tema
- **Didorong API**: Backend API RESTful dengan frontend Next.js

## Tech Stack

### Backend
- **Laravel**: Framework PHP untuk pengembangan backend yang kuat
- **MySQL**: Database untuk persistensi data
- **Sanctum**: Autentikasi API
- **Eloquent ORM**: Interaksi database

### Frontend
- **Next.js**: Framework React untuk frontend
- **TypeScript**: JavaScript yang aman tipe
- **Tailwind CSS**: Framework CSS utility-first
- **React Hooks**: Manajemen state

## Instalasi

### Prasyarat
- PHP 8.1 atau lebih tinggi
- Composer
- Node.js 18 atau lebih tinggi
- npm, yarn, atau pnpm
- Database MySQL

### Setup Backend

1. Navigasi ke direktori backend:
   ```bash
   cd backend
   ```

2. Instal dependensi PHP:
   ```bash
   composer install
   ```

3. Salin file environment dan konfigurasikan:
   ```bash
   cp .env.example .env
   ```
   Perbarui file `.env` dengan kredensial database dan pengaturan lainnya.

4. Generate kunci aplikasi:
   ```bash
   php artisan key:generate
   ```

5. Jalankan migrasi database:
   ```bash
   php artisan migrate
   ```

6. (Opsional) Seed database:
   ```bash
   php artisan db:seed
   ```

7. Mulai server pengembangan Laravel:
   ```bash
   php artisan serve
   ```

### Setup Frontend

1. Navigasi ke direktori frontend:
   ```bash
   cd frontend
   ```

2. Instal dependensi Node.js:
   ```bash
   npm install
   # atau
   yarn install
   # atau
   pnpm install
   ```

3. Salin file environment dan konfigurasikan:
   ```bash
   cp .env.local.example .env.local
   ```
   Perbarui file `.env.local` dengan URL base API Anda (biasanya `http://localhost:8000/api`).

4. Mulai server pengembangan Next.js:
   ```bash
   npm run dev
   # atau
   yarn dev
   # atau
   pnpm dev
   ```

## Penggunaan

1. Pastikan kedua server backend dan frontend sedang berjalan.
2. Buka browser Anda dan navigasi ke `http://localhost:3000` untuk frontend.
3. Daftar akun baru atau login dengan kredensial yang ada.
4. Buat dan kelola postingan blog dari dashboard.
5. Lihat postingan di halaman blog dan tambahkan komentar.

## Dokumentasi API

Backend menyediakan API RESTful. Endpoint utama meliputi:

- `POST /api/register` - Registrasi pengguna
- `POST /api/login` - Login pengguna
- `GET /api/posts` - Dapatkan semua postingan
- `POST /api/posts` - Buat postingan baru
- `GET /api/posts/{id}/comments` - Dapatkan komentar untuk postingan
- `POST /api/posts/{id}/comments` - Tambahkan komentar ke postingan

Untuk dokumentasi API yang detail, lihat rute API Laravel di `backend/routes/api.php`.

## Struktur Proyek

```
MonoBlog/
├── backend/          # Aplikasi Laravel
│   ├── app/          # Kode aplikasi
│   ├── database/     # Migrasi dan seeder
│   ├── routes/       # Rute API dan web
│   └── ...
├── frontend/         # Aplikasi Next.js
│   ├── app/          # Direktori app Next.js
│   ├── components/   # Komponen React
│   ├── hooks/        # Hook React kustom
│   ├── services/     # Fungsi layanan API
│   └── ...
└── README.md         # File ini
```

## Kontribusi

1. Fork repositori
2. Buat branch fitur (`git checkout -b feature/fitur-hebat`)
3. Commit perubahan Anda (`git commit -m 'Tambahkan fitur hebat'`)
4. Push ke branch (`git push origin feature/fitur-hebat`)
5. Buka Pull Request

## Lisensi

Proyek ini dilisensikan di bawah Lisensi MIT - lihat file [LICENSE](LICENSE) untuk detail.