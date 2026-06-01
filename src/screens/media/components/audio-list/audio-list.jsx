"use client";

import { useEffect, useRef, useState } from "react";
import { Image } from "@/components/ui/image/image";
import styles from "./audio-list.module.scss";

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <rect x="6" y="5" width="4" height="14" rx="1" />
      <rect x="14" y="5" width="4" height="14" rx="1" />
    </svg>
  );
}

// === Один трек (Spotify-row) ===
function AudioItem({ item, index, isPlaying, isCurrent, onToggle, onSeek, currentTime, duration }) {
  const progressPct = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleProgressClick = (e) => {
    if (!isCurrent || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    onSeek?.(ratio * duration);
  };

  return (
    <li className={`${styles.row} ${isCurrent ? styles.rowActive : ""}`}>
      <button
        type="button"
        className={styles.playBtn}
        onClick={() => onToggle(item)}
        aria-label={isPlaying ? `${item.title} — кідірту` : `${item.title} — ойнату`}
      >
        <span className={styles.index} aria-hidden="true">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className={styles.playIcon} aria-hidden="true">
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </span>
      </button>

      <div className={styles.cover}>
        {item.cover && (
          <Image src={item.cover} alt="" className={styles.coverImg} loading="lazy" />
        )}
        <div className={styles.coverFallback} aria-hidden="true">♪</div>
      </div>

      <div className={styles.body}>
        <p className={styles.title}>{item.title}</p>
        {item.author && <p className={styles.author}>{item.author}</p>}

        {/* Прогресс-бар — виден только когда трек активен */}
        {isCurrent && (
          <div
            className={styles.progress}
            onClick={handleProgressClick}
            role="slider"
            aria-label="Уақыт"
            aria-valuemin={0}
            aria-valuemax={duration || 0}
            aria-valuenow={currentTime || 0}
          >
            <div
              className={styles.progressFill}
              style={{ width: `${progressPct}%` }}
            />
          </div>
        )}
      </div>

      {item.duration && (
        <span className={styles.duration}>{item.duration}</span>
      )}
    </li>
  );
}

// === Список треков с одним общим аудио-элементом ===
// Глобальный <audio> переиспользуется — при переключении трека просто
// меняется src. Если кликнули играющий трек — pause; иначе load+play.
export function AudioList({ items = [] }) {
  const [currentId, setCurrentId] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  const currentItem = items.find((i) => i.id === currentId);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const onTime = () => setCurrentTime(a.currentTime);
    const onMeta = () => setDuration(a.duration || 0);
    const onEnd = () => setIsPlaying(false);
    a.addEventListener("timeupdate", onTime);
    a.addEventListener("loadedmetadata", onMeta);
    a.addEventListener("ended", onEnd);
    return () => {
      a.removeEventListener("timeupdate", onTime);
      a.removeEventListener("loadedmetadata", onMeta);
      a.removeEventListener("ended", onEnd);
    };
  }, []);

  const handleToggle = (item) => {
    const a = audioRef.current;
    if (!a) return;

    if (item.id === currentId) {
      if (isPlaying) {
        a.pause();
        setIsPlaying(false);
      } else {
        a.play();
        setIsPlaying(true);
      }
      return;
    }

    // Switch to new track.
    setCurrentId(item.id);
    setCurrentTime(0);
    setDuration(0);
    a.src = item.audioUrl;
    a.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
  };

  const handleSeek = (time) => {
    const a = audioRef.current;
    if (a) {
      a.currentTime = time;
      setCurrentTime(time);
    }
  };

  if (items.length === 0) {
    return (
      <p className={styles.empty}>Бұл бөлімде материалдар әзірге жоқ.</p>
    );
  }

  return (
    <div className={styles.wrap}>
      <ol className={styles.list}>
        {items.map((item, i) => (
          <AudioItem
            key={item.id}
            item={item}
            index={i}
            isCurrent={item.id === currentId}
            isPlaying={item.id === currentId && isPlaying}
            currentTime={currentTime}
            duration={duration}
            onToggle={handleToggle}
            onSeek={handleSeek}
          />
        ))}
      </ol>

      {currentItem?.description && (
        <aside className={styles.nowPlaying} aria-live="polite">
          <span className={styles.nowLabel}>Ойналуда</span>
          <p className={styles.nowDesc}>{currentItem.description}</p>
        </aside>
      )}

      {/* Скрытый общий аудио-элемент */}
      <audio ref={audioRef} preload="metadata" />
    </div>
  );
}
