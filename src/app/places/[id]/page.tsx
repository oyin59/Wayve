import { notFound } from "next/navigation";
import PlaceDetail from "@/components/PlaceDetail";
import places from "@/data/places";

// Pre-render every place at build time.
export function generateStaticParams() {
  return places.map((place) => ({ id: String(place.id) }));
}

export default async function PlacePage({ params }: PageProps<"/places/[id]">) {
  const { id } = await params;
  const place = places.find((p) => String(p.id) === id);

  if (!place) notFound();

  return <PlaceDetail place={place} />;
}
