import { notFound } from "next/navigation";
import { AuthorItem } from "@/screens/author-item/author-item";
import { fetchAuthor } from "@/lib/endpoints/authors";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const author = await fetchAuthor(slug);
  if (!author) return { title: "Автор табылмады" };
  return {
    title: `${author.name} — Авторлар`,
    description: author.bio ?? author.name,
  };
}

export default async function AuthorItemPage({ params }) {
  const { slug } = await params;
  const author = await fetchAuthor(slug);
  if (!author) notFound();

  return <AuthorItem author={author} related={author.related ?? []} />;
}
