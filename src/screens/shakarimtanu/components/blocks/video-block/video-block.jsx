import styles from "./video-block.module.scss";

// Извлекаем video ID из стандартных URL форматов YouTube/Vimeo.
function getEmbedUrl(url) {
  if (!url) return null;
  // YouTube варианты: youtu.be/ID, youtube.com/watch?v=ID, /embed/ID
  const yt = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([\w-]{11})/,
  );
  if (yt) return `https://www.youtube.com/embed/${yt[1]}`;
  // Vimeo: vimeo.com/ID
  const vm = url.match(/vimeo\.com\/(\d+)/);
  if (vm) return `https://player.vimeo.com/video/${vm[1]}`;
  // Если уже embed URL — возвращаем как есть.
  return url;
}

export function VideoBlock({ url, title, caption, provider }) {
  const embed = getEmbedUrl(url);
  if (!embed) return null;

  return (
    <figure className={styles.figure}>
      <div className={styles.frame}>
        <iframe
          src={embed}
          title={title ?? "Бейне"}
          className={styles.iframe}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      {(caption || provider) && (
        <figcaption className={styles.caption}>
          {caption}
          {provider && <span className={styles.provider}> · {provider}</span>}
        </figcaption>
      )}
    </figure>
  );
}
