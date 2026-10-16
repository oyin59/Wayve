export interface SavedList {
  id: number;
  name: string;
  /** Ids from data/places.ts */
  placeIds: number[];
}

// Placeholder lists until lists are persisted for real (localStorage/backend).
export const SAVED_LISTS: SavedList[] = [
  { id: 1, name: "Abuja Date Spots", placeIds: [1, 2, 4] },
  { id: 2, name: "Cute Cafés", placeIds: [1, 2, 5] },
  { id: 3, name: "Places to Try", placeIds: [3, 4, 5] },
];
