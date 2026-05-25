import styles from "./burger-button.module.scss";

export function BurgerButton({
  isOpen,
  onClick,
  className = "",
  "aria-label": ariaLabel,
  "aria-controls": ariaControls,
  ...rest
}) {
  const label = ariaLabel ?? (isOpen ? "Закрыть меню" : "Открыть меню");

  return (
    <button
      type="button"
      aria-label={label}
      aria-expanded={isOpen}
      aria-controls={ariaControls}
      onClick={onClick}
      className={`${styles.button} ${isOpen ? styles.open : ""} ${className}`}
      {...rest}
    >
      <span />
      <span />
      <span />
    </button>
  );
}
