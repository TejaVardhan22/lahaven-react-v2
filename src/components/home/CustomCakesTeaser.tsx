import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Heart, Crown, Cake, PartyPopper } from 'lucide-react';
import { useGsap } from '@/hooks/useGsap';
import { gsap, isReducedMotion } from '@/utils/gsap';

export const CustomCakesTeaser: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);

  const OCCASIONS = [
    { label: 'Wedding Cakes', desc: 'Elegant designs crafted for your special day.', icon: Crown },
    { label: 'Birthday Cakes', desc: 'Fun, creative cakes made to celebrate another year.', icon: PartyPopper },
    { label: 'Anniversary Cakes', desc: 'Beautiful creations for moments worth remembering.', icon: Heart },
    { label: 'Custom Cake Designs', desc: 'Your ideas, your colours, your theme. Made just for you.', icon: Cake },
  ];

  useGsap(
    () => {
      if (isReducedMotion()) return;

      // Staggered reveal for 4 occasion cards
      gsap.fromTo(
        '.custom-occasion-card',
        { y: 15, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.55,
          stagger: 0.06,
          ease: 'power3.out',
          clearProps: 'all',
          scrollTrigger: {
            trigger: '.custom-occasions-grid',
            start: 'top 95%',
            once: true,
          },
        }
      );

      // Subtle depth transition on custom cake photo on desktop
      if (typeof window !== 'undefined' && window.innerWidth >= 1024) {
        gsap.fromTo(
          '.custom-cake-img',
          { scale: 1.03 },
          {
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: '.custom-cake-photo-wrap',
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          }
        );
      }

      // Continuous gentle float for the decorative heart badge (quiet luxury)
      gsap.to('.custom-cake-badge', {
        y: -4,
        rotation: 0.8,
        duration: 3.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    },
    [],
    containerRef
  );

  return (
    <section
      ref={containerRef}
      aria-label="Bespoke Celebration Cakes"
      className="bg-[#EBE5DF] py-16 sm:py-24 overflow-hidden"
    >
      <div className="section-rail">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14">
          {/* ── Left Column: Editorial Copy & 4 Categories ── */}
          <div className="lg:col-span-6">
            <span className="eyebrow inline-flex items-center gap-2 rounded-full bg-[#FFFFFF] px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#365D60] border border-[#DFD7CF]">
              <Sparkles className="h-3 w-3 text-[#B6C69F]" />
              <span>MADE JUST FOR YOUR MOMENT</span>
            </span>

            <h2 className="mt-4 font-serif text-[clamp(2.3rem,4.5vw,3.6rem)] font-normal leading-[1.12] text-[#25313A]">
              Your Celebration.<br />
              Your Cake.<br />
              <span className="text-[#365D60] italic">Your Story.</span>
            </h2>

            <p className="mt-4 font-sans text-sm font-normal leading-relaxed text-[#6B5E55] sm:text-base">
              Every celebration is unique, and your cake should be too. From elegant wedding cakes to playful birthday creations and thoughtful anniversary designs, we bring your ideas to life with freshly crafted, 100% eggless cakes made with care.
            </p>

            <div className="custom-occasions-grid mt-8 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
              {OCCASIONS.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.label}
                    whileHover={{ y: -3, transition: { duration: 0.2 } }}
                    className="custom-occasion-card flex items-start gap-3 rounded-2xl border border-[#DFD7CF] bg-[#FFFFFF] p-4 shadow-2xs transition-all hover:border-[#365D60]"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#EBE5DF] text-[#365D60]">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-serif text-base font-bold text-[#25313A]">
                        {item.label}
                      </h4>
                      <p className="text-[11.5px] font-sans text-[#6B5E55] leading-relaxed mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/custom-cakes"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#365D60] px-8 py-3.5 font-sans text-xs font-semibold uppercase tracking-wider text-[#F5EFEB] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#2C4C4F] hover:shadow-md"
              >
                <span>CREATE YOUR CUSTOM CAKE</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                to="/bento-cakes"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#365D60] bg-[#FFFFFF] px-7 py-3.5 font-sans text-xs font-semibold uppercase tracking-wider text-[#365D60] shadow-2xs transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#EBE5DF]"
              >
                <span>EXPLORE BENTO CAKES</span>
              </Link>
            </div>
          </div>

          {/* ── Right Column: Beautiful Cake Photograph ── */}
          <div className="custom-cake-photo-wrap relative lg:col-span-6">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-[#DFD7CF] bg-[#FFFFFF] shadow-[0_8px_30px_rgba(68,48,38,0.06)]">
              <img
                src="/images/hero/strawberry-heart-desktop.jpg"
                alt="Custom celebratory heart-shaped cake handcrafted at LaHaven"
                loading="lazy"
                width={800}
                height={600}
                className="custom-cake-img h-full w-full object-cover will-change-transform"
              />
              <span className="custom-cake-badge image-sticker border border-[#25313A] bg-[#F5EFEB] text-[#25313A] shadow-md">
                Handcrafted<br />
                Celebrations
                <Heart className="h-4 w-4 fill-[#365D60] text-[#365D60]" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomCakesTeaser;
