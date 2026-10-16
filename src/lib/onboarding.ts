// Kept out of the "use client" OnboardingScreen so server pages can import it.
// Must match the number of slides in components/OnboardingScreen.tsx.
import { writeStore } from "@/lib/localStore";

export const ONBOARDING_STEPS = 3;
export const ONBOARDING_COMPLETE_KEY = "wayve:onboarding-complete";
export const DISPLAY_NAME_KEY = "wayve:display-name";
export const PREFERRED_VIBES_KEY = "wayve:preferred-vibes";
export const DISCOVERY_VIBES = [
  "Aesthetic",
  "Casual",
  "Chill",
  "Cozy",
  "Lively",
  "Upscale",
] as const;

export function parsePreferredVibes(raw: string): string[] {
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return [
      ...new Set(
        parsed.flatMap((value) => {
          if (typeof value !== "string") return [];
          const matchingVibe = DISCOVERY_VIBES.find(
            (vibe) => vibe.toLowerCase() === value.trim().toLowerCase(),
          );
          return matchingVibe ? [matchingVibe] : [];
        }),
      ),
    ];
  } catch {
    return [];
  }
}

export function markOnboardingComplete() {
  writeStore(ONBOARDING_COMPLETE_KEY, "true");
}
