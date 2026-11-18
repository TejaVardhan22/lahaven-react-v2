import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

interface FlavourCard {
  id: string;
  label: string;
  description: string;
  image: string;
  href: string;
  count: string;
}

const FLAVOUR_CARDS: FlavourCard[] = [
  {
    id: 'chocolate',
    label: 'Belgian Chocolate',
    description: 'Dark truffle, ganache & hazelnut',
    image: '/images/products/belgian-chocolate-truffle.jpg',
    href: '/cakes?flavour=chocolate',
    count: '10 Cakes',
  },
  {
    id: 'fruit-berry',
    label: 'Fruit & Berry',
    description: 'Alphonso mango, lychee & blueberry',
    image: '/images/products/mango-raspberry-cake.jpg',
    href: '/cakes?flavour=fruit-berry',
    count: '7 Cakes',
  },
  {
    id: 'cream-vanilla',
    label: 'Red Velvet & Cream',
    description: 'Cream cheese & Madagascar vanilla',
    image: '/images/products/red-velvet-cream-cheese.jpg',
    href: '/cakes?flavour=cream-vanilla',
    count: '4 Cakes',
  },
  {
    id: 'nutty-caramel',
    label: 'Butterscotch & Nutty',
    description: 'Ferrero Rocher & roasted almond',
    image: '/images/products/ferrero-rocher-cake.jpg',
    href: '/cakes?flavour=nutty-caramel',
    count: '3 Cakes',
  },
  {
    id: 'cheesecake',
    label: 'Baked Cheesecakes',
    description: 'Lotus Biscoff & wild blueberry',
    image: '/images/products/lotus-biscoff-cheesecake.jpg',
    href: '/cakes?flavour=cheesecake',
    count: '2 Cakes',
  },
  {
    id: 'coffee-mocha',
    label: 'Coffee & Opera',
    description: 'French Opera & Italian Tiramisu',
    image: '/images/products/royal-opera-cake.jpg',
    href: '/cakes?flavour=coffee-mocha',
    count: '2 Cakes',
  },
];

export function ShopByFlavour() {
  return (
    <section className="bg-[#EBE5DF] py-14 sm:py-20" aria-label="Shop by Flavour">
      <div className="section-rail">
        {/* Header */}
        <div className="mb-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <span className="eyebrow inline-flex items-center gap-2 rounded-full bg-[#FFFFFF] px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#365D60] border border-[#DFD7CF]">
              <Sparkles className="h-3 w-3 text-[#B6C69F]" />
              <span>Flavour Profiles</span>
            </span>
            <h2 className="mt-2.5 font-serif text-3xl font-bold tracking-tight text-[#25313A] sm:text-4xl">
              What&apos;s Your Craving Today?
            </h2>
            <p className="mt-1 font-sans text-xs font-normal text-[#6B5E55] sm:text-sm">
              Discover artisan bakes grouped by your favourite flavour profiles.
            </p>
          </div>
          <Link
            to="/cakes"
            className="group inline-flex items-center gap-1.5 font-sans text-xs font-bold uppercase tracking-wider text-[#365D60] transition-colors hover:text-[#25313A]"
          >
            <span>Explore All Flavours</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 6-Column Flavour Grid with Staggered Entrance & Subtle Zoom */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {FLAVOUR_CARDS.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                to={card.href}
                className="group flex flex-col overflow-hidden rounded-2xl border border-[#DFD7CF] bg-[#FFFFFF] p-2.5 shadow-[0_4px_16px_rgba(68,48,38,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[#365D60] hover:shadow-[0_12px_28px_rgba(68,48,38,0.08)]"
              >
                <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-[#EBE5DF]">
                  <img
                    src={card.image}
                    alt={card.label}
                    className="h-full w-full object-cover object-center transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                    loading="lazy"
                    width={400}
                    height={400}
                  />
                  <span className="absolute right-2 top-2 rounded-full bg-[#FFFFFF]/95 px-2 py-0.5 font-sans text-[9.5px] font-bold text-[#365D60] shadow-2xs">
                    {card.count}
                  </span>
                </div>
                <div className="mt-3 px-1 pb-1">
                  <h3 className="font-serif text-base font-bold leading-snug text-[#25313A] transition-colors group-hover:text-[#365D60]">
                    {card.label}
                  </h3>
                  <p className="mt-0.5 line-clamp-1 font-sans text-[11px] text-[#6B5E55]">
                    {card.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ShopByFlavour;
