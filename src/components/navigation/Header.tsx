import { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  Phone,
  ChevronDown,
  Sparkles,
  ArrowRight,
  Search,
  User,
  Heart,
  ShoppingBag,
  MapPin,
  Navigation,
} from 'lucide-react';
import { getWhatsAppUrl, PHONE_DISPLAY, PHONE_TEL } from '@/utils/constants';
import { WhatsAppIcon } from '@/components/shared/Icons';
import { useStorefront } from '@/context/StorefrontContext';

const ANNOUNCEMENT_MESSAGES = [
  'Crafted for your sweetest celebrations.',
  'Discover our signature cake collection.',
  'Thoughtfully made, beautifully delivered.',
];

const MOBILE_NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Cakes', href: '/cakes' },
  { label: 'Custom Cakes', href: '/custom-cakes' },
  { label: 'Korean Bento Cakes', href: '/bento-cakes' },
  { label: 'Cheesecakes & Desserts', href: '/desserts' },
  { label: 'Our Outlets (5 Boutiques)', href: '/outlets' },
  { label: 'Our Story', href: '/our-story' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'Franchise', href: '/franchise' },
];

function Logo({ onClick }: { onClick?: () => void } = {}) {
  return (
    <Link
      to="/"
      onClick={onClick}
      className="group flex shrink-0 items-center transition-all duration-300 hover:scale-[1.03]"
      aria-label="La Haven Cake Boutique — Made with Love. Baked to Perfection. (Home)"
    >
      <img
        src="/images/logo-transparent.png?v=3"
        alt="La Haven Cake Boutique"
        width={632}
        height={321}
        loading="eager"
        className="h-10 w-auto object-contain transition-transform duration-300 group-hover:rotate-[-1deg] sm:h-11 lg:h-12"
      />
    </Link>
  );
}

export default function Header() {
  const [announcementIdx, setAnnouncementIdx] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const {
    cartCount,
    wishlistIds,
    openDrawer,
    nearestOutlet,
    outletDistanceKm,
    outletDriveMinutes,
    directionsUrl,
    isLocatingOutlet,
    setIsOutletModalOpen,
  } = useStorefront();

  // Rotate announcement bar messages gently
  useEffect(() => {
    const timer = setInterval(() => {
      setAnnouncementIdx((prev) => (prev + 1) % ANNOUNCEMENT_MESSAGES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 16);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname, location.search]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);

  const whatsappUrl = getWhatsAppUrl(
    "Hi LaHaven! I'd like to check cake availability and place an order."
  );

  return (
    <header className="sticky top-0 z-50 w-full bg-[#F5EFEB] backdrop-blur-md transition-shadow duration-300">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:z-[60] focus:rounded-full focus:bg-[#365D60] focus:px-4 focus:py-1.5 focus:font-sans focus:text-xs focus:font-semibold focus:text-[#F5EFEB]"
      >
        Skip to content
      </a>

      {/* ── Section 1: Slim Rotating Announcement Bar with Nearest Boutique ── */}
      <div className="border-b border-[#2C4C4F] bg-[#365D60] px-3.5 sm:px-4 py-1.5 text-[#F5EFEB]">
        <div className="premium-container flex items-center justify-between text-[11px] font-sans tracking-wide">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsOutletModalOpen(true)}
              className="flex items-center gap-1.5 text-[#F5EFEB]/90 hover:text-white transition-colors group cursor-pointer text-left"
              title="Click to view all 5 Bengaluru boutiques or change location"
            >
              <MapPin className="h-3.5 w-3.5 text-[#B6C69F] shrink-0 group-hover:scale-110 transition-transform" />
              <span className="font-medium">
                Nearest Boutique:{' '}
                <strong className="font-semibold text-white">
                  {nearestOutlet.area}
                </strong>
                {isLocatingOutlet ? (
                  <span className="text-[#B6C69F] text-[10.5px] ml-1 font-normal">(Locating...)</span>
                ) : outletDistanceKm !== null ? (
                  <span className="text-[#B6C69F] font-semibold ml-1">
                    ({outletDistanceKm} km)
                  </span>
                ) : null}
              </span>
              <span className="hidden sm:inline text-[#B6C69F] underline text-[10.5px] ml-1">
                Change
              </span>
            </button>

            {/* Direct Directions Link */}
            <a
              href={directionsUrl || nearestOutlet.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-1 rounded-full bg-white/10 hover:bg-white/20 px-2 py-0.5 text-[10.5px] font-semibold text-[#FAF7F2] transition-colors"
              title="Open turn-by-turn navigation on Google Maps"
            >
              <Navigation className="h-2.5 w-2.5 text-[#B6C69F]" />
              <span>Directions</span>
            </a>
          </div>

          <div className="hidden lg:flex mx-auto items-center gap-2 font-medium">
            <Sparkles className="h-3.5 w-3.5 shrink-0 text-[#B6C69F]" />
            <AnimatePresence mode="wait">
              <motion.span
                key={announcementIdx}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.25 }}
                className="text-center"
              >
                {ANNOUNCEMENT_MESSAGES[announcementIdx]}
              </motion.span>
            </AnimatePresence>
          </div>

          <button
            type="button"
            onClick={() => setIsOutletModalOpen(true)}
            className="flex items-center gap-1.5 rounded-full bg-[#B6C69F] px-3 py-0.5 font-sans text-xs font-semibold text-[#25313A] shadow-2xs transition-all hover:bg-[#A5B68D] cursor-pointer shrink-0"
          >
            <span>5 Boutiques</span>
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>
      </div>

      {/* ── Main Coordinated Navigation Bar ── */}
      <div
        className={`border-b border-[#DFD7CF] bg-[#F5EFEB]/95 transition-all duration-300 ${
          isScrolled ? 'py-2.5 shadow-[0_4px_20px_rgba(37,49,58,0.06)]' : 'py-3.5'
        }`}
      >
        <div className="premium-container flex items-center justify-between gap-4">
          {/* Left: Brand Wordmark */}
          <Logo />

          {/* Center: Desktop Primary Navigation */}
          <nav
            className="hidden items-center gap-1.5 font-sans lg:flex xl:gap-2"
            aria-label="Main navigation"
          >
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? 'rounded-full bg-[#B6C69F] px-4 py-1.5 text-[13.5px] font-semibold text-[#25313A] shadow-xs transition-all xl:text-[14px]'
                  : 'rounded-full px-3.5 py-1.5 text-[13.5px] font-medium text-[#25313A] transition-colors hover:text-[#365D60] xl:text-[14px]'
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/cakes"
              className={({ isActive }) =>
                isActive
                  ? 'rounded-full bg-[#B6C69F] px-4 py-1.5 text-[13.5px] font-semibold text-[#25313A] shadow-xs transition-all xl:text-[14px]'
                  : 'rounded-full px-3.5 py-1.5 text-[13.5px] font-medium text-[#25313A] transition-colors hover:text-[#365D60] xl:text-[14px]'
              }
            >
              Cakes
            </NavLink>

            <NavLink
              to="/custom-cakes"
              className={({ isActive }) =>
                isActive
                  ? 'rounded-full bg-[#B6C69F] px-4 py-1.5 text-[13.5px] font-semibold text-[#25313A] shadow-xs transition-all xl:text-[14px]'
                  : 'rounded-full px-3.5 py-1.5 text-[13.5px] font-medium text-[#25313A] transition-colors hover:text-[#365D60] xl:text-[14px]'
              }
            >
              Custom Cakes
            </NavLink>

            <NavLink
              to="/outlets"
              className={({ isActive }) =>
                isActive
                  ? 'rounded-full bg-[#B6C69F] px-4 py-1.5 text-[13.5px] font-semibold text-[#25313A] shadow-xs transition-all xl:text-[14px]'
                  : 'rounded-full px-3.5 py-1.5 text-[13.5px] font-medium text-[#25313A] transition-colors hover:text-[#365D60] xl:text-[14px]'
              }
            >
              Our Outlets
            </NavLink>

            <NavLink
              to="/our-story"
              className={({ isActive }) =>
                isActive
                  ? 'rounded-full bg-[#B6C69F] px-4 py-1.5 text-[13.5px] font-semibold text-[#25313A] shadow-xs transition-all xl:text-[14px]'
                  : 'rounded-full px-3.5 py-1.5 text-[13.5px] font-medium text-[#25313A] transition-colors hover:text-[#365D60] xl:text-[14px]'
              }
            >
              Our Story
            </NavLink>

            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive
                  ? 'rounded-full bg-[#B6C69F] px-4 py-1.5 text-[13.5px] font-semibold text-[#25313A] shadow-xs transition-all xl:text-[14px]'
                  : 'rounded-full px-3.5 py-1.5 text-[13.5px] font-medium text-[#25313A] transition-colors hover:text-[#365D60] xl:text-[14px]'
              }
            >
              Contact
            </NavLink>

            <NavLink
              to="/franchise"
              className={({ isActive }) =>
                isActive
                  ? 'rounded-full bg-[#B6C69F] px-4 py-1.5 text-[13.5px] font-semibold text-[#25313A] shadow-xs transition-all xl:text-[14px]'
                  : 'rounded-full px-3.5 py-1.5 text-[13.5px] font-medium text-[#25313A] transition-colors hover:text-[#365D60] xl:text-[14px]'
              }
            >
              Franchise
            </NavLink>
          </nav>

          {/* Right: Search, Wishlist & Shopping Bag */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Button */}
            <button
              type="button"
              onClick={() => openDrawer('search')}
              aria-label="Search cakes"
              className="flex h-9 w-9 items-center justify-center rounded-full text-[#25313A] transition-colors hover:bg-[#EBE5DF]/60 hover:text-[#365D60]"
            >
              <Search className="h-[18px] w-[18px]" />
            </button>

            {/* Wishlist Button with Live Count */}
            <button
              type="button"
              onClick={() => openDrawer('wishlist')}
              aria-label={`Wishlist (${wishlistIds.length} items)`}
              className="relative flex h-9 w-9 items-center justify-center rounded-full text-[#25313A] transition-colors hover:bg-[#EBE5DF]/60 hover:text-[#365D60]"
            >
              <Heart className="h-[18px] w-[18px]" />
              {wishlistIds.length > 0 && (
                <motion.span
                  key={wishlistIds.length}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: [0.8, 1.25, 1] }}
                  transition={{ duration: 0.3 }}
                  className="absolute right-0.5 top-0.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-[#B6C69F] px-1 font-sans text-[9.5px] font-bold text-[#25313A] shadow-2xs"
                >
                  {wishlistIds.length}
                </motion.span>
              )}
            </button>

            {/* Shopping Bag Button with Live Cart Count */}
            <button
              type="button"
              onClick={() => openDrawer('cart')}
              aria-label={`Shopping bag (${cartCount} items)`}
              className="relative flex h-9 w-9 items-center justify-center rounded-full text-[#25313A] transition-colors hover:bg-[#EBE5DF]/60 hover:text-[#365D60]"
            >
              <ShoppingBag className="h-[18px] w-[18px]" />
              {cartCount > 0 && (
                <motion.span
                  key={cartCount}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: [0.8, 1.25, 1] }}
                  transition={{ duration: 0.3 }}
                  className="absolute right-0.5 top-0.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-[#365D60] px-1 font-sans text-[9.5px] font-bold text-[#F5EFEB] shadow-2xs"
                >
                  {cartCount}
                </motion.span>
              )}
            </button>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={isMobileMenuOpen}
              className="flex h-9 w-9 items-center justify-center rounded-full text-[#25313A] hover:bg-[#EBE5DF]/60 lg:hidden"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile Slide-Out Navigation Drawer Portaled to Document Body ── */}
      {typeof document !== 'undefined' &&
        createPortal(
          <div
            className={`fixed inset-0 z-[100] overflow-hidden transition-all duration-300 ${
              isMobileMenuOpen
                ? 'pointer-events-auto visible'
                : 'pointer-events-none invisible delay-200'
            }`}
            aria-hidden={!isMobileMenuOpen}
          >
            {/* Backdrop */}
            <div
              onClick={() => setIsMobileMenuOpen(false)}
              className={`fixed inset-0 bg-[#25313A]/65 backdrop-blur-sm transition-opacity duration-300 ${
                isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
              }`}
              aria-hidden="true"
            />

            {/* Drawer Panel */}
            <aside
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              className={`fixed inset-y-0 right-0 z-10 flex h-full w-full max-w-full flex-col bg-[#F5EFEB] shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] sm:max-w-md ${
                isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
              }`}
            >
              {/* Top Bar with Brand Logo and Close Button */}
              <div className="flex shrink-0 items-center justify-between border-b border-[#DFD7CF] bg-[#F5EFEB] px-5 py-3.5 sm:px-6 sm:py-4">
                <Logo onClick={() => setIsMobileMenuOpen(false)} />
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Close navigation menu"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#DFD7CF] bg-[#EBE5DF]/40 text-[#25313A] transition-colors hover:border-[#365D60] hover:text-[#365D60]"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Scrollable Navigation Area */}
              <div className="no-scrollbar flex-1 min-h-0 overflow-y-auto px-5 py-4 overscroll-contain sm:px-6">
                {/* Quick Search Trigger */}
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    openDrawer('search');
                  }}
                  className="mb-3.5 flex w-full items-center gap-2.5 rounded-full border border-[#DFD7CF] bg-[#EBE5DF]/40 px-4 py-2.5 text-left font-sans text-xs text-[#6B5E55] transition-colors hover:border-[#365D60] hover:bg-[#F5EFEB]"
                >
                  <Search className="h-4 w-4 text-[#365D60]" />
                  <span>Search Belgian truffle, bento, mango...</span>
                </button>

                {/* Navigation Links with exact active routing */}
                <nav aria-label="Mobile links">
                  <ul className="space-y-1">
                    {MOBILE_NAV_LINKS.map((item) => (
                      <li key={item.href + item.label}>
                        <NavLink
                          to={item.href}
                          end={item.href === '/'}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={({ isActive }) =>
                            `flex items-center justify-between rounded-xl px-4 py-2 font-serif text-base font-semibold transition-colors sm:py-2.5 sm:text-lg ${
                              isActive
                                ? 'bg-[#365D60] text-[#F5EFEB] shadow-2xs'
                                : 'text-[#25313A] hover:bg-[#EBE5DF]/50 hover:text-[#365D60]'
                            }`
                          }
                        >
                          {({ isActive }) => (
                            <>
                              <span>{item.label}</span>
                              <ArrowRight
                                className={`h-4 w-4 ${
                                  isActive ? 'text-[#F5EFEB]' : 'text-[#B6C69F]'
                                }`}
                              />
                            </>
                          )}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </nav>

                {/* Popular Flavours & Categories */}
                <div className="mt-5 border-t border-[#DFD7CF] pt-4">
                  <p className="mb-2.5 font-sans text-[10px] font-bold uppercase tracking-[0.18em] text-[#6B5E55]">
                    Popular Flavours &amp; Categories
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { label: 'Belgian Truffle', href: '/cakes?flavour=chocolate' },
                      { label: 'Fresh Fruit', href: '/cakes?flavour=fruit-berry' },
                      { label: 'Red Velvet', href: '/cakes?flavour=cream-vanilla' },
                      { label: 'Korean Bento', href: '/bento-cakes' },
                      { label: 'Cheesecakes', href: '/desserts' },
                      { label: 'Custom Cakes', href: '/custom-cakes' },
                    ].map((chip) => (
                      <Link
                        key={chip.label}
                        to={chip.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="rounded-full border border-[#DFD7CF] bg-[#EBE5DF]/40 px-3 py-1 font-sans text-xs font-medium text-[#25313A] transition-colors hover:border-[#365D60] hover:text-[#365D60]"
                      >
                        {chip.label}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Quick Access to Account and Wishlist */}
                <div className="mt-5 grid grid-cols-2 gap-2 border-t border-[#DFD7CF] pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      openDrawer('account');
                    }}
                    className="flex items-center justify-center gap-2 rounded-xl border border-[#DFD7CF] bg-[#EBE5DF]/40 py-2.5 font-sans text-xs font-semibold text-[#25313A] transition-colors hover:border-[#365D60]"
                  >
                    <User className="h-4 w-4 text-[#365D60]" />
                    <span>My Account</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      openDrawer('wishlist');
                    }}
                    className="flex items-center justify-center gap-2 rounded-xl border border-[#DFD7CF] bg-[#EBE5DF]/40 py-2.5 font-sans text-xs font-semibold text-[#25313A] transition-colors hover:border-[#365D60]"
                  >
                    <Heart className="h-4 w-4 text-[#365D60]" />
                    <span>Wishlist ({wishlistIds.length})</span>
                  </button>
                </div>

                {/* Nearest Boutique Card with Live Road Distance & Directions */}
                <div className="mt-4 rounded-xl border border-[#DFD7CF] bg-[#EBE5DF]/40 p-3.5 text-xs">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2.5">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#365D60] text-[#F5EFEB]">
                        <MapPin className="h-3.5 w-3.5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B5E55] block">
                          Nearest Boutique
                        </span>
                        <p className="font-serif text-sm font-semibold text-[#25313A]">
                          {nearestOutlet.name.replace('LaHaven', 'La Heaven')} ({nearestOutlet.area})
                        </p>
                        {outletDistanceKm !== null ? (
                          <p className="mt-0.5 text-[11px] font-medium text-[#365D60]">
                            {outletDistanceKm} km away {outletDriveMinutes ? `(~${outletDriveMinutes} mins drive)` : ''}
                          </p>
                        ) : (
                          <p className="mt-0.5 text-[11px] text-[#6B5E55]">
                            {nearestOutlet.address}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center gap-2 pt-2.5 border-t border-[#DFD7CF]">
                    <a
                      href={directionsUrl || nearestOutlet.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#365D60] py-2 text-[11px] font-semibold text-[#F5EFEB] hover:bg-[#2C4C4F] transition-colors"
                    >
                      <Navigation className="h-3 w-3 text-[#B6C69F]" />
                      <span>Directions</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        setIsOutletModalOpen(true);
                      }}
                      className="flex-1 inline-flex items-center justify-center rounded-lg border border-[#DFD7CF] bg-[#F5EFEB] py-2 text-[11px] font-semibold text-[#25313A] hover:border-[#365D60] transition-colors"
                    >
                      <span>5 Boutiques</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Bottom Quick-Action Buttons */}
              <div className="shrink-0 space-y-2 border-t border-[#DFD7CF] bg-[#F5EFEB] px-5 py-3.5 pb-6 sm:px-6">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-full bg-[#365D60] py-3.5 font-sans text-xs font-bold uppercase tracking-wider text-[#F5EFEB] shadow-sm transition-colors hover:bg-[#2C4C4F]"
                >
                  <WhatsAppIcon className="h-4 w-4 fill-[#F5EFEB]" />
                  <span>WhatsApp Concierge</span>
                </a>
                <a
                  href={PHONE_TEL}
                  className="flex items-center justify-center gap-2 rounded-full border border-[#DFD7CF] bg-[#EBE5DF]/40 py-3 font-sans text-xs font-semibold text-[#25313A] transition-colors hover:border-[#365D60]"
                >
                  <Phone className="h-3.5 w-3.5 text-[#365D60]" />
                  <span>Call {PHONE_DISPLAY}</span>
                </a>
              </div>
            </aside>
              </div>,
          document.body
        )}
    </header>
  );
}
