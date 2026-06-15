import { cookies } from "next/headers";
import { LANG_COOKIE, normalizeLang } from "./config";
import { getDictionary } from "./dictionaries";

// Текущий язык из cookie — для серверных компонентов (Next 16: cookies() async).
// Вызов делает страницу динамической (рендер на каждый запрос) — это ожидаемо
// для cookie-локализации.
export async function getLang() {
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
