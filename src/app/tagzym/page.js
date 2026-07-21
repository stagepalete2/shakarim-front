import { Tagzym } from "@/screens/tagzym/tagzym";
import { fetchTagzym } from "@/lib/endpoints/pages";

const title = "Тағзым — Шәкәрім ізі";
const description =
  "Шәкәрім Құдайбердіұлының атымен аталған ұйымдар, көшелер мен марапаттар.";

export const metadata = {
  title,
  description,
  alternates: { canonical: "/tagzym" },
  openGraph: { title, description, url: "/tagzym" },
};

export default async function TagzymPage() {
  const data = await fetchTagzym();
  return <Tagzym data={data} />;
}
