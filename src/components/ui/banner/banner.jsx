import styles from "./banner.module.scss";

export function Banner({
  src,
  poster,
  aspectRatio = "16 / 9",
  className = "",
  children,
  ...rest
}) {
  return (
    <div
      className={`${styles.banner} ${className}`}
      style={{ aspectRatio }}
      {...rest}
    >
      <video
        className={styles.video}
        src={src}
        poster={poster}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      />
      {children && <div className={styles.overlay}>{children}</div>}
    </div>
  );
}
