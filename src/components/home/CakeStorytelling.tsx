import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, Layers, ShieldCheck, Gift, ArrowRight } from 'lucide-react';
import { FloatingCake } from '@/components/animations/FloatingCake';

interface CraftStep {
  step: string;
  title: string;
  subtitle: string;
  copy: string;
  icon: React.ElementType;
  tag: string;
  cakeImage: string;
}

const CRAFT_STEPS: CraftStep[] = [
  {
    step: '01',
    title: 'Slow-Baked European Sponge',
    subtitle: 'Pure Butter · No Pre-Mixes',
    copy: 'Every tier begins with slow-baked sponge prepared from unbleached flour, pure European churned butter, and whole eggs or dairy buttermilk. Baked in small morning batches to achieve an impossibly tender, melt-in-mouth crumb.',
    icon: Layers,
    tag: 'The Foundation',
    cakeImage: '/images/products/belgian-chocolate-truffle.jpg',
  },
  {
    step: '02',
    title: '54% Belgian Chocolate & Fresh Reductions',
    subtitle: 'Real Cocoa · Whole Fruit Compotes',
    copy: 'We cook our ganache with authentic 54% Belgian dark chocolate callets and fresh dairy cream. Fruit layers use whole berries, Alphonso mangoes, and Madagascar vanilla beans cooked down into thick, natural compotes without artificial syrups.',
    icon: Sparkles,
    tag: 'The Flavour Heart',
    cakeImage: '/images/products/royal-opera-cake.jpg',
  },
  {
    step: '03',
    title: 'Hand-Piped the Morning of Celebration',
    subtitle: 'Artisan Lettering & Wafer Florals',
    copy: 'Your bespoke message is hand-piped on order by our master decorators. From delicate buttercream beadings and caramel pearls to edible gold leaf accents, every finishing flourish is created with patience and dedication.',
    icon: ShieldCheck,
    tag: 'The Artisan Touch',
    cakeImage: '/images/products/heart-shaped-red-velvet.jpg',
  },
  {
    step: '04',
    title: 'Chilled Luxury Unboxing',
    subtitle: 'Temperature-Safe Packaging',
    copy: 'Delivered in our signature slate-blue insulated boutique packaging, secured with custom satin ribbons, matchless golden celebration candles, and a handcrafted wooden cake knife. Ready for the moment the spotlight turns on.',
    icon: Gift,
    tag: 'The Moment',
    cakeImage: '/images/products/ferrero-rocher-cake.jpg',
  },
];

export const CakeStorytelling: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [activeStep, setActiveStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    damping: 25,
    stiffness: 140,
    mass: 0.5,
  });

  // Parallax background values
  const bgY = useTransform(smoothProgress, [0, 1], ['0%', '15%']);
  const cakeRotate = useTransform(smoothProgress, [0, 1], [-2.5, 3]);

  return (
    <section
      ref={containerRef}
      className="relative bg-gradient-to-b from-ivory via-cream to-ivory py-20 lg:py-28 overflow-hidden"
    >
      {/* Ambient background glow */}
      <motion.div
        style={{ y: reduceMotion ? 0 : bgY }}
        className="pointer-events-none absolute -left-20 top-1/4 h-[500px] w-[500px] rounded-full bg-sage/25 blur-3xl"
      />
      <motion.div
        style={{ y: reduceMotion ? 0 : bgY }}
        className="pointer-events-none absolute -right-20 top-2/3 h-[500px] w-[500px] rounded-full bg-terracotta/8 blur-3xl"
      />

      <div className="premium-container relative z-10">
        
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center mb-16 lg:mb-20">
          <div className="section-kicker mb-3">
            <Sparkles className="h-3 w-3 text-terracotta" />
            <span>Artisan Craftsmanship</span>
          </div>
          <h2 className="font-serif text-[2.2rem] font-semibold leading-[1.08] tracking-[-0.015em] text-slate_blue sm:text-[2.7rem] lg:text-[3.2rem]">
            The anatomy of an{' '}
            <span className="italic font-light text-terracotta">unforgettable cake</span>
          </h2>
          <p className="mt-4 font-sans text-sm sm:text-base font-light leading-relaxed text-slate_blue/75">
            Step inside our Bengaluru bakery kitchens. Discover how pure European ingredients, honest confectionery patience, and delicate styling unite in every slice.
          </p>
        </div>

        {/* Storytelling Grid: Sticky Left Visual & Progressive Right Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Sticky Floating Cake Stage */}
          <div className="lg:col-span-6 lg:sticky lg:top-28">
            <div className="relative mx-auto max-w-[460px] lg:max-w-none">
              
              {/* Backing decorative aura */}
              <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-[#F5EFEB] to-[#F5EFEB] border border-[#DFD7CF] shadow-premium p-4 transform -rotate-1 hidden sm:block" />

              {/* Main Floating Cake Showcase */}
              <motion.div
                style={{
                  rotateZ: reduceMotion ? 0 : cakeRotate,
                }}
                className="relative rounded-[2.25rem] border border-[#DFD7CF] bg-[#F5EFEB]/95 p-3 sm:p-5 shadow-premium-lg backdrop-blur-md"
              >
                <FloatingCake
                  src={CRAFT_STEPS[activeStep].cakeImage}
                  alt={CRAFT_STEPS[activeStep].title}
                  floatDistance={10}
                  floatDuration={4.5}
                  enableTilt={true}
                  enableShadow={true}
                  className="w-full"
                  imageClassName="h-[320px] sm:h-[400px] lg:h-[440px] rounded-[1.6rem] object-cover"
                  badge={
                    <div className="top-4 left-4 rounded-full bg-slate_blue/90 px-3 py-1.5 font-sans text-[10px] font-semibold uppercase tracking-wider text-white shadow-soft backdrop-blur-md">
                      {CRAFT_STEPS[activeStep].tag}
                    </div>
                  }
                />

                {/* Caption Bar beneath floating cake */}
                <div className="mt-4 flex items-center justify-between border-t border-slate_blue/10 pt-3 px-2">
                  <div>
                    <span className="font-sans text-[10px] uppercase tracking-wider text-slate_blue/50 font-bold">
                      Craft Stage {CRAFT_STEPS[activeStep].step} / 04
                    </span>
                    <p className="font-serif text-base font-medium text-slate_blue">
                      {CRAFT_STEPS[activeStep].title}
                    </p>
                  </div>
                  <Link
                    to="/custom-cakes"
                    className="inline-flex items-center gap-1 font-sans text-xs font-semibold text-terracotta hover:underline"
                  >
                    <span>Design Yours</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right Column: Progressive Craft Stages */}
          <div className="lg:col-span-6 space-y-6 lg:space-y-8">
            {CRAFT_STEPS.map((step, idx) => {
              const Icon = step.icon;
              const isActive = activeStep === idx;

              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  onViewportEnter={() => setActiveStep(idx)}
                  onClick={() => setActiveStep(idx)}
                  className={`cursor-pointer rounded-3xl p-6 sm:p-8 transition-all duration-500 border ${
                    isActive
                      ? 'bg-[#F5EFEB] border-[#365D60]/30 shadow-premium-lg -translate-y-1'
                      : 'bg-[#F5EFEB]/70 border-[#DFD7CF] hover:bg-[#F5EFEB] hover:border-[#365D60]/20'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <div
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl transition-colors duration-300 ${
                          isActive
                            ? 'bg-slate_blue text-white shadow-soft'
                            : 'bg-sage/50 text-slate_blue'
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <span className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-terracotta">
                          Stage {step.step} · {step.tag}
                        </span>
                        <h3 className="font-serif text-xl sm:text-2xl font-semibold text-slate_blue mt-0.5">
                          {step.title}
                        </h3>
                      </div>
                    </div>

                    <span
                      className={`font-serif text-2xl font-light transition-colors ${
                        isActive ? 'text-terracotta' : 'text-slate_blue/25'
                      }`}
                    >
                      {step.step}
                    </span>
                  </div>

                  <p className="mt-3.5 font-sans text-xs sm:text-[13.5px] font-light leading-relaxed text-slate_blue/75">
                    {step.copy}
                  </p>

                  <div className="mt-4 flex items-center justify-between border-t border-slate_blue/8 pt-3 text-[11px] font-sans text-slate_blue/60">
                    <span className="font-medium text-slate_blue/80">
                      ✨ {step.subtitle}
                    </span>
                    {isActive && (
                      <span className="font-semibold text-terracotta uppercase tracking-wider text-[10px]">
                        Active Layer
                      </span>
                    )}
                  </div>
                </motion.div>
              );
            })}

            {/* Bottom CTA Card */}
            <div className="rounded-3xl border border-line bg-gradient-to-br from-cream to-ivory p-6 sm:p-7 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-soft">
              <div>
                <p className="font-serif text-lg font-semibold text-slate_blue">
                  Planning a special celebration?
                </p>
                <p className="font-sans text-xs font-light text-slate_blue/70 mt-0.5">
                  Share your theme, reference photo or flavour choices with our pastry concierge.
                </p>
              </div>
              <Link
                to="/custom-cakes"
                className="btn-primary shrink-0 w-full sm:w-auto text-center"
              >
                <span>Request Custom Cake</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default CakeStorytelling;

