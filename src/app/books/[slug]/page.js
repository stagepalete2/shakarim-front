import { notFound } from "next/navigation";
import { BookItem } from "@/screens/book-item/book-item";
import { BOOKS, getBookBySlug, getRelatedBooks } from "@/lib/books";

export function generateStaticParams() {
  return BOOKS.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const book = getBookBySlug(slug);
  if (!book) return { title: "Кітап табылмады" };
  return {
    title: `${book.title} — Кітап әлемі`,
    description: book.description ?? book.title,
  };
}

export default async function BookItemPage({ params }) {
  const { slug } = await params;
  const book = getBookBySlug(slug);
  if (!book) notFound();

  const related = getRelatedBooks(slug, 4);
  return <BookItem book={book} related={related} />;
}
