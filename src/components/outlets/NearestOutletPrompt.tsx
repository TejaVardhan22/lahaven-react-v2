import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Navigation, Clock, X, ChevronRight, Sparkles } from 'lucide-react';
import { useStorefront } from '@/context/StorefrontContext';

const PROMPT_SESSION_KEY = 'lahaven_outlet_prompt_dismissed_session';

export const NearestOutletPrompt: React.FC = () => {
  const {
    nearestOutlet,
    outletDistanceKm,
    outletDriveMinutes,
    directionsUrl,
    setIsOutletModalOpen,
  } = useStorefront();

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if dismissed in this session
    try {
      const dismissed = sessionStorage.getItem(PROMPT_SESSION_KEY);
      if (!dismissed) {
        // Delay slightly for a natural, elegant entrance after page load
        const timer = setTimeout(() => {
          setIsVisible(true);
        }, 1200);
        return () => clearTimeout(timer);
      }
    } catch {
      // ignore
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    try {
      sessionStorage.setItem(PROMPT_SESSION_KEY, 'true');
    } catch {
      // ignore
    }
  };

  const handleOpenModal = () => {
    handleDismiss();
    setIsOutletModalOpen(true);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.aside
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 25, scale: 0.95 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        aria-label="Your Nearest La Haven Boutique"
        className="fixed bottom-5 right-4 sm:right-6 z-[90] w-[calc(100%-2rem)] sm:w-[390px] rounded-2xl border border-[#E6DFD5] bg-[#FAF7F2]/95 backdrop-blur-md p-4 sm:p-5 shadow-[0_12px_40px_rgba(37,49,58,0.12)] text-[#30251F] font-sans"
      >
        {/* Top Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#245650] text-[#FAF7F2] shadow-2xs">
              <MapPin className="h-3.5 w-3.5" />
            </span>
            <div>
              <span className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-[#245650] block">
                Your Nearest Boutique
              </span>
              <h3 className="font-serif text-lg font-normal text-[#30251F] leading-tight">
                {nearestOutlet.name.replace('LaHaven', 'La Heaven')}
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={handleDismiss}
            aria-label="Dismiss boutique notification"
            className="rounded-full p-1 text-[#30251F]/40 hover:bg-[#E6DFD5]/60 hover:text-[#30251F] transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Address & Live Details */}
        <div className="mt-3 space-y-1.5 text-xs text-[#30251F]/75">
          <p className="line-clamp-2 leading-relaxed">{nearestOutlet.address}</p>
          <div className="flex items-center gap-3 pt-0.5 text-[11px] font-medium text-[#245650]">
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              Open today: 9:00 AM – 10:00 PM
            </span>
            {outletDistanceKm !== null && (
              <span>• {outletDistanceKm} km road route {outletDriveMinutes ? `(~${outletDriveMinutes} mins)` : ''}</span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 flex items-center gap-2 pt-1 border-t border-[#E6DFD5]/70">
          <a
            href={directionsUrl || nearestOutlet.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#245650] px-3.5 py-2 text-xs font-semibold text-[#FAF7F2] shadow-xs hover:bg-[#1D4641] transition-all"
          >
            <Navigation className="h-3.5 w-3.5" />
            <span>Turn-by-Turn Directions</span>
          </a>

          <button
            type="button"
            onClick={handleOpenModal}
            className="inline-flex items-center justify-center gap-1 rounded-xl border border-[#E6DFD5] bg-[#FFFFFF] px-3 py-2 text-xs font-semibold text-[#30251F] hover:border-[#245650] transition-colors"
          >
            <span>Change</span>
            <ChevronRight className="h-3.5 w-3.5 text-[#30251F]/60" />
          </button>
        </div>
      </motion.aside>
    </AnimatePresence>
  );
};

export default NearestOutletPrompt;
