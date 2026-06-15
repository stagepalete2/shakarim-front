import { Works } from "@/screens/works/works";
import { fetchWorks, fetchWorksCategories } from "@/lib/endpoints/works";

export const metadata = {
  title: "Шығармалары — Шәкәрім Құдайбердіұлы",
  description:
    "Произведения Шакарима Кудайбердиева: поэмы, философские труды, переводы, песни и кюи.",
};

export default async function WorksPage() {
  const [works, categories] = await Promise.all([
    fetchWorks(),
    fetchWorksCategories(),
  ]);
  return <Works works={works} categories={categories} />;
}
