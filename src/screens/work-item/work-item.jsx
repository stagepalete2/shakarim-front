"use client";

import Link from "next/link";
import { useState } from "react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs/breadcrumbs";
import { Image } from "@/components/ui/image/image";
import { PdfEmbed } from "@/components/ui/pdf-embed/pdf-embed";
import { Tabs } from "@/components/ui/tabs/tabs";
import { workHref } from "@/lib/works";
import styles from "./work-item.module.scss";

// Табы детальной страницы — две вкладки:
//  • info    — описание, метаданные, теги, цитата
//  • content — PDF-просмотрщик (если file задан) или заглушка
const WORK_TABS = [
  { id: "info", label: "Сипаттама" },
  { id: "content", label: "Контент" },
];

function InfoPanel({ work }) {
  return (
    <div className={styles.info}>
      {work.description && (
        <p className={styles.lead}>{work.description}</p>
      )}

      <dl className={styles.facts}>
        <div className={styles.fact}>
          <dt className={styles.factLabel}>Жанры</dt>
          <dd className={styles.factValue}>{work.category}</dd>
        </div>
        {work.year && (
          <div className={styles.fact}>
            <dt className={styles.factLabel}>Жылы</dt>
            <dd className={styles.factValue}>{work.year}</dd>
          </div>
        )}
        <div className={styles.fact}>
          <dt className={styles.factLabel}>Авторы</dt>
          <dd className={styles.factValue}>Шәкәрім Құдайбердіұлы</dd>
        </div>
        {work.file?.size && (
          <div className={styles.fact}>
            <dt className={styles.factLabel}>PDF өлшемі</dt>
            <dd className={styles.factValue}>{work.file.size}</dd>
          </div>
        )}
      </dl>

      {work.excerpt && (
        <blockquote className={styles.excerpt}>
          <p className={styles.excerptText}>«{work.excerpt}»</p>
          <cite className={styles.excerptAttr}>— Шәкәрім</cite>
        </blockquote>
      )}

      {work.tags?.length > 0 && (
        <div className={styles.tagsBlock}>
          <span className={styles.tagsLabel}>Тегтер</span>
          <ul className={styles.tags}>
            {work.tags.map((t) => (
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

function ContentPanel({ work }) {
  if (!work.file?.url) {
    return (
      <div className={styles.contentEmpty}>
        <p className={styles.contentEmptyText}>
          Бұл шығарманың цифрлық нұсқасы әзірге қол жетімсіз.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.content}>
      <PdfEmbed url={work.file.url} title={work.title} />

      <div className={styles.contentActions}>
        <a
          href={work.file.url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.actionLink}
        >
          Жаңа қойындыда ашу
        </a>
        <a
          href={work.file.url}
          download
          className={styles.actionLink}
        >
          Жүктеп алу
        </a>
      </div>
    </div>
  );
}

export function WorkItem({ work, related = [] }) {
  const [activeTab, setActiveTab] = useState(WORK_TABS[0].id);

  const breadcrumbs = [
    { label: "Главная", href: "/" },
    { label: "Шығармалары", href: "/works" },
    { label: work.title },
  ];

  return (
    <main className={styles.page}>
      {/* === Hero: 2-кол с book-обложкой === */}
      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroBreadcrumbs}>
            <Breadcrumbs items={breadcrumbs} className="onLight" />
          </div>

          <div className={styles.heroBody}>
            <div className={styles.heroText}>
              {work.category && (
                <span className={styles.eyebrow}>{work.category}</span>
              )}
              <h1 className={styles.title}>{work.title}</h1>
              {work.year && <p className={styles.year}>{work.year}</p>}
              {work.description && (
                <p className={styles.lead}>{work.description}</p>
              )}
              <hr className={styles.divider} aria-hidden="true" />
            </div>

            <div className={styles.coverWrap}>
              {work.cover && (
                <Image
                  src={work.cover}
                  alt={work.title ?? ""}
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
          tabs={WORK_TABS}
          activeId={activeTab}
          onChange={setActiveTab}
          idPrefix="work"
          ariaLabel="Шығарма бөлімдері"
        />

        <section
          key={activeTab}
          id={`work-panel-${activeTab}`}
          role="tabpanel"
          aria-labelledby={`work-tab-${activeTab}`}
          className={styles.panel}
        >
          {activeTab === "info" && <InfoPanel work={work} />}
          {activeTab === "content" && <ContentPanel work={work} />}
        </section>
      </div>

      {/* === Похожие === */}
      {related.length > 0 && (
        <section className={styles.related} aria-labelledby="related-title">
          <header className={styles.relatedHead}>
            <h2 id="related-title" className={styles.relatedTitle}>
              Ұқсас шығармалар
            </h2>
            <Link href="/works" className={styles.relatedAll}>
              Барлығына →
            </Link>
          </header>

          <ul className={styles.relatedGrid}>
            {related.map((r) => (
              <li key={r.id} className={styles.relatedCell}>
                <Link href={workHref(r.slug)} className={styles.relatedCard}>
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
                    {r.year && (
                      <p className={styles.relatedYear}>{r.year}</p>
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
