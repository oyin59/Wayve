"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNav() {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-[#29291F]/10 bg-[#FAF7F2]/95 text-[#29291F] shadow-[0_-4px_18px_rgba(41,41,31,0.06)] backdrop-blur-md md:bottom-5 md:left-1/2 md:right-auto md:w-max md:-translate-x-1/2 md:rounded-full md:border md:shadow-[0_8px_28px_rgba(41,41,31,0.16)]">
      <div className="mx-auto flex max-w-md items-center justify-around px-4 py-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] md:max-w-none md:px-5 md:pb-2">
        <Link
          href="/discover"
          className={`flex min-h-14 min-w-20 flex-col items-center justify-center gap-1 rounded-2xl px-3 text-xs transition-colors ${
            isActive("/discover") ? "font-semibold text-[#303820]" : "text-[#29291F]/60"
          }`}
        >
          <span
            className={`flex h-8 w-10 items-center justify-center rounded-full text-lg ${
              isActive("/discover")
                ? "bg-[#D9B574] text-[#29291F]"
                : "text-[#29291F]/65"
            }`}
          >
            ✦
          </span>
          Discover
        </Link>
        <Link
          href="/saved"
          className={`flex min-h-14 min-w-20 flex-col items-center justify-center gap-1 rounded-2xl px-3 text-xs transition-colors ${
            isActive("/saved") ? "font-semibold text-[#303820]" : "text-[#29291F]/60"
          }`}
        >
          <span
            className={`flex h-8 w-10 items-center justify-center rounded-full text-lg ${
              isActive("/saved")
                ? "bg-[#D9B574] text-[#29291F]"
                : "text-[#29291F]/65"
            }`}
          >
            ♡
          </span>
          Saved
        </Link>
        <Link
          href="/profile"
          className={`flex min-h-14 min-w-20 flex-col items-center justify-center gap-1 rounded-2xl px-3 text-xs transition-colors ${
            isActive("/profile") ? "font-semibold text-[#303820]" : "text-[#29291F]/60"
          }`}
        >
          <span
            className={`flex h-8 w-10 items-center justify-center rounded-full text-lg ${
              isActive("/profile")
                ? "bg-[#D9B574] text-[#29291F]"
                : "text-[#29291F]/65"
            }`}
          >
            ◯
          </span>
          Profile
        </Link>
      </div>
    </nav>
  );
}
