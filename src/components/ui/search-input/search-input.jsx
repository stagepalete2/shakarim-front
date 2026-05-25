import styles from "./search-input.module.scss";

export function SearchInput({
  value,
  onChange,
  onSubmit,
  placeholder = "Поиск",
  size = "md",
  className = "",
  "aria-label": ariaLabel,
  ...rest
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(value);
  };

  return (
    <form
      role="search"
      onSubmit={handleSubmit}
      className={`${styles.root} ${styles[`size-${size}`]} ${className}`}
      {...rest}
    >
      <span className={styles.icon} aria-hidden="true">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="7" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </span>
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={ariaLabel ?? placeholder}
        className={styles.input}
      />
    </form>
  );
}
