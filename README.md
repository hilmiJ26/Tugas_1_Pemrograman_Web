# TUGAS 1 - Sistem Informasi Bahan Ajar Universitas Terbuka

Aplikasi berbasis web untuk **Sistem Informasi Bahan Ajar Universitas Terbuka (SITTA UT)**. Aplikasi ini dirancang untuk memudahkan mahasiswa dan pengelola dalam memantau stok bahan ajar, melacak status pengiriman (*tracking* Delivery Order), serta melihat histori transaksi dan laporan.

---

## 🛠️ Fitur Utama

1. **Dashboard Utama (`dashboard.html`)**
   - **Sapaan Pengguna**: Menampilkan sapaan personal sesuai pengguna yang sedang login.
   - **Navigasi Kartu Menu**: Access cepat menuju berbagai modul sistem:
     - Informasi Bahan Ajar (Stok)
     - Tracking Pengiriman
     - Laporan (dengan *dropdown* submenu interaktif)
     - Histori Transaksi Bahan Ajar

2. **Tracking Pengiriman (`tracking.html`)**
   - **Pencarian Delivery Order (DO)**: Memungkinkan pengguna memasukkan Nomor DO untuk melihat status pengiriman.
   - **Status Progress Visual**: *Progress bar* dan langkah-langkah status pengiriman secara visual (Diterima $\rightarrow$ Dalam Pengiriman $\rightarrow$ Dikirim $\rightarrow$ Selesai).
   - **Informasi Rinci Pengiriman**: Tabel detail berisi data penerima, ekspedisi, tanggal kirim, kode paket, dan total pembayaran.
   - **Timeline Riwayat Perjalanan**: Catatan riwayat *tracking* logistik berbasis *timeline*.

---

## 📂 Struktur Direktori Proyek

```text
├── assets/
│   └── ut.png            # Logo Resmi Universitas Terbuka
├── css/
│   └── style.css         # File Styling Utama (Dashboard & Tracking)
├── js/
│   ├── data.js           # File Data Dummy (Data DO, Stok, User)
│   └── script.js         # Logika Interaktivitas Web
├── dashboard.html        # Halaman Dashboard Utama
├── tracking.html         # Halaman Tracking Pengiriman
└── README.md             # Dokumentasi Proyek
```

---

## 🚀 Teknologi yang Digunakan

- **HTML5**: Struktur halaman web semantik dan *accessible*.
- **CSS3**: Layouting menggunakan Modern CSS (Flexbox & Grid), *custom styling*, serta *responsive design* untuk berbagai ukuran layar.
- **JavaScript (Vanilla JS)**: Pengolahan interaktivitas *DOM manipulation*, pencarian data DO, dan penanganan submenu interaktif.

---

## 💻 Cara Menjalankan Proyek

1. **Clone atau Unduh Repository**:
   Unduh file proyek ke komputer lokal.

2. **Buka File HTML**:
   - Untuk membuka login `index.html` langsung dari windows exploler di browser (Chrome, Edge, Firefox, dll).
   - Untuk melihat tampilan dashboard, buka file `dashboard.html` langsung di peramban web (*browser*) favorit (Chrome, Edge, Firefox, dll.).
   - Untuk mengakses modul tracking pengiriman, Anda bisa membuka `tracking.html` secara langsung atau melalui navigasi dari dashboard.

---

## 📝 Catatan Pengembangan & UI/UX Fixes

- **Penyesuaian Tombol Pencarian**: Form tracking menggunakan layout CSS Grid dengan penyelarasan vertikal (`align-items: end`) sehingga tombol "Cari" sejajar pas dengan kolom input nomor DO.
- **Perbaikan Submenu Laporan**: Ikon panah pada kartu menu Laporan menggunakan transformasi vertikal khusus (`transform: translateY(...)`) agar posisinya simetris di tengah-tengah tinggi tombol secara visual.

---
*Tugas 1 - Pemrograman Berbasis Web*
