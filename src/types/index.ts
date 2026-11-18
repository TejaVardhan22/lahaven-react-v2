export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  category: ProductCategory;
  subcategory?: string;
  price?: {
    amount: number;
    currency: string;
    label: string;
  };
  startingPrice?: {
    amount: number;
    currency: string;
    label: string;
  };
  images: ProductImage[];
  tags: string[];
  isEggless?: boolean;
  isAvailable: boolean;
  isFeatured: boolean;
  occasions: string[];
  sizes?: string[];
  flavors?: string[];
  flavorProfile?: 'chocolate' | 'fruit-berry' | 'cream-vanilla' | 'coffee-mocha' | 'cheesecake' | 'nutty-caramel' | 'party-bites';
}

export interface ProductImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export type ProductCategory =
  | 'celebration-cakes'
  | 'bento-cakes'
  | 'designer-cakes'
  | 'desserts'
  | 'wedding-cakes';

export interface Occasion {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: ProductImage;
  cakeCount?: number;
}

export interface Outlet {
  id: string;
  name: string;
  area: string;
  address: string;
  phone: string;
  whatsapp: string;
  googleMapsUrl: string;
  openingHours: {
    days: string;
    hours: string;
  }[];
  isActive: boolean;
  image?: string;
  tagline?: string;
  landmark?: string;
  highlights?: string[];
}

export interface Testimonial {
  id: string;
  customerName: string;
  review: string;
  rating: number;
  cakeOrdered?: string;
  image?: ProductImage;
  date?: string;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: GalleryCategory;
  width: number;
  height: number;
  aspectRatio: 'square' | 'portrait' | 'landscape';
}

export type GalleryCategory =
  | 'celebration-cakes'
  | 'bento-cakes'
  | 'designer-cakes'
  | 'wedding-cakes'
  | 'desserts';

export interface CustomCakeFormData {
  name: string;
  phone: string;
  email: string;
  occasion: string;
  cakeType: string;
  cakeSize: string;
  deliveryDate: string;
  description: string;
  referenceImage?: File;
}

export interface SEOData {
  title: string;
  description: string;
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  twitterCard: 'summary' | 'summary_large_image';
  structuredData?: Record<string, unknown>;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface BreadcrumbItem {
  label: string;
  href: string;
}

