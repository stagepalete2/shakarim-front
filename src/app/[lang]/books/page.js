import { Books } from "@/screens/books/books";
import {
  fetchBooks,
  fetchBooksCategories,
  fetchBooksTags,
} from "@/lib/endpoints/books";

const title = "Кітап әлемі — Шәкәрім";
const description =
  "Шәкәрім Құдайбердіұлының кітаптары мен оған арналған ғылыми зерттеу еңбектерінің электронды каталогы.";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const path = `/${lang}/books`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path },
  };
}

export default async function BooksPage() {
  const [books, categories, tags] = await Promise.all([
    fetchBooks(),
    fetchBooksCategories(),
    fetchBooksTags(),
  ]);
  return <Books books={books} categories={categories} tags={tags} />;
}
