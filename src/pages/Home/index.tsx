import React from 'react';
import { SEOHead } from '@/components/seo/SEOHead';
import { Hero } from '@/components/hero/Hero';
import { SignatureCollection } from '@/components/products/SignatureCollection';
import { BrandIntroduction } from '@/components/home/BrandIntroduction';
import { AtelierStory } from '@/components/home/AtelierStory';
import { CustomCakesTeaser } from '@/components/home/CustomCakesTeaser';
import { CakeGallery } from '@/components/gallery/CakeGallery';
import { pageSEO } from '@/data/seo';
import {
  generateLocalBusinessSchema,
  generateOrganizationSchema,
  generateWebsiteSchema,
} from '@/utils/seo';

export const Home: React.FC = () => {
  const combinedSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      generateLocalBusinessSchema(),
      generateOrganizationSchema(),
      generateWebsiteSchema(),
    ],
  };

  return (
    <>
      <SEOHead
        title={pageSEO.home.title}
        description={pageSEO.home.description}
        canonicalUrl={pageSEO.home.canonicalUrl}
        ogTitle={pageSEO.home.ogTitle}
        ogDescription={pageSEO.home.ogDescription}
        ogImage={pageSEO.home.ogImage}
        twitterCard={pageSEO.home.twitterCard}
        structuredData={combinedSchema}
      />

      {/* ── 1. Hero: Made with Love. Baked to Perfection. ── */}
      <Hero />

      {/* ── 2. Signature Collection: Category Tabs & Responsive Grid (Fast Shopping) ── */}
      <SignatureCollection />

      {/* ── 3. Brand Statement: A Little More Than a Bakery ── */}
      <BrandIntroduction />

      {/* ── 4. Bakery Story: Freshness at Heart. Crafted for Celebrations. ── */}
      <AtelierStory />

      {/* ── 5. Custom Cake Studio: Make Every Celebration Sweeter ── */}
      <CustomCakesTeaser />

      {/* ── 7. Instagram Gallery: Editorial Gallery with Instagram CTA ── */}
      <CakeGallery />
    </>
  );
};

export default Home;
