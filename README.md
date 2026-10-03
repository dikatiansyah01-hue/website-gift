# 💖 Website Gift Romantis untuk Fazida Saila Rizqina

Website personal yang dibuat khusus untuk menyatakan perasaan dan mengajak Fazida menjadi pacar dengan tampilan elegan, modern, romantis, dan responsif (HP & Desktop).

---

## 📁 Struktur File & Folder

```
website gift/
│
├── index.html        # Struktur halaman utama (3 Slide / Section)
├── style.css         # Styling romantis, glassmorphism, responsive layout & animasi
├── script.js         # Logika navigasi slide, WhatsApp link, confetti, musik & efek
├── README.md         # Petunjuk penggunaan & kustomisasi
│
├── images/
│   ├── foto1.png     # Foto kenangan pertama
│   └── foto2.png     # Foto kenangan kedua
└── foto3.jpg         # (Opsional) Tempatkan foto ketiga di sini jika sudah ada
```

---

## 🚀 Cara Menjalankan Website

1. **Buka Langsung di Browser**:
   - Cukup klik dua kali (double click) file [index.html](file:///home/dika-agus-tiansyah/Documents/website%20gift/index.html) di browser favorit Anda (Google Chrome, Safari, Edge, Firefox, dll).
2. **Atau Menggunakan Live Server**:
   - Jika Anda menggunakan ekstensi Live Server di VS Code / editor: klik kanan pada `index.html` dan pilih **Open with Live Server**.

---

## ⚙️ Cara Mengubah Pengaturan (Kustomisasi)

Semua pengaturan sudah dirancang agar sangat mudah diubah di bagian paling atas file [script.js](file:///home/dika-agus-tiansyah/Documents/website%20gift/script.js):

### 1. Mengganti Nomor WhatsApp
Buka `script.js`, pada baris ke-10:
```javascript
const WHATSAPP_NUMBER = "6285198215250"; // Ganti dengan nomor WhatsApp Anda
```
*(Gunakan format internasional tanpa tanda `+` atau `0` di awal, contoh: `628xxxxxxxxxx`)*.

### 2. Mengubah Pesan Template WhatsApp
Buka `script.js`, pada baris ke-13:
```javascript
const WHATSAPP_MESSAGE_TEMPLATE = 
`Assalamu'alaikum ❤️

Aku sudah lihat website-nya...

Jawabanku: [MAU / NGGAK]

😊`;
```

### 3. Menambahkan Foto Ketiga (`foto3.jpg`)
- Cukup masukkan foto pilihan Anda ke dalam folder proyek ini dengan nama **`foto3.jpg`**.
- Jika `foto3.jpg` belum ada, website akan otomatis menampilkan placeholder elegan: *"Foto kita berikutnya? ❤️"*.

---

## ✨ Fitur Utama
- **Slide 1 — Pertanyaan**: Desain romantis dengan nama Fazida Saila Rizqina, tombol *MAU ❤️* (dengan confetti & animasi hati) dan tombol *NGGAK 🥺* (dengan animasi sedih sopan tanpa paksaan).
- **Slide 2 — Kenangan**: Gallery 3 foto berbingkai modern dengan efek zoom & preview modal, serta quote menyentuh.
- **Slide 3 — Kirim Pesan**: Desain amplop surat romantis dan tombol langsung ke WhatsApp.
- **Background Animasi**: Hati dan partikel berkilau melayang halus tanpa membebani performa HP.
- **Ambient Music Player**: Dilengkapi tombol pemutar melodi kotak musik romantis instan.
