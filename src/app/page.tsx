"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
export default function SplashPage() {
  const router = useRouter();
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/onboarding");
    }, 5000);
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
