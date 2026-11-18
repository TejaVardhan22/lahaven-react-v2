import React, { Suspense } from 'react';
import { useLocation, useOutlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/navigation/Header';
import Footer from '@/components/navigation/Footer';
import StorefrontDrawers from '@/components/storefront/StorefrontDrawers';
import { NearestOutletPrompt } from '@/components/outlets/NearestOutletPrompt';
import { NearestOutletModal } from '@/components/outlets/NearestOutletModal';

function RouteProgressIndicator() {
  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-[120] h-[3px] w-full overflow-hidden bg-transparent"
      role="progressbar"
      aria-label="Loading page"
    >
      <div className="h-full w-full bg-gradient-to-r from-[#365D60] via-[#B6C69F] to-[#365D60] animate-route-progress" />
    </div>
  );
}

const pageTransitionVariants = {
  initial: {
    opacity: 0,
    y: 8,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.28,
      ease: [0.22, 1, 0.36, 1], // easeOutCubic
    },
  },
  exit: {
    opacity: 0,
    y: -6,
    transition: {
      duration: 0.18,
      ease: [0.36, 0, 0.66, -0.56], // easeInCubic
    },
  },
};

export default function Layout() {
  const location = useLocation();
  const outlet = useOutlet();

  return (
    <div className="flex min-h-screen flex-col bg-[#F5EFEB]">
      <Header />
      <main id="main-content" className="flex-grow min-h-[75vh] relative">
        <Suspense fallback={<RouteProgressIndicator />}>
          <AnimatePresence
            mode="wait"
            initial={false}
            onExitComplete={() => {
              window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
            }}
          >
            <motion.div
              key={location.pathname}
              variants={pageTransitionVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full"
            >
              {outlet}
            </motion.div>
          </AnimatePresence>
        </Suspense>
      </main>
      <Footer />
      <StorefrontDrawers />
      <NearestOutletPrompt />
      <NearestOutletModal />
    </div>
  );
}
