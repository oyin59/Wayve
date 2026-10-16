import Link from "next/link";

interface ComingSoonProps {
  title: string;
  blurb?: string;
}

/** Stand-in for screens the React MVP linked to but never built. */
export default function ComingSoon({ title, blurb }: ComingSoonProps) {
  return (
    <div className="min-h-screen bg-[#FCF1D0] text-[#432F2E] flex flex-col items-center justify-center px-6 text-center max-w-md mx-auto pb-24">
      <p className="text-5xl mb-4">🚧</p>
      <h1 className="font-serif text-3xl font-semibold">{title}</h1>
      <p className="mt-3 text-sm text-[#432F2E]/70">
        {blurb ?? "This screen is still being built."}
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
