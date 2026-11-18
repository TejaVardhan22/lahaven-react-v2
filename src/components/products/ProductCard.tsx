import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Plus, Check, ArrowUpRight } from 'lucide-react';
import type { Product } from '@/types';
import { useStorefront } from '@/context/StorefrontContext';
import { WhatsAppIcon } from '@/components/shared/Icons';

interface ProductCardProps {
  product: Product;
  index?: number;
  priority?: boolean;
}

/**
 * Official Indian FSSAI Vegetarian / 100% Eggless Symbol
 */
export const EgglessSymbol: React.FC<{ className?: string }> = ({ className = 'h-3.5 w-3.5' }) => (
  <svg
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`shrink-0 ${className}`}
    aria-hidden="true"
  >
    <rect
      x="1"
      y="1"
      width="16"
      height="16"
      rx="2"
      fill="white"
      stroke="#15803D"
      strokeWidth="1.5"
    />
    <circle cx="9" cy="9" r="4.2" fill="#15803D" />
  </svg>
);

/**
 * Official Indian FSSAI Contains-Egg Symbol
 */
export const EggSymbol: React.FC<{ className?: string }> = ({ className = 'h-3.5 w-3.5' }) => (
  <svg
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`shrink-0 ${className}`}
    aria-hidden="true"
  >
    <rect
      x="1"
      y="1"
      width="16"
      height="16"
      rx="2"
      fill="white"
      stroke="#9A3412"
      strokeWidth="1.5"
    />
    <path d="M9 4.2L13.6 12.8H4.4L9 4.2Z" fill="#9A3412" />
  </svg>
);

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  index = 0,
  priority = false,
}) => {
  const { isWishlisted, toggleWishlist, quickAddToCart, quickDirectWhatsAppOrder } =
    useStorefront();
  const liked = isWishlisted(product.id);
  const [justAdded, setJustAdded] = useState(false);

  // Read dietary status directly from products.ts
  const isEggless = product.isEggless ?? product.tags.includes('eggless');
  const defaultSize = product.sizes?.[0] || '0.5 kg';
  const basePrice = product.startingPrice?.amount || product.price?.amount || 799;

  const currentImg = (product.images && product.images[0]) || {
    src: '/images/hero/belgian-truffle-desktop.jpg',
    alt: product.name,
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    quickAddToCart(product, defaultSize, isEggless);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1400);
  };

  const handleDirectWhatsAppOrder = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    quickDirectWhatsAppOrder(product, defaultSize, isEggless);
  };

  // Category label for Oat & Honey header
  const categoryLabel =
    product.subcategory ||
    (product.category === 'celebration-cakes'
      ? 'Celebration cakes'
      : product.category.replace('-', ' '));

  return (
    <motion.article
      whileHover={{ y: -3.5 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className={`product-card tone-${(index ?? 0) % 4}`}
    >
      {/* ── Oat & Honey Aspect Ratio 1:1 Image with Hover Zoom & Corner Pill Tag ── */}
      <Link
        to={`/cakes/${product.slug}`}
        className="product-image-link group"
        aria-label={product.name}
      >
        <img
          src={currentImg.src}
          alt={currentImg.alt || product.name}
          width={600}
          height={600}
          loading={priority ? 'eager' : 'lazy'}
          className="transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Top-Left Organic Tag like Oat & Honey */}
        <span className="product-tag animate-badge-pop">
          {isEggless ? <EgglessSymbol className="h-3 w-3" /> : <EggSymbol className="h-3 w-3" />}
          <span>{isEggless ? '100% Eggless' : 'Contains Egg'}</span>
        </span>

        {/* Bottom-Right View Arrow Pill like Oat & Honey */}
        <span className="product-view transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true">
          <ArrowUpRight className="h-5 w-5" />
        </span>
      </Link>

      {/* ── Oat & Honey Product Card Info ── */}
      <div className="product-card-info">
        <div className="min-w-0 pr-2">
          <p className="product-category">{categoryLabel}</p>
          <h3>
            <Link to={`/cakes/${product.slug}`}>{product.name}</Link>
          </h3>
        </div>
        <span className="product-price">₹{basePrice}</span>
      </div>

      {/* ── Minimal Ordering & Wishlist Actions Strip ── */}
      <div className="mt-3 flex items-center gap-2 pt-1">
        <motion.button
          whileTap={{ scale: 0.95 }}
          type="button"
          onClick={handleDirectWhatsAppOrder}
          className="flex-1 inline-flex h-8 items-center justify-center gap-1.5 rounded-full bg-[#365D60] px-3 font-sans text-xs font-bold text-[#F5EFEB] shadow-2xs transition-all duration-200 hover:bg-[#2C4C4F]"
          title="Direct WhatsApp Order"
        >
          <WhatsAppIcon className="h-3.5 w-3.5 fill-[#F5EFEB]" />
          <span>Order Now</span>
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.94 }}
          type="button"
          onClick={handleAddToCart}
          className={`inline-flex h-8 items-center justify-center gap-1 rounded-full border px-3 font-sans text-xs font-bold transition-all duration-200 ${
            justAdded
              ? 'border-[#365D60] bg-[#365D60]/15 text-[#365D60]'
              : 'border-[#DFD7CF] bg-[#EBE5DF] text-[#25313A] hover:border-[#25313A] hover:bg-[#25313A] hover:text-[#F5EFEB]'
          }`}
          title="Add to shopping bag"
        >
          {justAdded ? (
            <>
              <Check className="h-3.5 w-3.5" />
              <span>In Bag</span>
            </>
          ) : (
            <>
              <Plus className="h-3.5 w-3.5" />
              <span>Bag</span>
            </>
          )}
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.85 }}
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          aria-label={liked ? 'Remove from wishlist' : 'Save to wishlist'}
          aria-pressed={liked}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#DFD7CF] bg-[#EBE5DF] text-[#25313A] transition-transform hover:scale-110 hover:border-[#365D60] hover:text-[#365D60]"
        >
          <motion.div
            key={liked ? 'liked' : 'unliked'}
            animate={liked ? { scale: [1, 1.35, 1] } : { scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Heart
              className={`h-4 w-4 transition-colors ${
                liked ? 'fill-[#365D60] text-[#365D60]' : 'text-[#25313A]'
              }`}
            />
          </motion.div>
        </motion.button>
      </div>
    </motion.article>
  );
};

export default ProductCard;
