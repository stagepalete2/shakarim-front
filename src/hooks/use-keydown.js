import { useEffect, useRef } from "react";

// Подписка на window keydown. handlers — словарь { [key]: callback }.
// Удобно для модалок: useKeydown({ Escape: onClose, ArrowLeft: prev }).
// Условие активности можно регулировать через active — например, не
// слушать клавиатуру когда окно закрыто.
//
// Handlers держим в ref, чтобы caller мог собирать объект инлайн без
// useMemo — это не вызовет переподписки.
export function useKeydown(handlers, active = true) {
  const handlersRef = useRef(handlers);
  handlersRef.current = handlers;

  useEffect(() => {
    if (!active) return;
    const onKey = (e) => {
      const handler = handlersRef.current[e.key];
      if (handler) handler(e);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);
}
