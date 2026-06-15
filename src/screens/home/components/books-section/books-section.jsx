import { BookCard } from "@/components/ui/book-card/book-card";
import { SectionHeader } from "@/components/ui/section-header/section-header";
import { Slider } from "@/components/ui/slider/slider";
import styles from "./books-section.module.scss";

export function BooksSection({ items = [], allHref = "#", title = "Библиотека" }) {
  return (
    <section className={styles.section}>
      <SectionHeader
        title={title}
        allHref={allHref}
        allLabel="Все книги →"
      />

      <Slider>
        {items.map((book) => (
          <BookCard
            key={book.id}
            title={book.title}
            author={book.author}
            cover={book.cover}
            coverAlt={book.coverAlt}
            href={book.href}
          />
        ))}
      </Slider>
    </section>
  );
}
