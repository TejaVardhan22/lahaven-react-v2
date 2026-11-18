import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { ProductCard } from './ProductCard';
import { products } from '@/data/products';
import AnimatedSection from '@/components/shared/AnimatedSection';

type CategoryKey =
  | 'All Bakes'
  | 'Celebration Cakes'
  | 'Bento Cakes'
  | 'Cheesecakes'
  | 'Pastries & Gateaux'
  | 'Desserts & Brownies';

const CATEGORIES: CategoryKey[] = [
  'All Bakes',
  'Celebration Cakes',
  'Bento Cakes',
  'Cheesecakes',
  'Pastries & Gateaux',
  'Desserts & Brownies',
];

export const SignatureCollection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey>('All Bakes');

  const filteredProducts = useMemo(() => {
    switch (selectedCategory) {
      case 'All Bakes':
        return products.slice(0, 8);
      case 'Celebration Cakes':
        return products.filter((p) => p.category === 'celebration-cakes').slice(0, 8);
      case 'Bento Cakes':
        return products.filter((p) => p.category === 'bento-cakes').slice(0, 8);
      case 'Cheesecakes':
        return products
          .filter(
            (p) =>
              (p.subcategory && p.subcategory.includes('Cheesecake')) ||
              p.id.includes('cheesecake')
          )
          .slice(0, 8);
      case 'Pastries & Gateaux':
        return products
          .filter(
            (p) =>
              (p.subcategory &&
                (p.subcategory.includes('Pastries') ||
                  p.subcategory.includes('Gateau') ||
                  p.subcategory.includes('French'))) ||
              p.id.includes('pastry')
          )
          .slice(0, 8);
      case 'Desserts & Brownies':
        return products
          .filter(
            (p) =>
              p.category === 'desserts' &&
              !(p.subcategory && p.subcategory.includes('Cheesecake'))
          )
          .slice(0, 8);
      default:
        return products.slice(0, 8);
    }
  }, [selectedCategory]);

  return (
    <section className="bg-[#F5EFEB] py-14 sm:py-20" aria-label="Signature Collection">
      <div className="section-rail">
        {/* ── Section Header ── */}
        <AnimatedSection className="flex flex-col gap-4 pb-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="eyebrow inline-flex items-center gap-2 rounded-full bg-[#25313A] px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#F5EFEB] shadow-2xs">
              <Sparkles className="h-3 w-3 text-[#B6C69F]" />
              <span>Signature Collection</span>
            </span>
            <h2 className="mt-2.5 font-serif text-3xl font-bold tracking-tight text-[#25313A] sm:text-4xl">
              Baked Fresh. Every Morning.
            </h2>
            <p className="mt-1 font-sans text-xs font-normal text-[#6B5E55] sm:text-sm">
              Explore our handcrafted celebration cakes, artisanal pastries, and daily oven bakes.
            </p>
          </div>

          <Link
            to="/cakes"
            className="group inline-flex items-center gap-1.5 font-sans text-xs font-bold uppercase tracking-wider text-[#365D60] transition-colors hover:text-[#25313A]"
          >
            <span>View All Bakes</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </AnimatedSection>

        {/* ── Category Filter Tabs with Smooth Pill Transitions ── */}
        <div className="no-scrollbar mt-6 flex items-center gap-2 overflow-x-auto pb-2">
          {CATEGORIES.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`relative whitespace-nowrap rounded-full px-4 py-2 font-sans text-xs font-bold tracking-wide transition-colors duration-200 ${
                  isActive
                    ? 'text-[#F5EFEB]'
                    : 'border border-[#DFD7CF] bg-[#FFFFFF] text-[#25313A] hover:border-[#25313A]'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeCategoryPill"
                    transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                    className="absolute inset-0 rounded-full bg-[#365D60] shadow-sm -z-0"
                  />
                )}
                <span className="relative z-10">{category}</span>
              </button>
            );
          })}
        </div>

        {/* ── Responsive Product Grid with Staggered Entrance ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6"
          >
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <ProductCard product={product} index={index} priority={index < 4} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default SignatureCollection;
