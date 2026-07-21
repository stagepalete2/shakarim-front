"use client";

import { createContext, useCallback, useContext } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  DEFAULT_LANG,
  LANG_COOKIE,
  LANGS,
  normalizeLang,
} from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

const LanguageContext = createContext({
  lang: DEFAULT_LANG,
  setLang: () => {},
  t: (key) => key,
});

// lang приходит с сервера (сегмент [lang] в layout). При смене языка переходим
// на тот же путь со сменой префикса локали и запоминаем выбор в cookie
// (proxy читает его при заходе на "/").
export function LanguageProvider({ lang: initialLang, children }) {
  const router = useRouter();
  const pathname = usePathname();
  const lang = normalizeLang(initialLang);

  const setLang = useCallback(
    (next) => {
      const value = normalizeLang(next);
      document.cookie = `${LANG_COOKIE}=${value}; path=/; max-age=31536000; samesite=lax`;
      const parts = pathname.split("/");
      if (LANGS.includes(parts[1])) parts[1] = value;
      else parts.splice(1, 0, value);
      router.push(parts.join("/") || `/${value}`);
    },
    [pathname, router],
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
