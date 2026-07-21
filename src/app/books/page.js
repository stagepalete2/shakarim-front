import { Books } from "@/screens/books/books";
import {
  fetchBooks,
  fetchBooksCategories,
  fetchBooksTags,
} from "@/lib/endpoints/books";

const title = "Кітап әлемі — Шәкәрім";
const description =
  "Шәкәрім Құдайбердіұлының кітаптары мен оған арналған ғылыми зерттеу еңбектерінің электронды каталогы.";

export const metadata = {
  title,
  description,
  alternates: { canonical: "/books" },
  openGraph: { title, description, url: "/books" },
};

export default async function BooksPage() {
  const [books, categories, tags] = await Promise.all([
    fetchBooks(),
    fetchBooksCategories(),
    fetchBooksTags(),
  ]);
  return <Books books={books} categories={categories} tags={tags} />;
}
