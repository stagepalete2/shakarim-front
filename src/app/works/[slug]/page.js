import { notFound } from "next/navigation";
import { WorkItem } from "@/screens/work-item/work-item";
import { fetchWork } from "@/lib/endpoints/works";
import { getLang } from "@/lib/i18n/server";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { JsonLd } from "@/components/seo/json-ld";
import { creativeWorkSchema, breadcrumbSchema, clean } from "@/lib/seo-schemas";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const work = await fetchWork(slug);
  if (!work) return { title: "Шығарма табылмады" };
  const description = clean(work.description ?? work.excerpt) ?? work.title;
  const canonical = `/works/${slug}`;
  return {
    title: `${work.title} — Шәкәрім шығармалары`,
    description,
    alternates: { canonical },
    openGraph: {
      type: "article",
      title: work.title,
      description,
      url: canonical,
      ...(work.cover && { images: [work.cover] }),
    },
  };
}

export default async function WorkItemPage({ params }) {
  const { slug } = await params;
  // related приходит внутри детали (API.md §1).
  const [work, lang] = await Promise.all([fetchWork(slug), getLang()]);
  if (!work) notFound();

  const dict = getDictionary(lang);
  return (
    <>
      <JsonLd data={creativeWorkSchema(work, lang)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: dict.common.home, path: "/" },
          { name: dict.pages.works, path: "/works" },
          { name: work.title, path: `/works/${slug}` },
        ])}
      />
      <WorkItem work={work} related={work.related ?? []} />
    </>
  );
}
