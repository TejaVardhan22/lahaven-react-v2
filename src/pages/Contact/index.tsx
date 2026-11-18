import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Clock,
  Heart,
  Check,
  ArrowUpRight,
  ArrowDown,
  Sparkles,
  Phone,
  MessageCircle,
} from 'lucide-react';
import { SEOHead } from '@/components/seo/SEOHead';
import { pageSEO } from '@/data/seo';
import { outlets } from '@/data/outlets';
import {
  PHONE_DISPLAY,
  PHONE_TEL,
  EMAIL,
  EMAIL_MAILTO,
  getWhatsAppUrl,
} from '@/utils/constants';
import { WhatsAppIcon } from '@/components/shared/Icons';
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/shared/AnimatedSection';

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  kind: string;
  outlet: string;
  message: string;
  consent: boolean;
}

const INITIAL_FORM: ContactForm = {
  name: '',
  email: '',
  phone: '',
  kind: 'General',
  outlet: 'Any Nearest Boutique',
  message: '',
  consent: true,
};

export const Contact: React.FC = () => {
  const [form, setForm] = useState<ContactForm>(INITIAL_FORM);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.message.trim()) {
      setErrorMsg('Please fill in your name, phone number, and message.');
      setStatus('error');
      return;
    }

    setStatus('loading');
    setErrorMsg('');

    // Format WhatsApp message as backup direct concierge routing
    const formattedWhatsApp = [
      '✨ *NEW HELLO — LAHAVEN CAKE BOUTIQUE*',
      '━━━━━━━━━━━━━━━━━━━━━',
      `✦ *Name:* ${form.name.trim()}`,
      `☎ *Phone:* ${form.phone.trim()}`,
      form.email ? `✉️ *Email:* ${form.email.trim()}` : '',
      `🏷️ *Topic:* ${form.kind}`,
      `📍 *Preferred Boutique:* ${form.outlet}`,
      '',
      `💬 *Message:*`,
      form.message.trim(),
      '━━━━━━━━━━━━━━━━━━━━━',
    ]
      .filter(Boolean)
      .join('\n');

    // Simulate clean dispatch and provide direct WhatsApp link in success
    setTimeout(() => {
      setStatus('success');
      // Also open WhatsApp in new tab if user is on mobile
      if (typeof window !== 'undefined' && window.innerWidth < 768) {
        window.open(getWhatsAppUrl(formattedWhatsApp), '_blank', 'noopener,noreferrer');
      }
    }, 600);
  };

  const whatsappDirectUrl = getWhatsAppUrl(
    'Hi LaHaven! I would like to get in touch with your team.'
  );

  return (
    <main className="min-h-screen bg-[#F5EFEB]">
      <SEOHead
        title={pageSEO.contact.title}
        description={pageSEO.contact.description}
        canonicalUrl={pageSEO.contact.canonicalUrl}
        ogTitle={pageSEO.contact.ogTitle}
        ogDescription={pageSEO.contact.ogDescription}
        ogImage={pageSEO.contact.ogImage}
        twitterCard={pageSEO.contact.twitterCard}
      />

      {/* ── 1. Split-Screen Hero Banner Matching Hero Section Reference ── */}
      <section className="relative overflow-hidden bg-[#F5EFEB] pt-8 pb-10 sm:pt-12 sm:pb-14 lg:pt-14 lg:pb-16 border-b border-[#DFD7CF]">
        {/* Soft ambient sage glow */}
        <div className="pointer-events-none absolute -right-20 -top-20 -z-10 h-[520px] w-[520px] rounded-full bg-[#B6C69F]/20 blur-3xl" />
        <div className="pointer-events-none absolute left-0 bottom-0 -z-10 h-[300px] w-[300px] rounded-full bg-[#365D60]/5 blur-3xl" />

        <div className="premium-container">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-8">
            {/* ── Left Column: Editorial Copy, Badge & CTAs ── */}
            <AnimatedSection animation="fadeUp" className="lg:col-span-6 xl:col-span-6 pt-2 lg:pt-0">
              {/* Small Label */}
              <p className="text-[11px] sm:text-xs font-semibold tracking-[0.22em] uppercase text-[#6B5E55] mb-5">
                COME SAY HELLO
              </p>

              {/* Main Headline */}
              <h1 className="font-serif text-[clamp(2.4rem,4.4vw,4.15rem)] font-normal leading-[1.12] tracking-tight text-[#25313A]">
                <span className="block">Let’s Make Life</span>
                <span className="block font-serif font-bold text-[#365D60]">
                  A Little Sweeter.
                </span>
              </h1>

              {/* Description Body */}
              <p className="mt-4 max-w-lg font-sans text-base sm:text-[17px] font-normal leading-relaxed text-[#6B5E55]">
                Have a celebration planned, an ingredient question, or need same-day delivery assistance? Our central concierge and neighbourhood boutique desks are here for you every single day.
              </p>

              {/* Secondary Subtext */}
              <p className="mt-3 font-sans text-xs sm:text-sm font-semibold text-[#365D60]">
                We reply within minutes on WhatsApp during kitchen hours.
              </p>

              {/* Clean Badge */}
              <div className="mt-7 flex items-center gap-2.5">
                <MapPin className="h-5 w-5 text-[#365D60] shrink-0" strokeWidth={1.8} />
                <span className="text-xs sm:text-[13px] font-semibold text-[#25313A]">
                  5 Boutiques in Bengaluru • Concierge Active Daily
                </span>
              </div>

              {/* Action CTA Buttons */}
              <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4">
                <a
                  href="#contact-form-section"
                  className="inline-flex items-center justify-center gap-2.5 rounded-full bg-[#365D60] px-7 sm:px-8 py-3.5 font-sans text-sm font-semibold tracking-wide text-[#F5EFEB] shadow-sm transition-all duration-300 hover:bg-[#2C4C4F] hover:shadow-md hover:scale-[1.02] active:scale-100"
                >
                  <span>Send a Note</span>
                  <ArrowDown className="h-4 w-4" />
                </a>
                <a
                  href={getWhatsAppUrl('Hi LaHeaven! I have a question about celebration cakes and ordering.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#365D60] bg-transparent px-7 sm:px-8 py-3.5 font-sans text-sm font-semibold tracking-wide text-[#365D60] transition-all duration-300 hover:bg-[#365D60]/10 hover:scale-[1.02] active:scale-100"
                >
                  <WhatsAppIcon className="h-4 w-4 fill-[#365D60]" />
                  <span>WhatsApp Concierge</span>
                </a>
              </div>
            </AnimatedSection>

            {/* ── Right Column: Showcase Visual with Sage Curved Backdrop ── */}
            <AnimatedSection animation="scaleUp" delay={0.12} className="lg:col-span-6 xl:col-span-6 relative flex items-center justify-center lg:justify-end">
              <div className="relative w-full max-w-[580px]">
                {/* Organic Sage Green Backdrop Shape */}
                <div className="pointer-events-none absolute -right-3 sm:-right-5 -top-5 sm:-top-7 h-[105%] w-[88%] rounded-tr-[90px] rounded-bl-[60px] rounded-tl-[30px] rounded-br-[30px] bg-[#B6C69F]/45 transition-transform duration-700" />

                <div className="relative z-10 w-full overflow-hidden rounded-3xl border border-[#DFD7CF] bg-[#FFFFFF] shadow-[0_16px_48px_rgba(37,49,58,0.08)]">
                  <div className="relative aspect-[16/11] w-full overflow-hidden bg-[#EBE5DF]">
                    <img
                      src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=1200&q=85&auto=format&fit=crop"
                      alt="La Heaven Boutique Concierge & Hospitality Desk in Bengaluru"
                      width={1200}
                      height={825}
                      loading="eager"
                      fetchPriority="high"
                      className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#25313A]/75 via-transparent to-transparent" />

                    {/* Bottom Status Strip */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[#F5EFEB]">
                      <div className="flex items-center gap-2">
                        <span className="flex h-2.5 w-2.5 rounded-full bg-[#25D366] ring-4 ring-[#25D366]/30 animate-pulse" />
                        <span className="font-sans text-xs font-bold tracking-wide">
                          Concierge Online
                        </span>
                      </div>
                      <span className="rounded-full bg-[#FFFFFF]/25 px-3 py-1 font-sans text-[11px] font-semibold backdrop-blur-md">
                        10:00 AM – 10:30 PM
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── 2. Editorial Two-Column Contact Layout ── */}
      <section id="contact-form-section" className="contact-layout section-rail">
        {/* Left Column: Direct Info & Addresses */}
        <aside>
          <span className="eyebrow">The kettle’s on</span>
          <h2>We’re all ears.</h2>
          <p>
            Have an ingredient question? Planning a celebration? Wondering where your treats
            are? You’re in the right place.
          </p>

          {/* Boutique Locations */}
          <div className="contact-detail">
            <MapPin size={21} />
            <div>
              <h3>Bengaluru, India</h3>
              <p>
                5 boutique patisseries across Frazer Town, Malleshwaram, Sahakarnagar,
                Sanjayanagar, and Yelahanka New Town.
              </p>
              <Link to="/outlets" className="text-link">
                <span>Explore boutique locations</span>
                <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>

          {/* WhatsApp & Concierge */}
          <div className="contact-detail">
            <MessageCircle size={21} />
            <div>
              <h3>WhatsApp &amp; Phone</h3>
              <p>
                Need an immediate answer or same-day cake availability? Our pastry concierge is
                available daily.
              </p>
              <a
                href={whatsappDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-link"
              >
                <span>Chat directly on WhatsApp</span>
                <ArrowUpRight size={14} />
              </a>
              <span className="block mt-1 font-sans text-xs text-[#6B5E55]">
                Call: <a href={PHONE_TEL} className="underline hover:text-[#365D60]">{PHONE_DISPLAY}</a>
              </span>
            </div>
          </div>

          {/* Boutique Hours */}
          <div className="contact-detail">
            <Clock size={21} />
            <div>
              <h3>Boutique Hours</h3>
              <p>Open daily from 10:00 AM – 10:30 PM for fresh pickup and doorstep chilled delivery.</p>
              <span className="block mt-1 font-sans text-xs text-[#6B5E55]">
                Email: <a href={EMAIL_MAILTO} className="underline hover:text-[#365D60]">{EMAIL}</a>
              </span>
            </div>
          </div>

          {/* Custom Cake Studio Teaser */}
          <div className="contact-detail">
            <Sparkles size={21} />
            <div>
              <h3>Looking for Bespoke Cakes?</h3>
              <p>Planning a wedding or themed birthday? Design your custom creation step-by-step.</p>
              <Link to="/custom-cakes" className="text-link">
                <span>Open Custom Cake Studio</span>
                <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>

          {/* Dietary & Allergen Note */}
          <div className="contact-allergen">
            <h3>A note on dietary &amp; allergen requests</h3>
            <p>
              Please let us know which ingredients you need to avoid. All our signature flavours
              are available 100% pure eggless (vegetarian), prepared on dedicated stations in our
              Bengaluru kitchens.
            </p>
          </div>
        </aside>

        {/* Right Column: Oat & Honey Enquiry Form or Success State */}
        <div>
          {status === 'success' ? (
            <div className="enquiry-success" role="status">
              <span>
                <Check size={32} />
              </span>
              <h2>Your hello made it here.</h2>
              <p>
                Thanks for getting in touch, {form.name} ! Your message has been received and our
                boutique team will get back to you shortly.
              </p>
              <div className="flex flex-wrap gap-4 items-center">
                <Link to="/cakes" className="button button-dark">
                  <span>Explore our treats</span>
                  <ArrowUpRight size={17} />
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setForm(INITIAL_FORM);
                    setStatus('idle');
                  }}
                  className="text-link"
                >
                  Send another message
                </button>
              </div>
            </div>
          ) : (
            <form className="enquiry-form" onSubmit={handleSubmit}>
              <div className="form-heading">
                <Heart size={22} strokeWidth={1.5} />
                <h2>Tell us what’s on your mind.</h2>
                <p>Questions, celebrations or just a friendly hello.</p>
              </div>

              {errorMsg && (
                <div className="mb-5 rounded-lg bg-[#F9CFCA] p-3 text-xs font-semibold text-[#233E40]">
                  {errorMsg}
                </div>
              )}

              <div className="form-grid">
                {/* Your Name */}
                <label>
                  <span>Your name *</span>
                  <input
                    type="text"
                    required
                    placeholder="Your lovely name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </label>

                {/* Email Address */}
                <label>
                  <span>Email address *</span>
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </label>

                {/* Phone Number */}
                <label>
                  <span>Phone number *</span>
                  <input
                    type="tel"
                    required
                    placeholder="+91 90000 00000"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  />
                </label>

                {/* Subject / Topic */}
                <label>
                  <span>What’s your hello about?</span>
                  <select
                    value={form.kind}
                    onChange={(e) => setForm({ ...form, kind: e.target.value })}
                  >
                    <option value="General">A general hello</option>
                    <option value="Celebrations">Custom cakes &amp; celebrations</option>
                    <option value="Allergens">Ingredients &amp; 100% eggless</option>
                    <option value="Orders">Same-day order &amp; delivery</option>
                    <option value="Franchise">Franchise partnership</option>
                  </select>
                </label>

                {/* Preferred Outlet */}
                <label className="full-width">
                  <span>Preferred Bengaluru Boutique (optional)</span>
                  <select
                    value={form.outlet}
                    onChange={(e) => setForm({ ...form, outlet: e.target.value })}
                  >
                    <option value="Any Nearest Boutique">Any Nearest Boutique</option>
                    {outlets.map((o) => (
                      <option key={o.id} value={o.name}>
                        {o.name} ({o.area})
                      </option>
                    ))}
                  </select>
                </label>

                {/* Message */}
                <label className="full-width">
                  <span>Your message *</span>
                  <textarea
                    required
                    placeholder="Tell us about your celebration date, flavour preference, or question..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                  />
                </label>
              </div>

              {/* Consent */}
              <div className="form-consent">
                <input
                  type="checkbox"
                  id="consent-check"
                  checked={form.consent}
                  onChange={(e) => setForm({ ...form, consent: e.target.checked })}
                />
                <label htmlFor="consent-check">
                  I am happy for LaHaven Cake Boutique to reply to my celebration enquiry via
                  WhatsApp or email.
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="button button-dark"
              >
                <span>{status === 'loading' ? 'Sending hello...' : 'Send your hello'}</span>
                <ArrowUpRight size={17} />
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
};

export default Contact;
