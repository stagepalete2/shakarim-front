// Серверный слой запросов к API (App Router, Server Components).
// Базовый URL — из NEXT_PUBLIC_API_URL (абсолютный, напр. https://api.shakarim.kz/api
// или http://localhost:8000/api). Для server-side fetch URL обязан быть абсолютным.
import { getLang } from "@/lib/i18n/server";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "/api";

// GET с ISR-кэшем Next. Возвращает распарсенный JSON.
//   revalidate — TTL кэша в секундах (по умолч. 60, как React Query staleTime).
//   allow404   — для деталей по slug: 404 → null вместо ошибки.
// Ко всем запросам добавляется ?lang= из cookie (локализация контента).
export async function apiGet(path, { revalidate = 60, allow404 = false } = {}) {
  if (!/^https?:\/\//.test(BASE_URL)) {
    throw new Error(
      `NEXT_PUBLIC_API_URL должен быть абсолютным (получено: "${BASE_URL}"). ` +
        `Пропиши адрес бэкенда в .env.local, напр. http://localhost:8000/api`,
    );
  }

  const lang = await getLang();
  const sep = path.includes("?") ? "&" : "?";
  const url = `${BASE_URL}${path}${sep}lang=${lang}`;
  const res = await fetch(url, { next: { revalidate } });

  if (res.status === 404 && allow404) return null;
  if (!res.ok) {
    throw new Error(`API ${res.status} ${res.statusText} — GET ${url}`);
  }
  return res.json();
}
