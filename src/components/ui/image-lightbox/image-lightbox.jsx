"use client";

import { useCallback, useRef, useState } from "react";
import { useBodyScrollLock } from "@/hooks/use-body-scroll-lock";
import { useKeydown } from "@/hooks/use-keydown";
import styles from "./image-lightbox.module.scss";

const MIN_SCALE = 1;
const MAX_SCALE = 4;
const DOUBLE_TAP_SCALE = 2.5;
const DOUBLE_TAP_MS = 280;
const DOUBLE_TAP_PX = 30;
const TAP_THRESHOLD_PX = 8;
const SWIPE_NAV_PX = 80;
const SWIPE_VELOCITY = 0.5;

export function ImageLightbox({ items, startIndex = 0, onClose }) {
  const [index, setIndex] = useState(startIndex);
  const [scale, setScale] = useState(1);
  const [tx, setTx] = useState(0);
  const [ty, setTy] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false);

  const viewportRef = useRef(null);
  const pointersRef = useRef(new Map());
  const pinchStartRef = useRef(null);
  const panStartRef = useRef(null);
  const swipeStartRef = useRef(null);
  const lastTapRef = useRef(null);
  const transformRef = useRef({ scale: 1, tx: 0, ty: 0 });

  // Свежие значения трансформа без stale-closure.
  transformRef.current = { scale, tx, ty };

  const total = items.length;
  const current = items[index];

  const reset = useCallback(() => {
    setScale(1);
    setTx(0);
    setTy(0);
  }, []);

  const goPrev = useCallback(() => {
    setIndex((i) => (i - 1 + total) % total);
    reset();
  }, [total, reset]);

  const goNext = useCallback(() => {
    setIndex((i) => (i + 1) % total);
    reset();
  }, [total, reset]);

  useBodyScrollLock();
  useKeydown({
    Escape: () => onClose?.(),
    ArrowLeft: goPrev,
    ArrowRight: goNext,
  });

  const dist = (a, b) => Math.hypot(b.x - a.x, b.y - a.y);
  const mid = (a, b) => ({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 });

  // Зумирование вокруг точки (в координатах viewport относительно центра).
  const zoomAt = (newScale, anchorX, anchorY) => {
    const clamped = Math.min(MAX_SCALE, Math.max(MIN_SCALE, newScale));
    const k = clamped / transformRef.current.scale;
    const newTx =
      anchorX - (anchorX - transformRef.current.tx) * k;
    const newTy =
      anchorY - (anchorY - transformRef.current.ty) * k;
    setScale(clamped);
    setTx(newTx);
    setTy(newTy);
  };

  const handleDoubleTap = (clientX, clientY) => {
    if (transformRef.current.scale > 1) {
      reset();
      return;
    }
    const rect = viewportRef.current.getBoundingClientRect();
    const ax = clientX - rect.left - rect.width / 2;
    const ay = clientY - rect.top - rect.height / 2;
    zoomAt(DOUBLE_TAP_SCALE, ax, ay);
  };

  const onPointerDown = (e) => {
    e.preventDefault();
    viewportRef.current?.setPointerCapture(e.pointerId);
    pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    setIsInteracting(true);

    if (pointersRef.current.size === 2) {
      // Старт pinch.
      const [p1, p2] = [...pointersRef.current.values()];
      pinchStartRef.current = {
        dist: dist(p1, p2),
        scale: transformRef.current.scale,
        mid: mid(p1, p2),
        tx: transformRef.current.tx,
        ty: transformRef.current.ty,
      };
      panStartRef.current = null;
      swipeStartRef.current = null;
    } else if (pointersRef.current.size === 1) {
      if (transformRef.current.scale > 1) {
        // Pan при увеличении.
        panStartRef.current = {
          x: e.clientX,
          y: e.clientY,
          tx: transformRef.current.tx,
          ty: transformRef.current.ty,
        };
      } else {
        // Свайп для навигации.
        swipeStartRef.current = {
          x: e.clientX,
          y: e.clientY,
          time: performance.now(),
        };
      }
    }
  };

  const onPointerMove = (e) => {
    if (!pointersRef.current.has(e.pointerId)) return;
    pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (pointersRef.current.size === 2 && pinchStartRef.current) {
      const [p1, p2] = [...pointersRef.current.values()];
      const newDist = dist(p1, p2);
      const ratio = newDist / pinchStartRef.current.dist;
      const newScale = Math.min(
        MAX_SCALE,
        Math.max(MIN_SCALE, pinchStartRef.current.scale * ratio),
      );

      // Якорим масштабирование вокруг начального midpoint.
      const rect = viewportRef.current.getBoundingClientRect();
      const ax = pinchStartRef.current.mid.x - rect.left - rect.width / 2;
      const ay = pinchStartRef.current.mid.y - rect.top - rect.height / 2;
      const k = newScale / pinchStartRef.current.scale;
      setScale(newScale);
      setTx(ax - (ax - pinchStartRef.current.tx) * k);
      setTy(ay - (ay - pinchStartRef.current.ty) * k);
    } else if (pointersRef.current.size === 1) {
      if (panStartRef.current) {
        const dx = e.clientX - panStartRef.current.x;
        const dy = e.clientY - panStartRef.current.y;
        setTx(panStartRef.current.tx + dx);
        setTy(panStartRef.current.ty + dy);
      } else if (swipeStartRef.current) {
        const dx = e.clientX - swipeStartRef.current.x;
        setTx(dx); // визуальная обратная связь
      }
    }
  };

  const onPointerUp = (e) => {
    if (viewportRef.current?.hasPointerCapture(e.pointerId)) {
      viewportRef.current.releasePointerCapture(e.pointerId);
    }
    pointersRef.current.delete(e.pointerId);

    const remainingPointers = pointersRef.current.size;

    // Завершён ли swipe-жест (был при scale === 1).
    if (
      remainingPointers === 0 &&
      swipeStartRef.current &&
      transformRef.current.scale === 1
    ) {
      const dx = e.clientX - swipeStartRef.current.x;
      const dy = e.clientY - swipeStartRef.current.y;
      const dt = performance.now() - swipeStartRef.current.time;
      const horizontal = Math.abs(dx) > Math.abs(dy);
      const velocity = Math.abs(dx) / Math.max(dt, 1);

      if (
        horizontal &&
        (Math.abs(dx) > SWIPE_NAV_PX || velocity > SWIPE_VELOCITY)
      ) {
        if (dx > 0) goPrev();
        else goNext();
      } else {
        // Snap-back если свайп не сработал.
        setTx(0);
        // Tap-like → проверяем double-tap.
        if (
          Math.abs(dx) < TAP_THRESHOLD_PX &&
          Math.abs(dy) < TAP_THRESHOLD_PX
        ) {
          checkDoubleTap(e);
        }
      }
      swipeStartRef.current = null;
    } else if (
      remainingPointers === 0 &&
      panStartRef.current &&
      transformRef.current.scale > 1
    ) {
      const dx = e.clientX - panStartRef.current.x;
      const dy = e.clientY - panStartRef.current.y;
      // Tap-like при увеличенном → проверяем double-tap для зум-out.
      if (
        Math.abs(dx) < TAP_THRESHOLD_PX &&
        Math.abs(dy) < TAP_THRESHOLD_PX
      ) {
        checkDoubleTap(e);
      }
      panStartRef.current = null;
    }

    // Завершён ли pinch.
    if (remainingPointers < 2) {
      pinchStartRef.current = null;
    }

    // Если после pinch остался один палец — продолжаем с него pan.
    if (remainingPointers === 1 && transformRef.current.scale > 1) {
      const [remaining] = [...pointersRef.current.values()];
      panStartRef.current = {
        x: remaining.x,
        y: remaining.y,
        tx: transformRef.current.tx,
        ty: transformRef.current.ty,
      };
    }

    if (remainingPointers === 0) {
      setIsInteracting(false);
    }
  };

  const checkDoubleTap = (e) => {
    const now = performance.now();
    const last = lastTapRef.current;
    if (
      last &&
      now - last.time < DOUBLE_TAP_MS &&
      Math.hypot(e.clientX - last.x, e.clientY - last.y) < DOUBLE_TAP_PX
    ) {
      handleDoubleTap(e.clientX, e.clientY);
      lastTapRef.current = null;
    } else {
      lastTapRef.current = { time: now, x: e.clientX, y: e.clientY };
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose?.();
  };

  return (
    <div
      className={styles.root}
      role="dialog"
      aria-modal="true"
      aria-label="Сурет көрсету"
    >
      <div
        className={styles.backdrop}
        onClick={handleBackdropClick}
        aria-hidden="true"
      />

      <header className={styles.top}>
        <span className={styles.counter}>
          {index + 1} / {total}
        </span>
        <button
          type="button"
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Жабу"
        >
          <svg
            viewBox="0 0 24 24"
            width="22"
            height="22"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </header>

      <div
        ref={viewportRef}
        className={styles.viewport}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <img
          src={current.src}
          alt={current.caption ?? ""}
          className={styles.image}
          draggable={false}
          style={{
            transform: `translate(${tx}px, ${ty}px) scale(${scale})`,
            transition: isInteracting ? "none" : "transform 0.25s ease",
            cursor: scale > 1 ? "grab" : "zoom-in",
          }}
        />
      </div>

      {total > 1 && (
        <>
          <button
            type="button"
            className={`${styles.navBtn} ${styles.navPrev}`}
            onClick={goPrev}
            aria-label="Алдыңғы"
          >
            <svg
              viewBox="0 0 24 24"
              width="22"
              height="22"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            className={`${styles.navBtn} ${styles.navNext}`}
            onClick={goNext}
            aria-label="Келесі"
          >
            <svg
              viewBox="0 0 24 24"
              width="22"
              height="22"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
        </>
      )}

      {current.caption && (
        <footer className={styles.caption}>{current.caption}</footer>
      )}

      <div className={styles.hint} aria-hidden="true">
        {scale === 1
          ? "Қос-түрту: үлкейту"
          : "Қос-түрту: бастапқы көлемге"}
      </div>
    </div>
  );
}
