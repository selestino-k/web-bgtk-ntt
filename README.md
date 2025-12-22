# Balai Guru dan Tenaga Kependidikan (BGTK) Provinsi NTT - Website

Website resmi Balai Guru dan Tenaga Kependidikan Provinsi Nusa Tenggara Timur yang dikembangkan dengan teknologi modern untuk mendukung pengembangan dan pemberdayaan guru, tenaga kependidikan, dan pemangku kepentingan pendidikan.

## 🚀 Tentang Proyek

Website ini merupakan platform digital utama BGTK NTT yang menyediakan:

- **Informasi Profil Lembaga** - Sejarah, visi misi, struktur organisasi, dan tugas pokok fungsi
- **Portal Publikasi** - Berita terkini, pengumuman, peraturan, dan dokumen yang dapat diunduh
- **Sistem Pelayanan** - ULT (Unit Layanan Terpadu), SAKIP, dan akses aplikasi terkait
- **Program Prioritas** - Informasi tentang program-program unggulan BGTK NTT
- **FAQ & Survei** - Layanan interaktif untuk pengguna

## 📋 Teknologi yang Digunakan

### Framework & Libraries

- **Next.js 14+** - React framework untuk production-ready applications
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Unstyled, accessible component library
- **Framer Motion** - Animation library untuk smooth transitions
- **React Table** - Headless table library untuk data tables

### Development Tools

- **ESLint** - Code quality and style checker
- **PostCSS** - CSS processing
- **Next Font** - Optimized font loading (Geist, Geist Mono)

## 📁 Struktur Proyek

```
web-bgtk-ntt/
├── app/                          # Next.js App Router
│   ├── (home)/                   # Home layout group
│   │   ├── page.tsx              # Homepage
│   │   ├── profil/               # Profile pages
│   │   │   ├── sambutan-kata/
│   │   │   ├── sejarah/
│   │   │   ├── struktur-organisasi/
│   │   │   ├── tupoksi/
│   │   │   └── visi-misi/
│   │   ├── publikasi/            # Publication pages
│   │   │   ├── berita-terkini/
│   │   │   ├── pengumuman/
│   │   │   ├── peraturan-juknis/
│   │   │   └── unduh/
│   │   ├── lainnya/              # Other pages
│   │   │   └── faq/
│   │   └── layout.tsx            # Home layout wrapper
│   ├── api/                      # API routes
│   ├── admin/                    # Admin panel
│   ├── layout.tsx                # Root layout
│   └── not-found.tsx             # 404 page
├── components/                   # Reusable components
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
├── lib/                          # Utility functions
│   └── utils.ts                  # Helper functions
├── public/                       # Static assets
│   ├── images/                   # Image files
│   ├── logo/                     # Logo files
│   └── ...
├── utils/                        # Utility functions
│   └── scroll.ts                 # Scroll utilities
├── globals.css                   # Global styles
├── tailwind.config.ts            # Tailwind configuration
├── tsconfig.json                 # TypeScript configuration
├── next.config.ts                # Next.js configuration
└── package.json                  # Project dependencies
```

## 🛠️ Instalasi & Setup

### Prerequisites

- Node.js 18+ atau npm 9+
- Git

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

3. **Konfigurasi environment variables** (jika diperlukan)

```bash
# Copy file environment template
cp .env.example .env.local

# Edit file .env.local sesuai kebutuhan
```

4. **Run development server**

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
```

## 🎨 Fitur Utama

### 1. **Responsive Design**
- Mobile-first approach
- Tailwind CSS breakpoints untuk berbagai ukuran layar
- Optimized untuk mobile, tablet, dan desktop

### 2. **Dark Mode**
- Toggle dark/light mode menggunakan komponen `ModeToggle`
- Theme provider menggunakan context API
- Simpan preferensi user di localStorage

### 3. **Smooth Animations**
- Framer Motion untuk page transitions
- Hover effects pada cards dan buttons
- Scroll-triggered animations dengan `PrescenceMotion`

### 4. **Navigation**
- Desktop: Navigation menu dengan dropdown
- Mobile: Sheet navigation dengan accordion
- SEO-friendly routing

### 5. **Content Management**
- Berita dan pengumuman management
- Downloadable resources (regulasi, dokumen, buku)
- Data table untuk tampilan terstruktur

### 6. **Accessibility**
- Semantic HTML
- ARIA labels
- Keyboard navigation support
- Screen reader optimized

## 🚢 Deployment

### Deploy ke Vercel (Recommended)

1. Push code ke GitHub
2. Buka [Vercel Dashboard](https://vercel.com)
3. Import repository
4. Vercel akan otomatis detect Next.js dan setup
5. Deploy dengan satu klik

```bash
# Atau gunakan Vercel CLI
npm i -g vercel
vercel
```

### Deploy ke Server Lain

```bash
# Build untuk production
npm run build

# Start production server
npm start
```

## 📱 Fitur Mobile

- **Responsive Carousel** - Berita dengan swipe support
- **Mobile Navigation** - Sheet-based menu untuk mobile
- **Touch Optimized** - Buttons dan touch targets yang tepat
- **Image Optimization** - Lazy loading dan responsive images

## 🔐 Best Practices

- TypeScript untuk type safety
- Component composition untuk reusability
- Tailwind CSS untuk consistent styling
- SEO optimization (Meta tags, Open Graph)
- Performance optimization (Code splitting, Image optimization)

## 📚 Struktur Komponen

### UI Components (dari Shadcn/ui)

- **Card** - Container untuk konten
- **Button** - Interactive buttons
- **Dialog** - Modal dialogs
- **Dropdown Menu** - Menu dropdowns
- **Navigation Menu** - Radix-based navigation
- **Sheet** - Side sheet untuk mobile nav
- **Table** - Data tables dengan React Table
- **Accordion** - Collapsible sections
- **Badge** - Labels dan tags

### Custom Components

- **Navbar** - Header dengan logo dan navigation
- **Footer** - Footer dengan links dan info kontak
- **NewsCard** - Card untuk menampilkan berita
- **ProgramCard** - Card untuk program prioritas
- **Carousel** - Custom carousel untuk content rotation

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
| Unduh | `/publikasi/unduh` | Download resources |
| FAQ | `/lainnya/faq` | Frequently asked questions |

## 🤝 Kontribusi

Untuk berkontribusi pada proyek ini:

1. Fork repository
2. Buat branch feature (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## 📄 Lisensi

Proyek ini adalah properti BGTK Provinsi NTT.

## 📞 Hubungi Kami

**BGTK Provinsi NTT**

- 📍 Jl. Perintis Kemerdekaan I, Kayu Putih, Kec. Oebobo, Kota Kupang, NTT
- 📧 Email: bgtkntt@kemendikdasmen.go.id
- 🌐 Website: [https://bgtkntt.kemendikdasmen.go.id](https://bgtkntt.kemendikdasmen.go.id)
- 📱 Follow us:
  - Facebook: [@balaigurupenggerakntt](https://www.facebook.com/balaigurupenggerakntt/)
  - Twitter: [@BGTK_NTT](https://twitter.com/BGTK_NTT)
  - Instagram: [@bgtkntt](https://www.instagram.com/bgtkntt/)
  - YouTube: [@bgtkntt](https://www.youtube.com/@bgtkntt/)

## 🙏 Terima Kasih

Terima kasih atas kunjungan Anda ke website BGTK Provinsi NTT. Semoga website ini dapat memberikan informasi dan layanan yang bermanfaat bagi pengembangan pendidikan di Nusa Tenggara Timur.

---

**Dibuat dengan ❤️ oleh Tim Pengembang BGTK NTT**

Last Updated: 2025
