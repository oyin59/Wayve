// Kept out of the "use client" OnboardingScreen so server pages can import it.
// Must match the number of slides in components/OnboardingScreen.tsx.
import { writeStore } from "@/lib/localStore";

export const ONBOARDING_STEPS = 3;
export const ONBOARDING_COMPLETE_KEY = "wayve:onboarding-complete";
export const DISPLAY_NAME_KEY = "wayve:display-name";
export const DISCOVERY_VIBES = [
  "Aesthetic",
  "Casual",
  "Chill",
  "Cozy",
  "Lively",
  "Upscale",
] as const;

export function markOnboardingComplete() {
  writeStore(ONBOARDING_COMPLETE_KEY, "true");
}
