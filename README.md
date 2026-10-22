# RIZZY — Presentasi & Demo Pemesanan

Situs presentasi statis untuk konsep **RIZZY — Chicken Katsu + Es Kelapa**
dengan alur pemesanan dan pembayaran yang **sepenuhnya disimulasikan**.

> **DEMO ONLY — Simulasi presentasi. Tidak menerima pesanan atau pembayaran sungguhan.**

Tidak ada backend, database, autentikasi, payment gateway, analytics, API eksternal,
penyimpanan permanen, atau transaksi nyata di proyek ini.

![Landing RIZZY pada 1440 px](docs/screenshots/landing-1440.webp)

## Stack

- React 19 + TypeScript
- Vite 8 dengan `base: './'` untuk GitHub Pages
- Tailwind CSS 4 (token di `src/styles/globals.css`)
- Motion for React
- Fontsource: Bricolage Grotesque + Plus Jakarta Sans (self-hosted)
- Vitest + Testing Library
- Playwright + axe-core

## Menjalankan

```bash
npm install
npm run dev          # http://localhost:5173
npm run build        # typecheck + production build ke dist/
npm run preview      # menyajikan dist/
```

## Rute

Routing memakai hash agar tidak memerlukan rewrite server.

| Hash | Halaman |
| --- | --- |
| `#/` | Landing / presentasi brand |
| `#/order` | Pilih paket dan jumlah (demo) |
| `#/checkout` | Ringkasan pesanan (demo) |
| `#/payment` | QRIS/USDT simulasi + status |
| hash lain | Halaman tidak ditemukan |

Refresh atau membuka tautan langsung ke `#/checkout` dan `#/payment` **kehilangan
pesanan** secara sengaja karena state hanya hidup di memori. Halaman akan menampilkan
empty state yang aman, bukan error.

## Alur simulasi

```
idle → awaiting → submitted → verified → processing → completed
                     ├→ underpaid ─┐
                     └→ overpaid ──┴→ submitted (ulangi pembayaran)
apa pun → idle (Reset demo)
```

- Status tidak pernah berubah otomatis dan tidak acak.
- `underpaid`/`overpaid` menahan pesanan dan menampilkan selisih simulasi.
- `verified` menjelaskan bahwa sistem nyata memerlukan verifikasi admin.
- Panel kontrol di halaman pembayaran adalah kontrol presenter, bukan admin.
- Tombol **Reset demo** menghapus pilihan di memori dan kembali ke `#/order`.

QRIS dan USDT hanya ilustrasi lokal: tidak ada payload, alamat wallet, jaringan,
merchant, atau kurs real-time. Nilai USDT memakai kurs contoh yang bisa diubah di
`src/config/demo-payment.ts`.

## Konfigurasi

| File | Isi |
| --- | --- |
| `src/config/demo-catalog.ts` | Nama paket, isi, dan **harga contoh** |
| `src/config/demo-payment.ts` | Metode, kurs USDT ilustrasi, nominal kurang/lebih |
| `src/config/site.ts` | Nama, tagline, teks notice demo, navigasi |
| `src/content/landing.ts` | Seluruh copy landing |
| `src/content/demo-status.ts` | Copy status dan tombol simulasi |
| `src/lib/pricing.ts` | Perhitungan subtotal/total murni |
| `src/lib/demo-machine.ts` | State machine deterministik |

Mengganti harga atau paket resmi nanti cukup dilakukan di catalog; jangan lupa
menghapus label “HARGA CONTOH” setelah harga disetujui.

## Aset

- Asli yang diunggah tetap utuh di `assets-upload/` (tidak diubah).
- Turunan web ada di `public/assets/`:
  - `brand/logo-full`, `logo-wordmark` (PNG + WebP), monogram, favicon, OG image
  - `product/katsu.jpg` + `katsu-900.jpg` (foto produk asli, crop 4:5)
  - `team/team.jpg` (foto tim, crop lebar)
- Foto produk dipakai satu kali sebagai bukti visual; bukan hero full-bleed.
- Tidak ada foto stok atau gambar makanan hasil AI.

## Verifikasi terakhir

Lingkungan: Node 24, Chromium headless, preview produksi lokal, 22 Oktober 2026.

| Pemeriksaan | Hasil |
| --- | --- |
| `npm run typecheck` | lulus |
| `npm run lint` | lulus, 0 error |
| `npm test` | 29 tes lulus (5 file) |
| `npm run test:e2e` | 44 lulus, 4 dilewati (tes khusus mobile pada project tablet/desktop) |
| axe-core (landing, order, checkout, payment, submitted) | 0 pelanggaran serious/critical |
| `npm run verify:pages` | **PASSED** dari subpath `/rizzy/` |
| Lighthouse mobile | Performance **91–94** (run bervariasi), Accessibility **100**, Best Practices **100**, SEO **100** |
| Lighthouse desktop | Performance **100**, Accessibility **100**, Best Practices **100**, SEO **100** |
| Build | JS ±132 kB gzip, CSS ±12,8 kB gzip |

Lighthouse dijalankan pada landing page. Skor dapat berbeda tergantung perangkat,
jaringan, dan versi Lighthouse. E2E juga memeriksa:

- tidak ada request eksternal dan tidak ada localStorage/sessionStorage/cookie;
- QR tidak memuat pola alamat wallet atau payload pembayaran;
- tidak ada horizontal overflow pada 375/768/1440 px;
- menu mobile bisa dibuka, ditutup dengan Escape, dan mengembalikan fokus;
- refresh/deep-link aman.

## GitHub Pages

Workflow siap di `.github/workflows/deploy.yml`, tetapi **belum pernah dijalankan,
belum di-push, dan belum dideploy**. Untuk mengaktifkan:

1. Push repo ke GitHub.
2. Buka **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Push ke branch `main` atau jalankan workflow manual.

`base: './'` membuat build bekerja di root maupun subpath repo tanpa mengubah konfigurasi.
`public/.nojekyll` mencegah pemrosesan Jekyll.

Satu catatan: `og:image` masih memakai path relatif karena domain final belum diketahui.
Setelah domain/repo final ada, ganti dengan URL absolut agar preview sosial media bekerja.

## Dokumentasi

- [PRD](docs/PRD.md)
- [Sitemap & flow](docs/SITEMAP.md)
- [Design system](docs/DESIGN_SYSTEM.md)
- [Implementation plan](docs/IMPLEMENTATION_PLAN.md)
- [Open questions & placeholders](docs/OPEN_QUESTIONS.md)
- [Verification report](docs/VERIFICATION.md)

## Screenshot

| Order di 375 px | Pembayaran di 1440 px |
| --- | --- |
| ![Order mobile](docs/screenshots/order-375.webp) | ![Pembayaran desktop](docs/screenshots/payment-1440.webp) |

## Batasan yang disengaja

- Harga, paket, dan isi paket adalah contoh; harga resmi belum ditetapkan.
- Logo yang tersedia hanya raster (PNG); belum ada SVG/AI/EPS.
- Hanya ada satu foto produk dan satu foto tim.
- Tidak ada data kontak, sosial media, alamat, testimoni, atau penghargaan yang dibuat-buat.
- Keranjang/ pesanan hilang saat refresh.
- QR tidak berfungsi dan USDT tidak memiliki alamat atau jaringan.
