# Balai Guru dan Tenaga Kependidikan (BGTK) Provinsi NTT - Website

Website resmi Balai Guru dan Tenaga Kependidikan Provinsi Nusa Tenggara Timur yang dikembangkan dengan teknologi modern untuk mendukung pengembangan dan pemberdayaan guru, tenaga kependidikan, dan pemangku kepentingan pendidikan.

## 🚀 Tentang Proyek

Website ini merupakan platform digital utama BGTK NTT yang menyediakan:

- **Informasi Profil Lembaga** - Sejarah, visi misi, struktur organisasi, dan tugas pokok fungsi
- **Portal Publikasi** - Berita terkini, pengumuman, dan dokumen yang dapat diunduh
- **PPID** - Informasi terkait keterbukaan informasi publik
- **Program Prioritas** - IKM, PPM, PPG, dan PKB
- **SSD (Soal Sering Ditanya)** - FAQ dan informasi layanan
- **ULT (Unit Layanan Terpadu)** - Informasi sarana dan prasarana layanan
- **ZI WBK** - Halaman Zona Integritas Wilayah Bebas Korupsi
- **Admin Panel** - Dashboard untuk manajemen konten website

## 📋 Teknologi yang Digunakan

### Framework & Libraries Utama

| Paket | Versi | Kegunaan |
|-------|-------|----------|
| **Next.js** | ^16.2.0 | React framework dengan App Router |
| **React** | 19.2.0 | UI library |
| **TypeScript** | ^5 | Type-safe JavaScript |
| **Tailwind CSS** | ^4 | Utility-first CSS framework |
| **Drizzle ORM** | ^0.45.1 | Type-safe ORM untuk database |
| **next-auth** | ^4.24.13 | Autentikasi |
| **Radix UI** | various | Headless accessible components |
| **Framer Motion** | ^12.23.25 | Animasi dan transisi |
| **TanStack Table** | ^8.21.3 | Headless data table |
| **Tiptap** | ^3.15.3 | Rich text editor |
| **Hono** | ^4.11.10 | Web framework untuk API routes |
| **Zod** | ^4.2.1 | Schema validation |
| **React Hook Form** | ^7.69.0 | Form management |
| **Embla Carousel** | ^8.6.0 | Carousel/slider |
| **Recharts** | ^2.15.4 | Chart dan grafik |
| **Sonner** | ^2.0.7 | Toast notifications |
| **Lucide React** | ^0.555.0 | Icon library |
| **date-fns** | ^4.1.0 | Utilitas tanggal |
| **bcrypt** | ^6.0.0 | Password hashing |

### Database & Storage

- **PostgreSQL** - Relational database utama
- **Drizzle ORM** - Type-safe query builder dan migrations
- **Prisma** - Database client (adapter pg)
- **Upstash Redis** - Caching dan penghitungan views/pengunjung
- **AWS S3 / Compatible Storage** - Penyimpanan gambar dan dokumen

### DevDependencies

| Paket | Versi | Kegunaan |
|-------|-------|----------|
| **Drizzle Kit** | ^0.31.9 | CLI migrations Drizzle |
| **Supabase** | ^2.78.1 | Tooling database Supabase |
| **ESLint** | ^10.0.0 | Linter kode |
| **Sass** | ^1.97.2 | CSS preprocessor |
| **tsx** | ^4.21.0 | TypeScript executor |

## 📁 Struktur Proyek

```
web-bgtk-ntt/
├── app/                                    # Next.js App Router
│   ├── globals.css                         # Global styles
│   ├── layout.tsx                          # Root layout
│   ├── not-found.tsx                       # Halaman 404
│   ├── robots.ts                           # SEO robots.txt
│   │
│   ├── (auth)/                             # Route group autentikasi
│   │   ├── layout.tsx
│   │   └── sign-in/
│   │       └── page.tsx                    # Halaman login
│   │
│   ├── (home)/                             # Route group halaman publik
│   │   ├── layout.tsx                      # Layout dengan navbar & footer
│   │   ├── page.tsx                        # Homepage
│   │   │
│   │   ├── ppid/                           # PPID - Keterbukaan Informasi Publik
│   │   │   ├── page.tsx
│   │   │   ├── laporan-kinerja/
│   │   │   │   └── page.tsx
│   │   │   ├── penghargaan/
│   │   │   ├── perjanjian-kinerja/
│   │   │   │   └── page.tsx
│   │   │   └── rencana-strategis/
│   │   │       └── page.tsx
│   │   │
│   │   ├── profil/                         # Halaman profil lembaga
│   │   │   ├── sambutan-kata/
│   │   │   │   └── page.tsx
│   │   │   ├── sejarah/
│   │   │   │   └── page.tsx
│   │   │   ├── struktur-organisasi/
│   │   │   │   └── page.tsx
│   │   │   ├── tupoksi/
│   │   │   │   └── page.tsx
│   │   │   └── visi-misi/
│   │   │       └── page.tsx
│   │   │
│   │   ├── program/                        # Program prioritas
│   │   │   ├── ikm/
│   │   │   │   └── page.tsx
│   │   │   ├── pkb/
│   │   │   ├── ppg/
│   │   │   └── ppm/
│   │   │       └── page.tsx
│   │   │
│   │   ├── publikasi/                      # Portal publikasi
│   │   │   ├── layout.tsx
│   │   │   ├── berita-terkini/
│   │   │   │   ├── loading.tsx
│   │   │   │   ├── page.tsx
│   │   │   │   └── detail/
│   │   │   │       └── [slug]/
│   │   │   │           ├── berita-sidebar.tsx
│   │   │   │           ├── image-preview-dialog.tsx
│   │   │   │           ├── loading.tsx
│   │   │   │           ├── opengraph-image.tsx
│   │   │   │           └── page.tsx
│   │   │   ├── dokumen/
│   │   │   │   ├── columns.tsx
│   │   │   │   └── page.tsx
│   │   │   └── pengumuman/
│   │   │       ├── page.tsx
│   │   │       └── detail/
│   │   │           └── [slug]/
│   │   │               ├── image-preview-dialog.tsx
│   │   │               ├── loading.tsx
│   │   │               ├── opengraph-image.tsx
│   │   │               └── page.tsx
│   │   │
│   │   ├── ssd/                            # Sistem Satu Data
│   │   │   ├── faq-accordion.tsx
│   │   │   └── page.tsx
│   │   │
│   │   ├── ult/                            # Unit Layanan Terpadu
│   │   │   └── sarana-prasarana/
│   │   │       ├── page.tsx
│   │   │       └── sarana-card.tsx
│   │   │
│   │   └── zi-wbk/                         # Zona Integritas WBK
│   │       └── page.tsx
│   │
│   ├── admin/                              # Panel admin (protected)
│   │   ├── layout.tsx
│   │   ├── page.tsx                        # Dashboard admin
│   │   ├── carousel/                       # Manajemen carousel/banner
│   │   │   ├── columns.tsx
│   │   │   ├── delete-foto-dialog.tsx
│   │   │   ├── foto-data-table.tsx
│   │   │   ├── page.tsx
│   │   │   ├── [id]/edit/
│   │   │   │   └── page.tsx
│   │   │   └── tambah/
│   │   │       └── page.tsx
│   │   ├── docs/                           # Manajemen dokumen
│   │   │   ├── columns.tsx
│   │   │   ├── delete-document-dialog.tsx
│   │   │   ├── edit-document-dialog.tsx
│   │   │   ├── page.tsx
│   │   │   └── upload/
│   │   │       └── page.tsx
│   │   ├── pengaturan-akun/                # Pengaturan akun pengguna
│   │   │   ├── edit-current-user-form.tsx
│   │   │   └── page.tsx
│   │   ├── pengumuman/                     # Manajemen pengumuman
│   │   │   ├── columns.tsx
│   │   │   └── page.tsx
│   │   ├── posts/                          # Manajemen berita / postingan
│   │   │   ├── columns.tsx
│   │   │   ├── delete-post-dialog.tsx
│   │   │   ├── page.tsx
│   │   │   ├── post-data-table.tsx
│   │   │   ├── [id]/edit/
│   │   │   │   ├── edit-post-client.tsx
│   │   │   │   ├── edit-post-form.tsx
│   │   │   │   └── page.tsx
│   │   │   └── buat/
│   │   │       └── page.tsx
│   │   └── users/                          # Manajemen pengguna
│   │       ├── columns.tsx
│   │       ├── delete-user-dialog.tsx
│   │       ├── opr-columns.tsx
│   │       ├── page.tsx
│   │       ├── [id]/edit/
│   │       │   └── page.tsx
│   │       └── buat/
│   │           └── page.tsx
│   │
│   └── api/                                # API Routes
│       ├── auth/
│       │   └── [...nextauth]/
│       │       └── route.ts                # NextAuth handler
│       ├── increment/
│       │   └── route.ts                    # Increment view counter
│       ├── stats/
│       │   └── route.ts                    # Statistik pengunjung
│       └── upload/
│           └── route.ts                    # Upload file handler
│
├── components/                             # Komponen React reusable
│   ├── ui/                                 # Shadcn/ui components
│   └── ...
├── hooks/                                  # Custom React hooks
├── lib/                                    # Utility & konfigurasi
├── public/                                 # Static assets
├── server.js                               # Custom server (untuk cPanel/VPS)
├── .env                                    # Environment variables (production)
├── .env.local                              # Environment variables (lokal)
├── components.json                         # Shadcn/ui config
├── drizzle.config.ts                       # Drizzle ORM config
├── next.config.ts                          # Next.js config
├── package.json                            # Dependencies & scripts
├── prisma.config.ts                        # Prisma config
└── tsconfig.json                           # TypeScript config
```

## 🗺️ Rute Halaman Publik

| Halaman | Route |
|---------|-------|
| Homepage | `/` |
| Sambutan Kata | `/profil/sambutan-kata` |
| Sejarah | `/profil/sejarah` |
| Visi & Misi | `/profil/visi-misi` |
| Struktur Organisasi | `/profil/struktur-organisasi` |
| Tugas Pokok & Fungsi | `/profil/tupoksi` |
| Berita Terkini | `/publikasi/berita-terkini` |
| Detail Berita | `/publikasi/berita-terkini/detail/[slug]` |
| Pengumuman | `/publikasi/pengumuman` |
| Detail Pengumuman | `/publikasi/pengumuman/detail/[slug]` |
| Dokumen | `/publikasi/dokumen` |
| PPID | `/ppid` |
| Laporan Kinerja | `/ppid/laporan-kinerja` |
| Perjanjian Kinerja | `/ppid/perjanjian-kinerja` |
| Rencana Strategis | `/ppid/rencana-strategis` |
| Penghargaan | `/ppid/penghargaan` |
| Program IKM | `/program/ikm` |
| Program PPM | `/program/ppm` |
| Program PPG | `/program/ppg` |
| Program PKB | `/program/pkb` |
| SSD / FAQ | `/ssd` |
| ULT Sarana Prasarana | `/ult/sarana-prasarana` |
| ZI WBK | `/zi-wbk` |
| Login Admin | `/sign-in` |

## 🔐 Rute Admin Panel

| Halaman | Route |
|---------|-------|
| Dashboard | `/admin` |
| Manajemen Postingan | `/admin/posts` |
| Buat Postingan | `/admin/posts/buat` |
| Edit Postingan | `/admin/posts/[id]/edit` |
| Manajemen Pengumuman | `/admin/pengumuman` |
| Manajemen Dokumen | `/admin/docs` |
| Upload Dokumen | `/admin/docs/upload` |
| Manajemen Carousel | `/admin/carousel` |
| Tambah Carousel | `/admin/carousel/tambah` |
| Edit Carousel | `/admin/carousel/[id]/edit` |
| Manajemen Pengguna | `/admin/users` |
| Buat Pengguna | `/admin/users/buat` |
| Edit Pengguna | `/admin/users/[id]/edit` |
| Pengaturan Akun | `/admin/pengaturan-akun` |

## 🛠️ Instalasi & Setup

### Prerequisites

- **Node.js 20+**
- **npm 9+**
- **Git**
- **PostgreSQL**

### 1. Clone Repository

```bash
git clone https://github.com/selestino-k/web-bgtk-ntt.git
cd web-bgtk-ntt
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Konfigurasi Environment Variables

Buat file `.env.local` untuk development lokal:

```env
# Database PostgreSQL
DATABASE_URL="postgresql://user:password@localhost:5432/bgtk_ntt"

# NextAuth
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# Upstash Redis (untuk view counter)
UPSTASH_REDIS_REST_URL="https://your-redis.upstash.io"
UPSTASH_REDIS_REST_TOKEN="your-token"

# S3 Storage (untuk upload file)
S3_ENDPOINT="https://your-s3-endpoint"
S3_ACCESS_KEY="your-access-key"
S3_SECRET_KEY="your-secret-key"
S3_BUCKET_NAME="your-bucket"
S3_REGION="your-region"
```

### 4. Setup Database

```bash
# Generate Drizzle migrations
npx drizzle-kit generate

# Jalankan migrations
npx drizzle-kit migrate

# Atau push schema langsung (development)
npx drizzle-kit push
```

### 5. Jalankan Development Server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

---

## 🖥️ Deployment di cPanel (Node.js App)

### Prerequisites cPanel

- cPanel dengan fitur **Node.js Selector** (CloudLinux + EasyApache)
- Node.js **20.x** atau lebih baru
- Akses ke **Terminal** atau **SSH**
- Database **PostgreSQL** sudah dikonfigurasi di cPanel

### Langkah-langkah Deploy

#### 1. Upload Source Code

Upload seluruh source code ke folder aplikasi di cPanel (misalnya `/home/username/web-bgtk-ntt`) melalui:
- **File Manager** cPanel, atau
- **Git Clone** via SSH terminal:

```bash
git clone https://github.com/selestino-k/web-bgtk-ntt.git /home/username/web-bgtk-ntt
```

#### 2. Buat Node.js App di cPanel

1. Buka **cPanel** → **Software** → **Setup Node.js App**
2. Klik **Create Application**
3. Isi konfigurasi:
   - **Node.js version**: `20.x` (atau terbaru)
   - **Application mode**: `Production`
   - **Application root**: `/home/username/web-bgtk-ntt`
   - **Application URL**: domain atau subdomain Anda
   - **Application startup file**: `server.js`
4. Klik **Create**

#### 3. Set Environment Variables

Masih di halaman Node.js App, tambahkan environment variables berikut di bagian **Environment Variables**:

```
NODE_ENV=production
DATABASE_URL=postgresql://user:password@localhost:5432/bgtk_ntt
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=https://yourdomain.com
UPSTASH_REDIS_REST_URL=https://your-redis.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-token
S3_ENDPOINT=https://your-s3-endpoint
S3_ACCESS_KEY=your-access-key
S3_SECRET_KEY=your-secret-key
S3_BUCKET_NAME=your-bucket
S3_REGION=your-region
```

#### 4. Install Dependencies via Terminal

Klik tombol **Enter to terminal** di halaman Node.js App, lalu jalankan:

```bash
# Aktifkan virtual environment Node.js cPanel
source /home/username/nodevenv/web-bgtk-ntt/20/bin/activate

# Masuk ke direktori aplikasi
cd /home/username/web-bgtk-ntt

# Install dependencies
npm install

# Jalankan database migrations
npx drizzle-kit migrate

# Build aplikasi Next.js
npm run build
```

#### 5. Jalankan Aplikasi

Kembali ke halaman **Setup Node.js App** di cPanel dan klik tombol **Run JS Script** atau **Restart** untuk menjalankan aplikasi.

Aplikasi akan berjalan menggunakan `server.js` sebagai entry point.

#### 6. Konfigurasi `.htaccess` (jika diperlukan)

Jika menggunakan subdomain atau folder, pastikan `.htaccess` mengarahkan traffic ke port Node.js:

```apache
RewriteEngine On
RewriteRule ^(.*)$ http://localhost:PORT/$1 [P,L]
```

> Ganti `PORT` dengan port yang ditetapkan cPanel untuk aplikasi Node.js Anda.

---

## 📝 Scripts Tersedia

```bash
# Development server
npm run dev

# Build production
npm run build

# Start production server (menggunakan server.js)
npm start

# Linting
npm run lint

# Drizzle - generate migrations
npx drizzle-kit generate

# Drizzle - jalankan migrations
npx drizzle-kit migrate

# Drizzle - push schema (development)
npx drizzle-kit push

# Drizzle Studio - GUI database
npx drizzle-kit studio
```

## 🎨 Fitur Utama

### 1. **Responsive Design**
- Mobile-first dengan Tailwind CSS v4
- Tampilan optimal di mobile, tablet, dan desktop

### 2. **Dark Mode**
- Toggle dark/light mode dengan `next-themes`
- Preferensi tersimpan di localStorage

### 3. **Rich Text Editor**
- Tiptap editor untuk pembuatan konten berita dan pengumuman di admin panel
- Mendukung gambar, highlight, list, heading, dan lainnya

### 4. **Animasi**
- Framer Motion untuk page transitions dan micro-interactions
- Scroll-triggered animations

### 5. **Content Management System (Admin Panel)**
- CRUD berita, pengumuman, dokumen, dan carousel
- Upload dan manajemen gambar/dokumen ke S3
- Manajemen pengguna dengan role-based access

### 6. **View Counter & Statistik**
- Upstash Redis untuk menghitung pengunjung dan views postingan
- Dashboard statistik di panel admin

### 7. **SEO & Open Graph**
- Metadata dinamis per halaman
- Open Graph image untuk berita dan pengumuman
- `robots.ts` untuk konfigurasi SEO

### 8. **Autentikasi**
- NextAuth.js dengan credentials provider
- Session management dan route protection untuk admin

## 📞 Hubungi Kami

**BGTK Provinsi NTT**

- 📍 Alamat: Jl. Perintis Kemerdekaan I, Kayu Putih, Kec. Oebobo, Kota Kupang, NTT
- 📧 Email: bgtkntt@kemendikdasmen.go.id
- 🌐 Website: [https://bgtkntt.kemendikdasmen.go.id](https://bgtkntt.kemendikdasmen.go.id)
- 📱 Media Sosial:
  - Facebook: [@balaigurupenggerakntt](https://www.facebook.com/balaigurupenggerakntt/)
  - Twitter/X: [@BGTK_NTT](https://twitter.com/BGTK_NTT)
  - Instagram: [@bgtkntt](https://www.instagram.com/bgtkntt/)
  - YouTube: [@bgtkntt](https://www.youtube.com/@bgtkntt/)
  - TikTok: [@bgtkntt](https://www.tiktok.com/@bgtkntt)

## 📄 Lisensi

GNU General Public License v3.0

---

**Dibuat dengan ❤️ oleh Tim Pengembang BGTK NTT**

**Repository:** [github.com/selestino-k/web-bgtk-ntt](https://github.com/selestino-k/web-bgtk-ntt)

**Terakhir Diperbarui:** Maret 2026
