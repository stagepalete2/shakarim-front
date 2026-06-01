import { notFound } from "next/navigation";
import { AuthorItem } from "@/screens/author-item/author-item";
import {
  AUTHORS,
  getAuthorBySlug,
  getRelatedAuthors,
} from "@/lib/authors";

export function generateStaticParams() {
  return AUTHORS.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const author = getAuthorBySlug(slug);
  if (!author) return { title: "Автор табылмады" };
  return {
    title: `${author.name} — Авторлар`,
    description: author.bio ?? author.name,
  };
}

export default async function AuthorItemPage({ params }) {
  const { slug } = await params;
  const author = getAuthorBySlug(slug);
  if (!author) notFound();

  const related = getRelatedAuthors(slug, 4);
  return <AuthorItem author={author} related={related} />;
}
