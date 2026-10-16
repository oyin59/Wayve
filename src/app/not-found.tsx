import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FCF1D0] text-[#432F2E] flex flex-col items-center justify-center px-6 text-center max-w-md mx-auto">
      <p className="text-6xl mb-4">🧭</p>
      <h1 className="font-serif text-4xl">Lost your way?</h1>
      <p className="mt-3 text-sm text-[#432F2E]/70">
        We couldn&apos;t find that page. Let&apos;s get you back to somewhere good.
      </p>
      <Link
        href="/discover"
        className="mt-8 bg-[#432F2E] text-white px-6 py-3 rounded-2xl font-semibold"
      >
        Back to Discover
      </Link>
    </div>
  );
}
