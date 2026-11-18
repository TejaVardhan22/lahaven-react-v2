import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import type { BreadcrumbItem } from '@/types';

interface PageHeroProps {
  breadcrumbs: BreadcrumbItem[];
  kicker: string;
  title: ReactNode;
  description?: ReactNode;
  meta?: string[];
  actions?: ReactNode;
  aside?: ReactNode;
  align?: 'left' | 'center';
  /** Banner background photo for the page. */
  image?: string;
  imageAlt?: string;
  /** Optional second photo (unused when full background image is active). */
  imageSecondary?: string;
}

/**
 * Shared inner-page banner with full-bleed background image across all pages.
 */
export function PageHero({
  breadcrumbs,
  kicker,
  title,
  description,
  meta,
  actions,
  aside,
  align = 'left',
  image = '/images/hero/belgian-truffle-desktop.jpg',
  imageAlt = 'LaHaven Cake Boutique',
}: PageHeroProps) {
  const centered = align === 'center';

  return (
    <section className="relative overflow-hidden bg-[#F5EFEB] pt-6 sm:pt-8">
      <div className="premium-container relative">
        <Breadcrumbs items={breadcrumbs} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-2 overflow-hidden rounded-3xl border border-[#DFD7CF] bg-[#25313A] px-6 py-11 shadow-[0_8px_30px_rgba(37,49,58,0.08)] sm:px-10 sm:py-14 lg:px-14 lg:py-16"
        >
          {/* Full-Bleed Background Image */}
          <img
            src={image}
            alt={imageAlt}
            loading="eager"
            width={1600}
            height={700}
            className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center transition-transform duration-1000 ease-out hover:scale-105"
          />

          {/* Clean Legibility Scrim Over Background Image */}
          <div className="pointer-events-none absolute inset-0 bg-black/55" />

          <div
            className={
              centered && !aside
                ? 'relative z-10 mx-auto max-w-3xl text-center'
                : aside
                  ? 'relative z-10 grid items-center gap-8 lg:grid-cols-12 lg:gap-12'
                  : 'relative z-10 max-w-3xl'
            }
          >
            <div className={aside ? 'lg:col-span-7' : ''}>
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="inline-flex items-center gap-2 rounded-full border border-[#F5EFEB]/25 bg-[#F5EFEB]/15 px-3.5 py-1.5 font-sans text-[10.5px] font-bold uppercase tracking-[0.2em] text-[#B6C69F] backdrop-blur-md"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#B6C69F]" />
                {kicker}
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
                className="mt-4 text-balance font-serif text-[clamp(2.15rem,1.55rem+2.5vw,3.45rem)] font-bold leading-[1.06] tracking-[-0.02em] text-[#F5EFEB] [&_.italic]:!text-[#B6C69F]"
              >
                {title}
              </motion.h1>

              {description && (
                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className={`mt-3.5 max-w-2xl font-sans text-sm font-normal leading-relaxed text-[#F5EFEB]/90 sm:text-[15px] ${
                    centered && !aside ? 'mx-auto' : ''
                  }`}
                >
                  {description}
                </motion.p>
              )}

              {meta && meta.length > 0 && (
                <motion.ul
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className={`mt-5 flex flex-wrap gap-2 ${
                    centered && !aside ? 'justify-center' : ''
                  }`}
                >
                  {meta.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-[#F5EFEB]/25 bg-[#F5EFEB]/15 px-3.5 py-1.5 font-sans text-[10px] font-bold uppercase tracking-[0.14em] text-[#F5EFEB] backdrop-blur-md"
                    >
                      {item}
                    </li>
                  ))}
                </motion.ul>
              )}

              {actions && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className={`mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center ${
                    centered && !aside ? 'justify-center' : ''
                  }`}
                >
                  {actions}
                </motion.div>
              )}
            </div>

            {aside && (
              <motion.div
                className="lg:col-span-5"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              >
                {aside}
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default PageHero;
