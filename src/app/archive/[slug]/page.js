import { notFound } from "next/navigation";
import { ArchiveItem } from "@/screens/archive-item/archive-item";
import {
  ARCHIVE,
  getArchiveBySlug,
  getRelatedArchive,
} from "@/lib/archive";

export function generateStaticParams() {
  return ARCHIVE.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const item = getArchiveBySlug(slug);
  if (!item) return { title: "Архив элементі табылмады" };
  return {
    title: `${item.title} — Шәкәрім архиві`,
    description: item.description ?? item.title,
  };
}

export default async function ArchiveItemPage({ params }) {
  const { slug } = await params;
  const item = getArchiveBySlug(slug);
  if (!item) notFound();

  const related = getRelatedArchive(slug, 3);

  return <ArchiveItem item={item} related={related} />;
}
