"use client";

import styles from "./lang-switcher.module.scss";

export function LangSwitcher({
  languages,
  value,
  onChange,
  size = "md",
  className = "",
  "aria-label": ariaLabel = "Язык",
  ...rest
}) {
  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className={`${styles.root} ${styles[`size-${size}`]} ${className}`}
      {...rest}
    >
      {languages.map((lang) => {
        const isActive = lang.code === value;
        return (
          <button
            key={lang.code}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(lang.code)}
            className={`${styles.button} ${isActive ? styles.active : ""}`}
          >
            {lang.label}
          </button>
        );
      })}
    </div>
  );
}
