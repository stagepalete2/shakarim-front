import { AuthorCard } from "@/components/ui/author-card/author-card";
import { SectionHeader } from "@/components/ui/section-header/section-header";
import { Slider } from "@/components/ui/slider/slider";
import styles from "./authors-section.module.scss";

export function AuthorsSection({ items = [], allHref = "#" }) {
  return (
    <section className={styles.section}>
      <SectionHeader
        title="Наши авторы"
        allHref={allHref}
        allLabel="Все авторы →"
      />

      <Slider>
        {items.map((author) => (
          <AuthorCard
            key={author.id}
            name={author.name}
            role={author.role}
            photo={author.photo}
            photoAlt={author.photoAlt}
            href={author.href}
          />
        ))}
      </Slider>
    </section>
  );
}
