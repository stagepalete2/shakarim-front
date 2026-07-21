import { Authors } from "@/screens/authors/authors";
import { fetchAuthors } from "@/lib/endpoints/authors";

const title = "Авторлар — Шәкәрім";
const description =
  "Шәкәрім мұрасын зерттеген ғалымдар, оның замандастары мен ұрпақтары — алфавиттік авторлар тізімі.";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const path = `/${lang}/authors`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path },
  };
}

export default async function AuthorsPage() {
  const authors = await fetchAuthors();
  return <Authors authors={authors} />;
}
