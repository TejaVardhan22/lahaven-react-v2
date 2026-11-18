# DESIGN.md — LaHaven Cake Boutique Design System & Brand Identity

> **Brand:** LaHaven Cake Boutique  
> **Tagline:** *"Celebration Starts Here!"*  
> **Design Aesthetic:** Editorial Cake Boutique, Artisan Craftsmanship, Packaging-Aligned Luxury.

---

## 1. Brand Palette & Color Tokens

All design tokens are derived directly from LaHaven's physical cake packaging boxes, ribbon trims, and brand collateral. 

```
┌────────────────────────────────────────────────────────────────────────┐
│  Deep Teal           │ #365D60 │ Top banner, primary buttons, accents │
│  Sage Green          │ #B6C69F │ Active nav pill, badges, organic curve│
│  Warm Ivory          │ #F5EFEB │ Page canvas, header bg, warm surfaces │
│  Dark Charcoal       │ #25313A │ Primary headlines, crisp body copy   │
│  Pure White          │ #FFFFFF │ Product cards, high tactile contrast │
└────────────────────────────────────────────────────────────────────────┘
```

### Color Mapping in Tailwind (`tailwind.config.js`):
- `bg-ivory` / `bg-[#F5EFEB]`: Base background canvas for warm boutique feel.
- `text-teal` / `bg-teal` (`#365D60`): Announcement banner, primary hero pill CTAs, brand accents.
- `bg-sage` (`#B6C69F`): Organic hero backdrop, active pill nav indicator, boutique badges.
- `text-dark` (`#25313A`): Body copy typography and headline text for AA/AAA WCAG accessibility.

> **STRICT PROHIBITION:**  
> Do not introduce neon tones, generic ecommerce saturated blues, hot pinks, purples, or harsh gradients. The aesthetic must remain calm, organic, and artisanal.

---

## 2. Typography Hierarchy

The typography reflects an editorial culinary magazine aesthetic paired with artisanal warmth.

### Font Families:
1. **Logo & Headings (Serif):** `Cormorant Garamond`, `Georgia`, `serif`
   - Class: `font-serif`
   - Weights: `font-light` (300), `font-normal` (400), `font-medium` (500)
   - Feel: Elegant European patisserie wordmark.

2. **Body, Navigation & Forms (Sans):** `Inter`, `system-ui`, `sans-serif`
   - Class: `font-sans`
   - Weights: `font-light` (300), `font-normal` (400), `font-medium` (500), `font-semibold` (600)
   - Feel: Clean, contemporary, highly legible.

3. **Celebration Accents (Script):** `Dancing Script`, `cursive`
   - Class: `font-script`
   - Used sparingly for: "Celebration Starts Here!", "Made with love", "Tiny Delights".
   - Never use script for body text or navigation.

### Logo Composition Specification:

```
          La Haven               <-- font-serif text-2xl md:text-3xl font-medium tracking-tight
       CAKE BOUTIQUE             <-- font-sans text-[10px] uppercase tracking-[0.25em] text-slate_blue/70
  ~ Celebration Starts Here! ~   <-- font-script text-terracotta text-sm
```

---

## 3. Layout Conventions & Spacing

### Bento-Grid & Asymmetry:
- Rather than repetitive e-commerce grids, feature asymmetric layouts:
  - Hero: Split editorial layout (text left, organic-bordered cake photo right).
  - Bento Section: 12-column grid with varied card spans (`col-span-7`, `col-span-5`, `col-span-6`).
  - Occasions: Varied aspect ratios (square, tall portrait, wide landscape).
- Rounded organic radii: `rounded-2xl` (16px), `rounded-3xl` (24px), `rounded-[48px]` (48px) for hero image boundaries.

### Soft Elevation & Borders:
- Box Shadows:
  - `shadow-soft`: `0 2px 15px -3px rgba(52, 70, 79, 0.07), 0 10px 20px -2px rgba(52, 70, 79, 0.04)`
  - `shadow-soft-lg`: `0 10px 40px -10px rgba(52, 70, 79, 0.1)`
- Subtle outlines: `border border-slate_blue/10` or `border border-ivory-300` to prevent harsh lines.

---

## 4. Photography & Asset Guidelines

- **Style:** Natural, soft directional daylight, high texture, artisan finish, minimal rustic garnishes (berries, chocolate shavings, edible floral petals).
- **Backgrounds:** Warm cream, marble, or soft sage backdrops.
- **Aspect Ratios:**
  - Product Cards: `aspect-[4/5]` (editorial portrait).
  - Bento Cards: `aspect-square` (1:1) or `aspect-[4/3]`.
  - Hero: `h-[420px] sm:h-[500px] lg:h-[560px]` with object-cover.
- **Performance:**
  - Eager loading with `fetchPriority="high"` on Hero image.
  - `loading="lazy"` on all cards below the fold.
  - Explicit `width` and `height` on all image tags to eliminate Cumulative Layout Shift (CLS).

---

## 5. UI Component Guidelines

### Buttons:
- **Primary CTA:** `.btn-primary` (slate blue background, white text, pill-shaped `rounded-full`, subtle hover lift).
- **Secondary CTA:** `.btn-secondary` (slate blue border 2px, slate blue text, transparent background, fill on hover).
- **Terracotta Accent:** `.btn-terracotta` (warm terracotta background, white text, pill-shaped).
- **WhatsApp Direct Order:** Branded green `#25D366` button with pulse aura and WhatsApp icon.

### Form Design:
- Inputs: Warm ivory or white background, rounded-xl borders, subtle focus ring (`focus:ring-2 focus:ring-slate_blue/20`).
- Validation: Friendly inline error messages with clear accessibility labels.
- Dual submission paths: Direct inquiry submission + 1-click WhatsApp message generation with pre-populated order details.

---

## 6. Accessibility & Motion

- **Contrast:** Slate Blue on Ivory achieves > 7.5:1 contrast (well exceeding WCAG AAA requirements).
- **Reduced Motion:** All Framer Motion variants respect `prefers-reduced-motion: reduce` in `src/styles/index.css`.
- **Keyboard Navigation:** Explicit `:focus-visible` outlines on all interactive elements.

