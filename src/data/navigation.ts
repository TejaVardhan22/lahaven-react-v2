import type { NavItem } from '@/types';

export interface DropdownItem {
  label: string;
  description: string;
  href: string;
  badge?: string;
}

export interface NavCategoryItem extends NavItem {
  dropdownItems?: DropdownItem[];
}

export const mainNavItems: NavCategoryItem[] = [
  { label: 'Cakes', href: '/cakes' },
  { label: 'Custom Cakes', href: '/custom-cakes' },
  { label: 'Our Outlets', href: '/outlets' },
  { label: 'Our Story', href: '/our-story' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'Franchise', href: '/franchise' },
];

export const mobileDrawerNavItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Celebration Cakes', href: '/cakes' },
  { label: 'Bento Cakes', href: '/bento-cakes' },
  { label: 'Custom Cake Studio', href: '/custom-cakes' },
  { label: 'Artisan Desserts', href: '/desserts' },
  { label: 'Our Outlets (5 Locations)', href: '/outlets' },
  { label: 'Our Story', href: '/our-story' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'Franchise Partner', href: '/franchise' },
];

export const footerExploreLinks: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Cakes', href: '/cakes' },
  { label: 'Bento Cakes', href: '/bento-cakes' },
  { label: 'Custom Cakes', href: '/custom-cakes' },
  { label: 'Desserts', href: '/desserts' },
  { label: 'Boutique Outlets', href: '/outlets' },
];

export const footerCompanyLinks: NavItem[] = [
  { label: 'Our Story', href: '/our-story' },
  { label: 'Our Outlets', href: '/outlets' },
  { label: 'Franchise Partner', href: '/franchise' },
  { label: 'Contact Us', href: '/contact' },
];

export const footerCollectionLinks: NavItem[] = [
  { label: 'Birthday Cakes', href: '/cakes?occasion=birthday' },
  { label: 'Wedding Cakes', href: '/cakes?occasion=wedding' },
  { label: 'Designer Cakes', href: '/cakes?category=designer' },
  { label: 'Bento Cakes', href: '/bento-cakes' },
];
