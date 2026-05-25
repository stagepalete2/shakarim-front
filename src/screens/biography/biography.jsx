import { BIO } from "@/lib/biography";
import { BioHero } from "./components/bio-hero/bio-hero";
import { BioChronology } from "./components/bio-chronology/bio-chronology";
import { BioEnvironment } from "./components/bio-environment/bio-environment";
import { BioFamilyTree } from "./components/bio-family-tree/bio-family-tree";
import { BioMemories } from "./components/bio-memories/bio-memories";
import { BioDescendants } from "./components/bio-descendants/bio-descendants";
import { BioPolitical } from "./components/bio-political/bio-political";
import { BioIntellectual } from "./components/bio-intellectual/bio-intellectual";
import styles from "./biography.module.scss";

// Композиция страницы. Каждая секция принимает срез данных и сама
// возвращает null, если данных нет — чтобы порядок секций не менялся,
// а пустые блоки просто исчезали.
export function Biography({ bio = BIO }) {
  return (
    <main className={styles.page}>
      <BioHero data={bio.hero} />
      <BioChronology items={bio.chronology} />
      <BioEnvironment data={bio.environment} />
      <BioFamilyTree root={bio.familyTree?.root} />
      <BioMemories items={bio.memories} />
      <BioDescendants items={bio.descendants} />
      <BioPolitical data={bio.political} />
      <BioIntellectual data={bio.intellectual} />
    </main>
  );
}
