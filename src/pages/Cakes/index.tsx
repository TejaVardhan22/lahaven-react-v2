import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, ArrowUpRight, Truck, ArrowDown, Sparkles } from 'lucide-react';
import { SEOHead } from '@/components/seo/SEOHead';
import { ProductCard } from '@/components/products/ProductCard';
import { products } from '@/data/products';
import { pageSEO } from '@/data/seo';
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/shared/AnimatedSection';

const CATEGORY_TABS = [
  { key: 'all', label: 'All treats' },
  { key: 'celebration-cakes', label: 'Celebration Cakes' },
  { key: 'bento-cakes', label: 'Korean Bento' },
  { key: 'cheesecakes', label: 'Cheesecakes' },
  { key: 'desserts', label: 'Artisan Desserts' },
  { key: 'eggless', label: '100% Eggless' },
];

export const Cakes: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [selectedCategory, setSelectedCategory] = useState<string>(
    searchParams.get('category') || 'all'
  );
  const [searchQuery, setSearchQuery] = useState<string>(
    searchParams.get('q') || ''
  );
  const [sortBy, setSortBy] = useState<string>(
    searchParams.get('sort') || 'recommended'
  );
  const [visibleCount, setVisibleCount] = useState<number>(12);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  // Sync from URL params
  useEffect(() => {
    let cat = searchParams.get('category') || 'all';
    // Normalize aliases
    if (cat.toLowerCase().includes('all')) cat = 'all';
    if (cat === 'designer' || cat === 'designer-cakes') cat = 'celebration-cakes';
    
    const q = searchParams.get('q') || '';
    const s = searchParams.get('sort') || 'recommended';
    setSelectedCategory(cat);
    setSearchQuery(q);
    setSortBy(s);
    setVisibleCount(12);
  }, [searchParams]);

  const handleCategorySelect = (key: string) => {
    setSelectedCategory(key);
    setVisibleCount(12);
    const next = new URLSearchParams(searchParams);
    // When selecting a tab, clear flavour/occasion to avoid empty cross-filters
    next.delete('flavour');
    next.delete('occasion');
    if (key === 'all') {
      next.delete('category');
    } else {
      next.set('category', key);
    }
    setSearchParams(next, { replace: true });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const next = new URLSearchParams(searchParams);
    if (!searchQuery.trim()) {
      next.delete('q');
    } else {
      next.set('q', searchQuery.trim());
    }
    setSearchParams(next, { replace: true });
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setSortBy(val);
    const next = new URLSearchParams(searchParams);
    if (val === 'recommended') {
      next.delete('sort');
    } else {
      next.set('sort', val);
    }
    setSearchParams(next, { replace: true });
  };

  // Filter & sort products
  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const flavourParam = searchParams.get('flavour')?.toLowerCase() || '';
    const occasionParam = searchParams.get('occasion')?.toLowerCase() || '';

    const list = products.filter((p) => {
      // Category filter
      if (selectedCategory !== 'all') {
        if (selectedCategory === 'celebration-cakes') {
          if (p.category !== 'celebration-cakes' && p.category !== 'designer-cakes') return false;
        } else if (selectedCategory === 'bento-cakes') {
          if (p.category !== 'bento-cakes') return false;
        } else if (selectedCategory === 'desserts') {
          if (p.category !== 'desserts') return false;
        } else if (selectedCategory === 'cheesecakes') {
          if (p.flavorProfile !== 'cheesecake' && !p.name.toLowerCase().includes('cheesecake')) {
            return false;
          }
        } else if (selectedCategory === 'eggless') {
          const isEggless = p.isEggless ?? p.tags.includes('eggless');
          if (!isEggless) return false;
        }
      }

      // Flavour URL filter (if arrived via flavour link)
      if (flavourParam) {
        const matchesFlavour =
          p.flavorProfile?.toLowerCase().includes(flavourParam) ||
          p.tags.some((t) => t.toLowerCase().includes(flavourParam)) ||
          p.name.toLowerCase().includes(flavourParam);
        if (!matchesFlavour) return false;
      }

      // Occasion URL filter (if arrived via occasion link)
      if (occasionParam) {
        const matchesOccasion =
          p.occasions?.some((o) => o.toLowerCase().includes(occasionParam)) ||
          p.tags.some((t) => t.toLowerCase().includes(occasionParam));
        if (!matchesOccasion) return false;
      }

      // Search query filter
      if (q) {
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesDesc = (p.shortDescription || p.description || '').toLowerCase().includes(q);
        const matchesTags = p.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchesName && !matchesDesc && !matchesTags) return false;
      }

      return true;
    });

    if (sortBy === 'price-asc') {
      return [...list].sort(
        (a, b) => (a.startingPrice?.amount || a.price?.amount || 0) - (b.startingPrice?.amount || b.price?.amount || 0)
      );
    }
    if (sortBy === 'price-desc') {
      return [...list].sort(
        (a, b) => (b.startingPrice?.amount || b.price?.amount || 0) - (a.startingPrice?.amount || a.price?.amount || 0)
      );
    }
    if (sortBy === 'name') {
      return [...list].sort((a, b) => a.name.localeCompare(b.name));
    }
    // Default: recommended / featured first
    return [...list].sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured));
  }, [selectedCategory, searchQuery, sortBy, searchParams]);

  const displayedProducts = filteredProducts.slice(0, visibleCount);

  // Infinite scroll observer: load next batch as user scrolls
  useEffect(() => {
    if (visibleCount >= filteredProducts.length) return;

    const el = sentinelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + 8, filteredProducts.length));
        }
      },
      { rootMargin: '350px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [visibleCount, filteredProducts.length]);

  return (
    <main className="min-h-screen bg-[#F5EFEB]">
      <SEOHead
        title={pageSEO.cakes.title}
        description={pageSEO.cakes.description}
        canonicalUrl={pageSEO.cakes.canonicalUrl}
        ogTitle={pageSEO.cakes.ogTitle}
        ogDescription={pageSEO.cakes.ogDescription}
        ogImage={pageSEO.cakes.ogImage}
        twitterCard={pageSEO.cakes.twitterCard}
      />

      {/* ── 1. Split-Screen Hero Banner Matching Hero Section Reference ── */}
      <section className="relative overflow-hidden bg-[#F5EFEB] pt-8 pb-10 sm:pt-12 sm:pb-14 lg:pt-14 lg:pb-16 border-b border-[#DFD7CF]">
        {/* Soft ambient sage glow */}
        <div className="pointer-events-none absolute -right-20 -top-20 -z-10 h-[520px] w-[520px] rounded-full bg-[#B6C69F]/20 blur-3xl" />
        <div className="pointer-events-none absolute left-0 bottom-0 -z-10 h-[300px] w-[300px] rounded-full bg-[#365D60]/5 blur-3xl" />

        <div className="premium-container">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-8">
            {/* ── Left Column: Editorial Copy, Badge & CTAs ── */}
            <AnimatedSection animation="fadeUp" className="lg:col-span-6 xl:col-span-6 pt-2 lg:pt-0">
              {/* Small Label */}
              <p className="text-[11px] sm:text-xs font-semibold tracking-[0.22em] uppercase text-[#6B5E55] mb-5">
                PREMIUM EGGLESS CAKE COLLECTION
              </p>

              {/* Main Headline */}
              <h1 className="font-serif text-[clamp(2.4rem,4.4vw,4.15rem)] font-normal leading-[1.12] tracking-tight text-[#25313A]">
                <span className="block">Fresh Morning Bakes,</span>
                <span className="block font-serif font-bold text-[#365D60]">
                  Handcrafted for You.
                </span>
              </h1>

              {/* Description Body */}
              <p className="mt-4 max-w-lg font-sans text-base sm:text-[17px] font-normal leading-relaxed text-[#6B5E55]">
                Handcrafted in Bengaluru with 54% Belgian couverture chocolate, pure dairy butter, and natural fruit compotes. Made fresh each morning for birthdays, anniversaries, and spontaneous celebrations.
              </p>

              {/* Secondary Subtext */}
              <p className="mt-3 font-sans text-xs sm:text-sm font-semibold text-[#365D60]">
                Available for same-day express chilled delivery across Bengaluru.
              </p>

              {/* Clean Badge */}
              <div className="mt-7 flex items-center gap-2.5">
                <Sparkles className="h-5 w-5 text-[#365D60] shrink-0" strokeWidth={1.8} />
                <span className="text-xs sm:text-[13px] font-semibold text-[#25313A]">
                  Over 30+ Artisan Flavours &amp; Sizes • 100% Eggless
                </span>
              </div>

              {/* Action CTA Buttons */}
              <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4">
                <a
                  href="#catalog-grid"
                  className="inline-flex items-center justify-center gap-2.5 rounded-full bg-[#365D60] px-7 sm:px-8 py-3.5 font-sans text-sm font-semibold tracking-wide text-[#F5EFEB] shadow-sm transition-all duration-300 hover:bg-[#2C4C4F] hover:shadow-md hover:scale-[1.02] active:scale-100"
                >
                  <span>Explore All Treats</span>
                  <ArrowDown className="h-4 w-4" />
                </a>
                <Link
                  to="/custom-cakes"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#365D60] bg-transparent px-7 sm:px-8 py-3.5 font-sans text-sm font-semibold tracking-wide text-[#365D60] transition-all duration-300 hover:bg-[#365D60]/10 hover:scale-[1.02] active:scale-100"
                >
                  <span>Customise a Cake</span>
                </Link>
              </div>
            </AnimatedSection>

            {/* ── Right Column: Showcase Cake Visual with Sage Curved Backdrop ── */}
            <AnimatedSection animation="scaleUp" delay={0.12} className="lg:col-span-6 xl:col-span-6 relative flex items-center justify-center lg:justify-end">
              <div className="relative w-full max-w-[580px]">
                {/* Organic Sage Green Backdrop Shape */}
                <div className="pointer-events-none absolute -right-3 sm:-right-5 -top-5 sm:-top-7 h-[105%] w-[88%] rounded-tr-[90px] rounded-bl-[60px] rounded-tl-[30px] rounded-br-[30px] bg-[#B6C69F]/45 transition-transform duration-700" />

                <div className="relative z-10 w-full overflow-hidden rounded-3xl border border-[#DFD7CF] bg-[#FFFFFF] shadow-[0_16px_48px_rgba(37,49,58,0.08)]">
                  <div className="relative aspect-[16/11] w-full overflow-hidden bg-[#EBE5DF]">
                    <img
                      src="/images/hero/mango-raspberry-desktop.jpg"
                      alt="La Heaven Fresh Artisan Mango Raspberry Cake"
                      width={1200}
                      height={825}
                      loading="eager"
                      fetchPriority="high"
                      className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#25313A]/75 via-transparent to-transparent" />

                    {/* Bottom Status Strip */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[#F5EFEB]">
                      <div className="flex items-center gap-2">
                        <span className="flex h-2.5 w-2.5 rounded-full bg-[#25D366] ring-4 ring-[#25D366]/30 animate-pulse" />
                        <span className="font-sans text-xs font-bold tracking-wide">
                          Baked Fresh Every Morning
                        </span>
                      </div>
                      <span className="rounded-full bg-[#FFFFFF]/25 px-3 py-1 font-sans text-[11px] font-semibold backdrop-blur-md">
                        100% Eggless
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── 2. Oat & Honey Catalog Toolbar & Grid ── */}
      <section id="catalog-grid" className="catalog section-rail">
        {/* Toolbar: Category Tabs on Left + Underline Search on Right */}
        <div className="catalog-toolbar">
          <nav className="category-tabs" aria-label="Treat categories">
            {CATEGORY_TABS.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => handleCategorySelect(tab.key)}
                className={selectedCategory === tab.key ? 'selected' : ''}
                aria-current={selectedCategory === tab.key ? 'page' : undefined}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          <form onSubmit={handleSearchSubmit} className="catalog-search" role="search">
            <input
              id="shop-search"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Find your favourite treat…"
              aria-label="Search treats"
            />
            <button type="submit" aria-label="Submit search">
              <Search size={18} />
            </button>
          </form>
        </div>

        {/* Catalog Count & Sort Controls */}
        <div className="catalog-count">
          <p>
            {filteredProducts.length} happy little {filteredProducts.length === 1 ? 'treat' : 'treats'}
            {searchQuery ? ` for “${searchQuery}”` : ''}
          </p>

          <div className="sort-form">
            <SlidersHorizontal size={14} className="text-[#6B5E55]" />
            <label htmlFor="shop-sort" className="sr-only">
              Sort treats
            </label>
            <select
              id="shop-sort"
              value={sortBy}
              onChange={handleSortChange}
            >
              <option value="recommended">Featured</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
              <option value="name">Name: A–Z</option>
            </select>
          </div>
        </div>

        {/* Product Grid / Empty State */}
        {displayedProducts.length > 0 ? (
          <>
            <StaggerContainer className="product-grid">
              {displayedProducts.map((product, idx) => (
                <StaggerItem key={product.id}>
                  <ProductCard
                    product={product}
                    index={idx}
                    priority={idx < 4}
                  />
                </StaggerItem>
              ))}
            </StaggerContainer>

            {/* Infinite Scroll Sentinel: Automatically loads more products on scroll */}
            {visibleCount < filteredProducts.length && (
              <div
                ref={sentinelRef}
                className="mt-14 flex flex-col items-center justify-center py-6 text-center"
                aria-live="polite"
              >
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#365D60] border-t-transparent" />
                <span className="mt-2.5 font-sans text-xs text-[#6B5E55]">
                  Loading more fresh bakes...
                </span>
              </div>
            )}
          </>
        ) : (
          <div className="empty-state py-16 text-center">
            <h2 className="font-serif text-3xl font-bold text-[#25313A]">No crumbs here.</h2>
            <p className="mx-auto mt-2 max-w-md font-sans text-xs text-[#6B5E55]">
              We couldn’t find a treat matching your selection. Try another search or reset to see
              the full counter.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
                setSearchParams({}, { replace: true });
              }}
              className="button button-dark mt-6"
            >
              <span>See all treats</span>
              <ArrowUpRight size={17} />
            </button>
          </div>
        )}

        {/* Delivery / Boutique Pickup Note */}
        <div className="shop-delivery">
          <Truck size={22} className="mx-auto text-[#365D60]" />
          <h3 className="mt-2 font-serif text-2xl font-bold text-[#25313A]">
            From our Bengaluru ovens to your door.
          </h3>
          <p>
            Handcrafted fresh each morning. Available for same-day chilled doorstep delivery or
            express pickup across our 5 boutique locations.
          </p>
          <Link to="/outlets" className="text-link mt-2 font-semibold">
            <span>Find your closest boutique</span>
            <ArrowUpRight size={15} />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Cakes;
