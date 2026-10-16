import { notFound } from "next/navigation";
import ReviewForm from "@/components/ReviewForm";
import places from "@/data/places";

export function generateStaticParams() {
  return places.map((place) => ({ id: String(place.id) }));
}

export default async function ReviewPage({
  params,
}: PageProps<"/places/[id]/review">) {
  const { id } = await params;
  const place = places.find((p) => String(p.id) === id);

  if (!place) notFound();

  return <ReviewForm place={place} />;
}
