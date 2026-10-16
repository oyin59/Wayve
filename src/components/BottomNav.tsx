"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNav() {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-brown/95 backdrop-blur-md border-t border-brown z-40">
      <div className="max-w-md mx-auto flex items-center justify-around px-4 py-3">
        {/* Discover */}
        <Link
          href="/discover"
          className={`flex flex-col items-center gap-1 text-xs ${
            isActive("/discover")
              ? "text-butter font-semibold"
              : "text-butter/50"
          }`}
        >
          <span className="text-lg">✦</span>
          Discover
        </Link>
        {/* Saved */}
        <Link
          href="/saved"
          className={`flex flex-col items-center gap-1 text-xs ${
            isActive("/saved")
              ? "text-butter font-semibold"
              : "text-butter/50"
          }`}
        >
          <span className="text-lg">♡</span>
          Saved
        </Link>
        {/* Profile */}
        <Link
          href="/profile"
          className={`flex flex-col items-center gap-1 text-xs ${
            isActive("/profile")
              ? "text-butter font-semibold"
              : "text-butter/50"
          }`}
        >
          <span className="text-lg">◯</span>
          Profile
        </Link>
      </div>
    </nav>
  );
}
