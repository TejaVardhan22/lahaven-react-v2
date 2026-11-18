import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Sparkles } from 'lucide-react';

interface JournalArticle {
  id: string;
  slug: string;
  title: string;
  category: string;
  readTime: string;
  excerpt: string;
  image: string;
}

const ARTICLES: JournalArticle[] = [
  {
    id: '1',
    slug: 'belgian-couverture-vs-compound',
    title: 'Why We Only Bake With 54% Belgian Couverture',
    category: 'Patisserie Secrets',
    readTime: '3 min read',
    excerpt: 'The delicate chemistry of real cocoa butter versus palm oil fats, and why pure chocolate melts like silk at body temperature.',
    image: '/images/products/belgian-chocolate-truffle.jpg',
  },
  {
    id: '2',
    slug: 'perfect-eggless-crumb',
    title: 'The Art of the Light & Fluffy Eggless Sponge',
    category: 'Craftsmanship',
    readTime: '4 min read',
    excerpt: 'How our pastry kitchen perfected a pillowy, moist sponge for 100% vegetarian celebrations without synthetic emulsifiers.',
    image: '/images/products/red-velvet-cream-cheese.jpg',
  },
  {
    id: '3',
    slug: 'cake-cutting-portion-guide',
    title: 'The Host’s Guide: Cake Sizing & Clean Slicing',
    category: 'Celebration Tips',
    readTime: '2 min read',
    excerpt: 'From 0.5 kg intimate moments to 3-tier grand receptions: how to slice cleanly with a warm knife and portion like a patisserie pro.',
    image: '/images/products/ferrero-rocher-cake.jpg',
  },
];

export const AtelierJournal: React.FC = () => {
  return (
    <section aria-label="From the Cake Atelier" className="section-rail py-16 sm:py-20">
      <div className="section-heading">
        <div>
          <span className="eyebrow">
            <span className="section-index">04</span>
            <span>From the cake atelier</span>
          </span>
          <h2 className="font-serif">A pinch of inspiration.</h2>
          <p>Patisserie secrets, pairing ideas, and stories from our five Bengaluru kitchens.</p>
        </div>
        <Link to="/our-story" className="text-link font-sans font-semibold">
          <span>Read our journal</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="recipe-grid mt-8">
        {ARTICLES.map((art) => (
          <article
            key={art.id}
            className="group flex flex-col overflow-hidden rounded-3xl border border-[#DFD7CF] bg-[#F5EFEB] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#B6C69F]"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-[#F5EFEB]">
              <img
                src={art.image}
                alt={art.title}
                loading="lazy"
                width={600}
                height={400}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute left-3 top-3 rounded-full border border-[#DFD7CF] bg-[#F5EFEB]/95 px-2.5 py-1 font-sans text-[10px] font-bold uppercase tracking-wider text-[#365D60] backdrop-blur-sm shadow-2xs">
                {art.category}
              </span>
            </div>

            <div className="flex flex-1 flex-col justify-between pt-4">
              <div>
                <div className="flex items-center gap-1.5 text-[11px] text-[#6B5E55]">
                  <Clock className="h-3.5 w-3.5 text-[#B6C69F]" />
                  <span>{art.readTime}</span>
                </div>
                <h3 className="mt-2 font-serif text-xl font-bold leading-snug text-[#25313A] transition-colors group-hover:text-[#365D60]">
                  {art.title}
                </h3>
                <p className="mt-2 line-clamp-2 font-sans text-xs font-normal leading-relaxed text-[#6B5E55]">
                  {art.excerpt}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#DFD7CF]/60">
                <span className="inline-flex items-center gap-1.5 font-sans text-xs font-semibold text-[#365D60] group-hover:underline">
                  <span>Read story</span>
                  <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default AtelierJournal;

