import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  ArrowLeft,
  ArrowDown,
  CheckCircle2,
  Sparkles,
  Upload,
  Check,
  AlertCircle,
  Copy,
  Share2,
  Trash2,
  Clock,
  ShieldCheck,
  Truck,
  Heart,
  ChevronRight,
} from 'lucide-react';
import { SEOHead } from '@/components/seo/SEOHead';
import { pageSEO } from '@/data/seo';
import { getWhatsAppUrl, PHONE_DISPLAY, PHONE_TEL } from '@/utils/constants';
import { WhatsAppIcon } from '@/components/shared/Icons';
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/shared/AnimatedSection';

/**
 * Converts any browser-supported image File (JPEG, WebP, PNG) into an image/png Blob
 * so that `navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })])`
 * works reliably across Chrome, Safari, and Edge when pasting into WhatsApp.
 */
async function convertFileToPngBlob(file: File): Promise<Blob | null> {
  return new Promise((resolve) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth || img.width;
        canvas.height = img.naturalHeight || img.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          URL.revokeObjectURL(objectUrl);
          resolve(null);
          return;
        }
        ctx.drawImage(img, 0, 0);
        canvas.toBlob((blob) => {
          URL.revokeObjectURL(objectUrl);
          resolve(blob);
        }, 'image/png');
      } catch {
        URL.revokeObjectURL(objectUrl);
        resolve(null);
      }
    };
    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      resolve(null);
    };
    img.src = objectUrl;
  });
}

const OCCASION_OPTIONS = [
  'Birthday',
  'Wedding',
  'Anniversary',
  'Engagement',
  'Baby Shower',
  'Corporate Celebration',
  'Special Milestone',
];

const CAKE_TYPE_OPTIONS = [
  { id: 'Custom Wedding Cake', desc: 'Architectural multi-tier floral & couture gateaux' },
  { id: 'Designer Theme Cake', desc: 'Hand-sculpted 3D characters, hobbies & bespoke themes' },
  { id: 'Personalised Birthday Cake', desc: 'Curated palettes, age toppers & Lambeth piping' },
  { id: 'Photo Cake', desc: 'High-resolution edible wafer & sugar icing portrait sheets' },
  { id: 'Celebration Entremet', desc: 'French mirror-glaze layers, berry crowns & pull-me-up' },
];

const FLAVOUR_FILLING_OPTIONS = [
  '54% Belgian Dark Chocolate Truffle',
  'Alphonso Mango & Raspberry Compote',
  'Red Velvet with Philadelphia Cream Cheese',
  'Fresh Lychee & Rosewater Chantilly',
  'Ferrero Rocher & Roasted Hazelnut Praline',
  'Lotus Biscoff & Salted Caramel',
  'Wild Blueberry & Madagascar Vanilla Bean',
  'French Royal Opera (Espresso & Almond)',
];

const SIZE_TIER_OPTIONS = [
  { id: '1.0 kg — Single Tier', serves: 'Serves 8–10 guests' },
  { id: '1.5 kg — Tall Single Tier', serves: 'Serves 12–15 guests' },
  { id: '2.5 kg — Two-Tier Celebration', serves: 'Serves 22–28 guests' },
  { id: '4.0 kg — Three-Tier Grand', serves: 'Serves 40–50 guests' },
  { id: '6.0 kg+ — Multi-Tier Masterpiece', serves: 'Serves 75+ guests' },
];

const DECORATION_PREFERENCES = [
  'Fresh Organic Floral Cascade',
  'Hand-Sculpted Fondant Accents',
  'Wafer Paper Botanicals',
  '24K Edible Gold Leaf Accents',
  'Vintage Lambeth Piping',
  'Custom Acrylic Name Topper',
  'Macaron & Fresh Berry Crown',
  'Edible Photo Plaque',
];

const BENGALURU_OUTLETS = [
  'Chilled Van Delivery to My Address (Bengaluru)',
  'Pickup — Frazer Town Boutique',
  'Pickup — Malleshwaram Boutique',
  'Pickup — Sahakarnagar Boutique',
  'Pickup — Sanjayanagar Boutique',
  'Pickup — Yelahanka New Town Boutique',
];

const BESPOKE_INSPIRATIONS = [
  {
    title: 'Architectural Wedding Gateau',
    category: 'Wedding & Engagement',
    image: '/images/products/royal-opera-cake.jpg',
    description: 'Three-tiered ivory structure adorned with organic florals, wafer botanicals, and subtle 24K gold leaf edging.',
    flavour: 'Belgian Chocolate Truffle & Hazelnut Praline',
  },
  {
    title: 'Vintage Lambeth Birthday Cake',
    category: 'Birthday & Milestone',
    image: '/images/products/chocolate-fantasy-cake.jpg',
    description: 'Intricate royal piping swirls, pastel cream garlands, and personalised heirloom topper plaque.',
    flavour: 'Red Velvet with Philadelphia Cream Cheese',
  },
  {
    title: 'Mirror-Glaze Berry Entremet',
    category: 'Luxury Celebration',
    image: '/images/products/red-velvet-cream-cheese.jpg',
    description: 'Glistening berry mirror finish topped with fresh macarons, gold dust, and edible pansy petals.',
    flavour: 'Alphonso Mango & Raspberry Compote',
  },
];

export const CustomCakes: React.FC = () => {
  const [activeGroup, setActiveGroup] = useState<1 | 2 | 3>(1);

  // Studio Form State
  const [occasion, setOccasion] = useState(OCCASION_OPTIONS[0]);
  const [cakeType, setCakeType] = useState(CAKE_TYPE_OPTIONS[0].id);
  const [flavour, setFlavour] = useState(FLAVOUR_FILLING_OPTIONS[0]);
  const [isEggless, setIsEggless] = useState(true);
  const [sizeTiers, setSizeTiers] = useState(SIZE_TIER_OPTIONS[1].id);
  const [decorations, setDecorations] = useState<string[]>([
    'Fresh Organic Floral Cascade',
    '24K Edible Gold Leaf Accents',
  ]);
  const [referenceFile, setReferenceFile] = useState<{
    file: File;
    pngBlob: Blob | null;
    name: string;
    sizeKb: number;
    previewUrl: string;
  } | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploadError, setUploadError] = useState<string>('');
  const [imageCopyStatus, setImageCopyStatus] = useState<'idle' | 'copied' | 'error'>('idle');
  const [cakeMessage, setCakeMessage] = useState('');
  const [designNotes, setDesignNotes] = useState('');
  const [requiredDate, setRequiredDate] = useState('');
  const [deliveryLocation, setDeliveryLocation] = useState(BENGALURU_OUTLETS[0]);
  const [deliveryPincode, setDeliveryPincode] = useState('560005');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [formError, setFormError] = useState('');
  const [enquirySubmitted, setEnquirySubmitted] = useState(false);
  const [enquiryId, setEnquiryId] = useState('');

  const isHomeDelivery = deliveryLocation === BENGALURU_OUTLETS[0];

  const toggleDecoration = (pref: string) => {
    setDecorations((prev) =>
      prev.includes(pref) ? prev.filter((d) => d !== pref) : [...prev, pref]
    );
  };

  const copyReferenceImageToClipboard = async (blobToCopy?: Blob | null): Promise<boolean> => {
    const targetBlob = blobToCopy ?? referenceFile?.pngBlob;
    if (!targetBlob) return false;
    try {
      if (navigator.clipboard && 'write' in navigator.clipboard && typeof ClipboardItem !== 'undefined') {
        await navigator.clipboard.write([
          new ClipboardItem({
            'image/png': targetBlob,
          }),
        ]);
        setImageCopyStatus('copied');
        return true;
      }
    } catch {
      // Clipboard write may require user gesture on certain mobile web browsers
    }
    setImageCopyStatus('error');
    return false;
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadError('');
    setImageCopyStatus('idle');
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setUploadError('Please upload a JPG, PNG, or WebP reference photo.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('Image size must be under 5 MB.');
      return;
    }

    setUploadProgress(25);
    const pngBlobPromise = convertFileToPngBlob(file);

    const reader = new FileReader();
    reader.onprogress = (ev) => {
      if (ev.lengthComputable) {
        setUploadProgress(Math.round((ev.loaded / ev.total) * 90));
      }
    };
    reader.onload = async () => {
      const pngBlob = await pngBlobPromise;
      setUploadProgress(100);
      setReferenceFile({
        file,
        pngBlob,
        name: file.name,
        sizeKb: Math.round(file.size / 1024),
        previewUrl: typeof reader.result === 'string' ? reader.result : '',
      });
      if (pngBlob) {
        await copyReferenceImageToClipboard(pngBlob);
      }
    };
    reader.readAsDataURL(file);
  };

  const validateAndSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!requiredDate) {
      setFormError('Please select your celebration date.');
      return;
    }
    if (isHomeDelivery && !deliveryAddress.trim()) {
      setFormError('Please enter your full delivery address in Bengaluru.');
      return;
    }
    if (!name.trim()) {
      setFormError('Please enter your full name.');
      return;
    }
    if (!/^\d{10}$/.test(phone.replace(/\D/g, '').slice(-10))) {
      setFormError('Please enter a valid 10-digit mobile number.');
      return;
    }

    if (referenceFile?.pngBlob) {
      await copyReferenceImageToClipboard(referenceFile.pngBlob);
    }

    const generatedId = `CE-${Math.floor(10000 + Math.random() * 90000)}`;
    setEnquiryId(generatedId);
    setEnquirySubmitted(true);
  };

  const whatsappSummaryText = [
    `✨ *LAHAVEN BESPOKE CAKE ENQUIRY (${enquiryId || 'Draft'})*`,
    '━━━━━━━━━━━━━━━━━━━━━',
    `*Occasion:* ${occasion}`,
    `*Cake Type:* ${cakeType}`,
    `*Flavour & Dietary:* ${flavour} (${isEggless ? '100% Eggless' : 'Standard'})`,
    `*Size / Tiers:* ${sizeTiers}`,
    `*Decorations:* ${decorations.join(', ') || 'Chef recommendation'}`,
    `*Reference Photo:* ${
      referenceFile
        ? `✓ ${referenceFile.name} (${referenceFile.sizeKb} KB — Image copied to clipboard, pasting in chat)`
        : 'None attached'
    }`,
    `*Plaque Inscription:* "${cakeMessage || 'None'}"`,
    designNotes ? `*Design Notes:* ${designNotes}` : '',
    `*Date & Fulfilment:* ${requiredDate || 'TBD'} | ${deliveryLocation} (Pincode: ${deliveryPincode})`,
    isHomeDelivery && deliveryAddress.trim()
      ? `*Delivery Address:* ${deliveryAddress.trim()}`
      : '',
    `*Client:* ${name || 'Enquiry'} | ${phone || 'Pending'} ${email ? `| ${email}` : ''}`,
    '━━━━━━━━━━━━━━━━━━━━━',
    `Hello Chef! Please share design feasibility, sketch consultation, and a price quotation for this celebration.`,
  ]
    .filter(Boolean)
    .join('\n');

  const canNativeShareFile =
    typeof navigator !== 'undefined' &&
    typeof navigator.share === 'function' &&
    typeof navigator.canShare === 'function' &&
    referenceFile?.file &&
    navigator.canShare({ files: [referenceFile.file] });

  const handleOpenWhatsAppWithImage = async () => {
    if (referenceFile?.pngBlob) {
      await copyReferenceImageToClipboard(referenceFile.pngBlob);
    }
    window.open(getWhatsAppUrl(whatsappSummaryText), '_blank', 'noopener,noreferrer');
  };

  const handleNativeShareWithImage = async () => {
    if (!referenceFile?.file) {
      handleOpenWhatsAppWithImage();
      return;
    }
    try {
      if (navigator.canShare && navigator.canShare({ files: [referenceFile.file] })) {
        await navigator.share({
          title: `LaHaven Custom Cake Enquiry ${enquiryId || ''}`,
          text: whatsappSummaryText,
          files: [referenceFile.file],
        });
        return;
      }
    } catch {
      // User cancelled share or browser fell back
    }
    await handleOpenWhatsAppWithImage();
  };

  return (
    <main className="min-h-screen bg-[#F5EFEB] pb-24">
      <SEOHead
        title={pageSEO['custom-cakes'].title}
        description={pageSEO['custom-cakes'].description}
        canonicalUrl={pageSEO['custom-cakes'].canonicalUrl}
        ogTitle={pageSEO['custom-cakes'].ogTitle}
        ogDescription={pageSEO['custom-cakes'].ogDescription}
        ogImage={pageSEO['custom-cakes'].ogImage}
        twitterCard={pageSEO['custom-cakes'].twitterCard}
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
                BESPOKE CELEBRATION STUDIO
              </p>

              {/* Main Headline */}
              <h1 className="font-serif text-[clamp(2.4rem,4.4vw,4.15rem)] font-normal leading-[1.12] tracking-tight text-[#25313A]">
                <span className="block">Make Every Celebration</span>
                <span className="block font-serif font-bold text-[#365D60]">
                  Sweeter Than Ever.
                </span>
              </h1>

              {/* Description Body */}
              <p className="mt-4 max-w-lg font-sans text-base sm:text-[17px] font-normal leading-relaxed text-[#6B5E55]">
                From tiered wedding gateaux to sculpted birthday dreams. Share your inspiration, select flavours, and our master pastry chefs will handcraft your bespoke creation from scratch.
              </p>

              {/* Secondary Subtext */}
              <p className="mt-3 font-sans text-xs sm:text-sm font-semibold text-[#365D60]">
                Consult directly with our Bengaluru head pastry decorator.
              </p>

              {/* Clean Badge */}
              <div className="mt-7 flex items-center gap-2.5">
                <Sparkles className="h-5 w-5 text-[#365D60] shrink-0" strokeWidth={1.8} />
                <span className="text-xs sm:text-[13px] font-semibold text-[#25313A]">
                  100% Custom Themes • Tiered &amp; Sculpted Creations • 100% Eggless
                </span>
              </div>

              {/* Action CTA Buttons */}
              <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4">
                <a
                  href="#custom-builder"
                  className="inline-flex items-center justify-center gap-2.5 rounded-full bg-[#365D60] px-7 sm:px-8 py-3.5 font-sans text-sm font-semibold tracking-wide text-[#F5EFEB] shadow-sm transition-all duration-300 hover:bg-[#2C4C4F] hover:shadow-md hover:scale-[1.02] active:scale-100"
                >
                  <span>Design Your Cake</span>
                  <ArrowDown className="h-4 w-4" />
                </a>
                <a
                  href={getWhatsAppUrl('Hi LaHeaven! I want to discuss a bespoke celebration cake design.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#365D60] bg-transparent px-7 sm:px-8 py-3.5 font-sans text-sm font-semibold tracking-wide text-[#365D60] transition-all duration-300 hover:bg-[#365D60]/10 hover:scale-[1.02] active:scale-100"
                >
                  <WhatsAppIcon className="h-4 w-4 fill-[#365D60]" />
                  <span>Talk to Pastry Chef</span>
                </a>
              </div>
            </AnimatedSection>

            {/* ── Right Column: Showcase Cake Visual with Sage Curved Backdrop ── */}
            <AnimatedSection animation="scaleUp" delay={0.12} className="lg:col-span-6 xl:col-span-6 relative flex items-center justify-center lg:justify-end">
              <div className="relative w-full max-w-[580px]">
                {/* Organic Sage Green Backdrop Shape */}
                <div className="pointer-events-none absolute -right-3 sm:-right-5 -top-5 sm:-top-7 h-[105%] w-[88%] rounded-tr-[90px] rounded-bl-[60px] rounded-tl-[30px] rounded-br-[30px] bg-[#B6C69F]/45 transition-transform duration-700" />

                <div className="relative z-10 w-full overflow-hidden rounded-3xl border border-[#DFD7CF] bg-[#FFFFFF] shadow-[0_16px_48px_rgba(37,49,58,0.08)]">
                  <div className="relative aspect-[16/11] w-full overflow-hidden bg-[#EBE5DF]">
                    <img
                      src="/images/hero/lychee-gateau-desktop.jpg"
                      alt="Bespoke Tiered Celebration Cake by La Heaven"
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
                          Live Cake Studio
                        </span>
                      </div>
                      <span className="rounded-full bg-[#FFFFFF]/25 px-3 py-1 font-sans text-[11px] font-semibold backdrop-blur-md">
                        Hand-Sculpted &amp; Tiered
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <div id="custom-builder" className="section-rail pt-10">
        {enquirySubmitted ? (
          /* ── Confirmation & WhatsApp Dispatch View ── */
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-2xl rounded-3xl border border-[#DFD7CF] bg-[#FFFFFF] p-8 text-center shadow-[0_8px_30px_rgba(68,48,38,0.06)] sm:p-12"
          >
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#EBE5DF] text-[#365D60] border border-[#DFD7CF]">
              <CheckCircle2 className="h-8 w-8" />
            </div>

            <span className="mt-5 inline-block rounded-full bg-[#EBE5DF] px-4 py-1.5 font-sans text-xs font-bold uppercase tracking-widest text-[#365D60] border border-[#DFD7CF]">
              Bespoke Enquiry #{enquiryId}
            </span>

            <h2 className="mt-3 font-serif text-3xl font-bold text-[#25313A] sm:text-4xl">
              Your Bespoke Brief Is Ready.
            </h2>
            <p className="mx-auto mt-2 max-w-lg font-sans text-xs leading-relaxed text-[#6B5E55] sm:text-sm">
              Submitting this brief registers your custom design with our kitchen. Our head pastry chef will review feasibility, tier balance, and share a sketch &amp; quotation within 2 business hours.
            </p>

            {/* Brief Snapshot Card */}
            <div className="mt-6 rounded-2xl border border-[#DFD7CF] bg-[#EBE5DF] p-5 text-left font-sans text-xs text-[#25313A] space-y-1.5">
              <p>
                <strong className="text-[#6B5E55]">Occasion &amp; Style:</strong> {occasion} • {cakeType}
              </p>
              <p>
                <strong className="text-[#6B5E55]">Flavour &amp; Diet:</strong> {flavour}{' '}
                <span className="text-[#2e7d32] font-semibold">({isEggless ? '100% Eggless' : 'Standard'})</span>
              </p>
              <p>
                <strong className="text-[#6B5E55]">Size &amp; Servings:</strong> {sizeTiers}
              </p>
              <p>
                <strong className="text-[#6B5E55]">Event Date &amp; Fulfilment:</strong> {requiredDate} • {deliveryLocation} ({deliveryPincode})
              </p>
              {isHomeDelivery && deliveryAddress && (
                <p>
                  <strong className="text-[#6B5E55]">Delivery Address:</strong> {deliveryAddress}
                </p>
              )}
            </div>

            {/* Photo Attachment Help */}
            {referenceFile && (
              <div className="mt-5 rounded-2xl border border-[#DFD7CF] bg-[#FFFFFF] p-4 text-left shadow-2xs">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <img
                    src={referenceFile.previewUrl}
                    alt={referenceFile.name}
                    className="h-16 w-16 shrink-0 rounded-xl border border-[#DFD7CF] object-cover"
                  />
                  <div className="min-w-0 flex-1 font-sans text-xs">
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-[#25313A] px-2.5 py-0.5 text-[11px] font-bold text-[#F5EFEB]">
                      <Check className="h-3.5 w-3.5" />
                      <span>{imageCopyStatus === 'copied' ? 'Photo Copied to Clipboard!' : 'Photo Ready'}</span>
                    </div>
                    <p className="mt-1 truncate font-bold text-[#25313A]">
                      {referenceFile.name} ({referenceFile.sizeKb} KB)
                    </p>
                    <p className="mt-1 text-[11px] leading-relaxed text-[#6B5E55]">
                      Once WhatsApp opens, simply press <kbd className="rounded bg-[#EBE5DF] px-1 py-0.5 font-mono text-[10px] font-bold border border-[#DFD7CF] text-[#25313A]">Ctrl+V</kbd> / <kbd className="rounded bg-[#EBE5DF] px-1 py-0.5 font-mono text-[10px] font-bold border border-[#DFD7CF] text-[#25313A]">Cmd+V</kbd> (or tap <strong>Paste</strong>) to attach this image in chat.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyReferenceImageToClipboard()}
                    className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#DFD7CF] bg-[#FFFFFF] px-3.5 py-2 font-sans text-xs font-bold text-[#25313A] hover:border-[#25313A] shadow-2xs transition-colors"
                  >
                    <Copy className="h-3.5 w-3.5" />
                    <span>{imageCopyStatus === 'copied' ? 'Copied ✓' : 'Copy'}</span>
                  </button>
                </div>
              </div>
            )}

            {/* Action CTAs */}
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
              <button
                type="button"
                onClick={handleOpenWhatsAppWithImage}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#365D60] px-8 py-3.5 font-sans text-xs font-bold uppercase tracking-wider text-[#F5EFEB] shadow-sm transition-all hover:bg-[#2C4C4F] hover:-translate-y-0.5"
              >
                <WhatsAppIcon className="h-4 w-4 fill-[#F5EFEB]" />
                <span>
                  {referenceFile
                    ? 'Copy Photo & Open WhatsApp'
                    : 'Send Brief to Chef on WhatsApp'}
                </span>
              </button>

              {canNativeShareFile && (
                <button
                  type="button"
                  onClick={handleNativeShareWithImage}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#365D60] px-6 py-3.5 font-sans text-xs font-bold uppercase tracking-wider text-white shadow-sm transition-all hover:bg-[#2C4C4F]"
                >
                  <Share2 className="h-4 w-4" />
                  <span>Attach Image via Share Sheet</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => setEnquirySubmitted(false)}
                className="rounded-full border border-[#DFD7CF] bg-[#FFFFFF] px-6 py-3.5 font-sans text-xs font-bold text-[#25313A] shadow-2xs transition-colors hover:border-[#25313A]"
              >
                Edit Brief Details
              </button>
            </div>
          </motion.div>
        ) : (
          /* ── 2-Column Minimalist Studio Layout ── */
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12">
            {/* ── Left 8 Columns: Multi-Part Studio Form ── */}
            <form
              onSubmit={validateAndSubmit}
              className="rounded-3xl border border-[#DFD7CF] bg-[#FFFFFF] p-6 sm:p-10 lg:col-span-8 shadow-[0_8px_30px_rgba(68,48,38,0.06)]"
            >
              {/* Stepper Navigation */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#DFD7CF] pb-6">
                <div>
                  <span className="eyebrow text-[#365D60]">
                    Interactive Studio • Part {activeGroup} of 3
                  </span>
                  <h2 className="mt-1 font-serif text-2xl font-bold text-[#25313A] sm:text-3xl">
                    {activeGroup === 1 && 'Occasion, Type & Flavour'}
                    {activeGroup === 2 && 'Tiers, Styling & Inspiration Photo'}
                    {activeGroup === 3 && 'Event Date, Delivery & Contact'}
                  </h2>
                </div>

                <div className="flex items-center gap-1.5">
                  {[1, 2, 3].map((grp) => (
                    <button
                      key={grp}
                      type="button"
                      onClick={() => setActiveGroup(grp as 1 | 2 | 3)}
                      className={`rounded-full px-4 py-1.5 font-sans text-xs font-bold transition-all ${
                        activeGroup === grp
                          ? 'bg-[#25313A] text-[#F5EFEB] shadow-2xs'
                          : 'border border-[#DFD7CF] bg-[#EBE5DF] text-[#25313A] hover:border-[#25313A]'
                      }`}
                    >
                      Part {grp}
                    </button>
                  ))}
                </div>
              </div>

              {/* ── PART 1: OCCASION, TYPE & FLAVOUR ── */}
              {activeGroup === 1 && (
                <div className="space-y-8 pt-6">
                  {/* Step 1: Occasion */}
                  <div>
                    <label className="field-label">1. Celebration Occasion</label>
                    <div className="flex flex-wrap gap-2">
                      {OCCASION_OPTIONS.map((occ) => (
                        <button
                          key={occ}
                          type="button"
                          onClick={() => setOccasion(occ)}
                          className={`rounded-full px-4 py-2 font-sans text-xs font-bold transition-all ${
                            occasion === occ
                              ? 'bg-[#25313A] text-[#F5EFEB] shadow-2xs'
                              : 'border border-[#DFD7CF] bg-[#FFFFFF] text-[#25313A] shadow-2xs hover:border-[#25313A]'
                          }`}
                        >
                          {occ}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Step 2: Cake Type */}
                  <div>
                    <label className="field-label">2. Cake Architecture &amp; Theme</label>
                    <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                      {CAKE_TYPE_OPTIONS.map((type) => {
                        const active = cakeType === type.id;
                        return (
                          <button
                            key={type.id}
                            type="button"
                            onClick={() => setCakeType(type.id)}
                            className={`flex flex-col rounded-2xl p-4 text-left transition-all ${
                              active
                                ? 'border-2 border-[#365D60] bg-[#F5EFEB] shadow-2xs'
                                : 'border border-[#DFD7CF] bg-[#FFFFFF] shadow-2xs hover:border-[#25313A]'
                            }`}
                          >
                            <span className={`font-serif text-base font-bold ${active ? 'text-[#365D60]' : 'text-[#25313A]'}`}>
                              {type.id}
                            </span>
                            <span className="mt-1 font-sans text-xs text-[#6B5E55]">
                              {type.desc}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Step 3: Flavour & Dietary */}
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <label className="field-label mb-0">3. Flavour Profile</label>
                      <button
                        type="button"
                        onClick={() => setIsEggless((prev) => !prev)}
                        className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-sans text-[11px] font-semibold transition-colors ${
                          isEggless
                            ? 'border-[#2e7d32] bg-[#E8F5E9] text-[#2e7d32]'
                            : 'border-[#DFD7CF] bg-[#FFFFFF] text-[#25313A]'
                        }`}
                      >
                        <span className={`h-2 w-2 rounded-full ${isEggless ? 'bg-[#2e7d32]' : 'bg-[#6B5E55]'}`} />
                        <span>{isEggless ? '100% Eggless' : 'Contains Egg'}</span>
                      </button>
                    </div>

                    <select
                      value={flavour}
                      onChange={(e) => setFlavour(e.target.value)}
                      className="field-input font-medium"
                    >
                      {FLAVOUR_FILLING_OPTIONS.map((f) => (
                        <option key={f} value={f}>
                          {f}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Continue Button */}
                  <div className="flex justify-end pt-4 border-t border-[#DFD7CF]">
                    <button
                      type="button"
                      onClick={() => setActiveGroup(2)}
                      className="btn-primary"
                    >
                      <span>Continue to Styling &amp; Photo</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* ── PART 2: TIERS, STYLING & INSPIRATION PHOTO ── */}
              {activeGroup === 2 && (
                <div className="space-y-8 pt-6">
                  {/* Step 4: Size / Tiers */}
                  <div>
                    <label className="field-label">4. Size, Tiers &amp; Guest Count</label>
                    <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                      {SIZE_TIER_OPTIONS.map((sz) => {
                        const active = sizeTiers === sz.id;
                        return (
                          <button
                            key={sz.id}
                            type="button"
                            onClick={() => setSizeTiers(sz.id)}
                            className={`flex flex-col rounded-2xl p-3.5 text-left transition-all ${
                              active
                                ? 'border-2 border-[#365D60] bg-[#F5EFEB] shadow-2xs'
                                : 'border border-[#DFD7CF] bg-[#FFFFFF] shadow-2xs hover:border-[#25313A]'
                            }`}
                          >
                            <span className={`font-serif text-sm font-bold ${active ? 'text-[#365D60]' : 'text-[#25313A]'}`}>
                              {sz.id}
                            </span>
                            <span className="mt-0.5 font-sans text-xs text-[#6B5E55]">
                              {sz.serves}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Step 5: Decoration Preferences */}
                  <div>
                    <label className="field-label">5. Artisan Accents &amp; Finishing (Select all that apply)</label>
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {DECORATION_PREFERENCES.map((pref) => {
                        const selected = decorations.includes(pref);
                        return (
                          <button
                            key={pref}
                            type="button"
                            onClick={() => toggleDecoration(pref)}
                            className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 text-left font-sans text-xs font-bold transition-all ${
                              selected
                                ? 'border-2 border-[#365D60] bg-[#F5EFEB] text-[#365D60] shadow-2xs'
                                : 'border border-[#DFD7CF] bg-[#FFFFFF] text-[#25313A] shadow-2xs hover:border-[#25313A]'
                            }`}
                          >
                            <span>{pref}</span>
                            {selected && <Check className="h-4 w-4 text-[#365D60]" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Step 6: Reference Photo Upload */}
                  <div>
                    <label className="field-label">6. Inspiration Photo or Sketch (Optional)</label>
                    <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#DFD7CF] bg-[#EBE5DF]/70 p-6 text-center shadow-2xs transition-all hover:bg-[#FFFFFF] hover:border-[#365D60]">
                      <Upload className="h-6 w-6 text-[#365D60]" />
                      <span className="mt-2 font-sans text-xs font-bold text-[#25313A]">
                        Click to upload your cake photo, sketch, or moodboard
                      </span>
                      <span className="mt-0.5 font-sans text-[11px] text-[#6B5E55]">
                        JPG, PNG, or WebP • Under 5 MB
                      </span>
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={handleFileChange}
                        className="sr-only"
                      />
                    </label>

                    {uploadError && (
                      <p className="mt-2 flex items-center gap-1.5 font-sans text-xs font-semibold text-[#365D60]">
                        <AlertCircle className="h-4 w-4" />
                        <span>{uploadError}</span>
                      </p>
                    )}

                    {uploadProgress > 0 && uploadProgress < 100 && (
                      <div className="mt-3">
                        <div className="flex justify-between font-sans text-[11px] font-bold text-[#25313A]">
                          <span>{referenceFile?.name || 'Processing photo...'}</span>
                          <span>{uploadProgress}%</span>
                        </div>
                        <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-[#DFD7CF]">
                          <div
                            style={{ width: `${uploadProgress}%` }}
                            className="h-full bg-[#365D60] transition-all duration-300"
                          />
                        </div>
                      </div>
                    )}

                    {referenceFile?.previewUrl && (
                      <div className="mt-3 rounded-2xl border border-[#DFD7CF] bg-[#FFFFFF] p-3.5 shadow-2xs">
                        <div className="flex items-center gap-3.5">
                          <img
                            src={referenceFile.previewUrl}
                            alt="Uploaded reference preview"
                            className="h-14 w-14 shrink-0 rounded-xl border border-[#DFD7CF] object-cover"
                          />
                          <div className="min-w-0 flex-1 font-sans text-xs">
                            <p className="truncate font-bold text-[#25313A]">
                              {referenceFile.name}
                            </p>
                            <p className="text-[11px] text-[#2e7d32] font-semibold">
                              {referenceFile.sizeKb} KB • {imageCopyStatus === 'copied' ? 'Copied to clipboard! Just tap Paste in WhatsApp' : 'Ready to attach'}
                            </p>
                          </div>
                          <div className="flex shrink-0 items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => copyReferenceImageToClipboard()}
                              className="inline-flex items-center gap-1 rounded-full border border-[#DFD7CF] bg-[#EBE5DF] px-3 py-1 font-sans text-[11px] font-bold text-[#25313A] hover:border-[#25313A]"
                            >
                              <Copy className="h-3 w-3" />
                              <span>{imageCopyStatus === 'copied' ? 'Copied' : 'Copy'}</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setReferenceFile(null);
                                setUploadProgress(0);
                                setImageCopyStatus('idle');
                              }}
                              aria-label="Remove image"
                              className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-[#DFD7CF] bg-[#EBE5DF] text-[#6B5E55] hover:text-[#365D60]"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Step 7: Inscription & Notes */}
                  <div className="space-y-4">
                    <div>
                      <label className="field-label">7. Custom Plaque Message</label>
                      <input
                        type="text"
                        maxLength={50}
                        value={cakeMessage}
                        onChange={(e) => setCakeMessage(e.target.value)}
                        placeholder="e.g. Happy 1st Birthday Aanya! / Together Forever"
                        className="field-input"
                      />
                    </div>

                    <div>
                      <label className="field-label">Colour Palette or Theme Notes</label>
                      <textarea
                        rows={2}
                        value={designNotes}
                        onChange={(e) => setDesignNotes(e.target.value)}
                        placeholder="Describe colours (e.g. blush peach, ivory, champagne gold) or custom figurines..."
                        className="field-input"
                      />
                    </div>
                  </div>

                  {/* Navigation Buttons */}
                  <div className="flex justify-between pt-4 border-t border-[#DFD7CF]">
                    <button
                      type="button"
                      onClick={() => setActiveGroup(1)}
                      className="btn-secondary"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      <span>Back</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveGroup(3)}
                      className="btn-primary"
                    >
                      <span>Continue to Date &amp; Details</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* ── PART 3: DATE, DELIVERY & CONTACT ── */}
              {activeGroup === 3 && (
                <div className="space-y-7 pt-6">
                  {/* Step 8: Date & Fulfilment */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                      <div>
                        <label className="field-label">8. Event Date *</label>
                        <input
                          type="date"
                          required
                          min={new Date().toISOString().split('T')[0]}
                          value={requiredDate}
                          onChange={(e) => setRequiredDate(e.target.value)}
                          className="field-input"
                        />
                      </div>
                      <div>
                        <label className="field-label">Fulfilment Method</label>
                        <select
                          value={deliveryLocation}
                          onChange={(e) => setDeliveryLocation(e.target.value)}
                          className="field-input"
                        >
                          {BENGALURU_OUTLETS.map((loc) => (
                            <option key={loc} value={loc}>
                              {loc}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="field-label">Bengaluru Pincode</label>
                        <input
                          type="text"
                          maxLength={6}
                          value={deliveryPincode}
                          onChange={(e) => setDeliveryPincode(e.target.value)}
                          placeholder="560005"
                          className="field-input"
                        />
                      </div>
                    </div>

                    {isHomeDelivery && (
                      <div>
                        <label className="field-label">
                          Full Delivery Address (Flat/House, Street, Landmark) *
                        </label>
                        <input
                          type="text"
                          required
                          value={deliveryAddress}
                          onChange={(e) => setDeliveryAddress(e.target.value)}
                          placeholder="e.g. #42, Mosque Road, Frazer Town, Near Thom's Bakery"
                          className="field-input"
                        />
                      </div>
                    )}
                  </div>

                  {/* Step 9: Contact Information */}
                  <div>
                    <label className="field-label">9. Your Contact Details *</label>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your Full Name *"
                        className="field-input"
                      />
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="10-Digit Mobile *"
                        className="field-input"
                      />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email (Optional)"
                        className="field-input"
                      />
                    </div>
                  </div>

                  {/* Step 10: Brief Summary Confirmation */}
                  <div className="rounded-2xl border border-[#DFD7CF] bg-[#EBE5DF] p-4 text-xs font-sans text-[#25313A] space-y-1">
                    <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-[#365D60] block mb-1">
                      Brief Summary
                    </span>
                    <p>
                      <strong>{occasion}</strong> • {cakeType} • {flavour}{' '}
                      <span className="text-[#2e7d32]">({isEggless ? '100% Eggless' : 'Standard'})</span>
                    </p>
                    <p>
                      {sizeTiers} • {decorations.join(', ') || 'Chef Finishing'}
                    </p>
                    {referenceFile && (
                      <p className="text-[#2e7d32] font-semibold">
                        ✓ Reference Photo: {referenceFile.name} (Ready to paste on WhatsApp)
                      </p>
                    )}
                  </div>

                  {formError && (
                    <p
                      role="alert"
                      className="rounded-xl bg-[#365D60]/10 border border-[#365D60]/20 px-4 py-3 font-sans text-xs font-semibold text-[#365D60]"
                    >
                      {formError}
                    </p>
                  )}

                  {/* Navigation & Submit */}
                  <div className="flex flex-col justify-between gap-3 pt-4 border-t border-[#DFD7CF] sm:flex-row">
                    <button
                      type="button"
                      onClick={() => setActiveGroup(2)}
                      className="btn-secondary"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      <span>Back to Styling</span>
                    </button>

                    <button type="submit" className="btn-primary">
                      <Sparkles className="h-4 w-4" />
                      <span>Review &amp; Submit Bespoke Brief</span>
                    </button>
                  </div>
                </div>
              )}
            </form>

            {/* ── Right 4 Columns: Live Atelier Sticky Summary ── */}
            <aside className="space-y-6 lg:col-span-4 lg:sticky lg:top-28">
              {/* Live Card */}
              <div className="rounded-3xl border border-[#DFD7CF] bg-[#FFFFFF] p-6 shadow-[0_8px_30px_rgba(68,48,38,0.06)]">
                <span className="eyebrow text-[#365D60]">Live Atelier Brief</span>
                <h3 className="mt-2 font-serif text-2xl font-bold text-[#25313A]">
                  {cakeType}
                </h3>
                <p className="mt-0.5 font-sans text-xs text-[#6B5E55]">
                  For {occasion} • {sizeTiers}
                </p>

                <div className="mt-5 space-y-2.5 border-t border-[#DFD7CF] pt-4 font-sans text-xs text-[#25313A]">
                  <div className="flex justify-between">
                    <span className="text-[#6B5E55]">Flavour:</span>
                    <span className="font-semibold text-right">{flavour}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6B5E55]">Dietary:</span>
                    <span className="font-semibold text-[#2e7d32]">
                      {isEggless ? '100% Eggless' : 'Standard (Egg)'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[#6B5E55]">Inspiration:</span>
                    <span className="truncate font-semibold text-[#25313A]">
                      {referenceFile ? referenceFile.name : 'Not attached yet'}
                    </span>
                  </div>
                </div>

                {referenceFile?.previewUrl && (
                  <div className="mt-3.5 flex items-center gap-2.5 rounded-xl border border-[#DFD7CF] bg-[#FFFFFF] p-2.5 shadow-2xs">
                    <img
                      src={referenceFile.previewUrl}
                      alt={referenceFile.name}
                      className="h-10 w-10 shrink-0 rounded-lg object-cover"
                    />
                    <p className="font-sans text-[11px] leading-snug text-[#2e7d32]">
                      <strong>Photo ready!</strong> Paste into WhatsApp chat once it opens.
                    </p>
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleOpenWhatsAppWithImage}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#365D60] py-3.5 font-sans text-xs font-bold uppercase tracking-wider text-[#F5EFEB] shadow-sm transition-all hover:bg-[#2C4C4F] hover:-translate-y-0.5"
                >
                  <WhatsAppIcon className="h-4 w-4 fill-[#F5EFEB]" />
                  <span>Discuss on WhatsApp</span>
                </button>
              </div>

              {/* Studio Process Guide */}
              <div className="rounded-3xl border border-[#DFD7CF] bg-[#FFFFFF] p-6 shadow-[0_8px_30px_rgba(68,48,38,0.06)] text-[#25313A]">
                <h4 className="font-serif text-lg font-bold text-[#25313A]">
                  How Bespoke Works
                </h4>
                <ol className="mt-4 space-y-3 font-sans text-xs text-[#6B5E55]">
                  <li className="flex gap-2.5">
                    <span className="font-serif font-bold text-[#365D60]">01.</span>
                    <span>Submit your brief &amp; reference inspiration.</span>
                  </li>
                  <li className="flex gap-2.5">
                    <span className="font-serif font-bold text-[#365D60]">02.</span>
                    <span>Our chef confirms tier feasibility, flavours &amp; quotation.</span>
                  </li>
                  <li className="flex gap-2.5">
                    <span className="font-serif font-bold text-[#365D60]">03.</span>
                    <span>Handcrafted fresh on the morning of your event.</span>
                  </li>
                  <li className="flex gap-2.5">
                    <span className="font-serif font-bold text-[#365D60]">04.</span>
                    <span>Chilled delivery or boutique pickup across Bengaluru.</span>
                  </li>
                </ol>

                <div className="mt-5 border-t border-[#DFD7CF] pt-4 font-sans text-xs text-[#6B5E55]">
                  <p>Need urgent advice? Call our Frazer Town studio at{' '}
                    <a href={`tel:${PHONE_TEL}`} className="font-bold text-[#25313A] underline hover:text-[#365D60]">
                      {PHONE_DISPLAY}
                    </a>
                  </p>
                </div>
              </div>
            </aside>
          </div>
        )}

        {/* ── 3. Bespoke Inspiration Gallery ── */}
        <section className="mt-20 border-t border-[#DFD7CF] pt-14">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div>
              <span className="eyebrow">Pastry Craftsmanship</span>
              <h2 className="mt-1 font-serif text-3xl font-bold text-[#25313A]">
                Recent Bespoke Commissions.
              </h2>
            </div>
            <p className="font-sans text-xs text-[#6B5E55] max-w-md">
              Every creation is unique. Here are a few handcrafted tiered gateaux and sculpted themes created for Bengaluru celebrations.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {BESPOKE_INSPIRATIONS.map((item, idx) => (
              <div
                key={idx}
                className="group flex flex-col overflow-hidden rounded-3xl border border-[#DFD7CF] bg-[#FFFFFF] shadow-[0_8px_30px_rgba(68,48,38,0.06)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#D0C2B4] hover:shadow-[0_16px_40px_rgba(68,48,38,0.12)]"
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-[#EBE5DF]">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-[#365D60]">
                    {item.category}
                  </span>
                  <h3 className="mt-1 font-serif text-xl font-bold text-[#25313A]">
                    {item.title}
                  </h3>
                  <p className="mt-2 flex-1 font-sans text-xs leading-relaxed text-[#6B5E55]">
                    {item.description}
                  </p>
                  <div className="mt-4 border-t border-[#DFD7CF] pt-3 flex items-center justify-between">
                    <span className="font-sans text-[11px] text-[#25313A] font-medium">
                      {item.flavour}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setCakeType(
                          idx === 0
                            ? 'Custom Wedding Cake'
                            : idx === 1
                            ? 'Personalised Birthday Cake'
                            : 'Celebration Entremet'
                        );
                        window.scrollTo({ top: 300, behavior: 'smooth' });
                      }}
                      className="font-sans text-xs font-bold text-[#365D60] inline-flex items-center gap-1 hover:underline"
                    >
                      <span>Inquire</span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 4. Reassurance Promises Bar ── */}
        <section className="mt-16 rounded-3xl border border-[#DFD7CF] bg-[#FFFFFF] p-8 shadow-[0_8px_30px_rgba(68,48,38,0.06)] sm:p-10">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-start gap-3.5">
              <Clock className="h-5 w-5 shrink-0 text-[#365D60] mt-0.5" />
              <div>
                <h4 className="font-serif text-base font-bold text-[#25313A]">
                  48–72h Notice
                </h4>
                <p className="mt-1 font-sans text-xs text-[#6B5E55]">
                  Handcrafted fresh on the morning of your event. No mass warehousing.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <ShieldCheck className="h-5 w-5 shrink-0 text-[#2e7d32] mt-0.5" />
              <div>
                <h4 className="font-serif text-base font-bold text-[#25313A]">
                  100% Eggless Pure
                </h4>
                <p className="mt-1 font-sans text-xs text-[#6B5E55]">
                  Dedicated vegetarian workstations for pure guilt-free celebrations.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <Truck className="h-5 w-5 shrink-0 text-[#365D60] mt-0.5" />
              <div>
                <h4 className="font-serif text-base font-bold text-[#25313A]">
                  Chilled Van Delivery
                </h4>
                <p className="mt-1 font-sans text-xs text-[#6B5E55]">
                  Temperature-controlled refrigerated transit across Bengaluru.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <Heart className="h-5 w-5 shrink-0 text-[#365D60] mt-0.5" />
              <div>
                <h4 className="font-serif text-base font-bold text-[#25313A]">
                  Artisan Ingredients
                </h4>
                <p className="mt-1 font-sans text-xs text-[#6B5E55]">
                  54% Belgian chocolate, Madagascar vanilla beans &amp; fresh dairy cream.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default CustomCakes;
