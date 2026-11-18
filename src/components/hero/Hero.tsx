import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Leaf,
  ChefHat,
  Truck,
} from 'lucide-react';
import { useGsap } from '@/hooks/useGsap';
import { gsap, isReducedMotion } from '@/utils/gsap';

interface QuickCategoryItem {
  id: string;
  label: string;
  href: string;
  image: string;
  badge?: string;
}

const QUICK_CATEGORIES: QuickCategoryItem[] = [
  {
    id: 'bestsellers',
    label: 'Bestsellers',
    href: '/cakes?category=All+Cakes&sort=popular',
    image: '/images/hero/belgian-truffle-mobile.jpg',
    badge: 'Hot',
  },
  {
    id: 'chocolate',
    label: 'Chocolate',
    href: '/cakes?flavour=chocolate',
    image: '/images/products/chocolate-fantasy-cake.jpg',
  },
  {
    id: 'fruit',
    label: 'Fruit & Berry',
    href: '/cakes?flavour=fruit-berry',
    image: '/images/hero/mango-raspberry-mobile.jpg',
  },
  {
    id: 'bento',
    label: 'Bento Cakes',
    href: '/bento-cakes',
    image: '/images/hero/strawberry-heart-mobile.jpg',
    badge: 'Trending',
  },
  {
    id: 'cheesecakes',
    label: 'Cheesecakes',
    href: '/cakes?category=cheesecakes',
    image: '/images/products/blueberry-cheesecake.jpg',
  },
  {
    id: 'desserts',
    label: 'Desserts',
    href: '/desserts',
    image: '/images/products/chocochips-brownie.jpg',
  },
];

export const Hero: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);

  // High-performance GSAP entrance timeline & organic floating cake
  useGsap(
    () => {
      if (isReducedMotion()) return;

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // 1. Hero Kicker & Headline: Subtle upward reveal
      tl.fromTo(
        '.hero-kicker',
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
      )
        .fromTo(
          '.hero-headline-line',
          { y: 22, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power3.out',
            clearProps: 'all',
          },
          '-=0.35'
        )
        // 2. Subtitle: Smooth fade-in
        .fromTo(
          '.hero-subtext',
          { y: 15, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power3.out',
            clearProps: 'all',
          },
          '-=0.45'
        )
        // 3. Badges: Fade in
        .fromTo(
          '.hero-badges',
          { y: 12, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            ease: 'power3.out',
            clearProps: 'all',
          },
          '-=0.35'
        )
        // 4. CTA Buttons: Staggered entrance
        .fromTo(
          '.hero-cta-btn',
          { y: 12, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            stagger: 0.08,
            ease: 'power3.out',
            clearProps: 'all',
          },
          '-=0.35'
        )
        // 5. Cake Image Entrance: scale 0.94 -> 1, y: 25 -> 0
        .fromTo(
          '.hero-photo',
          { y: 25, opacity: 0, scale: 0.94 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.1,
            ease: 'power3.out',
            clearProps: 'transform,opacity',
            onComplete: () => {
              // 6. Subtle Floating Cake
              if (typeof window !== 'undefined' && window.innerWidth >= 768 && !isReducedMotion()) {
                gsap.to('.hero-photo', {
                  y: -8,
                  duration: 5.0,
                  ease: 'sine.inOut',
                  repeat: -1,
                  yoyo: true,
                });
              }
            },
          },
          '-=0.7'
        )
        // 7. Quick Category circles stagger in quietly
        .fromTo(
          '.hero-cat-item',
          { y: 12, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.03,
            ease: 'power3.out',
            clearProps: 'all',
          },
          '-=0.4'
        );

      // Subtle Scroll Interaction: gently reduce cake image scale from 1 to 0.96 on scroll
      if (typeof window !== 'undefined') {
        gsap.to('.hero-photo-wrap', {
          scale: 0.97,
          opacity: 0.95,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.2,
          },
        });
      }
    },
    [],
    heroRef
  );

  return (
    <section
      ref={heroRef}
      aria-label="La Heaven Hero & Cake Showcase"
      className="home-hero relative bg-[#FBF3E8] pt-8 pb-10 sm:pt-12 sm:pb-14 lg:pt-14 lg:pb-16 overflow-hidden"
    >
      {/* ── Soft ambient sage glow in the top right ── */}
      <div className="pointer-events-none absolute -right-20 -top-20 -z-10 h-[520px] w-[520px] rounded-full bg-[#B6C69F]/20 blur-3xl" />
      <div className="pointer-events-none absolute left-0 bottom-0 -z-10 h-[300px] w-[300px] rounded-full bg-[#365D60]/5 blur-3xl" />

      {/* ── Main 2-Column Hero Grid Matching Sample Mockup ── */}
      <div className="premium-container">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-8">
          {/* ── Left Column: Editorial Copy, Badges & CTAs ── */}
          <div className="lg:col-span-6 xl:col-span-6 pt-2 lg:pt-0">
            {/* Kicker with clean horizontal accent lines */}
            <div className="hero-kicker flex items-center gap-3 text-[11px] sm:text-xs font-semibold tracking-[0.22em] uppercase text-[#6B5E55] mb-5">
              <span className="h-[1px] w-6 sm:w-10 bg-[#B6C69F]" />
              <span>Premium Eggless Cakes &amp; Desserts</span>
              <span className="h-[1px] w-6 sm:w-10 bg-[#B6C69F]" />
            </div>

            {/* Main Headline */}
            <h1 className="hero-headline font-serif text-[clamp(2.4rem,4.4vw,4.15rem)] font-normal leading-[1.12] tracking-tight text-[#25313A]">
              <span className="hero-headline-line block">Every Celebration</span>
              <span className="hero-headline-line block">Tastes Better with</span>
              <span className="hero-headline-line block font-serif font-bold text-[#365D60]">
                La Heaven.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="hero-subtext mt-4 max-w-lg font-sans text-base sm:text-[17px] font-normal leading-relaxed text-[#6B5E55]">
              Freshly baked cakes, customised for your special moments.
            </p>

            {/* 3 Trust Badges (Horizontal Row with Divider Lines) */}
            <div className="hero-badges mt-8 flex flex-wrap items-center gap-4 sm:gap-6 border-t border-[#DFD7CF] pt-6 sm:border-t-0 sm:pt-4">
              <div className="flex items-center gap-2.5">
                <Leaf className="h-5 w-5 text-[#365D60] shrink-0" strokeWidth={1.8} />
                <span className="text-xs sm:text-[13px] font-medium text-[#25313A]">
                  100% Eggless
                </span>
              </div>
              <div className="hidden sm:block h-7 w-[1px] bg-[#DFD7CF]" />
              <div className="flex items-center gap-2.5">
                <ChefHat className="h-5 w-5 text-[#365D60] shrink-0" strokeWidth={1.8} />
                <span className="text-xs sm:text-[13px] font-medium text-[#25313A]">
                  Made Fresh in Our Live Kitchens
                </span>
              </div>
              <div className="hidden sm:block h-7 w-[1px] bg-[#DFD7CF]" />
              <div className="flex items-center gap-2.5">
                <Truck className="h-5 w-5 text-[#365D60] shrink-0" strokeWidth={1.8} />
                <span className="text-xs sm:text-[13px] font-medium text-[#25313A]">
                  Same-Day Chilled Delivery
                </span>
              </div>
            </div>

            {/* Action CTA Buttons */}
            <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4">
              <Link
                to="/cakes"
                className="hero-cta-btn inline-flex items-center justify-center gap-2.5 rounded-full bg-[#365D60] px-7 sm:px-8 py-3.5 font-sans text-sm font-semibold tracking-wide text-[#F5EFEB] shadow-sm transition-all duration-300 hover:bg-[#2C4C4F] hover:shadow-md hover:scale-[1.02] active:scale-100"
              >
                <span>Explore Our Cakes</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/custom-cakes"
                className="hero-cta-btn inline-flex items-center justify-center gap-2 rounded-full border border-[#365D60] bg-transparent px-7 sm:px-8 py-3.5 font-sans text-sm font-semibold tracking-wide text-[#365D60] transition-all duration-300 hover:bg-[#365D60]/10 hover:scale-[1.02] active:scale-100"
              >
                <span>Customise Your Cake</span>
              </Link>
            </div>
          </div>

          {/* ── Right Column: Showcase Cake Visual Matching User Mockup Exactly ── */}
          <div className="hero-photo-wrap lg:col-span-6 xl:col-span-6 relative flex items-center justify-center lg:justify-end">
            <div className="hero-photo relative w-full max-w-[580px] lg:max-w-[620px] xl:max-w-[680px]">
              <img
                src="/images/hero/hero-cake-showcase.jpg"
                alt="La Heaven Signature Celebration Cake"
                width={569}
                height={356}
                loading="eager"
                fetchPriority="high"
                className="w-full h-auto object-contain select-none pointer-events-none transition-transform duration-700 hover:scale-[1.02]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Quick Category Discovery Strip ── */}
      <div className="premium-container mt-10 sm:mt-14">
        <div className="rounded-2xl border border-[#DFD7CF] bg-[#FFFFFF]/70 p-3 shadow-xs sm:p-4 backdrop-blur-xs">
          <div className="no-scrollbar -mx-1 flex items-start justify-between gap-3 overflow-x-auto px-1 py-1 sm:mx-0 sm:gap-4 sm:overflow-visible">
            {QUICK_CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                to={cat.href}
                className="hero-cat-item group flex flex-1 min-w-[72px] sm:min-w-0 flex-col items-center text-center transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="relative h-16 w-16 shrink-0 aspect-square rounded-full border border-[#DFD7CF] bg-[#F5EFEB] p-[2px] transition-all duration-300 group-hover:border-[#365D60] group-hover:shadow-md sm:h-[72px] sm:w-[72px]">
                  <div className="h-full w-full overflow-hidden rounded-full aspect-square border-2 border-[#F5EFEB] bg-[#F5EFEB]">
                    <img
                      src={cat.image}
                      alt={cat.label}
                      width={76}
                      height={76}
                      loading="eager"
                      className="h-full w-full aspect-square rounded-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  {cat.badge && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#B6C69F] px-1.5 py-0.5 font-sans text-[8.5px] font-semibold uppercase tracking-wider text-[#25313A] shadow-2xs">
                      {cat.badge}
                    </span>
                  )}
                </div>
                <span className="mt-2 flex h-7 items-center justify-center text-center font-sans text-[11px] font-medium leading-tight text-[#25313A] transition-colors group-hover:text-[#365D60] sm:text-xs">
                  {cat.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
