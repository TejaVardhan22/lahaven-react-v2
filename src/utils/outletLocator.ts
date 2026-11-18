import type { Outlet } from '@/types';
import { outlets } from '@/data/outlets';

export interface OutletLocationData {
  id: string;
  lat: number;
  lng: number;
  pincodes: string[];
}

export interface UserCoordinates {
  lat: number;
  lng: number;
}

export interface OutletProximity {
  outlet: Outlet;
  haversineDistanceKm: number;
  roadDistanceKm: number;
  estimatedDriveTimeMinutes: number;
  directionsUrl: string;
}

/**
 * Verified Geographic Coordinates & Postal Zones for all 5 Physical Boutiques in Bengaluru
 */
export const OUTLET_COORDINATES: Record<string, OutletLocationData> = {
  'frazer-town': {
    id: 'frazer-town',
    lat: 12.9972,
    lng: 77.6144,
    pincodes: ['560005', '560001', '560042', '560046', '560084', '560025', '560051', '560008'],
  },
  'malleshwaram': {
    id: 'malleshwaram',
    lat: 13.0033,
    lng: 77.5700,
    pincodes: ['560003', '560010', '560020', '560086', '560079', '560055', '560021'],
  },
  'sanjayanagar': {
    id: 'sanjayanagar',
    lat: 13.0382,
    lng: 77.5770,
    pincodes: ['560094', '560054', '560012', '560032', '560006'],
  },
  'sahakarnagar': {
    id: 'sahakarnagar',
    lat: 13.0624,
    lng: 77.5888,
    pincodes: ['560092', '560097', '560024', '560077'],
  },
  'yelahanka': {
    id: 'yelahanka',
    lat: 13.0990,
    lng: 77.5870,
    pincodes: ['560064', '560065', '560089', '560063', '560090'],
  },
};

/**
 * 1. Haversine Great-Circle Distance Algorithm
 * Computes the geodesic straight-line distance over Earth's spherical surface (WGS 84 ellipsoid approximation).
 */
export function calculateDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's mean radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}

/**
 * 2. Urban Road Circuity Routing Factor Algorithm
 * In Bengaluru's urban grid, actual driving road distance averages 1.28x the straight-line Haversine distance
 * due to arterial roads, flyovers, and one-way streets.
 */
export function estimateRoadDistanceKm(haversineKm: number): number {
  const factor = 1.28;
  return Math.round(haversineKm * factor * 10) / 10;
}

/**
 * 3. Urban Transit Time Estimation Algorithm
 * Estimates road driving transit time based on Bengaluru's average city traffic speed (~22 km/h).
 */
export function estimateDriveTimeMinutes(roadDistanceKm: number): number {
  const avgSpeedKmh = 22;
  const minutes = Math.round((roadDistanceKm / avgSpeedKmh) * 60);
  return Math.max(5, minutes); // Minimum 5 mins
}

/**
 * 4. Dynamic Google Maps Turn-by-Turn Navigation URL Generator
 * Generates an active directions link with origin and destination coordinates.
 */
export function getDirectionsUrl(outlet: Outlet, userCoords?: UserCoordinates | null): string {
  const geo = OUTLET_COORDINATES[outlet.id];
  const destCoords = geo ? `${geo.lat},${geo.lng}` : encodeURIComponent(outlet.address);

  if (userCoords && userCoords.lat && userCoords.lng) {
    return `https://www.google.com/maps/dir/?api=1&origin=${userCoords.lat},${userCoords.lng}&destination=${destCoords}&travelmode=driving`;
  }

  return outlet.googleMapsUrl || `https://maps.google.com/?q=${encodeURIComponent(outlet.name + ' ' + outlet.address)}`;
}

/**
 * 5. Nearest Outlet Detection Algorithm
 * Computes proximity for all 5 boutiques, returning the closest outlet with road distance, drive time, and live map link.
 */
export function findNearestOutletByCoordinates(
  lat: number,
  lng: number
): OutletProximity {
  let closestOutlet = outlets[0];
  let minDistance = Infinity;

  for (const outlet of outlets) {
    const geo = OUTLET_COORDINATES[outlet.id];
    if (geo) {
      const dist = calculateDistanceKm(lat, lng, geo.lat, geo.lng);
      if (dist < minDistance) {
        minDistance = dist;
        closestOutlet = outlet;
      }
    }
  }

  const roadDist = estimateRoadDistanceKm(minDistance);
  const driveTime = estimateDriveTimeMinutes(roadDist);
  const directionsUrl = getDirectionsUrl(closestOutlet, { lat, lng });

  return {
    outlet: closestOutlet,
    haversineDistanceKm: minDistance,
    roadDistanceKm: roadDist,
    estimatedDriveTimeMinutes: driveTime,
    directionsUrl,
  };
}

/**
 * 6. PIN Code Fallback Algorithm
 * Maps Bengaluru postal zones to their local hub boutique.
 */
export function findNearestOutletByPincode(
  pincode: string
): { outlet: Outlet; directionsUrl: string } {
  const clean = pincode.trim();
  for (const [outletId, data] of Object.entries(OUTLET_COORDINATES)) {
    if (data.pincodes.includes(clean)) {
      const match = outlets.find((o) => o.id === outletId);
      if (match) {
        return {
          outlet: match,
          directionsUrl: getDirectionsUrl(match, null),
        };
      }
    }
  }
  return {
    outlet: outlets[0],
    directionsUrl: getDirectionsUrl(outlets[0], null),
  };
}
