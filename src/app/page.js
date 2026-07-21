import { Home } from "@/screens/home/home";
import { fetchHome, fetchMedia } from "@/lib/endpoints/pages";
import { fetchBooks } from "@/lib/endpoints/books";
import { fetchAuthors } from "@/lib/endpoints/authors";
import { getLang } from "@/lib/i18n/server";
import { JsonLd } from "@/components/seo/json-ld";
import { shakarimPersonSchema } from "@/lib/seo-schemas";

export const metadata = {
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const [home, books, authors, media, lang] = await Promise.all([
    fetchHome(),
    fetchBooks(),
    fetchAuthors(),
    fetchMedia(),
    getLang(),
  ]);
  return (
    <>
      <JsonLd data={shakarimPersonSchema(lang)} />
      <Home home={home} books={books} authors={authors} media={media} />
    </>
  );
}
