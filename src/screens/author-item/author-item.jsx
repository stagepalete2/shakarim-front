"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs/breadcrumbs";
import { Image } from "@/components/ui/image/image";
import { Prose } from "@/components/ui/prose/prose";
import { Tabs } from "@/components/ui/tabs/tabs";
import { authorHref } from "@/lib/authors";
import { useTranslations } from "@/components/providers/language-provider";
import styles from "./author-item.module.scss";

function BioPanel({ author }) {
  const t = useTranslations();
  // Если fullBio задан (HTML) — Prose; иначе fallback на короткий bio.
  if (author.fullBio) {
    return (
      <div className={styles.bio}>
        <Prose html={author.fullBio} />
      </div>
    );
  }
  return (
    <div className={styles.bio}>
      {author.bio ? (
        <p className={styles.bioLead}>{author.bio}</p>
      ) : (
        <p className={styles.empty}>{t("authors.bioEmpty")}</p>
      )}
    </div>
  );
}

function WorksPanel({ author }) {
  const t = useTranslations();
  const works = author.works ?? [];
  if (works.length === 0) {
    return <p className={styles.empty}>{t("authors.worksEmpty")}</p>;
  }
  return (
    <ol className={styles.worksList}>
      {works.map((w, i) => (
        <li key={`${w.title}-${i}`} className={styles.workRow}>
          {w.year && <span className={styles.workYear}>{w.year}</span>}
          <div className={styles.workBody}>
            <span className={styles.workTitle}>{w.title}</span>
            {w.type && <span className={styles.workType}>{w.type}</span>}
          </div>
        </li>
      ))}
    </ol>
  );
}

function QuotesPanel({ author }) {
  const t = useTranslations();
  const quotes = author.quotes ?? [];
  if (quotes.length === 0) {
    return <p className={styles.empty}>{t("authors.quotesEmpty")}</p>;
  }
  return (
    <ul className={styles.quotesList}>
      {quotes.map((q, i) => (
        <li key={i} className={styles.quoteRow}>
          <figure className={styles.quote}>
            <span className={styles.quoteMark} aria-hidden="true">
              «
            </span>
            <blockquote className={styles.quoteText}>{q.text}</blockquote>
            {q.source && (
              <figcaption className={styles.quoteSource}>{q.source}</figcaption>
            )}
          </figure>
        </li>
      ))}
    </ul>
  );
}

export function AuthorItem({ author, related = [] }) {
  const t = useTranslations();
  // Динамически собираем табы — пустые секции (без данных) не показываем.
  const tabs = useMemo(() => {
    const list = [{ id: "bio", label: t("authors.tabBio") }];
    if (author.works?.length > 0) {
      list.push({ id: "works", label: t("authors.tabWorks") });
    }
    if (author.quotes?.length > 0) {
      list.push({ id: "quotes", label: t("authors.tabQuotes") });
    }
    return list;
  }, [author, t]);

  const [activeTab, setActiveTab] = useState("bio");
  const initial = author.name?.[0] ?? "?";

  const breadcrumbs = [
    { label: t("common.home"), href: "/" },
    { label: t("pages.authors"), href: "/authors" },
    { label: author.name },
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
            <div className={styles.portraitWrap}>
              {author.photo ? (
                <Image
                  src={author.photo}
                  alt={author.name ?? ""}
                  className={styles.portrait}
                  loading="eager"
                />
              ) : (
                <div className={styles.portraitFallback} aria-hidden="true">
                  <span>{initial}</span>
                </div>
              )}
            </div>

            <div className={styles.heroText}>
              {author.role && (
                <span className={styles.eyebrow}>{author.role}</span>
              )}
              <h1 className={styles.title}>{author.name}</h1>
              {author.years && <p className={styles.years}>{author.years}</p>}
              {author.bio && <p className={styles.lead}>{author.bio}</p>}
              {author.tags?.length > 0 && (
                <ul className={styles.tags}>
                  {author.tags.map((t) => (
                    <li key={t} className={styles.tag}>
                      {t}
                    </li>
                  ))}
                </ul>
              )}
              <hr className={styles.divider} aria-hidden="true" />
            </div>
          </div>
        </div>
      </header>

      {/* === Tabs === */}
      <div className={styles.tabsWrap}>
        <Tabs
          tabs={tabs}
          activeId={activeTab}
          onChange={setActiveTab}
          idPrefix="author"
          ariaLabel={t("pages.authors")}
        />

        <section
          key={activeTab}
          id={`author-panel-${activeTab}`}
          role="tabpanel"
          aria-labelledby={`author-tab-${activeTab}`}
          className={styles.panel}
        >
          {activeTab === "bio" && <BioPanel author={author} />}
          {activeTab === "works" && <WorksPanel author={author} />}
          {activeTab === "quotes" && <QuotesPanel author={author} />}
        </section>
      </div>

      {/* === Похожие авторы === */}
      {related.length > 0 && (
        <section className={styles.related} aria-labelledby="related-title">
          <header className={styles.relatedHead}>
            <h2 id="related-title" className={styles.relatedTitle}>
              {t("authors.related")}
            </h2>
            <Link href="/authors" className={styles.relatedAll}>
              {t("common.seeAll")}
            </Link>
          </header>

          <ul className={styles.relatedGrid}>
            {related.map((r) => (
              <li key={r.id} className={styles.relatedCell}>
                <Link href={authorHref(r.slug)} className={styles.relatedCard}>
                  <div className={styles.relatedPortraitWrap}>
                    {r.photo ? (
                      <Image
                        src={r.photo}
                        alt={r.name}
                        className={styles.relatedPortrait}
                        loading="lazy"
                      />
                    ) : (
                      <div className={styles.relatedPortraitFallback} aria-hidden="true">
                        <span>{r.name?.[0] ?? "?"}</span>
                      </div>
                    )}
                  </div>
                  <div className={styles.relatedBody}>
                    <h3 className={styles.relatedName}>{r.name}</h3>
                    {r.role && <p className={styles.relatedRole}>{r.role}</p>}
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
