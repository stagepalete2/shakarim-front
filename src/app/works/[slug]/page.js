import { notFound } from "next/navigation";
import { WorkItem } from "@/screens/work-item/work-item";
import { WORKS, getRelatedWorks, getWorkBySlug } from "@/lib/works";

export function generateStaticParams() {
  return WORKS.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const work = getWorkBySlug(slug);
  if (!work) return { title: "Шығарма табылмады" };
  return {
    title: `${work.title} — Шәкәрім шығармалары`,
    description: work.description ?? work.title,
  };
}

export default async function WorkItemPage({ params }) {
  const { slug } = await params;
  const work = getWorkBySlug(slug);
  if (!work) notFound();

  const related = getRelatedWorks(slug, 4);
  return <WorkItem work={work} related={related} />;
}
