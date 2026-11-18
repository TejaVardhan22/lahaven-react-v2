import React, { useRef } from 'react';
import { Sparkles, Heart, Leaf, ChefHat, Layers } from 'lucide-react';
import { useGsap } from '@/hooks/useGsap';
import { gsap, isReducedMotion } from '@/utils/gsap';

export const BrandIntroduction: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);

  const PILLARS = [
    {
      icon: Leaf,
      title: '100% Eggless, Always',
      description:
        'Every cake is completely eggless, crafted to deliver the taste, softness and indulgence you deserve.',
    },
    {
      icon: ChefHat,
      title: 'Fresh from Our Live Kitchens',
      description:
        'Every order is freshly prepared at our outlets, bringing you cakes made fresh for your celebrations.',
    },
    {
      icon: Layers,
      title: 'Quality in Every Layer',
      description:
        'Carefully selected ingredients, rich flavours and attention to detail make every bite special.',
    },
    {
      icon: Heart,
      title: 'Made for Your Celebrations',
      description:
        'From birthdays and anniversaries to little everyday joys, we make every occasion sweeter.',
    },
  ];

  useGsap(
    () => {
      if (isReducedMotion()) return;

      // Silky header entrance
      gsap.fromTo(
        '.brand-intro-header',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          clearProps: 'all',
          scrollTrigger: {
            trigger: '.brand-intro-header',
            start: 'top 95%',
            once: true,
          },
        }
      );

      // Smooth staggered entrance for 4 pillar cards
      gsap.fromTo(
        '.brand-pillar-card',
        { y: 25, opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.65,
          stagger: 0.08,
          ease: 'power3.out',
          clearProps: 'all',
          scrollTrigger: {
            trigger: '.brand-pillar-grid',
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
    <section
      ref={containerRef}
      aria-label="Brand Introduction"
      className="bg-[#F5EFEB] py-16 sm:py-24"
    >
      <div className="section-rail">
        <div className="brand-intro-header mx-auto max-w-3xl text-center">
          <span className="eyebrow inline-flex items-center gap-2 rounded-full bg-[#EBE5DF] px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#365D60] border border-[#DFD7CF]">
            <Sparkles className="h-3 w-3 text-[#B6C69F]" />
            <span>OUR CAKE BOUTIQUE STATEMENT</span>
          </span>

          <h2 className="mt-4 font-serif text-[clamp(2.2rem,4vw,3.5rem)] font-normal leading-tight text-[#25313A]">
            A Little More Than a Bakery
          </h2>

          <p className="mt-4 font-sans text-sm font-normal leading-relaxed text-[#6B5E55] sm:text-base max-w-2xl mx-auto">
            At La Heaven, we believe every celebration deserves a cake that's as special as the moment. Since 2017, we've been crafting fresh, premium, 100% eggless cakes with care and attention to every detail. Through our live-kitchen concept, every cake is freshly prepared at our outlets, with no cold storage and no compromise on taste, quality or freshness. Because every celebration deserves a little piece of heaven.
          </p>
        </div>

        <div className="brand-pillar-grid mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="brand-pillar-card group rounded-3xl border border-[#DFD7CF] bg-[#FFFFFF] p-7 shadow-[0_8px_30px_rgba(68,48,38,0.06)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(68,48,38,0.1)] will-change-transform"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#DFD7CF] bg-[#EBE5DF] text-[#365D60] transition-transform duration-300 group-hover:scale-110 group-hover:bg-[#365D60] group-hover:text-[#F5EFEB]">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-serif text-xl font-bold text-[#25313A]">
                  {pillar.title}
                </h3>
                <p className="mt-2 font-sans text-xs font-normal leading-relaxed text-[#6B5E55]">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BrandIntroduction;
