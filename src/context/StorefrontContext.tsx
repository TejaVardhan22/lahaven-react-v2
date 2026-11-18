import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import type { Product, Outlet } from '@/types';
import { products } from '@/data/products';
import { outlets } from '@/data/outlets';
import {
  findNearestOutletByCoordinates,
  OUTLET_COORDINATES,
  calculateDistanceKm,
} from '@/utils/outletLocator';

export interface AddonItem {
  id: string;
  name: string;
  price: number;
}

export const AVAILABLE_ADDONS: AddonItem[] = [
  { id: 'sparkler-candle', name: 'Golden Sparkler Candle', price: 99 },
  { id: 'happy-bday-topper', name: 'Acrylic Gold Celebration Topper', price: 149 },
  { id: 'greeting-card', name: 'Handwritten Wax-Sealed Note Card', price: 79 },
  { id: 'floral-bouquet', name: 'Fresh Rose & Baby Breath Posy', price: 349 },
];

export interface CartItem {
  cartItemId: string;
  productId: string;
  slug: string;
  name: string;
  image: string;
  size: string;
  flavor: string;
  isEggless: boolean;
  messageOnCake: string;
  addons: AddonItem[];
  unitPrice: number;
  quantity: number;
  deliveryDate?: string;
  deliverySlot?: string;
  pincode?: string;
}

export interface SavedAddress {
  id: string;
  label: string;
  recipientName: string;
  phone: string;
  line1: string;
  area: string;
  pincode: string;
}

export interface CustomerProfile {
  name: string;
  email: string;
  phone: string;
  addresses: SavedAddress[];
}

export interface SubmittedOrder {
  orderId: string;
  createdAt: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  deliveryCharge: number;
  tax: number;
  total: number;
  deliveryDate: string;
  deliverySlot: string;
  address: SavedAddress;
  status: 'Enquiry Sent to Counter' | 'Awaiting Payment Confirmation';
}

interface StorefrontContextValue {
  // Cart
  cart: CartItem[];
  cartCount: number;
  subtotal: number;
  discount: number;
  couponCode: string;
  couponError: string;
  deliveryCharge: number;
  taxAmount: number;
  grandTotal: number;
  addToCart: (item: Omit<CartItem, 'cartItemId'>) => void;
  quickAddToCart: (product: Product, size?: string, isEggless?: boolean) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;

  // Wishlist
  wishlistIds: string[];
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  wishlistProducts: Product[];

  // Drawers & Modals
  activeDrawer: 'cart' | 'wishlist' | 'search' | 'account' | 'direct-order' | null;
  openDrawer: (drawer: 'cart' | 'wishlist' | 'search' | 'account' | 'direct-order') => void;
  closeDrawer: () => void;

  // Nearest Outlet
  nearestOutlet: Outlet;
  outletDistanceKm: number | null;
  outletDriveMinutes: number | null;
  directionsUrl: string | null;
  userCoordinates: { lat: number; lng: number } | null;
  isLocatingOutlet: boolean;
  isOutletModalOpen: boolean;
  setIsOutletModalOpen: (open: boolean) => void;
  selectOutlet: (outletId: string) => void;
  detectUserLocation: () => Promise<void>;

  // Direct Single-Product WhatsApp Order with Delivery Details
  directOrderItem: CartItem | null;
  startDirectWhatsAppOrder: (item: Omit<CartItem, 'cartItemId'>) => void;
  quickDirectWhatsAppOrder: (product: Product, size?: string, isEggless?: boolean) => void;
  updateDirectOrderItem: (updates: Partial<CartItem>) => void;

  // Toast feedback
  toastMessage: string | null;
  showToast: (msg: string) => void;

  // Customer Profile & Orders
  profile: CustomerProfile;
  updateProfile: (next: Partial<CustomerProfile>) => void;
  addAddress: (addr: Omit<SavedAddress, 'id'>) => void;
  removeAddress: (id: string) => void;
  orders: SubmittedOrder[];
  recordOrder: (order: Omit<SubmittedOrder, 'orderId' | 'createdAt'>) => SubmittedOrder;
}

const StorefrontContext = createContext<StorefrontContextValue | undefined>(undefined);

const STORAGE_KEYS = {
  CART: 'lahaven_cart_v1',
  WISHLIST: 'lahaven_wishlist_v1',
  PROFILE: 'lahaven_profile_v1',
  ORDERS: 'lahaven_orders_v1',
  OUTLET: 'lahaven_nearest_outlet_v1',
  OUTLET_DIST: 'lahaven_nearest_outlet_dist_v1',
};

const VALID_COUPONS: Record<string, { type: 'percent' | 'flat'; value: number; minOrder: number }> = {
  SWEET10: { type: 'percent', value: 10, minOrder: 700 },
  CELEBRATE15: { type: 'percent', value: 15, minOrder: 1500 },
  LAHAVEN100: { type: 'flat', value: 100, minOrder: 899 },
};

export function calculateWeightPrice(basePrice: number, size: string): number {
  const normalized = size.toLowerCase();
  if (normalized.includes('2.0') || normalized.includes('2 kg') || normalized.includes('2kg')) {
    return Math.round(basePrice * 3.4);
  }
  if (normalized.includes('1.5')) {
    return Math.round(basePrice * 2.6);
  }
  if (normalized.includes('1.0') || normalized.includes('1 kg') || normalized.includes('1kg')) {
    return Math.round(basePrice * 1.8);
  }
  return basePrice;
}

export function checkBengaluruPincode(pincode: string): {
  valid: boolean;
   serviceable: boolean;
  area: string;
  charge: number;
  eta: string;
} {
  const clean = pincode.trim();
  if (!/^\d{6}$/.test(clean)) {
    return { valid: false, serviceable: false, area: '', charge: 0, eta: '' };
  }
  if (!clean.startsWith('560')) {
    return {
      valid: true,
      serviceable: false,
      area: 'Outside Bengaluru',
      charge: 0,
      eta: 'Currently delivering across Bengaluru (560xxx) only',
    };
  }
  const prefix3 = parseInt(clean.slice(3), 10);
  if ([5, 1, 3, 24, 32, 80, 92, 94, 64].includes(prefix3)) {
    return {
      valid: true,
      serviceable: true,
      area: 'Priority Boutique Zone (North & Central Bengaluru)',
      charge: 0,
      eta: 'Free Express Delivery in 2–4 hours',
    };
  }
  return {
    valid: true,
    serviceable: true,
    area: 'Greater Bengaluru Delivery Zone',
    charge: 79,
    eta: 'Same-Day Chilled Delivery in 4–6 hours',
  };
}

export const StorefrontProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CART);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.WISHLIST);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [profile, setProfile] = useState<CustomerProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROFILE);
      return saved
        ? JSON.parse(saved)
        : {
            name: '',
            email: '',
            phone: '',
            addresses: [
              {
                id: 'default-blr',
                label: 'Home (Bengaluru)',
                recipientName: '',
                phone: '',
                line1: '',
                area: 'Frazer Town / Sadashivanagar',
                pincode: '560005',
              },
            ],
          };
    } catch {
      return { name: '', email: '', phone: '', addresses: [] };
    }
  });

  const [orders, setOrders] = useState<SubmittedOrder[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [couponCode, setCouponCode] = useState<string>('');
  const [couponError, setCouponError] = useState<string>('');
  const [activeDrawer, setActiveDrawer] = useState<
    'cart' | 'wishlist' | 'search' | 'account' | 'direct-order' | null
  >(null);
  const [directOrderItem, setDirectOrderItem] = useState<CartItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Nearest Outlet State
  const [nearestOutlet, setNearestOutlet] = useState<Outlet>(() => {
    try {
      const savedId = localStorage.getItem(STORAGE_KEYS.OUTLET);
      if (savedId) {
        const found = outlets.find((o) => o.id === savedId);
        if (found) return found;
      }
    } catch {
      // ignore
    }
    return outlets[0]; // Frazer Town flagship default
  });

  const [outletDistanceKm, setOutletDistanceKm] = useState<number | null>(() => {
    try {
      const savedDist = localStorage.getItem(STORAGE_KEYS.OUTLET_DIST);
      return savedDist ? parseFloat(savedDist) : null;
    } catch {
      return null;
    }
  });

  const [outletDriveMinutes, setOutletDriveMinutes] = useState<number | null>(null);
  const [directionsUrl, setDirectionsUrl] = useState<string | null>(null);
  const [userCoordinates, setUserCoordinates] = useState<{ lat: number; lng: number } | null>(null);

  const [isLocatingOutlet, setIsLocatingOutlet] = useState<boolean>(false);
  const [isOutletModalOpen, setIsOutletModalOpen] = useState<boolean>(false);

  const selectOutlet = useCallback((outletId: string) => {
    const found = outlets.find((o) => o.id === outletId);
    if (found) {
      setNearestOutlet(found);
      try {
        localStorage.setItem(STORAGE_KEYS.OUTLET, found.id);
      } catch {
        // ignore
      }
    }
  }, []);

  const detectUserLocation = useCallback(async (): Promise<void> => {
    if (typeof window === 'undefined' || !navigator.geolocation) return;
    setIsLocatingOutlet(true);
    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setUserCoordinates({ lat: latitude, lng: longitude });
          const proximity = findNearestOutletByCoordinates(latitude, longitude);
          setNearestOutlet(proximity.outlet);
          setOutletDistanceKm(proximity.roadDistanceKm);
          setOutletDriveMinutes(proximity.estimatedDriveTimeMinutes);
          setDirectionsUrl(proximity.directionsUrl);
          try {
            localStorage.setItem(STORAGE_KEYS.OUTLET, proximity.outlet.id);
            localStorage.setItem(STORAGE_KEYS.OUTLET_DIST, proximity.roadDistanceKm.toString());
          } catch {
            // ignore
          }
          setIsLocatingOutlet(false);
          resolve();
        },
        () => {
          setIsLocatingOutlet(false);
          resolve();
        },
        { timeout: 7000, maximumAge: 60000 }
      );
    });
  }, []);

  // On first mount, if outlet was not previously saved in localStorage, quietly attempt detection
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.OUTLET);
      if (!saved && typeof window !== 'undefined' && navigator.geolocation) {
        detectUserLocation();
      }
    } catch {
      // ignore
    }
  }, [detectUserLocation]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    } catch {
      // ignore storage quota errors
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlistIds));
    } catch {
      // ignore
    }
  }, [wishlistIds]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
    } catch {
      // ignore
    }
  }, [profile]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    } catch {
      // ignore
    }
  }, [orders]);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3200);
  }, []);

  const openDrawer = useCallback(
    (drawer: 'cart' | 'wishlist' | 'search' | 'account' | 'direct-order') => {
      setActiveDrawer(drawer);
    },
    []
  );

  const closeDrawer = useCallback(() => {
    setActiveDrawer(null);
  }, []);

  const startDirectWhatsAppOrder = useCallback((item: Omit<CartItem, 'cartItemId'>) => {
    setDirectOrderItem({
      ...item,
      cartItemId: `direct__${item.productId}__${Date.now()}`,
    });
    setActiveDrawer('direct-order');
  }, []);

  const quickDirectWhatsAppOrder = useCallback(
    (product: Product, sizeOverride?: string, isEgglessOverride?: boolean) => {
      const size = sizeOverride || product.sizes?.[0] || '0.5 kg';
      const basePrice = product.startingPrice?.amount || product.price?.amount || 799;
      const unitPrice = calculateWeightPrice(basePrice, size);
      const isEggless =
        isEgglessOverride !== undefined
          ? isEgglessOverride
          : (product.isEggless ?? product.tags.includes('eggless'));

      startDirectWhatsAppOrder({
        productId: product.id,
        slug: product.slug,
        name: product.name,
        image: product.images[0]?.src || '/images/products/belgian-chocolate-truffle.jpg',
        size,
        flavor: product.flavors?.[0] || 'Signature Recipe',
        isEggless,
        messageOnCake: '',
        addons: [],
        unitPrice,
        quantity: 1,
      });
    },
    [startDirectWhatsAppOrder]
  );

  const updateDirectOrderItem = useCallback((updates: Partial<CartItem>) => {
    setDirectOrderItem((prev) => (prev ? { ...prev, ...updates } : null));
  }, []);

  const addToCart = useCallback(
    (item: Omit<CartItem, 'cartItemId'>) => {
      const addonKey = item.addons.map((a) => a.id).sort().join(',');
      const cartItemId = `${item.productId}__${item.size}__${item.flavor}__${item.isEggless ? 'eggless' : 'egg'}__${item.messageOnCake.trim()}__${addonKey}`;

      setCart((prev) => {
        const existingIndex = prev.findIndex((i) => i.cartItemId === cartItemId);
        if (existingIndex > -1) {
          const updated = [...prev];
          updated[existingIndex] = {
            ...updated[existingIndex],
            quantity: updated[existingIndex].quantity + item.quantity,
          };
          return updated;
        }
        return [...prev, { ...item, cartItemId }];
      });

      showToast(`Added "${item.name}" (${item.size}) to your bag`);
    },
    [showToast]
  );

  const quickAddToCart = useCallback(
    (product: Product, sizeOverride?: string, isEgglessOverride?: boolean) => {
      const size = sizeOverride || product.sizes?.[0] || '0.5 kg';
      const basePrice = product.startingPrice?.amount || product.price?.amount || 799;
      const unitPrice = calculateWeightPrice(basePrice, size);
      const isEggless = isEgglessOverride !== undefined ? isEgglessOverride : true;
      addToCart({
        productId: product.id,
        slug: product.slug,
        name: product.name,
        image: product.images[0]?.src || '/images/products/belgian-chocolate-truffle.jpg',
        size,
        flavor: product.flavors?.[0] || 'Signature Recipe',
        isEggless,
        messageOnCake: '',
        addons: [],
        unitPrice,
        quantity: 1,
      });
    },
    [addToCart]
  );

  const updateQuantity = useCallback((cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      setCart((prev) => prev.filter((i) => i.cartItemId !== cartItemId));
      return;
    }
    setCart((prev) =>
      prev.map((i) => (i.cartItemId === cartItemId ? { ...i, quantity } : i))
    );
  }, []);

  const removeFromCart = useCallback((cartItemId: string) => {
    setCart((prev) => prev.filter((i) => i.cartItemId !== cartItemId));
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
    setCouponCode('');
  }, []);

  const subtotal = useMemo(() => {
    return cart.reduce((sum, item) => {
      const addonsTotal = item.addons.reduce((aSum, a) => aSum + a.price, 0);
      return sum + (item.unitPrice + addonsTotal) * item.quantity;
    }, 0);
  }, [cart]);

  const discount = useMemo(() => {
    if (!couponCode) return 0;
    const rule = VALID_COUPONS[couponCode];
    if (!rule || subtotal < rule.minOrder) return 0;
    if (rule.type === 'percent') {
      return Math.round((subtotal * rule.value) / 100);
    }
    return rule.value;
  }, [couponCode, subtotal]);

  const applyCoupon = useCallback(
    (rawCode: string): boolean => {
      const code = rawCode.trim().toUpperCase();
      setCouponError('');
      if (!code) {
        setCouponError('Please enter a coupon code');
        return false;
      }
      const rule = VALID_COUPONS[code];
      if (!rule) {
        setCouponError('Invalid code. Try SWEET10 or CELEBRATE15');
        return false;
      }
      if (subtotal < rule.minOrder) {
        setCouponError(`Minimum order of ₹${rule.minOrder} required for ${code}`);
        return false;
      }
      setCouponCode(code);
      showToast(`Coupon ${code} applied!`);
      return true;
    },
    [subtotal, showToast]
  );

  const removeCoupon = useCallback(() => {
    setCouponCode('');
    setCouponError('');
  }, []);

  const deliveryCharge = useMemo(() => {
    if (cart.length === 0) return 0;
    return subtotal >= 1200 ? 0 : 79;
  }, [cart.length, subtotal]);

  const taxAmount = useMemo(() => {
    return Math.round(Math.max(0, subtotal - discount) * 0.05);
  }, [subtotal, discount]);

  const grandTotal = useMemo(() => {
    if (cart.length === 0) return 0;
    return Math.max(0, subtotal - discount) + deliveryCharge + taxAmount;
  }, [cart.length, subtotal, discount, deliveryCharge, taxAmount]);

  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  const toggleWishlist = useCallback(
    (productId: string) => {
      setWishlistIds((prev) => {
        const exists = prev.includes(productId);
        const next = exists ? prev.filter((id) => id !== productId) : [...prev, productId];
        const prod = products.find((p) => p.id === productId);
        if (prod) {
          showToast(
            exists
              ? `Removed "${prod.name}" from wishlist`
              : `Saved "${prod.name}" to your wishlist`
          );
        }
        return next;
      });
    },
    [showToast]
  );

  const isWishlisted = useCallback(
    (productId: string) => wishlistIds.includes(productId),
    [wishlistIds]
  );

  const wishlistProducts = useMemo(
    () => products.filter((p) => wishlistIds.includes(p.id)),
    [wishlistIds]
  );

  const updateProfile = useCallback((next: Partial<CustomerProfile>) => {
    setProfile((prev) => ({ ...prev, ...next }));
  }, []);

  const addAddress = useCallback((addr: Omit<SavedAddress, 'id'>) => {
    const newAddr: SavedAddress = { ...addr, id: `addr-${Date.now()}` };
    setProfile((prev) => ({ ...prev, addresses: [...prev.addresses, newAddr] }));
  }, []);

  const removeAddress = useCallback((id: string) => {
    setProfile((prev) => ({
      ...prev,
      addresses: prev.addresses.filter((a) => a.id !== id),
    }));
  }, []);

  const recordOrder = useCallback(
    (orderData: Omit<SubmittedOrder, 'orderId' | 'createdAt'>): SubmittedOrder => {
      const created: SubmittedOrder = {
        ...orderData,
        orderId: `LH-${Math.floor(100000 + Math.random() * 900000)}`,
        createdAt: new Date().toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        }),
      };
      setOrders((prev) => [created, ...prev]);
      return created;
    },
    []
  );

  return (
    <StorefrontContext.Provider
      value={{
        cart,
        cartCount,
        subtotal,
        discount,
        couponCode,
        couponError,
        deliveryCharge,
        taxAmount,
        grandTotal,
        addToCart,
        quickAddToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        applyCoupon,
        removeCoupon,
        wishlistIds,
        toggleWishlist,
        isWishlisted,
        wishlistProducts,
        activeDrawer,
        openDrawer,
        closeDrawer,
        directOrderItem,
        startDirectWhatsAppOrder,
        quickDirectWhatsAppOrder,
        updateDirectOrderItem,
        toastMessage,
        showToast,
        profile,
        updateProfile,
        addAddress,
        removeAddress,
        orders,
        recordOrder,
        nearestOutlet,
        outletDistanceKm,
        outletDriveMinutes,
        directionsUrl,
        userCoordinates,
        isLocatingOutlet,
        isOutletModalOpen,
        setIsOutletModalOpen,
        selectOutlet,
        detectUserLocation,
      }}
    >
      {children}
    </StorefrontContext.Provider>
  );
};

export function useStorefront() {
  const ctx = useContext(StorefrontContext);
  if (!ctx) {
    throw new Error('useStorefront must be used within a StorefrontProvider');
  }
  return ctx;
}

