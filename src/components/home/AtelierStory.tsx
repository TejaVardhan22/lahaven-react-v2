import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, CheckCircle2, Leaf } from 'lucide-react';
import { useGsap } from '@/hooks/useGsap';
import { gsap, isReducedMotion } from '@/utils/gsap';

export const AtelierStory: React.FC = () => {
  const storyRef = useRef<HTMLElement>(null);

  useGsap(
    () => {
      if (isReducedMotion()) return;

      // Subtle depth parallax on desktop only
      if (typeof window !== 'undefined' && window.innerWidth >= 1024) {
        gsap.fromTo(
          '.story-parallax-img',
          { yPercent: -3, scale: 1.03 },
          {
            yPercent: 3,
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: storyRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          }
        );
      }

      // Continuous gentle breathing sticker badge (no aggressive rotation)
      gsap.to('.story-sticker', {
        y: -4,
        rotation: -1,
        duration: 3.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // Staggered checkmarks reveal with auto-cleanup (once: true)
      gsap.fromTo(
        '.story-check-item',
        { x: 12, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power3.out',
          clearProps: 'all',
          scrollTrigger: {
            trigger: '.story-check-list',
            start: 'top 95%',
            once: true,
          },
        }
      );
    },
    [],
    storyRef
  );

  return (
    <section
      ref={storyRef}
      aria-label="About LaHaven Bakery"
      className="story-section bg-[#F5EFEB] overflow-hidden"
    >
      {/* ── Left: Large Bakery Image with Organic Sticker & Sage Accent ── */}
      <div className="story-image relative overflow-hidden rounded-3xl border border-[#DFD7CF] bg-[#FFFFFF] shadow-[0_8px_30px_rgba(68,48,38,0.06)]">
        <div className="relative h-full min-h-[380px] sm:min-h-[480px] w-full overflow-hidden">
          <img
            src="/images/hero/lychee-gateau-desktop.jpg"
            alt="Artisan cake decorator preparing fresh gateau at LaHaven"
            loading="lazy"
            width={1024}
            height={768}
            className="story-parallax-img h-full w-full object-cover will-change-transform"
          />
        </div>
        <span className="story-sticker image-sticker border border-[#25313A] bg-[#F5EFEB] text-[#25313A] shadow-md">
          Made with<br />
          a little love
          <Heart className="h-4 w-4 fill-[#365D60] text-[#365D60]" />
        </span>
      </div>

      {/* ── Right: Editorial Story Copy ── */}
      <div className="story-copy flex flex-col justify-center px-4 sm:px-8">
        <div className="inline-flex items-center gap-2 rounded-full bg-[#EBE5DF] px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#365D60] border border-[#DFD7CF] w-fit">
          <Leaf className="h-3 w-3 text-[#365D60]" />
          <span>OUR CRAFT &amp; PHILOSOPHY</span>
        </div>

        <h2 className="mt-4 font-serif text-[clamp(2.2rem,4vw,3.2rem)] font-normal leading-[1.12] text-[#25313A]">
          Freshness at Heart.<br />
          <span className="text-[#365D60] italic">Crafted for Celebrations.</span>
        </h2>

        <p className="mt-4 font-sans text-sm font-normal leading-relaxed text-[#6B5E55] sm:text-base">
          La Heaven began with a simple belief: every celebration deserves a freshly made cake. We brought the art of baking closer to our customers through our live-kitchen concept, where every cake is freshly crafted by our skilled bakers.
        </p>

        <p className="mt-3 font-sans text-sm font-normal leading-relaxed text-[#6B5E55] sm:text-base">
          Today, across our boutiques, we continue to create premium 100% eggless cakes, desserts and customised creations with quality ingredients, attention to detail and a whole lot of love. From everyday little joys to life's biggest milestones, every creation is made to make your moments sweeter.
        </p>

        <div className="story-check-list mt-6 space-y-3.5 font-sans text-xs text-[#25313A] sm:text-sm">
          <div className="story-check-item flex items-start gap-3">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#EBE5DF] text-[#365D60] mt-0.5">
              <CheckCircle2 className="h-4 w-4" />
            </span>
            <span><strong>100% Eggless Creations:</strong> Every cake is thoughtfully crafted without eggs, without compromising on taste or texture.</span>
          </div>
          <div className="story-check-item flex items-start gap-3">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#EBE5DF] text-[#365D60] mt-0.5">
              <CheckCircle2 className="h-4 w-4" />
            </span>
            <span><strong>Freshly Made, Every Day:</strong> Our live kitchens bring freshly crafted cakes closer to your celebrations.</span>
          </div>
          <div className="story-check-item flex items-start gap-3">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#EBE5DF] text-[#365D60] mt-0.5">
              <CheckCircle2 className="h-4 w-4" />
            </span>
            <span><strong>Made for Every Occasion:</strong> From birthdays and anniversaries to little surprises, there's something special for every moment.</span>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link
            to="/our-story"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#365D60] px-7 py-3.5 font-sans text-xs font-semibold uppercase tracking-wider text-[#F5EFEB] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#2C4C4F] hover:shadow-md active:translate-y-0"
          >
            <span>Explore Our Story</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <Link
            to="/outlets"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[#365D60] bg-[#FFFFFF] px-6 py-3.5 font-sans text-xs font-semibold uppercase tracking-wider text-[#365D60] shadow-2xs transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#EBE5DF] active:translate-y-0"
          >
            <span>Visit 5 Boutiques</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AtelierStory;
