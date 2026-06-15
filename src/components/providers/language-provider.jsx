"use client";

import { createContext, useCallback, useContext } from "react";
import { useRouter } from "next/navigation";
import {
  DEFAULT_LANG,
  LANG_COOKIE,
  normalizeLang,
} from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

const LanguageContext = createContext({
  lang: DEFAULT_LANG,
  setLang: () => {},
  t: (key) => key,
});

// lang приходит с сервера (cookie прочитан в layout). При смене языка пишем
// cookie и router.refresh() — серверные компоненты перечитывают данные на
// новом языке, форма ответа не меняется.
export function LanguageProvider({ lang: initialLang, children }) {
  const router = useRouter();
  const lang = normalizeLang(initialLang);

  const setLang = useCallback(
    (next) => {
      const value = normalizeLang(next);
      document.cookie = `${LANG_COOKIE}=${value}; path=/; max-age=31536000; samesite=lax`;
      router.refresh();
    },
    [router],
  );

  const dict = getDictionary(lang);
  // t("a.b.c") — точечный доступ к словарю; фолбэк — сам ключ.
  const t = useCallback(
    (key) => {
      const val = key.split(".").reduce((o, k) => o?.[k], dict);
      return typeof val === "string" ? val : key;
    },
    [dict],
  );

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

// Удобный хук для статических строк в клиентских компонентах.
export function useTranslations() {
  return useContext(LanguageContext).t;
}
