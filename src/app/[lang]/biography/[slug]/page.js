import { notFound } from "next/navigation";
import { Article } from "@/screens/article/article";
import { fetchArticle } from "@/lib/endpoints/articles";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { JsonLd } from "@/components/seo/json-ld";
import { articleSchema, breadcrumbSchema, clean } from "@/lib/seo-schemas";

export async function generateMetadata({ params }) {
  const { lang, slug } = await params;
  const article = await fetchArticle(slug);
  if (!article) return { title: "Мақала табылмады" };
  const description = clean(article.body) ?? article.title;
  const canonical = `/${lang}/biography/${slug}`;
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
  const { lang, slug } = await params;
  const article = await fetchArticle(slug);
  if (!article) notFound();

  const dict = getDictionary(lang);
  return (
    <>
      <JsonLd data={articleSchema(article, lang)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: dict.common.home, path: `/${lang}` },
          { name: dict.pages.biography, path: `/${lang}/biography` },
          { name: article.title, path: `/${lang}/biography/${slug}` },
        ])}
      />
      <Article article={article} related={article.related ?? []} />
    </>
  );
}
