"use client";

import { LocaleLink as Link } from "@/components/ui/locale-link/locale-link";
import { useState } from "react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs/breadcrumbs";
import { PdfEmbed } from "@/components/ui/pdf-embed/pdf-embed";
import { Prose } from "@/components/ui/prose/prose";
import { ImageGallery } from "@/components/ui/image-gallery/image-gallery";
import { Tabs } from "@/components/ui/tabs/tabs";
import { workHref } from "@/lib/works";
import { getVideoEmbedUrl } from "@/lib/media";
import { useTranslations } from "@/components/providers/language-provider";
import styles from "./work-item.module.scss";

// Содержимое присутствует, если строка не пустая и не плейсхолдер "-".
const hasText = (s) => typeof s === "string" && s.trim() && s.trim() !== "-";
// Грубая проверка: внутри строки есть HTML-теги (CKEditor) или это обычный текст.
const hasHtml = (s) => /<\/?[a-z][\s\S]*>/i.test(s ?? "");

// Тело произведения: HTML рендерим через Prose, иначе — текст с переносами строк.
function WorkBody({ value }) {
  if (hasHtml(value)) return <Prose html={value} />;
  return <p className={styles.verse}>{value}</p>;
}

function InfoPanel({ work }) {
  const t = useTranslations();
  return (
    <div className={styles.info}>
      <dl className={styles.facts}>
        <div className={styles.fact}>
          <dt className={styles.factLabel}>{t("works.genre")}</dt>
          <dd className={styles.factValue}>{work.category}</dd>
        </div>
        {work.year && (
          <div className={styles.fact}>
            <dt className={styles.factLabel}>{t("works.year")}</dt>
            <dd className={styles.factValue}>{work.year}</dd>
          </div>
        )}
        <div className={styles.fact}>
          <dt className={styles.factLabel}>{t("works.author")}</dt>
          <dd className={styles.factValue}>Шәкәрім Құдайбердіұлы</dd>
        </div>
        {work.file?.size && (
          <div className={styles.fact}>
            <dt className={styles.factLabel}>PDF</dt>
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
            {work.tags.map((tag) => (
              <li key={tag} className={styles.tag}>
                {tag}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function CommentariesPanel({ items }) {
  return (
    <div className={styles.commentaries}>
      {items.map((c, i) => (
        <article key={i} className={styles.commentary}>
          <Prose html={c.body} />
          {c.author && <p className={styles.commentAuthor}>— {c.author}</p>}
        </article>
      ))}
    </div>
  );
}

function GlossaryPanel({ items }) {
  return (
    <dl className={styles.glossary}>
      {items.map((g, i) => (
        <div key={i} className={styles.glossaryRow}>
          <dt className={styles.glossaryTerm}>{g.word}</dt>
          <dd className={styles.glossaryDef}>
            {hasHtml(g.definition) ? (
              <Prose html={g.definition} />
            ) : (
              <p>{g.definition}</p>
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}

function MediaPanel({ work }) {
  const embed = work.video_url ? getVideoEmbedUrl(work.video_url) : null;
  return (
    <div className={styles.mediaStack}>
      {work.gallery?.length > 0 && (
        <ImageGallery items={work.gallery} aspectRatio="3 / 2" showCaptions />
      )}

      {embed && (
        <div className={styles.videoEmbed}>
          <iframe
            src={embed}
            title={work.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}

      {work.audio && (
        <audio className={styles.audio} controls src={work.audio} />
      )}
    </div>
  );
}

function ContentPanel({ work }) {
  const t = useTranslations();
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
          {t("common.openNewTab")}
        </a>
        <a href={work.file.url} download className={styles.actionLink}>
          {t("common.download")}
        </a>
      </div>
    </div>
  );
}

export function WorkItem({ work, related = [] }) {
  const t = useTranslations();

  // Вкладки динамические — показываем только те, для которых есть данные.
  const tabs = [];
  if (hasText(work.body)) tabs.push({ id: "text", label: t("works.tabText") });
  tabs.push({ id: "info", label: t("works.tabInfo") });
  if (hasText(work.history))
    tabs.push({ id: "history", label: t("works.tabHistory") });
  if (hasText(work.textology))
    tabs.push({ id: "textology", label: t("works.tabTextology") });
  if (work.commentaries?.length > 0)
    tabs.push({ id: "commentaries", label: t("works.tabCommentaries") });
  if (work.glossary?.length > 0)
    tabs.push({ id: "glossary", label: t("works.tabGlossary") });
  if (work.gallery?.length > 0 || work.video_url || work.audio)
    tabs.push({ id: "media", label: t("works.tabMedia") });
  if (work.file?.url)
    tabs.push({ id: "content", label: t("works.tabContent") });

  const [activeTab, setActiveTab] = useState(null);
  const active =
    activeTab && tabs.some((x) => x.id === activeTab)
      ? activeTab
      : (tabs[0]?.id ?? "info");

  const breadcrumbs = [
    { label: t("common.home"), href: "/" },
    { label: t("pages.works"), href: "/works" },
    { label: work.title },
  ];

  return (
    <main className={styles.page}>
      {/* === Hero === */}
      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroBreadcrumbs}>
            <Breadcrumbs items={breadcrumbs} className="onLight" />
          </div>

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
        </div>
      </header>

      {/* === Tabs + панель === */}
      <div className={styles.tabsWrap}>
        <Tabs
          tabs={tabs}
          activeId={active}
          onChange={setActiveTab}
          idPrefix="work"
          ariaLabel={t("pages.works")}
        />

        <section
          key={active}
          id={`work-panel-${active}`}
          role="tabpanel"
          aria-labelledby={`work-tab-${active}`}
          className={styles.panel}
        >
          {active === "text" && (
            <div className={styles.prose}>
              <WorkBody value={work.body} />
            </div>
          )}
          {active === "info" && <InfoPanel work={work} />}
          {active === "history" && (
            <div className={styles.prose}>
              <Prose html={work.history} />
            </div>
          )}
          {active === "textology" && (
            <div className={styles.prose}>
              <Prose html={work.textology} />
            </div>
          )}
          {active === "commentaries" && (
            <CommentariesPanel items={work.commentaries} />
          )}
          {active === "glossary" && <GlossaryPanel items={work.glossary} />}
          {active === "media" && <MediaPanel work={work} />}
          {active === "content" && <ContentPanel work={work} />}
        </section>
      </div>

      {/* === Похожие === */}
      {related.length > 0 && (
        <section className={styles.related} aria-labelledby="related-title">
          <header className={styles.relatedHead}>
            <h2 id="related-title" className={styles.relatedTitle}>
              {t("works.related")}
            </h2>
            <Link href="/works" className={styles.relatedAll}>
              {t("common.seeAll")}
            </Link>
          </header>

          <ul className={styles.relatedGrid}>
            {related.map((r) => (
              <li key={r.id} className={styles.relatedCell}>
                <Link href={workHref(r.slug)} className={styles.relatedCard}>
                  <h3 className={styles.relatedName}>{r.title}</h3>
                  {r.year && <p className={styles.relatedYear}>{r.year}</p>}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
