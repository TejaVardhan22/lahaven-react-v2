import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, ArrowDown, Heart, Package, Sparkles } from 'lucide-react';
import { SEOHead } from '@/components/seo/SEOHead';
import { ProductCard } from '@/components/products/ProductCard';
import { getProductsByCategory } from '@/data/products';
import { pageSEO } from '@/data/seo';
import { getWhatsAppUrl } from '@/utils/constants';
import { WhatsAppIcon } from '@/components/shared/Icons';
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/shared/AnimatedSection';

const BOX_DETAILS = [
  {
    icon: Package,
    title: 'Eco sugarcane clamshell',
    copy: '100% biodegradable, heat-insulated and sturdy enough to travel across the city.',
  },
  {
    icon: Sparkles,
    title: 'Candle & spork included',
    copy: 'Everything needed for an instant surprise cutting — no last-minute shop run.',
  },
  {
    icon: Heart,
    title: 'Hand-piped inscription',
    copy: 'Add a name, initials or a short message at no extra cost. Piped the morning of pickup.',
  },
  {
    icon: ArrowRight,
    title: 'Deep teal & sage satin ribbon',
    copy: 'Tied by hand in our signature packaging style, with a gold LaHaven seal.',
  },
];

export const BentoCakes: React.FC = () => {
  const bentoProducts = getProductsByCategory('bento-cakes');

  return (
    <div className="min-h-screen bg-[#F5EFEB] pb-20">
      <SEOHead
        title={pageSEO['bento-cakes'].title}
        description={pageSEO['bento-cakes'].description}
        canonicalUrl={pageSEO['bento-cakes'].canonicalUrl}
        ogTitle={pageSEO['bento-cakes'].ogTitle}
        ogDescription={pageSEO['bento-cakes'].ogDescription}
        ogImage={pageSEO['bento-cakes'].ogImage}
        twitterCard={pageSEO['bento-cakes'].twitterCard}
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
                KOREAN MINI CELEBRATION CAKES
              </p>

              {/* Main Headline */}
              <h1 className="font-serif text-[clamp(2.4rem,4.4vw,4.15rem)] font-normal leading-[1.12] tracking-tight text-[#25313A]">
                <span className="block">Little Cakes,</span>
                <span className="block font-serif font-bold text-[#365D60]">
                  Big Love.
                </span>
              </h1>

              {/* Description Body */}
              <p className="mt-4 max-w-lg font-sans text-base sm:text-[17px] font-normal leading-relaxed text-[#6B5E55]">
                Our 4-inch Korean-inspired bento cakes are pastel-piped, packed in an eco clamshell gift box, and finished with a satin ribbon. Small enough to surprise someone at their desk — complete enough to make the whole room smile.
              </p>

              {/* Secondary Subtext */}
              <p className="mt-3 font-sans text-xs sm:text-sm font-semibold text-[#365D60]">
                Personalised custom message piped on request.
              </p>

              {/* Clean Badge */}
              <div className="mt-7 flex items-center gap-2.5">
                <Sparkles className="h-5 w-5 text-[#365D60] shrink-0" strokeWidth={1.8} />
                <span className="text-xs sm:text-[13px] font-semibold text-[#25313A]">
                  4-Inch Bento • Eco Gift Box Packaging • 100% Eggless
                </span>
              </div>

              {/* Action CTA Buttons */}
              <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4">
                <a
                  href="#bento-grid"
                  className="inline-flex items-center justify-center gap-2.5 rounded-full bg-[#365D60] px-7 sm:px-8 py-3.5 font-sans text-sm font-semibold tracking-wide text-[#F5EFEB] shadow-sm transition-all duration-300 hover:bg-[#2C4C4F] hover:shadow-md hover:scale-[1.02] active:scale-100"
                >
                  <span>Explore Bento Cakes</span>
                  <ArrowDown className="h-4 w-4" />
                </a>
                <a
                  href={getWhatsAppUrl('Hi LaHeaven! I would like to order a personalised bento cake with custom lettering.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#365D60] bg-transparent px-7 sm:px-8 py-3.5 font-sans text-sm font-semibold tracking-wide text-[#365D60] transition-all duration-300 hover:bg-[#365D60]/10 hover:scale-[1.02] active:scale-100"
                >
                  <WhatsAppIcon className="h-4 w-4 fill-[#365D60]" />
                  <span>Custom Lettering</span>
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
                      src="/images/hero/strawberry-heart-desktop.jpg"
                      alt="Handcrafted Korean Bento Celebration Cake by La Heaven"
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
                          Ready in 4 Hours
                        </span>
                      </div>
                      <span className="rounded-full bg-[#FFFFFF]/25 px-3 py-1 font-sans text-[11px] font-semibold backdrop-blur-md">
                        Eco Gift Packaging
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section id="bento-grid" className="premium-section bg-[#F5EFEB] pt-10 sm:pt-12">
        <div className="premium-container">
          <div className="flex flex-col gap-3 pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="section-kicker">The Bento Counter</span>
              <h2 className="mt-3 font-serif text-[1.9rem] font-bold leading-tight tracking-[-0.015em] text-[#25313A] sm:text-[2.3rem]">
                Pick a Little Gift Box
              </h2>
            </div>
            <p className="font-sans text-[10.5px] font-bold uppercase tracking-[0.18em] text-[#6B5E55]">
              {bentoProducts.length} Designs · Baked to Order
            </p>
          </div>

          <StaggerContainer className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {bentoProducts.map((product) => (
              <StaggerItem key={product.id}>
                <ProductCard
                  product={product}
                />
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Packaging spotlight */}
          <AnimatedSection animation="fadeUp" className="mt-16 overflow-hidden rounded-3xl border border-[#DFD7CF] bg-[#FFFFFF] shadow-[0_8px_30px_rgba(68,48,38,0.06)]">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="relative order-2 min-h-[280px] p-4 lg:order-1 lg:col-span-5 lg:p-6">
                <img
                  src="/images/products/heart-shaped-chocolate.jpg"
                  alt="LaHaven bento cake packaging with ribbon and candle"
                  className="h-full w-full rounded-2xl border border-[#DFD7CF] bg-[#EBE5DF] object-cover shadow-xs"
                  loading="lazy"
                  width={900}
                  height={900}
                />
                <span className="absolute left-8 top-8 rounded-full border border-[#DFD7CF] bg-[#FFFFFF]/95 px-3.5 py-1.5 font-sans text-[9.5px] font-bold uppercase tracking-[0.16em] text-[#365D60] shadow-2xs backdrop-blur-md">
                  The Unboxing Experience
                </span>
              </div>

              <div className="order-1 p-6 sm:p-9 lg:order-2 lg:col-span-7 lg:p-11">
                <span className="section-kicker">Thoughtful Details</span>
                <h2 className="mt-4 max-w-lg font-serif text-[1.9rem] font-bold leading-[1.1] tracking-[-0.015em] text-[#25313A] sm:text-[2.4rem]">
                  What Comes Inside Every{' '}
                  <span className="italic font-normal text-[#365D60]">Bento Box</span>
                </h2>
                <p className="mt-3 max-w-xl font-sans text-sm font-normal leading-relaxed text-[#6B5E55]">
                  The cake is only half the gift. Every box leaves the counter ready to be handed
                  over — ribbon tied, golden candle tucked in, name piped on top.
                </p>

                <div className="mt-7 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
                  {BOX_DETAILS.map((detail) => (
                    <div key={detail.title} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#DFD7CF] bg-[#FFFFFF] text-[#365D60] shadow-2xs">
                        <detail.icon className="h-4 w-4" />
                      </span>
                      <div>
                        <h3 className="font-serif text-base font-bold leading-snug text-[#25313A]">
                          {detail.title}
                        </h3>
                        <p className="mt-0.5 font-sans text-xs font-normal leading-relaxed text-[#6B5E55]">
                          {detail.copy}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <a
                    href={getWhatsAppUrl(
                      'Hi LaHaven! I would like to order bento cakes — please share today’s flavours.'
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary whitespace-nowrap"
                  >
                    <WhatsAppIcon className="h-4 w-4" />
                    <span>Ask What&rsquo;s in the Box</span>
                  </a>
                  <Link to="/cakes" className="btn-secondary whitespace-nowrap">
                    See All Cakes
                  </Link>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Closing note */}
          <div className="mt-14 flex flex-col items-center gap-3 text-center">
            <span className="font-script text-2xl text-[#B6C69F]">small cake, whole heart</span>
            <p className="max-w-xl font-sans text-sm font-normal leading-relaxed text-[#6B5E55]">
              Ordering for an office team or a celebration party? We tie bulk bento sets with
              individual name tags. Message us a day ahead and we&rsquo;ll have them ready together.
            </p>
            <Link
              to="/contact"
              className="group inline-flex items-center gap-1.5 font-sans text-[11px] font-bold uppercase tracking-[0.12em] text-[#365D60] transition-colors hover:text-[#B6C69F]"
            >
              <span>Plan a Bulk Bento Order</span>
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BentoCakes;
