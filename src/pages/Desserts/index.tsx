import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowDown, Leaf, Snowflake, Wheat, Sparkles } from 'lucide-react';
import { SEOHead } from '@/components/seo/SEOHead';
import { ProductCard } from '@/components/products/ProductCard';
import { getProductsByCategory } from '@/data/products';
import { pageSEO } from '@/data/seo';
import { getWhatsAppUrl } from '@/utils/constants';
import { WhatsAppIcon } from '@/components/shared/Icons';
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/shared/AnimatedSection';

const QUALITY_NOTES = [
  {
    icon: Wheat,
    title: 'Real butter, real flour',
    copy: 'No pre-mix powders, no industrial stabilisers. Just pastry as it should be made.',
  },
  {
    icon: Snowflake,
    title: 'Chilled slowly, never rushed',
    copy: 'Cheesecakes set overnight; tiramisu rests a full day so the layers settle.',
  },
  {
    icon: Leaf,
    title: 'Baked in small batches',
    copy: 'Each tray is made the morning it is sold across our five Bengaluru counters.',
  },
];

export const Desserts: React.FC = () => {
  const desserts = getProductsByCategory('desserts');

  return (
    <div className="min-h-screen bg-[#F5EFEB] pb-20">
      <SEOHead
        title={pageSEO.desserts.title}
        description={pageSEO.desserts.description}
        canonicalUrl={pageSEO.desserts.canonicalUrl}
        ogTitle={pageSEO.desserts.ogTitle}
        ogDescription={pageSEO.desserts.ogDescription}
        ogImage={pageSEO.desserts.ogImage}
        twitterCard={pageSEO.desserts.twitterCard}
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
                THE ARTISAN PASTRY COUNTER
              </p>

              {/* Main Headline */}
              <h1 className="font-serif text-[clamp(2.4rem,4.4vw,4.15rem)] font-normal leading-[1.12] tracking-tight text-[#25313A]">
                <span className="block">Artisan Desserts,</span>
                <span className="block font-serif font-bold text-[#365D60]">
                  Fresh Every Morning.
                </span>
              </h1>

              {/* Description Body */}
              <p className="mt-4 max-w-lg font-sans text-base sm:text-[17px] font-normal leading-relaxed text-[#6B5E55]">
                Beyond our signature celebration cakes sits a curated pastry counter — basque cheesecakes with caramelised tops, tiramisu layered overnight, and brownie stacks cut thick.
              </p>

              {/* Secondary Subtext */}
              <p className="mt-3 font-sans text-xs sm:text-sm font-semibold text-[#365D60]">
                Handcrafted daily across our 5 Bengaluru boutique kitchens.
              </p>

              {/* Clean Badge */}
              <div className="mt-7 flex items-center gap-2.5">
                <Sparkles className="h-5 w-5 text-[#365D60] shrink-0" strokeWidth={1.8} />
                <span className="text-xs sm:text-[13px] font-semibold text-[#25313A]">
                  Small-Batch Morning Bakes • 100% Eggless Treats
                </span>
              </div>

              {/* Action CTA Buttons */}
              <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4">
                <a
                  href="#desserts-grid"
                  className="inline-flex items-center justify-center gap-2.5 rounded-full bg-[#365D60] px-7 sm:px-8 py-3.5 font-sans text-sm font-semibold tracking-wide text-[#F5EFEB] shadow-sm transition-all duration-300 hover:bg-[#2C4C4F] hover:shadow-md hover:scale-[1.02] active:scale-100"
                >
                  <span>Explore Patisserie</span>
                  <ArrowDown className="h-4 w-4" />
                </a>
                <a
                  href={getWhatsAppUrl('Hi LaHeaven! I would like to check today’s fresh dessert selection.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#365D60] bg-transparent px-7 sm:px-8 py-3.5 font-sans text-sm font-semibold tracking-wide text-[#365D60] transition-all duration-300 hover:bg-[#365D60]/10 hover:scale-[1.02] active:scale-100"
                >
                  <WhatsAppIcon className="h-4 w-4 fill-[#365D60]" />
                  <span>Order on WhatsApp</span>
                </a>
              </div>
            </AnimatedSection>

            {/* ── Right Column: Showcase Visual with Sage Curved Backdrop ── */}
            <AnimatedSection animation="scaleUp" delay={0.12} className="lg:col-span-6 xl:col-span-6 relative flex items-center justify-center lg:justify-end">
              <div className="relative w-full max-w-[580px]">
                {/* Organic Sage Green Backdrop Shape */}
                <div className="pointer-events-none absolute -right-3 sm:-right-5 -top-5 sm:-top-7 h-[105%] w-[88%] rounded-tr-[90px] rounded-bl-[60px] rounded-tl-[30px] rounded-br-[30px] bg-[#B6C69F]/45 transition-transform duration-700" />

                <div className="relative z-10 w-full overflow-hidden rounded-3xl border border-[#DFD7CF] bg-[#FFFFFF] shadow-[0_16px_48px_rgba(37,49,58,0.08)]">
                  <div className="relative aspect-[16/11] w-full overflow-hidden bg-[#EBE5DF]">
                    <img
                      src="/images/hero/blueberry-desktop.jpg"
                      alt="Artisan Patisserie, Cheesecakes & Desserts by La Heaven"
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
                          Fresh Morning Batch
                        </span>
                      </div>
                      <span className="rounded-full bg-[#FFFFFF]/25 px-3 py-1 font-sans text-[11px] font-semibold backdrop-blur-md">
                        Patisserie Classics
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section id="desserts-grid" className="premium-section bg-[#F5EFEB] pt-10 sm:pt-12">
        <div className="premium-container">
          <div className="flex flex-col gap-3 pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="section-kicker">Today&rsquo;s Selection</span>
              <h2 className="mt-3 font-serif text-[1.9rem] font-bold leading-tight tracking-[-0.015em] text-[#25313A] sm:text-[2.3rem]">
                Small-Batch, Made This Morning
              </h2>
            </div>
            <p className="font-sans text-[10.5px] font-bold uppercase tracking-[0.18em] text-[#6B5E55]">
              {desserts.length} Patisserie Classics
            </p>
          </div>

          <StaggerContainer className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {desserts.map((dessert) => (
              <StaggerItem key={dessert.id}>
                <ProductCard
                  product={dessert}
                />
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Light Luxury Quality Band */}
          <AnimatedSection animation="fadeUp" className="relative mt-16 overflow-hidden rounded-3xl border border-[#DFD7CF] bg-[#FFFFFF] px-6 py-10 shadow-[0_8px_30px_rgba(68,48,38,0.06)] sm:px-10 lg:px-12">
            <div className="relative grid gap-9 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-5">
                <span className="section-kicker">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#B6C69F]" />
                  <span>Pure Ingredients</span>
                </span>
                <h2 className="mt-4 font-serif text-[1.9rem] font-bold leading-[1.1] tracking-[-0.015em] text-[#25313A] sm:text-[2.4rem]">
                  Made Fresh Daily in{' '}
                  <span className="italic font-normal text-[#365D60]">Bengaluru</span>
                </h2>
                <p className="mt-3 max-w-md font-sans text-sm leading-relaxed text-[#6B5E55]">
                  We never use artificial food compounds or shelf stabilisers. Real cream, pure
                  butter, and authentic Belgian couverture chocolate only.
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <Link to="/cakes" className="btn-primary">
                    <span>Add a Cake to Your Order</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <a
                    href={getWhatsAppUrl(
                      'Hi LaHaven! I would like to order fresh pastries and desserts from the counter.'
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary"
                  >
                    <WhatsAppIcon className="h-4 w-4" />
                    <span>Order Counter Box</span>
                  </a>
                </div>
              </div>

              <StaggerContainer className="grid gap-4 sm:grid-cols-3 lg:col-span-7">
                {QUALITY_NOTES.map((note) => (
                  <StaggerItem
                    key={note.title}
                    className="rounded-2xl border border-[#DFD7CF] bg-[#FFFFFF] p-5 shadow-2xs"
                  >
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-[#DFD7CF] bg-[#EBE5DF] text-[#365D60]">
                      <note.icon className="h-4 w-4" />
                    </span>
                    <h3 className="mt-3 font-serif text-lg font-bold leading-snug text-[#25313A]">
                      {note.title}
                    </h3>
                    <p className="mt-1 font-sans text-xs leading-relaxed text-[#6B5E55]">
                      {note.copy}
                    </p>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default Desserts;
