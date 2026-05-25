import { useEffect } from "react";

// Блокирует скролл body, пока компонент монтирован и active === true.
// Используется в overlay/lightbox-окнах, чтобы фон не уезжал под пальцем.
export function useBodyScrollLock(active = true) {
  useEffect(() => {
    if (!active) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [active]);
}
