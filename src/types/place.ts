export type PriceTier = "Budget" | "Mid-Range" | "Splurge";

export interface Place {
  id: number;
  name: string;
  category: string;
  priceTier: PriceTier;
  neighbourhood: string;
  address: string;
  hours: string;
  occasion: string[];
  vibe: string[];
  cuteForPics: "Yes" | "Somewhat" | "No";
  status: "Verified" | "Unverified";
  image: string | null;
  known: string;
  avgSpend: string;
  amenities: string[];
}

/** A place plus its straight-line distance (km) from the user's chosen area. */
export interface PlaceWithDistance extends Place {
  distance: number;
}

export interface FilterPreferences {
  occasion: string;
  vibe: string;
  budget: string;
  pictures: string;
  distance: string;
}
