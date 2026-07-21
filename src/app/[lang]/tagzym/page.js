import { Tagzym } from "@/screens/tagzym/tagzym";
import { fetchTagzym } from "@/lib/endpoints/pages";

const title = "Тағзым — Шәкәрім ізі";
const description =
  "Шәкәрім Құдайбердіұлының атымен аталған ұйымдар, көшелер мен марапаттар.";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const path = `/${lang}/tagzym`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path },
  };
}

export default async function TagzymPage() {
  const data = await fetchTagzym();
  return <Tagzym data={data} />;
}
