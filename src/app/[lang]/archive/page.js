import { Archive } from "@/screens/archive/archive";
import { fetchArchive, fetchArchiveTypes } from "@/lib/endpoints/archive";

const title = "Архив және қолжазба — Шәкәрім";
const description =
  "Шәкәрім Құдайбердіұлының архивтік мұрасы: қолжазбалар, фотосуреттер, хаттар, аудио және бейне жазбалар.";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const path = `/${lang}/archive`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path },
  };
}

export default async function ArchivePage() {
  const [items, types] = await Promise.all([
    fetchArchive(),
    fetchArchiveTypes(),
  ]);
  return <Archive items={items} types={types} />;
}
