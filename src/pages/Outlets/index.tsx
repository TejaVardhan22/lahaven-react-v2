import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Clock,
  Phone,
  ArrowUpRight,
  ArrowDown,
  Navigation,
  Search,
  Truck,
  Sparkles,
} from 'lucide-react';
import { SEOHead } from '@/components/seo/SEOHead';
import { outlets } from '@/data/outlets';
import { pageSEO } from '@/data/seo';
import { generateOutletsSchema } from '@/utils/seo';
import {
  PHONE_DISPLAY,
  PHONE_TEL,
  getWhatsAppUrl,
} from '@/utils/constants';
import { WhatsAppIcon } from '@/components/shared/Icons';
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/shared/AnimatedSection';

export const Outlets: React.FC = () => {
  const [selectedArea, setSelectedArea] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredOutlets = useMemo(() => {
    return outlets.filter((outlet) => {
      const matchesArea = selectedArea === 'ALL' || outlet.id === selectedArea;
      const q = searchQuery.trim().toLowerCase();
      if (!q) return matchesArea;
      const hay = `${outlet.name} ${outlet.area} ${outlet.address} ${outlet.landmark || ''}`.toLowerCase();
      return matchesArea && hay.includes(q);
    });
  }, [selectedArea, searchQuery]);

  return (
    <main className="min-h-screen bg-[#F5EFEB] pb-24">
      <SEOHead
        title={pageSEO.outlets.title}
        description={pageSEO.outlets.description}
        canonicalUrl={pageSEO.outlets.canonicalUrl}
        ogTitle={pageSEO.outlets.ogTitle}
        ogDescription={pageSEO.outlets.ogDescription}
        ogImage={pageSEO.outlets.ogImage}
        twitterCard={pageSEO.outlets.twitterCard}
        structuredData={generateOutletsSchema()}
      />

      {/* ── 1. Split-Screen Hero Banner Matching Hero Section Reference ── */}
      <section className="relative overflow-hidden bg-[#F5EFEB] pt-8 pb-10 sm:pt-12 sm:pb-14 lg:pt-14 lg:pb-16 border-b border-[#DFD7CF]">
        {/* Soft ambient sage glow */}
        <div className="pointer-events-none absolute -right-20 -top-20 -z-10 h-[520px] w-[520px] rounded-full bg-[#B6C69F]/20 blur-3xl" />
        <div className="pointer-events-none absolute left-0 bottom-0 -z-10 h-[300px] w-[300px] rounded-full bg-[#365D60]/5 blur-3xl" />

        <div className="premium-container">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-8">
            {/* ── Left Column: Editorial Copy, All Boutiques Badge & CTAs ── */}
            <AnimatedSection animation="fadeUp" className="lg:col-span-6 xl:col-span-6 pt-2 lg:pt-0">
              {/* Small Label */}
              <p className="text-[11px] sm:text-xs font-semibold tracking-[0.22em] uppercase text-[#6B5E55] mb-5">
                FIND YOUR NEAREST LA HEAVEN
              </p>

              {/* Main Headline */}
              <h1 className="font-serif text-[clamp(2.4rem,4.4vw,4.15rem)] font-normal leading-[1.12] tracking-tight text-[#25313A]">
                <span className="block">A Little Heaven,</span>
                <span className="block font-serif font-bold text-[#365D60]">
                  Around the Corner.
                </span>
              </h1>

              {/* Description Body */}
              <p className="mt-4 max-w-lg font-sans text-base sm:text-[17px] font-normal leading-relaxed text-[#6B5E55]">
                Your favourite cakes, freshly crafted and closer than ever. Visit a La Heaven boutique in Bengaluru for freshly made, 100% eggless cakes, delightful desserts and something sweet for every celebration.
              </p>

              {/* Secondary Subtext */}
              <p className="mt-3 font-sans text-xs sm:text-sm font-semibold text-[#365D60]">
                Find your neighbourhood boutique and drop by for a little sweetness.
              </p>

              {/* All Boutiques Badge */}
              <div className="mt-7 flex items-center gap-2.5">
                <MapPin className="h-5 w-5 text-[#365D60] shrink-0" strokeWidth={1.8} />
                <span className="text-xs sm:text-[13px] font-semibold text-[#25313A]">
                  5 Boutiques in Bengaluru
                </span>
              </div>

              {/* Action CTA Buttons */}
              <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4">
                <a
                  href="#outlets-grid"
                  className="inline-flex items-center justify-center gap-2.5 rounded-full bg-[#365D60] px-7 sm:px-8 py-3.5 font-sans text-sm font-semibold tracking-wide text-[#F5EFEB] shadow-sm transition-all duration-300 hover:bg-[#2C4C4F] hover:shadow-md hover:scale-[1.02] active:scale-100"
                >
                  <span>Explore Boutiques</span>
                  <ArrowDown className="h-4 w-4" />
                </a>
                <a
                  href={getWhatsAppUrl(
                    'Hi LaHeaven! Could you help me find the nearest boutique to my location?'
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#365D60] bg-transparent px-7 sm:px-8 py-3.5 font-sans text-sm font-semibold tracking-wide text-[#365D60] transition-all duration-300 hover:bg-[#365D60]/10 hover:scale-[1.02] active:scale-100"
                >
                  <WhatsAppIcon className="h-4 w-4 fill-[#365D60]" />
                  <span>Central Concierge</span>
                </a>
              </div>
            </AnimatedSection>

            {/* ── Right Column: Showcase Boutique Visual with Sage Curved Backdrop matching Hero Reference ── */}
            <AnimatedSection animation="scaleUp" delay={0.12} className="lg:col-span-6 xl:col-span-6 relative flex items-center justify-center lg:justify-end">
              <div className="relative w-full max-w-[580px]">
                {/* Organic Sage Green Backdrop Shape matching Hero Section reference */}
                <div className="pointer-events-none absolute -right-3 sm:-right-5 -top-5 sm:-top-7 h-[105%] w-[88%] rounded-tr-[90px] rounded-bl-[60px] rounded-tl-[30px] rounded-br-[30px] bg-[#B6C69F]/45 transition-transform duration-700" />

                <div className="relative z-10 w-full overflow-hidden rounded-3xl border border-[#DFD7CF] bg-[#FFFFFF] shadow-[0_16px_48px_rgba(37,49,58,0.08)]">
                  <div className="relative aspect-[16/11] w-full overflow-hidden bg-[#EBE5DF]">
                    <img
                      src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=85&auto=format&fit=crop"
                      alt="La Heaven Flagship Boutique in Bengaluru"
                      width={1200}
                      height={825}
                      loading="eager"
                      fetchPriority="high"
                      className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#25313A]/75 via-transparent to-transparent" />

                    {/* Bottom Open Status Strip */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[#F5EFEB]">
                      <div className="flex items-center gap-2">
                        <span className="flex h-2.5 w-2.5 rounded-full bg-[#25D366] ring-4 ring-[#25D366]/30 animate-pulse" />
                        <span className="font-sans text-xs font-bold tracking-wide">
                          5 Boutiques Open Daily
                        </span>
                      </div>
                      <span className="rounded-full bg-[#FFFFFF]/25 px-3 py-1 font-sans text-[11px] font-semibold backdrop-blur-md">
                        10:00 AM – 10:30 PM
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <div id="outlets-grid" className="section-rail pt-8 sm:pt-10">
        {/* ── 2. Minimal Filter & Search Toolbar ── */}
        <div className="flex flex-col gap-4 border-b border-[#DFD7CF] pb-6 sm:flex-row sm:items-center sm:justify-between">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setSelectedArea('ALL')}
              className={`rounded-full px-4 py-2 font-sans text-xs font-bold transition-all ${
                selectedArea === 'ALL'
                  ? 'bg-[#365D60] text-[#F5EFEB] shadow-2xs'
                  : 'border border-[#DFD7CF] bg-[#FFFFFF] text-[#25313A] shadow-2xs hover:border-[#365D60]'
              }`}
            >
              All 5 Boutiques
            </button>
            {outlets.map((outlet) => (
              <button
                key={outlet.id}
                type="button"
                onClick={() => setSelectedArea(outlet.id)}
                className={`rounded-full px-4 py-2 font-sans text-xs font-bold transition-all ${
                  selectedArea === outlet.id
                    ? 'bg-[#365D60] text-[#F5EFEB] shadow-2xs'
                    : 'border border-[#DFD7CF] bg-[#FFFFFF] text-[#25313A] shadow-2xs hover:border-[#365D60]'
                }`}
              >
                {outlet.area}
              </button>
            ))}
          </div>

          {/* Quick Search */}
          <div className="relative w-full sm:w-64">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#6B5E55]" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search area or street..."
              aria-label="Search outlets"
              className="w-full rounded-full border border-[#DFD7CF] bg-[#FFFFFF] py-2 pl-9 pr-4 font-sans text-xs text-[#25313A] placeholder-[#6B5E55] outline-none shadow-2xs transition-colors focus:border-[#365D60] focus:ring-1 focus:ring-[#365D60]"
            />
          </div>
        </div>

        {/* ── 3. High-Contrast Editorial Boutiques Grid ── */}
        <StaggerContainer className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredOutlets.map((outlet, index) => (
            <StaggerItem key={outlet.id}>
              <article
                className="group flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-[#DFD7CF] bg-[#FFFFFF] p-5 shadow-[0_8px_30px_rgba(68,48,38,0.06)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#D0C2B4] hover:shadow-[0_16px_40px_rgba(68,48,38,0.12)]"
              >
              <div>
                {/* Storefront Image */}
                {outlet.image && (
                  <div className="relative mb-5 aspect-[16/10] w-full overflow-hidden rounded-xl bg-[#EBE5DF]">
                    <img
                      src={outlet.image}
                      alt={`${outlet.name} storefront in ${outlet.area}`}
                      className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      loading={index < 3 ? 'eager' : 'lazy'}
                      width={800}
                      height={500}
                    />
                    <div className="absolute left-3 top-3">
                      <span className="rounded-full bg-[#25313A] px-2.5 py-1 font-sans text-[10px] font-bold text-[#F5EFEB] shadow-sm">
                        Boutique 0{index + 1}
                      </span>
                    </div>
                    <div className="absolute right-3 top-3">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#365D60] px-2.5 py-1 font-sans text-[10px] font-bold text-[#F5EFEB] shadow-sm">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#25D366]" />
                        <span>Open 10 AM – 10:30 PM</span>
                      </span>
                    </div>
                  </div>
                )}

                {/* Boutique Header */}
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#25313A]">
                    {outlet.area}
                  </h2>
                  {outlet.landmark && (
                    <p className="mt-1 font-sans text-xs font-semibold text-[#365D60]">
                      Near {outlet.landmark}
                    </p>
                  )}

                  {/* Highlights */}
                  {outlet.highlights && outlet.highlights.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {outlet.highlights.map((h) => (
                        <span
                          key={h}
                          className="rounded-full border border-[#DFD7CF] bg-[#EBE5DF] px-2.5 py-0.5 font-sans text-[10px] font-semibold text-[#25313A]"
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Address, Hours & Phone */}
                  <div className="mt-4 space-y-2.5 border-t border-[#DFD7CF] pt-4 font-sans text-xs text-[#5C4E46]">
                    <p className="flex items-start gap-2">
                      <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#365D60]" />
                      <span className="leading-relaxed font-medium text-[#25313A]">{outlet.address}</span>
                    </p>

                    <p className="flex items-center gap-2">
                      <Clock className="h-3.5 w-3.5 shrink-0 text-[#365D60]" />
                      <span>Mon – Sun: 10:00 AM – 10:30 PM</span>
                    </p>

                    <p className="flex items-center gap-2">
                      <Phone className="h-3.5 w-3.5 shrink-0 text-[#365D60]" />
                      <a
                        href={`tel:${outlet.phone.replace(/[^0-9+]/g, '')}`}
                        className="font-bold text-[#25313A] hover:text-[#365D60] hover:underline"
                      >
                        {outlet.phone}
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 grid grid-cols-2 gap-2 border-t border-[#DFD7CF] pt-4">
                <a
                  href={outlet.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[#365D60] px-3.5 py-2.5 font-sans text-xs font-bold text-[#F5EFEB] shadow-2xs transition-all hover:bg-[#2C4C4F] hover:-translate-y-0.5"
                >
                  <Navigation size={13} />
                  <span>Directions</span>
                  <ArrowUpRight size={13} />
                </a>

                <a
                  href={getWhatsAppUrl(
                    `Hi LaHaven ${outlet.area}! I would like to check cake availability for pickup.`,
                    outlet.whatsapp
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 rounded-full border-2 border-[#25313A] bg-[#FFFFFF] px-3.5 py-2.5 font-sans text-xs font-bold text-[#25313A] shadow-2xs transition-all hover:bg-[#25313A] hover:text-[#F5EFEB] hover:-translate-y-0.5"
                >
                  <WhatsAppIcon className="h-3.5 w-3.5 fill-current" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </article>
          </StaggerItem>
          ))}
        </StaggerContainer>

        {/* ── 4. Central Delivery Concierge Strip ── */}
        <AnimatedSection animation="fadeUp" className="mt-16 rounded-3xl border border-[#DFD7CF] bg-[#FFFFFF] p-8 text-center shadow-[0_8px_30px_rgba(37,49,58,0.06)] sm:p-12">
          <span className="eyebrow inline-flex items-center gap-2 rounded-full bg-[#EBE5DF] px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#365D60] border border-[#DFD7CF]">
            <Truck size={15} />
            <span>Bengaluru Chilled Delivery</span>
          </span>
          <h2 className="mt-3 font-serif text-3xl font-bold text-[#25313A] sm:text-4xl">
            Not sure which counter is closest to you?
          </h2>
          <p className="mx-auto mt-3 max-w-xl font-sans text-xs sm:text-sm leading-relaxed text-[#6B5E55]">
            Share your delivery address or pincode with our central desk. We automatically route your
            cake to the nearest boutique kitchen for 2–4 hour chilled doorstep delivery across Bengaluru.
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
            <a
              href={getWhatsAppUrl(
                'Hi LaHeaven! Could you help me find the closest boutique for delivery to my pincode?'
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#365D60] px-7 py-3.5 font-sans text-xs font-bold uppercase tracking-wider text-[#F5EFEB] shadow-sm transition-all hover:bg-[#2C4C4F] hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
            >
              <WhatsAppIcon className="h-4 w-4 fill-[#F5EFEB]" />
              <span>Ask Central Concierge</span>
            </a>

            <Link
              to="/cakes"
              className="inline-flex items-center gap-1.5 rounded-full border-2 border-[#365D60] bg-transparent px-7 py-3.5 font-sans text-xs font-bold uppercase tracking-wider text-[#365D60] transition-all hover:bg-[#365D60] hover:text-[#F5EFEB]"
            >
              <span>Explore All Cakes</span>
              <ArrowUpRight size={15} />
            </Link>
          </div>

          <span className="mt-4 block font-sans text-xs text-[#6B5E55]">
            Or call our central hotline:{' '}
            <a href={PHONE_TEL} className="font-bold text-[#25313A] underline hover:text-[#365D60]">
              {PHONE_DISPLAY}
            </a>
          </span>
        </AnimatedSection>
      </div>
    </main>
  );
};

export default Outlets;
