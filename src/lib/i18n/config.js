// Языки сайта. Базовый — kk (как и дефолт бэкенда: без ?lang → kk).
export const LANGS = ["kk", "ru", "en"];
export const DEFAULT_LANG = "kk";
export const LANG_COOKIE = "lang";

// Подписи для переключателя в хедере.
export const LANG_OPTIONS = [
  { code: "kk", label: "KAZ" },
  { code: "ru", label: "RUS" },
  { code: "en", label: "ENG" },
];

export function normalizeLang(value) {
  return LANGS.includes(value) ? value : DEFAULT_LANG;
}
