import { notFound } from "next/navigation";
import { Article } from "@/screens/article/article";
import { fetchArticle } from "@/lib/endpoints/articles";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = await fetchArticle(slug);
  if (!article) return { title: "Статья не найдена" };
  return {
    title: `${article.title} — Shakarim University`,
    description: article.title,
  };
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const article = await fetchArticle(slug);
  if (!article) notFound();

  return <Article article={article} related={article.related ?? []} />;
}
