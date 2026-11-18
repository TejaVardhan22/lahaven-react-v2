# AGENTS.md — Multi-Agent Collaboration & Orchestration Protocol

> **Project:** LaHaven Cake Boutique — Premium Website  
> **Brand Tagline:** "Celebration Starts Here!"  
> **Operating Directive:** Read this document BEFORE making changes or starting tasks. Never recreate existing files or scrap working progress. Build incrementally against the active roadmap in [PROJECT_PLAN.md](./PROJECT_PLAN.md).

---

## 1. Core Mission & Philosophy

LaHaven Cake Boutique is a high-end artisan cake bakery in Bengaluru with 5 physical outlets (Frazer Town, Malleshwaram, Sahakarnagar, Sanjayanagar, Yelahanka New Town). 

The website must look and feel like a direct digital extension of its physical cake packaging:
- **Palette:** Deep Teal (`#365D60`), Sage Green (`#B6C69F`), Warm Ivory (`#F5EFEB`), Dark Charcoal (`#25313A`), Pure White (`#FFFFFF`).
- **Typography:** Cormorant Garamond serif headers, Inter body, Dancing Script accents.
- **Tone:** Refined editorial, minimal luxury, artisan warmth, celebration-forward.
- **Rule of Non-Duplication:** Always check the file registry below before creating new files. Inspect existing components, types, and hooks before writing new code.

---

## 2. Specialized AI Agent Personas

When working on this repository, adopt or coordinate across these four distinct agent roles:

```
┌─────────────────────────────────────────────────────────────┐
│                       ORCHESTRATOR AGENT                    │
│    Reads AGENTS.md & PROJECT_PLAN.md, assigns next tasks    │
└───────────────┬─────────────────────────────┬───────────────┘
                │                             │
    ┌───────────▼───────────┐     ┌───────────▼───────────┐
    │  BRAND & DESIGN AGENT │     │   FRONTEND UI AGENT   │
    │  Preserves packaging, │     │  Builds components,   │
    │  color tokens, fonts  │     │  pages, forms, motion │
    └───────────┬───────────┘     └───────────┬───────────┘
                │                             │
    ┌───────────▼───────────┐     ┌───────────▼───────────┐
    │  SEO & DATA AGENT     │     │  QA & AUDIT AGENT     │
    │  JSON-LD schemas,     │     │  Type checking, build │
    │  OpenGraph, sitemaps  │     │  verification, tests  │
    └───────────────────────┘     └───────────────────────┘
```

### Agent 1: Brand & Design Guardian
- **Primary Reference:** [DESIGN.md](./DESIGN.md)
- **Responsibilities:**
  - Enforce the brand colors strictly (Deep Teal `#365D60`, Sage Green `#B6C69F`, Warm Ivory `#F5EFEB`, Dark Charcoal `#25313A`). Rejects any unapproved hot pink, purple, neon, or bright yellow.
  - Preserve the wordmark hierarchy: serif "La Haven", spaced uppercase "CAKE BOUTIQUE", script "Celebration Starts Here!".
  - Maintain whitespace balance, rounded organic edges (`rounded-2xl`, `rounded-3xl`, `rounded-[48px]`), subtle borders (`border-slate_blue/10`), soft shadows (`shadow-soft`, `shadow-soft-lg`).
  - Use the premium landing language defined in `src/styles/index.css`: `.premium-container` (80rem rail), `.premium-section` (py 16/20/24), `.premium-card` (interactive cream surface, `border-line`, `shadow-premium`, hover lift), `.premium-panel` (static surface), `.section-kicker` (uppercase sage chip), `.pill-tab` / `.pill-tab-active` filters, and `.field-label` / `.field-input` form fields. Buttons are uppercase bold pills (`.btn-primary`, `.btn-secondary`, `.btn-terracotta`).
  - Keep the floating rounded glass header (`fixed top-3`, `rounded-full`, `bg-ivory/80`, `backdrop-blur-xl`) and the framed hero (`from-cream via-ivory to-sage/60`, `rounded-[2rem]`, `shadow-premium`).
  - Inner pages open with the shared `PageHero` (compact framed gradient header, breadcrumbs, kicker, serif H1, optional meta chips/actions/aside) and then keep their own body composition — never paste homepage sections into a route page.
  - Headline sizes are fluid, not breakpoint-stepped: home hero `text-[clamp(2.35rem,1.55rem+3.6vw,4.15rem)]`, inner-page H1 `text-[clamp(2.1rem,1.5rem+2.6vw,3.4rem)]`.

### Agent 2: Frontend UI/UX Architect
- **Tech Stack:** React 18, TypeScript, Vite, Tailwind CSS 3, Framer Motion, Lucide React, React Router 6.
- **Responsibilities:**
  - Build responsive mobile-first layouts (375px mobile, 768px tablet, 1024px desktop, 1440px wide).
  - Implement accessible forms with real validation, clean error states, and WhatsApp direct links.
  - Implement fluid animations via Framer Motion without layout shifts (`layout`, `AnimatePresence`).
  - Respect `prefers-reduced-motion` guidelines.

### Agent 3: Technical SEO & Data Engineer
- **Responsibilities:**
  - Maintain structured data: `LocalBusiness` (Bakery), `Organization`, `WebSite`, `BreadcrumbList`, and `Product` JSON-LD schemas.
  - Keep `pageSEO` in sync in `src/data/seo.ts` for all 9 routes.
  - Ensure canonical links, meta tags, and OpenGraph/Twitter card properties are generated per route.
  - Update and validate `public/sitemap.xml` and `public/robots.txt`.

### Agent 4: Build, QA & Performance Specialist
- **Responsibilities:**
  - Run `npm run build` (`tsc -b && vite build`) after finishing milestones to ensure 0 compile errors.
  - Keep bundles code-split via dynamic `lazy()` imports in `src/App.tsx`.
  - Validate that images use explicit width/height to avoid Cumulative Layout Shift (CLS).
  - Ensure all internal links resolve properly with React Router (`Link`, `NavLink`).

---

## 3. Repository File Registry & Architecture

Any new agent can refer to this map to locate existing logic:

```
LaHaven/
├── AGENTS.md                  # This file: Multi-agent protocol & registry
├── DESIGN.md                  # Comprehensive visual design system & packaging guide
├── PROJECT_PLAN.md            # Work backlog, completed phases, next steps
├── index.html                 # Google Fonts preconnect (Cormorant Garamond, Inter, Dancing Script)
├── package.json               # Dependencies & build scripts
├── tailwind.config.js         # Color tokens (slate_blue, sage, ivory, terracotta, dark)
├── vite.config.ts             # Vite config with '@' alias to './src'
│
├── public/
│   ├── favicon.svg            # Branded slate_blue icon
│   ├── logo.png               # 512×512 organisation logo (JSON-LD)
│   ├── og-image.jpg           # Default 1200×630 social card
│   ├── og/                    # Per-route OpenGraph cards (home, cakes, …)
│   ├── robots.txt             # Crawl directives
│   └── sitemap.xml            # Full XML sitemap for SEO
│
├── scripts/
│   └── generate-og.mjs        # Chrome-based OG card & logo generator
│
└── src/
    ├── main.tsx               # Root entry with BrowserRouter & HelmetProvider
    ├── App.tsx                # Route registry with Suspense, lazy routes & ScrollToTop
    │
    ├── types/
    │   └── index.ts           # Product, Outlet, Occasion, SEOData, CustomCakeFormData types
    │
    ├── styles/
    │   └── index.css          # Tailwind base, utilities, button styles, custom scrollbars
    │
    ├── utils/
    │   ├── constants.ts       # Phone numbers, WhatsApp URL generator, URLs, brand constants
    │   └── seo.ts             # JSON-LD Schema generators (LocalBusiness, Breadcrumb, Org)
    │
    ├── hooks/
    │   ├── useScrollAnimation.ts  # IntersectionObserver scroll detection
    │   └── useMediaQuery.ts       # Responsive breakpoint listener
    │
    ├── data/
    │   ├── navigation.ts      # Header nav items & footer links
    │   ├── products.ts        # 16 products with images, tags, flavors, sizes, category helpers
    │   ├── occasions.ts       # 8 celebration occasions with photography
    │   ├── outlets.ts         # 5 Bangalore outlets with addresses, hours, phones
    │   ├── testimonials.ts    # Customer reviews with ratings & cake tags
    │   ├── gallery.ts         # Masonry gallery images with category filters
    │   └── seo.ts             # Route metadata for all pages
    │
    ├── components/
    │   ├── layout/
    │   │   └── Layout.tsx     # Header + main + Footer wrapper
    │   ├── navigation/
    │   │   ├── Header.tsx     # Floating rounded glass bar, centred pill nav, mobile drawer
    │   │   └── Footer.tsx     # 4-column slate_blue-900 footer with hours, social, outlets
    │   ├── hero/
    │   │   └── Hero.tsx       # Framed gradient hero: highlight chips, caption pill, morning strip
    │   ├── home/
    │   │   ├── StatsBand.tsx      # 4-stat premium band (boutiques, cakes, occasions, rating)
    │   │   └── ShopByFlavour.tsx  # 7-profile flavour carousel & grid (chocolate, berry, mocha, etc.)
    │   ├── products/
    │   │   ├── ProductCard.tsx         # Modern 3:4 editorial product card with hover overlay & WhatsApp
    │   │   ├── SignatureCollection.tsx # 4-column featured product grid with hover lift
    │   │   └── BentoSection.tsx        # Asymmetric bento grid for mini celebration cakes
    │   ├── occasions/
    │   │   └── ShopByOccasion.tsx      # Curated occasions grid
    │   ├── gallery/
    │   │   └── CakeGallery.tsx         # Filterable Instagram-style masonry gallery
    │   ├── testimonials/
    │   │   └── Testimonials.tsx        # Customer review carousel/cards
    │   ├── outlets/
    │   │   └── OutletPreview.tsx       # 5 Bengaluru outlets quick locator
    │   ├── shared/
    │   │   ├── AnimatedSection.tsx     # Framer motion inView wrapper
    │   │   ├── OptimizedImage.tsx      # Responsive image with CLS prevention
    │   │   ├── Icons.tsx               # Official SVG icons (WhatsApp, Instagram, Facebook, YouTube, X)
    │   │   ├── PageHero.tsx            # Shared compact inner-page header (breadcrumbs, kicker, serif H1, meta chips, optional aside)
    │   │   ├── SectionHeading.tsx      # Reusable typography heading block
    │   │   └── WhatsAppButton.tsx      # Floating bottom-right quick order CTA
    │   └── seo/
    │       ├── Breadcrumbs.tsx         # Semantic breadcrumb nav + JSON-LD
    │       └── SEOHead.tsx             # React Helmet Async meta wrapper
    │
    └── pages/
        ├── Home/index.tsx              # Assembles all homepage sections
        ├── Cakes/index.tsx             # Filterable cake catalog
        ├── CakeDetail/index.tsx        # Individual product view with WhatsApp order CTA
        ├── BentoCakes/index.tsx        # Dedicated Bento cake collection
        ├── CustomCakes/index.tsx       # Interactive custom cake inquiry studio & form
        ├── Desserts/index.tsx          # Pastries, cheesecakes & brownies
        ├── About/index.tsx             # Brand story, craftsmanship & bakery values
        ├── Outlets/index.tsx           # Store locator with Google Maps & phone links
        ├── Contact/index.tsx           # Contact form, ordering instructions, outlet contacts
        └── Franchise/index.tsx         # Franchise partner overview, FOCO/FICO models & WhatsApp/Webhook form
```

---

## 4. Agent Workflows & Hand-off Protocol

When taking over the project or continuing work:

1. **Step 1: Check Current State:**
   - Run `git status` or `ls` on target directories.
   - Read [PROJECT_PLAN.md](./PROJECT_PLAN.md) to see completed and pending items.
2. **Step 2: Do Not Overwrite Working Files:**
   - Keep existing tested files intact.
   - If extending a component, preserve props and export signatures.
3. **Step 3: Verification After Every Change:**
   - Run `npm run build` inside the project root (`/Users/maxxpixels/Desktop/LaHaven`).
   - Ensure the TypeScript compiler (`tsc -b`) passes with 0 errors.
4. **Step 4: Update Documentation:**
   - Mark the completed item as `[x]` in [PROJECT_PLAN.md](./PROJECT_PLAN.md).
   - Document any new utilities or routes in `AGENTS.md`.

---

## 5. Development & Build Commands

```bash
# Start local dev server (port 5173)
npm run dev

# Full TypeScript check and production bundle build
npm run build

# Preview production build locally
npm run preview

# Regenerate OpenGraph cards & logo (requires Google Chrome)
node scripts/generate-og.mjs
```

