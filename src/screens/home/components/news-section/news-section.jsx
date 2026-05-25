import { NewsCard } from "@/components/ui/news-card/news-card";
import { SectionHeader } from "@/components/ui/section-header/section-header";
import styles from "./news-section.module.scss";

export function NewsSection({ items = [], allHref = "/news" }) {
  return (
    <section className={styles.section}>
      <SectionHeader
        title="Новости"
        allHref={allHref}
        allLabel="Все новости →"
      />

      <div className={styles.grid}>
        {items.map((item) => (
          <NewsCard
            key={item.id}
            title={item.title}
            author={item.author}
            date={item.date}
            image={item.image}
            imageAlt={item.imageAlt}
            href={item.href}
          />
        ))}
      </div>
    </section>
  );
}
