import { Biography } from "@/screens/biography/biography";
import { fetchBiography } from "@/lib/endpoints/pages";

export const metadata = {
  title: "Ғұмырнама — Шәкәрім Құдайбердіұлы",
  description:
    "Жизненный путь Шакарима Кудайбердиева: от рождения в Чингизских горах до посмертной реабилитации.",
};

export default async function BiographyPage() {
  const bio = await fetchBiography();
  return <Biography bio={bio} />;
}
