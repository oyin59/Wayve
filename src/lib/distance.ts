export const ABUJA_AREAS: string[] = [
  "Apo",
  "Asokoro",
  "Central Business District (CBD)",
  "Dakwo",
  "Dawaki",
  "Durumi",
  "Dutse Alhaji",
  "Galadimawa",
  "Garki",
  "Gudu",
  "Guzape",
  "Gwarinpa",
  "Jabi",
  "Jahi",
  "Kabusa",
  "Kado",
  "Karmo",
  "Katampe",
  "Kubwa",
  "Kuje",
  "Life Camp",
  "Lokogoma",
  "Lugbe",
  "Mabushi",
  "Maitama",
  "Mpape",
  "Utako",
  "Wuse",
  "Wuye",
];
// Latitude/Longitude coordinates for all 29 Abuja areas
export const AREA_COORDINATES: Record<string, { lat: number; lng: number }> = {
  "Apo": { lat: 8.9861, lng: 7.5133 },
  "Asokoro": { lat: 9.0433, lng: 7.5350 },
  "Central Business District (CBD)": { lat: 9.05785, lng: 7.49508 },
  "Dakwo": { lat: 8.9750, lng: 7.4350 },
  "Dawaki": { lat: 9.1300, lng: 7.4100 },
  "Durumi": { lat: 9.0069, lng: 7.4728 },
  "Dutse Alhaji": { lat: 9.1620, lng: 7.3980 },
  "Galadimawa": { lat: 8.9810, lng: 7.4580 },
  "Garki": { lat: 9.0250, lng: 7.4880 },
  "Gudu": { lat: 9.0010, lng: 7.4950 },
  "Guzape": { lat: 9.0210, lng: 7.5300 },
  "Gwarinpa": { lat: 9.1092, lng: 7.4081 },
  "Jabi": { lat: 9.0733, lng: 7.4267 },
  "Jahi": { lat: 9.0900, lng: 7.4400 },
  "Kabusa": { lat: 8.9500, lng: 7.4600 },
  "Kado": { lat: 9.0800, lng: 7.4300 },
  "Karmo": { lat: 9.0700, lng: 7.3600 },
  "Katampe": { lat: 9.1100, lng: 7.4700 },
  "Kubwa": { lat: 9.1550, lng: 7.3300 },
  "Kuje": { lat: 8.8786, lng: 7.2275 },
  "Life Camp": { lat: 9.0600, lng: 7.3900 },
  "Lokogoma": { lat: 8.9600, lng: 7.4700 },
  "Lugbe": { lat: 8.9700, lng: 7.3700 },
  "Mabushi": { lat: 9.0800, lng: 7.4600 },
  "Maitama": { lat: 9.0833, lng: 7.4997 },
  "Mpape": { lat: 9.1300, lng: 7.5000 },
  "Utako": { lat: 9.0633, lng: 7.4517 },
  "Wuse": { lat: 9.0667, lng: 7.4833 },
  "Wuye": { lat: 9.0400, lng: 7.4500 },
};
// Estimates straight-line distance between the selected area centres.
export const getDistanceBetween = (
  area1?: string | null,
  area2?: string | null,
): number => {
  if (!area1 || !area2) return Infinity;
  // Normalize potential legacy names (e.g., "Wuse 2" or "Central Area" mapped to new list)
  const norm1: string = area1.includes("Wuse") ? "Wuse" : area1.includes("CBD") || area1.includes("Central") ? "Central Business District (CBD)" : area1;
  const norm2: string = area2.includes("Wuse") ? "Wuse" : area2.includes("CBD") || area2.includes("Central") ? "Central Business District (CBD)" : area2;
  if (norm1 === norm2) return 0;
  const coord1 = AREA_COORDINATES[norm1];
  const coord2 = AREA_COORDINATES[norm2];
  if (!coord1 || !coord2) return Infinity;
  const R = 6371; // Earth's radius in KM
  const dLat = ((coord2.lat - coord1.lat) * Math.PI) / 180;
  const dLng = ((coord2.lng - coord1.lng) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((coord1.lat * Math.PI) / 180) *
      Math.cos((coord2.lat * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
};

export function formatAreaDistance(distance: number): string {
  return `~${distance.toFixed(1)} km`;
}

export function formatPlaceProximity(
  distance: number,
  placeArea: string,
): string {
  return distance === 0 ? `In ${placeArea}` : formatAreaDistance(distance);
}
