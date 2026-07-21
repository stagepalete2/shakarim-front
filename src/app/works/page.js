import { Works } from "@/screens/works/works";
import { fetchWorks, fetchWorksCategories } from "@/lib/endpoints/works";

const title = "Шығармалары — Шәкәрім Құдайбердіұлы";
const description =
  "Произведения Шакарима Кудайбердиева: поэмы, философские труды, переводы, песни и кюи.";

export const metadata = {
  title,
  description,
  alternates: { canonical: "/works" },
  openGraph: { title, description, url: "/works" },
};

export default async function WorksPage() {
  const [works, categories] = await Promise.all([
    fetchWorks(),
    fetchWorksCategories(),
  ]);
  return <Works works={works} categories={categories} />;
}
