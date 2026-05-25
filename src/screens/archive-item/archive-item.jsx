import { ImageGallery } from "@/components/ui/image-gallery/image-gallery";
import { FileList } from "@/components/ui/file-list/file-list";
import { ArchiveItemHero } from "./components/archive-item-hero/archive-item-hero";
import { ArchiveItemBody } from "./components/archive-item-body/archive-item-body";
import { ArchiveTabs } from "./components/archive-tabs/archive-tabs";
import { RelatedArchive } from "./components/related-archive/related-archive";
import styles from "./archive-item.module.scss";

// Порядок секций:
//  1. Hero (обложка + breadcrumb + заголовок)
//  2. Body (краткое описание + факты)
//  3. Gallery — сканы/фото элемента (item.gallery), всегда наверху
//  4. Files  — PDF и др. файлы (item.files), всегда наверху
//  5. Tabs   — текстовые «прочтения»: Сипаттама / Транскрипт / Аударма
//             / Тарихи мәнмәтін и т.п. (категории приходят с бэкенда)
//  6. Related
export function ArchiveItem({ item, related = [] }) {
  const gallery = item.gallery ?? [];
  const files = item.files ?? [];
  const tabs = item.tabs ?? [];

  return (
    <main className={styles.page}>
      <ArchiveItemHero item={item} />

      <div className={styles.bodyWrap}>
        <ArchiveItemBody item={item} />
      </div>

      {gallery.length > 0 && (
        <div className={styles.galleryWrap}>
          <ImageGallery
            items={gallery}
            title="Сканер беттері"
            aspectRatio="1 / 1"
            showHoverHint
          />
        </div>
      )}

      {files.length > 0 && (
        <div className={styles.filesWrap}>
          <FileList items={files} title="Файлдар" />
        </div>
      )}

      {tabs.length > 0 && (
        <div className={styles.tabsWrap}>
          <ArchiveTabs tabs={tabs} />
        </div>
      )}

      {related.length > 0 && (
        <section className={styles.relatedWrap}>
          <RelatedArchive items={related} />
        </section>
      )}
    </main>
  );
}
