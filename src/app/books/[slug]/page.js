import { notFound } from "next/navigation";
import { BookItem } from "@/screens/book-item/book-item";
import { fetchBook } from "@/lib/endpoints/books";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const book = await fetchBook(slug);
  if (!book) return { title: "Кітап табылмады" };
  return {
    title: `${book.title} — Кітап әлемі`,
    description: book.description ?? book.title,
  };
}

export default async function BookItemPage({ params }) {
  const { slug } = await params;
  const book = await fetchBook(slug);
  if (!book) notFound();

  return <BookItem book={book} related={book.related ?? []} />;
}
