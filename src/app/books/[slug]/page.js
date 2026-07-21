import { notFound } from "next/navigation";
import { BookItem } from "@/screens/book-item/book-item";
import { fetchBook } from "@/lib/endpoints/books";
import { getLang } from "@/lib/i18n/server";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { JsonLd } from "@/components/seo/json-ld";
import { bookSchema, breadcrumbSchema, clean } from "@/lib/seo-schemas";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const book = await fetchBook(slug);
  if (!book) return { title: "Кітап табылмады" };
  const description = clean(book.description) ?? book.title;
  const canonical = `/books/${slug}`;
  return {
    title: `${book.title} — Кітап әлемі`,
    description,
    alternates: { canonical },
    openGraph: {
      type: "book",
      title: book.title,
      description,
      url: canonical,
      ...(book.cover && { images: [book.cover] }),
    },
  };
}

export default async function BookItemPage({ params }) {
  const { slug } = await params;
  const [book, lang] = await Promise.all([fetchBook(slug), getLang()]);
  if (!book) notFound();

  const dict = getDictionary(lang);
  return (
    <>
      <JsonLd data={bookSchema(book, lang)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: dict.common.home, path: "/" },
          { name: dict.pages.books, path: "/books" },
          { name: book.title, path: `/books/${slug}` },
        ])}
      />
      <BookItem book={book} related={book.related ?? []} />
    </>
  );
}
