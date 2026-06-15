import { Home } from "@/screens/home/home";
import { fetchHome, fetchMedia } from "@/lib/endpoints/pages";
import { fetchBooks } from "@/lib/endpoints/books";
import { fetchAuthors } from "@/lib/endpoints/authors";

export default async function HomePage() {
  const [home, books, authors, media] = await Promise.all([
    fetchHome(),
    fetchBooks(),
    fetchAuthors(),
    fetchMedia(),
  ]);
  return <Home home={home} books={books} authors={authors} media={media} />;
}
