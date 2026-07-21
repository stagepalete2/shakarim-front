import { Archive } from "@/screens/archive/archive";
import { fetchArchive, fetchArchiveTypes } from "@/lib/endpoints/archive";

const title = "Архив және қолжазба — Шәкәрім";
const description =
  "Шәкәрім Құдайбердіұлының архивтік мұрасы: қолжазбалар, фотосуреттер, хаттар, аудио және бейне жазбалар.";

export const metadata = {
  title,
  description,
  alternates: { canonical: "/archive" },
  openGraph: { title, description, url: "/archive" },
};

export default async function ArchivePage() {
  const [items, types] = await Promise.all([
    fetchArchive(),
    fetchArchiveTypes(),
  ]);
  return <Archive items={items} types={types} />;
}
