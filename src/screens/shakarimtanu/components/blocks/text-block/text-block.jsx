import { Prose } from "@/components/ui/prose/prose";
import styles from "./text-block.module.scss";

// Текстовый блок — HTML из CKEditor через ui/Prose.
// Prose сам ограничивает ширину 720px и центрирует.
export function TextBlock({ html, content }) {
  const body = html ?? content;
  if (!body) return null;
  return (
    <div className={styles.block}>
      <Prose html={body} />
    </div>
  );
}
