import { Books } from "@/screens/books/books";
import {
  fetchBooks,
  fetchBooksCategories,
  fetchBooksTags,
} from "@/lib/endpoints/books";

export const metadata = {
  title: "Кітап әлемі — Шәкәрім",
  description:
    "Шәкәрім Құдайбердіұлының кітаптары мен оған арналған ғылыми зерттеу еңбектерінің электронды каталогы.",
};

export default async function BooksPage() {
  const [books, categories, tags] = await Promise.all([
    fetchBooks(),
    fetchBooksCategories(),
    fetchBooksTags(),
  ]);
  return <Books books={books} categories={categories} tags={tags} />;
}
