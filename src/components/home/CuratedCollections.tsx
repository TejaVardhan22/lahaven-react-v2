import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Sparkles } from 'lucide-react';

interface CollectionItem {
  id: string;
  title: string;
  subtitle: string;
  kicker: string;
  href: string;
  image: string;
  featured?: boolean;
}

const COLLECTIONS: CollectionItem[] = [
  {
    id: 'signature-cakes',
    title: 'Signature Cakes',
    subtitle: 'Belgian couverture truffles, mirror-glaze entremets & patisserie gateaux',
    kicker: 'House Icons',
    href: '/cakes?category=celebration-cakes',
    image: '/images/hero/belgian-truffle-desktop.jpg',
    featured: true,
  },
  {
    id: 'birthday-cakes',
    title: 'Birthday Cakes',
    subtitle: 'Joyful centrepieces crafted for milestone celebrations',
    kicker: 'Celebrations',
    href: '/cakes?occasion=birthday',
    image: '/images/products/ferrero-rocher-cake.jpg',
  },
  {
    id: 'wedding-cakes',
    title: 'Wedding Cakes',
    subtitle: 'Multi-tiered floral & royal opera masterpieces',
    kicker: 'Bespoke Tiers',
    href: '/cakes?occasion=wedding',
    image: '/images/products/royal-opera-cake.jpg',
  },
  {
    id: 'bento-cakes',
    title: 'Bento Cakes',
    subtitle: 'Petite 4-inch Korean lunchbox cakes with custom notes',
    kicker: 'Intimate Gifting',
    href: '/bento-cakes',
    image: '/images/products/heart-shaped-red-velvet.jpg',
  },
  {
    id: 'designer-cakes',
    title: 'Designer Cakes',
    subtitle: 'Sculpted themes, smash bombs & artistic finishes',
    kicker: 'Edible Art',
    href: '/cakes?category=designer-cakes',
    image: '/images/products/chocolate-fantasy-cake.jpg',
  },
  {
    id: 'gourmet-desserts',
    title: 'Gourmet Desserts',
    subtitle: 'Baked Biscoff cheesecakes, macarons, brownies & jars',
    kicker: 'Patisserie Counter',
    href: '/desserts',
    image: '/images/products/lotus-biscoff-cheesecake.jpg',
    featured: true,
  },
];

export const CuratedCollections: React.FC = () => {
  return (
    <section className="bg-[#F5EFEB] py-16 sm:py-20">
      <div className="premium-container">
        {/* Editorial Heading */}
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end lg:mb-12">
          <div>
            <span className="section-kicker">
              <Sparkles className="h-3 w-3 text-[#B6C69F]" />
              <span>Atelier Editions</span>
            </span>
            <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight text-[#25313A] sm:text-4xl">
              Curated Collections
            </h2>
          </div>
          <p className="max-w-md font-sans text-sm leading-relaxed text-[#6B5E55]">
            Explore six distinct chapters from our pastry kitchens — from signature Belgian
            couverture gateaux to bespoke tiered wedding creations.
          </p>
        </div>

        {/* Asymmetric Editorial Collection Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-12 lg:gap-6">
          {COLLECTIONS.map((col, idx) => {
            const spanClass =
              idx === 0 || idx === 5 ? 'lg:col-span-6' : 'lg:col-span-3';
            return (
              <Link
                key={col.id}
                to={col.href}
                className={`group relative flex min-h-[290px] flex-col justify-end overflow-hidden rounded-[2rem] border border-[#DFD7CF] bg-[#F5EFEB] p-6 shadow-[0_8px_28px_rgba(56,37,42,0.05)] transition-all duration-500 hover:-translate-y-1.5 hover:border-[#B6C69F] hover:shadow-[0_20px_44px_rgba(56,37,42,0.11)] sm:min-h-[320px] ${spanClass}`}
              >
                <img
                  src={col.image}
                  alt={col.title}
                  loading="lazy"
                  width={700}
                  height={500}
                  className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Refined Editorial Scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#25313A]/90 via-[#25313A]/35 to-transparent transition-opacity duration-300" />

                {/* Top Kicker Pill + Arrow */}
                <div className="relative z-10 mb-auto flex items-center justify-between">
                  <span className="rounded-full border border-[#DFD7CF] bg-[#F5EFEB]/95 px-3 py-1 font-sans text-[10px] font-bold uppercase tracking-[0.16em] text-[#365D60] backdrop-blur-sm">
                    {col.kicker}
                  </span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#F5EFEB]/30 bg-[#F5EFEB]/15 text-[#F5EFEB] backdrop-blur-sm transition-all duration-300 group-hover:bg-[#365D60] group-hover:border-[#365D60]">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>

                {/* Bottom Title & Subtitle */}
                <div className="relative z-10 mt-12">
                  <h3 className="font-serif text-2xl font-bold text-white sm:text-[26px]">
                    {col.title}
                  </h3>
                  <p className="mt-1 line-clamp-2 font-sans text-xs leading-relaxed text-[#F5EFEB]/85">
                    {col.subtitle}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CuratedCollections;

