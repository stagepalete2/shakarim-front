import { Biography } from "@/screens/biography/biography";
import { fetchBiography } from "@/lib/endpoints/pages";
import { getLang } from "@/lib/i18n/server";
import { JsonLd } from "@/components/seo/json-ld";
import { shakarimPersonSchema } from "@/lib/seo-schemas";

const title = "Ғұмырнама — Шәкәрім Құдайбердіұлы";
const description =
  "Жизненный путь Шакарима Кудайбердиева: от рождения в Чингизских горах до посмертной реабилитации.";

export const metadata = {
  title,
  description,
  alternates: { canonical: "/biography" },
  openGraph: { title, description, url: "/biography" },
};

export default async function BiographyPage() {
  const [bio, lang] = await Promise.all([fetchBiography(), getLang()]);
  return (
    <>
      <JsonLd data={shakarimPersonSchema(lang)} />
      <Biography bio={bio} />
    </>
  );
}
