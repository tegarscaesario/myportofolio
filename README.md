# 🌐 Tegar Scaesario — Portfolio

Portofolio web personal yang dibangun dengan React + Vite, menampilkan animasi interaktif, efek 3D Lanyard, dan desain modern.

---

## ✨ Fitur

- **3D Lanyard Card** — ID card fisika interaktif menggunakan `@react-three/rapier` (desktop only)
- **Mobile About Card** — Kartu profil animasi dengan orbiting dot & grayscale reveal (mobile fallback)
- **TextPressure** — Nama hero yang responsif terhadap gerakan mouse (variable font)
- **SplashCursor** — Efek fluid WebGL saat kursor bergerak
- **ScrollReveal** — Teks muncul dengan animasi blur saat di-scroll
- **ShinyText** — Teks heading dengan efek kilau animasi
- **LogoLoop** — Marquee skill logo yang berjalan otomatis
- **ProjectCarousel** — Tampilan proyek dalam bentuk carousel
- **ContactSection** — Form kontak terintegrasi EmailJS
- **LoadingScreen** — Layar loading animasi sebelum halaman utama muncul
- **Glassmorphism Navbar** — Navbar transparan dengan efek blur
- **TiltCard** — Kartu foto hero dengan efek tilt 3D
- **SEO Optimized** — Meta tags, sitemap, robots.txt, dan favicon

---

## 📁 Struktur Project

```
portfolio/
├── public/
│   ├── Profile.jpeg              ← Foto profil hero
│   ├── About.jpeg                ← Foto profil about section
│   ├── Project 1.png … 9.png    ← Screenshot proyek
│   ├── favicon.svg               ← Favicon
│   ├── robots.txt                ← SEO robots config
│   └── sitemap.xml               ← SEO sitemap
├── src/
│   ├── assets/
│   │   ├── card.glb              ← 3D model kartu untuk Lanyard
│   │   └── lanyard.png           ← Tekstur tali lanyard
│   ├── components/
│   │   ├── Background.jsx        ← Animated background (blob + wave)
│   │   ├── ContactSection.jsx    ← Form kontak dengan EmailJS
│   │   ├── Footer.jsx            ← Footer halaman
│   │   ├── Lanyard.jsx           ← 3D Lanyard card interaktif (desktop)
│   │   ├── LoadingScreen.jsx     ← Layar loading awal
│   │   ├── LogoLoop.jsx          ← Marquee logo skill
│   │   ├── Navbar.jsx            ← Navbar glassmorphism responsif
│   │   ├── ProjectCarousel.jsx   ← Carousel proyek
│   │   ├── ScrollReveal.jsx      ← Animasi teks saat scroll
│   │   ├── ShinyText.jsx         ← Teks dengan efek kilau
│   │   ├── SplashCursor.jsx      ← Fluid cursor WebGL
│   │   ├── TextPressure.jsx      ← Hero name interaktif
│   │   ├── TiltCard.jsx          ← Kartu foto dengan efek tilt 3D
│   │   └── WorkHero.jsx          ← Header section Work/Projects
│   ├── App.jsx                   ← Root component + semua section
│   ├── index.css                 ← Global styles + animasi
│   └── main.jsx                  ← Entry point
├── Dockerfile                    ← Multi-stage build: Vite → Nginx
├── Dockerfile.dev                ← Dev server dengan hot reload
├── docker-compose.yml            ← Orkestrasi container
├── nginx.conf                    ← Nginx config untuk SPA routing
├── vite.config.js
├── tailwind.config.js
└── package.json
```

---

## ⚡ Cara Menjalankan

### A. Local Development (tanpa Docker)

```bash
# 1. Install dependencies
npm install

# 2. Jalankan dev server
npm run dev

# Buka: http://localhost:5173
```

---

### B. Docker — Production Mode

```bash
# Build dan jalankan
docker-compose up --build

# Buka: http://localhost:3000
```

Untuk menghentikan:
```bash
docker-compose down
```

---

### C. Docker — Development Mode (Hot Reload)

```bash
docker run -it --rm \
  -p 5173:5173 \
  -v $(pwd):/app \
  -v /app/node_modules \
  -w /app \
  node:20-alpine \
  sh -c "npm install && npm run dev"

# Buka: http://localhost:5173
```

---

### D. Build Manual

```bash
# Build production
npm run build

# Preview hasil build
npm run preview
```

---

## 🎨 Kustomisasi

### Ganti foto profil
Ganti file `public/Profile.jpeg` (hero) dan `public/About.jpeg` (about section) dengan foto kamu sendiri (nama file harus sama).

### Ganti nama & deskripsi
Buka `src/App.jsx`, cari bagian:
```jsx
<TextPressure text="Tegar" ... />
<TextPressure text="Scaesario" ... />
```
Dan ubah teks `fullText` untuk mengganti deskripsi di hero section.

### Tambah/ubah proyek
Buka `src/components/ProjectCarousel.jsx` dan tambahkan proyek baru pada array data (pastikan menyertakan field `src`, `title`, `description`, dan `tech`). Screenshot proyek disimpan di `public/` dengan format `Project X.png`.

### Ubah skill logo
Di `src/App.jsx`, edit array `skillLogosTop` dan `skillLogosBottom` dengan ikon dan link yang sesuai.

### Konfigurasi EmailJS (form kontak)
Buka `src/components/ContactSection.jsx`, isi:
```js
emailjs.send("SERVICE_ID", "TEMPLATE_ID", payload, "PUBLIC_KEY")
```
Daftar di [emailjs.com](https://www.emailjs.com) untuk mendapatkan credential-nya.

### Ubah warna brand
Di `tailwind.config.js`:
```js
colors: {
  brand: {
    gold:       '#D6BFA3',
    'gold-dark': '#B89B7A',
    cyan:       '#7FDBFF',
  }
}
```

---

## 🐳 Docker Tips

| Perintah | Kegunaan |
|----------|----------|
| `docker-compose up --build` | Build + jalankan |
| `docker-compose up -d` | Jalankan di background |
| `docker-compose down` | Hentikan & hapus container |
| `docker-compose logs -f` | Lihat log real-time |
| `docker ps` | Lihat container yang berjalan |

---

## 🛠 Tech Stack

| Teknologi | Kegunaan |
|-----------|----------|
| **React 18** | UI library |
| **Vite 5** | Build tool & dev server |
| **Tailwind CSS 3** | Utility-first CSS |
| **Three.js + R3F** | Rendering 3D (Lanyard card) |
| **@react-three/rapier** | Fisika 3D (tali lanyard) |
| **@react-three/drei** | Helper 3D (GLTF, texture, dll) |
| **meshline** | Render tali/rope di WebGL |
| **GSAP** | Animasi timeline |
| **Motion (Framer)** | Animasi deklaratif React |
| **EmailJS** | Kirim email dari form kontak |
| **Lucide React** | Icon library |
| **React Icons** | Icon tech stack (SI, FA) |
| **Nginx** | Production web server (Docker) |
| **Docker** | Containerization |

---

## 🌍 Deployment

Project ini di-deploy melalui **Vercel** dengan auto-deploy dari branch `main`.

Live: [tegarscaesario10.vercel.app](https://tegarscaesario10.vercel.app)

---

## 📄 Lisensi

Proyek ini dibuat untuk keperluan portofolio pribadi oleh **Tegar Scaesario**.  
Bebas dijadikan referensi, namun mohon tidak diklaim sebagai milik sendiri.
