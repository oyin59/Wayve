import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#29291F] flex flex-col items-center justify-center px-6 text-center max-w-md mx-auto">
      <p className="text-6xl mb-4">🧭</p>
      <h1 className="font-serif text-4xl">Lost your way?</h1>
      <p className="mt-3 text-sm text-[#29291F]/70">
        We couldn&apos;t find that page. Let&apos;s get you back to somewhere good.
      </p>
      <Link
        href="/discover"
        className="mt-8 bg-[#29291F] text-white px-6 py-3 rounded-2xl font-semibold"
      >
        Back to Discover
      </Link>
    </div>
  );
}
