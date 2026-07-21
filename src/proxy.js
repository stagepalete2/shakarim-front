import { NextResponse } from "next/server";
import { LANGS, DEFAULT_LANG, LANG_COOKIE, LANG_HEADER } from "@/lib/i18n/config";

// Определение локали для входа без префикса (/, /works ...):
// сохранённый выбор (cookie) → Accept-Language → язык по умолчанию.
function detectLocale(request) {
  const cookieLang = request.cookies.get(LANG_COOKIE)?.value;
  if (LANGS.includes(cookieLang)) return cookieLang;

  const header = request.headers.get("accept-language");
  if (header) {
    for (const part of header.split(",")) {
      const code = part.trim().split(";")[0].split("-")[0].toLowerCase();
      if (LANGS.includes(code)) return code;
    }
  }
  return DEFAULT_LANG;
}

export function proxy(request) {
  const { pathname } = request.nextUrl;
  const seg = pathname.split("/")[1];

  // Путь уже с локалью: прокидываем язык в заголовок запроса, чтобы серверный
  // getLang()/apiGet читали язык из URL. Ответные cookie не трогаем.
  if (LANGS.includes(seg)) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set(LANG_HEADER, seg);
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  // Нет префикса локали → редирект на определённую локаль (старые ссылки живут).
  const locale = detectLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

// Пропускаем служебное и корневые метадата-роуты (sitemap.xml, robots.txt,
// manifest.webmanifest, opengraph-image, icon и любые файлы с точкой).
export const config = {
  matcher: ["/((?!_next/|opengraph-image|icon|.*\\.).*)"],
};
