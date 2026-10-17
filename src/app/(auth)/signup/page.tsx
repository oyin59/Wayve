"use client";

import { useRouter } from "next/navigation";
export default function SignupPage() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#29291F] flex flex-col px-6 py-8 max-w-md mx-auto">
      {/* Logo */}
      <div className="text-center pt-6">
        <h1 className="text-4xl font-serif">
          Way<span className="italic text-[#29291F]">ve</span>
        </h1>
        <p className="text-sm text-[#29291F]/60 mt-2">
          Create your account
        </p>
      </div>
      {/* Form */}
      <div className="mt-10 space-y-4">
        <div>
          <label className="text-sm font-medium block mb-2">
            Full name
          </label>
          <input
            type="text"
            placeholder="Your name"
            className="w-full bg-white border border-[#29291F]/15 rounded-2xl px-4 py-4 outline-none focus:border-[#29291F]"
          />
        </div>
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
          <label className="text-sm font-medium block mb-2">
            Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full bg-white border border-[#29291F]/15 rounded-2xl px-4 py-4 outline-none focus:border-[#29291F]"
          />
        </div>
        <button
          onClick={() => router.push("/discover")}
          className="w-full bg-[#29291F] text-white py-4 rounded-2xl font-semibold mt-2"
        >
          Sign up
        </button>
      </div>
      {/* Divider */}
      <div className="flex items-center gap-3 my-7">
        <div className="h-px bg-[#29291F]/15 flex-1" />
        <span className="text-xs text-[#29291F]/50">
          Or continue with
        </span>
        <div className="h-px bg-[#29291F]/15 flex-1" />
      </div>
      {/* Social */}
      <div className="grid grid-cols-2 gap-3">
        <button className="bg-white border border-[#29291F]/15 rounded-2xl py-3.5 font-medium">
          G Google
        </button>
        <button className="bg-white border border-[#29291F]/15 rounded-2xl py-3.5 font-medium">
           Apple
        </button>
      </div>
      {/* Login */}
      <div className="mt-auto pt-8 text-center">
        <p className="text-sm text-[#29291F]/60">
          Already have an account?
        </p>
        <button
          onClick={() => router.push("/login")}
          className="mt-2 text-[#29291F] font-semibold"
        >
          Log in
        </button>
      </div>
    </div>
  );
}
