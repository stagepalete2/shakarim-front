import { cookies, headers } from "next/headers";
import { LANGS, LANG_COOKIE, LANG_HEADER, normalizeLang } from "./config";
import { getDictionary } from "./dictionaries";

// Текущий язык. Источник истины — сегмент URL, который proxy кладёт в
// заголовок x-lang. Фолбэк — cookie (напр. для метадата-роутов без proxy).
// Чтение headers()/cookies() делает рендер динамическим — это ожидаемо.
export async function getLang() {
  const h = await headers();
  const fromHeader = h.get(LANG_HEADER);
  if (LANGS.includes(fromHeader)) return fromHeader;
  const store = await cookies();
  return normalizeLang(store.get(LANG_COOKIE)?.value);
}

// Серверный аналог useTranslations: t("a.b") в серверных компонентах.
export async function getT() {
  const dict = getDictionary(await getLang());
  return (key) => {
    const val = key.split(".").reduce((o, k) => o?.[k], dict);
    return typeof val === "string" ? val : key;
  };
}
