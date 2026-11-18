import React from 'react';
import { Star, Quote, Sparkles } from 'lucide-react';
import { testimonials } from '@/data/testimonials';

export const Testimonials: React.FC = () => {
  return (
    <section aria-label="Customer Testimonials" className="bg-[#EBE5DF] py-16 sm:py-24">
      <div className="section-rail">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow inline-flex items-center gap-2 rounded-full bg-[#FFFFFF] px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#365D60] border border-[#DFD7CF]">
            <Sparkles className="h-3 w-3 text-[#B6C69F]" />
            <span>Love Notes &amp; Reviews</span>
          </span>

          <h2 className="mt-3 font-serif text-[clamp(2.2rem,4vw,3.2rem)] font-normal leading-tight text-[#25313A]">
            Sweet Words from Kind Patrons
          </h2>

          <p className="mt-3 font-sans text-xs font-normal text-[#6B5E55] sm:text-sm">
            Hear from families and celebration hosts across Bengaluru who trust our patisserie to sweeten their most cherished moments.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.slice(0, 3).map((item) => (
            <div
              key={item.id}
              className="flex flex-col justify-between rounded-3xl border border-[#DFD7CF] bg-[#FFFFFF] p-7 shadow-[0_8px_30px_rgba(68,48,38,0.06)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(68,48,38,0.1)]"
            >
              <div>
                {/* Rating stars & Quote Icon */}
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-[#B6C69F] text-[#B6C69F]" />
                    ))}
                  </div>
                  <Quote className="h-5 w-5 text-[#365D60]/30" />
                </div>

                {/* Review Text */}
                <p className="font-serif text-base italic leading-relaxed text-[#25313A] font-normal sm:text-lg">
                  &ldquo;{item.review}&rdquo;
                </p>
              </div>

              {/* Customer Info */}
              <div className="mt-6 flex items-center justify-between border-t border-[#DFD7CF] pt-4">
                <div>
                  <h4 className="font-sans text-sm font-semibold text-[#25313A]">
                    {item.customerName}
                  </h4>
                  <p className="font-sans text-[11px] text-[#6B5E55]">
                    Bengaluru Patron
                  </p>
                </div>

                {item.cakeOrdered && (
                  <span className="rounded-full bg-[#EBE5DF] border border-[#DFD7CF] px-2.5 py-1 font-sans text-[10px] font-semibold text-[#365D60]">
                    {item.cakeOrdered}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
