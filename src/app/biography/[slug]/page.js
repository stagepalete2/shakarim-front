import { notFound } from "next/navigation";
import { Article } from "@/screens/article/article";
import {
  ARTICLES,
  getArticleBySlug,
  getRelatedArticles,
} from "@/lib/articles";

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: "Статья не найдена" };
  return {
    title: `${article.title} — Shakarim University`,
    description: article.title,
  };
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const related = getRelatedArticles(slug, 3);

  return <Article article={article} related={related} />;
}
