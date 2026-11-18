import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  MapPin,
  Phone,
  Navigation,
  Clock,
  Check,
  Search,
  Sparkles,
  Loader2,
} from 'lucide-react';
import { outlets } from '@/data/outlets';
import { useStorefront } from '@/context/StorefrontContext';
import {
  OUTLET_COORDINATES,
  calculateDistanceKm,
  estimateRoadDistanceKm,
  getDirectionsUrl,
  findNearestOutletByPincode,
} from '@/utils/outletLocator';

export const NearestOutletModal: React.FC = () => {
  const {
    isOutletModalOpen,
    setIsOutletModalOpen,
    nearestOutlet,
    selectOutlet,
    outletDistanceKm,
    userCoordinates,
    detectUserLocation,
    isLocatingOutlet,
  } = useStorefront();

  const [searchQuery, setSearchQuery] = useState('');

  // Sort outlets by distance if coordinates are available, otherwise list all 5
  const sortedOutlets = useMemo(() => {
    const list = outlets.map((outlet) => {
      const geo = OUTLET_COORDINATES[outlet.id];
      let dist: number | null = null;
      if (userCoordinates && geo) {
        dist = estimateRoadDistanceKm(
          calculateDistanceKm(userCoordinates.lat, userCoordinates.lng, geo.lat, geo.lng)
        );
      } else if (outlet.id === nearestOutlet.id && outletDistanceKm !== null) {
        dist = outletDistanceKm;
      }

      return {
        ...outlet,
        distance: dist,
        directions: getDirectionsUrl(outlet, userCoordinates),
      };
    });

    if (userCoordinates) {
      list.sort((a, b) => (a.distance ?? 999) - (b.distance ?? 999));
    }

    if (!searchQuery.trim()) return list;

    const query = searchQuery.toLowerCase().trim();
    return list.filter(
      (o) =>
        o.area.toLowerCase().includes(query) ||
        o.name.toLowerCase().includes(query) ||
        o.address.toLowerCase().includes(query) ||
        OUTLET_COORDINATES[o.id]?.pincodes.some((pin) => pin.includes(query))
    );
  }, [nearestOutlet, outletDistanceKm, userCoordinates, searchQuery]);

  if (!isOutletModalOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOutletModalOpen(false)}
          className="fixed inset-0 bg-[#25313A]/60 backdrop-blur-xs"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-xl rounded-2xl bg-[#FAF7F2] p-5 sm:p-7 shadow-2xl border border-[#E6DFD5] text-[#30251F] font-sans z-10 max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#E6DFD5]">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#245650]">
                <MapPin className="h-4 w-4" />
                <span>Boutique Locator</span>
              </div>
              <h2 className="mt-1 font-serif text-2xl sm:text-3xl font-normal text-[#30251F]">
                Find Your Nearest Boutique
              </h2>
              <p className="mt-1 text-xs text-[#30251F]/70">
                5 physical boutiques in Bengaluru for fresh morning pickups and express orders.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsOutletModalOpen(false)}
              aria-label="Close modal"
              className="rounded-full p-2 text-[#30251F]/60 hover:bg-[#E6DFD5]/50 hover:text-[#30251F] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#245650]"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Search & GPS Actions */}
          <div className="pt-4 pb-3 space-y-2.5">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#30251F]/40" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by area or 6-digit PIN (e.g. 560005)"
                  className="w-full rounded-xl border border-[#E6DFD5] bg-[#FFFFFF] pl-10 pr-3.5 py-2.5 text-xs text-[#30251F] placeholder-[#30251F]/40 outline-none focus:border-[#245650] focus:ring-1 focus:ring-[#245650]"
                />
              </div>

              <button
                type="button"
                onClick={detectUserLocation}
                disabled={isLocatingOutlet}
                className="inline-flex items-center gap-1.5 rounded-xl border border-[#245650] bg-[#245650]/8 px-3.5 py-2.5 text-xs font-semibold text-[#245650] hover:bg-[#245650]/15 transition-colors disabled:opacity-60 shrink-0"
              >
                {isLocatingOutlet ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    <span className="hidden sm:inline">Locating…</span>
                  </>
                ) : (
                  <>
                    <Navigation className="h-3.5 w-3.5" />
                    <span>Auto-Detect</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* List of 5 Boutiques */}
          <div className="overflow-y-auto space-y-3 pr-1 flex-1 py-1">
            {sortedOutlets.map((outlet) => {
              const isSelected = outlet.id === nearestOutlet.id;
              return (
                <div
                  key={outlet.id}
                  className={`group relative rounded-xl border p-4 transition-all ${
                    isSelected
                      ? 'border-[#245650] bg-[#FFFFFF] shadow-sm ring-1 ring-[#245650]'
                      : 'border-[#E6DFD5] bg-[#FFFFFF]/70 hover:border-[#245650]/50 hover:bg-[#FFFFFF]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-serif text-lg font-normal text-[#30251F]">
                          {outlet.name.replace('LaHaven', 'La Heaven')}
                        </h3>
                        {isSelected && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-[#245650] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#FAF7F2]">
                            <Check className="h-2.5 w-2.5" />
                            Selected
                          </span>
                        )}
                        {outlet.distance !== null && (
                          <span className="text-[11px] font-semibold text-[#245650]">
                            • {outlet.distance} km away
                          </span>
                        )}
                      </div>

                      <p className="mt-1 text-xs text-[#30251F]/70">{outlet.address}</p>

                      <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] text-[#30251F]/65">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5 text-[#245650]" />
                          Open 9:00 AM – 10:00 PM
                        </span>
                        <a
                          href={`tel:${outlet.phone.replace(/\s+/g, '')}`}
                          className="flex items-center gap-1 hover:text-[#245650] transition-colors"
                        >
                          <Phone className="h-3.5 w-3.5 text-[#245650]" />
                          {outlet.phone}
                        </a>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 shrink-0">
                      <a
                        href={outlet.directions || outlet.googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1 rounded-lg border border-[#E6DFD5] bg-[#FAF7F2] px-3 py-1.5 text-[11px] font-semibold text-[#30251F] hover:border-[#245650] hover:text-[#245650] transition-colors"
                      >
                        <Navigation className="h-3 w-3" />
                        <span>Directions</span>
                      </a>

                      {!isSelected && (
                        <button
                          type="button"
                          onClick={() => {
                            selectOutlet(outlet.id);
                            setIsOutletModalOpen(false);
                          }}
                          className="rounded-lg bg-[#245650] px-3 py-1.5 text-[11px] font-semibold text-[#FAF7F2] hover:bg-[#1D4641] transition-colors"
                        >
                          Select
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer note */}
          <div className="mt-4 pt-3 border-t border-[#E6DFD5] flex items-center justify-between text-xs text-[#30251F]/60">
            <span>Live ovens in Frazer Town &amp; express boutique counters.</span>
            <button
              type="button"
              onClick={() => setIsOutletModalOpen(false)}
              className="font-semibold text-[#245650] hover:underline"
            >
              Done
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default NearestOutletModal;
