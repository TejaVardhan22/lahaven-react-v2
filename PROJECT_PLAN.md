# PROJECT_PLAN.md — Master Architecture & Implementation Roadmap

> **Project:** LaHaven Cake Boutique  
> **Repository:** `/Users/maxxpixels/Desktop/LaHaven`  
> **Status:** Production Build Ready (`npm run build` passing with 0 errors)  
> **Tech Stack:** React 18 + Vite + TypeScript + Tailwind CSS 3 + Framer Motion + Lucide React + React Helmet Async

---

## 1. Project Overview & Deliverables Status

| Milestone | Status | Description |
|-----------|--------|-------------|
| **Phase 1: Project Setup & Tokens** | ✅ Complete | Vite + React + TS, Tailwind with brand colors, fonts, global styles |
| **Phase 2: Types, Hooks & Core Utils** | ✅ Complete | Full schema types, scroll hooks, media query hooks, constants, SEO schemas |
| **Phase 3: Catalog & Content Data** | ✅ Complete | Products, outlets, occasions, testimonials, gallery, SEO data |
| **Phase 4: Layout & Shared UI** | ✅ Complete | Header, Footer, Breadcrumbs, SEOHead, SectionHeading, WhatsAppButton |
| **Phase 5: Homepage Core Sections** | ✅ Complete | Hero, SignatureCollection, BentoSection, Occasions, Gallery, Testimonials, OutletPreview |
| **Phase 6: Dedicated Route Pages** | ✅ Complete | Home, Cakes, CakeDetail, BentoCakes, CustomCakes, Desserts, About, Outlets, Contact, Franchise |
| **Phase 7: Technical SEO & Static Assets** | ✅ Complete | `robots.txt`, `sitemap.xml`, OpenGraph tags, JSON-LD schemas, branded OG image suite |
| **Phase 8: Production Build & QA** | ✅ Complete | TypeScript validation (`tsc -b`), bundle code-splitting verified |
| **Phase 9: SEO & Social Asset Polish** | ✅ Complete | Real NAP structured data, Product schema, 5-outlet ItemList, OG image generator, search query support |
| **Phase 10: Brand Voice & Hero Redesign** | ✅ Complete | Editorial hero rewrite with paper grain, kitchen copy, reduced-motion support |
| **Phase 11: Premium Landing Restyle** | ✅ Complete | Reference-inspired premium system: glass pill nav, framed hero, stat band, premium cards, uppercase pills |
| **Phase 12: Inner-Page Design Sync** | ✅ Complete | Shared `PageHero`, premium restyle of all 8 inner routes, fluid hero/H1 type, responsive `srcSet` hero image, full route QA |
| **Phase 13: Catalog Segregation & Multi-Dimensional Filtering** | ✅ Complete | 35 products mapped, 7-profile flavour system, multi-layer filtering on `/cakes`, sort dropdown, `ShopByFlavour` home section |
| **Phase 14: Premium Bakery Design System Upgrade** | ✅ Complete | Vanilla Cream (#FAF5EF), Soft Blush (#EAD8D0), Cocoa Brown (#6B4038), Dusty Rose (#B87578), Dark Chocolate (#3A2925), Playfair Display headings, Inter body, floating cake hero, pure white product cards |
| **Phase 15: Deep Teal, Sage Green & Warm Ivory Hero Upgrade** | ✅ Complete | Applied user's exact 3-color palette: Deep Teal (#365D60), Sage Green (#B6C69F), Warm Ivory (#F5EFEB). Implemented matching sample hero with kicker, headline "Every Celebration Tastes Better with La Heaven.", trust badges (Eggless, Live Kitchens, Delivery), pill CTAs, organic sage curved showcase cake, and matching announcement/nav header |
| **Phase 16: Site-Wide Color Palette Propagation** | ✅ Complete | Replaced all 376 occurrences of old hex codes across 33 component and page files. Deep Teal (#365D60) now powers all primary actions, buttons, badges, and headers; Sage Green (#B6C69F) powers highlights, pills, and accents; Warm Ivory (#F5EFEB) powers all canvases, drawers, and panels |

---

## 2. Detailed Task Breakdown

### Phase 5: Homepage Components (`src/components/`)
- [x] `src/components/hero/Hero.tsx` (Editorial hero: paper texture, taped photo print, kitchen note, human copy)
- [x] `src/components/products/SignatureCollection.tsx` (4-column featured product grid)
- [x] `src/components/products/BentoSection.tsx` (Asymmetric 12-column grid for mini cakes)
- [x] `src/components/occasions/ShopByOccasion.tsx` (Curated celebration occasions grid)
- [x] `src/components/gallery/CakeGallery.tsx` (Instagram-style filterable masonry gallery)
- [x] `src/components/testimonials/Testimonials.tsx` (Customer reviews with rating badges)
- [x] `src/components/outlets/OutletPreview.tsx` (5 Bengaluru outlets banner & locator)

### Phase 6: Pages (`src/pages/`)
- [x] `src/pages/Home/index.tsx` (Assembles all homepage sections + custom studio preview)
- [x] `src/pages/Cakes/index.tsx` (Complete cake catalog with category tabs & occasion filtering)
- [x] `src/pages/CakeDetail/index.tsx` (Individual cake page with WhatsApp ordering & related cakes)
- [x] `src/pages/BentoCakes/index.tsx` (Dedicated bento cake collection & packaging guide)
- [x] `src/pages/CustomCakes/index.tsx` (Custom cake design studio + full multi-field inquiry form)
- [x] `src/pages/Desserts/index.tsx` (Cheesecakes, brownies, tiramisu collection)
- [x] `src/pages/About/index.tsx` (Brand story, craftsmanship, values, bakery imagery)
- [x] `src/pages/Outlets/index.tsx` (Interactive 5-store locator with addresses, maps & phone calls)
- [x] `src/pages/Contact/index.tsx` (General contact form, direct phone/WhatsApp, hours)
- [x] `src/pages/Franchise/index.tsx` (Franchise formats, unit economics & partner inquiry form)

### Phase 7: Technical SEO & Static Assets
- [x] `public/robots.txt` (Crawl directives, sitemap pointer)
- [x] `public/sitemap.xml` (Full XML sitemap for all 10 routes with priority tags)
- [x] `public/og/*.jpg` (1200×630 branded social cards for every route)
- [x] `public/og-image.jpg` + `public/logo.png` (Default card & JSON-LD logo)

### Phase 8: Verification & Quality Assurance
- [x] Run `npm run build` to verify clean compilation with 0 TypeScript/Rollup errors.
- [x] Code-split chunks verified (`Home`, `Cakes`, `BentoCakes`, `CustomCakes`, `Desserts`, `About`, `Outlets`, `Contact`, `CakeDetail`, `Franchise`, `motion`, `vendor`).
- [x] PostCSS circular dependency resolved in `src/styles/index.css`.

### Phase 9: SEO & Social Asset Polish
- [x] `scripts/generate-og.mjs` (Reproducible Chrome-based OG card + logo generator)
- [x] LocalBusiness schema upgraded with real Bengaluru NAP, geo, phone, hours & all 5 outlet departments
- [x] `generateProductSchema()` wired into `CakeDetail` (price, availability, brand, sizes, flavours)
- [x] `generateOutletsSchema()` ItemList wired into the Outlets store locator
- [x] `generateSEO()` now derives from `src/data/seo.ts` (single source of truth)
- [x] `/cakes?q=` free-text search implemented to back the WebSite SearchAction schema
- [x] Canonical URLs and OG fallbacks standardised on `SITE_URL` constants

### Phase 10: Brand Voice & Hero Redesign
- [x] Replaced the generic split hero (blur blobs, floating glass cards, seal badge) with an editorial composition
- [x] Added paper-grain texture utility and a taped, slightly rotated photo print
- [x] Rewrote hero copy around concrete kitchen details (bake times, pencil-written boxes, 4 pm cutoff)
- [x] Added a handwritten kitchen note, batch stamp and hand-drawn pointer
- [x] Added `prefers-reduced-motion` handling via Framer Motion's `useReducedMotion`

### Phase 11: Premium Landing Restyle
- [x] Added `cream` / `line` color tokens and `shadow-premium` / `shadow-premium-lg` shadow tokens in `tailwind.config.js`
- [x] Added `.premium-container`, `.premium-section`, `.premium-card`, `.section-kicker` and uppercase bold pill buttons in `src/styles/index.css`
- [x] `Header.tsx`: floating rounded glass bar, centred pill nav with animated active pill, compact uppercase Order CTA, mobile drawer preserved
- [x] `Hero.tsx`: framed gradient card, kicker pill, highlight chips ("big days" / "the small ones."), rounded photo with caption pill, bake badge and quiet morning strip
- [x] Added `src/components/home/StatsBand.tsx` (5 boutiques, 16 cakes, 8 celebrations, 4.9 rating) directly after the hero
- [x] Restyled `SignatureCollection`, `BentoSection`, `ShopByOccasion`, `Testimonials`, `CakeGallery`, `OutletPreview` and the Home custom-cake spotlight on the premium card system
- [x] `Footer.tsx`: tablet grid fixed to `grid-cols-2 lg:grid-cols-4`; long email wraps instead of forcing horizontal scroll
- [x] Verified widths 320/375/390/768/1024/1280/1440: no horizontal overflow, no clipped text, no mid-label button wrapping, nav visible only at ≥1280 with symmetric 7-link spacing
- [x] `npm run build` passes with 0 errors after the restyle

### Phase 12: Inner-Page Design Sync
- [x] Added `src/components/shared/PageHero.tsx` — compact framed gradient header with breadcrumbs, kicker, serif H1, optional meta chips/actions/aside, left or centred alignment
- [x] Added `.premium-panel`, `.pill-tab` / `.pill-tab-active`, `.field-label` / `.field-input` primitives to `src/styles/index.css`
- [x] `Cakes`: page header, pill category filters, result count, active chips, premium product cards, empty state, dark custom-cake CTA
- [x] `BentoCakes`: centred header, 4 premium bento cards, packaging spotlight, bulk-order note
- [x] `Desserts`: split header with framed aside, 3 premium dessert cards, dark quality band
- [x] `About` (`/our-story`): split header with "5 kitchens" badge, framed craft section, sage commitments grid, Bengaluru roots split, closing dark CTA band
- [x] `Outlets`: centred header, 5 premium outlet cards plus dark concierge cell, directions/call/WhatsApp pills
- [x] `CakeDetail`: framed product image, packaging note, pill size/flavour selectors, green WhatsApp CTA, reassurances, lead-time note, "Complete the celebration" related cards
- [x] `Contact`: split header with concierge card, 3 quick-action cards, premium validated form, success panel, dark concierge card, outlets list
- [x] `Franchise`: split header with investment snapshot, 4 premium pillars, premium application form, dark formats card, contacts panel
- [x] `CustomCakes`: split header, 7-style premium strip, premium validated request form with file upload, dark process guide, lead-time note
- [x] Hero H1, `PageHero` H1 converted to fluid `clamp()` type; hero photo now serves `srcSet` 480/720/960/1200w with `sizes` and `decoding="async"`
- [x] Audited all 9 routes at 320/390/768/1024/1280/1440: `docW === vw`, no clipped or out-of-bounds elements, no tall pills, zero console errors
- [x] Audited hero at 15 viewports (320–1920, portrait + landscape): 37.6px/3 lines at 320 up to 66.4px/2 lines at ≥1180, no H1/caption clipping
- [x] `npm run build` passes with 0 errors after the inner-page sync

---

## 3. How Future AI Agents Should Work On This Repository

1. **Check Files Before Modifying:** Review [AGENTS.md](./AGENTS.md) to understand the file registry and protocol.
2. **Adhere to Design Tokens:** Reference [DESIGN.md](./DESIGN.md) for approved palette tokens (`slate_blue`, `sage`, `ivory`, `terracotta`, `dark`) and typography hierarchies. Never introduce arbitrary neon or unapproved brand colors.
3. **Run Build Verification:** Always run `npm run build` after making modifications to verify 0 compiler regressions.
