import { notFound } from "next/navigation";
import OnboardingScreen from "@/components/OnboardingScreen";
import { ONBOARDING_STEPS } from "@/lib/onboarding";

// Pre-render /onboarding/2 and /onboarding/3 (step 1 lives at /onboarding).
export function generateStaticParams() {
  return Array.from({ length: ONBOARDING_STEPS - 1 }, (_, i) => ({
    step: String(i + 2),
  }));
}

export default async function OnboardingStepPage({
  params,
}: PageProps<"/onboarding/[step]">) {
  const { step } = await params;
  const n = Number(step);

  if (!Number.isInteger(n) || n < 2 || n > ONBOARDING_STEPS) notFound();

  return <OnboardingScreen step={n} />;
}
