import { notFound } from "next/navigation";
import { BookItem } from "@/screens/book-item/book-item";
import { fetchBook } from "@/lib/endpoints/books";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { JsonLd } from "@/components/seo/json-ld";
import { bookSchema, breadcrumbSchema, clean } from "@/lib/seo-schemas";

export async function generateMetadata({ params }) {
  const { lang, slug } = await params;
  const book = await fetchBook(slug);
  if (!book) return { title: "Кітап табылмады" };
  const description = clean(book.description) ?? book.title;
  const canonical = `/${lang}/books/${slug}`;
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
  const { lang, slug } = await params;
  const book = await fetchBook(slug);
  if (!book) notFound();

  const dict = getDictionary(lang);
  return (
    <>
      <JsonLd data={bookSchema(book, lang)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: dict.common.home, path: `/${lang}` },
          { name: dict.pages.books, path: `/${lang}/books` },
          { name: book.title, path: `/${lang}/books/${slug}` },
        ])}
      />
      <BookItem book={book} related={book.related ?? []} />
    </>
  );
}
