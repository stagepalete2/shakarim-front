import { Tagzym } from "@/screens/tagzym/tagzym";
import { fetchTagzym } from "@/lib/endpoints/pages";

export const metadata = {
  title: "Тағзым — Шәкәрім ізі",
  description:
    "Шәкәрім Құдайбердіұлының атымен аталған ұйымдар, көшелер мен марапаттар.",
};

export default async function TagzymPage() {
  const data = await fetchTagzym();
  return <Tagzym data={data} />;
}
