import { notFound } from "next/navigation";
import { WorkItem } from "@/screens/work-item/work-item";
import { fetchWork } from "@/lib/endpoints/works";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const work = await fetchWork(slug);
  if (!work) return { title: "Шығарма табылмады" };
  return {
    title: `${work.title} — Шәкәрім шығармалары`,
    description: work.description ?? work.title,
  };
}

export default async function WorkItemPage({ params }) {
  const { slug } = await params;
  const work = await fetchWork(slug);
  if (!work) notFound();

  // related приходит внутри детали (API.md §1).
  return <WorkItem work={work} related={work.related ?? []} />;
}
