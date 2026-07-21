import { notFound } from "next/navigation";
import { Article } from "@/screens/article/article";
import { fetchArticle } from "@/lib/endpoints/articles";
import { getLang } from "@/lib/i18n/server";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { JsonLd } from "@/components/seo/json-ld";
import { articleSchema, breadcrumbSchema, clean } from "@/lib/seo-schemas";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = await fetchArticle(slug);
  if (!article) return { title: "Мақала табылмады" };
  const description = clean(article.body) ?? article.title;
  const canonical = `/biography/${slug}`;
  return {
    title: article.title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "article",
      title: article.title,
      description,
      url: canonical,
      ...(article.date && { publishedTime: article.date }),
      ...(article.cover && { images: [article.cover] }),
    },
  };
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const [article, lang] = await Promise.all([fetchArticle(slug), getLang()]);
  if (!article) notFound();

  const dict = getDictionary(lang);
  return (
    <>
      <JsonLd data={articleSchema(article, lang)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: dict.common.home, path: "/" },
          { name: dict.pages.biography, path: "/biography" },
          { name: article.title, path: `/biography/${slug}` },
        ])}
      />
      <Article article={article} related={article.related ?? []} />
    </>
  );
}
