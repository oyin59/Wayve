import places from "../data/places";
import { getDistanceBetween } from "./distance";
import type { FilterPreferences, Place } from "../types/place";

const DISTANCE_LIMITS: Record<string, number> = {
  "Just around the corner": 3.5,
  "A short drive/ride": 7,
  "Worth the trip": 15,
  "Anywhere in the city": Infinity,
};

export const FILTER_KEYS = [
  "occasion",
  "vibe",
  "budget",
  "pictures",
  "distance",
] as const;

/**
 * Finds the distance limit even when the option
 * includes additional text, such as "(~3.5km)".
 */
function getDistanceLimit(value: string): number {
  const matchingOption = Object.keys(DISTANCE_LIMITS).find(
    (option) => value.trim().startsWith(option)
  );

  return matchingOption
    ? DISTANCE_LIMITS[matchingOption]
    : Infinity;
}

/**
 * Compares text without being affected by capitalisation
 * or accidental spaces.
 */
function normalise(value: string): string {
  return value.trim().toLowerCase();
}

/**
 * Matches places against the user's five filter answers.
 */
export function findMatches(
  prefs: FilterPreferences,
  area: string
): Place[] {
  const distanceMax = getDistanceLimit(prefs.distance);

  return places.filter((place) => {
    const realDistance = getDistanceBetween(
      area,
      place.neighbourhood
    );

    const matchesDistance =
      realDistance <= distanceMax;

    const matchesBudget =
      normalise(place.priceTier) ===
      normalise(prefs.budget);

    const matchesVibe =
      place.vibe?.some(
        (vibe) =>
          normalise(vibe) === normalise(prefs.vibe)
      ) ?? false;

    const matchesOccasion =
      place.occasion?.some(
        (occasion) =>
          normalise(occasion) ===
          normalise(prefs.occasion)
      ) ?? false;

    const picturePreference = normalise(
      prefs.pictures.replace("’", "'")
    );

    const matchesPictures =
      picturePreference === "doesn't matter" ||
      picturePreference === "does not matter" ||
      (picturePreference === "yes" &&
        normalise(place.cuteForPics) === "yes") ||
      (picturePreference === "somewhat" &&
        normalise(place.cuteForPics) === "somewhat") ||
      (picturePreference === "no" &&
        normalise(place.cuteForPics) === "no");

    return (
      matchesDistance &&
      matchesBudget &&
      matchesVibe &&
      matchesOccasion &&
      matchesPictures
    );
  });
}

/**
 * Returns places sorted by distance from the selected area.
 */
export function placesNear(area: string) {
  return places
    .map((place) => ({
      ...place,
      distance: getDistanceBetween(
        area,
        place.neighbourhood
      ),
    }))
    .filter(
      (place) =>
        Number.isFinite(place.distance)
    )
    .sort((a, b) => a.distance - b.distance);
}