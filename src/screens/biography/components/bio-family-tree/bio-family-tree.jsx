"use client";

import { useState } from "react";
import { Image } from "@/components/ui/image/image";
import styles from "./bio-family-tree.module.scss";

// Рекурсивный узел дерева. Состояние «развёрнут / свёрнут» хранится
// локально, чтобы любая ветка могла независимо раскрываться без
// центрального стейта (CMS-структура может быть произвольной глубины).
function TreeNode({ node, defaultOpen = false, depth = 0 }) {
  const [open, setOpen] = useState(defaultOpen);
  const hasChildren = (node.children?.length ?? 0) > 0;

  return (
    <li className={styles.node}>
      <article className={`${styles.card} ${open ? styles.cardOpen : ""}`}>
        {node.portrait && (
          <div className={styles.portrait}>
            <Image
              src={node.portrait}
              alt={node.name ?? ""}
              className={styles.portraitImg}
              loading="lazy"
            />
          </div>
        )}
        <div className={styles.body}>
          {node.relation && (
            <span className={styles.relation}>{node.relation}</span>
          )}
          {node.name && <h4 className={styles.name}>{node.name}</h4>}
          {node.description && (
            <p className={styles.desc}>{node.description}</p>
          )}
          {hasChildren && (
            <button
              type="button"
              className={styles.toggle}
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
            >
              <span>
                {open ? "Свернуть" : "Көрсету"}
                {" "}
                ({node.children.length})
              </span>
              <svg
                viewBox="0 0 24 24"
                width="14"
                height="14"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={open ? styles.toggleIconOpen : styles.toggleIcon}
                aria-hidden="true"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
          )}
        </div>
      </article>

      {hasChildren && open && (
        <ul className={`${styles.children} ${styles[`depth-${depth + 1}`]}`}>
          {node.children.map((child, i) => (
            <TreeNode
              key={`${child.name}-${i}`}
              node={child}
              depth={depth + 1}
              defaultOpen={depth + 1 < 2}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

export function BioFamilyTree({
  root,
  eyebrow = "Шежіре",
  title = "Әулет",
}) {
  if (!root) return null;

  return (
    <section className={styles.section} aria-labelledby="bio-tree-title">
      <header className={styles.head}>
        <span className={styles.eyebrow}>{eyebrow}</span>
        <h2 id="bio-tree-title" className={styles.title}>
          {title}
        </h2>
      </header>

      <ul className={styles.tree}>
        <TreeNode node={root} defaultOpen depth={0} />
      </ul>
    </section>
  );
}
