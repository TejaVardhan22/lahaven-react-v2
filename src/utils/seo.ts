import type { SEOData, BreadcrumbItem, Outlet, Product } from '@/types';
import {
  BUSINESS_NAME,
  SITE_URL,
  EMAIL,
  PHONE_RAW,
  TAGLINE,
  SOCIAL_LINKS,
} from '@/utils/constants';
import { outlets } from '@/data/outlets';
import { pageSEO } from '@/data/seo';

const DEFAULT_OG_IMAGE = `${SITE_URL}/og/home.jpg`;
const LOGO_URL = `${SITE_URL}/logo.png`;

const SAME_AS = SOCIAL_LINKS.map((link) => link.url);

const PAGE_ALIASES: Record<string, string> = {
  'our-story': 'about',
};

/**
 * Converts the human-readable outlet address into a schema.org PostalAddress.
 * Outlet addresses follow the pattern: "Street, Area, Bengaluru, Karnataka 560005".
 */
function toPostalAddress(outlet: Outlet): Record<string, string> {
  const parts = outlet.address
    .split(',')
    .map((part) => part.trim())
    .filter(Boolean);

  const postalCode = outlet.address.match(/\b\d{6}\b/)?.[0];
  const regionSegment =
    parts.find((part) => /karnataka/i.test(part)) ?? 'Karnataka';
  const region = regionSegment.replace(/\d{6}/, '').trim() || 'Karnataka';
  const city =
    parts.find((part) => /bengaluru/i.test(part)) ?? 'Bengaluru';
  const cityIndex = parts.indexOf(city);
  const streetAddress = parts
    .slice(0, cityIndex > 0 ? cityIndex : 1)
    .join(', ');

  return {
    '@type': 'PostalAddress',
    streetAddress,
    addressLocality: city,
    addressRegion: region,
    ...(postalCode ? { postalCode } : {}),
    addressCountry: 'IN',
  };
}

function outletSchema(outlet: Outlet): Record<string, unknown> {
  return {
    '@type': 'Bakery',
    '@id': `${SITE_URL}/outlets#${outlet.id}`,
    name: outlet.name,
    telephone: outlet.phone.replace(/\s+/g, ''),
    image: DEFAULT_OG_IMAGE,
    hasMap: outlet.googleMapsUrl,
    address: toPostalAddress(outlet),
    openingHours: ['Mo-Su 09:00-22:00'],
  };
}

/**
 * Generates the SEO data for a given page.
 * Page metadata is sourced from `src/data/seo.ts` so there is a single source of truth.
 */
export function generateSEO(page: string, customData?: Partial<SEOData>): SEOData {
  const key = PAGE_ALIASES[page] || page;
  const defaults = pageSEO[key] || pageSEO.home;

  return {
    ...defaults,
    ...customData,
  };
}

/**
 * Generates JSON-LD BreadcrumbList structured data from an array of breadcrumb items.
 */
export function generateBreadcrumbs(items: BreadcrumbItem[]): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: item.href.startsWith('http') ? item.href : `${SITE_URL}${item.href}`,
    })),
  };
}

/**
 * Generates JSON-LD LocalBusiness (Bakery) structured data for the flagship boutique,
 * including every outlet as a `department` so search engines can surface each location.
 */
export function generateLocalBusinessSchema(): object {
  const flagship = outlets[0];
  const [latitude, longitude] = [12.9985, 77.618];

  return {
    '@context': 'https://schema.org',
    '@type': 'Bakery',
    '@id': `${SITE_URL}/#bakery`,
    name: BUSINESS_NAME,
    description: `${BUSINESS_NAME} — ${TAGLINE} Artisan celebration cakes, bento cakes, designer cakes, and premium desserts.`,
    url: SITE_URL,
    email: EMAIL,
    telephone: PHONE_RAW,
    image: DEFAULT_OG_IMAGE,
    logo: LOGO_URL,
    priceRange: '₹₹',
    servesCuisine: 'Bakery, Cakes & Desserts',
    address: toPostalAddress(flagship),
    geo: {
      '@type': 'GeoCoordinates',
      latitude,
      longitude,
    },
    hasMap: flagship.googleMapsUrl,
    areaServed: {
      '@type': 'City',
      name: 'Bengaluru',
      containedInPlace: {
        '@type': 'State',
        name: 'Karnataka',
      },
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '09:00',
        closes: '22:00',
      },
    ],
    sameAs: SAME_AS,
    department: outlets.map(outletSchema),
  };
}

/**
 * Generates an ItemList of every outlet, used on the store locator page.
 */
export function generateOutletsSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${BUSINESS_NAME} outlets in Bengaluru`,
    numberOfItems: outlets.length,
    itemListElement: outlets.map((outlet, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: outletSchema(outlet),
    })),
  };
}

/**
 * Generates JSON-LD Product structured data for an individual cake.
 */
export function generateProductSchema(product: Product): Record<string, unknown> {
  const price = product.startingPrice?.amount ?? product.price?.amount;
  const currency =
    product.startingPrice?.currency ?? product.price?.currency ?? 'INR';

  const additionalProperty = [
    product.sizes?.length
      ? {
          '@type': 'PropertyValue',
          name: 'Available Sizes',
          value: product.sizes.join(', '),
        }
      : null,
    product.flavors?.length
      ? {
          '@type': 'PropertyValue',
          name: 'Available Flavours',
          value: product.flavors.join(', '),
        }
      : null,
  ].filter(Boolean);

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${SITE_URL}/cakes/${product.slug}#product`,
    name: product.name,
    description: product.description,
    image: product.images.map((image) => image.src),
    sku: product.id,
    category: product.category.replace(/-/g, ' '),
    brand: {
      '@type': 'Brand',
      name: BUSINESS_NAME,
    },
    ...(price !== undefined
      ? {
          offers: {
            '@type': 'Offer',
            price,
            priceCurrency: currency,
            availability: product.isAvailable
              ? 'https://schema.org/InStock'
              : 'https://schema.org/OutOfStock',
            url: `${SITE_URL}/cakes/${product.slug}`,
            seller: {
              '@type': 'Organization',
              name: BUSINESS_NAME,
              url: SITE_URL,
            },
          },
        }
      : {}),
    ...(additionalProperty.length
      ? { additionalProperty }
      : {}),
  };
}

/**
 * Generates JSON-LD Organization structured data for LaHaven Cake Boutique.
 */
export function generateOrganizationSchema(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: BUSINESS_NAME,
    alternateName: 'LaHaven',
    url: SITE_URL,
    logo: LOGO_URL,
    image: DEFAULT_OG_IMAGE,
    email: EMAIL,
    telephone: PHONE_RAW,
    description: `${BUSINESS_NAME} — ${TAGLINE}`,
    address: toPostalAddress(outlets[0]),
    sameAs: SAME_AS,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      telephone: PHONE_RAW,
      email: EMAIL,
      availableLanguage: ['English', 'Hindi', 'Kannada'],
    },
  };
}

/**
 * Generates JSON-LD WebSite structured data for LaHaven Cake Boutique.
 */
export function generateWebsiteSchema(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: BUSINESS_NAME,
    alternateName: 'LaHaven',
    url: SITE_URL,
    inLanguage: 'en-IN',
    description: `${BUSINESS_NAME} — ${TAGLINE}`,
    publisher: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: BUSINESS_NAME,
      logo: {
        '@type': 'ImageObject',
        url: LOGO_URL,
        width: 512,
        height: 512,
      },
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/cakes?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}
