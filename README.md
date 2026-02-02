# Balai Guru dan Tenaga Kependidikan (BGTK) Provinsi NTT - Website

Website resmi Balai Guru dan Tenaga Kependidikan Provinsi Nusa Tenggara Timur yang dikembangkan dengan teknologi modern untuk mendukung pengembangan dan pemberdayaan guru, tenaga kependidikan, dan pemangku kepentingan pendidikan.

## 🚀 Tentang Proyek

Website ini merupakan platform digital utama BGTK NTT yang menyediakan:

- **Informasi Profil Lembaga** - Sejarah, visi misi, struktur organisasi, dan tugas pokok fungsi
- **Portal Publikasi** - Berita terkini, pengumuman, peraturan, dan dokumen yang dapat diunduh
- **Sistem Pelayanan** - ULT (Unit Layanan Terpadu), SAKIP, dan akses aplikasi terkait
- **Program Prioritas** - Informasi tentang program-program unggulan BGTK NTT
- **Admin Panel** - Dashboard untuk manajemen konten website

## 📋 Teknologi yang Digunakan

### Framework & Libraries Utama

- **Next.js 15+** - React framework untuk production-ready applications dengan App Router
- **TypeScript** - Type-safe JavaScript untuk development yang lebih aman
- **Tailwind CSS** - Utility-first CSS framework untuk styling modern
- **Prisma** - Next-generation ORM untuk database management
- **Radix UI** - Unstyled, accessible component library
- **Framer Motion** - Animation library untuk smooth transitions dan interaksi
- **React Table** - Headless table library untuk data tables yang powerful

### Development Tools

- **ESLint** - Code quality dan style checker
- **PostCSS** - CSS processing dan transformasi

### Database & Backend

- **Prisma ORM** - Type-safe database client
- **PostgreSQL** - Relational database (konfigurasi ada di prisma.config.ts)
- **Supabase** - Hosting online database PostgreSQL
- **AWS S3 Storage** - Bucket penyimpanan gambar thumbnail postingan dan unggahan dokumen
- **Redis** - Database vector untuk caching (digunakan untuk menghitung jumlah pengunjung dan pembaca postingan)
- **Upstash** - Hosting online database Redis


## 📁 Struktur Proyek

```
web-bgtk-ntt/
├── app/                          # Next.js App Router
│   ├── (home)/                   # Home layout group
│   │   ├── page.tsx              # Homepage
│   │   ├── profil/               # Halaman profil
│   │   │   ├── sambutan-kata/
│   │   │   ├── sejarah/
│   │   │   ├── struktur-organisasi/
│   │   │   ├── tupoksi/
│   │   │   └── visi-misi/
│   │   ├── publikasi/            # Halaman publikasi
│   │   │   ├── berita-terkini/
│   │   │   ├── pengumuman/
│   │   │   ├── dokumen/
│   │   │   └── siaran-pers/
│   │   ├── lainnya/              # Halaman lainnya
│   │   │   └── faq/
│   │   ├── sakip/                # Halaman SAKIP
│   │   │   ├── laporan-kinerja/
│   │   │   ├── perjanjian-kinerja/
│   │   │   ├── rencana-strategis/
│   │   │   └── penghargaan/
│   │   ├── program/               # Halaman Program Prioritas
│   │   │   ├── ikm/
│   │   │   ├── pkb/
│   │   │   ├── ppg/
│   │   │   └── ppm/
│   │   └── layout.tsx            # Layout wrapper untuk home
│   ├── api/                      # API routes
│   ├── admin/                    # Admin panel & dashboard
│   ├── layout.tsx                # Root layout
│   ├── globals.css               # Global styles
│   └── not-found.tsx             # 404 page
├── components/                   # Komponen React yang dapat digunakan ulang
│   ├── ui/                       # Shadcn/ui components
│   │   ├── card.tsx
│   │   ├── button.tsx
│   │   ├── dialog.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── navigation-menu.tsx
│   │   ├── sheet.tsx
│   │   ├── table.tsx
│   │   └── ...
│   ├── motion/                   # Animation components
│   │   ├── presence-motion.tsx
│   │   └── program-card-hover-motion.tsx
│   ├── navbar.tsx                # Navigation bar
│   ├── footer.tsx                # Footer component
│   ├── nav-menu.tsx              # Desktop navigation menu
│   ├── nav-dropdown.tsx          # Dropdown menus
│   ├── nav-sheet.tsx             # Mobile navigation sheet
│   ├── dark-switch.tsx           # Dark mode toggle
│   ├── news-card.tsx             # News card component
│   ├── news-carousel.tsx         # News carousel
│   ├── mobile-news-carousel.tsx  # Mobile news carousel
│   ├── pengumuman-card.tsx       # Announcement cards
│   └── program-card.tsx          # Program cards
├── hooks/                        # Custom React hooks
│   └── use-mobile.tsx            # Mobile detection hook
├── lib/                          # Utility functions & configurations
│   └── utils.ts                  # Helper functions
├── prisma/                       # Prisma ORM setup
│   ├── schema.prisma             # Database schema
│   └── migrations/               # Database migrations
├── public/                       # Static assets
│   ├── images/                   # Image files
│   ├── logo/                     # Logo files
│   └── ...
├── styles/                       # Additional style files
├── utils/                        # Utility functions
│   └── scroll.ts                 # Scroll utilities
├── .env                          # Environment variables (production)
├── .env.local                    # Environment variables (local development)
├── .gitignore                    # Git ignore rules
├── components.json               # Shadcn/ui configuration
├── eslint.config.mjs             # ESLint configuration
├── next.config.ts                # Next.js configuration
├── next-env.d.ts                 # Next.js TypeScript declarations
├── package.json                  # Project dependencies & scripts
├── postcss.config.mjs            # PostCSS configuration
├── prisma.config.ts              # Prisma configuration
├── tailwind.config.ts            # Tailwind CSS configuration
└── tsconfig.json                 # TypeScript configuration
```

## 🛠️ Instalasi & Setup

### Prerequisites

- **Node.js 18+** atau npm 9+
- **Git**
- **PostgreSQL** atau **MySQL** (untuk database)

### Langkah-langkah Instalasi

1. **Clone repository**

```bash
git clone https://github.com/selestino-k/web-bgtk-ntt.git
cd web-bgtk-ntt
```

2. **Install dependencies**

```bash
npm install
```

3. **Konfigurasi environment variables**

Buat file `.env.local` di root folder dan tambahkan konfigurasi berikut:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/bgtk_ntt"

# Next.js
NEXT_PUBLIC_API_URL="http://localhost:3000"

# Tambahkan variabel lain sesuai kebutuhan
```

4. **Setup Database dengan Prisma**

```bash
# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev

# (Opsional) Seed database
npx prisma db seed
```

5. **Run development server**

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser untuk melihat hasilnya.

## 📝 Scripts Tersedia

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Linting
npm run lint

# Format code dengan ESLint
npm run lint:fix

# Prisma Studio (Database GUI)
npx prisma studio

# Generate Prisma Client
npx prisma generate

# Run database migrations
npx prisma migrate dev
```

## 🎨 Fitur Utama

### 1. **Responsive Design**
- Mobile-first approach dengan Tailwind CSS
- Breakpoints yang optimal untuk mobile, tablet, dan desktop
- Touch-friendly interface untuk perangkat mobile

### 2. **Dark Mode**
- Toggle dark/light mode dengan smooth transition
- Theme provider menggunakan Context API
- Simpan preferensi pengguna di localStorage

### 3. **Smooth Animations**
- Framer Motion untuk page transitions dan micro-interactions
- Hover effects yang halus pada cards dan buttons
- Scroll-triggered animations dengan `PresenceMotion`

### 4. **Navigation**
- **Desktop**: Navigation menu dengan dropdown yang elegan
- **Mobile**: Sheet navigation dengan accordion
- SEO-friendly routing dengan Next.js App Router

### 5. **Content Management System**
- Admin panel untuk manajemen konten
- CRUD operations untuk berita, pengumuman, dan dokumen
- Upload dan manajemen file/gambar
- Data table dengan sorting, filtering, dan pagination

### 6. **Database Integration**
- Prisma ORM untuk type-safe database queries
- Migrations untuk version control database schema
- Relational data modeling

### 7. **Accessibility**
- Semantic HTML untuk struktur yang jelas
- ARIA labels untuk screen readers
- Keyboard navigation support
- WCAG 2.1 compliant

## 🚢 Deployment

### Deploy ke Vercel (Recommended)

1. Push code ke GitHub
2. Buka [Vercel Dashboard](https://vercel.com)
3. Import repository `web-bgtk-ntt`
4. Tambahkan environment variables di Vercel
5. Vercel akan otomatis detect Next.js dan deploy

```bash
# Atau gunakan Vercel CLI
npm i -g vercel
vercel
```

### Deploy ke Server Lain

1. **Build aplikasi**

```bash
npm run build
```

2. **Setup environment variables di production server**

3. **Run database migrations**

```bash
npx prisma migrate deploy
```

4. **Start production server**

```bash
npm start
```

## 📱 Fitur Mobile

- **Responsive Carousel** - Berita dengan swipe support
- **Mobile Navigation** - Sheet-based menu yang user-friendly
- **Touch Optimized** - Button dan touch target yang sesuai standar
- **Image Optimization** - Lazy loading dan responsive images
- **Fast Loading** - Optimized untuk koneksi mobile yang lambat

## 🔐 Best Practices

- **TypeScript** untuk type safety dan better developer experience
- **Component composition** untuk reusability maksimal
- **Tailwind CSS** untuk consistent styling
- **Prisma ORM** untuk type-safe database operations
- **SEO optimization** dengan Meta tags dan Open Graph
- **Performance optimization** melalui code splitting dan image optimization
- **Security** dengan environment variables dan API route protection

## 📚 Struktur Komponen

### UI Components (dari Shadcn/ui)

- **Card** - Container untuk konten
- **Button** - Interactive buttons dengan variants
- **Dialog** - Modal dialogs
- **Dropdown Menu** - Menu dropdowns
- **Navigation Menu** - Radix-based navigation
- **Sheet** - Side sheet untuk mobile navigation
- **Table** - Data tables dengan React Table
- **Accordion** - Collapsible sections
- **Badge** - Labels dan tags
- **Form** - Form components dengan validasi

### Custom Components

- **Navbar** - Header dengan logo dan navigation
- **Footer** - Footer dengan links dan informasi kontak
- **NewsCard** - Card untuk menampilkan berita
- **ProgramCard** - Card untuk program prioritas dengan hover effects
- **Carousel** - Custom carousel untuk content rotation
- **DarkSwitch** - Toggle untuk dark mode

## 🎯 Halaman Utama

| Halaman | Route | Deskripsi |
|---------|-------|-----------|
| Homepage | `/` | Halaman utama dengan hero section |
| Sambutan | `/profil/sambutan-kata` | Sambutan kepala balai |
| Sejarah | `/profil/sejarah` | Sejarah berdirinya BGTK NTT |
| Visi Misi | `/profil/visi-misi` | Visi dan misi lembaga |
| Struktur Org | `/profil/struktur-organisasi` | Struktur organisasi |
| Tugas & Fungsi | `/profil/tupoksi` | Tugas pokok dan fungsi |
| Berita | `/publikasi/berita-terkini` | Berita terkini |
| Pengumuman | `/publikasi/pengumuman` | Pengumuman penting |
| Peraturan | `/publikasi/peraturan-juknis` | Peraturan dan juknis |
| Unduh | `/publikasi/unduh` | Download resources |
| FAQ | `/lainnya/faq` | Frequently asked questions |
| Admin Panel | `/admin` | Dashboard admin untuk manajemen konten |

## 🗄️ Database Schema

Database dikelola menggunakan Prisma ORM. Schema dapat dilihat di [prisma/schema.prisma](prisma/schema.prisma).

Untuk melihat dan mengelola database, jalankan:

```bash
npx prisma studio
```

## 🤝 Kontribusi

Untuk berkontribusi pada proyek ini:

1. Fork repository
2. Clone fork Anda: `git clone https://github.com/username/web-bgtk-ntt.git`
3. Buat branch feature: `git checkout -b feature/AmazingFeature`
4. Commit changes: `git commit -m 'Add: AmazingFeature'`
5. Push ke branch: `git push origin feature/AmazingFeature`
6. Buat Pull Request ke branch `dev`

### Branching Strategy

- **master** - Production branch
- **dev** - Development branch

## 📄 Lisensi

GNU General Public License v3.0

## 📞 Hubungi Kami

**BGTK Provinsi NTT**

- 📍 Alamat: Jl. Perintis Kemerdekaan I, Kayu Putih, Kec. Oebobo, Kota Kupang, NTT
- 📧 Email: bgtkntt@kemendikdasmen.go.id
- 🌐 Website: [https://bgtkntt.kemendikdasmen.go.id](https://bgtkntt.kemendikdasmen.go.id)
- 📱 Media Sosial:
  - Facebook: [@balaigurupenggerakntt](https://www.facebook.com/balaigurupenggerakntt/)
  - Twitter: [@BGTK_NTT](https://twitter.com/BGTK_NTT)
  - Instagram: [@bgtkntt](https://www.instagram.com/bgtkntt/)
  - YouTube: [@bgtkntt](https://www.youtube.com/@bgtkntt/)
  - TikTok : [@bgtkntt](https://www.tiktok.com/@bgtkntt)

## 🙏 Terima Kasih

Terima kasih atas kunjungan Anda ke website BGTK Provinsi NTT. Semoga website ini dapat memberikan informasi dan layanan yang bermanfaat bagi pengembangan pendidikan di Nusa Tenggara Timur.

---

**Dibuat dengan ❤️ oleh Tim Pengembang BGTK NTT**

**Repository:** [github.com/selestino-k/web-bgtk-ntt](https://github.com/selestino-k/web-bgtk-ntt)

**Terakhir Diperbarui:** Januari 2025
