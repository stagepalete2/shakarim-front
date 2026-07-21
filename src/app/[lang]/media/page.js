import { Media } from "@/screens/media/media";
import { fetchMedia } from "@/lib/endpoints/pages";

const title = "Медиа — Шәкәрім";
const description =
  "Шәкәрім Құдайбердіұлына қатысты бейне дәрістер, деректі фильмдер, аудио және тарихи фотосуреттер каталогы.";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const path = `/${lang}/media`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path },
  };
}

export default async function MediaPage() {
  const media = await fetchMedia();
  return <Media media={media} />;
}
