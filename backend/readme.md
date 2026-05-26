# Lokaras SIG WebApp - Backend

Selamat datang di dokumentasi backend untuk **Lokaras SIG (Sistem Informasi Geografis) WebApp**. Repositori ini menyediakan REST API dan layanan data yang dibutuhkan untuk mendukung frontend aplikasi pemetaan.

## Teknologi

- **Node.js** - Runtime environment
- **NPM** - Package manager

## Prasyarat

Pastikan Anda sudah menginstal alat-alat berikut:

- [Node.js](https://nodejs.org/)
- [NPM](https://www.npmjs.com/)

## Instalasi & Persiapan

1. Buka terminal dan arahkan ke folder `backend`.
2. Install semua dependensi yang dibutuhkan:
   ```bash
   npm install
   ```

## Struktur Direktori

Berikut adalah penjelasan struktur folder dan file utama pada proyek backend ini:

```text
backend/
├── config/       # File konfigurasi aplikasi (koneksi database, dll)
├── controllers/  # Berisi fungsi-fungsi pengontrol (logika utama tiap endpoint)
├── middlewares/  # Fungsi penengah (seperti autentikasi, error handling)
├── routes/       # Definisi endpoint (URL API) yang menghubungkan ke controller
├── services/     # Logika untuk interaksi database (query/akses data)
├── utils/        # Fungsi-fungsi utilitas atau helper yang bisa dipakai berulang
├── validations/  # Skema validasi untuk data request (body, parameter)
├── index.js      # Entry point / file utama aplikasi server
├── .env          # Variabel environment (rahasia, tidak di-commit dan disimpan secara lokal)
└── package.json  # Metadata proyek dan daftar dependensi
```

## Menjalankan Server

Untuk menjalankan API Server dalam mode _development_ (dilengkapi dengan _live-reload_), gunakan perintah:

```bash
npm run dev
```

## Evaluasi & Format

Perintah tambahan yang tersedia untuk menjaga kebersihan kode Anda:

- **Linting:** Memeriksa error/masalah gaya penulisan kode.
  ```bash
  npm run lint
  ```
- **Formatting:** Merapikan indentasi secara otomatis.
  ```bash
  npm run format
  ```

---

_Dikembangkan untuk Lokaras SIG WebApp._
