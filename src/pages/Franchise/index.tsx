import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Building2,
  ArrowDown,
  ArrowUpRight,
  Check,
  CheckCircle2,
  Heart,
  TrendingUp,
  Package,
  Award,
  Sparkles,
  Store,
  Clock,
  ShieldCheck,
  Users,
  Layers,
} from 'lucide-react';
import { SEOHead } from '@/components/seo/SEOHead';
import { pageSEO } from '@/data/seo';
import {
  PHONE_DISPLAY,
  PHONE_TEL,
  EMAIL,
  EMAIL_MAILTO,
  getWhatsAppUrl,
} from '@/utils/constants';
import { WhatsAppIcon } from '@/components/shared/Icons';
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/shared/AnimatedSection';

interface FranchiseForm {
  fullName: string;
  phone: string;
  email: string;
  cityLocality: string;
  investmentRange: string;
  experience: string;
  message: string;
  consent: boolean;
}

const INITIAL_FORM: FranchiseForm = {
  fullName: '',
  phone: '',
  email: '',
  cityLocality: '',
  investmentRange: '₹25L – ₹35L (Signature Boutique)',
  experience: 'Entrepreneur / First-time F&B',
  message: '',
  consent: true,
};

const BENEFITS = [
  {
    icon: Package,
    index: '01',
    title: 'Central Commissary & Chilled Daily Supply',
    text: 'Scratch-baked sponges, Belgian couverture ganaches, and fruit entremets dispatched fresh each morning. Zero master pastry chef needed at your boutique.',
    highlights: ['Zero on-site baking kitchen needed', 'Consistent recipe standards', 'Daily morning temperature-controlled supply'],
  },
  {
    icon: TrendingUp,
    index: '02',
    title: 'High-Margin Celebration Retail',
    text: '55% to 65% gross margins on celebration cakes, Korean bento surprise boxes, and artisan desserts with year-round repeat neighborhood gifting.',
    highlights: ['55%–65% gross profit margin', 'High average order value', 'Year-round birthday & festival demand'],
  },
  {
    icon: Building2,
    index: '03',
    title: 'Turnkey 30–45 Day Launch',
    text: 'Complete architectural layout, signature curved glass display vitrines, cloud POS, packaging inventory, and comprehensive staff finishing certification.',
    highlights: ['Standardised turnkey boutique fit-out', 'Cloud POS & inventory tracking', 'Full staff hiring & finishing training'],
  },
];

const UNIT_STATS = [
  { value: '55–65%', label: 'Gross Product Margin' },
  { value: '₹15L–35L', label: 'Turnkey Starting Capex' },
  { value: '30–45 Days', label: 'Average Store Launch' },
  { value: '05', label: 'Operating Bengaluru Outlets' },
];

const STORE_FORMATS = [
  {
    title: 'Kiosk / Quick Counter',
    area: '150 – 250 sq.ft',
    investment: '₹15L – ₹22L',
    focus: 'Malls, transit hubs, IT parks',
    features: ['High footfall impulse pick-up', 'Signature vitrine display', 'Bento & party ready counter'],
  },
  {
    title: 'Signature Patisserie Boutique',
    area: '300 – 600 sq.ft',
    investment: '₹25L – ₹35L',
    focus: 'Prime high-street & residential catchments',
    popular: true,
    features: ['Full celebration cake vitrine', 'Custom cake consultation studio', 'Express curbside & doorstep delivery'],
  },
  {
    title: 'Flagship Café & Studio',
    area: '700 – 1,200 sq.ft',
    investment: '₹35L – ₹50L',
    focus: 'Destination avenues & lifestyle retail hubs',
    features: ['Café seating & beverage counter', 'Live celebration cake finishing studio', 'Premium gifting & entremet boutique'],
  },
];

export const Franchise: React.FC = () => {
  const [form, setForm] = useState<FranchiseForm>(INITIAL_FORM);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName.trim() || !form.phone.trim() || !form.cityLocality.trim()) {
      setErrorMsg('Please provide your name, phone number, and target city or locality.');
      setStatus('error');
      return;
    }

    setStatus('loading');
    setErrorMsg('');

    const formattedWhatsApp = [
      '🤝 *NEW FRANCHISE ENQUIRY — LA HEAVEN*',
      '━━━━━━━━━━━━━━━━━━━━━',
      `✦ *Name:* ${form.fullName.trim()}`,
      `☎ *Phone:* ${form.phone.trim()}`,
      form.email ? `✉️ *Email:* ${form.email.trim()}` : '',
      `📍 *Target Location:* ${form.cityLocality.trim()}`,
      `💰 *Budget Range:* ${form.investmentRange}`,
      `💼 *Background:* ${form.experience}`,
      form.message ? `💬 *Notes:* ${form.message.trim()}` : '',
      '━━━━━━━━━━━━━━━━━━━━━',
    ]
      .filter(Boolean)
      .join('\n');

    setTimeout(() => {
      setStatus('success');
      if (typeof window !== 'undefined' && window.innerWidth < 768) {
        window.open(getWhatsAppUrl(formattedWhatsApp), '_blank', 'noopener,noreferrer');
      }
    }, 600);
  };

  return (
    <main className="min-h-screen bg-[#F5EFEB]">
      <SEOHead
        title={pageSEO.franchise.title}
        description={pageSEO.franchise.description}
        canonicalUrl={pageSEO.franchise.canonicalUrl}
        ogTitle={pageSEO.franchise.ogTitle}
        ogDescription={pageSEO.franchise.ogDescription}
        ogImage={pageSEO.franchise.ogImage}
        twitterCard={pageSEO.franchise.twitterCard}
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
                BOUTIQUE FRANCHISE PARTNERSHIP
              </p>

              {/* Main Headline */}
              <h1 className="font-serif text-[clamp(2.4rem,4.4vw,4.15rem)] font-normal leading-[1.12] tracking-tight text-[#25313A]">
                <span className="block">Great Celebrations Deserve a</span>
                <span className="block font-serif font-bold text-[#365D60]">
                  Great Boutique Partner.
                </span>
              </h1>

              {/* Description Body */}
              <p className="mt-4 max-w-lg font-sans text-base sm:text-[17px] font-normal leading-relaxed text-[#6B5E55]">
                Join Bengaluru’s fastest growing premium artisan cake brand. Backed by 5 high-performing boutiques, a proven central commissary supply model, and beloved 100% eggless recipes.
              </p>

              {/* Secondary Subtext */}
              <p className="mt-3 font-sans text-xs sm:text-sm font-semibold text-[#365D60]">
                Curated prime locations • Turnkey patisserie model • Proven unit economics.
              </p>

              {/* Clean Badge */}
              <div className="mt-7 flex items-center gap-2.5">
                <Building2 className="h-5 w-5 text-[#365D60] shrink-0" strokeWidth={1.8} />
                <span className="text-xs sm:text-[13px] font-semibold text-[#25313A]">
                  FOCO &amp; FICO Models Available • Bengaluru &amp; South India
                </span>
              </div>

              {/* Action CTA Buttons */}
              <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4">
                <a
                  href="#franchise-enquiry"
                  className="inline-flex items-center justify-center gap-2.5 rounded-full bg-[#365D60] px-7 sm:px-8 py-3.5 font-sans text-sm font-semibold tracking-wide text-[#F5EFEB] shadow-sm transition-all duration-300 hover:bg-[#2C4C4F] hover:shadow-md hover:scale-[1.02] active:scale-100"
                >
                  <span>Enquire for Franchise</span>
                  <ArrowDown className="h-4 w-4" />
                </a>
                <a
                  href={getWhatsAppUrl('Hi LaHeaven! I would like to inquire about opening a franchise boutique.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#365D60] bg-transparent px-7 sm:px-8 py-3.5 font-sans text-sm font-semibold tracking-wide text-[#365D60] transition-all duration-300 hover:bg-[#365D60]/10 hover:scale-[1.02] active:scale-100"
                >
                  <WhatsAppIcon className="h-4 w-4 fill-[#365D60]" />
                  <span>Franchise Desk WhatsApp</span>
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
                      src="https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=1200&q=85&auto=format&fit=crop"
                      alt="La Heaven Patisserie Franchise Boutique Storefront"
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
                          High Growth Patisserie
                        </span>
                      </div>
                      <span className="rounded-full bg-[#FFFFFF]/25 px-3 py-1 font-sans text-[11px] font-semibold backdrop-blur-md">
                        Proven ROI Model
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── 2. Unit Economics Highlights Band ── */}
      <section className="border-b border-[#DFD7CF] bg-[#FFFFFF] py-10 sm:py-12">
        <div className="premium-container">
          <StaggerContainer className="grid grid-cols-2 gap-6 sm:grid-cols-4 lg:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-[#DFD7CF]">
            {UNIT_STATS.map((stat, idx) => (
              <StaggerItem key={stat.label} className={`text-center ${idx > 0 ? 'pt-4 sm:pt-0' : ''}`}>
                <span className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#365D60]">
                  {stat.value}
                </span>
                <p className="mt-1.5 font-sans text-xs sm:text-[13px] font-semibold text-[#25313A]">
                  {stat.label}
                </p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── 3. Why Partner with La Heaven (Benefits Grid) ── */}
      <section className="premium-container py-16 sm:py-20 border-b border-[#DFD7CF]">
        <div className="max-w-2xl">
          <p className="text-[11px] sm:text-xs font-semibold tracking-[0.22em] uppercase text-[#6B5E55] mb-3">
            THE LA HEAVEN ADVANTAGE
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.6rem] font-bold leading-tight text-[#25313A]">
            Engineered for High Margins, <span className="text-[#365D60]">Zero Kitchen Overhead.</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#6B5E55] leading-relaxed">
            Unlike traditional bakeries requiring expensive on-site pastry masters and heavy equipment, our centralised commissary delivers finished, scratch-baked products daily directly to your boutique vitrine.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {BENEFITS.map((item) => (
            <article
              key={item.title}
              className="group flex flex-col justify-between rounded-3xl border border-[#DFD7CF] bg-[#FFFFFF] p-7 sm:p-8 shadow-[0_8px_30px_rgba(37,49,58,0.05)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(37,49,58,0.1)] hover:border-[#365D60]/40"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EBE5DF] text-[#365D60] border border-[#DFD7CF]">
                    <item.icon className="h-6 w-6" strokeWidth={1.7} />
                  </div>
                  <span className="font-serif text-2xl font-bold text-[#B6C69F]">
                    {item.index}
                  </span>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#25313A] leading-snug">
                  {item.title}
                </h3>
                <p className="mt-3 font-sans text-xs sm:text-sm text-[#6B5E55] leading-relaxed">
                  {item.text}
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-[#DFD7CF] space-y-2">
                {item.highlights.map((h) => (
                  <div key={h} className="flex items-start gap-2 text-xs text-[#25313A] font-medium">
                    <Check className="h-4 w-4 text-[#365D60] shrink-0 mt-0.5" strokeWidth={2.2} />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── 4. Flexible Franchise Models: FOCO vs FICO & Store Formats ── */}
      <section className="bg-[#EBE5DF]/60 py-16 sm:py-20 border-b border-[#DFD7CF]">
        <div className="premium-container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-[11px] sm:text-xs font-semibold tracking-[0.22em] uppercase text-[#6B5E55] mb-3">
              FLEXIBLE PARTNERSHIP MODELS
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#25313A]">
              Designed for Your Investment Goals
            </h2>
            <p className="mt-3 text-sm text-[#6B5E55] leading-relaxed">
              Whether you seek a passive managed return or hands-on entrepreneurship, choose the model that fits your operational comfort.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* FOCO Card */}
            <div className="relative rounded-3xl border-2 border-[#365D60] bg-[#FFFFFF] p-8 sm:p-10 shadow-[0_16px_40px_rgba(54,93,96,0.08)]">
              <span className="inline-block rounded-full bg-[#B6C69F] px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#25313A] mb-4">
                Recommended for Investors
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#25313A]">
                FOCO Model
              </h3>
              <p className="text-xs font-bold uppercase tracking-wider text-[#365D60] mt-1">
                Franchise Owned • Company Operated
              </p>
              <p className="mt-3 text-xs sm:text-sm text-[#6B5E55] leading-relaxed">
                Ideal for busy professionals, HNIs, and property owners seeking a completely hands-off patisserie business with predictable monthly returns.
              </p>

              <div className="mt-6 pt-5 border-t border-[#DFD7CF] space-y-3">
                <div className="flex items-start gap-2.5 text-xs sm:text-[13px] text-[#25313A]">
                  <CheckCircle2 className="h-4 w-4 text-[#365D60] shrink-0 mt-0.5" />
                  <span>100% staff hiring, training &amp; daily management by La Heaven</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs sm:text-[13px] text-[#25313A]">
                  <CheckCircle2 className="h-4 w-4 text-[#365D60] shrink-0 mt-0.5" />
                  <span>Direct daily automated supply from central commissary</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs sm:text-[13px] text-[#25313A]">
                  <CheckCircle2 className="h-4 w-4 text-[#365D60] shrink-0 mt-0.5" />
                  <span>Live cloud POS sales tracking &amp; revenue share payout</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs sm:text-[13px] text-[#25313A]">
                  <CheckCircle2 className="h-4 w-4 text-[#365D60] shrink-0 mt-0.5" />
                  <span>Zero daily operational involvement required from investor</span>
                </div>
              </div>
            </div>

            {/* FICO Card */}
            <div className="rounded-3xl border border-[#DFD7CF] bg-[#FFFFFF] p-8 sm:p-10 shadow-[0_8px_30px_rgba(37,49,58,0.06)]">
              <span className="inline-block rounded-full bg-[#EBE5DF] px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#6B5E55] border border-[#DFD7CF] mb-4">
                For Active Entrepreneurs
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#25313A]">
                FICO Model
              </h3>
              <p className="text-xs font-bold uppercase tracking-wider text-[#6B5E55] mt-1">
                Franchise Owned • Franchise Operated
              </p>
              <p className="mt-3 text-xs sm:text-sm text-[#6B5E55] leading-relaxed">
                Ideal for energetic food &amp; beverage entrepreneurs wanting to operate their neighbourhood cake boutique with complete brand support.
              </p>

              <div className="mt-6 pt-5 border-t border-[#DFD7CF] space-y-3">
                <div className="flex items-start gap-2.5 text-xs sm:text-[13px] text-[#25313A]">
                  <CheckCircle2 className="h-4 w-4 text-[#365D60] shrink-0 mt-0.5" />
                  <span>Higher retained operating profit margins</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs sm:text-[13px] text-[#25313A]">
                  <CheckCircle2 className="h-4 w-4 text-[#365D60] shrink-0 mt-0.5" />
                  <span>Comprehensive 3-week staff certification &amp; SOP playbooks</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs sm:text-[13px] text-[#25313A]">
                  <CheckCircle2 className="h-4 w-4 text-[#365D60] shrink-0 mt-0.5" />
                  <span>Full access to branded packaging, uniforms &amp; merchandise</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs sm:text-[13px] text-[#25313A]">
                  <CheckCircle2 className="h-4 w-4 text-[#365D60] shrink-0 mt-0.5" />
                  <span>Dedicated regional marketing &amp; social media amplification</span>
                </div>
              </div>
            </div>
          </div>

          {/* Formats Grid */}
          <div className="mt-14 max-w-4xl mx-auto">
            <h4 className="text-center font-serif text-2xl font-bold text-[#25313A] mb-8">
              Available Boutique Formats
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {STORE_FORMATS.map((fmt) => (
                <div
                  key={fmt.title}
                  className={`rounded-2xl border p-6 bg-[#FFFFFF] shadow-xs ${
                    fmt.popular ? 'border-[#365D60] ring-1 ring-[#365D60]' : 'border-[#DFD7CF]'
                  }`}
                >
                  {fmt.popular && (
                    <span className="inline-block rounded-full bg-[#B6C69F] px-2.5 py-0.5 text-[9.5px] font-bold uppercase tracking-wider text-[#25313A] mb-3">
                      Most Popular
                    </span>
                  )}
                  <h5 className="font-serif text-lg font-bold text-[#25313A]">{fmt.title}</h5>
                  <p className="mt-1 font-sans text-xs font-semibold text-[#365D60]">
                    {fmt.area} • {fmt.investment}
                  </p>
                  <p className="mt-2 font-sans text-[11px] text-[#6B5E55] leading-relaxed">
                    Ideal for: {fmt.focus}
                  </p>
                  <div className="mt-4 pt-4 border-t border-[#DFD7CF] space-y-1.5">
                    {fmt.features.map((f) => (
                      <p key={f} className="text-[11px] text-[#25313A] flex items-center gap-1.5">
                        <Check className="h-3 w-3 text-[#365D60] shrink-0" />
                        <span>{f}</span>
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. 3-Step Journey & Interactive Enquiry Studio ── */}
      <section id="franchise-enquiry" className="premium-container py-16 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: 3-Step Process & Expansion Hotline */}
          <div className="lg:col-span-5">
            <p className="text-[11px] sm:text-xs font-semibold tracking-[0.22em] uppercase text-[#6B5E55] mb-3">
              FROM HELLO TO OPENING DAY
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold leading-tight text-[#25313A]">
              Let’s Start <span className="text-[#365D60]">Something Sweet.</span>
            </h2>
            <p className="mt-3 text-sm text-[#6B5E55] leading-relaxed">
              No complicated bureaucracy. Tell us about your target location and business background, and our founding team will discuss catchment availability.
            </p>

            <ol className="mt-8 space-y-5">
              <li className="flex gap-4 p-4 rounded-2xl border border-[#DFD7CF] bg-[#FFFFFF] shadow-2xs">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#365D60] font-serif text-lg font-bold text-[#F5EFEB]">
                  01
                </span>
                <div>
                  <h4 className="font-serif text-base font-bold text-[#25313A]">
                    Confidential Discovery Call
                  </h4>
                  <p className="mt-1 text-xs text-[#6B5E55] leading-relaxed">
                    Share your background, preferred neighbourhood catchment, and investment budget.
                  </p>
                </div>
              </li>

              <li className="flex gap-4 p-4 rounded-2xl border border-[#DFD7CF] bg-[#FFFFFF] shadow-2xs">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#365D60] font-serif text-lg font-bold text-[#F5EFEB]">
                  02
                </span>
                <div>
                  <h4 className="font-serif text-base font-bold text-[#25313A]">
                    Catchment Feasibility &amp; ROI Model
                  </h4>
                  <p className="mt-1 text-xs text-[#6B5E55] leading-relaxed">
                    We review footfall metrics, projected unit economics, commissary routes, and layout design.
                  </p>
                </div>
              </li>

              <li className="flex gap-4 p-4 rounded-2xl border border-[#DFD7CF] bg-[#FFFFFF] shadow-2xs">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#365D60] font-serif text-lg font-bold text-[#F5EFEB]">
                  03
                </span>
                <div>
                  <h4 className="font-serif text-base font-bold text-[#25313A]">
                    Turnkey Fit-Out &amp; Launch
                  </h4>
                  <p className="mt-1 text-xs text-[#6B5E55] leading-relaxed">
                    Display vitrines, cloud POS setup, staff certification, and city-wide launch marketing.
                  </p>
                </div>
              </li>
            </ol>

            <div className="mt-8 rounded-2xl border border-[#DFD7CF] bg-[#FFFFFF] p-6 shadow-xs">
              <p className="font-sans text-xs font-semibold text-[#25313A]">
                Prefer a direct conversation?
              </p>
              <div className="mt-3 flex flex-col gap-2 font-sans text-xs text-[#6B5E55]">
                <p>
                  Expansion Desk:{' '}
                  <a href={PHONE_TEL} className="font-bold text-[#365D60] underline">
                    {PHONE_DISPLAY}
                  </a>
                </p>
                <p>
                  Partner Email:{' '}
                  <a href={EMAIL_MAILTO} className="font-bold text-[#365D60] underline">
                    {EMAIL}
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Modern Enquiry Form Card */}
          <div className="lg:col-span-7">
            {status === 'success' ? (
              <div className="rounded-3xl border border-[#DFD7CF] bg-[#FFFFFF] p-8 sm:p-12 text-center shadow-[0_16px_48px_rgba(37,49,58,0.06)]">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#EBE5DF] text-[#365D60] border border-[#DFD7CF]">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="mt-5 font-serif text-3xl font-bold text-[#25313A]">
                  A Happy Partnership Starts Here.
                </h3>
                <p className="mt-3 max-w-md mx-auto font-sans text-sm text-[#6B5E55] leading-relaxed">
                  Thank you, <strong className="text-[#25313A]">{form.fullName}</strong>! Your franchise brief has been received. Our expansion leadership will review your location and contact you within 24–48 hours.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-4">
                  <a
                    href={getWhatsAppUrl(
                      `Hi LaHeaven! I just submitted a franchise enquiry for ${form.cityLocality}. Could we schedule a call?`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-[#365D60] px-7 py-3.5 font-sans text-xs font-bold uppercase tracking-wider text-[#F5EFEB] shadow-sm transition-all hover:bg-[#2C4C4F]"
                  >
                    <WhatsAppIcon className="h-4 w-4 fill-[#F5EFEB]" />
                    <span>Open WhatsApp Chat</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setForm(INITIAL_FORM);
                      setStatus('idle');
                    }}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[#DFD7CF] bg-transparent px-6 py-3.5 font-sans text-xs font-bold uppercase tracking-wider text-[#25313A] hover:bg-[#EBE5DF]"
                  >
                    <span>Submit Another Enquiry</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="rounded-3xl border border-[#DFD7CF] bg-[#FFFFFF] p-8 sm:p-10 shadow-[0_16px_48px_rgba(37,49,58,0.06)]">
                <div className="mb-6">
                  <div className="flex items-center gap-2 text-[#365D60] mb-1">
                    <Sparkles className="h-4 w-4" />
                    <span className="font-sans text-xs font-bold uppercase tracking-wider">
                      Franchise Expression of Interest
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#25313A]">
                    Tell Us About Your Venture
                  </h3>
                  <p className="mt-1 font-sans text-xs text-[#6B5E55]">
                    Share a few details and our expansion team will assess territory availability.
                  </p>
                </div>

                {errorMsg && (
                  <div className="mb-6 rounded-xl bg-red-50 border border-red-200 p-3.5 text-xs font-semibold text-red-700">
                    {errorMsg}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-sans text-[11px] font-bold uppercase tracking-wider text-[#25313A] mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Ramesh Kumar"
                        value={form.fullName}
                        onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                        className="w-full rounded-xl border border-[#DFD7CF] bg-[#F5EFEB]/50 px-4 py-3 font-sans text-xs text-[#25313A] placeholder-[#6B5E55]/60 outline-none transition-colors focus:border-[#365D60] focus:bg-[#FFFFFF] focus:ring-1 focus:ring-[#365D60]"
                      />
                    </div>

                    <div>
                      <label className="block font-sans text-[11px] font-bold uppercase tracking-wider text-[#25313A] mb-1.5">
                        Mobile Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98000 00000"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full rounded-xl border border-[#DFD7CF] bg-[#F5EFEB]/50 px-4 py-3 font-sans text-xs text-[#25313A] placeholder-[#6B5E55]/60 outline-none transition-colors focus:border-[#365D60] focus:bg-[#FFFFFF] focus:ring-1 focus:ring-[#365D60]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-sans text-[11px] font-bold uppercase tracking-wider text-[#25313A] mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="you@domain.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full rounded-xl border border-[#DFD7CF] bg-[#F5EFEB]/50 px-4 py-3 font-sans text-xs text-[#25313A] placeholder-[#6B5E55]/60 outline-none transition-colors focus:border-[#365D60] focus:bg-[#FFFFFF] focus:ring-1 focus:ring-[#365D60]"
                      />
                    </div>

                    <div>
                      <label className="block font-sans text-[11px] font-bold uppercase tracking-wider text-[#25313A] mb-1.5">
                        Target City or Catchment *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Indiranagar, Whitefield, Mysuru"
                        value={form.cityLocality}
                        onChange={(e) => setForm({ ...form, cityLocality: e.target.value })}
                        className="w-full rounded-xl border border-[#DFD7CF] bg-[#F5EFEB]/50 px-4 py-3 font-sans text-xs text-[#25313A] placeholder-[#6B5E55]/60 outline-none transition-colors focus:border-[#365D60] focus:bg-[#FFFFFF] focus:ring-1 focus:ring-[#365D60]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-sans text-[11px] font-bold uppercase tracking-wider text-[#25313A] mb-1.5">
                        Investment Budget
                      </label>
                      <select
                        value={form.investmentRange}
                        onChange={(e) => setForm({ ...form, investmentRange: e.target.value })}
                        className="w-full rounded-xl border border-[#DFD7CF] bg-[#F5EFEB]/50 px-4 py-3 font-sans text-xs text-[#25313A] outline-none transition-colors focus:border-[#365D60] focus:bg-[#FFFFFF] focus:ring-1 focus:ring-[#365D60]"
                      >
                        <option value="₹15L – ₹25L (Kiosk / Quick Counter)">
                          ₹15L – ₹25L (Kiosk / Quick Counter)
                        </option>
                        <option value="₹25L – ₹35L (Signature Boutique)">
                          ₹25L – ₹35L (Signature Boutique)
                        </option>
                        <option value="₹35L – ₹50L (Flagship Café & Patisserie)">
                          ₹35L – ₹50L (Flagship Café &amp; Patisserie)
                        </option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-sans text-[11px] font-bold uppercase tracking-wider text-[#25313A] mb-1.5">
                        Business Background
                      </label>
                      <select
                        value={form.experience}
                        onChange={(e) => setForm({ ...form, experience: e.target.value })}
                        className="w-full rounded-xl border border-[#DFD7CF] bg-[#F5EFEB]/50 px-4 py-3 font-sans text-xs text-[#25313A] outline-none transition-colors focus:border-[#365D60] focus:bg-[#FFFFFF] focus:ring-1 focus:ring-[#365D60]"
                      >
                        <option value="Entrepreneur / First-time F&B">
                          Entrepreneur / First-time F&amp;B
                        </option>
                        <option value="Existing Retail or Restaurant Owner">
                          Existing Retail or Restaurant Owner
                        </option>
                        <option value="Property Owner with Prime Commercial Space">
                          Property Owner with Prime Space
                        </option>
                        <option value="Investor Seeking Managed FOCO Model">
                          Investor Seeking Managed FOCO Model
                        </option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-sans text-[11px] font-bold uppercase tracking-wider text-[#25313A] mb-1.5">
                      Property or Target Timeline Details (Optional)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Tell us about the property (carpet area, frontage) or your target opening timeline..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full rounded-xl border border-[#DFD7CF] bg-[#F5EFEB]/50 px-4 py-3 font-sans text-xs text-[#25313A] placeholder-[#6B5E55]/60 outline-none transition-colors focus:border-[#365D60] focus:bg-[#FFFFFF] focus:ring-1 focus:ring-[#365D60]"
                    />
                  </div>

                  <div className="flex items-start gap-2.5 pt-1">
                    <input
                      type="checkbox"
                      id="franchise-consent"
                      checked={form.consent}
                      onChange={(e) => setForm({ ...form, consent: e.target.checked })}
                      className="mt-1 h-4 w-4 rounded border-[#DFD7CF] text-[#365D60] focus:ring-[#365D60]"
                    />
                    <label htmlFor="franchise-consent" className="font-sans text-xs text-[#6B5E55] leading-relaxed">
                      I agree to receive confidential franchise deck information via WhatsApp and email from La Heaven Cake Boutique.
                    </label>
                  </div>

                  <div className="pt-3">
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#365D60] px-7 py-3.5 font-sans text-xs font-bold uppercase tracking-wider text-[#F5EFEB] shadow-sm transition-all duration-300 hover:bg-[#2C4C4F] hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
                    >
                      <span>
                        {status === 'loading'
                          ? 'Submitting enquiry...'
                          : 'Submit Franchise Brief'}
                      </span>
                      <ArrowUpRight className="h-4 w-4" />
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Franchise;
