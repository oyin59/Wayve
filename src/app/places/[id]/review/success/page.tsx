import { Suspense } from "react";
import { notFound } from "next/navigation";
import ReviewSuccess from "@/components/ReviewSuccess";
import places from "@/data/places";

export function generateStaticParams() {
  return places.map((place) => ({ id: String(place.id) }));
}

// The React MVP navigated to a /review-success route that was never built.
export default async function ReviewSuccessPage({
  params,
}: PageProps<"/places/[id]/review/success">) {
  const { id } = await params;
  const place = places.find((p) => String(p.id) === id);

  if (!place) notFound();

  // ReviewSuccess reads ?rating= on the client, which needs a Suspense boundary.
  return (
    <Suspense fallback={null}>
      <ReviewSuccess place={place} />
    </Suspense>
  );
}
