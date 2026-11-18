import React, { useState, useMemo, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  X,
  ShoppingBag,
  Heart,
  Search,
  User,
  Trash2,
  Plus,
  Minus,
  Tag,
  ArrowRight,
  MapPin,
  Clock,
  CheckCircle2,
  Sparkles,
  Package,
} from 'lucide-react';
import {
  useStorefront,
  checkBengaluruPincode,
  calculateWeightPrice,
} from '@/context/StorefrontContext';
import { products, getProductBySlug } from '@/data/products';
import { getWhatsAppUrl, PHONE_DISPLAY, PHONE_TEL } from '@/utils/constants';
import { WhatsAppIcon } from '@/components/shared/Icons';

const DELIVERY_SLOTS = [
  'Morning (10:00 AM – 1:00 PM)',
  'Afternoon (1:00 PM – 4:00 PM)',
  'Evening (4:00 PM – 8:00 PM)',
  'Late Evening (8:00 PM – 10:30 PM)',
];

export const StorefrontDrawers: React.FC = () => {
  const {
    cart,
    cartCount,
    subtotal,
    discount,
    couponCode,
    couponError,
    deliveryCharge,
    taxAmount,
    grandTotal,
    updateQuantity,
    removeFromCart,
    clearCart,
    applyCoupon,
    removeCoupon,
    quickAddToCart,
    wishlistProducts,
    toggleWishlist,
    activeDrawer,
    openDrawer,
    closeDrawer,
    directOrderItem,
    updateDirectOrderItem,
    toastMessage,
    profile,
    updateProfile,
    addAddress,
    removeAddress,
    orders,
    recordOrder,
  } = useStorefront();

  const navigate = useNavigate();

  // Search modal state
  const [searchQuery, setSearchQuery] = useState('');

  // Cart & Checkout state
  const [couponInput, setCouponInput] = useState('');
  const [checkoutStep, setCheckoutStep] = useState<'bag' | 'checkout' | 'confirmed'>('bag');
  const [recipientName, setRecipientName] = useState(profile.name || '');
  const [recipientPhone, setRecipientPhone] = useState(profile.phone || '');
  const [addressLine, setAddressLine] = useState(profile.addresses[0]?.line1 || '');
  const [areaName, setAreaName] = useState(profile.addresses[0]?.area || 'Frazer Town');
  const [pincode, setPincode] = useState(profile.addresses[0]?.pincode || '560005');
  const [deliveryDate, setDeliveryDate] = useState(
    new Date(Date.now() + 86400000).toISOString().split('T')[0]
  );
  const [deliverySlot, setDeliverySlot] = useState(DELIVERY_SLOTS[1]);
  const [checkoutError, setCheckoutError] = useState('');
  const [lastOrderId, setLastOrderId] = useState('');

  // Account drawer new-address form
  const [newAddrLabel, setNewAddrLabel] = useState('Home');
  const [newAddrLine, setNewAddrLine] = useState('');
  const [newAddrPincode, setNewAddrPincode] = useState('560001');

  useEffect(() => {
    if (activeDrawer !== 'cart' && activeDrawer !== 'direct-order') {
      setCheckoutStep('bag');
      setCheckoutError('');
    }
    if (activeDrawer === 'direct-order' && directOrderItem) {
      if (directOrderItem.pincode) setPincode(directOrderItem.pincode);
      if (directOrderItem.deliveryDate) setDeliveryDate(directOrderItem.deliveryDate);
      if (directOrderItem.deliverySlot) setDeliverySlot(directOrderItem.deliverySlot);
      setCheckoutError('');
    }
  }, [activeDrawer, directOrderItem]);

  // Escape closes active drawer
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeDrawer) {
        closeDrawer();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeDrawer, closeDrawer]);

  const pincodeStatus = useMemo(() => checkBengaluruPincode(pincode), [pincode]);

  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return products.slice(0, 6);
    return products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)) ||
          p.category.toLowerCase().includes(q)
      )
      .slice(0, 10);
  }, [searchQuery]);

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutError('');

    if (!recipientName.trim()) {
      setCheckoutError('Please enter the recipient name.');
      return;
    }
    if (!/^\d{10}$/.test(recipientPhone.replace(/\D/g, '').slice(-10))) {
      setCheckoutError('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (!pincodeStatus.valid || !pincodeStatus.serviceable) {
      setCheckoutError('Please enter a serviceable Bengaluru pincode (560xxx).');
      return;
    }
    if (!addressLine.trim()) {
      setCheckoutError('Please provide the delivery address.');
      return;
    }

    updateProfile({
      name: recipientName.trim(),
      phone: recipientPhone.trim(),
    });

    const recorded = recordOrder({
      items: cart,
      subtotal,
      discount,
      deliveryCharge,
      tax: taxAmount,
      total: grandTotal,
      deliveryDate,
      deliverySlot,
      address: {
        id: 'checkout-addr',
        label: 'Delivery Address',
        recipientName: recipientName.trim(),
        phone: recipientPhone.trim(),
        line1: addressLine.trim(),
        area: areaName.trim(),
        pincode: pincode.trim(),
      },
      status: 'Enquiry Sent to Counter',
    });

    setLastOrderId(recorded.orderId);

    const lines = cart.map(
      (item, idx) =>
        `${idx + 1}. *${item.name}* (${item.size}, ${item.flavor}, ${
          item.isEggless ? '100% Eggless' : 'With Egg'
        }) × ${item.quantity} — ₹${item.unitPrice * item.quantity}${
          item.messageOnCake ? `\n   Cake Message: "${item.messageOnCake}"` : ''
        }${
          item.addons.length > 0
            ? `\n   Add-ons: ${item.addons.map((a) => a.name).join(', ')}`
            : ''
        }`
    );

    const waText = [
      `✨ *LAHAVEN CAKE ORDER REQUEST (${recorded.orderId})*`,
      '━━━━━━━━━━━━━━━━━━━━━',
      ...lines,
      '━━━━━━━━━━━━━━━━━━━━━',
      `*Subtotal:* ₹${subtotal}`,
      discount > 0 ? `*Discount (${couponCode}):* -₹${discount}` : '',
      `*Delivery:* ${deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`}`,
      `*GST (5%):* ₹${taxAmount}`,
      `*Total Payable:* ₹${grandTotal}`,
      '',
      `*Delivery Details:*`,
      `• *Customer:* ${recipientName} (${recipientPhone})`,
      `• *Address:* ${addressLine}, ${areaName} - ${pincode}`,
      `• *Date & Slot:* ${deliveryDate} | ${deliverySlot}`,
      '',
      `Please share the UPI / payment link to confirm my order.`,
    ]
      .filter(Boolean)
      .join('\n');

    window.open(getWhatsAppUrl(waText), '_blank', 'noopener,noreferrer');
    clearCart();
    setCheckoutStep('confirmed');
  };

  const handleDirectOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!directOrderItem) return;
    setCheckoutError('');

    if (!recipientName.trim()) {
      setCheckoutError('Please enter the recipient name.');
      return;
    }
    if (!/^\d{10}$/.test(recipientPhone.replace(/\D/g, '').slice(-10))) {
      setCheckoutError('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (!pincodeStatus.valid || !pincodeStatus.serviceable) {
      setCheckoutError('Please enter a serviceable Bengaluru pincode (560xxx).');
      return;
    }
    if (!addressLine.trim()) {
      setCheckoutError('Please provide the full delivery address.');
      return;
    }

    updateProfile({
      name: recipientName.trim(),
      phone: recipientPhone.trim(),
    });

    const addonsSum = directOrderItem.addons.reduce((s, a) => s + a.price, 0);
    const itemSubtotal = (directOrderItem.unitPrice + addonsSum) * directOrderItem.quantity;
    const itemDelivery = itemSubtotal >= 1200 ? 0 : 79;
    const itemTax = Math.round(itemSubtotal * 0.05);
    const itemGrandTotal = itemSubtotal + itemDelivery + itemTax;

    const recorded = recordOrder({
      items: [directOrderItem],
      subtotal: itemSubtotal,
      discount: 0,
      deliveryCharge: itemDelivery,
      tax: itemTax,
      total: itemGrandTotal,
      deliveryDate,
      deliverySlot,
      address: {
        id: 'direct-addr',
        label: 'Delivery Address',
        recipientName: recipientName.trim(),
        phone: recipientPhone.trim(),
        line1: addressLine.trim(),
        area: areaName.trim(),
        pincode: pincode.trim(),
      },
      status: 'Enquiry Sent to Counter',
    });

    setLastOrderId(recorded.orderId);

    const waText = [
      `✨ *LAHAVEN DIRECT CAKE ORDER (${recorded.orderId})*`,
      '━━━━━━━━━━━━━━━━━━━━━',
      `*Cake:* ${directOrderItem.name}`,
      `*Weight / Size:* ${directOrderItem.size}`,
      `*Flavour:* ${directOrderItem.flavor}`,
      `*Dietary:* ${directOrderItem.isEggless ? '100% Eggless' : 'Contains Egg'}`,
      `*Quantity:* ${directOrderItem.quantity}`,
      directOrderItem.messageOnCake ? `*Message on Cake:* "${directOrderItem.messageOnCake}"` : '',
      directOrderItem.addons.length > 0
        ? `*Add-ons:* ${directOrderItem.addons.map((a) => a.name).join(', ')}`
        : '',
      '━━━━━━━━━━━━━━━━━━━━━',
      `*Cake Subtotal:* ₹${itemSubtotal}`,
      `*Delivery:* ${itemDelivery === 0 ? 'FREE' : `₹${itemDelivery}`}`,
      `*GST (5%):* ₹${itemTax}`,
      `*Total Payable:* ₹${itemGrandTotal}`,
      '',
      `*Delivery Details:*`,
      `• *Recipient:* ${recipientName.trim()} (${recipientPhone.trim()})`,
      `• *Address:* ${addressLine.trim()}, ${areaName.trim()} - ${pincode.trim()}`,
      `• *Delivery Date & Slot:* ${deliveryDate} | ${deliverySlot}`,
      '',
      `Please confirm my delivery slot and share the payment link.`,
    ]
      .filter(Boolean)
      .join('\n');

    window.open(getWhatsAppUrl(waText), '_blank', 'noopener,noreferrer');
    closeDrawer();
  };

  return (
    <>
      {/* ── Toast Notification Pill ── */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            role="status"
            aria-live="polite"
            className="fixed bottom-6 left-1/2 z-[90] flex -translate-x-1/2 items-center gap-2.5 rounded-full border border-[#B6C69F]/40 bg-[#25313A] px-5 py-3 font-sans text-xs font-semibold text-[#F5EFEB] shadow-xl"
          >
            <Sparkles className="h-3.5 w-3.5 text-[#B6C69F]" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Active Drawer / Modal Backdrop & Panel ── */}
      <AnimatePresence>
        {activeDrawer && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeDrawer}
              className="fixed inset-0 z-[70] bg-[#25313A]/45 backdrop-blur-sm"
              aria-hidden="true"
            />

            {/* SEARCH MODAL */}
            {activeDrawer === 'search' && (
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.98 }}
                role="dialog"
                aria-modal="true"
                aria-label="Search cakes and desserts"
                className="fixed inset-x-4 top-20 z-[80] mx-auto max-w-2xl overflow-hidden rounded-3xl border border-[#F5EFEB] bg-[#F5EFEB] shadow-2xl sm:top-24"
              >
                <div className="flex items-center gap-3 border-b border-[#F5EFEB] bg-[#F5EFEB] px-5 py-4">
                  <Search className="h-5 w-5 text-[#365D60]" />
                  <input
                    type="search"
                    autoFocus
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search Belgian truffle, mango entremet, bento cakes, cheesecakes..."
                    className="w-full bg-transparent font-sans text-sm text-[#25313A] placeholder-[#6B5E55]/70 outline-none"
                  />
                  <button
                    type="button"
                    onClick={closeDrawer}
                    aria-label="Close search"
                    className="flex h-8 w-8 items-center justify-center rounded-full text-[#6B5E55] hover:bg-[#F5EFEB] hover:text-[#25313A]"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="max-h-[65vh] overflow-y-auto p-5">
                  <div className="mb-4 flex flex-wrap items-center gap-1.5">
                    <span className="mr-1 font-sans text-[10px] font-bold uppercase tracking-wider text-[#6B5E55]">
                      Popular:
                    </span>
                    {['Chocolate', 'Mango', 'Red Velvet', 'Bento', 'Cheesecake', 'Biscoff'].map(
                      (term) => (
                        <button
                          key={term}
                          type="button"
                          onClick={() => setSearchQuery(term)}
                          className="rounded-full border border-[#F5EFEB] bg-[#F5EFEB] px-3 py-1 font-sans text-xs font-medium text-[#25313A] transition-colors hover:border-[#365D60] hover:text-[#365D60]"
                        >
                          {term}
                        </button>
                      )
                    )}
                  </div>

                  {searchResults.length > 0 ? (
                    <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                      {searchResults.map((prod) => (
                        <div
                          key={prod.id}
                          className="flex items-center justify-between gap-3 rounded-2xl border border-[#F5EFEB] bg-[#F5EFEB] p-2.5 transition-all hover:border-[#B6C69F]"
                        >
                          <button
                            type="button"
                            onClick={() => {
                              closeDrawer();
                              navigate(`/cakes/${prod.slug}`);
                            }}
                            className="flex min-w-0 flex-1 items-center gap-3 text-left"
                          >
                            <img
                              src={prod.images[0]?.src}
                              alt={prod.name}
                              className="h-14 w-14 shrink-0 rounded-xl object-cover"
                            />
                            <div className="min-w-0">
                              <p className="truncate font-serif text-base font-bold text-[#25313A]">
                                {prod.name}
                              </p>
                              <p className="font-sans text-xs font-semibold text-[#365D60]">
                                ₹{prod.startingPrice?.amount || 799}
                              </p>
                            </div>
                          </button>
                          <button
                            type="button"
                            onClick={() => quickAddToCart(prod)}
                            className="shrink-0 rounded-full bg-[#365D60] px-3 py-1.5 font-sans text-[11px] font-bold uppercase tracking-wider text-white hover:bg-[#2C4C4F]"
                          >
                            + Add
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-10 text-center">
                      <p className="font-serif text-xl text-[#25313A]">
                        No matching creations found
                      </p>
                      <p className="mt-1 font-sans text-xs text-[#6B5E55]">
                        Try searching for chocolate, berry, cheesecake, or explore our full menu.
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* SLIDE-OVER DRAWER FOR CART, WISHLIST, ACCOUNT */}
            {activeDrawer !== 'search' && (
              <motion.aside
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                role="dialog"
                aria-modal="true"
                aria-label={
                  activeDrawer === 'cart'
                    ? 'Shopping bag and checkout'
                    : activeDrawer === 'wishlist'
                    ? 'Saved wishlist'
                    : 'Customer account and orders'
                }
                className="fixed inset-y-0 right-0 z-[80] flex w-full max-w-full flex-col bg-[#F5EFEB] shadow-2xl sm:max-w-md"
              >
                {/* Drawer Header */}
                <div className="flex items-center justify-between border-b border-[#F5EFEB] bg-[#F5EFEB] px-6 py-4">
                  <div className="flex items-center gap-2.5">
                    {activeDrawer === 'cart' && (
                      <>
                        <ShoppingBag className="h-5 w-5 text-[#365D60]" />
                        <h2 className="font-serif text-xl font-bold text-[#25313A]">
                          {checkoutStep === 'bag'
                            ? `Your Patisserie Bag (${cartCount})`
                            : checkoutStep === 'checkout'
                            ? 'Delivery & Dispatch'
                            : 'Order Request Sent'}
                        </h2>
                      </>
                    )}
                    {activeDrawer === 'wishlist' && (
                      <>
                        <Heart className="h-5 w-5 text-[#365D60]" />
                        <h2 className="font-serif text-xl font-bold text-[#25313A]">
                          Saved Wishlist ({wishlistProducts.length})
                        </h2>
                      </>
                    )}
                    {activeDrawer === 'account' && (
                      <>
                        <User className="h-5 w-5 text-[#365D60]" />
                        <h2 className="font-serif text-xl font-bold text-[#25313A]">
                          My Atelier Account
                        </h2>
                      </>
                    )}
                    {activeDrawer === 'direct-order' && (
                      <>
                        <WhatsAppIcon className="h-5 w-5 fill-[#365D60]" />
                        <h2 className="font-serif text-xl font-bold text-[#25313A]">
                          WhatsApp Delivery Details
                        </h2>
                      </>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={closeDrawer}
                    aria-label="Close panel"
                    className="flex h-9 w-9 items-center justify-center rounded-full text-[#25313A] transition-colors hover:bg-[#F5EFEB]"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* ── 1. CART & CHECKOUT CONTENT ── */}
                {activeDrawer === 'cart' && (
                  <>
                    {checkoutStep === 'confirmed' ? (
                      <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#F5EFEB] text-[#365D60]">
                          <CheckCircle2 className="h-8 w-8" />
                        </div>
                        <span className="mt-4 rounded-full bg-[#F5EFEB] px-3 py-1 font-sans text-[11px] font-bold uppercase tracking-widest text-[#365D60]">
                          Reference {lastOrderId}
                        </span>
                        <h3 className="mt-3 font-serif text-2xl font-bold text-[#25313A]">
                          Sent to Our Pastry Counter
                        </h3>
                        <p className="mt-2 font-sans text-xs leading-relaxed text-[#6B5E55]">
                          Your order summary has opened in WhatsApp for instant slot confirmation
                          and official UPI / payment link from our Bengaluru boutique desk.
                        </p>
                        <div className="mt-6 flex w-full flex-col gap-2.5">
                          <button
                            type="button"
                            onClick={() => {
                              closeDrawer();
                              navigate('/cakes');
                            }}
                            className="btn-primary w-full justify-center"
                          >
                            Continue Browsing
                          </button>
                          <a
                            href={PHONE_TEL}
                            className="btn-secondary w-full justify-center bg-[#F5EFEB]"
                          >
                            Call Counter: {PHONE_DISPLAY}
                          </a>
                        </div>
                      </div>
                    ) : cart.length === 0 ? (
                      <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#F5EFEB] text-[#B6C69F] shadow-xs">
                          <ShoppingBag className="h-7 w-7" />
                        </div>
                        <h3 className="mt-4 font-serif text-2xl font-bold text-[#25313A]">
                          Your bag is empty
                        </h3>
                        <p className="mt-1.5 max-w-xs font-sans text-xs leading-relaxed text-[#6B5E55]">
                          Explore our signature Belgian chocolate gateaux, fresh fruit entremets,
                          and Korean bento cakes.
                        </p>
                        <button
                          type="button"
                          onClick={() => {
                            closeDrawer();
                            navigate('/cakes');
                          }}
                          className="btn-primary mt-6"
                        >
                          <span>Explore Collection</span>
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      </div>
                    ) : checkoutStep === 'bag' ? (
                      <>
                        {/* Bag Items List */}
                        <div className="flex-1 space-y-3 overflow-y-auto p-5">
                          {/* Free delivery progress banner */}
                          <div className="rounded-2xl border border-[#F5EFEB] bg-[#F5EFEB] px-4 py-3 text-xs">
                            {subtotal >= 1200 ? (
                              <p className="font-sans font-semibold text-[#365D60]">
                                ✓ You have unlocked FREE Chilled Delivery across Bengaluru!
                              </p>
                            ) : (
                              <p className="font-sans text-[#25313A]">
                                Add{' '}
                                <strong className="text-[#365D60]">
                                  ₹{(1200 - subtotal).toLocaleString('en-IN')}
                                </strong>{' '}
                                more for <strong>FREE Delivery</strong>
                              </p>
                            )}
                          </div>

                          {cart.map((item) => {
                            const addonsSum = item.addons.reduce((s, a) => s + a.price, 0);
                            return (
                              <div
                                key={item.cartItemId}
                                className="flex gap-3.5 rounded-2xl border border-[#F5EFEB] bg-[#F5EFEB] p-3.5 shadow-2xs"
                              >
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="h-20 w-20 shrink-0 rounded-xl object-cover"
                                />
                                <div className="flex min-w-0 flex-1 flex-col justify-between">
                                  <div>
                                    <div className="flex items-start justify-between gap-2">
                                      <Link
                                        to={`/cakes/${item.slug}`}
                                        onClick={closeDrawer}
                                        className="truncate font-serif text-base font-bold text-[#25313A] hover:text-[#365D60]"
                                      >
                                        {item.name}
                                      </Link>
                                      <button
                                        type="button"
                                        onClick={() => removeFromCart(item.cartItemId)}
                                        aria-label={`Remove ${item.name}`}
                                        className="text-[#6B5E55] hover:text-[#365D60]"
                                      >
                                        <Trash2 className="h-4 w-4" />
                                      </button>
                                    </div>
                                    <p className="font-sans text-[11px] text-[#6B5E55]">
                                      {item.size} • {item.flavor} •{' '}
                                      <span className="font-semibold text-[#365D60]">
                                        {item.isEggless ? '100% Eggless' : 'With Egg'}
                                      </span>
                                    </p>
                                    {item.messageOnCake && (
                                      <p className="mt-0.5 truncate font-sans text-[11px] italic text-[#365D60]">
                                        &ldquo;{item.messageOnCake}&rdquo;
                                      </p>
                                    )}
                                    {item.addons.length > 0 && (
                                      <p className="mt-0.5 font-sans text-[10.5px] text-[#6B5E55]">
                                        + {item.addons.map((a) => a.name).join(', ')}
                                      </p>
                                    )}
                                  </div>

                                  <div className="mt-2.5 flex items-center justify-between">
                                    <div className="inline-flex items-center rounded-full border border-[#F5EFEB] bg-[#F5EFEB]">
                                      <button
                                        type="button"
                                        onClick={() =>
                                          updateQuantity(item.cartItemId, item.quantity - 1)
                                        }
                                        aria-label="Decrease quantity"
                                        className="px-2.5 py-1 text-[#25313A] hover:text-[#365D60]"
                                      >
                                        <Minus className="h-3 w-3" />
                                      </button>
                                      <span className="px-2 font-sans text-xs font-bold text-[#25313A]">
                                        {item.quantity}
                                      </span>
                                      <button
                                        type="button"
                                        onClick={() =>
                                          updateQuantity(item.cartItemId, item.quantity + 1)
                                        }
                                        aria-label="Increase quantity"
                                        className="px-2.5 py-1 text-[#25313A] hover:text-[#365D60]"
                                      >
                                        <Plus className="h-3 w-3" />
                                      </button>
                                    </div>

                                    <span className="font-sans text-sm font-bold text-[#365D60]">
                                      ₹
                                      {((item.unitPrice + addonsSum) * item.quantity).toLocaleString(
                                        'en-IN'
                                      )}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            );
                          })}

                          {/* Coupon Box */}
                          <div className="rounded-2xl border border-[#F5EFEB] bg-[#F5EFEB] p-3.5">
                            <div className="flex items-center gap-2">
                              <Tag className="h-4 w-4 text-[#B6C69F]" />
                              <span className="font-sans text-xs font-semibold text-[#25313A]">
                                Privilege Code (Try SWEET10 or CELEBRATE15)
                              </span>
                            </div>
                            {couponCode ? (
                              <div className="mt-2 flex items-center justify-between rounded-xl bg-[#F5EFEB] px-3 py-2 text-xs">
                                <span className="font-semibold text-[#365D60]">
                                  Applied: {couponCode} (-₹{discount})
                                </span>
                                <button
                                  type="button"
                                  onClick={removeCoupon}
                                  className="font-bold text-[#365D60] hover:underline"
                                >
                                  Remove
                                </button>
                              </div>
                            ) : (
                              <div className="mt-2 flex gap-2">
                                <input
                                  type="text"
                                  value={couponInput}
                                  onChange={(e) => setCouponInput(e.target.value)}
                                  placeholder="Enter code (e.g. SWEET10)"
                                  className="flex-1 rounded-xl border border-[#F5EFEB] bg-[#F5EFEB] px-3 py-2 font-sans text-xs uppercase text-[#25313A] outline-none focus:border-[#365D60]"
                                />
                                <button
                                  type="button"
                                  onClick={() => applyCoupon(couponInput)}
                                  className="rounded-xl bg-[#25313A] px-4 py-2 font-sans text-xs font-bold uppercase tracking-wider text-[#F5EFEB] hover:bg-[#365D60]"
                                >
                                  Apply
                                </button>
                              </div>
                            )}
                            {couponError && (
                              <p className="mt-1.5 font-sans text-[11px] text-[#365D60]">
                                {couponError}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Bag Summary Footer */}
                        <div className="shrink-0 border-t border-[#F5EFEB] bg-[#F5EFEB] p-4 pb-6 sm:p-5">
                          <div className="space-y-1.5 font-sans text-xs text-[#6B5E55]">
                            <div className="flex justify-between">
                              <span>Subtotal</span>
                              <span className="font-semibold text-[#25313A]">
                                ₹{subtotal.toLocaleString('en-IN')}
                              </span>
                            </div>
                            {discount > 0 && (
                              <div className="flex justify-between text-[#365D60]">
                                <span>Privilege Discount ({couponCode})</span>
                                <span>-₹{discount.toLocaleString('en-IN')}</span>
                              </div>
                            )}
                            <div className="flex justify-between">
                              <span>Chilled Van Delivery</span>
                              <span>
                                {deliveryCharge === 0 ? (
                                  <strong className="text-[#365D60]">FREE</strong>
                                ) : (
                                  `₹${deliveryCharge}`
                                )}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span>Taxes (5% GST)</span>
                              <span>₹{taxAmount.toLocaleString('en-IN')}</span>
                            </div>
                            <div className="flex justify-between border-t border-[#F5EFEB] pt-2 text-base font-bold text-[#25313A]">
                              <span>Total</span>
                              <span className="text-[#365D60]">
                                ₹{grandTotal.toLocaleString('en-IN')}
                              </span>
                            </div>
                          </div>

                          <div className="mt-3.5">
                            <button
                              type="button"
                              onClick={() => setCheckoutStep('checkout')}
                              className="flex h-12 w-full items-center justify-center gap-2.5 rounded-full bg-[#365D60] px-5 font-sans text-xs font-bold uppercase tracking-wider text-[#F5EFEB] shadow-md transition-all hover:bg-[#2C4C4F] active:scale-[0.99] sm:text-[13px]"
                            >
                              <WhatsAppIcon className="h-4.5 w-4.5 shrink-0 fill-[#F5EFEB]" />
                              <span className="truncate">
                                Order on WhatsApp • ₹{grandTotal.toLocaleString('en-IN')}
                              </span>
                            </button>
                            <p className="mt-2 text-center font-sans text-[11px] text-[#6B5E55]">
                              Step 1 of 2: Confirm delivery address &amp; dispatch slot
                            </p>
                          </div>
                        </div>
                      </>
                    ) : (
                      /* Step 2: Delivery Address & Slot Form */
                      <form
                        onSubmit={handleCheckoutSubmit}
                        className="flex flex-1 flex-col justify-between overflow-y-auto"
                      >
                        <div className="space-y-4 p-5">
                          <button
                            type="button"
                            onClick={() => setCheckoutStep('bag')}
                            className="font-sans text-xs font-semibold text-[#365D60] hover:underline"
                          >
                            ← Back to Bag Summary
                          </button>

                          <div>
                            <label className="field-label">Recipient Full Name *</label>
                            <input
                              type="text"
                              required
                              value={recipientName}
                              onChange={(e) => setRecipientName(e.target.value)}
                              placeholder="e.g. Ananya Sharma"
                              className="field-input"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="field-label">10-Digit Mobile *</label>
                              <input
                                type="tel"
                                required
                                value={recipientPhone}
                                onChange={(e) => setRecipientPhone(e.target.value)}
                                placeholder="98860XXXXX"
                                className="field-input"
                              />
                            </div>
                            <div>
                              <label className="field-label">Bengaluru Pincode *</label>
                              <input
                                type="text"
                                required
                                maxLength={6}
                                value={pincode}
                                onChange={(e) => setPincode(e.target.value)}
                                placeholder="560005"
                                className="field-input"
                              />
                            </div>
                          </div>

                          {pincodeStatus.valid && (
                            <div
                              className={`rounded-xl px-3.5 py-2.5 font-sans text-xs ${
                                pincodeStatus.serviceable
                                  ? 'bg-[#F5EFEB] text-[#365D60]'
                                  : 'bg-[#C64C3D]/10 text-[#C64C3D]'
                              }`}
                            >
                              {pincodeStatus.serviceable ? (
                                <>
                                  <strong>✓ {pincodeStatus.area}:</strong> {pincodeStatus.eta}
                                </>
                              ) : (
                                pincodeStatus.eta
                              )}
                            </div>
                          )}

                          <div>
                            <label className="field-label">Flat / House No., Street & Landmark *</label>
                            <input
                              type="text"
                              required
                              value={addressLine}
                              onChange={(e) => setAddressLine(e.target.value)}
                              placeholder="Apartment name, floor, street..."
                              className="field-input"
                            />
                          </div>

                          <div>
                            <label className="field-label">Neighbourhood / Area</label>
                            <input
                              type="text"
                              value={areaName}
                              onChange={(e) => setAreaName(e.target.value)}
                              placeholder="Frazer Town / Malleshwaram / Indiranagar..."
                              className="field-input"
                            />
                          </div>

                          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                            <div>
                              <label className="field-label">Delivery Date *</label>
                              <input
                                type="date"
                                required
                                min={new Date().toISOString().split('T')[0]}
                                value={deliveryDate}
                                onChange={(e) => setDeliveryDate(e.target.value)}
                                className="field-input"
                              />
                            </div>
                            <div>
                              <label className="field-label">Preferred Slot *</label>
                              <select
                                value={deliverySlot}
                                onChange={(e) => setDeliverySlot(e.target.value)}
                                className="field-input"
                              >
                                {DELIVERY_SLOTS.map((s) => (
                                  <option key={s} value={s}>
                                    {s}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>

                          {checkoutError && (
                            <p
                              role="alert"
                              className="rounded-xl bg-[#C64C3D]/15 px-3.5 py-2.5 font-sans text-xs font-semibold text-[#C64C3D]"
                            >
                              {checkoutError}
                            </p>
                          )}
                        </div>

                        <div className="shrink-0 border-t border-[#F5EFEB] bg-[#F5EFEB] p-4 pb-6 sm:p-5">
                          <div className="mb-3 flex items-center justify-between font-sans text-sm font-bold text-[#25313A]">
                            <span>Total Payable ({cartCount} {cartCount === 1 ? 'item' : 'items'})</span>
                            <span className="text-lg text-[#365D60]">
                              ₹{grandTotal.toLocaleString('en-IN')}
                            </span>
                          </div>
                          <button
                            type="submit"
                            className="flex h-12 w-full items-center justify-center gap-2.5 rounded-full bg-[#365D60] px-5 font-sans text-xs font-bold uppercase tracking-wider text-[#F5EFEB] shadow-md transition-all hover:bg-[#2C4C4F] active:scale-[0.99] sm:text-[13px]"
                          >
                            <WhatsAppIcon className="h-4.5 w-4.5 shrink-0 fill-[#F5EFEB]" />
                            <span>Confirm Slot &amp; Request Payment Link</span>
                          </button>
                          <p className="mt-2 text-center font-sans text-[10.5px] text-[#6B5E55]">
                            Orders are verified directly with our nearest Bengaluru kitchen before
                            sharing your official UPI / card payment link.
                          </p>
                        </div>
                      </form>
                    )}
                  </>
                )}

                {/* ── 1B. DIRECT SINGLE-CAKE WHATSAPP ORDER & DELIVERY DETAILS ── */}
                {activeDrawer === 'direct-order' && directOrderItem && (() => {
                  const fullProd = getProductBySlug(directOrderItem.slug);
                  const basePrice =
                    fullProd?.startingPrice?.amount ||
                    fullProd?.price?.amount ||
                    directOrderItem.unitPrice;
                  const addonsSum = directOrderItem.addons.reduce((s, a) => s + a.price, 0);
                  const itemSubtotal =
                    (directOrderItem.unitPrice + addonsSum) * directOrderItem.quantity;
                  const itemDelivery = itemSubtotal >= 1200 ? 0 : 79;
                  const itemTax = Math.round(itemSubtotal * 0.05);
                  const itemGrandTotal = itemSubtotal + itemDelivery + itemTax;

                  return (
                    <form
                      onSubmit={handleDirectOrderSubmit}
                      className="flex flex-1 flex-col justify-between overflow-y-auto"
                    >
                      <div className="space-y-4 p-5">
                        {/* Selected Cake Summary Card */}
                        <div className="flex gap-3.5 rounded-2xl border border-[#F5EFEB] bg-[#F5EFEB] p-3.5 shadow-2xs">
                          <img
                            src={directOrderItem.image}
                            alt={directOrderItem.name}
                            className="h-20 w-20 shrink-0 rounded-xl object-cover"
                          />
                          <div className="min-w-0 flex-1">
                            <p className="truncate font-serif text-lg font-bold text-[#25313A]">
                              {directOrderItem.name}
                            </p>
                            <p className="font-sans text-xs text-[#6B5E55]">
                              {directOrderItem.flavor} •{' '}
                              <span
                                className={
                                  directOrderItem.isEggless
                                    ? 'font-semibold text-[#15803D]'
                                    : 'font-semibold text-[#9A3412]'
                                }
                              >
                                {directOrderItem.isEggless ? '100% Eggless' : 'Contains Egg'}
                              </span>
                            </p>
                            <div className="mt-2 flex items-center justify-between">
                              <div className="inline-flex items-center rounded-full border border-[#F5EFEB] bg-[#F5EFEB]">
                                <button
                                  type="button"
                                  onClick={() =>
                                    updateDirectOrderItem({
                                      quantity: Math.max(1, directOrderItem.quantity - 1),
                                    })
                                  }
                                  className="px-2.5 py-0.5 text-[#25313A] hover:text-[#365D60]"
                                >
                                  <Minus className="h-3 w-3" />
                                </button>
                                <span className="px-2 font-sans text-xs font-bold text-[#25313A]">
                                  {directOrderItem.quantity}
                                </span>
                                <button
                                  type="button"
                                  onClick={() =>
                                    updateDirectOrderItem({
                                      quantity: directOrderItem.quantity + 1,
                                    })
                                  }
                                  className="px-2.5 py-0.5 text-[#25313A] hover:text-[#365D60]"
                                >
                                  <Plus className="h-3 w-3" />
                                </button>
                              </div>
                              <span className="font-sans text-base font-bold text-[#365D60]">
                                ₹{itemSubtotal.toLocaleString('en-IN')}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Quick Weight Selector & Cake Message */}
                        {fullProd?.sizes && fullProd.sizes.length > 1 && (
                          <div>
                            <label className="field-label">Select Weight / Size</label>
                            <div className="flex flex-wrap gap-1.5">
                              {fullProd.sizes.map((sz) => {
                                const active = directOrderItem.size === sz;
                                return (
                                  <button
                                    key={sz}
                                    type="button"
                                    onClick={() =>
                                      updateDirectOrderItem({
                                        size: sz,
                                        unitPrice: calculateWeightPrice(basePrice, sz),
                                      })
                                    }
                                    className={`rounded-full border px-3 py-1 font-sans text-xs font-semibold transition-all ${
                                      active
                                        ? 'border-[#365D60] bg-[#365D60] text-[#F5EFEB]'
                                        : 'border-[#F5EFEB] bg-[#F5EFEB] text-[#25313A] hover:border-[#365D60]'
                                    }`}
                                  >
                                    {sz}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        <div>
                          <label className="field-label">
                            Message on Cake Plaque (Optional, max 35 chars)
                          </label>
                          <input
                            type="text"
                            maxLength={35}
                            value={directOrderItem.messageOnCake}
                            onChange={(e) =>
                              updateDirectOrderItem({ messageOnCake: e.target.value })
                            }
                            placeholder="e.g. Happy Birthday Ananya!"
                            className="field-input"
                          />
                        </div>

                        <div className="border-t border-[#F5EFEB] pt-3">
                          <p className="mb-3 font-sans text-xs font-bold uppercase tracking-wider text-[#365D60]">
                            Required Delivery Details
                          </p>

                          <div className="space-y-3.5">
                            <div>
                              <label className="field-label">Recipient Full Name *</label>
                              <input
                                type="text"
                                required
                                value={recipientName}
                                onChange={(e) => setRecipientName(e.target.value)}
                                placeholder="e.g. Ananya Sharma"
                                className="field-input"
                              />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className="field-label">10-Digit Mobile *</label>
                                <input
                                  type="tel"
                                  required
                                  value={recipientPhone}
                                  onChange={(e) => setRecipientPhone(e.target.value)}
                                  placeholder="98860XXXXX"
                                  className="field-input"
                                />
                              </div>
                              <div>
                                <label className="field-label">Bengaluru Pincode *</label>
                                <input
                                  type="text"
                                  required
                                  maxLength={6}
                                  value={pincode}
                                  onChange={(e) => setPincode(e.target.value)}
                                  placeholder="560005"
                                  className="field-input"
                                />
                              </div>
                            </div>

                            {pincodeStatus.valid && (
                              <div
                                className={`rounded-xl px-3.5 py-2 font-sans text-xs ${
                                  pincodeStatus.serviceable
                                    ? 'bg-[#F5EFEB] text-[#365D60]'
                                    : 'bg-[#C64C3D]/10 text-[#C64C3D]'
                                }`}
                              >
                                {pincodeStatus.serviceable ? (
                                  <>
                                    <strong>✓ {pincodeStatus.area}:</strong> {pincodeStatus.eta}
                                  </>
                                ) : (
                                  pincodeStatus.eta
                                )}
                              </div>
                            )}

                            <div>
                              <label className="field-label">
                                Flat / House No., Street &amp; Landmark *
                              </label>
                              <input
                                type="text"
                                required
                                value={addressLine}
                                onChange={(e) => setAddressLine(e.target.value)}
                                placeholder="Apartment name, floor, street..."
                                className="field-input"
                              />
                            </div>

                            <div>
                              <label className="field-label">Neighbourhood / Area *</label>
                              <input
                                type="text"
                                required
                                value={areaName}
                                onChange={(e) => setAreaName(e.target.value)}
                                placeholder="Frazer Town / Malleshwaram / Indiranagar..."
                                className="field-input"
                              />
                            </div>

                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                              <div>
                                <label className="field-label">Delivery Date *</label>
                                <input
                                  type="date"
                                  required
                                  min={new Date().toISOString().split('T')[0]}
                                  value={deliveryDate}
                                  onChange={(e) => setDeliveryDate(e.target.value)}
                                  className="field-input"
                                />
                              </div>
                              <div>
                                <label className="field-label">Preferred Slot *</label>
                                <select
                                  value={deliverySlot}
                                  onChange={(e) => setDeliverySlot(e.target.value)}
                                  className="field-input"
                                >
                                  {DELIVERY_SLOTS.map((s) => (
                                    <option key={s} value={s}>
                                      {s}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>

                        {checkoutError && (
                          <p
                            role="alert"
                            className="rounded-xl bg-[#C64C3D]/15 px-3.5 py-2.5 font-sans text-xs font-semibold text-[#C64C3D]"
                          >
                            {checkoutError}
                          </p>
                        )}
                      </div>

                      <div className="shrink-0 border-t border-[#F5EFEB] bg-[#F5EFEB] p-4 pb-6 sm:p-5">
                        <div className="mb-3 space-y-1 font-sans text-xs text-[#6B5E55]">
                          <div className="flex justify-between">
                            <span>Cake Subtotal ({directOrderItem.size})</span>
                            <span>₹{itemSubtotal}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Chilled Delivery &amp; 5% GST</span>
                            <span>
                              {itemDelivery === 0 ? 'FREE' : `₹${itemDelivery}`} + ₹{itemTax}
                            </span>
                          </div>
                          <div className="flex justify-between border-t border-[#F5EFEB] pt-1.5 text-sm font-bold text-[#25313A]">
                            <span>Total Payable</span>
                            <span className="text-base text-[#365D60]">
                              ₹{itemGrandTotal.toLocaleString('en-IN')}
                            </span>
                          </div>
                        </div>

                        <button
                          type="submit"
                          className="flex h-12 w-full items-center justify-center gap-2.5 rounded-full bg-[#365D60] px-5 font-sans text-xs font-bold uppercase tracking-wider text-[#F5EFEB] shadow-md transition-all hover:bg-[#2C4C4F] active:scale-[0.99] sm:text-[13px]"
                        >
                          <WhatsAppIcon className="h-4.5 w-4.5 shrink-0 fill-[#F5EFEB]" />
                          <span>Send Complete Order on WhatsApp</span>
                        </button>
                      </div>
                    </form>
                  );
                })()}

                {/* ── 2. WISHLIST CONTENT ── */}
                {activeDrawer === 'wishlist' && (
                  <div className="flex-1 overflow-y-auto p-5">
                    {wishlistProducts.length === 0 ? (
                      <div className="flex h-full flex-col items-center justify-center text-center">
                        <Heart className="h-10 w-10 text-[#B6C69F]" />
                        <h3 className="mt-3 font-serif text-2xl font-bold text-[#25313A]">
                          No saved cakes yet
                        </h3>
                        <p className="mt-1 max-w-xs font-sans text-xs text-[#6B5E55]">
                          Tap the heart icon on any cake to save your favourites for upcoming
                          birthdays and anniversaries.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {wishlistProducts.map((prod) => (
                          <div
                            key={prod.id}
                            className="flex items-center justify-between gap-3 rounded-2xl border border-[#F5EFEB] bg-[#F5EFEB] p-3"
                          >
                            <Link
                              to={`/cakes/${prod.slug}`}
                              onClick={closeDrawer}
                              className="flex min-w-0 flex-1 items-center gap-3"
                            >
                              <img
                                src={prod.images[0]?.src}
                                alt={prod.name}
                                className="h-16 w-16 shrink-0 rounded-xl object-cover"
                              />
                              <div className="min-w-0">
                                <p className="truncate font-serif text-base font-bold text-[#25313A]">
                                  {prod.name}
                                </p>
                                <p className="font-sans text-xs font-bold text-[#365D60]">
                                  ₹{prod.startingPrice?.amount || 799}
                                </p>
                              </div>
                            </Link>
                            <div className="flex items-center gap-1.5">
                              <button
                                type="button"
                                onClick={() => {
                                  quickAddToCart(prod);
                                  openDrawer('cart');
                                }}
                                className="rounded-full bg-[#365D60] px-3 py-1.5 font-sans text-[11px] font-bold uppercase text-[#F5EFEB] hover:bg-[#2C4C4F]"
                              >
                                + Bag
                              </button>
                              <button
                                type="button"
                                onClick={() => toggleWishlist(prod.id)}
                                aria-label="Remove from wishlist"
                                className="p-1.5 text-[#6B5E55] hover:text-[#C64C3D]"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* ── 3. CUSTOMER ACCOUNT & ORDER HISTORY ── */}
                {activeDrawer === 'account' && (
                  <div className="flex-1 space-y-6 overflow-y-auto p-5">
                    {/* Profile Card */}
                    <div className="rounded-2xl border border-[#F5EFEB] bg-[#F5EFEB] p-4">
                      <h3 className="font-serif text-lg font-bold text-[#25313A]">
                        Customer Profile
                      </h3>
                      <div className="mt-3 space-y-2.5">
                        <input
                          type="text"
                          value={profile.name}
                          onChange={(e) => updateProfile({ name: e.target.value })}
                          placeholder="Your Full Name"
                          className="field-input py-2 text-xs"
                        />
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="tel"
                            value={profile.phone}
                            onChange={(e) => updateProfile({ phone: e.target.value })}
                            placeholder="Phone Number"
                            className="field-input py-2 text-xs"
                          />
                          <input
                            type="email"
                            value={profile.email}
                            onChange={(e) => updateProfile({ email: e.target.value })}
                            placeholder="Email Address"
                            className="field-input py-2 text-xs"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Order History */}
                    <div className="rounded-2xl border border-[#F5EFEB] bg-[#F5EFEB] p-4">
                      <div className="flex items-center gap-2">
                        <Package className="h-4 w-4 text-[#365D60]" />
                        <h3 className="font-serif text-lg font-bold text-[#25313A]">
                          Recent Orders & Enquiries ({orders.length})
                        </h3>
                      </div>
                      {orders.length === 0 ? (
                        <p className="mt-2 font-sans text-xs text-[#6B5E55]">
                          Your placed orders and custom cake enquiries on this device will appear
                          here.
                        </p>
                      ) : (
                        <div className="mt-3 space-y-2.5">
                          {orders.map((ord) => (
                            <div
                              key={ord.orderId}
                              className="rounded-xl border border-[#F5EFEB] bg-[#F5EFEB] p-3 text-xs"
                            >
                              <div className="flex items-center justify-between font-bold text-[#25313A]">
                                <span>{ord.orderId}</span>
                                <span className="text-[#365D60]">₹{ord.total}</span>
                              </div>
                              <p className="mt-0.5 text-[11px] text-[#6B5E55]">
                                {ord.deliveryDate} • {ord.deliverySlot}
                              </p>
                              <p className="mt-1 font-medium text-[#365D60]">
                                Status: {ord.status}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Saved Addresses */}
                    <div className="rounded-2xl border border-[#F5EFEB] bg-[#F5EFEB] p-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-[#365D60]" />
                        <h3 className="font-serif text-lg font-bold text-[#25313A]">
                          Saved Bengaluru Addresses
                        </h3>
                      </div>
                      <div className="mt-3 space-y-2">
                        {profile.addresses.map((addr) => (
                          <div
                            key={addr.id}
                            className="flex items-center justify-between rounded-xl border border-[#F5EFEB] bg-[#F5EFEB] px-3 py-2 text-xs"
                          >
                            <div>
                              <span className="font-bold text-[#25313A]">{addr.label}: </span>
                              <span className="text-[#6B5E55]">
                                {addr.line1 || addr.area} ({addr.pincode})
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeAddress(addr.id)}
                              className="text-[#365D60] hover:underline"
                            >
                              Delete
                            </button>
                          </div>
                        ))}
                      </div>

                      <div className="mt-3 grid grid-cols-3 gap-2">
                        <input
                          type="text"
                          value={newAddrLabel}
                          onChange={(e) => setNewAddrLabel(e.target.value)}
                          placeholder="Label"
                          className="rounded-lg border border-[#F5EFEB] bg-[#F5EFEB] px-2.5 py-1.5 text-xs text-[#25313A]"
                        />
                        <input
                          type="text"
                          value={newAddrLine}
                          onChange={(e) => setNewAddrLine(e.target.value)}
                          placeholder="Area / Street"
                          className="rounded-lg border border-[#F5EFEB] bg-[#F5EFEB] px-2.5 py-1.5 text-xs text-[#25313A]"
                        />
                        <input
                          type="text"
                          maxLength={6}
                          value={newAddrPincode}
                          onChange={(e) => setNewAddrPincode(e.target.value)}
                          placeholder="560001"
                          className="rounded-lg border border-[#F5EFEB] bg-[#F5EFEB] px-2.5 py-1.5 text-xs text-[#25313A]"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          if (!newAddrLine.trim()) return;
                          addAddress({
                            label: newAddrLabel || 'Address',
                            recipientName: profile.name,
                            phone: profile.phone,
                            line1: newAddrLine,
                            area: newAddrLine,
                            pincode: newAddrPincode,
                          });
                          setNewAddrLine('');
                        }}
                        className="mt-2 w-full rounded-xl border border-[#365D60] bg-[#F5EFEB] py-1.5 font-sans text-xs font-bold text-[#365D60] hover:bg-[#365D60] hover:text-[#F5EFEB]"
                      >
                        + Save Address
                      </button>
                    </div>

                    {/* Cancellation & Refund Policy Note */}
                    <div className="rounded-2xl border border-[#F5EFEB] bg-[#F5EFEB] p-4 font-sans text-xs text-[#6B5E55]">
                      <div className="flex items-center gap-1.5 font-bold text-[#25313A]">
                        <Clock className="h-3.5 w-3.5 text-[#B6C69F]" />
                        <span>Cancellation & Freshness Guarantee</span>
                      </div>
                      <p className="mt-1 leading-relaxed">
                        Standard cakes can be rescheduled or cancelled up to 6 hours prior to your
                        delivery slot. Bespoke tiered cakes require 24 hours notice.
                      </p>
                    </div>
                  </div>
                )}
              </motion.aside>
            )}
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default StorefrontDrawers;
