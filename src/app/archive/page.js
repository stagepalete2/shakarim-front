import { Archive } from "@/screens/archive/archive";
import { fetchArchive, fetchArchiveTypes } from "@/lib/endpoints/archive";

export const metadata = {
  title: "Архив және қолжазба — Шәкәрім",
  description:
    "Шәкәрім Құдайбердіұлының архивтік мұрасы: қолжазбалар, фотосуреттер, хаттар, аудио және бейне жазбалар.",
};

export default async function ArchivePage() {
  const [items, types] = await Promise.all([
    fetchArchive(),
    fetchArchiveTypes(),
  ]);
  return <Archive items={items} types={types} />;
}
