import React from 'react';
import { motion } from 'framer-motion';

interface Stat {
  value: string;
  label: string;
  note: string;
}

const STATS: Stat[] = [
  {
    value: '5',
    label: 'Bengaluru Boutiques',
    note: 'Frazer Town to Yelahanka New Town',
  },
  {
    value: '35',
    label: 'Artisan Creations',
    note: 'Baked in small batches every morning',
  },
  {
    value: '8',
    label: 'Celebrations',
    note: 'Birthdays, weddings & intimate wins',
  },
  {
    value: '4.9★',
    label: 'Guest Rating',
    note: 'From over 1,200+ local reviews',
  },
];

export function StatsBand() {
  return (
    <section className="relative bg-[#F5EFEB] pb-4 pt-6 sm:pt-8" aria-label="LaHaven at a glance">
      <div className="premium-container">
        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {STATS.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -3, transition: { duration: 0.25 } }}
              className="rounded-2xl bg-[#EBE5DF] border border-[#DFD7CF] shadow-[0_4px_20px_rgba(68,48,38,0.04)] px-5 py-5 sm:px-6 sm:py-6 transition-colors duration-300 hover:border-[#B6C69F] hover:shadow-[0_12px_32px_rgba(68,48,38,0.10)]"
            >
              <p className="font-serif text-3xl sm:text-4xl font-bold leading-none tracking-tight text-[#25313A]">
                {stat.value}
              </p>
              <p className="mt-2.5 font-sans text-[11px] font-bold uppercase tracking-[0.14em] text-[#365D60]">
                {stat.label}
              </p>
              <p className="mt-1 font-sans text-xs font-normal leading-snug text-[#6B5E55]">
                {stat.note}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default StatsBand;
