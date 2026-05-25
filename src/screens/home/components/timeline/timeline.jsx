"use client";

import { useEffect, useMemo, useRef, useState } from "react"
import { useKeydown } from "@/hooks/use-keydown"
import { TimelineContext } from "../timeline-context/timeline-context"
import { TimelineEvent } from "../timeline-event/timeline-event"
import styles from "./timeline.module.scss"

function positionFor(year, startYear, endYear) {
  const total = endYear - startYear;
  const clamped = Math.max(startYear, Math.min(endYear, year));
  return ((clamped - startYear) / total) * 100;
}

export function Timeline({
  events,
  contextEvents = [],
  startYear,
  endYear,
  className = "",
}) {
  const [openId, setOpenId] = useState(null);
  const rootRef = useRef(null);

  // Объединяем и сортируем по году. На мобилке это даёт хронологический поток,
  // на десктопе порядок не важен (всё absolute по year-pos).
  const items = useMemo(() => {
    let ctxIdx = 0;
    const merged = [
      ...events.map((ev, idx) => ({
        kind: "event",
        data: ev,
        key: `event-${ev.year}-${idx}`,
      })),
      ...contextEvents.map((ev, idx) => ({
        kind: "context",
        data: ev,
        key: `ctx-${ev.year}-${idx}`,
      })),
    ];
    merged.sort((a, b) => a.data.year - b.data.year);
    return merged.map((item) => {
      if (item.kind === "context") {
        const side = ctxIdx % 2 === 0 ? "above" : "below";
        ctxIdx += 1;
        return { ...item, side };
      }
      return item;
    });
  }, [events, contextEvents]);

  // Клик вне ленты — закрывает открытую карточку.
  useEffect(() => {
    if (openId === null) return;
    const handleClick = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) {
        setOpenId(null);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [openId]);

  useKeydown({ Escape: () => setOpenId(null) }, openId !== null);

  return (
    <div ref={rootRef} className={`${styles.timeline} ${className}`}>
      <div className={styles.track} aria-hidden="true">
        <span className={`${styles.axisLabel} ${styles.axisStart}`}>
          {startYear}
        </span>
        <span className={`${styles.axisLabel} ${styles.axisEnd}`}>
          {endYear}
        </span>
      </div>

      {items.map((item) => {
        const pos = positionFor(item.data.year, startYear, endYear);
        if (item.kind === "event") {
          const id = item.key;
          return (
            <TimelineEvent
              key={id}
              id={id}
              year={item.data.year}
              label={item.data.label}
              title={item.data.title}
              description={item.data.description}
              details={item.data.details}
              image={item.data.image}
              imageAlt={item.data.imageAlt}
              position={pos}
              isOpen={openId === id}
              onToggle={() =>
                setOpenId(openId === id ? null : id)
              }
            />
          );
        }
        const ctxId = item.key;
        return (
          <TimelineContext
            key={ctxId}
            id={ctxId}
            year={item.data.year}
            label={item.data.label}
            icon={item.data.icon}
            side={item.side}
            position={pos}
            isOpen={openId === ctxId}
            onToggle={() =>
              setOpenId(openId === ctxId ? null : ctxId)
            }
          />
        );
      })}
    </div>
  );
}
