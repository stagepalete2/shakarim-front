"use client";

import { Children, useEffect, useRef, useState } from "react";
import styles from "./slider.module.scss";

export function Slider({
  children,
  autoPlay = true,
  interval = 5000,
  itemsPerView,
  prevLabel = "Назад",
  nextLabel = "Вперёд",
  className = "",
}) {
  const items = Children.toArray(children);
  const total = items.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const trackRef = useRef(null);

  const goTo = (i) => {
    if (total === 0) return;
    setIndex(((i % total) + total) % total);
  };

  // Скроллим контейнер так, чтобы активная карточка пришла к левому краю.
  useEffect(() => {
    const track = trackRef.current;
    const child = track?.children[index];
    if (!track || !child) return;
    track.scrollTo({ left: child.offsetLeft, behavior: "smooth" });
  }, [index]);

  // Автопрокрутка, на hover/focus встаёт на паузу.
  useEffect(() => {
    if (!autoPlay || paused || total <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % total);
    }, interval);
    return () => clearInterval(id);
  }, [autoPlay, paused, interval, total]);

  return (
    <div
      className={`${styles.root} ${itemsPerView === 1 ? styles.oneAtTime : ""} ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div
        ref={trackRef}
        className={styles.track}
        role="region"
        aria-roledescription="карусель"
      >
        {items.map((item, i) => (
          <div key={i} className={styles.item} aria-roledescription="слайд">
            {item}
          </div>
        ))}
      </div>

      {total > 1 && (
        <>
          <button
            type="button"
            className={`${styles.arrow} ${styles.arrowPrev}`}
            aria-label={prevLabel}
            onClick={() => goTo(index - 1)}
          >
            <span aria-hidden="true">‹</span>
          </button>
          <button
            type="button"
            className={`${styles.arrow} ${styles.arrowNext}`}
            aria-label={nextLabel}
            onClick={() => goTo(index + 1)}
          >
            <span aria-hidden="true">›</span>
          </button>
        </>
      )}
    </div>
  );
}
