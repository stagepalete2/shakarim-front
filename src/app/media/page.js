import { Media } from "@/screens/media/media";
import { fetchMedia } from "@/lib/endpoints/pages";

const title = "Медиа — Шәкәрім";
const description =
  "Шәкәрім Құдайбердіұлына қатысты бейне дәрістер, деректі фильмдер, аудио және тарихи фотосуреттер каталогы.";

export const metadata = {
  title,
  description,
  alternates: { canonical: "/media" },
  openGraph: { title, description, url: "/media" },
};

export default async function MediaPage() {
  const media = await fetchMedia();
  return <Media media={media} />;
}
