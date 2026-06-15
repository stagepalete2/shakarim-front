import { Authors } from "@/screens/authors/authors";
import { fetchAuthors } from "@/lib/endpoints/authors";

export const metadata = {
  title: "Авторлар — Шәкәрім",
  description:
    "Шәкәрім мұрасын зерттеген ғалымдар, оның замандастары мен ұрпақтары — алфавиттік авторлар тізімі.",
};

export default async function AuthorsPage() {
  const authors = await fetchAuthors();
  return <Authors authors={authors} />;
}
