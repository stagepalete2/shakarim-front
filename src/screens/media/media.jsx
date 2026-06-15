"use client";

import { useState } from "react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs/breadcrumbs";
import { ImageGallery } from "@/components/ui/image-gallery/image-gallery";
import { SectionHeader } from "@/components/ui/section-header/section-header";
import { Tabs } from "@/components/ui/tabs/tabs";
import { MEDIA_TABS } from "@/lib/media";
import { useTranslations } from "@/components/providers/language-provider";
import { AudioList } from "./components/audio-list/audio-list";
import { VideoGrid } from "./components/video-grid/video-grid";
import styles from "./media.module.scss";

// Рендер активной секции по типу таба.
function ActivePanel({ tabId, media }) {
  switch (tabId) {
    case "videos":
      return <VideoGrid items={media.videos ?? []} />;
    case "films":
      return <VideoGrid items={media.films ?? []} />;
    case "audio":
      return <AudioList items={media.audio ?? []} />;
    case "photos":
      // Instagram-стиль: квадратные миниатюры с подписями + lightbox.
      // ImageGallery умеет читать `description` в lightbox-подвале.
      return (
        <ImageGallery
          items={(media.photos ?? []).map((p) => ({
            src: p.src,
            caption: p.title,
            description: [p.year, p.author, p.description]
              .filter(Boolean)
              .join(" · "),
          }))}
          aspectRatio="1 / 1"
          showCaptions
          showHoverHint
        />
      );
    default:
      return null;
  }
}

// media — { videos, films, audio, photos } (с сервера).
export function Media({ media = {} }) {
  const t = useTranslations();
  const [activeTab, setActiveTab] = useState(MEDIA_TABS[0]?.id ?? "videos");
  const activeMeta = MEDIA_TABS.find((tab) => tab.id === activeTab);

  const breadcrumbs = [
    { label: t("common.home"), href: "/" },
    { label: t("pages.media") },
  ];

  return (
    <main className={styles.page}>
      <div className={styles.head}>
        <Breadcrumbs items={breadcrumbs} className="onLight" />
        <SectionHeader title={t("pages.media")} />
      </div>

      <Tabs
        tabs={MEDIA_TABS}
        activeId={activeTab}
        onChange={setActiveTab}
        idPrefix="media"
        ariaLabel="Медиа бөлімдері"
      />

      <section
        id={`media-panel-${activeTab}`}
        role="tabpanel"
        aria-labelledby={`media-tab-${activeTab}`}
        className={styles.panel}
        // key=activeTab перезапускает анимацию + сбрасывает scroll/state
        // дочерних компонентов между табами.
        key={activeTab}
      >
        {activeMeta?.longLabel && (
          <header className={styles.panelHead}>
            <span className={styles.panelNumber}>{activeMeta.number}</span>
            <h2 className={styles.panelTitle}>{activeMeta.longLabel}</h2>
          </header>
        )}

        <ActivePanel tabId={activeTab} media={media} />
      </section>
    </main>
  );
}
