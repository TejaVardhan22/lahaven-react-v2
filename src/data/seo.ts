import type { SEOData } from '@/types';
import { SITE_URL } from '@/utils/constants';

export const pageSEO: Record<string, SEOData> = {
  home: {
    title: 'LaHaven Cake Boutique — Premium Cakes in Bengaluru | Celebration Starts Here!',
    description:
      'LaHaven Cake Boutique crafts premium, handcrafted cakes for every celebration in Bengaluru. From rich chocolate truffle cakes to elegant wedding tiers and adorable bento cakes — every creation is baked with love.',
    canonicalUrl: SITE_URL,
    ogTitle: 'LaHaven Cake Boutique — Premium Cakes in Bengaluru',
    ogDescription:
      'Handcrafted premium cakes for birthdays, weddings, and every celebration. Order online or visit our Bengaluru outlets.',
    ogImage: `${SITE_URL}/og/home.jpg`,
    twitterCard: 'summary_large_image',
  },
  cakes: {
    title: 'Premium Cakes in Bengaluru | LaHaven Cake Boutique',
    description:
      'Explore our collection of premium celebration cakes — from indulgent Chocolate Truffle and Red Velvet to classic Black Forest and Vanilla Bean. Freshly baked in Bengaluru with the finest ingredients.',
    canonicalUrl: `${SITE_URL}/cakes`,
    ogTitle: 'Premium Cakes in Bengaluru | LaHaven Cake Boutique',
    ogDescription:
      'Discover our range of handcrafted celebration cakes. Rich flavours, stunning designs, freshly baked for your special moments.',
    ogImage: `${SITE_URL}/og/cakes.jpg`,
    twitterCard: 'summary_large_image',
  },
  'bento-cakes': {
    title: 'Bento Cakes in Bengaluru | Small Cakes, Big Love | LaHaven',
    description:
      'Adorable 4-inch bento cakes perfect for intimate celebrations, surprises, and personal indulgences. Choose from minimal, birthday, couple, and photo bento designs at LaHaven.',
    canonicalUrl: `${SITE_URL}/bento-cakes`,
    ogTitle: 'Bento Cakes — Small Cakes, Big Love | LaHaven',
    ogDescription:
      'Petite, personalised bento cakes delivered in signature bento boxes. Perfect for birthdays, anniversaries, and everyday surprises.',
    ogImage: `${SITE_URL}/og/bento-cakes.jpg`,
    twitterCard: 'summary_large_image',
  },
  'custom-cakes': {
    title: 'Custom Cakes in Bengaluru | Design Your Dream Cake | LaHaven',
    description:
      'Bring your wildest cake vision to life with LaHaven\'s custom designer cakes. From intricate fondant sculpting to hand-painted details — we create bespoke edible artworks for every occasion.',
    canonicalUrl: `${SITE_URL}/custom-cakes`,
    ogTitle: 'Design Your Dream Cake | LaHaven Custom Cakes',
    ogDescription:
      'Fully custom, one-of-a-kind cakes tailored to your imagination. Share your inspiration and let our cake artists create magic.',
    ogImage: `${SITE_URL}/og/custom-cakes.jpg`,
    twitterCard: 'summary_large_image',
  },
  desserts: {
    title: 'Premium Desserts in Bengaluru | LaHaven Cake Boutique',
    description:
      'Indulge in LaHaven\'s premium dessert collection — from classic New York cheesecake and authentic Italian tiramisu to fudgy brownie towers. Handcrafted with the finest ingredients.',
    canonicalUrl: `${SITE_URL}/desserts`,
    ogTitle: 'Premium Desserts | LaHaven Cake Boutique',
    ogDescription:
      'Cheesecakes, tiramisu, brownies and more — explore our handcrafted dessert collection in Bengaluru.',
    ogImage: `${SITE_URL}/og/desserts.jpg`,
    twitterCard: 'summary_large_image',
  },
  about: {
    title: 'Our Story | LaHaven Cake Boutique — Handcrafted with Love',
    description:
      'Discover the story behind LaHaven Cake Boutique — our passion for baking, commitment to quality ingredients, and the love we pour into every cake we create in Bengaluru.',
    canonicalUrl: `${SITE_URL}/our-story`,
    ogTitle: 'Our Story | LaHaven Cake Boutique',
    ogDescription:
      'From a small kitchen to five outlets across Bengaluru — learn how LaHaven grew into the city\'s favourite cake boutique.',
    ogImage: `${SITE_URL}/og/about.jpg`,
    twitterCard: 'summary_large_image',
  },
  outlets: {
    title: 'LaHaven Cake Boutique Outlets in Bengaluru | Visit Us',
    description:
      'Find a LaHaven Cake Boutique near you. Visit our outlets in Frazer Town, Malleshwaram, Sahakarnagar, Sanjayanagar, and Yelahanka for fresh cakes and a warm welcome.',
    canonicalUrl: `${SITE_URL}/outlets`,
    ogTitle: 'LaHaven Outlets in Bengaluru | Visit Us',
    ogDescription:
      'Five locations across Bengaluru. Walk in, pick your favourite cake, and take home a slice of happiness.',
    ogImage: `${SITE_URL}/og/outlets.jpg`,
    twitterCard: 'summary_large_image',
  },
  contact: {
    title: 'Contact LaHaven Cake Boutique | Order Your Cake Today',
    description:
      'Get in touch with LaHaven Cake Boutique to place an order, enquire about custom cakes, or plan your event. Reach us via WhatsApp, phone, or visit any of our Bengaluru outlets.',
    canonicalUrl: `${SITE_URL}/contact`,
    ogTitle: 'Contact LaHaven Cake Boutique',
    ogDescription:
      'Have a cake enquiry? Reach out to us via WhatsApp, phone, or email. We\'d love to bake something special for you.',
    ogImage: `${SITE_URL}/og/contact.jpg`,
    twitterCard: 'summary_large_image',
  },
  franchise: {
    title: 'Franchise Opportunities | Partner with LaHaven Cake Boutique',
    description:
      'Join Bengaluru\'s fastest-growing premium artisan cake boutique brand. Explore FOCO and FICO boutique bakery franchise formats, turnkey kitchen setups, and commissary support.',
    canonicalUrl: `${SITE_URL}/franchise`,
    ogTitle: 'LaHaven Cake Boutique Franchise Opportunities',
    ogDescription:
      'Partner with LaHaven Cake Boutique. High ROI, proven unit economics, turnkey support, and physical commissary backing.',
    ogImage: `${SITE_URL}/og/franchise.jpg`,
    twitterCard: 'summary_large_image',
  },
};
