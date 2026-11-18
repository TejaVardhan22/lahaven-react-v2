import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { occasions } from '@/data/occasions';

export const ShopByOccasion: React.FC = () => {
  return (
    <section className="premium-section bg-[#F5EFEB]">
      <div className="premium-container">
        {/* Section Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center lg:mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#F5EFEB] bg-[#F5EFEB] px-3.5 py-1 text-[11px] font-sans font-semibold uppercase tracking-[0.2em] text-[#365D60] shadow-xs mb-3">
            <Sparkles className="h-3 w-3 text-[#B6C69F]" />
            <span>Celebrations</span>
          </div>
          <h2 className="font-serif text-[2.25rem] sm:text-[2.75rem] lg:text-[3.25rem] font-bold leading-tight tracking-tight text-[#25313A]">
            Every Moment Deserves a Cake
          </h2>
          <p className="mt-3 font-sans text-sm sm:text-base font-normal leading-relaxed text-[#6B5E55]">
            From landmark milestones to sweet spontaneous surprises, explore cakes thoughtfully styled for life's most precious occasions.
          </p>
        </div>

        {/* Editorial Asymmetric Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {occasions.map((occasion, index) => {
            const isTall = index === 0 || index === 2;
            
            return (
              <div
                key={occasion.id}
                className={`${isTall ? 'sm:row-span-2' : ''}`}
              >
                <Link
                  to={`/cakes?occasion=${occasion.slug}`}
                  className="group relative block h-full min-h-[280px] sm:min-h-[320px] w-full overflow-hidden rounded-2xl border border-[#F5EFEB] shadow-[0_4px_20px_rgba(56,37,42,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[#B6C69F]/50 hover:shadow-[0_16px_40px_rgba(56,37,42,0.10)]"
                >
                  {/* Background Image */}
                  <img
                    src={occasion.image.src}
                    alt={occasion.image.alt}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                    width={occasion.image.width}
                    height={occasion.image.height}
                  />

                  {/* Top Badge */}
                  {occasion.cakeCount && (
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 rounded-full bg-[#F5EFEB]/95 backdrop-blur-md text-[#365D60] text-[10.5px] font-sans font-bold uppercase tracking-wider shadow-xs">
                        {occasion.cakeCount} Designs
                      </span>
                    </div>
                  )}

                  {/* Bottom Clean Soft Peach Caption Card */}
                  <div className="absolute bottom-3 inset-x-3 rounded-2xl border border-[#F5EFEB] bg-[#F5EFEB]/95 p-4 shadow-sm backdrop-blur-sm flex flex-col justify-end">
                    <div className="flex items-center justify-between">
                      <h3 className="font-serif text-xl sm:text-2xl text-[#25313A] font-bold transition-colors group-hover:text-[#365D60]">
                        {occasion.name}
                      </h3>
                      <div className="w-8 h-8 rounded-full border border-[#F5EFEB] bg-[#F5EFEB] flex items-center justify-center text-[#365D60] group-hover:bg-[#365D60] group-hover:text-[#F5EFEB] transition-all">
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </div>
                    <p className="font-sans text-xs text-[#6B5E55] font-normal mt-1 line-clamp-2">
                      {occasion.description}
                    </p>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ShopByOccasion;
