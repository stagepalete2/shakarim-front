import { Prose } from "@/components/ui/prose/prose";
import { ArticleHero } from "./components/article-hero/article-hero";
import { RelatedArticles } from "./components/related-articles/related-articles";
import styles from "./article.module.scss";

export function Article({ article, related = [] }) {
  return (
    <main className={styles.page}>
      <ArticleHero article={article} />

      <div className={styles.bodyWrap}>
        <Prose html={article.body} />
      </div>

      {related.length > 0 && (
        <section className={styles.relatedWrap}>
          <RelatedArticles items={related} />
        </section>
      )}
    </main>
  );
}
