"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { readStore } from "@/lib/localStore";
import { ONBOARDING_COMPLETE_KEY } from "@/lib/onboarding";

export default function SplashPage() {
  const router = useRouter();
  useEffect(() => {
    const destination =
      readStore(ONBOARDING_COMPLETE_KEY) === "true"
        ? "/discover"
        : "/onboarding";
    const timer = setTimeout(() => {
      router.push(destination);
    }, 1500);
    return () => clearTimeout(timer);
  }, [router]);
  return (
    <div className="min-h-screen bg-brown flex flex-col items-center justify-center gap-3 max-w-md mx-auto">
      <h1 className="text-7xl font-serif text-butter tracking-tight">
        Wayve
      </h1>
      <p className="text-blue-sky text-sm font-light tracking-widest uppercase">
        Good places, made easy.
      </p>
      <div className="mt-12 w-1.5 h-1.5 rounded-full bg-butter/40 animate-pulse" />
    </div>
  );
}
