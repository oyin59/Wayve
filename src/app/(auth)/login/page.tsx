"use client";

import { useRouter } from "next/navigation";
export default function LoginPage() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#29291F] flex flex-col px-6 py-8 max-w-md mx-auto">
      {/* Logo */}
      <div className="text-center pt-6">
        <h1 className="text-4xl font-serif">
          Way<span className="italic text-[#29291F]">ve</span>
        </h1>
        <p className="text-sm text-[#29291F]/60 mt-2">
          Good to see you again
        </p>
      </div>
      {/* Form */}
      <div className="mt-12 space-y-5">
        <div>
          <label className="text-sm font-medium block mb-2">
            Email address
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full bg-white border border-[#29291F]/15 rounded-2xl px-4 py-4 outline-none focus:border-[#29291F]"
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium">
              Password
            </label>
            <button className="text-xs text-[#29291F]">
              Forgot password?
            </button>
          </div>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full bg-white border border-[#29291F]/15 rounded-2xl px-4 py-4 outline-none focus:border-[#29291F]"
          />
        </div>
        <button
          onClick={() => router.push("/discover")}
          className="w-full bg-[#29291F] text-white py-4 rounded-2xl font-semibold"
        >
          Log in
        </button>
      </div>
      {/* Divider */}
      <div className="flex items-center gap-3 my-8">
        <div className="h-px bg-[#29291F]/15 flex-1" />
        <span className="text-xs text-[#29291F]/50">
          Or continue with
        </span>
        <div className="h-px bg-[#29291F]/15 flex-1" />
      </div>
      {/* Social buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button className="bg-white border border-[#29291F]/15 rounded-2xl py-3.5 font-medium">
          G Google
        </button>
        <button className="bg-white border border-[#29291F]/15 rounded-2xl py-3.5 font-medium">
           Apple
        </button>
      </div>
      {/* Sign up */}
      <div className="mt-auto pt-10 text-center">
        <p className="text-sm text-[#29291F]/60">
          Don&apos;t have an account?
        </p>
        <button
          onClick={() => router.push("/signup")}
          className="mt-2 text-[#29291F] font-semibold"
        >
          Create an account
        </button>
      </div>
    </div>
  );
}
