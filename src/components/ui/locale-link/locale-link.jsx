"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LANGS, DEFAULT_LANG } from "@/lib/i18n/config";

// Текущая локаль из URL (первый сегмент). Фолбэк — язык по умолчанию.
export function localeFromPathname(pathname) {
  const seg = pathname?.split("/")[1];
  return LANGS.includes(seg) ? seg : DEFAULT_LANG;
}

// Префиксует внутренний абсолютный путь локалью ("/works" -> "/kk/works").
// Внешние ссылки, якоря, mailto/tel, уже локализованные и объектные href —
// возвращаются как есть.
export function localizeHref(href, locale) {
  if (typeof href !== "string") return href; // href-объект next/link — не трогаем
  if (!href.startsWith("/") || href.startsWith("//")) return href; // #, http, //cdn
  if (href === "/") return `/${locale}`;
  const seg = href.split("/")[1];
  if (LANGS.includes(seg)) return href; // уже с префиксом локали
  return `/${locale}${href}`;
}

// Drop-in замена next/link: сам добавляет префикс текущей локали к внутренним
// путям. Внешние/якорные href проходят без изменений.
export function LocaleLink({ href, ...rest }) {
  const locale = localeFromPathname(usePathname());
  return <Link href={localizeHref(href, locale)} {...rest} />;
}

export default LocaleLink;
