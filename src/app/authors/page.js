import { Authors } from "@/screens/authors/authors";
import { fetchAuthors } from "@/lib/endpoints/authors";

const title = "Авторлар — Шәкәрім";
const description =
  "Шәкәрім мұрасын зерттеген ғалымдар, оның замандастары мен ұрпақтары — алфавиттік авторлар тізімі.";

export const metadata = {
  title,
  description,
  alternates: { canonical: "/authors" },
  openGraph: { title, description, url: "/authors" },
};

export default async function AuthorsPage() {
  const authors = await fetchAuthors();
  return <Authors authors={authors} />;
}
