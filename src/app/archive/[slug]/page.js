import { notFound } from "next/navigation";
import { ArchiveItem } from "@/screens/archive-item/archive-item";
import { fetchArchiveItem } from "@/lib/endpoints/archive";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const item = await fetchArchiveItem(slug);
  if (!item) return { title: "Архив элементі табылмады" };
  return {
    title: `${item.title} — Шәкәрім архиві`,
    description: item.description ?? item.title,
  };
}

export default async function ArchiveItemPage({ params }) {
  const { slug } = await params;
  const item = await fetchArchiveItem(slug);
  if (!item) notFound();

  return <ArchiveItem item={item} related={item.related ?? []} />;
}
