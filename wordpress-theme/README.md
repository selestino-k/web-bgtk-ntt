# WordPress Theme: BGTK NTT

A fully customizable WordPress theme mirroring the visual design and structure of the **BGTK NTT** Next.js website. Compatible with WordPress 6.5+.

---

## Features

- **Full Site Editing (FSE)** support via `theme.json`
- **Dark / Light mode** toggle with `localStorage` persistence
- **Responsive** layout (mobile < 768px, tablet 768–1280px, desktop ≥ 1280px)
- **Sticky header** with blur glass effect
- **Multi-level dropdown navigation** with keyboard accessibility
- **Theme Customizer** with live preview (colors, fonts, header/footer, social links, homepage sections)
- **Custom Post Types**: `program` (Program Prioritas) and `dokumen`
- **Gutenberg / Block editor** compatible (block styles, editor styles)
- Google Fonts: Inter + Montserrat (loaded from CDN)

---

## Installation

1. Copy the `bgtk-ntt/` folder into your WordPress installation's `wp-content/themes/` directory.
2. Log in to **WP Admin → Appearance → Themes**.
3. Activate the **BGTK NTT** theme.

### Recommended Plugins

| Plugin | Purpose |
|--------|---------|
| [Advanced Custom Fields (ACF)](https://www.advancedcustomfields.com/) | Hero carousel slides management |
| [Contact Form 7](https://contactform7.com/) | Contact forms |
| [Yoast SEO](https://yoast.com/wordpress/plugins/seo/) | SEO optimization |

---

## Theme Customizer

Navigate to **WP Admin → Appearance → Customize** to access all customization options under the **BGTK NTT Theme Options** panel:

### Site Identity
- **Logo** — upload a custom logo (recommended: SVG or PNG, max height 80px)
- **Site Name** and **Tagline** — edit under the built-in "Site Identity" section

### Colors
| Setting | Default |
|---------|---------|
| Primary Color | `#297bbf` |
| Background Color | `#ffffff` |
| Text Color | `#1c1c22` |

All changes are reflected **live** in the preview.

### Typography
- **Heading Font** — choose from: Inter, Montserrat, Geist, Red Hat Display
- **Body Font** — same options as above

### Header
- **Sticky Header** — toggle whether the header sticks to the top when scrolling
- **Header Background Color** — defaults to a translucent secondary color with backdrop blur

### Footer
- **Footer Background Color** — defaults to the primary blue
- **Footer Text Color** — defaults to white
- **Show Social Media Icons** — toggle social icon display
- **Copyright Text** — use `{year}` as a placeholder for the current year

### Social Media
Set the URLs for each social platform:
- Facebook, Twitter/X, Instagram, TikTok, YouTube

### Homepage Settings
Toggle visibility of each homepage section:
- Hero Carousel
- Sambutan (Greeting) section
- Program Prioritas section
- Berita Terkini section

---

## Navigation Menus

Go to **WP Admin → Appearance → Menus** to create and assign menus.

### Primary Menu
Assign to the **Primary Navigation** location. The recommended menu structure matches the original site:

```
Profil ▾
  ├── Sambutan Kata       → /profil/sambutan-kata
  ├── Sejarah             → /profil/sejarah
  ├── Struktur Organisasi → /profil/struktur-organisasi
  ├── Tugas Pokok dan Fungsi → /profil/tupoksi
  └── Visi Misi           → /profil/visi-misi

Publikasi ▾
  ├── Berita Terkini      → /publikasi/berita-terkini
  ├── Pengumuman          → /publikasi/pengumuman
  ├── Dokumen             → /publikasi/dokumen
  ├── SAKIP               → /publikasi/sakip
  └── Siaran Pers Kemendikdasmen → https://kemendikdasmen.go.id/pencarian/siaran-pers (external)

ULT ▾
  ├── Sarana dan Prasarana → /ult/sarana-prasarana
  ├── SP4N Lapor          → https://prod.lapor.go.id/ (external)
  ├── WBS Itjen           → https://wbs.kemendikdasmen.go.id/ (external)
  ├── Aduan Itjen         → https://posko-pengaduan.itjen.kemendikdasmen.go.id/ (external)
  └── SIPPN               → https://sippn.menpan.go.id/ (external)

PPID ▾
  ├── PPID Kemendikdasmen → https://ppid.kemendikdasmen.go.id/ (external)
  ├── Rencana Strategis   → /ppid/rencana-strategis
  ├── Laporan Kinerja     → /ppid/laporan-kinerja
  ├── Perjanjian Kinerja  → /ppid/perjanjian-kinerja
  └── Penghargaan         → /ppid/penghargaan

Aplikasi ▾
  ├── e-Mail Kemdikbud    → https://mail.kemdikbud.go.id/ (external)
  ├── Portal Data         → https://data.kemendikdasmen.go.id/ (external)
  ├── Rumah Pendidikan    → https://rumah.pendidikan.go.id/ (external)
  ├── SIPdasmen           → https://data-sdm.kemdikbud.go.id/ (external)
  ├── Dapodik             → https://dapo.kemendikdasmen.go.id/ (external)
  ├── Info GTK            → https://info.gtk.kemendikdasmen.go.id/ (external)
  ├── Rapor Pendidikan    → https://raporpendidikan.kemendikdasmen.go.id/login (external)
  ├── SINDE               → https://sinde.kemendikdasmen.go.id/ (external)
  └── e-SKP               → https://skp.sdm.kemdikbud.go.id/skp/site/login.jsp (external)

ZI-WBK  → /zi-wbk
SSD     → /ssd
```

### Footer Menu
Assign to the **Footer Links** location for additional footer navigation links.

---

## Custom Post Types

The theme automatically registers two custom post types:

### Program Prioritas (`program`)
- **Admin menu**: *Program Prioritas*
- **Archive URL**: `/program/`
- **Supports**: title, editor, thumbnail, excerpt

### Dokumen (`dokumen`)
- **Admin menu**: *Dokumen*
- **Archive URL**: `/dokumen/`
- **Supports**: title, editor, thumbnail, excerpt

---

## Hero Carousel (ACF)

To enable the full hero carousel (instead of the static fallback):

1. Install and activate **Advanced Custom Fields** (free or Pro).
2. Create an Options Page (ACF Pro feature, or use a free alternative).
3. Create a repeater field named `hero_slides` with sub-fields:
   - `image` (Image type)
   - `title` (Text)
   - `description` (Textarea)
   - `link` (Link type)
4. Populate slides via **ACF → Options** in WP Admin.

Without ACF, a static hero section is shown using the site name and tagline.

---

## Sambutan Section

The "Sambutan Kata" section on the homepage pulls content from a WordPress **Page** with the slug `profil/sambutan-kata`.

1. Go to **Pages → Add New**.
2. Set the title to **Sambutan Kata**.
3. Set the page's parent to **Profil** (create if needed).
4. The page slug should be `sambutan-kata` under the parent `profil`.
5. Add the greeting content and optionally a featured image.

---

## Announcements (Pengumuman) Sidebar

The sidebar on the homepage shows posts from the `pengumuman` category. To populate it:

1. Go to **Posts → Categories** and create a category named **Pengumuman** (slug: `pengumuman`).
2. Publish posts and assign them to the `pengumuman` category.

---

## Widget Areas

| Area | Location |
|------|----------|
| **Main Sidebar** (`sidebar-1`) | Page sidebar and fallback sidebar |
| **Footer 1** (`footer-1`) | Footer left column (contact info area) |
| **Footer 2** (`footer-2`) | Footer center column (tags area) |
| **Footer 3** (`footer-3`) | Footer right column (links area) |

---

## Dark Mode

Dark mode is toggled by adding the `.dark` class to `<html>`. The user's preference is saved in `localStorage` under the key `bgtk-ntt-color-scheme`. On first load, the OS `prefers-color-scheme` is respected.

Toggle buttons with class `.dark-mode-toggle` are automatically wired up by `assets/js/dark-mode.js`.

---

## Design System Colors

| Token | Light mode | Dark mode |
|-------|-----------|-----------|
| `--primary` | `#297bbf` | `#297bbf` |
| `--background` | `#ffffff` | `#1c1c22` |
| `--foreground` | `#1c1c22` | `#f9f9fa` |
| `--secondary` | `#f5f5f7` | `#3f3f47` |
| `--muted-foreground` | `#717179` | `#a0a0aa` |
| `--destructive` | `#e53935` | `#ef5350` |

---

## File Structure

```
wordpress-theme/bgtk-ntt/
├── style.css                   # Theme header + CSS design tokens
├── theme.json                  # FSE / Gutenberg color/typography config
├── functions.php               # Theme setup, enqueueing, CPTs
├── header.php                  # Sticky responsive header
├── footer.php                  # Three-column footer with social icons
├── index.php                   # Homepage / blog index
├── single.php                  # Single post
├── page.php                    # Default page (with sidebar)
├── archive.php                 # Archive / category
├── search.php                  # Search results
├── 404.php                     # 404 error page
├── sidebar.php                 # Sidebar / announcement widget
├── inc/
│   ├── customizer.php          # All Customizer controls
│   ├── customizer-preview.js   # Live preview JavaScript
│   └── nav-walker.php          # BGTK_NTT_Nav_Walker class
├── assets/
│   ├── css/
│   │   ├── theme.css           # Modular theme styles
│   │   └── customizer.css      # Customizer preview styles
│   ├── js/
│   │   ├── navigation.js       # Mobile nav + dropdown logic
│   │   └── dark-mode.js        # Dark/light mode toggle
│   └── img/                    # Place logo and badge images here
└── template-parts/
    ├── content.php             # Post card partial
    ├── content-page.php        # Page content partial
    └── hero.php                # Hero / carousel section
```

---

## Image Assets

Place the following images in `assets/img/`:

| Filename | Description |
|----------|-------------|
| `logo-placeholder.svg` | Site logo fallback (replaced by custom logo in Customizer) |
| `ramah-badge.png` | "Kemendikdasmen Ramah" badge |
| `pendidikan-bermutu-badge.png` | "Pendidikan Bermutu" badge |

---

## Developer Notes

- **CSS Variables**: All design tokens are defined as CSS custom properties in `style.css` (`:root`) and overridden in `html.dark`. The Customizer JS overrides these variables via `document.documentElement.style.setProperty()`.
- **Coding Standards**: All output is escaped with `esc_html()`, `esc_url()`, `esc_attr()`, `wp_kses_post()`.
- **i18n**: All strings use `__()` / `_e()` with the `bgtk-ntt` text domain.
- **Block Editor**: Theme registers block styles and editor styles. `theme.json` provides the color palette and font sizes for the Gutenberg editor.

---

## Changelog

### 1.0.0
- Initial release
- Full theme matching BGTK NTT Next.js design system
- Dark mode support
- Full Customizer integration
- Custom Post Types: Program, Dokumen
