import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Sparkles, ArrowRight } from 'lucide-react';

export const BentoSection: React.FC = () => {
  return (
    <section className="bg-[#F5EFEB] py-14 sm:py-20" aria-label="Bento Cakes Collection">
      <div className="section-rail">
        <div className="mb-12 text-center lg:mb-14">
          <span className="eyebrow inline-flex items-center gap-2 rounded-full bg-[#EBE5DF] px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#365D60] border border-[#DFD7CF]">
            <Heart className="h-3 w-3 fill-[#365D60] text-[#365D60]" />
            <span>Tiny Delights</span>
          </span>
          <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight text-[#25313A] sm:text-4xl">
            Little Cakes. Big Love.
          </h2>
          <p className="mx-auto mt-2 max-w-xl font-sans text-xs font-normal leading-relaxed text-[#6B5E55] sm:text-sm">
            Small in size, full of sweetness. Discover our adorable 4-inch bento cakes, perfect for intimate celebrations, thoughtful surprises, and personal milestones.
          </p>
        </div>

        {/* Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 lg:gap-6">
          {/* Item 1: Large Featured Minimal Bento (Span 7 cols) */}
          <Link
            to="/cakes/heart-shaped-chocolate-bento"
            className="group flex flex-col justify-between rounded-3xl border border-[#DFD7CF] bg-[#FFFFFF] p-6 shadow-[0_8px_30px_rgba(68,48,38,0.06)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(68,48,38,0.1)] sm:p-8 md:col-span-7"
          >
            <div>
              <div className="mb-4 flex items-center justify-between">
                <span className="font-sans text-[11px] uppercase tracking-wider font-semibold text-[#365D60] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#B6C69F]" /> Most Loved
                </span>
                <span className="px-3 py-1 bg-[#EBE5DF] text-[#365D60] border border-[#DFD7CF] text-xs rounded-full font-medium tracking-wide">
                  Single Portion 4&quot;
                </span>
              </div>

              <div className="relative aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden bg-[#EBE5DF] mb-5">
                <img
                  src="/images/products/heart-shaped-chocolate.jpg"
                  alt="Heart Shaped Chocolate Truffle Bento Cake by LaHaven"
                  className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-300 ease-out"
                  loading="lazy"
                  width={1000}
                  height={600}
                />
              </div>

              <div>
                <div className="flex items-baseline justify-between">
                  <h3 className="font-serif text-2xl font-bold text-[#25313A] group-hover:text-[#365D60] transition-colors sm:text-3xl">
                    Minimalist Chocolate Bento
                  </h3>
                  <span className="text-[#365D60] text-sm font-semibold">Starting from ₹399</span>
                </div>
                <p className="font-sans text-sm text-[#6B5E55] mt-2 font-normal leading-relaxed">
                  Korean-inspired aesthetic with delicate pastel lettering, smooth buttercream piping, and your personalized sweet note.
                </p>
              </div>
            </div>
          </Link>

          {/* Item 2: Birthday Bento (Span 5 cols) */}
          <Link
            to="/cakes/heart-shaped-red-velvet-bento"
            className="group flex flex-col justify-between rounded-3xl border border-[#DFD7CF] bg-[#FFFFFF] p-6 shadow-[0_8px_30px_rgba(68,48,38,0.06)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(68,48,38,0.1)] md:col-span-5"
          >
            <div>
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#EBE5DF] mb-4">
                <img
                  src="/images/products/heart-shaped-red-velvet.jpg"
                  alt="Heart-Shaped Red Velvet Celebration Bento Cake"
                  className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-300 ease-out"
                  loading="lazy"
                  width={800}
                  height={600}
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 bg-[#FFFFFF]/95 border border-[#DFD7CF] rounded-full text-[11px] font-sans font-medium text-[#25313A] shadow-xs">
                  Red Velvet Special
                </span>
              </div>
              <h3 className="font-serif text-xl font-bold text-[#25313A] group-hover:text-[#365D60] transition-colors sm:text-2xl">
                Heart-Shaped Red Velvet Bento
              </h3>
              <p className="font-sans text-xs text-[#6B5E55] mt-1 font-normal">
                Tangy cream cheese frosting, candle included, and sweet mini birthday messaging.
              </p>
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-[#DFD7CF] pt-3 text-xs font-medium">
              <span className="text-[#6B5E55]">Custom Name Included</span>
              <span className="text-[#365D60] font-semibold">From ₹579</span>
            </div>
          </Link>

          {/* Item 3: Couple / Anniversary Bento (Span 4 cols) */}
          <Link
            to="/cakes/heart-shaped-strawberry-bento"
            className="group rounded-3xl border border-[#DFD7CF] bg-[#FFFFFF] p-6 shadow-[0_8px_30px_rgba(68,48,38,0.06)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(68,48,38,0.1)] md:col-span-4"
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#EBE5DF] mb-4">
              <img
                src="/images/products/heart-shaped-strawberry.jpg"
                alt="Heart-Shaped Strawberry Romance Bento Cake"
                className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-300 ease-out"
                loading="lazy"
                width={800}
                height={600}
              />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#25313A] group-hover:text-[#365D60] transition-colors">
              Heart-Shaped Strawberry Bento
            </h3>
            <p className="font-sans text-xs text-[#6B5E55] mt-1 font-normal">
              Pastel pink, delicate beaded borders, and love notes for anniversaries and dates.
            </p>
          </Link>

          {/* Item 4: Blueberry Bento (Span 4 cols) */}
          <Link
            to="/cakes/blueberry-bento-cake"
            className="group rounded-3xl border border-[#DFD7CF] bg-[#FFFFFF] p-6 shadow-[0_8px_30px_rgba(68,48,38,0.06)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(68,48,38,0.1)] md:col-span-4"
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#EBE5DF] mb-4">
              <img
                src="/images/products/blueberry-cake.jpg"
                alt="Wild Blueberry Petite Bento Cake"
                className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-300 ease-out"
                loading="lazy"
                width={800}
                height={600}
              />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#25313A] group-hover:text-[#365D60] transition-colors">
              Wild Blueberry Petite Bento
            </h3>
            <p className="font-sans text-xs text-[#6B5E55] mt-1 font-normal">
              Tangy wild blueberry reduction with minimalist Korean piping in an eco clamshell box.
            </p>
          </Link>

          {/* Item 5: Bento Box Packaging Spotlight (Span 4 cols) */}
          <div className="group flex flex-col justify-between rounded-3xl border border-[#25313A] bg-[#25313A] p-6 text-[#F5EFEB] shadow-md md:col-span-4">
            <div>
              <span className="font-script text-[#B6C69F] text-xl">Signature Packaging</span>
              <h3 className="font-serif text-2xl font-normal mt-1 mb-2 text-[#F5EFEB]">
                Eco Bento Box &amp; Ribbon
              </h3>
              <p className="font-sans text-xs text-[#F5EFEB]/80 font-light leading-relaxed">
                Every bento cake arrives in our branded biodegradable clamshell box, tied with our silk ribbon and accompanied by a wooden spork and celebratory candle.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#F5EFEB]/15 flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-[#B6C69F] font-medium">Ready For Gifting</span>
              <Heart className="w-4 h-4 text-[#B6C69F] fill-[#B6C69F]" />
            </div>
          </div>
        </div>

        {/* Section Action */}
        <div className="mt-12 text-center lg:mt-14">
          <Link
            to="/bento-cakes"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#365D60] px-8 py-3.5 font-sans text-xs font-semibold uppercase tracking-wider text-[#F5EFEB] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#2C4C4F] hover:shadow-md active:translate-y-0"
          >
            <span>Explore All Bento Cakes</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BentoSection;
