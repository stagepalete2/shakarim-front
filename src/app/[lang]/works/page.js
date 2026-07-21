import { Works } from "@/screens/works/works";
import { fetchWorks, fetchWorksCategories } from "@/lib/endpoints/works";

const title = "Шығармалары — Шәкәрім Құдайбердіұлы";
const description =
  "Произведения Шакарима Кудайбердиева: поэмы, философские труды, переводы, песни и кюи.";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const path = `/${lang}/works`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path },
  };
}

export default async function WorksPage() {
  const [works, categories] = await Promise.all([
    fetchWorks(),
    fetchWorksCategories(),
  ]);
  return <Works works={works} categories={categories} />;
}
