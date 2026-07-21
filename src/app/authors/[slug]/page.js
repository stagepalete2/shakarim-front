import { notFound } from "next/navigation";
import { AuthorItem } from "@/screens/author-item/author-item";
import { fetchAuthor } from "@/lib/endpoints/authors";
import { getLang } from "@/lib/i18n/server";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { JsonLd } from "@/components/seo/json-ld";
import { authorPersonSchema, breadcrumbSchema, clean } from "@/lib/seo-schemas";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const author = await fetchAuthor(slug);
  if (!author) return { title: "Автор табылмады" };
  const description = clean(author.bio ?? author.fullBio) ?? author.name;
  const canonical = `/authors/${slug}`;
  return {
    title: `${author.name} — Авторлар`,
    description,
    alternates: { canonical },
    openGraph: {
      type: "profile",
      title: author.name,
      description,
      url: canonical,
      ...(author.photo && { images: [author.photo] }),
    },
  };
}

export default async function AuthorItemPage({ params }) {
  const { slug } = await params;
  const [author, lang] = await Promise.all([fetchAuthor(slug), getLang()]);
  if (!author) notFound();

  const dict = getDictionary(lang);
  return (
    <>
      <JsonLd data={authorPersonSchema(author)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: dict.common.home, path: "/" },
          { name: dict.pages.authors, path: "/authors" },
          { name: author.name, path: `/authors/${slug}` },
        ])}
      />
      <AuthorItem author={author} related={author.related ?? []} />
    </>
  );
}
