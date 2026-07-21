import { notFound } from "next/navigation";
import { ArchiveItem } from "@/screens/archive-item/archive-item";
import { fetchArchiveItem } from "@/lib/endpoints/archive";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { JsonLd } from "@/components/seo/json-ld";
import { archiveSchema, breadcrumbSchema, clean } from "@/lib/seo-schemas";

export async function generateMetadata({ params }) {
  const { lang, slug } = await params;
  const item = await fetchArchiveItem(slug);
  if (!item) return { title: "Архив элементі табылмады" };
  const description = clean(item.description) ?? item.title;
  const canonical = `/${lang}/archive/${slug}`;
  return {
    title: `${item.title} — Шәкәрім архиві`,
    description,
    alternates: { canonical },
    openGraph: {
      type: "article",
      title: item.title,
      description,
      url: canonical,
      ...(item.cover && { images: [item.cover] }),
    },
  };
}

export default async function ArchiveItemPage({ params }) {
  const { lang, slug } = await params;
  const item = await fetchArchiveItem(slug);
  if (!item) notFound();

  const dict = getDictionary(lang);
  return (
    <>
      <JsonLd data={archiveSchema(item, lang)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: dict.common.home, path: `/${lang}` },
          { name: dict.pages.archive, path: `/${lang}/archive` },
          { name: item.title, path: `/${lang}/archive/${slug}` },
        ])}
      />
      <ArchiveItem item={item} related={item.related ?? []} />
    </>
  );
}
