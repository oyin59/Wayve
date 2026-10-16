import { notFound } from "next/navigation";
import SavedListView from "@/components/SavedListView";
import { SAVED_LISTS } from "@/data/lists";

export function generateStaticParams() {
  return SAVED_LISTS.map((list) => ({ listId: String(list.id) }));
}

export default async function SavedListPage({
  params,
}: PageProps<"/saved/lists/[listId]">) {
  const { listId } = await params;
  const list = SAVED_LISTS.find((l) => String(l.id) === listId);

  if (!list) notFound();

  return <SavedListView list={list} />;
}
