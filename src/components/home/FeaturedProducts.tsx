import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import { useStorefront } from '@/context/StorefrontContext';
import { products } from '@/data/products';
import { EgglessSymbol } from '@/components/products/ProductCard';
import { useGsap } from '@/hooks/useGsap';
import { gsap, isReducedMotion } from '@/utils/gsap';

export const FeaturedProducts: React.FC = () => {
  const { quickAddToCart } = useStorefront();
  const containerRef = useRef<HTMLElement>(null);

  const mainCake = products.find((p) => p.id === 'chocolate-truffle-cake') || products[0];
  const sideItems = [
    products.find((p) => p.id === 'mango-raspberry-cake') || products[1],
    products.find((p) => p.id === 'heart-shaped-strawberry-bento') || products[2],
    products.find((p) => p.id === 'classic-cheesecake') || products[3],
  ];

  useGsap(
    () => {
      if (isReducedMotion()) return;

      gsap.fromTo(
        '.featured-header',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power3.out',
          clearProps: 'all',
          scrollTrigger: {
            trigger: '.featured-header',
            start: 'top 95%',
            once: true,
          },
        }
      );

      gsap.fromTo(
        '.featured-hero-card',
        { y: 25, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          clearProps: 'all',
          scrollTrigger: {
            trigger: '.featured-hero-card',
            start: 'top 95%',
            once: true,
          },
        }
      );

      gsap.fromTo(
        '.featured-side-card',
        { x: 20, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power3.out',
          clearProps: 'all',
          scrollTrigger: {
            trigger: '.featured-side-list',
            start: 'top 95%',
            once: true,
          },
        }
      );
    },
    [],
    containerRef
  );

  return (
    <section ref={containerRef} aria-label="Featured Bestsellers" className="bg-[#F5EFEB] py-14 sm:py-20">
      <div className="section-rail">
        <div className="featured-header flex flex-col gap-4 pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="eyebrow inline-flex items-center gap-2 rounded-full bg-[#EBE5DF] px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#365D60] border border-[#DFD7CF]">
              <span>Customer Favourites</span>
            </span>
            <h2 className="mt-2.5 font-serif text-3xl font-bold tracking-tight text-[#25313A] sm:text-4xl">
              Featured Best-Sellers
            </h2>
            <p className="mt-1 font-sans text-xs font-normal text-[#6B5E55] sm:text-sm">
              Our most-requested celebrations, baked fresh with Belgian couverture and pure love.
            </p>
          </div>

          <Link
            to="/cakes"
            className="group inline-flex items-center gap-1.5 font-sans text-xs font-bold uppercase tracking-wider text-[#365D60] transition-colors hover:text-[#25313A]"
          >
            <span>Explore All Cakes</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* ── Asymmetric Layout: Large Featured Cake + 3 Supporting Cards ── */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Left Column: Hero Bestseller Card (Span 7) */}
          <div className="featured-hero-card group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-[#DFD7CF] bg-[#FFFFFF] p-6 shadow-[0_8px_30px_rgba(68,48,38,0.06)] transition-all duration-300 hover:shadow-[0_16px_40px_rgba(68,48,38,0.1)] lg:col-span-7 will-change-transform">
            <div>
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-[#EBE5DF]">
                <Link to={`/cakes/${mainCake.slug}`} className="block h-full w-full">
                  <img
                    src={mainCake.images[0]?.src || '/images/hero/belgian-truffle-desktop.jpg'}
                    alt={mainCake.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    width={900}
                    height={560}
                  />
                </Link>
                <div className="absolute left-3.5 top-3.5">
                  <EgglessSymbol className="h-5 w-5 drop-shadow-sm" />
                </div>
                <span className="absolute right-3.5 top-3.5 rounded-full bg-[#B6C69F] px-3 py-1 font-sans text-[11px] font-bold uppercase tracking-wider text-[#25313A] shadow-xs">
                  No. 1 Bestseller
                </span>
              </div>

              <div className="mt-5 flex items-start justify-between gap-4">
                <div>
                  <span className="font-sans text-xs font-semibold uppercase tracking-wider text-[#365D60]">
                    {mainCake.subcategory || 'Signature Cake'}
                  </span>
                  <h3 className="mt-1 font-serif text-2xl font-bold text-[#25313A] transition-colors group-hover:text-[#365D60] sm:text-3xl">
                    <Link to={`/cakes/${mainCake.slug}`}>
                      {mainCake.name}
                    </Link>
                  </h3>
                  <p className="mt-2 font-sans text-xs font-normal leading-relaxed text-[#6B5E55] sm:text-sm line-clamp-2">
                    {mainCake.shortDescription || mainCake.description}
                  </p>
                </div>

                <div className="text-right shrink-0">
                  <span className="block font-sans text-2xl font-bold text-[#25313A]">
                    ₹{mainCake.startingPrice?.amount || 899}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-3 border-t border-[#DFD7CF] pt-4">
              <Link
                to={`/cakes/${mainCake.slug}`}
                className="group/btn inline-flex items-center justify-center gap-2 rounded-full bg-[#365D60] px-6 py-2.5 font-sans text-xs font-semibold uppercase tracking-wider text-[#F5EFEB] shadow-sm transition-all duration-300 hover:bg-[#2C4C4F] hover:-translate-y-0.5"
              >
                <span>View Product</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </Link>
              <motion.button
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={() => quickAddToCart(mainCake, '0.5 kg', true)}
                className="inline-flex items-center justify-center gap-1.5 rounded-full border border-[#365D60] bg-[#FFFFFF] px-5 py-2.5 font-sans text-xs font-semibold uppercase tracking-wider text-[#365D60] shadow-2xs transition-all duration-300 hover:bg-[#EBE5DF] hover:-translate-y-0.5"
              >
                <ShoppingBag className="h-3.5 w-3.5" />
                <span>Add to Bag</span>
              </motion.button>
            </div>
          </div>

          {/* Right Column: 3 Supporting Cards (Span 5) with Staggered Entrance */}
          <div className="featured-side-list flex flex-col gap-4 lg:col-span-5">
            {sideItems.map((item) => (
              <div
                key={item.id}
                className="featured-side-card group flex gap-4 rounded-3xl border border-[#DFD7CF] bg-[#FFFFFF] p-4 shadow-[0_8px_30px_rgba(68,48,38,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(68,48,38,0.1)] will-change-transform"
              >
                <Link
                  to={`/cakes/${item.slug}`}
                  className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-[#EBE5DF] sm:h-28 sm:w-28"
                >
                  <img
                    src={item.images[0]?.src || '/images/hero/belgian-truffle-mobile.jpg'}
                    alt={item.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    width={200}
                    height={200}
                  />
                  <div className="absolute left-2 top-2">
                    <EgglessSymbol className="h-4 w-4 drop-shadow-sm" />
                  </div>
                </Link>

                <div className="flex flex-1 flex-col justify-between py-0.5">
                  <div>
                    <span className="font-sans text-[10px] font-semibold uppercase tracking-wider text-[#365D60]">
                      {item.subcategory || 'Artisan Cake'}
                    </span>
                    <h4 className="mt-0.5 font-serif text-base font-bold text-[#25313A] transition-colors group-hover:text-[#365D60] sm:text-lg">
                      <Link to={`/cakes/${item.slug}`}>
                        {item.name}
                      </Link>
                    </h4>
                    <span className="mt-1 block font-sans text-sm font-bold text-[#25313A]">
                      ₹{item.startingPrice?.amount}
                    </span>
                  </div>

                  <div className="mt-2 flex items-center justify-between">
                    <Link
                      to={`/cakes/${item.slug}`}
                      className="font-sans text-xs font-semibold uppercase tracking-wider text-[#365D60] hover:underline"
                    >
                      View
                    </Link>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      onClick={() => quickAddToCart(item, '0.5 kg', true)}
                      className="inline-flex items-center gap-1 rounded-full border border-[#DFD7CF] bg-[#EBE5DF] px-3 py-1 font-sans text-[11px] font-medium text-[#25313A] transition-all hover:border-[#365D60] hover:bg-[#365D60] hover:text-[#F5EFEB]"
                    >
                      <ShoppingBag className="h-3 w-3" />
                      <span>Add</span>
                    </motion.button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
