import { Breadcrumbs } from "@/components/ui/breadcrumbs/breadcrumbs";
import { Image } from "@/components/ui/image/image";
import { formatDate } from "@/lib/date";
import styles from "./article-hero.module.scss";

export function ArticleHero({ article }) {
  const breadcrumbs = [
    { label: "Главная", href: "/" },
    { label: "Биография", href: "/biography" },
    { label: article.title },
  ];

  return (
    <header className={styles.hero}>
      <div className={styles.cover} aria-hidden="true">
        {article.cover && (
          <Image
            src={article.cover}
            alt=""
            className={styles.coverImg}
          />
        )}
      </div>

      <div className={styles.inner}>
        <div className={styles.top}>
          <Breadcrumbs items={breadcrumbs} />
        </div>

        <div className={styles.titleBlock}>
          {article.tags && article.tags.length > 0 && (
            <ul className={styles.tags}>
              {article.tags.map((tag) => (
                <li key={tag} className={styles.tag}>
                  {tag}
                </li>
              ))}
            </ul>
          )}

          <h1 className={styles.title}>{article.title}</h1>

          <div className={styles.meta}>
            {article.author && (
              <span className={styles.author}>{article.author}</span>
            )}
            {article.date && (
              <time
                className={styles.date}
                dateTime={String(article.date)}
              >
                {formatDate(article.date)}
              </time>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
