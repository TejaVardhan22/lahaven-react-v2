import React from 'react';
import { Link } from 'react-router-dom';
import {
  Heart,
  Leaf,
  Sparkles,
  ArrowUpRight,
  ArrowDown,
  Store,
  MapPin,
  Clock,
  CheckCircle2,
  ChefHat,
  Layers,
  Award,
  ShieldCheck,
  Flame,
} from 'lucide-react';
import { SEOHead } from '@/components/seo/SEOHead';
import { pageSEO } from '@/data/seo';
import { WHATSAPP_URL } from '@/utils/constants';
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/shared/AnimatedSection';

interface Milestone {
  year: string;
  title: string;
  description: string;
  tag: string;
}

const MILESTONES: Milestone[] = [
  {
    year: '2017',
    title: 'The First Oven in Bengaluru',
    description: 'La Heaven was founded with a singular conviction: every family deserves fresh, gourmet 100% eggless cakes without compromising on European patisserie standards.',
    tag: 'Our Genesis',
  },
  {
    year: '2019',
    title: 'Pioneering Live Kitchens',
    description: 'We eliminated warehouse cold storage entirely, introducing transparent live decorating stations inside each boutique so cakes are finished right in front of patrons.',
    tag: 'Live Concept',
  },
  {
    year: '2021',
    title: 'The Korean Bento Revolution',
    description: 'We launched Bengaluru’s favorite 4-inch Bento surprise cakes, packaged in signature takeaway boxes with handwritten buttercream messages.',
    tag: 'Innovation',
  },
  {
    year: 'Today',
    title: '5 Neighbourhood Boutiques',
    description: 'Serving Frazer Town, Malleshwaram, Sahakarnagar, Sanjayanagar, and Yelahanka New Town with over 50,000 celebration cakes baked with love.',
    tag: 'Expanding Citywide',
  },
];

const INGREDIENTS = [
  {
    icon: Sparkles,
    name: '54% Belgian Couverture',
    origin: 'Single-Origin Cocoa',
    description: 'We temper genuine single-origin dark chocolate containing 100% pure cocoa butter — never industrial vegetable fat compound coatings.',
  },
  {
    icon: Heart,
    name: 'Pure Dairy Butter & Cream',
    origin: 'Fresh Daily Dairy',
    description: 'Churned dairy butter and real cream impart a tender, melt-in-the-mouth crumb that synthetic margarine or hydrogenated fats could never achieve.',
  },
  {
    icon: Leaf,
    name: 'Simmered Fruit Compotes',
    origin: 'Natural Orchards',
    description: 'Hand-simmered Ratnagiri Alphonso mangoes, hand-peeled lychees, and tart raspberries cooked down into pure fruit reductions.',
  },
  {
    icon: Award,
    name: 'Madagascar Bourbon Vanilla',
    origin: 'Sun-Cured Pods',
    description: 'Infused with aromatic natural vanilla bean extract that permeates our light sponges with genuine warmth and sweet depth.',
  },
];

const OUTLETS_SUMMARY = [
  { name: 'Frazer Town', area: 'Coles Road, Pulikeshi Nagar', hours: '9:00 AM – 10:00 PM' },
  { name: 'Malleshwaram', area: 'Sampige Road, near 8th Cross', hours: '9:00 AM – 10:00 PM' },
  { name: 'Sahakarnagar', area: 'SM Fresh Mart Building, 60ft Road', hours: '9:00 AM – 10:00 PM' },
  { name: 'Sanjayanagar', area: 'New BEL Road & 80ft Road Junction', hours: '9:00 AM – 10:00 PM' },
  { name: 'Yelahanka New Town', area: 'Major Sandeep Unnikrishnan Road', hours: '9:00 AM – 10:00 PM' },
];

export const About: React.FC = () => {
  return (
    <main className="min-h-screen bg-[#F5EFEB] pb-24">
      <SEOHead
        title={pageSEO.about.title}
        description={pageSEO.about.description}
        canonicalUrl={pageSEO.about.canonicalUrl}
        ogTitle={pageSEO.about.ogTitle}
        ogDescription={pageSEO.about.ogDescription}
        ogImage={pageSEO.about.ogImage}
        twitterCard={pageSEO.about.twitterCard}
      />

      {/* ── 1. Split-Screen Hero Banner Matching Hero Section Reference ── */}
      <section className="relative overflow-hidden bg-[#F5EFEB] pt-8 pb-10 sm:pt-12 sm:pb-14 lg:pt-14 lg:pb-16 border-b border-[#DFD7CF]">
        {/* Ambient atmospheric glows */}
        <div className="pointer-events-none absolute -right-20 -top-20 -z-10 h-[520px] w-[520px] rounded-full bg-[#B6C69F]/25 blur-3xl" />
        <div className="pointer-events-none absolute left-0 bottom-0 -z-10 h-[300px] w-[300px] rounded-full bg-[#365D60]/5 blur-3xl" />

        <div className="premium-container">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-8">
            {/* ── Left Column: Editorial Copy, Badge & CTAs ── */}
            <AnimatedSection animation="fadeUp" className="lg:col-span-6 xl:col-span-6 pt-2 lg:pt-0">
              {/* Small Label */}
              <p className="text-[11px] sm:text-xs font-semibold tracking-[0.22em] uppercase text-[#6B5E55] mb-4">
                A LITTLE MORE THAN A BAKERY
              </p>

              {/* Main Headline */}
              <h1 className="font-serif text-[clamp(2.3rem,4.2vw,3.95rem)] font-normal leading-[1.12] tracking-tight text-[#25313A]">
                <span className="block">Freshness at Heart.</span>
                <span className="block font-serif font-bold text-[#365D60]">
                  Crafted for Celebrations.
                </span>
              </h1>

              {/* Description Body */}
              <p className="mt-4 max-w-lg font-sans text-base sm:text-[17px] font-normal leading-relaxed text-[#6B5E55]">
                At La Heaven, we believe every celebration deserves a cake that&apos;s as special as the moment. Since 2017, we&apos;ve been crafting fresh, premium, 100% eggless cakes with care and attention to every detail.
              </p>

              {/* Secondary Subtext */}
              <p className="mt-3 font-sans text-xs sm:text-sm font-semibold text-[#365D60] leading-relaxed">
                Through our live-kitchen concept, every cake is freshly prepared at our outlets, with no cold storage and no compromise on taste, quality or freshness. Because every celebration deserves a little piece of heaven.
              </p>

              {/* Clean Badge */}
              <div className="mt-6 flex items-center gap-2.5">
                <MapPin className="h-5 w-5 text-[#365D60] shrink-0" strokeWidth={1.8} />
                <span className="text-xs sm:text-[13px] font-semibold text-[#25313A]">
                  5 Live-Kitchen Boutiques in Bengaluru • 100% Eggless
                </span>
              </div>

              {/* Action CTA Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#story-chapters"
                  className="inline-flex items-center justify-center gap-2.5 rounded-full bg-[#365D60] px-7 sm:px-8 py-3.5 font-sans text-sm font-semibold tracking-wide text-[#F5EFEB] shadow-sm transition-all duration-300 hover:bg-[#2C4C4F] hover:shadow-md hover:scale-[1.02] active:scale-100"
                >
                  <span>Explore Our Story</span>
                  <ArrowDown className="h-4 w-4" />
                </a>
                <Link
                  to="/outlets"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#365D60] bg-transparent px-7 sm:px-8 py-3.5 font-sans text-sm font-semibold tracking-wide text-[#365D60] transition-all duration-300 hover:bg-[#365D60]/10 hover:scale-[1.02] active:scale-100"
                >
                  <span>Visit Our Boutiques</span>
                </Link>
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
                      src="/images/hero/hero-cake-showcase.jpg"
                      alt="Artisan cake crafting at La Heaven studio in Bengaluru"
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
                          Live Kitchen Crafting
                        </span>
                      </div>
                      <span className="rounded-full bg-[#FFFFFF]/25 px-3 py-1 font-sans text-[11px] font-semibold backdrop-blur-md">
                        Since 2017
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── 2. The Four Pillars Band ── */}
      <section className="border-b border-[#DFD7CF] bg-[#FFFFFF] py-12">
        <div className="premium-container">
          <StaggerContainer className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Pillar 1 */}
            <StaggerItem className="flex flex-col rounded-2xl border border-[#DFD7CF] bg-[#F5EFEB]/50 p-6 transition-all duration-300 hover:border-[#365D60]/40 hover:bg-[#FFFFFF] hover:shadow-sm">
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#365D60] text-[#F5EFEB]">
                <Leaf className="h-5 w-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#25313A]">
                100% Eggless, Always
              </h3>
              <p className="mt-2 font-sans text-xs sm:text-[13px] leading-relaxed text-[#6B5E55]">
                Every cake is completely eggless, crafted to deliver the taste, softness, and indulgence you deserve.
              </p>
            </StaggerItem>

            {/* Pillar 2 */}
            <StaggerItem className="flex flex-col rounded-2xl border border-[#DFD7CF] bg-[#F5EFEB]/50 p-6 transition-all duration-300 hover:border-[#365D60]/40 hover:bg-[#FFFFFF] hover:shadow-sm">
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#365D60] text-[#F5EFEB]">
                <ChefHat className="h-5 w-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#25313A]">
                Fresh from Live Kitchens
              </h3>
              <p className="mt-2 font-sans text-xs sm:text-[13px] leading-relaxed text-[#6B5E55]">
                Every order is freshly prepared at our boutiques, bringing you cakes made fresh for your celebrations.
              </p>
            </StaggerItem>

            {/* Pillar 3 */}
            <StaggerItem className="flex flex-col rounded-2xl border border-[#DFD7CF] bg-[#F5EFEB]/50 p-6 transition-all duration-300 hover:border-[#365D60]/40 hover:bg-[#FFFFFF] hover:shadow-sm">
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#365D60] text-[#F5EFEB]">
                <Layers className="h-5 w-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#25313A]">
                Quality in Every Layer
              </h3>
              <p className="mt-2 font-sans text-xs sm:text-[13px] leading-relaxed text-[#6B5E55]">
                Carefully selected ingredients, rich flavours, and meticulous attention to detail make every bite special.
              </p>
            </StaggerItem>

            {/* Pillar 4 */}
            <StaggerItem className="flex flex-col rounded-2xl border border-[#DFD7CF] bg-[#F5EFEB]/50 p-6 transition-all duration-300 hover:border-[#365D60]/40 hover:bg-[#FFFFFF] hover:shadow-sm">
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#365D60] text-[#F5EFEB]">
                <Heart className="h-5 w-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#25313A]">
                Made for Celebrations
              </h3>
              <p className="mt-2 font-sans text-xs sm:text-[13px] leading-relaxed text-[#6B5E55]">
                From birthdays and anniversaries to little everyday joys, we make every occasion sweeter.
              </p>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* ── 3. Chapter 01: The Live-Kitchen Story ── */}
      <section id="story-chapters" className="py-16 sm:py-24">
        <div className="premium-container">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14">
            {/* Visual Column */}
            <AnimatedSection animation="slideRight" className="lg:col-span-6 relative">
              <div className="relative mx-auto max-w-[520px]">
                {/* Sage accent offset card */}
                <div className="absolute -left-4 -bottom-4 h-full w-full rounded-3xl bg-[#B6C69F]/35" />
                
                <div className="relative z-10 overflow-hidden rounded-3xl border border-[#DFD7CF] bg-[#FFFFFF] shadow-[0_12px_40px_rgba(37,49,58,0.08)]">
                  <img
                    src="/images/hero/mango-raspberry-desktop.jpg"
                    alt="Pastry chef hand-finishing a celebration cake in La Heaven live kitchen"
                    width={800}
                    height={800}
                    className="aspect-square w-full object-cover transition-transform duration-700 hover:scale-105"
                    loading="lazy"
                  />
                  {/* Floating Highlight Sticker */}
                  <div className="absolute bottom-5 right-5 rounded-2xl border border-[#F5EFEB]/20 bg-[#25313A]/90 p-4 text-[#F5EFEB] shadow-xl backdrop-blur-md max-w-[220px]">
                    <div className="flex items-center gap-1.5 text-[#B6C69F] mb-1">
                      <Flame className="h-4 w-4" />
                      <span className="font-sans text-[11px] font-bold uppercase tracking-wider">Live Kitchen</span>
                    </div>
                    <p className="font-serif text-xs leading-snug">
                      No cold storage. Finished fresh for your moment.
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Narrative Column */}
            <AnimatedSection animation="slideLeft" delay={0.1} className="lg:col-span-6">
              <span className="eyebrow inline-flex items-center gap-2 rounded-full bg-[#EBE5DF] px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#365D60] border border-[#DFD7CF]">
                <span>CHAPTER 01 • OUR GENESIS</span>
              </span>

              <h2 className="mt-4 font-serif text-[clamp(2.1rem,3.6vw,3.2rem)] font-normal leading-tight text-[#25313A]">
                Where the Art of Baking Happens in Front of You.
              </h2>

              <p className="mt-5 font-sans text-base leading-relaxed text-[#6B5E55]">
                La Heaven began with a simple belief: <strong className="text-[#25313A]">every celebration deserves a freshly made cake.</strong> For years, commercial bakeries relied on warehouse cold storage and premixes, asking customers to compromise on freshness.
              </p>

              <p className="mt-4 font-sans text-base leading-relaxed text-[#6B5E55]">
                We brought the art of baking closer to our customers through our <strong className="text-[#365D60]">live-kitchen concept</strong>, where every cake is freshly crafted by our skilled pastry chefs right at our boutiques.
              </p>

              <p className="mt-4 font-sans text-base leading-relaxed text-[#6B5E55]">
                Today, across our boutiques, we continue to create premium 100% eggless cakes, desserts and customised creations with quality ingredients, attention to detail and a whole lot of love. From everyday little joys to life&apos;s biggest milestones, every creation is made to make your moments sweeter.
              </p>

              {/* 3 Core Checklist items */}
              <div className="mt-6 space-y-3.5 border-t border-[#DFD7CF] pt-6">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[#365D60] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-sans text-sm font-bold text-[#25313A]">
                      100% Eggless Creations
                    </h4>
                    <p className="font-sans text-xs text-[#6B5E55]">
                      Every cake is thoughtfully crafted without eggs, without compromising on taste, velvet texture or sponge lift.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[#365D60] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-sans text-sm font-bold text-[#25313A]">
                      Freshly Made, Every Day
                    </h4>
                    <p className="font-sans text-xs text-[#6B5E55]">
                      Our live kitchens bring freshly crafted cakes closer to your celebrations — with zero cold storage shortcuts.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[#365D60] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-sans text-sm font-bold text-[#25313A]">
                      Made for Every Occasion
                    </h4>
                    <p className="font-sans text-xs text-[#6B5E55]">
                      From birthdays and anniversaries to little surprises, there&apos;s something special for every moment.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Link
                  to="/cakes"
                  className="inline-flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-wider text-[#365D60] transition-colors hover:text-[#25313A]"
                >
                  <span>Explore Our Cake Collection</span>
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── 4. Chapter 02: Honest Ingredients Showcase ── */}
      <section className="bg-[#FFFFFF] py-16 sm:py-24 border-y border-[#DFD7CF]">
        <div className="premium-container">
          <AnimatedSection animation="fadeUp" className="mx-auto max-w-2xl text-center">
            <span className="eyebrow inline-flex items-center gap-2 rounded-full bg-[#EBE5DF] px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#365D60] border border-[#DFD7CF]">
              <span>CHAPTER 02 • OUR PANTRY</span>
            </span>

            <h2 className="mt-3 font-serif text-[clamp(2.1rem,3.8vw,3.2rem)] font-normal leading-tight text-[#25313A]">
              All the Good. Zero Compromise.
            </h2>

            <p className="mt-3 font-sans text-sm text-[#6B5E55]">
              We believe pure flavor begins with honest craftsmanship. We never use artificial vegetable fat coatings, stale premixes, or synthetic fillers.
            </p>
          </AnimatedSection>

          <StaggerContainer className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {INGREDIENTS.map((item) => {
              const Icon = item.icon;
              return (
                <StaggerItem
                  key={item.name}
                  className="group relative flex flex-col justify-between rounded-3xl border border-[#DFD7CF] bg-[#F5EFEB]/50 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#365D60] hover:bg-[#FFFFFF] hover:shadow-[0_12px_30px_rgba(37,49,58,0.08)]"
                >
                  <div>
                    <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#365D60] text-[#F5EFEB] shadow-sm transition-transform duration-300 group-hover:scale-110">
                      <Icon className="h-6 w-6" />
                    </div>

                    <span className="block font-sans text-[11px] font-bold uppercase tracking-wider text-[#B6C69F]">
                      {item.origin}
                    </span>

                    <h3 className="mt-1 font-serif text-xl font-bold text-[#25313A]">
                      {item.name}
                    </h3>

                    <p className="mt-3 font-sans text-xs leading-relaxed text-[#6B5E55]">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-6 border-t border-[#DFD7CF]/70 pt-3">
                    <span className="font-sans text-[11px] font-semibold text-[#365D60]">
                      100% Pure &amp; Scratch-Made
                    </span>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* ── 5. Chapter 03: The Milestones Timeline ── */}
      <section className="py-16 sm:py-24">
        <div className="premium-container">
          <AnimatedSection animation="fadeUp" className="mx-auto max-w-2xl text-center">
            <span className="eyebrow inline-flex items-center gap-2 rounded-full bg-[#EBE5DF] px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#365D60] border border-[#DFD7CF]">
              <span>CHAPTER 03 • OUR JOURNEY</span>
            </span>

            <h2 className="mt-3 font-serif text-[clamp(2.1rem,3.8vw,3.2rem)] font-normal leading-tight text-[#25313A]">
              Crafting Celebrations Since 2017.
            </h2>

            <p className="mt-3 font-sans text-sm text-[#6B5E55]">
              From a single artisan kitchen in Bengaluru to 5 thriving neighbourhood boutiques.
            </p>
          </AnimatedSection>

          <StaggerContainer className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {MILESTONES.map((milestone) => (
              <StaggerItem
                key={milestone.year}
                className="relative flex flex-col justify-between rounded-3xl border border-[#DFD7CF] bg-[#FFFFFF] p-7 shadow-[0_8px_24px_rgba(37,49,58,0.05)] transition-all duration-300 hover:border-[#365D60] hover:shadow-[0_16px_36px_rgba(37,49,58,0.1)]"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-serif text-3xl font-bold text-[#365D60]">
                      {milestone.year}
                    </span>
                    <span className="rounded-full bg-[#EBE5DF] px-3 py-1 font-sans text-[11px] font-semibold text-[#6B5E55]">
                      {milestone.tag}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-[#25313A]">
                    {milestone.title}
                  </h3>

                  <p className="mt-2.5 font-sans text-xs leading-relaxed text-[#6B5E55]">
                    {milestone.description}
                  </p>
                </div>

                <div className="mt-6 flex items-center gap-2 border-t border-[#DFD7CF] pt-3 text-[11px] font-bold text-[#365D60]">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Verified Milestone</span>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── 6. Full-Width Founder Statement Card ── */}
      <section className="bg-[#25313A] py-16 sm:py-20 text-[#F5EFEB] relative overflow-hidden">
        {/* Soft atmospheric gradient */}
        <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-[#365D60]/20 blur-3xl" />
        <div className="pointer-events-none absolute left-0 bottom-0 h-96 w-96 rounded-full bg-[#B6C69F]/10 blur-3xl" />

        <AnimatedSection animation="fadeUp" className="premium-container relative z-10 text-center">
          <span className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-[#B6C69F]">
            OUR STATEMENT
          </span>

          <blockquote className="mx-auto mt-6 max-w-3xl font-serif text-[clamp(1.8rem,3.4vw,2.8rem)] font-normal leading-snug text-[#F5EFEB]">
            &ldquo;Because every celebration deserves a little piece of heaven.&rdquo;
          </blockquote>

          <p className="mx-auto mt-6 max-w-xl font-sans text-sm leading-relaxed text-[#F5EFEB]/80">
            From the warmth of our ovens to the smiles across your dining table, we craft every cake to make your milestones unforgettable.
          </p>

          <div className="mt-8 flex items-center justify-center gap-3">
            <span className="font-serif italic text-lg text-[#B6C69F]">
              La Heaven Patisserie &bull; Bengaluru
            </span>
          </div>
        </AnimatedSection>
      </section>

      {/* ── 7. Our 5 Bengaluru Outlets Showcase ── */}
      <section className="py-16 sm:py-24">
        <div className="premium-container">
          <AnimatedSection animation="fadeUp" className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
            <div>
              <span className="eyebrow inline-flex items-center gap-2 rounded-full bg-[#EBE5DF] px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#365D60] border border-[#DFD7CF]">
                <Store className="h-3.5 w-3.5 text-[#365D60]" />
                <span>OUR 5 PHYSICAL BOUTIQUES</span>
              </span>

              <h2 className="mt-3 font-serif text-[clamp(2.1rem,3.8vw,3.2rem)] font-normal leading-tight text-[#25313A]">
                Fresh Morning Bakes Waiting for You.
              </h2>
            </div>

            <Link
              to="/outlets"
              className="inline-flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-wider text-[#365D60] hover:text-[#25313A] transition-colors"
            >
              <span>View All Store Maps &amp; Timings</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {OUTLETS_SUMMARY.map((outlet) => (
              <StaggerItem
                key={outlet.name}
                className="flex flex-col justify-between rounded-2xl border border-[#DFD7CF] bg-[#FFFFFF] p-5 shadow-2xs transition-all duration-300 hover:border-[#365D60] hover:shadow-md"
              >
                <div>
                  <div className="flex items-center gap-2 text-[#365D60] mb-2">
                    <MapPin className="h-4 w-4" />
                    <span className="font-sans text-xs font-bold">Bengaluru</span>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#25313A]">
                    {outlet.name}
                  </h3>
                  <p className="mt-1 font-sans text-xs text-[#6B5E55] line-clamp-2">
                    {outlet.area}
                  </p>
                </div>

                <div className="mt-4 border-t border-[#DFD7CF]/60 pt-3">
                  <div className="flex items-center gap-1.5 text-[11px] text-[#6B5E55]">
                    <Clock className="h-3 w-3 text-[#365D60]" />
                    <span>{outlet.hours}</span>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── 8. Call to Action Banner ── */}
      <section className="premium-container pb-8">
        <AnimatedSection animation="scaleUp" className="rounded-3xl border border-[#DFD7CF] bg-gradient-to-r from-[#FFFFFF] via-[#F5EFEB] to-[#FFFFFF] p-8 sm:p-12 text-center shadow-[0_12px_40px_rgba(37,49,58,0.06)]">
          <span className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-[#365D60]">
            CELEBRATION STARTS HERE!
          </span>

          <h2 className="mt-2 font-serif text-[clamp(2.2rem,4vw,3.2rem)] font-normal text-[#25313A]">
            Ready to Taste the Difference?
          </h2>

          <p className="mx-auto mt-3 max-w-lg font-sans text-sm text-[#6B5E55]">
            Experience our 100% eggless European bakes freshly prepared in our live kitchens. Order online or visit any of our 5 Bengaluru boutiques.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#365D60] px-8 py-3.5 font-sans text-xs font-semibold uppercase tracking-wider text-[#F5EFEB] shadow-sm transition-all duration-300 hover:bg-[#2C4C4F] hover:shadow-md hover:scale-[1.02] active:scale-100"
            >
              <span>Order on WhatsApp</span>
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <Link
              to="/cakes"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#365D60] bg-transparent px-8 py-3.5 font-sans text-xs font-semibold uppercase tracking-wider text-[#365D60] transition-all duration-300 hover:bg-[#365D60]/10 hover:scale-[1.02] active:scale-100"
            >
              <span>Explore Cakes Menu</span>
            </Link>
          </div>
        </AnimatedSection>
      </section>
    </main>
  );
};

export default About;
