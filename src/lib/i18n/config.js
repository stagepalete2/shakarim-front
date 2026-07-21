// Языки сайта. Базовый — kk (как и дефолт бэкенда: без ?lang → kk).
export const LANGS = ["kk", "ru", "en"];
export const DEFAULT_LANG = "kk";
export const LANG_COOKIE = "lang";

// Заголовок, которым proxy передаёт язык из URL в серверный рендер
// (источник истины — сегмент URL). getLang() читает его в первую очередь.
export const LANG_HEADER = "x-lang";

// Подписи для переключателя в хедере.
export const LANG_OPTIONS = [
  { code: "kk", label: "KAZ" },
  { code: "ru", label: "RUS" },
  { code: "en", label: "ENG" },
];

export function normalizeLang(value) {
  return LANGS.includes(value) ? value : DEFAULT_LANG;
}
