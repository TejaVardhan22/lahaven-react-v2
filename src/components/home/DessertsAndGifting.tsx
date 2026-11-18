import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Gift } from 'lucide-react';

const DESSERT_CATEGORIES = [
  {
    title: 'Brownies',
    subtitle: 'Fudgy Belgian chocochip stacks',
    price: 'From ₹129',
    image: '/images/products/chocochips-brownie.jpg',
    href: '/desserts',
  },
  {
    title: 'Cupcakes',
    subtitle: 'Swirled buttercream & berry boxes',
    price: 'From ₹299',
    image: '/images/products/artisan-cupcakes.jpg',
    href: '/desserts',
  },
  {
    title: 'Cheesecakes',
    subtitle: 'Lotus Biscoff & wild blueberry baked',
    price: 'From ₹899',
    image: '/images/products/lotus-biscoff-cheesecake.jpg',
    href: '/cakes?flavour=cheesecake',
  },
  {
    title: 'Pastries & Tiramisu',
    subtitle: 'Mascarpone espresso & mousse cups',
    price: 'From ₹179',
    image: '/images/products/classic-tiramisu.jpg',
    href: '/desserts',
  },
  {
    title: 'Dessert Boxes',
    subtitle: 'Assorted macarons & glazed donuts',
    price: 'From ₹399',
    image: '/images/products/gourmet-macarons.jpg',
    href: '/desserts',
  },
  {
    title: 'Gift Hampers',
    subtitle: 'Artisan cookies, jars & ribboned boxes',
    price: 'From ₹499',
    image: '/images/products/cookies-selection.jpg',
    href: '/desserts',
  },
];

export const DessertsAndGifting: React.FC = () => {
  return (
    <section className="bg-[#F5EFEB] py-16 sm:py-20">
      <div className="premium-container">
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="section-kicker">
              <Gift className="h-3 w-3 text-[#B6C69F]" />
              <span>Small Indulgences &amp; Gifting</span>
            </span>
            <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight text-[#25313A] sm:text-4xl">
              Desserts &amp; Luxury Gifting
            </h2>
          </div>
          <Link
            to="/desserts"
            className="inline-flex items-center gap-1.5 font-sans text-xs font-bold uppercase tracking-wider text-[#365D60] hover:text-[#25313A]"
          >
            <span>Explore Dessert Counter</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6 lg:gap-5">
          {DESSERT_CATEGORIES.map((item) => (
            <Link
              key={item.title}
              to={item.href}
              className="group flex flex-col overflow-hidden rounded-2xl border border-[#DFD7CF] bg-[#F5EFEB] p-2.5 shadow-[0_4px_16px_rgba(56,37,42,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[#B6C69F] hover:shadow-[0_12px_28px_rgba(56,37,42,0.08)]"
            >
              <div className="aspect-square w-full overflow-hidden rounded-xl bg-[#F5EFEB]">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  width={360}
                  height={360}
                  className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="mt-3 flex flex-1 flex-col justify-between px-1 pb-1">
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#25313A] group-hover:text-[#365D60]">
                    {item.title}
                  </h3>
                  <p className="mt-0.5 line-clamp-2 font-sans text-[11px] leading-snug text-[#6B5E55]">
                    {item.subtitle}
                  </p>
                </div>
                <span className="mt-2 inline-block font-sans text-xs font-bold text-[#365D60]">
                  {item.price}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DessertsAndGifting;

