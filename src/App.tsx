import React, { Suspense, lazy, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { StorefrontProvider } from '@/context/StorefrontContext';
import { ScrollTrigger } from '@/utils/gsap';

const Home = lazy(() => import('@/pages/Home'));
const Cakes = lazy(() => import('@/pages/Cakes'));
const CakeDetail = lazy(() => import('@/pages/CakeDetail'));
const BentoCakes = lazy(() => import('@/pages/BentoCakes'));
const CustomCakes = lazy(() => import('@/pages/CustomCakes'));
const Desserts = lazy(() => import('@/pages/Desserts'));
const About = lazy(() => import('@/pages/About'));
const Outlets = lazy(() => import('@/pages/Outlets'));
const Contact = lazy(() => import('@/pages/Contact'));
const Franchise = lazy(() => import('@/pages/Franchise'));

/**
 * Preload lazy routes in the background during browser idle time
 * so that navigation feels instantaneous with zero layout flash.
 */
const lazyRouteLoaders = [
  () => import('@/pages/Home'),
  () => import('@/pages/Cakes'),
  () => import('@/pages/CustomCakes'),
  () => import('@/pages/About'),
  () => import('@/pages/Outlets'),
  () => import('@/pages/Contact'),
  () => import('@/pages/Franchise'),
  () => import('@/pages/BentoCakes'),
  () => import('@/pages/Desserts'),
];

function RoutePreloader() {
  useEffect(() => {
    const preload = () => {
      lazyRouteLoaders.forEach((loader) => {
        try {
          loader();
        } catch {
          // ignore prefetch errors
        }
      });
    };

    if (typeof window !== 'undefined') {
      if ('requestIdleCallback' in window) {
        (window as unknown as { requestIdleCallback: (cb: () => void) => void }).requestIdleCallback(preload);
      } else {
        const timer = setTimeout(preload, 1200);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  return null;
}

function RouteWatcher() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Recalibrate GSAP ScrollTriggers smoothly after page transition completes
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 320);
    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}

function InitialLoadingBar() {
  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-[120] h-[3px] w-full overflow-hidden bg-transparent"
      role="progressbar"
      aria-label="Loading application"
    >
      <div className="h-full w-full bg-gradient-to-r from-[#365D60] via-[#B6C69F] to-[#365D60] animate-route-progress" />
    </div>
  );
}

function App() {
  return (
    <StorefrontProvider>
      <RouteWatcher />
      <RoutePreloader />
      <Suspense fallback={<InitialLoadingBar />}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/cakes" element={<Cakes />} />
            <Route path="/cakes/:slug" element={<CakeDetail />} />
            {/* Singular & plural aliases for cake detail */}
            <Route path="/cake/:slug" element={<CakeDetail />} />
            <Route path="/cake" element={<Navigate to="/cakes" replace />} />
            <Route path="/bento-cakes" element={<BentoCakes />} />
            <Route path="/bento-cake" element={<Navigate to="/bento-cakes" replace />} />
            <Route path="/bento" element={<Navigate to="/bento-cakes" replace />} />
            <Route path="/custom-cakes" element={<CustomCakes />} />
            <Route path="/custom-cake" element={<Navigate to="/custom-cakes" replace />} />
            <Route path="/custom" element={<Navigate to="/custom-cakes" replace />} />
            <Route path="/customcakes" element={<Navigate to="/custom-cakes" replace />} />
            <Route path="/desserts" element={<Desserts />} />
            <Route path="/dessert" element={<Navigate to="/desserts" replace />} />
            <Route path="/our-story" element={<About />} />
            <Route path="/about" element={<Navigate to="/our-story" replace />} />
            <Route path="/outlets" element={<Outlets />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/franchise" element={<Franchise />} />
            {/* Catch-all fallback so unmatched routes never render a blank screen */}
            <Route path="*" element={<Navigate to="/cakes" replace />} />
          </Route>
        </Routes>
      </Suspense>
    </StorefrontProvider>
  );
}

export default App;
