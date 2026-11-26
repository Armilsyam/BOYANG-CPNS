# BOYANG-CPNS — Dashboard Persiapan CPNS 2026 (QRIS Rp 10.000)

Aplikasi web **Next.js 16 + Neon Postgres + Better Auth + Midtrans Core API QRIS** siap deploy ke **GitHub & Vercel**.

## Fitur Utama

1. **Landing & Preview Publik (`/`)**
   - Informasi paket akses sekali bayar **Rp 10.000 via QRIS**.
   - Cuplikan direktori 304 instansi formasi dan tabel acuan Passing Grade SKD BKN.
2. **Autentikasi Akun (`/masuk`)**
   - Daftar & login mudah memakai Email + Kata Sandi melalui **Better Auth** dengan penyimpanan sesi di **Neon Postgres**.
3. **Pembayaran Otomatis QRIS Rp 10.000 (`/pembayaran`)**
   - Integrasi **Midtrans Core API (`payment_type: "qris"`)** menghasilkan QRIS dinamis tepat Rp 10.000.
   - Verifikasi otomatis via **Webhook SHA-512** (`/api/payments/midtrans/webhook`) dan polling status (`/api/payments/qris/status`).
   - Setelah lunas, pengguna memperoleh **Kode Akses Member (`BYG-XXXX-XXXX`)** dan akun langsung terbuka selamanya.
4. **Dashboard Member Terproteksi (`/dashboard`)**
   - **Explorer 304 Formasi PDF (`/dashboard/formasi`)**: 67 instansi Pusat, 26 Provinsi, 166 Kabupaten, dan 45 Kota dengan pencarian instan, alias nama, indeks A–Z, salin tautan PDF, dan bookmark favorit ke database. Dilengkapi tautan Folder PDF Instansi CPNS 2026.
   - **Gudang Materi SKD & PDF (`/dashboard/materi`)**: Tautan PDF Panduan SSCASN, Folder Instansi 2026, FGD Kemendikdasmen Guru ASN 2026, portal resmi BKN/KemenPAN-RB/BAN-PT, serta 7 modul ringkasan TWK, TIU, dan TKP.
   - **Simulasi Tryout CAT (`/dashboard/tryout`)**: 30 soal latihan CAT (TWK, TIU, TKP) ber-timer dengan bobot resmi BKN, proyeksi Passing Grade, pembahasan lengkap per nomor, dan riwayat skor tersimpan di database.
   - **Panduan SSCASN & Berita CPNS 2026 (`/dashboard/panduan`)**: Checklist 7 langkah pemberkasan tersimpan di database, ringkasan info kebijakan CPNS 2026, serta tombol WhatsApp Admin & Grup Belajar BOYANG-CPNS (via environment variable).

---

## Struktur Proyek

```text
src/
├── app/
│   ├── api/
│   │   ├── auth/[...all]/route.ts          # Better Auth handler
│   │   ├── dashboard/{bookmarks,checklist,tryout}/route.ts
│   │   ├── health/route.ts
│   │   └── payments/
│   │       ├── midtrans/webhook/route.ts   # Verifikasi SHA-512 Midtrans
│   │       └── qris/{create,status}/route.ts
│   ├── dashboard/                          # Dilindungi proxy + cek hasPaidAccess
│   ├── masuk/page.tsx
│   ├── pembayaran/page.tsx
│   └── page.tsx
├── components/
├── data/
│   ├── curriculum.ts                       # Modul belajar TWK, TIU, TKP
│   ├── formasi.ts                          # 304 data instansi PDF
│   ├── resources.ts                        # Checklist, berita, tautan resmi
│   └── tryout.ts                           # 30 soal CAT + pembahasan
├── db/
│   ├── index.ts                            # Lazy Neon Postgres client
│   └── schema.ts                           # Drizzle ORM schema
├── lib/
│   ├── auth.ts / auth-client.ts / session.ts
│   ├── midtrans.ts                         # Core API QRIS + SHA-512
│   └── tryout-scoring.ts
└── proxy.ts                                # Next.js 16 route guard
vercel.ts                                   # Vercel configuration (@vercel/config)
```

---

## Cara Menjalankan Secara Lokal

1. Salin `.env.example` menjadi `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
2. Isi variabel wajib di `.env.local`:
   - `DATABASE_URL` (connection string Neon Postgres)
   - `BETTER_AUTH_SECRET` (string acak min. 32 karakter)
   - `MIDTRANS_SERVER_KEY` & `MIDTRANS_CLIENT_KEY` (dari Midtrans Dashboard)
   - `MIDTRANS_IS_PRODUCTION=false` (ubah ke `true` saat live)
3. Dorong skema database ke Neon:
   ```bash
   npm run db:push
   ```
4. Jalankan server pengembangan:
   ```bash
   npm run dev
   ```

---

## Cara Deploy ke GitHub & Vercel

1. **Login CLI & Push ke GitHub**
   ```bash
   gh auth login
   gh repo create boyang-cpns --private --source=. --remote=origin --push
   ```
2. **Hubungkan Proyek & Provision Neon Postgres via Vercel Marketplace**
   ```bash
   npx vercel login
   npx vercel link
   npx vercel integration add neon
   npx vercel env pull .env.local --yes
   npm run db:push
   ```
3. **Set Environment Variables Tambahan di Vercel**
   Tambahkan lewat `npx vercel env add` atau Vercel Dashboard:
   - `BETTER_AUTH_SECRET`
   - `BETTER_AUTH_URL` (isi dengan domain produksi Anda, mis. `https://boyang-cpns.vercel.app`)
   - `NEXT_PUBLIC_APP_URL`
   - `MIDTRANS_SERVER_KEY`
   - `MIDTRANS_CLIENT_KEY`
   - `MIDTRANS_IS_PRODUCTION` (`false` untuk Sandbox / `true` untuk Live)
   - Opsional: `NEXT_PUBLIC_ADMIN_WHATSAPP` dan `NEXT_PUBLIC_COMMUNITY_WA_URL`
4. **Deploy ke Production**
   ```bash
   npx vercel --prod
   ```
5. **Atur Webhook di Midtrans Dashboard**
   Masuk ke **Midtrans Dashboard → Settings → Payment → Notification URL**, lalu isi:
   ```text
   https://<domain-vercel-anda>/api/payments/midtrans/webhook
   ```
   Pastikan metode pembayaran **QRIS** sudah aktif di akun Midtrans Anda.

---

## Verifikasi Kode

```bash
npm run typecheck
npm run lint
npm test
npm run build
```
