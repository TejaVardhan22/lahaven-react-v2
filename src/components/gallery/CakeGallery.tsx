import React from 'react';
import { Instagram, ArrowUpRight, Play, Film, CheckCircle2 } from 'lucide-react';
import { INSTAGRAM_URL } from '@/utils/constants';
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/shared/AnimatedSection';

export interface InstagramReelCard {
  id: string;
  permalink: string;
  thumbnail: string;
  caption: string;
  views: string;
  likes: string;
  duration: string;
}

/**
 * Curated Instagram Reels showcase.
 * Tapping any card opens that reel or your Instagram page directly on Instagram.
 */
export const INSTAGRAM_REELS: InstagramReelCard[] = [
  {
    id: 'reel-1',
    permalink: `${INSTAGRAM_URL}reels/`,
    thumbnail: '/images/hero/hero-cake-showcase.jpg',
    caption: 'Satisfying Belgian dark chocolate drip finish in our live kitchen ✨ 100% eggless perfection.',
    views: '124.6K',
    likes: '8.4K',
    duration: '0:28',
  },
  {
    id: 'reel-2',
    permalink: `${INSTAGRAM_URL}reels/`,
    thumbnail: '/images/hero/strawberry-heart-desktop.jpg',
    caption: 'Packing our Korean Bento surprise cake with custom lettering and velvet ribbon 🎀',
    views: '98.2K',
    likes: '6.7K',
    duration: '0:35',
  },
  {
    id: 'reel-3',
    permalink: `${INSTAGRAM_URL}reels/`,
    thumbnail: '/images/hero/lychee-gateau-desktop.jpg',
    caption: 'Behind the scenes: Handcrafting a 3-tier floral celebration cake for a Bengaluru wedding 🎂',
    views: '156.1K',
    likes: '11.2K',
    duration: '0:42',
  },
  {
    id: 'reel-4',
    permalink: `${INSTAGRAM_URL}reels/`,
    thumbnail: '/images/hero/belgian-truffle-desktop.jpg',
    caption: 'Pure couverture truffle smoothing on the turntable. No cold storage, freshly baked daily.',
    views: '84.9K',
    likes: '5.9K',
    duration: '0:22',
  },
];

export const CakeGallery: React.FC = () => {
  return (
    <section aria-label="La Heaven Instagram Reels" className="bg-[#F5EFEB] py-16 sm:py-24 border-t border-[#DFD7CF]">
      <div className="section-rail">
        {/* ── Section Header ── */}
        <AnimatedSection className="mx-auto max-w-2xl text-center" animation="fadeUp">
          <span className="eyebrow inline-flex items-center gap-2 rounded-full bg-[#EBE5DF] px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#365D60] border border-[#DFD7CF]">
            <Film className="h-3.5 w-3.5 text-[#365D60]" />
            <span>ON INSTAGRAM @LAHEAVENCAKES_</span>
          </span>

          <h2 className="mt-3 font-serif text-[clamp(2.2rem,4vw,3.3rem)] font-normal leading-tight text-[#25313A]">
            Fresh Bakes in Motion.
          </h2>

          <p className="mt-2 font-sans text-xs font-normal text-[#6B5E55] sm:text-sm">
            Go behind the scenes in our live kitchens. Tap any reel to watch on Instagram @laheavencakes_
          </p>
        </AnimatedSection>

        {/* ── Reels Grid (9:16 Portrait Aspect) ── */}
        <StaggerContainer className="mt-12 flex gap-4 overflow-x-auto snap-x no-scrollbar pb-4 sm:grid sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {INSTAGRAM_REELS.map((reel) => (
            <StaggerItem key={reel.id}>
              <a
                href={reel.permalink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Watch Instagram Reel: ${reel.caption}`}
                className="group relative block aspect-[9/16] w-[260px] shrink-0 snap-center overflow-hidden rounded-[24px] border border-[#DFD7CF] bg-[#25313A] shadow-[0_10px_30px_rgba(37,49,58,0.08)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(37,49,58,0.2)] hover:border-[#365D60] sm:w-auto"
              >
              {/* Thumbnail Image */}
              <img
                src={reel.thumbnail}
                alt={reel.caption}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                loading="lazy"
                width={600}
                height={1066}
              />

              {/* Dark Gradient Scrim */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#25313A] via-[#25313A]/30 to-[#25313A]/60 opacity-90 transition-opacity duration-300 group-hover:opacity-95" />

              {/* Top Bar: Reel Badge & Views */}
              <div className="absolute left-3.5 right-3.5 top-3.5 flex items-center justify-between text-[#F5EFEB]">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#25313A]/80 px-2.5 py-1 font-sans text-[11px] font-semibold backdrop-blur-md border border-[#F5EFEB]/15">
                  <Instagram className="h-3 w-3 text-[#B6C69F]" />
                  <span>Reel</span>
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-[#25313A]/80 px-2.5 py-1 font-sans text-[11px] font-semibold backdrop-blur-md border border-[#F5EFEB]/15 text-[#F5EFEB]">
                  <Play className="h-2.5 w-2.5 fill-current text-[#B6C69F]" />
                  <span>{reel.views}</span>
                </span>
              </div>

              {/* Center Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#F5EFEB]/90 text-[#365D60] shadow-2xl backdrop-blur-md transition-all duration-300 group-hover:scale-115 group-hover:bg-[#365D60] group-hover:text-[#F5EFEB]">
                  <Play className="h-6 w-6 fill-current ml-0.5" />
                </div>
              </div>

              {/* Duration Badge */}
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="rounded-md bg-[#25313A]/80 px-2 py-0.5 font-sans text-[10px] font-medium text-[#F5EFEB] backdrop-blur-sm">
                  {reel.duration}
                </span>
              </div>

              {/* Bottom Card Content */}
              <div className="absolute bottom-0 left-0 right-0 p-4 text-[#F5EFEB]">
                {/* Profile Pill */}
                <div className="flex items-center gap-1.5 mb-2">
                  <div className="h-5 w-5 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] p-[1.5px] flex items-center justify-center">
                    <div className="h-full w-full rounded-full bg-[#25313A] flex items-center justify-center overflow-hidden">
                      <img src="/images/logo-transparent.png" alt="" className="h-3 w-3 object-contain invert brightness-200" />
                    </div>
                  </div>
                  <span className="font-sans text-[11px] font-bold text-[#B6C69F]">
                    @laheavencakes_
                  </span>
                  <CheckCircle2 className="h-3 w-3 text-[#B6C69F] fill-[#365D60]" />
                </div>

                {/* Caption */}
                <p className="line-clamp-2 font-serif text-[13px] leading-snug text-[#F5EFEB] group-hover:text-[#FFFFFF]">
                  {reel.caption}
                </p>

                {/* Watch Reel CTA */}
                <div className="mt-3 flex items-center justify-between border-t border-[#F5EFEB]/15 pt-2.5 font-sans text-[11px]">
                  <span className="text-[#F5EFEB]/70">{reel.likes} likes</span>
                  <span className="font-semibold text-[#B6C69F] flex items-center gap-1 group-hover:underline">
                    Watch Reel <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </div>
            </a>
          </StaggerItem>
          ))}
        </StaggerContainer>

        {/* ── Section Footer CTA ── */}
        <AnimatedSection className="mt-12 text-center" animation="fadeUp" delay={0.1}>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2 rounded-full border border-[#365D60] bg-[#FFFFFF] px-8 py-3.5 font-sans text-xs font-semibold uppercase tracking-wider text-[#365D60] shadow-2xs transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#365D60] hover:text-[#F5EFEB] hover:shadow-md active:translate-y-0"
          >
            <Instagram className="h-4 w-4" />
            <span>Follow @laheavencakes_ on Instagram</span>
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <p className="mt-2.5 font-sans text-xs text-[#6B5E55]">
            Tag us with <span className="font-semibold text-[#365D60]">#LaHeavenCakes</span> to get featured on our page
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default CakeGallery;
