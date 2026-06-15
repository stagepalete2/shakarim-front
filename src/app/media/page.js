import { Media } from "@/screens/media/media";
import { fetchMedia } from "@/lib/endpoints/pages";

export const metadata = {
  title: "Медиа — Шәкәрім",
  description:
    "Шәкәрім Құдайбердіұлына қатысты бейне дәрістер, деректі фильмдер, аудио және тарихи фотосуреттер каталогы.",
};

export default async function MediaPage() {
  const media = await fetchMedia();
  return <Media media={media} />;
}
