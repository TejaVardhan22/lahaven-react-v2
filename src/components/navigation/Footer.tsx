import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Heart, Sparkles, Leaf, Truck, Clock } from 'lucide-react';
import {
  WHATSAPP_URL,
  PHONE_DISPLAY,
  PHONE_TEL,
  EMAIL,
  EMAIL_MAILTO,
  INSTAGRAM_URL,
  FACEBOOK_URL,
  YOUTUBE_URL,
  DEVELOPER_NAME,
  DEVELOPER_WHATSAPP_NUMBER,
  DEVELOPER_WHATSAPP_DISPLAY,
  getWhatsAppUrl,
} from '@/utils/constants';
import {
  WhatsAppIcon,
  InstagramIcon,
  FacebookIcon,
  YouTubeIcon,
} from '@/components/shared/Icons';

export default function Footer() {
  const currentYear = 2026;

  return (
    <footer className="border-t border-[#DFD7CF] bg-[#F5EFEB] text-[#25313A]" role="contentinfo">
      {/* ── Main Footer Grid ── */}
      <div className="section-rail py-14 sm:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-10 pb-10">
          
          {/* ── Column 1: BRAND SECTION (Span 4) ── */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <Link
              to="/"
              className="inline-block transition-opacity hover:opacity-90"
              aria-label="La Heaven Cake Boutique — Home"
            >
              <img
                src="/images/logo-transparent.png?v=3"
                alt="La Heaven Cake Boutique"
                width={632}
                height={321}
                className="h-11 w-auto object-contain"
              />
            </Link>

            <div className="my-3 space-y-1">
              <p className="font-serif text-[22px] font-semibold leading-[1.25] text-[#25313A]">
                Created for every occasion
              </p>
              <p className="font-sans text-xs font-medium text-[#6B5E55]">
                Freshly crafted. Always eggless.
              </p>
            </div>

            {/* Brand Eyebrow Badge */}
            <span className="mt-2 inline-flex items-center gap-2 rounded-full bg-[#25313A] px-3.5 py-1 text-[9.5px] font-bold uppercase tracking-[0.16em] text-[#F5EFEB] shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[#B6C69F]" aria-hidden="true" />
              <span>100% EGGLESS • HANDCRAFTED IN BENGALURU</span>
            </span>

            {/* Social Media Links with Icon Pills */}
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-[#DFD7CF] bg-[#FFFFFF] px-3 py-1 font-sans text-xs font-semibold text-[#25313A] shadow-2xs transition-all hover:border-[#365D60] hover:text-[#365D60] hover:scale-105"
                aria-label="Instagram"
              >
                <InstagramIcon className="h-3.5 w-3.5 text-[#365D60]" />
                <span>Instagram</span>
              </a>
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-[#DFD7CF] bg-[#FFFFFF] px-3 py-1 font-sans text-xs font-semibold text-[#25313A] shadow-2xs transition-all hover:border-[#365D60] hover:text-[#365D60] hover:scale-105"
                aria-label="Facebook"
              >
                <FacebookIcon className="h-3.5 w-3.5 text-[#365D60]" />
                <span>Facebook</span>
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-[#DFD7CF] bg-[#FFFFFF] px-3 py-1 font-sans text-xs font-semibold text-[#25313A] shadow-2xs transition-all hover:border-[#365D60] hover:text-[#365D60] hover:scale-105"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon className="h-3.5 w-3.5 fill-[#365D60]" />
                <span>WhatsApp</span>
              </a>
              <a
                href={YOUTUBE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-[#DFD7CF] bg-[#FFFFFF] px-3 py-1 font-sans text-xs font-semibold text-[#25313A] shadow-2xs transition-all hover:border-[#365D60] hover:text-[#365D60] hover:scale-105"
                aria-label="YouTube"
              >
                <YouTubeIcon className="h-3.5 w-3.5 text-[#365D60]" />
                <span>YouTube</span>
              </a>
            </div>
          </div>

          {/* ── Column 2: THE GOOD STUFF (Span 3) ── */}
          <div className="lg:col-span-3 flex flex-col items-start gap-2.5 text-xs">
            <h3 className="mb-1 font-sans text-xs font-bold uppercase tracking-[0.16em] text-[#25313A]">
              THE GOOD STUFF
            </h3>
            <Link
              to="/cakes"
              className="font-medium text-[#25313A]/85 transition-colors hover:text-[#365D60] hover:underline"
            >
              Shop All Cakes
            </Link>
            <Link
              to="/cakes?category=All+Cakes&sort=popular"
              className="font-medium text-[#25313A]/85 transition-colors hover:text-[#365D60] hover:underline"
            >
              Best Sellers
            </Link>
            <Link
              to="/bento-cakes"
              className="font-medium text-[#25313A]/85 transition-colors hover:text-[#365D60] hover:underline"
            >
              Bento Cakes
            </Link>
            <Link
              to="/custom-cakes"
              className="font-medium text-[#25313A]/85 transition-colors hover:text-[#365D60] hover:underline"
            >
              Custom Cakes
            </Link>
            <Link
              to="/desserts"
              className="font-medium text-[#25313A]/85 transition-colors hover:text-[#365D60] hover:underline"
            >
              Desserts &amp; Cheesecakes
            </Link>
          </div>

          {/* ── Column 3: ABOUT LA HEAVEN (Span 2) ── */}
          <div className="lg:col-span-2 flex flex-col items-start gap-2.5 text-xs">
            <h3 className="mb-1 font-sans text-xs font-bold uppercase tracking-[0.16em] text-[#25313A]">
              ABOUT LA HEAVEN
            </h3>
            <Link
              to="/our-story"
              className="font-medium text-[#25313A]/85 transition-colors hover:text-[#365D60] hover:underline"
            >
              Our Story
            </Link>
            <Link
              to="/outlets"
              className="font-medium text-[#25313A]/85 transition-colors hover:text-[#365D60] hover:underline"
            >
              Our Boutiques
            </Link>
            <Link
              to="/franchise"
              className="font-medium text-[#25313A]/85 transition-colors hover:text-[#365D60] hover:underline"
            >
              Franchise Opportunities
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-1 font-medium text-[#25313A]/85 transition-colors hover:text-[#365D60] hover:underline"
            >
              <span>Contact Us</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* ── Column 4: COME SAY HELLO (Span 3) ── */}
          <div className="lg:col-span-3 flex flex-col items-start gap-3 text-xs">
            <h3 className="mb-0.5 font-sans text-xs font-bold uppercase tracking-[0.16em] text-[#25313A]">
              COME SAY HELLO
            </h3>

            <div className="space-y-1">
              <p className="font-serif text-lg font-bold text-[#25313A]">
                Let's Make Life Sweeter
              </p>
              <p className="font-sans text-[11.5px] leading-relaxed text-[#6B5E55]">
                Have a question or planning a celebration? We'd love to hear from you.
              </p>
            </div>

            {/* Deep Teal Pill Button */}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#365D60] px-5 py-2.5 font-sans text-xs font-bold uppercase tracking-wider text-[#F5EFEB] shadow-sm transition-all hover:bg-[#2C4C4F] hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
            >
              <WhatsAppIcon className="h-3.5 w-3.5 fill-[#F5EFEB]" />
              <span>LET'S TALK ON WHATSAPP</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
            
            {/* Contact Details */}
            <div className="space-y-1 pt-1 text-[11.5px] leading-[1.7] text-[#6B5E55]">
              <p className="font-semibold text-[#25313A]">
                14+ Boutiques Across Bengaluru
              </p>
              <p>
                Call:{' '}
                <a
                  href={PHONE_TEL}
                  className="font-semibold text-[#365D60] hover:underline"
                >
                  {PHONE_DISPLAY}
                </a>
              </p>
              <p>
                Email:{' '}
                <a
                  href={EMAIL_MAILTO}
                  className="font-medium text-[#25313A] hover:text-[#365D60] hover:underline"
                >
                  {EMAIL}
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* ── FOOTER BADGES STRIP ── */}
        <div className="border-t border-[#DFD7CF] pt-6 pb-4">
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs font-semibold text-[#25313A]">
            <div className="flex items-center gap-2">
              <Leaf className="h-4 w-4 text-[#365D60]" strokeWidth={2} />
              <span>100% Eggless</span>
            </div>
            <span className="hidden sm:inline text-[#DFD7CF]">•</span>
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-[#B6C69F]" strokeWidth={2} />
              <span>Freshly Made</span>
            </div>
            <span className="hidden sm:inline text-[#DFD7CF]">•</span>
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-[#365D60]" strokeWidth={2} />
              <span>Same-Day Delivery</span>
            </div>
          </div>
        </div>

        {/* ── FOOTER BOTTOM COPYRIGHT & MOTTO ── */}
        <div className="flex flex-col items-center justify-between gap-3 border-t border-[#DFD7CF] pt-6 text-[11px] text-[#6B5E55] sm:flex-row">
          <p className="font-medium">
            &copy; {currentYear} La Heaven Cake Boutique. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-4 sm:gap-5">
            <span className="inline-flex items-center gap-1.5 font-serif text-sm font-semibold text-[#365D60]">
              La Heaven. Celebration starts here!
              <Heart className="h-3.5 w-3.5 fill-[#365D60] text-[#365D60]" />
            </span>
            <span className="text-[#DFD7CF]">•</span>
            <span>
              Designed by{' '}
              <a
                href={getWhatsAppUrl(
                  `Hi ${DEVELOPER_NAME}! I saw the La Heaven website and would like to discuss a project.`,
                  DEVELOPER_WHATSAPP_NUMBER
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-[#25313A] hover:text-[#365D60] hover:underline"
              >
                {DEVELOPER_NAME}
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
