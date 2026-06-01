"use client";

import Link from "next/link";
import { useState } from "react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs/breadcrumbs";
import { Image } from "@/components/ui/image/image";
import { PdfEmbed } from "@/components/ui/pdf-embed/pdf-embed";
import { Tabs } from "@/components/ui/tabs/tabs";
import { bookHref } from "@/lib/books";
import styles from "./book-item.module.scss";

const BOOK_TABS = [
  { id: "info", label: "Сипаттама" },
  { id: "content", label: "Контент" },
];

function InfoPanel({ book }) {
  return (
    <div className={styles.info}>
      {book.description && (
        <p className={styles.lead}>{book.description}</p>
      )}

      <dl className={styles.facts}>
        {book.author && (
          <div className={styles.fact}>
            <dt className={styles.factLabel}>Авторы</dt>
            <dd className={styles.factValue}>{book.author}</dd>
          </div>
        )}
        {book.year && (
          <div className={styles.fact}>
            <dt className={styles.factLabel}>Жылы</dt>
            <dd className={styles.factValue}>{book.year}</dd>
          </div>
        )}
        {book.category && (
          <div className={styles.fact}>
            <dt className={styles.factLabel}>Категория</dt>
            <dd className={styles.factValue}>{book.category}</dd>
          </div>
        )}
        {book.file?.size && (
          <div className={styles.fact}>
            <dt className={styles.factLabel}>PDF өлшемі</dt>
            <dd className={styles.factValue}>{book.file.size}</dd>
          </div>
        )}
      </dl>

      {book.tags?.length > 0 && (
        <div className={styles.tagsBlock}>
          <span className={styles.tagsLabel}>Тегтер</span>
          <ul className={styles.tags}>
            {book.tags.map((t) => (
              <li key={t} className={styles.tag}>
                {t}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function ContentPanel({ book }) {
  if (!book.file?.url) {
    return (
      <div className={styles.contentEmpty}>
        <p className={styles.contentEmptyText}>
          Бұл кітаптың цифрлық нұсқасы әзірге қол жетімсіз.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.content}>
      <PdfEmbed url={book.file.url} title={book.title} />

      <div className={styles.contentActions}>
        <a
          href={book.file.url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.actionLink}
        >
          Жаңа қойындыда ашу
        </a>
        <a
          href={book.file.url}
          download
          className={styles.actionLink}
        >
          Жүктеп алу
        </a>
      </div>
    </div>
  );
}

export function BookItem({ book, related = [] }) {
  const [activeTab, setActiveTab] = useState(BOOK_TABS[0].id);

  const breadcrumbs = [
    { label: "Главная", href: "/" },
    { label: "Кітап әлемі", href: "/books" },
    { label: book.title },
  ];

  return (
    <main className={styles.page}>
      {/* === Hero === */}
      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroBreadcrumbs}>
            <Breadcrumbs items={breadcrumbs} className="onLight" />
          </div>

          <div className={styles.heroBody}>
            <div className={styles.heroText}>
              {book.category && (
                <span className={styles.eyebrow}>{book.category}</span>
              )}
              <h1 className={styles.title}>{book.title}</h1>
              <div className={styles.byline}>
                {book.author && (
                  <span className={styles.author}>{book.author}</span>
                )}
                {book.year && (
                  <>
                    {book.author && <span aria-hidden="true">·</span>}
                    <span className={styles.year}>{book.year}</span>
                  </>
                )}
              </div>
              {book.description && (
                <p className={styles.lead}>{book.description}</p>
              )}
              <hr className={styles.divider} aria-hidden="true" />
            </div>

            <div className={styles.coverWrap}>
              {book.cover && (
                <Image
                  src={book.cover}
                  alt={book.title ?? ""}
                  className={styles.cover}
                  loading="eager"
                />
              )}
              <div className={styles.coverFrame} aria-hidden="true" />
            </div>
          </div>
        </div>
      </header>

      {/* === Tabs + панель === */}
      <div className={styles.tabsWrap}>
        <Tabs
          tabs={BOOK_TABS}
          activeId={activeTab}
          onChange={setActiveTab}
          idPrefix="book"
          ariaLabel="Кітап бөлімдері"
        />

        <section
          key={activeTab}
          id={`book-panel-${activeTab}`}
          role="tabpanel"
          aria-labelledby={`book-tab-${activeTab}`}
          className={styles.panel}
        >
          {activeTab === "info" && <InfoPanel book={book} />}
          {activeTab === "content" && <ContentPanel book={book} />}
        </section>
      </div>

      {/* === Похожие === */}
      {related.length > 0 && (
        <section className={styles.related} aria-labelledby="related-title">
          <header className={styles.relatedHead}>
            <h2 id="related-title" className={styles.relatedTitle}>
              Ұқсас кітаптар
            </h2>
            <Link href="/books" className={styles.relatedAll}>
              Барлығына →
            </Link>
          </header>

          <ul className={styles.relatedGrid}>
            {related.map((r) => (
              <li key={r.id} className={styles.relatedCell}>
                <Link href={bookHref(r.slug)} className={styles.relatedCard}>
                  <div className={styles.relatedCoverWrap}>
                    {r.cover && (
                      <Image
                        src={r.cover}
                        alt={r.title}
                        className={styles.relatedCover}
                        loading="lazy"
                      />
                    )}
                  </div>
                  <div className={styles.relatedBody}>
                    <h3 className={styles.relatedName}>{r.title}</h3>
                    {r.author && (
                      <p className={styles.relatedAuthor}>{r.author}</p>
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
