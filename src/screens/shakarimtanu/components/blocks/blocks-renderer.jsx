import { ImageGallery } from "@/components/ui/image-gallery/image-gallery";
import { FileList } from "@/components/ui/file-list/file-list";
import { TextBlock } from "./text-block/text-block";
import { QuoteBlock } from "./quote-block/quote-block";
import { ImageBlock } from "./image-block/image-block";
import { VideoBlock } from "./video-block/video-block";
import { PeopleBlock } from "./people-block/people-block";
import { StatsBlock } from "./stats-block/stats-block";
import { MilestonesBlock } from "./milestones-block/milestones-block";
import { ConceptsBlock } from "./concepts-block/concepts-block";
import styles from "./blocks-renderer.module.scss";

// Тонкая обёртка вокруг ui/ImageGallery с editorial-дефолтами для
// shakarimtanu (4:3 thumbs, подписи под миниатюрами).
function GalleryBlock(props) {
  return (
    <ImageGallery
      {...props}
      aspectRatio={props.aspectRatio ?? "4 / 3"}
      showCaptions={props.showCaptions ?? true}
    />
  );
}

// pdf-блок в данных приходит без явного `type` у элементов — fallback
// проставляем здесь, чтобы ui/FileList отрендерил их через PdfViewer.
function PdfBlock({ items = [], ...rest }) {
  const normalized = items.map((f) => ({ ...f, type: f.type ?? "pdf" }));
  return <FileList items={normalized} {...rest} />;
}

// Регистр: тип блока → компонент. Расширяется добавлением новой пары.
// Неизвестные типы тихо игнорируются — безопасно при выкатке нового
// типа на бэке до релиза фронта.
const REGISTRY = {
  text: TextBlock,
  quote: QuoteBlock,
  image: ImageBlock,
  gallery: GalleryBlock,
  video: VideoBlock,
  pdf: PdfBlock,
  people: PeopleBlock,
  stats: StatsBlock,
  milestones: MilestonesBlock,
  concepts: ConceptsBlock,
};

// Рендерит массив блоков из CMS. Каждый блок получает свой тип-компонент
// и собственные props (всё кроме `type`).
export function BlocksRenderer({ blocks = [] }) {
  if (blocks.length === 0) return null;
  return (
    <div className={styles.stack}>
      {blocks.map((block, i) => {
        const Comp = REGISTRY[block.type];
        if (!Comp) return null;
        const { type, ...rest } = block;
        return (
          <div key={i} className={styles.block} data-block-type={type}>
            <Comp {...rest} />
          </div>
        );
      })}
    </div>
  );
}
