import { Home } from "@/screens/home/home";
import { fetchHome, fetchMedia } from "@/lib/endpoints/pages";
import { fetchBooks } from "@/lib/endpoints/books";
import { fetchAuthors } from "@/lib/endpoints/authors";
import { JsonLd } from "@/components/seo/json-ld";
import { shakarimPersonSchema } from "@/lib/seo-schemas";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return { alternates: { canonical: `/${lang}` } };
}

export default async function HomePage({ params }) {
  const { lang } = await params;
  const [home, books, authors, media] = await Promise.all([
    fetchHome(),
    fetchBooks(),
    fetchAuthors(),
    fetchMedia(),
  ]);
  return (
    <>
      <JsonLd data={shakarimPersonSchema(lang)} />
      <Home home={home} books={books} authors={authors} media={media} />
    </>
  );
}
