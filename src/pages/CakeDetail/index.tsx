import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useReducedMotion,
} from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Minus,
  Plus,
  ShoppingBag,
  Sparkles,
  Truck,
  MapPin,
  Check,
  ShieldCheck,
  Share2,
  Clock,
  ArrowRight,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import { SEOHead } from '@/components/seo/SEOHead';
import { getProductBySlug, products } from '@/data/products';
import { outlets } from '@/data/outlets';
import { SITE_URL } from '@/utils/constants';
import { generateProductSchema } from '@/utils/seo';
import { WhatsAppIcon } from '@/components/shared/Icons';
import { ProductCard, EgglessSymbol } from '@/components/products/ProductCard';
import {
  useStorefront,
  calculateWeightPrice,
  checkBengaluruPincode,
} from '@/context/StorefrontContext';

export const CakeDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = slug ? getProductBySlug(slug) : undefined;

  const { addToCart, openDrawer, isWishlisted, toggleWishlist, startDirectWhatsAppOrder } =
    useStorefront();

  const [activeImageIdx, setActiveImageIdx] = useState<number>(0);
  const [selectedSize, setSelectedSize] = useState<string>(product?.sizes?.[0] || '0.5 kg');
  const [selectedFlavor, setSelectedFlavor] = useState<string>(
    product?.flavors?.[0] || 'Signature Recipe'
  );
  const isEggless = true;
  const [messageOnCake, setMessageOnCake] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [addedConfirmation, setAddedConfirmation] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  // Delivery PIN checker states
  const [pinInput, setPinInput] = useState<string>('560005');
  const [checkedPincode, setCheckedPincode] = useState<string>('');
  const [isCheckingPin, setIsCheckingPin] = useState<boolean>(false);
  const [pinError, setPinError] = useState<string>('');

  useEffect(() => {
    if (product) {
      setActiveImageIdx(0);
      setSelectedSize(product.sizes?.[0] || '0.5 kg');
      setSelectedFlavor(product.flavors?.[0] || 'Signature Recipe');
      setQuantity(1);
      setAddedConfirmation(false);
      window.scrollTo(0, 0);
    }
  }, [product]);

  const basePrice = product?.startingPrice?.amount || product?.price?.amount || 749;
  const unitPrice = calculateWeightPrice(basePrice, selectedSize);
  const totalDisplayPrice = unitPrice * quantity;

  // Serving count derived from weight
  const servingGuide = useMemo(() => {
    const s = selectedSize.toLowerCase();
    if (s.includes('2.0') || s.includes('2 kg') || s.includes('2kg')) return 'Serves 16–20 guests';
    if (s.includes('1.5')) return 'Serves 12–14 guests';
    if (s.includes('1.0') || s.includes('1 kg') || s.includes('1kg')) return 'Serves 8–10 guests';
    return 'Serves 4–6 guests';
  }, [selectedSize]);

  // Verified delivery promise status (only evaluated once checkedPincode is submitted)
  const pinStatus = useMemo(() => {
    if (!checkedPincode) return null;
    return checkBengaluruPincode(checkedPincode);
  }, [checkedPincode]);

  const liked = product ? isWishlisted(product.id) : false;

  const images = useMemo(() => {
    if (product?.images && product.images.length > 0) {
      return product.images;
    }
    return [{ src: '/images/products/black-forest-classic.jpg', alt: product?.name || 'Cake' }];
  }, [product]);

  const currentImage = images[activeImageIdx] || images[0];

  // Related products from same category or complementary treats
  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return products
      .filter((p) => p.id !== product.id)
      .filter(
        (p) =>
          p.category === product.category ||
          p.category === 'desserts' ||
          p.flavorProfile === product.flavorProfile
      )
      .slice(0, 4);
  }, [product]);

  const handleCheckPin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const clean = pinInput.trim();
    if (!clean) {
      setPinError('Please enter a 6-digit Bengaluru PIN code.');
      setCheckedPincode('');
      return;
    }
    if (!/^\d{6}$/.test(clean)) {
      setPinError('Please enter a valid 6-digit PIN code.');
      setCheckedPincode('');
      return;
    }

    setPinError('');
    setIsCheckingPin(true);

    // Simulate natural response
    setTimeout(() => {
      setIsCheckingPin(false);
      setCheckedPincode(clean);
    }, 350);
  };

  const handleAddToBag = () => {
    if (!product) return;
    addToCart({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: images[0]?.src || '/images/products/black-forest-classic.jpg',
      size: selectedSize,
      flavor: selectedFlavor,
      isEggless,
      messageOnCake,
      addons: [],
      unitPrice,
      quantity,
    });
    setAddedConfirmation(true);
    setTimeout(() => setAddedConfirmation(false), 3500);
  };

  const handleDirectWhatsAppOrder = () => {
    if (!product) return;
    startDirectWhatsAppOrder({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: images[0]?.src || '/images/products/black-forest-classic.jpg',
      size: selectedSize,
      flavor: selectedFlavor,
      isEggless,
      messageOnCake,
      addons: [],
      unitPrice,
      quantity,
      pincode: checkedPincode || pinInput,
    });
  };

  const handleShare = async () => {
    if (!product) return;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${product.name} | La Heaven Cake Boutique`,
          text: product.shortDescription || product.description,
          url: window.location.href,
        });
      } catch {
        // User cancelled share
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const nextImage = () => {
    setActiveImageIdx((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setActiveImageIdx((prev) => (prev - 1 + images.length) % images.length);
  };

  const reduceMotion = useReducedMotion();
  const showcaseContainerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // 1. Interactive 3D Cursor Parallax Tilt (Apple Pâtisserie style)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springTiltConfig = { damping: 20, stiffness: 180, mass: 0.6 };
  const tiltX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springTiltConfig);
  const tiltY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springTiltConfig);
  const shadowTranslateX = useSpring(useTransform(mouseX, [-0.5, 0.5], [12, -12]), springTiltConfig);
  const shadowTranslateY = useSpring(useTransform(mouseY, [-0.5, 0.5], [16, -8]), springTiltConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduceMotion || !showcaseContainerRef.current) return;
    const rect = showcaseContainerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // 2. Scroll-Driven Cinematic Parallax
  const { scrollYProgress } = useScroll({
    target: showcaseContainerRef,
    offset: ['start end', 'end start'],
  });
  const smoothScroll = useSpring(scrollYProgress, {
    damping: 24,
    stiffness: 140,
    mass: 0.5,
  });
  const scrollParallaxY = useTransform(smoothScroll, [0, 1], [-24, 24]);
  const scrollParallaxRotate = useTransform(smoothScroll, [0, 1], [-1.8, 1.8]);
  const scrollParallaxScale = useTransform(smoothScroll, [0, 0.5, 1], [0.97, 1.02, 0.98]);

  // Touch Swipe navigation for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 40;
    if (distance > minSwipeDistance) {
      nextImage();
    } else if (distance < -minSwipeDistance) {
      prevImage();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  if (!product) {
    return (
      <section className="min-h-[70vh] bg-[#FAF7F2] py-20 flex items-center justify-center font-sans">
        <SEOHead
          title="Treat not found | La Heaven Cake Boutique"
          description="This treat is no longer available. Explore our fresh celebration cakes."
          canonicalUrl={`${SITE_URL}/cakes`}
          ogTitle="Treat not found — La Heaven Cake Boutique"
          ogDescription="This treat is no longer available. Explore our fresh celebration cakes."
          ogImage={`${SITE_URL}/og/cakes.jpg`}
          twitterCard="summary_large_image"
        />
        <div className="max-w-md text-center px-4">
          <span className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-[#245650]">
            Boutique Notification
          </span>
          <h1 className="mt-3 font-serif text-3xl sm:text-4xl font-normal text-[#30251F]">
            Cake Not Found
          </h1>
          <p className="mt-3 text-sm text-[#30251F]/70 leading-relaxed">
            This creation is currently not on our counter. Explore our current cake collection baked
            fresh in our live kitchens.
          </p>
          <div className="mt-6 flex justify-center">
            <Link
              to="/cakes"
              className="inline-flex items-center gap-2 rounded-[10px] bg-[#245650] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#FAF7F2] shadow-sm hover:bg-[#1D4641] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#245650] focus-visible:ring-offset-2"
            >
              <span>Explore All Cakes</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#30251F] font-sans pb-28 lg:pb-16 selection:bg-[#245650]/15 selection:text-[#245650]">
      <SEOHead
        title={`${product.name} — Handcrafted Artisan Cake | La Heaven`}
        description={product.description}
        canonicalUrl={`${SITE_URL}/cakes/${product.slug}`}
        ogTitle={`${product.name} — La Heaven Cake Boutique Bengaluru`}
        ogDescription={product.shortDescription || product.description}
        ogImage={images[0]?.src || `${SITE_URL}/og/cakes.jpg`}
        twitterCard="summary_large_image"
        structuredData={generateProductSchema(product)}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10">
        {/* ── Breadcrumb Navigation ── */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs text-[#30251F]/60 mb-6 sm:mb-8 font-normal"
        >
          <Link
            to="/"
            className="hover:text-[#245650] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#245650]"
          >
            Home
          </Link>
          <span className="text-[#E6DFD5] font-light">/</span>
          <Link
            to="/cakes"
            className="hover:text-[#245650] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#245650]"
          >
            Cakes
          </Link>
          <span className="text-[#E6DFD5] font-light">/</span>
          <span className="font-medium text-[#30251F] truncate max-w-[200px] sm:max-w-none">
            {product.name}
          </span>
        </nav>

        {/* ── Desktop Two-Column / Mobile Stacked Layout ── */}
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-14">
          {/* ════════ LEFT COLUMN: Cinematic 3D Parallax Boutique Gallery ════════ */}
          <div className="lg:col-span-6 lg:sticky lg:top-28">
            <div className="bg-transparent border-0 shadow-none p-0">
              {/* Primary Showcase Image: 4:5 Portrait with Interactive 3D Cursor Tilt & Scroll Parallax */}
              <div
                ref={showcaseContainerRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                style={{ perspective: 1200 }}
                className="group relative aspect-[4/5] w-full overflow-hidden bg-transparent border-0 shadow-none p-2 sm:p-4 flex items-center justify-center select-none cursor-grab active:cursor-grabbing"
              >
                {/* Parallax Layer 1: Subtle Ambient Counter-Glow */}
                <motion.div
                  style={{
                    x: reduceMotion ? 0 : shadowTranslateX,
                    y: reduceMotion ? 0 : shadowTranslateY,
                  }}
                  className="pointer-events-none absolute h-72 w-72 rounded-full bg-[#B6C69F]/20 blur-3xl -z-10"
                />

                {/* Parallax Layer 2: 3D Tilting & Scroll-Synced Cake Showcase */}
                <motion.div
                  style={{
                    rotateX: reduceMotion ? 0 : tiltX,
                    rotateY: reduceMotion ? 0 : tiltY,
                    y: reduceMotion ? 0 : scrollParallaxY,
                    rotateZ: reduceMotion ? 0 : scrollParallaxRotate,
                    scale: reduceMotion ? 1 : scrollParallaxScale,
                    transformStyle: 'preserve-3d',
                  }}
                  className="relative h-full w-full flex items-center justify-center will-change-transform"
                >
                  {/* Floating micro-levitation breathing movement */}
                  <motion.div
                    animate={
                      reduceMotion
                        ? {}
                        : {
                            y: [-5, 5],
                            transition: {
                              duration: 4.8,
                              repeat: Infinity,
                              repeatType: 'reverse',
                              ease: 'easeInOut',
                            },
                          }
                    }
                    className="relative h-full w-full flex items-center justify-center"
                  >
                    <img
                      src={currentImage.src}
                      alt={currentImage.alt || product.name}
                      width={1000}
                      height={1250}
                      loading="eager"
                      className="h-full w-full object-contain object-center transition-transform duration-500 ease-out drop-shadow-[0_20px_35px_rgba(48,37,31,0.12)]"
                    />
                  </motion.div>
                </motion.div>

                {/* Parallax Layer 3: Floating UI Controls (Higher z-depth) */}
                {/* Top-Left: Compact White 100% Eggless (Veg) Label with Green Vegetarian Symbol */}
                <div className="absolute top-3.5 left-3.5 z-20 inline-flex items-center gap-1.5 rounded-full border border-[#E6DFD5]/80 bg-white/95 px-3 py-1 text-[11px] font-semibold text-[#15803D] shadow-xs backdrop-blur-xs">
                  <EgglessSymbol className="h-3.5 w-3.5 shrink-0" />
                  <span>100% Eggless (Veg)</span>
                </div>

                {/* Top-Right: Discreet Wishlist Button */}
                <button
                  type="button"
                  onClick={() => toggleWishlist(product.id)}
                  aria-label={liked ? 'Remove from wishlist' : 'Save to wishlist'}
                  aria-pressed={liked}
                  className="absolute top-3.5 right-3.5 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-[#E6DFD5]/80 bg-white/95 text-[#30251F] shadow-xs backdrop-blur-xs transition-all hover:bg-white hover:text-[#245650] hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#245650]"
                >
                  <Heart
                    size={16}
                    className={liked ? 'fill-[#245650] text-[#245650]' : 'text-[#30251F]/70'}
                  />
                </button>

                {/* Navigation Touch Arrows (Comfortable touch targets on mobile & on desktop hover/focus) */}
                {images.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={prevImage}
                      aria-label="Previous photograph"
                      className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-[#E6DFD5]/80 bg-white/90 text-[#30251F] shadow-xs backdrop-blur-xs transition-all hover:bg-white opacity-90 sm:opacity-0 sm:group-hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#245650]"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      onClick={nextImage}
                      aria-label="Next photograph"
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-[#E6DFD5]/80 bg-white/90 text-[#30251F] shadow-xs backdrop-blur-xs transition-all hover:bg-white opacity-90 sm:opacity-0 sm:group-hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#245650]"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </>
                )}

                {/* Bottom-Right: Small Image Counter */}
                {images.length > 1 && (
                  <div className="absolute bottom-3.5 right-3.5 z-20 rounded-full bg-[#30251F]/75 px-2.5 py-0.5 text-[11px] font-medium tracking-wide text-[#FAF7F2] backdrop-blur-xs shadow-2xs">
                    {activeImageIdx + 1} / {images.length}
                  </div>
                )}
              </div>

              {/* Freshness Label Below Image in Small Muted Teal Text */}
              <div className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs font-medium text-[#245650]">
                <Sparkles className="h-3.5 w-3.5 shrink-0 text-[#245650]" />
                <span>Fresh Morning Bake • Handcrafted in our Bengaluru live kitchen</span>
              </div>

              {/* Three Evenly Sized Thumbnails Beneath Main Image (Clean Transparent Style) */}
              {images.length > 1 && (
                <div className="mt-4 grid grid-cols-3 gap-3">
                  {images.slice(0, 3).map((img, idx) => {
                    const active = activeImageIdx === idx;
                    return (
                      <button
                        key={img.src + idx}
                        type="button"
                        onClick={() => setActiveImageIdx(idx)}
                        aria-label={`View photograph ${idx + 1} of ${Math.min(images.length, 3)}`}
                        aria-pressed={active}
                        className={`group relative aspect-square w-full overflow-hidden rounded-xl bg-transparent p-1 transition-all opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#245650] focus-visible:ring-offset-2 ${
                          active
                            ? 'border border-[#245650] ring-1 ring-[#245650]'
                            : 'border border-[#E6DFD5]/60 hover:border-[#245650]/50'
                        }`}
                      >
                        <img
                          src={img.src}
                          alt=""
                          className="h-full w-full rounded-lg object-contain object-center transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_4px_12px_rgba(48,37,31,0.06)]"
                        />
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Quick Artisan Features: Clean Hairline Divider Strip */}
            <div className="mt-6 grid grid-cols-4 divide-x divide-[#E6DFD5] border-y border-[#E6DFD5] py-3.5 text-center bg-transparent">
              <div className="px-1.5 sm:px-2">
                <span className="block text-[11px] font-semibold text-[#30251F]">Live Kitchens</span>
                <span className="text-[10px] text-[#30251F]/65">Baked to Order</span>
              </div>
              <div className="px-1.5 sm:px-2">
                <span className="block text-[11px] font-semibold text-[#30251F]">100% Eggless</span>
                <span className="text-[10px] text-[#30251F]/65">Certified Pure Veg</span>
              </div>
              <div className="px-1.5 sm:px-2">
                <span className="block text-[11px] font-semibold text-[#30251F]">Chilled Transit</span>
                <span className="text-[10px] text-[#30251F]/65">Bengaluru Express</span>
              </div>
              <div className="px-1.5 sm:px-2">
                <span className="block text-[11px] font-semibold text-[#30251F]">Gift Included</span>
                <span className="text-[10px] text-[#30251F]/65">Knife &amp; Candles</span>
              </div>
            </div>
          </div>

          {/* ════════ RIGHT COLUMN: Purchasing Options & Accordions ════════ */}
          <div className="space-y-6 lg:col-span-6">
            {/* 1. Header: Kicker, Title, Rating, Price & Short Description */}
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-[8px] border border-[#245650]/20 bg-[#245650]/5 px-2.5 py-0.5 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-[#245650]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#245650]" />
                    {product.subcategory || 'Boutique Patisserie'}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-[8px] border border-[#15803D]/25 bg-[#15803D]/5 px-2.5 py-0.5 text-[10.5px] font-semibold text-[#15803D]">
                    <EgglessSymbol className="h-3 w-3 shrink-0" />
                    <span>100% Eggless (Veg)</span>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleShare}
                    aria-label="Share this cake"
                    className="p-1.5 text-[#30251F]/60 hover:text-[#245650] transition-colors rounded-[6px] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#245650]"
                  >
                    <Share2 className="h-4 w-4" />
                  </button>
                  {copiedLink && (
                    <span className="text-[10px] font-semibold text-[#245650]">Copied!</span>
                  )}
                </div>
              </div>

              <h1 className="font-serif text-[clamp(2.1rem,3.4vw,3.25rem)] font-normal text-[#30251F] leading-[1.08] tracking-tight">
                {product.name}
              </h1>

              {/* Dynamic Price Display */}
              <div className="flex items-baseline gap-3 pt-1">
                <span className="text-3xl font-semibold text-[#30251F] tracking-tight">
                  ₹{totalDisplayPrice.toLocaleString('en-IN')}
                </span>
                {quantity > 1 && (
                  <span className="text-xs text-[#30251F]/60">
                    (₹{unitPrice.toLocaleString('en-IN')} each)
                  </span>
                )}
                <span className="text-xs text-[#30251F]/50 font-normal">
                  • Inclusive of all taxes
                </span>
              </div>

              {/* Short Editorial Description */}
              <p className="text-sm font-normal text-[#30251F]/80 leading-relaxed pt-1">
                {product.shortDescription || product.description}
              </p>
            </div>

            <div className="h-[1px] w-full bg-[#E6DFD5]" />

            {/* 2. Weight Selection with Prices & Serving Count */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold uppercase tracking-wider text-[#30251F]">
                    Select Weight
                  </span>
                  <span className="font-medium text-[#245650]">
                    {servingGuide}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {product.sizes.map((size) => {
                    const priceForSize = calculateWeightPrice(basePrice, size);
                    const isSelected = selectedSize === size;
                    return (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        aria-pressed={isSelected}
                        className={`flex flex-col items-center justify-center rounded-[10px] py-2.5 px-2 text-center transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#245650] ${isSelected
                          ? 'bg-[#245650] text-[#FAF7F2] border border-[#245650] shadow-xs'
                          : 'bg-[#FFFFFF] text-[#30251F] border border-[#E6DFD5] hover:border-[#245650]/60'
                          }`}
                      >
                        <span className="text-xs font-semibold">{size}</span>
                        <span
                          className={`mt-0.5 text-[11px] ${isSelected ? 'text-[#FAF7F2]/85' : 'text-[#30251F]/65'
                            }`}
                        >
                          ₹{priceForSize.toLocaleString('en-IN')}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 3. 100% Eggless Vegetarian Assurance */}
            <div className="flex items-center gap-2.5 rounded-[10px] border border-[#15803D]/25 bg-[#15803D]/5 px-3.5 py-3">
              <EgglessSymbol className="h-4 w-4 shrink-0" />
              <div className="flex flex-wrap items-center gap-1.5 text-xs">
                <span className="font-semibold text-[#15803D]">
                  100% Eggless (Veg)
                </span>
                <span className="text-[#30251F]/65 font-normal">
                  • Handcrafted in our pure vegetarian live kitchens
                </span>
              </div>
            </div>

            {/* 4. Optional Plaque Inscription Message */}
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between text-xs">
                <label
                  htmlFor="cake-message"
                  className="font-semibold uppercase tracking-wider text-[#30251F]"
                >
                  Optional Cake Message{' '}
                  <span className="font-normal text-[#30251F]/50 lowercase">(on chocolate plaque)</span>
                </label>
                <span className="text-[11px] text-[#30251F]/50 font-normal">
                  {messageOnCake.length}/35
                </span>
              </div>
              <input
                id="cake-message"
                type="text"
                maxLength={35}
                value={messageOnCake}
                onChange={(e) => setMessageOnCake(e.target.value)}
                placeholder="e.g. Happy Birthday Ananya!"
                className="w-full rounded-[10px] border border-[#E6DFD5] bg-[#FFFFFF] px-3.5 py-2.5 text-xs text-[#30251F] placeholder-[#30251F]/40 outline-none transition-all focus:border-[#245650] focus:ring-1 focus:ring-[#245650]"
              />
              <span className="block text-[11px] text-[#30251F]/55">
                Piped in white chocolate ganache on a chocolate plaque.
              </span>
            </div>

            {/* 5. Delivery PIN Checker (Promises displayed ONLY after successful check) */}
            <div className="rounded-[10px] border border-[#E6DFD5] bg-[#FFFFFF] p-4 space-y-3">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#30251F]">
                  <MapPin className="h-4 w-4 text-[#245650] shrink-0" />
                  <span>Bengaluru Delivery Check</span>
                </div>
                {checkedPincode && (
                  <button
                    type="button"
                    onClick={() => {
                      setCheckedPincode('');
                      setPinError('');
                    }}
                    className="text-[11px] text-[#245650] hover:underline font-medium"
                  >
                    Change PIN
                  </button>
                )}
              </div>

              {/* Form Input + Check Button */}
              {!checkedPincode ? (
                <form onSubmit={handleCheckPin} className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      maxLength={6}
                      value={pinInput}
                      onChange={(e) => {
                        setPinInput(e.target.value.replace(/\D/g, ''));
                        if (pinError) setPinError('');
                      }}
                      placeholder="Enter 6-digit PIN (e.g. 560005)"
                      aria-label="Delivery PIN code"
                      className="flex-1 rounded-[10px] border border-[#E6DFD5] bg-[#FAF7F2] px-3.5 py-2.5 text-xs text-[#30251F] placeholder-[#30251F]/45 outline-none focus:border-[#245650] focus:ring-1 focus:ring-[#245650]"
                    />
                    <button
                      type="submit"
                      disabled={isCheckingPin}
                      className="inline-flex items-center justify-center gap-1.5 rounded-[10px] bg-[#245650] px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#FAF7F2] transition-all hover:bg-[#1D4641] disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#245650]"
                    >
                      {isCheckingPin ? (
                        <>
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          <span>Checking</span>
                        </>
                      ) : (
                        <span>Check</span>
                      )}
                    </button>
                  </div>

                  {pinError && (
                    <div className="flex items-center gap-1.5 text-[11.5px] text-[#C64C3D]">
                      <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                      <span>{pinError}</span>
                    </div>
                  )}

                  <p className="text-[11px] text-[#30251F]/55">
                    We deliver across Bengaluru (560xxx) in temperature-controlled refrigerated vans.
                  </p>
                </form>
              ) : (
                /* Verified Delivery Promises Displayed ONLY After Check */
                <div className="space-y-2.5 pt-1">
                  {pinStatus?.serviceable ? (
                    <div className="rounded-[8px] bg-[#245650]/8 border border-[#245650]/20 p-3 text-xs space-y-1.5">
                      <div className="flex items-center gap-1.5 font-semibold text-[#245650]">
                        <Check className="h-4 w-4 shrink-0 text-[#245650]" />
                        <span>Serviceable in {pinStatus.area} ({checkedPincode})</span>
                      </div>
                      <div className="text-[11.5px] text-[#30251F]/80 pl-5 space-y-0.5">
                        <p>• {pinStatus.eta}</p>
                        <p>
                          • {pinStatus.charge === 0 ? 'Free Delivery Included' : `Delivery Fee: ₹${pinStatus.charge}`}
                        </p>
                        <p>• Complimentary pickup available across all 5 Bengaluru boutiques.</p>
                      </div>
                    </div>
                  ) : (
                    <div className="rounded-[8px] bg-[#C64C3D]/8 border border-[#C64C3D]/20 p-3 text-xs space-y-1.5 text-[#C64C3D]">
                      <div className="flex items-center gap-1.5 font-semibold">
                        <AlertCircle className="h-4 w-4 shrink-0" />
                        <span>PIN {checkedPincode} is outside our direct delivery zone</span>
                      </div>
                      <p className="text-[11.5px] text-[#30251F]/80 pl-5">
                        Direct van delivery is currently available within Bengaluru (560xxx). You are warmly welcome to choose complimentary pickup at any of our 5 boutiques.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* 6. Quantity, Wishlist, Primary Add to Bag & Secondary WhatsApp Order */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2.5">
                {/* Quantity Control */}
                <div className="inline-flex h-12 items-center rounded-[10px] border border-[#E6DFD5] bg-[#FFFFFF] px-1.5 shadow-2xs">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity === 1}
                    aria-label="Decrease quantity"
                    className="flex h-8 w-8 items-center justify-center rounded-[8px] text-[#30251F] transition-colors hover:bg-[#FAF7F2] disabled:opacity-30 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#245650]"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-8 text-center text-xs font-semibold text-[#30251F]">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.min(99, q + 1))}
                    disabled={quantity === 99}
                    aria-label="Increase quantity"
                    className="flex h-8 w-8 items-center justify-center rounded-[8px] text-[#30251F] transition-colors hover:bg-[#FAF7F2] disabled:opacity-30 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#245650]"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                {/* Wishlist Button */}
                <button
                  type="button"
                  onClick={() => toggleWishlist(product.id)}
                  aria-label={liked ? 'Remove from wishlist' : 'Save to wishlist'}
                  aria-pressed={liked}
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[10px] border border-[#E6DFD5] bg-[#FFFFFF] text-[#30251F] transition-all hover:border-[#245650] hover:text-[#245650] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#245650]"
                >
                  <Heart
                    size={18}
                    className={liked ? 'fill-[#245650] text-[#245650]' : 'text-[#30251F]'}
                  />
                </button>

                {/* PRIMARY ACTION: Add to Bag */}
                <button
                  type="button"
                  onClick={handleAddToBag}
                  className="flex h-12 flex-1 items-center justify-center gap-2 rounded-[10px] bg-[#245650] px-5 text-xs font-semibold uppercase tracking-wider text-[#FAF7F2] shadow-sm transition-all hover:bg-[#1D4641] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#245650] focus-visible:ring-offset-2 active:scale-[0.99]"
                >
                  <ShoppingBag size={16} className="shrink-0" />
                  <span>Add to Bag • ₹{totalDisplayPrice.toLocaleString('en-IN')}</span>
                </button>
              </div>

              {/* SECONDARY ACTION: Order via WhatsApp */}
              <button
                type="button"
                onClick={handleDirectWhatsAppOrder}
                className="flex h-11 w-full items-center justify-center gap-2 rounded-[10px] border border-[#245650] bg-transparent px-4 text-xs font-semibold uppercase tracking-wider text-[#245650] transition-all hover:bg-[#245650]/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#245650] focus-visible:ring-offset-2"
              >
                <WhatsAppIcon className="h-4 w-4 fill-[#245650] shrink-0" />
                <span>Order via WhatsApp</span>
              </button>
            </div>

            {/* Added to Bag Feedback Toast */}
            <AnimatePresence>
              {addedConfirmation && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="flex items-center justify-between rounded-[10px] border border-[#245650]/30 bg-[#245650]/8 px-4 py-3 text-xs font-medium text-[#245650]"
                  role="status"
                >
                  <span>✓ {product.name} ({selectedSize}) added to your bag.</span>
                  <button
                    type="button"
                    onClick={() => openDrawer('cart')}
                    className="font-semibold underline hover:text-[#1D4641] ml-2"
                  >
                    View Bag
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* 7. Accordions Below Purchasing Options */}
            <div className="space-y-0 divide-y divide-[#E6DFD5] border-t border-[#E6DFD5] pt-2">
              {/* Accordion 1: Ingredients & Craftsmanship */}
              <details className="group py-4" open>
                <summary className="flex cursor-pointer items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#30251F] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#245650]">
                  <span>Ingredients &amp; Craftsmanship</span>
                  <span className="text-base font-normal text-[#30251F]/60 transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <div className="mt-3 space-y-2 text-xs leading-relaxed text-[#30251F]/75 font-normal">
                  <p>
                    Handcrafted in our Bengaluru live kitchens using traditional European pâtisserie techniques. Prepared with rich dark cocoa sponge, naturally infused Morello cherry compote (100% alcohol-free), and fresh dairy whipped cream. Finished with handcrafted Belgian dark chocolate curls and maraschino cherries.
                  </p>
                  <p>
                    Baked fresh each morning. Zero palm oil, zero chemical preservatives, zero artificial dyes.
                  </p>
                </div>
              </details>

              {/* Accordion 2: Allergens & Dietary */}
              <details className="group py-4">
                <summary className="flex cursor-pointer items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#30251F] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#245650]">
                  <span>Dietary &amp; Allergens</span>
                  <span className="text-base font-normal text-[#30251F]/60 transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <div className="mt-3 space-y-2 text-xs leading-relaxed text-[#30251F]/75 font-normal">
                  <p>
                    <strong>100% Eggless:</strong> Certified pure vegetarian under FSSAI standards.
                  </p>
                  <p>
                    <strong>Allergens:</strong> Contains wheat (gluten) and dairy. Prepared in a facility that also handles tree nuts.
                  </p>
                </div>
              </details>

              {/* Accordion 3: Same-Day Bengaluru Delivery */}
              <details className="group py-4">
                <summary className="flex cursor-pointer items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#30251F] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#245650]">
                  <span>Same-Day Bengaluru Delivery</span>
                  <span className="text-base font-normal text-[#30251F]/60 transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <div className="mt-3 space-y-2 text-xs leading-relaxed text-[#30251F]/75 font-normal">
                  <p>
                    Hand-delivered across Bengaluru in temperature-controlled refrigerated delivery vans to ensure delicate chocolate curls and cream arrive pristine and chilled.
                  </p>
                  <p>
                    Orders placed before 2:00 PM are eligible for same-day delivery. Delivery slots available from 10:00 AM to 9:00 PM daily.
                  </p>
                </div>
              </details>

              {/* Accordion 4: Complimentary Boutique Pickup */}
              <details className="group py-4">
                <summary className="flex cursor-pointer items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#30251F] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#245650]">
                  <span>Complimentary Boutique Pickup (5 Outlets)</span>
                  <span className="text-base font-normal text-[#30251F]/60 transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <div className="mt-3 space-y-2 text-xs leading-relaxed text-[#30251F]/75 font-normal">
                  <p>
                    Complimentary pickup is available across all 5 physical boutiques in Bengaluru:
                  </p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Frazer Town (Coles Road)</li>
                    <li>Malleshwaram (Sampige Road)</li>
                    <li>Sahakarnagar (Main Road)</li>
                    <li>Sanjayanagar (New BEL Road)</li>
                    <li>Yelahanka New Town (Major Sandeep Unnikrishnan Road)</li>
                  </ul>
                </div>
              </details>

              {/* Accordion 5: Storage & Serving Guide */}
              <details className="group py-4">
                <summary className="flex cursor-pointer items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#30251F] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#245650]">
                  <span>Storage &amp; Serving Guide</span>
                  <span className="text-base font-normal text-[#30251F]/60 transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <div className="mt-3 space-y-2 text-xs leading-relaxed text-[#30251F]/75 font-normal">
                  <p>
                    Store in refrigeration at 4°C–8°C. For maximum chocolate aroma and velvet texture, allow the cake to rest at room temperature for 15 minutes before serving. Use a warm, dry knife for clean bakery slices.
                  </p>
                </div>
              </details>
            </div>
          </div>
        </div>

        {/* ════════ 5 Physical Boutiques Pickup Strip ════════ */}
        <div className="mt-16 rounded-[10px] border border-[#E6DFD5] bg-[#FFFFFF] p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#245650]">
                VISIT US IN PERSON
              </span>
              <h3 className="mt-1 font-serif text-2xl font-normal text-[#30251F]">
                Complimentary Pickup at 5 Bengaluru Boutiques
              </h3>
            </div>
            <Link
              to="/outlets"
              className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#245650] hover:text-[#1D4641] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#245650]"
            >
              <span>View All Store Maps &amp; Hours</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {outlets.map((outlet) => (
              <a
                key={outlet.id}
                href={outlet.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col justify-between rounded-[8px] border border-[#E6DFD5] bg-[#FAF7F2]/60 p-3.5 transition-all hover:border-[#245650] hover:bg-white hover:shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#245650]"
              >
                <div>
                  <span className="text-[11px] font-semibold text-[#245650] block mb-1">
                    {outlet.area}
                  </span>
                  <h4 className="font-serif text-base font-normal text-[#30251F] line-clamp-1">
                    {outlet.name.replace('LaHaven', 'La Heaven')}
                  </h4>
                  <p className="mt-1 text-[11px] text-[#30251F]/65 line-clamp-2">
                    {outlet.address}
                  </p>
                </div>
                <div className="mt-3 flex items-center gap-1 text-[10.5px] font-medium text-[#245650] group-hover:underline">
                  <MapPin className="h-3 w-3" />
                  <span>Get Directions</span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* ════════ Related Artisan Creations ════════ */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 sm:mt-20">
            <div className="flex items-end justify-between mb-8">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#245650]">
                  COMPLETE YOUR CELEBRATION
                </span>
                <h2 className="mt-1 font-serif text-2xl sm:text-3xl font-normal text-[#30251F]">
                  You May Also Love
                </h2>
              </div>
              <Link
                to="/cakes"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#245650] hover:text-[#1D4641] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#245650]"
              >
                <span>Explore Full Collection</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:gap-6">
              {relatedProducts.map((p, idx) => (
                <ProductCard key={p.id} product={p} index={idx} />
              ))}
            </div>

            <div className="mt-8 text-center sm:hidden">
              <Link
                to="/cakes"
                className="inline-flex items-center gap-2 rounded-[10px] border border-[#245650] px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#245650]"
              >
                <span>View All Cakes</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        )}

        {/* ── Return Link ── */}
        <div className="mt-16 border-t border-[#E6DFD5] pt-6 flex items-center justify-between text-xs text-[#30251F]/60">
          <Link
            to="/cakes"
            className="inline-flex items-center gap-2 font-medium text-[#30251F] hover:text-[#245650] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#245650]"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Back to All Artisan Cakes</span>
          </Link>
          <span>La Heaven Pâtisserie • Bengaluru</span>
        </div>
      </div>

      {/* ════════ MOBILE STICKY BOTTOM BAR ════════ */}
      <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-[#FAF7F2]/95 backdrop-blur-md border-t border-[#E6DFD5] px-4 py-3 shadow-[0_-4px_20px_rgba(48,37,31,0.06)] pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <div className="flex items-center justify-between gap-3">
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 text-[11px] text-[#30251F]/70 font-medium">
              <span>{selectedSize}</span>
              <span>•</span>
              <span className="inline-flex items-center gap-1 font-semibold text-[#15803D]">
                <EgglessSymbol className="h-3 w-3 shrink-0" />
                <span>100% Eggless (Veg)</span>
              </span>
            </div>
            <span className="text-xl font-bold text-[#30251F] leading-tight">
              ₹{totalDisplayPrice.toLocaleString('en-IN')}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => toggleWishlist(product.id)}
              aria-label={liked ? 'Remove from wishlist' : 'Save to wishlist'}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] border border-[#E6DFD5] bg-[#FFFFFF] text-[#30251F]"
            >
              <Heart
                size={17}
                className={liked ? 'fill-[#245650] text-[#245650]' : 'text-[#30251F]'}
              />
            </button>

            <button
              type="button"
              onClick={handleAddToBag}
              className="flex h-11 items-center justify-center gap-2 rounded-[10px] bg-[#245650] px-5 text-xs font-semibold uppercase tracking-wider text-[#FAF7F2] shadow-sm hover:bg-[#1D4641] active:scale-[0.99]"
            >
              <ShoppingBag size={15} />
              <span>Add to Bag</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CakeDetail;
