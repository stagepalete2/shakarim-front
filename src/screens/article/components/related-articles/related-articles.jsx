import { ArticleCard } from "@/components/ui/article-card/article-card";
import { SectionHeader } from "@/components/ui/section-header/section-header";
import { articleHref } from "@/lib/articles";
import { getT } from "@/lib/i18n/server";
import styles from "./related-articles.module.scss";

export async function RelatedArticles({ items = [] }) {
  if (items.length === 0) return null;
  const t = await getT();

  return (
    <section className={styles.section}>
      <SectionHeader title={t("article.related")} />
      <div className={styles.grid}>
        {items.map((article) => (
          <ArticleCard
            key={article.id}
            title={article.title}
            cover={article.cover}
            tags={article.tags}
            author={article.author}
            date={article.date}
            href={articleHref(article.slug)}
          />
        ))}
      </div>
    </section>
  );
}
