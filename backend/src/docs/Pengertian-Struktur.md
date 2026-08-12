# Dokumentasi struktur `src` — Backend

File ini menjelaskan isi folder `backend/src` dan peran tiap folder/file utama.

Tujuan: membantu developer baru memahami arsitektur sederhana proyek backend.

## Struktur singkat

- `index.ts` — Entry point aplikasi. Menginisialisasi server Elysia, middleware (JWT, swagger), dan mount route.
- `controllers/` — Menangani HTTP context (request/response). Memanggil `services` untuk logika bisnis.
  - `auth.ts` — Endpoint register/login; sekarang mendelegasikan logika ke `services/authService.ts`.
- `routes/` — Definisi route grup untuk fitur tertentu.
  - `auth.ts` — Mendaftarkan route `/auth/register` dan `/auth/login` serta schema body (validation).
- `services/` — Lapisan logika bisnis (business logic). Direkomendasikan untuk menaruh semua aturan domain, hashing password, pembuatan profil, dll.
  - `authService.ts` — Fungsi `registerUser` dan `authenticateUser` yang berinteraksi langsung dengan `prisma`.
- `middlewares/` — Middleware aplikasi (mis. otentikasi, autorisasi).
  - `authMiddleware.ts` — Menyediakan derive user dari JWT, helper `requireAuth` dan `requireRole`.
- `prisma/` — Klien Prisma dan konfigurasi akses database.
  - `client.ts` — Inisialisasi `PrismaClient` (menggunakan adapter MariaDB) dan export default.

## Penjelasan setiap bagian

- Entry point (`index.ts`)
  - Men-setup Elysia, swagger (dokumentasi), JWT plugin.
  - Mount route dengan prefix `/api`.

- Controllers
  - Tanggung jawab: parsing body dari `context`, menetapkan `set.status` untuk error, dan mengembalikan response.
  - Jangan masukkan akses DB langsung di controller jika memungkinkan; letakkan di `services`.

- Services
  - Tanggung jawab: semua logika bisnis (validasi tingkat domain, transform data, hash password, create profile, interaksi `prisma`).
  - Membuat service memudahkan unit test karena bisa diuji tanpa context HTTP.

- Middlewares
  - Menangani otentikasi JWT dan menyediakan helper untuk proteksi route.

- Prisma / DB
  - `prisma/client.ts` berisi konfigurasi koneksi dan export `prisma` yang bisa dipakai service.
  - Schema prisma ada di `prisma/schema.prisma` (folder root `backend/prisma`).

## Environment variables penting

- `DATABASE_URL` — connection string ke MariaDB/MySQL.
- `JWT_SECRET` — secret untuk menandatangani token JWT.

Contoh `.env` minimal di folder `backend`:

```
DATABASE_URL="mysql://user:pass@localhost:3306/ems"
JWT_SECRET="isi_rahasia_anda"
```

## Perintah penting

- Install dependency dan jalankan dev server (menggunakan Bun):

```bash
cd backend
bun install
bun run dev
```

- Prisma:

```bash
cd backend
# generate prisma client
bun prisma generate

# buat migration (jika perlu)
bun prisma migrate dev --name init
```

Jika `bun prisma` tidak tersedia, gunakan `npx prisma` atau `pnpm` sesuai toolchain lokal.

## Best practices singkat

- Pisahkan `controllers` (HTTP) dan `services` (logika bisnis).
- Tulis unit test untuk `services` agar logika domain terjaga.
- Hindari menyimpan credential di repo — pakai `.env` atau secret manager.

Jika kamu mau, saya bisa:

- menambahkan file README yang sama di root `backend` atau
- membuat template untuk unit test `services/authService.test.ts`.
